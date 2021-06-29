const app = getApp();
const $ = require('../../utils/util.js');
const orderAPI = require('../../api/orderAPI.js');
let timer = null
Page({
    data: {
        checked: true,
        surPlusDate: 0,
        ResultFlag: 0,
        totalSec: 15,
        pageData: {}, // 统计数据
        canDo: true
    },
    onLoad: function (options) {
        // 计算倒计时
        if (options.createTime) { // 从订单列表/订单详情跳转过来
           const createTime = $.getMillisecond(options.createTime)
           const now = Date.now()   
           if (now - createTime >= app.globalData.orderPayTimes) {
            this.data.surPlusDate = 0
           } else {
            this.data.surPlusDate =  createTime + app.globalData.orderPayTimes - now
           }
        } else {
          this.data.surPlusDate = app.globalData.orderPayTimes - 1 * 1000 
        }
        this.setData({
            orderId: options.orderId,
            payPrice: options.payPrice || 0,
            sessionId: app.globalData.sessionId,
            expiredTime: Math.ceil(app.globalData.orderPayTimes / 60 / 1000) // 支付有时间
        });
        
    },
    onShow() {
        this.DownTimeforPay()
    },
    onHide() {
        clearInterval(timer)
        timer = null
    },
    onUnload() {
        clearInterval(timer)
        timer = null
    },
    MakeTruePay: function () {
        var that = this;
        if (!that.data.canDo) return false
        that.data.canDo = false
        tt.showLoading()
        var val = {
            pfChannelId: app.globalData.pfChannelId,
            orderId: that.data.orderId,
            openId: app.globalData.userInfo.openId
        }
        orderAPI.getDouyinAppPayInfo(val).then(res => {
            const Info = res.data;
            const OrderInfo = res.data.orderInfo;
            tt.pay({
                orderInfo: {
                    app_id: OrderInfo.app_id,
                    sign: OrderInfo.sign, //签名
                    sign_type: OrderInfo.sign_type, //固定值，签名算法类型
                    out_order_no: OrderInfo.out_order_no, //商户订单号
                    merchant_id: OrderInfo.merchant_id, //商户号
                    timestamp: OrderInfo.timestamp, //时间戳
                    product_code: OrderInfo.product_code, //固定值
                    payment_type: OrderInfo.payment_type, //固定值
                    total_amount: OrderInfo.total_amount, //订单金额
                    trade_type: OrderInfo.trade_type, //固定值
                    uid: OrderInfo.uid, //用户在商户侧唯一标志
                    version: OrderInfo.version, //固定值  2.0
                    currency: 'CNY', //固定值 币种
                    subject: OrderInfo.subject, // 商户订单名称，如果是测试接入，请务必填写：xxx 业务xx 活动测试，
                    body: OrderInfo.body, //商户订单详情
                    trade_time: OrderInfo.trade_time, //下单时间戳，精确到秒
                    valid_time: OrderInfo.valid_time, //订单有效时间（单位 秒）
                    notify_url: OrderInfo.notify_url, //填任意非空 URL 即可（该字段含义为：银行卡支付的回调地址，未开通银行卡支付的开发者，该字段值填非空 URL 地址）
                    alipay_url: OrderInfo.alipay_url, //调用支付宝 App 支付所需的支付请求参数（形如 'app_id=xxx&biz_content=xxx...'），service=1 时，如不传则不展示支付宝支付；//service=4 时必传。
                    //  wx_url:'mweb',//service=1 时，如不传则不展示微信支付；service=3 时必传
                    //  wx_type:'MWEB',//wx_url 非空时传 'MWEB'。wx_url 为空时，该字段不传
                    risk_info: OrderInfo.risk_info, //支付风控参数。序列化后的 JSON 结构字符串，JSON 结构如下：{ip: '用户外网IP', device_id: '用户设备唯一标识'}
                },
                service: 4, //1(拉起小程序收银台); 3(微信支付,不拉起小程序收银台)；4(支付宝支付，不拉起小程序收银台)
                success(res) {
                    tt.hideLoading()
                    that.data.canDo = true
                    console.log('支付后调用===：', res)
                    // res.code = 1
                    // 0：支付成功 1：支付超时 2：支付失败 3：支付关闭 4：支付取消 9：订单状态开发者自行获取
                    if (res.code === 0 ) {
                        // $.alert('支付成功');
                        $.gotopage('../paymentResult/paymentResult?ResultFlag=1')
                    } else if (res.code == 9) {
                        const routers = getCurrentPages()
                        // 防止返回多次订单列表
                        if (routers[routers.length - 2].__route__ && routers[routers.length - 2].__route__ == 'pages/Orderlistment/Orderlistment') {
                          tt.navigateBack()
                        } else {
                          $.gotopage('/pages/Orderlistment/Orderlistment?typeIndex=0')
                        }
                    } else if (res.code == 1) {
                        $.confirm('请认真核对是否支付成功', (res) => {
                            // 用户点击已完成支付 前端查询订单状态，
                            // 如果订单状态还是未支付，跳转到订单列表，
                            // 如果已改变订单状态，跳转支付成功页
                            if (res.confirm) {
                                that.orderStatus()
                            } else if (res.cancel) {
                                that.MakeTruePay()
                            }
                        }, true, '已支付', '重新支付')
                    } else {
                        // $.alert('支付失败');
                        $.gotopage('../paymentResult/paymentResult?ResultFlag=0')
                    }
                    // 埋点统计
                    that.data.pageData = {
                        userId: app.globalData.userInfo.id + '',
                        userName: app.globalData.userInfo.nickName,
                        orderId: that.data.orderId + '',
                        payPicce: that.data.payPrice + '',
                        payTime: $.formatDate(Date.now()),
                        code: res.code + ''
                    }
                    $.statistics('payOrder', that.data.pageData)
                },
                fail(res) {
                    tt.hideLoading()
                    that.data.canDo = true
                    console.log('支付后调用失败2：', res)
                    $.gotopage('../paymentResult/paymentResult?ResultFlag=0')
                },
                complete(res) {
                }
            })
        }).catch(res => {
            tt.hideLoading()
            that.data.canDo = true
            $.alert(res.msg)
        })
    },
    /**
     * 倒计时
     */
    DownTimeforPay: function () {
        
        var that = this;
        var surPlusDate = that.data.surPlusDate;
        console.log(that.data.surPlusDate)
        var hours, minutes, seconds
        timer = setInterval(function () {
            if (surPlusDate <= 0) {
                clearInterval(timer);
                that.setData({
                    DownTime: '00' + ':' + '00' + ':' + '00'
                })
                $.gotopage('/pages/paymentResult/paymentResult?ResultFlag=0')
                return;
            } else {
                hours = Math.floor(surPlusDate / 1000 / 3600);
                minutes = Math.floor((surPlusDate / 1000 / 3600 - hours) * 60);
                seconds = Math.floor((surPlusDate - hours * 3600 * 1000 - minutes * 60 * 1000) / 1000);
                surPlusDate = surPlusDate - 1000;
                that.setData({
                    DownTime: that.FormatTime(hours) + ':' + that.FormatTime(minutes) + ':' + that.FormatTime(seconds)
                })
            }

        }, 1000)


    },
    FormatTime(time) {
        time = time < 10 ? '0' + time : time;
        return time;
    },
    orderStatus() {
        var that = this
        const params = {
            pfChannelId: app.globalData.pfChannelId,
            orderId: this.data.orderId
        };
        console.log('传参：',params)
        orderAPI.orderStatus(params).then(res => {
            console.log('查询订单详情===', res)
            // WaitPay
            // 如果订单状态还是未支付，跳转到订单列表，
            // 如果已改变订单状态，跳转支付成功页
            if(res.data.frontState == 'WaitReceive' || res.data.frontState == 'WaitPass' || res.data.frontState == 'WaitDelivery'){
                $.gotopage('/pages/paymentResult/paymentResult?ResultFlag=1')
            }else{
                $.gotopage('/pages/Orderlistment/Orderlistment?typeIndex=0')
            }
        })
    }
})