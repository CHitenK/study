// pages/AddressList/AddressList.js
const $ = require('../../utils/util.js');
const dialog = require('../../lib/dialog.js');
const app = getApp();
const cartAPI = require('../../api/cartAPI.js')
const UserCenterAPI = require('../../api/UserCenter.js')
Page({
    data: {
        flag: false,
        AddressList: [],
        IsAuth: false,
        IsAuthBox: false,
        type: 1,
        checkAuthBox: false,
        showNone: false
    },
    onLoad: function (options) {
        var that = this;
        that.setData({
            sessionId: app.globalData.sessionId,
            IsByOrder: options.flag || 0, //判断是否从确认订单跳过来的，flag=1 表示是
            EnterFrom: tt.getStorageSync('AddressFrom'),
        });
        if (that.data.IsByOrder == 1) {
            that.setData({
                prdStr: options.prdStr
            })
        }

    },
    onShow() {
        const _self = this;
        _self.GetUserAddress(); //收货地址列表
    },
    GetUserAddress() { //收货地址列表
        const _self = this;
        const val = {
            pfChannelId: app.globalData.pfChannelId
        };
        cartAPI.listUserAddress(val).then(res => {
            let AddressList = res.data.addressList;
            if(AddressList && AddressList.length > 0){
                AddressList.map(item => {
                    return item.region = item.areaFullName.replace(/,/g, "") + item.address
                });
                AddressList.map(item => {
                    return item.phone = item.mobile.substr(0, 3) + "****" + item.mobile.substr(7);
                });
            }else {
                AddressList = []
            }
            _self.setData({
                AddressList: AddressList,
                flag: false,
                showNone: !(AddressList && AddressList.length > 0)
            });
        }).catch(err => {
            _self.setData({
                flag: true,
                AddressList: [],
                showNone: true
            });
            $.alert(err.msg || '获取收货地址列表失败')
        })
    },
    DeleteAddress(e) { //删除收货地址
        const _self = this;
        const id = e.currentTarget.dataset.id;
        const val = {
            pfChannelId: app.globalData.pfChannelId,
            id: id
        };
        dialog.showDialog(true, '确定', "温馨提示", "确定要删除该收货地址？", () => {
            cartAPI.removeAddress(val).then(res => {
                _self.GetUserAddress();
                dialog.showToast(res.msg || '删除地址成功');
            }).catch(err => {
                dialog.showToast(err.msg || '删除地址失败');
            })

        }, () => {});
    },
    ModifyInfo(e) {
        const id = e.currentTarget.dataset.id;
        const index = e.currentTarget.dataset.index
        this.setData({
            identityCode: this.data.AddressList[index].authenticationModel.identityCode,
            Name: this.data.AddressList[index].authenticationModel.name,
            IsAuth: true,
            businessId: id,
            IdCard: this.data.AddressList[index].authenticationModel.identityCode,
            checkAuthBox: true
        });
    },
    InputName: function (e) {
        var that = this;
        that.setData({
            Name: e.detail.value
        });
    },
    ClosePlat: function () {
        var that = this;
        that.setData({
            IsAuth: false,
            IsAuthBox: false,
            checkAuthBox: false
        })
    },
    InputIdCard: function (e) {
        var that = this;
        that.setData({
            IdCard: e.detail.value
        })
    },
    Authorise: function () {
        var that = this;
        if ($.isNull(that.data.Name) || $.isNull(that.data.Name.replace(/(^\s+)|(\s+$)/g, ''))) {
            $.confirm('请输入您的真实姓名！');
            return;
        }
        if ($.isNull(that.data.IdCard) || $.isNull(that.data.IdCard.replace(/(^\s+)|(\s+$)/g, ''))) {
            $.confirm('请输入您的身份证号码！');
            return;
        }
        if (!$.IdentityCodeValid(that.data.IdCard)) {
            $.confirm('您输入的身份证号码格式不正确！');
            return;
        }
        var val = {
            name: that.data.Name,
            identityCode: that.data.IdCard
        }
        UserCenterAPI.userAlibabaVerified(val).then(res=>{
            if (res.code == 1 && res.data.status == '01') {
                const postData = {
                    name: $.trim(that.data.Name),
                    identityCode: $.trim(that.data.IdCard),
                    type: that.data.type,
                    businessId: that.data.businessId
                }
                UserCenterAPI.addAuthentication(postData).then(res=>{
                    dialog.showToast("实名认证信息成功")
                    that.setData({
                        IsAuth: false,
                        IsAuthBox: false,
                    }, () => {
                        that.GetUserAddress()
                    });
                }).catch(err=>{
                    dialog.showToast(err.msg || '添加实名认证失败');
                })
            }else {
                $.confirm(res.msg || '实名认证失败')
            }
        }).catch(err=>{
            $.confirm(err.msg || '实名认证失败')
        })
    },
    EditorAddress(e) {
        const item = e.currentTarget.dataset.item;
        tt.navigateTo({
            url: '/pages/AddAddress/AddAddress' + '?item=' + JSON.stringify(item) + '&EnterForm=' + this.data.EnterFrom
        });
    },
    updateStockState() { //实名制认证刷新收货地址列表
        const _self = this;
        _self.GetUserAddress();
    },
    JumpAddress() { //跳转到收获地址
        tt.navigateTo({
            url: '/pages/AddAddress/AddAddress'
        });
    },
    //跳转到确认订单，并传值过去
    ChangeAddress: function (e) {
        app.globalData.addressList = this.data.AddressList
        const routers = getCurrentPages()
        if (routers[routers.length - 2].__route__ && routers[routers.length - 2].__route__ == 'pages/submitOrder/submitOrder') {
          getCurrentPages()[routers.length - 2].data.addressId = e.currentTarget.dataset.id
          tt.navigateBack()
        }
    }
})