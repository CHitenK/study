const cf = require("../config/config.js").config;
const { request } = require('../utils/util.js')
module.exports = {
    // 修改数量接口
    getTotalByProductAndNum: function(data) {
        return request({
            url: cf.postUrl + 'cart/total/numChange',
            method: 'POST',
            // url: cf.postUrl + 'cart/getTotalByProductAndNum',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: data
        })
    },
    //收货地址列表
    listUserAddress: function(data) {
        return request({
            method: 'POST',
            // url: cf.postUrl + 'user/listUserAddressForDouYin',
            url: cf.postUrl + 'user/address/list',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: data
        })
    },
    //新增收货地址
    addAdress: function (data){
        return request({
            method: 'POST',
            // url:  cf.postUrl + 'user/addAddress',
            url:  cf.postUrl + 'user/address/add',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: data
        })
    },
    // 删除地址
    removeAddress: function (data){
        return request({
            method: 'POST',
            // url:  cf.postUrl + 'user/removeAddress',
            url:  cf.postUrl + 'user/address/remove',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: data
        })
    },
    // 结算校验
    checkBeforeConfirm: function(data, cookie) {
        return request({
            method: 'get',
            // url: cf.postUrl + 'cart/checkBeforeConfirm',
            url: cf.postUrl + 'cart/confirm/check',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: data
        });
    },
}