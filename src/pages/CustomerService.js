import React, { useState } from 'react';
import StockChatModal from '../components/StockChatModal';

const CustomerService = () => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showChat, setShowChat] = useState(false);

  const helpTopics = [
    { id: 'orders', title: '我的订单', description: '查询包裹、查看订单详情或申请退换货' },
    { id: 'shipping', title: '配送与收货', description: '配送方式、物流跟踪和收货问题' },
    { id: 'returns', title: '退货与退款', description: '发起退货、查看退款进度或打印退货标签' },
    { id: 'account', title: '账户与登录', description: '找回密码、账户设置和登录帮助' },
    { id: 'payments', title: '支付方式', description: '添加或修改支付方式，处理账单问题' },
    { id: 'prime', title: 'Prime 会员', description: '会员权益、扣费和续费问题' },
    { id: 'devices', title: '设备支持', description: 'Kindle、Echo、Fire TV 等设备帮助' },
    { id: 'other', title: '其他问题', description: '不属于以上分类的其他咨询' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">客户服务</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">今天需要我们帮你处理什么问题？</p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">常用服务</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <button className="flex items-center p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="bg-blue-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-sm sm:text-base text-gray-900">查看物流</h3>
                <p className="text-xs sm:text-sm text-gray-600">获取实时配送进度</p>
              </div>
            </button>

            <button className="flex items-center p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="bg-green-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-sm sm:text-base text-gray-900">退换商品</h3>
                <p className="text-xs sm:text-sm text-gray-600">发起退货或换货申请</p>
              </div>
            </button>

            <button 
              onClick={() => setShowChat(true)}
              className="flex items-center p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors sm:col-span-2 lg:col-span-1">
              <div className="bg-yellow-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-sm sm:text-base text-gray-900">在线客服</h3>
                <p className="text-xs sm:text-sm text-gray-600">即时获取帮助</p>
              </div>
            </button>
          </div>
        </div>

        {/* Help Topics */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">按主题查找帮助</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {helpTopics.map(topic => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`p-3 sm:p-4 text-left border rounded-lg hover:border-blue-500 transition-colors ${
                  selectedTopic === topic.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="font-semibold text-sm sm:text-base text-gray-900 mb-1">{topic.title}</div>
                <div className="text-xs sm:text-sm text-gray-600">{topic.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Contact Options */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">联系我们</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center p-4 sm:p-6 border border-gray-200 rounded-lg">
              <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">电话支持</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">与客服专员通话处理问题</p>
              <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-blue-700 text-sm sm:text-base">
                立即致电
              </button>
            </div>

            <div className="text-center p-4 sm:p-6 border border-gray-200 rounded-lg">
              <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">在线聊天</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">与客服团队在线沟通</p>
              <button 
                onClick={() => setShowChat(true)}
                className="bg-green-600 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-green-700 text-sm sm:text-base"
              >
                开始聊天
              </button>
            </div>

            <div className="text-center p-4 sm:p-6 border border-gray-200 rounded-lg sm:col-span-2 lg:col-span-1">
              <div className="bg-orange-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">邮件支持</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">发送邮件，通常 24 小时内回复</p>
              <button className="bg-orange-600 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-orange-700 text-sm sm:text-base">
                发送邮件
              </button>
            </div>
          </div>
        </div>

        <StockChatModal
          open={showChat}
          onClose={() => setShowChat(false)}
          source="customer-service"
        />
      </div>
    </div>
  );
};

export default CustomerService;
