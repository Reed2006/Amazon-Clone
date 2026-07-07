export const RMB_RATE = 7.2;

export const formatCny = (price) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    maximumFractionDigits: 0
  }).format(price * RMB_RATE);
};

const productCopy = {
  1: ['Apple iPhone 15 Pro Max 256GB 原色钛金属', '6.7 英寸超视网膜 XDR 屏幕，A17 Pro 芯片，支持 5 倍长焦拍摄。'],
  2: ['三星 65 英寸 Neo QLED 4K 智能电视 QN90C', '量子点色彩与 Mini LED 背光，呈现更精准的亮度和对比度。'],
  3: ['索尼 WH-1000XM5 无线降噪耳机', '自适应降噪、清晰通话和最长 30 小时续航，适合通勤与办公。'],
  4: ['Apple MacBook Air 15 英寸 M2 芯片版', '轻薄机身搭配 M2 芯片，兼顾性能、续航和安静的日常使用体验。'],
  5: ['Amazon Echo Dot 第五代 Alexa 智能音箱', '织物外观的小巧智能音箱，可播放音乐、控制智能家居和语音提醒。'],
  6: ['Nintendo Switch OLED 红蓝 Joy-Con 套装', '7 英寸 OLED 屏幕，支持掌机、桌面和电视三种游玩模式。'],
  7: ['Instant Pot Duo 7 合 1 电压力锅 6 夸脱', '压力锅、慢炖锅、电饭煲、酸奶机、蒸锅等功能合一。'],
  8: ['Kindle Paperwhite 第 11 代 6.8 英寸阅读器', '300 ppi 防眩光屏幕，接近纸书观感，适合长时间阅读。'],
  9: ['Apple AirPods Pro 第二代 MagSafe 充电盒版', '主动降噪与通透模式升级，带来更沉浸的无线聆听体验。'],
  10: ['YETI Rambler 20 盎司不锈钢保温杯', '双层真空隔热，冷热饮都能长时间保持合适温度。'],
  11: ['Fitbit Charge 5 高级健康运动手环', '内置 GPS、健康指标看板和多日续航，适合日常运动记录。'],
  12: ['Ninja Foodi 个人料理机 18 盎司随行杯', '可快速处理冰块和冷冻水果，适合奶昔、果昔和轻食准备。'],
  13: ['三星 Galaxy S24 Ultra 256GB 钛黑色', '配备 S Pen、2 亿像素影像系统和全天候智能电池管理。'],
  14: ['Google Pixel 8 Pro 128GB 黑曜石色', '搭载 Google 计算摄影功能，支持魔术橡皮擦和智能照片优化。'],
  15: ['Dell XPS 13 Plus i7 16GB 512GB 笔记本', '超窄边框 13.4 英寸屏幕，轻薄机身内置强劲性能。'],
  16: ['HP Pavilion 游戏台式机 Ryzen 5 RTX 3060', '适合游戏与内容创作，配备 AMD 处理器和 NVIDIA 独立显卡。'],
  17: ['Bose QuietComfort 45 无线降噪耳机', '舒适佩戴、稳定降噪和清晰通话，适合差旅与专注工作。'],
  18: ['JBL Charge 5 防水便携蓝牙音箱', 'JBL 标志性声音，约 20 小时播放，还可作为移动电源使用。'],
  19: ['PlayStation 5 游戏主机', '高速 SSD、触觉反馈和沉浸式游戏体验，适合客厅娱乐。'],
  20: ['Xbox Series X 游戏主机', '12 TFLOPS 图形性能，支持快速恢复和高画质游戏体验。'],
  21: ['Ring Video Doorbell 4 智能可视门铃', '1080p 高清视频、动态侦测和 Alexa 联动，守护门前安全。'],
  22: ['Philips Hue 彩色智能灯泡入门套装', '可调节颜色与亮度，适配不同居家场景和智能家居系统。'],
  23: ['小说《伊芙琳·雨果的七任丈夫》', '一位好莱坞传奇女性终于讲述自己人生故事的畅销小说。'],
  24: ['小说《蝲蛄吟唱的地方》', '融合成长、孤独与悬疑的湿地故事，适合周末阅读。'],
  25: ['《原子习惯》行为改变实用指南', '用微小但持续的改变，建立更稳定的个人习惯系统。'],
  26: ['《你当像鸟飞往你的山》回忆录', '关于教育、自我选择与家庭关系的真实成长故事。'],
  27: ['《坎贝尔生物学》第 12 版教材', '经典生物学教材，覆盖生命科学基础知识与案例。'],
  28: ['《微积分：早期超越函数》第 8 版', '清晰讲解微积分概念、例题和练习，适合课程学习。'],
  29: ['苏斯博士《绿鸡蛋和火腿》童书', '节奏明快、适合亲子共读的经典英文启蒙读物。'],
  30: ['Eric Carle《好饿的毛毛虫》绘本', '深受孩子喜爱的经典绘本，适合低龄阅读启蒙。'],
  31: ['KitchenAid Artisan 5 夸脱厨师机', '10 档速度与多种配件扩展，适合烘焙和厨房准备。'],
  32: ['Ninja Foodi 8 夸脱 9 合 1 豪华压力锅', '压力烹饪、空气炸等功能合一，适合家庭大份量料理。'],
  33: ['West Elm 胡桃木中世纪风茶几', '线条简洁、质感温润，为客厅提供稳定视觉中心。'],
  34: ['Ashley 灰色现代布艺沙发', '柔软坐垫和中性色面料，适合多数家庭客厅搭配。'],
  35: ['Brooklinen Luxe Core 皇后床床单套装', '长绒棉材质，触感清爽舒适，适合四季使用。'],
  36: ['The Container Store Elfa 衣柜收纳系统', '包含层板、挂杆和抽屉，帮助衣柜空间清晰分区。'],
  37: ['Apple Watch Series 9 GPS 45mm 午夜色', '健康与运动功能升级，配备更明亮的常亮视网膜显示屏。'],
  38: ['Garmin Forerunner 265 GPS 跑步智能手表', 'AMOLED 屏幕、训练指标和长续航，适合跑者日常训练。'],
  39: ['NordicTrack Commercial 1750 跑步机', '配备智能高清屏幕和互动训练内容，适合家庭健身房。'],
  40: ['Bowflex SelectTech 552 可调节哑铃一对', '一对哑铃替代多组重量，节省空间并支持渐进训练。']
};

export const localizeProduct = (product) => {
  if (product.asin) {
    return product;
  }

  const copy = productCopy[product.id];

  if (!copy) {
    return product;
  }

  return {
    ...product,
    title: copy[0],
    description: copy[1],
    originalTitle: product.title,
    originalDescription: product.description
  };
};

export const getSearchText = (product) => {
  const localized = localizeProduct(product);
  return [
    localized.title,
    localized.description,
    localized.brand,
    localized.asin,
    localized.categoryId,
    ...(localized.highlights || []),
    ...(localized.specs || []),
    localized.originalTitle,
    localized.originalDescription
  ].filter(Boolean).join(' ').toLowerCase();
};
