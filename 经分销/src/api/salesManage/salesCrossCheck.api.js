/**
 * 预售勾稽列表 api
 */
import request from '@u/http'
import qs from 'qs'

// 销售管理 - 预售勾稽列表 - 查询预售勾稽列表信息
export const listPreSaleOrderCorrelation = data => {
  return request({
    url: '/webapi/order/preSaleOrderCorrelation/listPreSaleOrderCorrelation.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 预售勾稽列表 - 访问详情页面
export const toDetailsPage = data => {
  return request({
    url: '/webapi/order/preSaleOrderCorrelation/toDetailsPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 预售勾稽列表 - 导出
export const exportPreSaleOrderCorrelationUrl = '/webapi/order/preSaleOrderCorrelation/exportPreSaleOrderCorrelation.asyn'
