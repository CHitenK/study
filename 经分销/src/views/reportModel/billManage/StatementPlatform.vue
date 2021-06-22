<template>
  <!-- 平台结算单页面 -->
  <div class="page-bx bgc-w root-page">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <el-tabs v-model="activeName" type="card" class="mr-t-20">
      <el-tab-pane label="平台结算单" name="1">
        <StatementPlatformComp v-if="btnList.includes('platformStatement_orderList')"  />
      </el-tab-pane>
      <el-tab-pane label="平台费用单" name="2">
        <PlatformFeeSheet v-if="btnList.includes('platformCost_orderList')" />
      </el-tab-pane>
    </el-tabs>
    <div class="empty-text" v-if="!btnList.includes('platformStatement_orderList') && !btnList.includes('platformCost_orderList')">暂无数据</div>
  </div>
</template>

<script>
export default {
  components: {
    // 费项配置
    StatementPlatformComp: () => import('./components/StatementPlatformComp'),
    // 平台费用映射
    PlatformFeeSheet: () => import('./components/PlatformFeeSheet')
  },
  data() {
    return {
      activeName: '1',
      btnList: []
    }
  },
  mounted() {
    this.btnList = sessionStorage.getItem('btnList') ? JSON.parse(sessionStorage.getItem('btnList')) : []
    this.activeName = this.btnList.includes('platformStatement_orderList') ? '1' : '2'
  }
}
</script>

<style lang="scss" scoped>
.root-page {
  position: relative;
}
.empty-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #909399;
}
</style>
