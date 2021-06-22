/**
 * 爬虫配置 api
 */
import request from '@u/http'
import qs from 'qs'

/**
 * 爬虫商品对照表 Api
 */

// 爬虫配置 - 爬虫商品对照表 - 爬虫商品对照表信息
export const getContrastList = (data) => {
  return request({
    url: '/webapi/order/contrast/contrastList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 爬虫配置 - 爬虫商品对照表 - 编辑页面回显
export const toContrastEditPage = (data) => {
  return request({
    url: '/webapi/order/contrast/toEditPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 爬虫配置 - 爬虫商品对照表 - 新增/修改
export const saveContrast = (data) => {
  return request({
    url: '/webapi/order/contrast/saveContrast.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 爬虫配置 - 爬虫商品对照表 - 根据ID获取商品详情
export const getContrastdetail = (data) => {
  return request({
    url: '/webapi/order/contrast/detail.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 爬虫配置 - 爬虫商品对照表 - 根据商家ID、货号查询商品
export const getByMerchantAndGoodsNo = (data) => {
  return request({
    url: '/webapi/order/contrast/getByMerchantAndGoodsNo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 爬虫配置 - 爬虫商品对照表 - 导出
export const exportContrastUrl = '/webapi/order/contrast/exportContrast.asyn'

/**
 * 商品对照表 Api
 */

// 爬虫配置 - 商品对照表 - 查询商品对照表列表信息
export const getGroupMerchandiseContrast = (data) => {
  return request({
    url: '/webapi/order/groupMerchandiseContrast/listGroupMerchandiseContrast.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 爬虫配置 - 商品对照表 - 获取店铺
export const getShop = (data) => {
  return request({
    url: '/webapi/order/groupMerchandiseContrast/getShop.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 爬虫配置 - 商品对照表 - 批量删除商品对照信息
export const deleteGroupMerchandise = (data) => {
  return request({
    url: '/webapi/order/groupMerchandiseContrast/deleteGroupMerchandise.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 爬虫配置 - 商品对照表 - 访问详情页面
export const getGroupMerchandiseContrastDetail = (data) => {
  return request({
    url: '/webapi/order/groupMerchandiseContrast/toDetailsPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 爬虫配置 - 商品对照表 - 访问编辑页面
export const getGroupMerchandiseContrastEdit = (data) => {
  return request({
    url: '/webapi/order/groupMerchandiseContrast/toEditPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 爬虫配置 - 商品对照表 - 新增保存
export const saveGroupMerchandiseContrast = (data) => {
  return request({
    url: '/webapi/order/groupMerchandiseContrast/saveGroupMerchandiseContrast.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 爬虫配置 - 商品对照表 - 编辑保存
export const modifyGroupMerchandiseContrast = (data) => {
  return request({
    url: '/webapi/order/groupMerchandiseContrast/modifyGroupMerchandiseContrast.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 爬虫配置 - 商品对照表 - 判断同一店铺编码、同一商家、同一组合品ID是否存在
export const validateShop = (data) => {
  return request({
    url: '/webapi/order/groupMerchandiseContrast/getGroupMerchantContrast.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 爬虫配置 - 商品对照表 - 导入
export const importExcel = '/webapi/order/groupMerchandiseContrast/importExcel.asyn'

// 爬虫配置 - 商品对照表 - 导出
export const exportInfo = '/webapi/order/groupMerchandiseContrast/exportInfo.asyn'
