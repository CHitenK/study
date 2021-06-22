<template>
  <div>
    <div class="show-case-bbox"
         v-if="businessData && businessData.showcaseConfig.length > 0">
      <cube-scroll ref="scroll"
                   direction="horizontal"
                   class="show-case-item">
        <div class="show-case-item"
             id="showcase"
             :style="{width: totalWidth + 'px',backgroundColor: businessData.showCaseBgColor}"
             direction="horizontal">
          <img v-for="(item, i) in businessData.showcaseConfig"
               :key="i"
               :src="item.image"
               @click="clickHandler(item, i)"
               :style="{'width': eW + 'px'}"
               @load="imgBackLoad" />
        </div>
      </cube-scroll>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Wx from 'weixin-js-sdk'
import { getUrlParam, throttle } from '@/libs/common'
import { isAvailable, fetchPageInfo } from '@/api/jmPageConfig'
import { verifyAcivityUnderway, activityGetCoupon, targetPeople, findCouponsById } from '@/api/jmBusinessApi'
import { verifyAcivityUnderwayTest } from '@/api/jmBusinessApiTest'
import qs from 'qs'
export default {
  name: 'jm-showcase',
  props: {
    businessData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      pH: '100px',
      eW: '100%', // 每个橱窗宽度
      totalWidth: '100%', // 总宽度
      listItem: {},
      userId: getUrlParam('userId'),
      pfChannel: getUrlParam('CHANNEL_ID'),
      typePeople: null,
      targetPeopleIsok : false,
      flage: true
    }
  },
  mounted () {
    this.allWidth()
    // if (!this.listItem[this.componentsId]) {
    //   this.listItem[this.componentsId] = this.$el.offsetHeight
    //   this.$emit('offsetHeightBack', this.listItem)
    // }
  },
  methods: {
    allWidth () {
      if (!this.businessData) return false
      const rowNum = this.businessData.rowNum ? +this.businessData.rowNum : 1 // 排数
      const columnNum = this.businessData.showItemNum ? +this.businessData.showItemNum : 1// 展示列数
      const offsetWidth = document.body.offsetWidth // 网页可见区域宽
      const totalNum = this.businessData.showcaseConfig ? this.businessData.showcaseConfig.length : 1 // 橱窗个数
      if (columnNum > 1) {
        this.eW = parseInt(offsetWidth / columnNum, 0)
      } else {
        this.eW = offsetWidth
      }
      if (totalNum % rowNum) {
        this.totalWidth = this.eW * (totalNum % rowNum + totalNum / rowNum)
      } else {
        this.totalWidth = this.eW * totalNum / rowNum
      }
      // console.log(this.totalWidth)
    },
    imgBackLoad (e) {
      if (!this.listItem[this.componentsId]) {
        this.listItem[this.componentsId] = this.$el.offsetHeight
        this.$emit('offsetHeightBack', this.listItem)
      }
    },
    clickHandler: throttle(function (e, index) {
      if (e) {
        switch (e.jumpType) {
          case 0:
            this.goProduct(e)
            break
          case 1:
            this.isAvailable(e)
            break
          case 2:
            this.verifyAcivityUnderway(e)
            break
          case 3:
            this.gourl(e)
            break
          case 4:
            this.goProduct(e)
            break
          case 5:
            this.getCoupon(e)
            break
          default:
            break
        }
      }
    }),
    goProduct (e) {
      let url
      if (e.jumpType === 0 && e.productCode) {
        url =
          '/pages/index/productDetail/productDetail?targetId=' + e.productCode
      }
      this.go(url)
    },
    isAvailable (e) {
      console.log(e)
      let url
      let getData = {}
      let jmUrl = process.env.VUE_APP_GO_URL + '/jm/index/'
      getData.specialId = e.specialId
      isAvailable(getData).then(res => {
        if (res.data) {
          if (e.specialId) {
            let urls = encodeURIComponent(jmUrl + e.specialId + window.location.search + '&goAnchor=' + e.moduleName)
            url =
              '/pages/index/jmWebsite/jmWebsite?url=' + urls
            if (this.userId) {
              this.fetchPageInfo(e.specialId, url)
            } else {
              Wx.miniProgram.navigateTo({
                url: url
              })
            }
          }
        }
      })
    },
    fetchPageInfo (e, url) {
      let toUrl = url
      let getData = {}
      getData.specialId = e
      fetchPageInfo(getData)
        .then(res => {
          this.typePeople = res.data.targetPeople
          this.targetPeople(toUrl)
        })
        .catch(err => {
          console.log(err, 'banner getJmBusinessData')
        })
    },
    targetPeople (url) {
      let getData = {}
      getData.pfChannelId = this.pfChannel
      getData.userid = this.userId
      targetPeople(getData)
        .then(res => {
          this.userType = res.data.userType
          for (let val of this.typePeople) {
            if (val === 0) {
              this.targetPeopleIsok = true
              break
            } else {
              if (val === this.userType) {
                this.targetPeopleIsok = true
                break
              } else {
                this.targetPeopleIsok = false
              }
            }
          }
          console.log(this.targetPeopleIsok)
          if (this.targetPeopleIsok) {
            Wx.miniProgram.navigateTo({
              url: url
            })
          }
        })
        .catch(err => {
          console.log(err, 'banner getJmBusinessData')
        })
    },
    verifyAcivityUnderway (e) {
      let getData = {}
      getData.activityId = e.activityId
      getData.activityType = e.activityType
      if (e.activityType === 'assembleActivity') {
        verifyAcivityUnderwayTest(getData)
          .then(res => {
            this.judgeUrl(res, e)
          })
          .catch(err => {
            console.log(err, 'banner getJmBusinessData')
          })
      } else {
        verifyAcivityUnderway(getData)
          .then(res => {
            this.judgeUrl(res, e)
          })
          .catch(err => {
            console.log(err, 'banner getJmBusinessData')
          })
      }
    },
    getCoupon (e) {
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
        if (!e.couponId) {
          console.log('优惠券id为空')
          return
        }
        let couponId = {}
        couponId.templateId = e.couponId
        couponId.pfChannelId = this.pfChannel
        findCouponsById(couponId)
          .then(res => {
            if (res.data.receiveType && res.data.receiveType === 'OneYuanPurchase') {
              Wx.miniProgram.navigateTo({
                url: `/pages/index/oneyuanBuy/oneyuanBuy?templateId=${e.couponId}`
              })
              console.log(e.couponId,'跳转成功了！！！')
            } else {
              this.receiveCoupon(e)
            }
          })
          .catch(err => {
            this.showTip(err.msg || '领取失败')
          })
      }
    },
    receiveCoupon(e) {
      // 必须领取完了再可以执行下次
      if (!this.flage) return false
      this.flage = false
      let couponData = {}
      couponData.templateId = e.couponId
      couponData.userId = this.userId
      couponData.pfChannelId = getUrlParam('CHANNEL_ID')
      activityGetCoupon(qs.stringify(couponData))
              .then(res => {
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
    },
    showTip (data) {
      this.toast = this.$createToast({
        txt: data,
        type: 'txt',
        time: 1600
      })
      this.toast.show()
    },
    judgeUrl (res, e) {
      /**
        "jumpType":0, //跳转类型 0：商品，1：专题，2：活动，3：链接，4：无跳转
        "link": "", //type 为3时才有h5 url链接
        "image": "http://temp.im/750x400", //banner图片
        "productCode": 100000,  //type 为0时才有的商品id
        "specialId": "zt111111", //type 为1时才有专题id
        "activityType": "promotionType",//type 为2时才有活动类型 活动类型 promotionType促销活动（整点秒杀、天天特价、精选活动）;
        assembleActivity： 砍价活动 secondPieces：第二件半价 hotActivity： 今日爆款 saleSpecial  销售专场
        "activityId":"12333" //type 为2时才有活动id
        */
      let url
      if (res.data) {
        if (e.activityType === 'promotionType' && e.activityId) {
          url =
            '/pages/index/productList/productList?type=3&tid=' +
            e.activityId
        } else if (e.activityType === 'assembleActivity') {
          url = '/pages/index/productList/productList?type=4&title=每日拼团&assembleId=' + e.activityId
        } else if (e.activityType === 'hotActivity') {
          url = '/pages/index/explosionsToday/index'
        } else if (e.activityType === 'saleSpecial' && e.activityId) {
          url =
            '/pages/index/productList/productList?type=2&tid=' +
            e.activityId
        }
        this.go(url)
      }
    },
    gourl (e) {
      if (e.link) {
        let url = e.link ? e.link : ''
        if (url && url.substr(0, 8).toLowerCase() === 'https://') {
          window.location.href = url
        } else {
          this.go(url)
        }
      }
    },
    go: throttle(function (url) {
      let userId = getUrlParam('userId')
      if (window.__wxjs_environment === 'miniprogram') {
        if (
          userId === '' ||
          userId === 'undefined' ||
          userId === false ||
          userId === null
        ) {
          Wx.miniProgram.navigateTo({
            url: '/pages/login/login'
          })
        } else {
          Wx.miniProgram.navigateTo({
            url: url
          })
        }
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
.show-case-item
  display flex
  justify-content flex-start
  align-items center
  flex-wrap wrap
  font-size 0
</style>

