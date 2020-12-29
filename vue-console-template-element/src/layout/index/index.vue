<template>
  <div class="app-page">
    <div class="app-page-left">
      <left-menu />
    </div>
    <div class="app-page-right">
      <div class="page-right-top">
        <right-top />
      </div>
      <div class="page-right-tag">
        <right-tag />
      </div>
      <div class="page-right-route">
        <router-view  />
        <!-- <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
            <router-view :key="key" />
          </keep-alive>
        </transition> -->
      </div>
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
    // cachedViews() {
    //   return [] // this.$store.state.tagsView.cachedViews
    // },
    // key() {
    //   return this.$route.path
    // }
  },
  data () {
    return {
      cachedViews: []
    }
  }
}
</script>
<style lang="scss">
// 左边菜单栏宽度
$leftMenuWid: 200px;
// 左边菜单栏高度
$leftMenuHei: 100vh;
// 右侧顶部高度
$topHei: 70px;
// tab栏高度
$tabHei: 40px;
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
  background-color: #008080;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
/* 左边菜单 end ***************/
/* 右侧 ***************/
.app-page-right{
  width: calc(100vw - #{$leftMenuWid});
  height: 100vh;
}
/* 右侧 end***************/
/* 右侧头部 **************/
.page-right-top{
  height: $topHei;
  width: 100%;
  background-color: #00BFFF;
}
/* 右侧头部 end **************/
.page-right-tag{
  height: $tabHei;
  width: 100%;
  border-top: solid 1px #f8f8f8;
  box-sizing: border-box;
}
.page-right-route{
  width: 100%;
  height: calc(100% - #{$topHei} - #{$tabHei});
  box-sizing: border-box;
  padding: 15px;
  background-color: #ffffff;
  overflow-x: scroll;
}
</style>
