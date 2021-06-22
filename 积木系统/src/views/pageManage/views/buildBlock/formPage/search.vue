<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" >
    <el-form-item label="搜索范围" prop="location">
      <el-radio-group v-model="ruleForm.range" disabled>
        <el-radio :label="0">全部商品</el-radio>
        <el-radio :label="1">全部内容</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="页面背景" prop="bgColor" :rules="colorRules" required>
      <el-color-picker v-model="ruleForm.bgColor" style="width: 70px"></el-color-picker>
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
        bgColor: '',
        range: 0,
        location: 1
      },
      colorRules: { required: true, message: '请选择颜色', trigger: 'change' },
      rules: {}
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
    if (!data) {
      this.ruleForm.bgColor = '#FFFFFF'
    }
  }
}
</script>

<style lang="scss">
 @import url('./../../../style/base.scss');
</style>

