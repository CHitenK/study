import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'

import './index.less'

import { queryReturnDetail } from '@api/order'
import getQuery from '@utils/getQuery'

const Logo = 'https://img.alicdn.com/bao/uploaded/i2/2209279901764/O1CN01ZhXp6C1OtxHwDmwTp_!!0-item_pic.jpg'
import { handleShenLuue } from '@utils/tool'
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detailData: {},
      satusDataList: {
        AUDITING: {
          label: '待审核',
          status: 'AUDITING',
          icon: 'icondaishenhe'
        },
        RETURNING: {
          label: '待退货',
          status: 'RETURNING',
          icon: 'icondaituihuo'
        },
        TO_RECEIVE: {
          label: '待收货',
          status: 'TO_RECEIVE',
          icon: 'icondaishouhuo'
        },
        TO_ACCEPTANCE: {
          label: '待验货',
          status: 'TO_ACCEPTANCE',
          icon: 'iconjiancha_yanhuo_checkup_examinegoods'
        },
        FINISHED: {
          label: '已完成',
          status: 'FINISHED',
          icon: 'iconyiwancheng'
        },
        CLOSED: {
          label: '已关闭',
          status: 'CLOSED',
          icon: 'iconyiguanbi'
        },
        AUDIT_FAIL: {
          label: '验货不通过',
          status: 'AUDIT_FAIL',
          icon: 'iconshenhebutongguo'
        },
        AUDIT_SUC: {
          label: '验货通过',
          status: 'AUDIT_SUC',
          icon: 'icontongguo'
        }
      }
    }
  }

  componentWillMount () {}

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    this.getDetail()
  }

  componentDidHide () { }
  // 获取详情
  async getDetail() {
    const returnNo = getQuery('returnNo')
    try {
      const data = await queryReturnDetail({ returnNo: returnNo })
      this.setState({
        detailData: data || {}
      })
    } catch(err) {}
  }
  // 图片预览
  checkPic(src, array) {
    Taro.previewImage({
      current: src, // 当前显示图片的http链接
      urls: array // 需要预览的图片http链接列表
    })
  }
  render () {
    const { detailData, satusDataList } = this.state
    const products = detailData.returnOmniItemRespDtoNewList
    const newPicUrl = detailData.picUrl && typeof(detailData.picUrl) === 'string' ? JSON.parse( detailData.picUrl) : []
    return (
      <ScrollView  scrollY className='saale-box'>
        <View className="order-status">
            <Text className={ detailData.bizStatus && satusDataList[detailData.bizStatus].icon + ' iconfont clr-act fs-iocn'}></Text>
            <Text className="fs-34 clr-II">{detailData.bizStatus && satusDataList[detailData.bizStatus].label || ''}</Text>
        </View>
        <View className='list-com pad mr-t-30 b-w'>
          <View className='list-box clr-I'>
          <Text>售后单号：</Text><Text className='pg-color'>{detailData.returnNo}</Text>
          </View>
          <View className='list-box clr-I'>
            <Text>发货单号：</Text><Text className='pg-color'>{detailData.deliveryNo}</Text>
          </View>
          <View className='list-box clr-I'>
            <Text>退款金额：</Text><Text className='pg-color'>￥{detailData.refundAmount}</Text>
          </View>
        </View>
        <View className='list-com pad b-w mr-t-30'>
          <View className='list-box clr-I'>
            <Text>订单编号：</Text><Text className='pg-color'>{detailData.orderTradeNo}</Text>
          </View>
          <View className='list-box clr-I'>
            <Text>支付金额：</Text><Text className='pg-color'>￥{detailData.payAmount}</Text>
          </View>
          <View className='list-box clr-I'>
            <Text>创建时间：</Text><Text className='pg-color'>{detailData.createTime}</Text>
          </View>
        </View>
        <View className='list-com pad b-w mr-t-30'>
          <View className='list-box flex-wrap clr-I mr-t-15'>
            <View className='list-product clr-I'>
              {products && products.map((item, i) => {
                 return (
                   <View>
                     <Text className="fs-26">原售后单号：</Text><Text className='pg-color'>{item.extlReturnSerial}</Text>
                     <View className='list-box list-product-content mr-t-15' key={i}>
                      <Image className='product-img' mode='widthFix' src={item.itemPicUrl}> </Image>
                      <View className='list-box-product'>
                        <View className='list-box clr-I'>
                          <Text>商家编码：</Text><Text className='pg-color'>{detailData.sellerCode}</Text>
                        </View>
                        <View className='clr-I fs-24'>
                         {item.itemName}
                        </View>
                        {/* <View className='list-box pro-name'>{handleShenLuue(item.skuDesc, 30)}</View> */}
                        <View className='list-box fs-24'>{item.skuDesc}</View>
                      </View>
                      <Text className='fs-24 clr-II'>X{item.itemNum}</Text>
                    </View>
                    </View>
                 )
              })}
            </View>
            <View className="mr-t-15 tuifei-box clr-I">
              {/* <Text >退货原因：</Text>
              <Text className='pg-color tuifei-box-r clr-I'>{detailData.returnReason}</Text> */}
            </View>
          </View>
          {/* <View className='list-box clr-I'>
            <View>图片凭证：</View>
            <View>
              {
                newPicUrl.map((item, i) => {
                  return (<Image className='product-img-min' mode='widthFix' src={item} onClick={() => this.checkPic(item, newPicUrl)} key={i} > </Image>)
                })
              }
            </View>
          </View> */}
        </View>
       {
         detailData.bizStatus === 'AUDIT_FAIL' ? (
          <View className='list-com pad no-border mr-t-30 b-w'>
            <View className='list-box tuifei-box clr-I'>
            <Text>验货不通过原因：</Text><Text className='pg-color tuifei-box-r tuifei-box-r-ot'>{detailData.failDescribe}</Text>
            </View>
            <View className='list-box clr-I mr-t-15'>
              <View>图片凭证：</View>
              <View>
                {
                  newPicUrl.map((item, i) => {
                    return (<Image className='product-img-min' mode='widthFix' src={item} onClick={() => this.checkPic(item, newPicUrl)} key={i} > </Image>)
                  })
                }
              </View>
            </View>
          </View>
          ) : ''
       }
      </ScrollView>
    )
  }
}
