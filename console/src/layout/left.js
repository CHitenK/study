import React from 'react'
import './index.less'
import { Menu } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import muneList from './../utils/menu'

const { SubMenu } = Menu
class Left extends React.Component{
  constructor(props) {
    super(props)
    this.state= {
      muneList
    }
  }
  // 处理子组件向父组件传值 muneList
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
        <div>
            <div className="index-box  f-c  fs-14 clr-w">
                首页
            </div>
            <Menu className="menu-box" mode="inline" theme="dark"  > 
              {
                this.state.muneList.map((item, index) => {
                 return (<SubMenu key={item.id} icon={<SettingOutlined />} title={item.groupName}>
                      {
                       item.children && item.children.map(gitem => {
                          return <Menu.Item key={gitem.id}>{gitem.name}</Menu.Item>
                        })
                      }
                  </SubMenu>)
                })
              }
            </Menu>
        </div>
      </div>
    )
  }
}
export default Left