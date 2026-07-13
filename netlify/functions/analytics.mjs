import crypto from 'node:crypto';
import { getStore } from '@netlify/blobs';

const STORE_NAME = 'amazon-analytics';
const ADMIN_TOKEN_ENV = 'NETLIFY_ADMIN_TOKEN';
const HASH_SALT_ENV = 'ANALYTICS_HASH_SALT';
const MAX_EVENTS = 5000;
const ALLOWED_EVENT_TYPES = new Set([
  'product_click',
  'detail_view',
  'detail_dwell',
  'add_to_cart',
  'checkout_click',
  'chat_question',
  'survey_submit'
]);

const responseHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Cache-Control': 'no-store'
};

const json = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: responseHeaders
});

const createId = (prefix) => {
  const random = crypto.randomBytes(6).toString('hex');
  return `${prefix}-${Date.now().toString(36)}-${random}`;
};

const hashValue = (value) => {
  if (!value) return undefined;
  const salt = process.env[HASH_SALT_ENV] || 'amazon-clone-default-salt';
  return crypto.createHash('sha256').update(`${salt}:${value}`).digest('hex').slice(0, 24);
};

const getClientIp = (request) => {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return request.headers.get('x-nf-client-connection-ip') || request.headers.get('client-ip');
};

const isAdmin = (request) => {
  const expectedToken = process.env[ADMIN_TOKEN_ENV];
  if (!expectedToken) return false;

  const providedToken = request.headers.get('x-admin-token') || '';
  if (providedToken.length !== expectedToken.length) return false;
  return crypto.timingSafeEqual(Buffer.from(providedToken), Buffer.from(expectedToken));
};

const sanitizeEvent = (input) => {
  const rawEvent = input?.event || input || {};
  const eventType = String(rawEvent.type || '');

  if (!ALLOWED_EVENT_TYPES.has(eventType)) {
    throw new Error('Unsupported analytics event type');
  }

  return {
    id: String(rawEvent.id || createId('event')).slice(0, 80),
    type: eventType,
    timestamp: rawEvent.timestamp || new Date().toISOString(),
    visitorId: String(rawEvent.visitorId || 'unknown').slice(0, 120),
    sessionId: rawEvent.sessionId ? String(rawEvent.sessionId).slice(0, 120) : undefined,
    asin: rawEvent.asin ? String(rawEvent.asin).slice(0, 40) : undefined,
    productId: rawEvent.productId,
    productTitle: rawEvent.productTitle ? String(rawEvent.productTitle).slice(0, 220) : undefined,
    categoryId: rawEvent.categoryId ? String(rawEvent.categoryId).slice(0, 80) : undefined,
    source: rawEvent.source ? String(rawEvent.source).slice(0, 80) : undefined,
    durationMs: Number.isFinite(Number(rawEvent.durationMs)) ? Number(rawEvent.durationMs) : undefined,
    checkoutType: rawEvent.checkoutType ? String(rawEvent.checkoutType).slice(0, 80) : undefined,
    quantity: Number.isFinite(Number(rawEvent.quantity)) ? Number(rawEvent.quantity) : undefined,
    questionLength: Number.isFinite(Number(rawEvent.questionLength)) ? Number(rawEvent.questionLength) : undefined,
    surveyDiscoverySource: rawEvent.surveyDiscoverySource ? String(rawEvent.surveyDiscoverySource).slice(0, 80) : undefined,
    surveyDiscoverySourceLabel: rawEvent.surveyDiscoverySourceLabel ? String(rawEvent.surveyDiscoverySourceLabel).slice(0, 120) : undefined,
    surveyAiPlatform: rawEvent.surveyAiPlatform ? String(rawEvent.surveyAiPlatform).slice(0, 80) : undefined,
    surveyAiPlatformLabel: rawEvent.surveyAiPlatformLabel ? String(rawEvent.surveyAiPlatformLabel).slice(0, 120) : undefined,
    voucherAmount: Number.isFinite(Number(rawEvent.voucherAmount)) ? Number(rawEvent.voucherAmount) : undefined,
    voucherCurrency: rawEvent.voucherCurrency ? String(rawEvent.voucherCurrency).slice(0, 20) : undefined
  };
};

const listEvents = async (store, limit) => {
  const listed = await store.list({ prefix: 'events/' });
  const eventKeys = (listed.blobs || [])
    .map((blob) => blob.key)
    .sort()
    .slice(-limit);

  const events = await Promise.all(eventKeys.map((key) => store.get(key, {
    type: 'json',
    consistency: 'strong'
  })));
  return events.filter(Boolean);
};

export default async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: responseHeaders });
  }

  try {
    const store = getStore({ name: STORE_NAME, consistency: 'strong' });

    if (request.method === 'POST') {
      const payload = await request.json();
      const analyticsEvent = sanitizeEvent(payload);
      const serverEvent = {
        ...analyticsEvent,
        serverReceivedAt: new Date().toISOString(),
        ipHash: hashValue(getClientIp(request)),
        userAgentHash: hashValue(request.headers.get('user-agent')),
        userAgent: (request.headers.get('user-agent') || '').slice(0, 260),
        referrer: (request.headers.get('referer') || '').slice(0, 260)
      };

      const key = `events/${serverEvent.serverReceivedAt}-${serverEvent.id}.json`;
      await store.setJSON(key, serverEvent, {
        metadata: {
          visitorId: serverEvent.visitorId,
          type: serverEvent.type,
          asin: serverEvent.asin || ''
        }
      });

      return json(202, { ok: true, id: serverEvent.id });
    }

    if (request.method === 'GET') {
      if (!process.env[ADMIN_TOKEN_ENV]) {
        return json(503, { ok: false, error: `${ADMIN_TOKEN_ENV} is not configured` });
      }
      if (!isAdmin(request)) {
        return json(401, { ok: false, error: 'Unauthorized' });
      }

      const url = new URL(request.url);
      const limit = Math.min(MAX_EVENTS, Math.max(1, Number(url.searchParams.get('limit')) || MAX_EVENTS));
      const events = await listEvents(store, limit);
      return json(200, { ok: true, events, count: events.length });
    }

    if (request.method === 'DELETE') {
      if (!process.env[ADMIN_TOKEN_ENV]) {
        return json(503, { ok: false, error: `${ADMIN_TOKEN_ENV} is not configured` });
      }
      if (!isAdmin(request)) {
        return json(401, { ok: false, error: 'Unauthorized' });
      }

      const listed = await store.list({ prefix: 'events/' });
      await Promise.all((listed.blobs || []).map((blob) => store.delete(blob.key)));
      return json(200, { ok: true, deleted: (listed.blobs || []).length });
    }

    return json(405, { ok: false, error: 'Method not allowed' });
  } catch (error) {
    return json(500, { ok: false, error: error.message || 'Analytics function failed' });
  }
};
