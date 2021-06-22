<template>
  <!-- 客户新增/编辑页面 -->
  <div class="page-bx edit-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <el-form :model="baseForm" ref="baseForm">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="结算日期：" prop="name" :rules="rules.name">
            <el-date-picker
              clearable
              v-model="baseForm.date"
              type="month"
              value-format="yyyy-MM"
              placeholder="生效年月"
              style="width: 100%">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="事业部：" prop="nature" >
            <el-select
              v-model="baseForm.currency"
              placeholder="请选择"
              clearable
              filterable
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
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="运营类型：" prop="nature" >
            <el-select
              v-model="baseForm.currency"
              placeholder="请选择"
              clearable
              filterable
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
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="平台名称：" prop="nature" >
            <el-select
              v-model="baseForm.currency"
              placeholder="请选择"
              clearable
              filterable
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
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="店铺名称：" prop="nature" >
            <el-select
              v-model="baseForm.currency"
              placeholder="请选择"
              clearable
              filterable
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
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="结算币种：" prop="businessAddress" :rules="rules.businessAddress">
           <el-select
              v-model="baseForm.currency"
              placeholder="请选择"
              clearable
              filterable
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
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="客户：" prop="businessAddress" :rules="rules.businessAddress">
           <el-select
              v-model="baseForm.currency"
              placeholder="请选择"
              clearable
              filterable
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
          <el-form-item label="导入结算单：" prop="businessAddress" :rules="rules.businessAddress">
            <el-row type="flex">
              <JFX-upload @success="successUpload">
                <el-button type="primary">上传文件</el-button>
              </JFX-upload>
              <el-button type="text" style="margin-left: 4px;">通用模板下载</el-button>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 基本信息 end-->
    <div class="mr-t-30 flex-c-c">
      <el-button @click="handleSubmit" type="primary">保 存</el-button>
      <el-button @click="$router.go(-1)">取 消</el-button>
    </div>
  </div>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 面包屑数据
      breadcrumb: this.$route.params.id !== '01' ? [
        {path: '/customer/customerlist', meta: { title: '客户列表' }},
        {path: `/customer/customeredit/${this.$route.params.id}`, meta: { title: '客户编辑' }}
      ] : [
        {path: '/customer/customerlist', meta: { title: '客户列表' }},
        {path: '/customer/customeredit/01', meta: { title: '客户新增' }}
      ],
      // 基本信息
      baseForm: {
        name: '',
        simpleName: '',
        creditCode: '',
        orgCode: '',
        codeGrade: '',
        nature: '',
        chinaName: '',
        enSimpleName: '',
        enName: '',
        mainId: '',
        salesman: '',
        cityCode: '',
        companyAddr: '',
        businessAddress: '',
        enBusinessAddress: '',
        currency: '',
        type: '',
        operationScope: '',
        fax: '',
        email: '',
        remark: ''
      },
      // 表单规则
      rules: {
        name: [{ type: 'string', required: true, message: '请输入', trigger: 'blur' }],
        creditCode: [{ type: 'string', required: true, message: '请输入', trigger: 'blur' }],
        organizationCode: [{ type: 'string', required: true, message: '请输入', trigger: 'blur' }],
        mainId: [{ type: 'string', required: true, message: '请输入', trigger: 'blur' }],
        businessAddress: [{ type: 'string', required: true, message: '请输入', trigger: 'blur' }]
      },
      // 表格数据
      tableData: {
        list: [{}],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    // 拉取表格数据
		getList(pageNum) {
      const params = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.searchProps
      }
      console.log(params)
    },
    handleSubmit() {
      this.$refs['baseForm'].validate(valid => {
        if (valid) {
          this.$successMsg('success')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
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
