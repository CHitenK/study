<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="采购SD单详情" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        SD单号：{{detail.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        供应商：{{detail.supplierName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        采购订单号：{{detail.purchaseCode || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        采购币种：{{detail.currencyLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        入库时间：{{detail.inboundDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        PO号：{{detail.poNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        本币币种：{{detail.tgtCurrencyLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        单据类型：{{detail.typeLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        汇率：{{detail.rate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建人：{{detail.createName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建时间：{{detail.createDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        仓库：{{detail.depotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :span="12" >
        备注：{{detail.remarks || '- -'}}
      </el-col>
    </el-row>
    <!-- title -->
    <JFX-title title="商品SD明细" className="mr-t-20" />
    <JFX-table
      :tableData.sync="tableData1"
      :showPagination="false"
      :showSummary="true"
      :summaryMethod="getSummaries"
    >
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
      <el-table-column prop="goodsNo" label="商品货号" align="center" min-width="160"></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" align="center" min-width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="num" label="采购数量" align="center" min-width="80"></el-table-column>
      <el-table-column prop="price" label="采购单价" align="center" min-width="100"></el-table-column>
      <el-table-column prop="amount" label="采购金额" align="center" min-width="100">
        <template slot-scope="scope">{{scope.row.amount ? detail.currency + ' ' + scope.row.amount : '' }}</template>
      </el-table-column>
      <el-table-column prop="sdTypeName" label="SD类型" align="center" min-width="100"></el-table-column>
      <el-table-column prop="sdPrice" label="SD单价" align="center" min-width="100"></el-table-column>
      <el-table-column prop="sdAmount" label="SD金额" align="center" min-width="100">
        <template slot-scope="scope">{{scope.row.sdAmount ? detail.currency + ' ' + scope.row.sdAmount : '' }}</template>
      </el-table-column>
    </JFX-table>
  </div>
</template>
<script>
import { purchaseSdOrderDetailById } from '@a/purchaseManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      tableData1: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
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
       const res = await purchaseSdOrderDetailById({ id: query.id })
       this.detail = res.data
       this.tableData1.list = this.detail.itemList || []
      } catch (err) {
        console.log(err)
      }
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
          sums[index] = sums[index] || ''
        }
        // 计算采购金额
        const amountArr = data.map(gtem => Number(gtem.amount || 0))
        if (column.property === 'amount') {
          sums[index] = amountArr.reduce((pre, cur) => {
            return pre + cur
          }, 0)
          sums[index] = sums[index] ? this.detail.currency + ' ' + sums[index] : ''
        }
        // 计算SD金额
        const sdAmountArr = data.map(gtem => Number(gtem.sdAmount || 0))
        if (column.property === 'sdAmount') {
          sums[index] = sdAmountArr.reduce((pre, cur) => {
            return pre + cur
          }, 0)
          sums[index] = sums[index] ? this.detail.currency + ' ' + sums[index] : ''
        }
      })
      return sums
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
