import React from 'react'
import './index.scss'
import Register from './../../components/register/index'
import { Input, Button } from 'antd';
import { UserOutlined, UnlockOutlined, ScheduleOutlined } from '@ant-design/icons'
class Login extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
        isLogin: true,
        Login: true,
        isRegiste: false,
        imgSrc: '',
        tips: '',
        random: '',
        yanZheng: ''
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
    this.setState({
      tips: ''
    })
    if (this.state.yanZheng !== this.state.random) {
      this.setState({
        tips: '验证码有误'
      })
      return false
    }
    this.props.history.push("/content/list");
  }
  // 验证码
  getYanZheng() {
    const t = Math.random() + ''
    const n = t.substring(3, 7)
    const imgLookSrc = window.location.origin + '/api/makeimg?id=MKI1598350477880'
    this.setState({
      random: n,
      imgSrc: imgLookSrc + '&n=' + n,
      yanZheng: n
    })
  }
  // 设置验证码
  setYan(e) {
    this.setState({
      yanZheng: e.target.value
    })
  }
  componentDidMount() {
    this.getYanZheng()
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
                <Input size="large" value="用户" className="fs-14 clr-II" placeholder="输入用户名称" prefix={<UserOutlined />} />
            </div>
            <div className="mr-t-10">
                <Input.Password size="large" value="0987654321" className="fs-14 clr-II" placeholder="输入密码" prefix={<UnlockOutlined />} />
            </div>
            <div className="yanzheng-ma-box mr-t-10">
                <Input  className="fs-14 clr-II" value={this.state.yanZheng} onChange={(e) => this.setYan(e)} placeholder="输入验证码" prefix={<ScheduleOutlined />} />
                <img className="yanzheng-ma" onClick={() => this.getYanZheng() } src={this.state.imgSrc} alt="" />
            </div>
            <div className="mr-t-5 error fs-12">
                {this.state.tips}
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
        <div className="bei-an-bx">
          <span className="pr-15">粤ICP备18110158号-1</span>
          <a href="https://beian.miit.gov.cn" target="_blank">工业和信息化部政务服务平台</a>
        </div>
      </div>
    )
  }
}
export default Login
