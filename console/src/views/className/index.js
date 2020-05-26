import React from 'react'
import './index.css'
// 类名称 还有 style 
class ClassName extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      className: 'red',
      style: {}
    }
  }
  render() {
    setTimeout(() => {
       this.setState({
        className: 'kk',
        style: { color: 'blue' }
       })
    }, 5000)
    return (
      <div className={this.state.className}  style={this.state.style}>ffffsfs</div>
    )
  }
}
export default ClassName