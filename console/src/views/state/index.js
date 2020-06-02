import React from 'react'
// 状态值 state
class State extends React.Component {
  constructor(props) {
    super(props)
    this.state = { // 声明state 
      name: '张三',
      age: 12
    }
    this.pp = 'sddd'
  }
  changeState() {
    this.setState({ // 修改state
      name: '李四',
      age: 22
    })
    this.pp = '1444'
    console.log(this.pp)
  }
  render() {
    setTimeout(() => {
      this.changeState()
    }, 4000)
    return (
      <div>{this.state.name} {this.state.age}</div>
    )
  }
}
export default State