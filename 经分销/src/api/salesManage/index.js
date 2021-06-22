/**
 * 销售管理模块
 */
import request from '@u/http'
import qs from 'qs'

/**
 * 电商订单 api
 */

// 销售管理 - 电商订单 - 查询电商订单列表信息
export const getDeliveryOrderManageList = data => {
  return request({
    url: '/webapi/order/order/listOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 电商订单 - 查询电商订单列表信息
export const getlistItemDetailsById = data => {
  return request({
    url: '/webapi/order/order/listItemDetailsById.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 电商订单 - 获取导出电商订单的数量
export const getDeliveryOrderManageCount = data => {
  return request({
    url: '/webapi/order/order/getOrderCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 电商订单 - 获取商品信息列表
export const getShopInfoList = data => {
  return request({
    url: '/webapi/order/order/getShopInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 电商订单 - 订单审核
export const examineDeliveryOrderManage = data => {
  return request({
    url: '/webapi/order/order/examineOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 电商订单 - 删除手工导入订单
export const delDeliveryOrderManage = data => {
  return request({
    url: '/webapi/order/order/delOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 电商订单 - 访问详情页面
export const getDeliveryOrderManageDetail = data => {
  return request({
    url: '/webapi/order/order/toDetailsPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 电商订单 - 检查手工导入订单是否满足条件
export const ordercheckConditions = data => {
  return request({
    url: '/webapi/order/order/checkConditionsOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 电商订单 - 导出
export const exportDeliveryOrderManageUrl = '/webapi/order/order/exportOrder.asyn'

// 销售管理 - 电商订单 - 导入
export const importDeliveryOrderManageUrl = '/webapi/order/order/importOrder.asyn'

// 销售管理 - 电商订单 - 查询电商退订单列表信息
export const getReturnOrderManageList = data => {
  return request({
    url: '/webapi/order/orderReturnIdepot/listOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 电商订单 - 查看某个商品的详情
export const getReturnOrderManageById = data => {
  return request({
    url: '/webapi/order/orderReturnIdepot/listItemDetailsById.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 电商订单 - 审核
export const examineReturnOrderManage = data => {
  return request({
    url: '/webapi/order/orderReturnIdepot/examineOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 电商订单 - 删除手工导入订单
export const delReturnOrderManage = data => {
  return request({
    url: '/webapi/order/orderReturnIdepot/delOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 电商订单 - 获取导出电商订单退货的数量
export const getReturnOrderManageCount = data => {
  return request({
    url: '/webapi/order/orderReturnIdepot/getOrderCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 电商订单 - 访问详情页面
export const getReturnOrderManageDetail = data => {
  return request({
    url: '/webapi/order/orderReturnIdepot/toDetailsPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 电商订单 - 检查手工导入订单是否满足条件
export const checkConditionsOrder = data => {
  return request({
    url: '/webapi/order/orderReturnIdepot/checkConditionsOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 电商订单 - 导出
export const exportReturnOrderManageUrl = '/webapi/order/orderReturnIdepot/exportOrder.asyn'

// 销售管理 - 电商订单 - 导入
export const importReturnOrderManageUrl = '/webapi/order/orderReturnIdepot/importOrder.asyn'

// 销售管理 - 电商订单 - 获取事业部补录列表信息
export const listBusinessUnitRecord = data => {
  return request({
    url: '/webapi/order/order/listBusinessUnitRecord.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 电商订单 - 事业部补录列表--批量更新
export const updateBusinessUnitRecord = data => {
  return request({
    url: '/webapi/order/order/updateBusinessUnitRecord.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 电商订单 - 导出
export const businessUnitRecordExportUrl = '/webapi/order/order/businessUnitRecordExport.asyn'

/**
 * 库位调整单列表 api
 */

// 销售管理 - 库位调整单列表 - 库位调整单列表信息
export const getInventoryLocationList = data => {
  return request({
    url: '/webapi/order/inventoryLocationAdjustment/listInventoryLocationAdjust.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 库位调整单列表 - 库位调整单列表信息
export const getInventoryLocationCount = data => {
  return request({
    url: '/webapi/order/inventoryLocationAdjustment/getOrderCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 库位调整单列表 - 访问详情页面
export const getInventoryLocationDetail = data => {
  return request({
    url: '/webapi/order/inventoryLocationAdjustment/toDetailsPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 库位调整单列表 - 删除
export const delInventoryLocationDetail = data => {
  return request({
    url: '/webapi/order/inventoryLocationAdjustment/delInventoryLocationAdjust.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 库位调整单列表 - 审核
export const auditInventoryLocationDetail = data => {
  return request({
    url: '/webapi/order/inventoryLocationAdjustment/auditInventoryLocationAdjust.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 库位调整单列表 - 导出
export const exportInventoryLocationUrl = '/webapi/order/inventoryLocationAdjustment/exportInventoryLocationAdjust.asyn'

// 销售管理 - 库位调整单列表 - 导入
export const importInventoryLocationUrl = '/webapi/order/inventoryLocationAdjustment/importInventoryLocationAdjust.asyn'

/**
 * 事业部移库单列表 api
 */

// 销售管理 - 事业部移库单列表 - 查询事业部移库列表
export const getBuMoveInventoryList = data => {
  return request({
    url: '/webapi/order/buMoveInventory/listBuMoveInventory.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 事业部移库单列表 - 访问详情页面
export const getBuMoveInventoryDetail = data => {
  return request({
    url: '/webapi/order/buMoveInventory/toDetailsPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 事业部移库单列表 - 获取导出的事业部移库单的数量
export const getBuMoveInventoryCount = data => {
  return request({
    url: '/webapi/order/buMoveInventory/getOrderCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 事业部移库单列表 - 审核
export const auditBuMoveInventory = data => {
  return request({
    url: '/webapi/order/buMoveInventory/auditBuMoveInventory.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 事业部移库单列表 - 删除
export const delBuMoveInventory = data => {
  return request({
    url: '/webapi/order/buMoveInventory/delBuMoveInventory.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 事业部移库单列表 - 导出
export const exportBuMoveInventoryUrl = '/webapi/order/buMoveInventory/exportBuMoveInventory.asyn'

// 销售管理 - 事业部移库单列表 - 导入
export const importBuMoveInventoryUrl = '/webapi/order/buMoveInventory/importBuMoveInventory.asyn'

/**
 * 账单出库单 api
 */

// 销售管理 - 账单出库单 - 访问账单出库单列表
export const getBillOutinDepotList = data => {
  return request({
    url: '/webapi/order/billOutinDepot/listBillOutinDepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 账单出库单 - 审核
export const auditBillOutinDepot = data => {
  return request({
    url: '/webapi/order/billOutinDepot/auditBillOutinDepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 账单出库单 - 删除
export const delBillOutinDepot = data => {
  return request({
    url: '/webapi/order/billOutinDepot/delBillOutinDepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 账单出库单 - 获取导出出库清单的数量
export const getBillOutinDepotCount = data => {
  return request({
    url: '/webapi/order/billOutinDepot/getOrderCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 账单出库单 - 获取选中订单的所有商品和对应数量
export const getBillOutinDepotGoodsInfo = data => {
  return request({
    url: '/webapi/order/billOutinDepot/getOrderGoodsInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 账单出库单 - 库存可用量接口
export const getAvailableNum = data => {
  return request({
    url: '/webapi/inventory/queryAvailability/getAvailableNum.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 账单出库单 - 访问详情页面
export const getBillOutinDepotDetail = data => {
  return request({
    url: '/webapi/order/billOutinDepot/toDetailsPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 账单出库单 - 详情页分页查询明细
export const listBillOutinDepotItem = data => {
  return request({
    url: '/webapi/order/billOutinDepot/listBillOutinDepotItem.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 账单出库单 - 详情页分页查询批次
export const listBillOutinDepotBatch = data => {
  return request({
    url: '/webapi/order/billOutinDepot/listBillOutinDepotBatch.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 账单出库单 - 导出
export const exportBillOutinDepotUrl = '/webapi/order/billOutinDepot/exportAgreementCurrencyConfig.asyn'

// 销售管理 - 账单出库单 - 导入
export const importBillOutinDepotUrl = '/webapi/order/billOutinDepot/importBillOutinDepot.asyn'

/**
 * 协议单价 api
 */

// 销售管理 - 协议单价 - 协议单价列表查询
export const getAgreementCurrencyList = data => {
  return request({
    url: '/webapi/order/agreementCurrencyConfig/listAgreementCurrencyConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 协议单价 - 删除
export const delAgreementCurrency = data => {
  return request({
    url: '/webapi/order/agreementCurrencyConfig/delAgreementCurrencyConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 协议单价 - 获取导出协议单价的数量
export const getAgreementCurrencyCount = data => {
  return request({
    url: '/webapi/order/agreementCurrencyConfig/getOrderCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 协议单价 - 新增
export const addAgreementCurrency = data => {
  return request({
    url: '/webapi/order/agreementCurrencyConfig/addAgreementCurrencyConfig.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 协议单价 - 导出
export const exportAgreementCurrencyUrl = '/webapi/order/agreementCurrencyConfig/exportAgreementCurrencyConfig.asyn'

// 销售管理 - 协议单价 - 导入
export const importAgreementCurrencyUrl = '/webapi/order/agreementCurrencyConfig/importAgreementCurrencyConfig.asyn'

/**
 * 平台采购单 api
 */

// 销售管理 - 平台采购单 - 查询平台采购单列表信息
export const listPlatformPurchaseOrder = data => {
  return request({
    url: '/webapi/order/platformPurchaseOrder/listPlatformPurchaseOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 平台采购单 - 查询详情
export const detailPlatformPurchaseOrder = data => {
  return request({
    url: '/webapi/order/platformPurchaseOrder/toDetailsPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 平台采购单 - 弹框获取平台采购单明细
export const getPlatformPurchaseOrderItems = data => {
  return request({
    url: '/webapi/order/platformPurchaseOrder/getPlatformPurchaseOrderItems.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 平台采购单 - 检查能否转销售单
export const checkOrderToSales = data => {
  return request({
    url: '/webapi/order/platformPurchaseOrder/checkOrderToSales.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 平台采购单 - 导出
export const exportPlatformPurchaseOrderUrl = '/webapi/order/platformPurchaseOrder/exportPlatformPurchaseOrder.asyn'

/**
 * 销售订单 api
 */

// 销售管理 - 销售订单 - 查询销售订单列表信息
export const listSaleOrder = data => {
  return request({
    url: '/webapi/order/sale/listSaleOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 删除
export const delSaleOrder = data => {
  return request({
    url: '/webapi/order/sale/delSaleOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 获取导出销售订单的数量
export const getSaleOrderCount = data => {
  return request({
    url: '/webapi/order/sale/getOrderCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 计算销售订单出库的百分比
export const differenceRatio = data => {
  return request({
    url: '/webapi/order/sale/differenceRatio.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 完结出库
export const endStockOut = data => {
  return request({
    url: '/webapi/order/sale/endStockOut.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 中转仓出库
export const saleOrderStockOut = data => {
  return request({
    url: '/webapi/order/sale/saleOrderStockOut.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 判断订单商品上架月份是否已关账
export const checkExistFinanceClose = data => {
  return request({
    url: '/webapi/order/sale/checkExistFinanceClose.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 显示金额调整信息
export const showOrderAmount = data => {
  return request({
    url: '/webapi/order/sale/showOrderAmount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 金额调整
export const amountAdjust = data => {
  return request({
    url: '/webapi/order/sale/amountAdjust.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 金额确认
export const amountConfirm = data => {
  return request({
    url: '/webapi/order/sale/amountConfirm.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 访问详情页面
export const listSaleDetail = data => {
  return request({
    url: '/webapi/order/sale/toDetailsPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 获取关区列表
export const getCustomsAreaList = data => {
  return request({
    url: '/webapi/system/customsArea/getSelectBean.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 校验仓库
export const checkDepotMerchantRel = data => {
  return request({
    url: '/webapi/system/depot/checkDepotMerchantRel.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 新增/修改
export const saveOrModifyTempSaleOrder = data => {
  return request({
    url: '/webapi/order/sale/saveOrModifyTempOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 根据商家客户id带出税率
export const getRateByCustomerAndMerchant = (data) => {
  return request({
    url: '/webapi/system/customer/getRateByCustomerAndMerchant.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 校验PO号在销售-po关联表是否已存在
export const checkExistByPo = (data) => {
  return request({
    url: '/webapi/order/sale/checkExistByPo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 访问编辑页面
export const toSaleOrderEdit = (data) => {
  return request({
    url: '/webapi/order/sale/toEditPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 提交
export const submitSaleOrder = (data) => {
  return request({
    url: '/webapi/order/sale/submitSaleOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 获取商品单价
export const getSalePrice = (data) => {
  return request({
    url: '/webapi/order/sale/getSalePrice.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 获取商品单价
export const getSalePriceManage = (data) => {
  return request({
    url: '/webapi/order/sale/getSalePriceManage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 修改并审核
export const modifySaleOrder = (data) => {
  return request({
    url: '/webapi/order/sale/modifySaleOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// // 销售管理 - 销售订单 - 商品导出
// export const exportItems = (data) => {
//   return request({
//     url: 'http://192.168.28.29:9020/webapi/order/sale/exportItems.asyn',
//     // url: '/webapi/order/sale/exportItems.asyn',
//     method: 'POST',
//     // headers: { 'Content-Type': 'application/json' },
//     // responseType: 'blob',
//     data: qs.stringify(data)
//   })
// }

// 销售管理 - 销售订单 - 商品导出
export const exportItemsUrl = '/webapi/order/sale/exportItems.asyn'

// 销售管理 - 销售订单 - 获取选中订单的所有商品和对应数量
export const getSaleOrderGoodsInfo = (data) => {
  return request({
    url: '/webapi/order/sale/getOrderGoodsInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 签收
export const receiveSaleOrder = (data) => {
  return request({
    url: '/webapi/order/sale/receiveSaleOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 校验订单能否生成采购订单
export const checkOrderState = (data) => {
  return request({
    url: '/webapi/order/sale/checkOrderState.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 列表页面 生成采购订单
export const GeneratePurchaseOrder = (data) => {
  return request({
    url: '/webapi/order/sale/GeneratePurchaseOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 根据PO号判断是否存在采购单
export const checkExistPurchaseByPO = (data) => {
  return request({
    url: '/webapi/order/sale/checkExistPurchaseByPO.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 判断是否存在采购单
export const checkSaleExistPurchase = (data) => {
  return request({
    url: '/webapi/order/sale/checkExistPurchase.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 查询可生成销售订单的采购订单列表信息
export const showOwnPurchaseOrder = (data) => {
  return request({
    url: '/webapi/order/sale/showOwnPurchaseOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 采购转销售，检查商品信息
export const checkGoodsInfo = (data) => {
  return request({
    url: '/webapi/order/purchase/checkGoodsInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 判断是否已经完全上架
export const shelfIsEnd = (data) => {
  return request({
    url: '/webapi/order/sale/shelfIsEnd.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 上架页面数据回显
export const toSaleShelfPage = (data) => {
  return request({
    url: '/webapi/order/sale/toSaleShelfPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 保存上架商品信息
export const saveSaleShelf = (data) => {
  return request({
    url: '/webapi/order/sale/saveSaleShelf.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 提交并审核生成采购订单
export const createPurchaseOrder = (data) => {
  return request({
    url: '/webapi/order/sale/createPurchaseOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 根据销售订单号和po号查询平台采购单
export const getListByPoNo = (data) => {
  return request({
    url: '/webapi/order/platformPurchaseOrder/listPlatformPurchaseOrderByCodeAndPoNo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 判断是否可以出库打托
export const checkOutDepotOrder = (data) => {
  return request({
    url: '/webapi/order/sale/checkOutDepotOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 查询出库打托详情
export const toSaleOutPage = (data) => {
  return request({
    url: '/webapi/order/sale/toSaleOutPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 保存出库打托信息
export const saveSaleOut = (data) => {
  return request({
    url: '/webapi/order/sale/saveSaleOut.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 融资申请、融资赎回弹窗展示
export const getFinanceDetail = (data) => {
  return request({
    url: '/webapi/order/sale/getFinanceDetail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 融资申请
export const applyFinance = (data) => {
  return request({
    url: '/webapi/order/sale/applyFinance.asyn',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    data
  })
}

// 销售管理 - 销售订单 - 还款试算
export const calRepayAmount = (data) => {
  return request({
    url: '/webapi/order/sale/calRepayAmount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 申请赎回
export const applyRansom = (data) => {
  return request({
    url: '/webapi/order/sale/applyRansom.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 融资申请作废
export const cancelRansom = (data) => {
  return request({
    url: '/webapi/order/sale/cancelRansom.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 确认赎回
export const confirmRansom = (data) => {
  return request({
    url: '/webapi/order/sale/confirmRansom.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 访问新增页面
export const toSaleAddPage = (data) => {
  return request({
    url: '/webapi/order/sale/toAddPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 查询预售转销详情
export const preSaleEditPage = (data) => {
  return request({
    url: '/webapi/order/sale/preSaleEditPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 点击上架，弹窗展示销售出库列表
export const getSaleOutDepotList = (data) => {
  return request({
    url: '/webapi/order/saleOut/getSaleOutDepotList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 判断是否可生成预申报单
export const checkCreateDeclare = (data) => {
  return request({
    url: '/webapi/order/sale/checkCreateDeclare.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售订单 - 导出清关资料
export const exportSaleCustomsInfo = '/webapi/order/sale/exportCustomsInfo.asyn'

// 销售管理 - 销售订单 - 导出
export const exportSaleOrderUrl = '/webapi/order/sale/exportSaleOrder.asyn'

// 销售管理 - 销售订单 - 导入购销代销销售订单
export const importSaleUrl = '/webapi/order/sale/importSale.asyn'

// 销售管理 - 销售订单 - 商品导入
export const importSaleGoodsUrl = '/webapi/order/sale/importSaleGoods.asyn'

// 销售管理 - 销售订单 - 上架导入
export const importSaleShelfUrl = '/webapi/order/sale/importSaleShelf.asyn'

/**
 * 预售单列表 api
 */

// 销售管理 - 预售单列表 - 查询预售单列表信息
export const listPreSaleOrder = data => {
  return request({
    url: '/webapi/order/preSale/listPreSaleOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 预售单列表 - 查询预售单列表信息
export const exportPreSaleOrder = data => {
  return request({
    url: '/webapi/order/preSale/exportPreSaleOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 预售单列表 - 获取导出预售单的数量
export const getPreSaleOrderCount = data => {
  return request({
    url: '/webapi/order/preSale/getOrderCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 预售单列表 - 删除
export const delPreSaleOrder = data => {
  return request({
    url: '/webapi/order/preSale/delPreSaleOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 预售单列表 - 查询详情
export const getPreSaleDetails = data => {
  return request({
    url: '/webapi/order/preSale/toDetailsPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 预售单列表 - 新增/修改(仅保存)
export const saveOrModifyTempOrder = data => {
  return request({
    url: '/webapi/order/preSale/saveOrModifyTempOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 预售单列表 - 访问编辑页面
export const getPreSaleEditPage = data => {
  return request({
    url: '/webapi/order/preSale/toEditPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 预售单列表 - 修改并审核
export const modifyPreSaleOrder = data => {
  return request({
    url: '/webapi/order/preSale/modifyPreSaleOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 预售单列表 - 提交并审核
export const addPreSaleOrder = data => {
  return request({
    url: '/webapi/order/preSale/addPreSaleOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 预售单列表 - 根据ID获取仓库详情
export const getDepotDetails = data => {
  return request({
    url: '/webapi/system/depot/getDepotDetails.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 预售单列表 - 校验预售单能否转成销售单
export const checkPreSale = data => {
  return request({
    url: '/webapi/order/preSale/checkPreSale.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 预售单列表 - 校验能否转成采购订单
export const checkPreOrderState = data => {
  return request({
    url: '/webapi/order/preSale/checkOrderState.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 预售单列表 - 生成采购订单
export const preGeneratePurchaseOrder = data => {
  return request({
    url: '/webapi/order/preSale/GeneratePurchaseOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 预售单列表 - 导出
export const exportPreSaleOrderUrl = '/webapi/order/preSale/exportPreSaleOrder.asyn'

// 销售管理 - 预售单列表 - 导入
export const importPreSaleUrl = '/webapi/order/preSale/importPreSale.asyn'

/**
 * 领料出库单 api
 */

// 销售管理 - 领料出库单 - 查询领料出库单列表分页信息
export const listMaterialOut = data => {
  return request({
    url: '/webapi/order/materialOutDepot/listMaterialOut.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 领料出库单 - 获取导出数量
export const getMaterialOutCount = data => {
  return request({
    url: '/webapi/order/materialOutDepot/getOrderCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 领料出库单 - 详情获取单据信息
export const detailMaterialOut = data => {
  return request({
    url: '/webapi/order/materialOutDepot/getDetail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 领料出库单 - 导出
export const exportMaterialOutDepotUrl = '/webapi/order/materialOutDepot/exportMaterialOutDepot.asyn'

/**
 * 领料单 api
 */

// 销售管理 - 领料单 - 查询领料单列表分页数据
export const listMaterialOrder = data => {
  return request({
    url: '/webapi/order/materialOrder/listOrderByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 领料单 - 获取导出数量
export const getMaterialCount = data => {
  return request({
    url: '/webapi/order/materialOrder/getOrderCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 领料单 - 复制、新增、编辑、详情获取单据信息
export const detailMaterialOrder = data => {
  return request({
    url: '/webapi/order/materialOrder/getDetail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 领料单 - 删除
export const delMaterialOrder = data => {
  return request({
    url: '/webapi/order/materialOrder/delMaterialOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 领料单 - 保存
export const saveMaterialOrder = data => {
  return request({
    url: '/webapi/order/materialOrder/saveMaterialOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 领料单 - 保存并审核
export const auditMaterialOrder = data => {
  return request({
    url: '/webapi/order/materialOrder/auditMaterialOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 领料单 - 导出清关资料
export const exportCustomsInfo = '/webapi/order/materialOrder/exportCustomsInfo.asyn'

// 销售管理 - 领料单 - 导出
export const exportMaterialOrderUrl = '/webapi/order/materialOrder/exportMaterialOrder.asyn'

// 销售管理 - 领料单 - 导入
export const importMaterialOrderUrl = '/webapi/order/materialOrder/importMaterialOrder.asyn'

/**
 * 客户额度预警 api
 */

// 销售管理 - 客户额度预警 - 查询列表数据 分页
export const getcustomerQuotaWarningList = data => {
  return request({
    url: '/webapi/order/customerQuotaWarning/listDTOByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 客户额度预警 - 刷新
export const refreshCustomerQuotaWarning = data => {
  return request({
    url: '/webapi/order/customerQuotaWarning/refreshCustomerQuotaWarning',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 客户额度预警 - 详情
export const getcustomerQuotaWarningDetail = data => {
  return request({
    url: '/webapi/order/customerQuotaWarning/getItemListByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 客户额度预警 - 导出
export const exportCustomerQuotaWarningUrl = '/webapi/order/customerQuotaWarning/exportCustomerQuotaWarning.asyn'

/**
 * 销售SD api
 */

// 销售管理 - 销售SD - 获取销售SD单分页列表
export const listSaleSD = data => {
  return request({
    url: '/webapi/order/saleSdOrder/listDTOByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售SD - 删除
export const delSaleSdOrder = data => {
  return request({
    url: '/webapi/order/saleSdOrder/delSaleSdOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售SD - 获取导出数量
export const getSaleSdCount = data => {
  return request({
    url: '/webapi/order/saleSdOrder/getCountOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售SD - 获取详情信息
export const detailPreSaleOrder = data => {
  return request({
    url: '/webapi/order/saleSdOrder/getDetail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售SD - 编辑
export const saveSaleSdOrder = data => {
  return request({
    url: '/webapi/order/saleSdOrder/saveSaleSdOrder.asyn',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 销售管理 - 销售SD - 导出
export const exportSaleSdOrderUrl = '/webapi/order/saleSdOrder/exportSaleSdOrder.asyn'

/**
 * 平台暂估费用单 api
 */

// 销售管理 - 平台暂估费用单 - 查询平台暂估费用单
export const listPlatformTemporaryOrder = data => {
  return request({
    url: '/webapi/order/platformTemporaryCostOrder/listPlatformTemporaryOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 平台暂估费用单 - 校验发货日期是否已关帐
export const checkPlatformTemporaryOrder = data => {
  return request({
    url: '/webapi/order/platformTemporaryCostOrder/checkDate.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 平台暂估费用单 - 删除
export const deletePlatformTemporaryOrder = data => {
  return request({
    url: '/webapi/order/platformTemporaryCostOrder/delete.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 平台暂估费用单 - 查询详情
export const detailPlatformTemporaryOrder = data => {
  return request({
    url: '/webapi/order/platformTemporaryCostOrder/toDetailsById.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 平台暂估费用单 - 修改
export const updatePlatformCost = data => {
  return request({
    url: '/webapi/order/platformTemporaryCostOrder/updatePlatformCost.asyn',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    data
  })
}

// 销售管理 - 平台暂估费用单 - 生成暂估费用单
export async function savePlatCostOrder(data) {
  return request({
    url: '/webapi/order/platformTemporaryCostOrder/savePlatCostOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 平台暂估费用单 - 导出
export const exportPlatFormTemporaryUrl = '/webapi/order/platformTemporaryCostOrder/exportPlatFormTemporary.asyn'

/**
 * 销售预申报单列表 api
 */

// 销售管理 - 销售预申报单列表 - 获取列表信息
export const saleDeclareList = data => {
  return request({
    url: '/webapi/order/saleDeclare/listDTOByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售预申报单列表 - 删除
export const delSaleDeclareOrder = data => {
  return request({
    url: '/webapi/order/saleDeclare/delSaleDeclareOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售预申报单列表 - 获取导出数量
export const getDeclareCount = data => {
  return request({
    url: '/webapi/order/saleDeclare/getOrderCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售预申报单列表 - 推送出库指令
export const modifyPushOutOrder = data => {
  return request({
    url: '/webapi/order/saleDeclare/modifyPushOutOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售预申报单列表 - 保存
export const saveSaleDeclareOrder = data => {
  return request({
    url: '/webapi/order/saleDeclare/saveSaleDeclareOrder.asyn',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    data
  })
}

// 销售管理 - 销售预申报单列表 - 打托出库
export const saveSaleDeclareOut = data => {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/webapi/order/saleDeclare/saveSaleDeclareOut.asyn',
    method: 'POST',
    data
  })
}

// 销售管理 - 销售预申报单列表 - 访问销售单生产预申报单/编辑/详情/打托出库页面
export const searchDetail = data => {
  return request({
    url: '/webapi/order/saleDeclare/searchDetail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售预申报单列表 - 打托/确认清关资料/确认申报时间
export const updateTimeTrace = data => {
  return request({
    url: '/webapi/order/saleDeclare/updateTimeTrace.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售预申报单列表 - 获取列表销售预申报单各类型数量
export const getDeclareTypeNum = data => {
  return request({
    url: '/webapi/order/saleDeclare/getDeclareTypeNum.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售预申报单列表 - 选择商品弹窗
export const getSalePopupList = data => {
  return request({
    url: '/webapi/order/saleDeclare/getSalePopupList.asyn',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    data
  })
}

// 销售管理 - 销售预申报单列表 - 一线清关资料导出
export const exportCustomsDeclareUrl = '/webapi/order/saleDeclare/exportCustomsDeclare.asyn'

// 销售管理 - 销售预申报单列表 - 预约物流
export const exportLogisticsDelegationUrl = '/webapi/order/saleDeclare/exportLogisticsDelegation.asyn'

// 销售管理 - 销售预申报单列表 - 导出
export const exportDeclareUrl = '/webapi/order/saleDeclare/exportOrder.asyn'

/**
 * 销售赊销单 api
 */

// 销售管理 - 销售赊销单 - 赊销申请
export const applyCreditOrder = data => {
  return request({
    url: '/webapi/order/saleCredit/applyCreditOrder.asyn',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    data
  })
}

// 销售管理 - 销售赊销单 - 申请还款
export const applyCreditRefund = data => {
  return request({
    url: '/webapi/order/saleCredit/applyRefund.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售赊销单 - 还款试算
export const calCreditRepayAmount = data => {
  return request({
    url: '/webapi/order/saleCredit/calRepayAmount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售赊销单 - 确认还款
export const confirmCreditCreditBill = data => {
  return request({
    url: '/webapi/order/saleCredit/confirmCreditBill.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售赊销单 - 确认放款
export const confirmCreditOrder = data => {
  return request({
    url: '/webapi/order/saleCredit/confirmOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售赊销单 - 删除赊销单
export const deleteCreditOrder = data => {
  return request({
    url: '/webapi/order/saleCredit/deleteCreditOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售赊销单 - 获取列表赊销单各类型数量
export const getCreditTypeNum = data => {
  return request({
    url: '/webapi/order/saleCredit/getCreditTypeNum.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售赊销单 - 访问申请还款页面
export const getCreditRepayDetail = data => {
  return request({
    url: '/webapi/order/saleCredit/getRepayDetail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售赊销单 - 获取列表信息
export const getCreditRepayList = data => {
  return request({
    url: '/webapi/order/saleCredit/listDTOByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售赊销单 - 提交还款
export const saveCreditBill = data => {
  return request({
    url: '/webapi/order/saleCredit/saveCreditBill.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售赊销单 - 访问详情页面
export const searchCreditDetail = data => {
  return request({
    url: '/webapi/order/saleCredit/searchDetail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售赊销单 - 提交赊销单
export const submitCreditCreditOrder = data => {
  return request({
    url: '/webapi/order/saleCredit/submitCreditOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售赊销单 - 收到保证金
export const updateCreditMarginOrder = data => {
  return request({
    url: '/webapi/order/saleCredit/updateMarginOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售管理 - 销售赊销单 - 导出结算单
export const exportCreditOrderUrl = '/webapi/order/saleCredit/exportCreditOrder.asyn'
