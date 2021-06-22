<template>
  <!-- 预收详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <div class="flex-c-c mr-b-20">
      <h2>{{detail.customerName}}预收账单</h2>
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
        预收账单号：{{detail.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        账单状态：{{detail.billStatusLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        创建人：{{detail.creater || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        预收总额：{{detail.sumAmount || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        结算币种：{{detail.currency || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        NC同步状态：{{detail.ncStatusLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        NC同步时间：{{detail.ncSynDate || '- -'}}
      </el-col>
    </el-row>
    <!-- 融资信息 end -->
    <el-tabs v-model="activeName" class="mr-t-15">
      <el-tab-pane label="预收汇总" name="1">
        <JFX-table :tableData.sync="tableData"
                   :header-cell-style="discountHeaderStyle"
                   :showPagination="false"
                   :summary-method="summaryMethod"
                   showSummary
                   ref="rootTable">
          <el-table-column align="center" label="项目">
            <el-table-column prop="oneLevelProjectName"
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
          <el-table-column prop="relCode"
                           align="center"
                           min-width="140"
                           label="销售订单编号"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="poNo"
                           align="center"
                           min-width="140"
                           label="PO号"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="amount"
                           align="center"
                           width="120"
                           label="金额"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="currency"
                           align="center"
                           width="120"
                           label="币种"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="remark"
                           align="center"
                           min-width="140"
                           label="备注"
                           show-overflow-tooltip
          ></el-table-column>
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="附件信息" name="2">
        <JFX-upload @success="successUpload" :url="action" :limit="10000" :multiple="false">
          <el-button id="sale-upload-btn" type="primary">上传文件</el-button>
        </JFX-upload>
        <EnclosureList :showAction="false" :code="detail.code" v-if="detail.code" ref="enclosure" class="mr-t-15" />
      </el-tab-pane>
      <el-tab-pane label="操作日志" name="3">
        <JFX-table :tableData.sync="operationTableData"
                   :tableColumn="operationTableColumn"
                   :showPagination="false"
        ></JFX-table>
      </el-tab-pane>
      <el-tab-pane label="NC 信息" name="4">
        <el-row :gutter="10" class="fs-12 clr-II detail-row">
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            NC单据号：{{detail.ncCode || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            NC单据状态：{{detail.ncStatusLabel || '- -'}}
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
      <el-tab-pane label="核销记录" name="5">
        <JFX-table :tableData.sync="verifyTableData"
                   :tableColumn="verifyTableColumn"
                   :showPagination="false">
          <template slot="verifyDate" slot-scope="{row}">
            {{row.verifyDate ? row.verifyDate.slice(0, 10) : ''}}
          </template>
        </JFX-table>
      </el-tab-pane>
    </el-tabs>
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
      <el-row class="company-page mr-t-20 mr-b-10" v-if="operateType === '1' || operateType === '3'">
        <el-col :span="24" class="mr-t-10">
          <el-form-item label="审批备注：" prop="operateResult" class="textarea-con">
            <el-radio-group v-model="ruleForm.operateResult">
              <el-radio label="0">通过</el-radio>
              <el-radio label="1">驳回</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="mr-t-10">
        <el-form-item label="审批备注：" prop="operateRemark" class="textarea-con">
          <el-input type="textarea" v-model="ruleForm.operateRemark" :rows="5" />
        </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="flex-c-c" v-if="operateType === '1' || operateType === '3'">
      <el-button type="primary" @click="closeTag">返回</el-button>
      <el-button type="primary" @click="handleExamine" :loading="btnLoading">
        {{operateType === '1' ? '审核' : '审核作废'}}
      </el-button>
    </div>
  </div>
</template>
<script>
import commomMix from '@m/index'
import { getBaseUrl } from '@u/tool'
import { attachmentUploadFiles } from '@a/base/index'
import { detailAdvanceItem, auditAdvanceItem } from '@a/receiveMoneyManage'
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
        { label: '操作内容', prop: 'content', minWidth: '120', align: 'center', hide: true },
        { label: '备注', prop: 'operateRemark', minWidth: '120', align: 'center', hide: true },
        { label: '操作时间', prop: 'operateDate', minWidth: '150', align: 'center', hide: true }
      ],
      // 核销记录
      verifyTableData: {
        list: []
      },
      // 表格列数据
      verifyTableColumn: [
        { label: '收款流水单号', prop: 'verifyNo', minWidth: '150', align: 'center', hide: true },
        { label: '收款金额', prop: 'price', minWidth: '150', align: 'center', hide: true },
        { label: '收款日期', slotTo: 'verifyDate', minWidth: '150', align: 'center', hide: true },
        { label: '操作人', prop: 'verifier', minWidth: '150', align: 'center', hide: true },
        { label: '操作时间', prop: 'createDate', minWidth: '150', align: 'center', hide: true }
      ],
      action: '',
      btnLoading: false,
      operateType: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { operateType, id } = this.$route.query
      this.operateType = operateType
      const { data } = await detailAdvanceItem({ id })
      this.detail = data
      const { itemList, operateList, verifyList } = this.detail
      this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + this.detail.code
      if (itemList && itemList.length) {
        this.tableData.list = itemList.map(item => ({ ...item, currency: this.detail.currency }))
      } else {
        this.tableData.list = []
      }
      this.operationTableData.list = operateList || []
      this.verifyTableData.list = verifyList || []
      await this.$nextTick()
      // 删除表头gutter
      const gutters = document.getElementsByClassName('gutter')
      gutters && gutters.length && Array.from(gutters).forEach((item, index) => {
        if (index === 1) {
          item.parentNode.removeChild(item)
        }
      })
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
        const { id: advanceId, operateType } = this.$route.query
        const { operateResult, operateRemark } = this.ruleForm
        if (valid) {
          try {
            this.btnLoading = true
            await auditAdvanceItem({
              advanceId,
              operateResult,
              operateRemark,
              operateType
            })
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
    summaryMethod({ columns }) {
      const sums = []
      columns.forEach((item, index) => {
        if (index === 0) {
          item.colSpan = 3
        }
        if (index === 1) {
          item.colSpan = 4
        }
      })
      sums[0] = `汇总：${this.detail.sumAmountStr}`
      sums[1] = `${this.detail.currency} ${this.detail.sumAmount}`
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
