/**
 * 销售出库清单 api
 */
import request from '@u/http'
import qs from 'qs'

// 销售管理 - 销售出库清单 - 审核
export const auditSaleOutDepot = data => {
  return request({
    url: '/webapi/order/saleOut/auditSaleOutDepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售出库清单 - 删除手工导入订单
export const delSaleOut = data => {
  return request({
    url: '/webapi/order/saleOut/delSaleOut.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售出库清单 - 获取导出销售出库清单的数量
export const getOrderCount = data => {
  return request({
    url: '/webapi/order/saleOut/getOrderCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售出库清单 - 获取选中订单的所有商品和对应数量（相同商品数量叠加）
export const getOrderGoodsInfo = data => {
  return request({
    url: '/webapi/order/saleOut/getOrderGoodsInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售出库清单 - 查询销售出库列表信息
export const listSaleOutDepot = data => {
  return request({
    url: '/webapi/order/saleOut/listSaleOutDepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售出库清单 - 查询详情页面上架明细列表信息
export const listSaleOutShelf = data => {
  return request({
    url: '/webapi/order/saleOut/listSaleOutShelf.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售出库清单 - 查询销售出库详情
export const toDetailsPage = data => {
  return request({
    url: '/webapi/order/saleOut/toDetailsPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售出库清单 - 导出
export const exportSaleOutDepotUrl = '/webapi/order/saleOut/exportSaleOutDepot.asyn'

// 销售管理 - 销售出库清单 - 导入
export const importSaleOutDepotUrl = '/webapi/order/saleOut/importSaleOutDepot.asyn'
