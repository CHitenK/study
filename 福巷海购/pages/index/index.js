var app = getApp()
var indexAPI = require('../../api/indexAPI.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectClassifyIndex: 0,
        PageNo: 1,
        pageSize: 20,
        typeIdpath: '',
        displayTotalCount: 0,
        isRefresh: false,
        productList: [],
        showNone: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getProductList()
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
        this.data.PageNo = 1
        this.data.isRefresh = true
        this.data.productList = []
        this.getProductList()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.productList.length < this.data.displayTotalCount) {
            this.data.PageNo++
            console.log("this.data.PageNo=====：", this.data.PageNo)
            this.getProductList()
        }
    },
    // 根据商品分类获取对应的商品列表
    getProductList: function () {
        let val = {
            pfChannelId: app.globalData.pfChannelId,
            typeIdpath: this.data.typeIdpath,
            pageNo: this.data.PageNo,
            pageSize: this.data.pageSize
        }
        indexAPI.list(val).then(res => {
            if (res.data && res.data.products.length > 0) {
                this.setData({
                    productList: this.data.PageNo == 1 ? res.data.products : this.data.productList.concat(res.data.products),
                    displayTotalCount: res.data.displayTotalCount
                })
            }
            if (this.data.isRefresh) {
                tt.stopPullDownRefresh()
            }
            this.setData({
                showNone: !(this.data.productList && this.data.productList.length > 0)
            })
        })
    },
    // 选择商品分类
    selectClassify: function (e) {
        this.setData({
            selectClassifyIndex: e.currentTarget.dataset.index
        })
    },
    // 复制订单编号
    copyText: function (e) {
        tt.setClipboardData({
            data: e.currentTarget.dataset.text,
            success: function (res) {
                tt.showToast({
                    title: '复制成功'
                })
            }
        })
    },
    getProdDetail(e) {
      const id = e.currentTarget.dataset.id;
      const link = e.currentTarget.dataset.link
      tt.navigateTo({
        url: '/pages/producrdetail/producrdetail' + "?id=" + id + '&from=copy_code&link=' + link,
      })
    },
    linkTo(e) {
      const { url } = e.currentTarget.dataset
      tt.navigateTo({
        url: url
      })
    }
})