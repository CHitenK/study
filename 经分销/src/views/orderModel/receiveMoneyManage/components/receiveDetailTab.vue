
<template>
  <section>
    <p class="mr-t-15 clr-II fs-18 flex-c-c">
      <span v-if="target.month">{{target.month}}月</span>{{target.customerName}}应收账单
    </p>
    <el-row  :gutter="10" class="fs-12 clr-II mr-t-20 target-row">
      <el-col class="mr-b-20 flex-b-c" :span="24" >
        <span class="clr-act">事业部：{{target.buName || '- -'}}</span>
        <span class="clr-act">账单创建日期：{{target.createDate || '- -'}}</span>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName">
      <el-tab-pane label="应收明细" name="first">
        <JFX-table
          :tableData.sync="tableData"
          @change="getList"
        >
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="externalCode" label="外部订单号" align="center" min-width="160"></el-table-column>
          <el-table-column prop="goodsNo" label="商品货号" align="center" min-width="130"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称" align="center" min-width="130"></el-table-column>
          <el-table-column prop="num" label="销售数量" align="center" min-width="80"></el-table-column>
          <el-table-column prop="projectName" label="结算费项" align="center" min-width="120"></el-table-column>
          <el-table-column prop="parentBrandName" label="母品牌" align="center" min-width="120"></el-table-column>
          <el-table-column prop="originalAmount" label="结算金额（原币）" align="center" min-width="80"></el-table-column>
          <el-table-column prop="settlementRate" label="结算汇率" align="center" min-width="80"></el-table-column>
          <el-table-column prop="rmbAmount" label="结算金额（RMB）" align="center" min-width="80"></el-table-column>
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="费用明细" name="second">
         <JFX-table
          :tableData.sync="tableData1"
          @change="getList1"
        >
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="externalCode" label="外部订单号" align="center" min-width="160"></el-table-column>
          <el-table-column prop="goodsNo" label="商品货号" align="center" min-width="130"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称" align="center" min-width="130"></el-table-column>
          <el-table-column prop="num" label="销售数量" align="center" min-width="80"></el-table-column>
          <el-table-column prop="projectName" label="结算费项" align="center" min-width="120"></el-table-column>
          <el-table-column prop="parentBrandName" label="母品牌" align="center" min-width="120"></el-table-column>
          <el-table-column prop="originalAmount" label="结算金额（原币）" align="center" min-width="80"></el-table-column>
          <el-table-column prop="settlementRate" label="结算汇率" align="center" min-width="80"></el-table-column>
          <el-table-column prop="rmbAmount" label="结算金额（RMB）" align="center" min-width="80"></el-table-column>
          <el-table-column prop="billTypeLabel" label="类型" align="center" min-width="80"></el-table-column>
        </JFX-table>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
import commomMix from '@m/index'
import { listReceiveItem, listReceiveCostItem } from '@a/receiveMoneyManage/index'
export default {
  mixins: [commomMix],
  props: {
    detail: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      target: {},
      activeName: 'first',
      id: '',
      tableData1: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    const { month, tocSettlementReceiveBillDTO = {} } = this.detail
    this.target = {
      customerName: tocSettlementReceiveBillDTO.customerName,
      buName: tocSettlementReceiveBillDTO.buName,
      createDate: tocSettlementReceiveBillDTO.createDate,
      month
    }
  },
  mounted() {
    this.getList(1)
    this.getList1(1)
  },
  methods: {
    async getList(pageNum) {
      try {
        this.tableData.loading = true
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          billId: this.id
        }
        const res = await listReceiveItem(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
      } catch (error) {
        console.log(error)
      }
      this.tableData.loading = false
    },
    async getList1(pageNum) {
      try {
        this.tableData1.loading = true
        this.tableData1.pageNum = pageNum || this.tableData1.pageNum
        // 同步方法
        const opt = {
          begin: (this.tableData1.pageNum - 1) * this.tableData1.pageSize,
          pageSize: this.tableData1.pageSize || 10,
          billId: this.id
        }
        const res = await listReceiveCostItem(opt)
        this.tableData1.list = res.data.list
        this.tableData1.total = res.data.total
      } catch (error) {
        console.log(error)
      }
      this.tableData1.loading = false
    }
  }
}
</script>
