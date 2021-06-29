
/**
 * 根据打包脚本出 配置打包环境
 */
var fs = require('fs')
const env = process.env.API_ENV
const config = {
  // 开发配置
  dev: {
    BASE_URL: 'http://gateway.dev.hdpp.com/api/icommerce-mgmt/v1/', // 'http://gateway.dev.hdpp.com/api/icommerce-mgmt/v1/', // 开发环境
    APP_KEY: 'e1fce770a0abb2a831d7058d8251e210',
    APP_ID: 'wx1d12976fa68b37af',
    APP_ISLOCAL: !!process.env.APP_ISLOCAL // 是否是本地开发
  },
  // 测试
  test: {
    BASE_URL: 'http://gateway.test.hdpp.com/api/icommerce-mgmt/v1/', // 'http://gateway.test.hdpp.com/api/icommerce-mgmt/v1/', // '', // 'http://gateway.test.hdpp.com/api/icommerce-mgmt/v1/', // 测试环境
    APP_KEY: 'e1fce770a0abb2a831d7058d8251e210',
    APP_ID: 'wx1d12976fa68b37af',
    APP_ISLOCAL: !!process.env.APP_ISLOCAL // 是否是本地开发
  },
  // 生产
  prod: {
    BASE_URL: 'https://nb-gateway.hpdd.com/api/icommerce-mgmt/v1/', // 生产环境
    APP_KEY: 'e1fce770a0abb2a831d7058d8251e210',
    APP_ID: 'wx0e796d6cbd230905',
    APP_ISLOCAL: false
  }
}
// export default
console.log('***************************************************************')
console.log('当前打包环境： ' + env)
console.log('***************************************************************')
writeConfig()


// 修改src/config.js
function writeConfig() {
  var str = 'export default ' + JSON.stringify(config[env])
  fs.writeFile('./src/utils/config.ts', str, (writeFileErr) => {
    if (writeFileErr) {
      console.error(writeFileErr);
    } else {
      console.log('----------config修改成功-------------');
    }
  })
}
