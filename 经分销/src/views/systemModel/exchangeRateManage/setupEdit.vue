<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <JFX-title title="基本信息" className="mr-t-20" />
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" >
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col :span="12">
          <el-form-item label="原币：" prop="origCurrencyCode" >
            <el-select v-model="ruleForm.origCurrencyCode" placeholder="请选择" filterable clearable :data-list="getSelectList('currencyCodeList')" >
              <el-option v-for="item in selectOpt.currencyCodeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本币：" prop="tgtCurrencyCode" >
            <el-select v-model="ruleForm.tgtCurrencyCode"  placeholder="请选择" filterable clearable :data-list="getSelectList('currencyCodeList')" >
              <el-option v-for="item in selectOpt.currencyCodeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="数据来源：" prop="dataSource" >
            <el-select v-model="ruleForm.dataSource" placeholder="请选择" clearable :data-list="getSelectList('exchangeRateConfig_dataSourceList')" >
              <el-option v-for="item in selectOpt.exchangeRateConfig_dataSourceList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="mr-t-30 flex-c-c">
      <el-button type="primary" :loading="saveLoading" @click="save">保 存</el-button>
      <el-button @click="closeTag">取 消</el-button>
    </div>
  </div>
</template>
<script>
import { saveRateConfig } from '@a/exchangeRateManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        origCurrencyCode: '',
        tgtCurrencyCode: '',
        dataSource: ''
      },
      rules: {
        origCurrencyCode: { required: true, message: '原币不能为空', trigger: 'change' },
        tgtCurrencyCode: { required: true, message: '本币不能为空', trigger: 'change' },
        dataSource: { required: true, message: '数据来源不能为空', trigger: 'change' }
      },
      saveLoading: false
    }
  },
  methods: {
    async save() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (!valid) return false
        this.saveLoading = true
        try {
          await saveRateConfig(this.ruleForm)
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
