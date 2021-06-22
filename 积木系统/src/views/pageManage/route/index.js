import Layout from '@/layout'
const buildBlockRouter = {
  path: '/pageManage', // 路径
  component: Layout, // 页面组建
  redirect: '/pageManage/buildBlockList', // 面包屑路径
  alwaysShow: true, // 显示
  name: 'pageManage', // 名字
  meta: {
    title: '页面配置管理', // 显示在菜单栏的title
    icon: 'lock' // icon
    // roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: 'buildBlockList', // 路径
      component: () => import('@/views/pageManage/views/buildBlock/list'), // 页面
      name: 'buildBlockList', // 名称
      meta: {
        title: '积木',
        affix: true
      }
    },
    {
      path: 'copySpecial', // 路径
      component: () => import('@/views/pageManage/views/buildBlock/copySpecial'), // 页面
      name: 'copySpecial', // 名称
      meta: {
        title: '跨渠道便捷操作'
      }
    },
    {
      path: 'buildBlockLogs/:id', // 路径
      component: () => import('@/views/pageManage/views/buildBlock/logsList'), // 页面
      name: 'buildBlockLogs', // 名称
      hidden: true, // 显示
      meta: {
        title: '操作日志',
        affix: false
      }
    },
    {
      path: 'buildBlockAdd', // 路径
      component: () => import('@/views/pageManage/views/buildBlock/add/index'), // 页面
      name: 'buildBlockAdd', // 名称
      hidden: true, // 显示
      meta: {
        title: '积木-新增专题',
        affix: false
      }
    },
    {
      path: 'buildBlockEdit', // 路径
      component: () => import('@/views/pageManage/views/buildBlock/edit/index'), // 页面
      name: 'buildBlockEdit', // 名称
      hidden: true, // 显示
      meta: {
        title: '积木-编辑专题',
        affix: false
      }
    }
  ]
}

export default buildBlockRouter
