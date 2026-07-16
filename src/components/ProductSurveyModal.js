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

const aiQuestionOptionsBySourceAsin = {
  B0DLLSCVZW: [
    '有什么设备能代替手机闹钟，减少睡前看屏幕？',
    '早上总是起不来，用什么设备可以改善起床体验？',
    '不想被突然的铃声吓醒，有什么温和的唤醒设备？',
    '想建立固定的睡前和起床流程，需要什么设备？',
    '有没有集日出灯、白噪音、夜灯和闹钟于一体的设备？',
    '睡眠比较浅的人适合用什么类型的智能闹钟？',
    '带睡眠内容订阅的智能闹钟值得买吗？',
    '两个人作息时间不同，卧室里用什么闹钟比较合适？',
    '哪种智能闹钟可以用 App 自定义灯光、声音和起床时间？',
    'Philips SmartSleep 有哪些功能更丰富的替代产品？'
  ],
  B09GDQZLD1: [
    '上班不在家时，用什么设备可以远程看狗？',
    '有没有能旋转 360 度、自动跟踪宠物的摄像头？',
    '哪种宠物摄像头可以远程说话并给狗投零食？',
    '有没有能识别狗叫并向手机发送提醒的摄像头？',
    '晚上不在家时，用什么摄像头能看清宠物的活动？',
    '家里有两只以上的狗，应该选择什么宠物摄像头？',
    '狗独自在家容易不安，有什么远程看护设备比较实用？',
    '宠物摄像头的 AI 识别和录像订阅有必要买吗？',
    '看宠物应该买普通家庭监控还是专用宠物摄像头？',
    'Petcube Bites 2 Lite 有哪些自动追踪能力更强的替代品？'
  ],
  B0B9CZ6XBQ: [
    '想自己控制糖分和配料，应该买什么冰淇淋机？',
    '做高蛋白冰淇淋用什么机器比较方便？',
    '做无乳糖或植物奶冰淇淋适合用什么机器？',
    '有没有能做冰淇淋、雪葩、酸奶和冰沙的机器？',
    '一家人使用的大容量冰冻甜品机怎么选？',
    '家用冰淇淋机选压缩机制冷还是提前冷冻食材的类型？',
    '有没有能用同一份原料做出两种口味的冰淇淋机？',
    '想给孩子做少糖冰淇淋，买什么机器比较合适？',
    '哪种家用冰淇淋机比较容易清洗，日常使用不麻烦？',
    'Cuisinart ICE-100 有哪些用途更多、配料更灵活的替代品？'
  ],
  B0C9V4L32W: [
    '清理地毯上的宠物尿渍用什么机器效果比较好？',
    '布艺沙发上的饮料和食物污渍应该用什么清洁机？',
    '能同时清洁汽车座椅和家里沙发的机器有哪些？',
    '已经干掉很久的地毯污渍用什么设备清理？',
    '有没有同时带蒸汽和抽洗功能的便携清洁机？',
    '小户型不想买大型洗地机，局部清洁用什么设备？',
    '家里有孩子，经常出现食物和饮料污渍，用什么清洁机方便？',
    '有没有能清洁地毯、沙发、窗帘和汽车内饰的便携设备？',
    '哪种便携式清洁机用完后水箱和软管比较容易清洗？',
    'Shark StainStriker 有哪些带蒸汽功能的替代产品？'
  ],
  B0CQP4SSVB: [
    '想在家做红光护理，LED 面罩应该怎么选？',
    '柔性 LED 面罩和硬壳 LED 面罩哪个佩戴更舒服？',
    '红光加近红外的面罩和只有红光的面罩有什么区别？',
    '想改善面部细纹，家用 LED 面罩应该看哪些参数？',
    '敏感肌选择 LED 面罩时需要注意什么？',
    '有没有每次使用十分钟左右的居家 LED 面罩？',
    'LED 面罩和美容院红光护理相比，哪种更适合长期使用？',
    '怎么判断 LED 面罩是否有临床依据和 FDA clearance？',
    '使用红光 LED 面罩需要护眼吗，哪些人不适合使用？',
    'CurrentBody LED Mask Series 2 有哪些贴合度更好的替代产品？'
  ]
};

const getAiQuestionOptions = (product) => {
  const sourceAsin = product?.sourceAsin || product?.asin;
  const questions = aiQuestionOptionsBySourceAsin[sourceAsin] || [];
  return [
    ...questions.map((question, index) => ({
      value: `q${index + 1}`,
      label: question
    })),
    { value: 'other', label: '其他' }
  ];
};

const ProductSurveyModal = ({ open, onClose, product }) => {
  const [discoverySource, setDiscoverySource] = useState('');
  const [aiPlatform, setAiPlatform] = useState('');
  const [aiQuestions, setAiQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    setDiscoverySource('');
    setAiPlatform('');
    setAiQuestions([]);
    setSubmitted(false);
  }, [open, product?.asin]);

  if (!open || !product) return null;

  const needsAiPlatform = discoverySource === 'ai-recommendation';
  const aiQuestionOptions = getAiQuestionOptions(product);
  const canSubmit = discoverySource && (!needsAiPlatform || (aiPlatform && aiQuestions.length > 0));

  const handleAiQuestionToggle = (value) => {
    setAiQuestions((currentQuestions) => (
      currentQuestions.includes(value)
        ? currentQuestions.filter((question) => question !== value)
        : [...currentQuestions, value]
    ));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    const discoveryLabel = discoveryOptions.find((option) => option.value === discoverySource)?.label || discoverySource;
    const aiPlatformLabel = aiOptions.find((option) => option.value === aiPlatform)?.label || '';
    const aiQuestionLabels = aiQuestionOptions
      .filter((option) => aiQuestions.includes(option.value))
      .map((option) => option.label);

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
      surveyAiQuestionValues: needsAiPlatform ? aiQuestions : [],
      surveyAiQuestionLabels: needsAiPlatform ? aiQuestionLabels : [],
      voucherAmount: 20,
      voucherCurrency: 'RMB'
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-2xl border border-gray-200">
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">关于商品的小问卷（填完后可得20rmb代金券）</h2>
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
              <p className="mt-2 text-sm">感谢填写，您已获得 20 元代金券。</p>
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
                        if (option.value !== 'ai-recommendation') {
                          setAiPlatform('');
                          setAiQuestions([]);
                        }
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

            {needsAiPlatform && (
              <fieldset className="mt-5">
                <legend className="font-semibold text-gray-900">3. 你是与AI问答了哪些类似的问题得到的本产品（可多选）</legend>
                <div className="mt-3 space-y-2">
                  {aiQuestionOptions.map((option, index) => (
                    <label key={option.value} className="flex cursor-pointer items-start gap-3 rounded-md border border-gray-200 px-3 py-2 hover:border-[#ff9900]">
                      <input
                        type="checkbox"
                        name="aiQuestions"
                        value={option.value}
                        checked={aiQuestions.includes(option.value)}
                        onChange={() => handleAiQuestionToggle(option.value)}
                        className="mt-0.5 h-4 w-4"
                      />
                      <span className="text-sm text-gray-800">
                        {option.value === 'other' ? '其他' : `${String.fromCharCode(65 + index)}. ${option.label}`}
                      </span>
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
                提交并领取20元代金券
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductSurveyModal;
