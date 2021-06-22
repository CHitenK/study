<template>
  <!-- 新增关区组件 -->
  <JFX-Dialog
    title="新增税率"
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
          <el-form-item label="税率：" prop="rate">
            <el-input-number v-model.trim="baseForm.rate" :precision="2" v-max-spot="2" :controls="false" :min="0" :max="1" label="必填" style="width: 100%;"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
	</JFX-Dialog>
</template>
<script>
import { saveTariffRate } from '@a/companyFile'
export default {
  props: {
    visible: { show: false }
  },
  data() {
    return {
      baseForm: {
        rate: ''
      },
      rules: {
        rate: { required: true, message: '请输入税率', trigger: 'blur' }
      },
      btnFlag: true
    }
  },
  methods: {
    comfirm() {
      this.$refs['baseForm'].validate(async(valid) => {
        if (valid) {
          if (!this.btnFlag) return false
          try {
            this.btnFlag = false
            await saveTariffRate({ ...this.baseForm })
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
