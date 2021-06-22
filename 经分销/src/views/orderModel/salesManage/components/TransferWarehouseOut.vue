<template>
  <!-- 中转仓出库组件 -->
  <JFX-Dialog
    title="选择中转仓出库"
    closeBtnText="取 消"
    :width="'500px'"
    :top="'80px'"
    :showClose="true"
		:visible="transferWarehouseVisible"
    :confirmBtnLoading="confirmBtnLoading"
    @comfirm="comfirm"
	>
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" class="edit-bx">
      <el-row>
        <el-form-item label="出库时间：" prop="outDepotDateStr">
          <el-date-picker
            v-model="ruleForm.outDepotDateStr"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            clearable
          />
        </el-form-item>
      </el-row>
      <el-row>
        <div style="padding: 0 0 20px 42px">对选中的单据进行中转仓出库确认！</div>
      </el-row>
    </el-form>
	</JFX-Dialog>
</template>
<script>
import { saleOrderStockOut } from '@a/salesManage'
export default {
  props: {
    transferWarehouseVisible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    ids: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 表单数据
      ruleForm: {
        outDepotDateStr: ''
      },
      // 表单规则
      rules: {
        outDepotDateStr: { required: true, message: '请选择出库时间', trigger: 'change' }
      },
      // 确认按钮的loading状态
      confirmBtnLoading: false
    }
  },
  methods: {
    // 确认出库
    comfirm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          const { ids } = this
          const { outDepotDateStr } = this.ruleForm
          try {
            this.confirmBtnLoading = true
            // 中转仓出库
            await saleOrderStockOut({ ids, outDepotDateStr })
            this.$successMsg('操作成功')
            this.$emit('comfirm')
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
    width: 130px;
}
/deep/.edit-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
</style>
