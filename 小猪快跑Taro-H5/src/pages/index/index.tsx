import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtIcon  } from 'taro-ui'
import Taro from '@tarojs/taro'
import WX from 'weixin-js-sdk'

import "taro-ui/dist/style/components/badge.scss"
import "taro-ui/dist/style/components/icon.scss"
import './index.less'

import OrderList from '@components/orderList/index'
import Mine from '@components/mine/index'
import AfterSaleOrderList from '@components/afterSaaleOrderlist/index'
import B2CorderList from '@components/B2CorderList/index'
import ProductsStock from '@components/productsStock/index'
import { getWxConfig } from '@api/user'

window.WX = WX
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: '',
      canScan: false,
      tabData: {},
      tabMenuList: [
        {
          label: '同城订单',
          status: 1,
          iconClass: 'home'
        },
        {
          label: 'B2C订单',
          status: 2,
          iconClass: 'sketch'
        },
        {
          label: '商品',
          status: 5,
          iconClass: 'star'
        },
        {
          label: '售后单',
          status: 3,
          iconClass: 'list'
        },
        {
          label: '我的',
          status: 4,
          iconClass: 'user'
        }
      ]
    }
  }
  componentWillMount () { 
    
  }

  componentDidMount () {
    // 重新加载 必须保证地址有pages/index/index
    if (window.location.href.indexOf('pages/index/index') > 0) {
      Taro.showLoading({title: '加载中...'})
      setTimeout(() => {
        this.wxInit()
      }, 800)
    } else {
      window.location.href = window.location.origin + '/pages/index/index'
      return false
    }
  }

  componentWillUnmount () { }

  componentDidShow () {
    const tabData = Taro.getStorageSync('tabData') || null
    if(tabData) {
      this.setState({
        current: tabData.footTab || 4
      })
    } else {
      this.swichTab(4)
    }
  }
  componentDidHide () { }
  // 显示tabthis.state
  showTab() {
    const { current, canScan } = this.state
    const opt = {
      canScan: canScan,
      handleScanCode: () => this.handleScanCode()
    }
    switch(+current) {
      case 1: {
        return <OrderList {...opt} />
      }
      case 2: {
        return <B2CorderList {...opt} />
      }
      case 3: {
        return <AfterSaleOrderList />
      }
      case 4: {
        return <Mine />
      }
      case 5: {
        return <ProductsStock {...opt} />
      }
      default: {
        return <Mine />
      }
    }
  }
  // 切换tab
  swichTab(e) {
    const tabData = Taro.getStorageSync('tabData') || {}
    Taro.setStorageSync('tabData', { footTab: e })
    this.setState({
      current: +e
    })
    
  }
  // 初始微信公众号配置
  async wxInit() {
    console.log('加载wx.config')
    const self = this
    self.setState({
      canScan: false
    })
    try {
      const url = window.location.href // window.location.origin  + window.location.pathname
      const data = await getWxConfig({ url:  url })
      window.WX.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId,
        nonceStr: data.nonceStr,
        signature: data.signature,
        timestamp: data.timestamp,
        jsApiList: ['scanQRCode', 'chooseImage', 'uploadImage', 'getLocalImgData', 'downloadImage'] // 必填，需要使用的JS接口列表
      });
      window.WX.ready(function(){
        self.setState({
          canScan: true
        })
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      });
      window.WX.error(function(res){
        Taro.showToast({
          title: res.errMsg,
          icon: 'none',
          duration: 3000
        })
        // 初始微信公众号失败无需再次初始
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    } catch(err) {
      Taro.showToast({
        title: '暂时无法扫码' ,
        icon: 'none',
        duration: 3000
      })
    }
    Taro.hideLoading()
  }
  // 处理扫码
  handleScanCode() {
    return  new Promise((resoved, reject) => {
      window.WX.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          if (res.resultStr) {
            let  newStr = ''
            if (res.resultStr.includes(',')){
              newStr = res.resultStr.split(',')[1]
            }
            resoved({ codeVal: newStr || res.resultStr, status: 1, result: 'success', msg: '' })
          } else {
            reject({ codeVal: '', status: 0, result: 'fail', msg: '' })
          }
        },
        fail: (err) => {
          // this.wxInit()
          reject({ codeVal: '', status: -1, result: 'error', msg: err.errMsg, })
        }
      });
    })
  }
  render () {
    const { current, tabMenuList } = this.state
    return (
      <View className='index'>
         <View className="index-page-box">
            {
              this.showTab()
            }
         </View>
         <View className="index-page-box-foot">
          {
            tabMenuList.map((item, index) => {
              return (
                <View className="foot-item-box"  onClick={(e) => this.swichTab(item.status)} key={index}>
                  <AtIcon value={item.iconClass} size="20" color={ current === item.status ? '#F93247': '#999999'} ></AtIcon>
                  <Text className={ current === item.status ? 'fs-26 clr-act': 'fs-26 clr-III'}>{item.label}</Text>
                </View>
              )
            })
          }
         </View>
      </View>
    )
  }
}
