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
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        平台结算单：{{target.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        平台：{{target.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        店铺：{{target.shopName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        运营类型：{{target.shopTypeName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        客户名称：{{target.customerName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        结算日期：{{target.settlementDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        结算币种：{{target.settlementCurrency || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        外部结算单号：{{target.externalCode || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        发票编号：{{target.invoiceNo || '- -'}}
      </el-col>
    </el-row>
    <div class="mr-t-10"></div>
    <JFX-table
      :tableData.sync="tableData"
      :showPagination="false"
      :showSummary="true"
      :summaryMethod="getSummaries"
    >
    <el-table-column label="应收款项" align="center">
      <el-table-column label="项目" align="center" min-width="220" >
        <template slot-scope="scope">
          <div class="flex-c-c">
             <div class="table-item-bx flex-c-c">{{scope.row.parentProjectName}}</div> |
             <div class="table-item-bx flex-c-c">{{scope.row.projectName}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="totalNum" label="数量" align="center" min-width="110" ></el-table-column>
      <el-table-column prop="totalPrice" label="金额" align="center" min-width="110" ></el-table-column>
      <el-table-column label="币种" align="center" min-width="110" >
        <template>{{target.settlementCurrency}}</template>
      </el-table-column>
    </el-table-column>
    </JFX-table>
  </section>
</template>
<script>
import commomMix from '@m/index'
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
      target: {}
    }
  },
  created() {
    this.tableData.pageSize = 10000
    // this.tableData.list = [{}]
    const { month, tocSettlementReceiveBillDTO = {}, receiveMap = [], deductionMap = [], totalPriceLabel } = this.detail
    if (Array.isArray(receiveMap) && receiveMap.length > 0) {
      receiveMap[0].parentProjectName = '商品销售收入'
      receiveMap[0].projectName = receiveMap[0].project_name || ''
    }
    this.target = {
      ...tocSettlementReceiveBillDTO,
      month,
      totalPriceLabel
    }
    this.tableData.list = [...receiveMap, ...deductionMap]
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计：' + this.target.totalPriceLabel
          return false
        }
        if (index === 3) {
          sums[index] = this.target.settlementCurrency
          return false
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = ''
        }
      })
      return sums
    }
  }
}
</script>

<style lang="scss" scoped>
.table-item-bx{
  width: 49%
}
</style>
