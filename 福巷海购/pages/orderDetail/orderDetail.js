// pages/orderDetail/orderDetail.js
const app = getApp();
const $ = require('../../utils/util.js');
const orderAPI = require('../../api/orderAPI.js');
let timer = null
Page({
    data: {
        showClose: false,
        orderId: '', // 订单id
        sessionId: '',
        productInfo: '',
        lastLogistics:[],
        cando: true
    },
    onLoad: function (options) {
        this.setData({
            orderId: options.orderId
        })
    },
    onShow() {
        // 没有登录则去到登录页
        if (!app.globalData.Islogin) {
            tt.navigateTo({
                url: '/pages/login/login'
            })
            return false
        }
        this.initData();
        const routers = getCurrentPages() // 路径路由
        const route = routers[routers.length -1]
        app.globalData.fromOrderListPath = route.__route__ || '' // 
    },
    onUnload() {
      clearInterval(timer)
    },
    itemClick(e) {
        // debugger
        const id = e.currentTarget.dataset.id;
        const darenId = e.currentTarget.dataset.darenid;
        tt.navigateTo({
            url: '/pages/producrdetail/producrdetail' + "?id=" + id + '&darenId=' + darenId
        })
    },
    // 初始化数据
    initData: function () {
        const that = this;
        that.setData({
            sessionId: app.globalData.sessionId
            // orderId: "191023182609864"
        })
        const val = {
            pfChannelId: app.globalData.pfChannelId,
            orderId: that.data.orderId
        };
        orderAPI.myOrderDetail(val).then(res => {
            if (res.code == 1) {
                for (let i in res.data.orderSkus) {
                    res.data.orderSkus[i].unitPrice = $.keepTwoDecimalFull(res.data.orderSkus[i].unitPrice);
                    res.data.orderSkus[i].totalPrice = $.keepTwoDecimalFull(res.data.orderSkus[i].totalPrice);
                    res.data.orderSkus[i].originalPrice = $.keepTwoDecimalFull(res.data.orderSkus[i].originalPrice);
                    res.data.orderSkus[i].tax = $.keepTwoDecimalFull(res.data.orderSkus[i].tax);
                }
                res.data.totalPrice = $.keepTwoDecimalFull(res.data.totalPrice)
                res.data.totalTax = $.keepTwoDecimalFull(res.data.totalTax)
                res.data.goodsPrice = $.keepTwoDecimalFull(res.data.goodsPrice)
                that.setData({
                    productInfo: res.data
                })
                
                if(res.data && res.data.receiverPhone){
                    // 对收货人手机号码处理(中间4位为*号)
                    const tel = res.data.receiverPhone;
                    var newTel = '';
                    var prestr = tel.slice(0, 3)
                    var slicestr = tel.slice(3, 6);
                    var nextstr = tel.slice(7, 11);
                    slicestr = "****";
                    newTel = prestr.concat(slicestr).concat(nextstr);
                    that.setData({
                        newTel: newTel
                    })
                }

                // 对待支付时间倒计时处理
                if (that.data.productInfo.frontState == 'WaitPay') {
                    // 在倒计时时间大于0才表示还支付，此时显示待支付状态，否则表示倒计时已经结束了，因为后台不能及时更新，所以需要前端处理为交易关闭状态
                    if (that.data.productInfo.surplusDate > 0) {
                        that.setData({
                            showClose: false
                        })
                        var surplusDate = that.data.productInfo.surplusDate
                        var totalSec = Math.floor(surplusDate / 1000);
                        timer = setInterval(function () {
                            //  判断 是否 小于0了
                            if (totalSec <= 0) {
                                clearInterval(timer);
                                that.initData();
                                return;
                            }
                            totalSec--;
                            var hour = Math.floor(totalSec / 3600);
                            var minute = Math.floor(totalSec % 3600 / 60);
                            var sec = totalSec % 60;

                            // 小时
                            var hour1 = Math.floor(hour / 10); // 十位 41 / 10  =4.1 所以要取整数
                            var hour2 = hour % 10; // 个位

                            // 分
                            var minute1 = Math.floor(minute / 10); // 是为 55/10 = 5.5 取整
                            var minute2 = minute % 10;

                            // 秒
                            var sec1 = Math.floor(sec / 10);
                            var sec2 = Math.floor(sec % 10);
                            that.setData({
                                hour: hour1.toString() + hour2.toString(),
                                minute: minute1.toString() + minute2.toString(),
                                sec: sec1.toString() + sec2.toString(),
                            })
                        }, 1000)
                    } else {
                        that.setData({
                            showClose: true
                        })
                    }
                }
                // 待收货或已签收状态下对物流信息的处理
                if (that.data.productInfo.frontState == 'WaitReceive' || that.data.productInfo.frontState == 'SignReceiveGoods') {
                    that.getLogistics();
                }
            }
        })
    },
    // 获取物流信息并取最新的一条渲染在物流信息部分
    getLogistics: function () {
        const that = this;
        const val = {
            pfChannelId: app.globalData.pfChannelId,
            orderNo: that.data.orderId
        }
        let cookie = 'JSESSIONID=' + that.data.sessionId
        orderAPI.getLogisticsByOrderNo(val, cookie).then(res => {
            if (res.data) {
                this.setData({
                    lastLogistics: res.data[0].list ? res.data[0].list[0] : [],
                })
            }
        })
    },
    // 复制订单编号
    copyText: function (e) {
        tt.setClipboardData({
            data: e.currentTarget.dataset.text,
            success: function (res) {
                tt.getClipboardData({
                    success: function (res) {
                        tt.showToast({
                            title: '复制成功'
                        })
                    }
                })
            }
        })
    },
    // 跳转到查看物流页面
    jumpLogistics: function () {
        $.gopage("/pages/logistics/logistics?orderId=" + this.data.orderId)
    },
    // 确认收货
    confirmReceive: function () {
        const that = this;
        $.confirm("确认收货吗", function (res) {
            if (res.confirm) {
                var val = {
                    pfChannelId: app.globalData.pfChannelId,
                    orderId: that.data.orderId
                };
                orderAPI.sureReceiveGoods(val).then(res => {
                    $.alert("收货成功", function () {
                        that.initData();
                        app.globalData.orderStatus = res.data
                    })
                }).catch(res => {
                    $.alert(res.msg);
                })
            }
        }, true)
    },

    // 删除订单
    deleteOrder: function () {
        if (!this.data.cando) return false
        this.data.cando = false
        const that = this;
        $.confirm("确认删除订单吗", function (res) {
            if (res.confirm) {
                var val = {
                    pfChannelId: app.globalData.pfChannelId,
                    orderId: that.data.orderId
                }
                orderAPI.delMyOrder(val).then(res => {
                    $.alert("删除订单成功", function () {
                        that.initData();
                        app.globalData.orderStatus = res.data
                        tt.navigateBack();
                    })
                }).catch(res => {
                    $.alert(res.msg)
                })
            }
        }, true)
    },
    // 取消订单
    cancelOrder: function () {
        const that = this;
        $.confirm("确认取消订单吗", function (res) {
            if (res.confirm) {
                var val = {
                    pfChannelId: app.globalData.pfChannelId,
                    orderId: that.data.orderId,
                    darenId: app.globalData.darenId
                }
                orderAPI.cancelMyOrder(val).then(res => {
                    $.alert("取消订单成功", function () {
                        that.initData();
                        app.globalData.orderStatus = res.data
                    })
                }).catch(res => {
                    $.alert(res.msg);
                })
            }
        }, true)
    },
    // 去付款
    toPay: function (e) {
        app.globalData.fromOrderListPath = ''
        var data = e.currentTarget.dataset;
        $.gopage("/pages/PaymentMethod/PaymentMethod?orderId=" + data.orderid + '&surPlusDate=' + data.surplusdate + '&payPrice=' + data.price + '&createTime=' + data.createtime)
    }
})