<template>
  <!-- 上架单详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        上架单号：{{detail.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        销售订单号：{{detail.saleOrderCode || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        PO号：{{detail.poNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        客户：{{detail.customerName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        上架日期：{{detail.shelfDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        单据状态：{{detail.stateLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        上架人：{{detail.operator || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        创建时间：{{detail.createDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        出库单号：{{detail.saleOutDepotCode || '- -'}}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 上架明细 -->
    <JFX-title title="上架明细" className="mr-t-15" />
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
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="barcode"
                       align="center"
                       label="商品条码"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="commbarcode"
                       align="center"
                       label="标准条码"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="goodsName"
                       align="center"
                       label="商品名称"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="shelfNum"
                       align="center"
                       label="上架量"
                       width="80"
      ></el-table-column>
      <el-table-column prop="damagedNum"
                       align="center"
                       label="残损量"
                       width="80"
      ></el-table-column>
      <el-table-column prop="lackNum"
                       align="center"
                       label="少货量"
                       width="80"
      ></el-table-column>
      <el-table-column prop="remark"
                       align="center"
                       label="备注"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
    </JFX-table>
    <!-- 上架明细 end -->
    <div style="overflow: hidden;padding-right: 20px;">
      <span style="float: right;">上架总数：{{total}}</span>
    </div>
  </div>
</template>
<script>
import commomMix from '@m/index'
import { toDetailsPage } from '@a/salesManage/shelvesList.api'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 详情数据
      detail: {}
    }
  },
  computed: {
    total() {
      return this.tableData.list.reduce((pre, cur) => {
        pre += +cur.shelfNum
        pre += +cur.damagedNum
        pre += +cur.lackNum
        return pre
      }, 0)
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
        const { data } = await toDetailsPage({ id: this.$route.query.id })
        this.detail = data.shelfDTO
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
