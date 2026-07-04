import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductGrid from '../components/ProductGrid';
import { amazonCategories, amazonProducts } from '../data/amazonProducts';
import { recordEvent } from '../utils/analytics';

const Home = ({ searchQuery, searchCategory }) => {
  const hasSearch = searchQuery && searchQuery.trim() !== '';

  if (hasSearch) {
    return (
      <div className="min-h-screen bg-[#eaeded]">
        <div className="max-w-7xl mx-auto">
          <ProductGrid
            categoryFilter="all"
            searchQuery={searchQuery}
            searchCategory={searchCategory}
          />
        </div>
      </div>
    );
  }

  const featuredProducts = amazonProducts.slice(0, 4);

  return (
    <div id="top" className="min-h-screen bg-[#eaeded]">
      <section className="relative bg-[#0f1720] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1800&h=760&fit=crop"
            alt="Amazon 风格购物首页背景"
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1720] via-[#0f1720]/85 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
          <div className="max-w-3xl">
            <p className="text-sm sm:text-base text-[#febd69] font-semibold mb-3">Prime 智能生活季</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              家庭智能、宠物看护、厨房新品限时上新
            </h1>
            <p className="text-base sm:text-lg text-gray-100 max-w-2xl">
              从睡眠唤醒到宠物定位，从冰沙甜品到深层清洁，精选 5 大生活场景热卖商品。现在浏览分类，发现适合你家的智能装备。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#category-sleep-smart-home"
                className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 px-5 py-2 rounded-md font-semibold"
              >
                立即选购
              </a>
              <a
                href="#pdf-products"
                className="border border-white/70 hover:bg-white hover:text-[#131921] text-white px-5 py-2 rounded-md font-semibold"
              >
                查看全部商品
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 -mt-6 relative z-10">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {featuredProducts.map((product) => (
            <Link
              key={product.asin}
              to={`/product/${product.asin}`}
              state={{ entrySource: 'homepage-featured' }}
              onClick={() => recordEvent('product_click', {
                asin: product.asin,
                productId: product.id,
                productTitle: product.title,
                categoryId: product.categoryId,
                source: 'homepage-featured'
              })}
              className="bg-white rounded-md p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
              <h2 className="text-base font-bold text-gray-900 line-clamp-2 mb-3">{product.title}</h2>
              <img src={product.image} alt={product.title} className="h-32 w-full object-cover rounded" />
              <div className="mt-3 text-sm text-blue-700 hover:text-orange-700">查看详情</div>
            </Link>
          ))}
        </section>

        <section className="bg-white rounded-md p-4 sm:p-5 shadow-sm mb-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">按分类选购</h2>
              <p className="text-sm text-gray-600">五大生活场景专区，每个专区精选 5 件热卖商品。</p>
            </div>
            <span className="hidden sm:inline text-sm text-gray-500">5 个分类 · 25 件商品</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {amazonCategories.map((category) => (
              <a
                key={category.id}
                href={`#category-${category.id}`}
                className="group rounded-md overflow-hidden border border-gray-200 bg-gray-50 hover:border-[#ff9900]"
              >
                <img src={category.image} alt={category.title} className="h-28 w-full object-cover group-hover:scale-[1.02] transition-transform" />
                <div className="p-3">
                  <h3 className="font-bold text-gray-900">{category.title}</h3>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{category.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <div id="pdf-products" className="space-y-6 pb-10">
          {amazonCategories.map((category) => {
            const categoryProducts = amazonProducts.filter((product) => product.categoryId === category.id);

            return (
              <section key={category.id} id={`category-${category.id}`} className="bg-white rounded-md p-4 sm:p-5 shadow-sm scroll-mt-28">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{category.title}</h2>
                    <p className="text-sm text-gray-600 mt-1">{category.subtitle}</p>
                  </div>
                  <a href="#top" className="text-sm text-blue-700 hover:text-orange-700">回到顶部</a>
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.asin} product={product} entrySource="homepage" />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
