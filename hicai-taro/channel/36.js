const conmmonSetting = require('./_commonSetting.js')
// 渠道私有配置
const config = {
  ...conmmonSetting,
  appId: 'wx957666991e212703', // 渠道对应的appID
  channelId: 36, // 渠道id
  canDo: false
}
module.exports = config