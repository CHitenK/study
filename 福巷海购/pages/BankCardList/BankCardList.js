var app = getApp();
const $ = require('../../utils/util.js');
const {
    bankCardList,
    delDarenBankcard,
    setDefBankcard
} = require('../../api/daren')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cardList: [], //银行卡列表
        checkBank: false, //true代表过来选择银行卡
        isUpdateBank:false//更新操作
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.bankCardList()
        // checkBank = true代表过来选择银行卡
        this.data.checkBank = options.checkBank ? options.checkBank : false
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
        if(this.data.isUpdateBank){
            this.bankCardList()
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
    to() {
        tt.navigateTo({
            url: '/pages/addBank/addBank'
        });
    },
    bankCardList() {
        $.loading()
        bankCardList().then(res => {
            $.hideloading()
            if (res.data) {
                this.setData({
                    cardList: res.data
                })
            }
        })
    },
    onDelBank(e) {
        let that = this
        $.confirm('确定解绑银行卡？', res => {
            if (res.confirm) {
                var index = e.currentTarget.dataset.index
                let params = {
                    bankCardId: e.currentTarget.dataset.id
                }
                $.loading()
                delDarenBankcard(params).then(res => {
                    $.hideloading()
                    if (res.code == 1) {
                        $.alert('已删除')
                        that.data.cardList.splice(index, 1)
                        that.setData({
                            cardList: that.data.cardList,
                        })
                        // 新增成功回去带参重新请求
                        let pages = getCurrentPages();
                        let prevPage = pages[pages.length - 2]; //上一页
                        prevPage.setData({
                            ['isUpdateBank']: true
                        })
                    } else {
                        $.alert(res.msg)
                    }
                }).catch(err => {
                    $.hideloading()
                    $.alert(err.msg)
                })
            }
        }, true)

    },
    // 设置默认银行卡
    setDefBankcard(e) {
        if (this.data.checkBank) {
            let that = this
            let index = e.currentTarget.dataset.index
            let item = e.currentTarget.dataset.item
            let params = {
                bankCardId: item.id
            }
            setDefBankcard(params).then(res => {
                if (res.code == 1) {
                    let pages = getCurrentPages();
                    let prevPage = pages[pages.length - 2]; //上一页
                    prevPage.setData({
                        ['info.bankCardId']: item.id,
                        ['info.bankIcon']: item.bankIcon,
                        ['info.bankName']: item.bankName,
                        ['info.bankAccount']: item.bankCard
                    })
                    tt.navigateBack()
                } else {
                    $.alert(res.msg)
                }
            }).catch(err => {
                $.alert(err.msg)
            })
        }

    }
})