<template>
  <!-- 新增关区组件 -->
  <JFX-Dialog
    title="销售SD类型配置"
    closeBtnText="取 消"
    :width="'50vw'"
    :top="'150px'"
    :showClose="true"
		:visible="isVisible"
    @comfirm="comfirm"
	>
    <el-form :model="baseForm" ref="baseForm" :rules="rules" class="form__container" v-loading="btnFlag">
      <el-row>
        <el-col :span="24">
          <el-form-item label="SD类型：" prop="sdType">
            <el-input v-model.trim="baseForm.sdType" placeholder="请输入" :disabled="!!baseForm.id" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="SD简称：" prop="sdTypeName">
            <el-input v-model.trim="baseForm.sdTypeName" placeholder="请输入"  :disabled="!!baseForm.id" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="映射费项：" prop="projectId">
            <el-select v-model="baseForm.projectId"
                        placeholder="请选择"
                        filterable
                        clearable
                        style="width: 100%;"
                        @change="changeProjectId"
                      >
              <el-option
                v-for="item in projectIdList"
                :key="item.paymentSubjectId"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="NC收支费项：" prop="paymentSubjectId">
            <el-input v-model.trim="baseForm.paymentSubjectName" clearable disabled />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="状态：" prop="status">
            <el-radio-group v-model="baseForm.status">
              <el-radio label="1">启用</el-radio>
              <el-radio label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
	</JFX-Dialog>
</template>
<script>
import commomMix from '@m/index'
import { getSettlementConfigBean } from '@a/receiveMoneyManage/index'
import { getNCSelectBean, saveSdSaleType } from '@a/rebateManage/index'
export default {
  mixins: [commomMix],
  props: {
    isVisible: function() {
      return { show: false }
    },
    targetData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      baseForm: {
        id: '',
        sdType: '',
        sdTypeName: '',
        projectId: '',
        projectName: '',
        paymentSubjectId: '',
        paymentSubjectName: '',
        status: '1'
      },
      rules: {
        status: { required: true, message: '请选择状态', trigger: 'change' },
        projectId: { required: true, message: '请选择映射费项', trigger: 'change' },
        sdType: { required: true, message: '请输入SD类型', trigger: 'blur' },
        sdTypeName: { required: true, message: '请输入SD简称', trigger: 'blur' }
      },
      btnFlag: false,
      projectIdList: []
    }
  },
  mounted() {
    this.getSettlementConfigBean()
    for (let key in this.baseForm) {
      this.baseForm[key] = this.targetData[key] ? this.targetData[key].toString() : ''
    }
  },
  methods: {
    comfirm() {
      this.$refs['baseForm'].validate(async(valid) => {
        if (valid) {
          if (this.btnFlag) return false
          this.btnFlag = true
          try {
            const target = this.projectIdList.find(item => item.value === this.baseForm.projectId) || {}
            this.baseForm.projectName = target.label || ''
            await saveSdSaleType({
              ...this.baseForm
            })
            this.$emit('close')
            this.$successMsg('操作成功')
            this.isVisible.show = false
          } catch (error) {
            this.$errorMsg(error.message)
          }
          this.btnFlag = false
        }
      })
    },
    // 获取映射费项下拉
    async getSettlementConfigBean() {
      const res = await getSettlementConfigBean({ level: 2, type: 1 })
      this.projectIdList = res.data || []
    },
    async changeProjectId() {
      const { projectId } = this.baseForm
      this.baseForm.paymentSubjectId = ''
      this.baseForm.paymentSubjectName = ''
      if (projectId) {
        const res = await getNCSelectBean({ id: projectId })
        this.baseForm.paymentSubjectId = res.data && res.data[0] ? res.data[0].value : ''
        this.baseForm.paymentSubjectName = res.data && res.data[0] ? res.data[0].label : ''
      }
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
      width: 120px;
    }
    .el-form-item__content {
      flex: 1;
    }
  }
}
</style>
