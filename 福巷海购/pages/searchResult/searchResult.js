// pages/searchResult/searchResult.js
var app = getApp()
var $ = require('../../utils/util.js');
var indexAPI = require('../../api/indexAPI.js');

Page({
  data: {
    productList: [],
    currentIndex: 0,
    showClose: true,//默认显示输入框右侧的关闭标签
    historyArr: [],//最近搜索历史,默认为空
    scposition: "", //滚动条位置,
    isPage: true,//默认不可以分页(有搜索结果)
    pageNo: 1,
    pageSize: 10,
    displayTotalCount: -1, // 总数
    classifyListArr: [],
    newKeyWords: ""
  },
  onLoad: function (options) {
    // 获取参数携带的搜索关键字,赋值给顶部搜索框
    console.log(this.data.refreshKeyWords);
    if (options) {
      var keyWords = options.keywords
    } else {
      var keyWords = this.data.refreshKeyWords;
    }
    console.log('参数', options);
    this.setData({
      keyWords: keyWords,
      newKeyWords: keyWords
    })
    console.log(this.data.keyWords);

    const val = {
      keyword: this.data.keyWords,
      pageNo: 1,
      pageSize: 10,
      pfChannelId: app.globalData.pfChannelId
    }
    this.getSearchResult(val)
  },
  onShow() {
    // 获取缓存的值，把输入的值存入本地
    const history = tt.getStorageSync('keyWordsArray') || []
    this.setData({
      historyArr: history
    })
  },
  // 点击综合搜索商品
  getProduct: function (e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentIndex: index
    })
  },
  // 输入搜索框
  inputSearch: function (e) {
    const keyWords = $.trim(e.detail.value);
    console.log(e.detail.value, keyWords);
    if (keyWords.length >= 1) {
      this.setData({
        showClose: true
      })
    } else {
      this.setData({
        showClose: false
      })
    }
    this.setData({
      keyWords: keyWords
    })
    console.log(this.data.keyWords)
  },
  // 点击确定搜索按钮
  confirmSearch: function () {
    const that = this;
    that.setData({
      newKeyWords: this.data.keyWords,
      productList: [],
      pageNo: 1
    })
    var val = {
      keyword: this.data.keyWords,
      pageNo: 1,
      pageSize: that.data.pageSize,
      pfChannelId: app.globalData.pfChannelId
    }
    this.getSearchResult(val);
    // 把搜索历史列入数组中
    if (this.data.keyWords && this.data.historyArr.indexOf(this.data.keyWords) < 0) {
      this.data.historyArr.unshift(this.data.keyWords)
      tt.setStorageSync('keyWordsArray', this.data.historyArr)
    }
  },
  // 获取商品列表
  getSearchResult: function (val) {
    console.log("获取商品列表");
    const that = this;
    indexAPI.list(val).then(res => {
      if(res.data.products.length>0){
        for(let x in res.data.products){
          res.data.products[x].price = $.keepTwoDecimalFull(res.data.products[x].price)
          res.data.products[x].originalPrice = $.keepTwoDecimalFull(res.data.products[x].originalPrice)
        }
      }
      const productList = val.pageNo == 1 ? res.data.products : [ ...that.data.productList, ...res.data.products ]
      that.setData({
        productList: productList,
        displayTotalCount: res.data.displayTotalCount
      })
      that.data.isPage = productList.length <  res.data.displayTotalCount
      tt.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    }).catch(res => {
      tt.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    })
  },

  // 搜索有结果时滑动到底部
  onReachBottom: function () {
    // 先判断是否需要加载更多
    if (this.data.isPage) {
      var pageNo = this.data.pageNo;
      pageNo++;
      this.setData({
        pageNo: pageNo
      })
      var val = {
        keyword: this.data.keyWords,
        pageNo,
        pageSize: this.data.pageSize,
        pfChannelId: app.globalData.pfChannelId
      }
      this.getSearchResult(val)
    }
  },
  // 点击输入框的关闭，清空输入框数据
  close: function () {
    this.setData({
      keyWords: ""
    })
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    this.setData({
      refreshKeyWords: this.data.keyWords,
      pageNo:1
    })
    this.onLoad()
  },
  // 跳转到商品详情页面
  getProdDetail: function (e) {
    const id = e.currentTarget.dataset.id;
    const link = e.currentTarget.dataset.link
    tt.navigateTo({
      url: '/pages/producrdetail/producrdetail' + "?id=" + id + '&from=copy_code&link=' + link,
    })
  },
  // 复制订单编号
  copyText: function (e) {
      tt.setClipboardData({
          data: e.currentTarget.dataset.text,
          success: function (res) {
              tt.showToast({
                  title: '复制成功'
              })
          }
      })
  }
})

