import React, { Component } from 'react'
import { View, Image, Input, Form } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import { rstr2b64 } from '@utils/md5'
import { parse } from 'qs';
import getQuery from '@utils/getQuery'

import "taro-ui/dist/style/components/icon.scss" // 按需引入
import './index.less'

import Logo from '@images/logo.png'
import Config from '@utils/config'
import { getValidateImgUrl, reqLogin, newReqLogin, canLogin, getWxOpenId } from '@api/login'

export default class Index extends Component {
  constructor(props) {
    super(props)
    const REDIRECT_URI = window.location.href
    this.state = {
      validateImgUrl: '',
      uniqueId: '',
      password: '',
      validateCode: '',
      username: '',
      agree: false,
      canSubmit: true,
      openId: Config.APP_ISLOCAL ? 'oiISXs7DH9MBacvTC3D6zwuikvTQ' : '', // 本地开发调试自动设置为oiISXs7DH9MBacvTC3D6zwuikvTQ, 否则为空
      wxCodeUrl: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${Config.APP_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
    }
  }
  componentWillMount (data) {
    this.getOpenId()
    Taro.setNavigationBarTitle({
      title: '登录'
    })
    Taro.setStorageSync('can401', false)
  }

  componentDidMount (data) { }

  componentWillUnmount () { }

  componentDidShow (data) {
    // 初始菜单栏 数据
    // footTab 底部栏tab  默认4
    Taro.setStorageSync('tabData', { footTab: 4  })
    // 获取验证
    this.getValidateImgUrl()
    console.log(Config.APP_ID)
  }

  getOpenId (){
    const { openId } = this.state
    const code = getQuery('code')
    if(openId){ // 拿到openId 缓存
      Taro.getStorageSync('userOpenId', openId)
    }else if(code){ // 用户有code
      getWxOpenId({code}).then(res=>{ // 获取用户openid
        console.log('获取用户openid：', res)
        if(res){
          this.setState({
            openId: res
          })
        }else{
          Taro.navigateTo({
            url: '/pages/login/index'
          })
        }
        Taro.setStorageSync('userOpenId', res)
      })
    }else{
      window.location.href = this.state.wxCodeUrl
    }
    this.setUserPhone() // 读取用户号码
  }
  setUserPhone() { // 读取用户号码
    const userInfo = Taro.getStorageSync('userInfo')
    let username = userInfo.phone
    if(username){
      this.setState({
        username
      })
    }
  }
  // 获取验证
  getValidateImgUrl() {
    getValidateImgUrl().then(res => {
      this.setState({
        validateImgUrl: 'data:image/jpeg;base64,' + res.image,
        uniqueId: res.captchaId
      })
    }).catch(res => {
      Taro.showToast({
        title: res.resultMsg || '系统繁忙',
        icon: 'none',
        duration: 1000
      })
    })
  }
  // 输入框输入值
  inputVal(e, key){
    this.setState({
      [key]: e.target.value || ''
    })
  }
  // 提交
  async commit() {
    const { username, password, validateCode, uniqueId, agree, canSubmit, openId } = this.state
    const yanCode = validateCode || document.getElementById('yanzheng').value || ''
    if (!openId) {
      Taro.showToast({
        title: '获取信息失败，请刷新页面重试',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!username) {
      Taro.showToast({
        title: '请输入账号',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!password) {
      Taro.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!yanCode) {
      Taro.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    // if (!agree) {
    //   Taro.showToast({
    //     title: '请阅读并同意相关协议',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return false
    // }
    if (!canSubmit) {
      return false
    }
    this.state.canSubmit = false
    Taro.showLoading({
      title: '正在提交...',
    })
    const loginParam = {
      // 用户名
      loginName: username,
      // 密码MD5加密
      password: rstr2b64(password),
      // 登录类型 用户名+密码登录 name、手机短信登录 mobile
      keepDays: 0,
      loginType: '6',
      captcha: yanCode,
      captchaId: uniqueId,
      openId
    };
    try {
      const data = await newReqLogin(parse(loginParam))
      if (Object.keys(data).length > 0 && data.userId) {
        Taro.setStorageSync('token', data.token) // 设置全局Token
        const kaka = await canLogin({ userId: data.userId, roleCode: 'shopOpearte', instanceId: data.instanceId })
        if (kaka && kaka.checkStatus === true) {
          // Taro.setStorageSync('userInfo', { ...data, username, shopId: kaka.shopId })
          Taro.setStorage({
            key: "userInfo",
            data: { ...data, username, shopId: kaka.shopId }
          }).then(res => {
            setTimeout(() => {
              Taro.hideLoading()
              window.location.href = window.location.origin + '/pages/index/index'
            }, 800)
          })
        } else {
          Taro.hideLoading()
          throw new Error()
        }
      } else {
        Taro.hideLoading()
      }
      this.state.canSubmit = true
    } catch(err) {
      Taro.hideLoading()
      Taro.showToast({
        title: err.resultMsg || '该用户暂无权限',
        icon: 'none',
        duration: 3000
      })
      // 获取验证
      this.getValidateImgUrl()
      this.setState({
        validateCode: ''
      })
      Taro.setStorageSync('token', null)
      this.state.canSubmit = true
    }

  }
  componentDidHide () { }

  render () {
    const { validateImgUrl, username, password, validateCode, agree } = this.state
    return (
      <View className='login-box'>
        <Image className='logo' src={Logo}  />
        <View className='logo-title fs-32 clr-I'>数字零售工作台</View>
        <Form onSubmit={() => this.commit()}>
          <View className='label-box mr-t-120 fs-38'>
            <AtIcon value='user' color='#999'></AtIcon>
            <Input className='label-box-input' type='text' value={username} placeholder='请输入账号' onInput={(e) => this.inputVal(e, 'username')} />
          </View>
          <View className='label-box fs-38'>
            <AtIcon value='lock' color='#999'></AtIcon>
            <Input className='label-box-input' type='text' value={password} password placeholder='请输入密码' onInput={(e) => this.inputVal(e, 'password')} />
          </View>
          <View className='label-box fs-38'>
            <AtIcon value='tags' color='#999'></AtIcon>
            <Input className='label-box-input label-box-input-ot' id='yanzheng' type='text' value={validateCode} placeholder='请输入验证码' onInput={(e) => this.inputVal(e, 'validateCode')} onConfirm={() => this.commit()} />
            <Image className='label-box-btn' src={validateImgUrl} mode='aspectFit' onClick={() => this.getValidateImgUrl()} />
          </View>
        </Form>
        <View className='submit-btn' onClick={() => this.commit()}>
          登 录
        </View>
        <View className='last-box fs-34'>
          {/* {
            agree && 0 ? (<AtIcon value="check-circle" size="14" color="blue" onClick={() => this.setState({ agree: !agree })} > </AtIcon>) : (<Text className="no-chose-box" onClick={() => this.setState({ agree: !agree })}></Text>)
          } */}
          {/* <Image className="last-box-icon" src="https://img.e111.com.cn/group1/M00/01/2D/Cg1F-V2rMaCAIompAASC0MUrDm8479.jpg" mode="aspectFit" /> */}
          {/* <Text className="fs-26 clr-II"> 已阅读并同意</Text><Text className="last-box-text fs-26 clr-III">《完美履约服务协议》</Text> */}
        </View>
      </View>
    )
  }
}
