// pages/login/login.js
const app = getApp();
const $ = require('../../utils/util.js');
const indexAPI = require('../../api/indexAPI.js');
const cartApi = require('../../api/cartAPI.js');

Page({
  data: {
    IsValidation: false,
    AuthorInfo: "",//登陆信息
    IsPhone: false,
    isChecked: true, // 是否签协议
    isShowTips: false,
    sessionId: '',
    from: '1',
    xieyiType: '1',
    clear: '',
    hasAuthentication: true, // 是否已经实名
    hasAddress: false, // 是否已经添加地址
    order: null, // 商品详情参数
    cando: true
  },
  onLoad: function (options) {
    /**
     *  from 跳转来源
     *  ***  2: 达人注册登录获取pid
     *  ***  1 / undefined 其他来源不做特殊处理
     */
    const { from, clear, order } = options
    this.setData({
      from: from || '1',
      clear: clear || '',
      xieyiType:  from == '2' ? '2' : '1',
      order: order ? JSON.parse(order) : null 
    })
    console.log(this.data.order, 435)
  },
  onShow: function () {
      // 清除缓存
      if (this.data.clear) {
        app.globalData.Islogin = false // 需要用户重新登录
        tt.clearStorageSync()
      }
    console.log('login 登录注册' , this.data.from == 2 ? '达人注册' : '普通用注册', app.globalData.Islogin  )
    // 达人重新进来
    if (this.data.from == '2' && app.globalData.Islogin) {
       app.GetUserInfo(app.globalData.sessionId, function(res){
         if (res.code === 1 && res.data.pid) {
          tt.redirectTo({
            url: '/pages/pid/index?pid=' + res.data.pid
          })
         }
       })
    }
  },
  onUnload() {
    tt.hideLoading()
    tt.setStorageSync('code_401', false)
  },
  /**获取手机号 */
  Getphonenumber: function(e,session_key){
    console.log(e)
    var that = this;
    if(e.detail.errMsg=="getPhoneNumber:fail auth deny" || e.detail.errMsg =="getPhoneNumber:fail platform auth deny"){
      that.setData({
        IsPhone:false
      })
      // tt.openSetting()
      $.warn('您已拒绝获取手机号');
      return;
    } else if(e.detail.errMsg  =="getPhoneNumber:ok"){
      that.setData({
        IsPhone:false
      });
    }
    const val = {
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      agreement: 1
    }
    if (that.data.from === '2') { // 达人注册
      that.darenRegister(val)
    } else { // 普通用户注册
      that.ordinaryRegister(val)
    }
      
  },
  // 关闭弹窗
  comfiretPhone() {
    setTimeout(() => {
      this.setData({
        IsPhone: !this.data.IsPhone
      })
    }, 120) 
  },
  /**获取手机号取消 */
  CancelgetPhone:function(){
    var that = this;
    that.setData({
      IsPhone:false,
    });
  },
  // 勾选服务协议
  switchCheckBox: function () {
    this.setData({
      isChecked: !this.data.isChecked
    })
  },
  // 去实名认证页
  linkTo(e) {
    const { url } = e.currentTarget.dataset
    tt.redirectTo({
      url: url
    })
  },
  handleTips() {
    $.warn('请先同意相关协议');
  },
  closeLay() {
    this.setData({
      isShowTips: false
    })
    tt.navigateBack()
  },
  // 判断用户是否已经实名认证
  isAth() {
    indexAPI.hasAddressAndAuthentication(this.data.sessionId).then(res => {
      // 未实名 / 未填写收货地址
      if (!res.data.hasAddress || !res.data.hasAuthentication) {
        this.setData({
          isShowTips: true,
        })
        if (!res.data.hasAuthentication) { // 未实名
          this.setData({
            hasAuthentication: false
          })
        } else { // 未填写收货地址
          tt.setStorageSync('AddressFrom', 2)
          this.setData({
            hasAddress: false
          })
        }
      } else {
        tt.navigateBack()
      }
    }).catch(res => {
      tt.navigateBack()
    })
  },
  // 普通用户注册
  ordinaryRegister(val) {
    indexAPI.savePhone(val).then(res => {
      tt.hideLoading();
      if (res.data && res.data.mobilePhone){
        this.setData({
          IsPhone: false
        })
        const UserInfo = app.globalData.userInfo
        app.globalData.userInfo = {...UserInfo, mobilePhone: res.data.mobilePhone }
        tt.setStorageSync('userInfo', app.globalData.userInfo)
        // 系统登录的唯一标识
        app.globalData.Islogin = true
        tt.setStorageSync('Islogin', true)
        // 显示去认证引导
        // this.isAth()
        if (this.data.order) {  // 跳转确认订单
          this.checkOrder()
        } else {
          tt.navigateBack() // 返回
        }
      } else {
        app.globalData.Islogin = false // 系统登录的唯一标识
        tt.setStorageSync('Islogin', false)
      }
    }).catch(res => {
      tt.hideLoading();
      $.warn(res.msg)
    })
  },
  // 达人注册
  darenRegister(val) {
    const that = this
    indexAPI.darenRegiste(val, this.data.sessionId).then(res => {
      if (res.data.pid && res.data.mobilePhone) { // 注册达人成功后跳转到
        const darenInfo = app.globalData.userInfo
        app.globalData.userInfo = {...darenInfo, userType: "Staff", mobilePhone: res.data.mobilePhone }
        tt.setStorageSync('userInfo', app.globalData.userInfo)
        app.globalData.Islogin = true
        tt.setStorageSync('Islogin', true)
        tt.redirectTo({
          url: '/pages/pid/index?pid=' + res.data.pid
        })
      } else {
        app.globalData.Islogin = false // 系统登录的唯一标识
        tt.setStorageSync('Islogin', false)
      }
    }).catch(res => {
      console.log('达人注册接口报错', res)
      app.globalData.Islogin = false // 系统登录的唯一标识
      tt.setStorageSync('Islogin', false)
      tt.navigateBack()
      $.warn(res.msg)
    })
  },
  // 登录/注册
  sign() {
    if (!this.data.cando) {
      return false
    }
    this.data.cando = false // 拦截 点击多次
    const _self = this
    tt.showLoading({
      title: "努力加载中...", // 内容
      success: (res) => {
      }
    });
    tt.login({
      success: res => {
        const code = res.code
        console.log('tt.login 获取code:', res)
        tt.getUserInfo({//获取个人信息
          withCredentials: true,//获取敏感信息
          success: res => {
            const val = {
              pfChannelId: app.globalData.pfChannelId,
              encryptedData: res.encryptedData,
              iv: res.iv,
              code: code
            }
            indexAPI.authMiniApp(val).then(res => {
              console.log('登录返回：',res)
              tt.hideLoading();
              const Info = res.body || res.data;
              _self.setData({
                AuthorInfo: Info
              });
              console.log(Info.sessionId,'=====系统sessionId')
              tt.setStorageSync('KEY_sessionId', Info.sessionId)
              app.globalData.sessionId = Info.sessionId
              app.globalData.userInfo = Info
              tt.setStorageSync('userInfo', app.globalData.userInfo)
              _self.setData({
                sessionId: Info.sessionId
              })
              // 存在用户信息和手机号码 才是用户登录了
              if (Info && Info.mobilePhone) {
                app.globalData.Islogin = true// 系统登录的唯一标识
                tt.setStorageSync('Islogin', true)
                // 注册达人 
                if (_self.data.from == '2') {
                  if ( Info.userType != 'Staff') { // 普通用户 弹出授权 ---p1
                      // 显示手机授权弹窗
                      _self.setData({
                        IsPhone: true
                      })
                  } else if (Info.userType == 'Staff') { // 达人去到pid复制
                    tt.redirectTo({
                      url: '/pages/pid/index?pid=' + Info.pid
                    })
                  }
                } else {
                  if (_self.data.order) { // 跳转确认订单
                    _self.checkOrder()
                  } else {
                    tt.navigateBack() // 返回
                  }
                }
              } else {
                // 显示手机授权弹窗
                _self.setData({
                  IsPhone: true
                })
                console.log(2134)
                app.globalData.Islogin = false // 系统登录的唯一标识
                tt.setStorageSync('Islogin', false)
              }
              _self.data.cando = true
            }).catch(res => {
              tt.hideLoading()
              _self.data.cando = true
              setTimeout(() => {
                $.warn(res.msg)
              }, 1000)
            })
          },
          fail: res => {
            tt.hideLoading()
            _self.data.cando = true
            console.log(res)
            if (res.errMsg = "getUserInfo:fail auth deny") {
              $.confirm('您还未允许授权，请先授权', function (res) {
                if (res.confirm) {
                  tt.openSetting({
                    success(res) {
                    }
                  })
                } else {
                  $.warn('授权成功后才可以登录哦！')
                }
              }, true)
            }

          }
        })
      },
      fail: (res) => {
        tt.hideLoading()
        _self.data.cando = true
        console.log('tt.login 报错', res)
      }
    })
  },
  // 跳转确认订单
  checkOrder() {
    cartApi.checkBeforeConfirm({ productId: this.data.order.productId } ).then(res => {
      if (res.code == 1 && this.data.order.isPass && this.data.order.havaStock) {
        tt.setStorage({
          key: 'EnterFrom', // 缓存数据的key
          data: 0, // 0是商品详情页，1是购物车结算跳到提交订单页
        });
        tt.redirectTo({
          url:'/pages/submitOrder/submitOrder?prdStr=' + this.data.order.prdStr +'&productId='+ this.data.order.productId
        })
      } else {
        tt.navigateBack()
      };
    }).catch(res => {
      tt.navigateBack()
    })
  },
  // 查看协议
  checkXieyi(e) {
    const { type } = e.currentTarget.dataset
    const url = 'https://img.e111.com.cn/group1/M00/04/47/Cg1F-V8_giOAQlDlAAQRzFlpkZI232.pdf' //app.globalData[type]
    tt.downloadFile({
      url: url,
      success: function(res) {
        const filePath = res.tempFilePath;
        console.log(filePath, 1234)
        tt.openDocument({
          filePath: filePath,
          fail: (err) => {
            console.log(err, 12)
          }
        })
      },
      fail: (err) => {
         console.log(err)
      }
    })
  }
})