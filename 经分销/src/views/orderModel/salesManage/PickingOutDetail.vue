<template>
  <!-- 电商订单详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 基础信息 -->
    <JFX-title title="基础信息" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        领料单号：{{detail.materialOrderCode || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        出仓仓库：{{detail.outDepotName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        领料出库单号：{{detail.code || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        客户：{{detail.customerName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        PO号：{{detail.poNo || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        单据状态：{{detail.statusLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        发货时间：{{detail.deliverDate || '- -'}}
      </el-col>
    </el-row>
    <!-- 基础信息 end -->
    <!-- 商品信息 -->
    <JFX-title title="商品信息" className="mr-t-15"></JFX-title>
    <JFX-table :tableData.sync="tableData"
               :showPagination="false">
      <el-table-column type="index"
                       align="center"
                       width="55"
                       label="序号"
      ></el-table-column>
      <el-table-column prop="goodsNo"
                       align="center"
                       label="商品货号"
                       width="150"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="goodsName"
                       align="center"
                       label="商品名称"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="barcode"
                       align="center"
                       label="商品条码"
                       width="150"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center"
                       label="数量"
                       width="80"
                       show-overflow-tooltip>
        <template slot-scope="{row}">
          {{row.transferNum + row.wornNum}}
        </template>
      </el-table-column>
      <el-table-column prop="transferNum"
                       align="center"
                       label="好品数量"
                       width="80"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="wornNum"
                       align="center"
                       label="坏品数量"
                       width="80"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="transferBatchNo"
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
      <el-table-column prop="tallyingUnitLabel"
                       align="center"
                       label="海外理货单位"
                       width="100"
                       show-overflow-tooltip
      ></el-table-column>
    </JFX-table>
    <!-- 商品信息 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import { detailMaterialOut } from '@a/salesManage'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 详情数据
      detail: {}
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const { id } = this.$route.query
      if (!id) return false
      const { data = {} } = await detailMaterialOut({ id })
      this.detail = data
      this.tableData.list = this.detail.itemList || []
    }
  }
}
</script>
