// 配置提醒
const route = {
  path: '/deployrRemind',
  name: 'deployrRemind',
  component: () => import('@/layout/index'),
  meta: {
    title: '配置提醒',
    icon: 'menu-icon el-icon-document'
  },
  children: [
    {
      path: '/deployrRemind/debtTermList', // 路径
      component: () => import('@v/orderModel/deployrRemindManage/debtTermList.vue'), // 页面
      name: 'deployrRemind-debtTermList', // 名称
      meta: {
        title: '账期提醒配置'
      }
    },
    {
      path: '/deployrRemind/debtTerm/edit', // 路径
      component: () => import('@v/orderModel/deployrRemindManage/debtTermEdit.vue'), // 页面
      name: 'deployrRemind-debtTermEdit', // 名称
      hide: true,
      meta: {
        nocache: true,
        title: '编辑账期提醒配置'
      }
    },
    {
      path: '/deployrRemind/debtTerm/add', // 路径
      component: () => import('@v/orderModel/deployrRemindManage/debtTermAdd.vue'), // 页面
      name: 'deployrRemind-debtTermAdd', // 名称
      hide: true,
      meta: {
        nocache: true,
        title: '新增账期提醒配置'
      }
    },
    {
      path: '/deployrRemind/debtTerm/detail', // 路径
      component: () => import('@v/orderModel/deployrRemindManage/debtTermDetail.vue'), // 页面
      name: 'deployrRemind-debtTermDetail', // 名称
      hide: true,
      meta: {
        nocache: true,
        title: '账期提醒配置详情'
      }
    }
  ]
}

export default route
