import React from 'react'
class Page1 extends React.Component{
  constructor(props) {
    super(props)
  }
  // 处理子组件向父组件传值
  handleEvent(data) {
    console.log(data)
  }
  render() {
    return (
      <div>
        page
      </div>
    )
  }
}
export default Page1