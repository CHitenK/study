<template>
  <div class="home">
    <!-- logo 部分 -->
    <div class="home-img-box">
      <img sec="#" class="home-img" />
    </div>
    <!-- item 部分 -->
    <div class="item-box">
      <div class="item-box-list">
        <router-link to="/shops" class="home-item">
          <span>商铺</span>
        </router-link>
         <router-link to="/#" class="home-item home-item-marL">
          <span>船舶</span>
        </router-link>
         <router-link to="/#" class="home-item">
          <span>仓库</span>
        </router-link>
      </div>
      <div class="item-box-list">
        <router-link to="/#" class="home-item">
          <span>商铺</span>
        </router-link>
         <router-link to="/#" class="home-item home-item-marL">
          <span>板车</span>
        </router-link>
         <router-link to="/#" class="home-item">
          <span>接驳船</span>
        </router-link>
      </div>
      <div class="item-box-list">
        <router-link to="/#" class="home-item">
          <span>投诉</span>
        </router-link>
         <router-link to="/#" class="home-item home-item-marL">
          <span>活动申请</span>
        </router-link>
         <router-link to="/#" class="home-item">
          <span>车辆</span>
          <br>
          <span class="item-title">月保登记</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {},
  props: {},
  data() {
    return {
      listData: []
    }
  },
  computed: {},
  created() {
    this.fetchGetBranners()
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .home {
    padding-top: 0;
  }

  .home-search {
    position: fixed;
    top: 0;
    z-index: 2;
    height: 88px;
  }

  .mint-swipe, .v-img {
    height: 330px;
    width: 100%;
  }

  .mint-swipe-item-link {
     display: block;
  }
  //<!-- logo 部分 -->
  .home-img-box{
    width: 100%;
    height: 250px;
    margin-bottom: 50px;
    border: solid 1px red;
    .home-img{
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
  // <!-- item 部分 -->
  .item-box{
    width: 94%;
    margin: 20px auto 20px auto;
    .item-box-list{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      height: 230px;
      margin-bottom: 30px;
      .home-item{
        display: flex;
        width: 32%;
        flex-direction: column;
        height: 100%;
        align-items: center;
        border-radius: 15px;
        background: red;
        span{
          display: inline-block;
          font-size: 36px;
          color: #fff;
          margin-top: 40px;
        }
        .item-title{
          display: inline-block;
          margin-top: -20px;
        }
      }
      .home-item-marL{
        margin: 0 30px;
      }
   
    }
    
     
  }


</style>
