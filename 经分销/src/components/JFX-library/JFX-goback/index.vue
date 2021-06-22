<template>
  <el-button :type="type" size="mini" :icon="icon" @click="back" id="jfx_goback_btn">{{btnText}}</el-button>
</template>
<script>
export default {
   props: {
    btnText: {
      type: String,
      default: '返 回'
    },
    icon: {
      type: String,
      default: 'el-icon-arrow-left'
    },
    type: {
      type: String,
      default: 'primary'
    }
  },
  methods: {
    back() {
      this.$emit('beforeGoback')
      this.$router.go(-1)
    }
  }
}
</script>
