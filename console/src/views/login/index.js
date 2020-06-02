import React from 'react'

class Login extends React.Component{
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
        登录
      </div>
    )
  }
}
export default Login