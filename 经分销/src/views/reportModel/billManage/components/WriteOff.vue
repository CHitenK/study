  <template>
  <!-- 核销组件 -->
  <JFX-Dialog
    title="核销"
    closeBtnText="取 消"
    :width="'800px'"
    :top="'80px'"
    :showClose="true"
		:visible.sync="isVisible"
    @comfirm="comfirm"
	>
    <el-row :gutter="10">
      <el-col :span="12" class="clr-II mr-b-20">
        应收账单号： YSZD00020001219
      </el-col>
      <el-col :span="12" class="clr-II mr-b-20">
        客户： 主数据测试企业1232+JFX
      </el-col>
      <el-col :span="12" class="clr-II mr-b-20">
        应收金额： CNY  1860
      </el-col>
      <el-col :span="12" class="clr-II mr-b-20">
        发票号码： HNFH21020009
      </el-col>
    </el-row>
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column align="center">
        <template slot="header">
          <span class="need">本期收款日期</span>
        </template>
        <template slot-scope="{row}">
          <el-input v-model="row.salePrice" placeholder="请输入" clearable />
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header">
          <span class="need">本期核销金额</span>
        </template>
        <template slot-scope="{row}">
          <el-input v-model="row.salePrice" placeholder="请输入" clearable />
        </template>
      </el-table-column>
       <el-table-column align="center" label="收款流水号">
          <template slot-scope="{row}">
            <el-input v-model="row.effectiveDate" placeholder="请输入" clearable />
          </template>
        </el-table-column>
      <el-table-column prop="receiveCode" align="center" min-width="80" label="核销人" />
      <el-table-column prop="currencyLabel" align="center" min-width="80" label="核销时间" />
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
