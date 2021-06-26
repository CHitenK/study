<template>
  <div class="mine-router-next">
    <div>
      <!-- head tabs -->
      <div class="head-tab-outbox border-b">
        <div class="tab-item list-betten">
          <router-link class="tab-item-link link-active" to="/wpay/itmes">全部</router-link>
          <router-link class="tab-item-link" to="/login">商铺</router-link>
          <router-link class="tab-item-link" to="/login">仓库</router-link>
          <router-link class="tab-item-link" to="/login">板车</router-link>
          <router-link class="tab-item-link" to="/login">接驳船</router-link>    
        </div>
      </div>
      <!-- 状态选择 -->
      <div class="tab-status-box">
          <select class="select-item" placeholder="缴费状态">
            <option>缴费状态</option>
            <option>缴费状态1</option>
            <option>缴费状态2</option>
          </select>
          <span @click="openDate" class="select-item">选择缴费日期</span>
      </div>
    </div>
    <!-- 路由 -->
    <div class="item-route" :style="rouHei">
      <router-view class="item-route-body"></router-view>
    </div>
    <!-- 合计 -->
    <div class="bottom-btn btn-box">
      <div class="all-chose-box">
        <span class="chose-quan" v-show="choseShow"></span>
        <img src="./../../assets/imgs/auction/icon_pmdt_jpcg@3x.png" class="chose-img" v-show="!choseShow" />
        <span>全选</span>
      </div>
      <div class="chose-all-box">
         <span class="pay-sum">合计 :</span>
         <span class="pay-price">￥ 5800.2002</span>
         <span class="pay-btn">缴费</span>
        
      </div>
    </div>
    <!-- 日期弹窗 -->
    <mt-datetime-picker
      ref="picker"
      type="date"
      v-model="pickerValue"
      @confirm="confirmDate"
      >
    </mt-datetime-picker>
  </div>
</template>
<script>
export default {
  name: 'wpay',
  data() {
    return {
      pickerValue: '',
      choseShow: true
    }
  },
  mounted() {
   // this.rouHei['height'] = ( window.screen.availHeight -298) +'px';
  },
  methods: {
    // 打开日期
    openDate() {
      this.$refs.picker.open();
    },
    // 确定日期
    confirmDate(val) {
      console.log(this.pickerValue)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  
  .mine-router-next{
    display: flex;
    flex-direction: column;
    align-content: space-between;
    width: 100%;
    height: 100%;
    background: #ffffff;
  }
  .head-tab-outbox{
    width: 100%;
    height: 100px; 
  }
  .tab-item{
    width: 690px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-content: flex-start;
  }
  .tab-item-link{
    display: inline-block;
    height: 96px;
    line-height: 96px;
    @include font-dpr(30px);
    color: $blackColor;
  }
  .link-active{
    color:  $primaryColor !important;
    border-bottom:solid 3px $primaryColor;
  }
  .tab-status-box{
    width: 690px;
    height: 100px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    
  }
  .select-item{
    @include font-dpr(28px);
    color:$blackColor-3;
    padding-right: 15px;
    border: none;
    line-height: 30px;
    
  }
  .item-route{
    flex-grow: 1;
    overflow-y: auto;
    width: 100%;
    background: $bgColor;
  }
  .bottom-btn {
    height: 97px;
    border-top: 1Px solid $lineColor;
    width: 100%;
  }
  .btn-box{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    @include font-dpr(30px);
    color:$blackColor-3;
  }
  .chose-quan{
    display: inline-block;
    width: 36px;
    height: 36px;
    border: solid 2px $blackColor-2;
    border-radius: 50%;
    vertical-align: middle;
    margin: 0px 15px 0 30px;
  }
  .chose-img{
    display: inline-block;
    width: 36px;
    height: 36px;
    vertical-align: middle;
    margin: 0px 20px 0 30px;
  }
  .chose-all-box{
    height: 100%;
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .pay-btn{
    width: 210px;
    height: 100%;
    text-align: center;
    background: $btnGradientBgColor;
    color:#fff;
    line-height: 98px;
    @include font-dpr(36px);
    margin-left: 15px;
  }
  .pay-price{
    color: $primaryColor;
  }
  .pay-sum{
    color: $blackColor;
    margin-right: 20px;
  }
  .item-route-body{
    width: 100%;
    height: 100%;
  }
</style>