// pages/paymentResult/paymentResult.js
var app = getApp()
var $ = require('../../utils/util.js');

Page({
  data: {
    recommendList:[],
    pageSize:10,
    IsData:true,
    ResultFlag:1
  },
  onLoad: function (options) {
    this.setData({
      ResultFlag:options.ResultFlag
    })
  },
  //查看首页
  LookIndex:function(){
    tt.switchTab({
      url: 'pages/index/index' // 指定页面的url
    });
  },
  // 查看我的订单
  LookMyorder:function(){
    const routers = getCurrentPages() // 路径路由
    console.log(routers[routers.length - 1].__route__, routers[routers.length -2].__route__)
    if (routers.length > 1 && routers[routers.length -2].__route__ == 'pages/Orderlistment/Orderlistment') {
      tt.navigateBack()
    } else {
      $.gotopage('/pages/Orderlistment/Orderlistment?typeIndex=0')
    }
  },
  //查看详情
  getProdDetail(e) {
    const id = e.currentTarget.dataset.id;
    tt.navigateTo({
      url: '/pages/producrdetail/producrdetail' + "?id=" + id,
    })
  }
})