<template>
  <!-- 上架列表页面 -->
  <div class="page-bx bgc-w root-page">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <el-tabs v-model="currentTabsIndex" type="card" class="mr-t-20">
      <!-- v-permission="'shelf_list'" -->
      <el-tab-pane label="上架单" name="0" v-if="btnList.includes('shelf_list')">
        <ListingList />
      </el-tab-pane>
      <!-- v-permission="'shelf_idepotList'" -->
      <el-tab-pane label="上架入库单" name="1" v-if="btnList.includes('shelf_idepotList')">
        <StockInOrder />
      </el-tab-pane>
    </el-tabs>
    <div class="empty-text" v-if="!btnList.includes('shelf_list') && !btnList.includes('shelf_idepotList')">暂无数据</div>
  </div>
</template>

<script>
export default {
  components: {
    // 上架单
    ListingList: () => import('./components/ListingList'),
    // 上架入库单
    StockInOrder: () => import('./components/StockInOrder')
  },
  data() {
    return {
      currentTabsIndex: '0',
      btnList: []
    }
  },
  mounted() {
    this.btnList = sessionStorage.getItem('btnList') ? JSON.parse(sessionStorage.getItem('btnList')) : []
    this.currentTabsIndex = this.btnList.includes('shelf_list') ? '0' : '1'
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
