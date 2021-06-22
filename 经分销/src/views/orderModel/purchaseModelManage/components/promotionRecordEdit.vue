<template>
  <div>
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'600'"
      :title="title"
      :btnAlign="'center'"
      top="8vh"
      >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-row class="mr-t-10">
          <el-col :span="12">
            <el-form-item label="公司名称：" prop="merchantId1" >
              <el-select v-model="ruleForm.merchantId1" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getSelectBeanByMerchantRel('cangkuList')" >
                <el-option v-for="item in selectOpt.cangkuList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="平台名称：" prop="storePlatformCode1" >
              <el-select v-model="ruleForm.storePlatformCode1" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getSelectBeanByMerchantRel('cangkuList')" >
                <el-option v-for="item in selectOpt.cangkuList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="促销名称：" prop="promotionName" >
              <el-input v-model="ruleForm.promotionName" clearable style="width: 100%" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="促销日期：" prop="date" >
               <el-date-picker
                clearable
                v-model="ruleForm.date"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="促销投入（万元）：" prop="promotionInvestment" >
              <el-input-number v-model.trim="ruleForm.promotionInvestment" :precision="0" :controls="false" :min="0" style="width: 100%;"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-Dialog>
  </div>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    visible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    list: []
  },
  data() {
    return {
      title: '促销信息配置',
      ruleForm: {
        merchantId1: '',
        storePlatformCode1: '',
        promotionName: '',
        date: '',
        promotionInvestment: '',
        startDate: '',
        endDate: ''
      },
      rules: {
        merchantId1: {required: true, message: '公司名称不能为空', trigger: 'change'},
        storePlatformCode1: {required: true, message: '平台名称不能为空', trigger: 'change'},
        promotionName: {required: true, message: '促销名称不能为空', trigger: 'blur'},
        promotionInvestment: {required: true, message: '促销投入不能为空', trigger: 'blur'},
        date: {required: true, message: '促销日期不能为空', trigger: 'change'}
      }
    }
  },
  mounted() {
    this.tableData.list = this.list
  },
  methods: {
    comfirm() {
      if (!this.choseId) {
        this.$errorMsg('请选择导出模板')
        return false
      }
      this.$emit('comfirm', this.choseId)
    }
  }
}
</script>
