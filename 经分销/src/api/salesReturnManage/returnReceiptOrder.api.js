/**
 * 销售退货入库清单 api
 */
import request from '@u/http'
import qs from 'qs'

// 销售退货管理 - 销售退货入库清单 - 获取销售退货入库列表信息
export const getSaleReturnIdepotList = (data) => {
  return request({
    url: '/webapi/order/saleReturnIdepot/listSaleReturnIdepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货入库清单 - 销售退货入库列表详情
export const getSaleReturnIdepotDetail = (data) => {
  return request({
    url: '/webapi/order/saleReturnIdepot/toDetailsPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货入库清单 - 获取导出销售退货入库清单的数量
export const getSaleReturnIdepotrCount = (data) => {
  return request({
    url: '/webapi/order/saleReturnIdepot/getOrderCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货入库清单 - 审核
export const auditSaleReturnIdepot = (data) => {
  return request({
    url: '/webapi/order/saleReturnIdepot/auditSaleReturnIdepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货入库清单 - 导出
export const exportSaleReturnIdepotUrl = '/webapi/order/saleReturnIdepot/exportSaleReturnIdepot.asyn'

// 销售退货管理 - 销售退货入库清单 - 导入
export const importSaleReturnIdepotUrl = '/webapi/order/saleReturnIdepot/importSaleReturnIdepot.asyn'
