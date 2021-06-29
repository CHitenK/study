<template>
  <div class="mine-page">
    <!-- 个人中心 - 页眉 -->
    <header class="mine-header">
      <div class="header-pic">
        <v-img :src="headPicUrl" class="icon-preview" />
      </div>
      <div class="header-info">
        <div class="info-phone">13367587133</div>
        <div class="info-btn">
         <span class="info-status">已绑定乐天商铺</span>
        </div>
      </div>
      <div class="header-tools">
        <span>
         <v-icon class="rotate-180"  icon="nav_icon_back"></v-icon>
        </span>
       <!--  <span><v-icon icon="nav_nav_icon_set"></v-icon></span>
        <span><v-icon icon="nav_icon_message"></v-icon></span> -->
      </div>
    </header>
    <!-- End 个人中心 - 页眉 -->

    <!-- 个人中心 - 切换工具 -->
    <div class="mine-tool">
   <!--    <div class="tool-btn" @click="module = 'seller'" v-if="module === 'buyer'"><v-icon icon="icon_transform"></v-icon>切换为卖家</div>
      <div class="tool-btn" @click="module = 'buyer'" v-else><v-icon icon="icon_transform"></v-icon>切换为买家</div> -->
    </div>
    <!-- End 个人中心 - 切换工具 -->

    <!-- 个人中心 - 内容 -->
    <buyer-module v-if="module === 'buyer'"></buyer-module>
    <seller-module v-else></seller-module>
    <!-- End 个人中心 - 内容 -->
  </div>
</template>

<script>
import UserAPI from '@/api/user'

import BuyerModule from './components/buyerModule'

export default {
  data() {
    return {
      headPicUrl: '',
      errorHeadPicUrl: '',
      phone: '',
      authStatus: '',
      module: 'buyer'
    }
  },
  created() {
    // 获取账号基本信息
    UserAPI.getUserBaseInfo().then(response => {
      var data = response.data
      this.headPicUrl = data.headPicUrl || ''
      this.phone = data.phone
      this.authStatus = data.authStatus || this.authStatus
    }).catch(e => {

    })
  },
  components: {
    BuyerModule,
  },
  methods: {
    uploadValidateHandler(file) {
      const isJPG = ['image/jpeg', 'image/png'].some((v) => v === file.type)
      const isLt5M = file.size / 1024 / 1024 < 5
      return isJPG && isLt5M
    },
    uploadSuccessHandler(res, file) {
      this.headPicUrl = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
  .mine-page{
    height: 100%;
    padding-bottom: 60px;
    overflow-y: auto;
    background-color: $bgColor;
  }
  // 页眉 
  .mine-header{
    display: flex;
    box-sizing: border-box;
    height: 320px;
    padding: 30px 30px 0px;
    background-image: url('~@/assets/imgs/mine/my_bg_top@3x.png');
    background-size: 100%;

    .header-pic{
      position: relative;
      margin-right: 20px;
      
      .v-img{
        width: 124px;
        height: 124px;
        border-radius: 50%;
        border: 1px solid #ffffff;
        vertical-align: middle;
      }
    }

    .header-info{
      .info-phone{
        font-size: 36px;
        color: #ffffff;
        margin: 20px 0;
      }

      .info-btn{

        .v-icon{
          width: 26px;
          height: 26px;
          margin-right: 8px;
          vertical-align: middle;
        }
        .auth-info{
          display: inline-block;
          width: 148px;
          height: 36px;
          line-height: 36px;
          padding: 0px 12px;
          border-radius: 6px;
          font-size: 22px;
          color: $primaryColor;
          background-color: #ffffff;
          box-sizing: border-box;

          > span{
            vertical-align: text-top;
          }
        }
        .auth-info + .auth-info{
          margin-left: 20px;
        }
      }
    }

    .header-tools{
      flex: 1;
      text-align: right;
      margin-top: 20px;

      span:first-child{
        margin-right: 0px;
      }

      .v-icon{
        width: 36px;
        height: 38px; 
        color: #ffffff;
      }
    }
  }
  // 切换工具
  .mine-tool{
    margin-top: -180px;

    .tool-btn{
      width: 202px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 26px;
      color: #ffffff;
      background-color: rgba($color: #ffffff, $alpha: .2);
      border-radius: 25px;
      margin: 0 auto;

      .v-icon{
        width: 24px;
        height: 24px;
        margin-right: 12px;
      }
    }
  }
  // 后来新增
  .info-status{
    display: inline-block;
    width: 230px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    @include  font-dpr(22px);
    background: rgba(250,250,250,.3);
    border-radius: 25px;
  }
</style>
