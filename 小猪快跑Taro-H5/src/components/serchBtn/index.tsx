import React, { Component } from 'react'
import { View, Text  } from '@tarojs/components'


import './index.less'

let handleTouchend = null
let handleTouchmove = null
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      dstyle: {},
      canDrage: false,
      screenWidth: 0,
      screenHeight: 0,
      domClientWidth: 0,
      domClientHeight: 0
    }
  }
  componentWillMount () { }

  // componentDidMount () { }

  componentWillUnmount () { 

  }

  componentDidMount () {
    const id = this.props.domid
    console.log(id)
    const dom = document.getElementById(id)
    this.setState({
      screenWidth: document.body.clientWidth,
      screenHeight: window.screen.availHeight,
      domClientWidth: dom.clientWidth,
      domClientHeight: dom.clientHeight
    })
    handleTouchend = (e) => {
      this.setState({
        canDrage: false
      })
    }
    handleTouchmove = (e) => {
      if (!this.state.canDrage) return false
      const touch = e.targetTouches[0]
      let pageX = touch.pageX
      let pageY = touch.pageY
      const { screenWidth, screenHeight, domClientWidth, domClientHeight } = this.state
      if (pageX < 0) {
        pageX = 0
      }
      if (pageY < 0) {
        pageY = 0
      }
      if (pageX > screenWidth - domClientWidth) {
        pageX = screenWidth - domClientWidth - 3
      }
      if (pageY > screenHeight - domClientHeight) {
        pageY = screenHeight - domClientHeight - 3
      }
      const style = {
        left: pageX + 'px',
        top: pageY + 'px'
      }
      this.setState({
        dstyle: style
      })
    }
    dom.addEventListener('touchend', handleTouchend, false)
    dom.addEventListener('touchmove', handleTouchmove)
   }

  componentDidHide () { }
  handleLongPress(e) {
    this.setState({
      canDrage: true
    })
  }
  handleClick(e) {
    this.props.handleShowOrHide(!this.props.show)
  }
  render () {
    const { code, dstyle, canDrage } = this.state
    const { show, domid } = this.props
    const cls = canDrage ? 'btn-oo-n fs-22 clr-w btn-active-pp btn-oo-n-act' : 'btn-oo-n fs-22 clr-w btn-active-pp'
    return (
      <View
      className={cls}
      onLongPress={(e) => this.handleLongPress(e) }
      id={domid}
      style={dstyle}
      onClick={(e) => this.handleClick(e)}
      >
        {
          !show ? (<Text className={'iconsousuo iconfont clr-w ser-iocn'} ></Text>) :  <Text className={'iconzoom_out iconfont clr-w ser-iocn-ot'}></Text>
        }
      </View>
    )
  }
}
