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

// 仓储管理
const route = {
  path: '/storage',
  name: 'storage',
  component: () => import('@/layout/index'),
  meta: {
    title: '仓储管理',
    icon: 'menu-icon el-icon-house'
  },
  children: [
    {
      path: '/storage/orderlist', // 路径
      component: () => import('@v/storageModel/storageManage/orderList'), // 页面
      name: 'storage-orderList', // 名称
      meta: {
        title: '盘点指令列表',
        affix: true
      }
    },
    {
      path: '/storage/order/edit/:id', // 路径
      component: () => import('@v/storageModel/storageManage/orderEdit'), // 页面
      name: 'storage-orderEdit', // 名称
      hide: true,
      meta: {
        nocache: true,
        title: '盘点指令编辑' // 约定id为01是新增，其他为编辑
      }
    },
    {
      path: '/storage/orderdetail', // 路径
      component: () => import('@v/storageModel/storageManage/orderDetail'), // 页面
      name: 'storage-orderDetail', // 名称
      hide: true,
      meta: {
        nocache: true,
        title: '盘点指令详情'
      }
    },
    {
      path: '/storage/resultlist', // 路径
      component: () => import('@v/storageModel/storageManage/resultList'), // 页面
      name: 'storage-resultList', // 名称
      meta: {
        title: '盘点结果列表'
      }
    },
    {
      path: '/storage/resultdetail', // 路径
      component: () => import('@v/storageModel/storageManage/resultDetail'), // 页面
      name: 'storage-resultDeatil', // 名称
      hide: true,
      meta: {
        title: '盘点结果列表-详情',
        nocache: true
      }
    },
    {
      path: '/storage/typelist', // 路径
      component: () => import('@v/storageModel/storageManage/typeList'), // 页面
      name: 'storage-typelist', // 名称
      meta: {
        title: '仓储类型调整'
      }
    },
    {
      path: '/storage/typedetail', // 路径
      component: () => import('@v/storageModel/storageManage/typeDetail'), // 页面
      name: 'storage-typedetail', // 名称
      hide: true,
      meta: {
        title: '仓储类型调整-详情',
        nocache: true
      }
    },
    {
      path: '/storage/stocklist', // 路径
      component: () => import('@v/storageModel/storageManage/stockList'), // 页面
      name: 'storage-stocklist', // 名称
      meta: {
        title: '仓储库存调整'
      }
    },
    {
      path: '/storage/stockdetail', // 路径
      component: () => import('@v/storageModel/storageManage/stockDetail'), // 页面
      name: 'storage-stockdetail', // 名称
      hide: true,
      meta: {
        title: '仓储库存调整-详情',
        nocache: true
      }
    }
  ]
}

export default route
