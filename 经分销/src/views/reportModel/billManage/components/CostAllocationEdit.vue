<template>
  <!-- 编辑费项配置组件 -->
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
          <el-form-item label="所属层级：" prop="levelAdd">
            <el-select
              v-model="ruleForm.levelAdd"
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
          <el-form-item label="上级费项：" prop="parentProjectNameAdd">
            <el-select
              v-model="ruleForm.parentProjectNameAdd"
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
          <el-form-item label="本级费项名称：" prop="projectNameAdd">
            <el-input v-model="ruleForm.projectNameAdd" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="NC收支费项：" prop="receivePaymentSubjectAdd">
            <el-select
              v-model="ruleForm.receivePaymentSubjectAdd"
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
          <el-form-item label="主数据编码：" prop="inExpCodeAdd">
            <el-input v-model="ruleForm.inExpCodeAdd" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="适用类型：" prop="typeAdd">
            <el-select
              v-model="ruleForm.typeAdd"
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
        <el-col :span="24">
          <el-form-item label="适用客户：" prop="suitableCustomerAdd">
            <el-radio v-model="suitableCustomerAdd" label="1">通用</el-radio>
            <el-radio v-model="suitableCustomerAdd" label="2">指定客户</el-radio>
            <el-select
              v-model="ruleForm.customerIdAdd"
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
        <el-col :span="24">
          <el-form-item label="状态：" prop="statusAdd">
            <el-radio v-model="statusAdd" label="1">启用</el-radio>
            <el-radio v-model="statusAdd" label="0">禁用</el-radio>
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
        levelAdd: '',
        parentProjectNameAdd: '',
        projectNameAdd: '',
        receivePaymentSubjectAdd: '',
        inExpCodeAdd: '',
        typeAdd: '',
        suitableCustomerAdd: '',
        customerIdAdd: '',
        statusAdd: ''
      },
      rules: {
        levelAdd: [{ required: true, message: '请选择', trigger: 'blur' }],
        parentProjectNameAdd: [{ required: true, message: '请选择', trigger: 'blur' }],
        projectNameAdd: [{ required: true, message: '请输入', trigger: 'blur' }],
        receivePaymentSubjectAdd: [{ required: true, message: '请选择', trigger: 'blur' }],
        typeAdd: [{ required: true, message: '请选择', trigger: 'blur' }],
        suitableCustomerAdd: [{ required: true, message: '请选择', trigger: 'blur' }],
        statusAdd: [{ required: true, message: '请选择', trigger: 'blur' }]
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
