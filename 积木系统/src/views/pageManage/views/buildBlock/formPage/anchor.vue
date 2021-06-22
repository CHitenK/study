<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" >
    <el-form-item label="背景颜色" prop="bgColor" :rules="colorRules" required>
      <el-color-picker v-model="ruleForm.bgColor" style="width: 70px"></el-color-picker>
    </el-form-item>
    <el-form-item label="选中背景色" prop="bgColorActive" :rules="colorRules" required>
      <el-color-picker v-model="ruleForm.bgColorActive"  style="width: 70px"></el-color-picker>
    </el-form-item>
    <el-form-item label="锚点文字颜色" prop="textColor" :rules="colorRules" required>
      <el-color-picker v-model="ruleForm.textColor"></el-color-picker>
    </el-form-item>
    <el-form-item label="选中文字颜色" prop="textColorActive" :rules="colorRules" required>
      <el-color-picker v-model="ruleForm.textColorActive"></el-color-picker>
    </el-form-item>
    <el-form-item label="添加模块名称" v-if="ruleForm.labels.length  === 0">
      <i class="el-icon-circle-plus-outline iocn-btn" v-if="ruleForm.labels.length  === 0" @click="addLabel"></i>
    </el-form-item>
    <el-form-item v-for="(item, index) in ruleForm.labels" :key="index" :label="'模块名称' + (index + 1)" :prop="'labels.' + index + '.name'" :rules="rules.commomRules">
      <el-input v-model="item.name" maxlength="8"  v-trim clearable style="width: 260px;" @blur="updateLabel(index)"></el-input>
      <i class="el-icon-circle-plus-outline iocn-btn" v-if="ruleForm.labels.length -1 === index  && ruleForm.labels.length < 10 " @click="addLabel"></i>
      <i class="el-icon-remove-outline iocn-btn"  @click="deleteLabel(index)"></i>
    </el-form-item>
    <el-form-item label="位置设置" prop="location" required>
      <el-radio-group v-model="ruleForm.location">
        <el-radio :label="0" >保持页面顶端</el-radio>
        <el-radio :label="1" >固定位置</el-radio>
      </el-radio-group>
      <br/>
      <a style="color: green;">
        提示：一个专题只允许一个保持页面顶端的组件，如有重复设置，搜索组件优先保持在页面顶端
      </a>
    </el-form-item>
  </el-form>
</template>
<script>
import buildBlock from '@/views/pageManage/mixins/index.js'
export default {
  mixins: [buildBlock],
  data() {
    return {
      ruleForm: {
        bgColor: '#FFFFFF',
        bgColorActive: '#EAEAEA',
        textColor: '',
        location: 1,
        textColorActive: '#FFFFFF',
        labels: []
      },
      colorRules: { required: true, message: '请选择颜色', trigger: 'change' },
      rules: {
        location: [
          { required: true, message: '请选择位置设置', trigger: 'change' }
        ],
        commomRules: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'ruleForm': {
      immediate: false,
      deep: true,
      handler(newData, oldData) {
        let key = ''
        this.buildBlock.jmData.forEach((item, i) => { // 组建存在数据的时候
          if (this.activeUuid === item.uuid) {
            key = i
          }
        })
        if (key === '') return false
        const kData = { ...this.buildBlock.jmData[key], location: newData.location, businessData: newData }
        this.$store.dispatch(this.toolType + '/CHANGE_JM_DATA', { index: key, data: kData })
      }
    }
  },
  created() {
    const data = this.buildBlock.jmData.find((item, i) => { // 组件存在数据的时候
      if (this.activeUuid === item.uuid && 'businessData' in item && 'bgColor' in item.businessData) {
        this.ruleForm = item.businessData
        return item
      }
    })
    // 确保积木JSON有businessData数据
    if (!data) {
      this.ruleForm.textColor = '#999999'
    }
  },
  methods: {
    // 新增模块名称
    addLabel() {
      this.ruleForm.labels.push({
        name: '',
        labelId: +Date.now(),
        used: false
      })
    },
    // 删除模块名称
    deleteLabel(index) {
      const labelIds = this.buildBlock.jmData.map(item => {
        if (item.businessData && item.businessData.modelId) {
          return item.businessData.modelId
        } else {
          return ''
        }
      })
      if (labelIds.includes(this.ruleForm.labels[index].labelId)) {
        this.$message({
          message: '此模块名称已经被关联，请先解除',
          type: 'error'
        })
        return false
      }
      this.ruleForm.labels.splice(index, 1)
    },
    // 修改模块名称，全局同步
    updateLabel(index) {
      let key
      const modelName = this.ruleForm.labels[index].name || ''
      const labelIds = this.buildBlock.jmData.map(item => {
        if (item.businessData && item.businessData.modelId) {
          return item.businessData.modelId
        } else {
          return ''
        }
      })
      // 已关联 modelName为空时
      if (labelIds.includes(this.ruleForm.labels[index].labelId) && !modelName) {
        this.$message({
          message: '此模块名称已经被关联，不能为空',
          type: 'error'
        })
      } else if (labelIds.includes(this.ruleForm.labels[index].labelId)) { // 已关联 modelName修改了
        key = labelIds.indexOf(this.ruleForm.labels[index].labelId) // 下标对应
        const kData = { ...this.buildBlock.jmData[key], modelName, businessData: { ...this.buildBlock.jmData[key].businessData, modelName }}
        this.$store.dispatch(this.toolType + '/CHANGE_JM_DATA', { index: key, data: kData })
      }
    }
  }
}
</script>

<style lang="scss">
 @import url('./../../../style/base.scss');
 .iocn-btn{
   font-size: 24px;
   color: #1890ff;
   margin: 0 10px;
   cursor: pointer;
 }
</style>
