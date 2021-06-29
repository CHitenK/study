<template>
  <div class="v-tabs">
    <div ref="line" class="tabs-line" :style="lineStyle"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: String
    }
  },
  data() {
    return {
      tabs: [],
      activeName: this.active,
      activeTab: null
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.line.style.transitionProperty = 'all'
      this.$refs.line.style.transitionDuration = '.6s'
    }, 200)
  },
  computed: {
    lineStyle: {
      cache: false,
      get() {
        if (!this.tabs || !this.activeTab) return {}

        const style = {}
        const offsetLeft = this.activeTab.$el.offsetLeft
        const offset = this.activeTab.$el.clientWidth / 2 - this.$refs.line.clientWidth / 2

        const transform = `translateX(${offset + offsetLeft}px)`
        style.transform = transform
        style.msTransform = transform
        style.webkitTransform = transform

        return style
      }
    }
  },
  watch: {
    tabs(tabs) {
      tabs.forEach((child, index) => {
        if (!child.tabName) {
          child.tabName = index
        }
        child.index = index
      })
    },
    activeName(val) {
      this.$emit('update:active', this.activeName)
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-tabs{
    position: relative;
    display: inline-block;

    .tabs-line{
      position: absolute;
      bottom: 1px;
      width: 63px;
      height: 4px;
      border-radius: 2px;
      background-color: #ee3f3f;
    }
  }
</style>
