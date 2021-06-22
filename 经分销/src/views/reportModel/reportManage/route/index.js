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

// 报表管理
const route = {
  path: '/report',
  name: 'report',
  component: () => import('@/layout/index/index'),
  meta: {
    title: '报表管理',
    icon: 'menu-icon el-icon-notebook-2'
  },
  children: [
    {
      path: '/report/financiallist', // 路径
      component: () => import('@v/reportModel/reportManage/FinancialList'), // 页面
      name: 'FinancialList', // 名称
      meta: {
        title: '财务进销存关账'
      }
    },
    {
      path: '/report/yunjidaily', // 路径
      component: () => import('@v/reportModel/reportManage/YunjiDaily'), // 页面
      name: 'YunjiDaily', // 名称
      meta: {
        title: '云集采销日报'
      }
    },
    {
      path: '/report/purchasedaily', // 路径
      component: () => import('@v/reportModel/reportManage/PurchaseDaily'), // 页面
      name: 'PurchaseDaily', // 名称
      meta: {
        title: '购销采销日报'
      }
    },
    {
      path: '/report/reporttask', // 路径
      component: () => import('@v/reportModel/reportManage/ReportTask'), // 页面
      name: 'ReportTask', // 名称
      meta: {
        title: '报表任务列表'
      }
    },
    {
      path: '/report/pobillreport', // 路径
      component: () => import('@v/reportModel/reportManage/PoBillReport'), // 页面
      name: 'PoBillReport', // 名称
      meta: {
        title: '唯品PO账单核销报表'
      }
    },
    {
      path: '/report/poverifidetail/:id', // 路径
      component: () => import('@v/reportModel/reportManage/PoVerifiDetail'), // 页面
      name: 'PoVerifiDetail', // 名称
      hide: true,
      meta: {
        title: '唯品PO账单核销报表详情',
        nocache: true
      }
    },
    {
      path: '/report/instockday', // 路径
      component: () => import('@v/reportModel/reportManage/InStockDay'), // 页面
      name: 'InStockDay', // 名称
      meta: {
        title: '商品在库天数'
      }
    },
    {
      path: '/report/inventorydrop', // 路径
      component: () => import('@v/reportModel/reportManage/InventoryDrop'), // 页面
      name: 'InventoryDrop', // 名称
      meta: {
        title: '存货跌价准备'
      }
    },
    {
      path: '/report/businessfinancial', // 路径
      component: () => import('@v/reportModel/reportManage/BusinessFinancial'), // 页面
      name: 'BusinessFinancial', // 名称
      meta: {
        title: '事业部财务进销存'
      }
    },
    {
      path: '/report/businesssummary', // 路径
      component: () => import('@v/reportModel/reportManage/BusinessSummary'), // 页面
      name: 'BusinessSummary', // 名称
      meta: {
        title: '事业部业务进销存'
      }
    },
    {
      path: '/report/cumulativesummary', // 路径
      component: () => import('@v/reportModel/reportManage/CumulativeSummary'), // 页面
      name: 'CumulativeSummary', // 名称
      meta: {
        title: '累计汇总表'
      }
    },
    {
      path: '/report/salestarget', // 路径
      component: () => import('@v/reportModel/reportManage/SalesTarget'), // 页面
      name: 'SalesTarget', // 名称
      meta: {
        title: '销售目标达成率'
      }
    }
  ]
}

export default route
