<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)" >
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="采购订单编号：" prop="codes" class="search-panel-item fs-14 clr-II" >
              <el-input type="textarea" :rows="1" v-model.trim="ruleForm.codes" clearable placeholder="多个订单用英文逗号隔开"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="PO号：" prop="poNos" class="search-panel-item fs-14 clr-II" >
              <el-input type="textarea" :rows="1" v-model.trim="ruleForm.poNos" clearable placeholder="多个订单用英文逗号隔开"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="供应商：" prop="supplierId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.supplierId" placeholder="请选择" clearable filterable :data-list="getSupplierList('gongyingList')" >
                <el-option v-for="item in selectOpt.gongyingList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.buId" placeholder="请选择" filterable clearable :data-list="getBUSelectBean('bu_list')" >
                <el-option v-for="item in selectOpt.bu_list"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="入库仓库：" prop="depotId" class="search-panel-item fs-14 clr-II">
              <el-select v-model="ruleForm.depotId" placeholder="请选择" clearable filterable :data-list="getSelectBeanByMerchantRel('ruku_list')" >
                <el-option v-for="item in selectOpt.ruku_list"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="订单状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.status" placeholder="请选择" clearable :data-list="getSelectList('purchaseOrder_statusList')" >
                <el-option v-for="item in selectOpt.purchaseOrder_statusList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="入库单编码：" prop="warehouseCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.warehouseCode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="业务模式：" prop="businessModel" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.businessModel" placeholder="请选择" clearable filterable="" :data-list="getSelectList('purchaseOrder_businessModelList')" >
                <el-option v-for="item in selectOpt.purchaseOrder_businessModelList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="是否完结：" prop="isEnd" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.isEnd" placeholder="请选择" clearable :data-list="getSelectList('purchaseOrder_isEndList')" >
                <el-option v-for="item in selectOpt.purchaseOrder_isEndList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="金额调整状态：" prop="amountAdjustmentStatus" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.amountAdjustmentStatus" placeholder="请选择" clearable :data-list="getSelectList('purchaseOrder_amountAdjustmentStatusList')" >
                <el-option v-for="item in selectOpt.purchaseOrder_amountAdjustmentStatusList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="金额确认状态：" prop="amountConfirmStatus" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.amountConfirmStatus" placeholder="请选择" clearable :data-list="getSelectList('purchaseOrder_amountConfirmStatusList')" >
                <el-option v-for="item in selectOpt.purchaseOrder_amountConfirmStatusList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="融资申请号：" prop="financingNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.financingNo" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date" label="录单日期：">
              <el-date-picker
                clearable
                v-model="date"
                type="daterange"
                :default-time="['00:00:00', '23:59:59']"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20">
      <el-col :span="24" >
        <el-button type="primary" :size="'small'" @click="linkTo('/purchase/purchaseOrderedit/add')"  v-permission="'purchase_add'">新增</el-button>
        <el-button type="primary" :size="'small'" @click="finishIn" v-permission="'purchase_endPurchaseOrderCheck'" :loading="finishLoading">完结入库</el-button>
        <el-button type="primary" :size="'small'" @click="importFile" v-permission="'purchase_import'" >导入</el-button>
        <el-button type="primary" :size="'small'" @click="dele" v-permission="'purchase_delPurchaseOrder'"  >删除</el-button>
        <el-button type="primary" :size="'small'" @click="createShen" v-permission="'purchase_generateDeclareOrder'" >生成预申报单</el-button>
        <el-button type="primary" :size="'small'" @click="purchaseInWarehouse" v-permission="'purchase_inWarehouse'" >中转仓入库</el-button>
        <el-button type="primary" :size="'small'" @click="toSaleStepBeforeCheck" v-permission="'purchase_trade_link'">创建交易链路</el-button>
        <el-button type="primary" :size="'small'" @click="createSD" v-permission="'purchase_sd_create'"  >创建采购SD单</el-button>
        <el-button type="primary" :size="'small'" @click="exportFile" v-permission="'purchase_exportPurchase'">导出</el-button>
        <el-button type="primary" :size="'small'" @click="copy"  v-permission="'purchase_copy'">复制</el-button>
        <el-button type="primary" :size="'small'" @click="toSale" v-permission="'purchase_to_sale'">转销售订单</el-button>
        <el-button type="primary" :size="'small'" @click="goRongzi" v-permission="'purchase_to_financing'">生成融资代采</el-button>
      </el-col>
    </el-row>
    <div class="mr-t-20"></div>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table
      :tableData.sync="tableData"
      @selection-change="selectionChange"
      @change="getList"
    >
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column prop="code" label="采购订单编号" align="center" min-width="140"></el-table-column>
      <el-table-column prop="depotName" label="入库仓库" align="center" min-width="100" ></el-table-column>
      <el-table-column prop="buName" label="事业部" align="center" min-width="100" ></el-table-column>
      <el-table-column prop="supplierName" label="供应商" align="center" min-width="120" ></el-table-column>
      <el-table-column prop="poNo" label="PO号" align="center" width="150"></el-table-column>
      <el-table-column prop="statusLabel" label="订单状态" align="center" width="70"></el-table-column>
      <el-table-column prop="poNo" label="数量/总金额" align="center" width="120">
        <template slot-scope="scope">
          <div>
            <div class="t-l">{{scope.row.totalNum}}</div>
            <div class="t-l">{{scope.row.currency}} {{scope.row.goodsAmount}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="isGenerateLabel" label="生成预申报单" align="center" width="100"></el-table-column>
      <el-table-column prop="" label="金额调整" align="center" width="110">
        <template slot-scope="scope">
          <div>
            <div><span>{{scope.row.amountAdjustmentStatusLabel}}</span>&nbsp;&nbsp;<el-button type="text" @click="openJinELay(scope.row, 'edit')" v-if="scope.row.status !== '001' && scope.row.isAmountAdjustmentAble === '1'" v-permission="'purchase_changeAmount'">修改</el-button></div>
            <div>{{scope.row.amountConfirmStatusLabel}}&nbsp;&nbsp;<el-button type="text" @click="openJinELay(scope.row, 'comfirm')" v-if="scope.row.status !== '001' && scope.row.isAmountAdjustmentAble === '1'" v-permission="'purchase_confirmAmount'">确认</el-button></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="billStatusLabel" label="付款状态" align="center" min-width="70"></el-table-column>
      <el-table-column prop="businessModelLabel" label="业务模式" align="center" min-width="70"></el-table-column>
      <el-table-column prop="financingNo" label="融资申请号" align="center" min-width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createDate" label="录单日期" align="center" width="95">
        <template slot-scope="scope">{{scope.row.createDate.substring(0, 10)}}</template>
      </el-table-column>
      <el-table-column
      align="left"
      fixed="right"
      width="150"
      label="操作">
        <template slot-scope="scope">
          <div class="too-bx-last">
            <el-button type="text" style="padding-left: 5px;" @click="linkTo('/purchase/purchaseOrderdetail?id=' + scope.row.id)" v-permission="'purchase_detail'">详情</el-button>
            <el-button type="text" @click="linkTo('/purchase/purchaseOrderedit/edit?audit=true&id=' + scope.row.id)" v-if="scope.row.status === '002'" v-permission="'purchase_audit'">审核</el-button>
            <el-button type="text" @click="linkTo('/purchase/purchaseOrderedit/edit?id=' + scope.row.id)" v-if="scope.row.status === '001'" v-permission="'purchase_edit'">编辑</el-button>
            <el-button type="text" @click="linkTo('/purchase/checkContract?id=' + scope.row.id + '&customerId=' + scope.row.supplierId)" v-permission="'purchase_view_contract'">查看合同</el-button>
            <!-- receiveInvoice<el-button type="text" @click="openInvoice(scope.row)" v-if="['003', '007', '005'].includes(scope.row.status) && !scope.row.drawInvoiceDate" v-permission="'purchase_receiveInvoice'">收到发票</el-button> -->
            <el-button type="text" @click="linkTo('/purchase/receiveInvoiceEdit?id=' + scope.row.id)" v-if="+scope.row.isInvoiceAble === 1" v-permission="'purchase_receiveInvoice'">收到发票</el-button>
            <el-button type="text" @click="openPayment(scope.row)" v-if="['003', '007', '005'].includes(scope.row.status) && !scope.row.payDate" v-permission="'purchase_alreadyPay'">录入付款</el-button>
            <el-button type="text" @click="linkTo('/purchase/inwarehouse?id=' + scope.row.id)" v-if="+scope.row.isInDepotAble === 1" v-permission="'purchase_in'">上架入库</el-button>
            <el-button type="text" @click="linkTo('/common/enclosureManage?code=' + scope.row.code)" v-permission="'purchase_toAttachment'">附件管理</el-button>
            <el-button type="text" @click="openLog(scope.row)" v-permission="'purchase_log'">日志</el-button>
          </div>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 批量修改品类 -->
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      @comfirm="getList"
      :width="'30vw'"
      :title="'修改品类'"
      :btnAlign="'center'"
      top="30vh"
      >
      <div class="change-lve">
        <span>二级类目：</span>
        <el-select v-model="ruleForm.region" placeholder="请选择" clearable >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </div>
    </JFX-Dialog>
    <!-- 批量修改品类 end-->
    <!-- 录入发票时间-->
    <receive-invoice v-if="invoiceVisible.show" :visible.sync="invoiceVisible" @comfirm="getList" :filterData="filterData1"></receive-invoice>
    <!-- 录入发票时间 end-->
    <!-- 录入付款时间 -->
    <input-pay-time v-if="inputPayTimeVisible.show" :visible.sync="inputPayTimeVisible" :filterData="filterData1"  @comfirm="getList" ></input-pay-time>
    <!-- 录入付款时间 end -->
    <!-- 生成采购SD金额 -->
    <sd-order-comfirm v-if="sdVisible.show" :visible.sync="sdVisible" :targetId="SdTargetId" @comfirm="getList" ></sd-order-comfirm>
    <!-- 生成采购SD金额 end -->
    <!-- 采购金额确认/修改 -->
    <purchase-amount
      :visible.sync="purchaseAmountVisible"
      v-if="purchaseAmountVisible.show"
      @comfirm="getList"
      :filterData="filterData"
      ></purchase-amount>
    <!-- 采购金额确认/修改 end-->
    <!--中转入库-->
    <JFX-Dialog
    :visible.sync="transferWarehouse"
    :showClose="true"
    @comfirm="comfirmPurchaseInWarehouse"
    :width="'30vw'"
    :title="'中转入库'"
    :btnAlign="'center'"
    top="30vh"
    v-loading="transferWarehouseLoading"
    >
      <div >
          <div class="change-lve">
            <span class="need">入库时间：</span>
            <el-date-picker
              v-model="inWarehouseTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="mr-t-20 fs-14 clr-II">
            对选中的单据进行中转仓入库确认！
          </div>
      </div>
    </JFX-Dialog>
    <!--中转入库 end-->
    <!-- 转销售订单 -->
    <sales-order
    :visible.sync="salesOrdereVisible"
    v-if="salesOrdereVisible.show"
    :targetIds="salesOrderIds"
    @close="getList"
    ></sales-order>
    <!-- 转销售订单 end -->
    <!-- 日志 -->
    <purchase-order-log v-if="logVisible.show" :visible.sync="logVisible" :filterData="filterData"></purchase-order-log>
    <!-- 日志 end-->
  </div>
</template>
<script>
import { listPurchaseOrder, endPurchaseOrderCheck, endPurchaseOrder, importPurchaseUrl, delPurchaseOrder, inWarehouse, createFinancingOrderCheck, exportPurchaseUrl, createSdOrderCheck, toSaleStepBeforeCheck, generateDeclareOrderCheck } from '@a/purchaseManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    receiveInvoice: () => import('./components/receiveInvoice'),
    inputPayTime: () => import('./components/inputPayTime'),
    purchaseAmount: () => import('./components/purchaseAmount'),
    salesOrder: () => import('./components/salesOrder'),
    sdOrderComfirm: () => import('./components/SDOrderComfirm'),
    purchaseOrderLog: () => import('@c/logList/index.vue')
  },
  data() {
    return {
      ruleForm: {
        codes: '',
        depotId: '',
        supplierId: '',
        buId: '',
        poNos: '',
        status: '',
        warehouseCode: '',
        businessModel: '',
        isEnd: '',
        amountConfirmStatus: '',
        amountAdjustmentStatus: '',
        createStartDate: '',
        createEndDate: '',
        financingNo: ''
      },
      date: '',
      visible: { show: false },
      invoiceVisible: { show: false },
      inputPayTimeVisible: { show: false },
      purchaseAmountVisible: { show: false },
      transferWarehouse: { show: false },
      salesOrdereVisible: { show: false },
      logVisible: { show: false },
      inWarehouseTime: '',
      filterData: {},
      filterData1: {},
      finishLoading: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      transferWarehouseLoading: false,
      salesOrderIds: '',
      SdTargetId: '',
      sdVisible: { show: false }
    }
	},
	mounted() {
    this.getList(1)
	},
  activated() {
    this.getList()
  },
  methods: {
		async getList(pageNum) {
      try {
				this.tableData.loading = true
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.ruleForm.createStartDate = this.date && this.date.length > 0 ? this.date[0] + ' 00:00:00' : ''
        this.ruleForm.createEndDate = this.date && this.date.length > 0 ? this.date[1] + ' 23:59:59' : ''
        const opt = {
          ...this.ruleForm,
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10
        }
				// 同步方法
				const res = await listPurchaseOrder(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
    // 金额调整
    openJinELay(row, type = 'edit') {
      this.filterData = { id: row.id, type }
      this.purchaseAmountVisible.show = true
    },
		dele() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      const ids = this.tableChoseList.map(item => item.id).toString()
			this.$confirm('确定删除选中对象？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
				await delPurchaseOrder({ ids })
        this.$successMsg('删除成功')
        this.getList()
			})
    },
    // 收到发票
    openInvoice(row) {
      this.filterData1 = { id: row.id, code: row.code }
      this.invoiceVisible.show = true
    },
    // 录入收款
    openPayment(row) {
      this.filterData1 = { id: row.id, code: row.code }
      this.inputPayTimeVisible.show = true
    },
    // 完入结库
    async finishIn() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      const ids = this.tableChoseList.map(item => item.id).toString()
      try {
        this.finishLoading = true
        const res = await endPurchaseOrderCheck({ ids })
        if (res.data.includes('状态必须为已审核')) {
          this.$errorMsg(res.data)
          throw new Error(false)
        }
        const resultData = res.data
        const resultLength = resultData.length
        const resultSub = resultData.substring(resultLength - 5, resultLength)
        if (resultSub.includes('占0.0%')) {
          this.$errorMsg(resultSub)
          throw new Error(false)
        } else {
          this.$confirm(res.data, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async() => {
            this.finishLoading = true
            try {
              await endPurchaseOrder({ ids })
              this.$successMsg('完结入库成功')
              this.getList()
            } catch (error) {
              console.log(error)
            }
            this.finishLoading = false
          })
        }
      } catch (error) {
        console.log(error)
      }
      this.finishLoading = false
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 107 + '&url=' + importPurchaseUrl)
    },
    // 预申报单
    createShen() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      const ids = this.tableChoseList.map(item => item.id).toString()
			this.$confirm('确定生成选中对象？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
        await generateDeclareOrderCheck({ ids })
        this.$successMsg('生成预申报成功')
        setTimeout(() => {
          this.$router.push('/purchase/predeclarationEdit?purchaseIds=' + ids)
        }, 800)
        // this.$router.push('/purchase/predeclarationEdit?id=' + obj[1] + '&type=add')
				// const res = await generateDeclareOrder({ ids })
        // if (res.data.includes('生成预申报成功')) {
        //   this.$successMsg('生成预申报成功')
        //   setTimeout(() => {
        //     const obj = res.data.split(',')
        //     this.$router.push('/purchase/predeclarationEdit?id=' + obj[1] + '&type=add')
        //   }, 800)
        // } else {
        //   this.$errorMsg(res.data)
        // }
			})
    },
    // 中转仓入库
    purchaseInWarehouse() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      this.inWarehouseTime = ''
      this.transferWarehouse.show = true
    },
    // 确认中转仓入库
    async comfirmPurchaseInWarehouse() {
      if (!this.inWarehouseTime) {
        this.$errorMsg('至少选择入库时间')
        return false
      }
      const ids = this.tableChoseList.map(item => item.id).toString()
      this.transferWarehouseLoading = true
      try {
        await inWarehouse({ ids, inWarehouseDateStr: this.inWarehouseTime })
        this.$successMsg('操作成功')
        this.transferWarehouse.show = false
        this.getList()
      } catch (error) {
        console.log(error)
      }
      this.transferWarehouseLoading = false
    },
    // 导出
    exportFile() {
      if (this.tableData.total < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      let opt = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.ruleForm
      }
      if (this.tableChoseList.length > 0) {
        const ids = this.tableChoseList.map(item => item.id)
        opt = { ids }
      }
      this.$exportFile(exportPurchaseUrl, opt)
    },
    resetForm() {
      this.reset('ruleForm', () => {
        this.date = ''
        this.getList(1)
      })
    },
    // 转销售单
    toSale() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('请至少选择一条记录！')
        return false
      }
      this.salesOrderIds = this.tableChoseList.map(item => item.id).toString()
      this.salesOrdereVisible.show = true
    },
    // 生成融资代采
    async goRongzi() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      try {
        const ids = this.tableChoseList.map(item => item.id).toString()
        const res = await createFinancingOrderCheck({ ids })
        if (res.data && res.data.financingNos) {
          this.$confirm('该采购订单已有推送融资信息记录，是否确认重新触发推送新的代采订单信息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async() => {
            this.linkTo('/purchase/addFinanceOrder?ids=' + ids)
          })
        } else {
          this.linkTo('/purchase/addFinanceOrder?ids=' + ids)
        }
      } catch (error) {
        if (error && error.code) {
          this.$errorMsg(error.data)
        }
      }
    },
    // 创建采购SD单
    async createSD() {
      if (this.tableChoseList.length !== 1) {
        this.$errorMsg('请选择一条记录！')
        return false
      }
      const id = this.tableChoseList[0].id
      try {
        await createSdOrderCheck({ id })
        this.SdTargetId = id + ''
        this.sdVisible.show = true
      } catch (error) {
        if (error && error.code) {
          this.$errorMsg(error.data)
        }
        console.log(error)
      }
    },
    // 创建交易链路
    async toSaleStepBeforeCheck() {
      if (this.tableChoseList.length !== 1) {
        this.$errorMsg('请选择一条记录！')
        return false
      }
      const id = this.tableChoseList[0].id
      try {
        const res = await toSaleStepBeforeCheck({ id })
        if (res.data === 'false') {
          this.$errorMsg('采购订单状态必须为【已审核】【 已完结】')
          return false
        }
        this.linkTo('/purchase/procurementLink?id=' + id)
      } catch (error) {
        if (error && error.code) {
          this.$errorMsg(error.data)
        }
        console.log(error)
      }
    },
    // 复制
    copy() {
      if (this.tableChoseList.length !== 1) {
        this.$errorMsg('请选择一条记录！')
        return false
      }
      const id = this.tableChoseList[0].id
      this.linkTo('/purchase/purchaseOrderedit/add?id=' + id)
    },
    openLog(row) {
      this.filterData = { relCode: row.code }
      this.logVisible.show = true
    }
  }
}
</script>
<style lang="scss" scoped>
.change-lve{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.too-bx-last{
  width: 100%;
}
</style>
