import { useState } from 'react'
import { Carousel } from 'antd-mobile'

// import wx from 'weixin-js-sdk'

import './index.scss'

const Products = (props) => {
  console.log(props)
 // 抄底三列
 const productType1 = () => {
   const target = props.businessData
   const product = target.product || []
   const style = {
     backgroundColor: target.wrapperBgColor
   }
   return (
    <div className="product-box product-box-I" style={style}>
      {
         product.map((item, i) => {
           return (
            <div className="product-box-I-item" key={i}>
              <img src={item.imageUrl} />
              <div className="name">{item.name}</div>
            </div>
           )
         })
      }
    </div>
   )
 }

 return productType1()
}

export default Products