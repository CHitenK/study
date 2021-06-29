import request from './../utils/http'
// 获取订单列表
export function getOrderList(param) {
  return request({
    url: 'trade/delivery/HExtPage',
    method: 'get',
    header: {
      'Content-type': 'application/json'
    },
    data: {
      pageNum: 1,
      pageSize: 10,
      ...param
    }
  })
}

// 获取订单详情
export function getOrderDetail(param) {
  return request({
    url: 'trade/delivery/detailNew',
    method: 'get',
    header: {
      'Content-type': 'application/json'
    },
    data: param
  })
}
// 扫码关联
export function bindCode(param) {
  return request({
    url: 'trade/delivery/barcode/bind',
    method: 'post',
    header: {
      // 'Content-type': 'application/json'
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: param
  })
}

// 获取发货单状态统计
export function deliveryStatusList(param) {
  return request({
    url: 'trade/delivery/deliveryStatusList',
    method: 'GET',
    header: {
      'Content-type': 'application/json'
    },
    data: param
  })
}

// 获取售后单数据
export function getSaleOders(param) {
  return request({
    url: 'h5/order/return/mgmt/queryReturnByPage',
    method: 'GET',
    header: {
      'Content-type': 'application/json'
    },
    data: param
  })
}

// 获取售后单详情
export function queryReturnDetail(param) {
  return request({
    url: 'h5/order/return/mgmt/queryReturnDetail',
    method: 'GET',
    header: {
      'Content-type': 'application/json'
    },
    data: param
  })
}

// 售后单统计
export function returnStatusList(param) {
  return request({
    url: 'h5/order/return/mgmt/returnStatusList',
    method: 'GET',
    header: {
      'Content-type': 'application/json'
    },
    data: param
  })
}

// 修改售后单状态
export function changeStatus(param) {
  return request({
    url: 'h5/order/return/mgmt/modifyOrderReturnStatus',
    method: 'PUT',
    header: {
      'Content-type': 'application/json'
    },
    data: JSON.stringify(param)
  })
}

// H5-同城购发货单列表（新后台）:trade/delivery/local/HExtPage
export function getLocalOrderList(param) {
  return request({
    url: 'trade/delivery/local/HExtPage',
    method: 'get',
    header: {
      'Content-type': 'application/json'
    },
    data: {
      pageNum: 1,
      pageSize: 10,
      ...param
    }
  })
}

// H5-B2C发货单列表（新后台）：trade/delivery/B2C/HExtPage
export function getB2CorderList(param) {
  return request({
    url: 'trade/delivery/B2C/HExtPage',
    method: 'get',
    header: {
      'Content-type': 'application/json'
    },
    data: {
      pageNum: 1,
      pageSize: 10,
      ...param
    }
  })
}

// 获取发货单状态统计 同城订单
export function getLocalDeliveryStatusList(param) {
  return request({
    url: 'trade/delivery/local/deliveryStatusList',
    method: 'GET',
    header: {
      'Content-type': 'application/json'
    },
    data: param
  })
}

// 获取发货单状态统计 B2C订单
export function getB2CDeliveryStatusList(param) {
  return request({
    url: 'trade/delivery/B2C/deliveryStatusList',
    method: 'GET',
    header: {
      'Content-type': 'application/json'
    },
    data: param
  })
}

// 门店商品库存调整
export function setIteminitial(param) {
  return request({
    url: 'h5/item/mgmt/iteminitial',
    method: 'post',
    data: param,
    header: {
      'Content-Type': 'application/json'
    }
  })
}

// 门店商品库存调整
export function getQueryProList(param) {
  return request({
    url: 'h5/item/mgmt/query/page',
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    },
    data: param
  })
}