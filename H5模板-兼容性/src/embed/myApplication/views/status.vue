<template>
  <div class="status-page">
    <div class="status-page-list">
      <div class="item-one border-b">
        <span>
          <img src="./../../../assets/imgs/auction/icon_pmdt_jpcg@3x.png" class="item-img"  />
          仓库&nbsp;&nbsp;&nbsp;No.1323
        </span>
        <span class="color-p">待处理</span>
      </div>
      <div class="item-two border-b">
        <div class="item-model">
          <span>仓库类型</span>
          <span class="color-p">已缴纳押金600元</span>
        </div>
        <div class="item-model" style="margin-top:10px">
          <span class="model-date">使用时间:201810.20-2018.10.29</span>
          <span class="model-time">10.20 10:00:00</span>
        </div>
        <div class=""></div>
      </div>
      <div class="item-three">
        <span class="status-btn-noborder">查看</span>
        <span class="status-btn">查看</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$paddWd: 15px;
.status-page{
  width: 690px;
  margin: 20px auto;
}
.status-page-list{
  width: 100%;
  background: #fff;
  @include font-dpr(30px);
  .item-one{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    padding: 0 $paddWd;
    .item-img{
      display: inline-block;
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }
  }
  .item-two{
    width: 100%;
    padding: 30px $paddWd;
    box-sizing: border-box;
    .item-model{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      @include font-dpr(30px);
      color: #000;
      .model-date{
        color: $blackColor-3;
        @include font-dpr(26px);
      }
      .model-time{
        @include font-dpr(20px);
        color: $blackColor-3;
      }
    }
  }
  .item-three{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    padding: 0px $paddWd;
    box-sizing: border-box;
    height: 90px;
    color: #fff;
    .status-btn{
      display: inline-block;
      width: 180px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background: $btnGradientBgColor;
      border-radius: 30px;
      margin-left: 20px;
    }
    .status-btn-noborder{
      display: inline-block;
      width: 180px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background: #fff;
      border-radius: 30px;
      border: solid 1px $blackColor-3;
      color:$blackColor-3
    }
  }
 
}
.color-p{
  color: $primaryColor;
}
</style>
