<template>
    <div class="jm-nav-wrapper-ele" slot>
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'jm-nav-ele'

  export default {
    name: COMPONENT_NAME,
    props: {
      eleKey: {
        type: [Number, String]
      }
    },
    inject: ['wrapper'],
    mounted() {
      // this.sticky.addEle(this)
    },
    methods: {
      refresh() {
        const el = this.$el
        if (el.firstElementChild) {
          el.style.height = ''
          el.style.height = `${el.offsetHeight}px`
        }
      }
    },
    beforeDestroy() {
      // this.sticky.removeEle(this)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .jm-sticky-ele
        position: relative
</style>

