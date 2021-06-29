import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './index.scss'

@inject('appStore')
@observer
class Login extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.appStore = props.appStore
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    setTimeout(() => {
      this.appStore.setToken('123456')
    }, 3000)
   }

  componentDidHide () { }
  render () {
    return (
      <View>
        登录了
      </View>
    )
  }
}

export default Login
