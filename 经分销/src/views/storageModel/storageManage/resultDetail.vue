<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col class="mr-b-10" :span="24" >
        盘点单号：{{detail.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        单据状态：{{detail.statusLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        服务类型：{{detail.serverTypeLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建时间：{{detail.createDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        盘点仓库：{{detail.depotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        业务场景：{{detail.modelLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        接收时间：{{detail.createDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        备注：{{detail.remark || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        确认人：{{detail.confirmUsername || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        确认时间：{{detail.confirmTime || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        盘点指令单号：{{detail.takesStockCode || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        驳回原因：{{detail.dismissRemark || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        来源：{{detail.sourceTypeLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        币种：{{detail.currencyLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        入库确认人：{{detail.inConfirmUsername || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        入库确认时间：{{detail.inConfirmTime || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建人：{{detail.createUsername || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        来源号：{{detail.sourceCode || '- -'}}
      </el-col>
    </el-row>
    <!-- title -->
    <JFX-title title="商品信息" className="mr-t-20" />
    <JFX-table
      :tableData.sync="tableData"
      :showPagination="false"
    >
      <el-table-column
        type="index"
        width="50"
        label="序号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="buName"
        label="事业部"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="goodsNo"
        label="商品货号"
        align="center"
      >
      </el-table-column>
        <el-table-column
        prop="goodsName"
        label="商品名称"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="barcode"
        label="商品条形码"
        align="center"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="settlementPrice"
        label="结算单价"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="surplusNum"
        label="盘盈数量"
        align="center"
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="deficientNum"
        label="盘亏数量"
        align="center"
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="typeLabel"
        label="调整类型"
        align="center"
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="batchNo"
        label="批次号"
        align="center"
        width="190"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="isDamageLabel"
        label="是否坏品"
        align="center"
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="adjustTotal"
        label="总调整数量"
        align="center"
        width="95"
      >
      </el-table-column>
      <el-table-column
        prop="productionDate"
        label="生产日期"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          {{scope.row.productionDate ? scope.row.productionDate.substring(0, 10) : ''}}
        </template>
      </el-table-column>
      <el-table-column
        prop="overdueDate"
        label="失效日期"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          {{scope.row.overdueDate ? scope.row.overdueDate.substring(0, 10) : ''}}
        </template>
      </el-table-column>
      <el-table-column
        prop="tallyUnitLabel"
        label="海外仓理货单位"
        align="center"
        width="130"
      >
      </el-table-column>
        <el-table-column
        prop="reasonCodeLabel"
        label="盘点原因"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
    </JFX-table>
    <!-- title end -->
  </div>
</template>
<script>
import { toDetailPage } from '@a/storageManage/storage'
export default {
  data() {
    return {
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      detail: {}
    }
  },
  mounted() {
    const { query } = this.$route
    const { id } = query
    this.init(id)
  },
  methods: {
    init(id) {
      toDetailPage({ id }).then(res => {
        this.detail = res.data || {}
        this.tableData.list = this.detail.details || []
      })
    }
  }
}
</script>
