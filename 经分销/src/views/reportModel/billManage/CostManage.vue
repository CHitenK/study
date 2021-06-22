<template>
  <!-- 电商订单页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <el-tabs v-model="activeName" type="card" class="mr-t-20">
      <el-tab-pane label="费项配置" name="1">
        <CostAllocation v-if="activeName === '1'" />
      </el-tab-pane>
      <el-tab-pane label="平台费用映射" name="2">
        <PlatformCostMap v-if="activeName === '2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {
    // 费项配置
    CostAllocation: () => import('./components/CostAllocation'),
    // 平台费用映射
    PlatformCostMap: () => import('./components/PlatformCostMap')
  },
  data() {
    return {
      activeName: '1'
    }
  }
}
</script>
