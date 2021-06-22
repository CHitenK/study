<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="理货单据详情" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        采购入库状态：{{detail.stateLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        入库时间：{{detail.inboundDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        入库单号：{{detail.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        理货单号：{{detail.tallyingOrderCode || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        仓库名称：{{detail.depotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        企业订单号：{{detail.declareOrderCode || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        确认时间：{{detail.confirmDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        理货时间：{{detail.tallyingDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        勾稽状态：{{detail.correlationStatusLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        外部单号：{{detail.extraCode || '- -'}}
      </el-col>
    </el-row>
    <!-- title -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="商品列表" name="first">
        <div class="mr-t-10"></div>
        <JFX-table
          :tableData.sync="tableData1"
          :showPagination="false"
          show-summary
        >
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="goodsNo" label="商品货号" align="center" min-width="160"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="商品条形码" align="center" min-width="180">
            <template slot-scope="scope">{{scope.row.barcode}}</template>
          </el-table-column>
          <el-table-column label="海外仓理货单位" align="center" min-width="160">
            <template slot-scope="scope">
               {{scope.row.tallyingUnit | fifterUnit}}
            </template>
          </el-table-column>
          <el-table-column prop="purchaseNum" label="应收数量" align="center" min-width="140"></el-table-column>
          <el-table-column prop="tallyingNum" label="实收数量" align="center" min-width="140"></el-table-column>
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="批次明细" name="second">
        <div class="mr-t-10"></div>
        <JFX-table
          :tableData.sync="tableData2"
          :showPagination="false"
        >
          <el-table-column type="index" label="序号" align="center" width="50" fixed="left"></el-table-column>
          <el-table-column prop="goodsNo" label="商品货号" align="center" min-width="130" fixed="left"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="batchNo" label="批次号" align="center" min-width="90" show-overflow-tooltip></el-table-column>
          <el-table-column prop="productionDateStr" label="生产日期" align="center" min-width="110" show-overflow-tooltip></el-table-column>
          <el-table-column prop="overdueDateStr" label="效期至" align="center"  min-width="110" show-overflow-tooltip></el-table-column>
          <el-table-column prop="tallyingUnit" label="海外仓理货单位" align="center" min-width="110">
            <template slot-scope="scope">
               {{scope.row.tallyingUnit | fifterUnit}}
            </template>
          </el-table-column>
          <el-table-column prop="wornNum" label="损货数量" align="center" min-width="80"></el-table-column>
          <el-table-column prop="expireNum" label="过期数量" align="center" min-width="80"></el-table-column>
          <el-table-column prop="normalNum" label="正常数量" align="center" min-width="80"></el-table-column>
          <el-table-column prop="grossWeight" label="毛重" align="center" min-width="60"></el-table-column>
          <el-table-column prop="netWeight" label="净重" align="center" min-width="60"></el-table-column>
          <el-table-column prop="volume" label="体积" align="center" min-width="70"></el-table-column>
          <el-table-column prop="length" label="长" align="center" min-width="60"></el-table-column>
          <el-table-column prop="width" label="宽" align="center" min-width="60"></el-table-column>
          <el-table-column prop="height" label="高" align="center" min-width="60"></el-table-column>
        </JFX-table>
      </el-tab-pane>
    </el-tabs>
    <!-- title end -->
  </div>
</template>
<script>
import { getWarehouseDetail } from '@a/purchaseManage/index'
export default {
  data() {
    return {
      activeName: 'first',
      tableData1: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      tableData2: {
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
       const res = await getWarehouseDetail({ id: query.id })
       this.detail = res.data
       this.tableData1.list = this.detail.itemList || []
       this.tableData2.list = this.detail.batchList || []
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
