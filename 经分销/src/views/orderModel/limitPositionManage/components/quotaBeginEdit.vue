<template>
  <!-- 客户额度配置 -->
  <div class="edit-bx">
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      :width="'840px'"
      :title="'期初配置'"
      :btnAlign="'center'"
      top="20vh"
      :showFooter="false"
      >
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="配置模块：" prop="quotaType" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.quotaType" placeholder="请选择" clearable :data-list="getSelectList('quotaconfig_quotaTypeList')" style="width: 200px;"  @change="getConfigList">
                  <el-option v-for="item in selectOpt.quotaconfig_quotaTypeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.buId" placeholder="请选择" clearable :data-list="getBUSelectBean('buList',  { merchantId: getUserInfo().merchantId })" style="width: 200px;" @change="getConfigList">
                  <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="配置对象：" prop="configObjectId" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.configObjectId" placeholder="请选择" filterable clearable style="width: 200px;">
                  <el-option v-for="item in configObjectList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="起初使用额度：" prop="periodQuota" class="search-panel-item fs-14 clr-II" >
                <JFX-Input v-model.trim="ruleForm.periodQuota" :precision="0" placeholder="请输入" style="width: 200px;" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="额度币种：" prop="currency" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.currency" placeholder="请选择" filterable clearable :data-list="getCurrencySelectBean('currencyList', { customerId: '' })" style="width: 200px;" >
                  <el-option v-for="item in selectOpt.currencyList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="期初日期：" prop="periodDate" class="search-panel-item fs-14 clr-II" >
                <el-date-picker
                  clearable
                  v-model="ruleForm.periodDate"
                  type="date"
                  value-format="yyyy-MM-dd 00:00:00"
                  style="width: 200px;"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="mr-t-20 flex-c-c">
            <el-button type="primary" @click="save" :loading="saveLoading" v-permission="'customerList_save'">保 存</el-button>
            <el-button type="primary" @click="submitForm" id="save_and_examine" :loading="saveLoading" v-permission="'customerList_audit'">审核</el-button>
            <el-button @click="visible.show=false" id="cancel_ret">取 消</el-button>
          </div>
          <div class="mr-t-30"></div>
      </el-form>
    </JFX-Dialog>
  </div>
</template>
<script>
import commomMix from '@m/index'
import { saveOrUpdateQuotaPeriodConfig, auditQuotaPeriodConfig, getQuotaSelectBeanByBuId } from '@a/limitPositionManage/index'
export default {
  mixins: [commomMix],
  props: {
    visible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    // 数据
    targetData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      ruleForm: {
        id: '',
        quotaType: '',
        quotaTypeLabel: '',
        buId: '',
        buName: '',
        configObjectId: '',
        configObjectName: '',
        periodQuota: '',
        periodDate: '',
        currency: ''
      },
      rules: {
        buId: { required: true, message: '请选择事业部', trigger: 'change' },
        quotaType: { required: true, message: '请选择配置模块', trigger: 'change' },
        configObjectId: { required: true, message: '请选择配置对象', trigger: 'change' },
        periodQuota: { required: true, message: '请输入起初使用额度', trigger: 'change' },
        periodDate: { required: true, message: '期初日期不能为空', trigger: 'change' },
        currency: { required: true, message: '额度币种不能为空', trigger: 'change' }
      },
      saveLoading: false,
      configObjectList: [],
      configId: ''
    }
  },
  mounted() {
    // 编辑
    if (this.targetData.id) {
      this.init()
    }
  },
  methods: {
    async init() {
      for (let key in this.ruleForm) {
        this.ruleForm[key] = this.targetData[key] ? this.targetData[key].toString() : ''
      }
      if (+this.ruleForm.quotaType === 2) this.ruleForm.configObjectId = this.ruleForm.configObjectId ? +this.ruleForm.configObjectId : ''
      this.getConfigList('init')
    },
    async save() {
      if (!this.ruleForm.quotaType) {
        this.$errorMsg('请选择配置模块!')
        return false
      }
      this.saveLoading = true
      const target = this.selectOpt.quotaconfig_quotaTypeList.find(item => +this.ruleForm.quotaType === +item.key) || {}
      this.ruleForm.quotaTypeLabel = target.value || ''
      const target1 = this.selectOpt.buList.find(item => +this.ruleForm.buId === +item.key) || {}
      this.ruleForm.buName = target1.value || ''
      const target2 = this.configObjectList.find(item => +this.ruleForm.configObjectId === +item.key) || {}
      this.ruleForm.configObjectName = target2.value || ''
      const opt = {
        ...this.ruleForm,
        id: this.configId || this.ruleForm.id || '',
        status: '0'
      }
      try {
        await saveOrUpdateQuotaPeriodConfig(opt)
        this.$successMsg('操作成功')
        this.$emit('close')
        this.visible.show = false
      } catch (error) {
        console.log(error)
      }
      this.saveLoading = false
    },
    // 审核
    submitForm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (!valid) return false
        this.saveLoading = true
        const target = this.selectOpt.quotaconfig_quotaTypeList.find(item => +this.ruleForm.quotaType === +item.key) || {}
        this.ruleForm.quotaTypeLabel = target.value || ''
        const target1 = this.selectOpt.buList.find(item => +this.ruleForm.buId === +item.key) || {}
        this.ruleForm.buName = target1.value || ''
        const target2 = this.configObjectList.find(item => +this.ruleForm.configObjectId === +item.key) || {}
        this.ruleForm.configObjectName = target2.value || ''
        const opt = {
          ...this.ruleForm,
          id: this.configId || this.ruleForm.id || ''
        }
        try {
          if (!this.configId) {
            const { data: { configId } } = await saveOrUpdateQuotaPeriodConfig(opt)
            this.configId = configId
          }
          await auditQuotaPeriodConfig({ id: this.ruleForm.id || this.configId })
          this.$successMsg('操作成功')
          this.$emit('close')
          this.visible.show = false
        } catch (error) {
          console.log(error)
        }
        this.saveLoading = false
        })
    },
    // 获取配置对象下拉
    async getConfigList(type) {
      const { buId, quotaType } = this.ruleForm
      this.configObjectList = []
      delete this.selectOpt.superiorParentBrandList
      delete this.selectOpt.kuhuList
      if (quotaType) {
        if (+quotaType === 1 && buId) { // 项目额度
          const res = await getQuotaSelectBeanByBuId({ buId })
          if (res.data) {
            res.data.forEach(item => {
              this.configObjectList.push({
                key: item.value,
                value: item.label
              })
            })
          }
        }
        if (+quotaType === 2) { // 客户额度
          await this.getCustomerByMerchantId('kuhuList', { cusType: 1, merchantId: this.getUserInfo().merchantId, begin: 0, pageSize: 10000 }, { 'key': 'id', 'value': 'name' })
          this.configObjectList = this.selectOpt.kuhuList || []
        }
      }
      if (type !== 'init') this.ruleForm.configObjectId = ''
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
    width: 150px;
    text-align: right;
  }
  .el-form-item__content {
    flex: 1;
    padding-right: 40px;
  }
}
</style>
