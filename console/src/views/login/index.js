import React from 'react'
import './index.less'

class Login extends React.Component{
  constructor(props) {
    super(props)
  }
  // 处理子组件向父组件传值
  handleEvent(data) {
    console.log(data)
  }
  init() {
    
  }
  render() {
    return (
      <div className="content">
        <div class='solar-syst'>
          <div class='sun'></div>
          <div class='mercury'></div>
          <div class='venus'></div>
          <div class='earth'></div>
          <div class='mars'></div>
          <div class='jupiter'></div>
          <div class='saturn'></div>
          <div class='uranus'></div>
          <div class='neptune'></div>
          <div class='pluto'></div>
          <div class='asteroids-belt'></div>
        </div>
      </div>
    )
  }
}
export default Login
