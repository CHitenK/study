<template>
  <!-- 客户采购单详情组件 -->
  <JFX-Dialog
    title="客户采购单详情"
    closeBtnText="取 消"
    :width="'1200px'"
    :top="'80px'"
    :showClose="true"
    :loading="loading"
		:visible="showDetail"
    @comfirm="comfirm"
	>
    <el-row :gutter="10" class="fs-12 clr-II detail-row mr-b-20">
      <el-col  class="mr-b-10" :span="8">
        PO号：{{detail.poNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :span="8">
        客户：{{detail.customerName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :span="8">
        下单时间：{{detail.orderTime || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :span="8">
        平台状态：{{detail.platformStatusLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :span="8">
        采购币种：{{detail.currencyLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :span="8">
        客户仓库：{{detail.platformDepotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :span="8">
        入库时间：{{detail.deliverDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :span="8">
        单据状态：{{detail.statusLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :span="8">
        提交人：{{detail.submitName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :span="8">
        转销人：{{detail.resaleName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :span="8">
        转销时间：{{detail.resaleDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :span="8">
        销售订单号：{{detail.saleCode || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :span="8">
        平台账号：{{detail.userCode || '- -'}}
      </el-col>
    </el-row>
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               @selection-change="selectionChange"
               @change="getList">
      <el-table-column prop="platformBarcode"
                       align="center"
                       label="条形码"
                       width="140"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="platformGoodsName"
                       align="center"
                       label="商品名称"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="num"
                       align="center"
                       label="采购数量"
                       width="80"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="price"
                       align="center"
                       label="单价"
                       width="80"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="amount"
                       align="center"
                       label="采购金额"
                       width="80"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="receiptOkNum"
                       align="center"
                       label="实收好品数"
                       width="90"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="receiptBadNum"
                       align="center"
                       label="实收坏品数"
                       width="90"
                       show-overflow-tooltip
      ></el-table-column>
    </JFX-table>
    <!-- 表格 end-->
	</JFX-Dialog>
</template>
<script>
import commomMix from '@m/index'
import {
  detailPlatformPurchaseOrder
} from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  props: {
    showDetail: {
      type: Object,
      default: () => {}
    },
    id: {
      type: String | Number,
      default: ''
    }
  },
  data() {
    return {
      // 详情数据
      detail: {},
      loading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const { id } = this
      if (!id) return false
      try {
        this.loading = true
        const { data } = await detailPlatformPurchaseOrder({ id: id + '' })
        this.detail = data || {}
        this.tableData.list = this.detail.itemList || []
      } finally {
        this.loading = false
      }
    },
    comfirm() {
      this.$emit('comfirm')
    }
  }
}
</script>
