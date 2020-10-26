import React from 'react'
import wx from 'weixin-js-sdk'

class Bus extends React.Component {
  componentDidMount(){
    this.props.onRef(this) // ->将child传递给this.props.onRef()方法
  }
  // 调转
  navigateTo(url, type) {
    if (type==='redirectTo') {
      wx.miniProgram.redirectTo({ url })
    } else if (type==='reLaunch') {
      wx.miniProgram.reLaunch({ url })
    } else if (type==='switchTab') {
      wx.miniProgram.switchTab({ url })
    } else {
      wx.miniProgram.navigateTo({url })
    }
   
  }
  render() {
    return ''
  }
}

export default Bus