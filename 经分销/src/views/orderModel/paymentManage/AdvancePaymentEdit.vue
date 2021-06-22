<template>
  <!-- 预付款单新增/编辑页面 -->
  <div class="page-bx bgc-w sales-add-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 预收信息 -->
    <div class="flex-c-c mr-b-20 mr-t-10">
      <h2>{{ruleForm.buName}} {{ruleForm.supplierName}} 预付款单</h2>
    </div>
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
      <JFX-title title="供应商信息" className="bor-n mr-t-15" />
      <el-row :gutter="10" class="edit-row-bor">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="收款账户：" prop="beneficiaryName">
            <el-input v-model.trim="ruleForm.beneficiaryName" placeholder="请输入" clearable :disabled="$route.query.operateType === 'examine'" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="收款银行：" prop="depositBank">
            <el-input v-model.trim="ruleForm.depositBank" placeholder="请输入" clearable :disabled="$route.query.operateType === 'examine'" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="收款账号：" prop="bankAccount">
            <el-input v-model.trim="ruleForm.bankAccount" placeholder="请输入" clearable :disabled="$route.query.operateType === 'examine'" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="Swift Code：" prop="swiftCode">
            <el-input v-model.trim="ruleForm.swiftCode" placeholder="请输入" clearable :disabled="$route.query.operateType === 'examine'" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="开户行地址：" prop="bankAddress">
            <el-input v-model.trim="ruleForm.bankAddress" placeholder="请输入" clearable :disabled="$route.query.operateType === 'examine'" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="结算币种：" prop="currency">
            <el-select v-model="ruleForm.currency"
                      placeholder="请选择"
                      clearable
                      filterable
                      disabled
                      :data-list="getCurrencySelectBean('currencyList')">
              <el-option
                v-for="item in selectOpt.currencyList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />、
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <JFX-title title="付款信息" className="bor-n mr-t-15" />
      <el-row :gutter="10" class="edit-row-bor">
        <el-row  :gutter="10" class="fs-14 clr-II">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="预计付款日期：" prop="expectedPaymentDateStr" >
              <el-date-picker
                v-model="ruleForm.expectedPaymentDateStr"
                :disabled="$route.query.operateType === 'examine'"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="mr-t-10">
            <el-form-item label="请款原因：" prop="paymentReason" class="textarea-con">
              <el-input type="textarea" v-model="ruleForm.paymentReason" :rows="5" :disabled="$route.query.operateType === 'examine'" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <!-- 操作 -->
      <el-row>
        <el-col :span="24" class="mr-t-15 mr-b-10">
          <el-button type="primary" @click="showModal('selectDocument')">选择单据</el-button>
          <el-button type="primary" @click="removeTableItem">删除</el-button>
        </el-col>
      </el-row>
      <!-- 操作 end -->
      <JFX-table :tableData.sync="tableData"
                 :showPagination="false"
                 :summary-method="getSummaries"
                 showSummary
                 ref="rootTable"
                 @selection-change="selectionChange">
        <el-table-column type="selection"
                         align="center"
                         width="55"
        ></el-table-column>
        <el-table-column prop="purchaseCode"
                         align="center"
                         min-width="140"
                         label="采购订单号"
                         show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="projectName"
                         align="center"
                         min-width="150"
                         label="费项名称"
                         show-overflow-tooltip>
          <template slot-scope="{row, $index}">
            <div @click="showModal('selectSettlement', $index)">
              <el-input v-model="row.projectName" clearable style="width: 94%;" readonly />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="purchaseAmount"
                         align="center"
                         min-width="150"
                         label="采购总金额"
                         show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="prepaymentAmount"
                         align="center"
                         min-width="150"
                         label="申请付款金额"
                         show-overflow-tooltip>
          <template slot-scope="{row}">
            <JFX-Input v-model="row.prepaymentAmount" :precision="2" :min="0" style="width: 94%;" :disabled="$route.query.operateType === 'examine'" />
          </template>
        </el-table-column>
        <el-table-column prop="currency"
                         align="center"
                         min-width="120"
                         label="币种"
                         show-overflow-tooltip
        ></el-table-column>
      </JFX-table>
      <!-- 预收信息 end -->
      <!-- 选择单据 end -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="附件信息" name="1">
          <JFX-upload @success="successUpload" :url="action" :limit="10000" :multiple="false">
            <el-button id="sale-upload-btn" type="primary">上传文件</el-button>
          </JFX-upload>
          <EnclosureList :showAction="false" :code="ruleForm.code" ref="enclosure" class="mr-t-15" />
        </el-tab-pane>
        <el-tab-pane label="操作日志" name="2">
          <JFX-table :tableData.sync="operationTableData"
                     :tableColumn="operationTableColumn"
                     :showPagination="false"
          ></JFX-table>
        </el-tab-pane>
        <el-tab-pane label="付款记录" name="3">
          <JFX-table :tableData.sync="paymentTableData"
                     :tableColumn="paymentTableColumn"
                     :showPagination="false"
          ></JFX-table>
        </el-tab-pane>
      </el-tabs>
      <el-row class="company-page mr-b-10" v-if="$route.query.operateType === 'examine'">
        <el-col :span="24" class="mr-t-10">
          <el-form-item label="审批结果：" prop="isPassed" class="textarea-con">
            <el-radio-group v-model="ruleForm.isPassed" style="padding-top: 6px;">
              <el-radio label="1">通过</el-radio>
              <el-radio label="0">驳回</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="mr-t-10">
        <el-form-item label="审批备注：" prop="invalidRemark" class="textarea-con">
          <el-input type="textarea" v-model="ruleForm.invalidRemark" :rows="5" />
        </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 底部按钮 -->
    <div class="mr-t-30 flex-c-c">
      <el-button @click="handleSave" type="primary" :loading="saveBtnLoading">保 存</el-button>
      <el-button @click="closeTag">取 消</el-button>
      <el-button @click="showSumbitModal" v-if="$route.query.operateType !== 'examine'" type="primary" :loading="sumbitBtnLoading">提 交</el-button>
      <el-button @click="handleExamine" v-if="$route.query.id && $route.query.operateType === 'examine'" type="primary" :loading="examineBtnLoading">审 核</el-button>
    </div>
    <!-- 底部按钮 end -->
    <!-- 选择单据 -->
    <SelectDocument v-if="selectDocument.visible.show"
                    :selectDocumentVisible="selectDocument.visible"
                    :orderType="selectDocument.orderType"
                    :codes="selectDocument.codes"
                    :data="selectDocument.data"
                    @comfirm="(data) => closeModal('selectDocument', data)"
    ></SelectDocument>
    <!-- 选择单据 end -->
    <!-- 选择结算项目 -->
    <SelectSettlement v-if="selectSettlement.visible.show"
                      :selectSettlementVisible="selectSettlement.visible"
                      :index=selectSettlement.index
                      @comfirm="(data) => closeModal('selectSettlement', data)"
    ></SelectSettlement>
    <!-- 选择结算项目 end -->
    <!-- 选择提交弹窗 -->
    <JFX-Dialog
      :visible.sync="isVisible"
      :showClose="true"
      :width="'400px'"
      :title="'选择审批方式'"
      :btnAlign="'center'"
      :confirmBtnLoading="confirmBtnLoading"
      top="30vh"
      @comfirm="handleSubmit"
    >
      <el-radio-group v-model="auditMethod" class="mr-t-20 mr-b-30 flex-c-c">
        <el-radio label="1">提交OA审批</el-radio>
        <el-radio label="2" disabled>经分销内部审批</el-radio>
      </el-radio-group>
      <p style="padding: 0 10px 10px;color: #ff0000">注：为让您的请款顺利审批通过，请先上传金蝶合同审批截图等资料。</p>
    </JFX-Dialog>
    <!-- 选择提交弹窗 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import { getBaseUrl, convertCurrency } from '@u/tool'
import {
  saveOrModifyAdvancePaymentBill,
  getAddPageInfo,
  detailAdvance,
  listOperateLog,
  getPaymentItems,
  getRecordItemList,
  modifyAuditMethod,
  auditAdvancePayment
} from '@a/paymentManage'
import { attachmentUploadFiles } from '@a/base/index'
export default {
  mixins: [commomMix],
  components: {
    // 选择单据
    SelectDocument: () => import('./components/InnerSelectDocument'),
    // 选择结算项目
    SelectSettlement: () => import('./components/SelectSettlement'),
    // 附件列表
    EnclosureList: () => import('@c/enclosureList/index')
  },
  data() {
    return {
      // 表单信息
      ruleForm: {
        beneficiaryName: '',
        depositBank: '',
        bankAccount: '',
        swiftCode: '',
        bankAddress: '',
        currency: '',
        expectedPaymentDateStr: '',
        paymentReason: '',
        isPassed: '',
        invalidRemark: '',
        code: '',
        buName: '',
        buId: '',
        supplierId: '',
        supplierName: '',
        merchantId: '',
        merchantName: ''
      },
      // 校验规则
      rules: {
         beneficiaryName: { required: true, message: '请输入收款账户', trigger: 'blur' },
         depositBank: { required: true, message: '请输入收款银行', trigger: 'blur' },
         bankAccount: { required: true, message: '请输入收款账号', trigger: 'blur' },
         currency: { required: true, message: '请选择结算币种', trigger: 'change' },
         expectedPaymentDateStr: { required: true, message: '请选择预计付款日期', trigger: 'change' },
         paymentReason: { required: true, message: '请输入收请款原因', trigger: 'blur' },
         isPassed: { required: true, message: '请选择审批结果', trigger: 'change' },
         invalidRemark: { required: true, message: '请输入审批备注', trigger: 'blur' }
      },
      detail: {},
      // 操作日志表格数据
      operationTableData: {
        list: []
      },
      // 操作日志表格列结构
      operationTableColumn: [
        { label: '操作人', prop: 'operater', minWidth: '120', align: 'center', hide: true },
        { label: '操作项', prop: 'operateAction', minWidth: '120', align: 'center', hide: true },
        { label: '操作结果', prop: 'operateResult', minWidth: '120', align: 'center', hide: true },
        { label: '备注', prop: 'operateRemark', minWidth: '120', align: 'center', hide: true },
        { label: '操作时间', prop: 'operateDate', minWidth: '150', align: 'center', hide: true }
      ],
      // 付款记录表格数据
      paymentTableData: {
        list: []
      },
      // 付款记录表格列结构
      paymentTableColumn: [
        { label: '核销单号', prop: 'code', minWidth: '120', align: 'center', hide: true },
        { label: '单据类型', prop: 'orderType', minWidth: '120', align: 'center', hide: true },
        { label: '付款人', prop: 'creatorName', minWidth: '120', align: 'center', hide: true },
        { label: '付款时间', prop: 'paymentDate', minWidth: '150', align: 'center', hide: true },
        { label: '付款流水号', prop: 'serialNo', minWidth: '150', align: 'center', hide: true },
        { label: '付款金额', prop: 'paymentAmount', minWidth: '150', align: 'center', hide: true }
      ],
      // 选择单据组件状态
      selectDocument: {
        visible: {
          show: false
        },
        codes: '',
        orderType: '',
        data: {}
      },
      // 选择单据组件状态
      selectSettlement: {
        visible: {
          show: false
        },
        index: 0
      },
      // 上传附件的url
      action: '',
      // 当前的tab页
      activeName: '1',
      // 保存按钮loading
      saveBtnLoading: false,
      // 提交按钮loading
      sumbitBtnLoading: false,
      // 审核按钮loading
      examineBtnLoading: false,
      // 标识记录单据用于删除
      index: 0,
      // 选择提交方式弹窗状态
      isVisible: { show: false },
      // 选择提交方式弹窗loading
      confirmBtnLoading: false,
      // 提交方式
      auditMethod: '1',
      // 点击保存返回的id
      currentBillId: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id, ids } = this.$route.query
      id ? this.editInit(id) : this.addInit(ids)
    },
    // 新增页面初始化
    async addInit(ids) {
      const { data } = await getAddPageInfo({ ids })
      // 获取表头信息
      for (const key in this.ruleForm) {
        this.ruleForm[key] = data[key] ? data[key] + '' : ''
      }
      // 上传附件地址rul
      this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + this.ruleForm.code
      // 获取表体信息
      const { itemList } = data
      if (itemList && itemList.length) {
        this.tableData.list = itemList.map(item => ({
          purchaseId: item.purchaseId,
          purchaseCode: item.purchaseCode,
          purchaseAmount: item.purchaseAmount || '0',
          prepaymentAmount: item.prepaymentAmount || '0',
          parentProjectId: item.parentProjectId,
          parentProjectName: item.parentProjectName,
          projectName: item.projectName,
          projectId: item.projectId,
          currency: item.currency,
          index: this.index++
        }))
        // 获取币种
        this.ruleForm.currency = itemList[0].currency
      }
    },
    // 编辑页面初始化
    async editInit(id) {
      const { data } = await detailAdvance({ id })
      // 获取表头信息
      for (const key in this.ruleForm) {
        this.ruleForm[key] = data[key] ? data[key] + '' : ''
      }
      this.ruleForm.expectedPaymentDateStr = data.expectedPaymentDate ? data.expectedPaymentDate.slice(0, 10) : ''
      // 上传附件地址rul
      this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + this.ruleForm.code
      // 获取付款明细
      const { data: list } = await getPaymentItems({ id })
      this.tableData.list = list.map(item => ({ ...item, index: this.index++ }))
      // 获取操作日志
      const { data: operateList } = await listOperateLog({ id })
      this.operationTableData.list = operateList
      // 获取付款记录
      const { data: paymentList } = await getRecordItemList({ id })
      this.paymentTableData.list = paymentList
    },
    // 获取请求参数
    getFetchParams() {
      const { id } = this.$route.query
      // 表体
      const itemList = this.tableData.list.map(item => ({
        ...item,
        prepaymentAmount: item.prepaymentAmount || '0'
      }))
      // 请求参数
      const params = {
        id: id || '',
        ...this.ruleForm,
        itemList
      }
      return params
    },
    // 保存
    async handleSave() {
      try {
        this.saveBtnLoading = true
        // 校验表体
        const checked = this.checkList()
        if (!checked) return false
        // 获取请求参数
        const params = this.getFetchParams()
        await saveOrModifyAdvancePaymentBill(params)
        this.$successMsg('操作成功')
        this.closeTag()
      } catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.saveBtnLoading = false
      }
    },
    // 显示选择提交方式弹窗
    showSumbitModal() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          // 校验表体
          const checked = this.checkList()
          if (!checked) return false
          this.isVisible.show = true
        } else {
          this.$errorMsg('请填写表单必填项')
        }
      })
    },
    // 提交
    async handleSubmit() {
      const { id } = this.$route.query
      try {
        this.sumbitBtnLoading = true
        // 校验表体
        const checked = this.checkList()
        if (!checked) return false
        // 获取请求参数
        const params = this.getFetchParams()
        if (!this.auditMethod) {
          this.$errorMsg('请选择审批方式')
          return false
        }
        // 保存接口
        if (!this.currentBillId) {
          const { data: { billId } } = await saveOrModifyAdvancePaymentBill(params)
          this.currentBillId = billId
        }
        // 提交接口
        await modifyAuditMethod({
          id: id || this.currentBillId,
          auditMethod: this.auditMethod
        })
        this.$successMsg('操作成功')
        this.closeTag()
      } catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.sumbitBtnLoading = false
      }
    },
    // 审核
    async handleExamine() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          const { id } = this.$route.query
          const { invalidRemark, isPassed } = this.ruleForm
          // 校验表体
          const checked = this.checkList()
          if (!checked) return false
          try {
            this.examineBtnLoading = true
            // 获取请求参数
            const params = this.getFetchParams()
            await saveOrModifyAdvancePaymentBill(params)
            await auditAdvancePayment({ id, isPassed, invalidRemark })
            this.$successMsg('操作成功')
            this.closeTag()
          } catch (error) {
            this.$errorMsg(error.message)
          } finally {
            this.examineBtnLoading = false
          }
        } else {
          this.$errorMsg('请填写表单必填项')
        }
      })
    },
    // 校验单据
    checkList() {
      let flag = true
      if (!this.tableData.list.length) {
        this.$errorMsg(`至少选择一条单据`)
        flag = false
        return flag
      }
      for (let i = 0; i < this.tableData.list.length; i++) {
        const { prepaymentAmount, projectName } = this.tableData.list[i]
        if (prepaymentAmount === undefined || prepaymentAmount === null || prepaymentAmount === '' || prepaymentAmount < 0) {
          this.$errorMsg(`表格第${i + 1}行，申请付款金额不能为空或者小于0`)
          flag = false
          break
        }
        if (projectName === undefined || projectName === null || projectName === '') {
          this.$errorMsg(`表格第${i + 1}行，费项不能为空`)
          flag = false
          break
        }
      }
      return flag
    },
    // 显示弹窗
    showModal(type, data) {
      switch (type) {
        // 选择单据
        case 'selectDocument':
          this.selectDocument.visible.show = true
          this.selectDocument.orderType = this.ruleForm.orderType
          const { currency, buId, supplierId } = this.ruleForm
          this.selectDocument.data = { currency, buId, supplierId }
          const codes = this.tableData.list.map(item => item.purchaseCode).toString()
          this.selectDocument.codes = codes
          break
        // 选择费项
        case 'selectSettlement':
          this.selectSettlement.visible.show = true
          this.selectSettlement.index = data
          break
      }
    },
    // 关闭弹窗
    closeModal(type, data) {
      switch (type) {
        // 选择单据
        case 'selectDocument':
          this.selectDocument.visible.show = false
          this.selectDocument.orderType = ''
          this.selectDocument.data = {}
          if (data && data.length) {
            const list = data.map(item => ({
              purchaseId: item.id,
              purchaseCode: item.code,
              purchaseAmount: item.goodsAmount || '0',
              prepaymentAmount: item.goodsAmount || '0',
              parentProjectId: item.parentProjectId,
              parentProjectName: item.parentProjectName,
              projectName: item.projectName,
              projectId: item.projectId,
              currency: item.currency,
              index: this.index++
            }))
            this.tableData.list.push(...list)
          }
          break
        // 选择费项
        case 'selectSettlement':
          this.selectSettlement.visible.show = false
          if (data) {
            const { index, projectId, projectName, parentProjectId, parentProjectName } = data
            const item = this.tableData.list[index]
            this.tableData.list.splice(index, 1, { ...item, projectId, projectName, parentProjectId, parentProjectName })
          }
          break
      }
    },
    // 计算总和
    getSummaries({ columns, data }) {
      const sums = []
      let purchaseAmounts = 0
      let prepaymentAmounts = 0
      columns.forEach((item, index) => {
        if (index === 0) {
          item.colSpan = 3
        }
      })
      data.forEach(item => {
        purchaseAmounts += item.purchaseAmount ? +item.purchaseAmount : 0
        prepaymentAmounts += item.prepaymentAmount ? +item.prepaymentAmount : 0
      })
      const total = convertCurrency(prepaymentAmounts)
      sums[0] = `预收总额：${total}`
      sums[1] = (+purchaseAmounts).toFixed(2)
      sums[2] = (+prepaymentAmounts).toFixed(2)
      sums[3] = this.ruleForm.currency || ''
      return sums
    },
    // 上传附件成功
    successUpload(res) {
      if (res.code + '' === '10000') {
        this.$refs['enclosure'].getEnclosureList(1)
      } else {
        this.$errorMsg(res.message)
      }
    },
    // 删除商品
    removeTableItem() {
      if (!this.tableChoseList.length) {
        return this.$errorMsg('请勾选需要删除的单据！')
      }
      this.$showToast('确定删除数据？', () => {
        const ids = this.tableChoseList.map(item => item.index)
        this.tableData.list = this.tableData.list.filter(item => !ids.includes(item.index))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.sales-add-bx .el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 130px;
}
/deep/.sales-add-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.title-bx{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/deep/.textarea-con {
  display: flex;
  align-items: flex-start;
  .el-form-item__label{
    width: 130px;
  }
  .el-form-item__content {
    width: 700px;
  }
}
</style>
