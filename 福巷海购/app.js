//app.js
const $ = require('utils/util.js');
const indexAPI = require('./api/indexAPI')
const ACCOUNT_INFO = require('./config.js').config
const {
    GetUserInfo
} = require('./api/UserCenter.js')
 // getDarenId
App({
    globalData: {
        userInfo: null, // 用户信息
        payTypeId: 12, // 支付方式  12为抖音小程序调用支付,
        pfChannelId: 45,//渠道id
        darenId: '',//达人id
        pollingTime: 1000, // 订单轮询间隔时间
        closePollTime: 15000, // 订单轮询终止时间
        sessionExpired: 39600000, // session过期时间
        orderListDelay: 1000, // 订单列表刷新延时
        orderPayTimes: 15 * 60 * 1000, // 支付倒计时时间
        widthdrawMin: 30, // 提现的最低金额
        sessionId: '', // sessionId
        addressList: [], // 用户地址列表
        Islogin: false, // 全系统登录唯一标识
        pid: '', // 达人pid
        statParam: '', // 联盟参数
        yonghuUrl: '', // 协议
        gerenUrl: '', // 协议
        ziyouUrl:'',//协议
        orderStatus: null, // 订单状态
        fromOrderListPath: '' // 从某页面返回/跳转订单列表页 刷新数据
    },

    onLaunch: function () {
       // this.getPollingTime()
    },
    onShow: function (options) {
        console.log('app.js onShow 传入参数', options)
        console.log('getStorageSync(IsLogin)',tt.getStorageSync('Islogin'))
        this.globalData.Islogin =  tt.getStorageSync('Islogin') ||  false
        this.globalData.sessionId =  tt.getStorageSync('KEY_sessionId') ||  ''
        this.globalData.userInfo = tt.getStorageSync('userInfo') || null
        this.getPollingTime()
        this.checkSession()
        this.upDateApp()
    },
    onHide() {
      tt.setStorageSync('code_429', false)
    },
    // 获取用户信息
    GetUserInfo: function(session,callback){
      var that = this;
      const sessionId = session || tt.getStorageSync('KEY_sessionId')
      const val = {
        sessionId: sessionId,
        pfChannelId: that.globalData.pfChannelId,
        darenId: that.globalData.darenId
      }
        GetUserInfo(val,sessionId).then(res=>{
            const data = res.body || res.data
            that.globalData.Islogin = res.code == 1 && data && data.mobilePhone // 系统登录的唯一标识
            callback&&callback(res)
        }).catch(err=>{
            callback&&callback(err)
        })

    },
    checkSession: function(){
        const nowTime = Date.now();
        // const nowTime = 1594370034000
        let lastLogin = this.globalData.userInfo && this.globalData.userInfo.lastLogin
        lastLogin = lastLogin ? $.getMillisecond(lastLogin) : null
        // 系统session 已过期
        if(!(lastLogin && nowTime - lastLogin < this.globalData.sessionExpired)){
            console.log(nowTime,lastLogin,'系统session 已过期')
            this.globalData.Islogin = false // 需要用户重新登录
            tt.clearStorageSync()
        }
        console.log(this.globalData.sessionId,'=====系统session')
        // if (this.globalData.Islogin &&  this.globalData.userInfo &&  this.globalData.userInfo.userType != 'Staff' ) {
        //    this.isAth()
        // }
    },
    // 获取提交订单的轮询时间
    getPollingTime(){
      let that = this
      // 获取订单轮询间隔时间
      tt.request({
        url: ACCOUNT_INFO.cdnUrl + 'json/mainOrder.json',
        success (res) {
          console.log('JSON', res)
          that.globalData.pollingTime = res.data.pollingTime
          that.globalData.closePollTime = res.data.closePollTime
          that.globalData.sessionExpired = res.data.sessionExpired
          that.globalData.orderListDelay = res.data.orderListDelay
          that.globalData.orderPayTimes = res.data.orderPayTimes || that.globalData.orderPayTimes
          that.globalData.yonghuUrl = res.data.yonghu // 协议
          that.globalData.gerenUrl = res.data.geren // 协议
          that.globalData.ziyouUrl = res.data.ziyou
          that.globalData.widthdrawMin = res.data.widthdrawMin || 30
          console.log(that.globalData, 'getPollingTime--------------------')
        }
      })
    },
    // 判断用户是否已经实名认证/添加地址
    isAth() {
      indexAPI.hasAddressAndAuthentication(this.globalData.sessionId).then(res => {
        console.log('判断用户是否已经实名认证/添加地址', res)
        // 未实名 / 未填写收货地址
        if (!res.data.hasAuthentication) { // 未实名
          tt.showModal({
            title: '温馨提示',
            content: '由于购买跨境商品需要实名认证，你可以继续完善实名、收货地址信息，避免抢购商品的时候抢不到心仪商品哦！',
            confirmText: '去实名',
            cancelText: '取消',
            success: res => {
              if (res.confirm) {
                tt.navigateTo({
                  url: '/pages/AuthIdCardInfo/AuthIdCardInfo?from=login&&hasAddress=' + (!res.data.hasAddress ? 'true' : '')
                })
              }
            }
          })
        } else if (!res.data.hasAddress) { // 未填写收货地址
          tt.showModal({
            title: '温馨提示',
            content: '由于购买跨境商品需要实名认证，你可以继续完善实名、收货地址信息，避免抢购商品的时候抢不到心仪商品哦！',
            confirmText: '新增地址',
            cancelText: '取消',
            success: res => {
              if (res.confirm) {
                tt.navigateTo({
                  url: '/pages/AddAddress/AddAddress?from=login'
                })
              }
            }
          })
        }
      }).catch(res => {
        console.log('判断用户是否已经实名认证/添加地址报错', res)
      })
    },
    // 强制更新app
    upDateApp() {
      const updateManager = tt.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          // 调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      });
    }
})