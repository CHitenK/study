import React, { Component } from "react"
import { View } from "@tarojs/components"
import { observer, inject } from "mobx-react"
import Taro from '@tarojs/taro'
import config from "@/config.read"

import './index.scss'

@inject('store')
@observer
class Index extends Component {
  constructor(props) {
    super(props)
    //this.appStore = props.store.appStore
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    // setTimeout(() => {
    //   this.appStore.setToken('123456')
    //   Taro.navigateTo({
    //     url: '/pages/login/index'
    //   })
    // }, 3000)
    // console.log(config)
   }

  componentDidHide () { }
  render () {
    return (
      <View className='index'>
        Hellow Taro
        {/* {this.appStore.authToken} */}
      </View>
    )
  }
}

export default Index
