<template>
  <div class="page-bx bgc-w order-edit-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <el-form class="mr-t-20" :model="ruleForm" ref="ruleForm" :rules="rules" >
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="公司：" prop="merchantId" >
            <el-select v-model="ruleForm.merchantId" placeholder="请选择" filterable clearable @change="changeMerchantIdorReminderType" >
              <el-option v-for="item in selectOpt.merchant_list" :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="事业部：" prop="buId" >
            <el-select v-model.trim="ruleForm.buId" placeholder="请选择" clearable >
              <el-option v-for="item in selectOpt.buList" :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="提醒类型：" prop="reminderType" >
            <el-select v-model.trim="ruleForm.reminderType" placeholder="请选择" clearable   @change="changeMerchantIdorReminderType('reminderType')">
              <el-option v-for="item in reminderTypeList" :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="客商名称：" prop="customerId" >
            <el-select v-model.trim="ruleForm.customerId" placeholder="请选择" clearable filterable>
              <el-option v-for="item in selectOpt.kuhuList" :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="基准日期：" prop="baseDate" >
            <el-select v-model.trim="ruleForm.baseDate" placeholder="请选择"  clearable>
              <!-- <el-option v-for="item in baseDateList" :key="item.key" :label="item.value" :value="item.key"></el-option> -->
              <el-option value="1" v-if="ruleForm.reminderType === '2'" label="发票日期"></el-option>
              <el-option value="2" v-if="ruleForm.reminderType === '1'" label="上架日期"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="mr-t-20">
      <el-button type="primary" @click="choseNode">选择节点</el-button>
    </div>
    <div style="width: 50vw;min-width: 400px" class="mr-t-15">
      <!-- 表格 -->
      <JFX-table
        :tableData="{ list: tableDataList }"
        :showPagination="false"
      >
       <el-table-column align="center" min-width="120">
          <template slot="header">
            <span class="need">计划提醒节点</span>
          </template>
          <template slot-scope="scope">{{scope.row.nodeLabel}}</template>
       </el-table-column>
        <el-table-column prop="contNo" label="箱号" align="center" min-width="120">
          <template slot="header">
            <span class="need">计划节点时效</span>
          </template>
          <template slot-scope="scope">
            <JFX-Input v-model.trim="scope.row.nodeEffective" v-if="scope.row.chosed" :precision="0" placeholder="请输入" clearable />
          </template>
       </el-table-column>
       <el-table-column prop="contNo" label="箱号" align="center" min-width="120">
          <template slot="header">
            <span class="need">基准单位</span>
          </template>
          <template slot-scope="scope">
            <el-radio v-model="scope.row.benchmarkUnit" label="1">工作日</el-radio>
            <el-radio v-model="scope.row.benchmarkUnit" label="2">自然日</el-radio>
          </template>
       </el-table-column>
      </JFX-table>
      <!-- 表格 end-->
    </div>
    <div class="mr-t-30 flex-c-c">
      <el-button :loading="saveLoading" type="primary" @click="save">保 存</el-button>
      <el-button :loading="saveLoading" type="primary" @click="save('audi')">审 核</el-button>
      <el-button @click="closeTag">取 消</el-button>
    </div>
    <JFX-Dialog
    :visible.sync="visible"
    @comfirm="visible.show = false"
    :width="'400px'"
    :title="ruleForm.reminderType === '2' ? '付款提醒节点' : '收款提醒节点'"
    :btnAlign="'center'"
    top="20vh"
    >
      <JFX-table
        :tableData="{ list: tableDataList2 }"
        :showPagination="false"
      >
        <el-table-column label="勾选节点" width="100" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.chosed" @change="changeChosed(scope.row.node)"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="nodeLabel" label="计划提醒节点" align="center" min-width="140"></el-table-column>
      </JFX-table>
    </JFX-Dialog>
  </div>
</template>
<script>
import commomMix from '@m/index'
import { saveOrUpdateAccountingReminderConfig, auditAccountingReminderConfig } from '@a/deployrRemindManage/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        merchantId: '',
        buId: '',
        customerId: '',
        reminderType: '',
        baseDate: ''
      },
      rules: {
        merchantId: [{ required: true, message: '请选择公司', trigger: 'change' }],
        buId: [{ required: true, message: '请选择事业部', trigger: 'change' }],
        reminderType: [{ required: true, message: '请选择提醒类型', trigger: 'change' }],
        baseDate: { required: true, message: '请选择提基准日期', trigger: 'change' },
        customerId: { required: true, message: '请选择客商名称', trigger: 'change' }
      },
      // 醒类型 1-收款 2-付款
      reminderTypeList: [
        { key: '1', value: '收款' },
        { key: '2', value: '付款' }
      ],
      // 1-发票日期 2-上架日期
      baseDateList: [
        { key: '1', value: '发票日期' },
        { key: '2', value: '上架日期' }
      ],
      visible: { show: false },
      allList: [
        { chosed: false, node: '1', nodeLabel: '付款', nodeEffective: '', benchmarkUnit: '', benchmarkUnitLabel: '', reminderType: '2' },
        { chosed: false, node: '2', nodeLabel: '出账单', nodeEffective: '', benchmarkUnit: '', benchmarkUnitLabel: '', reminderType: '1' },
        { chosed: false, node: '3', nodeLabel: '账单确认', nodeEffective: '', benchmarkUnit: '', benchmarkUnitLabel: '', reminderType: '1' },
        { chosed: false, node: '4', nodeLabel: '开票', nodeEffective: '', benchmarkUnit: '', benchmarkUnitLabel: '', reminderType: '1' },
        { chosed: false, node: '5', nodeLabel: '回款', nodeEffective: '', benchmarkUnit: '', benchmarkUnitLabel: '', reminderType: '1' }
      ],
      saveLoading: false,
      submitBtnLoading: false
    }
  },
  computed: {
    tableDataList() {
      return this.allList.filter(item => item.chosed && item.reminderType === this.ruleForm.reminderType)
    },
    tableDataList2() {
      return this.allList.filter(item => item.reminderType === this.ruleForm.reminderType)
    }
  },
  mounted() {
    // 获取公司列表
    const userInfo = this.getUserInfo()
    if (userInfo.userType === '1') { // 平台管理用户 admin
      this.getSelectMerchantBean('merchant_list') // 获取该用户下的公司列表
    } else { // 商户
      // 当前用户的主体公司
      this.$set(this.selectOpt, `merchant_list`, [])
      this.selectOpt.merchant_list = [{ key: userInfo.merchantId, value: userInfo.merchantName }]
    }
  },
  methods: {
    // 修改供应商
    changeMerchantIdorReminderType(type) {
      this.ruleForm.customerId = ''
      delete this.selectOpt.kuhuList
      delete this.selectOpt.buList
      if (this.ruleForm.merchantId) {
        this.getBUSelectBean('buList', { merchantId: this.ruleForm.merchantId })
      }
      if (this.ruleForm.merchantId && this.ruleForm.reminderType) {
        // 1、提醒类型为付款时，根据选择的公司提供已关联已启用的供应商名称 2、提醒类型为收款时，根据选择的公司提供已关联已启用的客户名称
        // 收款
        if (this.ruleForm.reminderType === '1') this.getCustomerByMerchantId('kuhuList', { cusType: 1, merchantId: this.ruleForm.merchantId, begin: 0, pageSize: 10000 }, { 'key': 'id', 'value': 'name' }) // 获取客户列表
        // 付款
        if (this.ruleForm.reminderType === '2') this.getSupplierByMerchantId('kuhuList', { merchantId: this.ruleForm.merchantId }) // 获取供应商列表
      }
      // 改变类型
      // 1、提醒类型为付款时，可选项为上架日期 2、提醒类型为收款时，可选项为发票日期
      if (type === 'reminderType') {
        this.ruleForm.baseDate = ''
        this.allList.forEach(item => {
          item.chosed = false
          item.benchmarkUnit = ''
          item.nodeEffective = ''
        })
      }
    },
    choseNode() {
      if (!this.ruleForm.reminderType) {
        this.$errorMsg('请先选择提醒类型')
        return false
      }
      this.visible.show = true
    },
    // 保存 / 审核
    async save(type = 'save') {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (!valid) return false
        if (this.tableDataList.length < 1) {
          this.$errorMsg('请选择节点')
          return false
        }
        let flag = true
        const itemList = []
        for (let i = 0; i < this.tableDataList.length; i++) {
          const item = this.tableDataList[i]
          const tips = `表格第${i + 1}行,`
          if (!item.nodeEffective) {
            this.$errorMsg(`${tips}请输入计划节点时效`)
            flag = false
            break
          }
          if (!item.benchmarkUnit) {
            this.$errorMsg(`${tips}请选择基准单位`)
            flag = false
            break
          }
          const { benchmarkUnit, node, nodeLabel, nodeEffective } = item
          let benchmarkUnitLabel = ''
          if (benchmarkUnit === '1') benchmarkUnitLabel = '工作日'
          if (benchmarkUnit === '2') benchmarkUnitLabel = '自然日'
          itemList.push({ benchmarkUnit, benchmarkUnitLabel, node, nodeLabel, nodeEffective })
        }
        if (!flag) return false
        const gata = this.selectOpt.merchant_list.find(item => this.ruleForm.merchantId === item.key)
        const merchantName = gata.value
        const hata = this.selectOpt.buList.find(item => this.ruleForm.buId === item.key)
        const buName = hata.value
        const jata = this.selectOpt.kuhuList.find(item => this.ruleForm.customerId === item.key)
        const customerName = jata.value
        let baseDateLabel = ''
        if (this.ruleForm.baseDate === '1') baseDateLabel = '发票日期'
        if (this.ruleForm.baseDate === '2') baseDateLabel = '上架日期'
        const kata = this.reminderTypeList.find(item => this.ruleForm.reminderType === item.key)
        const reminderTypeLabel = kata.value
        this.saveLoading = true
        try {
          const opt = {
            token: sessionStorage.getItem('token'),
            ...this.ruleForm,
            merchantName,
            buName,
            baseDateLabel,
            customerName,
            reminderTypeLabel,
            itemList
          }
          const res = await saveOrUpdateAccountingReminderConfig(opt)
          // 执行审核
          if (type === 'audi') {
            await auditAccountingReminderConfig({ id: res.data })
          }
          // 成功执行
          this.$successMsg('操作成功')
          this.closeTag()
        } catch (error) {
          console.log(error)
        }
        this.saveLoading = false
      })
    },
    // 选中
    changeChosed(node) {
      this.allList.forEach(item => {
        if (item.node === node) {
          item.nodeEffective = ''
          item.benchmarkUnit = ''
          item.benchmarkUnitLabel = ''
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.image-preview{
  display: inline-block;
}
/deep/.order-edit-bx .el-form-item__label {
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
/deep/.textarea-con {
  display: flex;
  align-items: flex-start;
  .el-form-item__label{
    width: 120px;
  }
  .el-form-item__content {
    width: 630px;
  }
}
</style>
