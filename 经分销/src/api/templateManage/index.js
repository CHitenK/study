import request from '@u/http'
import qs from 'qs'

// 模版管理-分页获取模版列表
export async function listFiletemp(data) {
  return request({
    url: '/webapi/order/fileTemp/listFiletemp.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 模版管理-获取模板适用客户
export async function getRelCustomer(data) {
  return request({
    url: '/webapi/order/fileTemp/getRelCustomer.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 模版管理-保存关联客户
export async function saveCustomerRel(data) {
  return request({
    url: '/webapi/order/fileTemp/saveCustomerRel.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 模版管理-根据ID获取模版信息
export async function getDetailsById(data) {
  return request({
    url: '/webapi/order/fileTemp/getDetailsById.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 模版管理-根据ID获取模版信息
export async function saveOrModify(data) {
  return request({
    url: '/webapi/order/fileTemp/saveOrModify.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 清关单证配置列表查询
export async function listCustomsFileConfig(data) {
  return request({
    url: '/webapi/order/customsFileConfig/listCustomsFileConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 清关单证配置列表 删除
export async function delCustomsFileConfig(data) {
  return request({
    url: '/webapi/order/customsFileConfig/delCustomsFileConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 清关单证配置列表 新增/保存
export async function customsFileSaveOrModify(data) {
  return request({
    url: '/webapi/order/customsFileConfig/saveOrModify.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 清关单证配置 获取编辑页面关联仓库列表信息
export async function listDepotRel(data) {
  return request({
    url: '/webapi/order/customsFileConfig/listDepotRel.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}
