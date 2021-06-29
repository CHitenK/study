Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { pid } = options
    this.setData({ pid })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.test()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },
  copy(e) {
    console.log(e)
    const value = e.currentTarget.dataset.value
    if (!value) return false
    tt.setClipboardData({
      data: value,
      success(res) {
        tt.showToast({
          title: "成功复制",
          duration: 3000,
          success(res) {
            console.log(`${res}`);
          },
          fail(res) {
            console.log(`showToast调用失败`);
          },
        });
        console.log(`复制调用成功`);
      },
      fail(res) {
        console.log(`复制调用失败`);
      },
    });
  }
})