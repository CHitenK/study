// 收款管理
const route = {
  path: '/payment',
  name: 'payment',
  component: () => import('@/layout/index'),
  meta: {
    title: '付款管理',
    icon: 'menu-icon el-icon-bank-card'
  },
  children: [
    {
      path: '/payment/AdvancePayment', // 路径
      component: () => import('@v/orderModel/paymentManage/AdvancePayment.vue'), // 页面
      name: 'AdvancePayment', // 名称
      meta: {
        title: '预付款单列表'
      }
    },
    {
      path: '/payment/AdvancePaymentAdd', // 路径
      component: () => import('@v/orderModel/paymentManage/AdvancePaymentEdit.vue'), // 页面
      name: 'AdvancePaymentAdd', // 名称
      hide: true,
      meta: {
        title: '预付款单新增',
        nocache: true
      }
    },
    {
      path: '/payment/AdvancePaymentEdit', // 路径
      component: () => import('@v/orderModel/paymentManage/AdvancePaymentEdit.vue'), // 页面
      name: 'AdvancePaymentEdit', // 名称
      hide: true,
      meta: {
        title: '预付款单编辑',
        nocache: true
      }
    },
    {
      path: '/payment/AdvancePaymentDetail', // 路径
      component: () => import('@v/orderModel/paymentManage/AdvancePaymentDetail.vue'), // 页面
      name: 'AdvancePaymentDetail', // 名称
      hide: true,
      meta: {
        title: '预付款单详情',
        nocache: true
      }
    },
    {
      path: '/payment/BillsPayable', // 路径
      component: () => import('@v/orderModel/paymentManage/BillsPayable.vue'), // 页面
      name: 'BillsPayable', // 名称
      meta: {
        title: '应付账单列表'
      }
    },
    {
      path: '/payment/BillsPayableAdd', // 路径
      component: () => import('@v/orderModel/paymentManage/BillsPayableEdit.vue'), // 页面
      name: 'BillsPayableAdd', // 名称
      hide: true,
      meta: {
        title: '应付账单新增',
        nocache: true
      }
    },
    {
      path: '/payment/BillsPayableEdit', // 路径
      component: () => import('@v/orderModel/paymentManage/BillsPayableEdit.vue'), // 页面
      name: 'BillsPayableEdit', // 名称
      hide: true,
      meta: {
        title: '应付账单编辑',
        nocache: true
      }
    },
    {
      path: '/payment/BillsPayableDetail', // 路径
      component: () => import('@v/orderModel/paymentManage/BillsPayableDetail.vue'), // 页面
      name: 'BillsPayableDetail', // 名称
      hide: true,
      meta: {
        title: '应付账单详情',
        nocache: true
      }
    }
  ]
}

export default route
