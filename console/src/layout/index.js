import React from 'react'
import {  Route  } from 'react-router-dom'
import router from './../route/index'
import Left from './left'
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
class Layout extends React.Component{
  constructor(props) {
    super(props)
  }
  // 处理子组件向父组件传值
  handleEvent(data) {
    console.log(data)
  }
  render() {
      // 菜单
      const menu = (
        <Menu>
            <Menu.Item>
            <a>
                退出登录
            </a>
            </Menu.Item>
        </Menu>
      )
    return (
      <div className="content-box">
        <Left />
        <div className="content-right">
          <div className="f-c content-right-head pd-15">
          <Dropdown overlay={menu}>
                <a className="clr-w" onClick={e => e.preventDefault()}>
                chiMu <DownOutlined />
                </a>
          </Dropdown>
          </div>
          <div className="content-right-content">
                {
                    router.map((item, i) => {
                        return <Route key={i} path={item.path} component={item.component}  />
                    })
                }
          </div>
        </div> 
      </div>
    )
  }
}
export default Layout