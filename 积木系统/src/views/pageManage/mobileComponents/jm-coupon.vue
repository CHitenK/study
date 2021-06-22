<template>
    <div :class="{'box-none': !targetData.businessData.img}">
      <img class="img" :src="targetData.businessData.img" />
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
  }
}
</script>
<style lang="scss" scoped>
.img {
  width: 100%;
}
.box-none{
  width: 100%;
  height: 120px;
  &::after{
    content: '添加优惠券'
  }
}
</style>
