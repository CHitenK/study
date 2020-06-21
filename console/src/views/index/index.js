
import React from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts'
// 引入柱状图
import  'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

import './index.less'
import { option1, option2 } from './echarts'
 
class Index extends React.Component{
  // constructor(props) {
  //   super(props)
  // }
  componentDidMount(){
    this.drawFirstEcharts()
  }
  drawFirstEcharts() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('eachart1'))
    myChart.setOption(option1)
    var myChart2 = echarts.init(document.getElementById('eachart2'))
    myChart2.setOption(option2)
  }
  render() {
    return ( 
        <div className="page-box pd-15">
           <div className="page-box-item" id="eachart1"></div>
           <div className="page-box-item page-box-item-r" id="eachart2"></div>
        </div>
    )
  }
}
export default Index