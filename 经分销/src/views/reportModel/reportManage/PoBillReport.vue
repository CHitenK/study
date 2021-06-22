<template>
  <!-- 财务进销存关账页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <el-tabs v-model="activeName" type="card" class="mr-t-20">
      <el-tab-pane label="PO商品核销表" name="1">
        <PoBillVerification v-if="activeName === '1'" />
      </el-tab-pane>
      <el-tab-pane label="PO完结" name="2">
        <PoEnd v-if="activeName === '2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {
    PoBillVerification: () => import('./components/PoBillVerification'), // PO商品核销表
    PoEnd: () => import('./components/PoEnd') // PO完结
  },
  data() {
    return { activeName: '1' }
  }
}
</script>
