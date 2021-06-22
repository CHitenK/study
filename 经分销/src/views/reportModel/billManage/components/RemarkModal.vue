<template>
  <!-- 回款备注组件 -->
  <JFX-Dialog
    title="回款备注"
    closeBtnText="取 消"
    :width="'800px'"
    :top="'80px'"
    :showClose="true"
		:visible.sync="remarkModalVisible"
    @comfirm="comfirm"
	>
    <!-- 表单 -->
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
      <el-form-item label="添加备注：" prop="notes">
        <el-input
          type="textarea"
          v-model="ruleForm.notes"
          :rows="5"
          placeholder="请输入内容"
        />
      </el-form-item>
    </el-form>
    <!-- 表单 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               :showPagination="false">
    </JFX-table>
    <!-- 表格 end-->
	</JFX-Dialog>
</template>
<script>
import commomMix from '@m/index'
import {
  saveNotes,
  toNotesPage
} from '@a/reportManage'
export default {
  mixins: [commomMix],
  props: {
    remarkModalVisible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    receiveCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ruleForm: {
        notes: ''
      },
      rules: {
        notes: { required: true, message: '请输入备注内容', trigger: 'blur' }
      },
      // 表格列数据
      tableColumn: [
        { label: '备注人', prop: 'notesName', width: '120', align: 'center', hide: true },
        { label: '备注时间', prop: 'createDate', width: '150', align: 'center', hide: true },
        { label: '备注信息', prop: 'notes', minWidth: '120', align: 'center', hide: true }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { receiveCode } = this
      try {
        const { data: list = [] } = await toNotesPage({ receiveCode })
        this.tableData.list = list
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 提交表单
    comfirm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          const { receiveCode } = this
          const { notes } = this.ruleForm
          try {
            await saveNotes({ receiveCode, notes })
            this.$successMsg('操作成功')
            this.$emit('comfirm')
          } catch (error) {
            this.$errorMsg(error.message)
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-form-item {
 display: flex;
 flex-wrap: wrap;
 .el-form-item__label {
   width: 100%;
   text-align: left;
 }
 .el-form-item__content {
   flex: 1;
 }
}
</style>
