var app = getApp();
const $ = require('../../utils/util.js');
const {
    getWithdrawalNssInfo,
    applyWithdrawal
} = require('../../api/daren')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        amount: '',
        info: null,
        isUpdateBank: false, //true操作回来更新
        isHandle: false,
        commission: 0.00,
        shijiMoney: '0.00',
        model: {
            title: '',
            content: [
                '只有添加银行卡及协议签订才能进行提现哦!'
            ],
            buttonStyle: 1,
            buttonText: '去添加银行卡',
            HelpText: ''
        },
        isClick: true //是否可点击提交
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},

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
        // true操作回来更新
        // if (this.data.isUpdateBank) {
        this.getWithdrawalNssInfo()
        // }

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
    sumbitApply() {
        // 不可点击
        if (!this.data.isClick) {
            return false
        }
        let amount = Number(this.data.amount);
        let reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/ //校验是数字
        if (!reg.test(amount) || amount < app.globalData.widthdrawMin) {
            $.alert('请核对提现金额,提现最低金额为' + app.globalData.widthdrawMin)
            return false
        }
        if (!this.data.info || (this.data.info && !this.data.info.bankCardId)) {
            $.alert('请先绑定银行卡！')
            return false
        }
        this.data.isClick = false
        let that = this;
        $.loading('提交中，请稍后...')
        let params = {
            withdrawalAmount: amount,
            bankCardId: this.data.info.bankCardId
        }
        applyWithdrawal(params).then(res => {
            $.hideloading()
            if (res.code == 1) {
                $.confirm('您的提现申请已提交成功，我们会尽快审核，一般1-3个工作日，请留意入账信息。', (res) => {
                    // 点击确认
                    if (res.confirm) {
                        tt.navigateBack()
                    }
                }, false, '知道了')
            } else {
                that.data.isClick = true
                $.alert(res.msg)
            }
        }).catch(err => {
            console.log('报错==', err)
            that.data.isClick = true
            $.hideloading()
            $.alert(err.msg)
        })

    },
    to(e) {
        if (!this.data.isHandle) {
            return false
        }
        let url = e.currentTarget.dataset.url
        $.gopage(url);
    },
    onInput(e) {
        var val = e.detail.value
        // 处理第一个数为小数点.
        if(val.length == 1 && (val + '').indexOf('.') != -1){
            val = String(val).replace(/./, "0.");
            console.log('val-0：',val)
        }
        // 有小数点且小数大于两位则截取剩两位小数
        // if (val && (val + '').indexOf('.') != -1 && val.toString().split(".")[1].length > 2) {
        //     val = String(val).replace(/^(.*\..{2}).*$/, "$1");
        // }

        val = val.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
        console.log('val-1：',val)
        val = val.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        console.log('val-2：',val)
        val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        console.log('val-3：',val)
        val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
        console.log('val-4：',val)
        if (val.indexOf(".") < 0 && val != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            val = parseFloat(val);
        }
        this.setData({
            amount: val,
        })
        console.log('amount：',this.data.amount)
        this.getserviceFeeRate(val)
    },
    getserviceFeeRate(val) {
        // 手续费计算 提现金额*费率
        let serviceFeeRate = (val * Number(this.data.info.serviceFeeRate)).toFixed(2)
        // 计算到账金额
        const shijiMoney = (+this.data.amount) - serviceFeeRate
        this.setData({
            commission: serviceFeeRate,
            shijiMoney: shijiMoney ? (+shijiMoney).toFixed(2) : '0.00'
        })

    },
    getWithdrawalNssInfo() {
        let that = this
        getWithdrawalNssInfo().then(res => {
            that.data.isHandle = true
            console.log('提现返回：', res)
            if (res.data) {
                that.setData({
                    info: res.data
                })
                // 是否进行银行卡实名认证
                if (!res.data.authentication) {
                    that.selectComponent('#model', (res) => {
                        console.log(res)
                        // 初始化组件
                        let content = ['只有添加银行卡及协议签订才能进行提现哦!']
                        res.setData({
                            content: content,
                            title: '',
                            // HelpText: '实名认证?',
                            buttonStyle: 1,
                            buttonText: '去添加银行卡'
                        })
                        res.openModel()
                    })
                }
            }
        }).catch(err => {
            that.data.isHandle = true
            // 未实名认证
            // if (err.code = -2) {
            //     // $.gotopage('/pages/AuthIdCardInfo/AuthIdCardInfo')
            //     $.gopage('/pages/addBank/addBank');
            // }
        })
    },
    setAll() {
        let serviceFeeRate = Number(this.data.info.serviceFeeRate) * Number(this.data.info.realizable)
        // 计算到账金额
        const shijiMoney = (+this.data.info.realizable) - serviceFeeRate.toFixed(2)
        this.setData({
            amount: this.data.info.realizable,
            commission: serviceFeeRate.toFixed(2),
            shijiMoney: shijiMoney ? (+shijiMoney).toFixed(2) : '0.00'
        })
    },
    // 弹窗组件操作
    onModel(e) {
        console.log(e)
        // 点击实名认证"知道了"
        if (e.detail.onceMoreModel) {
            this.selectComponent('#model', (res) => {
                console.log(res)
                let content = ['只有添加银行卡及协议签订才能进行提现哦!']
                res.setData({
                    content: content,
                    title: '',
                    // HelpText: '实名认证?',
                    buttonStyle: 1,
                    buttonText: '去添加银行卡',
                    onceMoreModel: false
                })

            })
        }
        // 点击实名认证帮助
        if (e.detail.type == 'help') {
            let content = [
                '根据海关规定，购买跨境商品需要办理清关手续，请你配合进行实名认证，以确保你购买的商品顺利通过海关检查。',
                '福巷会对您的个人信息做加密处理，并依法或依您授权使用，绝不对外泄露。',
                '实名认证的规则：购买跨境商品需填写真实姓名、身份证号码及手机号，部分商品下单时需提供收货人的实名信息(含身份证照片)，具体请以下单时的提示为准'
            ]
            this.selectComponent('#model', (res) => {
                res.setData({
                    content: content,
                    title: '为什么要实名认证?',
                    HelpText: '',
                    buttonStyle: 0,
                    buttonText: '知道了',
                    onceMoreModel: true
                })

            })
        }
        // 点击去认证
        if (e.detail.type == 'comfirm' && !e.detail.onceMoreModel) {
            $.gopage('/pages/addBank/addBank');
        }
    }
})