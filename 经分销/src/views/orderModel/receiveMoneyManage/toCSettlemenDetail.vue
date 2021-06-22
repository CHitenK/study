<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="应收汇总" name="first">
        <receive-summary-tab v-if="id" :detail="detail"></receive-summary-tab>
      </el-tab-pane>
      <el-tab-pane label="应收详情" name="second">
        <receive-detail-tab v-if="id" :detail="detail"></receive-detail-tab>
      </el-tab-pane>
      <el-tab-pane label="附件审批记录" name="third">
        <audit-record-tab v-if="id" :detail="detail"></audit-record-tab>
      </el-tab-pane>
      <el-tab-pane label="核销记录" name="fourth">
        <writeoff-record-tab v-if="id" :detail="detail"></writeoff-record-tab>
      </el-tab-pane>
    </el-tabs>
    <div class="mr-t-20 flex-c-c" v-if="type === 'edit'">
      <el-button type="primary" @click="linkTo('/receivemoney/repairDeduction?id=' + id + '&code=' + code + '&customerId=' + customerId)">添加不扣款</el-button>
      <el-button @click="closeTag" id="cancel_ret">取 消</el-button>
      <el-button type="primary" @click="save" :loading="saveLoading">提交</el-button>
    </div>
  </div>
</template>
<script>
import { toCReceiveBillDetail } from '@a/receiveMoneyManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    receiveSummaryTab: () => import('./components/receiveSummaryTab'),
    receiveDetailTab: () => import('./components/receiveDetailTab'),
    writeoffRecordTab: () => import('./components/writeoffRecordTab'),
    auditRecordTab: () => import('./components/auditRecordTab')
  },
  data() {
    return {
      activeName: 'first',
      detail: {},
      id: '',
      type: 'detail',
      code: '',
      customerId: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { query } = this.$route
      if (!query.id) return false
      if (query.type) this.type = query.type
      try {
       const res = await toCReceiveBillDetail({ id: query.id })
       this.detail = res.data
       this.id = query.id
       this.code = res.data.tocSettlementReceiveBillDTO.code || ''
       this.customerId = res.data.tocSettlementReceiveBillDTO.customerId || ''
      } catch (err) {
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
