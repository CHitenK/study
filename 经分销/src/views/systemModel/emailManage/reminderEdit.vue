<template>
    <div class="page-bx bgc-w edit-bx">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" >
        <!-- 面包屑 -->
       <JFX-Breadcrumb :showGoback="true" />
        <!-- 面包屑 end -->
        <!-- title -->
        <JFX-title title="邮件提醒信息" className="mr-t-10" />
        <el-row  :gutter="10" class="fs-14 clr-II">
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="公司：" prop="merchantId" >
              <el-select v-model="ruleForm.merchantId" style="width: 100%" placeholder="请选择" filterable clearable @change="getSelectBeanBySupplier" disabled>
                <el-option v-for="item in merchantSelectBean"  :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="供应商：" prop="customerId" >
              <el-select v-model="ruleForm.customerId" style="width: 100%" placeholder="请选择" filterable clearable disabled>
                <el-option v-for="item in supplierList"  :key="item.key" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="提醒类型：" prop="reminderType" >
              <el-select v-model="ruleForm.reminderType" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getSelectList('emailConfig_reminderTypeList')" >
                <el-option v-for="item in selectOpt.emailConfig_reminderTypeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="基准时间：" prop="baseTimeType" >
              <el-select v-model="ruleForm.baseTimeType" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getSelectList('emailConfig_baseTimeTypeList')" >
                <el-option v-for="item in selectOpt.emailConfig_baseTimeTypeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="付款账期：" prop="accountPeriodDay" >
              <el-input v-model="ruleForm.accountPeriodDay" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="账期单位：" prop="accountUnitType" >
              <el-radio v-model="ruleForm.accountUnitType" label="1">自然日</el-radio>
              <el-radio v-model="ruleForm.accountUnitType" label="2">工作日</el-radio>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="提前天数提醒：" prop="advanceReminderDay" >
              <el-input v-model="ruleForm.advanceReminderDay" clearable style="width: 100%" placeholder="多个用英文逗号隔开"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="提醒单位：" prop="reminderUnitType" >
              <el-radio v-model="ruleForm.reminderUnitType" label="1">自然日</el-radio>
              <el-radio v-model="ruleForm.reminderUnitType" label="2">工作日</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="mr-t-30 flex-c-c">
        <el-button type="primary" @click="save" :loading="saveLoading">保 存</el-button>
        <el-button @click="closeTag">取 消</el-button>
      </div>
    </div>
</template>
<script>
import commomMix from '@m/index'
import { initList, getSelectBeanBySupplier, modifyEmail, emailDetail } from '@a/emailManage/index'
import choseProducts from '@c/choseProducts/index'
export default {
  mixins: [commomMix],
  components: {
    choseProducts
  },
  data() {
    return {
      ruleForm: {
        id: '',
        merchantId: '',
        customerId: '',
        reminderType: '',
        baseTimeType: '',
        accountPeriodDay: '',
        accountUnitType: '1',
        advanceReminderDay: '',
        reminderUnitType: '1'
      },
      rules: {
        merchantId: { required: true, message: '请选择公司', trigger: 'change' },
        customerId: { required: true, message: '请选择供应商', trigger: 'change' },
        reminderType: { required: true, message: '请选择提醒类型', trigger: 'change' },
        baseTimeType: { required: true, message: '请选择基准时间', trigger: 'change' },
        advanceReminderDay: { required: true, message: '请输入提前天数提醒', trigger: 'blur' },
        accountUnitType: { required: true, message: '请选择账期单位', trigger: 'change' },
        reminderUnitType: { required: true, message: '请选择提醒单位', trigger: 'change' },
        accountPeriodDay: { required: true, message: '请输入付款账期', trigger: 'blur' }
      },
      merchantSelectBean: [],
      supplierList: [],
      saveLoading: false
    }
  },
  mounted() {
    this.initSelect()
    this.init()
  },
  methods: {
    async init() {
      const { query } = this.$route
      if (!query.id) return false
      try {
        const res = await emailDetail({ id: query.id })
        for (let key in this.ruleForm) {
          this.ruleForm[key] = res.data[key] ? res.data[key].toString() : ''
        }
        this.getSelectBeanBySupplier('init')
      } catch (err) {
        console.log(err)
      }
    },
    async initSelect() {
      const res = await initList()
      const { merchantSelectBean } = res.data
      this.merchantSelectBean = merchantSelectBean || []
    },
    async getSelectBeanBySupplier(type) {
      const { merchantId } = this.ruleForm
      this.supplierList = []
      if (merchantId) {
        const res = await getSelectBeanBySupplier({ merchantId })
        this.supplierList = res.data || []
      }
      if (type !== 'init') {
        this.ruleForm.customerId = ''
      }
    },
    save() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (!valid) return false
        this.saveLoading = true
        const target = this.merchantSelectBean.find(item => +this.ruleForm.merchantId === +item.value) || {}
        const merchantName = target.label || ''
        const karget = this.supplierList.find(item => +this.ruleForm.customerId === +item.value) || {}
        const customerName = karget.label || ''
        const opt = {
          merchantName,
          customerName,
          ...this.ruleForm
        }
        try {
          await modifyEmail(opt)
          this.$successMsg('保存成功')
          this.closeTag()
        } catch (error) {
          console.log(error)
        }
        this.saveLoading = false
      })
    }
  }
}
</script>
<style>
.edit-bx .el-form-item__label {
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
.title-bx{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tongji-item{
  display: inline-block;
  width: 220px;
}
</style>
