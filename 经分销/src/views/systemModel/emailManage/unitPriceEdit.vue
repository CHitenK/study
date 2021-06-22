<template>
    <div class="page-bx bgc-w edit-bx">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" >
        <!-- 面包屑 -->
       <JFX-Breadcrumb :showGoback="true" :breadcrumb="breadcrumb" />
        <!-- 面包屑 end -->
        <!-- title -->
        <JFX-title title="单价预警配置" className="mr-t-10" />
        <el-row  :gutter="10" class="fs-14 clr-II">
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="公司：" prop="merchantId" >
              <el-select v-model="ruleForm.customerId" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getSelectList('adjustmentType_sourceList')" >
                <el-option v-for="item in selectOpt.adjustmentType_sourceList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="事业部：" prop="buId" >
              <el-select v-model="ruleForm.buId" placeholder="请选择" clearable :data-list="getBUSelectBean('buList')" >
                <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="波动范围：" prop="advanceReminderDay" >
              <el-input v-model="ruleForm.advanceReminderDay" clearable style="width: 100%">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <JFX-title title="邮件提醒设置" className="mr-t-10" />
        <el-row  :gutter="10" class="fs-14 clr-II">
          <el-col class="mr-b-0" :span="24" >
            <el-form-item label="邮件主题：" prop="emailTitle" >
              <el-input v-model="ruleForm.emailTitle" clearable style="width: 700px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row  :gutter="10" class="fs-14 clr-II">
          <el-col class="mr-b-0" :span="24" >
            <el-form-item label="收件人邮箱：" prop="advanceReminderDay" >
              <el-button type="primary" :size="'small'" @click="linkTo('/email/unitPriceEdit/add')" >选择用户</el-button>
            </el-form-item>
            <el-input type="textarea" :rows="8" v-model="ruleForm.receiverEmail" clearable style="width: 700px; margin-left: 130px;"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div class="mr-t-30 flex-c-c">
        <el-button type="primary">保 存</el-button>
        <el-button>取 消</el-button>
      </div>
    </div>
</template>
<script>
import commomMix from '@m/index'
import choseProducts from '@c/choseProducts/index'
export default {
  mixins: [commomMix],
  components: {
    choseProducts
  },
  data() {
    return {
      breadcrumb: [{
        path: '', meta: { title: '邮件管理' }
      },
      {
        path: '/email/unitPriceList', meta: { title: '邮件提醒列表' }
      }],
      ruleForm: {
        merchantId: '',
        buId: '',
        advanceReminderDay: '',
        emailTitle: '',
        receiverEmail: ''
      },
      rules: {
        merchantId: [
          { required: true, message: '请选择公司', trigger: 'change' }
        ],
        customerId: [
          { required: true, message: '请选择供应商', trigger: 'change' }
        ],
        reminderType: [
          { required: true, message: '请选择提醒类型', trigger: 'change' }
        ],
        baseTimeType: [
          { required: true, message: '请选择基准时间', trigger: 'change' }
        ],
        advanceReminderDay: [
          { required: true, message: '请输入提前天数提醒', trigger: 'blur' }
        ],
        accountUnitType: [
          { required: true, message: '请选择账期单位', trigger: 'change' }
        ],
        reminderUnitType: [
          { required: true, message: '请选择提醒单位', trigger: 'change' }
        ],
        accountPeriodDay: [
          { required: true, message: '请输入付款账期', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    const { params, query } = this.$route
    this.type = params.type
    console.log(query)
    this.breadcrumb.push({path: '', meta: { title: this.type === 'add' ? '单价预警配置新增' : '单价预警配置编辑' }})
  },
  methods: {
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
