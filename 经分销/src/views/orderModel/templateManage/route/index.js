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

// 模板管理
const route = {
  path: '/template',
  name: 'template',
  component: () => import('@/layout/index'),
  meta: {
    title: '模板管理',
    icon: 'menu-icon el-icon-house'
  },
  children: [
    {
      path: '/template/clearGatewayList', // 路径
      component: () => import('@v/orderModel/templateManage/clearGatewayList'), // 页面
      name: 'template-clearGatewayList', // 名称
      meta: {
        title: '清关单证配置'
      }
    },
    {
      path: '/template/exportTemplateList', // 路径
      component: () => import('@v/orderModel/templateManage/exportTemplateList'), // 页面
      name: 'template-exportTemplateList', // 名称
      meta: {
        title: '导出模板管理'
      }
    },
    {
      path: '/template/exportTemplateEdit/:type', // 路径
      component: () => import('@v/orderModel/templateManage/exportTemplateEdit'), // 页面
      name: 'template-exportTemplateEdit', // 名称
      hide: true,
      meta: {
        title: '编辑模版',
        nocache: true
      }
    },
    {
      path: '/template/preview', // 路径
      component: () => import('@v/orderModel/templateManage/preview'), // 页面
      name: 'template-preview', // 名称
      hide: true,
      meta: {
        title: '预览',
        nocache: true
      }
    }
  ]
}

export default route
