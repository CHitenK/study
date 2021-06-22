<template>
<!-- 项目额度配置 -->
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
                <el-select v-model="ruleForm.buId" placeholder="请选择" clearable :data-list="getBUSelectBean('buList',  { merchantId: getUserInfo().merchantId })" style="width: 200px;" @change="getLatestPeriodInfo">
                  <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="母品牌：" prop="superiorParentBrandId" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.superiorParentBrandId" placeholder="请选择" filterable clearable :data-list="getBrandList('superiorParentBrandList')" style="width: 200px;">
                  <el-option v-for="item in selectOpt.superiorParentBrandList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="额度：" prop="projectQuota" class="search-panel-item fs-14 clr-II" >
                <JFX-Input v-model.trim="ruleForm.projectQuota" :precision="0" placeholder="请输入" style="width: 200px;" clearable />
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
              <el-form-item label="生效日期：" prop="effectiveDateStr" class="search-panel-item fs-14 clr-II" >
                <el-date-picker
                  clearable
                  v-model="ruleForm.effectiveDateStr"
                  type="date"
                  value-format="yyyy-MM-dd 00:00:00"
                  style="width: 200px;"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="失效日期：" prop="expirationDateStr" class="search-panel-item fs-14 clr-II" >
                <el-date-picker
                  clearable
                  v-model="ruleForm.expirationDateStr"
                  type="date"
                  value-format="yyyy-MM-dd 23:59:59"
                  style="width: 200px;"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="额度类型：" prop="quotaType" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.quotaType" placeholder="请选择" clearable style="width: 200px;">
                  <el-option label="品牌额度" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="mr-t-20 flex-c-c">
            <el-button type="primary" @click="save" :loading="saveLoading" v-permission="'articleList_save'">保 存</el-button>
            <el-button type="primary" @click="submitForm" id="save_and_examine" :loading="saveLoading" v-permission="'articleList_audit'">审核</el-button>
            <el-button @click="visible.show=false" id="cancel_ret">取 消</el-button>
          </div>
          <div class="mr-t-30"></div>
      </el-form>
    </JFX-Dialog>
  </div>
</template>
<script>
import commomMix from '@m/index'
import { saveOrUpdateProjectQuotaConfig, getProjectQuotaConfigById, auditProjectQuotaConfig, getLatestDepartmentQuato } from '@a/limitPositionManage/index'
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
    targetId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ruleForm: {
        id: '',
        buId: '',
        superiorParentBrandId: '',
        projectQuota: '',
        effectiveDateStr: '',
        expirationDateStr: '',
        quotaType: '',
        currency: ''
      },
      rules: {
        buId: { required: true, message: '请选择事业部', trigger: 'change' },
        superiorParentBrandId: { required: true, message: '请选择母品牌', trigger: 'change' },
        projectQuota: { required: true, message: '请输入额度', trigger: 'change' },
        effectiveDateStr: { required: true, message: '生效日期不能为空', trigger: 'change' },
        expirationDateStr: { required: true, message: '失效日期不能为空', trigger: 'change' },
        quotaType: { required: true, message: '额度类型不能为空', trigger: 'change' },
        currency: { required: true, message: '额度币种不能为空', trigger: 'change' }
      },
      saveLoading: false,
      configId: ''
    }
  },
  mounted() {
    // 编辑
    if (this.targetId) {
      this.init()
    }
  },
  methods: {
    async init() {
      try {
        const res = await getProjectQuotaConfigById({ id: this.targetId })
        for (let key in this.ruleForm) {
          this.ruleForm[key] = res.data[key] ? res.data[key].toString() : ''
          if (key.includes('Str')) {
            const key1 = key.replace(/Str/gi, '')
            this.ruleForm[key] = res.data[key1] ? res.data[key1].toString() : ''
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async save() {
      if (!this.ruleForm.buId) {
        this.$errorMsg('请选择事业部!')
        return false
      }
      if (this.ruleForm.effectiveDateStr && this.ruleForm.expirationDateStr) {
        const start = this.ruleForm.effectiveDateStr.substring(0, 10).replace(/-/, '')
        const end = this.ruleForm.expirationDateStr.substring(0, 10).replace(/-/, '')
        if (end < start) {
          this.$errorMsg('失效日期不能小于生效日期!')
          return false
        }
      }
      this.saveLoading = true
      const opt = this.getParms()
      try {
        await saveOrUpdateProjectQuotaConfig(opt)
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
        if (this.ruleForm.effectiveDateStr && this.ruleForm.expirationDateStr) {
          const start = this.ruleForm.effectiveDateStr.substring(0, 10).replace(/-/, '')
          const end = this.ruleForm.expirationDateStr.substring(0, 10).replace(/-/, '')
          if (end < start) {
            this.$errorMsg('失效日期不能小于生效日期!')
            return false
          }
        }
        this.saveLoading = true
        const opt = this.getParms()
        try {
          // 先保存
          if (!this.configId) {
            const { data: { configId } } = await saveOrUpdateProjectQuotaConfig(opt)
            this.configId = configId
          }
          // 再审核
          await auditProjectQuotaConfig({ id: this.ruleForm.id || this.configId })
          this.$successMsg('操作成功')
          this.$emit('close')
          this.visible.show = false
        } catch (error) {
          console.log(error)
        }
        this.saveLoading = false
        })
    },
    getParms() {
      const gata = this.selectOpt.buList.find(item => item.key === this.ruleForm.buId) || {}
      const buName = gata.value || ''
      const hata = this.selectOpt.superiorParentBrandList.find(item => item.key === this.ruleForm.superiorParentBrandId) || {}
      const superiorParentBrand = hata.value || ''
      const quotaTypeLabel = this.ruleForm.quotaType ? ['', '品牌额度'][this.ruleForm.quotaType] : ''
      return {
        ...this.ruleForm,
        id: this.configId || this.ruleForm.id || '',
        buName,
        superiorParentBrand,
        quotaTypeLabel
      }
    },
    // 根据部门ID获取信息
    async getLatestPeriodInfo() {
      const { buId } = this.ruleForm
      this.ruleForm.effectiveDateStr = ''
      this.ruleForm.expirationDateStr = ''
      this.ruleForm.currency = ''
      if (buId) {
        try {
          const res = await getLatestDepartmentQuato({ buId })
          const { effectiveDate = '', expirationDate = '', currency } = res.data
          this.ruleForm.effectiveDateStr = effectiveDate || ''
          this.ruleForm.expirationDateStr = expirationDate || ''
          this.ruleForm.currency = currency || ''
        } catch (error) {
          console.log(error)
        }
      }
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
