<template>
  <!-- 账单出库单详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 账单出库单详情 -->
    <JFX-title title="账单出库单详情" />
    <el-row :gutter="10" class="fs-14 clr-II detail-row">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        账单出库单号：{{detail.code || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        出仓仓库：{{detail.depotName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        平台账单号：{{detail.billCode || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        处理类型：{{detail.processingTypeLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        账单出库日期：{{detail.deliverDate || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        调整类型：{{detail.operateTypeLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        单据状态：{{detail.stateLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        结算币种：{{detail.currencyLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        账单来源：{{detail.billSourceLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        创建人：{{detail.creater || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        创建时间：{{detail.createDate || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        客户：{{detail.customerName || '- -'}}
      </el-col>
    </el-row>
    <!-- 账单出库单详情 end -->
    <!-- 出库商品信息 -->
    <JFX-title title="出库商品信息" />
    <el-tabs v-model="activeIndex" type="card">
      <el-tab-pane label="商品列表" name="goods">
        <JFX-table :tableData.sync="tableData"
                   @selection-change="selectionChange"
                   @change="getList">
          <el-table-column prop="goodsNo"
                           align="center"
                           label="商品货号"
                           width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="platformSku"
                           align="center"
                           label="平台SKU条码"
                           width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="commbarcode"
                           align="center"
                           label="标准条码"
                           width="140"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="goodsName"
                           align="center"
                           label="商品名称"
                           min-width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="poNo"
                           align="center"
                           label="PO号"
                           width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="num"
                           align="center"
                           label="数量"
                           width="80"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="price"
                           align="center"
                           label="结算单价"
                           width="80"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="amount"
                           align="center"
                           label="结算金额"
                           width="80"
                           show-overflow-tooltip
          ></el-table-column>
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="批次明细" name="batch">
        <JFX-table :tableData.sync="batchTableData"
                   @selection-change="selectionChange"
                   @change="getBatchList">
          <el-table-column prop="commbarcode"
                           align="center"
                           label="标准条码"
                           width="140"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="goodsName"
                           align="center"
                           label="商品名称"
                           show-overflow-tooltip
                           min-width="120"
          ></el-table-column>
          <el-table-column prop="goodsNo"
                           align="center"
                           label="商品货号"
                           width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="num"
                           align="center"
                           label="数量"
                           width="80"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="batchNo"
                           align="center"
                           label="批次号"
                           width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="productionDate"
                           align="center"
                           label="生产日期"
                           width="150"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="overdueDate"
                           align="center"
                           label="失效日期"
                           width="150"
                           show-overflow-tooltip
          ></el-table-column>
        </JFX-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  getBillOutinDepotDetail,
  listBillOutinDepotItem,
  listBillOutinDepotBatch
} from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      activeIndex: 'goods',
      // 详情数据
      detail: {},
      // 批次明细列表数据
      batchTableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const { id } = this.$route.query
      if (!id) return false
      const { data = {} } = await getBillOutinDepotDetail({ id })
      this.detail = data
      this.getList()
      this.getBatchList()
    },
    // 获取表格数据
		async getList() {
      const { id } = this.$route.query
      if (!id) return false
      try {
				this.tableData.loading = true
				const { data } = await listBillOutinDepotItem({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          outinDepotId: id
        })
				this.tableData.list = data.list
        this.tableData.total = data.total
			} catch (err) {}
      this.tableData.loading = false
		},
    // 获取批次明细列表数据
		async getBatchList() {
      const { id } = this.$route.query
      if (!id) return false
      try {
				this.batchTableData.loading = true
				const { data } = await listBillOutinDepotBatch({
          begin: (this.batchTableData.pageNum - 1) * this.batchTableData.pageSize,
          pageSize: this.batchTableData.pageSize || 10,
          outinDepotId: id
        })
				this.batchTableData.list = data.list
        this.batchTableData.total = data.total
			} catch (err) {}
      this.batchTableData.loading = false
		}
  }
}
</script>
