<template>
  <div ref="step" class="v-step" :class="{'is-finish': isFinish}">
    <div class="step-order"><v-icon v-if="isComplete && successIcon" :icon="successIcon"></v-icon><span v-if="!isComplete">{{step || index + 1}}</span></div>
    <div class="step-title">{{title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: String
    },
    title: {
      type: String
    },
    icon: {
      type: String
    }
  },
  data() {
    return {
      index: -1,
      isFinish: false,
      isComplete: false,
      successIcon: this.icon
    }
  },
  beforeCreate() {
    this.$parent.steps.push(this)
  },
  computed: {
    isStart() {
      return this.$parent.steps[0] === this
    },
    isEnd() {
      const parent = this.$parent
      return parent.steps[parent.length - 1] === this
    }
  },
  mounted() {
    if (!this.isStart) {
      var frage = document.createDocumentFragment()
      var line_dom = document.createElement('div')
      line_dom.setAttribute('class', 'step-line')
      frage.appendChild(line_dom)
      this.$refs.step.parentElement.insertBefore(frage, this.$refs.step)
    }
    const unwatch = this.$watch('index', val => {
      this.$watch('$parent.active', (val) => {
        this.isFinish = this.index === 0 || this.index < val
        this.isComplete = this.index < val - 1
        this.successIcon = this.isComplete ? 'icon-success' : this.successIcon
      }, { immediate: true })
      unwatch()
    })
  },
  beforeDestroy() {
    const steps = this.$parent.steps
    const index = steps.indexOf(this)
    if (index >= 0) {
      steps.splice(index, 1)
    }
  }
}
</script>

<style lang="scss">
  .step-line{
    width: 172px;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.6);
    margin-top: -1px;
    height: 32px;
  }
</style>


<style lang="scss" scoped>
  $orderSize: 64px;

  .v-step{

    .step-order{
      width: $orderSize;
      height: $orderSize;
      line-height: $orderSize;
      text-align: center;
      font-size: 36px;
      color: #ffffff;
      border-radius: 50%;
      background-color: $blackColor-3;
      margin: 0 auto;
    }
    .step-title{
      font-size: 30px;
      text-align: center;
      color: $blackColor-3;
      margin-top: 30px;
      word-break: keep-all;
    }
  }
  .is-finish{

    .step-order{
      color: #ffffff;
      background-color: $primaryColor;
    }

    .step-title{
      color: $blackColor-1;
    }

    .v-icon{
      color: #ffffff;
    }
  }
</style>
