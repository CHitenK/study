<template>
  <!-- 新建/编辑事业部 -->
  <JFX-Dialog
    title="确认放款"
    closeBtnText="取 消"
    :width="'700px'"
    :top="'150px'"
    :showClose="true"
    :btnAlign="'center'"
		:visible="isVisible"
    :confirmBtnLoading="confirmBtnLoading"
    confirmBtnText="确认放款"
    @comfirm="comfirm"
	>
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" class="form__container">
      <el-row>
        <el-col :span="24">
          <el-form-item label="赊销金额：" prop="code">
            HKD 23553.7
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="实收保证金：" prop="code">
            HKD 232
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="垫付金额：" prop="code">
            HKD 232
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="收款日期：" prop="name">
            <el-date-picker
              v-model="ruleForm.shipDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="起息日期：" prop="name">
            <el-date-picker
              v-model="ruleForm.shipDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：" prop="name">
            <el-input v-model.trim="ruleForm.name" placeholder="请输入" clearable style="width: 600px';" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="附件：" prop="name">
            <JFX-upload @success="successUpload" :url="action" :limit="10000" :multiple="false">
              <el-button id="sale-upload-btn" type="primary">上传文件</el-button>
            </JFX-upload>
          </el-form-item>
          <div v-for="item in attachmenList" :key="item.id" style="color: blue;padding: 0 0 20px 130px;" class="mr-t-10">
            <span @click="downloadAttachmen(item.attachmentUrl, item.attachmentName)" style="padding-right: 10px;cursor: pointer;">{{item.attachmentName}}</span>
            <span @click="delAttachmenItem(item.attachmentCode)" style="cursor: pointer;">删除</span>
          </div>
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
    filterData: {
      type: Object,
      default: () => {}
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
  padding: 0 20px;
  .el-form-item {
    padding-right: 30px;
    margin-bottom: 20px;
    display: flex;
    .el-form-item__label {
      width: 130px;
    }
    .el-form-item__content {
      width: 300px;
    }
  }
}
</style>
