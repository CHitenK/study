  <template>
  <!-- 申请作废组件 -->
  <JFX-Dialog
    title="应收作废申请"
    closeBtnText="取 消"
    :width="'800px'"
    :top="'80px'"
    :showClose="true"
		:visible.sync="isVisible"
    @comfirm="comfirm"
	>
    <div style="color: blue;">查询该发票号关联对应一下应收单，请确认是否提交应收作废：</div>
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="receiveCode" align="center" min-width="80" label="应收单号" />
      <el-table-column prop="receiveCode" align="center" min-width="80" label="事业部" />
      <el-table-column prop="currencyLabel" align="center" min-width="80" label="应收金额" />
    </JFX-table>
    <!-- 表格 end -->
    <el-form :model="ruleForm" :rules="rules">
      <el-form-item label="作废原因：" prop="relCode">
        <el-input
          type="textarea"
          v-model="ruleForm.relCode"
          placeholder="请输入"
          :autosize="{ minRows: 5, maxRows: 10}"
          clearable
        />
      </el-form-item>
    </el-form>
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
