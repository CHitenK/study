/**
 *  参数说明
 *  path 路由的完整路径 (必填)
 *  name 名称 可填
 *  component 组件 (必填)
 *  redirect 跳转路径 redirect不为空时,不显示二级菜单
 *  hide  是否不展现在菜单栏 可填
 *  meta
 *    title 显示在tag栏, 左侧菜单栏名称名称 (必填)
 *    affix 是否固定tab栏
 *    nocache 是否不需要缓存  是相当于keepAlive false
 */

// 常用页面
const route = {
  path: '/common',
  name: 'common',
  component: () => import('@/layout/index/index'),
  showMenu: false,
  meta: {
    title: '公共组件'
  },
  children: [
    {
      path: '/common/permission', // 路径
      component: () => import('@v/common/permission'), // 页面
      name: 'permission-tip', // 名称
      hide: true,
      meta: {
        title: '权限提示'
      }
    },
    {
      path: '/common/importfile', // 路径
      component: () => import('@v/common/importfile'), // 页面
      name: 'common-importfile', // 名称
      hide: true,
      meta: {
        title: '文件上传',
        nocache: true // 是否不缓存数据
      }
    },
    {
      path: '/common/enclosureManage', // 路径
      component: () => import('@v/common/enclosureManage'), // 页面
      name: 'common-enclosureManage', // 名称
      hide: true,
      meta: {
        title: '附件管理',
        nocache: true // 是否不缓存数据
      }
    },
    // 暂时保留
    {
      path: '/common/extand-table', // 路径
      component: () => import('@v/dome/views/extandTable'), // 页面
      name: 'common-extandTable', // 名称
      hide: true,
      meta: {
        title: '展开/关闭table'
      }
    }
  ]
}

export default route
