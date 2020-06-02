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
      
      </div>
    )
  }
}
export default Left