const app = getApp();
Page({
  data: {
    UserImg: '',//图片地址
    type: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { type, name } = options
    tt.setNavigationBarTitle({
      title: name || '用户协议'
    })
    this.setData({
      type: type || ''
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      UserImg: app.globalData[this.data.type] || ''
    })
    console.log('UserImg', this.data.UserImg)
  },
  OriginalImage(e) {
    tt.previewImage({
      urls: [this.data.UserImg],
      current: this.data.UserImg
    })
  }
})