import React from 'react'

// 事件
class Eventt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Name',
      age: 45,
      style: {}
    }
  }
  // 点击函数
  handleClick(name, age) {
    this.setState({
      name: name || 'Name',
      age: age || 69
    })
    window.location.href = '/if'
  }
  render() {
    return (
      <div style={this.state.style}>
        {/* 处理点击函数 方法一*/}
        <button onClick={this.handleClick.bind(this, 'ck',45  )}> {this.state.name}</button>
        {/* 处理点击函数 方法二*/}
        <button onClick={() => this.handleClick('mk', 56) }> {this.state.age}</button>
      </div>
    )
  }
}
export default Eventt