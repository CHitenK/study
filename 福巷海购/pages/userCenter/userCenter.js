// pages/UserCenter/UserCenter.js
var app = getApp();
const $ = require('../../utils/util.js');
const {
    totalOrder
} = require('./../../api/newProductDetail')
const {
    darenkeeperInfo
} = require('../../api/daren')

var noClick = true //true不可点击,false可点击
Page({
    data: {
        nickName: '',
        mobilePhone: '',
        userHeadImg: '',
        isLogin: false,
        order: {},
        userType: null, //用户身份
        sessionId: '',
        realRebate: 0, //累计收益
        preCommission: 0, //待入账
        commissionBalance: 0, //可提现金额
        identityCode:''
    },

    onLoad: function (options) {
       
    },
    onShow: function () {
        const that = this;
        const UserInfo = app.globalData.userInfo
        that.setData({
            sessionId: app.globalData.sessionId,
            userType: UserInfo ? UserInfo.userType : ''
        });
        // 登录再显示用户信息
        if (app.globalData.Islogin) {
            that.GetUserInfo();
        } else {
            noClick = false
        }

    },

    /**
     * 获取用户信息
     */
    GetUserInfo: function () {
        var that = this;
        app.GetUserInfo(that.data.sessionId, function (res) {
            console.log('用户中心信息：',res)
            noClick = false
            let data = res.body || res.data
            if (data && data.mobilePhone) {
                that.setData({
                    isLogin: true,
                    nickName: app.globalData.userInfo.nickName,
                    mobilePhone: app.globalData.userInfo.mobilePhone,
                    userHeadImg:  app.globalData.userInfo.icon
                })
                if(data.identityCode){
                    that.data.identityCode = data.identityCode
                }
                that.totalOrder()
                if (app.globalData.userInfo.userType == 'Staff') {
                    that.darenkeeperInfo()
                }
            } else {
                that.setData({
                    isLogin: false
                })
            }

        })
    },
    //收货地址
    addressList: function () {
        if (noClick) {
            return false
        }
        if (this.data.isLogin) {
            tt.setStorageSync('AddressFrom', 2);
            tt.navigateTo({
                url: '/pages/AddressList/AddressList' // 指定页面的url
            });
        } else {
            tt.navigateTo({
                url: '/pages/login/login'
            })
        }
    },
    //实名认证
    authIdCardList: function () {
        if (noClick) {
            return false
        }
        if (this.data.isLogin) {
            tt.navigateTo({
                url: '/pages/AuthIdCardInfoList/AuthIdCardInfoList' // 指定页面的url
            });
        } else {
            tt.navigateTo({
                url: '/pages/login/login'
            })
        }
    },
    // 跳转到我的订单列表页面
    jumpMyOrder: function (e) {
        if (noClick) {
            return false
        }
        if (this.data.isLogin) {
            $.gopage("/pages/Orderlistment/Orderlistment?typeIndex=" + e.currentTarget.dataset.typeindex);
        } else {
            tt.navigateTo({
                url: '/pages/login/login'
            })
        }

    },
    //点击头像
    ClickPhoto: function () {
        if (noClick) {
            return false
        }
        if (!this.data.isLogin) {
            tt.navigateTo({
                url: '/pages/login/login'
            })
        }

    },
    // 获取订单统计
    totalOrder() {
        var cookie = 'JSESSIONID=' + this.data.sessionId
        totalOrder(cookie).then(res => {
            this.setData({
                order: res.data
            })
        })
    },
    to(e) {
        if (noClick) {
            return false
        }
        let url = e.currentTarget.dataset.url
        if (this.data.isLogin) {
            // 如果未实名认证去提现则先跳转到实名认证
            $.gopage(url);
        } else {
            tt.navigateTo({
                url: '/pages/login/login'
            })
        }
    },
    // 获取店主信息
    darenkeeperInfo() {
        darenkeeperInfo().then(res => {
            let data = res.body || res.data
            if (data) {
                this.setData({
                    realRebate: data.realRebate, //累计收益
                    preCommission: data.preCommission, //待入账
                    commissionBalance: data.commissionBalance, //可提现金额
                })
            }
        })
    },
    
})