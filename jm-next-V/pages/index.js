
// import  {useState} from 'react'
import React from 'react'
import { Toast } from 'antd-mobile'

import Head from './../components/head/index'
import Banner from './../components/banner/index'

import  './../style/index.scss'

import { getDetail } from './../api/index'

class Index extends React.Component {
  static async getInitialProps({ query }) {
    const detail = await getDetail({ id: query.id })
    return { detail: detail.code === 200 ? detail.data : {}, query }
  }
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
    }
  }
  showTeamplate(data) {
    console.log(data.name)
    switch (data.name) {
      case 'jm-banner': {
        return <Banner key={data.uuid} {...data} />
      }
      default: { 
        return ''
      }
    }
  }
  render() {
    const { query, detail } = this.props
    const showPage = !detail || !query.id
    // if (showPage) {
    //   Toast.fail('数据加载出错', 2)
    // }
    if (!showPage) {
      const { pages } = detail
      const content = pages.content || []
      return (
        <div className='page-box'>
          <Head title={detail.title}></Head>
          {
            content && content.map((item, i) => {
              return this.showTeamplate(item)
            })
          }
        </div>
      )
    } else {
      return <div></div>
    }
  }
}
export default Index