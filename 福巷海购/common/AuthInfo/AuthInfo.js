var app = getApp();
var $ = require('../../utils/util.js');
var api = require('../../api/UserCenter.js');
const {
  userAlibabaVerified,
  addAuthentication
} = require('../../api/UserCenter.js')
Component({
  behaviors: [],

  properties: {
    type: String || Number, // 简化的定义方式
    businessId: String || Number, // 简化的定义方式
    IsAuth: Boolean,
    AuthTips: String,
    identityCode:String || Number, // 简化的定义方式
    Name:String,
    AddressFrom:String ||Number,
    IsAuthBox:Boolean
  },

  // 私有数据，可用于模版渲染 isAuthorization:false
  data: {
    sessionId: app.globalData.sessionId,
    cando: true
  },

  // 生命周期函数，可以为函数，或一个在 methods 段中定义的方法名
  attached: function () {
    this.selectComponent('auth', function (res) {
    })

    // 
  },
 
  ready: function () {
    var that = this;
    that.setData({
      sessionId: app.globalData.sessionId,
      IdCard:that.data.identityCode,
      AddressFrom:that.data.AddressFrom
    })
  },

  // 组件自定义方法
  methods: {
    onShow() {
      var that = this;
      that.setData({
        sessionId: app.globalData.sessionId
      })
    },
    InputName: function (e) {
      var that = this;
      that.setData({
        Name: e.detail.value ? $.trim(e.detail.value) : ''
      });
       console.log(that.data.Name)
    },
    ClosePlat: function () {
      var that = this;
      that.setData({
        IsAuth: false,
        IsAuthBox:false
      })
      that.triggerEvent('close', '')
    },
    CloseBox:function(){
      var that = this;
      that.setData({
        IsAuth: false,
        IsAuthBox:false
      })
      that.triggerEvent('close', '')
    },
    InputIdCard: function (e) {
      var that = this;
      that.setData({
        IdCard: e.detail.value ? $.trim(e.detail.value) : ''
      })
    },
    Authorise: function () {
      var that = this;
      if ($.isNull(that.data.Name) || $.isNull(that.data.Name.replace(/(^\s+)|(\s+$)/g, ''))) {
        $.confirm('请输入您的真实姓名！');
        return;
      }
      if ($.isNull(that.data.IdCard) || $.isNull(that.data.IdCard.replace(/(^\s+)|(\s+$)/g, ''))) {
        $.confirm('请输入您的身份证号码！');
        return;
      }
      if (!$.IdentityCodeValid(that.data.IdCard)) {
        $.confirm('身份证号码格式不正确！');
        return;
      }
      var val = {
        name: that.data.Name,
        identityCode: that.data.IdCard
      }
      if (!this.data.cando) {
        return false
      }
      this.data.cando = false
      userAlibabaVerified(val).then(res=>{
        this.data.cando = true
        if(res.code == 1 && res.data.status == '01'){
          const postData = {
            name: $.trim(that.data.Name),
            identityCode: $.trim(that.data.IdCard),
            type: that.data.type,
            businessId: that.data.businessId
          }
          console.log('身份校验',JSON.stringify(val));
          addAuthentication(postData).then(res=>{
            that.setData({
              IsAuth: false,
              IsAuthBox:false
            });
            if(that.data.type==1){
              $.warn('身份认证成功')
            }else{
              $.warn('实名认证成功')
            }
            if(that.data.AddressFrom ==1){
              var myEventDetail = true;
              that.triggerEvent('myevent', myEventDetail)
            }
          }).catch(err=>{
            $.warn(err.data||'添加实名认证失败')
          })
        }else {
          $.confirm(res.msg  || '实名认证失败');
        }
      }).catch(err=>{
        $.confirm(err.msg || '实名认证失败');
        this.data.cando = true
      })
    }
  }
})