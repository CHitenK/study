// pages/searchOrderResult/searchOrderResult.js
const app = getApp();
const $ = require('../../utils/util.js');
const orderAPI = require('../../api/orderAPI.js');
const dialog = require('../../lib/dialog.js');
Page({
  data: {
    page: 1,//默认显示第一页
    pageSize: 10,//默认一页显示10条数据
    isPage: false,//默认不分页
    showLine: false,//默认不显示底线
    isNone: false,//默认不显示空白页面
  },
  onLoad: function (options) {
    this.setData({
      keywords: options.keywords
    })
    this.initData();
  },
  onShow() {
    app.globalData.fromOrderListPath = ''
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
    app.globalData.orderStatus = null
  },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function (options) {
     app.globalData.orderStatus = null
   },
  // 初始化数据
  initData: function () {
    this.setData({
      sessionId: app.globalData.sessionId,
      page: 1,
      isPage: false,
      showLine: false,
      isNone: false,
      orderList: []
    })
    this.getOrderListBySearch();
  },
  // 获取搜索的订单列表数据
  getOrderListBySearch: function () {
    const that = this;
    const val = {
      pfChannelId: app.globalData.pfChannelId,
      darenId: app.globalData.darenId,
      keyword: that.data.keywords,
      page: that.data.page,
      pageSize: this.data.pageSize,
      type: app.globalData.userInfo && app.globalData.userInfo.userType == 'Staff' ? '' : 'oneself'
    }
    console.log(val);
    orderAPI.myOrderList(val).then(res => {
       // 有搜索结果
       if ( res.data.orderList && res.data.orderList.length > 0) {
        that.setData({
          orderList: that.data.orderList.concat(res.data.orderList)
        })
        const isPage = that.data.orderList.length < res.data.displayTotalCount
        const showLine = that.data.orderList.length == res.data.displayTotalCount
        that.setData({
            isPage, showLine,
            isNone: false
        })
      } else {
        // 判断当前页是否是第一页，如果是第一页，说明没有数据，如果不是第一页，说明分页加载后没有数据了
        if (that.data.page > 1) {
          that.setData({
            isPage: false,
            showLine: true,
            isNone: false
          })
        } else {
          that.setData({
            isPage: false,
            showLine: false,
            isNone: true
          })
        }
      }
      tt.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    }).catch(res => {
      tt.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
      // 判断当前页是否是第一页，如果是第一页，说明没有数据，如果不是第一页，说明分页加载后没有数据了
      if (that.data.page > 1) {
        that.setData({
          isPage: false,
          showLine: true,
          isNone: false
        })
      } else {
        that.setData({
          isPage: false,
          showLine: false,
          isNone: true
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
    }, () => { });
  },
  // 去付款
  toPay: function (e) {
    $.gopage("/pages/PaymentMethod/PaymentMethod?orderId=" + e.currentTarget.dataset.orderid + + '&createTime=' + e.currentTarget.dataset.createtime)
  },
  // 跳转到订单详情页面
  jumpOrderDetail: function (e) {
    $.gopage("/pages/orderDetail/orderDetail?orderId=" + e.currentTarget.dataset.orderid)
  },
  // 上拉触底分页加载
  onReachBottom: function () {
    console.log("上拉触底了");
    // 分页
    if (this.data.isPage) {
      const length = this.data.orderList.length
      const page = Math.floor(length / this.data.pageSize)
      this.setData({
        page: page + 1
      })
      this.getOrderListBySearch();
    }
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    this.setData({
      page: 1,
      orderList: []
    })
    this.getOrderListBySearch()
  },
})