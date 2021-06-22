<template>
  <!-- 待引入客商列表详情页面 -->
  <div class="page-bx bgc-w" style="padding-top: 0;">
    <!-- NC信息 -->
    <JFX-title title="NC信息" className="mr-t-10" />
    <el-row  :gutter="10" class="fs-14 clr-II mr-b-20">
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        NC单据号：
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        NC单据状态： 未同步
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        NC同步时间：
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        NC同步人：
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        凭证编号：
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        凭证状态：
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        凭证名称：
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        凭证序号：
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        会计期间：
      </el-col>
    </el-row>
    <!-- NC信息 end -->
    <!-- 核销记录 -->
    <JFX-title title="核销记录" />
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column prop="merchantName" align="center" min-width="80" label="核销金额" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="结算币种" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="收款日期" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="收款流水号" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="核销时间" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="核销人" />
    </JFX-table>
    <!-- 核销记录 end -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 面包屑数据
      breadcrumb: [
        {path: '', meta: { title: '客商档案' }},
        {path: '/customer/introducedlist', meta: { title: '供应商列表' }},
        {path: `/customer/introduceddetail/${this.$route.params.id}`, meta: { title: '客商详情' }}
      ],
      // tabs标签页索引
      tabsCurrentIndex: 0
    }
  }
}
</script>
