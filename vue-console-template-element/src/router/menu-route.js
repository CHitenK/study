// 路由
const route = [
  {
    path: '/content',
    name: 'content',
    component: () => import('@/layout/index/index'),
    meta: {
      title: '菜单一',
      affix: true
    },
    children: [
      {
        path: '/content/home', // 路径
        component: () => import('@v/home/index'), // 页面
        name: 'home', // 名称
        meta: {
          title: '积木1',
          affix: true
        },
        children: [
          {
            path: '/content/home/page1', // 路径
            component: () => import('@v/home/page1'), // 页面
            name: 'home-page1', // 名称
            meta: {
              title: '页面一',
              affix: true
            }
          }
        ]
      },
      {
        path: '/content/page2', // 路径
        component: () => import('@v/home/page2'), // 页面
        name: 'home-page2', // 名称
        meta: {
          title: '页面2',
          hide: false, // 是否不展现在菜单栏
          affix: true
        }
      },
      {
        path: '/content/page3', // 路径
        component: () => import('@v/home/page3'), // 页面
        name: 'home-page3', // 名称
        meta: {
          title: '页面3',
          hide: false, // 是否不展现在菜单栏
          affix: true
        }
      }
    ]
  },
  {
    path: '/mine',
    name: 'content',
    component: () => import('@/layout/index/index'),
    redirect: '/mine/index', // redirect不为空时,不显示二级菜单
    meta: {
      title: '菜单二',
      affix: true
    },
    children: [
      {
        path: '/mine/index', // 路径
        component: () => import('@v/mine/index'), // 页面
        name: 'home', // 名称
        meta: {
          title: 'caier1',
          hide: true, // 是否不展现在菜单栏
        }
      },
    ]
  },
  {
    path: '/main',
    name: 'content',
    component: () => import('@/layout/index/index'),
    // redirect: '/main/index', // redirect不为空时,不显示二级菜单
    meta: {
      title: '菜单三',
      affix: true
    },
    children: [
      {
        path: '/main/page1', // 路径
        component: () => import('@v/mine/page1'), // 页面
        name: 'main-page1', // 名称
        meta: {
          title: 'caier1'
        }
      },
      {
        path: '/main/page2', // 路径
        component: () => import('@v/mine/page2'), // 页面
        name: 'main-page2', // 名称
        meta: {
          title: 'caier2'
        }
      },
      {
        path: '/main/page3', // 路径
        component: () => import('@v/mine/page3'), // 页面
        name: 'main-page3', // 名称
        meta: {
          title: 'caier3'
        }
      },
    ]
  }
]

export default route
