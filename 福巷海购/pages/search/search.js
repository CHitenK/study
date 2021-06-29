// pages/search/search.js
var $ = require('../../utils/util.js');
const dialog = require('../../lib/dialog.js');
Page({
  data: {
    isSearch: false,//默认搜索框右侧显示的是取消,
    historyArr: [],//最近搜索历史,默认为空
    IsCancel:false,
  },
  onLoad: function (options) {

  },
  // 输入搜索关键字
  inputSearch: function (e) {
    const keyWords = $.trim(e.detail.value);
    // console.log(keyWords);
    if (keyWords.length >= 1) {
      this.setData({
        isSearch: true,
        IsCancel:true,
        keyWords: keyWords
      })
    } else {
      this.setData({
        isSearch: false
      })
    }
  },
  /***
   * 清除输入框
   */
  CancelText:function(){
    var that = this;
    console.log(22222)
    that.setData({
      keyWords:'',
      IsCancel:false
    })
  },
  // 点击搜索框右侧的取消
  cancel: function () {
    // 返回首页
    $.backpage(1)
  },
  // 点击搜索，跳转到搜索结果页面
  toSearch: function () {
    if ($.trim(this.data.keyWords) == "") {
      dialog.alert("请输入关键字");
      return;
    } else {
      
      //  获取输入的值，存入缓存中
      if (this.data.keyWords.indexOf() < 0) {
        this.data.historyArr.unshift(this.data.keyWords)
        tt.setStorageSync('keyWordsArray', this.data.historyArr)
      }
      tt.navigateTo({
        url: "/pages/searchResult/searchResult?keywords=" + this.data.keyWords
      })
    }

  },
  // 点击了软键盘的确认搜索按钮
  confirmSearch: function () {
    this.toSearch()
  },
  onShow: function () {
    const that = this;
    that.setData({
      keyWords: "",
      isSearch: false,
      IsCancel:false
    })
    // 获取缓存的值，把输入的值存入本地
    const history = tt.getStorageSync('keyWordsArray') || []
    that.setData({
      historyArr: history
    })
  },
  // 清空历史记录
  clearHistory: function () {
    const that = this;
    $.confirm("确认清除历史记录吗", function (res) {
      if (res.confirm) {
        that.setData({
          historyArr: []
        })
        tt.setStorageSync('keyWordsArray', [])
      }
    }, true)

  },
  // 点击历史记录中的某一条进入搜索
  searchByHistory: function (e) {
    const keywordIndex = e.currentTarget.dataset.index;
    const historyArr = this.data.historyArr;
    for (var i = 0; i < historyArr.length; i++) {
      if (i == keywordIndex) {
        this.setData({
          keyWords: historyArr[i],
          isSearch: true
        })
       setTimeout(()=>{
          $.gopage("/pages/searchResult/searchResult?keywords=" + this.data.keyWords);
       },500)
      }
    }
  }
})