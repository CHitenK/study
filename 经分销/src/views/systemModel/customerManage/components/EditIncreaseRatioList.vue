<template>
  <!-- 编辑弹窗 -->
  <JFX-Dialog
    :title="title"
    closeBtnText="取 消"
    :width="'700px'"
    :top="'80px'"
    :showClose="true"
		:visible.sync="showDialog"
    :confirmBtnLoading="confirmBtnLoading"
    @comfirm="comfirm"
	>
    <el-form :model="ruleForm" :rules="rules" ref="form" class="edit-bx">
      <el-row :gutter="10" class="page-view">
        <el-col :span="24">
          <el-form-item label="配置类型：" prop="configType">
            <el-select
              v-model="ruleForm.configType"
              placeholder="请选择"
              clearable
              :data-list="getSelectList('purchaseCommission_configTypeList')"
            >
              <el-option
                v-for="item in selectOpt.purchaseCommission_configTypeList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户名称：" prop="customerId" class="search-panel-item fs-14 clr-II">
            <el-select v-model="ruleForm.customerId"
                        placeholder="请选择"
                        :data-list="getCustomerSelectBean('customer_list')"
                        filterable
                        clearable>
              <el-option
                v-for="item in selectOpt.customer_list"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="供应商：" prop="supplierId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="ruleForm.supplierId"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSupplierSelectBean('supplier_list')"
              >
                <el-option
                  v-for="item in selectOpt.supplier_list"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
        <el-col :span="12">
          <el-form-item label="销售价回扣：" prop="saleRebate">
            <JFX-Input v-model.trim="ruleForm.saleRebate" :precision="2" :min="0" placeholder="请输入" style="width: 100%;" clearable>
               <span slot="suffix">%</span>
            </JFX-Input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购价佣金：" prop="purchaseCommission">
            <JFX-Input v-model.trim="ruleForm.purchaseCommission" :precision="2" :min="0" placeholder="请输入" style="width: 100%;" clearable>
               <span slot="suffix">%</span>
            </JFX-Input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
	</JFX-Dialog>
</template>
<script>
import commomMix from '@m/index'
import {
  savePurchaseCommission,
  modifyPurchaseCommission,
  getPurchaseCommission
} from '@a/customerManage'
export default {
  mixins: [commomMix],
  props: {
    showDialog: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ruleForm: {
        customerId: '',
        supplierId: '',
        saleRebate: '',
        purchaseCommission: '',
        configType: ''
      },
      rules: {
        customerId: { required: true, message: '请选择客户名称', trigger: 'change' },
        supplierId: { required: true, message: '请选择供应商', trigger: 'change' },
        saleRebate: { required: true, message: '请输入销售价回扣', trigger: 'blur' },
        purchaseCommission: { required: true, message: '请输入采购价佣金', trigger: 'blur' },
        configType: { required: true, message: '请选择配置类型', trigger: 'change' }
      },
      confirmBtnLoading: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id, ruleForm } = this
      if (!id) return false
      const { data } = await getPurchaseCommission({ id })
      for (const key in ruleForm) {
        ruleForm[key] = data[key] ? data[key].toString() : data[key]
      }
      this.ruleForm.saleRebate *= 100
      this.ruleForm.purchaseCommission *= 100
    },
    // 提交表单
    comfirm() {
      this.$refs['form'].validate(async(valid) => {
        if (valid) {
          try {
            this.confirmBtnLoading = true
            const { id } = this
            if (id) {
              await modifyPurchaseCommission({ ...this.ruleForm, id })
            } else {
              await savePurchaseCommission({ ...this.ruleForm })
            }
            this.$emit('comfirm')
            this.$successMsg('操作成功')
          } catch (error) {
            this.$errorMsg(error.message)
          } finally {
            this.confirmBtnLoading = false
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page-view{
  width: 100%;
  margin-bottom: 10px;
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
  width: 120px;
}
/deep/.edit-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
</style>
