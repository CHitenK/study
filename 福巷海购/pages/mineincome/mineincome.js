var app = getApp();
const {
    detail,
    distributionList
} = require('./../../api/daren')
const $ = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info:null,
        pageNo: 1,
        pageSize: 20,
        list: [],
        total: 0, //总条数
        menuList: [{
                name: '全部',
                source: ''
            },
            {
                name: '销售佣金',
                source: 'SalesRebate'
            },
            {
                name: '提现',
                source: 'CashOut'
            }
        ],
        changesIndex: 0,
        source: '',
        tipsText:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (app.globalData.Islogin) {
            this.distributionDetail()
            this.setData({
                pageNo:1,
                changesIndex:0,
                list:[],
                source:''
            },()=>{
                this.distributionList()
            })
        } else {
            $.gopage('/pages/login/login')
        }
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
    // scroll-view到底触发
    onScrollToBottom(e) {
        if (this.data.list.length < this.data.total) {
            this.data.pageNo++
            this.distributionList()
        }
    },
    //收益明细
    distributionDetail() {
        detail().then(res => {
            if (res.data) {
                this.setData({
                    info:res.data
                })
            }
        })
    },
    //收益明细列表
    distributionList(e) {
        // 有传参代表点击切换
        if (e) {
            this.data.source = e.currentTarget.dataset.source
            let index = e.currentTarget.dataset.index
            this.setData({
                changesIndex: index,
                pageNo:1,
                list:[]
            })
        }
        let params = {
            page: this.data.pageNo,
            num: this.data.pageSize
        }
        // 全部不需要传source
        if(this.data.changesIndex != 0){
            params.source = this.data.source
        }
        this.setData({
            tipsText:'加载中...'
        })
        distributionList(params).then(res => {
            if (res.data.list.length > 0) {
                this.setData({
                    list: this.data.list.length > 0 ? this.data.list.concat(res.data.list) : res.data.list,
                    total: res.data.total
                })
            }
            if(this.data.list.length == 0){
                this.setData({
                    tipsText:'暂无数据~'
                })
            }
        }).catch(err=>{
            if(this.data.list.length == 0){
                this.setData({
                    tipsText:'暂无数据~'
                })
            }
        })

    },
    to(e){
        let id = e.currentTarget.dataset.id
        $.gopage("/pages/orderDetail/orderDetail?orderId="+id)
    }
})