import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { amazonCategories, amazonProducts } from '../data/amazonProducts';
import {
  clearEvents,
  clearRemoteEvents,
  fetchRemoteEvents,
  formatDuration,
  getAdminToken,
  setAdminToken,
  summarizeAnalytics
} from '../utils/analytics';

const formatNumber = (value) => new Intl.NumberFormat('zh-CN').format(value || 0);

const sourceLabels = {
  homepage: '首页商品区',
  'homepage-featured': '首页精选位',
  'category-page': '分类页',
  'search-results': '搜索结果',
  'product-grid': '商品列表',
  'related-products': '同类推荐',
  'direct-link': '商品链接',
  'external-link': '外部链接',
  cart: '购物车',
  'product-detail': '详情页',
  'customer-service': '客服页'
};

const formatSource = (source) => sourceLabels[source] || source || '未知来源';

const AdminDashboard = () => {
  const [, setRefreshKey] = useState(0);
  const [adminTokenInput, setAdminTokenInput] = useState('');
  const [remoteEvents, setRemoteEvents] = useState(null);
  const [remoteStatus, setRemoteStatus] = useState('local');
  const [remoteError, setRemoteError] = useState('');

  const usingRemote = Array.isArray(remoteEvents);

  const loadRemoteEvents = async (token = adminTokenInput) => {
    const trimmedToken = token.trim();
    if (!trimmedToken) {
      setAdminToken('');
      setRemoteEvents(null);
      setRemoteStatus('local');
      setRemoteError('');
      return;
    }

    setRemoteStatus('loading');
    setRemoteError('');
    try {
      const events = await fetchRemoteEvents(trimmedToken);
      setAdminToken(trimmedToken);
      setAdminTokenInput(trimmedToken);
      setRemoteEvents(events);
      setRemoteStatus('remote');
    } catch (error) {
      setRemoteEvents(null);
      setRemoteStatus('error');
      setRemoteError(error.message || '无法连接 Netlify 全站数据');
    }
  };

  useEffect(() => {
    const refresh = () => setRefreshKey((key) => key + 1);
    window.addEventListener('analytics-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('analytics-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  useEffect(() => {
    const savedToken = getAdminToken();
    setAdminTokenInput(savedToken);
    if (savedToken) {
      setRemoteStatus('loading');
      fetchRemoteEvents(savedToken)
        .then((events) => {
          setRemoteEvents(events);
          setRemoteStatus('remote');
          setRemoteError('');
        })
        .catch((error) => {
          setRemoteEvents(null);
          setRemoteStatus('error');
          setRemoteError(error.message || '无法连接 Netlify 全站数据');
        });
    }
  }, []);

  const analytics = summarizeAnalytics(amazonProducts, amazonCategories, remoteEvents);

  const productRows = [...analytics.productRows]
    .sort((a, b) => (
      b.checkoutClicks - a.checkoutClicks ||
      b.addToCart - a.addToCart ||
      b.detailViews - a.detailViews ||
      b.clicks - a.clicks
    ));

  const visitorRows = [...analytics.visitorProductRows]
    .sort((a, b) => new Date(b.lastSeen || 0) - new Date(a.lastSeen || 0));
  const surveyRows = analytics.surveyRows || [];

  const maxCategoryClicks = Math.max(1, ...analytics.categoryRows.map((category) => category.clicks));

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <header className="bg-[#131921] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <p className="text-[#febd69] text-sm font-semibold mb-2">运营中心</p>
              <h1 className="text-2xl sm:text-3xl font-bold">智能生活商城数据看板</h1>
              <p className="text-sm text-gray-300 mt-2">
                {usingRemote ? '读取 Netlify 后端保存的全站真实访问事件。' : '当前显示本浏览器访问事件；输入管理员口令后可查看全站数据。'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link to="/" className="border border-white/40 hover:border-[#febd69] px-3 py-2 rounded">
                返回商城
              </Link>
              <button
                type="button"
                onClick={async () => {
                  if (usingRemote && adminTokenInput.trim()) {
                    try {
                      await clearRemoteEvents(adminTokenInput.trim());
                      setRemoteEvents([]);
                      setRemoteError('');
                    } catch (error) {
                      setRemoteError(error.message || '清空全站数据失败');
                    }
                    return;
                  }

                  clearEvents();
                  setRefreshKey((key) => key + 1);
                }}
                className="bg-[#febd69] text-gray-900 px-3 py-2 rounded font-semibold"
              >
                {usingRemote ? '清空全站数据' : '清空本地数据'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <section className="bg-white rounded-md border border-gray-200 p-4 sm:p-5">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Netlify 全站数据连接</h2>
              <p className="text-sm text-gray-500 mt-1">
                访客事件会写入 Netlify Functions + Blobs。管理员口令只保存在你的浏览器，用于读取后端事件。
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <input
                type="password"
                value={adminTokenInput}
                onChange={(event) => setAdminTokenInput(event.target.value)}
                placeholder="输入管理员口令"
                className="w-full sm:w-72 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#ff9900] focus:outline-none focus:ring-2 focus:ring-[#ff9900]/30"
              />
              <button
                type="button"
                onClick={() => loadRemoteEvents()}
                className="rounded-md bg-[#232f3e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#131921]"
              >
                {remoteStatus === 'loading' ? '连接中...' : '连接/刷新'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAdminToken('');
                  setAdminTokenInput('');
                  setRemoteEvents(null);
                  setRemoteStatus('local');
                  setRemoteError('');
                }}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                使用本地数据
              </button>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <span className={`rounded-full px-3 py-1 font-semibold ${
              usingRemote ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}>
              当前数据源：{usingRemote ? 'Netlify 全站数据' : '本浏览器本地数据'}
            </span>
            {remoteStatus === 'error' && (
              <span className="rounded-full bg-red-50 px-3 py-1 font-semibold text-red-700">
                {remoteError}
              </span>
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
          {[
            { label: '访客数', value: formatNumber(analytics.visitorCount), note: '匿名访客 ID' },
            { label: '商品点击', value: formatNumber(analytics.totals.productClicks), note: '卡片/推荐点击' },
            { label: '详情访问', value: formatNumber(analytics.totals.detailViews), note: '进入商品页' },
            { label: '平均停留', value: formatDuration(analytics.totals.avgDwellMs), note: '商品详情页' },
            { label: '加购次数', value: formatNumber(analytics.totals.addToCart), note: '按商品记录' },
            { label: '结算点击', value: formatNumber(analytics.totals.checkoutClicks), note: '去结算/一键购买' },
            { label: '问卷提交', value: formatNumber(analytics.totals.surveySubmissions), note: '领取代金券' }
          ].map((metric) => (
            <article key={metric.label} className="bg-white rounded-md p-4 border border-gray-200">
              <div className="text-sm text-gray-500">{metric.label}</div>
              <div className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</div>
              <div className="mt-3 text-xs text-gray-500">{metric.note}</div>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-6">
          <article className="bg-white rounded-md border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">分类行为表现</h2>
                <p className="text-sm text-gray-500 mt-1">按 5 个分类汇总点击、详情访问、加购、结算和聊天问题。</p>
              </div>
              <span className="text-xs bg-[#232f3e] text-white px-2 py-1 rounded">
                {usingRemote ? 'Netlify 全站事件' : '本地事件'}
              </span>
            </div>
            <div className="space-y-4">
              {analytics.categoryRows.map((category) => (
                <div key={category.id}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-semibold text-gray-900">{category.title}</span>
                    <span className="text-gray-600">{formatNumber(category.clicks)} 次点击</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#ff9900]"
                      style={{ width: `${Math.max(4, (category.clicks / maxCategoryClicks) * 100)}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
                    <span>详情 {formatNumber(category.detailViews)}</span>
                    <span>加购 {formatNumber(category.addToCart)}</span>
                    <span>结算 {formatNumber(category.checkoutClicks)}</span>
                    <span>聊天 {formatNumber(category.chatQuestions)}</span>
                    <span>平均停留 {formatDuration(category.avgDwellMs)}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="bg-white rounded-md border border-gray-200 p-4 sm:p-5">
            <h2 className="text-lg font-bold text-gray-900">采集字段说明</h2>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              Netlify 部署后，事件会保存到后端；本地开发或未连接管理员口令时显示本浏览器数据。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                '访客唯一 ID',
                '会话 ID',
                '商品唯一 ID / ASIN',
                '实验组 / 对照组',
                '商品点击记录',
                '详情页进入来源',
                '详情页停留时长',
                '是否加入购物车',
                '是否点击结算',
                '聊天问题数量',
                '问卷填写结果',
                'IP / UA 哈希'
              ].map((item) => (
                <div key={item} className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-700">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-md bg-[#fff8e5] border border-[#f0c14b] p-3 text-sm text-gray-800">
              当前聊天问题总数：<span className="font-bold">{formatNumber(analytics.totals.chatQuestions)}</span>
            </div>
          </article>
        </section>

        <section className="bg-white rounded-md border border-gray-200 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">商品行为明细</h2>
              <p className="text-sm text-gray-500 mt-1">每个商品的点击、来源、停留、加购、结算和聊天表现。</p>
            </div>
            <span className="text-sm text-gray-500">{formatNumber(productRows.length)} 个商品</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-500">
                  <th className="py-3 pr-4 font-medium">商品</th>
                  <th className="py-3 pr-4 font-medium">点击</th>
                  <th className="py-3 pr-4 font-medium">详情</th>
                  <th className="py-3 pr-4 font-medium">首页进入</th>
                  <th className="py-3 pr-4 font-medium">分类进入</th>
                  <th className="py-3 pr-4 font-medium">链接进入</th>
                  <th className="py-3 pr-4 font-medium">平均停留</th>
                  <th className="py-3 pr-4 font-medium">加购</th>
                  <th className="py-3 pr-4 font-medium">结算</th>
                  <th className="py-3 pr-4 font-medium">聊天</th>
                  <th className="py-3 font-medium">问卷</th>
                </tr>
              </thead>
              <tbody>
                {productRows.map((product) => (
                  <tr key={product.asin} className="border-b border-gray-100">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3 min-w-[300px]">
                        <img src={amazonProducts.find((item) => item.asin === product.asin)?.image} alt={product.productTitle} className="w-11 h-11 object-cover rounded border border-gray-200" />
                        <div>
                          <Link to={`/product/${product.asin}`} className="font-semibold text-gray-900 hover:text-orange-700 line-clamp-1">
                            {product.productTitle}
                          </Link>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                            <span>ID {product.productId} · {product.asin}</span>
                            <span className={`rounded-full px-2 py-0.5 ${
                              product.experimentGroup === 'control'
                                ? 'bg-purple-50 text-purple-700'
                                : 'bg-blue-50 text-blue-700'
                            }`}>
                              {product.experimentGroupLabel}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-gray-700">{formatNumber(product.clicks)}</td>
                    <td className="py-3 pr-4 text-gray-700">{formatNumber(product.detailViews)}</td>
                    <td className="py-3 pr-4 text-gray-700">{formatNumber(product.homepageEntries)}</td>
                    <td className="py-3 pr-4 text-gray-700">{formatNumber(product.categoryEntries)}</td>
                    <td className="py-3 pr-4 text-gray-700">{formatNumber(product.directEntries)}</td>
                    <td className="py-3 pr-4 text-gray-700">{formatDuration(product.avgDwellMs)}</td>
                    <td className="py-3 pr-4 text-gray-700">{formatNumber(product.addToCart)}</td>
                    <td className="py-3 pr-4 text-gray-700">{formatNumber(product.checkoutClicks)}</td>
                    <td className="py-3 pr-4 text-gray-700">{formatNumber(product.chatQuestions)}</td>
                    <td className="py-3 text-gray-700">{formatNumber(product.surveySubmissions)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-md border border-gray-200 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">问卷填写结果</h2>
              <p className="text-sm text-gray-500 mt-1">按访客 ID 和商品 ID 对应整理，记录用户来源答案和代金券领取状态。</p>
            </div>
            <span className="text-sm text-gray-500">{formatNumber(surveyRows.length)} 条问卷记录</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-500">
                  <th className="py-3 pr-4 font-medium">访客 ID</th>
                  <th className="py-3 pr-4 font-medium">商品</th>
                  <th className="py-3 pr-4 font-medium">看到商品的来源</th>
                  <th className="py-3 pr-4 font-medium">AI 网页端</th>
                  <th className="py-3 pr-4 font-medium">代金券</th>
                  <th className="py-3 font-medium">提交时间</th>
                </tr>
              </thead>
              <tbody>
                {surveyRows.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500">
                      暂无问卷提交。用户进入商品页并提交问卷后，这里会按访客和商品显示答案。
                    </td>
                  </tr>
                ) : surveyRows.map((row) => (
                  <tr key={`${row.visitorId}-${row.asin}-survey`} className="border-b border-gray-100">
                    <td className="py-3 pr-4 text-gray-700">
                      <span className="inline-block max-w-[180px] truncate align-bottom">{row.visitorId}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="min-w-[280px]">
                        <Link to={`/product/${row.asin}`} className="font-semibold text-gray-900 hover:text-orange-700 line-clamp-1">
                          {row.productTitle}
                        </Link>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                          <span>ID {row.productId} · {row.asin}</span>
                          <span className={`rounded-full px-2 py-0.5 ${
                            row.experimentGroup === 'control'
                              ? 'bg-purple-50 text-purple-700'
                              : 'bg-blue-50 text-blue-700'
                          }`}>
                            {row.experimentGroupLabel}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-gray-700">{row.surveyDiscoverySourceLabel || '-'}</td>
                    <td className="py-3 pr-4 text-gray-700">{row.surveyAiPlatformLabel || '-'}</td>
                    <td className="py-3 pr-4 text-gray-700">
                      {row.voucherAmount ? `${row.voucherAmount} ${row.voucherCurrency || 'RMB'}` : '-'}
                    </td>
                    <td className="py-3 text-gray-700 whitespace-nowrap">
                      {row.surveySubmittedAt ? new Date(row.surveySubmittedAt).toLocaleString('zh-CN') : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-md border border-gray-200 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">访客 - 商品行为表</h2>
              <p className="text-sm text-gray-500 mt-1">用于回答“A 用户是否点击 1 商品、是否加购/结算、问了几个问题”。</p>
            </div>
            <span className="text-sm text-gray-500">{formatNumber(visitorRows.length)} 条用户商品关系</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-500">
                  <th className="py-3 pr-4 font-medium">访客 ID</th>
                  <th className="py-3 pr-4 font-medium">会话 / 设备</th>
                  <th className="py-3 pr-4 font-medium">商品</th>
                  <th className="py-3 pr-4 font-medium">点击</th>
                  <th className="py-3 pr-4 font-medium">进入来源</th>
                  <th className="py-3 pr-4 font-medium">停留</th>
                  <th className="py-3 pr-4 font-medium">加购</th>
                  <th className="py-3 pr-4 font-medium">结算</th>
                  <th className="py-3 pr-4 font-medium">聊天问题</th>
                  <th className="py-3 font-medium">最后行为</th>
                </tr>
              </thead>
              <tbody>
                {visitorRows.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="py-8 text-center text-gray-500">
                      暂无真实访问事件。先返回商城点击商品、加购或结算后，这里会自动出现数据。
                    </td>
                  </tr>
                ) : visitorRows.map((row) => (
                  <tr key={`${row.visitorId}-${row.asin}`} className="border-b border-gray-100">
                    <td className="py-3 pr-4 text-gray-700">
                      <span className="inline-block max-w-[180px] truncate align-bottom">{row.visitorId}</span>
                    </td>
                    <td className="py-3 pr-4 text-gray-700">
                      <div className="max-w-[180px] text-xs leading-5">
                        <div className="truncate">会话 {row.sessionId || '-'}</div>
                        <div className="truncate">设备 {row.userAgentHash || '-'}</div>
                        <div className="truncate">网络 {row.ipHash || '-'}</div>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="min-w-[260px]">
                        <div className="font-semibold text-gray-900 line-clamp-1">{row.productTitle}</div>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                          <span>ID {row.productId} · {row.asin}</span>
                          <span className={`rounded-full px-2 py-0.5 ${
                            row.experimentGroup === 'control'
                              ? 'bg-purple-50 text-purple-700'
                              : 'bg-blue-50 text-blue-700'
                          }`}>
                            {row.experimentGroupLabel}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-gray-700">{row.clicked ? '是' : '否'}</td>
                    <td className="py-3 pr-4 text-gray-700">
                      {row.entrySources.length > 0 ? row.entrySources.map(formatSource).join('、') : '未进入详情'}
                    </td>
                    <td className="py-3 pr-4 text-gray-700">{formatDuration(row.dwellMs)}</td>
                    <td className="py-3 pr-4 text-gray-700">{row.addToCart > 0 ? `是 (${row.addToCart})` : '否'}</td>
                    <td className="py-3 pr-4 text-gray-700">{row.checkoutClicks > 0 ? `是 (${row.checkoutClicks})` : '否'}</td>
                    <td className="py-3 pr-4 text-gray-700">{formatNumber(row.chatQuestions)}</td>
                    <td className="py-3 text-gray-700 whitespace-nowrap">
                      {row.lastSeen ? new Date(row.lastSeen).toLocaleString('zh-CN') : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
