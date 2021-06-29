<template>
  <div>
    <transition name="dialog-fade">
      <div ref="message" class="v-dlg" v-show="show">
        <h2 class="dlg-title">{{title}}</h2>
        <div class="dlg-body border-b">{{message}}</div>
        <p class="dlg-tools">
          <span class="tool-active" @touchstart.prevent="show = false">确定</span>
        </p>
      </div>
    </transition>

    <transition name="mask-fade">
      <div class="v_mask" v-show="show" @touchstart.prevent="maskHandler"></div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: '',
      title: '',
      message: '',
      modal: true,
      closed: false,
      onClose: null
    }
  },
  methods: {
    maskHandler() {
      if (!this.modal) this.show = false
    },
    close() {
      console.log(this.$refs.message)
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    },
    destroyElement() {
      this.$refs.message.removeEventListener('animationend', this.destroyElement)
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  watch: {
    show(val) {
      if (!val) this.close()
    },
    closed(val) {
      if (val) {
        this.show = false
        this.$refs.message.addEventListener('animationend', this.destroyElement)
      }
    }
  }
}
</script>
