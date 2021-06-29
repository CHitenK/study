import React, { Component } from 'react'
import { View, ScrollView, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

import NODATA_ICON from '@images/icon/noneList.png'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'

import { returnStatusList, getSaleOders, changeStatus } from '@api/order'
import getQuery from '@utils/getQuery'
import { handleShenLuue } from '@utils/tool'

export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 'AUDITING',
      orderList: [],
      total: 0,
      pageNum: 1,
      canGetMore: true,
      statusCountData: [],
      sellMana: {
        oneMall: '单',
        manyMall: '多'
      },
      canRefsh: false,
      menuList: [
        {
          label: '待审核',
          status: 'AUDITING',
          num: 0
        },
        {
          label: '待退货',
          status: 'RETURNING',
          num: 0
        },
        // {
        //   label: '待收货',
        //   status: 'TO_RECEIVE',
        //   num: 0
        // },
        {
          label: '待验货',
          status: 'TO_ACCEPTANCE',
          num: 0
        },
        {
          label: '已完成',
          status: 'FINISHED',
          num: 0
        },
        {
          label: '已关闭',
          status: 'CLOSED',
          num: 0
        },
        {
          label: '验货不通过',
          status: 'AUDIT_FAIL',
          num: 0
        }
        // {
        //   label: '验货通过',
        //   status: 'AUDIT_SUC',
        //   num: 0
        // }
      ],
      shopId: ''
    }
  }
  componentWillMount () { }

  componentDidMount () {
    const userInfo = Taro.getStorageSync('userInfo') || {}
    const title = userInfo.shopName || '订单'
    const shopId = userInfo.shopId || getQuery('shopId')
    Taro.setNavigationBarTitle({
      title: title
    })
    const tabData = Taro.getStorageSync('tabData') || {}
    this.setState({ shopId: shopId, current: tabData.shouHouStatus || 'AUDITING', },  () => {
      this.init()
    })
    this.initRefresh()
  }

  componentWillUnmount () { }

  componentDidShow () {
  }
  componentDidHide () { }
  // 初始
  init() {
    this.getOrderList()
    this.deliveryStatusList()
  }
  // 订单列表
  async getOrderList(pageNum = 1) {
    Taro.showLoading({ title: '加载中...' })
    const { current, orderList } = this.state
    try {
      const ajxaRes = await getSaleOders({ bizStatus: current, pageNum: pageNum, pageSize: 10, t: Date.now() })
      let newList = pageNum > 1 ? [...orderList, ...ajxaRes.list] : ajxaRes.list || []
      this.setState({
        pageNum: pageNum,
        total: ajxaRes.total,
        orderList: newList
      })
    } catch (res) {
      if (res.resultCode !== 401) {
        Taro.showToast({
          title: res.resultMsg || '系统繁忙,稍后再试',
          icon: 'none',
          duration: 2000
        })
      }
    }
    Taro.hideLoading()
    this.state.canGetMore = true // 已完成请求, 允许加载更多
  }
  // 切换tab
  choseTab(status) {
    this.setState({
      current: status || 'AUDITING'
    })
    this.getOrderList()
    this.deliveryStatusList()
    const tabData = Taro.getStorageSync('tabData') || {}
    Taro.setStorageSync('tabData', { ...tabData, shouHouStatus: status || 'AUDITING' })
  }
  // 复制
  copy(data) {
    Taro.setClipboardData({
      data,
      success: function (res) {
        Taro.showToast({
          title: '复制到黏贴版',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
  // 跳转
  linkTo(returnNo) {
    Taro.navigateTo({
      url: '/pages/afterSaale/afterSaaleDetail/index?returnNo=' + returnNo,
    })
  }
  // 跳转到上传不通过资料页面
  goTo(id) {
    window.location.href = '/pages/afterSaale/afterSaaleNo/index?id=' + id
  }
  // 滚动到底部加载更多
  onScrollToLower() {
    const { orderList, total, pageNum, canGetMore } = this.state
    if (orderList.length < total && canGetMore) { // 允许加载更多
      this.state.canGetMore = false
      this.getOrderList(pageNum + 1)
    }
  }
  // 获取统计
  async deliveryStatusList() {
    const { shopId, menuList } = this.state
    try {
      const list = JSON.parse(JSON.stringify(menuList))
      const data = await returnStatusList({ shopId: shopId, t: Date.now()})
      if (data) {
        data.forEach(item => {
          list.forEach(gtem => {
            if (item.bizStatus === gtem.status) {
              gtem.num = item.bizStatusCount || 0
            }
          })
        })
        this.setState({ menuList: list })
      }
    } catch(err) {
      console.log(2432)
    }
  }
  // 处理统计数值
  handleStatusCountData(status) {
    const { menuList } = this.state
    const data = menuList.find(item => item.status === status )
    if (data && data.num) {
      return +data.num > 99 ? { num: 99, className: 'num' } : { num: data.num, className: 'num' }
    } else {
      return { num: 0, className: 'num num-hide'}
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
  // 处理显示状态
  getdeliveryImg(status) {
    const data = this.state.menuList.find(item => item.status === status)
    return data ? data.label : ''
  }
  // 修改状态
  async changeStatus(id, i) {
    Taro.showLoading({ title: '加载中...' })
    try {
      const cmData = {
        id: id,
        bizStatus: 'FINISHED'
      }
      const data = await changeStatus(cmData)
      Taro.hideLoading()
      if (data) {
        Taro.showToast({
          title: '操作成功',
          icon: 'success',
          duration: 2000
        })
        const { orderList } = this.state
        orderList[i].bizStatus = 'FINISHED'
        this.setState({ orderList })
      }
    } catch(err) {
      Taro.hideLoading()
      Taro.showToast({
        title: '操作失败',
        icon: 'none',
        duration: 2000
      })
    }
  }
  // 点击通过
  handleTongguo(id, i) {
    Taro.showModal({
      title: '提示',
      content: '是否确定通过？',
      success: (res) => {
        if (res.confirm) {
          this.changeStatus(id, i)
        }
      }
    })
  }
  render () {
    const claNameAc = 'order-tab-item clr-II order-tab-item-acitive'
    const claName = 'order-tab-item clr-II'
    const { orderList, sellMana, menuList } = this.state
    const nodata = orderList.length < 1 ? true : false
    return (
        <View className='order-list-box-sale' id="parent">
          <ScrollView scrollX className="ScrollView-Y">
            <View className="order-tab-box fs-30">
              {
                menuList && menuList.map((item, i) => {
                  const flage = this.state.current === item.status
                  const wc = item.label.length > 3 ? ' order-tab-item-ot' : '' // label 文字过长
                  return (
                    <View className={ flage ? claNameAc + wc : claName  + wc} onClick={() => this.choseTab(item.status)} key={i}>
                      <Text className={ flage ? 'active-text' : 'tab-title'}>{item.label}</Text>
                      <Text className={ this.handleStatusCountData(item.status)['className'] + ' ' +  (flage ? 'num-active' : '')}>
                        {item.num}
                      </Text>
                    </View>
                  )
                })
              }
            </View>
          </ScrollView>  
          <ScrollView className="scrool-box" scrollY onScrollToLower={(e, h) => this.onScrollToLower(e, h)} lowerThreshold={80}>
            {
              orderList && orderList.map((item, i) => {
                const { returnOmniItemRespDtoNewList } = item
                const itemDetail = returnOmniItemRespDtoNewList[0]
                return (
                  <View className="product" key={i}>
                    <View className="product-status-box pd-15 h-80">
                      <View className="clr-II kkk-box">
                        {sellMana[item.sellManage] && (<View className="sell-manage fs-16 clr-w">
                          {sellMana[item.sellManage]}
                        </View>)}
                        <Text className="kkk-item">售后单号:{item.returnNo}</Text>
                        <View className="copy-btn clr-III" onClick={() => this.copy(item.returnNo)}>
                          复制
                        </View>
                      </View>
                      <Text className="clr-act">
                        {this.getdeliveryImg(item.bizStatus)}
                      </Text> 
                    </View>
                    <View className="pro-box pd-15" onClick={() => this.linkTo(item.returnNo)}>
                      <Image className="pro-img" src={itemDetail.itemPicUrl} mode="aspectFit" />
                      <View className="pro-item">
                      <View className="pro-name clr-II">
                          商家编码: {item.sellerCode}
                        </View>
                        <View className="pro-name clr-II">
                          {itemDetail.itemName}
                        </View>
                        <View className="sku-box clr-III mr-t-5">
                          <Text>{handleShenLuue(itemDetail.skuDesc, 30)}</Text>
                          <Text>X{itemDetail.itemNum}</Text>
                        </View>
                      </View>
                    </View>
                    <View className="product-status-box pd-15 clr-II b-n bor-t">
                      <Text>共{returnOmniItemRespDtoNewList.length}件商品</Text>
                      {returnOmniItemRespDtoNewList.length > 0 ? <Text onClick={() => this.linkTo(item.returnNo)}>查看更多 > </Text> : '' }
                    </View>
                    {
                      item.bizStatus === 'TO_ACCEPTANCE' ? (
                        <View className="tool-box pd-15">
                          <View className="scan-code clr-act" onClick={() => this.handleTongguo(item.id, i)}>通过</View>
                          <View className="scan-code clr-act" onClick={() => this.goTo(item.id)}>不通过</View>
                        </View>
                      ) : ''
                    }
                    {
                      item.bizStatus === 'AUDIT_FAIL' && false ? (<View className="tool-box pd-15"><View className="scan-code clr-act" onClick={() => this.scanCode(item.deliveryNo, i)}>处理成功</View></View>) : ''
                    }
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
        </View>
    )
  }
}
