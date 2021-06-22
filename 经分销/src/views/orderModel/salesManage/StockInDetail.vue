<template>
  <!-- 上架入库单详情 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        上架入库单：{{detail.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        入仓仓库：{{detail.inDepotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        单据状态：{{detail.stateLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        销售订单号：{{detail.saleOrderCode || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        出仓仓库：{{detail.outDepotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        入库时间：{{detail.shelfDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        销售出库单：{{detail.saleOutCode || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        PO单号：{{detail.poNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        操作人：{{detail.operator || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        操作时间：{{detail.operatorDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        事业部：{{detail.buName || '- -'}}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 上架明细 -->
    <JFX-title title="上架明细" className="mr-t-10" />
    <JFX-table :tableData.sync="tableData"
               :showPagination="false">
      <el-table-column type="index"
                       align="center"
                       width="55"
                       label="序号"
      ></el-table-column>
      <el-table-column prop="inGoodsNo"
                       align="center"
                       label="商品货号"
                       width="100"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="barcode"
                       align="center"
                       label="商品条码"
                       width="130"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="commbarcode"
                       align="center"
                       label="标准条码"
                       width="130"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="inGoodsName"
                       align="center"
                       label="商品名称"
                       min-width="120"
      ></el-table-column>
      <el-table-column prop="normalNum"
                       align="center"
                       label="好品数量"
                       width="80"
      ></el-table-column>
      <el-table-column prop="damagedNum"
                       align="center"
                       label="坏品数量"
                       width="80"
      ></el-table-column>
      <el-table-column prop="batchNo"
                       align="center"
                       label="入库批次号"
                       width="130"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="productionDate"
                       align="center"
                       label="生产日期"
                       width="150"
      ></el-table-column>
      <el-table-column prop="overdueDate"
                       align="center"
                       label="失效日期"
                       width="150"
      ></el-table-column>
    </JFX-table>
    <!-- 上架明细 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import { saleShelfIdepotDetail } from '@a/salesManage/shelvesList.api'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 详情数据
      detail: {}
    }
  },
  activated() {
    this.getList()
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取详情数据
    async getList() {
      try {
        this.tableData.loading = true
        const { data } = await saleShelfIdepotDetail({ id: this.$route.query.id })
        this.detail = data.saleShelfIdepotDTO
        this.tableData = {
          list: data.itemList,
          loading: false
        }
      } catch (err) {
        this.tableData.loading = false
      }
    }
  }
}
</script>
