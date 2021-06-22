<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="基本信息" className="mr-t-15" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        调采购单号：{{detail.vordercode || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        CSR单号：{{detail.vdef7 || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        订单日期：{{detail.dorderdate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        公司：{{detail.merchantName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        品牌：{{detail.vdef1 || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        供应商：{{detail.custname || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        业务类型：{{detail.vdef13 || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        采购类型：{{detail.docname || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        收货地址：{{detail.adress || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建时间：{{detail.createDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        数据来源：{{detail.sourceLabel || '- -'}}
      </el-col>
    </el-row>
    <!-- title -->
    <div class="mr-t-10"></div>
    <JFX-table
      :tableData.sync="tableData"
      :showPagination="false"
      :show-summary="true"
    >
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
      <el-table-column label="厂商编码" align="center" width="150" >
        <template slot-scope="scope">{{scope.row.invbasdoc}}</template>
      </el-table-column>
      <el-table-column label="经销商编码" align="center" width="120" show-overflow-tooltip >
        <template slot-scope="scope">{{scope.row.cinvmecode}}</template>
      </el-table-column>
      <el-table-column label="商品名称" align="center" min-width="140" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.invname}}</template>
      </el-table-column>
      <el-table-column prop="vdef5" label="建议采购量" align="center" min-width="100" ></el-table-column>
      <el-table-column prop="nordernum" label="CSR确认量" align="center" min-width="100" ></el-table-column>
      <el-table-column label="建议零售价" align="center" min-width="100" >
        <template slot-scope="scope">{{scope.row.refsaleprice}}</template>
      </el-table-column>
      <el-table-column label="备注" align="center" min-width="100" show-overflow-tooltip >
        <template slot-scope="scope">{{scope.row.vmemo}}</template>
      </el-table-column>
    </JFX-table>
    <!-- title end -->
  </div>
</template>
<script>
import { toDetailsPage } from '@a/orealManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      tableData: {
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
      const res = await toDetailsPage({ id: query.id })
      this.detail = res.data.detail || {}
      this.tableData.list = res.data.itemList || []
    }
  }
}
</script>
