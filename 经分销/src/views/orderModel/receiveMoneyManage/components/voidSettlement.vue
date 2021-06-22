<template>
  <div>
    <JFX-Dialog
    :visible.sync="visible"
    :showClose="true"
    @comfirm="save"
    :width="'720px'"
    :title="'结算作废申请'"
    :top="'26vh'"
    closeBtnText="取 消"
    confirmBtnText="确 认"
    >
      <el-row :gutter="10" class="edit-bx" v-loading="loading">
        <el-col :span="12" class="mr-b-20">
          <span>平台结算单：{{targetData.code}}</span>
        </el-col>
        <el-col :span="12" class="mr-b-20">
          <span>客户/平台：{{targetData.storePlatformName}}</span>
        </el-col>
        <el-col :span="12" class="mr-b-20">
          <span>结算日期：{{targetData.settlementDate}}</span>
        </el-col>
        <el-col :span="24" class="flex-l-c">
          <span class="need" style="vertical-align: top;">作废备注：</span>
          <el-input type="textarea" :rows="6" v-model="remark" placeholder="输入内容" clearable style="width: 320px;"></el-input>
        </el-col>
      </el-row>
    </JFX-Dialog>
  </div>
</template>
<script>
import commomMix from '@m/index'
import { saveInvalidBill } from '@a/receiveMoneyManage/index'
export default {
  mixins: [commomMix],
  props: {
    visible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    targetData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      remark: '',
      loading: false
    }
  },
  methods: {
    async save() {
      if (!this.remark) {
        this.$errorMsg('请输入作废备注')
        return false
      }
      this.loading = true
      try {
        await saveInvalidBill({ id: this.targetData.id, invalidRemark: this.remark })
        this.$successMsg('操作成功')
        this.$emit('close')
        this.visible.show = false
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.edit-bx .el-form-item__label {
  width: 120px;
}
</style>
