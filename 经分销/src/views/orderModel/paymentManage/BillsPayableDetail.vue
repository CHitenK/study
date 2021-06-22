<template>
  <!-- 预收详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <div class="flex-c-c mr-b-20">
      <h2>{{detail.supplierName}} 应付账单</h2>
    </div>
    <el-row :gutter="10" class="fs-16 clr-II detail-row mr-b-10" style="color: blue;">
      <el-col  class="mr-b-10" :span="6">
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :offset="12" :span="6">
        账单创建日期：{{detail.createDate || '- -'}}
      </el-col>
    </el-row>
    <el-row :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        应付账单号：{{detail.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        账单状态：{{detail.billStatusLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        账单月份：{{detail.creater || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        应付总额：{{detail.payableAmount || '0'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        已付款总额：{{detail.paymentAmount || '0'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        待付款总额：{{detail.surplusAmount || '0'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        预计付款时间：{{detail.expectedPaymentDate ? detail.expectedPaymentDate.slice(0, 10) : '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        结算币种：{{detail.currency || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        创建人：{{detail.creater || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        请款原因：{{detail.paymentReason || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        NC同步状态：{{detail.ncSynStatus || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        审批方式：{{detail.auditMethodLabel || '- -'}}
      </el-col>
    </el-row>
    <!-- 融资信息 end -->
    <el-tabs v-model="activeName" class="mr-t-15">
      <el-tab-pane label="应付汇总" name="1">
        <JFX-table :tableData.sync="tableData"
                   :header-cell-style="discountHeaderStyle"
                   :showPagination="false"
                   :summary-method="summaryMethod"
                   showSummary
                   ref="rootTable">
          <el-table-column align="center" label="项目">
            <el-table-column prop="parentProjectName"
                             align="center"
                             min-width="140"
                             show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="projectName"
                             align="center"
                             min-width="140"
                             show-overflow-tooltip
            ></el-table-column>
          </el-table-column>
          <el-table-column prop="settlementAmount"
                           align="center"
                           label="结算金额（不含税）"
                           min-width="140"
                           show-overflow-tooltip>
            <!-- <template slot="header">
              <span>结算金额<br/>(不含税)</span>
            </template> -->
          </el-table-column>
          <el-table-column prop="tax"
                           align="center"
                           min-width="140"
                           label="税额"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="settlementTaxAmount"
                           align="center"
                           min-width="140"
                           label="结算金额（含税）"
                           show-overflow-tooltip>
            <!-- <template slot="header">
              <span>结算金额<br/>(含税)</span>
            </template> -->
          </el-table-column>
          <el-table-column prop="currency"
                           align="center"
                           width="120"
                           label="币种"
                           show-overflow-tooltip
          ></el-table-column>
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="应付明细" name="2">
        <el-tabs v-model="innerActiveName" type="card">
          <el-tab-pane label="应付明细" name="1">
            <JFX-table :tableData.sync="payableTableData"
                       :tableColumn="payableTableColumn"
                       :summary-method="payableSummaryMethod"
                       :showPagination="false"
                       showSummary
            ></JFX-table>
          </el-tab-pane>
          <el-tab-pane label="费用明细" name="2">
            <JFX-table :tableData.sync="feeTableData"
                       :tableColumn="feeTableColumn"
                       :summary-method="feeSummaryMethod"
                       :showPagination="false"
                       showSummary
            ></JFX-table>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="审批流程" name="4">
        <JFX-table :tableData.sync="operationTableData"
                   :tableColumn="operationTableColumn"
                   :showPagination="false"
                   showIndex
        ></JFX-table>
      </el-tab-pane>
      <el-tab-pane label="附件信息" name="5">
        <JFX-upload @success="successUpload" :url="action" :limit="10000" :multiple="false">
          <el-button id="sale-upload-btn" type="primary">上传文件</el-button>
        </JFX-upload>
        <EnclosureList :showAction="false" :code="detail.code" v-if="detail.code" ref="enclosure" class="mr-t-15" />
      </el-tab-pane>
      <el-tab-pane label="核销记录" name="6">
        <JFX-table :tableData.sync="verifyTableData"
                   :tableColumn="verifyTableColumn"
                   :summary-method="getSummaries"
                   showSummary
                   :showPagination="false">
          <template slot="paymentDate" slot-scope="{row}">
            {{row.paymentDate ? row.paymentDate.slice(0, 10) : ''}}
          </template>
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="NC信息" name="7">
        <el-row :gutter="10" class="fs-12 clr-II detail-row">
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            NC单据号：{{detail.ncCode || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            NC单据状态：{{detail.ncStatusLabel || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            会计期间：{{detail.period || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            凭证名称：{{detail.voucherName || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            凭证序号：{{detail.voucherIndex || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            凭证编号：{{detail.voucherCode || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            凭证状态：{{detail.voucherStatusLabel || '- -'}}
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="供应商信息" name="8">
        <el-row :gutter="10" class="fs-12 clr-II detail-row">
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            收款账号：{{detail.beneficiaryName || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            收款银行：{{detail.depositBank || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            收款账户：{{detail.bankAccount || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            Swift Code：{{detail.swiftCode || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            开户行地址：{{detail.bankAddress || '- -'}}
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" v-if="$route.query.operateType === 'examine'">
      <el-row class="company-page mr-t-20 mr-b-10">
        <el-col :span="24" class="mr-t-10">
          <el-form-item label="审批结果：" prop="isPassed" class="textarea-con">
            <el-radio-group v-model="ruleForm.isPassed">
              <el-radio label="1">通过</el-radio>
              <el-radio label="0">驳回</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="mr-t-10">
        <el-form-item label="审批意见：" prop="invalidRemark" class="textarea-con">
          <el-input type="textarea" v-model="ruleForm.invalidRemark" :rows="5" />
        </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="flex-c-c" v-if="$route.query.operateType === 'examine'">
      <el-button type="primary" @click="closeTag">返回</el-button>
      <el-button type="primary" @click="handleExamine" :loading="btnLoading">审核</el-button>
    </div>
  </div>
</template>
<script>
import commomMix from '@m/index'
import { attachmentUploadFiles } from '@a/base/index'
import { getBaseUrl, convertCurrency } from '@u/tool'
import {
  detailPaymentBill,
  getPaymentSummary,
  paymentBillPaymentItems,
  paymentBillCostItems,
  paymentBillListOperateLog,
  getVerificateList,
  paymentBillauditPayment
} from '@a/paymentManage'
export default {
  mixins: [commomMix],
  components: {
    // 附件列表
    EnclosureList: () => import('@c/enclosureList/index')
  },
  data() {
    return {
      // tab当前点击name
      activeName: '1',
      // 详情数据
      detail: {},
      // 操作日志表格数据
      operationTableData: {
        list: []
      },
      ruleForm: {
        isPassed: '',
        invalidRemark: ''
      },
      rules: {
        isPassed: { required: true, message: '请选择审批结果', trigger: 'change' },
        invalidRemark: { required: true, message: '请输入审批意见', trigger: 'blur' }
      },
      // 操作日志表格列结构
      operationTableColumn: [
        { label: '操作人', prop: 'operater', minWidth: '120', align: 'center', hide: true },
        { label: '操作项', prop: 'operateAction', minWidth: '120', align: 'center', hide: true },
        { label: '操作结果', prop: 'operateResult', minWidth: '120', align: 'center', hide: true },
        { label: '备注', prop: 'operateRemark', minWidth: '120', align: 'center', hide: true },
        { label: '操作时间', prop: 'operateDate', minWidth: '150', align: 'center', hide: true }
      ],
      // 应付明细表格数据
      payableTableData: {
        list: []
      },
      // 应付明细表格列结构
      payableTableColumn: [
        { label: '采购单号', prop: 'purchaseCode', width: '140', align: 'center', hide: true },
        { label: '商品货号', prop: 'goodsNo', width: '120', align: 'center', hide: true },
        { label: '商品名称', prop: 'goodsName', minWidth: '120', align: 'center', hide: true },
        { label: '费项名称', prop: 'projectName', width: '120', align: 'center', hide: true },
        { label: '采购数量', prop: 'num', width: '120', align: 'center', hide: true },
        { label: '采购金额（不含税）', prop: 'purchaseAmount', width: '150', align: 'center', hide: true },
        { label: '税额', prop: 'tax', width: '120', align: 'center', hide: true },
        { label: '采购金额（含税）', prop: 'purchaseTaxAmount', width: '120', align: 'center', hide: true },
        { label: ' 本期结算金额（不含税）', prop: 'settlementAmount', width: '160', align: 'center', hide: true },
        { label: '本期结算税额', prop: 'settlementTax', width: '140', align: 'center', hide: true }
      ],
      // 费用明细表格数据
      feeTableData: {
        list: []
      },
      // 费用明细表格列结构
      feeTableColumn: [
        { label: '费项名称', prop: 'projectName', width: '120', align: 'center', hide: true },
        { label: '类型', prop: 'type', width: '120', align: 'center', hide: true, formatter: (row) => row.type === '1' ? '补款' : '扣款' },
        { label: 'po号', prop: 'poNo', width: '120', align: 'center', hide: true },
        { label: '商品货号', prop: 'goodsNo', width: '120', align: 'center', hide: true },
        { label: '商品名称', prop: 'goodsName', minWidth: '120', align: 'center', hide: true },
        { label: '母品牌', prop: 'superiorParentBrandName', width: '120', align: 'center', hide: true },
        { label: '数量', prop: 'num', width: '120', align: 'center', hide: true },
        { label: '费用金额(不含税)', prop: 'costAmount', width: '120', align: 'center', hide: true },
        { label: '税额', prop: 'tax', width: '120', align: 'center', hide: true }
      ],
      // 核销记录
      verifyTableData: {
        list: []
      },
      // 表格列数据
      verifyTableColumn: [
        { label: '核销单号', prop: 'relCode', minWidth: '120', align: 'center', hide: true },
        { label: '单据类型', prop: 'billStatusLabel', minWidth: '120', align: 'center', hide: true },
        { label: '付款人', prop: 'drawee', minWidth: '120', align: 'center', hide: true },
        { label: '付款时间', slotTo: 'paymentDate', minWidth: '150', align: 'center', hide: true },
        { label: '付款流水单号', prop: 'serialNo', minWidth: '150', align: 'center', hide: true },
        { label: '付款金额', prop: 'currentVerificateAmount', minWidth: '150', align: 'center', hide: true }
      ],
      action: '',
      btnLoading: false,
      operateType: '',
      innerActiveName: '1'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { operateType, id } = this.$route.query
      this.operateType = operateType
      try {
        this.tableData.loading = true
        const { data } = await detailPaymentBill({ id })
        this.detail = data
        this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + this.detail.code
        // 应付汇总
        const { data: itemList } = await getPaymentSummary({ id })
        this.tableData.list = itemList || []
        // 获取付款明细
        const { data: paymentList } = await paymentBillPaymentItems({ id })
        this.payableTableData.list = paymentList || []
        // 获取付款明细
        const { data: feeList } = await paymentBillCostItems({ id })
        this.feeTableData.list = feeList || []
        // 获取操作日志
        const { data: operateList } = await paymentBillListOperateLog({ id })
        this.operationTableData.list = operateList
        // 获取核销记录
        const { data: recordList } = await getVerificateList({ id })
        this.verifyTableData.list = recordList
        this.tableData.loading = false
        // 删除表头gutter
        await this.$nextTick()
        const gutters = document.getElementsByClassName('gutter')
        gutters && gutters.length && Array.from(gutters).forEach((item, index) => {
          if (index === 1) { item.parentNode.removeChild(item) }
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.tableData.loading = false
      }
    },
    // 上传成功
    successUpload(res) {
      if (res.code + '' === '10000') {
        this.$refs['enclosure'].getEnclosureList(1)
      } else {
        this.$errorMsg(res.message)
      }
    },
    // 审核
    handleExamine() {
      this.$refs['ruleForm'].validate(async(valid) => {
        const { id } = this.$route.query
        const { isPassed, invalidRemark } = this.ruleForm
        if (valid) {
          try {
            this.btnLoading = true
            await paymentBillauditPayment({ id, isPassed, invalidRemark })
            this.$emit('comfirm')
            this.$successMsg('操作成功')
            this.closeTag()
          } catch (error) {
            this.$errorMsg(error.message)
          } finally {
            this.btnLoading = false
          }
        } else {
          this.$errorMsg('请先填写表单必填项')
        }
      })
    },
    // 合计方法
    payableSummaryMethod({ columns, data }) {
      const sums = []
      let nums = 0
      let purchaseAmounts = 0
      let taxs = 0
      let purchaseTaxAmounts = 0
      let settlementAmounts = 0
      let settlementTaxs = 0
      columns.forEach((item, index) => {
        if (index === 0) { item.colSpan = 4 }
      })
      data.forEach(item => {
        nums += item.num ? +item.num : 0
        purchaseAmounts += item.purchaseAmount ? +item.purchaseAmount : 0
        taxs += item.tax ? +item.tax : 0
        purchaseTaxAmounts += item.purchaseTaxAmount ? +item.purchaseTaxAmount : 0
        settlementAmounts += item.settlementAmount ? +item.settlementAmount : 0
        settlementTaxs += item.settlementTax ? +item.settlementTax : 0
      })
      sums[0] = '应付货款合计'
      sums[1] = (+nums).toFixed(2)
      sums[2] = (+purchaseAmounts).toFixed(2)
      sums[3] = (+taxs).toFixed(2)
      sums[4] = (+purchaseTaxAmounts).toFixed(2)
      sums[5] = (+settlementAmounts).toFixed(2)
      sums[6] = (+settlementTaxs).toFixed(2)
      return sums
    },
    // 合计方法
    feeSummaryMethod({ columns, data }) {
      const sums = []
      let nums = 0
      let costAmounts = 0
      let taxs = 0
      columns.forEach((item, index) => {
        if (index === 0) { item.colSpan = 6 }
      })
      data.forEach(item => {
        nums += item.num ? +item.num : 0
        costAmounts += item.costAmount ? +item.costAmount : 0
        taxs += item.tax ? +item.tax : 0
      })
      sums[0] = '费用合计'
      sums[1] = (+nums).toFixed(2)
      sums[2] = (+costAmounts).toFixed(2)
      sums[3] = (+taxs).toFixed(2)
      return sums
    },
    // 合计方法
    summaryMethod({ columns, data }) {
      const sums = []
      let settlementAmounts = 0
      let taxs = 0
      let settlementTaxAmounts = 0
      columns.forEach((item, index) => {
        if (index === 0) { item.colSpan = 2 }
      })
      data.forEach(item => {
        settlementAmounts += item.settlementAmount ? +item.settlementAmount : 0
        taxs += item.tax ? +item.tax : 0
        settlementTaxAmounts += item.settlementTaxAmount ? +item.settlementTaxAmount : 0
      })
      sums[0] = `应付合计：${convertCurrency(settlementTaxAmounts)}`
      sums[1] = (+settlementAmounts).toFixed(2)
      sums[2] = (+taxs).toFixed(2)
      sums[3] = (+settlementTaxAmounts).toFixed(2)
      sums[4] = this.detail.currency
      return sums
    },
    // 计算总和
    getSummaries({ columns, data }) {
      const sums = []
      let currentVerificateAmounts = 0
      columns.forEach((item, index) => {
        if (index === 0) { item.colSpan = 5 }
      })
      data.forEach(item => {
        currentVerificateAmounts += item.currentVerificateAmount ? +item.currentVerificateAmount : 0
      })
      sums[0] = '付款核销合计'
      sums[1] = (+currentVerificateAmounts).toFixed(2)
      return sums
    },
    // 表头样式
    discountHeaderStyle({ rowIndex }) {
      if (rowIndex === 1) {
        return 'display: none;'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title-bx {
  display: flex;
  justify-content: space-between;
  padding: 0 20vw 0 15px;
  color: #0000FF;
  >span {
    display: inline-block;
  }
}
/deep/.textarea-con {
  display: flex;
  align-items: flex-start;
  .el-form-item__label{
    width: 120px;
  }
  .el-form-item__content {
    width: 630px;
  }
}
</style>
