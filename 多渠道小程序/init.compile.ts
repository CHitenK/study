
/**
 * 根据打包脚本出传入的渠道id 进行全局配置
 */
console.log('***********开始执行init.compile.ts*****************************')
const fs = require('fs')
const channelId = process.env.NODE_CHANNEL_ID // 渠道ID
const url = './channel/' + channelId + '.js'
const channelOpt = require(url) // 渠道对应数据
const channelSetting = channelOpt[process.env.NODE_ENV] // 配置数据 
const config = { appid: channelSetting.appId }
console.log('***************************************************************')
console.log('当前渠道号/渠道ID： ' + channelSetting.channelId, 'appId:' + channelSetting.appId)
console.log(process.env.NODE_ENV)
console.log('***************************************************************')
writeJson()
writeConfig()

// 修改appId
function writeJson() {
  fs.readFile('./project.config.json', function (err, data) {
    if (err) {
      return console.error(err)
    }
    var person = { ...JSON.parse(data.toString()), ...config }
    var str = JSON.stringify(person)
    fs.writeFile('./project.config.json', str, (writeFileErr) => {
      if (writeFileErr) {
        console.error(writeFileErr);
      } else {
        console.log('----------project.config.json修改成功-------------');
      }
    })
  })
}
// 修改src/config.read.ts
function writeConfig() {
  var str = 'module.exports =' + JSON.stringify(channelSetting)
  fs.writeFile('./src/config.read.ts', str, (writeFileErr) => {
    if (writeFileErr) {
      console.error(writeFileErr);
    } else {
      console.log('----------config修改成功-------------');
    }
  })
}