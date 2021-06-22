import request from '@u/http'
import qs from 'qs'

// 调拨理货单-获取分页数据
export async function listTallyingOrderTransfer(data) {
  return request({
    url: '/webapi/transfer/transferTallying/listTallyingOrderTransfer.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨理货单-拨理货单确认/驳回
export async function tallyConfirmTransfer(data) {
  return request({
    url: '/webapi/transfer/transferTallying/tallyConfirmTransfer.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨理货单-根据ID查找详情
export async function getTallyDetail(data) {
  return request({
    url: '/webapi/transfer/transferTallying/toDetailPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨出库-获取分页数据
export async function listTransferOutDepot(data) {
  return request({
    url: '/webapi/transfer/transferOut/transferOutDepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨出库-获取导出调拨出库单的数量
export async function exportOutDepotCount(data) {
  return request({
    url: '/webapi/transfer/transferOut/exportOutDepotCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨出库-获取导出调拨出库单的数量
export const exportOutDepotUrl = '/webapi/transfer/transferOut/exportOutDepot.asyn'

// 调拨出库-根据ID查找详情
export async function transferOutDetail(data) {
  return request({
    url: '/webapi/transfer/transferOut/toDetailPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调入调出流水-获取分页数据
export async function transferOutInList(data) {
  return request({
    url: '/webapi/transfer/transferOutIn/transferOutInList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨入库-获取分页数据
export async function listTransferIn(data) {
  return request({
    url: '/webapi/transfer/transferIn/transferInDepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨入库-获取导出调拨入库单的数量
export async function exportInDepotCount(data) {
  return request({
    url: '/webapi/transfer/transferIn/exportInDepotCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨入库-调拨入库单导出
export const exportInDepotUrl = '/webapi/transfer/transferIn/exportInDepot.asyn'

// 调拨入库-根据ID查找详情
export async function getTransferInDetail(data) {
  return request({
    url: '/webapi/transfer/transferIn/toDetailPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨订单-调拨订单列表查询
export async function listTransferOrder(data) {
  return request({
    url: '/webapi/order/transfer/listTransferOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨订单-获取调拨订单详情
export async function getTransferOrderDetail(data) {
  return request({
    url: '/webapi/order/transfer/getTransferOrderDetail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨订单-删除调拨订单
export async function delTransferOrder(data) {
  return request({
    url: '/webapi/order/transfer/delTransferOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨订单-导入调拨订单
export const importTransferUrl = '/webapi/order/transfer/importTransfer.asyn'

// 调拨订单-导出
export const exportTransferOrderUrl = '/webapi/order/transfer/exportTransferOrder.asyn'

// 调拨订单-一键清关资料导出
export const exportCustomsDeclareUrl = '/webapi/order/transfer/exportCustomsDeclare.asyn'

// 调拨订单-打托出库时间校验
export async function validOutDepotDate(data) {
  return request({
    url: '/webapi/order/transfer/validOutDepotDate.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨订单-查询调拨订单是否出库或入库
export async function isExistTransferOutOrInOrder(data) {
  return request({
    url: '/webapi/order/transfer/isExistTransferOutOrInOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨订单-查询调拨订单是否出库或入库
export async function saveTransferOutDepot(data) {
  return request({
    url: '/webapi/transfer/transferOut/saveTransferOutDepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨订单-校验出库时间
export async function validInDepotDate(data) {
  return request({
    url: '/webapi/order/transfer/validInDepotDate.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨订单-调拨订单上架入库保存
export async function saveTransferInDepot(data) {
  return request({
    url: '/webapi/transfer/transferIn/saveTransferInDepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨入库 审核
export async function auditTransferInDepot(data) {
  return request({
    url: '/webapi/transfer/transferIn/auditTransferInDepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨出库 审核
export async function auditTransferOutDepot(data) {
  return request({
    url: '/webapi/transfer/transferOut/auditTransferOutDepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨出库 拨出库单商品合并详情
export async function getTransferOutItemSumByIds(data) {
  return request({
    url: '/webapi/transfer/transferOut/getTransferOutItemSumByIds.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨订单 获取页面必填字段
export async function getMustParameter(data) {
  return request({
    url: '/webapi/order/transfer/getMustParameter.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨入库-导入调拨入库单
export const importTransferInOrderUrl = '/webapi/transfer/transferIn/importTransferInOrder.asyn'

// 调拨出库-导入
export const importAdjustmentUrl = '/webapi/transfer/transferOut/importAdjustment.asyn'

// 调拨订单 调拨订单商品导入
export const importTransferGoodsUrl = '/webapi/order/transfer/importTransferGoods.asyn'

// 调拨订单 商品导出
export const exportItemsUrl = '/webapi/order/transfer/exportItems.asyn'

// 调拨订单 新增/编辑页面——保存调拨订单
export async function saveTempTransferOrder(data) {
  return request({
    url: '/webapi/order/transfer/saveTempTransferOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨订单 调拨单编辑保存并审核
export async function updateTransferOrder(data) {
  return request({
    url: '/webapi/order/transfer/updateTransferOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取导出清关模板
export async function getExportTemplate(data) {
  return request({
    url: '/webapi/order/customsFileConfig/getExportTemplate.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨订单列表-调拨单新增保存并审核
export async function saveTransferOrder(data) {
  return request({
    url: '/webapi/order/transfer/saveTransferOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 调拨订单列表-导入装箱明细
export const importPackingDetailsUrl = '/webapi/order/transfer/importPackingDetails.asyn'
