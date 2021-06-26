<template>
  <div class="v-steps">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      steps: []
    }
  },
  watch: {
    steps(steps) {
      steps.forEach((child, index) => {
        child.index = index
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-steps{
    display: flex;
  }
</style>
