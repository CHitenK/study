
const ACCOUNT_INFO = require('../config.js').config; //测试账号
const config = {
  guid: ACCOUNT_INFO.GUID,
  asekey: ACCOUNT_INFO.ASEkey,
  aseiv: ACCOUNT_INFO.ASEIv,
  version: "1.10.5",
  apiTokenUrl: ACCOUNT_INFO.apiTokenUrl,
  payTokenUrl: ACCOUNT_INFO.payTokenUrl,
  userTokenUrl: ACCOUNT_INFO.userTokenUrl,
  postUrl: ACCOUNT_INFO.configUrl,
  cdnUrl: ACCOUNT_INFO.cdnUrl,
  loginConfigUrl: ACCOUNT_INFO.loginConfigUrl,
  payConfigUrl: ACCOUNT_INFO.payConfigUrl,
  debug: true, //是否开启日志功能
  tabBarList: ACCOUNT_INFO.tabBar.list,
  // tabBarList: [{
  //     "pagePath": "../../pages/index/index",
  //     "iconPath": "../img/tabBar1.png",
  //     "selectedIconPath": "../img/tabBar_sel1.png",
  //     "text": "首页"
  //   },
  //   {
  //     "pagePath": "../../pages/category/category",
  //     "iconPath": "../img/tabBar2.png",
  //     "selectedIconPath": "../img/tabBar_sel2.png",
  //     "text": "分类"
  //   },
  //   {
  //     "pagePath": "../../pages/cart/cart",
  //     "iconPath": "../img/tabBar3.png",
  //     "selectedIconPath": "../img/tabBar_sel3.png",
  //     "text": "购物车"
  //   },
  //   {
  //     "pagePath": "../../pages/UserCenter/UserCenter",
  //     "iconPath": "../img/tabBar4.png",
  //     "selectedIconPath": "../img/tabBar_sel4.png",
  //     "text": "我的"
  //   }
  // ], //底部导航页
  source: 'bytebeat'
}

//是否使用第三方平台，如果使用第三方平台则读取ext.json中的配置
// exports.config = Object.keys(tt.getExtConfigSync()).length > 0 ? tt.getExtConfigSync() : config;
exports.config = config;