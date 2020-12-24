const children = [
  {
    path: '/content/home', // 路径
    component: () => import('@v/home/index'), // 页面
    // redirect: '/content/home',
    name: 'home', // 名称
    meta: {
      title: '积木',
      affix: true
    }
  }
]

export default children