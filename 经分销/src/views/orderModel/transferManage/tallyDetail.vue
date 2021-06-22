<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="理货单据详情" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        理货单据状态：{{detail.stateLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        理货单号：{{detail.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        仓库名称：{{detail.depotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        合同号：{{detail.contractNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        理货时间：{{detail.tallyingDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        确认人：{{detail.confirmUserName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        确认时间：{{detail.confirmDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建时间：{{detail.createDate || '- -'}}
      </el-col>
    </el-row>
    <div class="mr-t-10"></div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="商品列表" name="first">
        <div class="mr-t-10"></div>
        <JFX-table
          :tableData.sync="tableData1"
          :showPagination="false"
        >
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="goodsNo" label="商品货号" align="center" min-width="180"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="barcode" label="商品条形码" align="center" min-width="180"></el-table-column>
          <el-table-column prop="purchaseNum" label="申报数量" align="center" min-width="180"></el-table-column>
          <el-table-column prop="tallyingNum" label="理货数量" align="center" min-width="180"></el-table-column>
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="批次明细" name="second">
        <div class="mr-t-10"></div>
        <JFX-table
          :tableData.sync="tableData2"
          :showPagination="false"
        >
          <el-table-column type="index" label="序号" align="center" min-width="50" fixed="left"></el-table-column>
          <el-table-column prop="goodsNo" label="商品货号" align="center" min-width="120" fixed="left"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="batchNo" label="批次号" align="center" min-width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="productionDateStr" label="生产日期" align="center" min-width="90"></el-table-column>
          <el-table-column prop="overdueDateStr" label="效期至" align="center"  min-width="90"></el-table-column>
          <el-table-column prop="wornNum" label="损货数量" align="center" min-width="80"></el-table-column>
          <el-table-column prop="expireNum" label="过期数量" align="center" min-width="80"></el-table-column>
          <el-table-column prop="normalNum" label="正常数量" align="center" min-width="80"></el-table-column>
          <el-table-column prop="grossWeight" label="毛重" align="center" min-width="80"></el-table-column>
          <el-table-column prop="netWeight" label="净重" align="center" min-width="80"></el-table-column>
          <el-table-column prop="volume" label="体积" align="center" min-width="100"></el-table-column>
          <el-table-column prop="length" label="长" align="center" min-width="80"></el-table-column>
          <el-table-column prop="width" label="宽" align="center" min-width="80"></el-table-column>
          <el-table-column prop="height" label="高" align="center" min-width="80"></el-table-column>
        </JFX-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getTallyDetail } from '@a/transferManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      activeName: 'first',
      tableData1: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      tableData2: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      detail: {}
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const { query } = this.$route
      if (!query.id) return false
      const res = await getTallyDetail({ id: query.id, token: sessionStorage.getItem('token') })
      this.detail = res.data || {}
      this.tableData1.list = this.detail.itemList || []
      this.tableData2.list = this.detail.batchList || []
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
