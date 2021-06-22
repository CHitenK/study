<template>
  <!-- 应收详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <el-tabs v-model="activeName" type="card" class="mr-t-20">
      <el-tab-pane label="应收总汇" name="1">
        <ReceivableSummary v-if="activeName === '1'" />
      </el-tab-pane>
      <el-tab-pane label="应收详情" name="2">
        <ReceivableDetail v-if="activeName === '2'" />
      </el-tab-pane>
      <el-tab-pane label="附件审批记录" name="3">
        <AttachmentRecord v-if="activeName === '3'" />
      </el-tab-pane>
      <el-tab-pane label="核销记录" name="4">
        <WriteOffRecord v-if="activeName === '4'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {
    // 应收总汇
    ReceivableSummary: () => import('./components/ReceivableSummary'),
    // 应收详情
    ReceivableDetail: () => import('./components/ReceivableDetail'),
    // 附件审批记录
    AttachmentRecord: () => import('./components/AttachmentRecord'),
    // 核销记录
    WriteOffRecord: () => import('./components/WriteOffRecord')
  },
  data() {
    return {
      // 面包屑数据
      breadcrumb: [
        {path: '', meta: { title: '账单管理' }},
        {path: '/bill/collectionverify', meta: { title: '应收账单列表' }},
        {path: `/bill/receivebilldetail/${this.$route.params.id}`, meta: { title: '应收详情' }}
      ],
      activeName: '1'
    }
  }
}
</script>
