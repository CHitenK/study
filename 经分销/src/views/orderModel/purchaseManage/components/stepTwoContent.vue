<template>
  <div class="tab-bx-detail">
    <el-tabs :tab-position="'left'" type="card" style="min-height: 400px;">
      <el-tab-pane :label="detail.saleOrderList && detail.saleOrderList.length > 0 ? '销售订单('+ detail.saleOrderList.length+')' : '销售订单(0)'">
         <step-twosales-order-bill v-if="detail.saleOrderList && detail.saleOrderList.length > 0" :targetArr="detail.saleOrderList || []"></step-twosales-order-bill>
      </el-tab-pane>
      <el-tab-pane :label="detail.purchaseList && detail.purchaseList.length > 0 ? '采购订单('+ detail.purchaseList.length+')' : '采购订单(0)'">
         <step-twopurchase-order-bill v-if="detail.purchaseList && detail.purchaseList.length > 0" :targetArr="detail.purchaseList || []"></step-twopurchase-order-bill>
      </el-tab-pane>
      <el-tab-pane :label="detail.purchaseContractList && detail.purchaseContractList.length > 0 ? 'PO 合同('+ detail.purchaseContractList.length+')' : 'PO 合同(0)'">
        <step-two-contract v-if="detail.purchaseContractList && detail.purchaseContractList.length > 0" :targetArr="detail.purchaseContractList || []"></step-two-contract>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import commomMix from '@m/index'
export default {
  props: {
    detail: {
      type: Object,
      default: function() {
        return {}
      }
    },
    name: {
      type: String,
      default: ''
    }
  },
  mixins: [commomMix],
  components: {
    stepTwosalesOrderBill: () => import('./stepTwosalesOrderBill'),
    stepTwopurchaseOrderBill: () => import('./stepTwopurchaseOrderBill'),
    stepTwoContract: () => import('./stepTwoContract')
  },
  data() {
    return {
      order: {},
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      contractDetail: {}
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
.pad-left-10{
  box-sizing: border-box;
  padding:15px;
}
.w-200{
  display: inline-block;
  width: 220px;
  text-align: right;
}
.tab-bx-detail{
  max-height: calc(100vh - 320px);
  overflow: auto;
}
</style>
