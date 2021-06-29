<template>
  <div class="myApplication-page">

    <div class="myApplication-tab-one">
      <div class="tab-one-box">
         <span class="span-active">全部</span>
         <span>待处理</span>
         <span>已申请</span>
         <span>使用中</span>
         <span>已完成</span>
      </div>
    </div>

    <div class="myApplication-tab-two">
      <div class="tab-two-box">
         <span class="span-two-active">全部</span>
         <span>商铺</span>
         <span>仓库</span>
         <span>板车</span>
         <span>接驳船</span>
      </div>
    </div>

    <div class="myApplication-route">
      <router-view></router-view>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  .myApplication-page{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
  }
  .myApplication-tab-one{
    width: 100%;
    height: 90px;
    background: #ffffff;
  }
  .tab-one-box{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 690px;
    height: 100%;
    margin: 0 auto;
    span{
      @include font-dpr(30px);
      display: inline-block;
      height: 100%;
      line-height: 90px;
    }
    .span-active{
      border-bottom: solid 10px $primaryColor;
    }
  }
  .myApplication-tab-two{
    width: 100%;
    height: 90px;
    background: #e1e1e1;
    .tab-two-box{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 660px;
      height: 100%;
      margin: 0 auto;
      span{
        @include font-dpr(26px);
        display: inline-block;
        height: 100%;
        line-height: 90px;
        }
        .span-two-active{
          color: $primaryColor;
        }
      }
  }
  .myApplication-route{
    width: 100%;
    flex-grow: 1;
    background: $bgColor;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
