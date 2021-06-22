<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  beforeDestroy() {
    // 清除权限列表
    sessionStorage.setItem('btnList', null)
  }
}
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
}
#nprogress .bar {
  background:	#00FF00 !important;
}
</style>
