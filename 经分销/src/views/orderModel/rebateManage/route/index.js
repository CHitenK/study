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

// 返利管理
const route = {
  path: '/rebate',
  name: 'rebate',
  component: () => import('@/layout/index'),
  meta: {
    title: '返利管理',
    icon: 'menu-icon el-icon-setting'
  },
  children: [
    {
      path: '/rebate/purchaseSDtypeList', // 路径
      component: () => import('@v/orderModel/rebateManage/purchaseSDtypeList'), // 页面
      name: 'rebate-purchaseOrderList', // 名称
      meta: {
        title: '采购SD类型'
      }
    },
    {
      path: '/rebate/purchaseSDList', // 路径
      component: () => import('@v/orderModel/rebateManage/purchaseSDList'), // 页面
      name: 'rebate-purchaseSDList', // 名称
      meta: {
        title: '采购SD配置'
      }
    },
    {
      path: '/rebate/purchaseSDEdit/add', // 路径
      component: () => import('@v/orderModel/rebateManage/purchaseSDAdd'), // 页面
      name: 'rebate-purchaseSDAdd', // 名称
      hide: true,
      meta: {
        nocache: true,
        title: '新增采购SD配置'
      }
    },
    {
      path: '/rebate/purchaseSDEdit/edit', // 路径
      component: () => import('@v/orderModel/rebateManage/purchaseSDEdit'), // 页面
      name: 'rebate-purchaseSDEdit', // 名称
      hide: true,
      meta: {
        nocache: true,
        title: '编辑采购SD配置'
      }
    },
    {
      path: '/rebate/purchaseSDDetail', // 路径
      component: () => import('@v/orderModel/rebateManage/purchaseSDDetail'), // 页面
      name: 'rebate-purchaseSDDetail', // 名称
      hide: true,
      meta: {
        nocache: true,
        title: '采购SD配置详情'
      }
    },
    {
      path: '/rebate/SaleSDList', // 路径
      component: () => import('@v/orderModel/rebateManage/SaleSDList'), // 页面
      name: 'SaleSDList', // 名称
      meta: {
        title: '销售SD类型'
      }
    },
    {
      path: '/rebate/SaleSDConfig', // 路径
      component: () => import('@v/orderModel/rebateManage/SaleSDConfig'), // 页面
      name: 'SaleSDConfig', // 名称
      meta: {
        title: '销售SD配置'
      }
    },
    {
      path: '/rebate/SaleSDConfigDetail', // 路径
      component: () => import('@v/orderModel/rebateManage/SaleSDConfigDetail'), // 页面
      name: 'SaleSDConfigDetail', // 名称
      hide: true,
      meta: {
        title: '销售SD配置详情',
        nocache: true
      }
    },
    {
      path: '/rebate/SaleSDConfigAdd', // 路径
      component: () => import('@v/orderModel/rebateManage/SaleSDConfigEdit'), // 页面
      name: 'SaleSDConfigAdd', // 名称
      hide: true,
      meta: {
        title: '销售SD配置编辑',
        nocache: true
      }
    },
    {
      path: '/rebate/platformCostConfigList', // 路径
      component: () => import('@v/orderModel/rebateManage/platformCostConfigList'), // 页面
      name: 'platformCostConfigList', // 名称
      meta: {
        title: '平台费用配置'
      }
    },
    {
      path: '/rebate/platformCostConfigEdit', // 路径
      component: () => import('@v/orderModel/rebateManage/platformCostConfigEdit'), // 页面
      name: 'platformCostConfigAdd', // 名称
      hide: true,
      meta: {
        title: '平台费用配置新增',
        nocache: true
      }
    },
    {
      path: '/rebate/platformCostConfigDetail', // 路径
      component: () => import('@v/orderModel/rebateManage/platformCostConfigDetail'), // 页面
      name: 'platformCostConfigDetail', // 名称
      hide: true,
      meta: {
        title: '平台费用配置详情',
        nocache: true
      }
    },
    {
      path: '/rebate/saleSDCollateList', // 路径
      component: () => import('@v/orderModel/rebateManage/saleSDCollateList'), // 页面
      name: 'saleSDCollateList', // 名称
      meta: {
        title: '销售SD核销配置'
      }
    }
  ]
}

export default route
