import React, { Component } from 'react'
import { Input, Text, View  } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'

import "taro-ui/dist/style/components/icon.scss" 
import './index.less'

let _timer = null
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      falge: false
    }
  }
  componentWillMount () { }

  componentDidMount () {
    // const ll = '2020-11-23 17:30:00'
    const { cls, handletimes } = this.props
    const falge = !!this.handleTimes(handletimes)
    this.setState({ falge })
    // 启动定时器
    if (falge) {
      this.startTimer(this.handleTimes(handletimes))
    }
  }
  componentWillUnmount () {
    clearInterval(_timer)
    _timer = null
  }
  // 判断是否超时 传入参数格式 YYYY-MM-dd hh:mm:ss / YYYY/MM/dd hh:mm:ss 
  handleTimes(date) {
    if (!date) return false
    const newTimes = date.replace(/-/gi, '/')
    const targetTimes = new Date(newTimes).getTime()
    const nowTimes = new Date().getTime()
    if (nowTimes < targetTimes ) return false
    return targetTimes
  }
  // 时间转换 传入参数 时间戳
  transTimes(times) {
    const nowTimes = new Date().getTime()
    const zong = nowTimes - times // 超过的总时间
    const dayL = 1000 * 60 * 60 * 24 
    const hourL = 1000 * 60 * 60
    const minuL = 1000 * 60
    const day = parseInt(zong / dayL) // 天
    const hour = parseInt(zong / hourL) % 24 // 小时
    const minu = parseInt((zong - (dayL * day) - (hour * hourL)) / minuL) // 分钟
    const second = parseInt((zong - (dayL * day) - (hour * hourL) - (minuL * minu)) / 1000) // 秒
    const d = day > 9 || day == 0  ? day : '0' + day
    const h = hour > 9 ? hour : '0' + hour
    const m = minu > 9 ? minu : '0' + minu
    const s = second > 9 ? second : '0' + second
    return d + '天' + h + '小时' + m + '分' + s + '秒'
  }
  // 定时器
  startTimer(time) {
    _timer = setInterval(() => {
      const str = this.transTimes(time)
      this.setState({
        date: str
      })
    }, 1000)
  }
  render () {
    const { cls } = this.props
    const { falge, date } = this.state
    const clsn = 'count-down-box clr-act ' + cls || ''
    return (
        falge ? (
          <View className={clsn} >
        <View>
          <AtIcon className="fs-30" value='alert-circle' color='#F93247'></AtIcon>
          &nbsp;已超时{date}
        </View>
        <View className="count-down-status fs-30 clr-act">
          超时未发货
        </View>
      </View>
        ) : ''
    )
  }
}
