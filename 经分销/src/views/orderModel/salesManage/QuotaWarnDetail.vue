<template>
  <!-- 客户额度预警页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 基础信息 -->
    <JFX-title title="基础信息" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        客户名称：{{detail.customerName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        客户总额度：{{detail.currency}} {{detail.customerQuota || '- -'}}
      </el-col>
    </el-row>
    <!-- 基础信息 end -->
    <el-tabs v-model="activeName" @tab-click="handleClick" class="mr-t-15">
      <el-tab-pane label="销售在途金额" name="1"></el-tab-pane>
      <!-- <el-tab-pane label="待出账单金额" name="2"></el-tab-pane> -->
      <el-tab-pane label="待确认账单金额" name="2"></el-tab-pane>
      <el-tab-pane label="待开票金额" name="3"></el-tab-pane>
      <el-tab-pane label="待回款金额" name="4"></el-tab-pane>
    </el-tabs>
    <JFX-table :tableData.sync="tableData"
      @selection-change="selectionChange"
      :tableColumn="tableColumn"
      :showSummary="true"
      :summaryMethod="getSummaries"
    >
    <template slot="amount" slot-scope="{row}">
      <span>{{row.currency}} {{row.amount}}</span>
    </template>
    <template slot="occupationAmount" slot-scope="{row}">
      <span>{{detail.currency}} {{row.occupationAmount}}</span>
    </template>
   </JFX-table>
  </div>
</template>

<script>
import commomMix from '@m/index'
import { getcustomerQuotaWarningDetail } from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 详情数据
      detail: {},
      activeName: '1', // 明细类型 1-销售在途 2-待确认 3-待开票 4-待回款
      tableColumn: [],
      tableColumnType1: [
        { label: '公司', prop: 'merchantName', align: 'center', hide: true, minWidth: '120' },
        { label: '销售订单号', prop: 'code', align: 'center', minWidth: '130', hide: true },
        { label: 'PO号', prop: 'poNo', align: 'center', minWidth: '130', hide: true },
        { label: '在途数量', prop: 'num', align: 'center', minWidth: '100', hide: true },
        { label: '结算金额(原币)', slotTo: 'amount', align: 'center', minWidth: '110', hide: true },
        { label: '折算汇率', prop: 'rate', align: 'center', minWidth: '110', hide: true },
        { label: '汇率日期', prop: 'rateDate', align: 'center', minWidth: '110', hide: true },
        { label: '占用金额', slotTo: 'occupationAmount', align: 'center', minWidth: '110', hide: true }
      ],
      tableColumnType2: [
        { label: '公司', prop: 'merchantName', align: 'center', hide: true, minWidth: '120' },
        { label: '应收账单号', prop: 'code', align: 'center', minWidth: '130', hide: true },
        { label: '结算类型', prop: 'receiveTypeLabel', align: 'center', minWidth: '100', hide: true },
        { label: '结算数量', prop: 'num', align: 'center', minWidth: '100', hide: true },
        { label: '结算金额', slotTo: 'amount', align: 'center', minWidth: '110', hide: true },
        { label: '折算汇率', prop: 'rate', align: 'center', minWidth: '110', hide: true },
        { label: '汇率日期', prop: 'rateDate', align: 'center', minWidth: '110', hide: true },
        { label: '占用金额', slotTo: 'occupationAmount', align: 'center', minWidth: '110', hide: true }
      ],
      waringId: ''
    }
  },
  mounted() {
    this.tableColumn = this.tableColumnType1
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const { id, buName, customerName, customerQuota, currency } = this.$route.query
      if (!id) return false
      this.waringId = id
      try {
        this.detail = { buName, customerName, customerQuota, currency }
        this.getList(1)
      } catch (error) {
        console.log(error)
      }
    },
    async getList(pageNum) {
      try {
        this.tableData.loading = true
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          waringId: this.waringId,
          type: this.activeName
        }
				const res = await getcustomerQuotaWarningDetail(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
    handleClick(e) {
      if (this.activeName === '1') {
        this.tableColumn = this.tableColumnType1
      } else {
        this.tableColumn = this.tableColumnType2
      }
      this.$nextTick(() => {
        this.getList(1)
      })
    },
    // 计算总和
    getSummaries({ data }) {
      const sums = []
      let numTotal = 0
      let occupationAmountTotal = 0
      data.forEach(item => {
        numTotal += +item.num
        occupationAmountTotal += +item.occupationAmount
      })
      sums[3] = `数量合计：${numTotal}`
      sums[7] = `金额占用合计：${(+occupationAmountTotal).toFixed(2)}`
      return sums
    }
  }
}
</script>
