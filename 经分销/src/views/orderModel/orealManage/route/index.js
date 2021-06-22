
// 品牌管理
const route = {
  path: '/oreal',
  name: 'oreal',
  component: () => import('@/layout/index'),
  meta: {
    title: '欧莱雅管理',
    icon: 'menu-icon el-icon-s-claim'
  },
  children: [
    {
      path: '/oreal/purchaseorderList', // 路径
      component: () => import('@v/orderModel/orealManage/purchaseorderList.vue'), // 页面
      name: 'oreal-purchaseorderList', // 名称
      meta: {
        title: '欧莱雅采购订单'
      }
    },
    {
      path: '/oreal/purchaseorderDetail', // 路径
      component: () => import('@v/orderModel/orealManage/purchaseorderDetail.vue'), // 页面
      name: 'oreal-purchaseorderDetail', // 名称
      hide: true,
      meta: {
        title: '采购订单详情',
        nocache: true
      }
    },
    {
      path: '/oreal/supplierGoodsList', // 路径
      component: () => import('@v/orderModel/orealManage/supplierGoodsList.vue'), // 页面
      name: 'oreal-supplierGoodsList', // 名称
      meta: {
        title: '欧莱雅商品'
      }
    }
  ]
}

export default route
