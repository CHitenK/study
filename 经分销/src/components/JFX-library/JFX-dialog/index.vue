<template>
  <el-dialog
  :title="title"
  :width="width"
  :visible.sync="visible.show"
  destroy-on-close
  :show-close="showClose"
  :modal="modal"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  :top="top"
  :close="$emit('close')"
  :before-close="beforeClose ? beforeClose : null"
  >
    <div class="dialog-main-bx" v-loading="loading">
      <slot></slot>
    </div>
    <div slot="footer" class="dialog-main-footer " :class="btnAlign | filterAlign" v-if="showFooter">
      <slot name="dialog-footer">
        <el-button v-if="showCloseBtn" @click="closeLay" id="jfx_dialog_comfirm">{{closeBtnText}}</el-button>
        <el-button type="primary" :loading="confirmBtnLoading" v-if="showConfirmBtn" @click="$emit('comfirm')" id="jfx_dialog_close">{{confirmBtnText}}</el-button>
      </slot>
    </div>
    <div class="dialog-main-footer-ot" v-else></div>
  </el-dialog>
</template>
<script>
/**
 * @description 全局弹窗
 * 参数说明
 * width 宽度
 * visible 是否显示 Obj 格式{ show: false }
 * showCloseBtn 是否显示关闭按钮 默认 true
 * closeBtnText 关闭文字 默认 关闭
 * showConfirmBtn 是否显示确定按钮 默认 true
 * confirmBtnText 关闭文字 默认 确定
 * btnAlign 按钮显示在哪侧 默认 右侧
 * showClose 是否显示关闭X
 * showFooter 是否显示底部按钮
 * close 函数 关闭后执行
 * comfirm 函数 点击确定执行
*/
export default {
  props: {
    width: {
      type: String,
      default: ''
    },
    top: {
      type: String,
      default: '15vh'
    },
    visible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    modal: {
      type: Boolean,
      default: true
    },
    showCloseBtn: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    showConfirmBtn: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    btnAlign: {
      type: String,
      default: 'right'
    },
    closeBtnText: {
      type: String,
      default: '关 闭'
    },
    confirmBtnText: {
      type: String,
      default: '确 定'
    },
    title: {
      type: String,
      default: '标 题'
    },
    // 确定按钮loading状态
    confirmBtnLoading: {
      type: Boolean,
      default: false
    },
    // 函数
    beforeClose: null,
    // 弹窗内容加载loading
    loading: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    filterAlign(val) {
      if (val === 'center') return 't-c'
      if (val === 'left') return 't-l'
      return ''
    }
  },
  methods: {
    closeLay() {
      if (this.beforeClose) {
        this.beforeClose()
      } else {
        this.visible.show = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-main-bx{
  margin-top: -30px;
  min-height: 40px;
  border-top: solid 1px #eaeaee;
  box-sizing: border-box;
  padding: 15px 0;
}
.dialog-main-footer{
  width: 100%;
  border-top: solid 1px #eaeaee;
  margin-top: -30px;
  height: 46px;
  box-sizing: border-box;
  padding-top: 18px;
}
.dialog-main-footer-ot{
  margin-top: -30px;
}
.t-c{
  text-align: center;
}
.t-l{
  text-align: left;
}
</style>
