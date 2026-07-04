import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { amazonCategories, amazonProducts } from '../data/amazonProducts';
import { clearEvents, formatDuration, summarizeAnalytics } from '../utils/analytics';

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

  useEffect(() => {
    const refresh = () => setRefreshKey((key) => key + 1);
    window.addEventListener('analytics-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('analytics-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const analytics = summarizeAnalytics(amazonProducts, amazonCategories);

  const productRows = [...analytics.productRows]
    .sort((a, b) => (
      b.checkoutClicks - a.checkoutClicks ||
      b.addToCart - a.addToCart ||
      b.detailViews - a.detailViews ||
      b.clicks - a.clicks
    ));

  const visitorRows = [...analytics.visitorProductRows]
    .sort((a, b) => new Date(b.lastSeen || 0) - new Date(a.lastSeen || 0));

  const maxCategoryClicks = Math.max(1, ...analytics.categoryRows.map((category) => category.clicks));

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <header className="bg-[#131921] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <p className="text-[#febd69] text-sm font-semibold mb-2">运营中心</p>
              <h1 className="text-2xl sm:text-3xl font-bold">智能生活商城数据看板</h1>
              <p className="text-sm text-gray-300 mt-2">读取本站真实前端访问事件，按访客、商品和来源聚合。</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link to="/" className="border border-white/40 hover:border-[#febd69] px-3 py-2 rounded">
                返回商城
              </Link>
              <button
                type="button"
                onClick={() => {
                  clearEvents();
                  setRefreshKey((key) => key + 1);
                }}
                className="bg-[#febd69] text-gray-900 px-3 py-2 rounded font-semibold"
              >
                清空本地数据
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {[
            { label: '访客数', value: formatNumber(analytics.visitorCount), note: '匿名本地 ID' },
            { label: '商品点击', value: formatNumber(analytics.totals.productClicks), note: '卡片/推荐点击' },
            { label: '详情访问', value: formatNumber(analytics.totals.detailViews), note: '进入商品页' },
            { label: '平均停留', value: formatDuration(analytics.totals.avgDwellMs), note: '商品详情页' },
            { label: '加购次数', value: formatNumber(analytics.totals.addToCart), note: '按商品记录' },
            { label: '结算点击', value: formatNumber(analytics.totals.checkoutClicks), note: '去结算/一键购买' }
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
              <span className="text-xs bg-[#232f3e] text-white px-2 py-1 rounded">真实事件</span>
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
            <p className="text-sm text-gray-500 mt-1 mb-4">访客 ID 和事件只保存在当前浏览器，不向外部服务器发送。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                '访客唯一 ID',
                '商品唯一 ID / ASIN',
                '商品点击记录',
                '详情页进入来源',
                '详情页停留时长',
                '是否加入购物车',
                '是否点击结算',
                '聊天问题数量'
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
                  <th className="py-3 font-medium">聊天</th>
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
                          <div className="text-xs text-gray-500">ID {product.productId} · {product.asin}</div>
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
                    <td className="py-3 text-gray-700">{formatNumber(product.chatQuestions)}</td>
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
                    <td colSpan="9" className="py-8 text-center text-gray-500">
                      暂无真实访问事件。先返回商城点击商品、加购或结算后，这里会自动出现数据。
                    </td>
                  </tr>
                ) : visitorRows.map((row) => (
                  <tr key={`${row.visitorId}-${row.asin}`} className="border-b border-gray-100">
                    <td className="py-3 pr-4 text-gray-700">
                      <span className="inline-block max-w-[180px] truncate align-bottom">{row.visitorId}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="min-w-[260px]">
                        <div className="font-semibold text-gray-900 line-clamp-1">{row.productTitle}</div>
                        <div className="text-xs text-gray-500">ID {row.productId} · {row.asin}</div>
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
