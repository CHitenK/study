import React from 'react'
import './index.css'
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
        <div className="logo-img-box f-c">
           {/* <img className="logo-img" src="" /> */}
           <span className="fs-20 clr-w">cmk-test</span>
        </div>
      </div>
    )
  }
}
export default Left