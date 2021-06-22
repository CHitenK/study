<template>
   <!--  录入发票时间 组件  -->
  <JFX-Dialog
		:visible.sync="visible"
    :showClose="true"
    @comfirm="comfirm"
    :width="'600px'"
    :title="'录入付款时间'"
    :top="'80px'"
    closeBtnText="取 消"
    v-loading="loading"
		>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
      <el-row :gutter="10" class="page-view">
        <el-col :span="24">
          <el-form-item label="付款日期" prop="payDate">
            <el-date-picker
              v-model="ruleForm.payDate"
              type="date"
              style="width: 133%;"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label=" 支付人：" prop="payName">
            <el-input v-model="ruleForm.payName" placeholder="请输入内容" style="width: 140%;" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="上传附件：">
            <JFX-upload @success="successUpload" :url="url">
              <el-button type="primary" size="mini" >上 传</el-button><span class="clr-act"> {{filName}}</span>
            </JFX-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
	</JFX-Dialog>
</template>
<script>
import { attachmentUploadFiles } from '@a/base/index'
import { getBaseUrl } from '@u/tool'
import { updatePurchaseOrderInvoice } from '@a/purchaseManage/index'
export default {
  props: {
    visible: { show: false },
    filterData: {}
  },
  data() {
    return {
      ruleForm: {
        payDate: '',
        payName: '',
        tag: '2'
      },
      rules: {
        payDate: { required: true, message: '请选择付款日期', trigger: 'change' }
      },
      filName: '',
      loading: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      url: ''
    }
  },
  mounted() {
    this.url = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?code=' + this.filterData.code + '&token=' + sessionStorage.getItem('token')
  },
  methods: {
    comfirm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (!valid) return false
        if (!this.filName) {
          this.$errorMsg('请上传附件')
          return false
        }
        const opt = {
          id: this.filterData.id,
          ...this.ruleForm
        }
        this.loading = true
        try {
          await updatePurchaseOrderInvoice(opt)
          this.$successMsg('操作成功')
          this.$emit('comfirm')
          this.visible.show = false
        } catch (error) {
          console.log(error)
        }
        this.loading = false
      })
    },
    successUpload(res) {
      this.filName = ''
      if (+res.code === 10000) {
        this.$successMsg('上传成功')
        const { attachmentName } = res.data.attachmentInfo
        this.filName = attachmentName
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.page-view{
  width: 100%;
  margin-bottom: 10px;
}
.flex-l-c{
  display: flex;
  align-items: center;
}
</style>
