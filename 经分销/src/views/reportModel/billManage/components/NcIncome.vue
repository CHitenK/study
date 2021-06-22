<template>
  <!-- 新增/编辑NC收支费项组件 -->
  <div class="edit-bx">
    <JFX-Dialog
      closeBtnText="取 消"
      :title="title"
      :width="'550px'"
      :top="'80px'"
      :showClose="true"
      :visible.sync="visible"
      :beforeClose="beforeClose"
      :confirmBtnLoading="confirmBtnLoading"
      @comfirm="comfirm"
    >
      <!-- 表单部分 -->
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <el-form-item label="NC收支费项：" prop="name">
          <el-input v-model.trim="ruleForm.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="收支费项编码：" prop="code">
          <el-input v-model.trim="ruleForm.code" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="科目编码：" prop="subCode">
          <el-input v-model.trim="ruleForm.subCode" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="科目名称：" prop="subName">
          <el-input v-model.trim="ruleForm.subName" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <!-- 表单部分 end -->
    </JFX-Dialog>
  </div>
</template>
<script>
import {
  NcPayEditPage,
  saveNcPay,
  modifyNcPay
} from '@a/billManage'
export default {
  props: {
    visible: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: ''
    },
    id: {
      type: String | Number,
      default: ''
    },
    beforeClose: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      ruleForm: {
        name: '',
        code: '',
        subCode: '',
        subName: ''
      },
      rules: {
        name: { required: true, message: '请输入', trigger: 'blur' },
        code: { required: true, message: '请输入', trigger: 'blur' },
        subCode: { required: true, message: '请输入', trigger: 'blur' },
        subName: { required: true, message: '请输入', trigger: 'blur' }
      },
      confirmBtnLoading: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id } = this
      if (id) {
        const { data } = await NcPayEditPage({ id })
        for (const key in this.ruleForm) {
          this.ruleForm[key] = data[key] ? data[key].toString() : ''
        }
      }
    },
    comfirm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          const { id } = this
          try {
            this.confirmBtnLoading = true
            if (id) {
              modifyNcPay({ ...this.ruleForm, id })
            } else {
              saveNcPay({ ...this.ruleForm })
            }
            this.$successMsg('操作成功')
            this.$emit('comfirm', true)
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
/deep/.edit-bx {
  .el-form-item {
    display: flex;
    flex-wrap: wrap;
  }
  .el-form-item__label {
    width: 130px;
    text-align: right;
  }
  .el-form-item__content {
    flex: 1;
    padding-right: 40px;
  }
}
</style>
