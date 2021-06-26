<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'v-icon',
  props: {
    icon: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.icon.replace('icon-', '')}`
    },
    svgClass() {
      if (this.className) {
        return `v-icon ${this.className}`
      }
      return 'v-icon'
    }
  }
}
</script>

<style scoped>
  .v-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
