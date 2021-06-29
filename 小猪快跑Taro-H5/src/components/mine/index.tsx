import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtIcon } from 'taro-ui'
import getQuery from '@utils/getQuery'

import "taro-ui/dist/style/components/icon.scss" // 按需引入
import './index.less'

import { count, getShopMessage } from '@api/user'
import NO_LOGIN_ICON from '@images/icon/userhead_unlogin.png'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: {},
      countData: {},
      shopData: {},
      userName: ''
    }
  }
  componentWillMount () { 
  
  }

  componentDidMount () { 
    const userInfo = Taro.getStorageSync('userInfo') || {}
    // const shopId = userInfo.shopId
    // const userName = userInfo.userName
    this.setState({
      userInfo: userInfo,
      userName: userInfo.username
    })
    if (userInfo.shopId) {
      this.init(userInfo.shopId)
    }
  }

  componentWillUnmount () { }

  componentDidShow () {}

  componentDidHide () { }
  
  async init(shopId) {
    Taro.setStorageSync('can401', false)
    Taro.setNavigationBarTitle({
      title: '我的'
    })
    //统计
    count({ shopId: shopId }).then(res => {
      this.setState({
        countData: res || {}
      })
    }).catch(err => {
    })
    // 个人资料
    getShopMessage({ shopId: shopId }).then(res => {
      this.setState({
        shopData: res || {}
      })
      const userInfo = Taro.getStorageSync('userInfo') || {}
      Taro.setStorageSync('userInfo', { ...userInfo, shopName: res.name })
    }).catch(err => {
        
    })
  }

  // 跳转
  linkTo(url) {
    Taro.navigateTo({
      url
    })
  }
  render () {
    const { userInfo, countData, shopData, userName } = this.state
    return (
      <View className='page-box'>
        <View className="user-box pd-30"> 
          <Image className="use-img"  src={ shopData.logo ? shopData.logo : NO_LOGIN_ICON } onClick={() => this.linkTo(shopData.logo ? '/pages/shopDetail/index' : '/pages/login/index' )} />
          {
            userName ? (<View className="use">
            <View>
                <View className="clr-II fs-32">店长: { userName }</View>
                <View className="clr-III fs-24">{shopData.address}</View>
              </View>
              <AtIcon value="chevron-right" size='30' color='#999999' onClick={() => this.linkTo('/pages/shopDetail/index')} />
          </View>) : (
          <View className="go-login-ot fs-32 clr-III" onClick={() => this.linkTo('/pages/login/index')}>
            请登录
          </View>)
          }
        </View>
        <View className="mr-t-30 shop-zhishu pd-30 fs-32 clr-II" >
           门店指数
        </View>
        <View className="data-box pd-30 clr-II">
           <View className="data-box-item">
               <Text className="clr-act fs-34">{countData.total || 0}</Text>
              <Text className="clr-III fs-30">今日订单数</Text>
           </View>
           <View className="data-box-item">
              <Text className="clr-act fs-34">{countData.todo || 0}</Text>
              <Text className="clr-III fs-30">未处理订单数</Text>
           </View>
           <View className="data-box-item">
              <Text className="clr-act fs-34">{countData.amount || 0}</Text>
              <Text className="clr-III fs-30">今日营业额</Text>
           </View>
        </View>
        <View className="data-box pd-30 clr-II">
           <View className="data-box-item">
               <Text className="clr-act fs-34">{countData.delay || 0}</Text>
              <Text className="clr-III fs-30">超时订单数</Text>
           </View>
        </View>
        <View className="mr-t-30 shop-zhishu pd-30 fs-32 clr-II" >
          常用工具
        </View>
        <View className="data-box pd-30 clr-II">
           <View className="data-box-item" onClick={() => this.linkTo('/pages/changePwd/index')} >
              <Text className={'iconxiugaimima iconfont change-pwd clr-III'}></Text>
              <Text className="clr-III fs-30">修改密码</Text>
           </View>
        </View>
      </View>
    )
  }
}
