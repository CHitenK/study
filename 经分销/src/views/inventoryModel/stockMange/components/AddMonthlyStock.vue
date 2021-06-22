<template>
  <!--  新增月结账单 组件  -->
  <div class="edit-bx">
    <JFX-Dialog
      title="新增月结账单"
      closeBtnText="取 消"
      :width="'750px'"
      :top="'80px'"
      :showClose="true"
      :visible.sync="visible"
      @comfirm="comfirm"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="仓库：" prop="depotId">
              <el-select
                v-model="ruleForm.depotId"
                placeholder="请选择"
                filterable
                clearable
                :data-list="getSelectList('adjustmentType_sourceList')"
              >
                <el-option
                  v-for="item in selectOpt.adjustmentType_sourceList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结转月份：" prop="month">
              <el-date-picker
                v-model="ruleForm.month"
                type="month"
                placeholder="请选择日期"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-Dialog>
  </div>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    visible: { show: false }
  },
  data() {
    return {
      ruleForm: {
        depotId: '',
        month: ''
      },
      rules: {
        depotId: [{ required: true, message: '请选择仓库', trigger: 'blur' }],
        month: [{ required: true, message: '请选择结转月份', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 提交表单
    comfirm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$successMsg('success')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.edit-bx {
  .el-form-item__label {
    width: 100px;
  }
}
</style>
