const cf = require("../config/config.js").config;
const { request } = require('../utils/util.js')
module.exports = {
    GetUserInfo(data,cookie){
        return request({
            method:'GET',
           // url: cf.postUrl+'user/info',
            url: cf.postUrl + 'user/center/info',
            header: { 'cookie': 'JSESSIONID=' + cookie},
            data: data
        });
    },
    // 阿里巴巴验证身份
    userAlibabaVerified(data){
        return request({
            method:'POST',
            // url: cf.postUrl+'user/userAlibabaVerified',
            url: cf.postUrl + 'user/authentication/alibabaVerified',
            data: data
        });
    },
    //保存实名认证
    addAuthentication(data){
        return request({
            method: 'POST',
            // url: cf.postUrl+'user/addAuthentication',
            url: cf.postUrl+'user/authentication/add',
            data: data
        })
    },
    getDarenId(pid) {
        return request({
           // url:  cf.postUrl + 'daren/getDarenIdByPid?pid=' + pid,
           url: cf.postUrl + 'daren/pid/getDarenIdByPid?pid=' + pid,
            method:'get'
        });
    },
    // 删除实名认证
    removeUserRealName(data) {
        return request({
            // url:  cf.postUrl + 'user/removeUserRealName',
            url:  cf.postUrl + 'user/authentication/remove',
            method:'get',
            data
        });
    }
}