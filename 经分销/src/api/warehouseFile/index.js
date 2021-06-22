/**
 * 仓库档案
 */
import request from '@u/http'
import qs from 'qs'

/**
 * 关区配置 Api
 */

// 仓库档案 - 关区配置 - 获取列表分页数据
export async function getCustomsAreaList(data) {
  return request({
    url: '/webapi/system/customsArea/listCustomsArea.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 仓库档案 - 关区配置 - 删除
export async function delCustomsArea(data) {
  return request({
    url: '/webapi/system/customsArea/delCustoms.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 仓库档案 - 关区配置 - 新增关区配置信息
export async function addCustomsArea(data) {
  return request({
    url: '/webapi/system/customsArea/saveCustomsArea.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 仓库档案 - 关区配置 - 导出关区配置信息
export const exportCustomsAreaUrl = '/webapi/system/customsArea/exportCustomsArea.asyn'

// 仓库档案 - 关区配置 - 导入关区配置
export const importCustomsAreaUrl = '/webapi/system/customsArea/importCustomsArea.asyn'
