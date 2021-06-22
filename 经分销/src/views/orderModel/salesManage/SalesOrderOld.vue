<template>
  <!-- 销售订单列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="销售订单编号：" prop="code" class="search-panel-item fs-14 clr-II">
              <el-input type="textarea" :rows="1" v-model.trim="searchProps.code" placeholder="多个订单用英文逗号隔开" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="PO单号：" prop="poNo" class="search-panel-item fs-14 clr-II">
              <el-input type="textarea" :rows="1" v-model.trim="searchProps.poNo" placeholder="多个PO用英文逗号隔开" clearable />
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
            <el-form-item label="出仓仓库：" prop="outDepotId" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.outDepotId"
                         placeholder="请选择"
                         :data-list="getSelectBeanByMerchantRel('warehouseList')"
                         filterable
                         clearable>
                <el-option v-for="item in selectOpt.warehouseList"
                           :key="item.key"
                           :label="item.value"
                           :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="订单状态：" prop="stateList" class="search-panel-item fs-14 clr-II">
              <el-select v-model="stateList"
                         placeholder="请选择"
                         :data-list="getSelectList('saleOrder_stateList')"
                         filterable
                         multiple
                         clearable>
                <el-option
                  v-for="item in selectOpt.saleOrder_stateList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="销售类型：" prop="businessModel" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.businessModel"
                         placeholder="请选择"
                         :data-list="getSelectList('saleOrder_businessModelList')"
                         filterable
                         clearable>
                <el-option
                  v-for="item in selectOpt.saleOrder_businessModelList"
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
            <el-form-item label="单据标识：" prop="orderType" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.orderType"
                         placeholder="请选择"
                         :data-list="getSelectList('saleOrder_orderTypeList')"
                         filterable
                         clearable>
                <el-option
                  v-for="item in selectOpt.saleOrder_orderTypeList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="金额调整状态：" prop="amountStatus" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.amountStatus"
                         placeholder="请选择"
                         :data-list="getSelectList('saleOrder_amountStatusList')"
                         filterable
                         clearable>
                <el-option
                  v-for="item in selectOpt.saleOrder_amountStatusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="金额确认状态：" prop="amountConfirmStatus" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.amountConfirmStatus"
                         placeholder="请选择"
                         :data-list="getSelectList('saleOrder_amountConfirmStatusList')"
                         filterable
                         clearable>
                <el-option
                  v-for="item in selectOpt.saleOrder_amountConfirmStatusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date" label="订单日期：">
              <el-date-picker
                v-model="date1"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date2" label="上架日期：">
              <el-date-picker
                v-model="date2"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
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
                   v-permission="'sale_add'"
                   @click="linkTo('/sales/salesorderadd')">新增</el-button>
        <el-button type="primary"
                   v-permission="'sale_import'"
                   @click="importFile('1')">导入</el-button>
        <el-button type="primary"
                   v-permission="'sale_saleOrderStockOut'"
                   @click="showTransferWarehouse">中转仓出库</el-button>
        <el-button type="primary"
                   v-permission="'sale_delSaleOrder'"
                   @click="deleteTableItem">删除</el-button>
        <el-button type="primary"
                   v-permission="'sale_exportSaleOrder'"
                   @click="exportList">导出</el-button>
        <el-button type="primary"
                   v-permission="'sale_endStockOut'"
                   @click="finishedDelivery">完结出库</el-button>
        <el-button type="primary"
                   v-permission="'sale_createPurchase'"
                   @click="generatePurchaseOrder">生成采购订单</el-button>
        <el-button type="primary"
                   v-permission="'ownSaleOrder_add'"
                   @click="addOwnSaleOrder">新增内部销售订单</el-button>
        <el-button type="primary"
                   v-permission="'sale_copy'"
                   @click="copyTableItem">复制</el-button>
        <el-button type="primary"
                   v-permission="'sale_importSaleShelf'"
                   @click="importFile('2')">上架导入</el-button>
        <el-button type="primary"
                   v-permission="'sale_exportCustoms'"
                   :loading="qingGuanLoading"
                   @click="exportCustomsInfo">导出清关资料</el-button>
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
                       width="140"
                       label="销售订单编号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="outDepotName"
                       align="center"
                       width="120"
                       label="出仓仓库"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="buName"
                       align="center"
                       width="120"
                       label="事业部"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="merchantName"
                       align="center"
                       width="100"
                       label="公司"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="poNo"
                       align="center"
                       min-width="100"
                       label="PO单号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="customerName"
                       align="center"
                       min-width="120"
                       label="客户"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="totalNum"
                       align="center"
                       width="110"
                       label="销售订单总数量"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="totalAmount"
                       align="center"
                       width="110"
                       label="销售订单总金额"
                       show-overflow-tooltip>
        <template slot-scope="{row}">
          {{`${row.currency || ''} ${row.totalAmount}`}}
        </template>
      </el-table-column>
      <el-table-column prop="amountStatusLabel"
                       align="left"
                       width="120"
                       label="金额调整状态">
        <template slot-scope="{row}">
          <el-row>
            <span>{{row.amountStatusLabel}}</span>
            <span type="text"
                  class="amount-text"
                  v-if="row.state !== '001' && row.state !== '008' && row.amountConfirmStatus !== '1' && row.hasFinanceClose === '0'"
                  @click="showAmountAdjustMoadl(row.id, '1')"
                  v-permission="'sale_amount_adjust'">修改</span>
          </el-row>
          <el-row>
            <span>{{row.amountConfirmStatusLabel}}</span>
            <span type="text"
                  class="amount-text"
                  v-if="row.state !== '001' && row.state !== '008' && row.hasFinanceClose === '0'"
                  @click="showAmountAdjustMoadl(row.id, '2')"
                  v-permission="'sale_amount_confirm'">确认</span>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="createDate"
                       align="center"
                       width="150"
                       label="订单日期"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="stateLabel"
                       align="center"
                       width="80"
                       label="订单状态"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="businessModelLabel"
                       align="center"
                       width="100"
                       label="销售类型"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="left"
                       label="操作"
                       :width="btnsWidth"
                       fixed="right">
        <template slot-scope="{row}">
          <!-- 订单状态:001:待审核,002:审核中,003:已审核,006:已删除,007:已完结,018:已出库,019部分出库, 027:出库中,025：已签收 026：已上架 031-部分上架 -->
          <el-button type="text"
                     v-if="row.state === '008'"
                     v-permission="'sale_edit'"
                     @click="linkTo(`/sales/salesorderedit?id=${row.id}`)">编辑</el-button>
          <el-button type="text"
                     v-if="row.state === '001'"
                     v-permission="'sale_edit'"
                     @click="linkTo(`/sales/salesorderedit?id=${row.id}&examine=1`)">审核</el-button>
          <!-- <el-button type="text"
                     v-permission="'sale_receive'"
                     v-if="['1', '3', '4'].includes(row.businessModel) && ((row.businessModel === '1' && row.createDate >= '2020-01-01 00:00:00' && row.state === '018') || (row.businessModel === '4' && row.state === '018') || (row.businessModel === '3' && row.state === '018'))"
                     @click="receiveOrder(row)">签收</el-button> -->
          <el-button type="text"
                     v-if="['1', '3', '4'].includes(row.businessModel) && ['031', '018', '019'].includes(row.state)"
                     v-permission="'sale_shelfIsEnd'"
                     @click="jumpPutOnSale(row.id, row.code)">上架</el-button>
          <el-button type="text"
                     v-if="(row.state === '003' || row.state === '019') && (row.outDepotBatchValidation === '0' || row.outDepotBatchValidation === '2')"
                     v-permission="'sale_out'"
                     @click="saleOrderOut(row.id)">打托出库</el-button>
          <el-button type="text"
                     v-permission="'sale_toAttachment'"
                     @click="linkTo(`/common/enclosuremanage?code=${row.code}`)">附件</el-button>
          <el-button type="text"
                     v-if="row.financeStatus === '0' && row.state !=='001' && row.state !== '008' && row.businessModel === '3'"
                     v-permission="'sale_detail'"
                     @click="showFinancingApplication(row.id, 'application')">融资申请</el-button>
          <el-button type="text"
                     v-permission="'sale_detail'"
                     v-if="row.financeStatus === '1' && row.state !=='001' && row.state !== '008' && row.businessModel === '3'"
                     @click="showFinancingApplication(row.id, 'redemption')">融资赎回</el-button>
          <el-button type="text"
                     v-permission="'sale_detail'"
                     @click="linkTo(`/sales/salesorderdetail?id=${row.id}`)">详情</el-button>
          <span v-if="!tableData.loading" v-count-width="{ widthArr: getWidthArr(row), callback: countWidth }"></span>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 中转仓出库组件 -->
    <TransferWarehouseOut v-if="transferWarehouse.visible.show"
                          :ids="transferWarehouse.ids"
                          :transferWarehouseVisible="transferWarehouse.visible"
                          @comfirm="closeModal('transfer')"
    ></TransferWarehouseOut>
    <!-- 中转仓出库组件 end -->
    <!-- 签收组件 -->
    <SignForOrder v-if="signForOrder.visible.show"
                  :id="signForOrder.id"
                  :poNo="signForOrder.poNo"
                  :businessModel="signForOrder.businessModel"
                  :signForOrderVisible="signForOrder.visible"
                  @comfirm="closeModal('receive')"
    ></SignForOrder>
    <!-- 签收组件 end -->
    <!-- 生成采购订单组件 -->
    <GeneratePurchaseOrder v-if="purchaseOrder.visible.show"
                           :id="purchaseOrder.id"
                           :data="purchaseOrder.data"
                           :type="purchaseOrder.type"
                           :purchaseOrderVisible="purchaseOrder.visible"
                           @comfirm="closeModal('purchase')"
    ></GeneratePurchaseOrder>
    <!-- 生成采购订单组件 end -->
    <!-- 新增内部订单组件  -->
    <AddInternalOrder v-if="internalOrder.visible.show"
                      :data="internalOrder.data"
                      :internalOrderVisible="internalOrder.visible"
                      @comfirm="closeModal('internalOrder')"
    ></AddInternalOrder>
    <!-- 新增内部订单组件  end -->
    <!-- 确认金额组件 -->
    <AmountModal v-if="amountModalVisible.show"
                 :rowId="rowId"
                 :amountType="amountType"
                 :amountModalVisible="amountModalVisible"
                 @cacel="amountModalVisible.show=false"
                 @comfirm="closeModal('amount')"
    ></AmountModal>
    <!-- 确认金额组件 end -->
    <!-- 清关资料导出 -->
    <ExportConfirm v-if="visible.show"
                   :visible="visible"
                   :targetData="targetData"
                   @comfirm="exportConfirm"
    ></ExportConfirm>
    <!-- 清关资料导出 end-->
    <!-- 融资申请 -->
    <FinancingApplication v-if="financingApplication.visible.show"
                          :financingApplicationVisible="financingApplication.visible"
                          :id="financingApplication.id"
                          :type="financingApplication.type"
                          @comfirm="(isCancel) => closeModal('financing', isCancel)"
    ></FinancingApplication>
    <!-- 融资申请 end -->
    <!-- 选择上架单 -->
    <ChoosePutOnShelve v-if="choosePutOnShelve.visible.show"
                       :id="choosePutOnShelve.id"
                       :data="choosePutOnShelve.data"
                       :ChoosePutOnShelveVisible="choosePutOnShelve.visible"
                       @comfirm="closeModal('choosePutOnShelve')"
    ></ChoosePutOnShelve>
    <!-- 选择上架单 end -->
    <!-- 下载 -->
    <div class="hide-form" v-if="downVal">
      <form id="down-up" :action="actionUrl" method="post" target="_blank">
          <input type="hidden" name="json" v-model="downVal" />
      </form>
    </div>
    <!-- 下载 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import { getExportTemplate } from '@a/base'
import { getBaseUrl } from '@u/tool'
import {
  listSaleOrder,
  delSaleOrder,
  exportSaleOrderUrl,
  getSaleOrderCount,
  importSaleUrl,
  importSaleShelfUrl,
  differenceRatio,
  endStockOut,
  checkExistFinanceClose,
  checkOrderState,
  showOwnPurchaseOrder,
  exportSaleCustomsInfo,
  shelfIsEnd,
  getSaleOutDepotList
} from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  components: {
    TransferWarehouseOut: () => import('./components/TransferWarehouseOut'), // 中转仓出库
    GeneratePurchaseOrder: () => import('./components/GeneratePurchaseOrder'), // 生成采购订单
    AddInternalOrder: () => import('./components/AddInternalOrder'), // 生成内部订单
    AmountModal: () => import('./components/AmountModal'), // 金额调整
    SignForOrder: () => import('./components/SignForOrder'), // 签收
    ExportConfirm: () => import('@c/exportConfirm'), // 清关资料导出
    FinancingApplication: () => import('./components/FinancingApplication'), // 融资申请
    ChoosePutOnShelve: () => import('./components/ChoosePutOnShelve') // 选择上架单
  },
   data() {
    return {
      // 查询数据
      searchProps: {
        code: '',
        outDepotId: '',
        customerId: '',
        poNo: '',
        stateList: '',
        businessModel: '',
        buId: '',
        orderType: '',
        amountStatus: '',
        amountConfirmStatus: ''
      },
      // 订单状态
      stateList: [],
      // 订单日期
      date1: [],
      // 上架日期
      date2: [],
      // 调整、确认金额状态
      amountType: '1',
      // 表格行id
      rowId: '',
      // 确认金额组件显示状态
      amountModalVisible: { show: false },
      // 中转仓出库组件状态
      transferWarehouse: {
        ids: '',
        visible: { show: false }
      },
      // 签收组件状态
      signForOrder: {
        id: '',
        poNo: '',
        businessModel: '',
        visible: { show: false }
      },
      // 生成采购订单组件状态
      purchaseOrder: {
        data: {},
        type: '',
        visible: { show: false }
      },
      // 新增内部订单组件状态
      internalOrder: {
        data: [],
        visible: { show: false }
      },
      // 融资申请组件状态
      financingApplication: {
        id: '',
        type: '',
        visible: { show: false }
      },
      // 融资赎回组件状态
      financingRedemption: {
        id: '',
        visible: { show: false }
      },
      // 选择上架单组件状态
      choosePutOnShelve: {
        id: '',
        data: [],
        visible: { show: false }
      },
      // 导出清关资料按钮loading
      qingGuanLoading: false,
      actionUrl: '',
      downVal: ''
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
      // 订单状态
      this.searchProps.stateList = this.stateList && this.stateList.length ? this.stateList.toString() : ''
      // 订单日期
      this.searchProps.createDateStartDate = this.date1 && this.date1.length ? this.date1[0] : ''
      this.searchProps.createDateEndDate = this.date1 && this.date1.length ? this.date1[1] : ''
      // 上架日期
      this.searchProps.shelfDateStartDate = this.date2 && this.date2.length ? this.date2[0] : ''
      this.searchProps.shelfDateEndDate = this.date2 && this.date2.length ? this.date2[1] : ''
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await listSaleOrder({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
				this.tableData.list = data.list
        this.tableData.total = data.total
			} catch (err) {
        console.log(err)
      }
      this.tableData.loading = false
    },
    // 显示金额调整、确认弹窗
    async showAmountAdjustMoadl(id, type) {
      try {
        const { data: { code } } = await checkExistFinanceClose({ id })
        if (code === '00') {
          this.rowId = id + ''
          this.amountType = type
          this.amountModalVisible.show = true
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
          await delSaleOrder({ ids })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 导入
    importFile(type) {
      switch (type) {
        // 导入购销代销销售订单
        case '1':
          this.linkTo('/common/importfile?templateId=' + 114 + '&url=' + importSaleUrl)
          break
        // 上架导入
        case '2':
          this.linkTo('/common/importfile?templateId=' + 142 + '&url=' + importSaleShelfUrl)
          break
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
            this.$exportFile(exportSaleOrderUrl, { ids })
          })
        } else {
          const { data } = await getSaleOrderCount({ ...this.searchProps })
          if (data > 10000) {
            return this.$errorMsg('导出的数量过大，请填写筛选条件再导出')
          }
          this.$exportFile(exportSaleOrderUrl, { ...this.searchProps })
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 完结出库
    async finishedDelivery() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      if (this.tableChoseList.length > 1) {
        return this.$errorMsg('只能选择一条记录')
      }
      const id = this.tableChoseList[0].id
      const { data: { orderCode, percent } } = await differenceRatio({ id })
      this.$showToast(`销售订单【${orderCode}】出库数量已达到${percent}，是否完结出库?`, async() => {
        try {
          await endStockOut({ ids: id })
          this.$successMsg('完结出库成功')
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 显示中转仓出库弹窗
    showTransferWarehouse() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      let target = null
      target = this.tableChoseList.find(item => item.state !== '003' && item.state !== '019')
      if (target) {
        this.$errorMsg(`出库失败，订单：${target.code}的单据状态不为：已审核或部分出库`)
        return false
      }
      target = this.tableChoseList.find(item => item.outDepotId !== 45)
      if (target) {
        this.$errorMsg(`出库失败，订单：${target.code}的仓库不是中转仓`)
        return false
      }
      const ids = this.tableChoseList.map(item => item.id).toString()
      this.transferWarehouse.visible.show = true
      this.transferWarehouse.ids = ids
    },
    // 导出清关资料
    async exportCustomsInfo() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条数据！')
        return false
      }
      if (this.tableChoseList.length > 1) {
        this.$errorMsg('目前只支持单条数据导出！')
        return false
      }
      const {
        outDepotId = '',
        outCustomsId = '',
        inCustomsId = '',
        inDepotId = '',
        isSameArea = ''
      } = this.tableChoseList[0]
      const json = {
        outDepotId: outDepotId || '',
        inDepotId: inDepotId || '',
        outCustomsId: outCustomsId || '',
        inCustomsId: inCustomsId || '',
        isSameArea: isSameArea || ''
      }
      const exportParams = {}
      try {
        this.qingGuanLoading = true
        const res = await getExportTemplate({ json: JSON.stringify(json) })
        if (res.data.code === '00') { // 直接导出
          if (res.data.inList && res.data.inList.length > 0) {
            exportParams.inFileTempIds = res.data.inList[0].fileTempId + ''
          }
          if (res.data.outList && res.data.outList.length > 0) {
            exportParams.outFileTempIds = res.data.outList[0].fileTempId + ''
          }
          this.handleFormExportFile(exportParams)
        } else if (res.data.code === '01') { // 没有找到关联模板
          this.$alertWarning('该仓库暂无配置清关资料模板，请先完成模板配置！')
        } else { // 弹出选择模板
          this.targetData = res.data
          this.visible.show = true
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
      this.qingGuanLoading = false
    },
    // 选择模板后导出清关资料
    exportConfirm(data) {
      this.visible.show = false
      const inFileTempIds = data.inFileTemp.map(item => item.fileTempId).toString()
      const outFileTempIds = data.outFileTemp.map(item => item.fileTempId).toString()
      this.handleFormExportFile({ inFileTempIds, outFileTempIds })
    },
    // 下载清关资料
    async handleFormExportFile({ inFileTempIds, outFileTempIds }) {
      const id = this.tableChoseList[0].id + ''
      try {
        const json = JSON.stringify({ inFileTempIds, outFileTempIds, id })
        this.actionUrl = getBaseUrl(exportSaleCustomsInfo) + exportSaleCustomsInfo + `?token=${sessionStorage.getItem('token')}`
        this.downVal = json
        // 下载
        this.$nextTick(() => {
          const form = document.getElementById('down-up')
          form.submit()
          this.downVal = ''
        })
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 复制表格项
    copyTableItem() {
      if (!this.tableChoseList.length) {
        this.$alertWarning('至少选择一条记录！')
      } else if (this.tableChoseList.length > 1) {
        this.$alertWarning('仅能选择一条数据！')
      } else {
        const id = this.tableChoseList[0].id
        this.linkTo(`/sales/salesorderadd?copyid=${id}`)
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
        const { data } = await checkOrderState({ id })
        this.purchaseOrder.data = data || {}
        this.purchaseOrder.id = id.toString()
        this.purchaseOrder.type = '1'
        this.purchaseOrder.visible.show = true
      } catch (error) {
        return this.$errorMsg(error.message)
      }
    },
    // 签收
    // receiveOrder({ businessModel, id, poNo }) {
    //   this.signForOrder.visible.show = true
    //   this.signForOrder.id = id ? id.toString() : ''
    //   this.signForOrder.poNo = poNo || ''
    //   this.signForOrder.businessModel = businessModel || ''
    // },
    // 新增内部订单
    async addOwnSaleOrder() {
      try {
        const { data } = await showOwnPurchaseOrder()
        this.internalOrder.data = data || []
        this.internalOrder.visible.show = true
      } catch (error) {
        return this.$errorMsg(error.message)
      }
    },
    // 跳转到上架页面
    async jumpPutOnSale(id) {
      try {
        const { data } = await shelfIsEnd({ id })
        if (data) {
          this.$errorMsg('待上架数量为0，无需进行上架操作，请查看详情。')
          return false
        }
        const { data: list } = await getSaleOutDepotList({ saleOrderId: id })
        if (list.length === 1) {
          this.linkTo(`/sales/goodsonsale?id=${id}&saleOutCode=${list[0].code}&saleOutId=${list[0].id}`)
          return false
        }
        this.choosePutOnShelve.visible.show = true
        this.choosePutOnShelve.data = list
        this.choosePutOnShelve.id = id
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 跳转到打托出库页面
    async saleOrderOut(id) {
      try {
        // const { data: { code } } = await checkOutDepotOrder({ id })
        // if (code === '00') {
        this.linkTo(`/sales/salesorderissue?id=${id}`)
        // }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    showFinancingApplication(id, type) {
      this.financingApplication.visible.show = true
      this.financingApplication.type = type
      this.financingApplication.id = id + ''
    },
    // 关闭弹窗
    closeModal(type, isCancel) {
      switch (type) {
        // 中转仓出库
        case 'transfer':
          this.transferWarehouse.visible.show = false
          this.transferWarehouse.ids = ''
          break
        // 签收
        case 'receive':
          this.signForOrder.visible.show = false
          this.signForOrder.id = ''
          this.signForOrder.poNo = ''
          this.signForOrder.businessModel = ''
          break
        // 生成采购订单
        case 'purchase':
          this.purchaseOrder.visible.show = false
          this.purchaseOrder.data = {}
          this.purchaseOrder.id = ''
          this.purchaseOrder.type = ''
          break
        // 新增内部订单
        case 'internalOrder':
          this.internalOrder.visible.show = false
          this.internalOrder.data = []
          break
        // 金额确认
        case 'amount':
          this.amountModalVisible.show = false
          break
        // 融资申请
        case 'financing':
          this.financingApplication.visible.show = false
          this.financingApplication.type = ''
          this.financingApplication.id = ''
          break
        // 选择上架单
        case 'choosePutOnShelve':
          this.choosePutOnShelve.visible.show = false
          this.choosePutOnShelve.data = []
          this.choosePutOnShelve.id = ''
          break
      }
      if (!isCancel) {
        this.getList()
      }
    },
    // 计算操作单元格宽度
    getWidthArr(row) {
      return [
        90, // 详情 附件
        row.state === '008' ? 40 : 0, // 编辑
        row.state === '001' ? 40 : 0, // 审核
        // 签收
        // ['1', '3', '4'].includes(row.businessModel) && ((row.businessModel === '1' && row.createDate >= '2020-01-01 00:00:00' && row.state === '018') || (row.businessModel === '4' && row.state === '018') || (row.businessModel === '3' && row.state === '018')) ? 40 : 0,
        // 上架
        ['1', '3', '4'].includes(row.businessModel) && ['031', '018', '019'].includes(row.state) ? 40 : 0,
        // 打托出库
        (row.state === '003' || row.state === '019') && (row.outDepotBatchValidation === '0' || row.outDepotBatchValidation === '2') ? 60 : 0,
        // 融资申请
        row.financeStatus === '0' && row.state !== '001' && row.state !== '008' && row.businessModel === '3' ? 60 : 0,
        // 融资赎回
        row.financeStatus === '1' && row.state !== '001' && row.state !== '008' && row.businessModel === '3' ? 60 : 0
      ]
    },
    // 重置搜索表单
    resetSearchForm() {
      this.reset('searchForm', () => {
        this.stateList = []
        this.date1 = []
        this.date2 = []
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
