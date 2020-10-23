import { useState } from 'react'
import { Carousel } from 'antd-mobile'

// import wx from 'weixin-js-sdk'

import './index.scss'

const Banner = (props) => {
  // 处理点击
  const handleClick = (data) => {
    //  0：商品，1：专题，2：活动，3：链接，4：无跳转
    switch (data.jumpType + '') {
      case '0': {
        if (data.productCode) {
          props.navigateTo('/pages/index/productDetail/productDetail?targetId=' + data.productCode )
        }
        break;
      }
      case '1': {
        if (data.specialId) {
          props.navigateTo('/pages/index/activity/productList?type=2&tid=' + data.specialId)
        }
        break;
      }
      case '2': {
        // props.navigateTo('/pages/index/productDetail/productDetail?targetId=186792')
        break;
      }
      case '3': {
        if (data.link) {
          props.navigateTo('/pages/index/website/website?url=' + encodeURIComponent(data.link))
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  const { businessData } = props
  return (
    <div className="banner-box">
      <Carousel 
      autoplay={true}
      infinite
      dots={businessData.items && businessData.items.length > 1}
      autoplayInterval={3000}
      > 
        {
          businessData && businessData.items && businessData.items.map((item, i) => {
             return (
              <div className="banner-item" key={i} onClick={() => handleClick(item)}>
                 <img src={item.image} />
              </div>
             )
          })
        }
      </Carousel>
    </div>
  )
}

export default Banner