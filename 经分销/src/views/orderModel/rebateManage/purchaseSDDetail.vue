<template>
  <!-- 待引入客商列表详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II mr-b-15 detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        公司： {{detail.merchantName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        事业部：{{detail.buName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        供应商：{{detail.supplierName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        生效时间：{{detail.effectiveTime}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        失效时间：{{detail.invalidTime}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        状态：{{detail.statusLabel}}
      </el-col>
    </el-row>
    <JFX-title title="单比例配置" className="mr-t-10" />
    <JFX-table :tableData.sync="tableData" :showPagination="false">
      <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
      <el-table-column prop="sdConfigName" label="SD类型" align="center"></el-table-column>
      <el-table-column prop="sdConfigSimpleName" label="简称" align="center" ></el-table-column>
      <el-table-column prop="proportion" label="比例" align="center">
        <template slot-scope="{row}">{{row.proportion ? (+row.proportion).toFixed(5) : 0}}</template>
      </el-table-column>
    </JFX-table>
    <JFX-title title="多比例配置" className="mr-t-10" />
    <JFX-table :tableData.sync="tableData1" :showPagination="false">
      <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
      <el-table-column prop="sdConfigName" label="SD类型" align="center" width="120"></el-table-column>
      <el-table-column prop="sdConfigSimpleName" label="简称" align="center" width="200"></el-table-column>
      <el-table-column prop="brandParent" label="标准品牌" align="center" width="200"></el-table-column>
      <el-table-column prop="commbarcode" label="标准条码" align="center" width="200"></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="proportion" label="比例" align="center" width="130">
        <template slot-scope="{row}">{{row.proportion ? (+row.proportion).toFixed(5) : 0}}</template>
      </el-table-column>
    </JFX-table>
  </div>
</template>
<script>
import { getEditOrCopyPageInfo } from '@a/rebateManage/index'
export default {
  data() {
    return {
      // tabs标签页索引
      tabsCurrentIndex: 0,
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      tableData1: {
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
      const res = await getEditOrCopyPageInfo({ id: query.id })
      const { detail, itemList } = res.data
      this.detail = detail || {}
      this.tableData1.list = itemList.filter(item => item.sdConfigSimpleType === '2')
      this.tableData.list = itemList.filter(item => item.sdConfigSimpleType === '1')
    }
  }
}
</script>
