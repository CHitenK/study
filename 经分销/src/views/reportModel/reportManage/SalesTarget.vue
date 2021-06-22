<template>
  <!-- 销售目标达成率页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <el-tabs v-model="activeName" type="card" class="mr-t-20">
      <el-tab-pane label="销售类型达成" name="1">
        <SalesTargetRate v-if="activeName === '1'" />
      </el-tab-pane>
      <el-tab-pane label="电商平台达成" name="2">
        <EcommerceReached v-if="activeName === '2'" />
      </el-tab-pane>
      <el-tab-pane label="店铺计划达成" name="3">
        <StorePlanAchieved v-if="activeName === '3'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {
    SalesTargetRate: () => import('./components/SalesTargetRate'), // 销售类型达成
    EcommerceReached: () => import('./components/EcommerceReached'), // 电商平台达成
    StorePlanAchieved: () => import('./components/StorePlanAchieved') // 店铺计划达成
  },
  data() {
    return { activeName: '1' }
  }
}
</script>
