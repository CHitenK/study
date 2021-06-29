var app = getApp();
var api = require('../../api/UserCenter.js');
var $ = require('../../utils/util.js');
const {
  GetUserInfo
} = require('../../api/UserCenter.js')
Page({
  data: {
    flag: false,
    showNone: false
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      sessionId: app.globalData.sessionId
    })
    
  },
  onShow(){
    this.GetUSerInfo()
  },
  /**
   * 获取用户信息
   */
  GetUSerInfo:function(){
    var that = this;
    const val = {
      pfChannelId:app.globalData.pfChannelId
    }
    GetUserInfo(val,app.globalData.sessionId).then(res=>{
      let data = res.body || res.data
      if(data.hasOwnProperty('identityCode') && data.identityCode){
        data.idCardStr = that.FormatIdCard(data.identityCode,6,4);
        that.setData({
          flag: true,
          AuthList:data,
          showNone: false
        })
      }else{
        that.setData({
          AuthList:[],
          flag:false,
          showNone: true
        })
      }
    }).catch(err=>{
      that.setData({
        flag:false,
        showNone: true
      })
    })
  },
  /**
   * t添加实名认证信息
   */
  AddAuthInfo:function(){
    tt.navigateTo({
      url: '../AuthIdCardInfo/AuthIdCardInfo' // 指定页面的url
    });
  },
  FormatIdCard:function(str,frontLen,endLen){
      var len = str.length-frontLen-endLen;
      var xing = '';
      for (var i=0;i<len;i++) {
      xing+='*';
      }
      return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
  },
  // 删除实名认证
  remove(e) {
    tt.showModal({
      title: '提示',
      content: '确定删除此实名信息？',
      confirmText: '确定',
      cancelText: '取消',
      success: res => {
        if (res.confirm) {
          api.removeUserRealName({
            businessId:  this.data.AuthList.businessId,
            type: this.data.AuthList.type
          }).then(res => {
            tt.showToast({
              title: '删除成功',
              duration: 2000
            })
            this.setData({
              AuthList:[],
              flag: false,
              showNone: true
            })
            setTimeout(() => {
              this.GetUSerInfo()
            }, 2000)
          }).catch(res => {
            $.warn(res.msg)
          })
        }
      }
    })
  }
})