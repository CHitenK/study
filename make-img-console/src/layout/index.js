import React, { useState, Suspense } from 'react'
import { Route } from 'react-router-dom'
import router from './../route/index'
import Left from './left'
import { Menu, Dropdown } from 'antd'
import { DownOutlined, SyncOutlined } from '@ant-design/icons'
import { useStore } from './../store/config'

const  Layout = () => {
  const [state, setState ] = useState({})
  const showLoading = useStore(s => s.showLoading)
  let userName  = useStore(s => s.userName)
  if (sessionStorage.getItem('userName')) {
    userName = sessionStorage.getItem('userName')
  }
  sessionStorage.setItem('userName', userName)
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
      <Left  />
      <div className="content-right">
        <div className="f-c content-right-head pd-15">
          <Dropdown overlay={menu}>
                <a className="clr-w" onClick={e => e.preventDefault()}>
                {userName} <DownOutlined />
                </a>
          </Dropdown>
        </div>
        <Suspense fallback={
               <div className="loading-box">
                    <SyncOutlined spin />
                  </div>}
        >
          <div className="content-right-content">
              <Route path="/" component={Layout} exact />
                {
                    router.map((item, i) => {
                        return <Route key={i} path={item.path} component={item.component}  />
                    })
                }
                {  showLoading && (
                  <div className="loading-box">
                    <SyncOutlined spin />
                  </div>
                  )
                }
          </div>
        </Suspense>
      </div> 
    </div>
  )
}
export default Layout