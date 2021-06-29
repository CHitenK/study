<template>
  <div class="action-sheet" v-show="visible">
    <div tag="div" class="a_s-mask" v-on:touchstart.prevent="handleClose">
    </div>
    <div class="a_s-panel">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'action-sheet',
  components: {},
  props: {
    isClickMaskClose: {
      type: Boolean,
      default: true
    },
    visible: {
      default: false
    },
    appendToBody: {
      default: true
    }
  },
  data() {
    return {}
  },
  watch: {
    visible(val) {
      if (val) {
        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
      }
    }
  },
  computed: {},
  created() {

  },
  mounted() {
    if (this.visible) {
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    }
  },
  methods: {
    handleClose(e) {
      if (this.isClickMaskClose) {
        this.$emit('update:visible', false)
      }
    }
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @keyframes translateY {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .action-sheet {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
  }

  .a_s-mask {
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .5);
  }

  .a_s-panel {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    min-height: 100px;
    font-size: 26px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    animation: translateY .3s;
  }
</style>
