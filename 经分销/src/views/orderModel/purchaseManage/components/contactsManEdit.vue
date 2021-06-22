<template>
  <div>
    <!-- 新增/编辑-->
    <JFX-Dialog
    :visible.sync="visible"
    :showClose="true"
    @comfirm="save"
    :width="'540px'"
    :title="'新增物流联系人'"
    :top="'30vh'"
    closeBtnText="取 消"
    confirmBtnText="确 认"
    >
    <el-form :model="editrRuleForm" :rules="rules" ref="editrRuleForm" >
      <el-row :gutter="10" class="edit-bx" v-loading="loading">
        <el-col :span="24">
          <el-form-item label="联系人类型：" prop="type">
            <el-select v-model="editrRuleForm.type" placeholder="请选择" clearable  style="width: 320px;">
              <el-option v-for="item in typeList"  :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="flex-l-c">
        <el-form-item label="公司名称：" prop="name">
            <el-input v-model="editrRuleForm.name" placeholder="输入内容" clearable style="width: 320px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="flex-l-c">
          <el-form-item label="联系人详情：" prop="details" class="search-panel-item fs-14 clr-II" >
            <el-input type="textarea" :rows="6" v-model="editrRuleForm.details" placeholder="输入内容" clearable style="width: 320px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    </JFX-Dialog>
    <!-- 新增/编辑 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import { saveOrUpdateLogisTemplate } from '@a/purchaseManage/index'
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
        type: '',
        details: '',
        name: ''
      },
      rules: {
        type: { required: true, message: '联系人类型不能为空!', trigger: 'change' },
        name: { required: true, message: '公司名称不能为空!', trigger: 'change' },
        details: { required: true, message: '联系人详情不能为空!', trigger: 'change' }
      },
      //  1-发货人/提货信息 2-收货人/卸货信息 3-通知人 4-对接人 5-承运商信息
      typeList: [
        { label: '发货人/提货信息', value: '1' },
        { label: '收货人/卸货信息', value: '2' },
        { label: '通知人', value: '3' },
        { label: '对接人', value: '4' },
        { label: '承运商信息', value: '5' }
      ],
      loading: false
    }
  },
  mounted() {
    for (let key in this.editrRuleForm) {
      this.editrRuleForm[key] = this.options[key] ? this.options[key].toString() : ''
    }
  },
  methods: {
    async save() {
      this.$refs['editrRuleForm'].validate(async(valid) => {
        if (!valid) return false
        if (this.loading) return false
        this.loading = true
        try {
          await saveOrUpdateLogisTemplate(this.editrRuleForm)
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
  width: 120px;
}
</style>
