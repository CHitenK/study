<template>
  <!-- 销售赊销单页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="销售赊销单号：" prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="销售订单号：" prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客户：" prop="customerId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.customerId"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getCustomerSelectBean('customer_list')"
              >
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
            <el-form-item label="PO号：" prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.code" placeholder="请输入" clearable />
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
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
     <!-- 操作 -->
    <el-row class="mr-t-20">
      <el-col :span="24" >
        <el-button type="primary"
                   @click="deleteTableItem"
                   v-permission="'declare_cancelDeclare'">删除</el-button>
        <el-button type="primary"
                   @click="exportList"
                   v-permission="'declare_exportDeclare'">导出结算单</el-button>
      </el-col>
    </el-row>
    <div class="mr-t-20 mr-b-10">
      <el-radio-group v-model="searchProps.status"
                      :data-list="getSelectList('saleDeclare_statusList')"
                      @change="getList(1)">
        <el-radio-button v-for="item in selectOpt.saleDeclare_statusList"
                         :key="item.key"
                         :label="item.key">
          <!-- {{item.value}}({{tabData[item.key] || 0}}) -->
        </el-radio-button>
        <el-radio-button label="">
          全部({{this.tabTotal}})
        </el-radio-button>
      </el-radio-group>
    </div>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               showSelection
               @selection-change="selectionChange"
               @change="getList">
      <template slot="action" slot-scope="{row}">
        <el-button type="text"
                   style="padding-left: 5px;"
                   v-permission="'payment_billsPayable_detail'"
                   @click="linkTo(`/sales/SalesCreditDetail?id=${row.id}`)">详情</el-button>
        <el-button type="text"
                   v-permission="'payment_billsPayable_detail'"
                   @click="linkTo(`/sales/PredeclarationDetail?id=${row.id}`)">提交</el-button>
        <el-button type="text"
                   v-permission="'payment_billsPayable_detail'"
                   @click="showModal('depositReceived', row.id)">收到保证金</el-button>
        <el-button type="text"
                   v-permission="'payment_billsPayable_detail'"
                   @click="showModal('confirmTheLoan', row.id)">确认放款</el-button>
        <el-button type="text"
                   v-permission="'payment_billsPayable_detail'"
                   @click="showModal('creditSalesCollection', row.id)">申请收款</el-button>
        <el-button type="text"
                   v-permission="'payment_billsPayable_detail'"
                   @click="showModal('creditSalesCollection', row.id)">收到还款</el-button>
        <el-button type="text"
                   v-permission="'payment_billsPayable_detail'"
                   @click="showModal('logList', row.code)">日志</el-button>
      </template>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 日志 -->
    <LogList v-if="logList.visible.show"
             :visible.sync="logList.visible"
             :filterData="logList.filterData"
    ></LogList>
    <!-- 日志 end -->
    <!-- 收到保证金 -->
    <DepositReceived v-if="depositReceived.visible.show"
                     :isVisible="depositReceived.visible"
                     :filterData="depositReceived.filterData"
    ></DepositReceived>
    <!-- 收到保证金 end -->
    <!-- 收到保证金 -->
    <ConfirmTheLoan v-if="confirmTheLoan.visible.show"
                    :isVisible="confirmTheLoan.visible"
                    :filterData="confirmTheLoan.filterData"
    ></ConfirmTheLoan>
    <!-- 收到保证金 end -->
    <!-- 赊销收款 -->
    <CreditSalesCollection v-if="creditSalesCollection.visible.show"
                           :isVisible="creditSalesCollection.visible"
                           :filterData="creditSalesCollection.filterData"
    ></CreditSalesCollection>
    <!-- 赊销收款 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  listPreSaleOrder,
  exportPreSaleOrderUrl,
  getPreSaleOrderCount,
  delPreSaleOrder
} from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  components: {
    // 日志
    LogList: () => import('@c/logList/index.vue'),
    // 收到保证金
    DepositReceived: () => import('./components/DepositReceived'),
    // 确认放款
    ConfirmTheLoan: () => import('./components/ConfirmTheLoan'),
    // 赊销收款
    CreditSalesCollection: () => import('./components/CreditSalesCollection')
  },
  data() {
    return {
      // 查询数据
      searchProps: {
        code: '',
        customerId: '',
        state: '',
        buId: '',
        outDepotId: '',
        poNo: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '赊销单号', prop: 'code', minWidth: '140', align: 'center', hide: true },
        { label: '事业部', prop: 'outDepotName', minWidth: '120', align: 'center', hide: true },
        { label: '关联单据', prop: 'buName', minWidth: '120', align: 'center', hide: true },
        { label: '客户', prop: 'customerName', minWidth: '120', align: 'center', hide: true },
        { label: '数量/金额', prop: 'saleOrderCodes', minWidth: '140', align: 'center', hide: true },
        { label: '保证金', prop: 'inDepotName', minWidth: '120', align: 'center', hide: true },
        { label: '创建人', prop: 'statusLabel', width: '100', align: 'center', hide: true },
        { label: '起息日/到期日', prop: 'apiStatusLabel', width: '100', align: 'center', hide: true },
        { label: '收款信息', prop: 'apiStatusLabel', width: '100', align: 'center', hide: true },
        { label: '操作', slotTo: 'action', width: '160', align: 'left' }
      ],
      // 日志组件
      logList: {
        filterData: {},
        visible: { show: false }
      },
      // 收到保证金
      depositReceived: {
        filterData: {},
        visible: { show: false }
      },
      // 确认放款
      confirmTheLoan: {
        filterData: {},
        visible: { show: false }
      },
      // 赊销收款
      creditSalesCollection: {
        filterData: {},
        visible: { show: false }
      },
      tabTotal: ''
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
      // 订单日期
      this.searchProps.createDateStartDate = this.date && this.date.length ? this.date[0] : ''
      this.searchProps.createDateEndDate = this.date && this.date.length ? this.date[1] : ''
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await listPreSaleOrder({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
				this.tableData.list = data.list
        this.tableData.total = data.total
			} catch (err) {}
      this.tableData.loading = false
    },
    // 显示日志弹窗
    showModal(type, data) {
      switch (type) {
        case 'logList':
          this.logList.filterData = { relCode: data }
          this.logList.visible.show = true
          break
        case 'depositReceived':
          this.depositReceived.filterData = { relCode: data }
          this.depositReceived.visible.show = true
          break
        case 'confirmTheLoan':
          this.confirmTheLoan.filterData = { relCode: data }
          this.confirmTheLoan.visible.show = true
          break
        case 'creditSalesCollection':
          this.creditSalesCollection.filterData = { relCode: data }
          this.creditSalesCollection.visible.show = true
          break
      }
    },
    // 关闭弹窗
    closeModal(type, isCancel) {
      switch (type) {
        // 生成采购订单
        case 'purchase':
          this.purchaseOrder.visible.show = false
          this.purchaseOrder.data = {}
          this.purchaseOrder.id = ''
          this.purchaseOrder.type = ''
          break
        // 预售转销
        case 'preSaleOrder':
          this.preSaleOrder.visible.show = false
          this.preSaleOrder.form = {}
          this.preSaleOrder.form.ids = ''
          this.preSaleOrder.itemList = []
          break
      }
      if (!isCancel) {
        this.getList()
      }
    },
    // 导出
    async exportList() {
      if (this.tableData.total < 1) {
        return this.$errorMsg('暂无数据可导出')
      }
      try {
        if (this.tableChoseList.length) {
          this.$showToast('确定导出勾选数据？', async() => {
            const ids = this.tableChoseList.map(item => item.id).toString()
            this.$exportFile(exportPreSaleOrderUrl, { ids })
          })
        } else {
          const { data } = await getPreSaleOrderCount({ ...this.searchProps })
          if (data > 10000) {
            return this.$errorMsg('导出的数量过大，请填写筛选条件再导出')
          }
          this.$exportFile(exportPreSaleOrderUrl, { ...this.searchProps })
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 删除表格项
    deleteTableItem() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      this.$showToast('确定删除数据？', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await delPreSaleOrder({ ids })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
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
