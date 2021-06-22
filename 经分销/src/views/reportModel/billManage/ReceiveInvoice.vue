<template>
  <!-- 应收发票库页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="发票编码：" prop="invoiceNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.invoiceNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="开票人：" prop="creater" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.creater" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="发票状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.status"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('receiveBillInvoice_statusList')"
              >
                <el-option
                  v-for="item in selectOpt.receiveBillInvoice_statusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
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
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item label="开票日期：" prop="date">
              <el-date-picker
                v-model="date"
                type="daterange"
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
                   v-permission="'receiveBillInvoice_export'"
                   @click="exportList('1')">导出</el-button>
        <el-button type="primary"
                   v-permission="'receiveBillInvoice_billExport'"
                   @click="exportList('2')">应收对账导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               showSelection
               @selection-change="selectionChange"
               @change="getList">
      <template slot="invoiceNo" slot-scope="{row}">
        <el-button type="text"
                   @click="handleViewInvoice(row.invoiceNo)">{{row.invoiceNo}}</el-button>
      </template>
      <template slot="invoiceRelCodes" slot-scope="{row}">
        <template v-if="row.invoiceRelCodes && row.invoiceType === '0'">
          <template v-for="(item, index) in row.invoiceRelCodes.split(',').length > 3 ? 3 : row.invoiceRelCodes.split(',')">
            <el-button type="text"
                       :key="`item${index}`"
                       @click="showModal('relationReceivable', row.id)">
              {{row.invoiceNo}}
            </el-button>
            <br :key="`${item}-${index}`"/>
          </template>
          <el-button v-if="row.invoiceRelCodes.split(',').length > 3"
                     type="text"
                     @click="showModal('relationReceivable', row.id)">......</el-button>
        </template>
        <span v-else>{{row.codes}}</span>
      </template>
      <template slot="action" slot-scope="{row}">
        <el-button type="text"
                   v-if="row.status === '02' || row.status === '03'"
                   v-permission="'receiveBillInvoice_view'"
                   @click="showModal('viewInvoice', row)">查看发票</el-button>
        <el-button type="text"
                   v-if="row.status === '01'"
                   v-permission="'receiveBillInvoice_upload'"
                   @click="linkTo(`/bill/uploadinvoice?id=${row.id}`)">上传盖章发票</el-button>
        <el-button type="text"
                   v-permission="'receiveBillInvoice_replace'"
                   @click="linkTo(`/bill/ReplacementInvoice?id=${row.id}`)">替换发票</el-button>
      </template>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 关联应收单 -->
    <RelationReceivable v-if="relationReceivable.visible.show"
                        :isVisible="relationReceivable.visible"
                        :id="relationReceivable.id"
                        @comfirm="closeModal('relationReceivable')"
    ></RelationReceivable>
    <!-- 关联应收单 end -->
    <!-- 关联应收单 -->
    <ViewInvoice v-if="viewInvoice.visible.show"
                 :isVisible="viewInvoice.visible"
                 :data="viewInvoice.data"
                 @comfirm="closeModal('viewInvoice')"
    ></ViewInvoice>
    <!-- 关联应收单 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import { getBaseUrl } from '@u/tool'
import {
  listReceiveBillInvoice,
  exportBillInvoiceUrl,
  exportBillNcUrl,
  exportInvoiceUrl,
  previewInvoice
} from '@a/reportManage'
export default {
  mixins: [commomMix],
  components: {
    // 关联应收单
    RelationReceivable: () => import('./components/RelationReceivable'),
    // 查看发票
    ViewInvoice: () => import('./components/ViewInvoice')
  },
  data() {
    return {
      // 查询数据
      searchProps: {
        invoiceNo: '',
        creater: '',
        status: '',
        customerId: ''
      },
      // 开票日期
      date: [],
      // 表格列数据
      tableColumn: [
        { label: '发票号', slotTo: 'invoiceNo', minWidth: '140', align: 'center', hide: true },
        { label: '客户', prop: 'customerName', minWidth: '120', align: 'center', hide: true },
        { label: '开票人', prop: 'creater', width: '100', align: 'center', hide: true },
        { label: '开票日期', prop: 'invoiceDate', width: '150', align: 'center', hide: true },
        { label: '发票金额', prop: 'invoiceAmount', width: '120', align: 'center', hide: true },
        { label: '关联应收账单', slotTo: 'invoiceRelCodes', minWidth: '140', align: 'center', hide: true },
        { label: '发票状态', prop: 'statusLabel', width: '100', align: 'center', hide: true },
        { label: '操作人', prop: 'synchronizer', width: '120', align: 'center', hide: true },
        { label: '操作', slotTo: 'action', width: '170', align: 'left' }
      ],
      // 关联应收单
      relationReceivable: {
        id: '',
        visible: { show: false }
      },
      // 查看发票
      viewInvoice: {
        data: {},
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
      // 上架日期
      this.searchProps.invoiceStartDate = this.date && this.date.length ? this.date[0] + ' 00:00:00' : ''
      this.searchProps.invoiceEndDate = this.date && this.date.length ? this.date[1] + ' 23:59:59' : ''
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await listReceiveBillInvoice({
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
    exportList(type) {
      if (this.tableData.total < 1) {
        return this.$errorMsg('暂无数据可导出')
      }
      switch (type) {
        case '1':
          if (this.tableChoseList.length) {
            this.$showToast('确定导出勾选数据？', async() => {
              const ids = this.tableChoseList.map(item => item.id).toString()
              this.$exportFile(exportInvoiceUrl, { ids })
            })
          } else {
            this.$exportFile(exportInvoiceUrl, { ...this.searchProps })
          }
          break
        case '2':
          if (this.tableChoseList.length) {
            this.$showToast('确定导出勾选数据？', async() => {
              const ids = this.tableChoseList.map(item => item.id).toString()
              this.$exportFile(exportBillInvoiceUrl, { ids })
            })
          } else {
            this.$exportFile(exportBillInvoiceUrl, { ...this.searchProps })
          }
          break
      }
    },
    // 导出
    exportNc() {
      if (this.tableData.total < 1) {
        return this.$errorMsg('暂无数据可导出')
      }
      if (this.tableChoseList.length) {
        this.$showToast('确定导出勾选数据？', async() => {
          const ids = this.tableChoseList.map(item => item.id).toString()
          this.$exportFile(exportBillNcUrl, { ids })
        })
      } else {
        this.$exportFile(exportBillNcUrl, { ...this.searchProps })
      }
    },
    // 查看发票
    handleViewInvoice(fileName) {
      const url = getBaseUrl(previewInvoice) + previewInvoice + fileName + '?token=' + sessionStorage.getItem('token')
      window.open(url)
    },
    // 显示弹窗
    showModal(type, data) {
      switch (type) {
        case 'relationReceivable':
          this.relationReceivable.visible.show = true
          this.relationReceivable.id = data || ''
          break
        case 'viewInvoice':
          this.viewInvoice.visible.show = true
          this.viewInvoice.data = data || {}
          break
      }
    },
    // 关闭弹窗
    closeModal(type) {
      switch (type) {
        case 'relationReceivable':
          this.relationReceivable.visible.show = false
          this.relationReceivable.id = ''
          break
        case 'viewInvoice':
          this.viewInvoice.visible.show = false
          this.viewInvoice.id = ''
          break
      }
    }
  }
}
</script>
