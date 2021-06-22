import request from '@u/http'
import qs from 'qs'

// 商品管理-获取分页数据
export async function listMerchandise(data) {
  return request({
    url: '/webapi/system/merchandise/listMerchandise.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 商品管理-导出
export const exportMerchandiseUrl = '/webapi/system/merchandise/exportMerchandise.asyn'

// 商品管理-批量导入
export const importMerchandiseUrl = '/webapi/system/merchandise/importMerchandise.asyn'

// 商品管理-删除
export async function delMerchandise(data) {
  return request({
    url: '/webapi/system/merchandise/delMerchandise.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 商品管理-启用/禁用
export async function auditMerchandies(data) {
  return request({
    url: '/webapi/system/merchandise/auditMerchandies.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 商品管理-商品列详情
export async function toDetailsPage(data) {
  return request({
    url: '/webapi/system/merchandise/toDetailsPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 商品管理 访问新增页面
export async function toAddPage(data) {
  return request({
    url: '/webapi/system/merchandise/toAddPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 商品管理 保存商品
export async function saveMerchandise(data) {
  return request({
    url: '/webapi/system/merchandise/saveMerchandise.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

export const uploadFileUrl = '/webapi/system/merchandise/uploadFile.asyn'

// 商品管理 获取详情
export async function getMerchandiseDetails(data) {
  return request({
    url: '/webapi/system/merchandise/getMerchandiseDetails.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 商品管理 访问编辑页
export async function toEditPage(data) {
  return request({
    url: '/webapi/system/merchandise/toEditPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 商品管理 根据一级分类获取二级分类
export async function getTwoLevel(data) {
  return request({
    url: '/webapi/system/merchandise/getTwoLevel.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 商品管理 保存修改
export async function modifyMerchandise(data) {
  return request({
    url: '/webapi/system/merchandise/modifyMerchandise.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 商品管理 上传图片
export const importMerchandiseImageUrl = '/webapi/system/merchandise/importMerchandiseImage.asyn'

// 货品管理 分页数据
export async function listProduct(data) {
  return request({
    url: '/webapi/system/product/listProduct.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 货品管理 修改品类
export async function modifyBatchProduct(data) {
  return request({
    url: '/webapi/system/product/modifyBatchProduct.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 货品管理 访问详情页面
export async function productDetailsPage(data) {
  return request({
    url: '/webapi/system/product/getProductDetails.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 货品管理 编辑页
export async function productToEditPage(data) {
  return request({
    url: '/webapi/system/product/toEditPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 货品管理 修改
export async function productModifyProduct(data) {
  return request({
    url: '/webapi/system/product/modifyProduct.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 商品管理 - 外仓备案商品列表 - 获取分页数据
export const lisMerchandiseExternalWarehouse = (data) => {
  return request({
    url: '/webapi/system/merchandiseExternalWarehouse/lisMerchandiseExternalWarehouse.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 商品管理 - 外仓备案商品列表 - 删除
export const delMerchandiseExternalWarehouse = (data) => {
  return request({
    url: '/webapi/system/merchandiseExternalWarehouse/deleteById.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 商品管理 - 外仓备案商品列表 - 根据id查看日志
export const logMerchandiseExternalWarehouse = (data) => {
  return request({
    url: '/webapi/system/merchandiseExternalWarehouse/toDetailsLogById.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 商品管理 - 外仓备案商品列表 - 根据id查看详情
export const detailMerchandiseExternalWarehouse = (data) => {
  return request({
    url: '/webapi/system/merchandiseExternalWarehouse/toDetailsById.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 商品管理 - 外仓备案商品列表 - 导入平台备案商品
export const importMerchandiseWarehouseUrl = '/webapi/system/merchandiseExternalWarehouse/importMerchandiseWarehouse.asyn'

// 商品管理 - 外仓备案商品列表 - 导出
export const exportMerchandiseExternalWarehouseUrl = '/webapi/system/merchandiseExternalWarehouse/exportMerchandiseExternalWarehouse.asyn'
