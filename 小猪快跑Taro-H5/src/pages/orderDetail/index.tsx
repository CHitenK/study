import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import SWX from 'weixin-js-sdk'

import "taro-ui/dist/style/components/icon.scss" // 按需引入
import './index.less'

import MaAss from '@components/manualAssociation/index'
import CountDown from '@components/countDown/index'

import getQuery from '@utils/getQuery'
import { getOrderDetail, bindCode } from '@api/order'
import { getWxConfig } from '@api/user'
import { handleShenLuue } from '@utils/tool'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLay: false,
      detailData: {},
      sellMana: {
        oneMall: '单',
        manyMall: '多'
      },
      canScan: false,
      orderType: '', // 订单类型 b2c/tongcheng
      logisticsStatusData: {
        INIT: '待接单',
        ACCEPTED: '物流接单待商家作业',
        WAREHOUSE_SENT: '商家作业中',
        DISPATCH: '商家作业完成物流作业中',
        SHIP: '配送中',
        WAIT_SHIP: '暂未配送',
        SIGN_SUCCESS: '配送已妥投',
        SIGN_ERROR: '配送异常',
        SIGN_REFUSE: '配送拒收',
        CANCELED: '取消',
      },
      delay: ''
    }
  }

  componentWillMount () {
  }

  componentDidMount () {
    
  }

  componentWillUnmount () { }

  componentDidShow () {
    Taro.setNavigationBarTitle({
      title: '订单详情'
    })
    const type = getQuery('type')
    const delay = getQuery('delay')
    this.setState({
      orderType: type || '',
      delay: delay || ''
    })
    this.init()
    const status = getQuery('status') || 0
    if (+status === 1) {
      this.wxInit()
    }
  }
  
  componentDidHide () { }
  //  icon 状态赚换
  getdeliveryImg(deliveryStatus) {
    switch(deliveryStatus + '') {
      case '1': {
        return {
          icon: 'iconhuowuchaxun',
          label: '待拣货'
        }
      }
      case '2': {
        return  {
          icon: 'iconyijiao',
          label: '待移交'
        }
      }
      case '3': {
        return  {
          icon: 'icondaifahuo',
          label: '已发货'
        }
      }
      case '4': {
        return  {
          icon: 'iconyiquxiao1',
          label: '已取消'
        }
      }
      case '5': {
        return  {
          icon: 'iconyiwancheng',
          label: '已完成'
        }
      }
      case '6': {
        return  {
          icon: 'iconjihe',
          label: '待集结'
        }
      }
      case '7': {
        return  {
          icon: 'icontubiaolunkuo-',
          label: '待揽货'
        }
      }
      default : {
        return {
          icon: 'iconjihe',
          label: '待拣货'
        }
      }
    }
  }
  // 初始微信公众号配置
  async wxInit() {
    const self = this
    self.setState({
      canScan: false
    })
    try {
      const url = window.location.href // window.location.origin  + window.location.pathname
      const data = await getWxConfig({ url:  url })
      SWX.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId,
        nonceStr: data.nonceStr,
        signature: data.signature,
        timestamp: data.timestamp,
        jsApiList: ['scanQRCode', 'chooseImage', 'uploadImage', 'getLocalImgData', 'downloadImage'] // 必填，需要使用的JS接口列表
      });
      SWX.ready(function(){
          self.setState({
          canScan: true
          })
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      });
      SWX.error(function(res){
        // 初始微信公众号失败无需再次初始
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    } catch(err) {
    }
  }
  // 初始
  init() {
    const deliveryNo = getQuery('deliveryNo')
    if (deliveryNo) {
      getOrderDetail({deliveryNo}).then(res => {
        this.setState({
          detailData: res
        })
      })
    }
  }
  // 跳转
  linkTo(value) {
    if (!value) {
      Taro.showToast({
        title: '此商品无条形码',
        icon: 'none',
        duration: 3000
      })
      return false
    }
    Taro.navigateTo({
      url: '/pages/barCodeDetail/index?barCode=' + value,
    })
  }
  // 复制
  copy(data) {
    Taro.setClipboardData({
      data,
      success: function (res) {
        Taro.showToast({
          title: '复制到黏贴版',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
  // 扫码关联
  comfireGuanlian(data) {
    Taro.showLoading({ title: '提交中...' })
    const iaia = { barcode: data, deliveryOrderNo: this.state.detailData.deliveryNo }
    bindCode(iaia).then(res =>{
      Taro.hideLoading()
      Taro.showToast({
        title: '操作成功',
        icon: 'success',
        duration: 2000
      })
      this.closeLay()
      this.init()
    }).catch(err => {
      Taro.hideLoading()
      if (!this.state.showLay) {
        Taro.showModal({
          title: '提示',
          // content: data + ' ' + this.state.detailData.deliveryNo,
          content: err.resultMsg || '' + ', 试试手动关联',
          success: (res) => {
            if (res.confirm) {
              this.setState({
                showLay: true
              })
            }
          }
        })
      }else {
        Taro.showToast({
          title: err.resultMsg || '无法关联',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
  // 关闭
  closeLay() {
    this.setState({
      showLay: false
    })
  }
  // 扫码
  scanCode() {
    const self = this
    if (!this.state.canScan) {
      Taro.showToast({
        title: '初始中,稍后重试',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    SWX.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: function (res) {
        if (res.resultStr) {
          let  newStr = ''
          if (res.resultStr.includes(',')){
            newStr = res.resultStr.split(',')[1]
          }
          self.comfireGuanlian(newStr || res.resultStr)
        } else {
          Taro.showModal({
            title: '提示',
            content: '扫码关联不上，试试手动输入',
            success: function (res) {
              if (res.confirm) {
                self.setState({
                  showLay: true
                })
              }
            }
          })
        }
        // var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
      },
      fail: () => {
        Taro.showModal({
          title: '提示',
          content: '扫码关联不上，试试手动输入',
          success: function (res) {
            if (res.confirm) {
              self.setState({
                showLay: true
              })
            }
          }
        })
      }
    });
  }
  // 判断环境
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
    return equipmentType
  }
  // B2C发货单显示物流状态
  showLogisticsStatus(data) {
    const { detailData } = this.state
    const extFields = data.extFields || {}
    let status = detailData.shippingStatus === 'SIGN_SUCCESS' ? '配送已妥投' : '配送中'
    return (
      <View className="wuliu-box clr-III fs-24 pd-15">
        <View className="wuliu-box-l">物流状态: </View>
        <View className="wuliu-box-r pro-item">
          {
            extFields.shippingCode ? (<View>{status} {extFields.updateTime} 物流公司: {extFields.shippingCompanyName} 运单号: {extFields.shippingCode}</View>) : (
              <View>暂未配送</View>
            )
          }
        </View>
     </View>
    )
  }
  handleShenLuue(str, len) {
    return handleShenLuue(str, len)
  }
  render () {
    const { detailData, sellMana, orderType, logisticsStatusData, delay } = this.state
    const { items, orders, extFields } = detailData
    const shippingTrack = extFields && extFields.shippingTrack ? JSON.parse(extFields.shippingTrack) || [] : [] // 物流轨迹 同城
    const shippingStatus = extFields ? extFields.shippingStatus || null : null // 物流状态 B2C
    const childProps = {
      comfirm: (data) => this.comfireGuanlian(data),
      close: () => this.closeLay()
    }
    return (
      <View>
        <View className='order-detail-box'>
          <ScrollView className={detailData.deliveryStatus == 1 ?'scrool-box scrool-box-ot' : 'scrool-box'} scrollY>
            <View className="order-status">
                <Text className={this.getdeliveryImg(detailData.deliveryStatus)['icon'] + ' iconfont clr-act fs-iocn'}></Text>
                <Text className="fs-34 clr-II">{this.getdeliveryImg(detailData.deliveryStatus)['label']}</Text>
            </View>
            <View className="pd-30 b-w mr-t-20 h-100">
              {
                detailData.latestPrepareTime && detailData.extFields &&detailData.extFields.pickUpCode ? (
                  <View className="clr-II fs-24 pro-code-box-ot pd-t-20">
                    <Text>请在{detailData.latestPrepareTime}之前完成打包</Text>
                    <Text>取件码:{detailData.extFields &&detailData.extFields.pickUpCode}</Text>
                  </View>
                ) : ''
              }
              <View className="clr-III fs-26  jj-box">
                {sellMana[detailData.sellManage] && <Text className="sell-manage fs-18 clr-w">{sellMana[detailData.sellManage] || ''}</Text>}
                <Text>发货单号: {detailData.deliveryNo}</Text>
              </View>
            </View>
            {
              detailData.latestPrepareTime && detailData.extFields &&detailData.extFields.pickUpCode && delay  == 1 ? (
                <CountDown cls="pd-30 b-w mr-t-20 fs-28 time-d-box" handletimes={detailData.latestPrepareTime} ></CountDown>
              ) : ''
            }
            <View className="pd-30 b-w mr-t-20 h-100">
              <View className="clr-II fs-30 pro-code-box pd-t-20">
                <Text>订单编号: {orders && orders[0].orderNo}</Text>
                <Text className="clr-act" onClick={() => this.copy(orders && orders[0].orderNo)}>复制</Text>
              </View>
              <View className="clr-III fs-26">下单时间:{detailData.extFields &&detailData.extFields.expectDeliveryTime}</View>
            </View>
            <View className="mr-t-20"></View>
            {
              items && items.map((item, i) => {
                return (
                  <View  key={i}>
                    <View className="pro-box pd-15 mr-t-5">
                      <Image className="pro-img" src={item.itemImgPath} mode="aspectFit" />
                      <View className="pro-item">
                        <View className="pro-code-box clr-II">
                          <Text>商家编码：{item.itemCode || '- -'}</Text>
                          <View className="det-br-code clr-III" onClick={() => this.linkTo(item.extFields.outerBarcode)}>查看条形码</View>
                        </View>
                        <View className="pro-name clr-II">
                          {/* {this.handleShenLuue(item.itemName, 18)} */}
                          {item.itemName}
                        </View>
                        <View className="sku-box clr-III mr-t-5">
                          <Text >
                            {item.skuDesc}
                            {/* {this.handleShenLuue(item.skuDesc, 22)} */}
                          </Text>
                          <Text>X{item.itemNum}</Text>
                        </View>
                      </View>
                    </View>
                    {
                      // b2c订单
                      orderType === 'b2c' && [3, 5].includes(+detailData.deliveryStatus) ? this.showLogisticsStatus(item) : ''
                    }
                  </View>
                )
              })
            }
            {/* 同城订单 */}
            {
              orderType !== 'b2c' && [3, 5].includes(+detailData.deliveryStatus) ?
              ( <View className="mr-t-20 pd-15 detail-logistics">
                <View className="detail-logistics-title fs-28 clr-I">
                  物流信息
                </View>
                {
                  shippingTrack.map((item, i) => {
                    return (
                      <View className="mr-t-10 fs-26 clr-II" key={i}>
                        {item.logisticsStatusName}  {item.logisticsTime}
                      </View>
                    )
                  })
                }
                {
                  shippingTrack.length < 1 ? (<View className="mr-t-10 fs-26 clr-II">暂未配送</View>) : ''
                }
            </View>) : ''
            }
            <View className="mr-t-20 pd-15 detail-logistics">
                <View className="detail-logistics-title fs-28 clr-I">
                  发票信息
                </View>
                <View className="mr-t-10 fs-26 clr-II" >
                  发票类型: {detailData.invoiceType || '- -'}
                </View>
                <View className="mr-t-10 fs-26 clr-II" >
                  发票名称: {detailData.invoiceName || '- -'}
                </View>
            </View>
          </ScrollView>
          {
            detailData.deliveryStatus == 1 ? (
              <View className="tool-box-sao pd-30 clr-w fs-34" >
                <View className="tool-box-sao-yy" onClick={() => this.scanCode()}>扫码关联</View>
                <View className="tool-box-sao-shou clr-III fs-26" onClick={() => this.setState({ showLay: true})}>
                   扫码关联不上，试试手动输入
                </View>
              </View>
            ) : ''
          }
        </View>
          {
            this.state.showLay ? (<MaAss { ...childProps } />) : ''
          }
      </View>    
    )
  }
}
