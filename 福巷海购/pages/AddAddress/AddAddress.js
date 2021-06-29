// pages/AddAddress/AddAddress.js
const app = getApp();
const $ = require('../../utils/util.js');
const dialog = require('../../lib/dialog.js');
const indexAPI = require('../../api/indexAPI.js');
const {
  addAdress
} = require('../../api/cartAPI')
Page({
  data: {
    curAddInfo: {},
    checked: false,
    IsShow: false,
    Province: [],
    City: [],
    County: [],
    multiIndex: [0, 0, 0],
    multiArray: [],//地址库
    ModifyAddress: {},
    IsModify: true,
    ModifyTxt: [],
    val: [0, 0, 0],
    IsAuth:false,
    IsAuthBox:false,
    isCanAuth: false,
    canDo: true,
    from: ''
  },
  onLoad: function (options) {
    const _self = this;
    _self.setData({
      from: options.from || '',
      UserInfo: app.globalData.userInfo,
      itemType: tt.getStorageSync('AddressFrom'), //1：保税，2:直邮
      AddressFrom: tt.getStorageSync('AddressFrom') // 1从确认订单页面过来，2从个人中心过来
    })
    tt.setNavigationBarTitle({
      title: "新增收货地址"
    })
    if (options.hasOwnProperty("item")) {
      tt.setNavigationBarTitle({
        title: "编辑收货地址"
      })
      const item = JSON.parse(options.item);
      _self.setData({
        curAddInfo: {
          name: item.receiverName,
          phone: item.mobile,
          address: item.address,
        },
        ModifyAddress: {
          name: item.receiverName,
          phone: item.mobile,
          address: item.region,
        },
        addrInfo: item.areaFullName.replace(/,/g, ""),
        checked: item.moren,
        region: item.areaFullName,
        areaId: item.areaId,
        id: item.id,
        CompleteArea: item.areaFullName,
        ModifyArea: JSON.parse(JSON.stringify(item.areaFullName.replace(/,/g, ""))),
      });
    };
    _self.Province();//省级地址库
    _self.setData({
      sessionId: app.globalData.sessionId
    });
    app.GetUserInfo(_self.data.sessionId,function(res){
      if(res.data.identityCode){
        _self.setData({
          authentication: true,
        })
      }else{
        _self.setData({
          authentication:false
        })
      }
      
    })
  },
  onUnload() {
    tt.setStorageSync('AddressFrom', '')
    console.log(42154)
  },
  //失去焦点绑定表单值
  onInput(e) {
    const _self = this;
    const name = e.currentTarget.dataset.name
    const curAddInfo = _self.data.curAddInfo;
    const ModifyAddress = _self.data.ModifyAddress;
    curAddInfo[name] = e.detail.value ? $.trim(e.detail.value) : ''
    const addrInfo = _self.data.addrInfo;
    const ModifyTxt = _self.data.ModifyTxt;
    _self.setData({
      curAddInfo: curAddInfo
    });
  },
  Province() {//省级地址库
    indexAPI.Province().then(res => {
      this.setData({
        Province: res
      }, () => this.City());
    })
  },
  City() {//市级地址库
    indexAPI.City().then(res => {
      this.setData({
        City: res
      }, () => { this.County() });
    })
  },
  County() {//区级地址库
    const multiArray = this.data.multiArray;
    const Province = this.data.Province;
    const City = this.data.City;
    const id = this.data.id;
    indexAPI.County().then(res => {
      this.setData({
        County: res
      });
      const ProviceId = Province[0].id;
      const CityName = City.filter(item => item.parentId === ProviceId);
      const CityId = CityName[0].id;
      const CountyName = res.filter(item => item.parentId === CityId);
      this.setData({
        CityName: CityName,
        CountyName: CountyName
      }, () => {
        if (id) {
          this.CompleteArea();
        }
      });
    })
  },
  CompleteArea() {//地址列表页面跳转匹配地址库
    const _self = this;
    const Province = _self.data.Province;
    const City = _self.data.City;
    const County = _self.data.County;
    const PriveName = _self.data.CompleteArea.split(",")[0];
    const cityname = _self.data.CompleteArea.split(",")[1];
    const countname = _self.data.CompleteArea.split(",")[2];
    const list = [];
    const Pindex = Province.findIndex(item => item.name == PriveName);
    list.push(Pindex);
    const id = Province[Pindex].id;
    const CityArray = City.filter(item => item.parentId == id);
    const cindex = CityArray.findIndex(item => item.name == cityname);
    list.push(cindex);
    const cityid = CityArray[cindex].id;
    const countArray = County.filter(item => item.parentId == cityid);
    const dindex = countArray.findIndex(item => item.name == countname);
    list.push(dindex);
    _self.setData({
      Province: Province,
      CityName: CityArray,
      CountyName: countArray,
      val: list
    });
  },
  bindchange(e) {//滑动地址选择
    const _self = this;
    const Province = _self.data.Province;
    const City = _self.data.City;
    const County = _self.data.County;
    const val = e.detail.value;
    const PIndexValue = val[0];
    const ProviceId = Province[PIndexValue].id;
    const CityName = City.filter(item => item.parentId === ProviceId);
    const CIndexValue = val[1];
    const CountyIndex = val[2];
    const CityId = CityName[CIndexValue].id;
    const CountyName = County.filter(item => item.parentId == CityId);
    _self.setData({
      val: val,
      CityName: CityName,
      CountyName: CountyName
    });
  },
  cityCancel() {//取消地址
    const _self = this;
    _self.setData({
      IsShow: false
    });
  },
  citySure() {//确定地址
    const _self = this;
    const arry = [0, 0, 0];
    const val = _self.data.val ? _self.data.val : arry;
    const Province = _self.data.Province;
    const CityName = _self.data.CityName;
    const CountyName = _self.data.CountyName;
    const ModifyArea = _self.data.ModifyArea;
    const multiArray = [Province, CityName, CountyName];
    const region = val.map((key, i) => multiArray[i][key].name).join(",");
    const addrInfo = val.map((key, i) => multiArray[i][key].name).join("");
    const addrInfoId = val.map((key, i) => multiArray[i][key].id).join("");
    const CountyIndex = val[2];
    const areaId = CountyName[CountyIndex].id ? CountyName[CountyIndex].id : _self.data.areaId;
    _self.setData({
      IsShow: false,
      region: region,
      addrInfo: addrInfo,
      areaId: areaId
    });
  },
  selectarea() {
    const _self = this;
    _self.setData({
      IsShow: true
    });
  },
  defalutAddress: function (e) {  //设为默认地址
    const _self = this;
    const checked = _self.data.checked;
    _self.setData({
      checked: !checked
    });
  },
  ComponentEvent:function(e){
    var that = this;
    that.setData({
      AuthFlag:e.detail
    });
    if(e.detail){
      tt.navigateBack();
    }
    this.data.isCanAuth = false
  },
  SaveAddress() {//保存地址
    const _self = this;
    const curAddInfo = _self.data.curAddInfo;
    const region = _self.data.region;
    const areaId = _self.data.areaId;
    const id = _self.data.id;
    if (!id) {
      var val = {
        pfChannelId: app.globalData.pfChannelId,
        address: curAddInfo.address,
        areaFullName: region,
        areaId: areaId,
        mobile: curAddInfo.phone,
        receiverName: curAddInfo.name,
        moren: _self.data.checked,
      };
    } else {
      var val = {
        pfChannelId: app.globalData.pfChannelId,
        address: curAddInfo.address,
        areaFullName: region,
        areaId: areaId,
        mobile: curAddInfo.phone,
        receiverName: curAddInfo.name,
        moren: _self.data.checked,
        id: id
      };
    }
    if (!_self.data.canDo) {
      return false
    }
    var FormatName = /^[\u4e00-\u9fa5]+$/.test(curAddInfo.name);
    if (!$.verifyParams(["name"], curAddInfo)) {
      dialog.showToast("请输入收货人姓名");
    }else if(!FormatName){
      dialog.showToast("收货人只支持中文");
    }
     else if (!$.verifyParams(['phone'], curAddInfo)) {
      dialog.showToast("请输手机号");
    } else if (!$.verifyPhone(curAddInfo.phone)) {
      dialog.showToast("请输正确的手机号");
    } else if (!region) {
      dialog.showToast("请选择省市区");
    } else if (!$.verifyParams(["address"], curAddInfo)) {
      dialog.showToast("请选择详细地址");
    } else if (curAddInfo.address.length < 5) {
      dialog.showToast("请输入正确的详细地址");
    } else {
      _self.data.canDo = false
      addAdress(val).then(res => {
        _self.setData({
          'curAddInfo.name': ''
        })
        dialog.showToast("保存成功");
        tt.navigateBack();
        _self.data.isCanAuth = false
      }).catch(err => {
        _self.data.canDo = true
        console.log('添加地址报错', err)
        var content = err.msg;
        tt.showModal({
          title:'',
          content:content,
          confirmText:'好的',
          showCancel:false
        });
      })
    };
  },
  closeAuth() {
    if (this.data.isCanAuth) {
       tt.navigateBack();
    }
  }
})