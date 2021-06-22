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

// 销售退货管理
const route = {
  path: '/return',
  name: 'return',
  component: () => import('@/layout/index/index'),
  meta: {
    title: '销售退货管理',
    icon: 'menu-icon el-icon-refresh'
  },
  children: [
    {
      path: '/sales/salesreturnorder', // 路径
      component: () => import('@v/orderModel/salesReturnManage/SalesReturnOrder'), // 页面
      name: 'SalesReturnOrder', // 名称
      meta: {
        title: '销售退货订单'
      }
    },
    {
      path: '/sales/salesreturndetail', // 路径
      component: () => import('@v/orderModel/salesReturnManage/SalesReturnDetail'), // 页面
      name: 'SalesReturnDetail', // 名称
      hide: true,
      meta: {
        title: '销售退货订单详情',
        nocache: true
      }
    },
    {
      path: '/sales/salesreturnadd', // 路径 id：01新增 其他编辑
      component: () => import('@v/orderModel/salesReturnManage/SalesReturnEdit'), // 页面
      name: 'SalesReturnAdd', // 名称
      hide: true,
      meta: {
        title: '销售退货订单新增',
        nocache: true
      }
    },
    {
      path: '/sales/salesreturnedit',
      component: () => import('@v/orderModel/salesReturnManage/SalesReturnEdit'), // 页面
      name: 'SalesReturnEdit', // 名称
      hide: true,
      meta: {
        title: '销售退货订单编辑',
        nocache: true
      }
    },
    {
      path: '/sales/returndeliveryorder',
      component: () => import('@v/orderModel/salesReturnManage/ReturnDeliveryOrder'), // 页面
      name: 'ReturnDeliveryOrder', // 名称
      meta: {
        title: '销售退货出库单'
      }
    },
    {
      path: '/sales/returndeliverydetail',
      component: () => import('@v/orderModel/salesReturnManage/ReturnDeliveryDetail'), // 页面
      name: 'ReturnDeliveryDetail', // 名称
      hide: true,
      meta: {
        title: '销售退货出库单详细',
        nocache: true
      }
    },
    {
      path: '/sales/returntallyorder',
      component: () => import('@v/orderModel/salesReturnManage/ReturnTallyOrder'), // 页面
      name: 'ReturnTallyOrder', // 名称
      meta: {
        title: '销售退理货单列表'
      }
    },
    {
      path: '/sales/returntallydetail',
      component: () => import('@v/orderModel/salesReturnManage/ReturnTallyDetail'), // 页面
      name: 'ReturnTallyDetail', // 名称
      hide: true,
      meta: {
        title: '销售退理货单详情',
        nocache: true
      }
    },
    {
      path: '/sales/returnreceiptorder',
      component: () => import('@v/orderModel/salesReturnManage/ReturnReceiptOrder'), // 页面
      name: 'ReturnReceiptOrder', // 名称
      meta: {
        title: '销售退货入库清单'
      }
    },
    {
      path: '/sales/returnreceiptdetail',
      component: () => import('@v/orderModel/salesReturnManage/ReturnReceiptDetail'), // 页面
      name: 'ReturnReceiptDetail', // 名称
      hide: true,
      meta: {
        title: '销售退货入库单详情',
        nocache: true
      }
    },
    {
      path: '/sales/putonshelves',
      component: () => import('@v/orderModel/salesReturnManage/PutOnShelves'), // 页面
      name: 'PutOnShelves', // 名称
      hide: true,
      meta: {
        title: '上架入库',
        nocache: true
      }
    },
    {
      path: '/sales/deliveryorder',
      component: () => import('@v/orderModel/salesReturnManage/DeliveryOrder'), // 页面
      name: 'DeliveryOrder', // 名称
      hide: true,
      meta: {
        title: '出库打托',
        nocache: true
      }
    }
  ]
}

export default route
