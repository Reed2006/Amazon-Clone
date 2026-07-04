import React, { useState } from 'react';
import { formatCny } from '../utils/locale';

const Sell = () => {
  const [activeTab, setActiveTab] = useState('individual');

  const benefits = [
    {
      icon: '🌐',
      title: '触达海量顾客',
      description: '把商品展示给更多线上购物用户'
    },
    {
      icon: '📦',
      title: 'Amazon 物流服务',
      description: '仓储、打包和配送可交给平台处理'
    },
    {
      icon: '🛡️',
      title: '可信赖的平台',
      description: '借助成熟电商平台建立顾客信任'
    },
    {
      icon: '📊',
      title: '经营工具',
      description: '使用数据分析、广告和库存管理工具'
    }
  ];

  const sellingSteps = [
    {
      step: 1,
      title: '创建卖家账户',
      description: '注册账户并提交必要的经营信息'
    },
    {
      step: 2,
      title: '发布商品',
      description: '上传图片、描述和具有竞争力的价格'
    },
    {
      step: 3,
      title: '开始销售',
      description: '管理订单、处理服务并持续扩展业务'
    }
  ];

  const categories = [
    '电子数码', '图书', '家居厨房', '服饰', '运动户外',
    '个护健康', '玩具游戏', '汽车用品', '手工艺', '母婴用品'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#232f3e] to-[#146eb4] text-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">在 Amazon 开店</h1>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
              面向线上顾客发布商品，使用订单、物流和广告工具管理业务。
              适合个人卖家和成长中的品牌团队。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-md text-base sm:text-lg">
                立即开始销售
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-md text-base sm:text-lg">
                了解开店资料
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-8 sm:py-12">
        {/* Selling Plans */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">选择销售计划</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">根据业务规模选择合适的入驻方式</p>
          </div>

          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="bg-white rounded-lg shadow-md p-1 w-full max-w-md sm:max-w-none">
              <div className="grid grid-cols-2 sm:flex">
                <button
                  onClick={() => setActiveTab('individual')}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-md font-medium text-sm sm:text-base ${
                    activeTab === 'individual' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  个人计划
                </button>
                <button
                  onClick={() => setActiveTab('professional')}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-md font-medium text-sm sm:text-base ${
                    activeTab === 'professional' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  专业计划
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {/* Individual Plan */}
            <div className={`bg-white rounded-lg shadow-lg p-6 sm:p-8 ${activeTab === 'individual' ? 'border-2 border-blue-500' : 'border border-gray-200'}`}>
              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">个人计划</h3>
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">{formatCny(0.99)}</div>
                <div className="text-sm sm:text-base text-gray-600">每售出一件</div>
              </div>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <li className="flex items-center text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  无月度订阅费
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  可在多数品类销售
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  逐个发布商品
                </li>
                <li className="flex items-center text-gray-500 text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  高级销售工具
                </li>
              </ul>
              <button className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-md font-medium text-sm sm:text-base ${
                activeTab === 'individual' 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                开始使用
              </button>
            </div>

            {/* Professional Plan */}
            <div className={`bg-white rounded-lg shadow-lg p-6 sm:p-8 relative ${activeTab === 'professional' ? 'border-2 border-blue-500' : 'border border-gray-200'}`}>
              <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
                推荐
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">专业计划</h3>
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">{formatCny(39.99)}</div>
                <div className="text-sm sm:text-base text-gray-600">每月</div>
              </div>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <li className="flex items-center text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  无逐件销售服务费
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  可在全部开放品类销售
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  批量发布工具
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  高级数据分析与报表
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  广告工具
                </li>
              </ul>
              <button className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-md font-medium text-sm sm:text-base ${
                activeTab === 'professional' 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                开始试用
              </button>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">为什么在 Amazon 销售？</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">使用成熟工具管理商品、订单和增长</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{benefit.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">开店流程</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">几个步骤即可开始发布商品</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sellingSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6">
                  {step.step}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{step.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">可以销售哪些商品？</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">浏览适合入驻的热门品类</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-3 sm:p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="font-semibold text-gray-900 text-sm sm:text-base">{category}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#232f3e] to-[#ff9900] rounded-lg p-6 sm:p-8 lg:p-12 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">准备开始 Amazon 业务了吗？</h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8">创建卖家账户，发布商品并开始管理线上订单</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-md text-base sm:text-lg">
              今天开始销售
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-md text-base sm:text-lg">
              查看更多
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;
