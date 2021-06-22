import request from '@u/http'
import qs from 'qs'

// 补货动销报表-获取分页数据
export async function listPurchasingReports(data) {
  return request({
    url: '/webapi/order/purchasingReports/listPurchasingReports.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 补货动销报表-导出
export const exportPurchasingReportsUrl = '/webapi/order/purchasingReports/exportPurchasingReports.asyn'

// 补货动销报表-获取导出销售订单的数量
export async function getOrderCount(data) {
  return request({
    url: '/webapi/order/purchasingReports/getOrderCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 平台商品管理-获取分页数据
export async function listByPage(data) {
  return request({
    url: '/webapi/order/platformMerchandise/listByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 平台商品管理-导出
export const platformMerchandiseUrl = '/webapi/order/platformMerchandise/export.asyn'

// 平台商品管理-商品导入
export const platformMerchandiseImportUrl = '/webapi/order/platformMerchandise/platformMerchandiseImport.asyn'

// 平台商品管理-箱规导入
export const cartonSizeImportUrl = '/webapi/order/platformMerchandise/cartonSizeImport.asyn'
