<template>
  <!-- 新增关区组件 -->
  <JFX-Dialog
    title="新增关区"
    closeBtnText="取 消"
    :width="'400px'"
    :top="'150px'"
    :showClose="true"
		:visible="visible"
    @comfirm="comfirm"
	>
    <el-form :model="baseForm" ref="baseForm" :rules="rules" class="form__container">
      <el-row>
        <el-col :span="24">
          <el-form-item label="关区代码：" prop="code">
            <el-input v-model.trim="baseForm.code" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="关区名称：" prop="name">
            <el-input v-model.trim="baseForm.name" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
	</JFX-Dialog>
</template>
<script>
import { addCustomsArea } from '@a/warehouseFile'
export default {
  props: {
    visible: { show: false }
  },
  data() {
    return {
      baseForm: {
        code: '',
        name: ''
      },
      rules: {
        code: { required: true, message: '请输入关区代码', trigger: 'blur' },
        name: { required: true, message: '请输入关区名称', trigger: 'blur' }
      },
      btnFlag: true
    }
  },
  mounted() {
  },
  methods: {
    comfirm() {
      this.$refs['baseForm'].validate(async(valid) => {
        if (valid) {
          if (!this.btnFlag) return false
          try {
            this.btnFlag = false
            await addCustomsArea({
              ...this.baseForm
            })
            this.$emit('comfirm')
            this.$successMsg('操作成功')
            this.btnFlag = true
          } catch (error) {
            this.btnFlag = true
            if (error.data) {
              return this.$errorMsg(error.data)
            }
            this.$errorMsg(error.message)
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.form__container {
  .el-form-item {
    padding-right: 30px;
    margin-bottom: 20px;
    display: flex;
    .el-form-item__label {
      width: 100px;
    }
    .el-form-item__content {
      flex: 1;
    }
  }
}
</style>
