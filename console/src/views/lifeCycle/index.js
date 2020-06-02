import React from 'react'

// 生命周期
class LifeCycle extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      name: 'cmk'
    }
  }
  /**
   * 装载组件触发
   * 只会在装载之前调用一次，在 render 之前调用，你可以在这个方法里面调用 setState 改变状态，并且不会导致额外调用一次 render
   */
  componentWillMount() {
    console.log('装载组件触发')
  }
  /**
   * 装载完成之后调用
   * 只会在装载完成之后调用一次，在 render 之后调用，从这里开始可以通过 ReactDOM.findDOMNode(this) 获取到组件的 DOM 节点。
   */
  componentDidMount() {
    console.log('装载完成之后调用')
  }
  /**
   * 当props 修改时触发
   * @param {Object} nextPro  修改后的props 数据
   */
  componentWillReceiveProps(nextPro) {
    console.log(nextPro)
  }
  /**
   * 修改state时触发
   * @param {Object} nextProps 
   * @param {Object} nextState 
   */
  shouldComponentUpdate(nextProps, nextState){
    console.log(nextProps, 15)
    console.log(nextState, 69)
    return true
  }
  render() {
    return (
      <div>
        生命周期
      </div>
    )
  }
}
export default LifeCycle