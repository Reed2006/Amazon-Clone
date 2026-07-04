import React, { useEffect, useState } from 'react';
import { recordEvent } from '../utils/analytics';

const supportEmail = 'reedhe2006@gmail.com';

const StockChatModal = ({ open, onClose, product, source = 'unknown' }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!open) return;
    setChatOpen(false);
    setMessage('');
    setMessages([
      {
        id: 'welcome',
        role: 'service',
        text: product
          ? '您好，当前商品暂时缺货。你可以留下问题，我们会给出联系方式。'
          : '您好，请输入你的问题，我们会给出联系方式。'
      }
    ]);
  }, [open, product]);

  if (!open) return null;

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    recordEvent('chat_question', {
      asin: product?.asin,
      productId: product?.id,
      productTitle: product?.title,
      categoryId: product?.categoryId,
      source,
      questionLength: trimmedMessage.length
    });

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: `user-${Date.now()}`, role: 'user', text: trimmedMessage },
      { id: `service-${Date.now()}`, role: 'service', text: `请联系邮箱${supportEmail}` }
    ]);
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-gray-200 p-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{product ? '当前缺货' : '客服在线聊天'}</h2>
            <p className="mt-1 text-sm text-gray-600">
              {product?.title ? `${product.title} 暂时缺货，可联系客服。` : '客服收到消息后会提供下一步联系方式。'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            aria-label="关闭弹窗"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <button
            type="button"
            onClick={() => setChatOpen(true)}
            className="w-full rounded-full bg-[#ffd814] px-4 py-2 font-semibold text-gray-900 hover:bg-[#f7ca00]"
          >
            联系在线客服
          </button>

          {chatOpen && (
            <div className="mt-4 rounded-md border border-gray-200">
              <div className="h-56 overflow-y-auto bg-gray-50 p-3">
                {messages.map((item) => (
                  <div
                    key={item.id}
                    className={`mb-2 flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[84%] rounded-lg px-3 py-2 text-sm ${
                        item.role === 'user'
                          ? 'bg-[#232f3e] text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                    >
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex border-t border-gray-200">
                <input
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') handleSend();
                  }}
                  type="text"
                  placeholder="输入你的问题..."
                  className="min-w-0 flex-1 rounded-bl-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#ff9900]"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  className="rounded-br-md bg-[#232f3e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#131921]"
                >
                  发送
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockChatModal;
