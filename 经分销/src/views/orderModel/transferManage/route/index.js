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

// 调拨管理
const route = {
  path: '/transfer',
  name: 'transfer',
  component: () => import('@/layout/index'),
  meta: {
    title: '调拨管理',
    icon: 'menu-icon el-icon-s-operation'
  },
  children: [
    {
      path: '/transfer/orderList', // 路径
      component: () => import('@v/orderModel/transferManage/orderList'), // 页面
      name: 'transfer-orderList', // 名称
      meta: {
        title: '调拨订单列表'
      }
    },
    {
      path: '/transfer/orderEdit/edit', // 路径
      component: () => import('@v/orderModel/transferManage/orderEdit'), // 页面
      name: 'transfer-orderEdit', // 名称
      hide: true,
      meta: {
        nocache: true,
        title: '编辑调拨订单' // id=01为新增 其他为编辑
      }
    },
    {
      path: '/transfer/orderEdit/add', // 路径
      component: () => import('@v/orderModel/transferManage/orderAdd'), // 页面
      name: 'transfer-orderAdd', // 名称
      hide: true,
      meta: {
        nocache: true,
        title: '新增调拨订单' // id=01为新增 其他为编辑
      }
    },
    {
      path: '/transfer/orderDetail', // 路径
      component: () => import('@v/orderModel/transferManage/orderDetail'), // 页面
      name: 'transfer-orderDetail', // 名称
      hide: true,
      meta: {
        title: '调拨订单详情',
        nocache: true
      }
    },
    {
      path: '/transfer/outWarehouse', // 路径
      component: () => import('@v/orderModel/transferManage/outWarehouse'), // 页面
      name: 'transfer-outWarehouse', // 名称
      hide: true,
      meta: {
        title: '打托出库',
        nocache: true
      }
    },
    {
      path: '/transfer/inWarehouse', // 路径
      component: () => import('@v/orderModel/transferManage/inWarehouse'), // 页面
      name: 'transfer-inWarehouse', // 名称
      hide: true,
      meta: {
        title: '上架入库',
        nocache: true
      }
    },
    {
      path: '/transfer/tallyList', // 路径
      component: () => import('@v/orderModel/transferManage/tallyList'), // 页面
      name: 'transfer-tallyList', // 名称
      meta: {
        title: '调拨理货单列表'
      }
    },
    {
      path: '/transfer/tallyDetail', // 路径
      component: () => import('@v/orderModel/transferManage/tallyDetail'), // 页面
      name: 'transfer-tallyDetail', // 名称
      hide: true,
      meta: {
        title: '调拨理货单详情',
        nocache: true
      }
    },
    {
      path: '/transfer/deliveryList', // 路径
      component: () => import('@v/orderModel/transferManage/deliveryList'), // 页面
      name: 'transfer-deliveryList', // 名称
      meta: {
        title: '调拨出库列表'
      }
    },
    {
      path: '/transfer/deliveryDetail', // 路径
      component: () => import('@v/orderModel/transferManage/deliveryDetail'), // 页面
      name: 'transfer-deliveryDetail', // 名称
      hide: true,
      meta: {
        title: '调拨出库详情',
        nocache: true
      }
    },
    {
      path: '/transfer/warehouseList', // 路径
      component: () => import('@v/orderModel/transferManage/warehouseList'), // 页面
      name: 'transfer-warehouseList', // 名称
      meta: {
        title: '调拨入库列表'
      }
    },
    {
      path: '/transfer/warehouseDetail', // 路径
      component: () => import('@v/orderModel/transferManage/warehouseDetail'), // 页面
      name: 'transfer-warehouseDetail', // 名称
      hide: true,
      meta: {
        title: '调拨入库详情',
        nocache: true
      }
    },
    {
      path: '/transfer/transferFlow', // 路径
      component: () => import('@v/orderModel/transferManage/transferFlow'), // 页面
      name: 'transfer-transferFlow', // 名称
      meta: {
        title: '调出调入流水',
        nocache: true
      }
    }
  ]
}

export default route
