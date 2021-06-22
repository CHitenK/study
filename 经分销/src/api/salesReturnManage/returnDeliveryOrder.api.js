/**
 * 销售退货出库订单 api
 */
import request from '@u/http'
import qs from 'qs'

// 销售退货管理 - 销售退货出库订单 - 查询销售退货出库单列表信息
export const getSaleReturnOdepotList = (data) => {
  return request({
    url: '/webapi/order/saleReturnOdepot/listSaleReturnOdepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货出库订单 - 查询详情信息
export const getSaleReturnOdepotDetail = (data) => {
  return request({
    url: '/webapi/order/saleReturnOdepot/toDetailsPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货出库订单 - 获取导出销售退货出库清单的数量
export const getOrderCount = (data) => {
  return request({
    url: '/webapi/order/saleReturnOdepot/getOrderCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货出库订单 - 审核
export const auditSaleReturnOdepot = (data) => {
  return request({
    url: '/webapi/order/saleReturnOdepot/auditSaleReturnOdepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货出库订单 - 导出
export const exportSaleReturnOdepotUrl = '/webapi/order/saleReturnOdepot/exportSaleReturnOdepot.asyn'

// 销售退货管理 - 销售退货出库订单 - 导入
export const importSaleReturnOdepotUrl = '/webapi/order/saleReturnOdepot/importSaleReturnOdepot.asyn'
