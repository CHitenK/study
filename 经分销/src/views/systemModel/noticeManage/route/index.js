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

// 公告管理
const route = {
  path: '/notice',
  name: 'notice',
  component: () => import('@/layout/index'),
  meta: {
    title: '公告管理',
    icon: 'menu-icon el-icon-document'
  },
  children: [
    {
      path: '/notice/list', // 路径
      component: () => import('@v/systemModel/noticeManage/list'), // 页面
      name: 'notice-list', // 名称
      meta: {
        title: '公告列表'
      }
    }
  ]
}

export default route
