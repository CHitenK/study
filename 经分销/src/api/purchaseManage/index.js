import request from '@u/http'
import qs from 'qs'

// 采购管理-采购入库勾稽明细 获取分页数据
export async function listDifference(data) {
  return request({
    url: '/webapi/order/difference/listDifference.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购管理-采购入库勾稽明细表导出
export const exportAnalysisUrl = '/webapi/order/difference/exportAnalysis.asyn'

// 采购管理-采购入库差异分析 获取分页数据
export async function listCheckTheDetails(data) {
  return request({
    url: '/webapi/order/difference/listCheckTheDetails.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购管理-导出采购入库差异分析表
export const exportCheckTheDetailsUrl = '/webapi/order/difference/exportCheckTheDetails.asyn'

// 采购订单跟踪报表 获取分页数据
export async function listFollowing(data) {
  return request({
    url: '/webapi/order/difference/listFollowing.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 理货单列表 获取分页数据
export async function listTallyingOrder(data) {
  return request({
    url: '/webapi/order/tallying/listTallyingOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 理货单列表 修改理货单状态（确认/驳回）
export async function modifyOrderState(data) {
  return request({
    url: '/webapi/order/tallying/modifyOrderState.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 理货单列表-导出理货单
export const exportTallyingOrderUrl = '/webapi/order/tallying/exportTallyingOrder.asyn'

// 理货单列表 理货单详情
export async function getTallyingDetailById(data) {
  return request({
    url: '/webapi/order/tallying/getDetailById.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预申报单列表-获取分页数据
export async function listDeclare(data) {
  return request({
    url: '/webapi/order/declare/listDeclare.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预申报单列表-批量提交
export async function submitDeclareOrder(data) {
  return request({
    url: '/webapi/order/declare/submitDeclareOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预申报单列表-批量取消
export async function cancelDeclare(data) {
  return request({
    url: '/webapi/order/declare/cancelDeclare.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预申报单列表-预申报导出
export const exportDeclareUrl = '/webapi/order/declare/exportDeclare.asyn'

// 预申报单列表-一线清关资料导出
export const exportCustomsDeclareUrl = '/webapi/order/declare/exportCustomsDeclare.asyn'

// 预申报单列表-根据ID查找详情
export async function getDeclareDetail(data) {
  return request({
    url: '/webapi/order/declare/getDeclareDetails.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 导出地址
export const exportGoodsUrl = '/webapi/order/declare/exportGoods.asyn'

// 下载商品模板
export async function exportGoods(data) {
  return request({
    url: '/webapi/order/declare/exportGoods.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 编辑预申报导入商品
export const importGoodsUrl = '/webapi/order/declare/importGoods.asyn'

// 获取采购退货单列表
export async function listPurchaseReturnOrder(data) {
  return request({
    url: '/webapi/order/purchaseReturn/listPurchaseReturnOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 删除采购退货订单
export async function delPurchaseReturnOrder(data) {
  return request({
    url: '/webapi/order/purchaseReturn/delPurchaseReturnOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 导出采购退货订单
export const exportPurchaseReturnUrl = '/webapi/order/purchaseReturn/exportPurchaseReturn.asyn'

// 根据采购退货ID获取详情
export async function getReturnOrderDetail(data) {
  return request({
    url: '/webapi/order/purchaseReturn/getDetailsById.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 打托出库保存
export async function purchaseReturnDelivery(data) {
  return request({
    url: '/webapi/order/purchaseReturn/purchaseReturnDelivery.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购退货出库订单列表
export async function listPurchaseReturnOdepot(data) {
  return request({
    url: '/webapi/order/purchaseReturnOdepot/listPurchaseReturnOdepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购退货出库订单列表 根据ID查询详情
export async function getpurchaseReturnOdepotDetail(data) {
  return request({
    url: '/webapi/order/purchaseReturnOdepot/getDetailsPById.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购退货出库订单列表 导出采购退货出库订单
export const exportPurchaseReturnOdepotUrl = '/webapi/order/purchaseReturnOdepot/exportPurchaseReturnOdepot.asyn'

// 采购退货出库订单列表 导入采购退货出库订单
export const importOrderUrl = '/webapi/order/purchaseReturnOdepot/importOrder.asyn'

// 采购退货出库订单列表 审核采购退货出库订单
export async function auditPurchaseReturnOrder(data) {
  return request({
    url: '/webapi/order/purchaseReturnOdepot/auditPurchaseReturnOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购退货出库订单列表 采购退货新增弹框查询
export async function getListPurchaseOrderByPage(data) {
  return request({
    url: '/webapi/order/purchase/getListPurchaseOrderByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购退货出库订单列表 检验订单参数是否相同
export async function isSameParameter(data) {
  return request({
    url: '/webapi/order/purchaseReturn/isSameParameter.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 访问新增页面
export async function toAddPage(data) {
  return request({
    url: '/webapi/order/purchaseReturn/toAddPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购入库单列表 获取分页数据
export async function listPurchaseWarehouse(data) {
  return request({
    url: '/webapi/order/warehouse/listPurchaseWarehouse.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购入库单列表 删除入库单
export async function delBatchByIds(data) {
  return request({
    url: '/webapi/order/warehouse/delBatchByIds.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购入库单列表 入库单明细导出
export const exportRelationUrl = '/webapi/order/warehouse/exportRelation.asyn'

// 采购入库单列表 入库单勾稽明细导出
export const purchaseExportRelationUrl = '/webapi/order/warehouse/purchaseExportRelation.asyn'

// 采购入库单列表 删除入库单
export async function confirmDepot(data) {
  return request({
    url: '/webapi/order/warehouse/confirmDepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购入库单列表 根据ID查找详情
export async function getWarehouseDetail(data) {
  return request({
    url: '/webapi/order/warehouse/getDetailsById.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购入库单列表 入库单导入
export const importWarehouseUrl = '/webapi/order/warehouse/importWarehouse.asyn'

// 采购入库单列表 关联采购单导入
export const importRelationUrl = '/webapi/order/warehouse/importRelation.asyn'

// 采购入库单列表 入库单勾稽校验仓库是否为在途仓
export async function checkWarehouseDepotType(data) {
  return request({
    url: '/webapi/order/warehouse/checkWarehouseDepotType.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

export async function checkDepotMerchantRel(data) {
  return request({
    url: '/webapi/system/depot/checkDepotMerchantRel.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购退货订单 采购退货非必填校验保存
export async function savePurchaseReturnOrder(data) {
  return request({
    url: '/webapi/order/purchaseReturn/savePurchaseReturnOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购退货订单 采购退货必填校验保存
export async function saveRequirePurchaseReturnOrder(data) {
  return request({
    url: '/webapi/order/purchaseReturn/saveRequirePurchaseReturnOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预申报单列表 预申报单修改
export async function modifyDeclare(data) {
  return request({
    url: '/webapi/order/declare/modifyDeclare.asyn',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 预申报单列表 获取一线清关资料
export async function getFirstCustomsDeclareInfo(data) {
  return request({
    url: '/webapi/order/declare/getFirstCustomsDeclareInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预申报单列表 编辑清关资料
export async function modifyCustomsDeclare(data) {
  return request({
    url: '/webapi/order/declare/modifyCustomsDeclare.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预申报单列表 获取导出清关模板
export async function getExportTemplate(data) {
  return request({
    url: '/webapi/order/customsFileConfig/getExportTemplate.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表 - 获取分页数据
export async function listPurchaseOrder(data) {
  return request({
    url: '/webapi/order/purchase/listPurchaseOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表 - 采购金额调整模态框获取详情
export async function getAmountAdjustmentDetail(data) {
  return request({
    url: '/webapi/order/purchase/getAmountAdjustmentDetail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表-采购SD生成金额获取列表
export async function getSdAmountAdjustmentDetail(data) {
  return request({
    url: '/webapi/order/purchase/getSdAmountAdjustmentDetail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表 - 采购金额修改
export async function saveAmountAdjustment(data) {
  return request({
    url: '/webapi/order/purchase/saveAmountAdjustment.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表 - 采购金额确认
export async function saveConfirmAmountAdjustment(data) {
  return request({
    url: '/webapi/order/purchase/saveConfirmAmountAdjustment.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表 - 获取采购订单详情明细
export async function getPurchaseOrderDetails(data) {
  return request({
    url: '/webapi/order/purchase/getPurchaseOrderDetails.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表 - 根据采购订单ID获取合同信息
export async function getContractInfoByPurchaseId(data) {
  return request({
    url: '/webapi/order/purchase/getContractInfoByPurchaseId.aysn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表 - 根据采购订单Id获取采购商品
export async function getPurchaseItem(data) {
  return request({
    url: '/webapi/order/purchase/getPurchaseItem.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表 - 修改录入发票 和付款日期
export async function updatePurchaseOrderInvoice(data) {
  return request({
    url: '/webapi/order/purchase/updatePurchaseOrderInvoice.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购与申报单 -导入箱装明细
export const importPackingDetailsUrl = '/webapi/order/declare/importPackingDetails.asyn'

// 采购订单列表 -完结入库校验
export async function endPurchaseOrderCheck(data) {
  return request({
    url: '/webapi/order/purchase/endPurchaseOrderCheck.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表 -完结入库
export async function endPurchaseOrder(data) {
  return request({
    url: '/webapi/order/purchase/endPurchaseOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表 -导入采购订单
export const importPurchaseUrl = '/webapi/order/purchase/importPurchase.asyn'

// 采购订单列表 -删除采购订单
export async function delPurchaseOrder(data) {
  return request({
    url: '/webapi/order/purchase/delPurchaseOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表 -生成预申报单
export async function generateDeclareOrder(data) {
  return request({
    url: '/webapi/order/purchase/generateDeclareOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表 -中转仓入库
export async function inWarehouse(data) {
  return request({
    url: '/webapi/order/purchase/inWarehouse.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表 -导出采购订单
export const exportPurchaseUrl = '/webapi/order/purchase/exportPurchase.asyn'

// 采购订单列表 -打托入库
export async function purchaseDelivery(data) {
  return request({
    url: '/webapi/order/purchase/purchaseDelivery.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表 -采购转销售
export async function saveSaleOrder(data) {
  return request({
    url: '/webapi/order/purchase/saveSaleOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表 -检查能否生成代采
export async function createFinancingOrderCheck(data) {
  return request({
    url: '/webapi/order/purchase/createFinancingOrderCheck.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表 -跳转融资代采页面
export async function toFinancingPage(data) {
  return request({
    url: '/webapi/order/purchase/toFinancingPage.aysn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表 -获取卓普信接口，加载下拉框
export async function getSapienceApiInfo(data) {
  return request({
    url: '/webapi/order/purchase/getSapienceApiInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表 -提交卓普信
export async function submitSapience(data) {
  return request({
    url: '/webapi/order/purchase/submitSapience.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表 -SD单创建前校验
export async function createSdOrderCheck(data) {
  return request({
    url: '/webapi/order/purchase/createSdOrderCheck.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表 -D单创建保存
export async function saveSdOrder(data) {
  return request({
    url: '/webapi/order/purchaseSdOrder/saveSdOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表-校验链路创建前校验
export async function toSaleStepBeforeCheck(data) {
  return request({
    url: '/webapi/order/purchase/toSaleStepBeforeCheck.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表-获取配置链路信息
export async function getTradeLinkList(data) {
  return request({
    url: '/webapi/order/purchase/getTradeLinkList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表-跳转采购链路1获取链路信息
export async function toSaleStepOnePage(data) {
  return request({
    url: '/webapi/order/purchase/toSaleStepOnePage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表-采购链路第一步保存链路信息
export async function saveOrUpdateLinkStepOne(data) {
  return request({
    url: '/webapi/order/purchase/saveOrUpdateLinkStepOne.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表-采购链路跳转步骤2获取信息,生成预览订单
export async function toSaleStepTwoPage(data) {
  return request({
    url: '/webapi/order/purchase/toSaleStepTwoPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表-返回采购链路1获取链路信息,
export async function backToSaleStepOnePage(data) {
  return request({
    url: '/webapi/order/purchase/backToSaleStepOnePage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表-采购链路保存，修改商品信息,
export async function saveSaleStepGoodsInfo(data) {
  return request({
    url: '/webapi/order/purchase/saveSaleStepGoodsInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表-采购链路跳转步骤3
export async function toSaleStepThreePage(data) {
  return request({
    url: '/webapi/order/purchase/toSaleStepThreePage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单列表-采购链路，源头订单审核，并入库
export async function saveFirstOrderStatusAndIdepot(data) {
  return request({
    url: '/webapi/order/purchase/saveFirstOrderStatusAndIdepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购链路，所有链路订单审核，并入库或出库
export async function saveLinkOrderAndDepot(data) {
  return request({
    url: '/webapi/order/purchase/saveLinkOrderAndDepot.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单编辑 获取仓库详情
export async function getDepotInfo(data) {
  return request({
    url: '/webapi/order/purchase/getDepotInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单编辑 查询采购价格管理
export async function getPurchasePriceManage(data) {
  return request({
    url: '/webapi/order/purchase/getPurchasePriceManage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单编辑 保存时只校验仓库、商品是否有值，这两个字段用户有输入值即可保存不做其他任何校验
export async function saveOrUpdateTempOrder(data) {
  return request({
    url: '/webapi/order/purchase/saveOrUpdateTempOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单提交前校验合同号和PO号是否被使用
export async function checkContractNoAndPoNo(data) {
  return request({
    url: '/webapi/order/purchase/checkContractNoAndPoNo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 编辑采购订单必填校验保存
export async function modifyPurchaseOrder(data) {
  return request({
    url: '/webapi/order/purchase/modifyPurchaseOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 新增采购订单必填校验保存
export async function savePurchaseOrder(data) {
  return request({
    url: '/webapi/order/purchase/savePurchaseOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 获取模板列表
export async function listFileTempInfo(data) {
  return request({
    url: '/webapi/order/fileTemp/listFileTempInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 美赞、宝洁、拜耳采购合同编辑提交
export async function modifyJsonPurchaseContract(data) {
  return request({
    url: '/webapi/order/purchase/modifyJsonPurchaseContract.asyn',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    data
  })
}

// 美赞、宝洁、拜耳采购合同编辑提交并提交采购订单
export async function submitJSONPurchaseContract(data) {
  return request({
    url: '/webapi/order/purchase/submitJSONPurchaseContract.asyn',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    data
  })
}

// 获取归属时间
export async function getAttributionDate(data) {
  return request({
    url: '/webapi/order/purchase/getAttributionDate.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 更新归属时间
export async function updateAttributionDate(data) {
  return request({
    url: '/webapi/order/purchase/updateAttributionDate.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 美赞、宝洁、拜耳采购合同编辑提交并审核采购订单
export async function auditJSONPurchaseContract(data) {
  return request({
    url: '/webapi/order/purchase/auditJSONPurchaseContract.asyn',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    data
  })
}

// 检查是否要生成内部供应商对应销售订单
export async function checkInnerMerchantSaleOrder(data) {
  return request({
    url: '/webapi/order/purchase/checkInnerMerchantSaleOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 检查采购订单是否存在交易链路配置
export async function checkTradeLink(data) {
  return request({
    url: '/webapi/order/purchase/checkTradeLink.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 内部公司销售订单
export async function saveInnerMerchantSaleOrders(data) {
  return request({
    url: '/webapi/order/purchase/saveInnerMerchantSaleOrders.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 一般采购合同编辑提交
export async function modifyPurchaseContract(data) {
  return request({
    url: '/webapi/order/purchase/modifyPurchaseContract.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 一般采购合同编辑提交并提交采购订单
export async function submitPurchaseContract(data) {
  return request({
    url: '/webapi/order/purchase/submitPurchaseContract.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 一般采购合同编辑提交并提交采购订单
export async function auditPurchaseContract(data) {
  return request({
    url: '/webapi/order/purchase/auditPurchaseContract.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购合同导出PDF
export const exportPurchaseContractPdfUrl = '/webapi/order/purchase/exportPurchaseContractPdf.asyn'

// 采购链路嘉宝跳转步骤2获取信息,生成预览订单
export async function toJBSaleStepTwoPage(data) {
  return request({
    url: '/webapi/order/purchase/toJBSaleStepTwoPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 导出美赞、宝洁、拜耳合同文件
export const exportTempDateFileUrl = '/webapi/order/purchase/exportTempDateFile.asyn'

// 采购 项目额度配置预警 列表
export async function getListByPage(data) {
  return request({
    url: '/webapi/order/projectQuotaWarning/getListByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购 项目额度配置预警 导出
export const exportProjectQuotaWarningUrl = '/webapi/order/projectQuotaWarning/exportProjectQuotaWarning.asyn'

// 采购 项目额度配置预警 刷新
export async function flashProjectQuotaWarningById(data) {
  return request({
    url: '/webapi/order/projectQuotaWarning/flashProjectQuotaWarningById.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购 项目额度配置预警 详情
export async function getProjectQuotaWarningById(data) {
  return request({
    url: '/webapi/order/projectQuotaWarning/getProjectQuotaWarningById.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

//  商品明细列表分页
export async function getItemListByPage(data) {
  return request({
    url: '/webapi/order/projectQuotaWarning/getItemListByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购订单 根据多个采购订单构造生成销售订单详情
export async function genSaleOrderByPurchaseIds(data) {
  return request({
    url: '/webapi/order/purchase/genSaleOrderByPurchaseIds.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购SD列表 分页
export async function purchaseSdOrderList(data) {
  return request({
    url: '/webapi/order/purchaseSdOrder/purchaseSdOrderList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购SD列表 导出
export const exportOrderUrl = '/webapi/order/purchaseSdOrder/exportOrder.asyn'

// 采购SD列表 删除SD单
export async function delSdOrder(data) {
  return request({
    url: '/webapi/order/purchaseSdOrder/delSdOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购SD列表 导入
export const purchaseSdOrderImportOrderUrl = '/webapi/order/purchaseSdOrder/importOrder.asyn'

// 采购SD列表 根据ID获取金额调整明细
export async function purchaseSdOrderAmountAdjustmentDetail(data) {
  return request({
    url: '/webapi/order/purchaseSdOrder/getAmountAdjustmentDetail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购SD列表 取详情
export async function purchaseSdOrderDetailById(data) {
  return request({
    url: '/webapi/order/purchaseSdOrder/getDetailById.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 采购SD列表 取详情
export async function purchaseSdOrderSaveAmountAdjustment(data) {
  return request({
    url: '/webapi/order/purchaseSdOrder/saveAmountAdjustment.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预申报单 获取物流联系人列表
export async function listTemplate(data) {
  return request({
    url: '/webapi/order/common/listTemplate.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预申报单 新增或编辑物流联系人
export async function saveOrUpdateLogisTemplate(data) {
  return request({
    url: '/webapi/order/common/saveOrUpdateLogisTemplate.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预申报单 删除物流联系人
export async function delTemplate(data) {
  return request({
    url: '/webapi/order/common/delTemplate.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预申报单 新增或编辑物流联系常用模版
export async function saveOrUpdateLogisTemplateLink(data) {
  return request({
    url: '/webapi/order/common/saveOrUpdateLogisTemplateLink.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预申报单 获取物流联系常用模版列表
export async function listTemplateLink(data) {
  return request({
    url: '/webapi/order/common/listTemplateLink.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预申报单 物流联系常用模版 删除
export async function delTemplateLink(data) {
  return request({
    url: '/webapi/order/common/delTemplateLink.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预申报单 更新轨迹时间
export async function updateTrajectory(data) {
  return request({
    url: '/webapi/order/declare/updateTrajectory.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预申报单 更新轨迹时间
export const exportLogisticsDelegationUrl = '/webapi/order/declare/exportLogisticsDelegation.asyn'

// 预申报单 获取预申报单各类型数量
export async function getDeclareTypeNum(data) {
  return request({
    url: '/webapi/order/declare/getDeclareTypeNum.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预申报单列表 预申报单修改
export async function declareDelivery(data) {
  return request({
    url: '/webapi/order/declare/declareDelivery.asyn',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 生成预申报单前检查
export async function generateDeclareOrderCheck(data) {
  return request({
    url: '/webapi/order/purchase/generateDeclareOrderCheck.asyn',
    method: 'POST',
    data: qs.stringify(data)
    // headers: { 'Content-Type': 'application/json' },
    // data
  })
}

// 根据采购订单ID获取发票信息
export async function getInvocieByPurchaseId(data) {
  return request({
    url: '/webapi/order/purchaseInvoice/getInvocieByPurchaseId.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 保存发票
export async function saveInvoice(data) {
  return request({
    url: '/webapi/order/purchaseInvoice/saveInvoice.asyn',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 发票 分页
export async function purchaseInvoiceList(data) {
  return request({
    url: '/webapi/order/purchaseInvoice/getListByPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 发票 详情
export async function purchaseInvoiceDetail(data) {
  return request({
    url: '/webapi/order/purchaseInvoice/getDetailsById.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}
