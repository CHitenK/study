import request from '@u/http'
import qs from 'qs'

// 获取销售SD配置分页列表
export async function listDTOByPage(data) {
  return request({
    url: '/webapi/order/sdSaleConfig/listDTOByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售SD配置保存/审核
export async function saveSdSaleConfig(data) {
  return request({
    url: '/webapi/order/sdSaleConfig/saveSdSaleConfig.asyn',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 销售SD类型 分页
export async function sdSaleTypeListDTOByPage(data) {
  return request({
    url: '/webapi/order/sdSaleType/listDTOByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售SD类型 获取NC下拉框
export async function getNCSelectBean(data) {
  return request({
    url: '/webapi/order/settlementConfig/getNCSelectBean.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售SD类型 保存
export async function saveSdSaleType(data) {
  return request({
    url: '/webapi/order/sdSaleType/saveSdSaleType.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 平台品类下拉
export async function getPlatformSelectBean(data) {
  return request({
    url: '/webapi/order/platformCategoryConfig/getSelectBean.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 详情
export async function sdSaleConfigDetail(data) {
  return request({
    url: '/webapi/order/sdSaleConfig/getDetail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 详情
export async function delSdSaleConfig(data) {
  return request({
    url: '/webapi/order/sdSaleConfig/delSdSaleConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购SD 类型分页
export async function sdTypeConfigList(data) {
  return request({
    url: '/webapi/order/sdTypeConfig/sdTypeConfigList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购SD 类型保存
export async function saveOrModify(data) {
  return request({
    url: '/webapi/order/sdTypeConfig/saveOrModify.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购SD 采购SD配置 分页
export async function sdPurchaseConfigList(data) {
  return request({
    url: '/webapi/order/sdPurchaseConfig/sdPurchaseConfigList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购SD 采购SD配置 删除
export async function delOrders(data) {
  return request({
    url: '/webapi/order/sdPurchaseConfig/delOrders.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购SD 采购SD配置 获取已启用配置
export async function sdTypeConfigGetList(data) {
  return request({
    url: '/webapi/order/sdTypeConfig/getList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购SD 采购SD配置 获取编辑配置
export async function getEditOrCopyPageInfo(data) {
  return request({
    url: '/webapi/order/sdPurchaseConfig/getEditOrCopyPageInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购SD 采购SD配置 保存编辑配置
export async function sdPurchaseConfigSave(data) {
  return request({
    url: '/webapi/order/sdPurchaseConfig/saveOrModify.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

//  商品导入
export const importSdPurchaseConfigUrl = '/webapi/order/sdPurchaseConfig/importSdPurchaseConfig.asyn'

// 平台费用配置 获取平台费用配置分页列表
export async function platformCostConfigList(data) {
  return request({
    url: '/webapi/order/platformCostConfig/listByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 平台费用配置 获取平台费用配置 删除
export async function delPlatFormConfig(data) {
  return request({
    url: '/webapi/order/platformCostConfig/delPlatFormConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 平台费用配置 获取平台费用配置 保存/审核
export async function savePlatFormConfig(data) {
  return request({
    url: '/webapi/order/platformCostConfig/savePlatFormConfig.asyn',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 平台费用配置 获取平台费用配置 详情
export async function platformCostConfigDetail(data) {
  return request({
    url: '/webapi/order/platformCostConfig/getDetail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售SD核销配置 列表
export async function sdSaleListDTOByPage(data) {
  return request({
    url: '/webapi/order/sdSaleVerifyConfig/listDTOByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售SD核销配置  审核/保存
export async function sdSaleSaveOrAudit(data) {
  return request({
    url: '/webapi/order/sdSaleVerifyConfig/saveOrAudit.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售SD核销配置 删除
export async function sdSaleDelVerifyConfig(data) {
  return request({
    url: '/webapi/order/sdSaleVerifyConfig/delVerifyConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售SD核销配置 停用/启用
export async function sdSaleModifyStatus(data) {
  return request({
    url: '/webapi/order/sdSaleVerifyConfig/modifyStatus.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}
