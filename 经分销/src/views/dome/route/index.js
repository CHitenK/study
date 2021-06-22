/**
 *  参数说明
 *  path 路由的完整路径 (必填)
 *  name 名称 可填
 *  component 组件 (必填)
 *  redirect 跳转路径 redirect不为空时,不显示二级菜单
 *  hide  是否不展现在菜单栏 可填
 *  meta
 *    title 显示在tag栏, 左侧菜单栏名称名称 (必填)
 *    affix 是否固定tab栏
 */

// 路由
const route = 
  {
    path: '/content',
    name: 'content',
    component: () => import('@/layout/index'),
    meta: {
      title: '示例菜单',
      icon: 'menu-icon el-icon-s-home'
    },
    children: [
      {
        path: '/content/dome', // 路径
        component: () => import('@v/dome/views/list'), // 页面
        name: 'dome-index', // 名称
        meta: {
          title: '列表页',
          affix: false
        }
      },
      // {
      //   path: '/content/home', // 路径
      //   component: () => import('@/layout/index/components/newLayView'), // 页面
      //   name: 'dome-index', // 名称
      //   meta: {
      //     title: '三级菜单'
      //   },
      //   children: [
      //     {
      //       path: '/content/home/page1', // 路径
      //       component: () => import('./../views/page1'), // 页面
      //       name: 'home-page3', // 名称
      //       meta: {
      //         title: '三级菜单1'
      //       }
      //     },
      //     {
      //       path: '/content/home/page2', // 路径
      //       component: () => import('./../views/page1'), // 页面
      //       name: 'home-page4', // 名称
      //       meta: {
      //         title: '三级菜单2'
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: '/content/tinymc', // 路径
      //   component: () => import('./../views/tinymc'), // 页面
      //   name: 'dome-tinymc', // 名称
      //   meta: {
      //     title: '富文本',
      //     affix: true
      //   }
      // }
    ]
  }
  // {
  //   path: '/mine/detail',
  //   name: 'content',
  //   component: () => import('@/layout/index/index'),
  //   redirect: '/mine/detail', // redirect不为空时,不显示二级菜单
  //   meta: {
  //     title: '详情',
  //     icon: 'menu-icon el-icon-s-home'
  //   },
  //   children: [
  //     {
  //       path: '/mine/detail', // 路径
  //       component: () => import('./../views/detail'), // 页面
  //       name: 'dome-detail', // 名称
  //       hide: true,
  //       meta: {
  //         title: '详情'
  //       }
  //     }
  //   ]
  // }

export default route
