/**
 *  @description 计算table操作栏宽度
 *  使用示例
 *    v-count-width="{widthArr: [30, 20, ...], callback: () => {} }"
 *    widthArr 数组
 *    callback 函数
 *    initWid 初始宽度
 */
export default {
  inserted(el, binding, vnode) {
    //  开发者绕过权限
    const { value } = binding
    const { widthArr = [], callback } = value
    let wid = 0
    if (widthArr && widthArr.length > 0) {
      widthArr.forEach(item => {
        wid += +item
      })
    }
    if (callback) callback(wid)
  }
}
