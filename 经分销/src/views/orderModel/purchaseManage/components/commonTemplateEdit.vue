<template>
  <div>
    <!-- 新增/编辑-->
    <JFX-Dialog
    :visible.sync="visible"
    :showClose="true"
    @comfirm="save"
    :width="'540px'"
    :title="'新增物流联系人'"
    :top="'15vh'"
    closeBtnText="取 消"
    confirmBtnText="确 认"
    >
    <el-form :model="editrRuleForm" :rules="rules" ref="editrRuleForm" >
      <el-row :gutter="10" class="edit-bx" v-loading="loading">
        <el-col :span="24" class="flex-l-c">
          <el-form-item label="模版名称：" prop="name">
            <el-input v-model="editrRuleForm.name" placeholder="输入内容" clearable style="width: 320px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="发货人/提货信息：" prop="shipperTempId">
            <el-select v-model="editrRuleForm.shipperTempId" placeholder="请选择" clearable filterable  style="width: 320px;">
              <el-option v-for="item in shipperTempIdList"  :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="收货人/卸货信息：" prop="consigneeTempId">
            <el-select v-model="editrRuleForm.consigneeTempId" placeholder="请选择" clearable filterable  style="width: 320px;">
              <el-option v-for="item in consigneeTempIdList"  :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="通知人：" prop="notifierTempId">
            <el-select v-model="editrRuleForm.notifierTempId" placeholder="请选择" clearable filterable  style="width: 320px;">
              <el-option v-for="item in notifierTempIdList"  :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="对接人：" prop="dockingTempId">
            <el-select v-model="editrRuleForm.dockingTempId" placeholder="请选择" clearable filterable  style="width: 320px;">
              <el-option v-for="item in dockingTempIdList"  :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="承运商信息：" prop="carrierInformationTempId">
            <el-select v-model="editrRuleForm.carrierInformationTempId" placeholder="请选择" clearable filterable style="width: 320px;">
              <el-option v-for="item in carrierInformationTempIdList"  :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    </JFX-Dialog>
    <!-- 新增/编辑 end -->
  </div>
</template>
<script>
import { listTemplate, saveOrUpdateLogisTemplateLink } from '@a/purchaseManage/index'
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
    options: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      editrRuleForm: {
        id: '',
        name: '',
        shipperTempId: '',
        shipperTempName: '',
        consigneeTempId: '',
        consigneeTempName: '',
        notifierTempId: '',
        notifierTempName: '',
        dockingTempId: '',
        dockingTempName: '',
        carrierInformationTempId: '',
        carrierInformationTempName: ''
      },
      rules: {
        name: { required: true, message: '模版名称不能为空!', trigger: 'change' }
      },
      //  1-发货人/提货信息 2-收货人/卸货信息 3-通知人 4-对接人 5-承运商信息
      shipperTempIdList: [],
      consigneeTempIdList: [],
      notifierTempIdList: [],
      dockingTempIdList: [],
      carrierInformationTempIdList: [],
      loading: false
    }
  },
  mounted() {
    this.getList()
    const arr = ['shipperTempId', 'consigneeTempId', 'notifierTempId', 'dockingTempId', 'carrierInformationTempId']
    for (let key in this.editrRuleForm) {
      if (arr.includes(key)) {
        this.editrRuleForm[key] = this.options[key] ? Number(this.options[key]) : ''
      } else {
        this.editrRuleForm[key] = this.options[key] || ''
      }
    }
  },
  methods: {
    async getList() {
      try {
				const res = await listTemplate({ type: '' })
				const list = res.data || []
        this.shipperTempIdList = list.filter(item => item.type === '1')
        this.consigneeTempIdList = list.filter(item => item.type === '2')
        this.notifierTempIdList = list.filter(item => item.type === '3')
        this.dockingTempIdList = list.filter(item => item.type === '4')
        this.carrierInformationTempIdList = list.filter(item => item.type === '5')
			} catch (err) {
        console.log(err)
			}
    },
    save() {
      this.$refs['editrRuleForm'].validate(async(valid) => {
        if (!valid) return false
        if (this.loading) return false
        this.loading = true
        const tardata1 = this.shipperTempIdList.find(item => +item.id === +this.editrRuleForm.shipperTempId) || {}
        this.editrRuleForm.shipperTempName = tardata1.name || ''
        const tardata2 = this.consigneeTempIdList.find(item => +item.id === +this.editrRuleForm.consigneeTempId) || {}
        this.editrRuleForm.consigneeTempName = tardata2.name || ''
        const tardata3 = this.notifierTempIdList.find(item => +item.id === +this.editrRuleForm.notifierTempId) || {}
        this.editrRuleForm.notifierTempName = tardata3.name || ''
        const tardata4 = this.dockingTempIdList.find(item => +item.id === +this.editrRuleForm.dockingTempId) || {}
        this.editrRuleForm.dockingTempName = tardata4.name || ''
        const tardata5 = this.carrierInformationTempIdList.find(item => +item.id === +this.editrRuleForm.carrierInformationTempId) || {}
        this.editrRuleForm.carrierInformationTempName = tardata5.name || ''
        try {
          await saveOrUpdateLogisTemplateLink(this.editrRuleForm)
          this.$successMsg('操作成功')
          this.$emit('success')
          this.visible.show = false
        } catch (error) {
          console.log(error)
        }
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.edit-bx .el-form-item__label {
  width: 150px;
}
</style>
