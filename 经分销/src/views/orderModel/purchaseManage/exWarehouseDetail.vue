<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :span="24">
        单据状态：{{detail.statusLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        出库清单编号：{{detail.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        供应商：{{detail.supplierName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        物流企业名称：{{detail.logisticsName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        公司：{{detail.merchantName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        出库时间：{{detail.returnOutDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        PO单号：{{detail.poNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        LBX号：{{detail.lbxNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        提单号：{{detail.blNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        采购退订单号：{{detail.purchaseReturnCode || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        出库仓库：{{detail.outDepotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        运单号：{{detail.wayBillNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        币种：{{detail.currencyLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        进口模式：{{detail.importModeLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        理货单位：{{detail.tallyingUnitLabel || '- -'}}
      </el-col>
    </el-row>
    <!-- title -->
    <JFX-title title="出库商品明细" className="mr-t-15" />
    <JFX-table
      :tableData.sync="tableData"
      :showPagination="false"
    >
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
      <el-table-column prop="goodsNo" label="商品货号" align="center" min-width="180" ></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="barcode" label="商品条形码" align="center" min-width="180"></el-table-column>
      <el-table-column prop="num" label="数量" align="center" min-width="90"></el-table-column>
      <el-table-column prop="batchNo" label="批次号" align="center" min-width="120"></el-table-column>
      <el-table-column prop="productionDate" label="生产日期" align="center" min-width="140"></el-table-column>
      <el-table-column prop="overdueDate" label="失效日期" align="center" min-width="140"></el-table-column>
      <el-table-column prop="remark" label="备注" align="center" min-width="120" show-overflow-tooltip></el-table-column>
    </JFX-table>
    <!-- title end -->
  </div>
</template>
<script>
import { getpurchaseReturnOdepotDetail } from '@a/purchaseManage/index'
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
    this.init()
  },
  methods: {
    async init() {
      const { query } = this.$route
      if (!query.id) return false
      try {
        const res = await getpurchaseReturnOdepotDetail({ id: query.id })
        this.detail = res.data
        this.tableData.list = this.detail.itemList || []
      } catch (err) {}
    }
  }
}
</script>
