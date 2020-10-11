import { Component } from 'react'
import { Provider, observer, inject } from '@tarojs/mobx'
import './app.scss'
// const config: any = require('./config.js')
import store  from './store/index'
class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
    // return (
    //    <Provider>
    //      { this.props.children }
    //    </Provider>
    // )
  }
}

export default App
