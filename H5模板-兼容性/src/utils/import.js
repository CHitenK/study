/**
 * 用于加载模块 - 整体布局
 * @param {string} url 模块路径路径
 * @returns {module} 模块
 */
export function _require_index(url) {
  return () => import(`@/views/${url}`)
}
/**
 * 用于加载模块 - 独立页面
 * @param {string} _module 模块名称
 * @param {string} url 模块路径路径
 * @returns {module} 模块
 */
export function _require_embed(_module) {
  return (url) => () => import(`@/embed/${_module}/views/${url}`)
}
