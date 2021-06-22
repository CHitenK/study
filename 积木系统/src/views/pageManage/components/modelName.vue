<template>
 <el-form-item label="模块名称" >
    <el-select v-model="ruleForm.modelId" placeholder="模块名称选择" style="max-width: 350px;" clearable @change="choseModelName"  >
      <el-option v-for="(item, gindex) in labels" :key="gindex" :label="item.name" :value="item.labelId" :disabled="item.used"></el-option>
    </el-select>
</el-form-item>
</template>
<script>
export default {
  props: {
    jmData: {
      type: Array,
      default: function() {
        return []
      }
    },
    default: {
      type: Object,
      default: function() {
        return { modelId: '', modelName: '' }
      }
    }
  },
  data() {
    return {
      ruleForm: {
        modelId: '',
        modelName: ''
      }
    }
  },
  computed: {
    labels() {
      const data = this.jmData.find(item => {
        if (item.name === 'jm-nav' && item.businessData) {
          return item
        }
      })
      const labelIds = this.jmData.map(item => {
        if (item.businessData && item.businessData.modelId) {
          return item.businessData.modelId
        } else {
          return ''
        }
      })
      if (!data || !data.businessData.labels) return []
      data.businessData.labels.forEach(item => {
        if (labelIds.includes(item.labelId)) {
          item.used = true
        } else {
          item.used = false
        }
      })
      return data.businessData.labels
    }
  },
  mounted() {
    this.ruleForm.modelId = this.default.modelId || ''
    this.ruleForm.modelName = this.default.modelName || ''
  },
  methods: {
    // 选中模块名称
    choseModelName() {
      if (!this.ruleForm.modelId) {
        this.ruleForm.modelName = ''
        this.$emit('commitData', this.ruleForm)
        return false
      }
      this.labels.forEach(item => {
        if (item.labelId === this.ruleForm.modelId) {
          this.ruleForm.modelName = item.name
        }
      })
      this.$emit('commitData', this.ruleForm)
    }
  }
}
</script>

