<template>
  <Input
    v-model="iptVal"
    :min="0"
    :max="10000"
    :precision="5"
    placeholder="请输入"
    clearable
    @change="handleChange"
  />
</template>

<script>
import Input from './Input'
export default {
  components: {
    Input
  },
  data() {
    return {
      iptVal: ''
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>

<style>
</style>