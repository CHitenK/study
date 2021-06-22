// 额度管理
const route = {
  path: '/limitposition',
  name: 'limitposition',
  component: () => import('@/layout/index'),
  meta: {
    title: '额度管理',
    icon: 'menu-icon el-icon-coin'
  },
  children: [
    {
      path: '/limitposition/quotaBeginList', // 路径
      component: () => import('@v/orderModel/limitPositionManage/quotaBeginList.vue'), // 页面
      name: 'limitposition-quotaBeginList', // 名称
      meta: {
        title: '额度初期配置'
      }
    },
    {
      path: '/limitposition/departmentList', // 路径
      component: () => import('@v/orderModel/limitPositionManage/departmentList.vue'), // 页面
      name: 'limitposition-departmentList', // 名称
      meta: {
        title: '部门额度配置'
      }
    },
    {
      path: '/limitposition/articleList', // 路径
      component: () => import('@v/orderModel/limitPositionManage/articleList.vue'), // 页面
      name: 'limitposition-articleList', // 名称
      meta: {
        title: '项目额度配置'
      }
    },
    {
      path: '/limitposition/customerList', // 路径
      component: () => import('@v/orderModel/limitPositionManage/customerList.vue'), // 页面
      name: 'limitposition-customerList', // 名称
      meta: {
        title: '客户额度配置'
      }
    }
  ]
}

export default route
