/**
 * @description 全局指令 最多允许输入小数个数
 * 仅使用在 el-input-number 组件中， 其他组件暂不支持
 * 使用示例
 * <el-input-number v-model.trim="scope.row.declarePrice" :precision="5" :controls="false" :min="0"  style="width: 100%" v-max-spot="num"></el-input-number>
 * num 最大的输入小数个数
*/
export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    if (value) {
      const dom = el.getElementsByTagName('input') ? el.getElementsByTagName('input')[0] : null
      if (dom) {
        dom.oninput = () => {
          const val = dom.value + ''
          if (val && !isNaN(val) && val.includes('.')) {
            const arr = val.split('.')
            if (arr[1].length > +value) {
              const newVal = arr[1].substring(0, value)
              const kval = arr[0] + '.' + newVal
              dom.value = kval
            }
          }
        }
      }
    }
  }
}
