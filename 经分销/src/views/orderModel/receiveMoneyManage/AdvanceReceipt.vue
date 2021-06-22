<template>
  <!-- 预收账单列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客户：" prop="customerId" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.customerId"
                         placeholder="请选择"
                         :data-list="getCustomerSelectBean('customer_list')"
                         filterable
                         clearable>
                <el-option
                  v-for="item in selectOpt.customer_list"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="账单月份：" prop="billMonth" class="search-panel-item fs-14 clr-II">
              <el-date-picker
                v-model="searchProps.billMonth"
                type="month"
                style="width: 100%"
                value-format="yyyy-MM"
                placeholder="请选择"
              />
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
            <el-form-item label="预收款单号：" prop="code" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="账单状态：" prop="billStatus" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.billStatus"
                         placeholder="请选择"
                         :data-list="getSelectList('advanceBill_billStatusList')"
                         filterable
                         clearable>
                <el-option
                  v-for="item in selectOpt.advanceBill_billStatusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="NC应收状态：" prop="ncStatus" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.ncStatus"
                         placeholder="请选择"
                         :data-list="getSelectList('receiveBill_nvSynList')"
                         filterable
                         clearable>
                <el-option
                  v-for="item in selectOpt.receiveBill_nvSynList"
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
                   v-permission="'receivemoney_advanceReceipt_add'"
                   @click="showModal('selectDocument')">新增</el-button>
        <el-button type="primary"
                   v-permission="'receivemoney_advanceReceipt_del'"
                   @click="deleteTableItem">删除</el-button>
        <el-button type="primary"
                   v-permission="'receivemoney_advanceReceipt_void'"
                   @click="showModal('voidApplication')">申请作废</el-button>
        <el-button type="primary"
                   v-permission="'receivemoney_advanceReceipt_export'"
                   @click="exportList">导出PDF</el-button>
        <el-button type="primary"
                   v-permission="'receivemoney_advanceReceipt_update'"
                   @click="handleUpdateVoucher">更新凭证信息</el-button>
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
      <template slot="sumAmount" slot-scope="{row}">
        {{`${row.currency} ${row.sumAmount}`}}
      </template>
      <template slot="month" slot-scope="{row}">
        {{row.createDate ? row.createDate.slice(0, 7) : ''}}
      </template>
      <template slot="nc" slot-scope="{row}">
        {{row.ncCode}}<br v-if="row.ncCode"/>{{row.ncStatusLabel}}
      </template>
      <template slot="creater" slot-scope="{row}">
        {{row.creater}}<br v-if="row.creater"/>{{row.createDate}}
      </template>
      <template slot="action" slot-scope="{row}">
        <!-- ncStatus: NC状态 1-待审核 2-待入erp 3-待入账 4-已入账 5-已关账 6-待作废 7-待红冲 8-已作废 9-已红冲 10-未同步 11-已同步 -->
        <!-- billStatus：账单状态 00-待提交 01-待审核 02-待核销 03-部分核销 04-已核销 05-待作废 06-已作废 -->
        <el-button type="text"
                   style="padding-left: 5px;"
                   v-permission="'receivemoney_advanceReceipt_detail'"
                   @click="linkTo(`/receivemoney/AdvanceReceiptDetail?id=${row.id}`)">详情</el-button>
        <el-button type="text"
                   v-if="row.billStatus === '00'"
                   v-permission="'receivemoney_advanceReceipt_edit'"
                   @click="linkTo(`/receivemoney/AdvanceReceiptEdit?id=${row.id}`)">编辑</el-button>
        <el-button type="text"
                   v-permission="'receivemoney_advanceReceipt_examine'"
                   v-if="row.billStatus === '01' || row.billStatus === '05'"
                   @click="linkTo(`/receivemoney/AdvanceReceiptDetail?id=${row.id}&operateType=${row.billStatus === '01' ? '1' : '3'}`)">
          {{row.billStatus === '05' ? '作废审核' : '审核'}}
        </el-button>
        <el-button type="text"
                   v-permission="'receivemoney_advanceReceipt_off'"
                   v-if="row.billStatus === '02' || row.billStatus === '03'"
                   @click="showModal('writeOff', row)">核销</el-button>
        <el-button type="text"
                   v-permission="'receivemoney_advanceReceipt_synnc'"
                   v-if="row.ncStatus === '10' && row.billStatus === '02'"
                   @click="showModal('synNc', row)">同步NC</el-button>
      </template>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 选择单据 -->
    <ChooseDocument v-if="selectDocument.visible.show"
                    :selectDocumentVisible="selectDocument.visible"
                    @comfirm="closeModal('selectDocument')"
    ></ChooseDocument>
    <!-- 选择单据 end -->
    <!-- 申请作废 -->
    <VoidApplication v-if="voidApplication.visible.show"
                     :id="voidApplication.id"
                     :voidApplicationVisible="voidApplication.visible"
                     @comfirm="closeModal('voidApplication')"
    ></VoidApplication>
    <!-- 申请作废 end -->
    <!-- 核销 -->
    <WriteOff v-if="writeOff.visible.show"
              :id="writeOff.id"
              :writeOffVisible="writeOff.visible"
              @comfirm="closeModal('writeOff')"
    ></WriteOff>
    <!-- 核销 end -->
    <!-- 核销 -->
    <SynchronousNC v-if="synNc.visible.show"
                   :id="synNc.id"
                   :writeOffVisible="synNc.visible"
                   @comfirm="closeModal('synNc')"
    ></SynchronousNC>
    <!-- 核销 end -->
  </div>
</template>

<script>
import {
  listAdvanceBill,
  deleteAdvanceItem,
  exportAdvanceBillPdfUrl,
  updateVoucher
} from '@a/receiveMoneyManage'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    // 选择单据
    ChooseDocument: () => import('./components/ChooseDocument'),
    // 申请作废
    VoidApplication: () => import('./components/VoidApplication'),
    // 核销
    WriteOff: () => import('./components/WriteOff'),
    // 同步NC
    SynchronousNC: () => import('./components/SynchronousNC')
  },
   data() {
    return {
      // 查询数据
      searchProps: {
        customerId: '',
        billMonth: '',
        buId: '',
        code: '',
        billStatus: '',
        ncStatus: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '预收款单号', slotTo: 'code', minWidth: '120', align: 'center', hide: true },
        { label: '客户', prop: 'customerName', minWidth: '120', align: 'center', hide: true },
        { label: '关联PO号', prop: 'poNo', minWidth: '120', align: 'center', hide: true },
        { label: '预收金额', slotTo: 'sumAmount', width: '100', align: 'center', hide: true },
        { label: '账单状态', prop: 'billStatusLabel', minWidth: '80', align: 'center', hide: true },
        { label: '账单月份', slotTo: 'month', minWidth: '80', align: 'center', hide: true },
        { label: 'NC单据', slotTo: 'nc', minWidth: '120', align: 'center', hide: true },
        { label: '创建人', slotTo: 'creater', minWidth: '150', align: 'center', hide: true },
        { label: '操作', slotTo: 'action', width: '120', align: 'left' }
      ],
      // 选择单据组件状态
      selectDocument: {
        visible: { show: false }
      },
      // 申请作废组件状态
      voidApplication: {
        id: '',
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
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data: { list, total } } = await listAdvanceBill({
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
      if (this.tableChoseList[0].billStatus !== '00') {
        this.$alertWarning('只能删除账单状态为待提交的应收账单！')
        return false
      }
      this.$showToast('确定删除数据？', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await deleteAdvanceItem({ ids })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 导出
    async exportList() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('请勾选需要导出的单据！')
      }
      try {
        this.$showToast('确定导出勾选数据？', async() => {
          const ids = this.tableChoseList.map(item => item.id).toString()
          this.$exportFile(exportAdvanceBillPdfUrl, { ids })
        })
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 更新凭证信息
    async handleUpdateVoucher() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('请选择更新的账单！')
      }
      this.$showToast('确定更新凭证信息？', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await updateVoucher({ ids })
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
          sessionStorage.removeItem('selectDocumentData')
          break
        // 申请作废
        case 'voidApplication':
          const { length } = this.tableChoseList
          if (!length) {
            return this.$alertWarning('至少选择一条记录！')
          }
          if (length >= 2) {
            return this.$alertWarning('只能作废单条数据')
          }
          if (this.tableChoseList[0].billStatus !== '02') {
            return this.$alertWarning('仅对账单状态为“待核销”可作废！')
          }
          this.voidApplication.visible.show = true
          this.voidApplication.id = this.tableChoseList[0].id + ''
          break
        // 核销
        case 'writeOff':
          const { id: rowId } = row
          this.writeOff.visible.show = true
          this.writeOff.id = rowId + ''
          break
        // 同步nc
        case 'synNc':
          const { id: NcRowId } = row
          this.synNc.visible.show = true
          this.synNc.id = NcRowId + ''
          break
      }
    },
    // 隐藏弹窗
    closeModal(type) {
      switch (type) {
        // 选择单据
        case 'selectDocument':
          this.selectDocument.visible.show = false
          break
        // 申请作废
        case 'voidApplication':
          this.voidApplication.visible.show = false
          this.voidApplication.id = ''
          break
        // 核销
        case 'writeOff':
          this.writeOff.visible.show = false
          this.writeOff.id = ''
          break
        // 同步nc
        case 'synNc':
          this.synNc.visible.show = false
          this.synNc.id = ''
          break
      }
      this.getList()
    },
    // 重置搜索表单
    resetSearchForm() {
      this.reset('searchForm', () => {
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
