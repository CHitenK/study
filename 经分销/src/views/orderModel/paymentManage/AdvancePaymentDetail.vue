<template>
  <!-- 预收详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <div class="flex-c-c mr-b-20">
      <h2>{{detail.supplierName}}预付款单</h2>
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
        付款单号：{{detail.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        单据状态：{{detail.billStatusLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        创建人：{{detail.creater || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        预计付款时间：{{detail.expectedPaymentDate ? detail.expectedPaymentDate.slice(0, 10) : '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        预付总额：{{detail.prepaymentAmount || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        已付总额：{{detail.paymentAmount || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        请款原因：{{detail.paymentReason || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        待核销金额：{{detail.verificationAmount || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        NC同步状态：{{detail.ncSynStatus || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        NC同步时间：{{detail.ncSynDate || '- -'}}
      </el-col>
    </el-row>
    <!-- 融资信息 end -->
    <el-tabs v-model="activeName" class="mr-t-15">
      <el-tab-pane label="付款汇总" name="1">
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
          <el-table-column prop="purchaseCode"
                           align="center"
                           min-width="140"
                           label="采购订单"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="purchaseAmount"
                           align="center"
                           min-width="120"
                           label="采购金额"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="prepaymentAmount"
                           align="center"
                           min-width="140"
                           label="申请付款金额"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="currency"
                           align="center"
                           min-width="100"
                           label="币种"
                           show-overflow-tooltip
          ></el-table-column>
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="供应商信息" name="2">
        <el-row :gutter="10" class="fs-12 clr-II detail-row">
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            收款账号：{{detail.bankAccount || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            收款银行：{{detail.depositBank || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            收款账户：{{detail.beneficiaryName || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            Swift Code：{{detail.swiftCode || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            开户行地址：{{detail.bankAddress || '- -'}}
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="附件信息" name="3">
        <JFX-upload @success="successUpload" :url="action" :limit="10000" :multiple="false">
          <el-button id="sale-upload-btn" type="primary">上传文件</el-button>
        </JFX-upload>
        <EnclosureList :showAction="false" :code="detail.code" v-if="detail.code" ref="enclosure" class="mr-t-15" />
      </el-tab-pane>
      <el-tab-pane label="操作日志" name="4">
        <JFX-table :tableData.sync="operationTableData"
                   :tableColumn="operationTableColumn"
                   :showPagination="false"
        ></JFX-table>
      </el-tab-pane>
      <el-tab-pane label="NC 信息" name="5">
        <el-row :gutter="10" class="fs-12 clr-II detail-row">
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            NC单据号：{{detail.ncCode || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            NC单据状态：{{detail.ncSynStatus || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            会计期间：{{detail.preiod || '- -'}}
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
      <el-tab-pane label="付款记录" name="6">
        <JFX-table :tableData.sync="paymentTableData"
                   :tableColumn="paymentTableColumn"
                   :showPagination="false"
                   :summary-method="verifysummaryMethod"
                   showSummary>
          <template slot="paymentDate" slot-scope="{row}">
            {{row.paymentDate ? row.paymentDate.slice(0, 10) : ''}}
          </template>
        </JFX-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import commomMix from '@m/index'
import { getBaseUrl } from '@u/tool'
import { attachmentUploadFiles } from '@a/base/index'
import {
  detailAdvance,
  getPaymentItems,
  listOperateLog,
  getRecordItemList
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
        operateResult: '',
        operateRemark: ''
      },
      rules: {
        operateResult: { required: true, message: '请选择审批结果', trigger: 'change' },
        operateRemark: { required: true, message: '请输入审批备注', trigger: 'blur' }
      },
      // 操作日志表格列结构
      operationTableColumn: [
        { label: '操作人', prop: 'operater', minWidth: '120', align: 'center', hide: true },
        { label: '操作项', prop: 'operateAction', minWidth: '120', align: 'center', hide: true },
        { label: '操作结果', prop: 'operateResult', minWidth: '120', align: 'center', hide: true },
        { label: '备注', prop: 'operateRemark', minWidth: '120', align: 'center', hide: true },
        { label: '操作时间', prop: 'operateDate', minWidth: '150', align: 'center', hide: true }
      ],
      // 核销记录
      paymentTableData: {
        list: []
      },
      // 表格列数据
      paymentTableColumn: [
        { label: '核销单号', prop: 'code', minWidth: '150', align: 'center', hide: true },
        { label: '单据类型', prop: 'orderType', minWidth: '150', align: 'center', hide: true },
        { label: '付款人', prop: 'creatorName', minWidth: '150', align: 'center', hide: true },
        { label: '付款时间', slotTo: 'paymentDate', minWidth: '150', align: 'center', hide: true },
        { label: '付款流水号', prop: 'serialNo', minWidth: '150', align: 'center', hide: true },
        { label: '付款金额', prop: 'paymentAmount', minWidth: '150', align: 'center', hide: true }
      ],
      action: '',
      btnLoading: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id } = this.$route.query
      try {
        // 获取详情
        const { data } = await detailAdvance({ id })
        this.detail = data
        // 上传附件的url
        this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + this.detail.code
        // 获取付款明细
        const { data: list } = await getPaymentItems({ id })
        this.tableData.list = list || []
        // 获取操作日志
        const { data: operateList } = await listOperateLog({ id })
        this.operationTableData.list = operateList || []
        // 获取付款记录
        const { data: paymentList } = await getRecordItemList({ id })
        this.paymentTableData.list = paymentList || []
        await this.$nextTick()
        // 删除表头gutter
        const gutters = document.getElementsByClassName('gutter')
        gutters && gutters.length && Array.from(gutters).forEach((item, index) => {
          if (index === 1) {
            item.parentNode.removeChild(item)
          }
        })
      } catch (error) {
        console.log(error)
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
    // 付款汇总合计方法
    summaryMethod({ columns }) {
      const sums = []
      columns.forEach((item, index) => {
        if (index === 0) {
          item.colSpan = 3
        }
      })
      sums[0] = `汇总：${this.detail.prepaymentAmountStr || ''}`
      sums[1] = this.detail.purchaseAmount
      sums[2] = this.detail.prepaymentAmount
      sums[3] = this.detail.currency
      return sums
    },
    // 付款记录合计方法
    verifysummaryMethod({ columns, data }) {
      let paymentAmounts = 0
      const sums = []
      columns.forEach((item, index) => {
        if (index === 0) {
          item.colSpan = 5
        }
      })
     data.forEach(item => {
        paymentAmounts += item.paymentAmount ? +item.paymentAmount : 0
      })
      sums[0] = `付款核销合计`
      sums[1] = (+paymentAmounts).toFixed(2)
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
