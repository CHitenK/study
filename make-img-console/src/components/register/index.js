import React from "react"
import './index.scss'
import { Input, Button } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';

class Register extends React.Component{
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className={ this.props.isRegiste ? 'register-box pd-15' : 'register-box pd-15 register-box-out'}>
                <div className="f-c fs-16 clr-I f-w mr-t-20">注 册</div>
                <div className="mr-t-20">
                    <Input size="large" className="fs-14 clr-II" placeholder="输注册用户手机号码" prefix={<UserOutlined />} />
                </div>
                <div className="mr-t-10">
                    <Input.Password size="large" className="fs-14 clr-II" placeholder="输入密码" prefix={<UnlockOutlined />} />
                </div>
                <div className="mr-t-10">
                    <Input.Password size="large" className="fs-14 clr-II" placeholder="再次输入密码" prefix={<UnlockOutlined />} />
                </div>
                <div className="mr-t-5 error fs-12">
                    密码不能为空
                </div>
                <div className="mr-t-20">
                    <Button type="primary" >确 定</Button >
                    <Button  className="mr-l-10">取 消</Button >
                </div>
                <div className="mr-t-10">
                    <a className="fs-12 clr-II" onClick={() => this.props.handleEvent('isRegiste')}>去登录？</a>
                </div>
            </div>
        )
    }
}

export default Register
