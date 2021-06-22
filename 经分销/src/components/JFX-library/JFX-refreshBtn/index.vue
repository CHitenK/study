<template>
  <el-button type="text" @click="clickFun" :disabled="disabled" v-permission="permission">刷新</el-button>
</template>
<script>
/**
 *  点击刷新后 delay 秒后才可以再次点击
 * 使用实例
 * handleClick click函数
 * permission 权限
 * <JFX-refresh-btn @handleClick="refresh(scope.row)" :permission="'purchase_quotaWarmList_refresh'"></JFX-refresh-btn>
*/
export default {
  props: {
    // 延时时间
    delay: {
      type: Number,
      default: 5000
    },
    permission: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      disabled: false,
      timer: null
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    clickFun() {
      this.disabled = true
      this.$emit('handleClick')
      this.timer = setTimeout(() => {
        this.disabled = false
      }, this.delay)
    }
  }
}
</script>
