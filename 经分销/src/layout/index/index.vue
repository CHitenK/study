<template>
  <div class="app-page">
    <div v-if="!isOldMedium" :class="!isCollapse ? 'app-page-left' : 'app-page-left app-page-left-suo'">
      <div class="logo-bx flex-c-c">
         <span class="fs-26 clr-w" v-if="!isCollapse">
           经分销系统
         </span>
      </div>
      <left-menu />
    </div>
    <div v-if="!isOldMedium" :class="!isCollapse ? 'app-page-right' : 'app-page-right app-page-right-suo' ">
      <div class="page-right-top">
        <right-top />
      </div>
      <div class="page-right-tag">
        <right-tag />
      </div>
      <div class="page-right-route page-right-route-hastag scroll-bx bgc-I"  @scroll="scrollEvent">
        <keep-alive >
          <router-view v-if="!$route.meta.nocache"></router-view>
        </keep-alive>
        <router-view v-if="$route.meta.nocache"></router-view>
      </div>
    </div>
    <div v-else class="page-right-route scroll-bx bgc-I" style="height: 100%;"  @scroll="scrollEvent">
      <keep-alive >
        <router-view v-if="!$route.meta.nocache"></router-view>
      </keep-alive>
      <router-view v-if="$route.meta.nocache"></router-view>
    </div>
  </div>
</template>
<script>
import leftMenu from './components/leftMenu'
import rightTop from './components/rightTop'
import rightTag from './components/tag'
export default {
  components: {
    leftMenu,
    rightTop,
    rightTag
  },
  computed: {
    isCollapse() {
      return this.$store.getters.isCollapse
    },
    // 是否时旧系统加载进入
    isOldMedium() {
      return sessionStorage.getItem('from') === 'oldsystem'
    }
  },
  data() {
    return {
      cachedViews: []
    }
  },
  methods: {
    scrollEvent(e) {
      this.$store.dispatch('base/AC_UPDATE_STATE', { key: 'scrollTop', value: e.target.scrollTop })
    },
    // 是否不缓存
    isKeepAlive(row) {
      return !row.meta.nocache
    }
  }
}
</script>
<style lang="scss">
// 左边菜单栏宽度
$leftMenuWid: 200px;
$leftMenuWidSuo: 70px;
// 左边菜单栏高度
$leftMenuHei: 100vh;
// 右侧顶部高度
$topHei: 70px;
// tab栏高度
$tabHei: 36px;
.app-page{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-self: start;
}
/* 左边菜单 ***************/
.app-page-left{
  width: $leftMenuWid;
  height: $leftMenuHei;
  background-color: #ffffff;
  box-shadow: 4px 0 5px -3px #c5c7ca;
  z-index: 1;
}
.app-page-left-suo{
  width: $leftMenuWidSuo;
}
/* 左边菜单 end ***************/
/* 右侧 ***************/
.app-page-right{
  width: calc(100vw - #{$leftMenuWid});
  height: 100vh;
  box-sizing: border-box;
}
.app-page-right-suo{
  width: calc(100vw - #{$leftMenuWidSuo});
}
/* 右侧 end***************/
/* 右侧头部 **************/
.page-right-top{
  height: $topHei;
  width: 100%;
  background-color: #6ea9f3;
}
/* 右侧头部 end **************/
.page-right-tag{
  height: $tabHei;
  width: 100%;
  border-bottom: solid 1px #eaeaea;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
  z-index: 1;
}
.page-right-route{
  width: 100%;
  height: calc(100% - #{$topHei});
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 15px 0px 15px 15px;
}
.page-right-route-hastag{
  height: calc(100% - #{$topHei} - #{$tabHei});
}
.logo-bx{
  width: 100%;
  height: 70px;
  background-color: #6ea9f3 ;
}
.scroll-bx{
  &::-webkit-scrollbar {
    width: 12px;  /*滚动条宽度*/
    height: 16px;  /*滚动条高度*/
  }
  /*定义滚动条轨道 内阴影+圆角*/
  &::-webkit-scrollbar-track {
      border-radius: 10px;  /*滚动条的背景区域的圆角*/
      background-color: transparent; /*滚动条的背景颜色*/
  }
  /*定义滑块 内阴影 + 圆角*/
  &::-webkit-scrollbar-thumb  {
      border-radius: 10px;  /*滚动条的圆角*/
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .2);
      background-color: rgba(0,0,0,.04);  /*滚动条的背景颜色*/
  }
}
</style>
