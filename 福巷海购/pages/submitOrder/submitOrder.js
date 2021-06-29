// pages/submitOrder/submitOrder.js
var app = getApp();
var $ = require('../../utils/util.js');
var orderApi = require('../../api/orderAPI.js');
const indexAPI = require('./../../api/indexAPI')
const {
  getTotalByProductAndNum
} = require('../../api/cartAPI')
let failNum = 1
let pollingTime = 1000
let closePolling = false
let closePollTime = 120000
let TIMER = null
Page({
  data: {
    goodList:[
      {
        id:0,
        goodsItem:['0','1','2']
      },
    ],
    postData:{
      addressId:'',
      realTotalPrice:'',
      totalPrice:'',
      goodsPrice:'',
      deliveryPrice:'',
      source:'DouYin',
      couponIds:'',
      share:''
    },
    IsAuth:false,
    IsAuthBox:false,
    authType:1,
    businessId: 0,
    AuthTips:'',
    prdArr:[],
    prdStr:'68143-68136-2509N8',
    ishide:true,
    IsBigNum:false,
    IsHasSelect:false,
    parameter: {},
    canSubmit: true,
    productId: null,
    needAuth: false, // 是否需要实名
    directMail: null, // 判断是否是直邮
    productData: {},  // 商品数据
    goodsPrice: 0,
    addressData: null,
    addressId: null,
    successAuth: false,
    pageData: {}, // 埋点数据
  },
  onLoad: function (options) {
    var that = this;
    if(options.Id){
      that.setData({
        addressId: options.Id || null,
      })
    }
    that.setData({
      sessionId: app.globalData.sessionId,
      prdStr: options.prdStr,
      darenId: options.darenId|| 0,
      UserInfo: app.globalData.userInfo,
      IsSubmitOrder: 1,
      EnterFrom: tt.getStorageSync('EnterFrom'),
      productId: options.productId || null,
    });
    // that.InitData();
    // 订单轮询时间
    pollingTime = app.globalData.pollingTime || 1000
    closePollTime = app.globalData.closePollTime || 120000
  },
 onShow(){
   var that = this;
   that.InitData()
 }, 
 onUnload() {
  tt.hideLoading()
   clearTimeout(TIMER)
 },
 onHide() {
  tt.hideLoading()
  clearTimeout(TIMER)
 },
  // 初始化页面 
  InitData:function(){
    var that = this;
    var val = {
        prdStr: that.data.prdStr
    }
    tt.showLoading()
    orderApi.confirmOrder(val).then(res => {
      console.log('下单信息', res)
      tt.hideLoading() // res.data.code == 1
      if(res.data){
        tt.hideLoading()
        // 处理规格数据
        if (res.data.orderSkuInfo && res.data.orderSkuInfo.spec) {
          res.data.orderSkuInfo.spec = JSON.parse(res.data.orderSkuInfo.spec)
        }
        // 处理地址
        var addressData = null
        if (that.data.addressId) {
          const addressList = app.globalData.addressList
          addressData = addressList.find(item => that.data.addressId == item.id)
        } else {
          addressData = res.data.defaultAddress || null
        }
        that.setData({
          goodsPrice:  res.data.orderSkuInfo ? (res.data.orderSkuInfo.num * res.data.orderSkuInfo.price).toFixed(2) : 0,
          directMail:  1,//res.data.orderSkuInfo ? res.data.orderSkuInfo.directMail : null,  // 判断是否是直邮
          productData: res.data.orderSkuInfo || {},
          addressData: addressData,
          ItemType: 1 // res.data.orderSkuInfo ? res.data.orderSkuInfo.itemType : null
        })
        // 查看是否实名
        that.isShiMing()
      } else {
        tt.hideLoading()
        that.setData({
          addressData : {},
          productData: {}
        })
      }
    }).catch(res => {
      console.log('下单信息报错', res)
      tt.hideLoading() // res.data.code == 1
      that.setData({
        addressData : {},
        productData: {}
      })
    })
  },
  /**
   * 选择地址
   */
  SelectAddress:function(){
    tt.setStorageSync('itemType', this.data.ItemType);
    tt.setStorageSync('AddressFrom', 1);
    if(this.data.addressData && this.data.addressData.id){
      tt.navigateTo({
        url: '/pages/AddressList/AddressList?flag=1&prdStr='+ this.data.prdStr +'&EnterFrom='+this.data.EnterFrom+'&itemType='+this.data.ItemType + '&productId=' + this.data.productId // 指定页面的url
      });
    }else{
      tt.navigateTo({
        url: '/pages/AddAddress/AddAddress?flag=1&prdStr='+ this.data.prdStr + '&EnterFrom='+this.data.EnterFrom + '&itemType='+this.data.ItemType + '&productId=' + this.data.productId // 指定页面的url
      });
    }    
  },
  InputNum:function(e){
    console.log(e);
    var canDo = true
    var num = e.detail.value;
    if(num <= 0){
      $.warn('商品数量不能小于0')
      num = 1
    }else if(num > 10){
      setTimeout(function(){
        $.warn('商品最大购买数量为10');
      },500)
      num = 10;
    }
    this.setData({
      productData: { ...this.data.productData, num }
    })
    this.data.prdStr = this.data.productData.productId+'-'+ this.data.productData.skuId+'-'+app.globalData.darenId+'N'+num
    this.ModifyCountEvent(this.data.prdStr)
  },
 
  /**
   * 修改数量
   */
  ModifyCount:function(e){
    let canDo = true
    var data = e.currentTarget.dataset
    var num
    if(data.type == 'jian'){
      this.setData({
        IsBigNum: false,
      })
      if(data.num<1){
        this.setData({
          IsMinus: false,
        })
        canDo = false
      }else{
        num=--data.num
      }
      num = num < 2 ? 1 : num
    }else{
      this.setData({
        IsBigNum: false,
      })
      num = ++data.num
      if(num>10){
        setTimeout(function(){
           $.alert('商品最大购买数量为10')
         },500)
         canDo = false
      }
      num = num > 10 ? 10 : num
    }
    this.setData({
      productData: { ...this.data.productData, num }
    })
    this.data.prdStr = this.data.productData.productId+'-'+ this.data.productData.skuId+'-'+app.globalData.darenId+'N'+num
    if (!canDo) return false
    this.ModifyCountEvent(this.data.prdStr)
  },
  /**
   * 修改数量接口
   */
  ModifyCountEvent:function(prdStr){
    var that = this;
    var val = {
      prdStr: prdStr
    };
    tt.showLoading({
      title: '正在加载中...'
    });
    getTotalByProductAndNum(val).then(res=>{
      tt.hideLoading()
      that.setData({
        productData: { ...that.data.productData, ...res.data }
      })
    }).catch(err=>{
      $.warn(err.msg || '修改数量失败')
    })
  },
  /**
   * 验证身份
   */
   InputName:function(e){
     var that = this;
     console.log(e);
     that.setData({
       Name:e.detail.value
     })
   },
  /**
   * 提交订单
   */
  submitOrder:function(e){
    var that = this;
    // console.log('e.currentTarget.dataset',e.currentTarget.dataset);
    var OrderInfo = e.currentTarget.dataset;
    if(!this.data.addressData || !this.data.addressData.id){
      $.confirm('您还没有收货地址');
      that.setData({
        IsSubmitOrder:1,
      })
      return;
    }
    that.setData({
      IsSubmitOrder:0
    })
    console.log(this.data.needAuth,this.data.directMail,'==============')
    // 提交 并生成订单
    if (this.data.directMail == '1' && this.data.needAuth) { // 保税
      that.setData({
        AuthTips:'实名认证（请与支付宝实名认证信息一致）',
        IsAuth:true,
        IsAuthBox:true,
        businessId: that.data.UserInfo.id,
        type: 2,
        IsSubmitOrder:1
      })
      return false
    } else if (this.data.directMail == '2' && !this.data.addressData.successAuth) { // 直邮
      if (!(this.data.addressData.authenticationModel && this.data.addressData.authenticationModel.identityCode)) {
        that.setData({
          AuthTips:'身份信息（海外直邮需提交收货人身份信息）',
          IsAuth:true,
          IsAuthBox:true,
          businessId: that.data.addressData.id,
          type:1,
          IsSubmitOrder:1,
          AddressName: that.data.addressData.receiverName
        })
        return false
      }
    }
    this.data.postData = {
      addressId: this.data.addressData.id,
      realTotalPrice: this.data.productData.totalPrice,
      totalPrice: this.data.productData.totalPrice,
      goodsPrice: this.data.productData.goodsPrice,
      deliveryPrice: this.data.productData.deliveryPrice,
      source:'DouYin',
      couponIds:'',
      share:''
    },
    this.data.parameter = {
      pfChannelId:app.globalData.pfChannelId,
      darenId: app.globalData.darenId,
      orderInfo:JSON.stringify(that.data.postData),
      prdStr: that.data.prdStr,
      pid: app.globalData.pid,
      statParam: app.globalData.statParam
    }
    console.log('下单传参', this.data.parameter)
    // 防止多次点击
    if(!this.data.canSubmit){
      return false
    }
    tt.showLoading({
      title: '加速抢购中...'
    })
    this.data.canSubmit = false
    this.getToken()
  },
  // 获取轮询token
  getToken() {
    let cookie = ''
    cookie = 'JSESSIONID='+this.data.sessionId
    orderApi.createOrderToken(cookie).then(res => {
      this.setInitialTime(res.data, pollingTime, cookie)
    }).catch(res => {
      console.log('获取token出错', res)
    })
  },
  setInitialTime: function(key, timegap = 1000, cookie){
    this.data.parameter.token = key
    orderApi.submit(this.data.parameter, cookie).then(res => {
      this.getOrderInfo(res.data, timegap, cookie)
    }).catch(e => {
      let failDetail = { res:e }
      this.resetSubmit()
      $.confirm(e.msg);
    })
 },
  getOrderInfo: function (key, timegap, cookie) {
    closePollTime = closePollTime - timegap
    if(closePolling){
      this.resetSubmit()
      return false
    }
    if(closePollTime<=0){
      this.resetSubmit()
      $.confirm('请求超时');
      return false
    }
    let params = {}
    params.token = key
    let that = this
    orderApi.getOrderInfoByKey(params, cookie).then(res=>{
      if(!res.data||!res.data.draftState){
        this.resetSubmit()
        return false
      }
      switch (res.data.draftState) {
        case '0':
              TIMER = setTimeout(()=>{that.getOrderInfo(key,timegap, cookie)},timegap)
              break;
        case '3':
              console.log(res,res.data.draftState,'3===============================')
              this.resetSubmit()
              tt.redirectTo({
                url: '/pages/PaymentMethod/PaymentMethod?orderId='+res.data.orderId+'&payPrice='+this.data.productData.totalPrice // 指定页面的url
              });
              // 埋点统计
              this.data.pageData = {
                userId: app.globalData.userInfo.id + '',
                userName: app.globalData.userInfo.nickName,
                darenId: app.globalData.darenId + '',
                productId: this.data.productData.productId + '',
                productName: this.data.productData.name,
                num: this.data.productData.num + '',
                price: this.data.productData.totalPrice + '',
                orderId: res.data.orderId + '',
                submitTime: $.formatDate(Date.now())
              }
              $.statistics('submitOrder', this.data.pageData)
            break;
        default:
            closePolling = true
            // console.log(res,closePolling,res.data.draftState,'nnn===============================')
            this.resetSubmit()
            // 提示
            if (res.data.remark) {
              setTimeout(() => {
                // tt.showToast({
                //   title: res.data.remark,
                //   icon: 'none',
                //   duration: 3000
                // })
                $.alert(res.data.remark)
              }, 1000)
            }
           
      }
    }).catch(err=>{
      // console.log(err,failNum,'==============================')
      if(failNum<5){
        failNum ++
        setTimeout(()=>{that.getOrderInfo(key,timegap, cookie)},timegap)
      }else {
        let failDetail = { res:err }
        this.resetSubmit()
      }
    })
  },
  resetSubmit: function () {
    tt.hideLoading()
    this.data.canSubmit = true
    failNum = 1
    closePolling = false
    closePollTime = app.globalData.closePollTime || 120000
    clearTimeout(TIMER)
  },
  done() {
    if (this.data.directMail == '2') {
      this.setData({
        addressData: { ...this.data.addressData, successAuth: true }
      })
    } else {
      this.InitData()
    }
  },
  // 用户是否已经实名 保税商品购买时，用户要先实名
  isShiMing() {
    indexAPI.hasAddressAndAuthentication().then(res => {
      console.log('用户是否已经实名', res)
      this.setData({
        needAuth: !res.data.hasAuthentication
      })
      // 是否显示地址弹窗
      if (this.data.addressData && this.data.addressData.id) {
        if (this.data.directMail == '1' && this.data.needAuth) { // 保税
          this.setData({
            AuthTips:'实名认证（请与支付宝实名认证信息一致）',
            IsAuth:true,
            IsAuthBox:true,
            businessId: this.data.UserInfo.id,
            type: 2,
            IsSubmitOrder:1
          })
          return false
        } else if (this.data.directMail == '2' && !this.data.addressData.successAuth) { // 直邮
          if (!(this.data.addressData.authenticationModel && this.data.addressData.authenticationModel.identityCode)) {
            this.setData({
              AuthTips:'身份信息（海外直邮需提交收货人身份信息）',
              IsAuth:true,
              IsAuthBox:true,
              businessId: this.data.addressData.id,
              type:1,
              IsSubmitOrder:1,
              AddressName: this.data.addressData.receiverName
            })
            return false
          }
        }
      }
    }).catch(res => {
      this.setData({
        needAuth: true
      })
      console.log(res);
    })
  }
})