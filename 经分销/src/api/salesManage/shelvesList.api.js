/**
 * 上架列表 api
 */
import request from '@u/http'
import qs from 'qs'

// 销售管理 - 上架单 - 查询销售上架列表信息
export const listShelf = data => {
  return request({
    url: '/webapi/order/shelf/listShelf.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 上架单 - 获取导出销售上架单的数量
export const getOrderCount = data => {
  return request({
    url: '/webapi/order/shelf/getOrderCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 上架单 - 查询详情
export const toDetailsPage = data => {
  return request({
    url: '/webapi/order/shelf/toDetailsPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 上架单 - 导出上架单
export const exportShelfUrl = '/webapi/order/shelf/exportShelf.asyn'

// 销售管理 - 上架入库单 - 查询销售上架入库列表信息
export const listSaleShelfIdepot = data => {
  return request({
    url: '/webapi/order/saleShelfIdepot/listSaleShelfIdepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 上架入库单 - 获取导出电商订单的数量
export const getSaleShelfIdepotCount = data => {
  return request({
    url: '/webapi/order/saleShelfIdepot/getOrderCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 上架入库单 - 查询详情
export const saleShelfIdepotDetail = data => {
  return request({
    url: '/webapi/order/saleShelfIdepot/toDetailsPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 生成销售SD单
export const generateSaleSdOrder = (data) => {
  return request({
    url: '/webapi/order/shelf/generateSaleSdOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 上架入库单 - 导出上架入库
export const exportSaleShelfIdepotUrl = '/webapi/order/saleShelfIdepot/exportSaleShelfIdepot.asyn'
