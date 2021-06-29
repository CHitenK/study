<template>
  <div class="goods-card">
    <div class="img-container">
      <v-img :src="goodsData.defaultImage"/>
    </div>
    <h4>{{goodsData.productName}}&nbsp;{{goodsData.totalAmount}}{{goodsData.unit}}</h4>
    <p class="info">规格：{{goodsData.specification}}</p>
    <p class="info">发布时间：{{createTime}}</p>
    <p class="price">
      <span class="money">{{goodsData.unitPrice|money}}</span>元/{{goodsData.unit}}
      <span class="location"><v-icon icon="icon-icon_location"/>{{location}}</span>
    </p>
  </div>
</template>
<script>
import { formatTime } from '@/utils/time.js'

export default {
  name: 'index',
  components: {},
  props: {
    goodsData: {}
  },
  data() {
    return {}
  },
  computed: {
    createTime() {
      return formatTime(this.goodsData.createTime)
    },
    location() {
      return this.goodsData.location.split(' ')[1]
    }

  },
  created() {

  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .goods-card {
    display: block;
    min-height: 230px;
    padding: 0 30px 0 286px;
    line-height: 1;
    background-color: #fff;
  }

  .img-container {
    float: left;
    margin-left: -256px;
    width: 230px;
    height: 230px;
    line-height: 230px;
    border-radius: 10px;
    overflow: hidden;
    font-size: 0;
    .v-img {
      vertical-align: middle;
      width: 100%;
      height: 100%;
    }
  }

  h4 {
    font-size: 36px;
    color: $blackColor-1;
    font-weight: bolder;
    padding: 20px 0 10px;
  }

  .info {
    padding: 10px 0;
    font-size: 26px;
    color: $blackColor-3;
  }

  .price {
    color: $primaryColor;
    font-size: 26px;
    padding-top: 24px;
  }

  .money {
    font-size: 38px;
    margin-right: 5px;
  }

  .location {
    color: $blackColor-3;
    float: right;
    line-height: 38px;
    .v-icon {
      transform: scale(1.2, 1.2);
      margin-right: 8px;
    }
  }
</style>
