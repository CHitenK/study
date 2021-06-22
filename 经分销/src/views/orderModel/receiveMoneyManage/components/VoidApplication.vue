<template>
  <div>
    <JFX-Dialog
      :visible.sync="voidApplicationVisible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'800px'"
      :title="'作废申请'"
      :btnAlign="'center'"
      :confirmBtnLoading="confirmBtnLoading"
      top="15vh"
    >
      <el-row :gutter="10" class="fs-14 clr-II">
        <el-col :span="8">
          预收款单号：{{detail.code || '- -'}}
        </el-col>
        <el-col :span="8">
          客户：{{detail.customerName || '- -'}}
        </el-col>
        <el-col :span="8">
          账单月份：{{detail.billDate ? detail.billDate.slice(0, 7) : '- -'}}
        </el-col>
      </el-row>
      <el-row class="company-page mr-t-20 mr-b-10">
        <el-col :span="24" class="mr-t-10">
          <el-form :model="ruleForm" ref="ruleForm">
            <el-form-item label="作废备注：" prop="invalidRemark" class="textarea-con">
              <el-input type="textarea" v-model="ruleForm.invalidRemark" :rows="5" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </JFX-Dialog>
  </div>
</template>
<script>
import {
  submitInvalidBill,
  detailAdvanceItem
} from '@a/receiveMoneyManage'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    voidApplicationVisible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ruleForm: {
        invalidRemark: ''
      },
      detail: {},
      confirmBtnLoading: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id } = this
      const { data } = await detailAdvanceItem({ id })
      this.detail = data || {}
    },
    comfirm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          const { id } = this
          const { invalidRemark } = this.ruleForm
          try {
            this.confirmBtnLoading = true
            await submitInvalidBill({ id, invalidRemark })
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
    // 重置搜索栏
    resetForm() {
      this.reset('searchForm', () => {
        this.getList(1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer{
  height: 30px;
  margin-top: -30px;
}
/deep/.textarea-con {
  display: flex;
  align-items: flex-start;
  .el-form-item__content {
    width: 560px;
  }
}
</style>
