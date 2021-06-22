<template>
  <!-- 预售勾稽详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        预售单号：{{detail.preSaleOrderCode}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        审核时间：{{detail.auditDate}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        审核人：{{detail.auditName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        客户：{{detail.customerName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        商品货号：{{detail.goodsNo}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        事业部：{{detail.buName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        公司：{{detail.merchantName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        商品条码：{{detail.barcode}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        商品名称：{{detail.goodsName}}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 预售库存信息 -->
    <JFX-title title="预售库存信息" className="mr-t-15" />
    <JFX-table :tableData.sync="tableData"
               :showPagination="false">
      <el-table-column prop="preNum"
                       align="center"
                       label="预售数量"
      ></el-table-column>
      <el-table-column prop="saleNum"
                       align="center"
                       label="销售数量">
        <template slot-scope="{row}">
          {{row.saleNum ? row.saleNum : 0}}
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="待销数量">
        <template slot-scope="{row}">
          {{row.preNum - row.saleNum}}
        </template>
      </el-table-column>
      <el-table-column prop="outNum"
                       align="center"
                       label="出库数量">
        <template slot-scope="{row}">
          {{row.outNum ? row.outNum : 0}}
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="预售余量">
        <template slot-scope="{row}">
          {{row.preNum - row.outNum}}
        </template>
      </el-table-column>
      <el-table-column prop="price"
                       align="center"
                       label="预售单价"
      ></el-table-column>
      <el-table-column prop="amount"
                       align="center"
                       label="预售总金额"
      ></el-table-column>
    </JFX-table>
    <!-- 预售库存信息 end -->
    <!-- 勾稽明细 -->
    <JFX-title title="勾稽明细" className="mr-t-15" />
    <JFX-table :tableData.sync="checkTableData"
               :showPagination="false">
      <el-table-column prop="saleOrderCode"
                       align="center"
                       label="销售订单"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="saleNum"
                       align="center"
                       label="销售数量"
                       width="80"
      ></el-table-column>
      <el-table-column prop="auditName"
                       align="center"
                       label="审核人"
                       width="100"
      ></el-table-column>
      <el-table-column prop="auditDate"
                       align="center"
                       label="审核时间"
                       width="150"
      ></el-table-column>
      <el-table-column prop="saleOutDepotCode"
                       align="center"
                       label="出库单号"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="outNum"
                       align="center"
                       label="出库量"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="outDepotDate"
                       align="center"
                       label="出库时间"
                       width="150"
      ></el-table-column>
    </JFX-table>
    <!-- 勾稽明细 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import { toDetailsPage } from '@a/salesManage/salesCrossCheck.api'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 详情的数据
      detail: {},
      // 表格数据
      checkTableData: {
        list: [],
        loading: false
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
    async getList() {
      const { code, goodsNo } = this.$route.query
      try {
        this.tableData.loading = true
        this.checkTableData.loading = true
				const { data } = await toDetailsPage({ code, goodsNo })
        this.detail = data.mainInfo
        this.tableData = {
          list: [data.mainInfo],
          loading: false
        }
        this.checkTableData = {
          list: data.details,
          loading: false
        }
			} catch (err) {
        this.tableData.loading = false
        this.checkTableData.loading = false
			}
    }
  }
}
</script>
