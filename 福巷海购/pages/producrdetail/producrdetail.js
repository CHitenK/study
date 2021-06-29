const app = getApp()
const $ = require('../../utils/util.js');
const dialog = require('../../lib/dialog.js');
var cartApi = require('../../api/cartAPI.js');
var UserApi = require('../../api/UserCenter.js');
const cf = require("../../config/config.js").config
const { getProductDetail } = require('./../../api/newProductDetail.js')
Page({
  data: {
    BuyNowFlag: 1, // 是否可以购买
    GroupType:0,
    pid: '',
    productId: '',
    from: '',
    darenId: '',
    isPass: true,
    link: '',
    userType: '',
    startTime: '',
    endTime: '',
    stat_param: '',
    ProDetailInfo: { havaStock: true },
    pageData: {} // 埋点统计数据
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('商品详情传入参数', options)
    /**
     * id 商品id 必须
     * pid 用户点击主播橱窗进入详情携带参数 用于结算
     * from 从小程序某些页面地方进入 copy_code： 生成链路商品列表 
     */
    const { pid, id, from, darenId,link, stat_param } = options
    const _self = this
    _self.setData({
      pid: pid || '',
      from: from || '',
      darenId: darenId || '',
      productId: id,
      GroupType: id,
      BuyNowFlag:1,
      link: link ||'',
      stat_param: stat_param || '',
      postUrl: cf.postUrl + "douyin/imageCtrl/getminiqrQr?pfChannelId=" + app.globalData.pfChannelId+'&path=pages/producrdetail/producrdetail?id='+id+'&darenId=2522' // 商品地址
    });
  },
  onShow:function(){
    var that = this;
    that.setData({
      sessionId: app.globalData.sessionId,
      userType: app.globalData.userInfo && app.globalData.userInfo.userType ? app.globalData.userInfo.userType : ''
    })
    this.data.pageData = {
      userName: app.globalData.userInfo ? app.globalData.userInfo.nickName : '', 
      userId: app.globalData.userInfo ? app.globalData.userInfo.id + '' : '',
      pid: this.data.pid + '',
      time: $.formatDate(Date.now())
    }
    // 获取商品详情
    this.getProductDetail(that.data.productId)
    console.log('商品id', that.data.productId)
    // pid 转换达人id
    if (this.data.pid && !this.data.darenId) {
      app.globalData.pid = this.data.pid
      UserApi.getDarenId(this.data.pid).then(res => {
        console.log('pid转换接口', res)
        if (res.data) {
          app.globalData.darenId = res.data
          this.setData({
            darenId: app.globalData.darenId
          })
        } else {
          app.globalData.darenId = ''
          this.setData({
            darenId: ''
          })
          setTimeout(() => {
            $.warn('不存在的pid')
          }, 2000)
        }
        console.log('darenId:', app.globalData.darenId)
      }).catch(res => {
        this.setData({
          darenId: ''
        })
        console.log('获取pid报错:', res)
      })
    }
    // 达人id
    if (this.data.darenId) {
      app.globalData.darenId = this.data.darenId
    }
    // 联盟参数
    if (this.data.stat_param) {
      const statParam = this.data.stat_param
      app.globalData.statParam = encodeURIComponent(statParam)
    }
    console.log('联盟参数', app.globalData.statParam)
   // $.test()
  },
  onReady: function () {

  },
  OriginalImage(e) {
    const _self = this;
    const item = e.currentTarget.dataset.item;
    const Material = this.data.ProDetailInfo.imageMap.Material;
    tt.previewImage({
      urls: Material,
      current: item
    });
  },
  /**
   * 立即购买
   */
  BuyNow:function(e){
    var that = this;
    var data= e.currentTarget.dataset;
    var prdStr = data.productid+'-'+data.skuid+'-'+app.globalData.darenId+'N'+1;
    const val = {
      productId: data.productid
    };
    const order = {
      isPass: this.data.isPass,
      havaStock: this.data.ProDetailInfo.havaStock,
      prdStr: prdStr,
      productId: that.data.productId
    }
    if (!app.globalData.Islogin) {
      // from 从哪个页面过来 
      tt.navigateTo({
        url: '/pages/login/login?order=' + JSON.stringify(order)
      });
      return false
    }
    if (!this.data.isPass) {
      $.warn('商品已经下架啦');
      return false
    }
    if (!this.data.ProDetailInfo.havaStock) {
      $.warn('暂时缺货，正在补货中');
      return false
    }
    that.setData({
      BuyNowFlag: 0
    })
    var cookie =  'JSESSIONID='+that.data.sessionId
    cartApi.checkBeforeConfirm(val, cookie).then(res => {
      if (res.code == 1) {
        tt.setStorage({
          key: 'EnterFrom', // 缓存数据的key
          data: 0, // 0是商品详情页，1是购物车结算跳到提交订单页
        });
        tt.navigateTo({
          url:'/pages/submitOrder/submitOrder?prdStr=' + prdStr +'&productId='+that.data.productId
        })
        that.setData({
          BuyNowFlag:1
        })
      } else {
        dialog.showDialog(false, '关闭', "温馨提示", res.msg, () => {
          that.setData({
            BuyNowFlag:1
          })
        });
      };
    }).catch(res => {
      $.warn(res.msg)
      if (res.code == 401) {
        app.globalData.Islogin = false
        tt.setStorageSync('Islogin', false)
        tt.navigateTo({
          url: '/pages/login/login?order=' + JSON.stringify(order)
        });
      }
      that.setData({
        BuyNowFlag:1
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 复制订单编号
  copyText: function () {
    tt.setClipboardData({
        data: this.data.link,
        success: function (res) {
            tt.showToast({
                title: '复制成功'
            })
        }
    })
  },
  // 获取商品信息
  getProductDetail(id) {
    getProductDetail(id).then(res => {
      console.log('商品信息', res)
      if (res.id) {
        const data = res
        // 商品已下架
        this.setData({
           isPass: data.checkStatus == 'Pass'
        })
        if (data.validStart && data.validEnd) {
          const startTime = data.validStart.substr(0, 10);
          const endTime = data.validEnd.substr(0, 10);
          this.setData({
            endsate: true,
            startTime: startTime,
            endTime: endTime
          });
        };
        data.originalPrice = $.keepTwoDecimalFull(data.originalPrice)
        this.setData({
          GroupModel: data.groupModel && data.groupModel.list ? data.groupModel.list : [],
          isNone: false,
          ProDetailInfo: data,
          specId: data.specValJson && data.specValJson[0] ? data.specValJson[0].specId : '',
          productCurrentPrice: $.keepTwoDecimalFull(data.price)
        })
        this.data.pageData = { ...this.data.pageData, productId: id + '', productName: data.name, price:  $.keepTwoDecimalFull(data.price) }
        $.statistics('inDetail', this.data.pageData)
      } else {
        this.setData({
          isNone: true
        })
      }
    }).catch(res => {
      this.setData({
        isNone: true
      })
    })
  }
})