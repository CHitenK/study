import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import JsBarcode from 'jsbarcode';
import "taro-ui/dist/style/components/icon.scss" // 按需引入
import './index.less'
import getQuery from '@utils/getQuery'
import DAI_JIAN_HUO from './../../images/icon/ic_nodeclare.png' // 待拣货
import DAI_YI_JIAO from './../../images/icon/ic_nosend.png' // 待移交
import DAI_JI_JIE from './../../images/icon/toSend.png' // 待集结
import DAI_LAN_SHOU from './../../images/icon/toReceived.png' // 待揽收
import YI_FA_HUO from './../../images/icon/ic_noreceive.png' // 已发货
import YI_WAN_CHENG from './../../images/icon/ic_finish.png' // 已完成
import { curry } from 'lodash'
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      barCode: null
    }
  }

  componentWillMount () {}

  componentDidMount () {
    const value = getQuery('barCode')
    this.setState({
      barCode: value
    })
    JsBarcode('#barcode', value, {
      margin: 0,
      displayValue: false, //  不显示原始值
      height: 60,
      width: 2 // 线条宽度
    })
  }

  componentWillUnmount () { }

  componentDidShow () {
    Taro.setNavigationBarTitle({
      title: '条形码'
    })
   }

  componentDidHide () { }
  render () {
    return (
      <View className='barcode'>
        <View className='w100'>
          <View className='barcode-box'>
            <svg id='barcode'/>  
          </View>
          <View className='barcode-box fs-30 clr-II'>
            <View className='barcode-mode'>
              <Text className="fs-24">商品条形码:</Text>
              <Text className="fs-24">{this.state.barCode}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
