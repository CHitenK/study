<template>
  <!-- 销售订单审核生成采购订单 -->
  <JFX-Dialog
    title="生成采购订单"
    closeBtnText="取 消"
    :width="'700px'"
    :top="'30vh'"
    :showClose="false"
    :showCloseBtn="false"
		:visible="submitShowPurchaseVisible"
    :confirmBtnLoading="confirmBtnLoading"
    @comfirm="comfirm"
	>
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" class="edit-bx">
      <el-row style="padding-left: 20px">
        <div>{{name}}公司下无对应的采购订单，是否生成采购订单？</div>
      </el-row>
      <el-row style="padding-left: 20px">
        <el-form-item>
          <el-radio-group v-model="ruleForm.isGenerate" @change="isGenerateChange">
            <el-radio label="0">不生成</el-radio>
            <el-radio label="1">生成</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="事业部：" prop="buId" ref="buId" v-if="ruleForm.isGenerate === '1'">
            <el-select v-model="ruleForm.buId"
                      placeholder="请选择"
                      clearable
                      filterable
                      :data-list="getBUSelectBean('bu_list')">
              <el-option
                v-for="item in selectOpt.bu_list"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出库仓库：" prop="depotId" ref="outDepotId" v-if="ruleForm.isGenerate === '1'">
            <el-select v-model="ruleForm.depotId"
                      placeholder="请选择"
                      clearable
                      filterable
                      :data-list="getSelectBeanByMerchantRel('out_warehousesList')">
              <el-option
                v-for="item in selectOpt.out_warehousesList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
	</JFX-Dialog>
</template>
<script>
import { createPurchaseOrder } from '@a/salesManage'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    submitShowPurchaseVisible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    name: {
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
      // 表单数据
      ruleForm: {
        isGenerate: '0',
        depotId: '',
        buId: ''
      },
      // 表单规则
      rules: {
        depotId: { required: true, message: '请选择出库仓库', trigger: 'change' },
        buId: { required: true, message: '请选择事业部', trigger: 'change' }
      },
      isGenerate: '',
      // 确认按钮的loading状态
      confirmBtnLoading: false
    }
  },
  methods: {
    // 确认出库
    comfirm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          const { id: saleId } = this
          const { depotId, buId, isGenerate } = this.ruleForm
          try {
            this.confirmBtnLoading = true
            if (isGenerate === '1') {
              // 生成采购订单
              await createPurchaseOrder({ saleId, buId, depotId })
            }
            this.$successMsg('操作成功')
            this.$emit('comfirm')
          } catch (error) {
            this.$errorMsg(error.message)
          } finally {
            this.confirmBtnLoading = false
          }
        }
      })
    },
    isGenerateChange(value) {
      if (value === '0') {
        this.rules.depotId.required = false
        this.rules.buId.required = false
      } else {
        this.rules.depotId.required = true
        this.rules.buId.required = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
    width: 100px;
}
/deep/.edit-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
</style>
