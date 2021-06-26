// 函数节流 时间n内执行一次
export function throttle (fn, gapTime = 1000) {
  let _lastTime = null
  return function () {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)
      _lastTime = _nowTime
    }
  }
}
// 函数防抖 多次点击时，在最后一次点击 delay 毫秒时执行
export function debounce (fn, delay = 500) {
  let timer
  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 func 函数
  return function () {
    var context = this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}
