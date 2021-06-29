<template>
  <section class="mine-modules">
    <div class="pay-for list-betten border-b">
      <span class="pay-for-title">我的待缴费</span>
      <router-link to="/wpay">
        <span class="pay-for-check">
          查看明细 <v-icon class="rotate-180"  icon="nav_icon_back"></v-icon>
        </span>
      </router-link>  
    </div>
    <div class="lists-box">
       <div class="lists-box-item list-betten border-b">
          <span class="item-text ">商铺</span>
          <span class="item-text item-text-c3">
            ￥ 12000
          </span>
       </div>
        <div class="lists-box-item list-betten border-b">
          <span class="item-text ">仓库</span>
          <span class="item-text item-text-c3">
            ￥ 12000
          </span>
       </div>
        <div class="lists-box-item list-betten border-b">
          <span class="item-text ">板车</span>
          <span class="item-text item-text-c3">
            ￥ 12000
          </span>
       </div>
       <div class="lists-box-item  list-betten">
          <span class="item-text ">船舶</span>
          <span class="item-text item-text-c3">
            ￥ 12000
          </span>
       </div>
    </div>

    <div class="pay-for list-betten border-b">
      <span class="pay-for-title">我的申请</span>
      <span class="pay-for-check">
        <router-link to="/myApplication">
          查看全部申请 <v-icon class="rotate-180"  icon="nav_icon_back"></v-icon>
        </router-link>
      </span>
    </div>
    <nav class="modules-nav">
      <li>
        <a href="javaScript: void(0);"><v-icon icon=""></v-icon><span>待处理</span></a>
      </li>
      <li>
        <a href="javaScript: void(0);"><v-icon icon=""></v-icon><span>已申请</span></a>
      </li>
      <li>
        <a href="javaScript: void(0);"><v-icon icon=""></v-icon><span>处理中</span></a>
      </li>
      <li>
        <a href="javaScript: void(0);"><v-icon icon=""></v-icon><span>已完成</span></a>
      </li>
    </nav>
     
    <div class="pay-for list-betten pay-for-onlyone ">
      <span class="pay-for-title">我的票务</span>
      <span class="pay-for-check">
        <v-icon class="rotate-180"  icon="nav_icon_back"></v-icon>
      </span>
    </div>

    <div class="pay-for pay-for-onlyone list-betten " >
      <span class="pay-for-title">我的账单</span>
      <span class="pay-for-check">
        <v-icon class="rotate-180"  icon="nav_icon_back"></v-icon>
      </span>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
   // list 高度
   $listHeight: 110px;
  // 内容
  .mine-modules{
    width: 690px;
    margin: 70px auto 0px;

    .modules-title{
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 30px;
      color: $blackColor-2;
      background-color: #ffffff;
      border-radius: 20px 20px 0px 0px;
    }

    .modules-nav{
      display: flex;
      height: 176px;
      border-radius: 0px 0px 20px 20px;
      background-color: #ffffff;

      li{
        flex: 1;
        text-align: center;

        a{
          display: block;
          height: 100%;
          padding-top: 0.533333rem;
          box-sizing: border-box;
        }

        .v-icon{
          width: 48px;
          height: 48px;
          margin-bottom: 24px;
        }

        span{
          display: block;
        }
      }
    }

    .mine-module{
      background-color: #ffffff;
      margin-top: 30px;
      border-radius: 20px;

      a{
        display: flex;
        align-items: center;
        height: 83px;
        line-height: 83px;
        padding: 0px 30px;

        span{
          flex: 1;
        }

        .v-icon{
          width: 32px;
          height: 32px;
          color: $blackColor-2;
        }
      }
    }
  }
  .pay-for{
    height: $listHeight;
    width: 100%;
    border-radius: 20px 20px 0 0;
    background: #fff;
    align-items: center;
  }
  .pay-for-title{
    margin-left: 30px;
    @include  font-dpr(32px);
    color: $blackColor;
    font-weight: 600;
  }
  .pay-for-check{
    color: $blackColor-3;
    @include  font-dpr(30px);
    margin-right: 30px;
  }
  .lists-box{
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    padding: 0 30px;
    border-radius: 0 0 20px 20px;
    margin-bottom: 30px;
  }
  .lists-box-item{
    width: 100%;
    height:$listHeight;
  }
  .item-text{
    color: $blackColor-3;
    @include  font-dpr(32px);
  }
  .item-text-c3{
    color: $blackColor;
    @include  font-dpr(32px);
  }
  .lists-box-item {
    align-items: center;
  }
  .pay-for-onlyone{
    border-radius: 20px;
    margin-top: 30px;
  }
</style>
