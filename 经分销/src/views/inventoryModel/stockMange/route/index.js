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

// 库存管理
const route = {
  path: '/stock',
  name: 'stock',
  component: () => import('@/layout/index/index'),
  meta: {
    title: '库存管理',
    icon: 'menu-icon el-icon-coin'
  },
  children: [
    {
      path: '/stock/batchstock', // 路径
      component: () => import('@v/inventoryModel/stockMange/BatchStock'), // 页面
      name: 'BatchStock', // 名称
      meta: {
        title: '批次库存明细'
      }
    },
    {
      path: '/stock/goodsstock', // 路径
      component: () => import('@v/inventoryModel/stockMange/GoodsStock'), // 页面
      name: 'GoodsStock', // 名称
      meta: {
        title: '商品库存明细'
      }
    },
    {
      path: '/stock/goodsdispatch', // 路径
      component: () => import('@v/inventoryModel/stockMange/GoodsDispatch'), // 页面
      name: 'GoodsDispatch', // 名称
      meta: {
        title: '商品收发明细'
      }
    },
    {
      path: '/stock/validitywarn', // 路径
      component: () => import('@v/inventoryModel/stockMange/ValidityWarn'), // 页面
      name: 'ValidityWarn', // 名称
      meta: {
        title: '效期预警'
      }
    },
    {
      path: '/stock/realtimestock', // 路径
      component: () => import('@v/inventoryModel/stockMange/RealtimeStock'), // 页面
      name: 'RealtimeStock', // 名称
      meta: {
        title: '实时库存'
      }
    },
    {
      path: '/stock/monthlystock', // 路径
      component: () => import('@v/inventoryModel/stockMange/MonthlyStock'), // 页面
      name: 'MonthlyStock', // 名称
      meta: {
        title: '月库存转结'
      }
    },
    {
      path: '/stock/monthlystockdetail/:id', // 路径
      component: () => import('@v/inventoryModel/stockMange/MonthlyStockDetail'), // 页面
      name: 'MonthlyStockDetail', // 名称
      hide: true,
      meta: {
        title: '库存月结详情',
        nocache: true
      }
    },
    {
      path: '/stock/goodsdispatchcount', // 路径
      component: () => import('@v/inventoryModel/stockMange/GoodsDispatchCount'), // 页面
      name: 'GoodsDispatchCount', // 名称
      meta: {
        title: '商品收发汇总'
      }
    },
    {
      path: '/stock/batchsnapshot', // 路径
      component: () => import('@v/inventoryModel/stockMange/BatchSnapshot'), // 页面
      name: 'BatchSnapshot', // 名称
      meta: {
        title: '批次库存快照'
      }
    },
    {
      path: '/stock/stockopening', // 路径
      component: () => import('@v/inventoryModel/stockMange/StockOpening'), // 页面
      name: 'StockOpening', // 名称
      meta: {
        title: '库存期初列表'
      }
    },
    {
      path: '/stock/goodssnapshot', // 路径
      component: () => import('@v/inventoryModel/stockMange/GoodsSnapshot'), // 页面
      name: 'GoodsSnapshot', // 名称
      meta: {
        title: '商品库存快照列表'
      }
    },
    {
      path: '/stock/monthlysnapshot', // 路径
      component: () => import('@v/inventoryModel/stockMange/MonthlySnapshot'), // 页面
      name: 'MonthlySnapshot', // 名称
      meta: {
        title: '月结快照'
      }
    },
    {
      path: '/stock/realtimesnapshot', // 路径
      component: () => import('@v/inventoryModel/stockMange/RealtimeSnapshot'), // 页面
      name: 'RealtimeSnapshot', // 名称
      meta: {
        title: '实时库存快照'
      }
    },
    {
      path: '/stock/businessstock', // 路径
      component: () => import('@v/inventoryModel/stockMange/BusinessStock'), // 页面
      name: 'BusinessStock', // 名称
      meta: {
        title: '事业部仓库库存'
      }
    }
  ]
}

export default route
