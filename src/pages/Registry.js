import React, { useState } from 'react';

const Registry = () => {
  const [activeTab, setActiveTab] = useState('create');

  const registryTypes = [
    {
      type: 'wedding',
      title: '婚礼心愿单',
      description: '与亲友分享婚礼所需物品',
      icon: '💒',
      benefits: ['免配送费', '补购优惠', '延长退换']
    },
    {
      type: 'baby',
      title: '宝宝心愿单',
      description: '为新生儿准备所需用品',
      icon: '👶',
      benefits: ['欢迎礼盒', '补购优惠', '通用清单']
    },
    {
      type: 'birthday',
      title: '生日清单',
      description: '为生日创建可分享的礼物清单',
      icon: '🎂',
      benefits: ['便捷分享', '惊喜保护', '多人合送']
    },
    {
      type: 'holiday',
      title: '节日清单',
      description: '把节日愿望分享给亲友',
      icon: '🎁',
      benefits: ['节日精选', '价格跟踪', '礼物推荐']
    }
  ];

  const sampleRegistries = [
    {
      id: 1,
      name: '林雨和周远的婚礼',
      type: '婚礼心愿单',
      date: '2026 年 9 月 18 日',
      items: 45,
      purchased: 23,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      name: '陈安的宝宝派对',
      type: '宝宝心愿单',
      date: '预产期 2026 年 10 月',
      items: 32,
      purchased: 18,
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      name: '李然的 30 岁生日',
      type: '生日清单',
      date: '2026 年 8 月 20 日',
      items: 12,
      purchased: 8,
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=300&h=200&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">心愿单与礼物清单</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">为婚礼、生日、新生儿和节日创建可分享清单</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-md p-1 w-full max-w-md sm:max-w-none">
            <div className="grid grid-cols-3 sm:flex">
              <button
                onClick={() => setActiveTab('create')}
                className={`px-2 sm:px-6 py-2 sm:py-3 rounded-md font-medium text-xs sm:text-base ${
                  activeTab === 'create' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                创建
              </button>
              <button
                onClick={() => setActiveTab('find')}
                className={`px-2 sm:px-6 py-2 sm:py-3 rounded-md font-medium text-xs sm:text-base ${
                  activeTab === 'find' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                查找
              </button>
              <button
                onClick={() => setActiveTab('manage')}
                className={`px-2 sm:px-6 py-2 sm:py-3 rounded-md font-medium text-xs sm:text-base ${
                  activeTab === 'manage' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                管理
              </button>
            </div>
          </div>
        </div>

        {/* Create Registry Tab */}
        {activeTab === 'create' && (
          <div>
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">选择清单类型</h2>
              <p className="text-sm sm:text-base text-gray-600">选择你想创建的心愿单场景</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {registryTypes.map(registry => (
                <div key={registry.type} className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{registry.icon}</div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{registry.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{registry.description}</p>
                    <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                      {registry.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center justify-center text-xs sm:text-sm text-gray-700">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {benefit}
                        </div>
                      ))}
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 px-3 sm:px-4 rounded-md hover:bg-blue-700 font-medium text-sm sm:text-base">
                      创建清单
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Getting Started */}
            <div className="bg-blue-50 rounded-lg p-4 sm:p-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">如何使用</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                  <div className="text-center">
                    <div className="bg-blue-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mx-auto mb-3 sm:mb-4">1</div>
                    <h4 className="font-semibold text-base sm:text-lg mb-2">创建清单</h4>
                    <p className="text-sm sm:text-base text-gray-600">选择清单类型并添加心仪商品</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mx-auto mb-3 sm:mb-4">2</div>
                    <h4 className="font-semibold text-base sm:text-lg mb-2">分享给亲友</h4>
                    <p className="text-sm sm:text-base text-gray-600">把清单链接发送给家人和朋友</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mx-auto mb-3 sm:mb-4">3</div>
                    <h4 className="font-semibold text-base sm:text-lg mb-2">接收礼物</h4>
                    <p className="text-sm sm:text-base text-gray-600">享受便捷配送和简单退换服务</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Find Registry Tab */}
        {activeTab === 'find' && (
          <div>
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">查找心愿单或礼物清单</h2>
                <p className="text-sm sm:text-base text-gray-600">通过姓名查找清单，为对方挑选合适礼物</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 sm:p-8">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      按姓名搜索
                    </label>
                    <input
                      type="text"
                      placeholder="输入姓名"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        省份/地区
                      </label>
                      <select className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
                        <option>选择地区</option>
                        <option>上海</option>
                        <option>北京</option>
                        <option>广东</option>
                        <option>浙江</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        清单类型
                      </label>
                      <select className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
                        <option>全部清单类型</option>
                        <option>婚礼</option>
                        <option>宝宝</option>
                        <option>生日</option>
                        <option>节日</option>
                      </select>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md hover:bg-blue-700 font-medium text-sm sm:text-base">
                    搜索清单
                  </button>
                </div>
              </div>

              {/* Sample Results */}
              <div className="mt-6 sm:mt-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">热门清单</h3>
                <div className="space-y-3 sm:space-y-4">
                  {sampleRegistries.map(registry => (
                    <div key={registry.id} className="bg-white rounded-lg shadow-md p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                      <img 
                        src={registry.image} 
                        alt={registry.name}
                        className="w-full sm:w-20 h-32 sm:h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 w-full">
                        <h4 className="font-semibold text-base sm:text-lg text-gray-900">{registry.name}</h4>
                        <p className="text-sm sm:text-base text-gray-600">{registry.type} • {registry.date}</p>
                        <div className="flex items-center mt-2">
                          <div className="bg-gray-200 rounded-full h-2 flex-1 mr-3 sm:mr-4">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(registry.purchased / registry.items) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                            {registry.purchased}/{registry.items} 件
                          </span>
                        </div>
                      </div>
                      <button className="w-full sm:w-auto bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-blue-700 text-sm sm:text-base">
                        查看清单
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Manage Registries Tab */}
        {activeTab === 'manage' && (
          <div>
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">我的心愿单与礼物清单</h2>
              <p className="text-sm sm:text-base text-gray-600">管理已经创建的心愿单和分享设置</p>
            </div>

            <div className="mb-4 sm:mb-6">
              <button className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-blue-700 font-medium text-sm sm:text-base">
                创建新清单
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {sampleRegistries.map(registry => (
                <div key={registry.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img 
                    src={registry.image} 
                    alt={registry.name}
                    className="w-full h-32 sm:h-48 object-cover"
                  />
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">{registry.name}</h3>
                        <p className="text-sm sm:text-base text-gray-600">{registry.type}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{registry.date}</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>

                    <div className="mb-3 sm:mb-4">
                      <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
                        <span>完成进度</span>
                        <span>{registry.purchased}/{registry.items} 件</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(registry.purchased / registry.items) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-3 sm:px-4 rounded-md hover:bg-blue-700 text-sm sm:text-base">
                        管理清单
                      </button>
                      <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 sm:px-4 rounded-md hover:bg-gray-50 text-sm sm:text-base">
                        分享
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registry;
