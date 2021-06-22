/**
 * 收款管理 api
 */
import request from '@u/http'
import qs from 'qs'

/**
 * 预付账单 api
 */

// 预付账单 - 获取分页数据
export async function listAdvancePaymentBill(data) {
  return request({
    url: '/webapi/order/advancePaymentBill/listAdvancePaymentBill.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预付账单 - 校验是否是同供应商+同事业部+同币种
export async function checkDataBill(data) {
  return request({
    url: '/webapi/order/advancePaymentBill/checkData.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预付账单 - 跳转新增页面获取数据
export async function getAddPageInfo(data) {
  return request({
    url: '/webapi/order/advancePaymentBill/getAddPageInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预付账单 - 获取采购单据单据
export async function listPurchaseOrder(data) {
  return request({
    url: '/webapi/order/advancePaymentBill/listPurchaseOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预付账单 - 保存或修改预付账单
export async function saveOrModifyAdvancePaymentBill(data) {
  return request({
    url: '/webapi/order/advancePaymentBill/saveOrModifyAdvancePaymentBill.asyn',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 预付账单 - 提交作废申请
export async function submitInvalidBill(data) {
  return request({
    url: '/webapi/order/advancePaymentBill/submitInvalidBill.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预付账单 - 编辑提交，修改选择审批方式
export async function modifyAuditMethod(data) {
  return request({
    url: '/webapi/order/advancePaymentBill/modifyAuditMethod.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预付账单 - 审核
export async function auditAdvancePayment(data) {
  return request({
    url: '/webapi/order/advancePaymentBill/auditAdvancePayment.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预付账单 - 根据id批量删除预收账单
export async function deleteAdvance(data) {
  return request({
    url: '/webapi/order/advancePaymentBill/delete.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预付账单 - 根据id查看详情
export async function detailAdvance(data) {
  return request({
    url: '/webapi/order/advancePaymentBill/detail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预付账单 - 获取付款明细
export async function getPaymentItems(data) {
  return request({
    url: '/webapi/order/advancePaymentBill/getPaymentItems.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预付账单 - 获取付款记录
export async function getRecordItemList(data) {
  return request({
    url: '/webapi/order/advancePaymentBill/getRecordItemList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预付账单 - 选择结算项目
export async function getSettlementConfigList(data) {
  return request({
    url: '/webapi/order/settlementConfig/settlementConfigListByModuleType.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预付账单 - 获取操作日志记录
export async function listOperateLog(data) {
  return request({
    url: '/webapi/order/advancePaymentBill/listOperateLog.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预付账单 - 付款
export async function payment(data) {
  return request({
    url: '/webapi/order/advancePaymentBill/payment.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预付账单 - 获取费项下拉列表
export async function getSettlementConfigBean(data) {
  return request({
    url: '/webapi/order/settlementConfig/getSelectBean.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预付账单 - 获取打印信息
export async function getPrintingInfo(data) {
  return request({
    url: '/webapi/order/advancePaymentBill/getPrintingInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 预付账单 - 导出
export const exportPaymentExcel = '/webapi/order/advancePaymentBill/exportExcel.asyn'

// 预付账单 - 导出PDF
export const exportPaymentPDF = '/webapi/order/advancePaymentBill/exportPDF.asyn'

/**
 * 应付账单 api
 */

// 应付账单 - 获取分页数据
export async function listPaymentBill(data) {
  return request({
    url: '/webapi/order/paymentBill/listPaymentBill.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应付账单 - 校验是否是同供应商+同事业部+同币种
export async function paymentBillCheckData(data) {
  return request({
    url: '/webapi/order/paymentBill/checkData.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应付账单 - 根据id批量删除应付账单
export async function deletePaymentBill(data) {
  return request({
    url: '/webapi/order/paymentBill/delete.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应付账单 - 根据id查看详情
export async function detailPaymentBill(data) {
  return request({
    url: '/webapi/order/paymentBill/detail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应付账单 - 跳转新增页面获取数据
export async function paymentBillAddPage(data) {
  return request({
    url: '/webapi/order/paymentBill/getAddPageInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应付账单 - 获取费用明细
export async function paymentBillCostItems(data) {
  return request({
    url: '/webapi/order/paymentBill/getCostItems.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应付账单 - 获取付款明细
export async function paymentBillPaymentItems(data) {
  return request({
    url: '/webapi/order/paymentBill/getPaymentItems.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应付账单 - 获取核销记录
export async function getVerificateList(data) {
  return request({
    url: '/webapi/order/paymentBill/getVerificateList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应付账单 - 获取操作日志记录
export async function paymentBillListOperateLog(data) {
  return request({
    url: '/webapi/order/paymentBill/listOperateLog.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应付账单 - 获取采购单据单据
export async function paymentBillListPurchaseOrder(data) {
  return request({
    url: '/webapi/order/paymentBill/listPurchaseOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应付账单 - 保存或修改应付账单
export async function saveOrModifyPaymentBill(data) {
  return request({
    url: '/webapi/order/paymentBill/saveOrModifyPaymentBill.asyn',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    data
  })
}

// 应付账单 - 提交作废申请
export async function paymentBillSubmitInvalidBill(data) {
  return request({
    url: '/webapi/order/paymentBill/submitInvalidBill.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应付账单 - 核销
export async function paymentBillVerificate(data) {
  return request({
    url: '/webapi/order/paymentBill/verificate.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应付账单 - 获取汇总明细
export async function getPaymentSummary(data) {
  return request({
    url: '/webapi/order/paymentBill/getPaymentSummary.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应付账单 - 编辑提交，修改选择审批方式
export async function paymentBillAuditMethod(data) {
  return request({
    url: '/webapi/order/paymentBill/modifyAuditMethod.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应付账单 - 审核
export async function paymentBillauditPayment(data) {
  return request({
    url: '/webapi/order/paymentBill/auditPayment.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应付账单 - 勾稽预付款单
export async function getVeriAdvancePaymentList(data) {
  return request({
    url: '/webapi/order/paymentBill/getVeriAdvancePaymentList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应付账单 - 更新凭证信息
export async function flashVoucher(data) {
  return request({
    url: '/webapi/order/paymentBill/flashVoucher.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应付账单 - 同步NC
export async function synNC(data) {
  return request({
    url: '/webapi/order/paymentBill/synNC.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应付账单 - 获取打印信息
export async function paymentBillPrinting(data) {
  return request({
    url: '/webapi/order/paymentBill/getPrintingInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应付账单 - 导出PDF
export const exportPayablePDF = '/webapi/order/paymentBill/exportPDF.asyn'
