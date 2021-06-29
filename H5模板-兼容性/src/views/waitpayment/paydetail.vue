<template>
  <div class="paydetail-box">
    <!-- head -->
    <div class="paydetail-head-box">
      <div class="paydetail-content-box">
        <li class="paydetail-head-list">
           <span>乐天商铺</span>
           <span>No.123</span>
           <span class="paydetail-date">2018年10月</span>
        </li>
        <li class="paydetail-head-list">
           <span>租金</span>
           <span class="paydetail-price">￥ 1501123</span>
        </li>
      </div>
    </div>
    <!-- item 账单周期 -->
    <div class="paydetail-item-box">
      <div class="paydetail-item-content">
        <p class="paydetail-item-title">账单周期</p>
        <div class="paydetail-item-list">
          <span class="paydetail-first">计费方式</span>
          <span>定价</span>
        </div>
        <div class="paydetail-item-list">
          <span class="paydetail-first">计费月份</span>
          <span>2018年10月</span>
        </div>
        <div class="paydetail-item-list">
          <span class="paydetail-first">费用周期</span>
          <span>2018.10.11-218.11.05</span>
        </div>
        <div class="paydetail-item-list">
          <span class="paydetail-first">缴费期限</span>
          <span>2018.10.11</span>
        </div>
        <div class="paydetail-item-list">
          <span class="paydetail-first">备注</span>
          <span class="paydetail-text">crollHeight是网页内容高度，不过最小值是clientHeight;也就是说网页内容实际高度小于；</span>
        </div>
      </div>
    </div>
    <!-- item 费用计算 -->
    <div class="paydetail-item-box" v-if="type">
      <div class="paydetail-item-content">
        <p class="paydetail-item-title">费用计算</p>
        <div class="paydetail-item-list">
          <span class="paydetail-first">定价</span>
          <span>1000 元</span>
        </div>
        <div class="paydetail-item-list">
          <span class="paydetail-first">优惠</span>
          <span>200 元</span>
        </div>
        <div class="paydetail-item-list">
          <span class="paydetail-first col-sum">合计</span>
          <span class="col-sum">1000.00 元</span>
        </div>
      </div>
    </div>
    <!-- item 费用计算 -水费 -->
    <div class="paydetail-item-box" v-if="!type">
      <div class="paydetail-item-content">
        <p class="paydetail-item-title">费用计算</p>
        <div class="paydetail-item-list">
          <span class="paydetail-first">上次读数</span>
          <span>1000.00 度</span>
        </div>
        <div class="paydetail-item-list">
          <span class="paydetail-first">本次读数</span>
          <span>1000.00 度</span>
        </div>
        <div class="paydetail-item-list">
          <span class="paydetail-first col-sum">计算水量</span>
          <span class="col-sum">1000.00 度</span>
        </div>
        <div class="paydetail-item-list border-b"></div>
        <div class="paydetail-item-list">
          <span class="paydetail-first">一阶</span>
          <span class="paydetail-two">1000.00 度</span>
          <span class="paydetail-two">1000.00 度</span>
        </div>
        <div class="paydetail-item-list">
          <span class="paydetail-first">二阶</span>
          <span class="paydetail-two">1000.00 度</span>
          <span class="paydetail-two">1000.00 度</span>
        </div>
        <div class="paydetail-item-list">
          <span class="paydetail-first col-sum">合计</span>
          <span class="paydetail-two"></span>
          <span class="paydetail-two col-sum">1000.00 度</span>
        </div>
      </div>
    </div>
    <!-- item 收费标准 -->
    <div class="paydetail-item-box" v-if="type">
      <div class="paydetail-item-content">
        <p class="paydetail-item-title">收费标准</p>
        <div class="paydetail-item-list">
          <span class="paydetail-first">定价</span>
          <span>1000 元/月</span>
        </div>
      </div>
    </div>
    <!-- item 收费标准  水费-->
    <div class="paydetail-item-box" v-if="!type" style="margin-bottom:30px;">
      <div class="paydetail-item-content">
        <p class="paydetail-item-title">收费标准</p>
        <div class="paydetail-item-list">
          <span class="paydetail-first">一阶</span>
          <span class="paydetail-two">1-100度</span>
          <span class="paydetail-two">1元/度</span>
        </div>
        <div class="paydetail-item-list">
          <span class="paydetail-first">二阶</span>
          <span class="paydetail-two">101-500度</span>
          <span class="paydetail-two">2元/度</span>
        </div>
        <div class="paydetail-item-list">
          <span class="paydetail-first">备注</span>
          <span calss="paydetail-text">1000.00 元</span>
        </div>
      </div>
    </div>
    <!-- item 优惠信息 -->
    <div class="paydetail-item-box">
      <div class="paydetail-item-content">
        <p class="paydetail-item-title">优惠信息</p>
        <div class="paydetail-item-list">
          <span class="paydetail-first">折扣</span>
          <span>50%</span>
        </div>
        <div class="paydetail-item-list">
          <span class="paydetail-first">周期</span>
          <span>2018.10.10-2019.10.10</span>
        </div>
        <div class="paydetail-item-list">
          <span class="paydetail-first">备注</span>
          <span calss="paydetail-text">1000.00 元</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'detailPay',
  data() {
    return {
      type: false, // false- 水费详情 true-其他详情
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.paydetail-box{
  width: 100%;
  background: $bgColor;
}
.paydetail-head-box{
  background: $primaryGradientBgColor;
  height: 180px;
  width: 100%;
}
.paydetail-content-box{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 690px;
  height: 100%;
  margin: 0 auto;
}
.paydetail-head-list{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  color: #fff;
  @include font-dpr(34px);
  
}
.paydetail-date{
   @include font-dpr(30px);
}
.paydetail-price{
   @include font-dpr(36px);
}
.paydetail-item-box{
  width: 100%;
  padding: 25px 0;
  background: #fff;
  margin-bottom: 30px;
}
.paydetail-item-content{
  width: 690px;
  margin: 0 auto;
}
.paydetail-item-title{
  padding-left: 15px;
  @include font-dpr(36px);
  color: $blackColor;
  border-left: solid 10px $primaryColor;
}
.paydetail-item-list{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin-top: 30px;
  color:  $blackColor-2;
  @include font-dpr(32px);
  .paydetail-first{
    display: inline-block;
    width: 200px;
    margin-left: 22px;
  }
  .paydetail-two{
    display: inline-block;
    width: 230px;
  }
  .paydetail-text{
    display: inline-block;
    min-height: 30px;
    width: 460px;
    line-height: 45px;
  }
  .col-sum{
    color: $primaryColor;
  }
}
</style>