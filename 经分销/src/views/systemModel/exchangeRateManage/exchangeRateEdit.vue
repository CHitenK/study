<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <JFX-title title="基本信息" className="mr-t-20" />
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" >
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col :span="12">
          <el-form-item label="兑换币种：" prop="origCurrencyCode" >
            <el-select v-model="ruleForm.origCurrencyCode" placeholder="请选择" filterable clearable :data-list="getSelectList('currencyCodeList')" >
              <el-option v-for="item in selectOpt.currencyCodeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="记账币种：" prop="tgtCurrencyCode" >
            <el-select v-model="ruleForm.tgtCurrencyCode"  placeholder="请选择" filterable clearable :data-list="getSelectList('currencyCodeList')" >
              <el-option v-for="item in selectOpt.currencyCodeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="记账汇率：" prop="rate" >
            <JFX-Input v-model.trim="ruleForm.rate" :precision="12" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生效时间：" prop="effectiveDateStr" >
            <el-date-picker
              clearable
              v-model="ruleForm.effectiveDateStr"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择">
            </el-date-picker>
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
import { saveRate } from '@a/exchangeRateManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        origCurrencyCode: '',
        tgtCurrencyCode: '',
        rate: '',
        effectiveDateStr: ''
      },
      rules: {
        rate: [
          { required: true, message: '请输入记账汇率', trigger: 'blur' }
        ],
        origCurrencyCode: [
          { required: true, message: '请输入兑换币种', trigger: 'change' }
        ],
        tgtCurrencyCode: [
          { required: true, message: '请输入记账币种', trigger: 'change' }
        ],
        effectiveDateStr: [
          { required: true, message: '请输入生效时间', trigger: 'change' }
        ]
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
          await saveRate(this.ruleForm)
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
