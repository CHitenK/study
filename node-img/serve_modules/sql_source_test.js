const domain = 'http://10.10.102.208:89' // 访问ip/域名
const suffix = '?from=oldsystem' // 统一的后缀
// 旧数据 (备份)
const oldData = [
  // 仓储管理
  // { id: 10150, authority_name: "盘点指令列表", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=9001' },
  // { id: 10151, authority_name: "盘点结果列表", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=9002'},
  // { id: 10152, authority_name: "仓储类型调整", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=10001'},
  { id: 10153, authority_name: "仓储库存调整", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=10002'},
]

// 新数据
const newData = [
  // 仓储管理
  { id: 10150, authority_name: "盘点指令列表", url: domain + "/storage/orderlist" + suffix, server_addr: '' },
  { id: 10151, authority_name: "盘点结果列表", url: domain + "/storage/resultlist" + suffix, server_addr: '' },
  { id: 10152, authority_name: "仓储类型调整", url: domain + "/storage/typelist" + suffix, server_addr: '' },
  { id: 10153, authority_name: "仓储库存调整", url: domain + "/storage/stocklist" + suffix , server_addr: '' }
]
  
module.exports = { newData, oldData }

http://10.10.102.208:89/sales/ecommerceorder?from=oldsystem
http://10.10.102.208:89/sales/billdeliveryorder?from=oldsystem
http://10.10.102.208:89/sales/businesstransfer?from=oldsystem
http://10.10.102.208:89/sales/agreementlist?from=oldsystem
http://10.10.102.208:89/sales/inventorylocation?from=oldsystem
http://10.10.102.208:89/platform/goodsmanage?from=oldsystem
