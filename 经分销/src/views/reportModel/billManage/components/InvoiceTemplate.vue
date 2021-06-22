  <template>
  <!-- 选择发票模板组件 -->
  <JFX-Dialog
    title="选择发票模板"
    closeBtnText="取 消"
    :width="'800px'"
    :top="'80px'"
    :showClose="true"
		:visible.sync="isVisible"
    @comfirm="comfirm"
	>
    <el-form :model="ruleForm" :rules="rules">
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="发票名称：" prop="name">
            <el-input v-model="ruleForm.name"
                      placeholder="请输入"
                      clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="name" align="center" min-width="80" label="发票模板名称" />
      <el-table-column prop="receiveCode" align="center" min-width="80" label="发票编码" />
      <el-table-column prop="currencyLabel" align="center" min-width="80" label="适用客户" />
    </JFX-table>
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
        name: ''
      },
      tableData: {
        list: [
          {name: '唯品模板'},
          {name: '嘉宝-非唯品发票模板'}
        ],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    // 提交表单
    comfirm() {
      if (!this.tableChoseList.length || this.tableChoseList.length > 1) {
        return this.$alertWarning('只能选择一个模块')
      }
      this.$emit('comfirm', this.tableChoseList[0].name)
    },
    // 拉取表格数据
		getList(pageNum) {
      const params = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.searchProps
      }
      console.log(params)
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
