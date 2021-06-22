<template>
  <!-- 新增关区组件 -->
  <JFX-Dialog
    title="新增平台品类"
    closeBtnText="取 消"
    :width="'600px'"
    :top="'150px'"
    :showClose="true"
		:visible="isVisible"
    @comfirm="comfirm"
	>
    <el-form :model="baseForm" ref="baseForm" :rules="rules" class="form__container">
      <el-row>
        <el-col :span="24">
          <el-form-item label="客户名称：" prop="customerId">
            <el-select v-model="baseForm.customerId"
                        placeholder="请选择"
                        filterable
                        clearable
                        style="width: 100%;"
                        :data-list="getCustomerSelectBean('customer_list')">
              <el-option
                v-for="item in selectOpt.customer_list"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="品类名称：" prop="name">
            <el-input v-model.trim="baseForm.name" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：" prop="remarks">
            <el-input v-model.trim="baseForm.remarks" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
	</JFX-Dialog>
</template>
<script>
import commomMix from '@m/index'
import {
  savePlatformCategoryConfig
} from '@a/brandManage/index'
export default {
  mixins: [commomMix],
  props: {
    isVisible: { show: false }
  },
  data() {
    return {
      baseForm: {
        customerId: '',
        customerName: '',
        name: '',
        remarks: ''
      },
      rules: {
        customerId: { required: true, message: '请选择客户名称', trigger: 'change' },
        name: { required: true, message: '请输入品类名称', trigger: 'blur' }
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
            const target = this.selectOpt.customer_list.find(item => item.key === this.baseForm.customerId)
            if (target) {
              this.baseForm.customerName = target.value
            }
            await savePlatformCategoryConfig({
              ...this.baseForm
            })
            this.$emit('comfirm')
            this.$successMsg('操作成功')
          } catch (error) {
            this.$errorMsg(error.message)
          } finally {
            this.btnFlag = true
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
