<template>
  <!-- 事业部移库单详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        移库单号：{{detail.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        移入事业部：{{detail.inBuName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        移出事业部：{{detail.outBuName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
       移库仓库：{{detail.depotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        来源业务单号：{{detail.businessNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        创建时间：{{detail.createDate || '- -'}}
        </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        移库状态：{{detail.statusLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        创建人：{{detail.createName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        移库日期：{{detail.moveDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        移库币种：{{detail.currencyLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        协议币种：{{detail.agreementCurrencyLabel || '- -'}}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 商品信息 -->
    <JFX-title title="商品信息" className="mr-t-10" />
    <JFX-table :tableData.sync="tableData"
               @selection-change="selectionChange"
               @change="getList">
      <el-table-column prop="goodsNo"
                       align="center"
                       label="商品货号"
                       width="140"
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
                       width="140"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="num"
                       align="center"
                       label="销售数量"
                       width="100"
      ></el-table-column>
      <el-table-column prop="agreementPrice"
                       align="center"
                       label="协议单价"
                       width="100"
      ></el-table-column>
      <el-table-column prop="price"
                       align="center"
                       label="移库单价"
                       width="100"
      ></el-table-column>
      <el-table-column prop="amount"
                       align="center"
                       label="移库金额"
                       width="100"
      ></el-table-column>
      <el-table-column prop="rate"
                       align="center"
                       label="汇率"
                       width="100"
      ></el-table-column>
    </JFX-table>
    <!-- 商品信息 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import { getBuMoveInventoryDetail } from '@a/salesManage/index'
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
      const { data } = await getBuMoveInventoryDetail({ id })
      this.detail = data || {}
      this.tableData.list = this.detail.itemList || []
    }
  }
}
</script>
