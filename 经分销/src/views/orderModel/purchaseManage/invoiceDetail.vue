<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="录入发票时间" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        采购订单编号：{{detail.purchaseOrderCode || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        PO号：{{detail.poNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        供应商：{{detail.merchantName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        发票号码：{{detail.invoiceNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        收到发票日期：{{detail.invoiceDate ? detail.invoiceDate.substring(0, 10) : '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        发票日期：{{detail.drawInvoiceDate ? detail.drawInvoiceDate.substring(0, 10) : '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        开票人：{{detail.payName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        预付款日期：{{detail.paymentDate ? detail.paymentDate.substring(0, 10) : '- -'}}
      </el-col>
    </el-row>
    <!-- title -->
    <JFX-title title="商品信息" className="mr-t-15" />
    <JFX-table
      :tableData.sync="tableData"
      :showPagination="false"
      :showSummary="true"
      :summaryMethod="null"
    >
      <el-table-column type="index" label="序号" align="center" width="50" fixed="left"></el-table-column>
       <el-table-column label="商品货号" align="center" width="160" fixed="left" >
        <template slot-scope="scope">{{scope.row.goodsNo}}</template>
      </el-table-column>
      <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="purchaseNum" label="采购数量" align="center" width="120" ></el-table-column>
      <el-table-column label="采购单价" align="center" width="140">
        <template slot-scope="scope">{{scope.row.purchasePrice || 0}}</template>
      </el-table-column>
      <el-table-column prop="num" label="本次开票数量" align="center" width="120" >
        <template slot-scope="scope">{{scope.row.num || 0}}</template>
      </el-table-column>
      <el-table-column prop="amount" label="发票总金额(不含税)" align="center" width="140" >
        <template slot-scope="scope">{{scope.row.amount || 0}}</template>
      </el-table-column>
      <el-table-column prop="taxAmount" label="发票总金额(含税)" align="center" width="140" >
        <template slot-scope="scope">{{scope.row.taxAmount || 0}}</template>
      </el-table-column>
      <el-table-column prop="tax" label="税额" align="center" width="140" >
        <template slot-scope="scope">{{scope.row.tax || 0}}</template>
      </el-table-column>
    </JFX-table>
    <!-- title end -->
    <JFX-title title="附件列表" className="mr-t-15" />
    <div class="mr-t-15"></div>
    <enclosure-list :code="detail.code" v-if="detail.code" ref="enclosure" showAction></enclosure-list>
  </div>
</template>
<script>
import { purchaseInvoiceDetail } from '@a/purchaseManage/index'
import { attachmentUploadFiles } from '@a/base/index'
import { getBaseUrl } from '@u/tool'
export default {
  components: {
    enclosureList: () => import('@c/enclosureList/index')
  },
  data() {
    return {
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      detail: {},
      action: ''
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
       const res = await purchaseInvoiceDetail({ id: query.id })
       this.detail = res.data
       this.tableData.list = this.detail.itemList || []
       this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + this.detail.code
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
