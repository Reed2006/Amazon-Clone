import React, { useState } from 'react';

const Sidebar = ({ onCategoryFilter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    {
      title: "电子数码",
      subcategories: [
        { name: "电脑与笔记本", filter: "electronics-computers" },
        { name: "手机通讯", filter: "electronics-phones" },
        { name: "耳机与音响", filter: "electronics-audio" },
        { name: "游戏娱乐", filter: "electronics-gaming" },
        { name: "智能家居设备", filter: "electronics-smart" }
      ]
    },
    {
      title: "图书",
      subcategories: [
        { name: "小说文学", filter: "books-fiction" },
        { name: "非虚构图书", filter: "books-nonfiction" },
        { name: "教材教辅", filter: "books-textbooks" },
        { name: "儿童图书", filter: "books-children" }
      ]
    },
    {
      title: "家居厨房",
      subcategories: [
        { name: "家具", filter: "home-furniture" },
        { name: "厨房与餐厨", filter: "home-kitchen" },
        { name: "家居装饰", filter: "home-decor" },
        { name: "床品卫浴", filter: "home-bedding" },
        { name: "收纳整理", filter: "home-storage" }
      ]
    },
    {
      title: "服饰配件",
      subcategories: [
        { name: "男装", filter: "clothing-men" },
        { name: "女装", filter: "clothing-women" },
        { name: "童装", filter: "clothing-kids" },
        { name: "鞋履", filter: "clothing-shoes" },
        { name: "珠宝腕表", filter: "clothing-jewelry" }
      ]
    },
    {
      title: "运动户外",
      subcategories: [
        { name: "运动健身", filter: "sports-fitness" },
        { name: "户外装备", filter: "sports-outdoor" },
        { name: "团队运动", filter: "sports-team" },
        { name: "水上运动", filter: "sports-water" }
      ]
    },
    {
      title: "个护健康",
      subcategories: [
        { name: "护肤", filter: "beauty-skincare" },
        { name: "彩妆香水", filter: "beauty-makeup" },
        { name: "健康护理", filter: "beauty-health" },
        { name: "个人护理", filter: "beauty-personal" }
      ]
    },
    {
      title: "工具与家装",
      subcategories: [
        { name: "电动工具", filter: "tools-power" },
        { name: "手动工具", filter: "tools-hand" },
        { name: "五金配件", filter: "tools-hardware" },
        { name: "电工电料", filter: "tools-electrical" }
      ]
    },
    {
      title: "玩具游戏",
      subcategories: [
        { name: "手办与娃娃", filter: "toys-figures" },
        { name: "桌游与拼图", filter: "toys-board" },
        { name: "益智玩具", filter: "toys-educational" },
        { name: "户外玩具", filter: "toys-outdoor" }
      ]
    }
  ];

  const handleSubcategoryClick = (filter) => {
    if (onCategoryFilter) {
      onCategoryFilter(filter);
    }
    // Close mobile sidebar after selection
    setIsOpen(false);
  };

  const handleQuickLinkClick = (linkType) => {
    // Handle quick links functionality
    if (onCategoryFilter) {
      switch (linkType) {
        case 'bestsellers':
          onCategoryFilter('bestsellers');
          break;
        case 'new-releases':
          onCategoryFilter('new-releases');
          break;
        case 'deals':
          onCategoryFilter('deals');
          break;
        default:
          onCategoryFilter('all');
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-20 sm:top-24 left-2 sm:left-4 z-50 bg-[#232f3e] text-white p-2 rounded shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static lg:translate-x-0 top-0 left-0 h-full w-72 sm:w-80 lg:w-64 xl:w-72
        bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        overflow-y-auto
      `}>
        {/* Sidebar Header */}
        <div className="bg-[#232f3e] text-white p-3 sm:p-4 lg:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold">浏览分类</h2>
            <button onClick={() => setIsOpen(false)}>
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <h2 className="hidden lg:block text-base lg:text-lg font-bold text-gray-900 mb-4">按分类选购</h2>
          
          {/* Show All Products Button */}
          <button
            onClick={() => handleSubcategoryClick('all')}
            className="w-full mb-4 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-medium py-2 px-3 sm:px-4 rounded-md transition-colors duration-200 text-sm sm:text-base"
          >
            查看全部商品
          </button>
          
          {/* Categories */}
          <div className="space-y-1 sm:space-y-2">
            {categories.map((category, index) => (
              <CategoryItem 
                key={index} 
                category={category} 
                onSubcategoryClick={handleSubcategoryClick}
              />
            ))}
          </div>

          {/* Additional Links */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">快捷入口</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleQuickLinkClick('bestsellers')}
                  className="text-blue-600 hover:text-blue-800 hover:underline text-left w-full py-1"
                >
                  畅销榜
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLinkClick('new-releases')}
                  className="text-blue-600 hover:text-blue-800 hover:underline text-left w-full py-1"
                >
                  新品上架
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLinkClick('deals')}
                  className="text-blue-600 hover:text-blue-800 hover:underline text-left w-full py-1"
                >
                  今日特惠
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLinkClick('reviews')}
                  className="text-blue-600 hover:text-blue-800 hover:underline text-left w-full py-1"
                >
                  高评价商品
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLinkClick('gifts')}
                  className="text-blue-600 hover:text-blue-800 hover:underline text-left w-full py-1"
                >
                  送礼精选
                </button>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">帮助与设置</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="text-gray-600 hover:text-gray-800 text-left w-full py-1">
                  我的账户
                </button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-gray-800 text-left w-full py-1">
                  客户服务
                </button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-gray-800 text-left w-full py-1">
                  登录
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

// Category Item Component with Expandable Subcategories
const CategoryItem = ({ category, onSubcategoryClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        className="w-full flex items-center justify-between py-2 sm:py-3 text-left hover:bg-gray-50 focus:outline-none px-2 sm:px-0"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-sm font-medium text-gray-900">{category.title}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isExpanded && (
        <div className="pb-2 sm:pb-3 pl-2 sm:pl-4">
          <ul className="space-y-1 sm:space-y-2">
            {category.subcategories.map((subcategory, index) => (
              <li key={index}>
                <button 
                  onClick={() => onSubcategoryClick(subcategory.filter)}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline text-left w-full py-1"
                >
                  {subcategory.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
