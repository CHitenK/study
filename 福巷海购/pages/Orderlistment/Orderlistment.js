const app = getApp();
const $ = require('../../utils/util.js');
const orderAPI = require('../../api/orderAPI.js');
const dialog = require('../../lib/dialog.js');
var arr = ['','WaitPay','WaitPass','WaitDelivery','WaitReceive','SignReceiveGoods']
Page({

    /**
     * 页面的初始数据
     */
    data: {
        typeIndex: 0, //默认选择订单状态为全部
        pageSize: 10, //每页获取10条数据
        page: 1, //默认当前是第一页
        isPage: false, //默认是不可以分页的
        ordeRHead: [{
            txt: "全部"
        }, {
            txt: "待付款"
        }, {
            txt: "待申报"
        }, {
            txt: "待发货"
        }, {
            txt: "待收货"
        }, {
            txt: "已完成"
        }],
        frontState: "", //默认前台展示的订单为全部
        showLine: false, //默认不显示底线
        showDropDown: false, //是否显示下拉订单选择
        orderTitle: '全部订单',
        active: 2,
        orderList: [],
        ListType: '', //oneself 我的订单,consumer客户订单
        isShowLayout: false // 是否显示列表
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            typeIndex: options.typeIndex || 0
        })
        if (this.data.typeIndex) {
            this.setData({
                frontState: arr[this.data.typeIndex] || ''
            });
        }
    },

    // 初始化数据
    initData: function () {
        const UserInfo = app.globalData.userInfo
        this.setData({
            sessionId: app.globalData.sessionId,
            page: 1,
            isPage: false,
            showLine: false,
            orderList: [],
            userType: UserInfo.userType
        })
        this.getOrderListByStatus();
    },
    //   跳入搜索页面
    jumpPage: function () {
        $.gopage("../../pages/searchOrder/searchOrder")
    },
    // 选择不同的订单状态
    selectStatus: function (e) {
        const typeIndex = e.currentTarget.dataset.index;
        this.setData({
            typeIndex: typeIndex,
            page: 1,
            orderList: [],
            isPage: false,
            showLine: false,
            frontState:arr[typeIndex] || ''
        })
        this.getOrderListByStatus();
    },
    // 根据不同状态获取订单
    getOrderListByStatus: function () {
        const that = this;
        const val = {
            keyword:'',
            pfChannelId: app.globalData.pfChannelId,
            darenId: app.globalData.darenId,
            page: that.data.page,
            pageSize: that.data.pageSize,
            frontState: that.data.frontState,
            type:this.data.userType == 'Staff' ? this.data.ListType : 'oneself'
        }
        orderAPI.myOrderList(val).then(res => {
            tt.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
            console.log('返回数据列表', res.orderList)
            if ( res.data.orderList && res.data.orderList.length > 0) {
                for (let x in res.data.orderList) {
                    res.data.orderList[x].price = $.keepTwoDecimalFull(res.data.orderList[x].price);
                    res.data.orderList[x].totalPrice = $.keepTwoDecimalFull(res.data.orderList[x].totalPrice);
                }
                that.setData({
                    orderList: that.data.orderList.length > 0 && that.data.page != 1  ? that.data.orderList.concat(res.data.orderList) : res.data.orderList
                });
                const isPage = that.data.orderList.length < res.data.displayTotalCount
                const showLine = that.data.orderList.length == res.data.displayTotalCount
                let isShowLayout = false
                that.setData({
                    isPage, showLine, isShowLayout
                })
            } else {
                that.setData({
                    isShowLayout: true
                })
            }
        }).catch(res => {

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
    jumpLogistics: function (e) {
        $.gopage("../logistics/logistics?orderId=" + e.currentTarget.dataset.orderid)
    },
    // 确认收货
    confirmReceive: function (e) {
        const that = this;
        $.confirm("确认收货吗", function (res) {
            if (res.confirm) {
                var val = {
                    pfChannelId: app.globalData.pfChannelId,
                    orderId: e.currentTarget.dataset.orderid
                }
                orderAPI.sureReceiveGoods(val).then(res => {
                    $.alert("收货成功", function () {
                        const { key } = e.currentTarget.dataset
                        that.setData({
                            ['orderList['+ key + '].frontState']: res.data.frontState
                        })
                    })
                }).catch(res => {
                    $.alert(res.msg);
                })
            }
        }, true)
    },

    // 删除订单
    deleteOrder: function (e) {
        const that = this;
        $.confirm("确认删除订单吗", function (res) {
            if (res.confirm) {
                var val = {
                    pfChannelId: app.globalData.pfChannelId,
                    orderId: e.currentTarget.dataset.orderid
                }
                orderAPI.delMyOrder(val).then(res => {
                    $.alert("删除订单成功", function () {
                        const { key } = e.currentTarget.dataset
                        const orderList = that.data.orderList
                        orderList.splice(key, 1)
                        that.setData({ orderList })
                    })
                }).catch(res => {
                    $.alert(res.msg)
                })
            }
        }, true)
    },
    // 取消订单
    cancelOrder: function (e) {
        const that = this;
        dialog.showDialog(true, '确定', "温馨提示", '确定取消订单？', () => {
            var val = {
                pfChannelId: app.globalData.pfChannelId,
                orderId: e.currentTarget.dataset.orderid,
                darenId: app.globalData.darenId
            }
            orderAPI.cancelMyOrder(val).then(res => {
                $.alert("取消订单成功", function () {
                    const { key } = e.currentTarget.dataset
                    that.setData({
                        ['orderList['+ key + '].frontState']: res.data.frontState
                    })
                })
            }).catch(res => {
                $.alert(res.msg);
            })
        }, () => {});
    },
    // 去付款
    toPay: function (e) {
        var that = this;
        var data = e.currentTarget.dataset;
        $.gopage("/pages/PaymentMethod/PaymentMethod?orderId=" + data.orderid + '&surPlusDate=' + data.surplusdate + '&payPrice=' + data.price + '&createTime=' + data.createtime)
    },
    // 跳转到订单详情页面
    jumpOrderDetail: function (e) {
        $.gopage("/pages/orderDetail/orderDetail?orderId=" + e.currentTarget.dataset.orderid)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (app.globalData.fromOrderListPath != 'pages/orderDetail/orderDetail') { // 从非订单详情返回刷新数据 
          setTimeout(() => {
             this.initData()
          }, app.globalData.orderListDelay || 1000)
        }
       // 从订单详情返回
       if (app.globalData.orderStatus && app.globalData.orderStatus.orderId && this.data.orderList) {
          const orderList = this.data.orderList
          // 删除订单
          if (app.globalData.orderStatus.frontState == 'Deleted') {
            orderList.forEach((item, index) => {
                if (app.globalData.orderStatus.orderId == item.orderId) {
                    orderList.splice(index, 1)
                    this.setData({ orderList })
                }
            })
          } else {// 取消订单 /确认收货
            orderList.forEach((item, index) => {
                if (app.globalData.orderStatus.orderId == item.orderId) {
                    this.setData({
                        ['orderList['+ index + '].frontState']: app.globalData.orderStatus.frontState
                    })
                }
            })
          }
       }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
       // 清空
       app.globalData.orderStatus = null
       app.globalData.fromOrderListPath = ''
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function (options) {
      // 清空
      app.globalData.orderStatus = null
      app.globalData.fromOrderListPath = ''
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({
            page: 1,
            frontState: this.data.frontState,
            typeIndex: this.data.typeIndex,
            orderList: [],
            isShowLayout: false
        })
        this.getOrderListByStatus()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // 分页
        if (this.data.isPage && !this.data.showLine) {
            const length = this.data.orderList.length
            const page = Math.floor(length / this.data.pageSize)
            this.setData({
                page: page + 1
            })
            this.getOrderListByStatus()
        }
    },
    // 选择订单类型
    showDropDown: function () {
        this.setData({
            showDropDown: !this.data.showDropDown
        })
    },
    // 选择订单类型
    screen: function (e) {
        const index = e.currentTarget.dataset.index
        let arr = [{name:'我的订单',ListType:'oneself'},{name:'粉丝订单',ListType:'consumer'},{name:'全部订单',ListType:''}]
        this.setData({
            orderTitle: arr[index].name,
            ListType: arr[index].ListType, //0 oneself 我的订单,1 consumer粉丝订单
            showDropDown: false,
            active: index,
            page: 1,
            orderList: []
        })
        this.getOrderListByStatus();
    },
})