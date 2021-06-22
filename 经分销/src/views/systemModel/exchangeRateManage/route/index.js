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

// 汇率管理
const route = {
  path: '/exchangeRate',
  name: 'exchangeRate',
  component: () => import('@/layout/index'),
  meta: {
    title: '汇率管理',
    icon: 'menu-icon el-icon-help'
  },
  children: [
    {
      path: '/exchangeRate/exchangeRateList', // 路径
      component: () => import('@v/systemModel/exchangeRateManage/exchangeRateList'), // 页面
      name: 'exchangeRate-exchangeRateList', // 名称
      meta: {
        title: '汇率列表'
      }
    },
    {
      path: '/exchangeRate/exchangeRateEdit/add', // 路径
      component: () => import('@v/systemModel/exchangeRateManage/exchangeRateEdit'), // 页面
      name: 'exchangeRate-exchangeRateEdit', // 名称
      hide: true,
      meta: {
        nocache: true,
        title: '新增汇率管理'
      }
    },
    {
      path: '/exchangeRate/setupList', // 路径
      component: () => import('@v/systemModel/exchangeRateManage/setupList'), // 页面
      name: 'exchangeRate-setupList', // 名称
      meta: {
        title: '汇率配置表'
      }
    },
    {
      path: '/exchangeRate/setupEdit/add', // 路径
      component: () => import('@v/systemModel/exchangeRateManage/setupEdit'), // 页面
      name: 'exchangeRate-setupEdit', // 名称
      hide: true,
      meta: {
        nocache: true,
        title: '新增汇率配置'
      }
    }
  ]
}

export default route
