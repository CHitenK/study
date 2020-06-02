import React from 'react'
import Props from './../props/index'
class Page1 extends React.Component{
  constructor(props) {
    super(props)
  }
  // 处理子组件向父组件传值
  handleEvent(data) {
    console.log(data)
  }
  render() {
    const props = {
      key: 1,
      key1: 56,
      key2: 69
    }
    return (
      <div>
        page
        <Props name='cmk' age='5668' {...props} handleEvent={this.handleEvent} />
      </div>
    )
  }
}
export default Page1