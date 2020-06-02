import React from 'react'
// 列表渲染
class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.listData = [
      { name: 'ckk', age: 122 },
      { name: 'ckk1', age: 132 },
      { name: 'ckk2', age: 162 },
      { name: 'ckk3', age: 172 },
      { name: 'ckk4', age: 192 },
      { name: 'ckk5', age: 182 }
    ]
  }
  
  render() {
    return (
      <div>
        {
          this.listData.map((item, i) => {
            return <p key={i}>{item.name} {item.age}</p>
          })
        }
        <div>4566</div>
      </div>
    )
  }

}
export default List