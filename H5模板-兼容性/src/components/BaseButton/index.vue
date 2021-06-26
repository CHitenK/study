<template>
  <v-touch class="v-btn" :type="type" :class="{'is-round': round, 'is-disabled': disabled}" @tap="handlerClick">
    <span v-if="$slots.default"><slot></slot></span>
  </v-touch>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default'
    },
    round: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handlerClick() {
      if (!this.disabled) {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-btn{
    position: relative;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    box-sizing: border-box;
    width: 100%;
    height: 88px;
    line-height: 88px;
    padding: 0;
    border: none;
    border-radius: 18px;
    font-size: 36px;
    
    outline: none;

    &[type="default"]{
      color: $blackColor;
      border: 2px solid $primaryColor;
      background: #ffffff;  
    }

    &[type="primary"]{
      color: #fff;
      background: $btnGradientBgColor;  
    }

    // Press状态
    &:active::after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: block;
      background: rgba($color: #ff0000, $alpha: .2);
    }
  }

  // 圆角状态
  .is-round,
  .is-round:active::after,
  .is-round.is-disabled:active::after{
    border-radius: 50px;
  }

  // 禁用状态
  .is-disabled{
    &::after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: block;
      background: rgba($color: #ffffff, $alpha: .7);
    }

    &:active::after{
      background: rgba($color: #ffffff, $alpha: .7);
    }
  }
</style>
