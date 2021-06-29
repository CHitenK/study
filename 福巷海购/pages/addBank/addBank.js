var app = getApp();
const $ = require('../../utils/util.js');
const {
    addBankCard
} = require('../../api/daren')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        idcard: '',
        bankcard: '',
        phone: '',
        isClick: true //是否可点击提交
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
    onInput(e) {
        console.log(e)
        let name = e.currentTarget.dataset.name
        let val = name == 'idcard' ? e.detail.value.replace(/[^\w]/g, '') : e.detail.value
        this.setData({
            [name]: val
        })
    },
    sumbit() {
        // 不可点击
        if (!this.data.isClick) {
            return false
        }
        if ($.isNull($.trim(this.data.name))) {
            $.warn('请核对姓名信息');
            return;
        }
        if (!$.IdentityCodeValid(this.data.idcard)) {
            $.warn('请核对身份证信息');
            return;
        }
        if ($.isNull($.trim(this.data.bankcard))) {
            $.warn('请核对银行卡信息');
            return;
        }
        if (!$.checkPhone(this.data.phone)) {
            $.warn('请核对手机号信息');
            return;
        }
        this.data.isClick = false
        let that = this
        $.loading('提交中，请稍后...')
        let params = {
            realName: this.data.name,
            bankCard: this.data.bankcard,
            idCard: this.data.idcard,
            mobile: this.data.phone
        }
        addBankCard(params).then(res => {
            console.log('提交银行卡返回：',res)
            $.hideloading()
            if (res.code == 1) {
                // $.alert('添加成功')
                
                if(res.data.sms){
                    $.gopage('/pages/bindphone/bindphone?cardId=' + res.data.cardId + '&mobile=' + res.data.mobile);
                } else {
                    // 新增成功回去带参重新请求
                    let pages = getCurrentPages();
                    let prevPage = pages[pages.length - 2]; //上一页
                    prevPage.setData({
                        ['isUpdateBank']: true
                    })
                    tt.navigateBack()
                }
            } else {
                that.data.isClick = true
                $.alert(res.msg)
            }
        }).catch(err => {
            console.log('报错==', err)
            $.hideloading()
            $.alert(err.msg)
            that.data.isClick = true
        })
    }
})