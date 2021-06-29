const cf = require("../config/config.js").config;
const { request, ajaxJSON } = require('../utils/util.js')
module.exports = {
    // 搜索商品
    list(data) {
        return request({
            // url: cf.postUrl + 'productData/list',
            url: cf.postUrl + 'product/data/list',
            method:'get',
            data
        });
    },
    // 抖音账号登录
    authMiniApp(data) {
        return request({
            url: cf.loginConfigUrl + 'auth/authMiniApp',
            method:'post',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data
        });
    },
    Province(){//省级地址库
        return ajaxJSON({
            url:cf.cdnUrl + 'static/json/address/Province.json',
            method:'get',
        })
    },
    City(){//市级地址库
        return ajaxJSON({
            url:cf.cdnUrl + 'static/json/address/City.json',
            method:'get',
        })
    },
    County(){//区级地址库
        return ajaxJSON({
            url:cf.cdnUrl + 'static/json/address/County.json',
            method:'get',
        })
    },
    // 普通用户注册
    savePhone(data){
        return request({
            url: cf.loginConfigUrl +'auth/savePhone',
            method:'post',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data
        })
    },
    // 判断用户是否已经实名认证
    hasAddressAndAuthentication(seesion) {
       return request({
           //  url: cf.postUrl + 'user/hasAddressAndAuthentication',
            url: cf.postUrl + 'user/authentication/verified',
            method: 'GET' 
        })
    },
    // 达人注册
    darenRegiste(data, seesion) {
        return request({
            url: cf.loginConfigUrl +'auth/enrollDaren',
            method: 'post',
            header: { 'cookie': 'JSESSIONID=' + seesion},
            data 
        })
    }
}