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
 *    nocache 是否不需要缓存  是相当于keepAlive false
 */

// 平台数据
const route = {
  path: '/platform',
  name: 'platformData',
  component: () => import('@/layout/index/index'),
  meta: {
    title: '平台数据',
    icon: 'menu-icon el-icon-s-platform'
  },
  children: [
    {
      path: '/platform/replenishment', // 路径
      component: () => import('@v/orderModel/platformData/Replenishment'), // 页面
      name: 'Replenishment', // 名称
      meta: {
        title: '补货动销报表'
      }
    },
    {
      path: '/platform/goodsmanage', // 路径
      component: () => import('@v/orderModel/platformData/GoodsManage'), // 页面
      name: 'GoodsManage', // 名称
      meta: {
        title: '平台商品管理'
      }
    }
  ]
}

export default route
