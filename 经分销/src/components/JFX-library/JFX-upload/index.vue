<template>
  <el-upload ref="jfx-upload"
    :multiple="multiple"
    :data="extParams"
    :action="url"
    :show-file-list="false"
    :headers="headers"
    :on-success="successHandle"
    :before-upload="beforeUpload"
    :limit="limit"
    :accept="accept">
    <slot></slot>
  </el-upload>
</template>

<script>
export default {
  props: {
    // 数组和对象的默认值是以函数返回的形式写的
    extParams: {
      type: Object,
      default: function() {
        return {}
      }
    },
    // 图片最大的大小, 单位 k
    maxSize: {
      type: Number,
      default: 0 // 4096
    },
    // 上传可选格式
    accept: {
      type: String
    },
    // 检查后缀, 逗号隔开, 若字符串为空则不检查
    checkSuffix: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 1 // 4096
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      uploading: false,
      headers: {
      }
    }
  },
  methods: {
    successHandle(response) {
      this.$refs['jfx-upload'].clearFiles()
      this.uploading = false
      this.$emit('success', response)
    },
    beforeUpload(file) {
      // 检查后缀
      if (this.checkSuffix) {
        let arr = this.checkSuffix.split(',')
        let checked = false
        arr.some(item => {
          let reg = new RegExp(item + '$', 'i')
          if (reg.test(file.name)) {
            checked = true
            return true
          }
        })
        if (!checked) {
          this.$errorMsg('请上传正确格式的文件')
          return false
        }
      }
      this.uploading = true
      if (file.size > (1024 * this.maxSize) && this.maxSize > 0) {
        if (this.maxSize >= 1024 && this.maxSize % 1024 === 0) {
          this.$errorMsg('文件大小不能超过' + this.maxSize / 1024 + 'M')
        } else {
          this.$errorMsg('文件大小不能超过' + this.maxSize + 'k')
        }
        return false
      }
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss">
.el-upload__input {
  display: none !important;
}
</style>
