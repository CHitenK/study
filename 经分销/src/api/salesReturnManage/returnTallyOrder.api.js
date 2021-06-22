/**
 * 销售退理货单列表 api
 */
import request from '@u/http'
import qs from 'qs'

// 销售退货管理 - 销售退理货单列表 - 查询销售退理货单列表信息
export const getTallyOrderList = (data) => {
  return request({
    url: '/webapi/order/saleReturnTallyin/listTallyingOrderTransfer.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退理货单列表 - 销售退理货单详情
export const getTallyOrderDetail = (data) => {
  return request({
    url: '/webapi/order/saleReturnTallyin/toDetailPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 销售退货管理 - 销售退理货单列表 - 销售退货理货单确认/驳回
export const tallyConfirmTransfer = (data) => {
  return request({
    url: '/webapi/order/saleReturnTallyin/tallyConfirmTransfer.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}
