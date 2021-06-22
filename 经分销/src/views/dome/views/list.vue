<template>
  <div>
    <JFX-Input v-model="form.iptVal"
               :min="0"
               :max="10000"
               :precision="0"
               placeholder="请输入"
               clearable
               @change="handleChange" />
    <el-button @click="handleClick">点击</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        iptVal: ''
      }
    }
  },
  methods: {
    handleChange(value) {
      console.log(this.form.iptVal)
      console.log(value)
    },
    handleClick() {
      setTimeout(() => {
        this.form.iptVal = 'hello world'
      }, 500)
    }
  }
}
</script>

<style>
</style>