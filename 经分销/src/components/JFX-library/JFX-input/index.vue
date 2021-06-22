<template>
  <el-input
    v-bind="$attrs"
    v-model="bindValue"
    :placeholder="placeholder"
    :clearable="clearable"
    :disabled="disabled"
    :precision="precision"
    :show-word-limit="showWordLimit"
    :maxlength="maxlength"
    @input="handleInput"
    @change="handleChange"
    @clear="handleClear"
  >
    <slot name="prefix" slot="prefix"></slot>
    <slot name="suffix" slot="suffix"></slot>
    <slot name="prepend" slot="prepend"></slot>
    <slot name="append" slot="append"></slot>
  </el-input>
</template>

<script>
/**
 * @description 类似el-input-number
 * 使用示例:
 *  <JFX-Input v-model="form.iptVal" :min="0" :max="10000" :precision="5" placeholder="请输入" clearable @change="handleChange" />
 */
export default {
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: {
      type: Number | String,
      default: ''
    },
    // 显示输入最大长度
    showWordLimit: {
      type: Boolean,
      default: false
    },
    // 最大长度
    maxlength: {
      type: Number,
      default: Infinity
    },
    // 最大值
    max: {
      type: Number,
      default: Infinity
    },
    // 最小值
    min: {
      type: Number,
      default: 0
    },
    // 省略小数位
    precision: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    bindValue: {
      set() { },
      get() {
        return this.value
      }
    }
  },
  methods: {
    handleInput(value) {
      value = value + ''
      const { precision } = this
      if (precision === 0) {
        // 0开头
        if (value[0] === '0' && value.length >= 2) {
          value = value.slice(1)
        }
        value = value.replace(/[^\d]/gi, '')
      } else {
        value = value.replace(/[^(\d | .)]/gi, '')
        // 0开头
        if (value[0] === '0' && value.length >= 2 && value[1] !== '.') {
          value = value.slice(1)
        }
        if (value.includes('.')) {
          const { length } = value.split('.')[1]
          // 两个小数点或者小数点开头
          if (value.split('.').length > 2 || value[0] === '.') {
            value = value.slice(0, value.lastIndexOf('.'))
          } else if (length > precision) {
            value = value.slice(0, value.indexOf('.') + precision + 1)
          }
        }
      }
      this.$emit('update', value)
    },
    handleChange() {
      let value = this.bindValue
      value = value > this.max ? this.max : value
      value = value < this.min ? this.min : value
      // value = parseFloat(value) + ''
      value = isNaN(value) ? '' : value
      // 小数点结尾去除小数点
      if (value[value.length - 1] === '.') {
        value = value.slice(0, value.indexOf('.'))
      }
      this.$emit('update', value)
      this.$emit('change', value)
    },
    // 清空
    handleClear() {
      this.$emit('update', '')
      this.$emit('change', '')
    }
  }
}
</script>
