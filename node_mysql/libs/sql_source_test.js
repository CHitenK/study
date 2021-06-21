const domain = 'http://10.10.102.208:89' // 访问ip/域名
const suffix = '?from=oldsystem' // 统一的后缀
// 旧数据 (备份)
const oldData = [
  // 仓储管理
  // { id: 10150, authority_name: "盘点指令列表", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=9001' },
  // { id: 10151, authority_name: "盘点结果列表", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=9002'},
  // { id: 10152, authority_name: "仓储类型调整", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=10001'},
  // { id: 10153, authority_name: "仓储库存调整", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=10002'},

  // 第一批（采购管理）
  { id: 10162, authority_name: "采购订单跟踪报表", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=3007'},
  { id: 10110, authority_name: "理货单列表", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=3003'},
  { id: 10115, authority_name: "预申报单列表", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=3002'},
  { id: 10591, authority_name: "采购退货出库列表", url: "/module/loadPage.asyn", server_addr: '//load/page.asyn?act=3009'},
  { id: 10122, authority_name: "采购入库勾稽明细表", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=300'},
  { id: 10577, authority_name: "采购退货列表", url: "/module/loadPage.asyn", server_addr: '//load/page.asyn?act=3008'},
  { id: 10111, authority_name: "采购入库列表", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=3004'},
  { id: 10161, authority_name: "采购入库差异分析表", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=3006'},
  // 第一批（销售管理/销售退货管理
  { id: 10132, authority_name: "销售出库清单", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=4003'},
  { id: 10653, authority_name: "预售勾稽列表", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=70014'},
  { id: 10557, authority_name: "上架列表", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=5001'},
  { id: 10171, authority_name: "销售出库明细表", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=4005'},
  { id: 10139, authority_name: "销售出库差异分析表", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=4004'},
  { id: 10142, authority_name: "销售退货订单列表", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=5001'},
  { id: 10144, authority_name: "销售退货出库清单", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=5003'},
  { id: 10163, authority_name: "销售退货理货单列表", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=5004'},
  { id: 10143, authority_name: "销售退货入库清单", url: "/module/loadPage.asyn", server_addr: '/load/page.asyn?act=5002'}
  
]

// 新数据
const newData = [
  // 仓储管理
  // { id: 10150, authority_name: "盘点指令列表", url: domain + "/storage/orderlist" + suffix, server_addr: '' },
  // { id: 10151, authority_name: "盘点结果列表", url: domain + "/storage/resultlist" + suffix, server_addr: '' },
  // { id: 10152, authority_name: "仓储类型调整", url: domain + "/storage/typelist" + suffix, server_addr: '' },
  // { id: 10153, authority_name: "仓储库存调整", url: domain + "/storage/stocklist" + suffix , server_addr: '' }
  // 第一批（采购管理）
  { id: 10162, authority_name: "采购订单跟踪报表", url: domain + "/purchase/orderTrackeList" + suffix , server_addr: '' },
  { id: 10110, authority_name: "理货单列表", url: domain + "/purchase/tallyBillList" + suffix , server_addr: '' },
  { id: 10115, authority_name: "预申报单列表", url: domain + "/purchase/predeclarationList" + suffix , server_addr: '' },
  { id: 10591, authority_name: "采购退货出库列表", url: domain + "/purchase/exWarehouseList" + suffix , server_addr: '' },
  { id: 10122, authority_name: "采购入库勾稽明细表", url: domain + "/purchase/crossCheckDetailList" + suffix , server_addr: '' },
  { id: 10577, authority_name: "采购退货列表", url: domain + "/purchase/returnGoodsList" + suffix , server_addr: '' },
  { id: 10111, authority_name: "采购入库列表", url: domain + "/purchase/purchaseWarehouseList" + suffix , server_addr: '' },
  { id: 10161, authority_name: "采购入库差异分析表", url: domain + "/purchase/differenceAnalysisList" + suffix , server_addr: '' },
  // 第一批（销售管理/销售退货管理）
  // { id: 10132, authority_name: "销售出库清单", url: domain + "/sales/salesdelivery" + suffix , server_addr: '' },
  // { id: 10653, authority_name: "预售勾稽列表", url: domain + "/sales/salescrosscheck" + suffix , server_addr: '' },
  // { id: 10557, authority_name: "上架列表", url: domain + "/sales/shelveslist" + suffix , server_addr: '' },
  // { id: 10171, authority_name: "销售出库明细表", url: domain + "/sales/salesoutbound" + suffix , server_addr: '' },
  // { id: 10139, authority_name: "销售出库差异分析表", url: domain + "/sales/salesdifference" + suffix , server_addr: '' },
  // { id: 10142, authority_name: "销售退货订单列表", url: domain + "/sales/salesreturnorder" + suffix , server_addr: '' },
  // { id: 10144, authority_name: "销售退货出库清单", url: domain + "/sales/returndeliveryorder" + suffix , server_addr: '' },
  // { id: 10163, authority_name: "销售退货理货单列表", url: domain + "/sales/returntallyorder" + suffix , server_addr: '' },
  // { id: 10143, authority_name: "销售退货入库清单", url: domain + "/sales/returnreceiptorder" + suffix , server_addr: '' },

]
  
module.exports = { newData, oldData }

// nested exception is org.apache.ibatis.exceptions.TooManyResultsException: Expected one result (or null) to be returned by selectOne(), but found: 2
//
//
//