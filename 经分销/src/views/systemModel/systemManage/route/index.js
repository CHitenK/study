// 系统管理
const route = {
  path: '/system',
  name: 'system',
  component: () => import('@/layout/index'),
  meta: {
    title: '系统管理',
    icon: 'menu-icon el-icon-coin'
  },
  children: [
    {
      path: '/system/userlist', // 路径
      component: () => import('@v/systemModel/systemManage/userList'), // 页面
      name: 'system-userList', // 名称
      meta: {
        title: '用户管理'
      }
    }
  ]
}

export default route
