<template>
  <!--  -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <el-tabs v-model="currentTabsIndex" type="card" class="mr-t-20">
      <el-tab-pane label="商品销售目标">
        <SalesTargetComp />
      </el-tab-pane>
      <el-tab-pane label="月度销售额目标">
        <MonthlySalesTarget />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {
    // 商品销售目标
    SalesTargetComp: () => import('./components/SalesTargetComp'),
    MonthlySalesTarget: () => import('./components/MonthlySalesTarget')
  },
  data() {
    return {
      currentTabsIndex: '0'
    }
  }
}
</script>
