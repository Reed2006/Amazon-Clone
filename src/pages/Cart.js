import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StockChatModal from '../components/StockChatModal';
import { useCart } from '../context/CartContext';
import { recordEvent } from '../utils/analytics';
import { formatCny, localizeProduct } from '../utils/locale';

const Cart = () => {
  const [stockModalOpen, setStockModalOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    getCartTotal, 
    clearCart 
  } = useCart();

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 35 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  const handleCheckout = (checkoutType) => {
    cartItems.forEach((item) => {
      recordEvent('checkout_click', {
        asin: item.asin,
        productId: item.id,
        productTitle: item.title,
        categoryId: item.categoryId,
        source: 'cart',
        checkoutType,
        quantity: item.quantity
      });
    });
    setCheckoutProduct(cartItems[0] || null);
    setStockModalOpen(true);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 text-center">
            <div className="mb-4 sm:mb-6">
              <svg className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6H19" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">购物车是空的</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              你还没有添加商品，可以先去首页挑选。
            </p>
            <Link
              to="/"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-md transition-colors duration-200 text-sm sm:text-base"
            >
              继续购物
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">购物车</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">购物车中有 {cartItems.length} 件商品</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Cart Header */}
              <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">商品明细</h2>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  清空购物车
                </button>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                    formatPrice={formatCny}
                  />
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-4 sm:mt-6">
              <Link
                to="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                继续购物
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:sticky lg:top-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">订单摘要</h2>
              
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">商品小计（{cartItems.length} 件）</span>
                  <span className="text-gray-900">{formatCny(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">配送费</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? '免配送费' : formatCny(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">预估税费</span>
                  <span className="text-gray-900">{formatCny(tax)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 sm:pt-3">
                  <div className="flex justify-between">
                    <span className="text-base sm:text-lg font-semibold text-gray-900">合计</span>
                    <span className="text-base sm:text-lg font-semibold text-gray-900">{formatCny(total)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              {shipping === 0 ? (
                <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs sm:text-sm text-green-800 font-medium">
                      已满足免配送费条件
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
                  <p className="text-xs sm:text-sm text-blue-800">
                    再购买 {formatCny(35 - subtotal)} 即可免配送费
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={() => handleCheckout('cart-checkout')}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 sm:py-3 px-4 rounded-md transition-colors duration-200 mb-3 text-sm sm:text-base"
              >
                去结算
              </button>
              
              <button
                onClick={() => handleCheckout('one-click')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 sm:py-3 px-4 rounded-md transition-colors duration-200 text-sm sm:text-base"
              >
                一键购买
              </button>

              {/* Security Badge */}
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center text-xs sm:text-sm text-gray-600">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  安全结算
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StockChatModal
        open={stockModalOpen}
        onClose={() => setStockModalOpen(false)}
        product={checkoutProduct}
        source="cart-checkout"
      />
    </div>
  );
};

// Cart Item Component
const CartItem = ({ item, updateQuantity, removeFromCart, formatPrice }) => {
  const displayItem = localizeProduct(item);
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0 self-center sm:self-start">
          <img
            src={item.image}
            alt={displayItem.title}
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/96x96?text=No+Image';
            }}
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
            {displayItem.title}
          </h3>
          
          <div className="flex items-center mb-3 text-xs sm:text-sm">
            <span className="text-gray-600">有货</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-green-600">支持 Prime 配送</span>
          </div>

          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            {/* Quantity and Remove */}
            <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  className="px-2 sm:px-3 py-1 hover:bg-gray-100 text-sm"
                >
                  -
                </button>
                <span className="px-2 sm:px-3 py-1 border-l border-r border-gray-300 text-sm">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="px-2 sm:px-3 py-1 hover:bg-gray-100 text-sm"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                删除
              </button>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="text-base sm:text-lg font-semibold text-gray-900">
                {formatPrice(item.price * item.quantity)}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                单价 {formatPrice(item.price)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
