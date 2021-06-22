<template>
  <!-- 预售订单详情 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        预售单号：{{detail.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        创建人：{{detail.createName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        创建时间：{{detail.createDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        客户：{{detail.customerName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        公司：{{detail.merchantName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        销售类型：{{detail.businessModelLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        出仓仓库：{{detail.outDepotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        PO单号：{{detail.poNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        销售币种：{{detail.currencyLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        备注：{{detail.remark || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        理货单位：{{detail.tallyingUnitLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        审核人：{{detail.auditName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        审核时间：{{detail.auditDate || '- -'}}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 商品信息 -->
    <JFX-title title="商品信息" className="mr-t-15" />
    <JFX-table :tableData.sync="tableData"
               :showPagination="false">
      <el-table-column prop="goodsNo"
                       align="center"
                       label="商品货号"
                       width="150"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="goodsName"
                       align="center"
                       label="商品名称"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="barcode"
                       align="center"
                       label="条码"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="num"
                       align="center"
                       label="预售数量"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="price"
                       align="center"
                       label="预售单价"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="amount"
                       align="center"
                       label="预售总金额"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="brandName"
                       align="center"
                       label="品牌类型"
                       width="150"
                       show-overflow-tooltip
      ></el-table-column>
    </JFX-table>
    <!-- 商品信息 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import { getPreSaleDetails } from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 详情数据
      detail: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const id = this.$route.query.id
      if (!id) return
      const { data } = await getPreSaleDetails({ id })
      this.detail = data
      this.tableData.list = this.detail.itemList
    }
  }
}
</script>
