<template>
  <div>  
    <transition name="dialog-fade">
      <div class="v-dlg" v-show="show">
        <slot name="title"><h2 class="dlg-title">{{title}}</h2></slot>
        <div class="dlg-body border-b">
          <slot></slot>
        </div>
        <slot name="tool">
          <p class="dlg-tools">
            <span class="tool-active" @touchstart.prevent="show = false">确定</span>
          </p>
        </slot>
      </div>
    </transition>

    <transition name="mask-fade">
      <div class="v_mask" v-show="show" @touchstart.prevent="maskHandler"></div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    visible: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: this.visible
    }
  },
  methods: {
    maskHandler() {
      if (!this.modal) this.show = false
    }
  },
  watch: {
    show(val) {
      this.$emit('update:visible', val)
    },
    visible(val) {
      this.show = val
    }
  }
}
</script>
