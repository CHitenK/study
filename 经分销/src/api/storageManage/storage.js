import request from '@u/http'
import qs from 'qs'

// 盘点结果列表查询
export async function listTakesStockResult(data) {
  return request({
    url: '/webapi/storage/takesstockresult/listTakesStockResult.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 盘点结果-确认、驳回
export async function confirmTakesStock(data) {
  return request({
    url: '/webapi/storage/takesstockresult/confirmTakesStock.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 根据查询条件导出盘点结果单
export const exportTakesStockResultUrl = '/webapi/storage/takesstockresult/exportTakesStockResult.asyn'

// 访问详情页面
export async function toDetailPage(data) {
  return request({
    url: '/webapi/storage/takesstockresult/toDetailPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 盘点结果-查询某个盘点申请详情
export async function resultToGoodsDetailById(data) {
  return request({
    url: '/webapi/storage/takesstockresult/toGoodsDetailById.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 保存盘点结果单表体事业部信息
export async function confirmInDepot(data) {
  return request({
    url: '/webapi/storage/takesstockresult/confirmInDepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 盘点结果导入地址
export const resultImportUrl = '/webapi/storage/takesstockresult/importTakesStockResult.asyn'

// 类型调整单-删除
export async function deleteAdjustment(data) {
  return request({
    url: '/webapi/storage/adjustmentType/deleteAdjustment.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 类型调整单-确认调整
export async function confirmAdjustment(data) {
  return request({
    url: '/webapi/storage/adjustmentType/confirmAdjustment.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 类型调整单-查询某个类型调整详情
export async function typeToGoodsDetailById(data) {
  return request({
    url: '/webapi/storage/adjustmentType/toGoodsDetailById.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 类型调整单-保存库存调整单表体事业部信息并推送库存
export async function typeConfirmInDepot(data) {
  return request({
    url: '/webapi/storage/adjustmentType/confirmInDepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 库存调整单-库存调整单列表查询
export async function listAdjustment(data) {
  return request({
    url: '/webapi/storage/adjustmentInventory/listAdjustment.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 库存调整单-库存调整单详情
export async function adjustmentDetail(data) {
  return request({
    url: '/webapi/storage/adjustmentInventory/toDetailsPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 库存调整单-修改备注和归属数据
export async function modfiyRemarkAndSourceTimeById(data) {
  return request({
    url: '/webapi/storage/adjustmentInventory/modfiyRemarkAndSourceTimeById.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 库存调整单-删除库存调整单
export async function adjustdDleteAdjustment(data) {
  return request({
    url: '/webapi/storage/adjustmentInventory/deleteAdjustment.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}
// 库存调整单-根据查询条件导出库存调整单
export const exportAdjustmentInventoryUrl = '/webapi/storage/adjustmentInventory/exportAdjustmentInventory.asyn'

// 库存调整单-分配事业部加载单据详情
export async function getDetails(data) {
  return request({
    url: '/webapi/storage/adjustmentInventory/getDetails.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 库存调整单-保存库存调整单表体事业部信息并推送库存
export async function saveBuDetails(data) {
  return request({
    url: '/webapi/storage/adjustmentInventory/saveBuDetails.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 库存调整单-导入
export const importAdjustmentUrl = '/webapi/storage/adjustmentInventory/importAdjustment.asyn'

// 库存调整单-获取调减商品分组统计数量
export async function getAdjustmentSum(data) {
  return request({
    url: '/webapi/storage/adjustmentInventory/getAdjustmentSum.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 库存调整单-审核库存调整
export async function auditAdjustment(data) {
  return request({
    url: '/webapi/storage/adjustmentInventory/auditAdjustment.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}
