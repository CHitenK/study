import request from '@u/http'
import qs from 'qs'

//  欧莱雅管理欧莱雅采购订单
export async function listSupplierMerchandise(data) {
  return request({
    url: '/webapi/system/supplierMerchandise/listSupplierMerchandise.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 欧莱雅管理欧莱雅 - 导出
export const supplierMerchandiseExportUrl = '/webapi/system/supplierMerchandise/export.asyn'

//  欧莱雅采购订单管理 分页
export async function listByPage(data) {
  return request({
    url: '/webapi/order/orealPurchaseOrder/listByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

//  欧莱雅采购订单管理 导出
export const orealPurchaseOrderExportUrl = '/webapi/order/orealPurchaseOrder/export.asyn'

//  欧莱雅采购订单管理 详情
export async function toDetailsPage(data) {
  return request({
    url: '/webapi/order/orealPurchaseOrder/toDetailsPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}
