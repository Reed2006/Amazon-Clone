import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#131921] text-white mt-auto">
      {/* Back to Top */}
      <div 
        className="bg-[#37475a] hover:bg-[#485769] text-center py-3 cursor-pointer transition-colors duration-200"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span className="text-sm font-medium">回到顶部</span>
      </div>

      {/* Main Footer Content */}
      <div className="bg-[#232f3e]">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 lg:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Get to Know Us */}
            <div>
              <h3 className="text-sm font-bold mb-3 sm:mb-4">了解我们</h3>
              <ul className="space-y-1 sm:space-y-2 text-sm">
                <li>
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    人才招聘
                  </button>
                </li>
                <li>
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    官方博客
                  </button>
                </li>
                <li>
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    关于 Amazona
                  </button>
                </li>
                <li>
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    投资者关系
                  </button>
                </li>
                <li className="hidden sm:list-item">
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    Amazona 设备
                  </button>
                </li>
                <li className="hidden sm:list-item">
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    Amazona 科学
                  </button>
                </li>
              </ul>
            </div>

            {/* Make Money with Us */}
            <div>
              <h3 className="text-sm font-bold mb-3 sm:mb-4">与我们合作</h3>
              <ul className="space-y-1 sm:space-y-2 text-sm">
                <li>
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    在 Amazona 销售商品
                  </button>
                </li>
                <li>
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    企业采购销售
                  </button>
                </li>
                <li>
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    销售应用与服务
                  </button>
                </li>
                <li>
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    加入联盟计划
                  </button>
                </li>
                <li className="hidden sm:list-item">
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    投放商品广告
                  </button>
                </li>
                <li className="hidden sm:list-item">
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    自助出版
                  </button>
                </li>
                <li className="hidden lg:list-item">
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    开设 Amazona Hub
                  </button>
                </li>
              </ul>
            </div>

            {/* Amazon Payment Products */}
            <div>
              <h3 className="text-sm font-bold mb-3 sm:mb-4">支付与账户</h3>
              <ul className="space-y-1 sm:space-y-2 text-sm">
                <li>
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    Amazona 商务卡
                  </button>
                </li>
                <li>
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    积分购物
                  </button>
                </li>
                <li>
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    充值账户余额
                  </button>
                </li>
                <li className="hidden sm:list-item">
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    货币换算工具
                  </button>
                </li>
              </ul>
            </div>

            {/* Let Us Help You */}
            <div>
              <h3 className="text-sm font-bold mb-3 sm:mb-4">帮助中心</h3>
              <ul className="space-y-1 sm:space-y-2 text-sm">
                <li>
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    购物安全提示
                  </button>
                </li>
                <li>
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    我的账户
                  </button>
                </li>
                <li>
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    我的订单
                  </button>
                </li>
                <li>
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    配送费与政策
                  </button>
                </li>
                <li className="hidden sm:list-item">
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    退换货服务
                  </button>
                </li>
                <li className="hidden lg:list-item">
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    管理内容与设备
                  </button>
                </li>
                <li className="hidden lg:list-item">
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    Amazona 助手
                  </button>
                </li>
                <li>
                  <button className="text-gray-300 hover:text-white hover:underline text-left">
                    帮助
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Amazona Logo and Language Selector */}
      <div className="border-t border-gray-700 bg-[#232f3e]">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            {/* Logo */}
            <div className="flex items-center justify-center sm:justify-start">
              <div className="text-xl sm:text-2xl font-bold">
                <span className="text-[#ff9900]">Amazona</span>
              </div>
            </div>

            {/* Language and Country Selector */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <button className="flex items-center space-x-2 border border-gray-600 rounded px-2 sm:px-3 py-1 hover:bg-gray-700 transition-colors duration-200 text-sm">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a18.705 18.705 0 01-3.107 2.027 1 1 0 11-.894-1.788 16.72 16.72 0 002.334-1.527c-.593-.899-1.13-1.846-1.604-2.82-.945.061-1.883.188-2.806.381a1 1 0 11-.364-1.965c1.04-.193 2.099-.328 3.17-.398V3a1 1 0 011-1zM9 8.5c.497.64 1.024 1.256 1.575 1.844.269-.328.525-.665.769-1.01.35-.494.682-1.01.995-1.548L9 8.5z" clipRule="evenodd" />
                </svg>
                <span>简体中文</span>
              </button>

              <button className="flex items-center space-x-2 border border-gray-600 rounded px-2 sm:px-3 py-1 hover:bg-gray-700 transition-colors duration-200 text-sm">
                <span>🇨🇳</span>
                <span className="hidden sm:inline">中国大陆</span>
                <span className="sm:hidden">CN</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="bg-[#131921]">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 sm:gap-6 text-xs">
            <div>
              <h4 className="font-semibold mb-1 sm:mb-2">Amazona Music</h4>
              <p className="text-gray-400">畅听海量音乐</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1 sm:mb-2">Amazona 广告</h4>
              <p className="text-gray-400">触达并吸引顾客</p>
            </div>
            <div className="hidden sm:block">
              <h4 className="font-semibold mb-1 sm:mb-2">特价服饰</h4>
              <p className="text-gray-400">发现品牌折扣</p>
            </div>
            <div className="hidden lg:block">
              <h4 className="font-semibold mb-1 sm:mb-2">二手图书</h4>
              <p className="text-gray-400">图书、艺术与收藏</p>
            </div>
            <div className="hidden lg:block">
              <h4 className="font-semibold mb-1 sm:mb-2">有声出版</h4>
              <p className="text-gray-400">轻松发布有声书</p>
            </div>
            <div className="hidden xl:block">
              <h4 className="font-semibold mb-1 sm:mb-2">在 Amazona 开店</h4>
              <p className="text-gray-400">开通卖家账户</p>
            </div>
            <div className="hidden xl:block">
              <h4 className="font-semibold mb-1 sm:mb-2">Amazona Business</h4>
              <p className="text-gray-400">企业采购服务</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#131921] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-400 space-y-2 sm:space-y-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start space-x-2 sm:space-x-4">
              <button className="hover:text-white">
                使用条件
              </button>
              <button className="hover:text-white">
                隐私声明
              </button>
              <button className="hover:text-white">
                基于兴趣的广告
              </button>
            </div>
            <div className="text-center sm:text-right">
              © 1996-2026, Amazona 中文演示站
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
