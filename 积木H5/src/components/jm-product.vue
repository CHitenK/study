<template>
  <div class="productBox"
       ref="productBox"
       v-if="businessDataByProps && product">
    <div class="product1 identical"
         v-if="businessDataByProps.styleType == 0">
      <ul :style="{'background': businessDataByProps.wrapperBgColor?businessDataByProps.wrapperBgColor : 'url(' + businessDataByProps.wrapperBgImg + ') repeat',
backgroundSize: 'contain'}"
          class="content_details">
        <li :key="index"
            @click="to(item.name,item.productId || item.id,item.activityId||'')"
            v-for="(item,index) in product">
          <div :style="{background: 'url(' + businessDataByProps.productBgImg + ') no-repeat',
backgroundSize: 'contain'}"
               class="goods_item">
            <p class="earn"
               :style="{'backgroundColor': businessDataByProps.muchColor}"
               v-if="userType == 'Staff' && isShowMuch && item.shopkeeperProfit">赚<span>{{priceHandle(item.shopkeeperProfit, 'int')}}</span>.<span>{{priceHandle(item.shopkeeperProfit, 'decimal2')}}</span></p>
            <div class="goods_img">
              <img alt
                   v-lazy="item.imageUrl"
                   :key="item.id" />
            </div>
            <div class="goods_price">
              <div class="price_center">
                <span :style="{'color':businessDataByProps.titleTextColor}"
                      class="low_priceTitle">抄底价</span>
                <span class="low_price">
                  <span :style="{'color':businessDataByProps.titleTextColor}">￥</span>
                  <span :style="{'color':businessDataByProps.titleTextColor}">{{item.promotionPrice ? item.promotionPrice : item.originalPrice}}</span>
                </span>
              </div>
              <div class="price_bottom">
                <div class="price_left">
                  <p>活动前</p>
                  <p>￥{{item.price}}</p>
                </div>
                <div class="price_right">
                  <p>活动后</p>
                  <p>￥{{item.price}}</p>
                </div>
              </div>
            </div>
            <p :style="{'color': businessDataByProps.titleTextColor}"
               class="goods_name">{{item.name}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="product2 identical"
         v-else-if="businessDataByProps.styleType == 1">
      <ul :style="{'background': businessDataByProps.wrapperBgColor?businessDataByProps.wrapperBgColor : 'url(' + businessDataByProps.wrapperBgImg + ') repeat',
backgroundSize: 'contain'}"
          class="content_details">
        <li :key="index"
            @click="to(item.name,item.productId || item.id,item.activityId||'')"
            v-for="(item,index) in product">
          <div :style="{background: 'url(' + businessDataByProps.productBgImg + ') no-repeat',
backgroundSize: 'contain'}"
               class="goods_item">
           <p class="earn"
               :style="{'backgroundColor': businessDataByProps.muchColor}"
               v-if="userType == 'Staff' && isShowMuch && item.shopkeeperProfit">赚<span>{{priceHandle(item.shopkeeperProfit, 'int')}}</span>.<span>{{priceHandle(item.shopkeeperProfit, 'decimal2')}}</span></p>
            <div class="goods_img">
              <img alt
                   v-lazy="item.imageUrl"
                   :key="item.id" />
            </div>
            <p :style="{'color': businessDataByProps.titleTextColor}"
               class="goods_name">{{item.name}}</p>
            <div class="price_bottom">
              <!-- <p>抄底价</p> -->
              <p>
                <span :style="{'color':businessDataByProps.priceTextColor}">￥</span>
                <span :style="{'color':businessDataByProps.priceTextColor}">{{priceHandle(item.promotionPrice ? item.promotionPrice : item.originalPrice, 'int')}}</span>
                <span :style="{'color':businessDataByProps.priceTextColor}">.{{priceHandle(item.promotionPrice ? item.promotionPrice : item.originalPrice, 'decimal1')}}</span>
              </p>
            </div>
          </div>
          <!-- <img :src="businessData.productBgImg" alt class="hotIcon" /> -->
        </li>
      </ul>
    </div>
    <!-- <div class="product3 identical" v-else-if="businessData.styleType == 2">
      <ul
        :style="{'background': businessData.wrapperBgColor?businessData.wrapperBgColor : 'url(' + businessData.wrapperBgImg + ') no-repeat',
  backgroundSize: 'contain'}"
        class="content_details"
      >
        <li :key="index" v-for="(item,index) in product">
          <div
            :style="{background: 'url(' + businessData.productBgImg + ') no-repeat',
  backgroundSize: 'contain'}"
            class="goods_item"
          >
            <div class="goods_img">
              <img :src="item.imageUrl" alt />
            </div>
            <p :style="{'color': businessData.titleTextColor}" class="goods_name">{{item.name}}</p>
            <div class="price_bottom">
              <p>
                <span :style="{'color':businessData.priceTextColor}">￥</span>
                <span
                  :style="{'color':businessData.priceTextColor}"
                >{{priceHandle(item.promotionPrice, 'int')}}</span>
                <span
                  :style="{'color':businessData.priceTextColor}"
                >.{{priceHandle(item.promotionPrice, 'decimal2')}}</span>
              </p>
              <p></p>
            </div>
          </div>
        </li>
      </ul>
    </div>-->
    <div class="product4"
         v-else-if="businessDataByProps.styleType == 2">
      <ul :style="{'background': businessDataByProps.wrapperBgColor?businessDataByProps.wrapperBgColor : 'url(' + businessDataByProps.wrapperBgImg + ') repeat',
backgroundSize: 'contain'}"
          class="content_details">
        <li :key="index"
            :style="{background: 'url(' + businessDataByProps.productBgImg + ') no-repeat',
backgroundSize: 'contain'}"
            @click="to(item.name,item.productId || item.id,item.activityId||'')"
            v-for="(item,index) in product">
             <p class="earn"
               :style="{'backgroundColor': businessDataByProps.muchColor}"
               v-if="userType == 'Staff' && isShowMuch && item.shopkeeperProfit">赚<span>{{priceHandle(item.shopkeeperProfit, 'int')}}</span>.<span>{{priceHandle(item.shopkeeperProfit, 'decimal2')}}</span></p>
          <div class="goods_item">
            <div class="goods_img">
              <img alt
                   v-lazy="item.imageUrl"
                   :key="item.id" />
            </div>
            <p :style="{'color': businessDataByProps.titleTextColor}"
               class="goods_name">{{item.name}}</p>
            <p class="goods_trait"
               v-if="item.activityTag">{{item.activityTag}}</p>
            <div class="price_bottom">
              <span :style="{'color':businessDataByProps.priceTextColor}">￥</span>
              <span :style="{'color':businessDataByProps.priceTextColor}">{{priceHandle(item.promotionPrice ? item.promotionPrice : item.originalPrice, 'int')}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="product5"
         v-else-if="businessDataByProps.styleType == 3">
      <ul :style="{'background': businessDataByProps.wrapperBgColor?businessDataByProps.wrapperBgColor : 'url(' + businessDataByProps.wrapperBgImg + ') repeat',
backgroundSize: 'contain'}"
          class="content_details">
        <li :key="index"
            :style="{background: 'url(' + businessDataByProps.productBgImg + ') no-repeat',
backgroundSize: 'contain'}"
            @click="to(item.name,item.productId || item.id,item.activityId||'')"
            v-for="(item,index) in product" class="goods_items">
             <p class="earn"
               :style="{'backgroundColor': businessDataByProps.muchColor}"
               v-if="userType == 'Staff' && isShowMuch && item.shopkeeperProfit">赚<span>{{priceHandle(item.shopkeeperProfit, 'int')}}</span>.<span>{{priceHandle(item.shopkeeperProfit, 'decimal2')}}</span></p>
          <div class="goods_img">
            <img alt
                 v-lazy="item.imageUrl"
                 :key="item.id" />
          </div>
          <div :style="{'color': businessDataByProps.titleTextColor}"
               class="goods_name">
            <p :style="{'color': businessDataByProps.titleTextColor}">{{item.name}}</p>
            <p>{{item.activityTag}}</p>
            <div>
              <span :style="{'color':businessDataByProps.priceTextColor}">￥</span>
              <span :style="{'color':businessDataByProps.priceTextColor}">{{item.promotionPrice ? item.promotionPrice : item.originalPrice}}</span>
              <span :style="{'color':businessDataByProps.priceTextColor}">/{{item.promotionPrice ? item.promotionPrice : item.originalPrice}}</span>
              <span>去抢购</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div id="product6"
         v-else-if="businessDataByProps.styleType == 5">
      <ul :style="{'backgroundColor': businessDataByProps.wrapperBgColor}"
          class="content_details">
        <li :key="index"
            v-for="(item,index) in product">
          <img alt
               v-lazy="businessDataByProps.wrapperBgImg"
               :key="item.id" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import pageJson from '@/mockData/jmPage.json'
import { getJmBusinessData } from '@/api/jmPageConfig'
import { activityShowProductList } from '@/api/jmBusinessApi'
import { activityShowProductListTest } from '@/api/jmBusinessApiTest'
import { getUrlParam, throttle } from '@/libs/common'
import Wx from 'weixin-js-sdk'
export default {
  name: 'jm-products',
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
      listItem: {},
      product: [],
      businessDataByProps: null,
      showProNum: null,
      pfChannel: getUrlParam('CHANNEL_ID'),
      userType: getUrlParam('userType'),
      isShowMuch: this.$parent.$parent.$parent.$parent.isShowMuch
    }
  },
  mounted () {
    this.getJmBusinessBannerByProp(this.businessData)
  },
  watch: {
    product (val) {
      this.$nextTick(function () {
        this.listItem[this.componentsId] = this.$el.offsetHeight
        this.listItem['product'] = this.product
        this.listItem['componentsId'] = this.componentsId
        this.$emit('offsetHeightBack', this.listItem)
        // alert(this.$el.offsetHeight)
      })
    },
  },
  methods: {
    priceHandle (num, type) {
      if (type === 'int') {
        return Math.floor(num)
      } else if (type === 'decimal1') {
        // 取小数点后一位
        return Math.floor(num * 10)
          .toString()
          .slice(-1)
      } else if (type === 'decimal2') {
        // 取小数点后二位
        return Math.floor(num * 100)
          .toString()
          .slice(-2)
      }
    },
    getJmBusinessBanner (specialId, componentsId) {
      let getData = {}
      getData.specialId = specialId
      getData.uuid = componentsId
      getJmBusinessData(getData)
        .then(res => {
          this.businessData = res.data
          console.log(res)
          // this.product = res.data.product
          this.showProNum = res.data.showProNum
          let product = []
          for (let i = 0; i < res.data.product.length; i++) {
            product[i] = {
              productId: res.data.product[i].productId,
              goodsIdx: res.data.product[i].goodsIdx,
              imageUrl: res.data.product[i].imageUrl,
              activityTag: res.data.product[i].activityTag
            }
          }
          let productData = {
            actType: res.data.actType,
            actId: Number(res.data.actId),
            sortType: res.data.sortType,
            soldOutShow: res.data.soldOutShow,
            product: product,
          }
          if (res.data.actType === 'assembleActivity') {
            activityShowProductListTest(productData)
              .then(e => {
                // console.log(e)
                this.product = e.data.slice(0, this.showProNum)
              })
              .catch(err => {
                console.log(err, 'sales getJmBusinessData')
              })
          } else {
            activityShowProductList(productData)
              .then(e => {
                // console.log(e)
                this.product = e.data.slice(0, this.showProNum)
              })
              .catch(err => {
                console.log(err, 'sales getJmBusinessData')
              })
          }
        })
        .catch(err => {
          console.log(err, 'sales getJmBusinessData')
        })
    },
    getJmBusinessBannerByProp (newVal) {
      // console.log(newVal,'------------------------')
      this.businessDataByProps = newVal
      this.showProNum = newVal.showProNum
      let product = []
      for (let i = 0; i < newVal.product.length; i++) {
        product[i] = {
          productId: newVal.product[i].productId,
          goodsIdx: newVal.product[i].goodsIdx,
          imageUrl: newVal.product[i].imageUrl,
          activityTag: newVal.product[i].activityTag
        }
      }
      let productData = {
        actType: newVal.actType,
        actId: Number(newVal.actId),
        sortType: newVal.sortType,
        soldOutShow: newVal.soldOutShow,
        product: product,
        pfChannel: this.pfChannel
      }
      if (newVal.actType === 'assembleActivity') {
        activityShowProductListTest(productData)
          .then(e => {
            // console.log(e)
            this.product = e.data.slice(0, this.showProNum)
          })
          .catch(err => {
            console.log(err, 'sales getJmBusinessData')
          })
      } else {
        activityShowProductList(productData)
          .then(e => {
            // console.log(e)
            this.product = e.data.slice(0, this.showProNum)
          })
          .catch(err => {
            console.log(err, 'sales getJmBusinessData')
          })
      }
    },
    to: throttle(function (name, targetId, activityId) {
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
          if (activityId) {
            Wx.miniProgram.navigateTo({
              url:
                '/pages/index/productDetail/productDetail?title=' +
                name +
                '&targetId=' +
                targetId +
                '&specialId=' +
                activityId
            })
          } else {
            Wx.miniProgram.navigateTo({
              url:
                '/pages/index/productDetail/productDetail?title=' +
                name +
                '&targetId=' +
                targetId
            })
          }
        }
      }
    })
  }
}
</script>

<style lang="stylus">
// .productBox {
// padding: 20px 0;
// }
.content_details
  padding 0 10px
  display flex
  justify-content space-between
  flex-wrap wrap
.identical :after
  content ''
  width 115px
.product1 .content_details li
  height 181px
  width 115px
  margin-top 8.2px
  border-radius 10px
.goods_item
  width 100%
  height 100%
  position relative
  overflow hidden
.content_details li:nth-of-type(3n+0)
  margin-right 0
.product1 .goods_img
  height 110px
.goods_img
  box-sizing border-box
  width 100%
  height 112.6px
  padding 4.3px 4.8px 4.3px
  text-align center
  display flex
  align-items center
  justify-content center
.goods_img img
  width auto
  height auto
  max-width 100%
  max-height 100%
.earn
  position absolute
  left 0
  top 16px
  z-index 99
  display flex
  align-items flex-end
  justify-content center
  padding 3px 5px 3px 3px
  width 49.5px
  border-radius 0 15.5px 15.5px 0
  font-size 9px
  color #fff
  overflow hidden
.earn>span:nth-of-type(1)
  font-size 12px
.product1 .price_center
  position absolute
  bottom 25px
  transform translate(-50%)
  width 35.5px
  height 43.5px
  left 50%
  text-align center
  font-size 0
  padding-top 4px
  color #fff
.product1 .price_center .low_priceTitle
  white-space nowrap
  transform scale(0.6)
  font-size 12px
  margin-bottom -6px
  display inline-block
.product1 .price_center .low_price
  display block
  white-space nowrap
  font-size 8px
.product1 .price_center .low_price span:nth-of-type(2)
  margin-left -2px
.product1 .price_bottom
  position absolute
  left 46%
  bottom 28px
  width 96px
  height 31px
  transform translate(-50%)
  text-align center
.product1 .price_bottom>div
  position absolute
  top -14px
  transform scale(0.5)
.product1 .price_bottom p
  color #3a3a3a
  font-size 12px
  line-height 12px
.product1 .price_left
  left -6px
.product1 .price_right
  right -14px
.product1 .goods_name
  position absolute
  bottom 2px
  height 25px
  width 100%
  padding 0 3px
  font-size 11px
  line-height 14px
  color #fff
  text-overflow ellipsis
  display -webkit-box
  -webkit-box-orient vertical
  -webkit-line-clamp 2
  overflow hidden
.product1 li :after
    width 0
  // 样式2---------------------------------
.product2 .content_details li
  position relative
  height 171px
  width 116px
  border-radius 10px
  margin-top 5.5px
.product2 .hotIcon
  height 36px
  width 36px
  position absolute
  left 7px
  height 6px
.product2 .goods_img
  height 104px
.product2 .goods_name
  box-sizing border-box
  height 39px
  width 100%
  padding 0 6.5px
  font-size 11px
  line-height 13.1px
  overflow hidden
  text-overflow ellipsis
  display -webkit-box
  -webkit-line-clamp 3
  -webkit-box-orient vertical
  margin-bottom 1px
.product2 .price_bottom
  height 27px
  border-radius 0 0 10px 10px
  display flex
  justify-content flex-end
  align-items center
  white-space nowrap
  color #fff
.product2 .price_bottom :after
  width 0
.product2 .goods_item :after
  width 0
.product2 .price_bottom>p
  box-sizing border-box
  line-height 13px
  padding-right 6px
.product2 .price_bottom>p span:nth-of-type(2)
  font-size 15px
  font-weight bold
.product2 .price_bottom>p span
  font-size 8px
// 样式3---------------------------------
.product3 .content_details li
  height 178.5px
  width 115.5px
  border-radius 10px
  margin-top 5.5px
.product3 .goods_name
  box-sizing border-box
  height 39.5px
  width 100%
  padding 0 6.5px
  font-size 11px
  line-height 13.1px
  overflow hidden
  text-overflow ellipsis
  display -webkit-box
  -webkit-line-clamp 3
  -webkit-box-orient vertical
  margin-bottom 1px
.product3 .price_bottom
  height 27px
  border-radius 0 0 10px 10px
  background-color #ED485C
  white-space nowrap
  color #fff
  padding 0 5px
  line-height 27px
.product3 .price_bottom :after
  width 0
.product3 .content_details li :after
  width 0
.product3 .price_bottom p:nth-of-type(1)
  font-size 13px
  margin-right 5px
  float left
.product3 .price_bottom p:nth-of-type(1) span:nth-of-type(2)
  font-size 15px
  font-weight bold
.product3 .price_bottom p:nth-of-type(1) span
  font-size 8px
.product3 .price_bottom p:nth-of-type(2)
  height 20px
  width 20px
  float right
  margin-top 3.5px
// 样式4----------------------------
.product4 .content_details li
  box-sizing border-box
  width 175px
  height 260px
  padding 0 9px 5px
  border-radius 10px
  margin-top 6px
  background-color #fff
  position relative
.product4 .goods_img
  height 174px
  padding 0
.product4 .goods_name
  margin-top 7px
  height 29px
  width 100%
  font-size 12px
  line-height 14.5px
  overflow hidden
  text-overflow ellipsis
  display -webkit-box
  -webkit-line-clamp 2
  -webkit-box-orient vertical
.goods_trait
  max-width 140px
  padding 1px 2px
  font-size 10px
  color #798EC3
  border 1px solid #798EC3
  border-radius 3px
  line-height 10px
  vertical-align middle
  overflow hidden
  white-space nowrap
.product4 .price_bottom
  margin-left 35px
  position absolute
  line-height 0
  bottom 13px
.product4 .price_bottom>span:nth-of-type(1)
  font-size 11px
.product4 .price_bottom>span:nth-of-type(2)
  font-size 15px
// 样式5----------------------------
.goods_items{
  position relative
}
.product5 .content_details
  justify-content center
.product5 .content_details li
  width 359px
  height 132px
  border-radius 10px
  background-color #fff
  box-sizing border-box
  padding 12px 13px
  margin-bottom 8px
.product5 .goods_img
  width 30%
  height 100%
  padding 0
  margin-right 10px
  float left
.product5 .goods_name
  float right
  width 65%
  padding-top 7px
  box-sizing border-box
.product5 .goods_name p:nth-of-type(1)
  height 29px
  font-size 12px
  color #5D5D5D
  margin-bottom 9px
  line-height 14.5px
  overflow hidden
  text-overflow ellipsis
  display -webkit-box
  -webkit-line-clamp 2
  -webkit-box-orient vertical
.product5 .goods_name p:nth-of-type(2)
  font-size 15px
  overflow hidden
  white-space nowrap
  text-overflow ellipsis
  margin-bottom 15px
.product5 .goods_name div>span:nth-of-type(1)
  font-size 12px
  color #FD346A
.product5 .goods_name div>span:nth-of-type(2)
  font-size 15px
  color #FD346A
.product5 .goods_name div>span:nth-of-type(3)
  font-size 12px
  color #6D6D6D
  text-decoration line-through
.product5 .goods_name div>span:nth-of-type(4)
  display inline-block
  height 22px
  width 70px
  color #fff
  font-size 16px
  line-height 22px
  text-align center
  border-radius 16px
  background-image linear-gradient(to right, #FF4E39, #FD326A)
  float right
  margin-top 2px
// 样式6----------------------------
.product6 .content_details li
  width 359px
  height 132px
  border-radius 10px
  background-color #fff
  box-sizing border-box
  margin-bottom 8px
.product6 .content_details li img
  width auto
  height auto
  max-width 100%
  max-height 100%
.productBox .identical .content_details li:nth-of-type(1), .productBox .identical .content_details li:nth-of-type(2), .productBox .identical .content_details li:nth-of-type(3)
  margin-top 0
</style>
