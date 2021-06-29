import React, { Component } from 'react'
import { Input, Text, View  } from '@tarojs/components'
import Taro from '@tarojs/taro'

import './index.less'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: ''
    }
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  
  setCode(e) {
    this.setState({
      code: e.target.value || ''
    })
  }
  comfirm() {
    const { code } = this.state
    if (!code) {
      Taro.showToast({
        title: '请输入一维码',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    this.props.comfirm(code)
  }
  render () {
    const { code } = this.state
    return (
      <View className="lay-out-ms">
         <View className="lay-out-cont pd-30">
             <View className="fs-32 clr-II ms-title mr-t-30">
                手动输入一维码
             </View>
             <View className="mr-t-30">
               <Input className="ms-input-box fs-28 clr-II pd-15" value={code} onInput={(e) => this.setCode(e)} placeholder="请输入一维码" />
             </View>
             <View className="mr-t-30 tool-box-ms fs-32" >
                <View className="tool-box-btn clr-III "  onClick={() => this.props.close()}>
                   取消
                </View>
                <View className="tool-box-btn clr-act b-l"  onClick={() => this.comfirm()}>
                  确定
                </View>
             </View>
         </View>
      </View>
    )
  }
}
