<template>
  <!-- 平台结算单详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <el-row :gutter="10" class="fs-14 clr-II mr-b-20">
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        平台结算单号： SX-20201221-607997-P-016950
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        账单月份： 2020-12
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        客户： VIPSHOP INTERNATIONAL HOLDINGS LIMITED
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        账单金额： 179374.820
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        结算币种： USD
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        是否已开票： 否
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        开票人： 开发专用
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        开票日期： 2020-12-24 10:06:26.0
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 账单信息 -->
    <JFX-title title="账单信息" className="mr-t-10" />
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList">
      <el-table-column prop="code" align="center" label="类型" />
      <el-table-column prop="name" align="center" label="PO号" />
      <el-table-column prop="name" align="center" label="商品条码" />
      <el-table-column prop="name" align="center" label="商品名称" />
      <el-table-column prop="name" align="center" label="标准品牌" />
      <el-table-column prop="name" align="center" label="结算数量" />
      <el-table-column prop="name" align="center" label="结算金额" />
    </JFX-table>
    <!-- 账单信息 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 面包屑数据
      breadcrumb: [
        {path: '', meta: { title: '账单管理' }},
        {path: '/bill/statementplatform', meta: { title: '平台结算单' }},
        {path: `/bill/platformdetail/${this.$route.params.id}`, meta: { title: '平台结算单详情' }}
      ],
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 11
      }
    }
  }
}
</script>
