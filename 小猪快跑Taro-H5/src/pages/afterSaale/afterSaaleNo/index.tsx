import React, { Component } from "react";
import Taro from "@tarojs/taro";
import {
  View,
  Textarea,
  Image
} from "@tarojs/components";

import "./index.less";

import CWX from 'weixin-js-sdk'
import getQuery from '@utils/getQuery'
import { getWxConfig } from '@api/user'
import { changeStatus } from '@api/order'
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgIds: [],
      equipmentType: '',
      iosfiles: ['', '', ''],
      serverIds: [],
      des: '',
      showBtn: true,
      id: '',
      clientHeight: 0
    }
  }

  componentWillMount() {}

  componentDidMount() {
    
  }

  componentWillUnmount() {
    Taro.offWindowResize()
  }

  componentDidShow() {
    const userInfo = Taro.getStorageSync('userInfo') || {}
    const title = userInfo.shopName || '上传资料'
    Taro.setNavigationBarTitle({
      title: title
    })
    const id = getQuery('id') || ''
    this.state.id = id
    this.state.clientHeight = window.innerHeight
    this.detect()
    this.wxInit()
    // 监听键盘弹起/收缩
    Taro.onWindowResize((size) => {
      if (this.state.equipmentType === 'ios') return false 
      if (this.state.clientHeight > document.body.clientHeight) { // 弹起
        this.setState({ showBtn: false })
      } else { // 收起
        setTimeout(() => {this.setState({ showBtn: true })}, 400)
      }
    })
  }
  componentDidHide() {}
  // 初始微信公众号配置
  async wxInit() {
    const self = this
    try {
      const url = window.location.href // window.location.origin  + window.location.pathname
      const data = await getWxConfig({ url:  url })
      CWX.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId,
        nonceStr: data.nonceStr,
        signature: data.signature,
        timestamp: data.timestamp,
        jsApiList: ['scanQRCode', 'chooseImage', 'uploadImage', 'getLocalImgData', 'downloadImage'] // 必填，需要使用的JS接口列表
      });
      CWX.ready(function(){
         
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      });
      CWX.error(function(res){
        // 初始微信公众号失败无需再次初始
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    } catch(err) {
    }
  }
  // 选择图片
  chooseImage() {
    const { imgIds, equipmentType } = this.state
    CWX.chooseImage({
      count: 3 - imgIds.length,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        const newIds = [...imgIds, ...localIds]
        this.setState({
          imgIds: newIds
        })
        const len = newIds.length
        if (equipmentType === 'ios' && len > 0) {
          this.transImg(newIds[0], 0).then(res => {
            if (len > 1) {
              this.transImg(newIds[1], 1).then(res => {
                if (len > 2) {
                  this.transImg(newIds[2], 2)
                }
              })
            }
          })
        }
      }
    })
  }

  // 判断客户端是否是ios
  detect(){
    var equipmentType = "";
    var agent = navigator.userAgent.toLowerCase();
    var android = agent.indexOf("android");
    var iphone = agent.indexOf("iphone");
    var ipad = agent.indexOf("ipad");
    if(android != -1){
        equipmentType = "android"
    }
    if(iphone != -1 || ipad != -1){
        equipmentType = "ios"
    }
    this.setState({ 
      equipmentType: equipmentType
    })
  }
  // 删除
  deleteImg(i) {
    const { imgIds, equipmentType, iosfiles } = this.state
    imgIds.splice(i, 1)
    this.setState({ imgIds })
    if (equipmentType === 'ios') {
      iosfiles.splice(i, 1)
      this.setState({ iosfiles })
    }
  }
  // 赚换图片 只针对IOS
  transImg(imgId, i) {
    return new Promise((resolved, reject) => {
      CWX.getLocalImgData({
        localId: imgId, // 图片的localID
        success: (res) => {
          var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
          this.state.iosfiles[i] = localData
          this.setState({
            iosfiles: this.state.iosfiles
          })
          resolved(true)
        },
        fail: (err) => {
          reject(null)
        }
      });
    })
  }
  // input 
  inputVal(e){
    this.setState({
      des: e.target.value || ''
    })
  }
  // 处理图片上传
  handleUpload(imgId, i) {
    const { imgIds } = this.state
    return new Promise((resolved, reject) => {
      CWX.uploadImage({
        localId: imgId, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: (res) => {
          var serverId = res.serverId; // 返回图片的服务器端ID
          this.state.serverIds[i] = serverId
          // 直接上传
          if(imgIds.length - 1 == i) {
            this.save()
          }
          resolved(true)
        }
      })
    })
  }
  // 上传
  commit() {
    // this.save()
    const { imgIds, des } = this.state
    const len = imgIds.length
    if (!des) {
      Taro.showToast({
        title: '请输入备注信息',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (len > 0) {
      this.handleUpload(imgIds[0], 0).then(res => {
        if (len > 1 ) {
          this.handleUpload(imgIds[1], 1).then(res => {
            if (len > 2 ) {
              this.handleUpload(imgIds[2], 2)
            }
          })
        }
      })
    } else {
      this.save()
    }
  }
  async save() {
    Taro.showLoading({ title: '上传中...' })
    try {
      const { id, serverIds, des } = this.state
      const cm = {
        id: id,
        bizStatus: 'AUDIT_FAIL',
        failDescribe: des,
        mediaIds: serverIds || []
      }
      const data = await changeStatus(cm)
      Taro.hideLoading()
      if (data) {
        Taro.showToast({
          title: '操作成功',
          icon: 'success',
          duration: 3000
        })
        setTimeout(() => {
          window.history.back()
          // Taro.navigateBack()
        }, 2000)
      }
    } catch(err) {
      Taro.hideLoading()
      Taro.showToast({
        title: '操作失败',
        icon: 'none',
        duration: 2000
      })
    }
    // CWX.downloadImage({
    //   serverId: '1237378768e7q8e7r8qwesafdasdfasdfaxss111', // 需要下载的图片的服务器端ID，由uploadImage接口获得
    //   isShowProgressTips: 1, // 默认为1，显示进度提示
    //   success: function (res) {
    //     var localId = res.localId; // 返回图片下载后的本地ID
    //     console.log(localId)
    //   }
    // });
  }
  render() {
    const { imgIds, iosfiles, equipmentType, des, showBtn } = this.state
    const imgs = equipmentType === 'ios' ?  iosfiles : imgIds
    return (
      <View className='afterSaaleNo'>
        <View className='box'>
          <View className='title1 fs-30 clr-act'>不通过原因</View>
          <View className='title2 fs-28 clr-III mr-t-30 pd-15'>备注(必填)</View>
          <View className="list-box clr-II ">
            <Textarea
              style='background:#fff;width:99.5%;height:100%;border: 1px solid #eaeaea;'
              maxLength={200}
              placeholder="xxx商品有破损，详见照片(200字内)"
              onInput={(e) => this.inputVal(e)}
              value={des}
              adjustPosition={false}
            />
          </View>
          <View className='title2 fs-28 clr-III mr-t-30 pd-15'>上传凭证:</View>
          <View className="list-box-img clr-III  pd-15">
            {
              imgs.map((item, i) => {
                if (item) {
                  return (
                    <View className="list-box-item" key={i}>
                      <View className="close-btn" onClick={() => this.deleteImg(i)}>x</View>
                      <Image className="img-box" src={item} />
                    </View>
                  )
                } else {
                  return ''
                }
              })
            }
            {
              imgIds.length < 3 ? (
              <View className="list-box-item" onClick={() => this.chooseImage()}>
              +
              </View>) : ''
            }
          </View>
        </View>
        {
          showBtn ? (
            <View className="tool-box fs-36 clr-w" onClick={() => this.commit()} >
              提交
           </View>
          ) : ''
        }
      </View>
    );
  }
}
