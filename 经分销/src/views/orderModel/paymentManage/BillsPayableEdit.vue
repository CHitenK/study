<template>
  <!-- 预付款单新增/编辑页面 -->
  <div class="page-bx bgc-w sales-add-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 预收信息 -->
    <div class="flex-c-c mr-b-20 mr-t-10">
      <h2>{{ruleForm.supplierName}}应付账单</h2>
    </div>
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
      <JFX-title title="供应商信息" className="bor-n mr-t-15" />
      <el-row :gutter="10" class="edit-row-bor">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="收款账户：" prop="beneficiaryName">
            <el-input v-model.trim="ruleForm.beneficiaryName" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="收款银行：" prop="depositBank">
            <el-input v-model.trim="ruleForm.depositBank" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="收款账号：" prop="bankAccount">
            <el-input v-model.trim="ruleForm.bankAccount" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="Swift Code：" prop="swiftCode">
            <el-input v-model.trim="ruleForm.swiftCode" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="开户行地址：" prop="bankAddress">
            <el-input v-model.trim="ruleForm.bankAddress" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="结算币种：" prop="currency">
            <el-select v-model="ruleForm.currency"
                       placeholder="请选择"
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
            <el-form-item label="应付总额：" prop="payableAmount">
              <el-input v-model.trim="ruleForm.payableAmount" placeholder="请输入" disabled />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="已付款总额：" prop="paymentAmount">
              <el-input v-model.trim="ruleForm.paymentAmount" placeholder="请输入" disabled />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="待付款总额：" prop="surplusAmount">
              <el-input v-model.trim="ruleForm.surplusAmount" placeholder="请输入" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="预计付款日期：" prop="expectedPaymentDateStr" >
              <el-date-picker
                v-model="ruleForm.expectedPaymentDateStr"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="mr-t-10">
            <el-form-item label="请款原因：" prop="paymentReason" class="textarea-con">
              <el-input type="textarea" v-model="ruleForm.paymentReason" :rows="5" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
    </el-form>
    <el-tabs v-model="activeName">
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
            <el-row class="mr-b-10">
              <el-button type="primary" @click="removePayableItem">删除</el-button>
            </el-row>
            <JFX-table :tableData.sync="payableTableData"
                       :showPagination="false"
                       @selection-change="selectionChange">
              <el-table-column type="selection"
                               align="center"
                               width="55"
                               :selectable="(row) => row.isTotal !== true"
              ></el-table-column>
              <el-table-column prop="purchaseCode"
                               align="center"
                               width="150"
                               label="采购单号"
                               show-overflow-tooltip
              ></el-table-column>
              <el-table-column prop="goodsNo"
                               align="center"
                               width="120"
                               label="商品货号"
                               show-overflow-tooltip
              ></el-table-column>
              <el-table-column prop="goodsName"
                               align="center"
                               min-width="120"
                               label="商品名称"
                               show-overflow-tooltip
              ></el-table-column>
              <el-table-column align="center" min-width="150" label="费项名称">
                <template slot-scope="{row, $index}">
                  <div @click="showModal('selectSettlement', { index: $index, type: 'payable' })" v-if="!row.isTotal">
                    <el-input v-model="row.projectName" clearable style="width: 94%;" readonly />
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="num"
                               align="center"
                               width="100"
                               label="采购数量"
                               show-overflow-tooltip
              ></el-table-column>
              <el-table-column align="center" width="100" prop="purchaseAmount">
                <template slot="header">
                  <span>采购金额<br/>(不含税)</span>
                </template>
              </el-table-column>
              <el-table-column prop="tax"
                               align="center"
                               width="100"
                               label="税额"
                               show-overflow-tooltip
              ></el-table-column>
              <el-table-column align="center" width="100" prop="purchaseTaxAmount">
                <template slot="header">
                  <span>采购金额<br/>(含税)</span>
                </template>
              </el-table-column>
              <el-table-column align="center" min-width="150">
                <template slot="header">
                  <span class="need">本期结算金额<br/>(不含税)</span>
                </template>
                <template slot-scope="{row}">
                  <JFX-Input v-model.trim="row.settlementAmount"
                             :precision="2"
                             :min="0"
                             style="width: 100%;"
                             @change="row.isTotal ? calcPayableList('settlementAmount') : calcPayableTotal('settlementAmount')"
                             clearable
                  ></JFX-Input>
                </template>
              </el-table-column>
              <el-table-column align="center" min-width="150">
                <template slot="header">
                  <span class="need">本期结算税额</span>
                </template>
                <template slot-scope="{row}">
                  <JFX-Input v-model.trim="row.settlementTax"
                             :precision="2"
                             :min="0"
                             style="width: 100%;"
                             @change="row.isTotal ? calcPayableList('settlementTax') : calcPayableTotal('settlementTax')"
                             clearable
                  ></JFX-Input>
                </template>
              </el-table-column>
            </JFX-table>
          </el-tab-pane>
          <el-tab-pane label="费用明细" name="2">
            <el-row class="mr-b-10">
              <el-button type="primary" @click="addFee">增加</el-button>
              <el-button type="primary" @click="removeFeeItem">删除</el-button>
            </el-row>
            <JFX-table :tableData.sync="feeTableData"
                       :showPagination="false"
                       :summary-method="getSummaries"
                       showSummary
                       @selection-change="feeSelectionChange">
              <el-table-column type="selection"
                               align="center"
                               width="55"
              ></el-table-column>
              <el-table-column align="center" width="150">
                <template slot="header">
                  <span class="need">费项名称</span>
                </template>
                <template slot-scope="{row, $index}">
                  <div @click="showModal('selectSettlement', { index: $index, type: 'fee' })" v-if="!row.isTotal">
                    <el-input v-model="row.projectName" clearable style="width: 94%;" readonly />
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" width="150">
                <template slot="header">
                  <span class="need">类型</span>
                </template>
                <template slot-scope="{row}">
                  <el-select v-model="row.type"
                             placeholder="请选择"
                             clearable
                             filterable
                             @change="calcPayableTable">
                    <el-option label="补款" value="1" />
                    <el-option label="扣款" value="0" />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" width="150" label="po号">
                <template slot-scope="{row}">
                  <el-input v-model="row.poNo" clearable />
                </template>
              </el-table-column>
              <el-table-column align="center" width="150" label="商品货号">
                <template slot-scope="{row, $index}">
                  <span v-if="row.goodsId">{{row.goodsNo}}</span>
                  <el-button v-else type="primary" @click="showModal('chooseProduct', $index)">选择商品</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="goodsName"
                              align="center"
                              min-width="140"
                              label="商品名称"
                              show-overflow-tooltip
              ></el-table-column>
              <el-table-column align="center" width="150">
                <template slot="header">
                  <span class="need">母品牌</span>
                </template>
                <template slot-scope="{row}">
                  <el-select v-model="row.superiorParentBrandId"
                             placeholder="请选择"
                             filterable
                             clearable
                             :data-list="getBrandList('brand_list')">
                    <el-option
                      v-for="item in selectOpt.brand_list"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" width="150" label="数量">
                <template slot-scope="{row}">
                  <JFX-Input v-model.trim="row.num"
                             :precision="0"
                             :min="0"
                             style="width: 100%;"
                             clearable
                  ></JFX-Input>
                </template>
              </el-table-column>
              <el-table-column align="center" width="150">
                <template slot="header">
                  <span class="need">费用金额<br/>(不含税)</span>
                </template>
                <template slot-scope="{row}">
                  <JFX-Input v-model.trim="row.costAmount"
                             :precision="2"
                             :min="0"
                             style="width: 100%;"
                             clearable
                             @change="calcPayableTable"
                  ></JFX-Input>
                </template>
              </el-table-column>
              <el-table-column align="center" width="150" label="税额">
                <template slot="header">
                  <span class="need">税额</span>
                </template>
                <template slot-scope="{row}">
                  <JFX-Input v-model.trim="row.tax"
                             :precision="2"
                             :min="0"
                             style="width: 100%;"
                             clearable
                             @change="calcPayableTable"
                  ></JFX-Input>
                </template>
              </el-table-column>
            </JFX-table>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="操作日志" name="3">
        <JFX-table :tableData.sync="operationTableData"
                   :tableColumn="operationTableColumn"
                   :showPagination="false"
        ></JFX-table>
      </el-tab-pane>
      <el-tab-pane label="核销记录" name="4">
        <div class="mr-b-10">
          <el-button type="primary" @click="showModal('crossAdvance')">勾稽预付款单</el-button>
          <el-button type="primary" @click="removePaymentTable">删除</el-button>
        </div>
        <JFX-table :tableData.sync="paymentTableData"
                   :tableColumn="paymentTableColumn"
                   :showPagination="false"
                   showSelection
                   @selection-change="paymentSelectionChange">
          <template slot="paymentDate" slot-scope="{row}">
            {{row.paymentDate ? row.paymentDate.slice(0, 10) : ''}}
          </template>
          <template slot="billStatus" slot-scope="{row}">
            {{row.billStatus === '1' ? '预付款单' : 'NC'}}
          </template>
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="附件信息" name="5">
        <JFX-upload @success="successUpload" :url="action" :limit="10000" :multiple="false">
          <el-button id="sale-upload-btn" type="primary">上传文件</el-button>
        </JFX-upload>
        <EnclosureList :showAction="false" :code="ruleForm.code" ref="enclosure" class="mr-t-15" />
      </el-tab-pane>
    </el-tabs>
    <!-- 底部按钮 -->
    <div class="mr-t-30 flex-c-c">
      <el-button @click="handleSave" type="primary" :loading="saveBtnLoading">保 存</el-button>
      <el-button @click="closeTag">取 消</el-button>
      <el-button @click="showSumbitModal" type="primary" :loading="sumbitBtnLoading">提 交</el-button>
    </div>
    <!-- 底部按钮 end -->
    <!-- 选择单据 -->
    <SelectDocument v-if="selectDocument.visible.show"
                    :selectDocumentVisible="selectDocument.visible"
                    :orderType="selectDocument.orderType"
                    :checkRelCodeStr="selectDocument.checkRelCodeStr"
                    :data="selectDocument.data"
                    @comfirm="(data) => closeModal('selectDocument', data)"
    ></SelectDocument>
    <!-- 选择单据 end -->
    <!-- 选择结算项目 -->
    <SelectSettlement v-if="selectSettlement.visible.show"
                      :selectSettlementVisible="selectSettlement.visible"
                      :customerpurchaseIdId="selectSettlement.customerId"
                      :selectType="selectSettlement.type"
                      :index=selectSettlement.index
                      @comfirm="(data, type) => closeModal('selectSettlement', { ...data, type } )"
    ></SelectSettlement>
    <!-- 选择结算项目 end -->
    <!-- 选择商品 -->
    <ChooseProduct v-if="chooseProductVisible.show"
                  :visible.sync="chooseProductVisible"
                  :filterData="filterData"
                  @comfirm="(data) => closeModal('chooseProduct', data)"
    ></ChooseProduct>
    <CrossAdvance v-if="crossAdvance.visible.show"
                  :data="crossAdvance.data"
                  :crossAdvanceVisible.sync="crossAdvance.visible"
                  @comfirm="(data) => closeModal('crossAdvance', data)"
    ></CrossAdvance>
    <!-- 选择商品 -->
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
  paymentBillAddPage,
  saveOrModifyPaymentBill,
  paymentBillListOperateLog,
  getVerificateList,
  paymentBillCostItems,
  detailPaymentBill,
  paymentBillPaymentItems,
  paymentBillAuditMethod
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
    EnclosureList: () => import('@c/enclosureList/index'),
    // 选择商品
    ChooseProduct: () => import('@c/choseProducts/index'),
    // 勾稽
    CrossAdvance: () => import('./components/CrossAdvance')
  },
  data() {
    return {
      // 详情信息
      ruleForm: {
        code: '',
        bankAccount: '',
        depositBank: '',
        beneficiaryName: '',
        swiftCode: '',
        bankAddress: '',
        currency: '',
        payableAmount: '',
        paymentAmount: '',
        surplusAmount: '',
        expectedPaymentDateStr: '',
        paymentReason: '',
        buName: '',
        buId: '',
        supplierId: '',
        supplierName: '',
        merchantId: '',
        merchantName: ''
      },
      rules: {
        beneficiaryName: { required: true, message: '请输入收款账户', trigger: 'blur' },
        depositBank: { required: true, message: '请输入收款银行', trigger: 'blur' },
        bankAccount: { required: true, message: '请输入收款账号', trigger: 'blur' },
        currency: { required: true, message: '请选择结算币种', trigger: 'change' },
        expectedPaymentDateStr: { required: true, message: '请选择预计付款日期', trigger: 'change' },
        paymentReason: { required: true, message: '请输入收请款原因', trigger: 'blur' }
      },
      detail: {},
      // 应付明细表格数据
      payableTableData: {
        list: []
      },
      // 费用明细表格数据
      feeTableData: {
        list: []
      },
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
      // 核销记录表格数据
      paymentTableData: {
        list: []
      },
      // 核销记录表格列结构
      paymentTableColumn: [
        { label: '核销单号', prop: 'advancePaymentCode', minWidth: '120', align: 'center', hide: true },
        { label: '单据类型', slotTo: 'billStatus', minWidth: '120', align: 'center', hide: true },
        { label: '付款人', prop: 'drawee', minWidth: '120', align: 'center', hide: true },
        { label: '付款时间', slotTo: 'paymentDate', minWidth: '150', align: 'center', hide: true },
        { label: '付款流水单号', prop: 'serialNo', minWidth: '150', align: 'center', hide: true },
        { label: '待核销金额', prop: 'verificateAmount', minWidth: '150', align: 'center', hide: true },
        { label: '本次核销金额', prop: 'currentVerificateAmount', minWidth: '150', align: 'center', hide: true }
      ],
      // 选择单据组件状态
      selectDocument: {
        visible: {
          show: false
        },
        checkRelCodeStr: '',
        orderType: '',
        data: {}
      },
      // 选择单据组件状态
      selectSettlement: {
        visible: {
          show: false
        },
        type: '',
        customerId: '',
        index: 0
      },
      filterData: {},
      chooseProductVisible: {
        show: false
      },
      // 上传附件的url
      action: '',
      // 当前的tab页
      activeName: '1',
      // 保存按钮loading
      saveBtnLoading: false,
      // 提交按钮loading
      sumbitBtnLoading: false,
      // 标识记录单据用于删除
      payableIndex: 0,
      // 标识记录单据用于删除
      feeIndex: 0,
      // 标识记录单据用于删除
      paymentIndex: 0,
      // 选择商品的索引
      chooseProductIdx: 0,
      feeTableChoseList: [],
      paymentChoseList: [],
      innerActiveName: '1',
      // 选择提交方式弹窗状态
      isVisible: { show: false },
      // 选择提交方式弹窗loading
      confirmBtnLoading: false,
      // 提交方式
      auditMethod: '1',
      // 预售勾稽
      crossAdvance: {
        data: {},
        visible: { show: false }
      },
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
      // 删除表头gutter
      await this.$nextTick()
      const gutters = document.getElementsByClassName('gutter')
      gutters && gutters.length && Array.from(gutters).forEach((item, index) => {
        if (index === 1) {
          item.parentNode.removeChild(item)
        }
      })
    },
    // 新增页面初始化
    async addInit(ids) {
      try {
        const { data } = await paymentBillAddPage({ ids })
        // 表单内容
        for (const key in this.ruleForm) {
          if (['payableAmount', 'paymentAmount', 'surplusAmount'].includes(key)) {
            this.ruleForm[key] = data[key] ? data[key] + '' : '0'
          } else {
            this.ruleForm[key] = data[key] ? data[key] + '' : ''
          }
        }
        // 上传附件地址rul
        this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + this.ruleForm.code
        // 应付明细
        const { itemList, verificateItemList } = data
        if (itemList && itemList.length) {
          this.payableTableData.list = itemList.map(item => ({
            ...item,
            num: item.num || '0',
            purchaseAmount: item.purchaseAmount || '0',
            purchaseTaxAmount: item.purchaseTaxAmount || '0',
            tax: item.tax || '0',
            parentProjectId: item.parentProjectId,
            parentProjectName: item.parentProjectName,
            projectName: item.projectName,
            projectId: item.projectId,
            settlementAmount: item.purchaseAmount,
            settlementTax: item.tax,
            index: this.payableIndex++
          }))
        }
        if (verificateItemList && verificateItemList.length) {
          this.paymentTableData.list = verificateItemList.map(item => ({ ...item, advancePaymentCode: item.relCode }))
        }
        // 生成应付明明细合计行
        this.createPayableTotal()
        // 计算应付明明细合计行
        this.calcPayableTable()
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 编辑页面初始化
    async editInit(id) {
      const { data } = await detailPaymentBill({ id })
      // 表单内容
      for (const key in this.ruleForm) {
        if (['payableAmount', 'paymentAmount', 'surplusAmount'].includes(key)) {
          this.ruleForm[key] = data[key] ? data[key] + '' : '0'
        } else {
          this.ruleForm[key] = data[key] ? data[key] + '' : ''
        }
      }
      this.ruleForm.expectedPaymentDateStr = data.expectedPaymentDate ? data.expectedPaymentDate.slice(0, 10) : ''
      // 上传附件地址url
      this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + this.ruleForm.code
      // 应付明细
      const { data: itemList } = await paymentBillPaymentItems({ id })
      if (itemList && itemList.length) {
        this.payableTableData.list = itemList.map(item => ({
          ...item,
          num: item.num || '0',
          purchaseAmount: item.purchaseAmount || '0',
          purchaseTaxAmount: item.purchaseTaxAmount || '0',
          tax: item.tax || '0',
          parentProjectId: item.parentProjectId,
          parentProjectName: item.parentProjectName,
          projectName: item.projectName,
          projectId: item.projectId,
          settlementAmount: item.settlementAmount,
          settlementTax: item.settlementTax,
          index: this.payableIndex++
        }))
      }
      // 获取费用明细
      const { data: feeList } = await paymentBillCostItems({ id })
      this.feeTableData.list = feeList.map(item => ({
        ...item,
        superiorParentBrandId: item.superiorParentBrandId ? item.superiorParentBrandId + '' : ''
      }))
      // 获取操作记录
      const { data: operationList } = await paymentBillListOperateLog({ id })
      this.operationTableData.list = operationList
      // 获取核销记录
      const { data: paymentList } = await getVerificateList({ id })
      if (paymentList && paymentList.length) {
        this.paymentTableData.list = paymentList.map(item => ({ ...item, advancePaymentCode: item.relCode }))
      }
      // 生成应付明明细合计行
      this.createPayableTotal()
      // 计算应付明明细合计行
      this.calcPayableTable()
    },
    // 生成应付总汇
    calcPayableTable() {
      const paybleList = this.payableTableData.list.slice(0, this.payableTableData.list.length - 1)
      const feeList = this.feeTableData.list
      const paybleListProjectIds = paybleList.map(item => item.projectId)
      const feeListProjectIds = feeList.map(item => item.projectId)
      const projectIds = [...new Set([...paybleListProjectIds, ...feeListProjectIds])]
      const tempObj = projectIds.reduce((pre, item) => {
        paybleList.forEach(subItem => {
          if (subItem.projectId === item) {
            if (pre[item]) {
              pre[item].settlementAmount += subItem.settlementAmount ? +subItem.settlementAmount : 0
              pre[item].tax += subItem.settlementTax ? +subItem.settlementTax : 0
              pre[item].settlementTaxAmount += (subItem.settlementAmount ? +subItem.settlementAmount : 0) + (subItem.settlementTax ? +subItem.settlementTax : 0)
            } else {
              pre[item] = {
                parentProjectName: subItem.parentProjectName,
                parentProjectId: subItem.parentProjectId,
                projectId: subItem.projectId,
                projectName: subItem.projectName,
                settlementAmount: subItem.settlementAmount ? +subItem.settlementAmount : 0,
                tax: subItem.settlementTax ? +subItem.settlementTax : 0,
                settlementTaxAmount: (subItem.settlementAmount ? +subItem.settlementAmount : 0) + (subItem.settlementTax ? +subItem.settlementTax : 0),
                currency: this.ruleForm.currency
              }
            }
          }
        })
        feeList.forEach(subItem => {
          if (subItem.projectId === item) {
            if (pre[item]) {
              pre[item].settlementAmount += subItem.costAmount ? subItem.type === '1' ? +subItem.costAmount : -subItem.costAmount : 0
              pre[item].tax += subItem.tax ? subItem.type === '1' ? +subItem.tax : -subItem.tax : 0
              pre[item].settlementTaxAmount += (subItem.costAmount ? subItem.type === '1' ? +subItem.costAmount : -subItem.costAmount : 0) + (subItem.tax ? subItem.type === '1' ? +subItem.tax : -subItem.tax : 0)
            } else {
              pre[item] = {
                parentProjectName: subItem.parentProjectName,
                parentProjectId: subItem.parentProjectId,
                projectId: subItem.projectId,
                projectName: subItem.projectName,
                settlementAmount: subItem.costAmount ? subItem.type === '1' ? +subItem.costAmount : -subItem.costAmount : 0,
                tax: subItem.tax ? subItem.type === '1' ? +subItem.tax : -subItem.tax : 0,
                settlementTaxAmount: (subItem.costAmount ? subItem.type === '1' ? +subItem.costAmount : -subItem.costAmount : 0) + (subItem.tax ? subItem.type === '1' ? +subItem.tax : -subItem.tax : 0),
                currency: this.ruleForm.currency
              }
            }
          }
        })
        return pre
      }, {})
      const tempArr = []
      for (const key in tempObj) {
        tempArr.push(tempObj[key])
      }
      let settlementAmountTotal = 0
      this.tableData.list = tempArr.map(item => {
        settlementAmountTotal += item.settlementTaxAmount
        return {
          ...item,
          settlementAmount: (item.settlementAmount).toFixed(2),
          tax: (item.tax).toFixed(2),
          settlementTaxAmount: (item.settlementTaxAmount).toFixed(2)
        }
      })
      this.ruleForm.payableAmount = settlementAmountTotal.toFixed(2)
      this.ruleForm.surplusAmount = this.ruleForm.payableAmount - (+this.ruleForm.paymentAmount).toFixed(2)
      // 计算核销记录
      this.calcPaymentTable()
    },
    // 计算核销记录
    calcPaymentTable() {
      this.ruleForm.surplusAmount = this.ruleForm.payableAmount
      let surplusAmount = this.ruleForm.payableAmount
      for (let i = 0; i < this.paymentTableData.list.length; i++) {
        const item = this.paymentTableData.list[i]
        if (surplusAmount - item.verificateAmount >= 0) {
          item.currentVerificateAmount = item.verificateAmount
          this.ruleForm.surplusAmount = surplusAmount = surplusAmount - item.verificateAmount
        } else {
          item.currentVerificateAmount = surplusAmount
          surplusAmount = 0
          this.ruleForm.surplusAmount = 0
        }
      }
      this.ruleForm.paymentAmount = this.paymentTableData.list.reduce((pre, cur) => {
        pre += cur.currentVerificateAmount ? +cur.currentVerificateAmount : 0
        return pre
      }, 0).toFixed(2)
    },
    // 生成应付明细合计行
    createPayableTotal() {
      const list = this.payableTableData.list
      let nums = 0
      let purchaseAmounts = 0
      let purchaseTaxAmounts = 0
      let taxs = 0
      let settlementAmounts = 0
      let settlementTaxs = 0
      list.forEach(item => {
        nums += item.num ? +item.num : 0
        purchaseAmounts += item.purchaseAmount ? +item.purchaseAmount : 0
        purchaseTaxAmounts += item.purchaseTaxAmount ? +item.purchaseTaxAmount : 0
        taxs += item.tax ? +item.tax : 0
        settlementAmounts += item.settlementAmount ? +item.settlementAmount : 0
        settlementTaxs += item.settlementTax ? +item.settlementTax : 0
      })
      list.push({
        purchaseCode: '应付货款合计',
        isTotal: true,
        num: nums.toFixed(2),
        purchaseAmount: purchaseAmounts.toFixed(2),
        purchaseTaxAmount: purchaseTaxAmounts.toFixed(2),
        tax: taxs.toFixed(2),
        settlementAmount: settlementAmounts.toFixed(2),
        settlementTax: settlementTaxs.toFixed(2)
      })
    },
    // 计算合计
    calcPayableTotal(prop) {
      let decimal = 0
      let decimalLen = [0]
      // 原数组
      const originList = this.payableTableData.list
      // 不包含合计的数组
      const list = originList.slice(0, originList.length - 1)
      // 计算本期结算金额总和
      let total = list.reduce((pre, item) => {
        let targetProp = item[prop]
        // 没有输入值的情况
        if (!targetProp || isNaN(targetProp)) { targetProp = '0' }
        if ((targetProp + '').includes('.')) {
          decimal = targetProp.split('.')[1].length
          if (decimal > 2) {
            decimal = 2
            targetProp = targetProp.slice(0, targetProp.indexOf('.') + 3)
          }
        } else {
          targetProp = (+targetProp).toFixed(0)
        }
        decimalLen.push(decimal)
        pre += targetProp ? +targetProp : 0
        return pre
      }, 0)
      const maxLen = Math.max(...decimalLen)
      total = (+total).toFixed(maxLen)
      originList[originList.length - 1][prop] = total
      // 生成应付总汇
      this.calcPayableTable()
    },
    // 计算合计
    calcPayableList(prop) {
      // 小数位
      let decimal = 2
      // 原数组
      const originList = this.payableTableData.list
      // 不包含合计的数组
      const list = originList.slice(0, originList.length - 1)
      // 合计行输入的值
      let inputTotal = +originList[originList.length - 1][prop]
      if (!inputTotal || isNaN(inputTotal)) { inputTotal = '0' }
      if ((inputTotal + '').includes('.')) {
        const { length } = inputTotal.split('.')[1]
        decimal = length
      }
      const helper = {
        'settlementAmount': 'purchaseTaxAmount',
        'settlementTax': 'tax'
      }
      // 总数
      const total = list.reduce((pre, item) => {
        pre += item[helper[prop]] ? +item[helper[prop]] : 0
        return pre
      }, 0)
      let beforeTotal = 0
      list.forEach((item, index) => {
        if (index !== list.length - 1) {
          const temp = (item[helper[prop]] ? +item[helper[prop]] : 0)
          const sum = (inputTotal * (temp / total))
          const itemTotal = sum ? sum.toFixed(decimal) : 0
          beforeTotal += +itemTotal
          item[prop] = itemTotal
        } else {
          const itemTotal = (inputTotal - beforeTotal).toFixed(decimal)
          item[prop] = itemTotal
        }
      })
      // 生成应付总汇
      this.calcPayableTable()
    },
    // 增加费用明细
    addFee() {
      this.feeTableData.list.push({ index: this.feeIndex++ })
    },
    // 获取请求参数
    getFetchParams() {
      const { id } = this.$route.query
      const paymentSummaryList = this.tableData.list
      const verificateItemList = this.paymentTableData.list
      const itemList = this.payableTableData.list.slice(0, this.payableTableData.list.length - 1)
      const costList = this.feeTableData.list
      // 请求参数
      const params = {
        id: id || '',
        ...this.ruleForm,
        paymentSummaryList,
        verificateItemList,
        itemList,
        costList
      }
      return params
    },
    // 保存
    async handleSave() {
      try {
        this.saveBtnLoading = true
        // 校验表格
        const checked = await this.checkList()
        if (!checked) return false
        // 获取请求参数
        const params = this.getFetchParams()
        await saveOrModifyPaymentBill(params)
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
          // 校验表格
          const checked = await this.checkList()
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
        const checked = await this.checkList()
        if (!checked) return false
        // 获取请求参数
        const params = this.getFetchParams()
        if (!this.auditMethod) {
          this.$errorMsg('请选择审批方式')
          return false
        }
        // 保存接口
        if (!this.currentBillId) {
          const { data: { billId } } = await saveOrModifyPaymentBill(params)
          this.currentBillId = billId
        }
        // 提交接口
        await paymentBillAuditMethod({
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
    // 校验单据
    async checkList() {
      let flag = true
      if (!this.payableTableData.list.length) {
        this.$errorMsg(`至少选择一条单据`)
        flag = false
        return flag
      }
      for (let i = 0; i < this.payableTableData.list.length - 1; i++) {
        const { projectName, settlementAmount, settlementTax } = this.payableTableData.list[i]
        if (!projectName) {
          this.$errorMsg(`应付明细表格第${i + 1}行，费项名称不能为空`)
          flag = false
          break
        }
        if (settlementAmount === null || settlementAmount === undefined || settlementAmount < 0) {
          this.$errorMsg(`应付明细表格第${i + 1}行，本期结算金额(不含税)不能为空`)
          flag = false
          break
        }
        if (settlementTax === null || settlementTax === undefined || settlementTax < 0) {
          this.$errorMsg(`应付明细表格第${i + 1}行，本期结算税额不能为空`)
          flag = false
          break
        }
      }
      if (this.feeTableData.list.length) {
        for (let i = 0; i < this.feeTableData.list.length; i++) {
          const { projectName, type, superiorParentBrandId, costAmount, tax } = this.feeTableData.list[i]
          if (!projectName) {
            this.$errorMsg(`费用明细表格第${i + 1}行，费项名称不能为空`)
            flag = false
            break
          }
          if (!type) {
            this.$errorMsg(`费用明细表格第${i + 1}行，类型不能为空`)
            flag = false
            break
          }
          if (!superiorParentBrandId) {
            this.$errorMsg(`费用明细表格第${i + 1}行，母品牌不能为空`)
            flag = false
            break
          }
          if (costAmount === null || costAmount === undefined || costAmount < 0) {
            this.$errorMsg(`费用明细表格第${i + 1}行，费用金额(不含税)不能为空`)
            flag = false
            break
          }
          if (tax === null || tax === undefined || tax < 0) {
            this.$errorMsg(`费用明细表格第${i + 1}行，税额不能为空`)
            flag = false
            break
          }
        }
      }
      return flag
    },
    // 显示弹窗
    showModal(type, data) {
      switch (type) {
        // 选择费项
        case 'selectSettlement':
          this.selectSettlement.visible.show = true
          this.selectSettlement.index = data.index
          this.selectSettlement.type = data.type
          break
        // 选择商品
        case 'chooseProduct':
          const unNeedIds = this.feeTableData.list.map(item => item.goodsId).toString()
          this.filterData = {
            popupType: 1,
            unNeedIds
          }
          this.chooseProductIdx = data
          this.chooseProductVisible.show = true
          break
        // 选择费项
        case 'crossAdvance':
          this.crossAdvance.visible.show = true
          this.crossAdvance.data = this.ruleForm
          break
      }
    },
    // 关闭弹窗
    closeModal(type, data) {
      switch (type) {
        // 选择费项
        case 'selectSettlement':
          this.selectSettlement.visible.show = false
          if (data) {
            const { index, projectId, projectName, parentProjectName, parentProjectId, type } = data
            if (type === 'payable') {
              const item = this.payableTableData.list[index]
              this.payableTableData.list.splice(index, 1, { ...item, projectId, projectName, parentProjectName, parentProjectId })
            } else {
              const item = this.feeTableData.list[index]
              this.feeTableData.list.splice(index, 1, { ...item, projectId, projectName, parentProjectName, parentProjectId })
            }
            // 生成应付总汇
            this.calcPayableTable()
          }
          break
        // 选择商品
        case 'chooseProduct':
          if (data) {
            const { id: goodsId, goodsNo, name: goodsName } = data[0]
            const item = this.feeTableData.list[+this.chooseProductIdx]
            this.feeTableData.list.splice(this.chooseProductIdx, 1, { ...item, goodsId, goodsNo, goodsName })
          }
          this.chooseProductVisible.show = false
          break
        // 预售勾稽
        case 'crossAdvance':
          if (data && data.length) {
           const list = data.map(item => ({
              ...item,
              advancePaymentCode: item.relCode,
              index: this.paymentIndex++,
              billStatus: '1'
            }))
            this.paymentTableData.list.push(...list)
            // 计算核销记录
            this.calcPaymentTable()
          }
          this.crossAdvance.visible.show = false
          this.crossAdvance.data = {}
          break
      }
    },
    // 计算总和
    getSummaries({ columns, data }) {
      const sums = []
      let nums = 0
      let costAmounts = 0
      let taxs = 0
      columns.forEach((item, index) => {
        if (index === 0) { item.colSpan = 7 }
      })
      data.forEach(item => {
        nums += item.num ? +item.num : 0
        costAmounts += item.costAmount ? item.type === '1' ? +item.costAmount : -item.costAmount : 0
        taxs += item.tax ? item.type === '1' ? +item.tax : -item.tax : 0
        // costAmounts += item.costAmount ? +item.costAmount : 0
        // taxs += item.tax ? +item.tax : 0
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
      sums[4] = this.ruleForm.currency
      return sums
    },
    // 表头样式
    discountHeaderStyle({ rowIndex }) {
      if (rowIndex === 1) {
        return 'display: none;'
      }
    },
    // 上传附件成功
    successUpload(res) {
      if (res.code + '' === '10000') {
        this.$refs['enclosure'].getEnclosureList(1)
      } else {
        this.$errorMsg(res.message)
      }
    },
    feeSelectionChange(val) {
      this.feeTableChoseList = val
    },
    paymentSelectionChange(val) {
      this.paymentChoseList = val
    },
    // 删除
    removeFeeItem() {
      if (!this.feeTableChoseList.length) {
        this.$errorMsg('请勾选需要删除的单据！')
        return false
      }
      this.$showToast('确定删除数据？', () => {
        const ids = this.feeTableChoseList.map(item => item.index)
        this.feeTableData.list = this.feeTableData.list.filter(item => !ids.includes(item.index))
        this.calcPayableTable()
      })
    },
    // 删除
    removePaymentTable() {
      if (!this.paymentChoseList.length) {
        this.$errorMsg('请勾选需要删除的单据！')
        return false
      }
      this.$showToast('确定删除数据？', () => {
        const ids = this.paymentChoseList.map(item => item.index)
        this.paymentTableData.list = this.paymentTableData.list.filter(item => !ids.includes(item.index))
        // 计算核销记录
        this.calcPaymentTable()
      })
    },
    // 删除
    removePayableItem() {
      const choseLen = this.tableChoseList.length
      const { length } = this.payableTableData.list
      if (!choseLen) {
        this.$errorMsg('请勾选需要删除的单据！')
        return false
      }
      if (length <= 1 || choseLen === length - 1) {
        this.$errorMsg('至少保留一条应付明细')
        return false
      }
      this.$showToast('确定删除数据？', () => {
        const ids = this.tableChoseList.map(item => item.index)
        this.payableTableData.list = this.payableTableData.list.filter(item => !ids.includes(item.index))
        this.calcPayableTable()
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
