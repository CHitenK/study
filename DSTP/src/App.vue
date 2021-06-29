<template>
  <div id="app">
    <router-view v-if="isShow" :key="$route.path + $route.query.t"/>
    <!--<div class="app-window">
      <p>{{msg}}</p>
    </div>-->
  </div>
</template>
<script>
  import {addClass, removeClass} from "./assets/utils/domClass";

  export default {
    data(){
      return{
        isShow: true,
        msg: '全球优品分拨中心数字贸易服务平台即将上线'
      }
    },
    mounted () {
      window.addEventListener('scroll', this.scrollToTop)
        if(this.$i18n.locale == 'en'){
            document.body.style.fontFamily = 'frutiger';
            document.body.setAttribute("id","en")
        }else{
            document.body.setAttribute("id","")
        }
    },
    methods:{
      scrollToTop() {
    　　var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    　　if(scrollTop === 0){
          removeClass(document.getElementById('headers'),'on')
        }else{
          addClass(document.getElementById('headers'),'on')
        }
      },
    },
    watch: {
      '$route': function(to,from){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        //this.isShow = false
      }
    }
}
</script>
<style lang="less">
  #app2{
    overflow: hidden;
    position: fixed;
    height: 100%;
    width: 100%;
  .app-window{
    position: fixed;
    z-index: 99999;
      height: 100%;
      width: 100%;
    text-align: center;
    top:0;
    left: 0;
    background-color:rgba(24,73,181,0.3);
      color: #fff;
      p{
        .home-center;
        .media-font(0.45rem);
      }
    }
  }
</style>

