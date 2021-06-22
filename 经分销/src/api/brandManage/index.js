/**
 *  品牌管理 api
 */
 import request from '@u/http'
 import qs from 'qs'

// 品牌管理 - 平台品类配置 - 列表分页
export const getplatformCategoryList = (data) => {
  return request({
    url: '/webapi/order/platformCategoryConfig/getListByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 品牌管理 - 平台品类配置 - 新增平台品类配置
export const savePlatformCategoryConfig = (data) => {
  return request({
    url: '/webapi/order/platformCategoryConfig/savePlatformCategoryConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 品牌管理 - 平台品类配置 - 导入
export const importPlatformCategoryConfigUrl = '/webapi/order/platformCategoryConfig/importPlatformCategoryConfig.asyn'

// 品牌管理 - 平台商品品类 - 列表分页
export const getPlatformGoodsCategoryList = (data) => {
  return request({
    url: '/webapi/order/platformGoodsCategory/getListByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 品牌管理 - 平台商品品类 - 导入
export const importPlatformGoodsCategoryUrl = '/webapi/order/platformGoodsCategory/importPlatformGoodsCategory.asyn'

// 品牌管理 - 品牌列表 - 列表分页
export const brandList = (data) => {
  return request({
    url: '/webapi/system/brand/list.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 品牌管理 - 品牌列表 - 导出
export const exportBrandUrl = '/webapi/system/brand/exportBrand.asyn'

// 品牌管理 - 品牌列表 - 编辑
export const brandModify = (data) => {
  return request({
    url: '/webapi/system/brand/modify.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 品牌管理 - 标准品牌列表
export const brandParentList = (data) => {
  return request({
    url: '/webapi/system/brandParent/list.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 品牌管理 - 标准品牌 删除
export const brandParentDele = (data) => {
  return request({
    url: '/webapi/system/brandParent/delete.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 品牌管理 - 标准品牌 导入
export const importBrandParentUrl = '/webapi/system/brandParent/importBrandParent.asyn'

// 品牌管理 - 标准品牌 新增
export const brandParentSave = (data) => {
  return request({
    url: '/webapi/system/brandParent/save.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 品牌管理 - 标准品牌 编辑保存
export const brandParentModify = (data) => {
  return request({
    url: '/webapi/system/brandParent/modify.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 品牌管理 - 母品牌 分页
export const brandSuperiorList = (data) => {
  return request({
    url: '/webapi/system/brandSuperior/list.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 品牌管理 - 母品牌 删除
export const brandSuperiorDete = (data) => {
  return request({
    url: '/webapi/system/brandSuperior/delete.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 品牌管理 - 母品牌 编辑保存
export const brandSuperiorModify = (data) => {
  return request({
    url: '/webapi/system/brandSuperior/modify.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 品牌管理 - 母品牌 编辑保存
export const brandSuperiorSave = (data) => {
  return request({
    url: '/webapi/system/brandSuperior/save.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 品牌管理 - 标准条码 分页数据
export const listCommbarcodes = (data) => {
  return request({
    url: '/webapi/system/commbarcode/listCommbarcodes.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 品牌管理 - 标准条码 获取导出数量
export const getExportCount = (data) => {
  return request({
    url: '/webapi/system/commbarcode/getExportCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 品牌管理 - 标准条码 导出
export const exportCommbarcodeUrl = '/webapi/system/commbarcode/exportCommbarcode.asyn'

// 品牌管理 - 标准条码 导入
export const importCommbarcodeUrl = '/webapi/system/commbarcode/importCommbarcode.asyn'

// 品牌管理 - 标准条码 下载模板
export const downloadImportTempUrl = '/webapi/system/commbarcode/downloadImportTemp.asyn'

// 品牌管理 - 标准条码 获取导出数量
export const toDetailPage = (data) => {
  return request({
    url: '/webapi/system/commbarcode/toDetailPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 品牌管理 - 标准条码 编辑修改
export const modifyCommbarcode = (data) => {
  return request({
    url: '/webapi/system/commbarcode/modifyCommbarcode.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 品牌管理 - 组码 分页
export const listGroupCommbarcodes = (data) => {
  return request({
    url: '/webapi/system/groupCommbarcode/listGroupCommbarcodes.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 品牌管理 - 组码 删除
export const groupCommbarcodeDele = (data) => {
  return request({
    url: '/webapi/system/groupCommbarcode/delete.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 品牌管理 - 组码 新增/保存
export const saveGroupCommbarcodes = (data) => {
  return request({
    url: '/webapi/system/groupCommbarcode/saveGroupCommbarcodes.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 品牌管理 - 组码 详情
export const groupCommbarcodeDetail = (data) => {
  return request({
    url: '/webapi/system/groupCommbarcode/detail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

export const brandParentExportUrl = '/webapi/system/brandParent/export.asyn'

// 品牌管理 -获取下拉列表
export const brandParentGetSelectBean = (data) => {
  return request({
    url: '/webapi/system/brandParent/getSelectBean.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}
