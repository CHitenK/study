/**
 * @description 全局基础服务接口
 */

import request from '@u/http'
import qs from 'qs'

// dome 接口
export async function getList(data) {
  return request({
    url: 'http://121.33.205.118:3202/shelf/listShelf.asyn',
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 登录
export function login(data) {
  return request({
    url: '/webapi/system/login/login.asyn',
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 选择公司后登录
export function choseCompanylogin(data) {
  return request({
    url: '/webapi/system/login/submitUser.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 切换登录公司
export function changeCompanylogin(data) {
  return request({
    url: '/webapi/system/login/updateLoginMerchant.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取常量集合
export function getSelectList(data) {
  return request({
    url: '/webapi/system/getConstantListByName.asyn',
    method: 'POST',
    data: qs.stringify({ listName: data, token: sessionStorage.getItem('token') })
  })
}

// 加载用户权限菜单
export function getPessionList(data) {
  return request({
    url: '/webapi/system/LoadTreeMenuList',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 导入数据
export function commonImport(url, data) {
  return request({
    url: url,
    method: 'POST',
    data
  })
}

// 模板下载
export const downTemplateUrl = '/webapi/system/excelTemplate/download.asyn'

// 获取仓库
export function getSelectBeanByMerchantRel(data) {
  return request({
    url: '/webapi/system/depot/getSelectBeanByMerchantRel.asyn',
    method: 'POST',
    data: data ? qs.stringify(data) : null
  })
}

// 获取事业部
export function getBUSelectBean(data) {
  return request({
    url: '/webapi/system/businessUnit/getBUSelectBeanByMerchantDepotRel.asyn',
    method: 'POST',
    data: data ? qs.stringify(data) : null
  })
}

// 获取商品品牌
export function getBrandSelectBean(data) {
  return request({
    url: '/webapi/system/brand/getSelectBean.asyn',
    method: 'POST',
    data: data ? qs.stringify(data) : null
  })
}

// 库存调整单-查询库存可用量接口
export async function getAvailableNum(data) {
  return request({
    url: '/webapi/inventory/queryAvailability/getAvailableNum.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取不同单据公共弹窗
export function getOrderPopupList(data) {
  return request({
    url: '/webapi/system/merchandise/getOrderPopupList.asyn',
    method: 'POST',
    data: data ? qs.stringify(data) : null
  })
}

// 根据商品id获取商品信息
export function getListByIds(data) {
  return request({
    url: '/webapi/system/merchandise/getListByIds.asyn',
    method: 'POST',
    data: data ? qs.stringify(data) : null
  })
}

// 获取客户
export function getCustomerSelectBean(data) {
  return request({
    url: '/webapi/system/customer/getSelectBean.asyn',
    method: 'POST',
    data: data ? qs.stringify(data) : null
  })
}

// 获取币种
export function getCurrencySelectBean(data) {
  return request({
    url: '/webapi/system/customer/getCurrency.asyn',
    method: 'POST',
    data: data ? qs.stringify(data) : null
  })
}

// 获取公司
export function getSelectMerchantBean(data) {
  return request({
    url: '/webapi/system/merchant/getSelectBean.asyn',
    method: 'POST',
    data: data ? qs.stringify(data) : null
  })
}

// 获取供应商列表
export function getSupplierList(data) {
  return request({
    url: '/webapi/system/supplier/getSelectBean.asyn',
    method: 'POST',
    data: data ? qs.stringify(data) : null
  })
}

// 获取原货号
export function getOriginalGoodsId(data) {
  return request({
    url: '/webapi/system/inventoryLocationMapping/getOriginalGoodsId.asyn',
    method: 'POST',
    data: data ? qs.stringify(data) : null
  })
}

// 根据ID获取仓库详情
export function getDepotById(data) {
  return request({
    url: '/webapi/system/depot/getDepotById.asyn',
    method: 'POST',
    data: data ? qs.stringify(data) : null
  })
}

// 校验仓库类别
export function checkDepotType(data) {
  return request({
    url: '/webapi/system/depot/checkDepotType.asyn',
    method: 'POST',
    data: data ? qs.stringify(data) : null
  })
}

// 附件管理 列表查询附件信息
export async function listAttachment(data) {
  return request({
    url: '/webapi/order/attachment/listAttachment.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 附件管理 附件下载调用方法
export const downloadFileUrl = '/webapi/order/attachment/downloadFile.asyn'

// 附件管理 逻辑删除附件信息
export async function delAttachment(data) {
  return request({
    url: '/webapi/order/attachment/delAttachment.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 附件管理 上传附件
export const attachmentUploadFiles = '/webapi/order/attachment/uploadFiles.asyn'

// 客户信息 下拉列表
export async function getSelectBeanByDto(data) {
  return request({
    url: '/webapi/system/customer/getSelectBeanByDto.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取入库管区
export async function getSelectCustomsArea(data) {
  return request({
    url: '/webapi/system/customsArea/getSelectBean.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 根据客户供应商Id和商家获取对应税率
export async function getRaxList(data) {
  return request({
    url: '/webapi/system/tariffRate/getSelectBean.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预申报单列表-获取包装方式下拉
export async function getPackTypeSelectBean(data) {
  return request({
    url: '/webapi/order/declare/getPackTypeSelectBean.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 仓库 禁用/启用
export async function checkDepotMerchantRel(data) {
  return request({
    url: '/webapi/system/depot/checkDepotMerchantRel.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 仓库 根据仓库id获取仓库地址下拉列表
// export async function loadSelectByDepotId(data) {
//   return request({
//     url: '/webapi/system/depotSchedule/loadSelectByDepotId.asyn',
//     method: 'POST',
//     data: qs.stringify(data)
//   })
// }

// 仓库 根据仓库id获取仓库地址下拉列表
export async function getdepotArrList(data) {
  return request({
    url: '/webapi/system/depotSchedule/loadSelectByDepotId.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 根据ids、单据类型、仓库id获取商品信息
export async function getListByIdsAndTypeAndInOutDepot(data) {
  return request({
    url: '/webapi/system/merchandise/getListByIdsAndTypeAndInOutDepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 根据id获取客户信息
export async function getCustomerById(data) {
  return request({
    url: '/webapi/system/customer/getCustomerById.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取导出清关模板
export async function getExportTemplate(data) {
  return request({
    url: '/webapi/order/customsFileConfig/getExportTemplate.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 根据事业部查询关联的仓库
export async function getSelectBeanByMerchantBuRel(data) {
  return request({
    url: '/webapi/system/depot/getSelectBeanByMerchantBuRel.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取业务模块
export async function getBusinessModuleType(data) {
  return request({
    url: '/webapi/system/reminderEmailConfig/getBusinessModuleType.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取供应商价目表数据
export async function getSMPriceByPurchaseOrder(data) {
  return request({
    url: '/webapi/system/supplierMerchandisePrice/getSMPriceByPurchaseOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取下拉列表
export async function getDepotSelectBean(data) {
  return request({
    url: '/webapi/system/depot/getSelectBean.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 根据页面传入多个关联仓库获取此商家下仓库关联的事业部下拉框，为空时则获取商家关联的所有事业部（多个仓库的情况）
export async function getAllSelectBean(data) {
  return request({
    url: '/webapi/system/businessUnit/getAllSelectBean.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 根据商家id 获取供应下拉列表
export function getSupplierByMerchantId(data) {
  return request({
    url: '/webapi/system/supplier/getSupplierByMerchantId.asyn',
    method: 'POST',
    data: data ? qs.stringify(data) : null
  })
}

// 根据公司id获取客户列表
export function getCustomerByMerchantId(data) {
  return request({
    url: '/webapi/system/customer/getCustomerByMerchantId.asyn',
    method: 'POST',
    data: data ? qs.stringify(data) : null
  })
}

// 获取包装方式下拉
export async function getPackTypeSelectList(data) {
  return request({
    url: '/webapi/order/purchase/getPackTypeSelectBean.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取母品牌下拉
export async function getBrandList(data) {
  return request({
    url: '/webapi/system/brandSuperior/getSelectBean.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取用户信息
export async function getUserInfo(data) {
  return request({
    url: '/webapi/order/accountingReminderConfig/getUserInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 公共方法获取商品分类下拉列表
export async function getMerchandiseCatList(data) {
  return request({
    url: '/webapi/system/merchandise/getMerchandiseCatList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取用户关联的事业部
export async function getSelectBeanByUserId(data) {
  return request({
    url: '/webapi/system/businessUnit/getSelectBeanByUserId.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取模板管理 获取模板下拉列表
export async function getFileTemp(data) {
  return request({
    url: '/webapi/order/fileTemp/getFileTemp.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取适用仓库下拉
export async function getSelectBeanByDTO(data) {
  return request({
    url: '/webapi/system/depot/getSelectBeanByDTO.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取供应商下拉列表
export async function getSupplierSelectBean(data) {
  return request({
    url: '/webapi/system/supplier/getAllSelectBean.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取关区下拉列表
export async function getCustomsSelectBean(data) {
  return request({
    url: '/webapi/system/customsArea/getCustomsSelectBean.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取标准品牌下拉
export async function getBrandParent(data) {
  return request({
    url: '/webapi/system/brandParent/getSelectBean.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取销售SD下拉
export const getSelectSDlist = data => {
  return request({
    url: '/webapi/order/sdSaleType/getSelectBean.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 平台费用配置 获取平台费项列表
export async function getPlatformCostConfigSelectBean(data) {
  return request({
    url: '/webapi/order/platformCostConfig/getSelectBean.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 取日志列表
export async function getOperateLogList(data) {
  return request({
    url: '/webapi/order/common/getOperateLogList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取用户
export async function getSupplierMerchantRelByMainIdURL(data) {
  return request({
    url: '/webapi/system/supplier/getSupplierMerchantRelByMainIdURL.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取主服务的日志
export async function getOperateLogSysList(data) {
  return request({
    url: '/webapi/system/common/getOperateLogSysList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}
