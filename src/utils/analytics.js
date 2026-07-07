const VISITOR_ID_KEY = 'amazonCloneVisitorId';
const SESSION_ID_KEY = 'amazonCloneSessionId';
const EVENTS_KEY = 'amazonCloneAnalyticsEvents';
const EVENT_LIMIT = 5000;
const ADMIN_TOKEN_KEY = 'amazonCloneAdminToken';

let memoryVisitorId = null;
let memorySessionId = null;

const canUseStorage = () => typeof window !== 'undefined' && window.localStorage;

const createId = (prefix) => {
  const random = Math.random().toString(36).slice(2, 10);
  return `${prefix}-${Date.now().toString(36)}-${random}`;
};

export const getVisitorId = () => {
  if (!canUseStorage()) {
    if (!memoryVisitorId) memoryVisitorId = createId('visitor');
    return memoryVisitorId;
  }

  const existingId = window.localStorage.getItem(VISITOR_ID_KEY);
  if (existingId) return existingId;

  const visitorId = createId('visitor');
  window.localStorage.setItem(VISITOR_ID_KEY, visitorId);
  return visitorId;
};

export const getSessionId = () => {
  if (!canUseStorage()) {
    if (!memorySessionId) memorySessionId = createId('session');
    return memorySessionId;
  }

  const existingId = window.sessionStorage.getItem(SESSION_ID_KEY);
  if (existingId) return existingId;

  const sessionId = createId('session');
  window.sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  return sessionId;
};

export const getEvents = () => {
  if (!canUseStorage()) return [];

  try {
    const rawEvents = window.localStorage.getItem(EVENTS_KEY);
    const events = rawEvents ? JSON.parse(rawEvents) : [];
    return Array.isArray(events) ? events : [];
  } catch (error) {
    return [];
  }
};

const shouldSyncRemote = () => {
  if (typeof window === 'undefined') return false;
  const { hostname, port } = window.location;
  if (hostname === 'localhost' && port !== '8888') return false;
  if (hostname === '127.0.0.1' && port !== '8888') return false;
  return true;
};

const syncRemoteEvent = (event) => {
  if (!shouldSyncRemote() || typeof window.fetch !== 'function') return;

  window.fetch('/.netlify/functions/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event }),
    keepalive: true
  }).catch(() => {
    // Local recording remains the source of truth if the network request fails.
  });
};

export const recordEvent = (type, payload = {}) => {
  if (!canUseStorage()) return null;

  if (type === 'detail_dwell' && (Number(payload.durationMs) || 0) < 500) {
    return null;
  }

  const event = {
    id: createId('event'),
    type,
    timestamp: new Date().toISOString(),
    visitorId: getVisitorId(),
    sessionId: getSessionId(),
    ...payload
  };

  const currentEvents = getEvents();
  if (type === 'detail_view') {
    const duplicateView = [...currentEvents].reverse().find((item) => (
      item.type === 'detail_view' &&
      item.visitorId === event.visitorId &&
      item.asin === event.asin &&
      item.source === event.source
    ));

    if (duplicateView) {
      const duplicateAgeMs = Date.now() - new Date(duplicateView.timestamp).getTime();
      if (duplicateAgeMs >= 0 && duplicateAgeMs < 1500) return null;
    }
  }

  const events = [...currentEvents, event].slice(-EVENT_LIMIT);
  window.localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  window.dispatchEvent(new Event('analytics-updated'));
  syncRemoteEvent(event);
  return event;
};

export const clearEvents = () => {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(EVENTS_KEY);
  window.dispatchEvent(new Event('analytics-updated'));
};

export const getAdminToken = () => {
  if (!canUseStorage()) return '';
  return window.localStorage.getItem(ADMIN_TOKEN_KEY) || '';
};

export const setAdminToken = (token) => {
  if (!canUseStorage()) return;
  const trimmedToken = token.trim();
  if (trimmedToken) {
    window.localStorage.setItem(ADMIN_TOKEN_KEY, trimmedToken);
  } else {
    window.localStorage.removeItem(ADMIN_TOKEN_KEY);
  }
};

export const fetchRemoteEvents = async (adminToken) => {
  const response = await fetch('/.netlify/functions/analytics?limit=5000', {
    headers: { 'X-Admin-Token': adminToken }
  });
  const data = await response.json();
  if (!response.ok || !data.ok) {
    throw new Error(data.error || '无法读取 Netlify 访客数据');
  }
  return Array.isArray(data.events) ? data.events : [];
};

export const clearRemoteEvents = async (adminToken) => {
  const response = await fetch('/.netlify/functions/analytics', {
    method: 'DELETE',
    headers: { 'X-Admin-Token': adminToken }
  });
  const data = await response.json();
  if (!response.ok || !data.ok) {
    throw new Error(data.error || '无法清空 Netlify 访客数据');
  }
  return data;
};

export const formatDuration = (durationMs = 0) => {
  const safeMs = Math.max(0, durationMs || 0);
  const totalSeconds = Math.round(safeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes <= 0) return `${seconds} 秒`;
  return `${minutes} 分 ${seconds} 秒`;
};

const toProductPayload = (product) => ({
  asin: product.asin,
  sourceAsin: product.sourceAsin || product.asin,
  productId: product.id,
  productTitle: product.title,
  categoryId: product.categoryId,
  experimentGroup: product.experimentGroup || 'original',
  experimentGroupLabel: product.experimentGroupLabel || '原始组'
});

const createProductStats = (product) => ({
  ...toProductPayload(product),
  clicks: 0,
  detailViews: 0,
  homepageEntries: 0,
  categoryEntries: 0,
  directEntries: 0,
  otherEntries: 0,
  totalDwellMs: 0,
  avgDwellMs: 0,
  dwellSamples: 0,
  addToCart: 0,
  checkoutClicks: 0,
  chatQuestions: 0
});

export const summarizeAnalytics = (products, categories, eventOverride) => {
  const events = Array.isArray(eventOverride) ? eventOverride : getEvents();
  const productStats = products.reduce((stats, product) => {
    stats[product.asin] = createProductStats(product);
    return stats;
  }, {});
  const visitors = new Set();
  const visitorProducts = new Map();

  const ensureVisitorProduct = (event) => {
    if (!event.asin) return null;
    const product = products.find((item) => item.asin === event.asin);
    const key = `${event.visitorId || 'unknown'}::${event.asin}`;

    if (!visitorProducts.has(key)) {
      visitorProducts.set(key, {
        visitorId: event.visitorId || 'unknown',
        asin: event.asin,
        sourceAsin: event.sourceAsin || product?.sourceAsin || event.asin,
        productId: event.productId || product?.id || '',
        productTitle: event.productTitle || product?.title || event.asin,
        experimentGroup: event.experimentGroup || product?.experimentGroup || 'unknown',
        experimentGroupLabel: event.experimentGroupLabel || product?.experimentGroupLabel || '未知组别',
        sessionId: event.sessionId || '',
        ipHash: event.ipHash || '',
        userAgentHash: event.userAgentHash || '',
        clicked: false,
        entrySources: new Set(),
        dwellMs: 0,
        addToCart: 0,
        checkoutClicks: 0,
        chatQuestions: 0,
        lastSeen: event.timestamp
      });
    }

    const row = visitorProducts.get(key);
    row.lastSeen = event.timestamp || row.lastSeen;
    row.sessionId = event.sessionId || row.sessionId;
    row.ipHash = event.ipHash || row.ipHash;
    row.userAgentHash = event.userAgentHash || row.userAgentHash;
    return row;
  };

  events.forEach((event) => {
    if (event.visitorId) visitors.add(event.visitorId);
    const stats = event.asin ? productStats[event.asin] : null;
    const row = ensureVisitorProduct(event);

    if (event.type === 'product_click') {
      if (stats) stats.clicks += 1;
      if (row) row.clicked = true;
    }

    if (event.type === 'detail_view') {
      if (stats) {
        stats.detailViews += 1;
        if (event.source === 'homepage' || event.source === 'homepage-featured') stats.homepageEntries += 1;
        else if (event.source === 'category-page') stats.categoryEntries += 1;
        else if (event.source === 'direct-link' || event.source === 'external-link') stats.directEntries += 1;
        else stats.otherEntries += 1;
      }
      if (row) row.entrySources.add(event.source || '未知来源');
    }

    if (event.type === 'detail_dwell') {
      const durationMs = Number(event.durationMs) || 0;
      if (stats) {
        stats.totalDwellMs += durationMs;
        stats.dwellSamples += 1;
      }
      if (row) row.dwellMs += durationMs;
    }

    if (event.type === 'add_to_cart') {
      if (stats) stats.addToCart += 1;
      if (row) row.addToCart += 1;
    }

    if (event.type === 'checkout_click') {
      if (stats) stats.checkoutClicks += 1;
      if (row) row.checkoutClicks += 1;
    }

    if (event.type === 'chat_question') {
      if (stats) stats.chatQuestions += 1;
      if (row) row.chatQuestions += 1;
    }
  });

  const productRows = Object.values(productStats).map((stats) => ({
    ...stats,
    avgDwellMs: stats.dwellSamples ? Math.round(stats.totalDwellMs / stats.dwellSamples) : 0
  }));

  const categoryRows = categories.map((category) => {
    const categoryProducts = productRows.filter((product) => product.categoryId === category.id);
    const totalDwellMs = categoryProducts.reduce((total, product) => total + product.totalDwellMs, 0);
    const dwellSamples = categoryProducts.reduce((total, product) => total + product.dwellSamples, 0);

    return {
      ...category,
      productCount: categoryProducts.length,
      clicks: categoryProducts.reduce((total, product) => total + product.clicks, 0),
      detailViews: categoryProducts.reduce((total, product) => total + product.detailViews, 0),
      addToCart: categoryProducts.reduce((total, product) => total + product.addToCart, 0),
      checkoutClicks: categoryProducts.reduce((total, product) => total + product.checkoutClicks, 0),
      chatQuestions: categoryProducts.reduce((total, product) => total + product.chatQuestions, 0),
      avgDwellMs: dwellSamples ? Math.round(totalDwellMs / dwellSamples) : 0
    };
  });

  const visitorProductRows = Array.from(visitorProducts.values()).map((row) => ({
    ...row,
    entrySources: Array.from(row.entrySources)
  }));

  const totalDwellMs = productRows.reduce((total, product) => total + product.totalDwellMs, 0);
  const dwellSamples = productRows.reduce((total, product) => total + product.dwellSamples, 0);
  const totalChatQuestions = events.filter((event) => event.type === 'chat_question').length;

  return {
    events,
    visitorCount: visitors.size,
    productRows,
    categoryRows,
    visitorProductRows,
    totals: {
      productClicks: productRows.reduce((total, product) => total + product.clicks, 0),
      detailViews: productRows.reduce((total, product) => total + product.detailViews, 0),
      addToCart: productRows.reduce((total, product) => total + product.addToCart, 0),
      checkoutClicks: productRows.reduce((total, product) => total + product.checkoutClicks, 0),
      chatQuestions: totalChatQuestions,
      avgDwellMs: dwellSamples ? Math.round(totalDwellMs / dwellSamples) : 0
    }
  };
};
