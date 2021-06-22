<template>
  <div class="banner"
       ref="banner">
    <cube-slide :data="items"
                :interval="interval"
                :showDots="showDot"
                ref="slide">
      <cube-slide-item :key="index"
                       @click.native="clickHandler(item, index)"
                       v-for="(item, index) in items">
        <a>
          <img :src="item.image"
               @load="imgBackLoad" />
        </a>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>
<script>
// import pageJson from '@/mockData/jmPage.json';
import Wx from 'weixin-js-sdk'
import { getJmBusinessData, isAvailable, fetchPageInfo } from '@/api/jmPageConfig'
import { verifyAcivityUnderway, targetPeople } from '@/api/jmBusinessApi'
import { verifyAcivityUnderwayTest } from '@/api/jmBusinessApiTest'
import { getUrlParam, throttle } from '@/libs/common'
export default {
  name: 'jm-banner',
  inject: ['wrapper'],
  props: {
    componentsId: {
      type: Number,
      required: true
    },
    specialId: {
      type: String,
      required: true
    },
    businessData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showDot: true,// 轮播点是否显示
      interval: 4000,// 弹窗显示时间
      items: [],
      listItem: {},
      userId: getUrlParam('userId') || 84600,
      pfChannel: getUrlParam('CHANNEL_ID'),
      typePeople: null,
      targetPeopleIsok : false
    }
  },
  created () {
    this.getJmBusinessBannerByProps(this.specialId, this.componentsId)
  },
  methods: {
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
          default:
            break
        }
      }
    }),
    imgBackLoad (e) {
      if (!this.listItem[this.componentsId]) {
        this.listItem[this.componentsId] = this.$el.offsetHeight
        this.$emit('offsetHeightBack', this.listItem)
      }
    },
    getJmBusinessBanner (specialId, componentsId) {
      let getData = {}
      getData.specialId = specialId
      getData.uuid = componentsId
      getJmBusinessData(getData)
        .then(res => {
          this.items = res.data.items
          if (res.data.jumpTime) {
            this.interval = res.data.jumpTime
          }
          if (res.data.items.length === 1) {
            this.showDot = false
          }
        })
        .catch(err => {
          console.log(err, 'banner getJmBusinessData')
        })
    },
    getJmBusinessBannerByProps () {
      this.items = this.businessData.items
      if (this.businessData.jumpTime) {
        this.interval = this.businessData.jumpTime
      }
      if (this.businessData.items.length === 1) {
        this.showDot = false
      }
    },
    goProduct (e) {
      let url
      if (e.jumpType === 0 && e.productCode) {
        url =
          '/pages/index/productDetail/productDetail?targetId=' + e.productCode
      }
      this.go(url)
    },
    isAvailable (e) {
      let url
      let getData = {}
      let jmUrl = process.env.VUE_APP_GO_URL + '/jm/index/'
      getData.specialId = e.specialId
      isAvailable(getData).then(res => {
        if (res.data) {
          if (e.specialId) {
            let urls = encodeURIComponent(jmUrl + e.specialId + window.location.search)
            url =
              '/pages/index/jmWebsite/jmWebsite?url=' + urls
            if (this.userId) {
             this.fetchPageInfo(e.specialId,url)
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
<style lang="stylus">
.banner
  position relative
.cube-slide-item a img
  width 100%
</style>
