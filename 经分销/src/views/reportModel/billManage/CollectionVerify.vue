<template>
  <!-- 收款核销跟踪页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="应收账单号：" prop="receiveCode" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.receiveCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
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
                placeholder="请选择"
                style="width: 203px"
                value-format="yyyy-MM"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="账期逾期：" prop="overdueStatus" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.overdueStatus"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('receiveBillVerification_overdueStatusList')"
              >
                <el-option
                  v-for="item in selectOpt.receiveBillVerification_overdueStatusList"
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
                   v-permission="'receiveBillVerification_export'"
                   @click="exportList">导出</el-button>
        <el-button type="primary"
                   v-permission="'receiveBillVerification_flash'"
                   @click="refresh">刷新</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               showSelection
               @selection-change="selectionChange"
               @change="getList">
      <template slot="action" slot-scope="{row}">
        <el-button type="text"
                   @click="showModal(row.receiveCode)">备注</el-button>
        <el-button type="text"
                   @click="linkTo(`/bill/receivebilldetail/${row.id}`)">详情</el-button>
      </template>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 回款备注组件 -->
    <RemarkModal :remarkModalVisible="remarkModal.visible"
                 :receiveCode="remarkModal.receiveCode"
                 v-if="remarkModal.visible.show"
                 @comfirm="closeModal"
    ></RemarkModal>
    <!-- 回款备注组件 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  listReceiveBillVerification,
  exportReceiveBillVerificationUrl,
  flashReceiveBillVerification
} from '@a/reportManage'
export default {
  mixins: [commomMix],
  components: {
    RemarkModal: () => import('./components/RemarkModal')
  },
  data() {
    return {
      // 查询数据
      searchProps: {
        receiveCode: '',
        customerId: '',
        billMonth: '',
        overdueStatus: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '应收账单号', prop: 'receiveCode', width: '140', align: 'center', hide: true },
        { label: '账单月份', prop: 'billDate', width: '150', align: 'center', hide: true },
        { label: '客户', prop: 'customerName', minWidth: '120', align: 'center', hide: true },
        { label: '应收金额', prop: 'receivePrice', width: '120', align: 'center', hide: true },
        { label: '未核金额', prop: 'uncollectedPrice', width: '120', align: 'center', hide: true },
        { label: '结算币种', prop: 'currencyLabel', width: '80', align: 'center', hide: true },
        { label: '账单日期', prop: 'billDate', width: '150', align: 'center', hide: true },
        { label: '开票日期', prop: 'invoiceDate', width: '150', align: 'center', hide: true },
        { label: '客户账期', prop: 'accountPeriodLabel', width: '110', align: 'center', hide: true },
        { label: '账期逾期天数', prop: 'accountOverdueDays', width: '100', align: 'center', hide: true },
        { label: '创建时间', prop: 'createDate', width: '150', align: 'center', hide: true },
        { label: '操作', slotTo: 'action', width: '100', align: 'left' }
      ],
      remarkModal: {
        receiveCode: '',
        visible: { show: false }
      }
    }
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
				const { data } = await listReceiveBillVerification({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
				this.tableData.list = data.list
        this.tableData.total = data.total
			} catch (err) {
        console.log(err)
      } finally {
        this.tableData.loading = false
      }
    },
    // 导出
    exportList() {
      if (this.tableData.total < 1) {
        return this.$errorMsg('暂无数据可导出')
      }
      this.$exportFile(exportReceiveBillVerificationUrl, { ...this.searchProps })
    },
    // 刷新
    async refresh() {
      if (!this.tableChoseList.length) {
        this.$alertWarning('至少选择一条记录！')
        return false
      }
      const receiveCodes = this.tableChoseList.map(item => item.id).toString()
      try {
        await flashReceiveBillVerification({ receiveCodes })
        this.$successMsg('操作成功')
        this.getList()
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 显示备注弹窗
    showModal(receiveCode) {
      this.remarkModal.visible.show = true
      this.remarkModal.receiveCode = receiveCode
    },
    // 关闭备注弹窗
    closeModal() {
      this.remarkModal.visible.show = false
      this.remarkModal.receiveCode = ''
      this.getList()
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
