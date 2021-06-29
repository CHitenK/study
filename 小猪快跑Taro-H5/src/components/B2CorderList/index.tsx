import React, { Component } from 'react'
import { View, ScrollView, Text, Image, Picker, Input  } from '@tarojs/components'
import Taro from '@tarojs/taro'
import MaAss from '../manualAssociation/index'
import SerchBtn from './../serchBtn/index'

import NODATA_ICON from '@images/icon/noneList.png'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'

import { bindCode, getB2CDeliveryStatusList, getB2CorderList } from '@api/order'
import getQuery from '@utils/getQuery'
import { handleShenLuue } from '@utils/tool'

export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1,
      orderList: [],
      showLay: false,
      total: 0,
      pageNum: 1,
      canGetMore: true,
      guanLianDeliveryNo: '',
      guanLianDeliveryNoIndex: '',
      statusCountData: [],
      sellMana: {
        oneMall: '单',
        manyMall: '多'
      },
      canRefsh: false,
      canScan: false,
      muneList: [
        {
          label: '待拣货',
          status: 1,
          num: 0
        },
        {
          label: '待移交',
          status: 2,
          num: 0
        },
        {
          label: '待集结',
          status: 6,
          num: 0
        },
        {
          label: '待揽收',
          status: 7,
          num: 0
        },
        {
          label: '已发货',
          status: 3,
          num: 0
        },
        {
          label: '已完成',
          status: 5,
          num: 0
        },
        {
          label: '已取消',
          status: 4,
          num: 0
        }
      ],
      shopId: '',
      showSearchPage: false,
      searchTypeList: ['按支付时间', '按订单号', '按发货单号'], // 0
      searchType: 0, // 0 => 按支付时间 1 => 按订单号 2 => 按发货单号
      payTimeStart: '', // 订单支付时间（起始）
      payTimeEnd: '', // 订单支付时间（结束）
      payDate: '', // 订单支付日期
      orderNo: '', // 订单号
      deliveryNo: '' // 发货单号
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
    this.deliveryStatusList()
  }
  /**
   * @description 处理筛选参数
   * @returns {Object}
   */
  handleSearchOpt() {
    const { searchType, payTimeStart, payTimeEnd, payDate, orderNo, showSearchPage, deliveryNo } = this.state
    let newOrederNo = '', newDeliveryNo = '', prm = {}, start = '', end = ''
    // 拦截校验
    if (showSearchPage) { // 筛选打开
      if (searchType === 0) {
        if (payDate && !payTimeStart && !payTimeEnd) { // 用户填写日期 未填写开始/结束时间
          start = payDate + ' ' + '00:00:00'
          end = payDate + ' ' + '23:59:59'
        } else if (payDate && payTimeStart && !payTimeEnd) { // 用户填写日期, 开始时间 未填结束写时间
          start = payDate + ' '  + payTimeStart + ':00'
          end = payDate + ' ' + '23:59:59'
        } else if (payDate && !payTimeStart && payTimeEnd) { // 用户填写日期, 结束写时间 未填开始时间
          start = payDate + ' ' + '00:00:00'
          end = payDate + ' '  + payTimeEnd + ':00'
        } else if (payDate && payTimeStart && payTimeEnd) { // 用户填写日期, 结束写时间, 开始时间
          start = payDate + ' '  + payTimeStart + ':00'
          end = payDate + ' '  + payTimeEnd + ':00'
        }
      } else if (searchType === 1) {
        newOrederNo = orderNo || document.getElementById('keyword').value || ''
      } else if (searchType === 2) {
        newDeliveryNo = deliveryNo || document.getElementById('keyword1').value || ''
      }
      prm = {
        payTimeStart:  showSearchPage && searchType === 0 ? start : '',
        payTimeEnd:  showSearchPage && searchType === 0 ? end : '',
        orderNo: showSearchPage && searchType === 1 ? newOrederNo : '',
        deliveryNo: showSearchPage && searchType === 2 ? newDeliveryNo : ''
      }
    }
    return prm
  }
  // 订单列表
  async getOrderList(pageNum = 1) {
    const { current, orderList, payTimeStart, payTimeEnd, searchType, showSearchPage } = this.state
    // 校验
    if (searchType === 0 && showSearchPage) { 
      if (payTimeStart  && payTimeEnd) {
        const payTimeEndOt = payTimeEnd.replace(/:/gi, '')
        const payTimeStartOt = payTimeStart.replace(/:/gi, '')
        if (parseInt(payTimeStartOt) > parseInt(payTimeEndOt)) {
          Taro.showToast({
            icon: 'none',
            title: '支付结束时间不能小于支付起始时间'
          })
          return false
        }
      }
    }
    Taro.showLoading({ title: '加载中...' })
    try {
      const parm = { 
        deliveryStatus: current,
        pageNum: pageNum,
        pageSize: 10,
        ...this.handleSearchOpt() // 获取搜索参数
      }
      const ajxaRes = await getB2CorderList(parm)
      let newList = pageNum > 1 ? [...orderList, ...ajxaRes.list] : ajxaRes.list || []
      this.setState({
        pageNum: pageNum,
        total: ajxaRes.total,
        orderList: newList
      })
    } catch (res) {
      console.log(res)
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
  choseTab(index) {
    this.setState({
      current: index || 1
    })
    this.getOrderList()
    this.deliveryStatusList()
    const tabData = Taro.getStorageSync('tabData') || {}
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
  // 扫码
  scanCode(deliveryNo, i) {
    const self = this
    if (!this.props.canScan) {
      Taro.showToast({
        title: '初始中,稍后重试',
        icon: 'none',
        duration: 2000
      })
      this.props.wxInit()
      return false
    }
    this.setState({
      guanLianDeliveryNo: deliveryNo,
      guanLianDeliveryNoIndex: i
    })
    window.WX.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: function (res) {
        if (res.resultStr) {
          let  newStr = ''
          if (res.resultStr.includes(',')){
            newStr = res.resultStr.split(',')[1]
          }
          self.comfireGuanlian(newStr || res.resultStr)
        } else {
          Taro.showModal({
            title: '提示',
            content: '扫码关联不上，试试手动输入',
            success: function (res) {
              if (res.confirm) {
                self.setState({
                  showLay: true
                })
              }
            }
          })
        }
      },
      fail: (err) => {
        Taro.showToast({
          title: err.errMsg,
          icon: 'none',
          duration: 2000
        })
        Taro.showModal({
          title: '提示',
          content: '扫码关联不上，试试手动输入',
          success: function (res) {
            if (res.confirm) {
              self.setState({
                showLay: true
              })
            }
          }
        })
      }
    });
  }
  // 跳转
  linkTo(data) {
    if (data.deliveryStatus == 1) {
      window.location.href = window.location.origin + '/pages/orderDetail/index?deliveryNo=' + data.deliveryNo + '&status=' + data.deliveryStatus+ '&type=b2c'
    } else {
      Taro.navigateTo({
        url: '/pages/orderDetail/index?deliveryNo=' + data.deliveryNo + '&status=' + data.deliveryStatus + '&type=b2c'
      })
    }
  }
  // 关联
  comfireGuanlian(data) {
    Taro.showLoading()
    bindCode({ barcode: data, deliveryOrderNo: this.state.guanLianDeliveryNo }).then(res =>{
      Taro.hideLoading()
      Taro.showToast({
        title: '操作成功',
        icon: 'success',
        duration: 2000
      })
      this.changeStatus()
      this.closeLay()
    }).catch(err => {
      Taro.hideLoading()
      if (!this.state.showLay) {
        Taro.showModal({
          title: '提示',
          content: err.resultMsg || '无法关联' + ',试试手动关联',
          success: (res) => {
            if (res.confirm) {
              this.setState({
                showLay: true
              })
            }
          }
        })
      } else {
        Taro.showToast({
          title: err.resultMsg || '无法关联',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
  closeLay() {
    this.setState({
      showLay: false
    })
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
    const { shopId, muneList, payTimeStart, payTimeEnd, showSearchPage } = this.state
    // 校验
    if (showSearchPage) {
      if (payTimeStart  && payTimeEnd) {
        const payTimeEndOt = payTimeEnd.replace(/:/gi, '')
        const payTimeStartOt = payTimeStart.replace(/:/gi, '')
        if (parseInt(payTimeStartOt) > parseInt(payTimeEndOt)) {
          return false
        }
      }
    }
    try {
      const list = JSON.parse(JSON.stringify(muneList))
      const data = await getB2CDeliveryStatusList({ 
        shopId: shopId, t: Date.now(), 
        ...this.handleSearchOpt() // 获取搜索参数
      })
      list.forEach(gtem => {
        gtem.num = 0
      })
      if (data && data.length > 0) {
        data.forEach(item => {
          list.forEach(gtem => {
            if (+item.deliveryStatus === +gtem.status) {
              gtem.num = item.deliveryStatusCount || 0
            }
          })
        })
      }
      this.setState({ muneList: list })
    } catch(err) {

    }
  }
  // 处理统计数值
  handleStatusCountData(status) {
    const { muneList} = this.state
    const data = muneList.find(item => +item.status === +status )
    if (data && data.num) {
      return { num: data.num, className: 'num' }
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
  getdeliveryImg(deliveryStatus) {
    switch(deliveryStatus + '') {
      case '1': {
        return {
          icon: 'iconhuowuchaxun',
          label: '待拣货'
        }
      }
      case '2': {
        return  {
          icon: 'iconyijiao',
          label: '待移交'
        }
      }
      case '3': {
        return  {
          icon: 'icondaifahuo',
          label: '已发货'
        }
      }
      case '4': {
        return  {
          icon: 'iconyiquxiao1',
          label: '已取消'
        }
      }
      case '5': {
        return  {
          icon: 'iconyiwancheng',
          label: '已完成'
        }
      }
      case '6': {
        return  {
          icon: 'iconjihe',
          label: '待集结'
        }
      }
      case '7': {
        return  {
          icon: 'icontubiaolunkuo-',
          label: '待揽货'
        }
      }
      default : {
        return {
          icon: 'iconjihe',
          label: '待拣货'
        }
      }
    }
  }
  // 扫码成功后改变状态
  changeStatus() {
    const { orderList, guanLianDeliveryNoIndex } = this.state
    const i = guanLianDeliveryNoIndex
    orderList[i] = { ...orderList[i], deliveryStatus: '2' }
    this.setState({
      orderList: orderList
    })
  }
  // 改变数据
  changeVal(e, key) {
    console.log(e.detail.value)
    this.setState({ [key]: e.detail.value })
  }
  // 处理清除
  searchClose() {
    this.setState({
      payTimeStart: '', // 订单支付时间（起始）
      payTimeEnd: '', // 订单支付时间（结束）
      payDate: '', // 订单支付日期
      orderNo: '', // 订单号
      deliveryNo: ''
    }, () => {
      // setTimeout(() => {
      //   this.init()
      // }, 800)
    })
  }
  // 搜索 page
  serchPage() {
    const { showSearchPage, searchTypeList, searchType, payDate, payTimeEnd, payTimeStart, orderNo, deliveryNo } = this.state
    if (!showSearchPage) return ''
    return (
      <View className="search-box-tong pd-15 clr-III">
        <Picker className="mar-10" mode='selector' range={searchTypeList} onChange={(e) => this.changeVal(e, 'searchType')} value={searchType}>
          <View className="fs-26 clr-II shuai-xuan" >
            <Text>{searchTypeList[searchType]}</Text>
            <Text className={'iconxiala iconfont clr-III xiala-iocn'}></Text>
          </View>
        </Picker>
        {
          // 按支付时间
          searchType === 0 && (
            <View className="date-time-box fs-26">
              <Picker className="mar-10" mode='date' onChange={(e) => this.changeVal(e, 'payDate')}>
                <Text className="clr-II">
                  {payDate ? payDate : '支付日期'} &nbsp;|
                </Text>
              </Picker>
              <Picker className="mar-10" mode='time' onChange={(e) => this.changeVal(e, 'payTimeStart')} disabled={!payDate}>
                <Text className={payDate ? 'clr-II' : 'clr-III'} >
                &nbsp;{payTimeStart ? payTimeStart + ':00' : '起始时间'} - 
                </Text>
              </Picker>
              <Picker className="mar-10" mode='time' onChange={(e) => this.changeVal(e, 'payTimeEnd')} disabled={!payDate}>
                <Text className={payDate ? 'clr-II' : 'clr-III'}>
                &nbsp;{payTimeEnd ? payTimeEnd + ':00' : '结束时间'}
                </Text>
              </Picker>
            </View>
          )
        }
        {/* 订单号 */}
        {
          searchType === 1 && (
            <Input className='search-box-input fs-28 clr-III' id="keyword" value={orderNo} type='text' placeholder='请输入订单号' onInput={(e) => this.changeVal(e, 'orderNo')} onConfirm={() => this.init()} /> 
          )
        }
        {/* 发货单号 */}
        {
          searchType === 2 && (
            <Input className='search-box-input fs-28 clr-III' id="keyword1" value={deliveryNo} type='text' placeholder='请输入发货单号' onInput={(e) => this.changeVal(e, 'deliveryNo')} onConfirm={() => this.init()} /> 
          )
        }
         {/* 扫码 */}
         {
          [1, 2].includes(searchType) && <Text className={'iconsaoyisao iconfont clr-III scode-iocn'} onClick={() => this.hanleScanCodeSearch()}></Text>
        }
        {/* 删除所有 */}
        {
          <Text className={'iconbuoumaotubiao20 iconfont clr-III scode-close-iocn'} onClick={() => this.searchClose()}></Text>
        }
        <Text className={'iconsearch iconfont clr-III stock-iocn'} onClick={() => this.init() }></Text>
      </View>
    )
  }
  // 最新的扫码关联调用接口
  handleGuanScanCode(deliveryNo, i) {
    if (!this.props.canScan) {
      Taro.showToast({
        title: '初始中,稍后重试',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    this.setState({
      guanLianDeliveryNo: deliveryNo,
      guanLianDeliveryNoIndex: i
    }) 
    this.props.handleScanCode().then(res => {
      this.comfireGuanlian(res.codeVal)
    }).catch(err => {
      Taro.showToast({
        title: err.msg,
        icon: 'none',
        duration: 3000
      })
      if (err.msg.indexOf('the permission value is offline') > -1) { // 这种报错 刷新页面
        Taro.showModal({
          title: '提示',
          content: '无法扫码，请刷新页面后重试',
          confirmText: '刷新页面',
          cancelText: '关闭',
          success: (res) => {
            if (res.confirm) {
              window.location.href = window.location.origin + '/pages/index/index'
            }
          }
        })
      } else {
        Taro.showModal({
          title: '提示',
          content: '扫码关联不上，试试手动输入',
          success: (res) => {
            if (res.confirm) {
              this.setState({
                showLay: true
              })
            }
          }
        })
      }
    })
  }
  // 最新扫码搜索事件
  hanleScanCodeSearch() {
    this.props.handleScanCode().then(res => {
      const { searchType } = this.state
      const key = ['', 'orderNo', 'deliveryNo'][searchType]
      this.setState({
        [key]: res.codeVal
      }, () => {
        setTimeout(() => {
          this.init()
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
    const claNameAc = 'order-tab-item clr-II order-tab-item-acitive'
    const claName = 'order-tab-item clr-II'
    const { orderList, sellMana, muneList, current, showSearchPage } = this.state
    const { canScan } = this.props
    const nodata = orderList.length < 1 ? true : false
    const childProps = {
      comfirm: (data) => this.comfireGuanlian(data),
      close: () => this.closeLay()
    }
    // 显示/隐藏 搜索组件 porps
    const showSearch = {
      handleShowOrHide: (bl) => {
        // 关闭时初始数据
        if (!bl) {
          this.setState({
            showSearchPage: bl,
            searchType: 0, // 0 => 按支付时间 1 => 按订单号
            payTimeStart: '', // 订单支付时间（起始）
            payTimeEnd: '', // 订单支付时间（结束）
            payDate: '', // 订单支付日期
            orderNo: '', // 订单号
            deliveryNo: ''
          }, () => {
            this.init()
          })
        } else {
          this.setState({ showSearchPage: bl })
        }
      },
      show: this.state.showSearchPage
    }
    return (
        <View className='order-list-box b2c-box' id="parent">
          { this.serchPage() }
          <ScrollView scrollX className="ScrollView-Y">
            <View className="order-tab-box fs-30">
              {
                muneList && muneList.map((item, i) => {
                  const flage = current === item.status
                  return (
                    <View className={ flage ? claNameAc : claName } onClick={() => this.choseTab(item.status)} key={i}>
                      <Text className={ flage ? 'active-text' : 'tab-title'}>{item.label}</Text>
                      <Text className={ this.handleStatusCountData(item.status)['className'] + ' ' +  (flage ? 'num-active' : '')}>
                      {item.num > 99 ? 99 : item.num } 
                      </Text>
                    </View>
                  )
                })
              }
            </View>
          </ScrollView>  
          <ScrollView className={ showSearchPage ? 'scrool-box scrool-box-ot' : 'scrool-box'}  scrollY onScrollToLower={(e, h) => this.onScrollToLower(e, h)} lowerThreshold={80}>
            {
              orderList && orderList.map((item, i) => {
                const { items } = item
                const itemDetail = items[0]
                const statusText = item.shippingStatus === 'SIGN_SUCCESS' ? '配送已妥投' : '配送中'
                const extFields = itemDetail.extFields || {}
                // const shippingStatus = itemDetail.shippingStatus || null
                return (
                  <View className="product" key={i}>
                    <View className="product-status-box pd-15 h-80">
                      <View className="clr-II kkk-box">
                        {sellMana[item.sellManage] && (<View className="sell-manage fs-16 clr-w">
                          {sellMana[item.sellManage]}
                        </View>)}
                        <Text className="kkk-item">发货单号:{item.deliveryNo}</Text>
                        <View className="copy-btn clr-III" onClick={() => this.copy(item.deliveryNo)}>
                            复制
                        </View>
                      </View>
                      <Text className="clr-act">
                        {this.getdeliveryImg(item.deliveryStatus)['label']}
                      </Text> 
                    </View>
                    {/* <View className="product-status-box pd-15 clr-III b-n">
                      <Text>请在{item.expectDeliveryTimeString}之前完成打包</Text>
                      <Text>取件码：{item.pickUpCode}</Text>
                    </View> */}
                    <View className="pro-box pd-15" onClick={() => this.linkTo(item)}>
                      <Image className="pro-img" src={itemDetail.itemImgPath} mode="aspectFit" />
                      <View className="pro-item">
                      <View className="pro-name clr-II">
                        商家编码：{itemDetail.itemCode}
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
                      <Text>共{items.length}件商品</Text>
                      {items.length > 0 ? <Text onClick={() => this.linkTo(item)}>查看更多 > </Text> : '' }
                    </View>
                    {
                      +item.deliveryStatus === 1 ? (
                        <View className="tool-box pd-15">
                          <View className={canScan ? 'scan-code clr-act' : 'scan-code clr-III scan-code-ot'} onClick={() => this.handleGuanScanCode(item.deliveryNo, i)}>扫码关联</View>
                          <View className="fs-20 clr-III" onClick={() => this.setState({ showLay: true, guanLianDeliveryNo: item.deliveryNo, guanLianDeliveryNoIndex: i })}>扫码关联不上，试试手动输入</View>
                        </View>
                      ) : ''
                    }
                    {
                      [3, 5].includes(+item.deliveryStatus) ? (
                        <View className="logistics-box pd-15">
                          <View className="fs-26 clr-II logistics-box-l" >物流状态:</View>
                            { extFields.shippingCode ? (
                               <View className="fs-26 clr-II logistics-box-r" >
                                <View>{statusText} {extFields.updateTime}</View>
                                {extFields.shippingCompanyName ?<View>物流公司: {extFields.shippingCompanyName}</View> : ''}
                                {extFields.shippingCode ?<View>运单号: {extFields.shippingCode}</View> : ''}
                               </View>
                            ) : (<View className="fs-26 clr-II logistics-box-r" ><View>暂未配送</View></View>)}
                        </View>
                      ) : ''
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
          {
            this.state.showLay ? (<MaAss { ...childProps } />) : ''
          }
          <SerchBtn domid="tongcheng-id" {...showSearch} ></SerchBtn>
        </View>
    )
  }
}
