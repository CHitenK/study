/**
 * @file 买家中心/卖家中心-供应管理、采购管理
 */
import request from '@/utils/request'

/**
 * 获取采购商品列表 - 买家中心
 * @param {string} userId 用户ID
 * @param {int} status 状态 1已上架 2待审核 3审核未通过 4已下架
 * @param {int} page 页数
 * @param {int} size 页大小
 * @returns {Object} Promise
 */
function purchaseGoodsList({ userId, status, page, size }) {
  return request({
    url: 'applies',
    method: 'post',
    data: { userId, status, page, size, type: 1 }
  })
}

/**
 * 获取供应商品列表 - 卖家中心
 * @param {string} userId 用户ID
 * @param {int} status 状态 1已上架 2待审核 3审核未通过 4已下架
 * @param {int} page 页数
 * @param {int} size 页大小
 * @returns {Object} Promise
 */
function supplyGoodsList({ userId, status, page, size }) {
  return request({
    url: 'applies',
    method: 'post',
    data: { userId, status, page, size, type: 2 }
  })
}

/**
 * 删除商品信息
 * @param {String} id 商品申请Id
 * @returns {Object} Promise
 */
function deleteGoodInfo(id) {
  return request({
    url: `apply/${id}`,
    method: 'delete'
  })
}

/**
 * 下架商品
 * @param {String} id 商品申请Id
 * @returns {Object} Promise
 */
function downShelvesGoodInfo(id) {
  return request({
    url: `apply/withdraw/${id}`,
    method: 'patch'
  })
}

/**
 * 获取商品信息详情
 * @param {string} id 商品申请Id
 * @returns {Object} Promise
 */
function getGoodInfo(id) {
  return request({
    url: `apply/${id}`,
    method: 'get'
  })
}

/**
 * 更新商品申请信息
 * @param {string} id 商品申请ID
 * @param {string} unit 单位
 * @param {double} unitPrice 单价
 * @param {int} totalAmount 总数量
 * @param {string} location 我的位置/仓位位置
 * @returns {Object} Promise
 */
function updateGoodsInfo({ id, unit, unitPrice, totalAmount, location }) {
  return request({
    url: 'apply',
    method: 'put',
    data: { id, unit, unitPrice, totalAmount, location }
  })
}

/**
 * 采购申请 - 添加商品申请
 * @param {string} productId 商品id
 * @param {string} productName 商品名称
 * @param {string} categoryId 类别ID
 * @param {string} categoryName 类别名称
 * @param {string} specification 商品属性值(规格)
 * @param {string} fish 商品属性值(渔货类型)
 * @param {string} storage 商品属性值(存储方式)
 * @param {string} unit 单位
 * @param {int} unitPrice 单价
 * @param {int} totalAmount 总数量
 * @param {string} amountValve 起购量/起供量
 * @param {string} location 我的位置/仓位位置
 * @param {string} remark 详细要求
 * @returns {Object} Promise
 */
function addPurchaseGoodsInfo({ productId, productName, categoryId, categoryName, specification, fish, storage, unit, unitPrice, totalAmount, amountValve, location, remark }) {
  return request({
    url: 'apply',
    method: 'post',
    data: { applyType: 1, productId, productName, categoryId, categoryName, specification, fish, storage, unit, unitPrice, totalAmount, amountValve, location, remark }
  })
}

/**
 * 供应申请 - 添加商品申请
 * @param {string} productId 商品id
 * @param {string} productName 商品名称
 * @param {string} categoryId 类别ID
 * @param {string} categoryName 类别名称
 * @param {string} specification 商品属性值(规格)
 * @param {string} fish 商品属性值(渔货类型)
 * @param {string} storage 商品属性值(存储方式)
 * @param {string} unit 单位
 * @param {int} unitPrice 单价
 * @param {int} totalAmount 总数量
 * @param {string} amountValve 起购量/起供量
 * @param {string} location 我的位置/仓位位置
 * @param {string} remark 详细要求
 * @param {string} images 产品图片,字符串数组
 * @returns {Object} Promise
 */
function addApplyGoodsInfo({ productId, productName, categoryId, categoryName, specification, fish, storage, unit, unitPrice, totalAmount, amountValve, location, remark, images }) {
  return request({
    url: 'apply',
    method: 'post',
    data: { applyType: 2, productId, productName, categoryId, categoryName, specification, fish, storage, unit, unitPrice, totalAmount, amountValve, location, remark, images }
  })
}

/**
 * 查找产品属性值
 * @param {string} productId 产品ID
 * @param {string} attrName 通用属性值名称，规格，生长方式，存储类型
 * @returns {Object} Promise
 */
function getProductionAttrs(productId, attrName) {
  return request({
    url: 'productAttrs',
    method: 'post',
    data: { productId, attrName }
  })
}

/**
 * 查询类别与产品记录
 * @returns {Object} Promise
 */
function getCategories() {
  return request({
    url: 'categories',
    method: 'get'
  })
}

export default { purchaseGoodsList, supplyGoodsList, deleteGoodInfo, downShelvesGoodInfo, getGoodInfo, updateGoodsInfo, addPurchaseGoodsInfo, addApplyGoodsInfo, getProductionAttrs, getCategories }
