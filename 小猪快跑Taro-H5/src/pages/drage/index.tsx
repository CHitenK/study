import React, { Component } from 'react'
import { View  } from '@tarojs/components'


import './index.less'

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

  componentDidMount () { }

  componentWillUnmount () { 

  }

  componentDidShow () {
    const id = this.props.domid
    const dom = document.getElementById(id)
    this.setState({
      screenWidth: document.body.clientWidth,
      screenHeight: window.screen.availHeight,
      domClientWidth: dom.clientWidth,
      domClientHeight: dom.clientHeight
    })
    dom.addEventListener('touchend', this.handleTouchend, false)
    dom.addEventListener('touchmove', this.handleTouchmove, false)
   }

  componentDidHide () { }
  
  handleTouchend(e) {
    this.setState({
      canDrage: false
    })
  }
  handleTouchmove(e) {
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
      pageX = screenWidth - domClientWidth
    }
    if (pageY > screenHeight - domClientHeight) {
      pageY = screenHeight - domClientHeight
    }
    const style = {
      left: pageX + 'px',
      top: pageY + 'px'
    }
    this.setState({
      dstyle: style
    })
  }
  handleLongPress(e) {
    this.setState({
      canDrage: true
    })
  }
  render () {
    const { code, dstyle } = this.state
    return (
      <View
      className="btn-oo-n fs-28 clr-III"
      onLongPress={(e) => this.handleLongPress(e) }
      id="target"
      style={dstyle}
      >
      搜索
      </View>
    )
  }
}
