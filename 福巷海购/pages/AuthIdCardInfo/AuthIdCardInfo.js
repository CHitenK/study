var app = getApp();
var $ = require('../../utils/util.js');
const {
  userAlibabaVerified,
  addAuthentication
} = require('../../api/UserCenter.js')
Page({
  data: {
    RealName: '',
    IdCardNum: '',
    from: '',
    hasAddress: '',
    cando: true
  },
  onLoad: function (options) {
    const { from, hasAddress } = options
    this.setData({
      sessionId: app.globalData.sessionId,
      from: from || '',
      hasAddress: hasAddress || ''
    })
  },
  onShow() {
    if (this.data.from === 'login') {
      tt.setNavigationBarTitle({
        title: '添加认证信息'
      })
    }
  },
  /**
   * 输入姓名
   */
  InputRealName: function (e) {
    this.setData({
      RealName: e.detail.value ? $.trim(e.detail.value) : ''
    })
  },
  /**
   * 输入身份证号
   */
  InputIdCard: function (e) {
    var IdCardNum = e.detail.value;
    this.setData({
      IdCardNum: IdCardNum ? $.trim(IdCardNum) : ''
    })
  },
  /**
   * 添加认证信息
   */
  AddAuthInfo: function () {
    if (!this.data.cando) {
      return false
    }
    this.data.cando = false
    var that = this;
    if ($.isNull(that.data.RealName) || $.isNull(that.data.RealName.replace(/(^\s+)|(\s+$)/g, ''))) {
      $.warn('请输入您的真实姓名');
      return;
    }
    if ($.isNull(that.data.IdCardNum) || $.isNull(that.data.IdCardNum.replace(/(^\s+)|(\s+$)/g, ''))) {
      $.warn('请输入您的身份证号码');
      return;
    }
    if (!$.IdentityCodeValid(that.data.IdCardNum)) {
      $.warn('身份证号码格式不正确');
      return;
    }
    var val = {
      name: that.data.RealName,
      identityCode: that.data.IdCardNum
    }
    userAlibabaVerified(val).then(res=>{
      if (res.code == 1 && res.data.status == '01') {
        that.AddAuthInfoSubmit();
      } else {
        $.confirm(res.msg || '实名认证失败');
        this.data.cando = true
      }
    }).catch(err=>{
      $.confirm(err.msg || '实名认证失败');
      this.data.cando = true
    })
  },
  AddAuthInfoSubmit: function () {
    var that = this;
    var val = {
      name: that.data.RealName,
      identityCode: that.data.IdCardNum,
      type: 2,
      businessId: app.globalData.userInfo.id
    }
    addAuthentication(val).then(res=>{
      $.warn('添加实名认证成功');
      tt.navigateBack();
    }).catch(err=>{
      this.data.cando = true
      $.warn(err.msg || '添加实名认证失败')
    })
  }
})