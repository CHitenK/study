<template>
  <div class="reward_box"
       v-if="userType == 'Staff' && salesShow">
    <div :style="{backgroundImage:'url('+salesBgImg+')'}"
         class="reward_con">
      <div class="reward_explain"
           v-if="rateLeft < 80">
        {{numberText}}还差
        <span>{{nextLevel.level}}</span>元即可获得{{typeText}}
        <span>{{nextLevel.num}}</span>的奖励
      </div>
      <div class="reward_explain"
           v-else>恭喜您已达到最高奖励啦！</div>
      <div class="current_sales">
        <span>当前{{numberText}}：</span>
        <div class="progress_bar">
          <div :style="{width: [rateLeft]+'%'}"
               class="rate"
               v-if="salesRate <= maxThen"></div>
          <div class="rate"
               style="width:90%"
               v-else></div>
          <div v-if="pmObj.rewardGradient  && pmObj.rewardGradient.length > 0">
            <div v-for="(item,index) in pmObj.rewardGradient"
                 :key="index">
              <span :style="{'left': item.left + '%'}"
                    class="point">
                <img alt
                     class="redpacket"
                     src="../assets/images/red.png"
                     v-if="nextLevel.index >= index" />
                <img alt
                     class="redpacket"
                     src="../assets/images/black.png"
                     v-else />
                <span>{{item.when}}</span>
                <span>{{item.then}}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import pageJson from '@/mockData/jmPage.json';
import { getJmBusinessData } from '@/api/jmPageConfig'
import { getDarenSale } from '@/api/jmBusinessApi'
import { getUrlParam } from '@/libs/common'
import qs from 'qs'
export default {
  name: 'jm-sales',
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
      salesJson: {},
      salesVolume: '',
      defaultPro: 0,
      MaxVal: 0,
      desc: '',
      listItem: {},
      salesBgImg: null,
      CHANNEL_ID: null,
      userType: null,
      disparity: '', // 还差多少
      percentagep: '', // 百分比
      redpacket: '', // 显示第几个红包
      salesRate: '', // 用户当前销售额占比
      maxThen: null,
      maxWhen: null,
      salesShow: false,
      totalSaleAmount: null, // 销售额
      userSaleProgress: null, // 用户销售进度
      numberText: '',
      typeText: '',
      typeReward: { SaleCommission: '佣金', SaleMoney: '销售金额' },
      rateLeft: 0,
      nextLevel: { level: '', num: '' }, // 下一级别活动奖励
      saleRight: '', // 用户销售奖励进度
      pmObj: ''
    }
  },
  created () {
    // this.getJmBusinessBanner(this.specialId, this.componentsId)
    this.getJmBusinessBannerByProps(this.businessData)
    this.userType = getUrlParam('userType') || 'Staff'
    this.CHANNEL_ID = getUrlParam('CHANNEL_ID')
  },
  mounted () {
    this.listItem[this.componentsId] = this.$el.offsetHeight
    this.$emit('offsetHeightBack', this.listItem)
  },
  methods: {
    saleAssess (totalSaleAmount, salesJson) {
      let j
      let i
      for (i = 0, j = salesJson.length; i < j; i++) {
        if (totalSaleAmount < salesJson[0].when) {
          this.disparity = (salesJson[i].when - totalSaleAmount).toFixed(2)
          this.percentagep = salesJson[i].then * 100
          this.redpacket = -1
          this.salesRate =
            (totalSaleAmount / salesJson[0].when) * 100 * salesJson[i].then
          break
        } else if (
          i < salesJson.length - 1 &&
          salesJson[i].when <= totalSaleAmount &&
          totalSaleAmount < salesJson[i + 1].when
        ) {
          this.disparity = (salesJson[i + 1].when - totalSaleAmount).toFixed(2)
          this.percentagep = salesJson[i + 1].then * 100
          this.redpacket = i
          this.salesRate =
            (totalSaleAmount / salesJson[i].when) * 100 * salesJson[i].then
          break
        } else if (salesJson.length - 1 === i) {
          this.redpacket = i
          this.salesRate =
            (totalSaleAmount / salesJson[i].when) * 100 * salesJson[i].then
          break
        }
      }
      this.maxThen = salesJson[salesJson.length - 1].then * 100
      this.maxWhen = salesJson[salesJson.length - 1].when
      this.userSaleProgress = totalSaleAmount / (this.maxWhen / 0.8) * 100
      for (let value of salesJson) {
        value.ruleProgress = (value.then / (this.maxThen / 0.8)) * 10000 // 销售奖励规则进度
      }
    },
    saleCalculation (data) {
      let body = data
      let rateLeft = this.rateLeft
      let saleRight = 0
      let nextLevel = this.nextLevel // 还差多少得多少佣金
      let typeText = ''
      let numberText = ''
      try {
        body.rewardGradient = JSON.parse(body.gradient)// 后台返回的是字符串，转为json并排序
        let count = body.rewardGradient[body.rewardGradient.length - 1].when // 最大积分
        count += count * 0.2 // 增加20%空白
        saleRight = body.totalSaleAmount // （可自定义进度）
        if (body.type === 'SaleCommission' || body.type === 'SaleMoney') { // 按比例和按销售金额
          numberText = '销售额'
          body.rewardGradient.forEach((item, index) => { // 按比例
            item.then = Number((item.then * 100).toFixed(2)) + '%'
            item.w = item.when
            item.left = item.when / count * 100
            if (saleRight < item.when && !nextLevel.level) {
              nextLevel = { level: item.when - saleRight, num: item.then, index: index - 1 }
            }
          })
          typeText = this.typeReward[body.type] || ''
        } else if (body.type === 'SaleNumber') { // 按销售件数
          saleRight = body.saleNum
          numberText = '销售件数'
          body.rewardGradient.forEach((item, index) => {
            item.w = item.when
            item.left = Number((item.when / count * 100).toFixed(2))
            if (saleRight < item.when && !nextLevel.level) {
              nextLevel = { level: (item.when - saleRight) + '件', num: item.then + '元', index: index - 1 }
            }
          })
        }
        rateLeft = saleRight / count * 100 // 最大积分比例
        if (rateLeft > 100) {
          rateLeft = 100
        }
        if (rateLeft > 80) {
          nextLevel.index = body.rewardGradient.length - 1
        }
      } catch (e) {
        console.log('data.rewardGradient出错')
      }
      this.numberText = numberText
      this.typeText = typeText
      this.nextLevel = nextLevel
      this.rateLeft = rateLeft
      this.saleRight = saleRight
      this.pmObj = body
    },
    getJmBusinessBanner (specialId, componentsId) {
      let getData = {}
      getData.specialId = specialId
      getData.uuid = componentsId
      getJmBusinessData(getData)
        .then(res => {
          this.salesBgImg = res.data.bgImg
          // console.log(res)
          let saleData = {}
          saleData.activityId = res.data.id
          saleData.darenId = getUrlParam('darenId')
          saleData.pfChannelId = getUrlParam('CHANNEL_ID')
          getDarenSale(qs.stringify(saleData))
            .then(e => {
              let toDate = Math.round(new Date().getTime() / 1000)
              let hotTime = Math.round(
                new Date(e.data.hotTime.replace(/\-/g, '/')).getTime() / 1000
              )
              let endTime = Math.round(
                new Date(e.data.endTime.replace(/\-/g, '/')).getTime() / 1000
              )
              if (toDate >= hotTime && toDate <= endTime) {
                this.salesShow = true
                this.salesJson = JSON.parse(e.data.gradient)
                this.saleAssess(e.data.totalSaleAmount, this.salesJson)
              }
            })
            .catch(err => {
              this.salesShow = false
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err, 'sales getJmBusinessData')
        })
    },
    getJmBusinessBannerByProps (newVal) {
      this.salesBgImg = newVal.bgImg
      // console.log(res)
      let saleData = {}
      saleData.activityId = newVal.id
      saleData.darenId = getUrlParam('darenId')
      saleData.pfChannelId = getUrlParam('CHANNEL_ID')
      getDarenSale(qs.stringify(saleData))
        .then(e => {
            this.salesShow = true
            this.salesJson = JSON.parse(e.data.gradient)
            // this.saleAssess(1200, this.salesJson)
            this.saleCalculation(e.data)
        })
        .catch(err => {
          this.salesShow = false
          console.log(err)
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
em, i
  font-style normal
.reward_con
  height 308px
  background-position center
  background-size contain
  background-repeat no-repeat
  box-sizing border-box
.current_sales
  display flex
  justify-content center
  margin-top 50px
  color #626262
  font-size 0.12rem
.progress_bar
  width 238px
  height 11px
  border-radius 5px
  background #BCBCBC
  position relative
  top 0.05rem
.point
  width 11px
  height 11px
  border-radius 50%
  background #ffffff
  position absolute
  margin-left -0.05rem
.point>span:nth-of-type(1)
  color #626262
  font-size 10px
  position absolute
  left 50%
  transform translate(-50%, 20px)
.point>span:nth-of-type(2)
  color #626262
  font-size 10px
  position absolute
  left 50%
  transform translate(-50%, -26px)
.point_1
  left 20%
.point_2
  left 40%
.point_3
  left 80%
.rate
  position absolute
  height 11px
  background #D53D49
  border-radius 5px
.bargainTag
  width 0.28rem
  position absolute
  top 0.05rem
  left 0.05rem
.reward_explain
  width 100%
  font-size 15px
  text-align center
  padding-top 169px
  color rgba(0, 0, 0, 1)
.reward_explain span
  color #f45c7b
.current_sales>span
  font-size 12px
  vertical-align bottom
.redpacket
  position absolute
  width 30px
  left 50%
  bottom 20px
  transform translate(-50%, 0)
</style>
