import request from '@u/http'
import qs from 'qs'

// 项目额度配置-获取分页数据
export async function getListByPage(data) {
  return request({
    url: '/webapi/order/projectQuotaConfig/getListByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 项目额度配置-新增或编辑项目额度配置
export async function saveOrUpdateProjectQuotaConfig(data) {
  return request({
    url: '/webapi/order/projectQuotaConfig/saveOrUpdateProjectQuotaConfig.asyn',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 项目额度配置-删除项目额度配置
export async function delProjectQuotaConfig(data) {
  return request({
    url: '/webapi/order/projectQuotaConfig/delProjectQuotaConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 项目额度配置-删除项目额度配置
export async function getProjectQuotaConfigById(data) {
  return request({
    url: '/webapi/order/projectQuotaConfig/getProjectQuotaConfigById.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 项目额度配置-审核项目额度配置
export async function auditProjectQuotaConfig(data) {
  return request({
    url: '/webapi/order/projectQuotaConfig/auditProjectQuotaConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客户额度配置-获取分页数据
export async function listDTOByPage(data) {
  return request({
    url: '/webapi/order/customerQuotaConfig/listDTOByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客户额度配置-保存
export async function saveCustomerQuotaConfigDTO(data) {
  return request({
    url: '/webapi/order/customerQuotaConfig/saveCustomerQuotaConfigDTO.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客户额度配置-审核
export async function auditCustomerQuotaConfigDTO(data) {
  return request({
    url: '/webapi/order/customerQuotaConfig/auditCustomerQuotaConfigDTO.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客户额度配置- 删除
export async function delCustomerQuotaConfigDTO(data) {
  return request({
    url: '/webapi/order/customerQuotaConfig/delCustomerQuotaConfigDTO.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 项目额度配置-获取最新已审核期初账期信息
export async function getLatestPeriodInfo(data) {
  return request({
    url: '/webapi/order/projectQuotaConfig/getLatestPeriodInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客户额度配置-获取最新已审核期初账期信息
export async function getLastestCustomerQuotaConfig(data) {
  return request({
    url: '/webapi/order/customerQuotaConfig/getLastestCustomerQuotaConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 项目额度配置-获取最新已审核部门额度信息
export async function getLatestDepartmentQuato(data) {
  return request({
    url: '/webapi/order/projectQuotaConfig/getLatestDepartmentQuato.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 额度初期配置-分页列表
export async function quotaGetListByPage(data) {
  return request({
    url: '/webapi/order/quotaPeriodConfig/getListByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 额度初期配置-新增/编辑
export async function saveOrUpdateQuotaPeriodConfig(data) {
  return request({
    url: '/webapi/order/quotaPeriodConfig/saveOrUpdateQuotaPeriodConfig.asyn',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 额度初期配置-审核
export async function auditQuotaPeriodConfig(data) {
  return request({
    url: '/webapi/order/quotaPeriodConfig/auditQuotaPeriodConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 部门额度配置-分页列表
export async function departmentGetListByPage(data) {
  return request({
    url: '/webapi/order/departmentQuotaConfig/getListByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 部门额度配置-删除
export async function delDepartmentQuotaConfig(data) {
  return request({
    url: '/webapi/order/departmentQuotaConfig/delDepartmentQuotaConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 部门额度配置-新增/编辑
export async function saveOrUpdateDepartmentQuotaConfig(data) {
  return request({
    url: '/webapi/order/departmentQuotaConfig/saveOrUpdateDepartmentQuotaConfig.asyn',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 部门额度配置-审核
export async function auditDepartmentQuotaConfig(data) {
  return request({
    url: '/webapi/order/departmentQuotaConfig/auditDepartmentQuotaConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 部门额度配置-调整额度
export async function updateDepartmentQuota(data) {
  return request({
    url: '/webapi/order/departmentQuotaConfig/updateDepartmentQuota.asyn',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 部门额度配置
export async function getItemList(data) {
  console.log(data)
  return request({
    url: '/webapi/order/departmentQuotaConfig/getItemList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 项目额度配置-调整额度
export async function updateProjectQuota(data) {
  return request({
    url: '/webapi/order/projectQuotaConfig/updateProjectQuota.asyn',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 根据事业部获取品牌下拉框
export async function getQuotaSelectBeanByBuId(data) {
  console.log(data)
  return request({
    url: '/webapi/order/quotaPeriodConfig/getQuotaSelectBeanByBuId.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}
