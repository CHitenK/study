import request from '@/utils/request'
// const pfChannel = +sessionStorage.getItem('CHANNEL_ID') || 36
const baseUrl = process.env.VUE_APP_API_ROOT || ''
// import Qs from 'qs'

/**
 * 根据指定的时间段校验优惠券id是否在此时间内可用
 * @param {Array} idList 优惠卷id
 * @param {Long} startTime 开始时间
 * @param {Long} endTime 结束是时间
 * @returns {Funtion}
 */
export function checkCoupon(params) {
  let key
  for (key in params) {
    if (!params[key] && params[key] !== false) {
      delete params[key]
    }
  }
  return request({
    url: baseUrl + '/mall/buildingBlock/coupon',
    method: 'post',
    data: { ...params, pfChannel: +sessionStorage.getItem('CHANNEL_ID') || 36 }
  })
}
/**
 * 根据指定的时间段校验奖励佣金ID是否在此时间内可用
 * @param {Array} idList 优惠卷id
 * @param {Long} startTime 开始时间
 * @param {Long} endTime 结束是时间
 * @returns {Funtion}
 */
export function checkSalse(params) {
  let key
  for (key in params) {
    if (!params[key] && params[key] !== false) {
      delete params[key]
    }
  }
  return request({
    url: baseUrl + '/mall/buildingBlock/brokerage',
    method: 'post',
    data: { pfChannel: +sessionStorage.getItem('CHANNEL_ID') || 36, ...params }
  })
}
/**
 * @description 分页查询专题信息
 * @param {String} title 标题名称
 * @param {String} id 专题id
 * @param {String} status 状态（-1，已下线，0待上线，1上线中）
 * @param {String} createName 创建人
 * @param {Boolean} isForever 是否永久生效
 * @param {Long} createTime 创建时间开始
 * @param {Long} startTime 上线时间开始
 * @param {Long} pfChannelId 渠道号
 * @returns {Promise}
 */
export function getBatchBlock(params) {
  let key
  for (key in params) {
    if (!params[key] && params[key] !== false) {
      delete params[key]
    }
  }
  return request({
    url: baseUrl + '/base/block/getBatchBlock',
    method: 'post',
    data: { ...params, pfChannelId: +sessionStorage.getItem('CHANNEL_ID') || 36 }
  })
}
// 专题数据保存接口
export function insertBlock(data) {
  return request({
    url: baseUrl + '/base/block/insertBlock',
    method: 'post',
    data: { ...data, pfChannelId: data.pfChannelId || +sessionStorage.getItem('CHANNEL_ID') || 36 }
  })
}
/**
 * @description 校验商品id是否存在
 * @param {String} id 商品id
 * @param {String} pfChannel 渠道ID
 */
export function checkProductId(id) {
  return request({
    url: baseUrl + '/mall/buildingBlock/product',
    method: 'get',
    params: { id, pfChannel: +sessionStorage.getItem('CHANNEL_ID') || 36 }
  })
}
/**
 * @description 校验活动id是否存在
 * @param {String} id 商品id
 * @param {String} activityType 活动类型；
 * promotionType促销活动（整点秒杀、天天特价、精选活动
 * bargainActivity： 砍价活动
 * secondPieces：第二件半价
 * hotActivity： 今日爆款
 * saleSpecial  销售专场
 */
export function checkActivity(data) {
  return request({
    url: baseUrl + '/mall/buildingBlock/activity',
    method: 'post',
    data: { pfChannel: +sessionStorage.getItem('CHANNEL_ID') || 36, ...data }
  })
}
/**
 * @description 校验专题id是否存在
 * @param {String} specialId 专题id
 * @param {String} pfChannelId 渠道ID
 */
export function checkBatchProduct(data) {
  let key
  for (key in data) {
    if (!data[key] && data[key] !== false) {
      delete data[key]
    }
  }
  return request({
    url: baseUrl + '/base/block/isBlockExisting',
    method: 'get',
    params: { pfChannelId: +sessionStorage.getItem('CHANNEL_ID') || 36, ...data }
  })
}
/**
 * @description 修改专题
 */
export function updateBlock(data) {
  return request({
    url: '/base/block/updateBlock',
    method: 'post',
    data: { ...data, pfChannelId: +sessionStorage.getItem('CHANNEL_ID') || 36 }
  })
}
/**
 * @description 查询专题详情
 */
export function getBlockById(specialId) {
  return request({
    url: baseUrl + '/base/block/findOneBlock',
    method: 'get',
    params: { specialId }
  })
}
/**
 * @description 通过活动Id 查询商品列表
 * @param {String} id 活动idid
 * @param {Number} startTime 启用时间 开始时间
 * @param {Bunber} endTime 启用结束时间
 * @param {String} activityType 活动类型
 */
export function getActivityProduct(data) {
  let key
  for (key in data) {
    if (!data[key] && data[key] !== false) {
      delete data[key]
    }
  }
  return request({
    url: baseUrl + '/mall/buildingBlock/activityProduct',
    method: 'post',
    data: { pfChannel: +sessionStorage.getItem('CHANNEL_ID') || 36, ...data, sortType: +data.sortType }
  })
}
/**
 * @description 校验多个活动ID是否存在，是否在指定时间可用
 * @param {Array} list 数组
 * @param {String} id 活动idid
 * @param {Number} startTime 启用时间 开始时间
 * @param {Bunber} endTime 启用结束时间
 * @param {String} activityType 活动类型
 */
export function manyActivityCheckout(data) {
  return request({
    url: baseUrl + '/mall/buildingBlock/manyActivityCheckout',
    method: 'post',
    data: { pfChannel: +sessionStorage.getItem('CHANNEL_ID') || 36, ...data }
  })
}
/**
 * @description 校验多个商品ID是否存在
 * @param {Array} idList 数组
 */
export function checkProductList(data) {
  return request({
    url: baseUrl + '/mall/buildingBlock/productList',
    method: 'post',
    data: { pfChannel: +sessionStorage.getItem('CHANNEL_ID') || 36, ...data }
  })
}
/**
 * @description
 */
export function isBlockExistingByIds(data) {
  let key
  for (key in data) {
    if (!data[key] && data[key] !== false) {
      delete data[key]
    }
  }
  return request({
    url: baseUrl + '/base/block/isBlockExistingByIds',
    method: 'get',
    params: { pfChannelId: +sessionStorage.getItem('CHANNEL_ID') || 36, ...data }
  })
}
/**
 * @description 专题日志列表查询
 * @param {String} specialId 专题Id
 */
export function getBatchBlockLog(data) {
  return request({
    url: baseUrl + '/base/block/getBatchBlockLog',
    method: 'post',
    data
  })
}

/**
 * @description 专题日志列表查询
 * @param {String} specialId 专题Id
 */
export function getBlockJson(data) {
  return request({
    url: baseUrl + '/block/getBlockById',
    method: 'GET',
    params: data
  })
}
// 导出模板
export const epxTemplate = baseUrl + 'mall/buildingBlock/exportProductInfoTemplate'
/**
 * @description 下载导入商品信息的excel
 * @param {Arrsy} productExcelDtoList 商品列表
*/
export const exportProductInfo = baseUrl + '/mall/buildingBlock/exportProductInfo'

/**
 * @description 下载导入商品信息的excel
 *
 */
// export const importProductExcel = baseUrl + '/mall/buildingBlock/importProductExcel'
/**
 * @description 下载导入商品信息的excel
 */
export function importProductExcel(data) {
  return request({
    url: baseUrl + '/mall/buildingBlock/importProductExcel',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

/**
 * @description 校验专题模块
 */
export function checkUseLabelsById(data) {
  return request({
    url: baseUrl + '/base/block/checkUseLabelsById',
    method: 'POST',
    data: { pfChannelId: +sessionStorage.getItem('CHANNEL_ID') || 36, ...data }
  })
}
