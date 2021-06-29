const {
    request
} = require('../utils/util.js')
const cf = require("../config/config.js").config;
const app = getApp();
module.exports = {
    // 收益明细
    detail: function (data) {
        return request({
            method: 'get',
            url: cf.postUrl + 'distribution/return/detail',
            data: data,
            header: {
                'cookie': 'JSESSIONID=' + app.globalData.sessionId
            }
        });
    },
    // 店主信息
    darenkeeperInfo: function (data) {
        return request({
            method: 'get',
            url: cf.postUrl + 'workbench/darenkeeper/info',
            data: data,
            header: {
                'cookie': 'JSESSIONID=' + app.globalData.sessionId
            }
        });
    },
    /**
     * 收益明细列表
     * page	是	int	分页参数
     * num	是	int	分页参数
     * source	否	string	收益明细来源 SalesRebate 销售返利; CashOut 提现 不传为全部
     * 
     */
    distributionList: function (data) {
        return request({
            method: 'get',
            url: cf.postUrl + 'distribution/return/list',
            data: data,
            header: {
                'cookie': 'JSESSIONID=' + app.globalData.sessionId
            }
        });
    },
    /**
     * 待入账
     * page	是	int	分页参数
     * num	是	int	分页参数
     * 
     */
    toBeRecorded: function (data) {
        return request({
            method: 'get',
            url: cf.postUrl + 'distribution/return/toBeRecorded',
            data: data,
            header: {
                'cookie': 'JSESSIONID=' + app.globalData.sessionId
            }
        });
    },
    /**
     * 添加银行卡
     * realName	是	string	真实姓名
     *  bankCard	是	string	银行卡号
     *  idCard	是	string	身份证号
     *  mobile	否	string	银行卡预留手机号
     * 
     */
    addBankCard: function (data) {
        return request({
            method: 'POST',
            // url: cf.postUrl + 'daren/addBankCard',
            url: cf.postUrl + 'daren/bankcard/add',
            data: data,
            header: {
                'cookie': 'JSESSIONID=' + app.globalData.sessionId
            }
        });
    },
    /**
     * 获取银行卡列表
     */
    bankCardList: function (data) {
        return request({
            method: 'get',
            // url: cf.postUrl + 'daren/bankCardList',
            url: cf.postUrl + 'daren/bankcard/list',
            data: data,
            header: {
                'cookie': 'JSESSIONID=' + app.globalData.sessionId
            }
        });
    },
    /**
     * 删除银行卡
     * bankCardId 银行卡id
     */
    delDarenBankcard: function (data) {
        return request({
            method: 'POST',
            // url: cf.postUrl + 'daren/delDarenBankcard',
            url: cf.postUrl + 'daren/bankcard/del',
            data: data,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': 'JSESSIONID=' + app.globalData.sessionId
            }
        });
    },
    /**
     * 获得提现所需信息
     */
    getWithdrawalNssInfo: function (data) {
        return request({
            method: 'get',
            // url: cf.postUrl + 'daren/getWithdrawalNssInfo',
            url: cf.postUrl + 'daren/withdrawal/Info',
            data: data,
            header: {
                // 'content-type': 'application/x-www-form-urlencoded',
                'cookie': 'JSESSIONID=' + app.globalData.sessionId
            }
        });
    },
    /**
     * 申请提现
     * withdrawalAmount	num	提现金额
     * bankCardId 银行卡id
     */
    applyWithdrawal: function (data) {
        return request({
            method: 'POST',
           // url: cf.postUrl + 'daren/applyWithdrawal',
            url: cf.postUrl + 'daren/withdrawal/apply',
            data: data,
            header: {
                // 'content-type': 'application/x-www-form-urlencoded',
                'cookie': 'JSESSIONID=' + app.globalData.sessionId
            }
        });
    },
    /**
     * 设置默认银行卡
     * bankCardId 银行卡id
     */
    setDefBankcard: function (data) {
        return request({
            method: 'POST',
            // url: cf.postUrl + 'daren/setDefBankcard',
            url: cf.postUrl + 'daren/bankcard/defSet',
            data: data,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': 'JSESSIONID=' + app.globalData.sessionId
            }
        });
    },
    /**
     * 提交银行卡短信验证码
     * mobile 手机号
     * cardId 银行卡id
     * code	验证码
     */
    verify: function (data) {
        return request({
            method: 'POST',
            url: cf.postUrl + 'daren/bankcard/verify',
            data: data,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': 'JSESSIONID=' + app.globalData.sessionId
            }
        });
    },
    /**
     * 再次获取银行卡验证码
     * cardId 银行卡id
     */
    verifySms: function (data) {
        return request({
            method: 'GET',
            url: cf.postUrl + 'daren/bankcard/verifySms',
            data: data,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': 'JSESSIONID=' + app.globalData.sessionId
            }
        });
    },
}