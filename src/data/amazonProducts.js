export const amazonCategories = [
  {
    id: 'sleep-smart-home',
    title: '睡眠 / 家庭智能',
    subtitle: '日出闹钟、儿童音频、婴儿监护与家庭日程',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&h=520&fit=crop'
  },
  {
    id: 'smart-pets',
    title: '宠物智能',
    subtitle: '自动清洁、远程看护、GPS 定位与精确喂食',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=900&h=520&fit=crop'
  },
  {
    id: 'kitchen-innovation',
    title: '厨房创新电器',
    subtitle: '冷饮、冰淇淋、空气炸与户外披萨场景',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900&h=520&fit=crop'
  },
  {
    id: 'cleaning-home',
    title: '清洁 / 家居改善',
    subtitle: '局部清洁、污渍处理与可机洗地毯',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&h=520&fit=crop'
  },
  {
    id: 'beauty-recovery',
    title: '美容 / 恢复科技',
    subtitle: 'LED 光疗、红光护理、桑拿毯与智能放松',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&h=520&fit=crop'
  }
];

const productImages = [
  '01-B0DLLSCVZW-hatch-restore-3.jpg',
  '02-B0DCK7H8LV-yoto-player-3rd-gen.jpg',
  '03-B0BJMNYJTR-toniebox-dr-seuss.jpg',
  '04-B0GN8Y4RJX-nanit-monitor-system.jpg',
  '05-B0C9V811L6-skylight-calendar-15.jpg',
  '06-B0FFDYB7K8-litter-robot-4.jpg',
  '07-B09GDQZLD1-furbo-360-dog-camera.jpg',
  '08-B0DW88LC68-tractive-gps-dog-tracker.jpg',
  '09-B07TB5M9FC-whistle-go-explore.jpg',
  '10-B00O0UIPTY-surefeed-microchip-feeder.jpg',
  '11-B0D2LZYQ2M-ninja-slushi-fs301.jpg',
  '12-B0B9CZ6XBQ-ninja-creami-deluxe-nc501.jpg',
  '13-B0CKP6Y6KB-typhur-dome-2.jpg',
  '14-B085LGV57D-ooni-koda-16.jpg',
  '15-B0DSJW8SFG-ninja-creami-nc701.jpg',
  '16-B0C9V4L32W-bissell-little-green-hydrosteam.jpg',
  '17-B0DDZN2NY3-shark-stainstriker-hairpro.jpg',
  '18-B0CD9JV7PB-hoover-cleanslate-xl.jpg',
  '19-B092J65C35-ruggable-verena-dark-wood.jpg',
  '20-B0CWS6PXJ5-ruggable-outdoor-stripe.jpg',
  '21-B0CQP4SSVB-omnilux-contour-face.jpg',
  '22-B0DHRW819R-currentbody-led-mask-series-2.jpg',
  '23-B0CZSFWM74-solawave-red-light-wand.jpg',
  '24-B09M8YQ4KB-higherdose-sauna-blanket.jpg',
  '25-B0DD1K3HD6-therabody-smartgoggles-2.jpg'
];

const categoryDetailCopy = {
  'sleep-smart-home': {
    promise: '围绕睡眠、儿童内容和家庭日程管理设计，重点是减少屏幕干扰、提升夜间和家庭协作体验。',
    scene: '适合卧室、儿童房、婴儿房、厨房中控区和家庭共享空间。',
    confirm: '购买前确认电源方式、网络连接、订阅要求、安装位置和家庭成员使用习惯。',
    packageBase: ['主机', '电源或充电配件', '快速入门指南'],
    afterSales: '适用标准退换货政策；涉及婴儿监护、音频内容或家庭数据的功能，请以商品页说明和应用条款为准。'
  },
  'smart-pets': {
    promise: '围绕宠物安全、喂养、清洁和远程看护设计，适合希望降低日常照护负担的养宠家庭。',
    scene: '适合多宠家庭、上班族养宠、经常户外遛狗或需要精细喂养管理的场景。',
    confirm: '购买前确认宠物体型、项圈兼容性、订阅服务、耗材成本、网络覆盖和放置空间。',
    packageBase: ['设备主机', '安装或佩戴配件', '使用说明书'],
    afterSales: '宠物智能设备通常涉及耗材或订阅服务，退换货前应保留包装并检查清洁状态要求。'
  },
  'kitchen-innovation': {
    promise: '围绕新型家庭料理和聚会场景设计，重点是冷饮、甜品、空气炸和户外披萨等高频体验。',
    scene: '适合开放式厨房、家庭聚会、周末烘焙、后院露台和希望尝试新食谱的用户。',
    confirm: '购买前确认台面空间、电压/燃气要求、容量、清洁方式、配件和可购买耗材。',
    packageBase: ['厨房电器主机', '随机配件', '食谱或快速指南'],
    afterSales: '厨房电器开箱后应先检查配件和水箱/杯体/烤盘完整性，使用前阅读安全说明。'
  },
  'cleaning-home': {
    promise: '围绕软装清洁、宠物污渍、局部深层清洁和可机洗家居升级设计。',
    scene: '适合有宠物、孩子、地毯、布艺沙发、车内软装或露台地毯的家庭。',
    confirm: '购买前确认适用材质、清洁液要求、水箱容量、机器重量、地毯尺寸和洗衣机容量。',
    packageBase: ['清洁设备或地毯主体', '配件或底垫', '维护说明'],
    afterSales: '清洁类商品应避免在不兼容材质上使用；地毯类商品需确认尺寸和底垫搭配。'
  },
  'beauty-recovery': {
    promise: '围绕居家美容、红光护理、放松恢复和睡前减压设计，适合建立固定护理流程。',
    scene: '适合护肤进阶、运动后恢复、压力管理、睡前放松和希望减少到店护理频率的用户。',
    confirm: '购买前确认禁忌人群、光疗波长、使用频率、充电方式、尺寸贴合度和保修政策。',
    packageBase: ['护理设备主机', '充电或电源配件', '收纳/说明材料'],
    afterSales: '美容恢复设备不替代医疗建议；敏感肌、孕期、植入设备或光敏人群应先咨询专业人士。'
  }
};

const products = [
  ['B0DLLSCVZW', 'sleep-smart-home', 'Hatch Restore 3 智能日出闹钟', 'Hatch Baby', 169.99, 4.3, 5237, '日出唤醒闹钟、白噪音机和智能床头灯合一，适合建立无屏睡前流程。', ['可调亮度日出唤醒，帮助自然醒来', '内置白噪音和睡眠音景，适合卧室夜间使用', '数字显示与半圆形机身，适合床头桌摆放', '支持 2.4GHz Wi-Fi 和蓝牙连接', '品牌为 Hatch Baby'], ['Display Type: Digital', 'Power Source: Corded Electric', 'Connectivity: 2.4GHz Wi-Fi, Bluetooth', 'Room Type: Bedroom', 'ASIN: B0DLLSCVZW']],
  ['B0DCK7H8LV', 'sleep-smart-home', 'Yoto Player 3rd Gen 儿童无屏音频播放器', 'Yoto', 99.99, 4.7, 18400, '面向儿童的无屏音频播放器，用实体卡片播放故事、音乐和播客。', ['无屏交互，减少儿童使用屏幕时间', '实体音频卡片操作直观，适合低龄儿童', '可作为睡前故事、音乐和白噪音播放器', '适合家庭、旅行和儿童房场景', '版本和套装信息可在商品参数中查看'], ['Generation: 3rd Gen', 'Use: Kids audio player', 'Screen-free: Yes', 'Content: Cards / stories / music', 'ASIN: B0DCK7H8LV']],
  ['B0BJMNYJTR', 'sleep-smart-home', 'Toniebox 1 Dr. Seuss 音频播放器套装', 'Tonies', 99.99, 4.8, 9200, '柔软儿童音频盒，搭配 Dr. Seuss 主题角色播放故事内容。', ['通过放置角色玩偶触发音频播放', '外壳柔软，适合儿童房和亲子共读', 'Dr. Seuss 主题内容适合英文启蒙', '无需复杂屏幕菜单，孩子可独立操作', '套装内容以页面展示为准'], ['Theme: Dr. Seuss', 'Use: Kids audio stories', 'Control: Character figure', 'Audience: Children', 'ASIN: B0BJMNYJTR']],
  ['B0GN8Y4RJX', 'sleep-smart-home', 'Nanit Smart Baby Monitor System', 'Nanit', 379.99, 4.5, 2100, '带墙装支架和 8 英寸显示屏的智能婴儿监护系统，强调睡眠洞察和实时通知。', ['1080p 高清实时视频，支持手机和 8 英寸显示屏观看', '睡眠追踪、宝宝姿势和哭声/动作通知', '双向语音、红外夜视、温湿度监测', '墙装或落地安装方案适合不同房间', '高级睡眠洞察可能涉及订阅服务'], ['Brand: Nanit', 'Screen Size: 8 Inches', 'Compatible Devices: Smartphones', 'Battery Life: 20 Hours', 'ASIN: B0GN8Y4RJX']],
  ['B0C9V811L6', 'sleep-smart-home', 'Skylight Calendar 15" 家庭电子日历', 'Skylight', 319.99, 4.6, 6800, '15 英寸触控家庭日程屏，可显示日历、家务和家庭计划。', ['大屏触控家庭日历，适合厨房或玄关墙面', '支持家庭成员日程同步和家务分配', '墙装设计，便于全家共同查看', '适合作为 2026 家庭计划中心', '具体应用集成以页面展示为准'], ['Display: 15-inch touchscreen', 'Use: Family calendar / chore chart', 'Mount: Wall mount included', 'Category: Office Products', 'ASIN: B0C9V811L6']],
  ['B0FFDYB7K8', 'smart-pets', 'Litter-Robot 4 自动猫砂盆套装', 'Whisker', 699.00, 4.4, 12500, '面向多猫家庭的自动清洁猫砂盆套装，减少铲屎频率。', ['自动分离结团猫砂，保持猫砂盆更清洁', '适合希望降低日常清洁频率的猫主人', '套装通常包含耗材或配件，需以页面展示为准', '可帮助监测猫砂盆使用习惯', '体积较大，购买前应确认摆放空间'], ['Use: Self-cleaning litter box', 'Pet: Cats', 'Setup: Indoor', 'Bundle: Check product page', 'ASIN: B0FFDYB7K8']],
  ['B09GDQZLD1', 'smart-pets', 'Furbo 360° Dog Camera 宠物摄像头', 'Furbo', 189.00, 4.5, 32800, '带 360 度视角的狗狗摄像头，适合远程看护和互动。', ['360 度旋转视野，减少监控盲区', '远程查看宠物状态，适合上班族养宠家庭', '支持双向语音和互动功能', '适合客厅、卧室等室内空间', '订阅功能和云存储以页面展示为准'], ['View: 360-degree camera', 'Pet: Dogs', 'Audio: Two-way', 'Use: Remote monitoring', 'ASIN: B09GDQZLD1']],
  ['B0DW88LC68', 'smart-pets', 'Tractive GPS Dog Tracker 宠物定位器', 'Tractive', 49.99, 4.3, 15000, '狗狗 GPS 定位追踪器，用于户外活动和走失风险管理。', ['实时 GPS 定位，适合爱外出的狗狗', '可设置安全围栏并接收提醒', '小型项圈配件形态，便于日常佩戴', '适合旅行、露营和城市遛狗', '通常需要订阅服务，请以页面展示为准'], ['Tracking: GPS', 'Pet: Dogs', 'Feature: Virtual fence', 'Subscription: Check product page', 'ASIN: B0DW88LC68']],
  ['B07TB5M9FC', 'smart-pets', 'Whistle Go Explore 宠物 GPS 追踪器', 'Whistle', 129.95, 4.1, 9100, '面向宠物健康和位置管理的 GPS 追踪器。', ['位置追踪帮助降低宠物走失风险', '支持活动与健康趋势观察', '适合狗狗日常外出和远足', '耐用户外环境，适合项圈佩戴', '网络覆盖和订阅信息以页面展示为准'], ['Tracking: GPS', 'Use: Location / activity', 'Pet: Dogs', 'Wear: Collar attachment', 'ASIN: B07TB5M9FC']],
  ['B00O0UIPTY', 'smart-pets', 'SureFeed Microchip Pet Feeder 芯片识别喂食器', 'SureFeed', 199.99, 4.5, 17200, '通过宠物芯片识别开盖的智能喂食器，适合多宠家庭分食管理。', ['识别指定宠物芯片或项圈牌后开盖', '帮助防止多宠家庭抢食或误食', '适合特殊饮食、处方粮或定量喂养', '封闭式设计有助于保持食物新鲜', '兼容芯片类型以页面展示为准'], ['Recognition: Microchip', 'Use: Pet feeder', 'Pet: Cats / small dogs', 'Household: Multi-pet', 'ASIN: B00O0UIPTY']],
  ['B0D2LZYQ2M', 'kitchen-innovation', 'Ninja SLUSHi FS301 冷饮/冰沙机', 'Ninja', 299.99, 4.6, 5800, '家用冷饮和冰沙机器，用于制作 slush、冷冻饮品和派对饮品。', ['无需频繁加冰即可制作冷饮口感', '适合家庭聚会、夏季饮品和无酒精饮料', 'Ninja 厨房电器生态中的冷饮新品类', '透明容器便于观察制作状态', '容量与清洁方式以页面展示为准'], ['Use: Frozen drinks', 'Brand: Ninja', 'Model: FS301', 'Category: Kitchen appliance', 'ASIN: B0D2LZYQ2M']],
  ['B0B9CZ6XBQ', 'kitchen-innovation', 'Ninja CREAMi Deluxe NC501 冰淇淋机', 'Ninja', 249.99, 4.7, 34000, '家用冰淇淋、奶昔和冷冻甜品制作机。', ['可制作冰淇淋、奶昔、雪芭等冷冻甜品', '适合控制配方、糖分和蛋白质摄入的人群', 'Deluxe 版本面向更多模式和更大容量', '可搭配家庭常备食材自制甜品', '配件和模式数量以页面展示为准'], ['Model: NC501', 'Use: Ice cream / frozen desserts', 'Brand: Ninja', 'Line: CREAMi Deluxe', 'ASIN: B0B9CZ6XBQ']],
  ['B0CKP6Y6KB', 'kitchen-innovation', 'Typhur Dome 2 AI Smart Air Fryer', 'Typhur', 399.00, 4.6, 1800, '带智能烹饪体验的大容量空气炸锅。', ['空气炸、烘烤和复热等厨房常用模式', 'Dome 造型提供更宽烹饪腔体', '适合家庭份量、低油烹饪和快速晚餐', '智能功能帮助降低操作门槛', 'AI/智能食谱功能以页面展示为准'], ['Brand: Typhur', 'Use: Air fryer', 'Model: Dome 2', 'Feature: Smart cooking', 'ASIN: B0CKP6Y6KB']],
  ['B085LGV57D', 'kitchen-innovation', 'Ooni Koda 16 户外燃气披萨炉', 'Ooni', 599.00, 4.8, 7200, '16 英寸户外燃气披萨炉，适合后院聚餐和高温烘烤。', ['燃气加热，面向户外快速高温烘烤', '16 英寸尺寸适合较大披萨', '适合庭院、露台和露营料理', '可用于披萨、面包和部分烤制食材', '燃气适配和安全说明以页面展示为准'], ['Fuel: Gas', 'Size: 16-inch', 'Use: Outdoor pizza oven', 'Brand: Ooni', 'ASIN: B085LGV57D']],
  ['B0DSJW8SFG', 'kitchen-innovation', 'Ninja CREAMi Scoop & Swirl NC701', 'Ninja', 349.99, 4.5, 900, 'Ninja CREAMi 系列软冰和旋纹甜品机器。', ['面向软冰、旋纹甜品和家庭冷冻甜品场景', '适合亲子制作和聚会甜品台', '相比普通冰淇淋机更强调可玩性', '可根据个人配方制作低糖或高蛋白甜品', '新品信息和配件以页面展示为准'], ['Model: NC701', 'Line: CREAMi', 'Use: Scoop & swirl desserts', 'Brand: Ninja', 'ASIN: B0DSJW8SFG']],
  ['B0C9V4L32W', 'cleaning-home', 'BISSELL Little Green HydroSteam 清洁机', 'BISSELL', 229.99, 4.4, 14500, '便携式深层清洁机，适合地毯、沙发和车内局部污渍。', ['HydroSteam 强调蒸汽与清洁结合', '适合宠物家庭、儿童家庭和车内清洁', '便携机身方便处理小面积污渍', '可用于织物表面和软装维护', '适用材质和清洁液要求以页面展示为准'], ['Brand: BISSELL', 'Use: Spot cleaner', 'Feature: HydroSteam', 'Surfaces: Upholstery / carpet', 'ASIN: B0C9V4L32W']],
  ['B0DDZN2NY3', 'cleaning-home', 'Shark StainStriker HairPro PX251', 'Shark', 199.99, 4.5, 4200, '面向宠物毛发和顽固污渍的 Shark 局部清洁机。', ['适合处理宠物毛发、污渍和软装清洁', '局部清洁设计适合沙发、地毯和车内', 'HairPro 定位强调宠物家庭使用', '便携结构降低日常清洁负担', '附件配置以页面展示为准'], ['Brand: Shark', 'Model: PX251', 'Use: Stain remover', 'Focus: Pet hair', 'ASIN: B0DDZN2NY3']],
  ['B0CD9JV7PB', 'cleaning-home', 'Hoover CleanSlate XL FH15000V', 'Hoover', 169.99, 4.4, 6800, '大容量便携式地毯和软装清洁机。', ['CleanSlate XL 适合更大污渍区域处理', '可用于地毯、家具和车内软装', '适合家庭日常突发污渍清洁', '透明水箱便于观察污水和清洁液', '附件和水箱容量以页面展示为准'], ['Brand: Hoover', 'Model: FH15000V', 'Use: Portable cleaner', 'Line: CleanSlate XL', 'ASIN: B0CD9JV7PB']],
  ['B092J65C35', 'cleaning-home', 'Ruggable Verena Dark Wood 可机洗地毯', 'Ruggable', 199.00, 4.6, 2300, '可机洗地毯，深木色图案适合客厅和卧室。', ['双层可拆结构，便于取下清洗', '适合宠物、儿童和高频使用区域', '深木色图案更耐看，也便于家居搭配', '降低传统地毯清洁维护成本', '尺寸选项和底垫以页面展示为准'], ['Brand: Ruggable', 'Type: Washable rug', 'Pattern: Verena Dark Wood', 'Use: Home decor', 'ASIN: B092J65C35']],
  ['B0CWS6PXJ5', 'cleaning-home', 'Ruggable Outdoor Offset Stripe 可机洗地毯', 'Ruggable', 219.00, 4.5, 1200, '户外条纹可机洗地毯，适合露台和阳台区域。', ['适合户外空间的耐用条纹设计', '可机洗结构便于清理泥土和日常污渍', '适合露台、阳台、门廊和户外餐区', '现代条纹视觉增强空间秩序感', '户外耐候说明以页面展示为准'], ['Brand: Ruggable', 'Type: Outdoor washable rug', 'Pattern: Offset Stripe', 'Use: Patio / outdoor', 'ASIN: B0CWS6PXJ5']],
  ['B0CQP4SSVB', 'beauty-recovery', 'Omnilux Contour FACE LED 面罩', 'Omnilux', 395.00, 4.5, 4500, '家用面部 LED 光疗面罩，面向护肤和恢复场景。', ['红光/近红外护理定位，适合居家护肤流程', '面罩形态覆盖面部区域，使用方式稳定', '适合关注肤质、细纹和日常恢复的人群', '无创护理，适合作为护肤步骤补充', '使用频率和禁忌请参考商品详情页和说明书'], ['Brand: Omnilux', 'Use: LED face mask', 'Area: Face', 'Category: Beauty recovery', 'ASIN: B0CQP4SSVB']],
  ['B0DHRW819R', 'beauty-recovery', 'CurrentBody Skin LED Mask Series 2', 'CurrentBody Skin', 469.00, 4.4, 1800, 'CurrentBody 第二代 LED 面罩，面向进阶家用光疗护肤。', ['Series 2 定位为新一代面部 LED 护理面罩', '适合固定护肤周期和居家美容恢复', '面罩贴合度和波长配置以页面展示为准', '可作为护肤仪器类礼物或自用升级', '敏感肌或特殊人群需先查看使用限制'], ['Brand: CurrentBody Skin', 'Series: LED Mask Series 2', 'Use: Face care', 'Category: Premium beauty device', 'ASIN: B0DHRW819R']],
  ['B0CZSFWM74', 'beauty-recovery', 'Solawave 4-in-1 Red Light Therapy Wand', 'Solawave', 169.00, 4.3, 6100, '四合一红光护理棒，适合局部面部护理和旅行携带。', ['红光护理棒形态，便于处理局部区域', '4-in-1 定位整合多种护肤辅助功能', '体积小，适合旅行和日常快速护理', '适合搭配精华或护肤流程使用', '具体功能模式以商品详情页为准'], ['Brand: Solawave', 'Use: Red light therapy wand', 'Feature: 4-in-1', 'Portability: Travel friendly', 'ASIN: B0CZSFWM74']],
  ['B09M8YQ4KB', 'beauty-recovery', 'HigherDOSE Infrared Sauna Blanket', 'HigherDOSE', 699.00, 4.4, 2200, '家用红外桑拿毯，面向放松、出汗和恢复。', ['红外加热毯设计，适合家中恢复和放松', '折叠收纳比传统桑拿设备更灵活', '适合运动后恢复和冬季暖身场景', '需要预留平躺空间并注意使用时长', '温度范围和安全限制以页面展示为准'], ['Brand: HigherDOSE', 'Use: Infrared sauna blanket', 'Category: Recovery tech', 'Setup: Home use', 'ASIN: B09M8YQ4KB']],
  ['B0DD1K3HD6', 'beauty-recovery', 'Therabody SmartGoggles 2nd Gen', 'Therabody', 199.00, 4.2, 1600, '第二代智能眼部放松设备，面向压力缓解和睡前恢复。', ['眼周热敷、按摩和放松体验', '适合屏幕使用多、压力大或睡前放松人群', '智能模式帮助调整恢复节奏', '便携形态，适合家中或旅行使用', '具体模式和续航以页面展示为准'], ['Brand: Therabody', 'Generation: 2nd Gen', 'Use: Eye relaxation', 'Category: Recovery wearable', 'ASIN: B0DD1K3HD6']]
];

export const amazonProducts = products.map((item, index) => {
  const [asin, categoryId, title, brand, price, rating, reviewCount, description, highlights, specs] = item;
  const categoryCopy = categoryDetailCopy[categoryId];
  const image = `${process.env.PUBLIC_URL || ''}/Images/amazon-products/${productImages[index]}`;
  const category = amazonCategories.find((categoryItem) => categoryItem.id === categoryId);
  const productType = title.replace(brand, '').replace(/[，,].*$/, '').trim();

  return {
    id: index + 1,
    asin,
    categoryId,
    title,
    brand,
    price,
    rating,
    reviewCount,
    description,
    highlights,
    specs: [
      `品牌: ${brand}`,
      `分类: ${category?.title || categoryId}`,
      ...specs
    ],
    image,
    gallery: [image, image, image, image],
    amazonUrl: `https://www.amazon.com/dp/${asin}`,
    availability: index % 5 === 0 ? '库存紧张，建议尽快下单' : '有货，可加入购物车',
    delivery: index % 3 === 0 ? '预计 2-4 个工作日送达' : '预计明日达或隔日达',
    returnPolicy: '支持 30 天内退换，商品需保持完整包装和配件齐全。',
    coupon: price > 300 ? '高价值商品专区，页面价已按参考价展示' : '限时参考优惠，结算前请确认最终金额',
    whatInBox: [...categoryCopy.packageBase, `${productType || title} 相关配件以详情页标注为准`],
    fitFor: [
      categoryCopy.scene,
      `正在比较 ${brand} 同类产品、希望快速了解核心功能的用户。`,
      '需要一个信息完整、可直接加入购物车的网购详情页体验。'
    ],
    beforeBuy: [
      categoryCopy.confirm,
      '确认配送地址、插头/电压、尺寸、耗材和订阅服务是否适合所在地区。',
      '页面价格为站内活动参考价，结算前请确认最终金额。'
    ],
    detailSections: [
      {
        title: '商品定位',
        body: `${title} 属于${category?.title || '精选商品'}，${categoryCopy.promise}`
      },
      {
        title: '使用体验',
        body: `${description} 页面重点突出可理解的功能、适用人群和购买前需要确认的限制，让用户不必反复跳转也能完成基本判断。`
      },
      {
        title: '服务与售后',
        body: categoryCopy.afterSales
      }
    ],
    faqs: [
      {
        question: '价格和库存是否实时？',
        answer: '页面会展示站内活动参考价、库存状态和配送文案，最终金额以结算弹窗和页面提示为准。'
      },
      {
        question: '可以直接购买吗？',
        answer: '当前站点用于本地购物流程演示，点击结算或一键购买会提示库存状态并引导联系在线客服。'
      }
    ]
  };
});

export const getCategoryById = (categoryId) => {
  return amazonCategories.find((category) => category.id === categoryId);
};

export const getProductByAsin = (asin) => {
  return amazonProducts.find((product) => product.asin === asin);
};
