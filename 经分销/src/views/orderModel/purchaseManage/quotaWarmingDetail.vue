<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <el-row  :gutter="10" class="fs-12 clr-II detail-row mr-t-10">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        事业部：{{detail.buName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        母品牌：{{detail.superiorParentBrand}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        项目总额度：{{detail.projectQuotaStr}}
      </el-col>
    </el-row>
    <div class="mr-t-15"></div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="累计采购金额" name="first">
        <div class="mr-t-10"></div>
        <JFX-table
          :tableData.sync="tableData1"
          @change="getList1"
          :showSummary="true"
          :summaryMethod="getSummaries"
        >
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="merchantName" label="公司" align="center" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column label="采购订单号" align="center" min-width="140">
            <template slot-scope="scope">{{scope.row.code}}</template>
          </el-table-column>
          <el-table-column label="PO号" align="center" min-width="130">
            <template slot-scope="scope">{{scope.row.poNo}}</template>
          </el-table-column>
          <el-table-column prop="num" label="采购数量" align="center" min-width="100"></el-table-column>
          <el-table-column label="采购金额(原币)" align="center" min-width="130">
            <template slot-scope="scope">
              {{detail.currency}} {{scope.row.amount}}
            </template>
          </el-table-column>
          <el-table-column label="折算汇率" align="center" min-width="80">
            <template slot-scope="scope">{{scope.row.rate}}</template>
          </el-table-column>
          <el-table-column label="汇率日期" align="center" min-width="110">
            <template slot-scope="scope">{{scope.row.rateDate}}</template>
          </el-table-column>
          <el-table-column prop="occupationAmount" label="占用金额" align="center" min-width="110">
            <template slot-scope="scope">
              {{detail.currency}} {{scope.row.occupationAmount}}
            </template>
          </el-table-column>
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="累计销售已回款金额" name="second">
        <div class="mr-t-10"></div>
        <JFX-table
          :tableData.sync="tableData2"
          @change="getList2"
          :showSummary="true"
          :summaryMethod="getSummaries"
        >
          <el-table-column type="index" label="序号" align="center" min-width="50"></el-table-column>
          <el-table-column prop="merchantName" label="公司" align="center" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column label="应收账单号" align="center" min-width="140" >
            <template slot-scope="scope">{{scope.row.code}}</template>
          </el-table-column>
          <el-table-column prop="typeLabel" label="结算类型" align="center"  min-width="80"></el-table-column>
          <el-table-column label="结算数量" align="center" min-width="80">
            <template slot-scope="scope">{{scope.row.num}}</template>
          </el-table-column>
          <el-table-column label="结算金额" align="center" min-width="130">
            <template slot-scope="scope">
              {{detail.currency}} {{scope.row.amount}}
            </template>
          </el-table-column>
          <el-table-column label="折算汇率" align="center" min-width="80">
            <template slot-scope="scope">{{scope.row.rate}}</template>
          </el-table-column>
          <el-table-column prop="normalNum" label="汇率日期" align="center" min-width="110">
            <template slot-scope="scope">{{scope.row.rateDate}}</template>
          </el-table-column>
          <el-table-column prop="occupationAmount" label="占用金额" align="center" min-width="110">
            <template slot-scope="scope">
              {{detail.currency}} {{scope.row.occupationAmount}}
            </template>
          </el-table-column>
        </JFX-table>
        <!-- <div class="flex-c-c mr-t-15">
          <span>
            占用总额: 19203
          </span>
        </div> -->
      </el-tab-pane>
    </el-tabs>
    <!-- title end -->
  </div>
</template>
<script>
import { getProjectQuotaWarningById, getItemListByPage } from '@a/purchaseManage/index'
export default {
  data() {
    return {
      activeName: 'first',
      tableData1: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      tableData2: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      detail: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { query } = this.$route
      if (!query.id) return false
      try {
       const res = await getProjectQuotaWarningById({ id: query.id })
       this.detail = res.data
       this.getList1(1)
       this.getList2(1)
      } catch (err) {
      }
    },
    // 累计采购金额 列表
    async getList1(pageNum) {
      try {
        const { query } = this.$route
        this.tableData1.loading = true
        this.tableData1.pageNum = this.tableData1.pageNum || pageNum
        // 同步方法
        const opt = {
          begin: (this.tableData1.pageNum - 1) * this.tableData1.pageSize,
          pageSize: this.tableData1.pageSize || 10,
          waringId: query.id,
          type: '1' // 明细类型 1-采购 2-应收
        }
				const res = await getItemListByPage(opt)
        this.tableData1.list = res.data.list
        this.tableData1.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData1.loading = false
    },
    // 累计销售 列表
    async getList2(pageNum) {
      try {
        const { query } = this.$route
        this.tableData2.loading = true
        this.tableData2.pageNum = this.tableData2.pageNum || pageNum
        // 同步方法
        const opt = {
          begin: (this.tableData2.pageNum - 1) * this.tableData2.pageSize,
          pageSize: this.tableData2.pageSize || 10,
          waringId: query.id,
          type: '2'
        }
				const res = await getItemListByPage(opt)
        this.tableData2.list = res.data.list
        this.tableData2.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData2.loading = false
    },
    // 统计
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return false
        }
        // 计算数量
        const numArr = data.map(gtem => Number(gtem.num || 0))
        if (column.property === 'num') {
          sums[index] = numArr.reduce((pre, cur) => {
            return pre + cur
          }, 0)
        }
        // 算占用金额
        const occupationAmountArr = data.map(gtem => Number(gtem.occupationAmount || 0))
        if (column.property === 'occupationAmount') {
          sums[index] = occupationAmountArr.reduce((pre, cur) => {
            return pre + cur
          }, 0)
          sums[index] = this.detail.currency + ' ' + sums[index]
        }
      })
      return sums
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-tabs__item{
  font-size: 12px;
}
</style>
