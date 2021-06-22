<template>
  <!-- 电商订单页面 -->
  <div class="page-bx bgc-w root-page">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <el-tabs v-model="activeName" type="card" class="mr-t-20">
      <!-- v-permission="'order_orderList'" -->
      <el-tab-pane label="发货订单管理" name="1" v-if="btnList.includes('order_orderList')">
        <DeliveryOrderManage v-if="activeName === '1'" />
      </el-tab-pane>
      <!-- v-permission="'order_orderReturnIdepotList'" -->
      <el-tab-pane label="售后退款管理" name="2" v-if="btnList.includes('order_orderReturnIdepotList')">
        <ReturnOrderManage v-if="activeName === '2'" />
      </el-tab-pane>
      <!-- v-permission="'order_businessUnitRecordList'" -->
      <el-tab-pane label="事业部补录列表" name="3" v-if="btnList.includes('order_businessUnitRecordList')">
        <SupplementaryList v-if="activeName === '3'" />
      </el-tab-pane>
    </el-tabs>
    <div class="empty-text" v-if="!btnList.includes('order_orderList') && !btnList.includes('order_orderReturnIdepotList') && !btnList.includes('order_businessUnitRecordList')">暂无数据</div>
  </div>
</template>

<script>
export default {
  components: {
    // 发货订单管理
    DeliveryOrderManage: () => import('./components/DeliveryOrderManage'),
    // 退货订单管理
    ReturnOrderManage: () => import('./components/ReturnOrderManage'),
    // 事业部补录列表
    SupplementaryList: () => import('./components/SupplementaryList')
  },
  data() {
    return {
      // 当前tab点击的name值
      activeName: '1',
      btnList: []
    }
  },
  mounted() {
    this.btnList = sessionStorage.getItem('btnList') ? JSON.parse(sessionStorage.getItem('btnList')) : []
    this.currentTabsIndex = this.btnList.includes('order_orderList') ? '1' : this.btnList.includes('order_orderReturnIdepotList') ? '2' : '3'
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
