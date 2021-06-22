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

// 账单管理
const route = {
  path: '/bill',
  name: 'bill',
  component: () => import('@/layout/index/index'),
  meta: {
    title: '账单管理',
    icon: 'menu-icon el-icon-tickets'
  },
  children: [
    {
      path: '/bill/statementlist', // 路径
      component: () => import('@v/reportModel/billManage/StatementList'), // 页面
      name: 'StatementList', // 名称
      meta: {
        title: '结算单列表'
      }
    },
    {
      path: '/bill/costmanage', // 路径
      component: () => import('@v/reportModel/billManage/CostManage'), // 页面
      name: 'CostManage', // 名称
      meta: {
        title: '费项配置'
      }
    },
    {
      path: '/bill/collectionverify', // 路径
      component: () => import('@v/reportModel/billManage/CollectionVerify'), // 页面
      name: 'CollectionVerify', // 名称
      meta: {
        title: '收款核销跟踪'
      }
    },
    {
      path: '/bill/statementdetail/:id', // 路径
      component: () => import('@v/reportModel/billManage/StatementDetail'), // 页面
      name: 'StatementDetail', // 名称
      hide: true,
      meta: {
        title: '结算单详情'
      }
    },
    {
      path: '/bill/receivebill', // 路径
      component: () => import('@v/reportModel/billManage/ReceiveBill'), // 页面
      name: 'ReceiveBill', // 名称
      meta: {
        title: '应收账单'
      }
    },
    {
      path: '/bill/ncreceipt', // 路径
      component: () => import('@v/reportModel/billManage/NcReceipt'), // 页面
      name: 'NcReceipt', // 名称
      meta: {
        title: 'NC收支费项'
      }
    },
    {
      path: '/bill/statementplatform', // 路径
      component: () => import('@v/reportModel/billManage/StatementPlatform'), // 页面
      name: 'StatementPlatform', // 名称
      meta: {
        title: '平台结算单'
      }
    },
    {
      path: '/bill/receiveinvoice', // 路径
      component: () => import('@v/reportModel/billManage/ReceiveInvoice'), // 页面
      name: 'ReceiveInvoice', // 名称
      meta: {
        title: '应收发票库'
      }
    },
    {
      path: '/bill/tocestimated', // 路径
      component: () => import('@v/reportModel/billManage/TocEstimated'), // 页面
      name: 'TocEstimated', // 名称
      meta: {
        title: 'To-C暂估应收表'
      }
    },
    {
      path: '/bill/tocsettlement', // 路径
      component: () => import('@v/reportModel/billManage/TocSettlement'), // 页面
      name: 'TocSettlement', // 名称
      meta: {
        title: 'To-C结算列表'
      }
    },
    {
      path: '/bill/settlementimport', // 路径
      component: () => import('@v/reportModel/billManage/SettlementImport'), // 页面
      name: 'SettlementImport', // 名称
      hide: true,
      meta: {
        title: '结算单导入'
      }
    },
    {
      path: '/bill/receivebilldetail/:id', // 路径
      component: () => import('@v/reportModel/billManage/ReceivebillDetail'), // 页面
      name: 'ReceivebillDetail', // 名称
      hide: true,
      meta: {
        title: '应收详情'
      }
    },
    {
      path: '/bill/platformdetail/:id', // 路径
      component: () => import('@v/reportModel/billManage/PlatformDetail'), // 页面
      name: 'PlatformDetail', // 名称
      hide: true,
      meta: {
        nocache: true,
        title: '平台结算单详情'
      }
    },
    {
      path: '/bill/feelistdetail/:id', // 路径
      component: () => import('@v/reportModel/billManage/FeelistDetail'), // 页面
      name: 'FeelistDetail', // 名称
      hide: true,
      meta: {
        title: '平台费用单详情'
      }
    },
    {
      path: '/bill/tocestimateddetail', // 路径
      component: () => import('@v/reportModel/billManage/TocEstimatedDetail'), // 页面
      name: 'TocEstimatedDetail', // 名称
      hide: true,
      meta: {
        nocache: true,
        title: 'To-C暂估应收表详情'
      }
    },
    {
      path: '/bill/createreceivable', // 路径
      component: () => import('@v/reportModel/billManage/CreateReceivable'), // 页面
      name: 'CreateReceivable', // 名称
      hide: true,
      meta: {
        title: '创建应收'
      }
    },
    {
      path: '/bill/uploadinvoice', // 路径
      component: () => import('@v/reportModel/billManage/UploadInvoice'), // 页面
      name: 'UploadInvoice', // 名称
      hide: true,
      meta: {
        title: '上传盖章发票'
      }
    },
    {
      path: '/bill/tocsettlementadd', // 路径
      component: () => import('@v/reportModel/billManage/TocSettlementAdd'), // 页面
      name: 'TocSettlementAdd', // 名称
      hide: true,
      meta: {
        title: '新增to-c结算账单'
      }
    },
    {
      path: '/bill/receivebillinvoice', // 路径
      component: () => import('@v/reportModel/billManage/ReceiveBillInvoice'), // 页面
      name: 'ReceiveBillInvoice', // 名称
      hide: true,
      meta: {
        title: '发票详情'
      }
    },
    {
      path: '/bill/invoicedetail', // 路径
      component: () => import('@v/reportModel/billManage/InvoiceDetail'), // 页面
      name: 'InvoiceDetail', // 名称
      hide: true,
      meta: {
        title: '发票详情'
      }
    },
    {
      path: '/bill/ReplacementInvoice', // 路径
      component: () => import('@v/reportModel/billManage/ReplacementInvoice'), // 页面
      name: 'ReplacementInvoice', // 名称
      hide: true,
      meta: {
        title: '替换发票'
      }
    }
  ]
}

export default route
