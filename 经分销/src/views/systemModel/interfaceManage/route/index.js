// 接口管理
const route = {
  path: '/interface',
  name: 'interface',
  component: () => import('@/layout/index'),
  meta: {
    title: '接口管理',
    icon: 'menu-icon el-icon-receiving'
  },
  children: [
    {
      path: '/interface/configList', // 路径
      component: () => import('@v/systemModel/interfaceManage/configList'), // 页面
      name: 'interface-config', // 名称
      meta: {
        title: '接口配置管理'
      }
    }
  ]
}

export default route
