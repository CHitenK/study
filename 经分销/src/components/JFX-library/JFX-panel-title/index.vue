<template>
  <div class="jfx-panel-bx fs-16 clr-II" :class="className" v-if="title">
   <span>{{title}}</span>
   <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  }
}
</script>
<style lang="scss" scoped >
.jfx-panel-bx{
  width: 100%;
  padding: 6px 0;
  border-bottom: solid 1px #eaeaea;
  margin-bottom: 15px;
}
</style>
