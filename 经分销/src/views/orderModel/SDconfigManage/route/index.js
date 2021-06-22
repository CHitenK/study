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

// SD配置
const route = {
  path: '/SDconfig',
  name: 'SDconfig',
  component: () => import('@/layout/index'),
  meta: {
    title: 'SD配置',
    icon: 'menu-icon el-icon-setting'
  },
  children: [
    {
      path: '/SDconfig/SDtypeList', // 路径
      component: () => import('@v/orderModel/SDconfigManage/SDtypeList'), // 页面
      name: 'SDconfig-purchaseOrderList', // 名称
      meta: {
        title: 'SD类型配置'
      }
    },
    {
      path: '/SDconfig/purchaseSDList', // 路径
      component: () => import('@v/orderModel/SDconfigManage/purchaseSDList'), // 页面
      name: 'SDconfig-purchaseSDList', // 名称
      meta: {
        title: '采购SD配置'
      }
    },
    {
      path: '/SDconfig/purchaseSDEdit/:type', // 路径
      component: () => import('@v/orderModel/SDconfigManage/purchaseSDEdit'), // 页面
      name: 'SDconfig-purchaseSDEdit', // 名称
      hide: true,
      meta: {
        title: '编辑采购SD配置' // type add为新增
      }
    },
    {
      path: '/SDconfig/purchaseSDDetail', // 路径
      component: () => import('@v/orderModel/SDconfigManage/purchaseSDDetail'), // 页面
      name: 'SDconfig-purchaseSDDetail', // 名称
      hide: true,
      meta: {
        title: '采购SD配置详情'
      }
    }
  ]
}

export default route
