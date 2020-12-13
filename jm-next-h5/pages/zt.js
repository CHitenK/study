
// import  {useState} from 'react'
import React from 'react'
import dynamic from 'next/dynamic'
import { Toast } from 'antd-mobile'

import Head from './../components/head/index'
import Banner from './../components/banner/index'
import Products from './../components/products/index'


import  './../style/index.scss'

import { getDetail } from './../api/index'

class Index extends React.Component {
  static async getInitialProps({ query }) {
    const detail = await getDetail({ id: query.id })
    return { detail: detail.code === 200 ? detail.data : null, query, loading: true }
  }
  constructor(props){
    super(props)
    this.state = {
      isShowCom: false
    }
  }
  componentDidMount() {
    // 延时加载微信jsdk, 保证window存在
    setTimeout(() => {
      this.setState({ isShowCom: true })
    }, 1500)
  }
  // 跳转
  navigateToComBUs(url, type) {
    this.CommomBus.navigateTo(url, type)
  }
  renderComBus() {
    const CommomBus = dynamic(import('./../components/commomBus/index'))
    return <CommomBus onRef={this.onRef} />
  }
  showTeamplate(data) {
    const bus = {
      navigateTo: (url, type) => this.navigateToComBUs(url, type)
    }
    switch (data.name) {
      case 'jm-banner': {
        return <Banner key={data.uuid} {...data} {...bus} />
      }
      case 'jm-products': {
        return <Products key={data.uuid} {...data} {...bus} />
      }
      default: { 
        return ''
      }
    }
  }
  // 利用子组件跳转
  onRef = (ref) => {
    this.CommomBus = ref
  }
  render() {
    const { isShowCom, loading, loadingText } = this.state
    const { query, detail } = this.props
    const showPage = !detail || !query.id
    if (!showPage) {
      const { pages } = detail
      const content = pages.content || []
      return (
        <div className='page-box'>
          <Head title={detail.title}></Head>
          {isShowCom && this.renderComBus()}
          {
            content && content.map((item, i) => {
              return this.showTeamplate(item)
            })
          }
        </div>
      )
    } else if (!loading) {
      return (<div className="no-data">
        载入中...
        </div>)
    } else {
      return <div className="no-data">数据加载出错！~~</div>
    }
  }
}
export default Index