import request from '@u/http'
import qs from 'qs'

// 汇率配置列表-获取分页数据
export async function listRateConfig(data) {
  return request({
    url: '/webapi/system/rateConfig/listRateConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 汇率配置列表-删除
export async function delRateConfig(data) {
  return request({
    url: '/webapi/system/rateConfig/delRateConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 汇率配置列表-导出
export const rateConfigExportUrl = '/webapi/system/rateConfig/export.asyn'

// 汇率配置列表-新增
export async function saveRateConfig(data) {
  return request({
    url: '/webapi/system/rateConfig/saveRateConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 汇率管理列表-分页
export async function listRate(data) {
  return request({
    url: '/webapi/system/rate/listRate.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 汇率管理列表-导出
export const exportRateUrl = '/webapi/system/rate/exportRate.asyn'

// 汇率管理列表-删除
export async function delRate(data) {
  return request({
    url: '/webapi/system/rate/delRate.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 汇率管理列表-获取汇率
export async function getCurrencyRates(data) {
  return request({
    url: '/webapi/system/rate/getCurrencyRates.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 汇率管理列表-新增
export async function saveRate(data) {
  return request({
    url: '/webapi/system/rate/saveRate.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}
