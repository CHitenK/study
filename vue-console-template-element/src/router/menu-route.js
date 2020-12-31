/**
 *  参数说明
 *  path 路径 (必填)
 *  name 名称 可填
 *  component 组件 (必填)
 *  redirect 跳转路径 redirect不为空时,不显示二级菜单
 *  meta
 *    title 显示在tag栏, 左侧菜单栏名称名称 (必填)
 *    affix 是否固定在tag栏 children为空生效  可填
 *    hide  是否不展现在菜单栏 可填
 */

// 路由
const route = [
  {
    path: '/content',
    name: 'content',
    component: () => import('@/layout/index/index'),
    meta: {
      title: '菜单一'
    },
    children: [
      {
        path: '/content/home', // 路径
        component: () => import('@v/home/index'), // 页面
        name: 'home', // 名称
        meta: {
          title: '积木1'
        },
        children: [
          {
            path: '/content/home/page1', // 路径
            component: () => import('@v/home/page1'), // 页面
            name: 'home-page1', // 名称
            meta: {
              title: '默认首页',
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
          hide: false // 是否不展现在菜单栏
        }
      },
      {
        path: '/content/page3', // 路径
        component: () => import('@v/home/page3'), // 页面
        name: 'home-page3', // 名称
        meta: {
          title: '页面3',
          hide: false // 是否不展现在菜单栏
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
      title: '菜单二'
    },
    children: [
      {
        path: '/mine/index', // 路径
        component: () => import('@v/mine/index'), // 页面
        meta: {
          title: '菜单二',
          hide: true // 是否不展现在菜单栏
        }
      }
    ]
  },
  {
    path: '/main',
    name: 'content',
    component: () => import('@/layout/index/index'),
    // redirect: '/main/index', // redirect不为空时,不显示二级菜单
    meta: {
      title: '菜单三'
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
        path: '/main/page3/:id', // 路径
        component: () => import('@v/mine/page3'), // 页面
        name: 'main-page3', // 名称
        meta: {
          title: 'caier3'
        }
      }
    ]
  }
]

export default route
