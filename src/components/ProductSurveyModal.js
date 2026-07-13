import React, { useEffect, useState } from 'react';
import { recordEvent } from '../utils/analytics';

const discoveryOptions = [
  { value: 'homepage', label: '从我们的网站主页浏览发现' },
  { value: 'ai-recommendation', label: '通过AI推荐' },
  { value: 'browser-search', label: '通过浏览器搜索发现' }
];

const aiOptions = [
  { value: 'deepseek', label: 'Deepseek' },
  { value: 'doubao', label: '豆包' },
  { value: 'wenxin', label: '文心一言' }
];

const ProductSurveyModal = ({ open, onClose, product }) => {
  const [discoverySource, setDiscoverySource] = useState('');
  const [aiPlatform, setAiPlatform] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    setDiscoverySource('');
    setAiPlatform('');
    setSubmitted(false);
  }, [open, product?.asin]);

  if (!open || !product) return null;

  const needsAiPlatform = discoverySource === 'ai-recommendation';
  const canSubmit = discoverySource && (!needsAiPlatform || aiPlatform);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    const discoveryLabel = discoveryOptions.find((option) => option.value === discoverySource)?.label || discoverySource;
    const aiPlatformLabel = aiOptions.find((option) => option.value === aiPlatform)?.label || '';

    recordEvent('survey_submit', {
      asin: product.asin,
      productId: product.id,
      productTitle: product.title,
      categoryId: product.categoryId,
      source: 'product-survey',
      surveyDiscoverySource: discoverySource,
      surveyDiscoverySourceLabel: discoveryLabel,
      surveyAiPlatform: needsAiPlatform ? aiPlatform : '',
      surveyAiPlatformLabel: needsAiPlatform ? aiPlatformLabel : '',
      voucherAmount: 10,
      voucherCurrency: 'RMB'
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-2xl border border-gray-200">
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">关于商品的小问卷（填完后可得10rmb代金券）</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              尊敬的用户，非常感激您关注到我们的商品，为了促进我司更好的引入海外商品和推广，占用您几秒钟的时间填写如下几道题。
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            aria-label="关闭问卷"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="px-5 py-6">
            <div className="rounded-md border border-green-200 bg-green-50 px-4 py-4 text-green-800">
              <div className="text-lg font-bold">提交成功</div>
              <p className="mt-2 text-sm">感谢填写，您已获得 10 元代金券。</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full rounded-md bg-[#ffd814] px-4 py-2 font-semibold text-gray-900 hover:bg-[#f7ca00]"
            >
              完成
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-5 py-5">
            <fieldset>
              <legend className="font-semibold text-gray-900">1. 您是从哪里看到此商品的</legend>
              <div className="mt-3 space-y-2">
                {discoveryOptions.map((option, index) => (
                  <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-md border border-gray-200 px-3 py-2 hover:border-[#ff9900]">
                    <input
                      type="radio"
                      name="discoverySource"
                      value={option.value}
                      checked={discoverySource === option.value}
                      onChange={() => {
                        setDiscoverySource(option.value);
                        if (option.value !== 'ai-recommendation') setAiPlatform('');
                      }}
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-800">{String.fromCharCode(65 + index)}. {option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {needsAiPlatform && (
              <fieldset className="mt-5">
                <legend className="font-semibold text-gray-900">2. 如您是AI推荐得到 您是在哪个AI网页端问答得到的此商品？</legend>
                <div className="mt-3 space-y-2">
                  {aiOptions.map((option, index) => (
                    <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-md border border-gray-200 px-3 py-2 hover:border-[#ff9900]">
                      <input
                        type="radio"
                        name="aiPlatform"
                        value={option.value}
                        checked={aiPlatform === option.value}
                        onChange={() => setAiPlatform(option.value)}
                        className="h-4 w-4"
                      />
                      <span className="text-sm text-gray-800">{String.fromCharCode(65 + index)}. {option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50"
              >
                暂不填写
              </button>
              <button
                type="submit"
                disabled={!canSubmit}
                className="rounded-md bg-[#ffd814] px-4 py-2 font-semibold text-gray-900 hover:bg-[#f7ca00] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
              >
                提交并领取10元代金券
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductSurveyModal;
