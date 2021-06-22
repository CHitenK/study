<template>
  <!-- To-C暂估应收表详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <el-row :gutter="10" class="fs-14 clr-II mr-b-20">
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        平台：{{detail.storePlatformName || '- -'}}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        客户：{{detail.customerName || '- -'}}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        应收状态：{{detail.settlementStatusLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        店铺名称：{{detail.shopName || '- -'}}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        应收月份：{{detail.month || '- -'}}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        暂估币种：RMB
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 表格 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="暂估应收核销明细" name="1">
        <JFX-table :tableData="tableData"
                   :tableColumn="tableColumn"
                   @change="listToCTempReceiveCostItem">
          <template slot="settlementOriAmount" slot-scope="{row}">
            {{row.originalCurrency || ''}} {{row.settlementOriAmount || ''}}
          </template>
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="暂估费用核销明细" name="2">
        <JFX-table :tableData="feeTableData"
                   :tableColumn="feeColumn"
                   @change="listToCTempReceiveItem">
          <template slot="settlementOriCost" slot-scope="{row}">
            {{row.originalCurrency || ''}} {{row.settlementOriCost || ''}}
          </template>
        </JFX-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 表格 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import {
  detailToCTempReceiveBill,
  listToCTempReceiveCostItem,
  listToCTempReceiveItem
} from '@a/reportManage'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 详情数据
      detail: {},
      // 当前tabs页指向
      activeName: '1',
      // 暂估应收核销明细表格结构
      tableColumn: [
        { label: '外部订单号', prop: 'externalCode', width: '140', align: 'center', hide: true },
        { label: '系统订单号', prop: 'orderCode', minWidth: '140', align: 'center', hide: true },
        { label: '事业部', prop: 'buName', width: '120', align: 'center', hide: true },
        { label: '商品货号', prop: 'goodsNo', width: '140', align: 'center', hide: true },
        { label: '商品名称', prop: 'goodsName', minWidth: '150', align: 'center', hide: true },
        { label: '销售数量', prop: 'saleNum', width: '100', align: 'center', hide: true },
        { label: '暂估应收金额（RMB）', prop: 'temporaryRmbAmount', width: '150', align: 'center', hide: true },
        { label: '退款金额（RMB）', prop: 'refundAmount', width: '150', align: 'center', hide: true },
        { label: '平台结算货款（RMB）', prop: 'settlementRmbAmount', width: '150', align: 'center', hide: true },
        { label: '平台结算货款（原币）', slotTo: 'settlementOriAmount', width: '150', align: 'center', hide: true },
        { label: '结算标识', prop: 'settlementMarkLabel', width: '80', align: 'center', hide: true },
        { label: '结算日期', prop: 'settlementDate', width: '150', align: 'center', hide: true },
        { label: '结算单号', prop: 'settlementCode', width: '150', align: 'center', hide: true }
      ],
      // 暂估费用核销明细表格数据
      feeTableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      // 暂估费用核销明细表格结构
      feeColumn: [
        { label: '外部订单号', prop: 'externalCode', width: '140', align: 'center', hide: true },
        { label: '系统订单号', prop: 'orderCode', minWidth: '140', align: 'center', hide: true },
        { label: '事业部', prop: 'buName', width: '120', align: 'center', hide: true },
        { label: '商品货号', prop: 'goodsNo', width: '140', align: 'center', hide: true },
        { label: '商品名称', prop: 'goodsName', minWidth: '150', align: 'center', hide: true },
        { label: '系统费项名称', prop: 'projectName', width: '150', align: 'center', hide: true },
        { label: '平台费项名称', prop: 'platformProjectName', width: '150', align: 'center', hide: true },
        { label: '暂估费用金额（RMB）', prop: 'temporaryRmbCost', width: '150', align: 'center', hide: true },
        { label: '平台结算费用（RMB）', prop: 'settlementRmbCost', width: '150', align: 'center', hide: true },
        { label: '平台结算费用（原币）', slotTo: 'settlementOriCost', width: '150', align: 'center', hide: true },
        { label: '结算日期', prop: 'settlementDate', width: '150', align: 'center', hide: true },
        { label: '结算单号', prop: 'settlementCode', width: '120', align: 'center', hide: true },
        { label: '核销状态', prop: 'settlementMarkLabel', width: '80', align: 'center', hide: true }
      ]
    }
  },
  mounted() {
    this.init()
    this.listToCTempReceiveCostItem()
    this.listToCTempReceiveItem()
  },
  methods: {
    async init() {
      const { id } = this.$route.query
      try {
        // 获取详情
        const { data } = await detailToCTempReceiveBill({ id })
        this.detail = data
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 暂估应收核销明细
		async listToCTempReceiveItem(pageNum) {
      const { id } = this.$route.query
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await listToCTempReceiveItem({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          billId: id
        })
				this.tableData.list = data.list
        this.tableData.total = data.total
			} catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.tableData.loading = false
      }
    },
    // 暂估费用核销明细
		async listToCTempReceiveCostItem(pageNum) {
      const { id } = this.$route.query
      try {
        this.feeTableData.pageNum = pageNum || this.feeTableData.pageNum
        this.feeTableData.loading = true
				const { data } = await listToCTempReceiveCostItem({
          begin: (this.feeTableData.pageNum - 1) * this.feeTableData.pageSize,
          pageSize: this.feeTableData.pageSize || 10,
          billId: id
        })
				this.feeTableData.list = data.list
        this.feeTableData.total = data.total
			} catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.feeTableData.loading = false
      }
    }
  }
}
</script>
