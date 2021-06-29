var app = getApp();
const {
    toBeRecorded
} = require('./../../api/daren')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        totalAmount: 0, //待入账总额
        list: [],
        pageNo: 1,
        pageSize: 20,
        total: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.toBeRecorded()
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
        // 没有登录则去到登录页
        if (!app.globalData.Islogin) {
            tt.navigateTo({
                url: '/pages/login/login'
            })
        }
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

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
    onScrollToBottom(e) {
        if (this.data.list.length < this.data.total) {
            this.data.pageNo++
            this.toBeRecorded()
        }
    },
    //待入账
    toBeRecorded() {
        let that = this
        let params = {
            page: this.data.pageNo,
            num: this.data.pageSize
        }
        toBeRecorded(params).then(res => {
            if (res.data) {
                this.setData({
                    totalAmount: res.data.totalAmount ? res.data.totalAmount : 0
                })
                if(res.data.detail){
                    this.setData({
                        list: that.data.list.length > 0 ? that.data.list.concat(res.data.detail.list) : res.data.detail.list,
                        total: res.data.detail.total
                    })
                }
            }
            
        })

    },
})