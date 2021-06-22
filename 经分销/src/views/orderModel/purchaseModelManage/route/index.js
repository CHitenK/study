// 采购模型管理
const route = {
  path: '/purchasemodel',
  name: 'purchasemodel',
  component: () => import('@/layout/index'),
  meta: {
    title: '采购模型管理',
    icon: 'menu-icon el-icon-document'
  },
  children: [
    {
      path: '/purchasemodel/promotionRecordList', // 路径
      component: () => import('@v/orderModel/purchaseModelManage/promotionRecordList'), // 页面
      name: 'purchasemodel-promotionRecordList', // 名称
      meta: {
        title: '促销记录'
      }
    }
  ]
}

export default route
