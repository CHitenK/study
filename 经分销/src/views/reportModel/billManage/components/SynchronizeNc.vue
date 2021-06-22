<template>
  <!-- 同步NC应收组件 -->
  <JFX-Dialog
    title="同步确认"
    closeBtnText="取 消"
    :width="'800px'"
    :top="'80px'"
    :showClose="true"
		:visible.sync="isVisible"
    @comfirm="comfirm"
	>
    <div>确认将本次开票应收信息同步至NC：</div>
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column prop="receiveCode" align="center" min-width="80" label="账单编号" />
      <el-table-column prop="currencyLabel" align="center" min-width="80" label="事业部" />
      <el-table-column prop="currencyLabel" align="center" min-width="80" label="结算类型" />
      <el-table-column prop="currencyLabel" align="center" min-width="80" label="销售模式" />
      <el-table-column prop="currencyLabel" align="center" min-width="80" label="渠道" />
      <el-table-column prop="currencyLabel" align="center" min-width="80" label="品牌" />
      <el-table-column prop="currencyLabel" align="center" min-width="80" label="收支项目名称" />
      <el-table-column prop="currencyLabel" align="center" min-width="80" label="应收金额" />
    </JFX-table>
    <!-- 表格 end -->
    <JFX-upload @success="successUpload">
      <el-button type="primary" size="medium" >附件上传</el-button>
    </JFX-upload>
	</JFX-Dialog>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    isVisible: { show: false }
  },
  data() {
    return {
      ruleForm: {
        remark: ''
      },
      rules: {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 提交表单
    comfirm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$emit('comfirm')
        }
      })
    },
    // 拉取表格数据
		getList(pageNum) {
      const params = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.searchProps
      }
      console.log(params)
      this.tableData.loading = true
      setTimeout(() => {
        this.tableData = {
          list: [{}],
          loading: false,
          pageNum: 1,
          total: 11,
          pageSize: 10
        }
      }, 500)
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-form-item {
 display: flex;
 align-items: flex-start;
 .el-form-item__label {
   width: 100px;
 }
 .el-form-item__content {
   flex: 1;
 }
}
</style>
