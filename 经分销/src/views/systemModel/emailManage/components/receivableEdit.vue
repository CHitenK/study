<template>
  <div>
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'1100px'"
      :title="title"
      :btnAlign="'center'"
      top="6vh"
      >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" >
        <el-row  :gutter="10" class="fs-14 clr-II edit-bx">
          <el-col :span="8">
            <el-form-item label="公司：" prop="merchantId" >
              <el-select v-model="ruleForm.merchantId" placeholder="请选择" filterable clearable @change="getBuList" >
                <el-option v-for="item in merchantIdList"  :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="事业部：" prop="buId" >
              <el-select v-model="ruleForm.buId"  placeholder="请选择" filterable clearable>
                <el-option v-for="item in buList"  :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审核提醒类型：" prop="auditReminderType">
              <el-radio v-model="ruleForm.auditReminderType" label="1" @change="ruleForm.auditReminderOrg = ''">按角色</el-radio>
              <el-radio v-model="ruleForm.auditReminderType" label="2" @change="ruleForm.auditReminderOrg = ''">按用户</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="审核提醒对象：" prop="vikl" :rules="rules.commRule" v-if="ruleForm.auditReminderType === '2'" >
              <el-checkbox-group v-model="ruleForm.isBySpecificUser1">
                <el-checkbox label="1" >创建人</el-checkbox>
                <el-checkbox label="0">其他&nbsp;&nbsp;&nbsp;&nbsp;</el-checkbox>
              </el-checkbox-group>
              <el-select v-model="ruleForm.auditReminderOrg"  placeholder="请选择" filterable clearable multiple collapse-tags style="width: 300px">
                <el-option v-for="item in userList"  :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核提醒对象：" prop="vikl" :rules="rules.commRule" v-else>
              <el-select v-model="ruleForm.auditReminderOrg"  placeholder="请选择" filterable clearable multiple collapse-tags style="width: 300px">
                <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="核销提醒类型：" prop="voidReminderType" >
              <el-radio v-model="ruleForm.voidReminderType" label="1">按角色</el-radio>
              <el-radio v-model="ruleForm.voidReminderType" label="2">按用户</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="核销提醒对象：" prop="vikl" :rules="rules.commRule" v-if="ruleForm.veriReminderType === '2'" >
              <el-checkbox-group v-model="ruleForm.isBySpecificUser2">
                <el-checkbox label="1" >创建人</el-checkbox>
                <el-checkbox label="0">其他&nbsp;&nbsp;&nbsp;&nbsp;</el-checkbox>
              </el-checkbox-group>
              <el-select v-model="ruleForm.veriReminderOrg"  placeholder="请选择" filterable clearable multiple collapse-tags style="width: 300px">
                <el-option v-for="item in userList"  :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="核销提醒对象：" prop="vikl" :rules="rules.commRule" v-else>
              <el-select v-model="ruleForm.veriReminderOrg"  placeholder="请选择" filterable clearable multiple collapse-tags style="width: 300px">
                <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="作废审核提醒类型：" prop="voidReminderType" >
              <el-radio v-model="ruleForm.voidReminderType" label="1">按角色</el-radio>
              <el-radio v-model="ruleForm.voidReminderType" label="2">按用户</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="审核提醒对象：" prop="voidReminderOrg" :rules="rules.commRule" >
              <el-checkbox label="提交人" value="1">提交人</el-checkbox>
              <el-checkbox label="其他" value="0">其他&nbsp;&nbsp;&nbsp;&nbsp;</el-checkbox>
              <el-select v-model="ruleForm.voidReminderOrg"  placeholder="请选择" filterable clearable  >
                <el-option v-for="item in selectOpt.adjustmentType_sourceList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="盖章发票提醒类型：" prop="sealReminderType" >
              <el-radio v-model="ruleForm.sealReminderType" label="1">按角色</el-radio>
              <el-radio v-model="ruleForm.sealReminderType" label="2">按用户</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="提醒对象：" prop="isByDrawer" :rules="rules.commRule">
              <el-checkbox-group v-model="ruleForm.isByDrawer">
                <el-checkbox label="开票人" value="1">开票人</el-checkbox>
                <el-checkbox label="其他" value="0">其他&nbsp;&nbsp;&nbsp;&nbsp;</el-checkbox>
                <el-select v-model="ruleForm.sealReminderOrg"  placeholder="请选择" filterable clearable  >
                  <el-option v-for="item in selectOpt.adjustmentType_sourceList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审核完成提醒类型：" prop="auditCompleteReminderType" :rules="rules.commRule" >
              <el-radio v-model="ruleForm.auditCompleteReminderType" label="1">按角色</el-radio>
              <el-radio v-model="ruleForm.auditCompleteReminderType" label="2">按用户</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="提醒对象：" prop="isByCreater" :rules="rules.commRule">
              <el-checkbox-group v-model="ruleForm.acIsBySubmitor">
                <el-checkbox label="提交人" value="1">提交人</el-checkbox>
                <el-checkbox label="其他" value="0">其他&nbsp;&nbsp;&nbsp;&nbsp;</el-checkbox>
                <el-select v-model="ruleForm.auditCompleteReminderOrg"  placeholder="请选择" filterable clearable  >
                  <el-option v-for="item in selectOpt.adjustmentType_sourceList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="作废完成提醒类型：" prop="voidCompleteReminderType" :rules="rules.commRule">
              <el-radio v-model="ruleForm.voidCompleteReminderType" label="1">按角色</el-radio>
              <el-radio v-model="ruleForm.voidCompleteReminderType" label="2">按用户</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="提醒对象：" prop="isBySpecificUser1" :rules="rules.commRule">
              <el-checkbox-group v-model="ruleForm.vcIsBySubmitor">
                <el-checkbox label="提交人" v-model="ruleForm.isBySpecificUser1" value="1">提交人</el-checkbox>
                <el-checkbox label="其他" v-model="ruleForm.isBySpecificUser1" value="0">其他&nbsp;&nbsp;&nbsp;&nbsp;</el-checkbox>
                <el-select v-model="ruleForm.voidCompleteReminderOrg"  placeholder="请选择" filterable clearable  >
                  <el-option v-for="item in selectOpt.adjustmentType_sourceList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开票提醒类型：" prop="billingReminderType" :rules="rules.commRule" >
              <el-radio v-model="ruleForm.billingReminderType" label="1">按角色</el-radio>
              <el-radio v-model="ruleForm.billingReminderType" label="2">按用户</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="发票提醒对象：" prop="billingReminderOrg" :rules="rules.commRule" >
              <el-checkbox label="提交人" value="1">提交人</el-checkbox>
              <el-checkbox label="其他" value="0">其他&nbsp;&nbsp;&nbsp;&nbsp;</el-checkbox>
              <el-select v-model="ruleForm.billingReminderOrg"  placeholder="请选择" filterable clearable  >
                <el-option v-for="item in selectOpt.adjustmentType_sourceList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-Dialog>
  </div>
</template>
<script>
import commomMix from '@m/index'
import { receiveEmailConfigInit, merchantBuReltSelectBean, getRoleList, getUserList } from '@a/emailManage/index'
export default {
  mixins: [commomMix],
  props: {
    visible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    filterData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    editType: {
      type: String,
      default: '应收提醒新增'
    }
  },
  data() {
    return {
      compayId: '',
      companylist: [],
      innerVisible: false,
      parment: '',
      ruleForm: {
        merchantId: '',
        buId: '',
        // 审核提醒
        auditReminderOrg: '',
        auditReminderType: '',
        isBySpecificUser1: [],
        // 核销提醒类型
        veriReminderType: '',
        isBySpecificUser2: [],
        veriReminderOrg: '',
        // 核销提醒类型
        voidReminderType: '',
        voidReminderOrg: '',
        sealReminderType: '',
        isByDrawer: [],
        auditCompleteReminderType: '',
        auditCompleteReminderOrg: '',
        voidCompleteReminderType: '',
        vcIsBySubmitor: [],
        billingReminderType: '',
        billingReminderOrg: '',
        acIsBySubmitor: [],
        vikl: 21345
      },
      rules: {
        merchantId: {required: true, message: '公司不能为空', trigger: 'change'},
        buId: {required: true, message: '事业部不能为空', trigger: 'change'},
        auditReminderType: {required: true, message: '审核提醒类型不能为空', trigger: 'change'},
        veriReminderType: {required: true, message: '核销提醒类型不能为空', trigger: 'change'},
        veriReminderOrg: {required: true, message: '核销提醒对象不能为空', trigger: 'change'},
        voidReminderType: {required: true, message: '作废审核提醒类型不能为空', trigger: 'change'},
        sealReminderType: {required: true, message: '盖章发票提醒类型不能为空', trigger: 'change'},
        commRule: {required: true, message: '不能为空', trigger: 'change'}
      },
      title: '',
      merchantIdList: [],
      buList: [],
      roleList: [],
      userList: []
    }
  },
  mounted() {
    this.title = this.type === 'add' ? '应收提醒新增' : '应收提醒编辑'
    this.receiveEmailConfigInit()
    this.initList()
  },
  methods: {
    comfirm() {
      this.$refs['ruleForm'].validate(async(valid, porp, fifi) => {
        console.log(valid, porp)
        if (!valid) return false
      })
     // this.$emit('comfirm')
    },
    async receiveEmailConfigInit() {
      const res = await receiveEmailConfigInit()
      this.merchantIdList = res.data || []
    },
    // 获取事业部
    async getBuList(type) {
      const { merchantId } = this.ruleForm
      this.buList = []
      if (merchantId) {
        const res = await merchantBuReltSelectBean({ merchantId })
        this.buList = res.data || []
      }
      if (type !== 'init') this.ruleForm.buId = ''
    },
    // 获取用户列表
    async initList() {
      const res = await getRoleList()
      this.roleList = res.data || []
      const res1 = await getUserList()
      this.userList = res1.data || []
    }
  }
}
</script>
<style lang="scss" scoped>
.company-page{
  width: 100%;
  margin-bottom: 10px;
  min-height: 200px;
}
.fen-pei-bx{
  margin-top: -30px;
  border-top: solid 1px #eaeaea;
  border-bottom: solid 1px #eaeaea;
  height: 80px;
}
.dialog-footer{
  height: 30px;
  margin-top: -30px;
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
  width: 150px;
}
.edit-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
/deep/ .el-checkbox-group{
  display: inline-block;
}
</style>
