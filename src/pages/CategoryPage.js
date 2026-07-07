import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { amazonCategories, amazonProducts, getCategoryById } from '../data/amazonProducts';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const category = getCategoryById(categoryId);
  const products = amazonProducts
    .filter((product) => product.categoryId === categoryId)
    .sort((a, b) => (
      (a.sourceIndex || a.id) - (b.sourceIndex || b.id) ||
      a.id - b.id
    ));

  if (!category) {
    return (
      <div className="min-h-screen bg-[#eaeded] py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-md p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">没有找到这个分类</h1>
          <p className="text-gray-600 mb-6">请从全部分类中重新选择。</p>
          <Link to="/" className="inline-block bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 px-5 py-2 rounded-md font-semibold">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaeded]">
      <section className="bg-[#232f3e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="text-sm text-gray-200 mb-3">
            <Link to="/" className="hover:text-[#febd69]">首页</Link>
            <span className="mx-2">/</span>
            <span>全部分类</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-center">
            <div>
              <p className="text-[#febd69] font-semibold mb-2">分类精选</p>
              <h1 className="text-3xl sm:text-4xl font-bold">{category.title}</h1>
              <p className="mt-3 text-gray-100 max-w-2xl">{category.subtitle}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-sm">
                {amazonCategories.map((item) => (
                  <Link
                    key={item.id}
                    to={`/category/${item.id}`}
                    className={`px-3 py-1.5 rounded border ${
                      item.id === category.id
                        ? 'bg-[#febd69] text-gray-900 border-[#febd69]'
                        : 'border-white/40 text-white hover:border-[#febd69]'
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            <img src={category.image} alt={category.title} className="hidden lg:block w-full h-44 object-cover rounded-md" />
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
        <div className="bg-white rounded-md p-4 sm:p-5 shadow-sm mb-5">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">该分类共 {products.length} 件商品</h2>
              <p className="text-sm text-gray-600 mt-1">点击商品卡片可进入完整中文详情页。</p>
            </div>
            <Link to="/" className="text-sm text-blue-700 hover:text-orange-700">返回首页推荐</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {products.map((product) => (
            <ProductCard key={product.asin} product={product} entrySource="category-page" />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
