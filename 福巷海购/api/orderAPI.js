const cf = require("../config/config.js").config;
const {
    request
} = require('../utils/util.js')

module.exports = {
    // 获取订单详情
    myOrderDetail(data) {
        return request({
            method: 'get',
            // url: cf.postUrl + 'order/myOrderDetail',
            url: cf.postUrl + 'order/my/detail',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data
        });
    },
    //获取订单状态
    orderStatus(data){
        return request({
            method: 'get',
            // url: cf.postUrl + 'order/orderStatus',
            url: cf.postUrl + 'order/status/info',
            data
        });
    },
    //确认收货
    sureReceiveGoods(data) {
        return request({
            method: 'get',
            // url: cf.postUrl + 'order/sureReceiveGoods',
            url: cf.postUrl + 'order/status/receive',
            data
        });
    },
    // 删除订单
    delMyOrder(data) {
        return request({
            url: cf.postUrl + 'order/my/del',
            method: 'get',
            // url: cf.postUrl + 'order/delMyOrder',
            data
        });
    },
    // 取消订单
    cancelMyOrder(data) {
        return request({
            url: cf.postUrl + 'order/my/cancel',
            method: 'get',
            // url: cf.postUrl + 'order/cancelMyOrder',
            data
        });
    },
    getLogisticsByOrderNo: function (data, cookie) { //查看物流信息
        return request({
            method: 'POST',
            url: cf.postUrl + 'logistics/logistics/info',
            // url: cf.postUrl + 'logistics/getLogisticsByOrderNo',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': cookie
            },
            data: data
        });
    },
    //根据不同状态获取订单列表
    myOrderList(data) {
        return request({
            method: 'get',
            // url: cf.postUrl + 'order/myOrderList',
            url: cf.postUrl + 'order/my/list',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data
        });
    },
    // 获取确认订单页面数据
    confirmOrder(data) {
        return request({
            method: 'post',
            // url: cf.postUrl + 'cart/confirmOrderPage',
            url: cf.postUrl + 'cart/order/confirm',
            data
        });
    },
    getDouyinAppPayInfo(data){ //确认支付
        return request({
            method: 'post',
            url: cf.payConfigUrl + 'pay/alipay/getDouyinAppPayInfo',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data
        });

    },
    // 获取轮询token
    createOrderToken: function (cookie) {
        return request({
            // url: cf.postUrl + 'cart/createToken',
            url: cf.postUrl + 'cart/token/create',
            method: 'GET',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': cookie
            },
            data: {}
        })
    },
    // 轮询查找用户信息
    getOrderInfoByKey: function (data, cookie) {
        return request({
            method: 'GET',
            url: cf.postUrl + 'cart/order/info',
            // url: cf.postUrl + 'cart/getOrderInfo',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': cookie
            },
            data: {
                token: data.token
            }
        });
    },
    // 提交订单
    submit: function (data, cookie) {
        return request({
            method: 'POST',
           //  url: cf.postUrl + 'cart/submitOrder',
           url: cf.postUrl + 'cart/order/submit',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': cookie
            },
            data: data
        });
    }
}