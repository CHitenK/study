<template>
  <div id="FooterTabbar">
    <ul class="nav_bar">
      <!--            <img src="../assets/images/nav-cart.png" alt="">-->
      <li class="active"
          @click="clickHandler('/pages/index/index')">
        <!--            <img :src="CHANNEL_ID == 36?'../assets/images/nav-index-activated.png':'../assets/images/tab-index-activated.png'" alt="首页">-->
        <img src='../assets/images/nav-index-activated.png'
             v-if="CHANNEL_ID == 36 || CHANNEL_ID == 20"
             alt="">
        <img src='../assets/images/tab-index-activated.png'
             v-else
             alt="">
        <p :class="CHANNEL_ID == 36 || CHANNEL_ID == 20?'blue':''">商城首页</p>
      </li>
      <!-- <li @click="clickHandler('/pages/shopSelection/index')" v-if="CHANNEL_ID == 12 || CHANNEL_ID == 24 || CHANNEL_ID == 27 || CHANNEL_ID == 28 || CHANNEL_ID == 38 || CHANNEL_ID == 40 || CHANNEL_ID == 42 || CHANNEL_ID == 44 || CHANNEL_ID == 47">
            <img src="../assets/images/tab-shop.png" alt="店铺精选">
            <p>店铺精选</p>
          </li> -->
      <li @click="clickHandler(CHANNEL_ID == 36 || CHANNEL_ID == 20 ? '/pages/classify/classify':'/pages/classification/classification')" v-if="CHANNEL_ID !== 19">
        <img src="../assets/images/nav-classify.png"
             alt="商品分类">
        <p>{{CHANNEL_ID == 36 || CHANNEL_ID == 20?'分类':'商品分类'}}</p>
      </li>
<!--      待增加店铺精选-->
<!--      <li @click="clickHandler('/pages/classification/classification')"-->
<!--          v-if="CHANNEL_ID != 36">-->
<!--        <img src="../assets/images/tab-classify.png"-->
<!--             alt="分类">-->
<!--        <p>分类</p>-->
<!--      </li>-->
      <li @click="clickHandler('/pages/trends/trends/trends')"
          v-if="CHANNEL_ID == 36 || CHANNEL_ID == 20">
        <img src="../assets/images/meimasaid0.png"
             alt="美妈说">
        <p>美妈说</p>
      </li>
      <li @click="clickHandler('/pages/cart/cart-tab')">
        <img src="../assets/images/nav-cart.png"
             alt="购物车"
             v-if="CHANNEL_ID == 36 || CHANNEL_ID == 20">
        <img src="../assets/images/tab-cart.png"
             alt="购物车"
             v-else>
        <p>购物车</p>
      </li>
      <li @click="clickHandler(CHANNEL_ID == 36 || CHANNEL_ID == 20 ? '/pages/me/personalCenter' : '/pages/me/me')">
        <img src="../assets/images/nav-me.png"
             alt="我的"
             v-if="CHANNEL_ID == 36 || CHANNEL_ID == 20">
        <img src="../assets/images/tab-me.png"
             alt="我的"
             v-else>
        <p>我的</p>
      </li>
    </ul>
  </div>
</template>
<script>
import Wx from 'weixin-js-sdk';
import { getUrlParam } from '@/libs/common'
export default {
  name: 'FooterTabbar',
  data () {
    return {
      selectedLabelDefault: '商城首页',
      CHANNEL_ID: getUrlParam('CHANNEL_ID')
    };
  },
  methods: {
    clickHandler (label) {
      if (window.__wxjs_environment === 'miniprogram') {
        Wx.miniProgram.switchTab({
          url: label
        });
      } else {
        console.log('请在微信浏览器里打开');
      }

    }
  }
};
</script>
<style lang="stylus">
.nav_bar
  position fixed
  bottom 0
  left 0
  z-index 999
  width 100%
  background-color #fff
  display flex
  align-items center
  height 44px
.nav_bar li
  flex 1
.nav_bar li img
  display block
  width 25px
  margin 0 auto
.nav_bar li p
  text-align center
  color #333
  font-size 12px
.nav_bar .active p
  color #fe4947
.nav_bar .active p.blue
  color #0077c9
</style>
