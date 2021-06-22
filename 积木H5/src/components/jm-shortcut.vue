<template>
  <div class="shortcutBox">
    <ul class="shortcut">
      <li :key="index"
          v-for="(item,index) in shortcut">
        <div @click="share()"
             class="iconfont"
             v-if="item == 0">&#xe603;</div>
        <div @click="cart()"
             class="iconfont fontSize"
             v-else-if="item == 1">&#xe580;</div>
        <div @click="backTop()"
             class="iconfont"
             v-else-if="item == 2">&#xe661;</div>
      </li>
    </ul>
    <!-- <div class="templateImg"
         ref="imageTofile"
         id="imageTofile">
      <img :src="bgImg"
           alt=""
           class="bgImg">
      <div class="usderData">
        <div class="fillet"
             v-if="headIcon">
          <img :src="headIcon"
               alt="">
        </div>
        <div class="filletName"
             v-if="names">
          <span>{{names}}</span></div>
      </div>
      <img :src="posterimgUrl"
           class="codeImg"
           alt=""
           crossOrigin="anonymous">
    </div>
    <div @click="showsShareImg = false"
         class="popupRules"
         ref="ShareImgBox"
         v-if="showsShareImg">
      <img :src="htmlUrl"
           alt=""
           class="cavasImg">
    </div> -->
    <cube-popup type="my-popup"
                ref="myPopup">
      <div class="home-loading">
        <cube-loading></cube-loading> 加载中...
      </div>
    </cube-popup>
    <div @click="showsShareImg = false"
         class="popupRules"
         v-show="showsShareImg">
        <img :src="htmlUrl"
             alt=""
             class="cavasImg">
    </div>
  </div>
</template>
<script>
// import pageJson from '@/mockData/jmPage.json'
import Wx from 'weixin-js-sdk'
import { getUrlParam, throttle } from '@/libs/common'
import html2canvas from 'html2canvas'
export default {
  name: 'jm-shortcut',
  props: {
    speedy: {
      type: Array
    }
  },
  data () {
    return {
      shortcut: null,
      htmlUrl: null,
      BASE_URL: process.env.VUE_APP_BUS_URL,
      IMG_URL: 'https://phpapplication.topgoods.mobi/php-application-api',
      CHANNEL_ID: getUrlParam('CHANNEL_ID'),
      codeImg: '',
      bgImg: '/img/images/tab-shop.png',
      showsShareImg: false, // 分享图隐藏
      darenId: getUrlParam('darenId'),
      userId: getUrlParam('userId'),
      posterimgUrl: null,
      headIconImg: null,
      headIcon: getUrlParam('icon') ? decodeURIComponent(getUrlParam('icon')) : '',
      nickname: getUrlParam('darenName') ? decodeURIComponent(getUrlParam('darenName')) : '',
    }
  },
  created () {
    this.CHANNEL_ID = this.CHANNEL_ID ? Number(this.CHANNEL_ID) : this.CHANNEL_ID
    if (this.CHANNEL_ID > 33 && this.CHANNEL_ID !== 48) this.BASE_URL = process.env.VUE_APP_BUSPro_URL
    if (this.CHANNEL_ID >= 34) this.IMG_URL = 'https://phpapplication2.topgoods.mobi/php-application-api'
    this.shortcut = this.$parent.speedy
    this.bgImg = this.$parent.specialContent.shareBgImg
    console.log(this.bgImg)
    this.htmlUrl = this.IMG_URL + '/index.php?s=/Api/ApiImage/dm.html&nickname=' + this.nickname +
      '&headIcon=' + this.headIcon + '&baseUrl=' + this.BASE_URL + '&darenId=' + this.darenId +
      '&page=pages/index/index&pfChannelId=' + this.CHANNEL_ID + '&banner=' + this.bgImg + '&id=' + 119
    // this.codeImg =
    //   this.BASE_URL +
    //   '/weixin/imageCtrl/getminiqrQr?scene=0&page=pages/index/index&width=300&pfChannelId=' +
    //   this.CHANNEL_ID +
    //   '&darenId=' +
    //   this.darenId
    // this.img2base64(this.codeImg).then(res => {
    //   this.posterimgUrl = res
    // }).catch(err => {
    //   console.log(err)
    // })
    // if (this.headIcon) {
    //   this.img2base64(this.headIcon).then(res => {
    //     this.headIconImg = res
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // }
  },
  watch: {
    showsShareImg (newVal, oldVal) {
      if (newVal) {
        // this.$refs.myPopup.show()
      } else {
        this.$refs.myPopup.hide()
      }
    }
  },
  methods: {
    share: throttle(function () {
      this.showTip()
      this.showsShareImg = true
      // this.draw()
    }),
    cart: throttle(function () {
      if (
        this.userId === '' ||
        this.userId === 'undefined' ||
        this.userId === false ||
        this.userId === null
      ) {
        Wx.miniProgram.navigateTo({
          url: '/pages/login/login'
        })
      } else {
        if ( this.CHANNEL_ID && this.CHANNEL_ID === 51) {
          Wx.miniProgram.navigateTo({
            url: '/pages/cart/cart-tab'
          })
        } else {
          Wx.miniProgram.switchTab({
            url: '/pages/cart/cart-tab'
          })
        }

      }
    }),
    draw () {
      let imageTofile = document.getElementById('imageTofile')
      let w = imageTofile.offsetWidth
      let h = imageTofile.offsetHeight
      let canvas = document.createElement('canvas')
      let scale = this.DPR()
      canvas.width = w * scale
      canvas.height = h * scale
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      // canvas.getContext('2d').scale(scale, scale)
      let opts = {
        scale: scale, // 添加的scale 参数
        canvas: canvas, // 自定义 canvas
        logging: true, // 日志开关，便于查看html2canvas的内部执行流程
        width: w, // dom 原始宽度
        height: h,
        useCORS: true, // 【重要】开启跨域配置
        allowTaint: true,
        proxy: '/weixin/imageCtrl/getminiqrQr'
      }

      html2canvas(imageTofile, opts).then(canvass => {
        let context = canvas.getContext('2d')
        context.scale(scale, scale)
        // 【重要】关闭抗锯齿
        // context.mozImageSmoothingEnabled = false
        // context.webkitImageSmoothingEnabled = false
        // context.msImageSmoothingEnabled = false
        // context.imageSmoothingEnabled = false
        // let img = Canvas2Image.convertToJPEG(
        //   canvass,
        //   canvass.width,
        //   canvass.height
        // )
        // let ShareImgBox = this.$refs.ShareImgBox
        // ShareImgBox.appendChild(img)
        // img.style.width = canvass.style.width
        // img.style.height = canvass.style.height
        this.toast.hide()
        this.htmlUrl = canvas.toDataURL('image/png')
      })
    },
    backTop () {
      this.$emit('backTop', 0)
    },
    DPR () {
      if (window.devicePixelRatio && window.devicePixelRatio > 1) {
        return window.devicePixelRatio
      }
      return 1
    },
    showTip () {
      this.toast = this.$createToast({
        txt: 'Loading...',
        type: 'txt',
        zIndex: 9999,
        time: 0
      })
      if (!this.htmlUrl) {
        this.toast.show()
      }
    },
    loadImage (e) {
      const base64 = this.img2base64(this.codeImg);
      this.posterimgUrl = base64
    },
    img2base64 (url, crossOrigin) {
      return new Promise(resolve => {
        const img = new Image();
        img.setAttribute('crossOrigin', 'Anonymous')
        img.src = url
        img.onload = () => {
          const c = document.createElement('canvas');

          c.width = img.naturalWidth;
          c.height = img.naturalHeight;

          const cxt = c.getContext('2d');

          cxt.drawImage(img, 0, 0);
          // 得到图片的base64编码数据
          resolve(c.toDataURL('image/png'));
        };
      });
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../styles/index.styl'
.shortcut
  position fixed
  bottom 88px
  right 12px
  z-index 999
.shortcut li
  margin-bottom 23px
.shortcut li:nth-last-of-type(1)
  margin-bottom 0
.shortcut li div
  width 38px
  height 38px
  line-height 38px
  text-align center
  background-color #808080
  border-radius 38px
  color #fff
.fontSize
  font-size 25px
  line-height 25px
.popupRules
  width 100%
  height 100%
  position fixed
  top 0
  background-color RGBA(0, 0, 0, 0.5)
  background RGBA(0, 0, 0, 0.5)
  display flex
  justify-content center
  // align-items: flex-start;
  align-items center
  // flex-direction: column;
  z-index 9999
.popupRules .cavasImg
  width 260px
  height 360px
.templateImg
  position fixed
  bottom 370px
  width 260px
  height 360px
  z-index -9999
.templateImg .bgImg
  width 260px
  height 360px
  position absolute
  top 0px
  left 0px
.templateImg .codeImg
  height 60px
  width 60px
  position absolute
  bottom 10px
  right 10px
.usderData
  display flex
  justify-content flex-start
  position absolute
  left 5px
  top 5px
  font-size 12px
  line-height 25px
.fillet
  width 28px
  height 28px
  background-color #E7E5E5
  border-radius 28px
  position relative
  z-index 1
  display flex
  justify-content center
  align-items center
.fillet>img
  border-radius 50%
  width 80%
  height 80%
.filletName
  position absolute
  bottom 0
  left 14px
  height 18px
  width 90px
  border-radius 0 18px 18px 0
  background-color #E7E5E5
  font-size 10px
  line-height 18px
  padding-right 2px
  overflow hidden
.filletName span
  margin-left 15px
  /* 禁止文本长按 */
  -webkit-user-select none
  -khtml-user-select none
  -moz-user-select none
  -ms-user-select none
  user-select none
</style>
