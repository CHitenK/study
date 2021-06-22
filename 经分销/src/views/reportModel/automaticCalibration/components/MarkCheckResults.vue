<template>
  <!-- 标识核对结果 -->
  <JFX-Dialog
    title="标识核对结果"
    closeBtnText="取 消"
    :width="'700px'"
    :top="'80px'"
    :showClose="true"
		:visible.sync="showDialog"
    @comfirm="comfirm"
	>
    <el-form :model="ruleForm" :rules="rules" ref="form" class="edit-bx">
      <el-row :gutter="10" class="page-view">
        <el-col :span="24">
          <el-form-item label="核对结果：" prop="checkResult1">
            <el-radio v-model="checkResult1" label="1">未对平</el-radio>
            <el-radio v-model="checkResult1" label="2">已对平</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="客户名称：" prop="remark1" >
            <el-input
              type="textarea"
              :rows="2"
              style="width: 500px"
              v-model="ruleForm.remark1"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
	</JFX-Dialog>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    showDialog: { show: false }
  },
  data() {
    return {
      ruleForm: {
        checkResult1: '',
        remark1: ''
      },
      rules: {checkResult1: [{ required: true, message: '请选择', trigger: 'blur' }]}
    }
  },
  methods: {
    // 提交表单
    comfirm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('comfirm')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page-view{
  width: 100%;
  margin-bottom: 10px;
}
/deep/.edit-bx .el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 120px;
}
/deep/.edit-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
</style>
