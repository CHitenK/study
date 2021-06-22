<template>
  <div class="page-bx bgc-w order-edit-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" :breadcrumb="breadcrumb" />
    <el-form class="mr-t-20" :model="ruleForm" ref="ruleForm" :rules="rules" >
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col :span="24" >
          <el-form-item label="模板类型：" prop="type" >
            <el-select style="width: 520px;" v-model="ruleForm.type" placeholder="请选择" filterable clearable :data-list="getSelectList('temp_typelist')" >
              <el-option v-for="item in selectOpt.temp_typelist"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="模板标题：" prop="title">
            <el-input style="width: 520px;" v-model="ruleForm.title" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="模板编码：" prop="code" >
            <el-input style="width: 520px;" v-model="ruleForm.code" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="适用类型：" prop="cusType" >
            <el-radio v-model="ruleForm.cusType" label="1">客户</el-radio>
            <el-radio v-model="ruleForm.cusType" label="2">供应商</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="跳转页面地址：" prop="toUrl">
            <el-input style="width: 520px;" v-model="ruleForm.toUrl" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="" prop="contentBody" >
            <tinymce v-model="ruleForm.contentBody" :height="480" :width="1000" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="mr-t-20"></div>
    <div class="mr-t-30 flex-c-c">
      <el-button type="primary" @click="submitForm" :loading="loading">保 存</el-button>
      <el-button @click="closeTag">取 消</el-button>
    </div>
  </div>
</template>
<script>
import { getDetailsById, saveOrModify } from '@a/templateManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    tinymce: () => import('@c/tinymce')
  },
  data() {
    return {
      breadcrumb: [{
        path: '', meta: { title: '模板管理' }
      },
      {
        path: '/template/exportTemplateList', meta: { title: '导出模版管理' }
      },
      {
        path: '', meta: { title: '模版编辑' }
      }],
      ruleForm: {
        type: '',
        title: '',
        code: '',
        cusType: '1',
        contentBody: '',
        toUrl: ''
      },
      rules: {
        type: [{ required: true, message: '请选择模板类型', trigger: 'change' }],
        title: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        cusType: { required: true, message: '请输入内容', trigger: 'change' }
      },
      id: '',
      loading: false
    }
  },
  mounted() {
    this.reset('ruleForm')
    this.id = ''
    this.loading = false
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const { query } = this.$route
      if (!query.id) return false
      this.id = query.id
      const res = await getDetailsById({ id: query.id })
      for (let key in this.ruleForm) {
        this.ruleForm[key] = res.data[key]
      }
    },
    submitForm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          this.loading = true
          const opt = {
            id: this.id,
            ...this.ruleForm
          }
          try {
            await saveOrModify(opt)
            this.$successMsg('保存成功')
            this.loading = false
            this.closeTag()
          } catch (error) {
            console.log(error)
          }
          this.loading = false
        }
      })
    }
  }
}
</script>
<style>
.order-edit-bx .el-form-item__label {
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
.edit-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
</style>
<style lang="scss" scoped>
.image-preview{
  display: inline-block;
}
</style>
