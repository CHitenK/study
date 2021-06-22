<template>
  <!-- 平台结算单页面 -->
  <div>
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)" style="margin-top: 0px">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="平台结算单号：" prop="billCode" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.billCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客户：" prop="customerType" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.customerType"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('adjustmentType_sourceList')"
              >
                <el-option
                  v-for="item in selectOpt.adjustmentType_sourceList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="是否已开票：" prop="isInvoice" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.isInvoice"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('adjustmentType_sourceList')"
              >
                <el-option
                  v-for="item in selectOpt.adjustmentType_sourceList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="账单月份：" prop="month" class="search-panel-item fs-14 clr-II">
              <el-date-picker
                v-model="searchProps.month"
                type="month"
                placeholder="请选择"
                style="width: 203px"
                value-format="yyyy-MM-dd HH:mm:ss"
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
        <el-button type="primary" @click="visible.show = true">开票</el-button>
        <el-button type="primary">导出</el-button>
        <el-button type="primary">刷新</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               show-selection
               @selection-change="selectionChange"
               @change="getList">
      <template slot="action" slot-scope="{row}">
        <el-button type="text" @click="linkTo(`/bill/platformdetail/${row.id}`)">详情</el-button>
        <el-button type="text" @click="linkTo('/common/enclosureManage')">附件管理</el-button>
      </template>
    </JFX-table>
    <!-- 表格 end -->
    <!-- 选择发票模板组件 -->
    <InvoiceTemplate :isVisible="visible" v-if="visible.show" @comfirm="choseInvoiceTemplate" />
    <!-- 选择发票模板组件 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import { listPlatformStatementOrder } from '@a/receiveMoneyManage'
export default {
  mixins: [commomMix],
  components: {
    InvoiceTemplate: () => import('./InvoiceTemplate')
  },
  data() {
    return {
      // 查询数据
      searchProps: {
        billCode: '',
        customerType: '',
        isInvoice: '',
        month: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '平台结算单号', prop: 'billCode', minWidth: '120', align: 'center', hide: true },
        { label: '账单月份', prop: 'month', minWidth: '100', align: 'center', hide: true },
        { label: '客户', prop: 'customerName', minWidth: '120', align: 'center', hide: true },
        { label: '账单金额', prop: 'billAmount', minWidth: '120', align: 'center', hide: true, formatter: (row) => (row.currency || '') + ' ' + (row.billAmount || '0') },
        { label: '是否已开票', prop: 'isInvoiceLabel', width: '90', align: 'center', hide: true },
        { label: '发票号码', prop: 'invoiceNo', minWidth: '120', align: 'center', hide: true },
        { label: '开票人', prop: 'invoiceDrawer', width: '90', align: 'center', hide: true },
        { label: '开票日期', prop: 'invoiceDate', width: '150', align: 'center', hide: true },
        { label: '操作', slotTo: 'action', width: '120', align: 'left' }
      ]
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
				const { data } = await listPlatformStatementOrder({
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
    // 重置搜索表单
    resetSearchForm() {
      this.reset('searchForm', () => {
        this.getList(1)
      })
    }
  }
}
</script>
