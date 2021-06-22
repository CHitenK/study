<template>
  <div class="form-view">
    <c-title v-if="activeName === 'title'" />
    <c-banner v-if="activeName === 'jm-banner'" />
    <c-nav v-if="activeName === 'jm-nav'" />
    <c-search v-if="activeName === 'jm-search'" />
    <c-coupon v-if="activeName === 'jm-coupon'" />
    <c-sales v-if="activeName === 'jm-sales'" />
    <c-products v-if="activeName === 'jm-products'" />
    <c-show-case v-if="activeName === 'jm-showcase'" />
    <c-timing-switch v-if="activeName === 'jm-timingSwitch'"  />
  </div>
</template>
<script>
import cTitle from './../views/buildBlock/formPage/title.vue'
import cBanner from './../views/buildBlock/formPage/banner.vue'
import cNav from './../views/buildBlock/formPage/anchor.vue'
import cSearch from './../views/buildBlock/formPage/search.vue'
import cCoupon from './../views/buildBlock/formPage/coupon.vue'
import cSales from './../views/buildBlock/formPage/salesIncentives.vue'
import cProducts from './../views/buildBlock/formPage/products.vue'
import cShowCase from './../views/buildBlock/formPage/showCase.vue'
import cTimingSwitch from './../views/buildBlock/formPage/timingSwitch.vue'
import buildBlock from './../mixins/index.js'
export default {
  components: {
    cTitle,
    cBanner,
    cNav,
    cSearch,
    cCoupon,
    cSales,
    cProducts,
    cShowCase,
    cTimingSwitch
  },
  mixins: [buildBlock],
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
 .form-view{
  width: 100%;
  height: calc(100vh - 280px);
  border: solid 1px #eaeaea;
  overflow: auto;
  box-sizing: border-box;
  padding: 15px 10px;
 }
</style>
