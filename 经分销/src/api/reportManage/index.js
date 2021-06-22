/**
 * 报表管理
 */
import request from '@u/http'
import qs from 'qs'

/**
 * 累计汇总表 api
 */

// 累计汇总表 - 获取分页数据
export async function buFinanceAddSummaryList(data) {
  return request({
    url: '/webapi/report/buFinanceAdd/buFinanceAddSummaryList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 累计汇总表 - 访问列表页面
export async function buFinanceAddSummaryToPage(data) {
  return request({
    url: '/webapi/report/buFinanceAdd/toPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 累计汇总表 - 累计总表导出
export const exportBuFinanceAddSummaryUrl = '/webapi/report/buFinanceAdd/export.asyn'

/**
 * 累计销售汇总表 api
 */

// 累计销售汇总表 - 获取分页数据
export async function buFinanceSaleList(data) {
  return request({
    url: '/webapi/report/buFinanceAddSale/buFinanceAddSaleList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 累计销售汇总表 - 访问列表页面
export async function buFinanceSaleToPage(data) {
  return request({
    url: '/webapi/report/buFinanceAddSale/toPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 累计销售汇总表 - 累计总表导出
export const exportbuFinanceSaleUrl = '/webapi/report/buFinanceAddSale/export.asyn'

/**
 * 累计采购汇总表 api
 */

// 累计采购汇总表 - 获取分页数据
export async function buFinancePurchaseList(data) {
  return request({
    url: '/webapi/report/buFinanceAddWarehouse/buFinanceAddWarehouseList.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 累计采购汇总表 - 访问列表页面
export async function buFinancePurchaseToPage(data) {
  return request({
    url: '/webapi/report/buFinanceAddWarehouse/toPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 累计采购汇总表 - 累计总表导出
export const exportBuFinancePurchaseUrl = '/webapi/report/buFinanceAddWarehouse/export.asyn'

/**
 * ToC暂估应收表 api
 */

// ToC暂估应收表 - 获取分页数据
export async function listToCTempReceiveBill(data) {
  return request({
    url: '/webapi/order/tocTempReceiveBill/listToCTempReceiveBill.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// ToC暂估应收表 - 刷新
export async function refreshBill(params) {
  return request({
    url: '/webapi/order/tocTempReceiveBill/refreshBill.asyn',
    method: 'GET',
    params
  })
}

// ToC暂估应收表 - 统计导出数量
export async function getBillCount(data) {
  return request({
    url: '/webapi/order/tocTempReceiveBill/getBillCount.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// ToC暂估应收表 - 访问详情页面
export async function detailToCTempReceiveBill(data) {
  return request({
    url: '/webapi/order/tocTempReceiveBill/toDetailsPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// ToC暂估应收表 - 根据账单id获取暂估费用明细
export async function listToCTempReceiveCostItem(data) {
  return request({
    url: '/webapi/order/tocTempReceiveBill/listToCTempReceiveCostItem.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// ToC暂估应收表 - 根据账单id获取暂估应收明细
export async function listToCTempReceiveItem(data) {
  return request({
    url: '/webapi/order/tocTempReceiveBill/listToCTempReceiveItem.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// ToC暂估应收表 - 获取当前商家关联的店铺
export async function getShopInfoList(data) {
  return request({
    url: '/webapi/order/tocTempReceiveBill/toPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// ToC暂估应收表 - 导出
export const exportBillUrl = '/webapi/order/tocTempReceiveBill/exportBill.asyn'

// ToC暂估应收表 - 暂估汇总导出
export const exportSummaryOrderUrl = '/webapi/order/tocTempReceiveBill/exportSummaryOrder.asyn'

// ToC暂估应收表 - 累计暂估应收导出
export const exportTempBillUrl = '/webapi/order/tocTempReceiveBill/exportTempBill.asyn'

/**
 * 收款核销跟踪 api
 */

// 收款核销跟踪 - 获取分页数据
export const listReceiveBillVerification = (data) => {
  return request({
    url: '/webapi/order/receiveBillVerification/listReceiveBillVerification.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 收款核销跟踪 - 刷新
export const flashReceiveBillVerification = (data) => {
  return request({
    url: '/webapi/order/receiveBillVerification/flash.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 收款核销跟踪 - 查询回款备注
export const toNotesPage = (data) => {
  return request({
    url: '/webapi/order/receiveBillVerification/toNotesPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 收款核销跟踪 - 保存备注
export const saveNotes = (data) => {
  return request({
    url: '/webapi/order/receiveBillVerification/saveNotes.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 收款核销跟踪 - 获取详情
export const detailReceiveBillVerification = (data) => {
  return request({
    url: '/webapi/order/receiveBillVerification/toPage.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// ToC暂估应收表 - 累计暂估应收导出
export const exportReceiveBillVerificationUrl = '/webapi/order/receiveBillVerification/export.asyn'

/**
 * 应收发票库 api
 */

// 应收发票库 - 获取分页数据
export const listReceiveBillInvoice = (data) => {
  return request({
    url: '/webapi/order/receiveBillInvoice/listReceiveBillInvoice.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应收发票库 - 获取发票详情
export const getInvoiceDetail = (data) => {
  return request({
    url: '/webapi/order/receiveBillInvoice/getInvoiceDetail.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应收发票库 - 完成发票签章
export const modifyInvoice = (data) => {
  return request({
    url: '/webapi/order/receiveBillInvoice/modifyInvoice.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应收发票库 - 获取关联应收账单
export const listReceiveBills = (data) => {
  return request({
    url: '/webapi/order/receiveBillInvoice/listReceiveBills.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应收发票库 - 校验发票
export const validateSynNC = (data) => {
  return request({
    url: '/webapi/order/receiveBillInvoice/validateSynNC.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应收发票库 - 获取关联应收单提交NC信息
export const listReceiveBillsToNC = (data) => {
  return request({
    url: '/webapi/order/receiveBillInvoice/listReceiveBillsToNC.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应收发票库 - 同步NC
export const synNC = (data) => {
  return request({
    url: '/webapi/order/receiveBillInvoice/synNC.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 应收发票库 - 导出应收对账
export const exportBillInvoiceUrl = '/webapi/order/receiveBillInvoice/exportBillInvoice.asyn'

// 应收发票库 - 导出
export const exportInvoiceUrl = '/webapi/order/receiveBillInvoice/exportInvoice.asyn'

// 应收发票库 - 导出应收单NC提交信息
export const exportBillNcUrl = '/webapi/order/receiveBillInvoice/download.asyn'

// 应收发票库 - 发票预览
export const previewInvoice = '/webapi/order/receiveBillInvoice/preview/'

// 应收发票库 - 替换发票文件
export const replaceInvoiceUrl = '/webapi/order/receiveBillInvoice/replaceInvoice.asyn'
