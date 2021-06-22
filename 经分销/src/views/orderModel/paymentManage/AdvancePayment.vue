<template>
  <!-- 预付款单列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="预付款单号：" prop="code" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.buId"
                         placeholder="请选择"
                         clearable
                         filterable
                         :data-list="getBUSelectBean('businessList')">
                <el-option
                  v-for="item in selectOpt.businessList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="供应商：" prop="supplierId" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.supplierId"
                         placeholder="请选择"
                         :data-list="getSupplierList('supplier_list')"
                         filterable
                         clearable>
                <el-option
                  v-for="item in selectOpt.supplier_list"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="单据状态：" prop="billStatus" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.billStatus"
                         placeholder="请选择"
                         :data-list="getSelectList('advancePaymentBill_billStatusList')"
                         filterable
                         clearable>
                <el-option
                  v-for="item in selectOpt.advancePaymentBill_billStatusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date" label="预计付款日期：">
              <el-date-picker
                v-model="date"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary"
                   v-permission="'payment_advancepayment_add'"
                   @click="showModal('selectDocument')">新增</el-button>
        <el-button type="primary"
                   v-permission="'payment_advancepayment_del'"
                   @click="deleteTableItem">删除</el-button>
        <el-button type="primary"
                   v-permission="'payment_advancepayment_print'"
                   @click="showModal('printPayment')">打印请款单</el-button>
        <el-button type="primary"
                   v-permission="'payment_advancepayment_void'"
                   @click="showModal('voidApplication')">作废</el-button>
        <el-button type="primary"
                   v-permission="'payment_advancepayment_export'"
                   @click="exportList">导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               showSelection
               @selection-change="selectionChange"
               @change="getList">
      <template slot="code" slot-scope="{row}">
        {{row.code}}<br v-if="row.code"/>{{row.buName}}
      </template>
      <template slot="prepaymentAmount" slot-scope="{row}">
        {{row.currency + ' ' + (row.prepaymentAmount || 0)}}
      </template>
      <template slot="paymentAmount" slot-scope="{row}">
        {{row.currency + ' ' + (row.paymentAmount || 0)}}
      </template>
      <template slot="verificationAmount" slot-scope="{row}">
        {{row.currency + ' ' + (row.verificationAmount || 0)}}
      </template>
      <template slot="expectedPaymentDate" slot-scope="{row}">
        {{row.expectedPaymentDate ? row.expectedPaymentDate.slice(0, 10) : ''}}
      </template>
      <template slot="creater" slot-scope="{row}">
        {{row.creater}}<br v-if="row.creater"/>{{row.createDate}}
      </template>
      <template slot="action" slot-scope="{row}">
        <!-- 账单状态 00-待提交、01-审核中、02-已驳回、03-待付款、04-待作废、05-已作废、06-待核销、07已核销 -->
        <el-button type="text"
                   style="padding-left: 5px;"
                   v-permission="'payment_advancepayment_detail'"
                   @click="linkTo(`/payment/AdvancePaymentDetail?id=${row.id}`)">详情</el-button>
        <el-button type="text"
                   v-if="row.billStatus === '00' || row.billStatus === '02'"
                   v-permission="'payment_advancepayment_edit'"
                   @click="linkTo(`/payment/AdvancePaymentEdit?id=${row.id}`)">编辑</el-button>
        <el-button type="text"
                   v-if="row.auditMethod !== '1' && (row.billStatus === '01' || row.billStatus === '04')"
                   v-permission="'payment_advancepayment_examine'"
                   @click="linkTo(`/payment/AdvancePaymentEdit?id=${row.id}&operateType=examine`)">
          {{row.billStatus === '04' ? '作废审核' : '审核'}}
        </el-button>
        <el-button type="text"
                   v-if="row.billStatus === '03'"
                   v-permission="'payment_advancepayment_payment'"
                   @click="showModal('payment', row)">付款</el-button>
      </template>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 选择单据 -->
    <ChooseDocument v-if="selectDocument.visible.show"
                    :selectDocumentVisible="selectDocument.visible"
                    :selectType="selectDocument.type"
                    @comfirm="closeModal('selectDocument')"
    ></ChooseDocument>
    <!-- 选择单据 end -->
    <!-- 作废 -->
    <VoidApplication v-if="voidApplication.visible.show"
                     :ids="voidApplication.ids"
                     :voidApplicationVisible="voidApplication.visible"
                     :data="voidApplication.data"
                     @comfirm="closeModal('voidApplication')"
    ></VoidApplication>
    <!-- 作废 end -->
    <!-- 付款 -->
    <Payment v-if="payment.visible.show"
             :id="payment.id"
             :paymentVisible="payment.visible"
             @comfirm="closeModal('payment')"
             @cancel="payment.visible.show = false"
    ></Payment>
    <!-- 付款 end -->
    <!-- 打印请款单 -->
    <PrintPayment v-if="printPayment.visible.show"
                  :id="printPayment.id"
                  :printPaymentVisible="printPayment.visible"
                  @comfirm="closeModal('printPayment')"
    ></PrintPayment>
    <!-- 打印请款单 end -->
  </div>
</template>

<script>
import {
  listAdvancePaymentBill,
  deleteAdvance,
  exportPaymentExcel
} from '@a/paymentManage'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    // 选择单据
    ChooseDocument: () => import('./components/ChooseDocument'),
    // 申请作废
    VoidApplication: () => import('./components/VoidApplication'),
    // 核销
    Payment: () => import('./components/Payment'),
    // 同步NC
    SynchronousNC: () => import('./components/SynchronousNC'),
    // 打印请款单
    PrintPayment: () => import('./components/PrintPayment')
  },
   data() {
    return {
      // 预计付款日期
      date: [],
      // 查询数据
      searchProps: {
        code: '',
        buId: '',
        supplierId: '',
        billStatus: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '预付款单号', slotTo: 'code', minWidth: '140', align: 'center', hide: true },
        { label: '供应商', prop: 'supplierName', minWidth: '120', align: 'center', hide: true },
        { label: '预付总额', slotTo: 'prepaymentAmount', minWidth: '120', align: 'center', hide: true },
        { label: '已付总额', slotTo: 'paymentAmount', minWidth: '120', align: 'center', hide: true },
        { label: '预计付款日期', slotTo: 'expectedPaymentDate', width: '120', align: 'center', hide: true },
        { label: '待核销金额', slotTo: 'verificationAmount', minWidth: '120', align: 'center', hide: true },
        { label: '单据状态', prop: 'billStatusLabel', width: '100', align: 'center', hide: true },
        { label: '审批方式', prop: 'auditMethodLabel', width: '100', align: 'center', hide: true },
        { label: '创建人', slotTo: 'creater', minWidth: '150', align: 'center', hide: true },
        { label: '操作', slotTo: 'action', width: '120', align: 'left' }
      ],
      // 选择单据组件状态
      selectDocument: {
        type: '',
        visible: { show: false }
      },
      // 申请作废组件状态
      voidApplication: {
        ids: '',
        data: {},
        visible: { show: false }
      },
      // 付款组件状态
      payment: {
        id: '',
        visible: { show: false }
      },
      // 打印请款单组件状态
      printPayment: {
        id: '',
        visible: { show: false }
      }
    }
  },
  activated() {
    this.getList()
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取表格数据
		async getList(pageNum) {
      this.searchProps.expectedPaymentDateStart = this.date && this.date.length ? this.date[0] + ' 00:00:00' : ''
      this.searchProps.expectedPaymentDateEnd = this.date && this.date.length ? this.date[1] + ' 23:59:59' : ''
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data: { list, total } } = await listAdvancePaymentBill({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
				this.tableData.list = list
        this.tableData.total = total
			} catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.tableData.loading = false
      }
    },
    // 删除表格项
    deleteTableItem() {
      if (!this.tableChoseList.length) {
        this.$alertWarning('至少选择一条记录！')
        return false
      }
      this.$showToast('确定删除数据？', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await deleteAdvance({ ids })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 导出
    exportList() {
      if (this.tableData.total < 1) {
        return this.$errorMsg('暂无数据可导出')
      }
      if (this.tableChoseList.length) {
        this.$showToast('确定导出勾选数据？', () => {
          const ids = this.tableChoseList.map(item => item.id).toString()
          this.$exportFile(exportPaymentExcel, { ids })
        })
      } else {
        this.$exportFile(exportPaymentExcel, { ...this.searchProps })
      }
    },
    // 显示弹窗
    showModal(type, row) {
      switch (type) {
        // 选择单据
        case 'selectDocument':
          this.selectDocument.visible.show = true
          this.selectDocument.type = '1'
          break
        // 申请作废
        case 'voidApplication':
          if (!this.tableChoseList.length) {
            this.$alertWarning('至少选择一条记录！')
            return false
          }
          if (this.tableChoseList.find(item => item.billStatus !== '03')) {
            this.$alertWarning('仅对“待付款”状态下的预付款单可操作“作废”')
            return false
          }
          const ids = this.tableChoseList.map(item => item.id).toString()
          const codes = [...new Set(this.tableChoseList.map(item => item.code))].join('，')
          const buNames = [...new Set(this.tableChoseList.map(item => item.buName))].join('，')
          const supplierNames = [...new Set(this.tableChoseList.map(item => item.supplierName))].join('，')
          this.voidApplication.data = { codes, buNames, supplierNames }
          this.voidApplication.visible.show = true
          this.voidApplication.ids = ids
          break
        // 付款
        case 'payment':
          const { id: rowId } = row
          this.payment.visible.show = true
          this.payment.id = rowId + ''
          break
        // 打印请款单
        case 'printPayment':
          if (!this.tableChoseList.length) {
            this.$alertWarning('至少选择一条记录！')
            return false
          }
          if (this.tableChoseList.length > 1) {
            this.$alertWarning('只能选择一条单据！')
            return false
          }
          if (!['03', '06', '07'].includes(this.tableChoseList[0].billStatus)) {
            this.$alertWarning('仅对预付款单状态为 "待付款”、“待核销”、“已核销”可打印请款单')
            return false
          }
          this.printPayment.visible.show = true
          this.printPayment.id = this.tableChoseList[0].id
          break
      }
    },
    // 隐藏弹窗
    closeModal(type, data) {
      switch (type) {
        // 选择单据
        case 'selectDocument':
          this.selectDocument.visible.show = false
          this.getList()
          break
        // 申请作废
        case 'voidApplication':
          this.voidApplication.visible.show = false
          this.voidApplication.id = ''
          this.getList()
          break
        // 核销
        case 'payment':
          this.payment.visible.show = false
          this.payment.id = ''
          this.getList()
          break
        // 同步nc
        case 'synNc':
          this.synNc.visible.show = false
          this.synNc.id = ''
          this.getList()
          break
        // 打印请款单
        case 'printPayment':
          this.printPayment.visible.show = false
          break
      }
    },
    // 重置搜索表单
    resetSearchForm() {
      this.reset('searchForm', () => {
        this.date = []
        this.getList(1)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.amount-text {
  cursor: pointer;
  padding-left: 6px;
  color: #6EA9F3;
}
</style>
