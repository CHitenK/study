<template>
  <div class="reward_box" v-if="salesBgImg">
   <div :style="{backgroundImage:'url('+salesBgImg+')'}" class="reward_con">
      <div class="reward_explain" v-if="true">
        销售额还差
        <span>{{disparity}}</span>元即可获得佣金
        <span>{{percentagep}}%</span>的奖励
      </div>
      <div class="reward_explain" v-else>恭喜您已达到最高奖励啦！</div>
      <div class="current_sales">
        <span>当前销售额：</span>
        <div class="progress_bar">
          <div :style="{width: userSaleProgress+'%'}" class="rate" v-if="salesRate <= maxThen"></div>
          <div class="rate" style="width:90%" v-else></div>
          <div v-if="salesJson  && salesJson.length > 0">
            <span :key="index" :style="{'left': item.ruleProgress + '%'}" class="point" v-for="(item,index) in salesJson">
              <img alt class="redpacket"  src="./../../../assets/mobileView/black.png"  v-if="redpacket < index" />
              <img alt  class="redpacket"  src="./../../../assets/mobileView/red.png" v-if="redpacket == index" />
              <span v-if="redpacket <= index">{{item.when}}</span>
              <span v-if="redpacket <= index">{{item.then * 100}}%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="salesbox-none" v-else></div>
</template>
<script>
export default {
  props: {
    targetData: {
      type: Object,
      required: true,
      default: function() {
        return {}
      }
    }
  },
  data() {
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
      salesRate: '',
      isShow: false,
      maxThen: null,
      salesShow: false
    }
  },
  watch: {
    targetData: {
      deep: true,
      handler: function() {
        this.getJmBusinessBanner()
      }
    }
  },
  created() {
  },
  mounted() {
    this.getJmBusinessBanner()
  },
  methods: {
    saleAssess(totalSaleAmount, salesJson) {
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
      this.userSaleProgress = this.totalSaleAmount / (this.maxWhen / 0.8) * 100
      for (const value of salesJson) {
        value.ruleProgress = (value.then / (this.maxThen / 0.8)) * 10000 // 销售奖励规则进度
      }
      console.log(salesJson)
    },
    getJmBusinessBanner(specialId, componentsId) {
      const res = this.targetData.businessData
      this.salesBgImg = res.bgImg
      this.salesShow = true
      if (res.gradData && res.gradData.gradient) {
        this.salesJson = JSON.parse(res.gradData.gradient)
        this.saleAssess(0, this.salesJson)
      }
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
