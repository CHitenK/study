var app = getApp();
const $ = require('../../utils/util.js');
const {
    verify,
    verifySms
} = require('../../api/daren')
var TIME = 60
var timer
Page({

    /**
     * 页面的初始数据
     */
    data: {
        placeholderClass: 'font-size:14px;',
        ischeck: false,
        model: {
            title: '为什么收不到验证码?',
            content: [
                '请确认手机号为当前使用号码，如已更换可返回上一页面修改',
                '由于运营商网络原因，可能存在短信延迟，请耐心等待或重新获取验证码',
                '请检查短信是否会被手机安全软件拦截。',
                '获取更多帮助，请返回个人中心页联系客服'
            ]
        },
        cardId: null,
        mobile: null,
        cooldown:null,
        code:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(options.cardId&&options.mobile){
            this.setData({
                cardId:options.cardId,
                mobile:options.mobile
            },()=>{
                this.CountDown()
            })
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
        clearInterval(timer);
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

    onCheck(e) {
        this.setData({
            ischeck: !this.data.ischeck
        })
    },

    Help() {
        this.selectComponent('#model', res => {
            res.openModel()
        })
    },
    onModel(e) {
        console.log(e)
        // this.selectComponent('#model', res => {
        //     res.closeModel()
        // })

    },
    onInput(e){
        console.log(e)
        this.data.code = e.detail.value
    },
    CountDown(){
        let time = TIME;
        timer = setInterval(() => {
          if (time <= 0) {
            clearInterval(timer);
          } else time--;
          this.setData({
            cooldown: time
          });
        }, 1000);
    },
    sendCode(){
        let that = this
        verifySms({cardId:this.data.cardId}).then(res => {
            if(res.code == 1){
                that.CountDown()
            }
        }).catch(err => {
            $.alert(err.msg)
        })
    },
    verify() {
        let that = this
        if (!this.data.code) {
            $.warn('请输入验证码');
            return;
        }
        if (!this.data.ischeck) {
            $.warn('请阅读并同意相关协议');
            return;
        }
        let params = {
            mobile:this.data.mobile,
            cardId:this.data.cardId,
            code:this.data.code
        }
        verify(params).then(res => {
            if(res.code == 1){
                $.alert('您已完成银行卡实名认证，可以提现啦！祝您财源广进！！！',(res)=>{
                    tt.navigateBack({
                        delta: 2
                    })
                })
            } else {
                $.alert(res.msg)
            }
        }).catch(err => {
            $.alert(err.msg)
        })
    },
})