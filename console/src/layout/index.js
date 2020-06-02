import React from 'react'
import {  Route  } from 'react-router-dom'
import router from './../route/index'
import Left from './left'
class Layout extends React.Component{
  constructor(props) {
    super(props)
  }
  // 处理子组件向父组件传值
  handleEvent(data) {
    console.log(data)
  }
  render() {
    return (
      <div className="content-box">
        <Left />
        <div className="content-right">
          <div className="content-right-head"></div>
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