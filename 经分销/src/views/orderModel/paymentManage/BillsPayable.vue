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
            <el-form-item label="应付账单号：" prop="code" class="search-panel-item fs-14 clr-II">
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
            <el-form-item label="单据状态：" prop="billStatus" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.billStatus"
                         placeholder="请选择"
                         :data-list="getSelectList('paymentBill_billStatusList')"
                         filterable
                         clearable>
                <el-option
                  v-for="item in selectOpt.paymentBill_billStatusList"
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
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="NC单据状态：" prop="ncStatus" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.ncStatus"
                         placeholder="请选择"
                         :data-list="getSelectList('paymentBill_ncStatusList')"
                         filterable
                         clearable>
                <el-option
                  v-for="item in selectOpt.paymentBill_ncStatusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
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
                   v-permission="'payment_billsPayable_add'"
                   @click="showModal('selectDocument')">新增</el-button>
        <el-button type="primary"
                   v-permission="'payment_billsPayable_del'"
                   @click="deleteTableItem">删除</el-button>
        <el-button type="primary"
                   v-permission="'payment_billsPayable_void'"
                   @click="showModal('voidApplication')">申请作废</el-button>
        <el-button type="primary"
                   v-permission="'payment_billsPayable_update'"
                   @click="handleUpdateVoucher">更新凭证信息</el-button>
        <el-button type="primary"
                   v-permission="'payment_billsPayable_print'"
                   @click="showModal('printPayment')">打印请款单</el-button>
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
      <template slot="payableAmount" slot-scope="{row}">
        {{`${row.currency} ${row.payableAmount}`}}
      </template>
      <template slot="surplusAmount" slot-scope="{row}">
        {{`${row.currency} ${row.surplusAmount}`}}
      </template>
      <template slot="paymentAmount" slot-scope="{row}">
        {{`${row.currency} ${row.paymentAmount}`}}
      </template>
      <template slot="expectedPaymentDate" slot-scope="{row}">
        {{row.expectedPaymentDate ? row.expectedPaymentDate.slice(0, 10) : ''}}
      </template>
      <template slot="ncStatusLabel" slot-scope="{row}">
        {{row.ncCode}}<br v-if="row.ncCode"/>{{row.ncStatusLabel}}
      </template>
      <template slot="creater" slot-scope="{row}">
        {{row.creater}}<br v-if="row.creater"/>{{row.createDate}}
      </template>
      <!-- 应付款单 账单状态 00-待提交、01-审核中、02-已驳回、03-待付款、04-已付款、05-待作废、06-已作废 07-部分付款 -->
      <!-- NC状态 1-未同步、2-已同步、3-待审核、4-待入erp、5-待入账、6-已入账、7-已关账 -->
      <template slot="action" slot-scope="{row}">
        <el-button type="text"
                   style="padding-left: 5px;"
                   v-permission="'payment_billsPayable_detail'"
                   @click="linkTo(`/payment/BillsPayableDetail?id=${row.id}`)">详情</el-button>
        <el-button type="text"
                   v-if="row.billStatus === '00' || row.billStatus === '02'"
                   v-permission="'payment_billsPayable_edit'"
                   @click="linkTo(`/payment/BillsPayableEdit?id=${row.id}`)">编辑</el-button>
        <!-- v-if="row.auditMethod !== '1' && (row.billStatus === '01' || row.billStatus === '05')" -->
        <el-button type="text"
                   v-permission="'payment_billsPayable_examine'"
                   v-if="row.auditMethod !== '1' && row.billStatus === '01'"
                   @click="linkTo(`/payment/BillsPayableDetail?id=${row.id}&operateType=examine`)">审核</el-button>
        <el-button type="text"
                   v-permission="'payment_billsPayable_examine'"
                   v-if="row.billStatus === '05'"
                   @click="linkTo(`/payment/BillsPayableDetail?id=${row.id}&operateType=examine`)">作废审核</el-button>
        <el-button type="text"
                   v-if="row.billStatus === '03' || row.billStatus === '07'"
                   v-permission="'payment_billsPayable_off'"
                   @click="showModal('writeOff', row)">核销</el-button>
        <el-button type="text"
                   v-if="(row.billStatus === '03' || row.billStatus === '07' || row.billStatus === '04') && row.ncStatus === '10'"
                   v-permission="'payment_billsPayable_synnc'"
                   @click="showModal('synNc', row)">同步NC</el-button>
      </template>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 选择单据 -->
    <ChooseDocument v-if="selectDocument.visible.show"
                    :selectType="selectDocument.type"
                    :selectDocumentVisible="selectDocument.visible"
                    @comfirm="closeModal('selectDocument')"
    ></ChooseDocument>
    <!-- 选择单据 end -->
    <!-- 作废 -->
    <VoidPayable v-if="voidApplication.visible.show"
                 :ids="voidApplication.ids"
                 :voidApplicationVisible="voidApplication.visible"
                 :data="voidApplication.data"
                 @comfirm="closeModal('voidApplication')"
    ></VoidPayable>
    <!-- 作废 end -->
    <!-- 核销 -->
    <WriteOff v-if="writeOff.visible.show"
              :id="writeOff.id"
              :writeOffVisible="writeOff.visible"
              @comfirm="closeModal('writeOff')"
              @cancel="writeOff.visible.show = false"
    ></WriteOff>
    <!-- 核销 end -->
    <!-- 同步nc -->
    <SynchronousNC v-if="synNc.visible.show"
                   :id="synNc.id"
                   :synchronousNcVisible="synNc.visible"
                   @comfirm="closeModal('synNc')"
    ></SynchronousNC>
    <!-- 同步nc end -->
    <!-- 打印请款单 -->
    <PrintPayable v-if="printPayment.visible.show"
                  :id="printPayment.id"
                  :printPaymentVisible="printPayment.visible"
                  @comfirm="closeModal('printPayment')"
    ></PrintPayable>
    <!-- 打印请款单 end -->
  </div>
</template>

<script>
import {
  listPaymentBill,
  deletePaymentBill,
  flashVoucher
} from '@a/paymentManage'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    // 选择单据
    ChooseDocument: () => import('./components/ChooseDocument'),
    // 申请作废
    VoidPayable: () => import('./components/VoidPayable'),
    // 核销
    WriteOff: () => import('./components/WriteOff'),
    // 同步NC
    SynchronousNC: () => import('./components/SynchronousNC'),
    // 打印请款单
    PrintPayable: () => import('./components/PrintPayable')
  },
   data() {
    return {
      // 查询数据
      searchProps: {
        supplierId: '',
        code: '',
        buId: '',
        billStatus: '',
        ncStatus: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '应付账单号', slotTo: 'code', minWidth: '140', align: 'center', hide: true },
        { label: '供应商', prop: 'supplierName', minWidth: '120', align: 'center', hide: true },
        { label: '应付金额', slotTo: 'payableAmount', width: '100', align: 'center', hide: true },
        { label: '待付款金额', slotTo: 'surplusAmount', width: '120', align: 'center', hide: true },
        { label: '已付款金额', slotTo: 'paymentAmount', width: '120', align: 'center', hide: true },
        { label: '预计付款日期', slotTo: 'expectedPaymentDate', width: '150', align: 'center', hide: true },
        { label: '单据状态', prop: 'billStatusLabel', width: '120', align: 'center', hide: true },
        { label: 'NC单据', slotTo: 'ncStatusLabel', minWidth: '120', align: 'center', hide: true },
        { label: 'NC凭证', prop: 'voucherName', width: '120', align: 'center', hide: true },
        { label: '创建人', slotTo: 'creater', width: '150', align: 'center', hide: true },
        { label: '操作', slotTo: 'action', width: '120', align: 'left' }
      ],
      // 预计付款日期
      date: [],
      // 选择单据组件状态
      selectDocument: {
        visible: { show: false },
        type: ''
      },
      // 申请作废组件状态
      voidApplication: {
        ids: '',
        data: {},
        visible: { show: false }
      },
      // 核销组件状态
      writeOff: {
        id: '',
        visible: { show: false }
      },
      // 同步nc
      synNc: {
        id: '',
        visible: { show: false }
      },
      // 打印
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
				const { data: { list, total } } = await listPaymentBill({
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
          await deletePaymentBill({ ids })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 更新凭证信息
    async handleUpdateVoucher() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('请选择更新的账单！')
      }
      this.$showToast('确定更新凭证信息？', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await flashVoucher({ ids })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 显示弹窗
    showModal(type, row) {
      switch (type) {
        // 选择单据
        case 'selectDocument':
          this.selectDocument.visible.show = true
          this.selectDocument.type = '2'
          break
        // 申请作废
        case 'voidApplication':
          if (!this.tableChoseList.length) {
            this.$alertWarning('至少选择一条记录！')
            return false
          }
          if (this.tableChoseList.find(item => item.billStatus !== '03' && item.billStatus !== '07')) {
            this.$alertWarning('仅对“待付款”、“部分付款”状态下的预付款单可操作“作废”')
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
        // 核销
        case 'writeOff':
          const { id } = row
          this.writeOff.visible.show = true
          this.writeOff.id = id + ''
          break
        // 同步nc
        case 'synNc':
          const { id: NcRowId } = row
          this.synNc.visible.show = true
          this.synNc.id = NcRowId + ''
          break
        case 'printPayment':
          if (!this.tableChoseList.length) {
            this.$alertWarning('至少选择一条记录！')
            return false
          }
          if (this.tableChoseList.length > 1) {
            this.$alertWarning('只能选择一条单据！')
            return false
          }
          if (!['03', '04'].includes(this.tableChoseList[0].billStatus)) {
            this.$alertWarning('仅对预付款单状态为"待付款”、“已付款”可打印请款单')
            return false
          }
          this.printPayment.id = this.tableChoseList[0].id
          this.printPayment.visible.show = true
          break
      }
    },
    // 隐藏弹窗
    closeModal(type) {
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
        case 'writeOff':
          this.writeOff.visible.show = false
          this.writeOff.id = ''
          this.getList()
          break
        // 同步nc
        case 'synNc':
          this.synNc.visible.show = false
          this.synNc.id = ''
          this.getList()
          break
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
