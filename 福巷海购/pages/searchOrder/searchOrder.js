
var $ = require('../../utils/util.js');
const dialog = require('../../lib/dialog.js');
Page({
  data: {
    isSearch: false,//默认搜索框右侧显示的是取消,
    historyArr: [],//最近搜索历史,默认为空
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
        keyWords: keyWords
      })
    } else {
      this.setData({
        isSearch: false
      })
    }
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
      $.gopage("/pages/searchOrderResult/searchOrderResult?keywords=" + this.data.keyWords);
      //  获取输入的值，存入缓存中
      this.data.historyArr.unshift(this.data.keyWords)
      const newHistoryArr = this.data.historyArr;
      $.setCache("keyWordsByOrder", newHistoryArr, function (res) {
        console.log(res)
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
      isSearch: false
    })
    // 获取缓存的值，把输入的值存入本地
    $.getCache("keyWordsByOrder", function (res) {
      console.log(res.data)
      // 数组去重
      var historyArr = $.uniq(res.data).slice(0, 10);
      console.log(historyArr)
      that.setData({
        historyArr: historyArr
      })
      if (that.data.historyArr.length > 0) {
        that.setData({
          showHistory: true
        })
      } else {
        that.setData({
          showHistory: false
        })
      }
    }, function (err) {
      console.log(err)
      // 说明没有获取到缓存，不做处理
    });
  },
  // 清空历史记录
  clearHistory: function () {
    const that = this;
    $.confirm("确认清除历史记录吗", function (res) {
      if (res.confirm) {
        that.setData({
          historyArr: [],
          showHistory: false
        })
        $.setCache("keyWordsByOrder", that.data.historyArr, function (data) {
          console.log(data);
        })
      }

    }, true)

  },
  // 点击历史记录中的某一条进入搜索
  searchByHistory: function (e) {
    const keywordIndex = e.currentTarget.dataset.index;
    console.log(keywordIndex);
    const historyArr = this.data.historyArr;
    for (var i = 0; i < historyArr.length; i++) {
      if (i == keywordIndex) {
        this.setData({
          keyWords: historyArr[i],
          isSearch: true
        })
      }
    }
  }
})