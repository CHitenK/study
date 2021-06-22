<template>
  <!-- 客户额度配置 -->
  <div class="edit-bx">
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      :width="'840px'"
      :title="'额度配置'"
      :btnAlign="'center'"
      top="20vh"
      :showFooter="false"
      >
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.buId" placeholder="请选择" clearable :data-list="getBUSelectBean('buList',  { merchantId: getUserInfo().merchantId })" style="width: 200px;">
                  <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户：" prop="customerId" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.customerId" placeholder="请选择" filterable clearable :data-list="getCustomerByMerchantId('kuhuList', { cusType: 1, merchantId: getUserInfo().merchantId, begin: 0, pageSize: 10000 }, { 'key': 'id', 'value': 'name' })"  style="width: 200px;">
                  <el-option v-for="item in selectOpt.kuhuList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户额度：" prop="customerQuota" class="search-panel-item fs-14 clr-II" >
                <JFX-Input v-model.trim="ruleForm.customerQuota" :precision="0" placeholder="请输入" style="width: 200px;" clearable />
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
              <el-form-item label="生效日期：" prop="effectiveDate" class="search-panel-item fs-14 clr-II" >
                <el-date-picker
                  clearable
                  v-model="ruleForm.effectiveDate"
                  type="date"
                  value-format="yyyy-MM-dd 00:00:00"
                  style="width: 200px;"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="失效日期：" prop="expirationDate" class="search-panel-item fs-14 clr-II" >
                <el-date-picker
                  clearable
                  v-model="ruleForm.expirationDate"
                  type="date"
                  value-format="yyyy-MM-dd 23:59:59"
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
import { saveCustomerQuotaConfigDTO, auditCustomerQuotaConfigDTO } from '@a/limitPositionManage/index'
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
        buId: '',
        customerId: '',
        customerQuota: '',
        effectiveDate: '',
        expirationDate: '',
        currency: ''
      },
      rules: {
        buId: { required: true, message: '请选择事业部', trigger: 'change' },
        customerId: { required: true, message: '请选择客户', trigger: 'change' },
        customerQuota: { required: true, message: '请输入客户额度', trigger: 'change' },
        effectiveDate: { required: true, message: '生效日期不能为空', trigger: 'change' },
        expirationDate: { required: true, message: '失效日期不能为空', trigger: 'change' },
        currency: { required: true, message: '额度币种不能为空', trigger: 'change' }
      },
      saveLoading: false
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
    },
    async save() {
      if (!this.ruleForm.buId) {
        this.$errorMsg('请选择事业部!')
        return false
      }
      if (this.ruleForm.effectiveDate && this.ruleForm.expirationDate) {
        const start = this.ruleForm.effectiveDate.substring(0, 10).replace(/-/, '')
        const end = this.ruleForm.expirationDate.substring(0, 10).replace(/-/, '')
        if (end < start) {
          this.$errorMsg('失效日期不能小于生效日期!')
          return false
        }
      }
      this.saveLoading = true
      const opt = {
        ...this.ruleForm
      }
      try {
        await saveCustomerQuotaConfigDTO(opt)
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
        if (this.ruleForm.effectiveDate && this.ruleForm.expirationDate) {
          const start = this.ruleForm.effectiveDate.substring(0, 10).replace(/-/, '')
          const end = this.ruleForm.expirationDate.substring(0, 10).replace(/-/, '')
          if (end < start) {
            this.$errorMsg('失效日期不能小于生效日期!')
            return false
          }
        }
        this.saveLoading = true
        const opt = {
          ...this.ruleForm
        }
        try {
          await auditCustomerQuotaConfigDTO(opt)
          this.$successMsg('操作成功')
          this.$emit('close')
          this.visible.show = false
        } catch (error) {
          console.log(error)
        }
        this.saveLoading = false
        })
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
