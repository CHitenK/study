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

// 商品管理
const route = {
  path: '/goods',
  name: 'goods',
  component: () => import('@/layout/index'),
  meta: {
    title: '商品管理',
    icon: 'menu-icon el-icon-present'
  },
  children: [
    {
      path: '/goods/merchandiseList', // 路径
      component: () => import('@v/systemModel/goodsManage/merchandiseList'), // 页面
      name: 'goods-merchandiseList', // 名称
      meta: {
        title: '商品列表'
      }
    },
    {
      path: '/goods/merchandiseDetail', // 路径
      component: () => import('@v/systemModel/goodsManage/merchandiseDetail'), // 页面
      name: 'goods-merchandiseDetail', // 名称
      hide: true,
      meta: {
        title: '商品详情',
        nocache: true
      }
    },
    {
      path: '/goods/merchandise/edit', // 路径
      component: () => import('@v/systemModel/goodsManage/merchandiseEdit'), // 页面
      name: 'goods-merchandiseEdit', // 名称
      hide: true,
      meta: {
        nocache: true,
        title: '商品编辑'
      }
    },
    {
      path: '/goods/merchandise/add', // 路径
      component: () => import('@v/systemModel/goodsManage/merchandiseAdd'), // 页面
      name: 'goods-merchandiseAdd', // 名称
      hide: true,
      meta: {
        nocache: true,
        title: '商品新增'
      }
    },
    {
      path: '/goods/goodsList', // 路径
      component: () => import('@v/systemModel/goodsManage/goodsList'), // 页面
      name: 'goods-goodslist', // 名称
      meta: {
        title: '货品列表'
      }
    },
    {
      path: '/goods/goodsDetail', // 路径
      component: () => import('@v/systemModel/goodsManage/goodsDetail'), // 页面
      name: 'goods-goodsdetail', // 名称
      hide: true,
      meta: {
        title: '货品详情',
        nocache: true
      }
    },
    {
      path: '/goods/goodsEdit', // 路径
      component: () => import('@v/systemModel/goodsManage/goodsEdit'), // 页面
      name: 'goods-goodsEdit', // 名称
      hide: true,
      meta: {
        title: '货品编辑',
        nocache: true
      }
    },
    {
      path: '/goods/OutStoreGoods', // 路径
      component: () => import('@v/systemModel/goodsManage/OutStoreGoods'), // 页面
      name: 'OutStoreGoods', // 名称
      meta: {
        title: '外仓备案商品列表'
      }
    },
    {
      path: '/goods/OutStoreGoodsDetail', // 路径
      component: () => import('@v/systemModel/goodsManage/OutStoreGoodsDetail'), // 页面
      name: 'OutStoreGoodsDetail', // 名称
      hide: true,
      meta: {
        title: '外仓备案商品详情',
        nocache: true
      }
    }
  ]
}

export default route
