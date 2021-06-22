/**
 *  费项管理（账单管理） api
 */
 import request from '@u/http'
 import qs from 'qs'

// 费项管理 - NC收支费项 - 查询NC收支费项列表信息
export const listReceivePaymentSubject = (data) => {
  return request({
    url: '/webapi/order/receivePaymentSubject/listReceivePaymentSubject.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 费项管理 - NC收支费项 - 启用/停用
export const enableNcPay = (data) => {
  return request({
    url: '/webapi/order/receivePaymentSubject/enableNcPay.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 费项管理 - NC收支费项 - 编辑修改
export const modifyNcPay = (data) => {
  return request({
    url: '/webapi/order/receivePaymentSubject/modifyNcPay.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 费项管理 - NC收支费项 - 保存
export const saveNcPay = (data) => {
  return request({
    url: '/webapi/order/receivePaymentSubject/saveNcPay.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 费项管理 - NC收支费项 - 编辑回显
export const NcPayEditPage = (data) => {
  return request({
    url: '/webapi/order/receivePaymentSubject/toEditPage.html',
    method: 'POST',
    data: qs.stringify(data)
  })
}
