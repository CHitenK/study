import React from 'react'
import './index.less'
import Register from './../../components/register/index'
import { Input, Button } from 'antd';
import { UserOutlined, UnlockOutlined, ScheduleOutlined } from '@ant-design/icons';
class Login extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
        isLogin: true
    }
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
        {
            this.state.isLogin? (
              <div className="login-box pd-15">
                <div className="f-c fs-16 clr-I f-w mr-t-20">登 录</div>
                <div className="mr-t-20">
                   <Input size="large" className="fs-14 clr-II" placeholder="输入用户名称" prefix={<UserOutlined />} />
                </div>
                <div className="mr-t-10">
                   <Input.Password size="large" className="fs-14 clr-II" placeholder="输入密码" prefix={<UnlockOutlined />} />
                </div>
                <div className="yanzheng-ma-box mr-t-10">
                  <Input  className="fs-14 clr-II" placeholder="输入验证码" prefix={<ScheduleOutlined />} />
                  <img className="yanzheng-ma" src="" />
                </div>
                <div className="mr-t-5 error fs-12">
                    密码不能为空
                </div>
                <div className="mr-t-20">
                  <Button type="primary" >确 定</Button >
                  <Button  className="mr-l-10">取 消</Button >
                </div>
                <div className="mr-t-10">
                   <a className="fs-12 clr-II" onClick="">去注册？</a>
                </div>
              </div>
            ) : ''
            
        }
        <Register />
      </div>
    )
  }
}
export default Login
