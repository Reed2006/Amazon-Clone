import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { amazonCategories, amazonProducts } from '../data/amazonProducts';
import { getSearchText } from '../utils/locale';

const ProductGrid = ({ categoryFilter, onClearFilter, searchQuery, searchCategory }) => {
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredProducts = useMemo(() => {
    let products = amazonProducts;

    if (searchQuery && searchQuery.trim() !== '') {
      products = products.filter(product => {
        const searchText = getSearchText(product);
        const query = searchQuery.toLowerCase();
        
        if (searchCategory && searchCategory !== '全部') {
          const categoryMap = {
            '睡眠智能': ['睡眠', '家庭智能', 'hatch', 'yoto', 'toniebox', 'nanit', 'skylight'],
            '宠物智能': ['宠物', '猫砂盆', '摄像头', 'gps', '喂食器', 'furbo', 'tractive', 'whistle'],
            '厨房创新': ['厨房', '冷饮', '冰沙', '冰淇淋', '空气炸', '披萨', 'ninja', 'ooni'],
            '清洁家居': ['清洁', '地毯', '污渍', 'bissell', 'shark', 'hoover', 'ruggable'],
            '美容恢复': ['美容', '恢复', 'led', '红光', '面罩', '桑拿', 'therabody']
          };
          const keywords = categoryMap[searchCategory] || [searchCategory.toLowerCase()];
          const categoryMatch = keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
          return searchText.includes(query) && categoryMatch;
        }
        
        return searchText.includes(query);
      });
    }

    if (!categoryFilter || categoryFilter === 'all') {
      return products;
    }
    
    if (categoryFilter === 'bestsellers') return products.filter(product => product.rating >= 4.6);
    if (categoryFilter === 'deals') return products.filter(product => product.price <= 199);
    if (categoryFilter === 'reviews') return products.filter(product => product.reviewCount >= 5000);
    return products.filter(product => product.categoryId === categoryFilter);
  }, [categoryFilter, searchQuery, searchCategory]);

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    
    switch (sortBy) {
      case 'price-low':
        return products.sort((a, b) => a.price - b.price);
      case 'price-high':
        return products.sort((a, b) => b.price - a.price);
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return products.sort((a, b) => b.id - a.id);
      default:
        return products;
    }
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryDisplayName = () => {
    if (searchQuery && searchQuery.trim() !== '') {
      return `Search results for "${searchQuery}"`;
    }
    
    if (!categoryFilter || categoryFilter === 'all') return '全部商品';
    
    const categoryNames = amazonCategories.reduce((names, category) => {
      names[category.id] = category.title;
      return names;
    }, {
      bestsellers: '高评分精选',
      deals: '参考价低于 ¥1,500',
      reviews: '高评价商品'
    });
    
    return categoryNames[categoryFilter] || '商品';
  };

  return (
    <div className="flex-1 p-2 sm:p-4">
      {/* Header and Sorting */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            {searchQuery && searchQuery.trim() !== '' ? `“${searchQuery}”的搜索结果` : getCategoryDisplayName()}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            共 {sortedProducts.length} 件商品
            {categoryFilter && categoryFilter !== 'all' && (
              <button 
                onClick={() => onClearFilter && onClearFilter('all')} 
                className="ml-2 text-blue-600 hover:text-blue-800 text-sm underline"
              >
                清除筛选
              </button>
            )}
          </p>
        </div>
        
        <div className="w-full sm:w-auto">
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
            排序：
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="featured">综合推荐</option>
            <option value="price-low">价格从低到高</option>
            <option value="price-high">价格从高到低</option>
            <option value="rating">用户评分</option>
            <option value="newest">新品优先</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              entrySource={searchQuery && searchQuery.trim() !== '' ? 'search-results' : 'product-grid'}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 sm:py-12">
          <div className="mb-4">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">没有找到匹配商品</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 px-4">
            当前搜索或分类没有结果，可以换个关键词或清除筛选。
          </p>
          <button
            onClick={() => onClearFilter && onClearFilter('all')}
            className="bg-orange-400 hover:bg-orange-500 text-gray-900 font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            查看全部商品
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-2 sm:px-3 py-2 rounded-md text-sm ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="hidden sm:inline">上一页</span>
            <span className="sm:hidden">上页</span>
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            // Show only a few pages around current page
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-2 sm:px-3 py-2 rounded-md text-sm ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            } else if (
              page === currentPage - 2 ||
              page === currentPage + 2
            ) {
              return (
                <span key={page} className="px-1 sm:px-2 py-2 text-gray-500 text-sm">
                  ...
                </span>
              );
            }
            return null;
          })}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-2 sm:px-3 py-2 rounded-md text-sm ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="hidden sm:inline">下一页</span>
            <span className="sm:hidden">下页</span>
          </button>
        </div>
      )}

      {/* Results Summary */}
      <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-600">
        正在显示第 {startIndex + 1}-{Math.min(endIndex, sortedProducts.length)} 件，共 {sortedProducts.length} 件
      </div>
    </div>
  );
};

export default ProductGrid;
