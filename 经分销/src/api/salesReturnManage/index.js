/**
 * 销售退货订单 api
 */
import request from '@u/http'
import qs from 'qs'

// 销售退货管理 - 销售退货订单 - 首页
export const getSaleReturnList = (data) => {
  return request({
    url: '/webapi/order/saleReturn/listSaleReturnOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货订单 - 详情页面
export const getSaleReturnDetail = (data) => {
  return request({
    url: '/webapi/order/saleReturn/toDetailsPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货订单 - 删除
export const delSaleReturnOrder = (data) => {
  return request({
    url: '/webapi/order/saleReturn/delSaleReturnOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货订单 - 审核
export const auditSaleReturnOrder = (data) => {
  return request({
    url: '/webapi/order/saleReturn/auditSaleReturnOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货订单 - 访问编辑页面
export const toEditPage = (data) => {
  return request({
    url: '/webapi/order/saleReturn/toEditPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货订单 - 访问新增页面
export const toAddPage = (data) => {
  return request({
    url: '/webapi/order/saleReturn/toAddPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货订单 - 访问上架入库页面
export const toSaleReturnInPage = (data) => {
  return request({
    url: '/webapi/order/saleReturn/toSaleReturnInPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货订单 - 访问出库打托页面
export const toOutDepotReport = (data) => {
  return request({
    url: '/webapi/order/saleReturn/toOutDepotReport.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货订单 - 编辑
export const modifySaleReturnOrder = (data) => {
  return request({
    url: '/webapi/order/saleReturn/modifySaleReturnOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货订单 - 新增
export const saveSaleReturnOrder = (data) => {
  return request({
    url: '/webapi/order/saleReturn/saveSaleReturnOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货订单 - 查询销售退新增购销退货列表信息
export const saleGetListSaleOrderByPage = (data) => {
  return request({
    url: '/webapi/order/sale/saleGetListSaleOrderByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货订单 - 校验是否相同出仓仓库、相同客户
export const isSameParameter = (data) => {
  return request({
    url: '/webapi/order/saleReturn/isSameParameter.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货订单 - 导出
export const exportSaleReturnUrl = '/webapi/order/saleReturn/exportSaleReturn.asyn'

// 销售退货管理 - 销售退货订单 - 导入销售退货订单(代销退货的)
export const importSaleReturn = '/webapi/order/saleReturn/importSaleReturn.asyn'

// 销售退货管理 - 销售退货订单 - 导入销售退货订单(消费者退货的)
export const importSaleReturn2 = '/webapi/order/saleReturn/importSaleReturn2.asyn'

// 销售退货订单-校验入库时间是否满足条件
export const validInDepotDate = (data) => {
  return request({
    url: '/webapi/order/saleReturn/validInDepotDate.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货订单-上架入库
export const saveSaleReturnIdepot = (data) => {
  return request({
    url: '/webapi/order/saleReturn/saveSaleReturnIdepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货订单-保存出库打托信息
export const saveOdepotReport = (data) => {
  return request({
    url: '/webapi/order/saleReturn/saveOdepotReport.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货订单-是否可以出库打托
export const isOutdepotReport = (data) => {
  return request({
    url: '/webapi/order/saleReturn/isOutdepotReport.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货订单 - 根据商家客户id带出税率
export const getRateByCustomerAndMerchant = (data) => {
  return request({
    url: '/webapi/system/customer/getRateByCustomerAndMerchant.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退货订单 - 获取导出订单的数量
export const getSaleReturnCount = (data) => {
  return request({
    url: '/webapi/order/saleReturn/getOrderCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}
