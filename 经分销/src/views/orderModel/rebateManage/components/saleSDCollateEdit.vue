<template>
  <!-- 新增关区组件 -->
  <JFX-Dialog
    title="编辑配置"
    closeBtnText="取 消"
    :width="'620px'"
    :top="'150px'"
    :showClose="true"
		:visible="visible"
    :showFooter="false"
	>
    <el-form :model="baseForm" ref="baseForm" :rules="rules" class="form__container">
      <el-row>
        <el-col :span="24">
          <el-form-item label="事业部：" prop="buId">
            <el-select v-model="baseForm.buId" clearable filterable placeholder="请选择" :data-list="getAllSelectBean('bu_list')" style="width: 320px">
              <el-option v-for="item in selectOpt.bu_list" :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="客户名称：" prop="customerId">
            <el-select v-model="baseForm.customerId" clearable filterable placeholder="请选择" :data-list="getSelectBeanByDto('kuhuList', { cusType: '1',  merchantId: getUserInfo().merchantId }, { 'key': 'id', 'value': 'name' })" style="width: 320px">
              <el-option v-for="item in selectOpt.kuhuList" :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="核销方式：" prop="verifyType">
            <el-select v-model="baseForm.verifyType" clearable filterable placeholder="请选择" style="width: 320px">
              <!-- 核销类型 0-按PO核销 1-按上架核销 -->
              <el-option value="0" label="按PO核销"></el-option>
              <el-option value="1" label="按上架核销"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：" prop="remark">
            <el-input v-model.trim="baseForm.remark" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否按商品核销：" prop="isMerchandiseVerify">
            <el-radio-group v-model="baseForm.isMerchandiseVerify">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <div class="mr-b-30 flex-c-c">
            <el-button type="primary" @click="save('1')" :loading="saveLoading">保 存</el-button>
            <el-button type="primary" @click="save('2')" :loading="saveLoading">审 核</el-button>
            <el-button @click="visible.show=false">取 消</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </JFX-Dialog>
</template>
<script>
import commomMix from '@m/index'
import { sdSaleSaveOrAudit } from '@a/rebateManage/index'
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
      baseForm: {
        id: '',
        buId: '',
        customerId: '',
        remark: '',
        isMerchandiseVerify: '',
        verifyType: ''
      },
      rules: {
        buId: { required: true, message: '请选择事业部', trigger: 'change' },
        customerId: { required: true, message: '客户名称不能为空', trigger: 'change' },
        verifyType: { required: true, message: '请选择核销方式', trigger: 'change' },
        isMerchandiseVerify: { required: true, message: '请选择是否按商品核销', trigger: 'change' }
      },
      saveLoading: false
    }
  },
  mounted() {
    for (let key in this.baseForm) {
      this.baseForm[key] = this.targetData[key] ? this.targetData[key].toString() : ''
    }
    this.baseForm.customerId = this.baseForm.customerId ? Number(this.baseForm.customerId) : ''
  },
  methods: {
    // 点击保存/审核
    async save(operate) {
      if (operate === '1') { // 保存
        if (!this.baseForm.buId) {
          this.$errorMsg('请选择事业部')
          return false
        }
        this.commit(operate)
      } else { // 审核
        this.$refs['baseForm'].validate(async(valid) => {
          if (!valid) return false
          this.commit(operate)
        })
      }
    },
    // 提交数据
    async commit(operate) {
      if (this.saveLoading) return false
      this.saveLoading = true
      try {
        const opt = {
          ...this.baseForm,
          operate
        }
        await sdSaleSaveOrAudit(opt)
        this.$emit('close')
        this.$successMsg('操作成功')
        this.visible.show = false
      } catch (error) {
        console.log(error)
      }
      this.saveLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.form__container {
  .el-form-item {
    padding-right: 30px;
    margin-bottom: 20px;
    display: flex;
    .el-form-item__label {
      width: 160px;
    }
    .el-form-item__content {
      flex: 1;
    }
  }
}
</style>
