import React, { Component } from 'react'
import { View, Form, Image, Input, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import { rstr2b64 } from '@utils/md5'

import "taro-ui/dist/style/components/icon.scss" // 按需引入
import './index.less'

import { getVialidateCode, valiDateCode, modifyUserPassword } from '@api/user'

let TIMER = null
export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state ={
      userInfo: {},
      step: 1,
      pwdType1: true,
      pwdType2: true,
      validateCode: '',
      codeText: '获取验证码',
      canGetCode: true,
      pwd: '',
      pwdAgain: '',
      canYanzheng: true
    }
  }
  componentWillMount () { }

  componentDidMount () {
   
  }

  componentWillUnmount () { 
    clearInterval(TIMER)
  }

  componentDidShow () {
    const userInfo = Taro.getStorageSync('userInfo') || {}
    this.setState({
      userInfo: userInfo
    })
  }

  componentDidHide () { }
  async commit() {
    const { pwd, userInfo, pwdAgain } = this.state
    if (!pwd) {
      Taro.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!pwdAgain) {
      Taro.showToast({
        title: '请再次输入密码',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (pwdAgain !== pwd) {
      Taro.showToast({
        title: '两次密码输入不相同',
        icon: 'none',
        duration: 2000
      })
      return false
    }

    if (pwd.length < 6) {
      Taro.showToast({
        title: '密码长度不能小于6',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    // 规则对象(flag)
    var flag = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")
    if (flag.test(pwd)) {
      Taro.showToast({
        title: '密码不能包含特殊字符',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    Taro.showLoading({ title: '提交中...' })
    try {
      const cm = {
        "id": userInfo.userId,
        "instanceId": userInfo.instanceId,
        "password": rstr2b64(pwd),
        "tenantId": userInfo.instanceId
      }
      const data = await modifyUserPassword(cm)
      if (data) {
        Taro.hideLoading()
        Taro.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 3000
        })
        setTimeout(() => {
          this.logout()
        }, 2000)
      }
    } catch(err) {
      Taro.hideLoading()
    }
  }
  logout() {
    Taro.setStorageSync('token', '')
    Taro.navigateTo({
      url: '/pages/login/index'
    })
  }
  backTo() {
    Taro.navigateBack()
  }
  inputVal(e, key){
    this.setState({
      [key]: e.target.value || ''
    })
  }
  async nextOne() {
    const { validateCode, userInfo } = this.state
    if (!validateCode) {
      Taro.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!this.state.canYanzheng) {
      return false
    }
    this.state.canYanzheng = false
    try {
      Taro.showLoading({ title: '加载中...' })
      const cm = { messageCode: validateCode, phone: userInfo.phone }
      const data = await valiDateCode(cm)
      Taro.hideLoading()
      this.setState({
        step: 2
      })
    } catch(err) {
      Taro.hideLoading()
      Taro.showToast({
        title: err.resultMsg,
        icon: 'none',
        duration: 3000
      })
      this.state.canYanzheng = true
    }
  }
  // 获取验证码
  async getCode() {
    if (!this.state.canGetCode) {
      return false
    }
    this.state.canGetCode = false
    try {
      Taro.showLoading({ title: '发送中...' })
      const data = await getVialidateCode({ target: this.state.userInfo.phone })
      Taro.hideLoading()
      Taro.showToast({
        title: '发送成功',
        icon: 'success',
        duration: 2000
      })
      let num = 120
      TIMER = setInterval(() => {
        num--
        if (num <= 0) {
          clearInterval(TIMER)
          this.state.canGetCode = true
          this.setState({ codeText: '获取验证码'})
          return false
        }
        const codeText = num > 9 ? num + '秒' : '0' + num + '秒'
        this.setState({ codeText: codeText})
      }, 1000)
    } catch(err) {
      Taro.hideLoading()
      Taro.showToast({
        title: '发送失败',
        icon: 'none',
        duration: 2000
      })
      this.state.canGetCode = true
    }
  }
  // 第一步
  firstStep() {
    const { userInfo, validateCode, codeText } = this.state
    const phone = userInfo.phone || ''
    const cl = validateCode ? 'submit-btn ' : 'submit-btn submit-btn-ot'
    return (
      <View className='login-box-ot'>
          <Form onSubmit={() => this.commit()}>
            <View className='label-box fs-40 mr-t-30'>
              <AtIcon value='user' color='#999'></AtIcon>
              <Input className='label-box-input' type='text' value={phone} placeholder='请输入账号' disabled />
            </View>
            <View className='label-box fs-40'>
              <AtIcon value='tags' color='#999'></AtIcon>
              <Input className='label-box-input label-box-input-ot' type='number' maxlength={6} value={validateCode} placeholder='请输入验证码' onInput={(e) => this.inputVal(e, 'validateCode')} key={123} />
              <Text  className='label-box-btn fs-26 clr-II' onClick={() => this.getCode()}>{codeText}</Text>
            </View>
          </Form>
          <View className={cl} onClick={() => this.nextOne()}>
            下一步
          </View>
      </View>
    )
  }
  // 第二步
  seconStep() {
    const { pwd , pwdAgain, pwdType1, pwdType2 } = this.state
    return (
      <View className='login-box-ot'>
          <Form onSubmit={() => this.commit()}>
            <View className='label-box fs-40 mr-t-30'>
              <AtIcon value='lock' color='#999'></AtIcon>
              <Input className='label-box-input label-box-input-pwd' disabled={false} maxlength={140} type='text' password={pwdType1} value={pwd} placeholder='请输入密码' onInput={(e) => this.inputVal(e, 'pwd')} key={897} />
              <Text className={pwdType1 ? 'iconai-eye iconfont eys clr-III' : 'iconbiyan_huaban1 iconfont eys clr-III'} onClick={() => this.setState({ pwdType1: !pwdType1 })}></Text>
            </View>
            <View className='label-box fs-40'>
              <AtIcon value='lock' color='#999'></AtIcon>
              <Input className='label-box-input label-box-input-pwd' maxlength={140} type='text' password={pwdType2} value={pwdAgain} placeholder='再次确认密码' onInput={(e) => this.inputVal(e, 'pwdAgain')} key={678} />
              <Text className={pwdType2 ? 'iconai-eye iconfont eys clr-III' : 'iconbiyan_huaban1 iconfont eys clr-III'} onClick={() => this.setState({ pwdType2: !pwdType2 })}></Text>
            </View>
          </Form>
          <View className='submit-btn' onClick={() => this.commit()}>
            提交
          </View>
          <View className='submit-btn submit-btn-30' onClick={() => this.backTo()}>
            取消
          </View>
      </View>
    )
  }
  render () {
    const {  step } = this.state
    if (step === 1) {
      return this.firstStep()
    } else {
      return this.seconStep()
    }
  }
}
