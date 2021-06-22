/**
 * 销售出库明细表 api
 */
import request from '@u/http'
import qs from 'qs'

// 销售管理 - 销售出库明细 - 销售出库明细列表信息
export const getSaleOutDepotDetailsList = data => {
  return request({
    url: '/webapi/order/saleOutDetails/listSaleOutDepotDetails.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售出库明细 - 获取导出销售出库明细的数量
export const getSaleOutDepotDetailsCount = data => {
  return request({
    url: '/webapi/order/saleOutDetails/getOrderCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售出库明细 - 导出
export const exportSaleOutDepotDetailsUrl = '/webapi/order/saleOutDetails/exportSaleOutDepotDetails.asyn'
