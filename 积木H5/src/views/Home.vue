<template>
  <div class="home"
       v-landingPageTitle
       :data-page-title="pageTitle">
    <cube-popup type="my-popup"
                ref="myPopup">
      <div class="home-loading">
        <cube-loading></cube-loading> 加载中...
      </div>
    </cube-popup>
    <section :class="titleIndex ? 'scroll-list-wrapnav' : 'scroll-list-wrap'"
             :style="styleObject">
      <jm-sticky :pos="scrollOption"
                 :offset="offsetNum"
                 :showNav="currentKey"
                 @fixedEleHeight="getFixedEleHeight"
                 ref="jmSticky">
        <cube-scroll ref="scroll"
                     :scroll-events="scrollEvents"
                     @scroll="onScrollHandle"
                     :options="options">
          <child-wrapper :childData="content"
                         :scrollY="scrollOption"
                         :specialId="specialId"
                         :clickNavName="currentKey"
                         @dom-over="offsetChange"
                         @clickNav="clickNav"
                         @changeNav="changeNav"
                         v-if="content"></child-wrapper>
        </cube-scroll>
      </jm-sticky>
    </section>
<!--    小程序底栏-->
    <FooterTabbar v-if="specialContent && specialContent.titleIndex" />
<!--    快捷导航-->
    <jmShortcut @backTop='backTop'
                v-if='speedy'
                :speedy="speedy" />
    <jmcouponPopup/>
    <!--        <cube-popup type="my-popup" ref="homeLoading">-->
    <!--            <cube-loading :size="40"></cube-loading>-->
    <!--        </cube-popup>-->
<!--    楼层分享触发图片-->
    <img src="../assets/images/shareFloor.png"
         class="shareFloor"
         @click="toShare()"
         v-show="ShareClickShow">
<!--    点击楼层时懒加载触发图片-->
    <img class="clickFloor"
         src="https://img.e111.com.cn/group1/M00/02/9E/Cg1F-V6Vgg2AfxRbAAAAkLu9mGo902.png"
         alt=""
         v-show="showClickNav">
    <!--    专题楼层分享图片-->
    <div class="shareBackgroud"
         @click="isShowShareImg = false"
         v-show="isShowShareImg">
      <div class="floorShareImgBox"
           :key="index"
           v-for="(item,index) in floorShareImg"
           v-show="ShareNum === index">
        <img :src="item"
             alt="">
      </div>
    </div>
  </div>
</template>

<script>
// import mockData from '@/mockData/jmPage.json'
import JmSticky from '../components/jm-sticky'
import childWrapper from '@/components/childwrapper.vue'
import FooterTabbar from '@/components/FooterTabbar.vue'
import { fetchPageInfo } from '../api/jmPageConfig'
import jmShortcut from '../components/jm-shortcut'
import { ease } from '../libs/ease'
import { getUrlParam } from '@/libs/common'
import jmcouponPopup from '../components/jm-couponPopup'
export default {
  data () {
    return {
      specialId: '', // 专题id
      specialContent: null,
      pageTitle: '', // 专题标题
      styleObject: {
        backgroundColor: '', // 专题背景颜色
        backgroundImage: '', // 专题背景图片
        backgroundRepeat: 'repeat', // 背景图片平铺
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      },
      content: null,
      speedy: null, // 快捷导航配置
      isShowNav: false,
      offsetNum: 0, // 滚动偏移值 具体看文档
      options: { // better-scroll 配置项
        startY: 0,
        bounce: {
          top: false,
          bottom: false,
          left: false,
          right: false
        },
        useTransition: false
      },
      scrollEvents: ['scroll', 'scroll-end'],
      scrollOption: 0,
      scrollToY: 0,
      scrollToTime: 700,
      scrollToEasing: 'bounce',
      childData: null,
      currentKey: '',
      isShowMuch: null,
      floorShareImg: [],
      CHANNEL_ID: null,
      headIcon: getUrlParam('icon') ? decodeURIComponent(getUrlParam('icon')) : '',
      darenId: getUrlParam('darenId'),
      darenName: getUrlParam('darenName') ? decodeURIComponent(getUrlParam('darenName')) : '',
      BASE_URL: process.env.VUE_APP_BUS_URL,
      IMG_URL: 'https://phpapplication.topgoods.mobi/php-application-api',
      isShowShareImg: false,
      ShareClickShow: false, // 楼层分享
      isInFloor: false,
      navTop: 0,
      shareNav: null,
      ShareNum: 0,
      pointNullShow: null, // 是否显示分享本楼层按钮
      titleIndex: false,
      showClickNav: false // 触发图片懒加载
    };
  },
  components: {
    childWrapper,
    JmSticky,
    FooterTabbar,
    jmShortcut,
    jmcouponPopup
  },
  computed: {},
  watch: {
    isShowShareImg (newVal, oldVal) {
      if (newVal) {
        // this.$refs.myPopup.show()
      } else {
        // this.$refs.myPopup.hide()
      }
    }
  },
  methods: {
    onScrollHandle (pos) { // 滚动事件
      this.ShareClickShow = false
      this.scrollOption = -pos.y;
      // console.log(pos.y, this.navTop)
      if (this.navTop && (-pos.y > this.navTop)) {
        this.isInFloor = true
        if (this.pointNullShow) {
          this.setTime(true)
        } else {
          this.setTime(false)
        }
      } else {
        this.setTime(false)
        this.isInFloor = false
      }
    },
    offsetChange (offset, pre, arr, stickyHeight) {// 全部请求加载完成
      this.childData = this.formatChildData(arr)
      // 添加营业执照组件
      if (this.titleIndex) {
        let license = {
          businessData: null,
          items: null,
          componentsId: '019',
          name: 'jm-license',
          label: 'license',
          uuid: null,
          }
        this.childData.push(license)
      }
      let navInfo = this.childData.find(p => p.name === 'jm-nav')
      this.navTop = navInfo ? navInfo.top : 0
      this.$refs.jmSticky.refresh()
      // this.$refs.myPopup.hide()
      this.stickyHeight = stickyHeight
      this.filterShareInfo(this.childData)
      if (getUrlParam('goAnchor')) {
        this.goNavTop(getUrlParam('goAnchor'), stickyHeight)
      }
    },
    getBatchBlock (id) { // 请求积木页面配置数据
      let special = { specialId: id }
      fetchPageInfo(special).then(res => {
        this.isShowMuch = res.data.isShowMuch
        this.CHANNEL_ID = res.data.pfChannelId
        this.specialContent = res.data
        this.pageTitle = res.data.title
        this.speedy = res.data.speedy && res.data.speedy.handle ? res.data.speedy.handle : null
        this.content = res.data.pages.content
        this.titleIndex = res.data.titleIndex
        this.styleObject.backgroundColor = res.data.coverColor
        this.styleObject.backgroundImage = res.data.coverImageUrl ? `url(${res.data.coverImageUrl})` : '';
      }).catch(err => {
        console.log(err, 'fetchPageInfo')
      })
    },
    changeNav (e) { // 切换锚点事件
      if (e.idx === 0) {
        this.currentKey = e.name
      }
      if (!this.shareNav) {
        return
      }
      let item = this.shareNav.find(p => (p.name === e.name) && p.floorShareImg)
      this.pointNullShow = item
      for (let i = 0; i < this.shareNav.length; i++) {
        if (e.name === this.shareNav[i].name) {
          this.ShareNum = e.idx
        }
      }
    },
    backTop () { // 回到顶部
      document.body.scrollTop = 0
      this.currentKey = ''
      this.scrollTop()
    },
    scrollTop () {
      this.$refs.scroll.scrollTo(
        0,
        this.scrollToY,
        this.scrollToTime,
        ease[this.scrollToEasing]
      )
    },
    clickNav (i, h, label) { // 点击锚点事件
      let item = { ...i }
      // console.log(label, 'homeTest================', item, h)
      this.showClickNav = true
      let itemClick
      if (this.shareNav) {
        itemClick = this.shareNav.find(p => (p.name === label) && p.floorShareImg)
      }
      this.pointNullShow = false
      if (item.top) {
        this.$refs.scroll.scrollTo(
          0,
          -item.top + this.stickyHeight,
          150,
          ease['swipeBounce']
        )
        setTimeout(() => {
          this.currentKey = label
          // this.showClickNav = false
          // alert(JSON.stringify(item))
          if (this.shareNav && itemClick) {
            this.pointNullShow = itemClick
            if (this.pointNullShow) {
              this.setTime(true)
            } else {
              this.setTime(false)
            }
          }
        }, 500)
        setTimeout(()=>{
          this.showClickNav = false
        },1500)
      }
    },
    showPopup (refId) {
      const component = this.$refs[refId]
      component.show()
    },
    hidePopup (refId) {
      const component = this.$refs[refId]
      component.show()
    },
    formatChildData (arr) { // 格式化 页面配置 更新组件对应的modelName
      let firstIdx = arr.findIndex(p => p.modelName)
      let flagIdx = arr.findIndex(p => p.modelName)
      if (!firstIdx || firstIdx < 0) {
        return arr
      }
      for (let i = 0; i <= arr.length; i++) {
        if (i > firstIdx && arr[i] && !arr[i].modelName) {
          arr[i].modelName = arr[flagIdx].modelName
        } else if (i > firstIdx && arr[i] && arr[i].modelName && arr[i].modelName !== arr[flagIdx].modelName) {
          flagIdx = i
        }
      }
      return arr
    },
    filterShareInfo (arr) { // 筛选分享图，生成数组
      let info = [...arr]
      let navInfo = info.find(p => p.name === 'jm-nav')
      let shareInfo = info.filter(p => (p.name === 'jm-products') && p.modelName && p.businessData && p.businessData.floorShareImg)
      if (navInfo && navInfo.businessData && navInfo.businessData.useLabels && navInfo.businessData.useLabels.length > 0 && shareInfo && shareInfo.length > 0) {
        let shareNav = []
        let k = null
        console.log(shareInfo)
        for (let i = 0; i < navInfo.businessData.useLabels.length; i++) {
          let item = {}
          item.name = navInfo.businessData.useLabels[i]
          shareNav.push(item)
          for (let j = 0; j <= shareInfo.length; j++) {
            if (shareInfo[j] && navInfo.businessData.useLabels[i] === shareInfo[j].modelName) {
              if (i !== k) { // 当同一个类目时，取第一个
                shareNav[i].activityType = shareInfo[j].businessData.actType
                shareNav[i].floorShareImg = shareInfo[j].businessData.floorShareImg
                shareNav[i].ids = shareInfo[j].KjProduct.map(p => p.id)
                shareNav[i].sharePriceName = shareInfo[j].businessData.sharePriceName
                shareNav[i].showProNum = Number(shareInfo[j].businessData.showProNum)
              }
              k = i
            }
          }
        }
        console.log(shareNav, '=========================')
        this.shareNav = shareNav
        this.shareUrl()
        this.shareUrlAssignment(shareNav)
      }
    },
    shareUrl () {
      if (this.CHANNEL_ID > 33 && this.CHANNEL_ID !== 48) {
        this.BASE_URL = process.env.VUE_APP_BUSPro_URL;
      }
    },
    shareUrlAssignment(shareNav) {
       let posterId = 88 // 88:三列九图 89:两列四图 90: 三列三图
        for (let z = 0; z < shareNav.length; z++) {
          if (shareNav[z].ids) {
            if (this.shareNav[z].showProNum > 9) {
              this.shareNav[z].ids = this.shareNav[z].ids.slice(0, 9)
              posterId = 88
            } else if (this.shareNav[z].showProNum < 9 && this.shareNav[z].showProNum > 4) {
              this.shareNav[z].ids = this.shareNav[z].ids.slice(0, 4)
              posterId = 89
            } else if (this.shareNav[z].showProNum < 5) {
              this.shareNav[z].ids = this.shareNav[z].ids.slice(0, 3)
              posterId = 90
            }
            if (!this.shareNav[z].sharePriceName) {
              this.shareNav[z].sharePriceName = '活动价'
            }
            if (this.shareNav[z].activityType === 'bargainActivity') {
                this.shareNav[z].activityType = 2
            } else if (this.shareNav[z].activityType === 'hotActivity') {
                this.shareNav[z].activityType = 3
            } else {
                this.shareNav[z].activityType = 1
            }
            this.floorShareImg.push(this.IMG_URL + '/index.php?s=/Api/ApiImage/dm.html&nickname=' + this.darenName +
              '&headIcon=' + this.headIcon + '&baseUrl=' + this.BASE_URL + '&darenId=' + this.darenId +
              '&page=pages/index/index&productIds=' + this.shareNav[z].ids + '&activityType=' + this.shareNav[z].activityType + '&pfChannelId=' + this.CHANNEL_ID + '&banner=' + this.shareNav[z].floorShareImg + '&priceName=' + this.shareNav[z].sharePriceName + '&id=' + posterId)
          } else {
            this.floorShareImg.push(null)
          }
        }
    },
    toShare () {// 展示分享图
      if (this.floorShareImg) {
        this.isShowShareImg = true
      }
    },
    setTime (BE) {
      let myDelay = setTimeout(() => {
        this.ShareClickShow = BE
        clearTimeout(myDelay);
      }, 200);
    },
    goNavTop (label,h) {
      let item = this.childData.find(p => (p.modelName === label))
      if (!item) {
        return
      }
      this.showClickNav = true
      let itemClick
      if (this.shareNav) {
        itemClick = this.shareNav.find(p => (p.name === label) && p.floorShareImg)
      }
      this.pointNullShow = false
      if (item.top) {
        this.$refs.scroll.scrollTo(
                0,
                -item.top + h,
                50,
                ease['swipeBounce']
        )
        setTimeout(() => {
          this.currentKey = label
          // this.showClickNav = false
          // alert(JSON.stringify(item))
          if (this.shareNav && itemClick) {
            this.pointNullShow = itemClick
            if (this.pointNullShow) {
              this.setTime(true)
            } else {
              this.setTime(false)
            }
          }
        }, 500)
        setTimeout(()=>{
          this.showClickNav = false
        },1500)
      }
    },
    getFixedEleHeight (e) {
      this.stickyHeight = e
    }
  },
  created () { // 生命周期
    console.log(Date.now(), '999--------------77')
    // this.showPopup('homeLoading')
    if (this.$route.params && this.$route.params.id) {
      this.specialId = this.$route.params.id
      this.getBatchBlock(this.$route.params.id)
    }
    if (this.CHANNEL_ID >= 34) this.IMG_URL = 'https://phpapplication2.topgoods.mobi/php-application-api'
    if (this.CHANNEL_ID >= 34) this.BASE_URL = process.env.VUE_APP_BUSPro_URL
  },
  mounted () { // 生命周期
  console.log(Date.now(), '999--------------99')
    // this.$refs.myPopup.show()
  }
};
</script>
<style lang="stylus">
html, body, .home
  width 100%
  height 100vh
.scroll-list-wrap
  height 100%
.scroll-list-wrapnav
  height calc(100vh - 44px) !important
.clickFloor
  width 2px
  height 2px
  position fixed
  left 0
  top 30%
  z-index 9
  transform translateX(-50%)
  animation move 1s
.shareFloor
  width 75px
  position fixed
  left 50%
  top 30%
  z-index 9
  transform translateX(-50%)
  animation move 2s
@keyframes move
  from
    opacity 0
    top 10%
  to
    opacity 1
    top 30%
.shareBackgroud
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background rgba(0, 0, 0, 0.5)
  z-index 999
.floorShareImgBox
  width 300px
  height 600px
  position absolute
  left 50%
  top 50%
  transform translate(-50%, -50%)
  display flex
  justify-content center
  align-items center
.floorShareImgBox img
  width auto
  height auto
  max-width 100%
  max-height 100%
</style>
