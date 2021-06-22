<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="基础信息" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        上架日期：{{detail.shelfDate ? detail.shelfDate.substring(0, 10) : '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        客户：{{detail.customerName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        事业部：{{detail.buName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        PO号：{{detail.poNo}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        应收结算状态：{{detail.saleTypeLabel}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        销售订单号：{{detail.orderCode}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        上架单号：{{detail.shelfCode}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        应收账单号：{{detail.receiveCode}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        销售币种：{{detail.currency}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        销售类型：{{detail.saleTypeLabel}}
      </el-col>
    </el-row>
    <div class="mr-t-15"></div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="应收核销明细" name="first">
        <div class="mr-t-10"></div>
        <JFX-table
          :tableData.sync="tableData1"
          @change="getList1"
        >
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="goodsNo" label="商品货号" align="center" min-width="160"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称" align="center" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="shelfNum" label="上架好品量" align="center" min-width="90"></el-table-column>
          <el-table-column prop="price" label="销售单价" align="center" min-width="90">
            <template slot-scope="scope">
              {{scope.row.price ? detail.currency + ' ' + scope.row.price : '' }}
            </template>
          </el-table-column>
          <el-table-column prop="purchaseNum" label="暂估应收金额" align="center" min-width="110">
            <template slot-scope="scope">{{scope.row.shelfNum && scope.row.price ? (Number(scope.row.shelfNum) * Number(scope.row.price)).toFixed(2) : '' }}</template>
          </el-table-column>
          <!-- <el-table-column prop="tallyingNum" label="核销暂估应收金额" align="center" min-width="80">
            <template slot-scope="scope">{{detail.status === '5' ? (scope.row.shelfNum && scope.row.price ? (Number(scope.row.shelfNum) * Number(scope.row.price)).toFixed(2) : '' ) : 0}}</template>
          </el-table-column> -->
          <el-table-column prop="verifiyAmount" label="已核销金额" align="center" min-width="100">
            <template slot-scope="scope">
              {{scope.row.verifiyAmount || 0 }}
            </template>
          </el-table-column>
          <el-table-column prop="beVerifyAmount" label="待核销金额" align="center" min-width="100">
            <template slot-scope="scope">
              {{scope.row.beVerifyAmount || 0 }}
            </template>
          </el-table-column>
          <el-table-column prop="receiveCode" label="应收账单号" align="center" min-width="130"></el-table-column>
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="返利核销明细" name="second">
        <div class="mr-t-10"></div>
        <JFX-table
          :tableData.sync="tableData2"
          @change="getList2"
        >
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="relSdCode" label="销售SD单号" align="center" min-width="160"></el-table-column>
          <el-table-column prop="goodsNo" label="商品货号" align="center" min-width="160"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称" align="center" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="shelfNum" label="上架好品量" align="center" min-width="90"></el-table-column>
          <el-table-column label="销售单价" align="center" min-width="90">
            <template slot-scope="scope">
              {{scope.row.price ? detail.currency + ' ' + scope.row.price : '' }}
            </template>
          </el-table-column>
          <el-table-column prop="sdTypeName" label="SD类型" align="center" min-width="90"></el-table-column>
          <el-table-column prop="projectName" label="映射费项" align="center" min-width="100"></el-table-column>
          <el-table-column prop="rebateAmount" label="暂估返利金额" align="center" min-width="110"> </el-table-column>
          <!-- <el-table-column prop="verifyRebateAmount" label="核销暂估返利金额" align="center" min-width="80"></el-table-column> -->
          <el-table-column prop="verifyRebateAmount" label="已核销返利金额" align="center" min-width="80"></el-table-column>
          <el-table-column label="待核销返利金额" align="center" min-width="80">
            <!-- 待核销返利金额=暂估返利金额-已核销返利金额，允许出现负数值 -->
            <template slot-scope="scope">
              {{(cope.row.rebateAmount || 0) - (scope.row.verifyRebateAmount || 0)}}
            </template>
          </el-table-column>
        </JFX-table>
      </el-tab-pane>
    </el-tabs>
    <!-- title end -->
  </div>
</template>
<script>
import { getDetailsById, toBTempBillVerifyList, toBTempBillVerifyRebateItemList } from '@a/receiveMoneyManage/index'
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
  filters: {
    fifterUnit(val) {
      switch (val + '') {
        case '00': return '托盘'
        case '01': return '箱'
        case '02': return '件'
        default: return ''
      }
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
       const res = await getDetailsById({ id: query.id })
       this.detail = res.data
       this.getList1(1)
       this.getList2(1)
      } catch (err) {
      }
    },
    // 应收核销明细
    async getList1(pageNum) {
      try {
        this.tableData1.loading = true
        this.tableData1.pageNum = pageNum || this.tableData1.pageNum
        // 同步方法
        const opt = {
          begin: (this.tableData1.pageNum - 1) * this.tableData1.pageSize,
          pageSize: this.tableData1.pageSize || 10,
          receiveId: this.detail.id
        }
				const res = await toBTempBillVerifyList(opt)
        this.tableData1.list = res.data.list
        this.tableData1.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData1.loading = false
		},
    // 返利核销明细
    async getList2(pageNum) {
      try {
        this.tableData2.loading = true
        this.tableData2.pageNum = pageNum || this.tableData2.pageNum
        // 同步方法
        const opt = {
          begin: (this.tableData2.pageNum - 1) * this.tableData2.pageSize,
          pageSize: this.tableData2.pageSize || 10,
          receiveId: this.detail.id
        }
				const res = await toBTempBillVerifyRebateItemList(opt)
        this.tableData2.list = res.data.list
        this.tableData2.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData2.loading = false
		}
  }
}
</script>
<style lang="scss" scoped>

</style>
