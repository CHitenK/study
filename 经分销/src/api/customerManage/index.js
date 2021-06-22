/**
 * 客商档案
 */
import request from '@u/http'
import qs from 'qs'

/**
 * 待引入客商列表 api
 */

// 客商档案 - 待引入客商列表 - 首页
export async function getCustomerMainlist(data) {
  return request({
    url: '/webapi/system/customerMain/listCustomerMain.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 待引入客商列表 - 访问详情页面
export async function getCustomerMainDetail(data) {
  return request({
    url: '/webapi/system/customerMain/toDetailsPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

/**
 * 供应商列表 api
 */

// 客商档案 - 供应商列表 - 获取分页数据
export async function listSupplier(data) {
  return request({
    url: '/webapi/system/supplier/listSupplier.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 供应商列表 - 删除
export async function delSupplier(data) {
  return request({
    url: '/webapi/system/supplier/delSupplier.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 供应商列表 - 启用/禁用
export async function modifyEnabledSupplier(data) {
  return request({
    url: '/webapi/system/supplier/modifyEnabledSupplier.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 供应商列表 - 获取商家或者用户
export async function getMerchantInfo(data) {
  return request({
    url: '/webapi/system/supplier/getMerchantInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 供应商列表 - 获取商家客户关系数据
export async function getMerchantRel(data) {
  return request({
    url: '/webapi/system/supplier/getMerchantRel.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 供应商列表 - 保存合作公司关系
export async function saveMerchantRel(data) {
  return request({
    url: '/webapi/system/supplier/saveMerchantRel.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 供应商列表 - 根据id获取详情
export async function getSupplierDetailsById(data) {
  return request({
    url: '/webapi/system/supplier/getDetails.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 供应商列表 - 访问详情页面
export async function getSupplierDetail(data) {
  return request({
    url: '/webapi/system/supplier/toDetailsPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 供应商列表 - 访问编辑页面
export async function getSupplierEdit(data) {
  return request({
    url: '/webapi/system/supplier/toEditPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 供应商列表 - 访问新增页面
export async function getSupplierAdd(data) {
  return request({
    url: '/webapi/system/supplier/toAddPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 供应商列表 - 获取商家客户关系数据
export async function getCustomerMerchantRelList(data) {
  return request({
    url: '/webapi/system/customer/getCustomerMerchantRelList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 供应商列表 - 修改
export async function modifySupplier(data) {
  return request({
    url: '/webapi/system/supplier/modifySupplier.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 供应商列表 - 新增
export async function saveSupplier(data) {
  return request({
    url: '/webapi/system/supplier/saveSupplier.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 上传图片url
export const uploadFileUrl = '/webapi/system/supplier/uploadFile.asyn'

// 客商档案 - 供应商列表 - 导出
export const exportSupplierUrl = '/webapi/system/supplier/exportSupplier.asyn'

// 客商档案 - 供应商列表 - 导入
export const importSupplierUrl = '/webapi/system/supplier/importSupplier.asyn'

/**
 * 客户列表 api
 */

// 客商档案 - 客户列表 - 获取分页数据
export async function listCustomer(data) {
  return request({
    url: '/webapi/system/customer/listCustomer.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 客户列表 - 删除
export async function delCustomer(data) {
  return request({
    url: '/webapi/system/customer/delCustomer.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 客户列表 - 启用/禁用修改
export async function modifyEnabledCustomer(data) {
  return request({
    url: '/webapi/system/customer/modifyEnabledCustomer.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 客户列表 - 访问详情页面
export async function getCustomerDetail(data) {
  return request({
    url: '/webapi/system/customer/toDetailsPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 客户列表 - 访问编辑详情页面
export async function getCustomerEdit(data) {
  return request({
    url: '/webapi/system/customer/toEditPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 客户列表 - 访问新增详情页面
export async function getCustomerAdd(data) {
  return request({
    url: '/webapi/system/customer/toAddPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 客户列表 - 新增数据
export async function saveCustomer(data) {
  return request({
    url: '/webapi/system/customer/saveCustomer.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 客户列表 - 修改数据
export async function modifyCustomer(data) {
  return request({
    url: '/webapi/system/customer/modifyCustomer.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 客户列表 - 合作公司保存(客户)
export async function saveMerchantRelJSon(data) {
  return request({
    url: '/webapi/system/customer/saveMerchantRelJSon.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 客户列表 - 导出
export const exportCustomerUrl = '/webapi/system/customer/exportCustomer.asyn'

// 客商档案 - 客户列表 - 导入
export const importCustomerUrl = '/webapi/system/customer/importCustomer.asyn'

/**
 * 采购价格管理 api
 */

// 客商档案 - 采购价格管理 - 列表
export async function listSMPrice(data) {
  return request({
    url: '/webapi/system/supplierMerchandisePrice/listSMPrice.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

/**
 * 供应商询价池列表 api
 */

// 客商档案 - 供应商询价池列表 - 获取分页数据
export async function listSIPool(data) {
  return request({
    url: '/webapi/system/supplierInquiryPool/listSIPool.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 供应商询价池列表 - 删除
export async function delSIPool(data) {
  return request({
    url: '/webapi/system/supplierInquiryPool/delSIPool.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 供应商询价池列表 - 访问编辑页面
export async function SIPoolEditPage(data) {
  return request({
    url: '/webapi/system/supplierInquiryPool/toEditPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 供应商询价池列表 - 访问编辑页面
export async function SIPoolDetailsPage(data) {
  return request({
    url: '/webapi/system/supplierInquiryPool/toDetailsPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 供应商询价池列表 - 编辑
export async function modifySIPool(data) {
  return request({
    url: '/webapi/system/supplierInquiryPool/modifySIPool.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 供应商询价池列表 - 导入
export const importSIPoolUrl = '/webapi/system/supplierInquiryPool/importSIPool.asyn'

// 客商档案 - 供应商询价池列表 - 导出
export const exportSupplierInquiryPoolUrl = '/webapi/system/supplierInquiryPool/exportSupplier.asyn'

/**
 * 加价比例配置 api
 */

// 客商档案 - 加价比例配置 - 获取分页数据
export async function listPurchaseCommission(data) {
  return request({
    url: '/webapi/system/purchaseCommission/listPurchaseCommission.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 加价比例配置 - 删除
export async function delPurchaseCommission(data) {
  return request({
    url: '/webapi/system/purchaseCommission/delPurchaseCommission.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 加价比例配置 - 新增
export async function savePurchaseCommission(data) {
  return request({
    url: '/webapi/system/purchaseCommission/savePurchaseCommission.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 加价比例配置 - 修改
export async function modifyPurchaseCommission(data) {
  return request({
    url: '/webapi/system/purchaseCommission/modifyPurchaseCommission.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 客商档案 - 加价比例配置 - 获取单个对象
export async function getPurchaseCommission(data) {
  return request({
    url: '/webapi/system/purchaseCommission/getPurchaseCommission.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}
