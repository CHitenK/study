<template>
  <!-- 上架列表页面 -->
  <div class="page-bx bgc-w root-page">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <el-tabs v-model="currentTabsIndex" type="card" class="mr-t-20">
      <el-tab-pane label="累计汇总表" name="1" v-if="btnList.includes('report_alltotal')">
        <GrandTotal v-if="currentTabsIndex === '1'" />
      </el-tab-pane>
      <el-tab-pane label="累计销售汇总表" name="2" v-if="btnList.includes('report_saletotal')">
        <SaleTotal v-if="currentTabsIndex === '2'" />
      </el-tab-pane>
      <el-tab-pane label="累计采购汇总表" name="3" v-if="btnList.includes('report_purchasetotal')">
        <PurchaseTotal v-if="currentTabsIndex === '3'" />
      </el-tab-pane>
    </el-tabs>
    <div class="empty-text" v-if="!btnList.includes('report_alltotal') && !btnList.includes('report_saletotal') && !btnList.includes('report_purchasetotal')">暂无数据</div>
  </div>
</template>

<script>
export default {
  components: {
    // 累计汇总表
    GrandTotal: () => import('./components/GrandTotal'),
    // 累计销售汇总表
    SaleTotal: () => import('./components/SaleTotal'),
    // 累计采购汇总表
    PurchaseTotal: () => import('./components/PurchaseTotal')
  },
  data() {
    return {
      currentTabsIndex: '1',
      btnList: []
    }
  },
  mounted() {
    this.btnList = sessionStorage.getItem('btnList') ? JSON.parse(sessionStorage.getItem('btnList')) : []
    this.currentTabsIndex = this.btnList.includes('report_alltotal') ? '1' : this.btnList.includes('report_saletotal') ? '2' : '3'
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
