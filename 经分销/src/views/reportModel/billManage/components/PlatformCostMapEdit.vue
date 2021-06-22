<template>
  <!-- 编辑平台费用映射件 -->
  <JFX-Dialog
    :title="dialogTitle"
    closeBtnText="取 消"
    :width="'800px'"
    :top="'80px'"
    :showClose="true"
		:visible.sync="showDialog"
    @comfirm="comfirm"
	>
    <el-form :model="ruleForm" :rules="rules" ref="form" class="edit-bx">
      <el-row :gutter="10" class="page-view">
        <el-col :span="12">
          <el-form-item label="平台名称：" prop="storePlatformCodeEdit">
            <el-select
              v-model="ruleForm.storePlatformCodeEdit"
              placeholder="请选择"
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
          <el-form-item label="平台费项名称：" prop="nameEdit">
            <el-input v-model="ruleForm.nameEdit" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本级费项名称：" prop="settlementConfigIdEdit">
            <el-select
              v-model="ruleForm.settlementConfigIdEdit"
              placeholder="请选择"
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
          <el-form-item label="NC收支费项：" prop="ncPaymentIdEdit">
            <el-input v-model="ruleForm.ncPaymentIdEdit" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="状态：" prop="statusEdit">
            <el-radio v-model="statusEdit" label="1">启用</el-radio>
            <el-radio v-model="statusEdit" label="0">禁用</el-radio>
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
    showDialog: { show: false },
    dialogTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ruleForm: {
        storePlatformCodeEdit: '',
        nameEdit: '',
        settlementConfigIdEdit: '',
        ncPaymentIdEdit: '',
        statusEdit: ''
      },
      rules: {
        storePlatformCodeEdit: [{ required: true, message: '请选择', trigger: 'blur' }],
        nameEdit: [{ required: true, message: '请选择', trigger: 'blur' }],
        settlementConfigIdEdit: [{ required: true, message: '请输入', trigger: 'blur' }],
        statusEdit: [{ required: true, message: '请选择', trigger: 'blur' }]
      }
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
  width: 130px;
}
/deep/.edit-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
</style>
