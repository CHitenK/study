/**
 * 公司档案 api
 */
import request from '@u/http'
import qs from 'qs'

 /**
  * 税率配置 Api
  */

// 公司档案 - 税率配置 - 获取列表分页数据
export const listTariffRate = (data) => {
  return request({
    url: '/webapi/system/tariffRate/listTariffRate.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 公司档案 - 税率配置 - 删除
export const delTarffRate = (data) => {
  return request({
    url: '/webapi/system/tariffRate/delTarffRate.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 公司档案 - 税率配置 - 新增税率配置信息复制地址复制文档
export const saveTariffRate = (data) => {
  return request({
    url: '/webapi/system/tariffRate/saveTariffRate.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 公司档案 - 交易链路配置 - 列表
export const listTradeLinkConfig = (data) => {
  return request({
    url: '/webapi/order/tradeLinkConfig/listTradeLinkConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 公司档案 - 交易链路配置 - 删除
export const deleConfig = (data) => {
  return request({
    url: '/webapi/system/groupCommbarcode/delete.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 公司档案 - 交易链路配置 - 保存
export const saveTradeLinkConfig = (data) => {
  return request({
    url: '/webapi/order/tradeLinkConfig/saveTradeLinkConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 公司档案 - 交易链路配置 - 修改
export const modifyTradeLinkConfig = (data) => {
  return request({
    url: '/webapi/order/tradeLinkConfig/modifyTradeLinkConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 公司档案 - 部门管理 - 访问列表页面
export const listDepartmentInfo = (data) => {
  return request({
    url: '/webapi/system/departmentInfo/listDepartmentInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 公司档案 - 部门管理 - 编辑
export const modifyDepartmentInfo = (data) => {
  return request({
    url: '/webapi/system/departmentInfo/modifyDepartmentInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 公司档案 - 部门管理 - 新增
export const saveDepartmentInfo = (data) => {
  return request({
    url: '/webapi/system/departmentInfo/saveDepartmentInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}
