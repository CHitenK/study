<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- <input type="tetx" name="date" id="schedule-box" /> -->
    <div class="bill-bx mr-t-20" v-html="content"></div>
  </div>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      content: ''
    }
  },
  mounted() {
    this.content = `
     <style>
       .bill-bx{
         color: red;
       }
     </style>
     <div>
     dasff
     </div>
    `
  }
}
</script>
<style lang="scss" scoped>
.bill-bx{
  width: 72vw;
  padding: 0 15px;
  min-height: 300px;
}
</style>
