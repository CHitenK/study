import React from 'react'
import './index.less'
import Register from './../../components/register/index'
import { Input, Button } from 'antd';
import { UserOutlined, UnlockOutlined, ScheduleOutlined } from '@ant-design/icons';
class Login extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
        isLogin: true,
        Login: true,
        isRegiste: false
    }
    this.handleEvent = this.handleEvent.bind(this)
  }
  // 处理子组件向父组件传值
  handleEvent(type) {
    if (type === 'isRegiste') {
        this.setState({
            isRegiste: !this.state.isRegiste
        })
        setTimeout(() => {
            this.setState({
                isLogin: !this.state.isLogin
            })
        }, 800)
    } else {
        this.setState({
            isLogin: !this.state.isLogin
        })
        setTimeout(() => {
            this.setState({
                isRegiste: !this.state.isRegiste
            })
        }, 800)
    }
  }
  // 去登录
  sumbit() {
    // window.location.href = '/content/index'
    this.props.history.push("/content/index");
  }
  init() {
    
  }
  render() {
    return (
      <div className="content">
        <div className='solar-syst'>
          <div className='sun'></div>
          <div className='mercury'></div>
          <div className='venus'></div>
          <div className='earth'></div>
          <div className='mars'></div>
          <div className='jupiter'></div>
          <div className='saturn'></div>
          <div className='uranus'></div>
          <div className='neptune'></div>
          <div className='pluto'></div>
          <div className='asteroids-belt'></div>
        </div>
        {/* 登录 */}
        <div className={this.state.isLogin ? 'login-box pd-15' : 'login-box pd-15 login-box-out'} >
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
                <Button type="primary" onClick={() => this.sumbit()} >确 定</Button >
                <Button  className="mr-l-10">取 消</Button >
            </div>
            <div className="mr-t-10">
                <a className="fs-12 clr-II" onClick={() => this.handleEvent()}>去注册？</a>
            </div>
        </div>
        {/* 登录 end */}
        {/* 注册 */}
        <Register isRegiste={this.state.isRegiste} handleEvent={this.handleEvent} />
        {/* 注册 end */}
      </div>
    )
  }
}
export default Login
