<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <el-tabs v-model="activeName" type="card" class="mr-t-20">
      <el-tab-pane label="汇总" name="1">
        <el-row type="flex" justify="center" class="clr-II fs-24 mr-b-20">2020年10月费用结算单</el-row>
        <el-row type="flex" justify="end" class="mr-b-20" style="color: #0000ff;">计费周期：2020-10-01至2020-10-31</el-row>
        <el-row class="clr-II" >
          <el-col :span="16" class="mr-b-20">结算对象： 广东卓志跨境电商供应链服务有限公司</el-col>
          <el-col :span="8" class="mr-b-20">仓库名称：</el-col>
          <el-col :span="16" class="mr-b-20">创建人： 刘克义</el-col>
          <el-col :span="8" class="mr-b-20">创建时间： 2020-11-19 17:57:53.0</el-col>
        </el-row>
        <CostAllocationTable :tableData="pureTableData" />
      </el-tab-pane>
      <el-tab-pane label="事业部分账" name="2">
        <el-row type="flex" justify="center" class="clr-II fs-24 mr-b-20">2020年10月费用结算单</el-row>
        <el-row type="flex" justify="end" class="mr-b-20" style="color: #0000ff;">计费周期：2020-10-01至2020-10-31</el-row>
        <el-row class="clr-II" >
          <el-col :span="16" class="mr-b-20">结算对象： 广东卓志跨境电商供应链服务有限公司</el-col>
          <el-col :span="8" class="mr-b-20">仓库名称：</el-col>
          <el-col :span="16" class="mr-b-20">创建人： 刘克义</el-col>
          <el-col :span="8" class="mr-b-20">创建时间： 2020-11-19 17:57:53.0</el-col>
        </el-row>
        <CostAllocationTable :tableData="pureTableData" />
        <CostAllocationTable :tableData="pureTableData" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CostAllocationTable from './components/CostAllocationTable'
export default {
  components: {
    CostAllocationTable
  },
  data() {
    return {
      // 面包屑数据
      breadcrumb: [
        {path: '', meta: { title: '账单管理' }},
        {path: '/bill/statementlist', meta: { title: '结算单列表' }},
        {path: `/bill/statementdetail/${this.$route.params.id}`, meta: { title: '结算单详情' }}
      ],
      pureTableData: {},
      activeName: '1'
    }
  }
}
</script>
