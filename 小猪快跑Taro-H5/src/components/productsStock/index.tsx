import React, { Component } from 'react'
import { View, ScrollView, Text, Image, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import MaAss from './../manualAssociation/index'
import { AtIcon } from 'taro-ui'
import SerchBtn from './../serchBtn/index'

import NODATA_ICON from '@images/icon/noneList.png'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/icon.scss" // 按需引入
import './index.less'

import { getQueryProList, setIteminitial } from '@api/order'
import getQuery from '@utils/getQuery'
import { handleShenLuue } from '@utils/tool'
export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderList: [],
      showLay: false,
      total: 0,
      pageNum: 1,
      canGetMore: true,
      guanLianDeliveryNo: '',
      guanLianDeliveryNoIndex: '',
      statusCountData: [],
      canRefsh: false,
      shopId: '',
      quantity: '', // 数量
      targetData: {},
      code: '',
      targetIndex: '',
      showSearchPage: true,
      canDo: true
    }
  }

  componentDidMount () {
    const userInfo = Taro.getStorageSync('userInfo') || {}
    const title = userInfo.shopName || '订单'
    const shopId =  userInfo.shopId || getQuery('shopId')
    Taro.setNavigationBarTitle({
      title: title
    })
    this.setState({ shopId: shopId }, () => {
      this.init()
    })
    this.initRefresh()
  }
  // 初始
  init() {
    this.getOrderList()
  }
  // 订单列表
  async getOrderList(pageNum = 1) {
    Taro.showLoading({ title: '加载中...' })
    const { orderList, code } = this.state
    try {
      const ajxaRes = await getQueryProList({ code: code || '', pageNum: pageNum, pageSize: 10 })
      let newList = pageNum > 1 ? [...orderList, ...ajxaRes.list] : ajxaRes.list || []
      this.setState({
        pageNum: pageNum,
        total: ajxaRes.total,
        orderList: newList
      }, () => {
        setTimeout(() => {
          Taro.hideLoading()
        }, 800)
      })
    } catch (res) {
      if (res.resultCode !== 401) {
        Taro.showToast({
          title: res.resultMsg || '系统繁忙,稍后再试',
          icon: 'none',
          duration: 2000
        })
      }
      Taro.hideLoading()
    }
    this.state.canGetMore = true // 已完成请求, 允许加载更多
  }
  // 滚动到底部加载更多
  onScrollToLower() {
    const { orderList, total, pageNum, canGetMore } = this.state
    if (orderList.length < total && canGetMore) { // 允许加载更多
      this.state.canGetMore = false
      this.getOrderList(pageNum + 1)
    }
  }
  // 下拉刷新
  initRefresh() {
    //1.获取到列表的dom，刷新显示部分的dom，列表父容器的dom
    let parent = document.getElementById('parent');
    //2.定义一些需要常用的变量
    let startY = 0;//手指触摸最开始的Y坐标
    const self = this
    //3.给列表dom监听touchstart事件,得到起始位置的Y坐标
    parent.addEventListener('touchstart',function(e){
      startY = e.touches[0].pageY;
    });

    //4.给列表dom监听touchmove事件，当移动到一定程度需要显示上面的文字
    parent.addEventListener('touchmove',function (e) {
      if((e.touches[0].pageY - startY ) > 120 && startY < 100){
        self.state.canRefsh = true
      } else {
        self.state.canRefsh = false
      }
    });

    //5.给列表dom监听touchend事件，此时说明用户已经松开了手指，应该进行异步操作了
    parent.addEventListener('touchend',function (e) {
      if (self.state.canRefsh) {
        self.state.canRefsh = false
        self.init()
      }
    })
  }
  inputVal(e, key) {
    this.setState({ [key]: e.detail.value })
  }
  commit() {
    const { quantity, targetData, canDo } = this.state
    if (!quantity) {
      Taro.showToast({
        icon: 'none',
        title: '库存数量不能为空'
      })
      return false
    }
    if (quantity < 0) {
      Taro.showToast({
        icon: 'none',
        title: '库存数量不能小于0'
      })
      return false
    }
    if (quantity > 99999) {
      Taro.showToast({
        icon: 'none',
        title: '库存数量不能大于99999'
      })
      return false
    }
    if (!canDo) return false
    this.state.canDo = false
    Taro.showLoading({ title: '提交中...'})
    const param = {
      sellerId: targetData.sellerId,
      skuId: targetData.skuId,
      shopId: targetData.shopId,
      quantity: +quantity
    }
    setIteminitial(param).then(res => {
      Taro.hideLoading()
      Taro.showToast({
        icon: 'success',
        title: '修改成功'
      })
      this.setState({ showLay: false })
      const { orderList, targetIndex } = this.state
      orderList[targetIndex].inventoryQuantity = quantity
      this.setState({ orderList })
      this.state.canDo = true
    }).catch(err => {
      Taro.hideLoading()
      Taro.showToast({
        icon: 'none',
        title: err.resultMsg
      })
      this.state.canDo = true
    })
  }
  // 调整库存 page
  setNumPage() {
    const { quantity, showLay, targetData } = this.state
    if (!showLay) return ''
    return (
      <View className="lay-out-cun">
         <View className="lay-out-cont pd-30">
             <View className="fs-32 clr-II ms-title mr-t-30">
                调整库存
             </View>
             <View className="mr-t-20 fs-28 clr-II pd-15">
               {targetData.name}
             </View>
             <View className="mr-t-30 input-num-box">
               <View className="clr-II input-num-btn" onClick={() => this.inputVal({detail: { value: quantity + 1 } }, 'quantity')}>
                 +
               </View>
               <Input className="ms-input-box fs-28 clr-II pd-15" value={quantity} onInput={(e) => this.inputVal(e, 'quantity')} placeholder="请输入" />
               <View className="clr-II input-num-btn " onClick={() => this.inputVal({detail: { value: quantity > 0 ? quantity - 1 : 0 } }, 'quantity')} >
                 -
               </View>
             </View>
             <View className="mr-t-20 fs-28 clr-act pd-15">
               此次调整后，直接将系统库存变更为 {quantity} 件
             </View>
             <View className="mr-t-30 tool-box-ms fs-32" >
                <View className="tool-box-btn clr-III "  onClick={() => this.setState({ showLay: false })}>
                   取消
                </View>
                <View className="tool-box-btn clr-act b-l"  onClick={() => this.commit()}>
                  确定
                </View>
             </View>
         </View>
      </View>
    )
  }
  openChange(data, i) {
    this.setState({
      showLay: true,
      targetData: data,
      targetIndex: i,
      quantity: data.inventoryQuantity || 0
    })
  }
  clearCode() {
    this.setState({
      code: ''
    }, () => {
      this.getOrderList()
    })
  }
  searchPage() {
    const { code, showSearchPage } = this.state
    if (!showSearchPage) return ''
    return (
      <ScrollView scrollX className="ScrollView-Y">
        <View className="search-box pd-15 clr-III">
          <Text className={'iconsaoyisao iconfont clr-III stock-iocn'} onClick={() => this.hanleScanCodeSearch()}></Text>
          <Input className='search-box-input fs-28 clr-III' id="keyword" type='text' value={code} placeholder='请输入商家编码或商品条形码' onInput={(e) => this.inputVal(e, 'code')} onConfirm={() => this.getOrderList()} />
          <Text className={'iconsearch iconfont clr-III stock-iocn'} onClick={() => this.getOrderList()}></Text>
          {
            code ? <Text className={'iconbuoumaotubiao20 iconfont clr-III clsoe-iocn'} onClick={() => this.clearCode()}></Text> : ''
          }
        </View>
    </ScrollView>
    )
  }
  // 最新扫码搜索事件
  hanleScanCodeSearch() {
    this.props.handleScanCode().then(res => {
      this.setState({
        code: res.codeVal || ''
      }, () => {
        setTimeout(() => {
          this.getOrderList()
        }, 800)
      })
    }).catch(err => {
      Taro.showToast({
        title: err.msg || '扫码出错了,稍后重试',
        icon: 'none',
        duration: 3000
      })
    })
  }
  render () {
    const { orderList, code, showSearchPage } = this.state
    const nodata = orderList.length < 1 ? true : false
    // 显示/隐藏 搜索组件 porps
    const showSearch = {
      handleShowOrHide: (bl) => {
        // 关闭时初始数据
        if (!bl) {
          this.setState({
            showSearchPage: bl,
            code: ''
          }, () => {
            this.getOrderList()
          })
        } else {
          this.setState({ showSearchPage: bl })
        }
      },
      show: showSearchPage
    }
    return (
        <View className='order-list-box stock-box' id="parent">
          {
            this.searchPage()
          }
          <ScrollView className={!showSearchPage ? 'scrool-box scrool-box-ot' : 'scrool-box'} scrollY onScrollToLower={(e, h) => this.onScrollToLower(e, h)} lowerThreshold={80}>
            {
              orderList && orderList.map((item, i) => {
                return (
                  <View className="product" key={i}>
                    <View className="product-status-box fs-24 pd-15 h-60">
                      <View className="clr-II kkk-box">
                        <Text className="kkk-item ">商家编码</Text>
                      </View>
                      <Text className="clr-III">
                        {item.code}
                      </Text> 
                    </View>
                    <View className="product-status-box fs-24 pd-15 h-60">
                      <View className="clr-II kkk-box">
                        <Text className="kkk-item ">商品条形码</Text>
                      </View>
                      <Text className="clr-III">
                        {item.barCode || '- -'}
                      </Text> 
                    </View>
                    <View className="pro-box pd-15" >
                      <Image className="pro-img" src={item.picUrl} mode="aspectFit" />
                      <View className="pro-item">
                        <View className="clr-II fs-26">
                          {item.name}
                        </View>
                        <View className="sku-box clr-III mr-t-5">
                          {/* <Text>{handleShenLuue(item.propertiesName, 30)}</Text> */}
                          <Text>{item.propertiesName}</Text>
                        </View>
                        <View className="sku-box clr-III">
                          <Text>数量: {item.inventoryQuantity}</Text>
                        </View>
                      </View>
                    </View>
                    <View className="tool-box pd-15">
                      <View className={'scan-code clr-act'} onClick={() => this.openChange(item, i)}>调整库存</View>
                    </View>
                  </View>
                )
              })
            }
            {
              nodata ? (
                <View className="no-data-box">
                  <Image className="no-data-icon" src={NODATA_ICON} mode="aspectFit" />
                  <Text className="clr-III fs-30">
                    暂无数据!
                  </Text>
                </View>
              ) : ''
            }
          </ScrollView>
          {
            this.setNumPage()
          }
          <SerchBtn domid="tongcheng-id" {...showSearch} ></SerchBtn>
        </View>
    )
  }
}
