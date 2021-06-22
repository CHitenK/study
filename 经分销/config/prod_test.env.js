'use strict'
// 打包测试环境服务地址
module.exports = {
  NODE_ENV: '"production"',
  APP_BASE_API: '""', // 基本服务API地址
  SYSTEM_BASE_API: "'http://121.33.205.118:810'", // system 模块对应的API地址
  STORAGE_BASE_API: "'http://121.33.205.118:3203'", // storage 模块对应的API地址
  ORDER_BASE_API: "'http://121.33.205.118:3202'", // order 模块对应的API地址
  INVENTTORY_BASE_API: "'http://121.33.205.118:3201'", // inventory 模块对应的API地址
  REPORT_BASE_API: "'http://121.33.205.118:3205'" // report 模块对应的API地址
}
