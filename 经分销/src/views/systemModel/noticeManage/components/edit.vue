<template>
  <JFX-Dialog
		:visible.sync="visible"
    :showClose="true"
    @comfirm="comfirm"
    :width="'60vw'"
    :title="'发布公告'"
    :top="'80px'"
    closeBtnText="取 消"
		>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm-edit" >
      <el-row :gutter="10" class="page-view">
        <el-col :span="8">
          <el-form-item label="公告类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择" clearable :data-list="getSelectList('notice_statuslist')" >
              <el-option v-for="item in selectOpt.notice_statuslist"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16" class="flex-l-c">
         <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.title" style="width: 32vw;" placeholder="请输入活动名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <tinymce v-model="ruleForm.contentBody" :height="380" />
        </el-col>
      </el-row>
    </el-form>
	</JFX-Dialog>
</template>
<script>
import tinymce from '@c/tinymce'
import { cloneDeep } from 'lodash'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    tinymce
  },
  props: {
    visible: { show: false },
    initData: {}
  },
  data() {
    return {
      compayId: '',
      companylist: [],
      ruleForm: {
        type: '',
        title: '',
        contentBody: ''
      },
      rules: {
        type: [
          { required: true, message: '请选择公告类型', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    const initData = cloneDeep(this.initData)
    if (initData.title) {
      this.ruleForm = initData
    }
  },
  methods: {
    comfirm() {
     this.$emit('comfirm')
    }
  }
}
</script>
<style lang="scss" scoped>
.page-view{
  width: 100%;
  height: 60vh;
  margin-bottom: 10px;
}
.flex-l-c{
  display: flex;
  align-items: center;
}
</style>
