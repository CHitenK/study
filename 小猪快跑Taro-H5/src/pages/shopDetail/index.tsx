import React, { Component } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'

import { getShopMessage } from '@api/user'

export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state ={
      shopData: {},
      userInfo: {}
    }
  }
  componentWillMount () { }

  componentDidMount () {
    const userInfo = Taro.getStorageSync('userInfo') || {}
    this.setState({
      userInfo: userInfo
    })
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.init()
  }

  componentDidHide () { }
  async init() {
    Taro.setNavigationBarTitle({
      title: '门店资料'
    })
    //统计
    // 个人资料
    getShopMessage({ shopId: this.state.userInfo.shopId }).then(res => {
      this.setState({
        shopData: res || {}
      })
    }).catch(err => {
        
    })
  }
  logout() {
    Taro.setStorageSync('token', '')
    Taro.navigateTo({
      url: '/pages/login/index'
    })
  }
  render () {
    const { shopData } = this.state
    return (
      <View className='shop-box'>
          <View className="shop-box-top">
            <Swiper className="swiper-box">
              <SwiperItem className="swiper-box-item">
                  <Image className="swiper-box-item-img" src={shopData.logo}  mode="scaleToFill" />
              </SwiperItem>
            </Swiper>
            <View className="list clr-II fs-30 pd-30 mr-t-30">
                门店名称：{shopData.name}
            </View>
            <View className="list clr-II fs-30 pd-30">
                门店所属商户：{shopData.sellerName}
            </View>
            <View className="list clr-II fs-30 pd-30 b-n">
                地址：{shopData.address}
            </View>
         </View>
         <View className="shop-box-tool fs-30 clr-III" onClick={() => this.logout()}>
           退出登录
         </View>
      </View>
    )
  }
}
