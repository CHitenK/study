import React from 'react'

class Props extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      name: 'cmk',
      age: 159
    }
  }
  render() {
    return (
      <div>
        {/*props 传值*/}
        <p>{this.props.name}</p>
        {/* 父子组件 传值*/}
        <p onClick={() => this.props.handleEvent(123)}>{this.props.age}</p>
      </div>
    )
  }
}

export default Props