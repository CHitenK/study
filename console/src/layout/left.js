import React from 'react'
import './index.css'
import { Menu } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu
class Left extends React.Component{
  constructor(props) {
    super(props)
  }
  // 处理子组件向父组件传值
  handleEvent(data) {
    console.log(data)
  }
  render() {
    return (
      <div className="left-box">
        <div className="logo-img-box f-c pd-15">
           {/* <img className="logo-img" src="" /> */}
           <span className="fs-20 clr-w">cmk-test</span>
        </div>
        <div className="">
            <Menu className="menu-box" mode="inline" theme="dark" >
                <SubMenu key="sub" icon={<SettingOutlined />} title="Navigation Three">
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
            </Menu>
        </div>
      </div>
    )
  }
}
export default Left