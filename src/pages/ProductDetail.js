import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import StockChatModal from '../components/StockChatModal';
import { useCart } from '../context/CartContext';
import { amazonProducts, getCategoryById, getProductByAsin } from '../data/amazonProducts';
import { recordEvent } from '../utils/analytics';
import { formatCny } from '../utils/locale';

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, index) => (
    <svg
      key={index}
      className={`w-4 h-4 ${index < Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`}
      viewBox="0 0 20 20"
    >
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    </svg>
  ));
};

const ProductDetail = () => {
  const { asin } = useParams();
  const location = useLocation();
  const product = getProductByAsin(asin);
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [stockModalOpen, setStockModalOpen] = useState(false);

  const entrySource = location.state?.entrySource || 'direct-link';

  useEffect(() => {
    if (!product) return undefined;

    const startedAt = Date.now();
    let dwellRecorded = false;

    recordEvent('detail_view', {
      asin: product.asin,
      productId: product.id,
      productTitle: product.title,
      categoryId: product.categoryId,
      source: entrySource
    });

    const recordDwell = () => {
      if (dwellRecorded) return;
      dwellRecorded = true;
      recordEvent('detail_dwell', {
        asin: product.asin,
        productId: product.id,
        productTitle: product.title,
        categoryId: product.categoryId,
        source: entrySource,
        durationMs: Date.now() - startedAt
      });
    };

    window.addEventListener('pagehide', recordDwell);
    return () => {
      window.removeEventListener('pagehide', recordDwell);
      recordDwell();
    };
  }, [entrySource, product]);

  const handleAddToCart = () => {
    recordEvent('add_to_cart', {
      asin: product.asin,
      productId: product.id,
      productTitle: product.title,
      categoryId: product.categoryId,
      source: 'product-detail'
    });
    addToCart(product);
  };

  const handleBuyNow = () => {
    recordEvent('checkout_click', {
      asin: product.asin,
      productId: product.id,
      productTitle: product.title,
      categoryId: product.categoryId,
      source: 'product-detail',
      checkoutType: 'buy-now'
    });
    setStockModalOpen(true);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#eaeded] py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-md p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">没有找到这个商品</h1>
          <p className="text-gray-600 mb-6">请返回首页，从精选商品中重新选择。</p>
          <Link to="/" className="inline-block bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 px-5 py-2 rounded-md font-semibold">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const category = getCategoryById(product.categoryId);
  const relatedProducts = amazonProducts
    .filter((item) => item.categoryId === product.categoryId && item.asin !== product.asin)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#eaeded] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm">
          <Link to="/" className="text-blue-700 hover:text-orange-700">首页</Link>
          <span className="mx-2 text-gray-500">/</span>
          <a href={`${process.env.PUBLIC_URL}/#category-${product.categoryId}`} className="text-blue-700 hover:text-orange-700">{category?.title}</a>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-700">{product.asin}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-5 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,420px)_1fr_300px] gap-6 lg:gap-8">
          <section>
            <div className="sticky top-4">
              <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                <img src={product.image} alt={product.title} className="w-full aspect-square object-cover rounded" />
              </div>
              <div className="grid grid-cols-4 gap-2 mt-3">
                {product.gallery.map((image, item) => (
                  <div key={item} className="border border-gray-200 rounded p-1 bg-white">
                    <img src={image} alt={`${product.title} 缩略图 ${item + 1}`} className="w-full aspect-square object-cover rounded-sm" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <p className="text-sm text-blue-700 mb-1">访问 {product.brand} 品牌店</p>
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight">{product.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2 border-b border-gray-200 pb-4">
              <span className="text-sm text-gray-700">{product.rating}</span>
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-sm text-blue-700">{product.reviewCount.toLocaleString()} 个评价</span>
              <span className="text-xs bg-[#232f3e] text-white px-2 py-1 rounded-sm">商品编号: {product.asin}</span>
            </div>

            <div className="py-5 border-b border-gray-200">
              <div className="text-sm text-gray-600">参考价格</div>
              <div className="text-3xl text-[#b12704] font-semibold mt-1">{formatCny(product.price)}</div>
              <div className="inline-flex mt-3 text-sm bg-red-50 text-[#b12704] border border-red-100 rounded px-2 py-1">
                {product.coupon}
              </div>
              <p className="text-sm text-gray-600 mt-2">价格、库存、折扣和配送时效会根据站内活动变化，结算前请再次确认。</p>
            </div>

            <div className="py-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-3">关于此商品</h2>
              <ul className="space-y-2 text-sm sm:text-base text-gray-800">
                {product.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-900 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="py-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-3">商品说明</h2>
              <p className="text-gray-700 leading-7">{product.description}</p>
            </div>

            <div className="py-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-3">完整详情</h2>
              <div className="space-y-4">
                {product.detailSections.map((section) => (
                  <article key={section.title} className="bg-gray-50 border border-gray-200 rounded-md p-4">
                    <h3 className="font-bold text-gray-900 mb-2">{section.title}</h3>
                    <p className="text-sm sm:text-base text-gray-700 leading-7">{section.body}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="py-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-3">包装清单</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                {product.whatInBox.map((item) => (
                  <li key={item} className="border border-gray-200 rounded px-3 py-2 bg-white">{item}</li>
                ))}
              </ul>
            </div>

            <div className="py-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-3">适用场景</h2>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                {product.fitFor.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#ff9900] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="py-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-3">购买前确认</h2>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                {product.beforeBuy.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-900 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="py-5">
              <h2 className="text-lg font-bold text-gray-900 mb-3">产品规格</h2>
              <div className="border border-gray-200 rounded-md overflow-hidden">
                {product.specs.map((spec, index) => {
                  const [label, ...valueParts] = spec.split(':');
                  const value = valueParts.join(':').trim();

                  return (
                    <div key={spec} className={`grid grid-cols-[150px_1fr] text-sm ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <div className="font-semibold text-gray-800 px-3 py-2 border-r border-gray-200">{label}</div>
                      <div className="text-gray-700 px-3 py-2">{value || spec}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="py-5 border-t border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-3">常见问题</h2>
              <div className="space-y-3">
                {product.faqs.map((faq) => (
                  <article key={faq.question} className="border border-gray-200 rounded-md p-4">
                    <h3 className="font-bold text-gray-900">{faq.question}</h3>
                    <p className="text-sm text-gray-700 leading-6 mt-2">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <aside>
            <div className="border border-gray-200 rounded-lg p-4 lg:sticky lg:top-4">
              <div className="text-2xl text-[#b12704] font-semibold">{formatCny(product.price)}</div>
              <p className="text-xs text-gray-500 mt-1">站内活动参考价</p>
              <div className="mt-4 text-sm text-green-700 font-semibold">{product.availability}</div>
              <div className="mt-2 text-sm text-gray-700">{product.delivery}</div>
              <div className="mt-2 text-sm text-gray-700">{product.returnPolicy}</div>
              <div className="mt-4">
                <label htmlFor="quantity" className="block text-sm text-gray-700 mb-1">数量</label>
                <select id="quantity" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
              <button
                onClick={handleAddToCart}
                className="mt-4 w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 rounded-full py-2 font-semibold"
              >
                {isInCart(product.id) ? `已加入购物车 (${getItemQuantity(product.id)})` : '加入购物车'}
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="mt-3 block w-full text-center bg-[#ffa41c] hover:bg-[#fa8900] text-gray-900 rounded-full py-2 font-semibold"
              >
                一键购买
              </button>
            </div>
          </aside>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-10 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">同分类商品</h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((item) => (
                <Link
                  key={item.asin}
                  to={`/product/${item.asin}`}
                  state={{ entrySource: 'related-products' }}
                  onClick={() => recordEvent('product_click', {
                    asin: item.asin,
                    productId: item.id,
                    productTitle: item.title,
                    categoryId: item.categoryId,
                    source: 'related-products'
                  })}
                  className="border border-gray-200 rounded-md p-3 hover:shadow-md"
                >
                  <img src={item.image} alt={item.title} className="w-full h-28 object-cover rounded mb-3" />
                  <div className="text-sm font-semibold text-gray-900 line-clamp-2">{item.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.brand}</div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <StockChatModal
        open={stockModalOpen}
        onClose={() => setStockModalOpen(false)}
        product={product}
        source="product-detail"
      />
    </div>
  );
};

export default ProductDetail;
