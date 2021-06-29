// 用户交互接口
const interactiveAPIArray = [
    'user/address/remove',
    'user/address/add',
    'auth/savePhone',
    'user/authentication/alibabaVerified',
    'user/authentication/add',
    'user/authentication/remove',
    'daren/bankcard/add',
    'daren/bankcard/del',
    'daren/bankcard/verify',
    'daren/bankcard/verifySms',
    'daren/withdrawal/apply',
    'daren/bankcard/defSet',
    'auth/enrollDaren',
    'auth/authMiniApp',
    'cart/total/numChange',
    'cart/confirm/check',
    'order/status/receive',
    'order/my/del',
    'order/my/cancel',
    'cart/token/create',
    'cart/getOrderInfo',
    'cart/order/submit',
    'pay/alipay/getDouyinAppPayInfo'
]

const test = { // 测试环境
    // configUrl: 'http://192.168.31.95:8088/',//文停
    // configUrl: 'http://192.168.44.167:8089/',//子龙
    // configUrl: 'http://192.168.44.166:8080/',//志远
    // configUrl: 'http://schoolshopsmzc.topgoods.mobi/',//开发环境
    configUrl:'http://192.168.31.98:12001/',//东坡
    loginConfigUrl: 'http://192.168.31.98:10002/', // 登录注册 东坡
    // loginConfigUrl: 'http://192.168.31.101:10002/', // 登录注册 志远
    // configUrl: 'http://192.168.31.101:8080/', // 志远
    // configUrl: 'http://172.30.201.2156/',
    // configUrl: 'http://192.168.44.165:8086/',
    // configUrl: 'http://192.168.44.161:8080/', // 章明
    // configUrl: 'https://vipshopwx.topgoods.mobi/',//正式环境 vipshopwx.topgoods.mobi
    // configUrl: 'https://mz-api.topgoods.mobi/',//测试环境
    // configUrl:'http://192.168.44.168:8084/',//郑涛
    apiTokenUrl: 'https://open-dy-01.topgoods.mobi/', // api 令牌url
    payTokenUrl: 'https://open-dy-01.topgoods.mobi/', // pay 令牌url
    userTokenUrl: 'https://open-dy-01.topgoods.mobi/',// user 令牌url
    // configUrl: 'https://mz-api.topgoods.mobi/', // 'https://open-dy-api.topgoods.mobi/',  // api服务
    payConfigUrl: 'https://mz-api.topgoods.mobi/', //'https://open-dy-pay.topgoods.mobi/', // 支付服务
    // loginConfigUrl: 'https://mz-api.topgoods.mobi/', //'https://open-dy-user.topgoods.mobi/', // 用户服务
    cdnUrl: 'https://douyin-cdn.topgoods.mobi/' // CDN
}
// 压测环境
const yace = {
    apiTokenUrl: '', // api 令牌url
    payTokenUrl: '', // pay 令牌url
    userTokenUrl: '', // user 令牌url
    configUrl: 'https://uat-dy-api.topgoods.mobi/',  // api服务
    payConfigUrl: 'https://uat-dy-pay.topgoods.mobi/', // 支付服务
    loginConfigUrl: 'https://uat-dy-user.topgoods.mobi/', // 用户服务
    cdnUrl: 'https://douyin-cdn.topgoods.mobi/', // CDN
}
const pro = { // 生产
    apiTokenUrl: '', // api 令牌url
    payTokenUrl: '', // pay 令牌url
    userTokenUrl: '', // user 令牌url
    configUrl: 'https://open-dy-api.topgoods.mobi/',  // api服务
    payConfigUrl: 'https://open-dy-pay.topgoods.mobi/', // 支付服务
    loginConfigUrl: 'https://open-dy-user.topgoods.mobi/', // 用户服务
    cdnUrl: 'https://douyin-cdn.topgoods.mobi/', // CDN
}
exports.config = {
    GUID: 'd39ebcfd-7d03-4ad2-9a64-3f6a23d1247d',
    ASEkey: 'ewvuhvymrrerppsj',
    ASEIv: '3778717345033638',
    pfChannelId: 45,
    // ...test, // 测试环境
    // ...pro, // 生产
    ...yace, // 压测环境
    interactiveAPIArray,
    tabBar: { "custom": true, "selectedColor": "#3a92ff", "color": "#888888", "backgroundColor": "#ffffff", "borderStyle": "white", "position": "bottom", "list": [{ "pagePath": "pages/index/index", "iconPath": "img/i0.png", "selectedIconPath": "img/i0_sel.png", "text": "首页" }, { "pagePath": "pages/category/category", "iconPath": "img/i1.png", "selectedIconPath": "img/i1_sel.png", "text": "分类" }, { "pagePath": "pages/newsletter/newsletter", "iconPath": "img/i2.png", "selectedIconPath": "img/i2_sel.png", "text": "资讯" }, { "pagePath": "pages/cart/cart", "iconPath": "img/i3.png", "selectedIconPath": "img/i3_sel.png", "text": "购物车" }, { "pagePath": "pages/UserCenter/UserCenter", "iconPath": "img/i4.png", "selectedIconPath": "img/i4_sel.png", "text": "我的" }] }
}
