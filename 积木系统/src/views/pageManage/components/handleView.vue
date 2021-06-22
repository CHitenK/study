<template>
  <div class="btn-box">
     <el-button @click="moveUp" :disabled="activeName==='title'">上移</el-button>
     <el-button @click="moveDown" :disabled="activeName==='title'">下移</el-button>
     <el-button @click="copy" :disabled="activeName==='title'">复制</el-button>
     <el-button @click="deleteData" :disabled="activeName==='title'">删除</el-button>
  </div>
</template>
<script>
import buildBlock from './../mixins/index.js'
export default {
  mixins: [buildBlock],
  data() {
    return {}
  },
  methods: {
    deleteData() {
      if (!this.activeUuid) return false
      this.$store.dispatch(this.toolType + '/DELETE_JM_DATA', this.activeUuid)
    },
    moveUp() {
      if (!this.activeUuid) return false
      this.$store.dispatch(this.toolType + '/MOTO_UP_JM_DATA', this.activeUuid)
    },
    moveDown() {
      if (!this.activeUuid) return false
      this.$store.dispatch(this.toolType + '/MOTO_DOWN_JM_DATA', this.activeUuid)
    },
    copy() {
      if (!this.activeUuid || seachFlage) return false
      // 拦截 nav
      let seachFlage = false
      seachFlage = ['jm-nav', 'jm-search'].includes(this.activeName)
      if (seachFlage) {
        this.$message({
          message: '此组件只能设置一个',
          type: 'warning'
        })
        return false
      }
      this.$store.dispatch(this.toolType + '/COPY_JM_DATA', this.activeUuid)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-box{
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
}
</style>
