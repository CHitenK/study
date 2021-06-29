// pages/logistics/logistics.js
const app = getApp();
const orderAPI = require('../../api/orderAPI.js');

Page({
    data: {
        onlyOne: false, //物流信息仅有一条时处理进度条
        selectIndex: 0, //默认选择第一个包裹
        logisticsInfo: [], //物流数据
        logisticsList: [],
        orderId: '', // 订单号
        sessionId: ''
    },
    onLoad: function (options) {
        // 获取订单id
        this.setData({
            orderId: options.orderId
        })
        this.initData()
    },
    // 选择包裹
    selectPackage: function (e) {
        const selectIndex = e.currentTarget.dataset.index;
        this.setData({
            logisticsInfo: this.data.logisticsList[selectIndex],
            selectIndex: selectIndex,
            onlyOne: this.data.logisticsList[selectIndex].list.length == 1 ? true : false
        })
    },
    // 初始化数据
    initData: function () {
        const that = this;
        const val = {
            pfChannelId: app.globalData.pfChannelId,
            orderNo: that.data.orderId
        }
        let cookie = 'JSESSIONID=' + that.data.sessionId
        orderAPI.getLogisticsByOrderNo(val, cookie).then(res => {
            if (res.data) {
                this.setData({
                    logisticsInfo: res.data[this.data.selectIndex],
                    logisticsList: res.data,
                    onlyOne: res.data[this.data.selectIndex].list && res.data[this.data.selectIndex].list.length == 1 ? true : false
                })
            }
        })
    }
})