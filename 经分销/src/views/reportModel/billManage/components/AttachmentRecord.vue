<template>
  <!-- 应收总汇组件 -->
  <div class="page-bx bgc-w" style="padding-top: 0;">
    <!-- 附件列表 -->
    <JFX-title title="附件列表" />
    <JFX-upload @success="successUpload">
      <el-button type="primary" size="mini" >上传附件</el-button>
    </JFX-upload>
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column prop="merchantName" align="center" min-width="80" label="文件名称" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="文件类型" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="文件大小" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="上传时间" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="上传人员" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="操作" />
    </JFX-table>
    <!-- 附件列表 end -->
    <!-- 审批记录 -->
    <JFX-title title="审批记录" />
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column type="index" align="center" width="66" label="序号" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="审批类型" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="提交人" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="提交时间" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="提交备注" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="审批人" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="审批时间" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="审批结果" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="审批备注" />
    </JFX-table>
    <!-- 审批记录 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  margin-bottom: 40px;
  border: 1px solid #cbcbcb;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  color: #666;
  td {
    border-left: 1px solid #cbcbcb;
    border-bottom: 1px solid #cbcbcb;
    padding: 8px 0;
  }
}
</style>
