
/**
 *  渠道私有的静态配置
 *  渠道id: 36 美赞臣海外
 */

const  { conmmonSetting_dev, conmmonSetting_pro } = require('./_commonSetting.js')


 /**
 * 开发环境的配置
 */
const config_dev = {
  ...conmmonSetting_dev,
  appId: 'wx957666991e212703', // 渠道对应的appID
  channelId: 36, // 渠道id
  navigationBarBackgroundColor: '#fff'
}


/**
 * 生产环境配置
 */
const config_pro = { // 
  ...conmmonSetting_pro,
  appId: 'wx957666991e212703', // 渠道对应的appID
  channelId: 36, // 渠道id
  navigationBarBackgroundColor: '#000'
}

module.exports = { development: config_dev, production: config_pro }