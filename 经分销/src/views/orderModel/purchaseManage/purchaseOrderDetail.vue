<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        采购订单编号：{{detail.code ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        订单状态：{{detail.statusLabel ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        业务模式：{{detail.businessModelLabel ||  '- -'}}
      </el-col>
       <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        入仓仓库：{{detail.depotName ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        供应商：{{detail.supplierName ||  '- -' }}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        付款主体：{{detail.paySubject === '2' ? merchantName : detail.paySubjectLabel }}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        采购币种：{{detail.currencyLabel ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        归属日期：{{detail.attributionDate ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        事业部：{{detail.buName ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        PO号：{{detail.poNo ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        汇率：{{detail.rate ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        贸易条款：{{['', 'CIF', 'CRF', 'FOB', 'DPA', 'EXW'][detail.tradeTerms]}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        海外仓理货单位：{{detail.tallyingUnitLabel ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        LBX单号：{{detail.lbxNo ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        付款条款：{{['', '一次付款-付款发货', '多次付款', '一次付款-发货付款'][detail.paymentProvision]}}
      </el-col>
       <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        运输方式：{{detail.transportLabel ||  '- -'}}
      </el-col>
      <!-- <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        入库关区：{{detail.inPlatformCustoms ||  '- -'}}
      </el-col> -->
    </el-row>
    <JFX-title title="发票信息" className="mr-t-15" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        开票人：{{detail.invoiceName ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        付款人：{{detail.payName ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        收到发票日期：{{detail.invoiceDate ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        付款日期：{{detail.payDate ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        开发票日期：{{detail.drawInvoiceDate ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        单据状态：{{detail.billStatusLabel ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        发送邮件状态：{{detail.mailStatusLabel ||  '- -'}}
      </el-col>
    </el-row>
    <JFX-title title="操作信息" className="mr-t-15" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建人：{{detail.createName ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建时间：{{detail.createDate ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        提交人：{{detail.submiterName ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        提交时间：{{detail.submitDate ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        审核人：{{detail.auditName ||  '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        审核时间：{{detail.auditDate ||  '- -'}}
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
      <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
      <el-table-column label="子合同号" align="center" min-width="110">
        <template slot-scope="scope">{{scope.row.contractNo}}</template>
      </el-table-column>
      <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip min-width="100"></el-table-column>
      <el-table-column label="商品条码" align="center" show-overflow-tooltip min-width="100">
        <template slot-scope="scope">{{scope.row.barcode}}</template>
      </el-table-column>
      <el-table-column label="商品货号" align="center" min-width="120">
        <template slot-scope="scope">{{scope.row.goodsNo}}</template>
      </el-table-column>
      <el-table-column prop="num" label="采购数量" align="center" min-width="80"></el-table-column>
      <el-table-column label="(不含税)" align="center" min-width="90">
        <template slot="header">
          <span>采购单价<br />(不含税)</span>
        </template>
        <template slot-scope="scope">{{scope.row.price}}</template>
      </el-table-column>
      <el-table-column prop="amount" label="(不含税)" align="center" min-width="90">
        <template slot="header">
          <span>采购总金额<br />(不含税)</span>
        </template>
      </el-table-column>
      <el-table-column prop="taxAmount" label="(不含税)" align="center" min-width="90">
        <template slot="header">
          <span>采购总金额<br />(含税)</span>
        </template>
        <template slot-scope="scope">
          {{scope.row.taxRate && scope.row.taxRate > 0 ? scope.row.taxAmount : scope.row.amount}}
        </template>
      </el-table-column>
      <el-table-column label="税率" align="center" min-width="60">
        <template slot-scope="scope">
          {{scope.row.taxRate && scope.row.taxRate > 0 ? scope.row.taxRate : 0}}
        </template>
      </el-table-column>
      <el-table-column prop="tax" label="税额" align="center" min-width="90">
        <template slot-scope="scope">
          {{scope.row.taxRate && scope.row.taxRate > 0 ? scope.row.tax : 0}}
        </template>
      </el-table-column>
    </JFX-table>
    <!-- title end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import { getPurchaseOrderDetails } from '@a/purchaseManage/index'
export default {
  mixins: [commomMix],
  data() {
    return {
       breadcrumb: [{
         path: '', meta: { title: '采购档案' }
        },
        {
          path: '/purchase/purchaseorderList', meta: { title: '采购订单列表' }
        },
        {
          path: '', meta: { title: '采购订单详情' }
        }
      ],
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      detail: {},
      merchantName: ''
    }
  },
  mounted() {
    this.init()
    const userInfo = this.getUserInfo()
    this.merchantName = userInfo.merchantName || ''
  },
  methods: {
    async init() {
      const { query } = this.$route
      if (!query.id) return false
      try {
        const res = await getPurchaseOrderDetails({ id: query.id })
        this.detail = res.data
        this.tableData.list = this.detail.itemList || []
        this.countTotal()
      } catch (err) {}
    },
    // 计算各总数
    countTotal() {
      let totalNum = 0
      let totalAmount = 0
      let totalTax = 0
      let totalTaxAmount = 0
      let totalGrossWeight = 0
      let totalNetWeight = 0
      this.tableData.list.forEach(item => {
        const { num, amount, tax, taxAmount, grossWeightSum, netWeightSum } = item
        totalNum = totalNum + (+num || 0)
        totalAmount = totalAmount + (+amount || 0)
        totalTax = totalTax + (+tax || 0)
        totalTaxAmount = totalTaxAmount + (+taxAmount || 0)
        totalGrossWeight = totalGrossWeight + (+grossWeightSum || 0)
        totalNetWeight = totalNetWeight + (+netWeightSum || 0)
      })
      this.totalNum = totalNum
      this.totalAmount = totalAmount.toFixed(2)
      this.totalTaxAmount = totalTaxAmount.toFixed(2)
      this.totalGrossWeight = totalGrossWeight.toFixed(5)
      this.totalNetWeight = totalNetWeight.toFixed(5)
      this.totalTax = totalTax.toFixed(2)
    }
  }
}
</script>
<style lang="scss" scoped>
.tongji-item{
  display: inline-block;
  width: 220px;
}
</style>
