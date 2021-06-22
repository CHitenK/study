<template>
  <!-- 预售单列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="预售单号：" prop="code" class="search-panel-item fs-14 clr-II" >
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
            <el-form-item label="单据状态：" prop="state" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.state"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('preSaleOrder_stateList')"
              >
                <el-option
                  v-for="item in selectOpt.preSaleOrder_stateList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
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
            <el-form-item label="出仓仓库：" prop="outDepotId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.outDepotId"
                placeholder="请选择"
                filterable
                clearable
                :data-list="getSelectBeanByMerchantRel('warehouseList')"
              >
                <el-option
                  v-for="item in selectOpt.warehouseList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="PO号：" prop="poNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.poNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date" label="创建时间：">
              <el-date-picker
                clearable
                v-model="date"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary" v-permission="'preSale_add'" @click="linkTo('/sales/preordereadd')">新增</el-button>
        <el-button type="primary" v-permission="'preSale_del'" @click="deleteTableItem">删除</el-button>
        <el-button type="primary" v-permission="'preSale_to_saleOrder'" @click="showToSaleOrderModal">预售转销</el-button>
        <el-button type="primary" v-permission="'preSale_createPurchase'" @click="generatePurchaseOrder">生成采购订单</el-button>
        <el-button type="primary" v-permission="'preSale_export'" @click="exportList">导出</el-button>
        <el-button type="primary" v-permission="'preSale_import'" @click="importFile">导入</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               @selection-change="selectionChange"
               @change="getList">
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
      <el-table-column prop="code"
                       align="center"
                       label="预售单号"
                       min-width="130"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="customerName"
                       align="center"
                       label="客户"
                       min-width="100"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="buName"
                       align="center"
                       label="事业部"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="outDepotName"
                       align="center"
                       label="出仓仓库"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="poNo"
                       align="center"
                       label="PO号"
                       min-width="100"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="totalNum"
                       align="center"
                       label="预售数量"
                       width="80"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="totalAmount"
                       align="center"
                       label="预售总金额"
                       width="90"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="createDate"
                       align="center"
                       label="创建时间"
                       width="150"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="createName"
                       align="center"
                       label="创建人"
                       width="90"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="stateLabel"
                       align="center"
                       label="状态"
                       width="80"
      ></el-table-column>
      <el-table-column align="left"
                       label="操作"
                       width="100"
                       fixed="right">
        <template slot-scope="{row}">
          <el-button type="text" v-permission="'preSale_edit'" @click="linkTo(`/sales/preorderedit?id=${row.id}`, '预售订单编辑')" v-if="row.state === '001'">编辑</el-button>
          <el-button type="text" v-permission="'preSale_detail'" @click="linkTo(`/sales/preorderdetail?id=${row.id}`)">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 预售转销组件 -->
    <PreSaleOrder v-if="preSaleOrder.visible.show"
                  :ids="preSaleOrder.ids"
                  :itemList="preSaleOrder.itemList"
                  :form="preSaleOrder.form"
                  :isVisible="preSaleOrder.visible"
                  @comfirm="closeModal('preSaleOrder')"
    ></PreSaleOrder>
    <!-- 预售转销组件 end -->
    <!-- 生成采购订单组件 -->
    <GeneratePurchaseOrder v-if="purchaseOrder.visible.show"
                           :id="purchaseOrder.id"
                           :data="purchaseOrder.data"
                           :type="purchaseOrder.type"
                           :purchaseOrderVisible="purchaseOrder.visible"
                           @comfirm="closeModal('purchase')"
    ></GeneratePurchaseOrder>
    <!-- 生成采购订单组件 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  listPreSaleOrder,
  exportPreSaleOrderUrl,
  getPreSaleOrderCount,
  delPreSaleOrder,
  importPreSaleUrl,
  checkPreSale,
  checkPreOrderState
} from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  components: {
    PreSaleOrder: () => import('./components/PreSaleOrder'),
    GeneratePurchaseOrder: () => import('./components/GeneratePurchaseOrder')
  },
  data() {
    return {
      // 创建时间
      date: [],
      // 查询数据
      searchProps: {
        code: '',
        customerId: '',
        state: '',
        buId: '',
        outDepotId: '',
        poNo: ''
      },
      // 生成采购订单组件状态
      purchaseOrder: {
        data: {},
        type: '',
        visible: { show: false }
      },
      // 转售订单组件状态
      preSaleOrder: {
        ids: '',
        form: {},
        itemList: [],
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
    // 生成采购订单
    async generatePurchaseOrder() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      if (this.tableChoseList.length > 1) {
        return this.$alertWarning('仅能选择一条数据！')
      }
      const { state, id } = this.tableChoseList[0]
      if (!['001', '002', '003'].includes(state)) {
        return this.$alertWarning('只有待审核、已审核状态下才能生成采购单')
      }
      try {
        const { data } = await checkPreOrderState({ id })
        this.purchaseOrder.data = data || {}
        this.purchaseOrder.type = '2'
        this.purchaseOrder.id = id.toString()
        this.purchaseOrder.visible.show = true
      } catch (error) {
        return this.$errorMsg(error.message)
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
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 138 + '&url=' + importPreSaleUrl)
    },
    // 显示生成销售弹窗
    async showToSaleOrderModal() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      const ids = this.tableChoseList.map(item => item.id).toString()
      try {
        const { data } = await checkPreSale({ ids })
        if (data && data.length) {
          const itemList = data.map(item => ({
            id: item.goodsId ? item.goodsId + '' : '',
            price: item.price ? item.price + '' : '',
            num: item.num ? item.num + '' : '',
            brandName: item.brandName || '',
            goodsName: item.goodsName || '',
            goodsNo: item.goodsNo || '',
            preNum: item.preNum ? item.preNum + '' : '',
            staySaleNum: item.staySaleNum ? item.staySaleNum + '' : ''
          }))
          const { merchantId, preSaleOrderCode, poNo, customerId, buId, businessModel, outDepotId } = data[0]
          this.preSaleOrder.form = { merchantId, preSaleOrderCode, poNo, buId, businessModel, outDepotId }
          this.preSaleOrder.form.customerId = customerId + ''
          this.preSaleOrder.form.buId = buId + ''
          this.preSaleOrder.form.outDepotId = outDepotId + ''
          this.preSaleOrder.form.merchantId = merchantId + ''
          this.preSaleOrder.ids = ids
          this.preSaleOrder.itemList = itemList
        }
        this.preSaleOrder.visible.show = true
      } catch (error) {
        this.$errorMsg(error.message)
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
