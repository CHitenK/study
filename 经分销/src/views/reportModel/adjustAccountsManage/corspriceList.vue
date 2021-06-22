<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <div class="mr-t-15"></div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="单价管理" name="first">
         <cors-prive-list></cors-prive-list>
      </el-tab-pane>
      <el-tab-pane label="待审核单价" name="sec">
        <wait-examine-price-list></wait-examine-price-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  components: {
    corsPriveList: () => import('./components/corsPriveList'),
    waitExaminePriceList: () => import('./components/waitExaminePriceList')
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>
<style lang="scss" scope>
</style>
