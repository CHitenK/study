<template>
  <div
    @click="showToastTxtOnly"
    class="couponbox"
    ref="coupon"
    style="padding: 0"
    v-if="timeRlue"
  >
    <img :src="couponImg" @load="imgBackLoad" class="img" />
    <img :src="drawImg" alt class="userMaxLimit" v-show="drawImgType && userMaxLimit" />
    <img :src="distributeImg" alt class="couponsMax" v-show="distributeType && couponsMax" />
  </div>
</template>
<script>
// import pageJson from '@/mockData/jmPage.json';
import { getJmBusinessData } from '@/api/jmPageConfig'
import { activityGetCoupon, couponContent, findCouponsById} from '@/api/jmBusinessApi'
import { getUrlParam, throttle } from '@/libs/common'
import qs from 'qs'
import Wx from 'weixin-js-sdk'

export default {
  name: 'jm-coupon',
  props: {
    specialId: {
      type: String,
      required: true
    },
    componentsId: {
      type: Number,
      required: true
    },
    businessData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      listItem: {},
      couponImg: null,
      templateId: null,
      drawImg: null, // 领取完图
      drawImgType: 0,
      distributeImg: null, // 派发完图
      distributeType: 0,
      timeRlue: false, // 显示时间
      userMaxLimit: false, // 领取上限
      couponsMax: false, // 派发完
      userId: getUrlParam('userId'),
      pfChannel: getUrlParam('CHANNEL_ID'),
      flage: true
    }
  },
  created() {
    this.getJmBusinessBannerByProps(this.businessData)
  },
  methods: {
    showToastTxtOnly: throttle(function() {
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
          let couponId = {}
          couponId.templateId = this.templateId
          couponId.pfChannelId = this.pfChannel
          findCouponsById(couponId)
            .then(res => {
              if (res.data.receiveType && res.data.receiveType === 'OneYuanPurchase') {
                Wx.miniProgram.navigateTo({
                  url: `/pages/index/oneyuanBuy/oneyuanBuy?templateId=${this.templateId}`
                })
                console.log(this.templateId,'跳转成功了！！！')
              } else {
                this.receiveCoupon()
              }
            })
            .catch(err => {
              this.showTip(err.msg || '领取失败')
            })
        }
    }),
    showTip(data) {
      this.toast = this.$createToast({
        txt: data,
        type: 'txt',
        time: 1600
      })
      this.toast.show()
    },
    imgBackLoad(e) {
      if (!this.listItem[this.componentsId]) {
        this.listItem[this.componentsId] = this.$el.offsetHeight
        this.$emit('offsetHeightBack', this.listItem)
      }
    },
    getJmBusinessBanner(specialId, componentsId) {
      let getData = {}
      getData.specialId = specialId
      getData.uuid = componentsId
      getJmBusinessData(getData)
        .then(res => {
          this.couponImg = res.data.img
          this.drawImg = res.data.drawImg
          this.drawImgType = res.data.drawImgType
          this.distributeImg = res.data.distributeImg
          this.distributeType = res.data.distributeType
          this.templateId = Number(res.data.id)
          this.couponCon(this.templateId, this.userId)
          if (!this.drawImgType || !this.distributeType) {
            this.timeRlue = false
          }
        })
        .catch(err => {
          console.log(err, 'banner getJmBusinessData')
        })
    },
    getJmBusinessBannerByProps(newVal) {
      this.couponImg = newVal.img
      this.drawImg = newVal.drawImg
      this.drawImgType = newVal.drawImgType
      this.distributeImg = newVal.distributeImg
      this.distributeType = newVal.distributeType
      this.templateId = Number(newVal.id)
      if (this.userId === '' ||
          this.userId === 'undefined' ||
          this.userId === false ||
          this.userId === null) {
            this.findCouponsById(this.templateId)
      } else {
        this.couponCon(this.templateId, this.userId)
      }
    },
    couponCon(templateId, userId) {
      let getData = {}
      getData.templateId = templateId
      getData.userId = userId
      couponContent(getData)
        .then(res => {
          this.userMaxLimit = res.data.userMaxLimit
          this.couponsMax = res.data.couponsMax
          this.timeRlue = true
        })
        .catch(err => {
          console.log(err,'==================================')
          this.listItem[this.componentsId] = 0
          this.$emit('offsetHeightBack', this.listItem)
          console.log(err, 'banner getJmBusinessData')
        })
    },
    findCouponsById(templateId) {
       let getData = {}
      getData.templateId = templateId
      getData.pfChannelId = this.pfChannel
      findCouponsById(getData)
        .then(res => {
          if (res && res.data.endTime) {
              let toDate = Math.round(new Date().getTime() / 1000)
              let endTime = Math.round(
                  new Date(res.data.endTime.replace(/\-/g, '/')).getTime() / 1000
                  )
                  console.log(endTime)
                  console.log(toDate)
                  if (toDate < endTime) {
                    this.timeRlue = true
                  } else {
                    this.listItem[this.componentsId] = 0
                    this.$emit('offsetHeightBack', this.listItem)
                  }
                }
        })
        .catch(err => {
          console.log(err,'==================================')
          this.listItem[this.componentsId] = 0
          this.$emit('offsetHeightBack', this.listItem)
          console.log(err, 'banner getJmBusinessData')
        })
    },
    receiveCoupon(){
      // 必须领取完了再可以执行下次
      if (!this.flage) return false
      this.flage = false
      let couponData = {}
      couponData.templateId = this.templateId
      couponData.userId = this.userId
      couponData.pfChannelId = getUrlParam('CHANNEL_ID') || 12
      activityGetCoupon(qs.stringify(couponData))
              .then(e => {
                this.showTip('领取成功')
              })
              .catch(err => {
                if (err.code === -6) {
                  this.userMaxLimit = true
                } else if (err.code === -2) {
                  this.couponsMax = true
                }
                this.showTip(err.msg || '领取失败')
              }).finally(() => {
                this.flage = true
              })
    }
  }
}
</script>
<style lang="stylus" scoped>
.couponbox {
  position: relative;
}

.img {
  width: 100%;
  display: block;
}

.userMaxLimit {
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translateY(-50%);
  width: 20%;
}

.couponsMax {
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translateY(-50%);
  width: 20%;
}
</style>
