import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { recordEvent } from '../utils/analytics';
import { formatCny, localizeProduct } from '../utils/locale';

const ProductCard = ({ product, entrySource = 'product-card' }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const displayProduct = localizeProduct(product);

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    recordEvent('add_to_cart', {
      asin: product.asin,
      productId: product.id,
      productTitle: product.title,
      categoryId: product.categoryId,
      source: entrySource
    });
    addToCart(product);
  };

  const detailUrl = product.asin ? `/product/${product.asin}` : '/';
  const handleProductClick = () => {
    recordEvent('product_click', {
      asin: product.asin,
      productId: product.id,
      productTitle: product.title,
      categoryId: product.categoryId,
      source: entrySource
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="#F59E0B"/>
              <stop offset="50%" stopColor="#E5E7EB"/>
            </linearGradient>
          </defs>
          <path fill="url(#halfStar)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md p-2 sm:p-3 lg:p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full">
      {/* Product Image */}
      <div className="relative mb-2 sm:mb-3 lg:mb-4 flex-shrink-0">
        <Link
          to={detailUrl}
          state={{ entrySource }}
          onClick={handleProductClick}
          aria-label={`查看 ${displayProduct.title} 详情`}
        >
          <img
            src={product.image}
            alt={displayProduct.title}
            className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-md"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
            }}
          />
        </Link>
        {isInCart(product.id) && (
          <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-green-600 text-white px-1 sm:px-2 py-1 rounded text-xs font-bold">
            <span className="hidden sm:inline">已加入 ({getItemQuantity(product.id)})</span>
            <span className="sm:hidden">✓</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col">
        {/* Title */}
        {product.brand && (
          <div className="text-[11px] sm:text-xs text-gray-500 mb-1">{product.brand}</div>
        )}
        <Link
          to={detailUrl}
          state={{ entrySource }}
          onClick={handleProductClick}
          className="text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer leading-tight"
        >
          {displayProduct.title}
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-1 sm:mb-2">
          <div className="flex items-center mr-1 sm:mr-2">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs sm:text-sm text-gray-600">
            {product.rating}
          </span>
          <span className="text-xs text-gray-500 ml-1 hidden sm:inline">
            ({product.reviewCount?.toLocaleString() || 0})
          </span>
        </div>

        {/* Price */}
        <div className="mb-2 sm:mb-3">
          <span className="text-base sm:text-lg font-bold text-gray-900">
            {formatCny(product.price)}
          </span>
          {product.asin && (
            <span className="block text-[11px] text-gray-500">站内活动参考价</span>
          )}
        </div>

        {/* Prime Badge */}
        <div className="mb-2 sm:mb-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-1 sm:px-2 py-1 rounded">
            Prime 会员
          </span>
        </div>

        {/* Shipping Info */}
        <div className="mb-2 sm:mb-4">
          <span className="text-xs sm:text-sm text-green-600 font-medium">
            <span className="hidden sm:inline">明日达，免配送费</span>
            <span className="sm:hidden">免配送费</span>
          </span>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-auto">
          <button
            onClick={handleAddToCart}
            className={`w-full py-1.5 sm:py-2 px-2 sm:px-4 rounded-md font-medium text-xs sm:text-sm transition-colors duration-200 ${
              isInCart(product.id)
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900'
            }`}
          >
            <span className="hidden sm:inline">
              {isInCart(product.id) ? '已加入购物车' : '加入购物车'}
            </span>
            <span className="sm:hidden">
              {isInCart(product.id) ? '已加入' : '加入'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
