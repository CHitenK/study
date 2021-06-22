import request from '@u/http'
import qs from 'qs'

// 类型调整单列表查询
export async function getlistAdjustment(data) {
  return request({
    url: '/webapi/storage/adjustmentType/listAdjustment.asyn',
    // headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    data: qs.stringify(data)
  })
}
// 调整单详情
export async function getAdjustmentTypeDetail(data) {
  return request({
    url: '/webapi/storage/adjustmentType/getDetailById.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 仓储管理 - 盘点指令列表 - 盘点指令列表查询
export async function getTakesStockList(data) {
  return request({
    url: '/webapi/storage/takesstock/listTakesStock.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 仓储管理 - 盘点指令列表 - 获取详情页面信息
export async function getTakesStockDetail(data) {
  return request({
    url: '/webapi/storage/takesstock/toDetailPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 仓储管理 - 盘点指令列表 - 新增盘点指令
export async function saveTakesStock(data) {
  return request({
    url: '/webapi/storage/takesstock/saveTakesStock.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 仓储管理 - 盘点指令列表 - 编辑盘点指令
export async function updateTakesStock(data) {
  return request({
    url: '/webapi/storage/takesstock/updateTakesStock.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 仓储管理 - 盘点指令列表 - 获取编辑页面信息
export async function getEditDetail(data) {
  return request({
    url: '/webapi/storage/takesstock/toEdit.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 仓储管理 - 盘点指令列表 - 发送盘点指令
export async function sendtakesStock(data) {
  return request({
    url: '/webapi/storage/takesstock/sendtakesStock.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 仓储管理 - 盘点指令列表 - 删除
export async function delTakesStockBatch(data) {
  return request({
    url: '/webapi/storage/takesstock/delTakesStockBatch.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 类型调整单列表导出
export const exportAdjustmentTypeUrl = '/webapi/storage/adjustmentType/exportAdjustmentType.asyn'

// 类型调整单列表导入
export const importAdjustmentUrl = '/webapi/storage/adjustmentType/importAdjustment.asyn'
