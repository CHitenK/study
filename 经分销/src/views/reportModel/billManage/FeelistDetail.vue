<template>
  <!-- 平台费用单详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <el-row :gutter="10" class="fs-14 clr-II">
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        费用单号： FYD000000000660
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        事业部： 元森泰事业部E
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        账单号： SX-20201231-607997-P-016132
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        客户： 唯品会（中国）有限公司
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        费用项目： 客退补贴
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        费用类型： 扣款
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        结算币种： USD
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        单据状态： 已确认
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        单据来源： 爬虫账单
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        创建人： 系统生成
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        创建时间： 2021-01-08 18:25:29.0
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        确认人： 系统生成
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        确认时间： 2021-01-08 18:25:29.0
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        转账单人：
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        转账单时间：
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 费用明细 -->
    <JFX-title title="费用明细" className="mr-t-10" />
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList">
      <el-table-column prop="code" align="center" label="商品货号" />
      <el-table-column prop="name" align="center" label="平台SKU条码" />
      <el-table-column prop="name" align="center" label="商品名称" />
      <el-table-column prop="name" align="center" label="PO号" />
      <el-table-column prop="name" align="center" label="数量" />
      <el-table-column prop="name" align="center" label="结算金额" />
    </JFX-table>
    <!-- 费用明细 end -->
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
        {path: `/bill/feelistdetail/${this.$route.params.id}`, meta: { title: '平台费用单详情' }}
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
