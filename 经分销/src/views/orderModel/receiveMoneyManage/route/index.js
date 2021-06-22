// 收款管理
const route = {
  path: '/receiveMoney',
  name: 'receiveMoney',
  component: () => import('@/layout/index'),
  meta: {
    title: '收款管理',
    icon: 'menu-icon el-icon-bank-card'
  },
  children: [
    {
      path: '/receivemoney/toBTrackList', // 路径
      component: () => import('@v/orderModel/receiveMoneyManage/toBTrackList.vue'), // 页面
      name: 'receivemoney-toBTrackList', // 名称
      meta: {
        title: 'To B收款跟踪表'
      }
    },
    {
      path: '/receivemoney/toBWriteoffList', // 路径
      component: () => import('@v/orderModel/receiveMoneyManage/toBWriteoffList.vue'), // 页面
      name: 'receivemoney-toBWriteoffList', // 名称
      meta: {
        title: 'To B暂估核销列表'
      }
    },
    {
      path: '/receivemoney/toBWriteoffDetail', // 路径
      component: () => import('@v/orderModel/receiveMoneyManage/toBWriteoffDetail.vue'), // 页面
      name: 'receivemoney-toBWriteoffDetail', // 名称
      hide: true,
      meta: {
        title: 'To B暂估核销详情',
        nocache: true
      }
    },
    {
      path: '/receivemoney/receivableAccountList', // 路径
      component: () => import('@v/orderModel/receiveMoneyManage/receivableAccountList.vue'), // 页面
      name: 'receivemoney-receivableAccountList', // 名称
      meta: {
        title: '应收账龄报告'
      }
    },
    {
      path: '/receivemoney/AdvanceReceipt', // 路径
      component: () => import('@v/orderModel/receiveMoneyManage/AdvanceReceipt'), // 页面
      name: 'AdvanceReceipt', // 名称
      meta: {
        title: '预收账单列表',
        nocache: true
      }
    },
    {
      path: '/receivemoney/AdvanceReceiptAdd', // 路径
      component: () => import('@v/orderModel/receiveMoneyManage/AdvanceReceiptEdit'), // 页面
      name: 'AdvanceReceiptAdd', // 名称
      hide: true,
      meta: {
        title: '预收账单新增',
        nocache: true
      }
    },
    {
      path: '/receivemoney/AdvanceReceiptEdit', // 路径
      component: () => import('@v/orderModel/receiveMoneyManage/AdvanceReceiptEdit'), // 页面
      name: 'AdvanceReceiptEdit', // 名称
      hide: true,
      meta: {
        title: '预收账单编辑',
        nocache: true
      }
    },
    {
      path: '/receivemoney/AdvanceReceiptDetail', // 路径
      component: () => import('@v/orderModel/receiveMoneyManage/AdvanceReceiptDetail'), // 页面
      name: 'AdvanceReceiptDetail', // 名称
      hide: true,
      meta: {
        title: '预收账单详情',
        nocache: true
      }
    },
    {
      path: '/receivemoney/toCSettlementList', // 路径
      component: () => import('@v/orderModel/receiveMoneyManage/toCSettlementList'), // 页面
      name: 'toCSettlementList', // 名称
      meta: {
        title: 'To C结算单列表'
      }
    },
    {
      path: '/receivemoney/toCSettlemenDetail', // 路径
      component: () => import('@v/orderModel/receiveMoneyManage/toCSettlemenDetail'), // 页面
      name: 'toCSettlemenDetail', // 名称
      hide: true,
      meta: {
        title: '应收详情',
        nocache: true
      }
    },
    {
      path: '/receivemoney/toCSettlementEdit', // 路径
      component: () => import('@v/orderModel/receiveMoneyManage/toCSettlementEdit'), // 页面
      name: 'toCSettlementEdit', // 名称
      hide: true,
      meta: {
        title: 'to_c结算编辑',
        nocache: true
      }
    },
    {
      path: '/receivemoney/createBill', // 路径
      component: () => import('@v/orderModel/receiveMoneyManage/createBill'), // 页面
      name: 'createBill', // 名称
      hide: true,
      meta: {
        title: '开票',
        nocache: true
      }
    },
    {
      path: '/receivemoney/repairDeduction', // 路径
      component: () => import('@v/orderModel/receiveMoneyManage/repairDeduction'), // 页面
      name: 'repairDeduction', // 名称
      hide: true,
      meta: {
        title: '补充费用信息',
        nocache: true
      }
    }
  ]
}

export default route
