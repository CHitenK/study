<template>
  <!-- 新建/编辑部门 -->
  <JFX-Dialog
    title="新建/编辑部门"
    closeBtnText="取 消"
    :width="'400px'"
    :top="'150px'"
    :showClose="true"
    :btnAlign="'center'"
		:visible="isVisible"
    :confirmBtnLoading="confirmBtnLoading"
    @comfirm="comfirm"
	>
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" class="form__container">
      <el-row>
        <el-col :span="24">
          <el-form-item label="部门编码：" prop="code">
            <el-input v-model.trim="ruleForm.code" placeholder="请输入" clearable :disabled="type === 'edit'" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="部门名称：" prop="name">
            <el-input v-model.trim="ruleForm.name" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
	</JFX-Dialog>
</template>
<script>
import {
  modifyDepartmentInfo,
  saveDepartmentInfo
} from '@a/companyFile'
export default {
  props: {
    isVisible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    data: {
      type: Object,
      default: () => {}
    },
    id: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      ruleForm: {
        code: '',
        name: ''
      },
      rules: {
        code: { required: true, message: '请输入部门编码', trigger: 'blur' },
        name: { required: true, message: '请输入部门名称', trigger: 'blur' }
      },
      confirmBtnLoading: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const { type, data } = this
      if (type === 'add') {
        this.$refs['ruleForm'].resetFields()
      } else {
        const { code, name } = data
        this.ruleForm.name = name
        this.ruleForm.code = code
      }
    },
    comfirm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          this.confirmBtnLoading = true
          const { type, id } = this
          try {
            if (type === 'add') {
              await saveDepartmentInfo({ ...this.ruleForm })
            } else {
              await modifyDepartmentInfo({ ...this.ruleForm, id })
            }
            this.$emit('comfirm')
            this.$successMsg('操作成功')
          } catch (error) {
            this.$errorMsg(error.message)
          } finally {
            this.confirmBtnLoading = false
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
