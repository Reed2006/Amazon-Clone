import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { amazonCategories } from '../data/amazonProducts';

const Navbar = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('全部');
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery, searchCategory);
    }
    navigate('/');
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value, searchCategory);
    }
  };

  return (
    <nav className="bg-[#131921] text-white shadow-sm relative z-30">
      {/* Main Navigation Bar */}
      <div className="bg-[#131921] border-b border-[#2a3441]">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <div className="text-lg sm:text-2xl font-bold">
                <span className="text-[#ff9900]">amazona</span><span className="text-xs sm:text-sm text-gray-200">.cn</span>
              </div>
            </Link>

            {/* Delivery Location - Hidden on mobile */}
            <div className="hidden lg:flex items-center text-sm">
              <div className="flex flex-col">
                <span className="text-gray-300 text-xs">配送至</span>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold">中国大陆</span>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-2 sm:mx-4">
              <form onSubmit={handleSearch} className="flex">
                <select 
                  className="hidden sm:block bg-gray-200 text-gray-900 px-2 sm:px-3 py-2 rounded-l-md border-r border-gray-300 focus:outline-none text-sm"
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                >
                  <option>全部</option>
                  <option>睡眠智能</option>
                  <option>宠物智能</option>
                  <option>厨房创新</option>
                  <option>清洁家居</option>
                  <option>美容恢复</option>
                </select>
                <input
                  type="text"
                  placeholder="搜索 amazona.cn 商品"
                  className="flex-1 px-2 sm:px-4 py-2 text-gray-900 focus:outline-none text-sm sm:text-base rounded-l-md sm:rounded-l-none"
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                <button 
                  type="submit"
                  className="bg-[#febd69] hover:bg-[#f3a847] px-3 sm:px-4 py-2 rounded-r-md text-gray-900"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Right Side Menu */}
            <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
              {/* Language - Hidden on mobile and tablet */}
              <div className="hidden lg:flex items-center text-sm">
                <span className="mr-1">🇨🇳</span>
                <span>中文</span>
              </div>

              {/* Account & Lists - Hidden on mobile */}
              <div className="hidden md:flex flex-col text-sm">
                <span className="text-xs">您好，请登录</span>
                <span className="font-bold">账户与清单</span>
              </div>

              {/* Returns & Orders - Hidden on mobile */}
              <div className="hidden lg:flex flex-col text-sm">
                <span className="text-xs">退换货</span>
                <span className="font-bold">与订单</span>
              </div>

              {/* Cart */}
              <Link to="/cart" className="flex items-center relative">
                <div className="relative">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6H19" />
                  </svg>
                  {getCartItemsCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#f08804] text-black text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold">
                      {getCartItemsCount()}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline ml-1 text-sm font-bold">购物车</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-1"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Navigation Bar */}
      <div className="bg-[#232f3e]">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center h-10 space-x-2 sm:space-x-4 lg:space-x-6 text-sm overflow-x-auto">
            <button
              className="flex items-center space-x-1 hover:border border-white px-2 py-1 whitespace-nowrap"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              aria-expanded={isCategoryOpen}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>全部分类</span>
            </button>
            <Link to="/deals" className="hover:border border-white px-2 py-1 whitespace-nowrap">今日特惠</Link>
            <Link to="/customer-service" className="hover:border border-white px-2 py-1 whitespace-nowrap hidden sm:block">客户服务</Link>
            <Link to="/registry" className="hover:border border-white px-2 py-1 whitespace-nowrap hidden md:block">心愿单</Link>
            <Link to="/gift-cards" className="hover:border border-white px-2 py-1 whitespace-nowrap hidden md:block">礼品卡</Link>
            <Link to="/sell" className="hover:border border-white px-2 py-1 whitespace-nowrap hidden lg:block">我要开店</Link>
            <Link to="/admin" className="hover:border border-white px-2 py-1 whitespace-nowrap hidden lg:block">数据看板</Link>
          </div>
        </div>
      </div>

      {isCategoryOpen && (
        <div className="absolute left-0 right-0 top-full bg-white text-gray-900 shadow-2xl border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">全部分类</h2>
                <p className="text-sm text-gray-600">按睡眠、宠物、厨房、清洁、美容恢复快速浏览精选商品。</p>
              </div>
              <button
                onClick={() => setIsCategoryOpen(false)}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                关闭
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {amazonCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  onClick={() => setIsCategoryOpen(false)}
                  className="group border border-gray-200 rounded-md overflow-hidden bg-gray-50 hover:border-[#ff9900] hover:shadow-md"
                >
                  <img src={category.image} alt={category.title} className="h-24 w-full object-cover group-hover:scale-[1.02] transition-transform" />
                  <div className="p-3">
                    <div className="font-bold text-gray-900">{category.title}</div>
                    <div className="text-xs text-gray-600 mt-1 line-clamp-2">{category.subtitle}</div>
                    <div className="text-xs text-blue-700 mt-2">查看 5 件商品</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#232f3e] border-t border-gray-700">
          <div className="px-4 py-2 space-y-2">
            <Link to="/" className="block py-3 hover:bg-gray-700 px-3 rounded text-base" onClick={() => setIsMenuOpen(false)}>首页</Link>
            <Link to="/cart" className="block py-3 hover:bg-gray-700 px-3 rounded text-base" onClick={() => setIsMenuOpen(false)}>
              购物车 ({getCartItemsCount()})
            </Link>
            <Link to="/deals" className="block py-3 hover:bg-gray-700 px-3 rounded text-base" onClick={() => setIsMenuOpen(false)}>今日特惠</Link>
            <Link to="/customer-service" className="block py-3 hover:bg-gray-700 px-3 rounded text-base" onClick={() => setIsMenuOpen(false)}>客户服务</Link>
            <Link to="/registry" className="block py-3 hover:bg-gray-700 px-3 rounded text-base" onClick={() => setIsMenuOpen(false)}>心愿单</Link>
            <Link to="/gift-cards" className="block py-3 hover:bg-gray-700 px-3 rounded text-base" onClick={() => setIsMenuOpen(false)}>礼品卡</Link>
            <Link to="/sell" className="block py-3 hover:bg-gray-700 px-3 rounded text-base" onClick={() => setIsMenuOpen(false)}>我要开店</Link>
            <Link to="/admin" className="block py-3 hover:bg-gray-700 px-3 rounded text-base" onClick={() => setIsMenuOpen(false)}>数据看板</Link>
            <div className="border-t border-gray-600 pt-2 mt-2">
              <div className="px-3 py-2 text-sm text-gray-300">全部分类</div>
              {amazonCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="block py-2 hover:bg-gray-700 px-3 rounded text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.title}
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-600 pt-2 mt-2">
              <div className="block py-3 hover:bg-gray-700 px-3 rounded text-base">账户与清单</div>
              <div className="block py-3 hover:bg-gray-700 px-3 rounded text-base">退换货与订单</div>
              <div className="flex items-center py-3 px-3 text-base">
                <span className="mr-2">🇨🇳</span>
                <span>简体中文 - CN</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
