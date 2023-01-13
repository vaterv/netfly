export default {
  loginState: false, //登录状态
  isShow: false, //登录模态框显示状态
  isRegShow: false, //注册模态框显示状态
  userInfo: {},
  // 账号列表
  accountList: [
    {
      Aid: 1,
      account: "ZaynMalik",
      password: "123456",
      accountPic: "./../../static/zayn.jpg",
      level: 1,
      staffName: "美渣",
      staffId: 1,
      jobId: 1,
    },
    {
      Aid: 2,
      account: "JustinBieber",
      password: "1234567",
      accountPic: "./../../static/justin.jpg",
      level: 2,
      staffName: "贾隆平",
      staffId: 2,
      jobId: 2,
    },
    {
      Aid: 3,
      account: "NoelGallagher",
      password: "12345678",
      accountPic: "./../../static/noel.jpg",
      level: 2,
      staffName: "诺有缸",
      staffId: 3,
      jobId: 3,
    },
    {
      Aid: 4,
      account: "FinnHudson",
      password: "123456789",
      accountPic: "./../../static/finn.jpg",
      level: 2,
      staffName: "四分卫",
      staffId: 4,
      jobId: 4,
    },
    {
      Aid: 5,
      account: "RyuichiSakamoto",
      password: "123456789",
      accountPic: "./../../static/ryuichi.jpg",
      level: 2,
      staffName: "教授",
      staffId: 5,
      jobId: 5,
    },
  ],

  //   采购列表
  purchaseList: [
    {
      key: "1",
      orderNum: "B3290",
      diliverTime: "2020-12-11",
      goods: "美的KFR",
      goodsType: "空调",
      sply: "美的",
      orderState: "0",
      deviceNumber: "100",
      price: "134124",
    },
    {
      key: "2",
      orderNum: "P1290",
      diliverTime: "2020-9-11",
      goods: "格力KF",
      goodsType: "空调",
      sply: "格力",
      orderState: "1",
      deviceNumber: "43",
      price: "42341",
    },
    {
      key: "3",
      orderNum: "T3424",
      diliverTime: "2020-2-11",
      goods: "索尼XR",
      goodsType: "电视机",
      sply: "索尼",
      orderState: "0",
      deviceNumber: "423",
      price: "53254",
    },
    {
      key: "4",
      orderNum: "S9013",
      diliverTime: "2022-2-11",
      goods: "小米电视2",
      goodsType: "电视机",
      sply: "小米",
      orderState: "1",
      deviceNumber: "200",
      price: "234234",
    },
    {
      key: "5",
      orderNum: "L9032",
      diliverTime: "2019-9-11",
      goods: "小米电视3",
      goodsType: "电视机",
      sply: "小米",
      orderState: "0",
      deviceNumber: "50",
      price: "95353",
    },
  ],
  // 品牌列表
  brandList: [
    {
      Bid: 1,
      key: 1,
      brandNumber: 100001,
      brandName: "美的",
      goodsId: [1, 2, 3],
    },
    {
      Bid: 2,
      key: 2,
      brandNumber: 100002,
      brandName: "西门子",
      goodsId: [4, 5, 6],
    },
    {
      Bid: 3,
      key: 3,
      brandNumber: 100003,
      brandName: "飞利普",
      goodsId: [],
    },
    {
      Bid: 4,
      key: 4,
      brandNumber: 100004,
      brandName: "苏泊尔",
      goodsId: [],
    },
    {
      Bid: 5,
      key: 5,
      brandNumber: 100005,
      brandName: "海尔",
      goodsId: [],
    },
  ],
  // 商品分类
  goodsBrandList: [
    {
      id: 1, //一类品牌id
      brandName: "美的", //一类品牌名称
      brandNumber: 1001, //一类商品编号
      brandLevel: 1, //商品级别,1代表一级,2代表二级
      goodsAmount: 100, //商品数量
    },
    {
      id: 2, //一类品牌id
      brandName: "西门子", //一类品牌名称
      brandNumber: 1002, //一类商品编号
      brandLevel: 1, //商品级别,1代表一级,2代表二级
      goodsAmount: 100, //商品数量
    },
  ],
  // 二级商品的品牌分类
  brandClass: [
    {
      brandId: 1,
      brandName: "美的",
      id: 1, //二类品牌id
      goodsName: "冰箱", //二类品牌名称
      goodsNumber: 1001001, //二类品牌编号
      goodsLevel: 2,
      goodsUnit: "台", //数量单位
    },
    {
      brandId: 1,
      brandName: "美的",
      id: 2, //二类品牌id
      goodsName: "空调", //二类品牌名称
      goodsNumber: 1001002, //二类品牌编号
      goodsLevel: 2,
      goodsUnit: "台", //数量单位
    },
    {
      brandId: 1,
      brandName: "美的",
      id: 3, //二类品牌id
      goodsName: "洗衣机", //二类品牌名称
      goodsNumber: 1001003, //二类品牌编号
      goodsLevel: 2,
      goodsUnit: "台", //数量单位
    },
    {
      brandId: 2,
      brandName: "西门子",
      id: 4, //二类品牌id
      goodsName: "冰箱", //二类品牌名称
      goodsNumber: 2001004, //二类品牌编号
      goodsLevel: 2,
      goodsUnit: "台", //数量单位
    },
    {
      brandId: 2,
      brandName: "西门子",
      id: 5, //二类品牌id
      goodsName: "空调", //二类品牌名称
      goodsNumber: 2001005, //二类品牌编号
      goodsLevel: 2,
      goodsUnit: "台", //数量单位
    },
    {
      brandId: 2,
      brandName: "西门子",
      id: 6, //二类品牌id
      goodsName: "洗衣机", //二类品牌名称
      goodsNumber: 2001006, //二类品牌编号
      goodsLevel: 2,
      goodsUnit: "台", //数量单位
    },
  ],
  // 商品列表
  goodsList: [
    {
      id: 1,
      goodsNumber: 1001001,
      goodsDes: "美的空调",
      goodsCost: 100, //成本
      goodsStandards: "100*100", //商品规格
      factoryId: 1, //厂商id外键
      brandId: 1, //品牌id外键,
      goodsTypeId: 2, //品牌类型id外键,
      goodsUnit: "台", //单位
      goodsState: true, //上架状态
    },
    {
      id: 2,
      goodsNumber: 1001002,
      goodsDes: "美的冰箱",
      goodsCost: 100, //成本
      goodsStandards: "100*100", //商品规格
      factoryId: 1, //厂商id外键
      brandId: 1, //品牌id外键,
      goodsTypeId: 1, //品牌类型id外键,
      goodsUnit: "台", //单位
      goodsState: true, //上架状态
    },
    {
      id: 3,
      goodsNumber: 1001003,
      goodsDes: "美的洗衣机",
      goodsCost: 100, //成本
      goodsStandards: "100*100", //商品规格
      factoryId: 1, //厂商id外键
      brandId: 1, //品牌id外键,
      goodsTypeId: 3, //品牌类型id外键,
      goodsUnit: "台", //单位
      goodsState: true, //上架状态
    },
  ],
};
