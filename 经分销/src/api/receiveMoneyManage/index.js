/**
 * 收款管理
 */
import request from '@u/http'
import qs from 'qs'

/**
 * 预收款单 api
 */

// 收款管理 - 预收款单 - 获取分页数据
export async function listAdvanceBill(data) {
  return request({
    url: '/webapi/order/advanceBill/listAdvanceBill.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 收款管理 - 预收款单 - 保存或修改预收账单
// export async function saveModifyAdvanceBill(data) {
//   return request({
//     url: '/webapi/order/advanceBill/saveModifyAdvanceBill.asyn',
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     data
//   })
// }

// 收款管理 - 预收款单 - 审核
export async function auditAdvanceItem(data) {
  return request({
    url: '/webapi/order/advanceBill/auditAdvanceItem.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 收款管理 - 预收款单 - 校验是否是同客户+同事业部+同币种
export async function checkData(data) {
  return request({
    url: '/webapi/order/advanceBill/checkData.asyn',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 收款管理 - 预收款单 - 根据id批量删除预收账单
export async function deleteAdvanceItem(data) {
  return request({
    url: '/webapi/order/advanceBill/delete.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 收款管理 - 预收款单 - 根据id查看详情
export async function detailAdvanceItem(data) {
  return request({
    url: '/webapi/order/advanceBill/detail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 收款管理 - 预收款单 - 查看核销记录
export async function getVerifyItems(data) {
  return request({
    url: '/webapi/order/advanceBill/getVerifyItems.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 收款管理 - 预收款单 - 获取业务单据
export async function listAddBill(data) {
  return request({
    url: '/webapi/order/advanceBill/listAddBill.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 收款管理 - 预收款单 - 获取关联预收单提交NC信息
export async function listAdvanceBillsToNC(data) {
  return request({
    url: '/webapi/order/advanceBill/listAdvanceBillsToNC.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 收款管理 - 预收款单 - 保存核销
export async function saveAdvanceBillVerify(data) {
  return request({
    url: '/webapi/order/advanceBill/saveAdvanceBillVerify.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 收款管理 - 预收款单 - 提交
// export async function submitAdvanceBill(data) {
//   return request({
//     url: '/webapi/order/advanceBill/submitAdvanceBill.asyn',
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     data
//   })
// }

// 收款管理 - 预收款单 - 提交作废申请
export async function submitInvalidBill(data) {
  return request({
    url: '/webapi/order/advanceBill/submitInvalidBill.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 收款管理 - 预收款单 - 同步NC
export async function synNC(data) {
  return request({
    url: '/webapi/order/advanceBill/synNC.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 收款管理 - 预收款单 - 获取费项数据
export async function settlementConfigListByCustomer(data) {
  return request({
    url: '/webapi/order/settlementConfig/settlementConfigListByModuleType.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 收款管理 - 预收款单 - 获取费项下拉列表
export async function getSettlementConfigBean(data) {
  return request({
    url: '/webapi/order/settlementConfig/getSelectBean.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 收款管理 - 预收款单 - 更新凭证信息
export async function updateVoucher(data) {
  return request({
    url: '/webapi/order/advanceBill/updateVoucher.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 收款管理 - 预收款单 - 保存或修改提交预收账单
export async function saveModifySubmitAdvanceBill(data) {
  return request({
    url: '/webapi/order/advanceBill/saveModifySubmitAdvanceBill.asyn',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 收款管理 - 预收款单 - 预收账单导出PDF
export const exportAdvanceBillPdfUrl = '/webapi/order/advanceBill/exportAdvanceBillPdf.asyn'

// to B 收款跟踪 列表分页
export async function listToBTempBillTrack(data) {
  return request({
    url: '/webapi/order/toBTempBillTrack/listToBTempBillTrack.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// to B 收款跟踪 导出
export const exportToBTempTrackUrl = '/webapi/order/toBTempBillTrack/exportToBTempTrack.asyn'

// to B 核销表 分页
export async function listToBTempBillVerify(data) {
  return request({
    url: '/webapi/order/toBTempBillVerify/listToBTempBillVerify.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// to B 核销表 刷新To B暂估核销单
export async function flashTobTemporaryReceiveBill(data) {
  return request({
    url: '/webapi/order/toBTempBillVerify/flashTobTemporaryReceiveBill.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// to B 核销表 根据To B暂估核销ID获取详情
export async function getDetailsById(data) {
  return request({
    url: '/webapi/order/toBTempBillVerify/getDetailsById.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// to B 核销表 根据To B暂估核销ID分页获取核销明细
export async function toBTempBillVerifyList(data) {
  return request({
    url: '/webapi/order/toBTempBillVerify/listToBTempItem.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// to B 核销表 据To B暂估核销ID分页获取核销返利明细
export async function toBTempBillVerifyRebateItemList(data) {
  return request({
    url: '/webapi/order/toBTempBillVerify/listToBTempRebateItem.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// to B 核销表 获取To B暂估明细导出数量
export async function getTempDetailsCount(data) {
  return request({
    url: '/webapi/order/toBTempBillVerify/getTempDetailsCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// to B 核销表导出To B暂估明细
export const exportToBTempDetailsUrl = '/webapi/order/toBTempBillVerify/exportToBTempDetails.asyn'

/**
 * 平台结算单 api
 */

// 收款管理 - 平台结算单 - 获取分页数据
export async function listPlatformStatementOrder(data) {
  return request({
    url: '/webapi/order/platformStatementOrder/listPlatformStatementOrder.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// To C结算列表 分页
export async function listTocReceiveBill(data) {
  return request({
    url: '/webapi/order/toCReceiveBill/listTocReceiveBill.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// To C结算列表 详情
export async function toCReceiveBillDetail(data) {
  return request({
    url: '/webapi/order/toCReceiveBill/detail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// To C结算列表 获取toc应收明细分页数据
export async function listReceiveItem(data) {
  return request({
    url: '/webapi/order/toCReceiveBill/listReceiveItem.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// To C结算列表 获取toc费用明细分页数据
export async function listReceiveCostItem(data) {
  return request({
    url: '/webapi/order/toCReceiveBill/listReceiveCostItem.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// To C结算列表 导出
export const exportBillUrl = '/webapi/order/toCReceiveBill/exportBill.asyn'

// To C结算列表 删除
export async function delToCReceiveBill(data) {
  return request({
    url: '/webapi/order/toCReceiveBill/delToCReceiveBill.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// To C结算列表 作废
export async function saveInvalidBill(data) {
  return request({
    url: '/webapi/order/toCReceiveBill/saveInvalidBill.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// To C结算列表 导出PDF
export const exportPDFUlr = '/webapi/order/toCReceiveBill/exportPDF.asyn'

// To C结算列表 获取店铺
export async function getShopInfo(data) {
  return request({
    url: '/webapi/order/toCReceiveBill/getShopInfo.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// To C结算列表 新增Toc应收账单
export async function saveTocSettlementBill(data) {
  return request({
    url: '/webapi/order/toCReceiveBill/saveTocSettlementBill.asyn',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

// To C结算列表 同步Nc列表
export async function listReceiveBillsToNC(data) {
  return request({
    url: '/webapi/order/toCReceiveBill/listReceiveBillsToNC.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// To C结算列表 同步Nc
export async function toCsynNC(data) {
  return request({
    url: '/webapi/order/toCReceiveBill/synNC.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 导出失败原因
export const downLoadErrorUrl = '/webapi/order/toCReceiveBill/downLoad.asyn'

// 应收账龄报告 分页列表
export async function listReceiveAgingReport(data) {
  return request({
    url: '/webapi/order/receiveAgingReport/listReceiveAgingReport.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应收账龄报告 导出
export const exportReceiveAgingReportUrl = '/webapi/order/receiveAgingReport/exportReceiveAgingReport.asyn'

// 应收账龄报告 刷新
export async function refreshReceiveAgingReport(data) {
  return request({
    url: '/webapi/order/receiveAgingReport/refreshReceiveAgingReport.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 保存补扣款信息
export async function saveToCReceiveBillCost(data) {
  return request({
    url: '/webapi/order/toCReceiveBill/saveToCReceiveBillCost.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 完结核销
export async function endTobTemporaryReceiveBill(data) {
  return request({
    url: '/webapi/order/toBTempBillVerify/endTobTemporaryReceiveBill.asyn',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

export async function getMaxRefreshDate(data) {
  return request({
    url: '/webapi/order/receiveAgingReport/getMaxRefreshDate.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}
te.asyn