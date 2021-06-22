<template>
  <div>
    <div style="width: 100%;" v-if="targetData.businessData && (targetData.businessData.initImg ||targetData.businessData.switchImg ) ">
      <img alt class="switch-img" v-if="!isShow()"  :src="targetData.businessData.initImg"  />
      <img alt class="switch-img" v-if="isShow()" :src="targetData.businessData.switchImg"  />
    </div>
    <div class="no-img" v-else></div>
  </div>
</template>
<script>
export default {
  props: {
    targetData: {
      type: Object,
      required: true,
      default: function() {
        return {}
      }
    }
  },
  methods: {
    isShow() {
      const switchTime = this.targetData.businessData.switchTime
      if (!switchTime) return false
      const nowTimes = Date.now()
      const endTime = new Date(switchTime.replace(/(^\s*)|(\s*$)/g, '').replace(/-/gi, '/')).getTime()
      if (nowTimes > endTime) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.no-img{
  height: 130px;
  width: 100%;
}
.switch-img{
  display: block;
  width: 100%;
  height: auto;
}
</style>
