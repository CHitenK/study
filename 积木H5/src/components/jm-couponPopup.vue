<template>
  <div id="app">
    <!--新用户领券弹窗-->
    <div class="mask" v-if="show_flag" @click="show_flag=false"></div>
    <div class="mask-container" v-if="show_flag">
      <div class="modal-content wx-anim-size wx-anim modal-bc-none" style="height:auto;width:auto">
        <div class="main-content">
          <div class="new-user-coupon">
            <div class="new-user-coupon-close" @click="show_flag=false">
              <img src="../assets/images/close_right.png" />
            </div>
            <div class="new-user-coupon-content">
              <img src="../assets/images/coupon_index.png" />
              <div class="new-user-coupon-text">
                <div class="new-user-coupon-left">
                  <div class="new-user-coupon-tip">{{newUserCoupon.couponsTypeText}}</div>
                  <div v-if="newUserCoupon.promotionType === 'ManZhe'" class="new-user-coupon-yuan">
                    <span>{{newUserCoupon.discount}}</span>折
                  </div>
                  <div v-else class="new-user-coupon-yuan">
                    ￥
                    <span>{{newUserCoupon.price}}</span>
                  </div>
                  <div class="new-user-coupon-date">{{newUserCoupon.condition}}</div>
                </div>
                <div class="new-user-coupon-right">
                  <div>{{newUserCoupon.name}}</div>
                  <div class="new-user-coupon-date">{{newUserCoupon.endTime}}</div>
                </div>
              </div>
              <div @click="getNewUserCouponIndex" class="new-user-coupon-btn">{{newUserCouponBtn}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 扫码弹窗 -->
    <div class="pop_coupon_box" v-if="showCoupon">
      <div class="pop_coupon">
        <div class="coupon_content">
          <div class="coupon_content_left">
            <span>
              <span>￥</span>
              {{coupons_info.discount?coupons_info.discount + '折':coupons_info.price}}
            </span>
            <div>{{couponsTypes}}</div>
          </div>
          <div class="coupon_content_right">
            <div class="coupon_cutprice">满{{coupons_info.cutPrice}}元可用</div>
            <div class="coupon_endtime">{{coupons_info.endTime}}</div>
          </div>
        </div>
        <div class="popButton" @click="goLogin()">{{coupon_pop_title}}</div>
        <div class="closeCoupon" @click="closeCoupon()"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Wx from 'weixin-js-sdk'
import { getUrlParam, throttle } from '@/libs/common'
import {
  getConponsByTemplateIdToUserId,
  getNewUserCoupons,
  getNewUserCouponIndex,
  getCouponsReachAble,
  couponsUseImmediately,
  findCouponsById
} from '@/api/jmBusinessApi'
export default {
  data() {
    return {
      newUserCoupon: {}, // 新用户优惠券信息
      newUserCouponBtn: '立即领取',
      show_flag: false, // 新人券弹窗
      coupons_info: {}, // 弹窗优惠券信息
      couponsType: '', // 弹窗优惠券类型
      showCoupon: false, // 弹窗优惠券是否显示
      coupon_pop_title: '',
      couponsTypes: '',
      popTemplateId: JSON.parse(getUrlParam('popTemplateId')),
      userId: getUrlParam('userId'),
      pfChannelId: getUrlParam('CHANNEL_ID'),
      flage: true
    }
  },
  mounted() {
    if (this.popTemplateId) {
      this.popCoupon(this.popTemplateId) // 扫码弹窗
    } else if (this.userId) {
      this.getNewUserCoupons() // 新用户领券
    }
  },
  methods: {
    popCoupon: function(templateId) {
      // 弹出优惠券弹框
      let data = {}
      data.templateId = this.popTemplateId
      data.pfChannelId = this.pfChannelId
      findCouponsById(data)
        .then(res => {
            this.coupons_info = res.data
            this.couponsTypes =
              res.data.couponsType === 'Quanchang' ? '全场通用' : '部分商品可用'
          if (this.userId) {
              if (
            res.data.receiveType &&
            res.data.receiveType === 'OneYuanPurchase'
          ) {
            Wx.miniProgram.navigateTo({
              url: `/pages/index/oneyuanBuy/oneyuanBuy?templateId=${this.popTemplateId}`
            })
          } else {
            if (res.data) {
              let datas = {}
              datas.templateId = templateId
              datas.userId = this.userId
              getConponsByTemplateIdToUserId(datas)
                .then(value => {
                  if (value.code === 1) {
                    this.coupon_pop_title = '已领取'
                    this.showCoupon = true
                  }
                })
                .catch(err => {
                  this.showCoupon = false
                  this.showTip(err.msg || '领取失败')
                  console.log(err, 'couponPopup')
                })
              }
            }
            } else {
              this.showCoupon = true
              this.coupon_pop_title = '点击授权领取'
            }
        })
        .catch(err => {
          this.showTip(err.msg || '领取失败')
          console.log(err, 'couponPopup')
        })
    },
    // 关闭优惠券弹窗
    closeCoupon: function() {
      this.showCoupon = false
    },
    goLogin: throttle(function() {
      if (this.coupon_pop_title === '点击授权领取') {
        Wx.miniProgram.getEnv(function(res) {
          Wx.miniProgram.navigateTo({
            url: '/pages/login/login'
          })
        })
      }
    }),
    getNewUserCoupons() {
      // 新用户领券资格
      let that = this
      let data = {}
      data.userId = this.userId
      getNewUserCoupons(data)
        .then(res => {
          if (res.code === 1 && res.data) {
            let coupon = res.data[0]
            if (coupon.couponsType === 'Quanchang') {
              coupon.couponsTypeText = '全品券'
            } else {
              coupon.couponsTypeText = '限品券'
            }
            coupon.condition = that.couponPromotionType(
              coupon.promotionType,
              coupon.cutPrice
            )
            coupon.endTime =
              this.formatDate(coupon.endTime, 'YY') +
              '年' +
              this.formatDate(coupon.endTime, 'MM') +
              '月' +
              this.formatDate(coupon.endTime, 'DD') +
              '日到期'
            that.newUserCoupon = coupon
            that.show_flag = true // 打开优惠券弹窗
          }
        })
        .catch(err => {
          console.log(err, 'couponPopup')
        })
    },
    couponPromotionType(promotionType, cutPrice) {
      let typeText = ''
      switch (promotionType) {
        case 'ManJian':
          typeText = `满${cutPrice}元可用`
          break
        case 'MeiManLiJian':
          typeText = `每满${cutPrice}元可用`
          break
        case 'ManZhe':
          typeText = `满${cutPrice}元可用`
          break
        default:
          break
      }
      return typeText
    },
    getNewUserCouponIndex: throttle(function() {
      // 新用户领券
      let that = this
      if (that.newUserCouponBtn === '立即使用') {
        that.UseImmediately()
        return
      }
      let { id, status } = that.newUserCoupon
      if (!status || !that.userId) {
        return
      }
      status = false
      if (!this.flage) return false
      this.flage = false
      let data = {}
      data.templateId = id
      data.userId = that.userId
      getNewUserCouponIndex(data)
        .then(res => {
          if (res.code === 1) {
            getCouponsReachAble(data)
              .then(value => {
                this.flage = true
                if (value.code === 1) {
                  status = true
                  that.newUserCouponBtn = '再次领取'
                }
              })
              .catch(e => {
                if (e.code !== -2) {
                  that.newUserCouponBtn = '立即使用'
                }
                status = true
                this.flage = true
                console.log(e)
              })
          } else {
            status = true
            this.flage = true
            that.showTip(res.msg)
          }
        })
        .catch(err => {
          status = true
          this.flage = true
          that.showTip(err.msg || '领取失败')
          console.log(err)
        })
    }),
    UseImmediately: throttle(function() {
      // 立即使用
      let that = this
      const { id, couponsType } = that.newUserCoupon
      let data = {}
      data.templateId = id
      data.userId = this.userId
      data.couponsType = couponsType
      data.pfChannelId = this.pfChannelId
      couponsUseImmediately(data)
        .then(res => {
          if (res.code === 1) {
            that.show_flag = false
            if (res.data.isActivity) {
              if (!res.data.isTimeStart) {
                that.toNav(
                  '/pages/index/couponProductList/couponProductList?templateId=' +
                    id
                )
              } else if (!res.data.isTimeOut) {
                that.toNav(
                  '/pages/index/couponProductList/couponProductList?templateId=' +
                    id
                )
              } else if (res.data.activityType === 'Featured') {
                // 精选活动
                that.toNav(
                  '/pages/index/productList/productList?type=3&tid=' +
                    res.data.activityId
                )
              } else if (res.data.activityType === 'NewDayHotActivity') {
                // 今日爆款
                that.toNav('/pages/index/explosionsToday/index')
              } else if (
                res.data.activityType === 'SaleSpecial' &&
                !res.data.sessionStatus
              ) {
                // 专场活动
                that.toNav(
                  '/pages/index/productList/productList?type=2&tid=' +
                    res.data.activityId
                )
              } else if (
                res.data.activityType === 'SaleSpecial' &&
                res.data.sessionStatus
              ) {
                // 专场活动
                that.toNav(
                  '/pages/index/couponProductList/couponProductList?templateId=' +
                    id
                )
              }
            } else {
              if (res.data.couponsType === 'Quanchang') {
                // 全场券
                that.toNav('/pages/index/index')
              } else if (res.data.couponsType === 'SingleProduct') {
                if (res.data.targetId) {
                  // 单品券，只有单个商品
                  that.toNav(
                    '/pages/index/productDetail/productDetail?targetId=' +
                      res.data.targetId
                  )
                } else {
                  // 单品券，多个商品
                  that.toNav(
                    '/pages/index/couponProductList/couponProductList?templateId=' +
                      id
                  )
                }
              } else if (res.data.couponsType === 'ProductCategory') {
                // 品类券
                that.toNav(
                  '/pages/index/couponProductList/couponProductList?templateId=' +
                    id
                )
              }
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }),
    formatDate(timestamp = +new Date(), option, cn) {
      let date = new Date(this.getFormatTime(timestamp))
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      // 获取 年月日
      if (option === 'YY-MM-DD') return year + '-' + month + '-' + day
      // 获取年月
      if (option === 'YY-MM') return year + '-' + month
      // 获取年
      if (option === 'YY') return year
      // 获取月
      if (option === 'MM') return month
      // 获取日
      if (option === 'DD') return day
    },
    getFormatTime(time) {
      // 统一获取时间戳函数
      let times = time
      try {
        if (!times || !isNaN(times)) {
          // 判断为空或者为数字类型直接返回
          return times
        } else {
          times = new Date(times.replace(/-/g, '/')).getTime() // 统一格式化
        }
      } catch (e) {
        console.log('时间戳函数格式出错', times)
      }
      return times
    },
    showTip(data) {
      // 提示
      this.toast = this.$createToast({
        txt: data,
        type: 'txt',
        time: 1600,
        zIndex: 99999
      })
      this.toast.show()
    }
  }
}
</script>
<style lang="stylus" scoped>
// 新用户优惠券
.new-user-coupon {
  position: relative;
  overflow: hidden;
}

.new-user-coupon-close {
  width: 0.56rem;
  height: 0.56rem;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 9999;
}

.new-user-coupon-close image, .new-user-coupon-content image {
  width: 100%;
}

.new-user-coupon-content {
  width: 5.9rem;
  height: 6.57rem;
  position: relative;
}

.new-user-coupon-text {
  height: 1.5rem;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  bottom: 1.02rem;
  padding-left: 0.58rem;
  padding-right: 0.42rem;
  display: flex;
  align-items: center;
}

.new-user-coupon-tip {
  position: absolute;
  left: 0;
  top: 0.04rem;
  color: #fff;
  font-size: 0.22rem;
  width: 0.88rem;
  text-align: center;
}

.new-user-coupon-left {
  padding-top: 0.21rem;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  width: 1.92rem;
  height: 100%;
  flex-wrap: wrap;
  overflow: hidden;
  flex-shrink: 0;
  box-sizing: border-box;
}

.new-user-coupon-date {
  font-size: 0.22rem;
  color: #666666;
  white-space: nowrap;
  overflow: hidden;
}

.new-user-coupon-yuan {
  width: 100%;
  color: #F9673E;
  font-size: 0.33rem;
  text-align: center;
  height: 0.68rem;
}

.new-user-coupon-yuan span {
  font-size: 0.65rem;
}

.new-user-coupon-right {
  text-align: center;
  padding: 0.1rem;
  padding-top: 0.4rem;
}

.new-user-coupon-right div:first-child {
  font-size: 0.22rem;
  color: #000;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  height: 0.68rem;
  -webkit-box-orient: inherit;
  line-height: 0.32rem;
}

.new-user-coupon-btn {
  font-size: 0.35rem;
  color: #ffffff;
  height: 0.68rem;
  line-height: 0.68rem;
  position: absolute;
  bottom: 0;
  width: 2.94rem;
  text-align: center;
  margin-left: 1.62rem;
}

.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9998;
}

.mask-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 0.1rem;
}

.modal-bc-none {
  background-color: transparent;
}

.title_box {
  margin: 0.8rem 0 0.2rem;
}

.main-content {
  flex: 1;
  height: 100%;
  overflow-y: hidden;
}

.main-content img {
  max-width: 100%;
}

.venue_box {
  display: flex;
  justify-content: space-between;
  padding: 0 0.1rem;
}

.venue_box img {
  width: 2.38rem;
  height: 3.44rem;
}

.venue_box_2 {
  padding: 0 0.16rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.venue_box_2 img {
  margin-bottom: 0.1rem;
  width: 3.53rem;
  height: 1.52rem;
}

.wx-anim {
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
}

.wx-anim-size {
  -webkit-animation-name: wx-bounceIn;
  animation-name: wx-bounceIn;
}

@keyframes wx-bounceIn {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.5);
    -ms-transform: scale(0.5);
    transform: scale(0.5);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }
}

.Tips {
  z-index: 10000;
}

// 优惠券弹窗
.pop_coupon_box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pop_coupon {
  position: relative;
  background: url('../assets/images/coupon_pop.png');
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}

.coupon_content {
  width: 6rem;
  height: 9.1%;
  position: absolute;
  left: 20.1%;
  top: 50%;
  z-index: 999;
  padding: 0.155rem 0;
  display: flex;
}

.coupon_content_left, .coupon_content_right {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.coupon_content_left {
  width: 40%;
  text-align: center;
  font-size: 0;
}

.coupon_content_left>span>span {
  font-size: 0.2rem;
}

.coupon_content_left>span {
  font-size: 0.5rem;
  color: #FC9D1D;
  margin-bottom: 0.1rem;
}

.coupon_content_left>div {
  font-size: 0.24rem;
  color: #343434;
}

.coupon_content_right {
  text-align: center;
  width: 60%;
}

.coupon_cutprice {
  padding-top: 0.14rem;
  font-weight: bold;
  color: #000000;
  margin-bottom: 0.14rem;
  font-size: 0.5rem;
}

.coupon_endtime {
  font-size: 0.2rem;
  color: #BABABA;
}

.closeCoupon {
  width: 0.6rem;
  height: 0.6rem;
  position: absolute;
  bottom: 19.5%;
  left: 46.9%;
  z-index: 999;
}

.getCoupon {
  width: 1.3rem;
  height: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0.05rem;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -0.1rem 0 0 -0.65rem;
  font-size: 0.16rem;
  color: #fff;
}

.hideObj {
  display: none;
}

.popButton {
  font-size: 0.5rem;
  height: 0.65rem;
  padding: 1% 5%;
  position: absolute;
  left: 50%;
  bottom: 30.6%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  background-color: #FC9D1D;
  border-radius: 20rem;
  color: #fff;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
