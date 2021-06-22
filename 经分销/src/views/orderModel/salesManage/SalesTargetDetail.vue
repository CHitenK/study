<template>
  <!-- 销售目标详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <el-row :gutter="10" class="fs-14 clr-II mr-b-20">
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        事业部： 元森泰事业部E
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        销售计划月份： 2020-11
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        计划维度： 销售类型
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList">
      <el-table-column prop="code" align="center" label="商品条码" />
      <el-table-column prop="outDepotName" align="center" label="商品名称" />
      <el-table-column prop="buName" align="center" label="标准品牌" />
      <el-table-column prop="merchantName" align="center" label="品类" />
      <el-table-column prop="poNo" align="center" label="购销" />
      <el-table-column prop="customerName" align="center" label="电商订单" />
    </JFX-table>
    <!-- 商品信息 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 表格数据
      tableData: {
        list: [{}],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  }
}
</script>
