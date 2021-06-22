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
        采购退货订单号：{{detail.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        供应商：{{detail.supplierName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        公司：{{detail.merchantName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        出仓仓库：{{detail.outDepotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        是否同关区：{{detail.isSameAreaLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        入仓仓库：{{detail.inDepotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        PO号：{{detail.poNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        采购币种：{{detail.currencyLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        合同号：{{detail.contractNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        理货单位：{{detail.tallyingUnitLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        目的地：{{detail.destinationNameLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        备注：{{detail.remark || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :span="24" >
        目的地址：{{detail.destinationAddress || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建人：{{detail.createName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建时间：{{detail.createDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        <span style="opacity: 0;">占位</span>
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        <span style="opacity: 0;">占位</span>
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        审核人：{{detail.auditName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        审核时间： {{detail.auditDate || '- -'}}
      </el-col>
    </el-row>
    <!-- title -->
    <JFX-title title="收件信息" className="mr-t-15" v-if="detail.depotType === 'c'" />
    <el-row  :gutter="10" class="fs-12 clr-II detail-row" v-if="detail.depotType === 'c'">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        提货方式：{{detail.deliveryMethodLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        收货人姓名：{{detail.deliveryName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        <span style="opacity: 0;">占位</span>
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        <span style="opacity: 0;">占位</span>
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        国家：{{detail.country || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        详细地址：{{detail.deliveryAddr || '- -'}}
      </el-col>
    </el-row>
    <!-- title -->
    <JFX-title title="采购退货商品明细" className="mr-t-15" />
    <JFX-table
      :tableData.sync="tableData"
      :showPagination="false"
    >
      <el-table-column type="index" label="序号" align="center" width="50" fixed="left"></el-table-column>
      <el-table-column prop="goodsNo" label="商品货号" align="center" min-width="110" fixed="left" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="barcode" label="商品条形码" align="center" min-width="130" show-overflow-tooltip></el-table-column>
      <el-table-column prop="returnNum" label="退货商品数量" align="center" min-width="100"></el-table-column>
      <el-table-column prop="declarePrice" label="申报单价" align="center" min-width="110">
        <template slot-scope="scope">
          {{scope.row.declarePrice ? (+scope.row.declarePrice).toFixed(5) : ''}}
        </template>
      </el-table-column>
      <el-table-column prop="returnPrice" label="退货单价" align="center" min-width="110">
        <template slot="header">
          <span>退货单价<br />(不含税)</span>
        </template>
        <template slot-scope="scope">
          {{scope.row.returnPrice ? (+scope.row.returnPrice).toFixed(8) : ''}}
        </template>
      </el-table-column>
      <el-table-column prop="returnAmount" label="退货总金额" align="center" min-width="110">
        <template slot="header">
          <span>退货总金额<br />(不含税)</span>
        </template>
        <template slot-scope="scope">
          {{scope.row.returnAmount ? (+scope.row.returnAmount).toFixed(2) : ''}}
        </template>
      </el-table-column>
      <el-table-column prop="taxReturnAmount" label="退货总金额" align="center" min-width="110">
        <template slot="header">
          <span>退货总金额<br />(含税)</span>
        </template>
        <template slot-scope="scope">
          {{scope.row.taxReturnAmount ? (+scope.row.taxReturnAmount).toFixed(2) : ''}}
        </template>
      </el-table-column>
      <el-table-column prop="taxRate" label="税率" align="center" min-width="90"></el-table-column>
      <el-table-column prop="tax" label="税额" align="center" min-width="100"></el-table-column>
      <el-table-column prop="brandName" label="品牌类型" align="center" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="boxNo" label="箱号" align="center" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="contractNo" label="合同号" align="center" min-width="110" show-overflow-tooltip></el-table-column>
      <el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip></el-table-column>
    </JFX-table>
    <!-- title end -->
  </div>
</template>
<script>
import { getReturnOrderDetail } from '@a/purchaseManage/index'
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
       const res = await getReturnOrderDetail({ id: query.id })
       this.detail = res.data
       this.tableData.list = this.detail.itemList || []
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
