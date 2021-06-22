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

// 邮箱管理
const route = {
  path: '/email',
  name: 'email',
  component: () => import('@/layout/index'),
  meta: {
    title: '邮箱管理',
    icon: 'menu-icon el-icon-message'
  },
  children: [
    {
      path: '/email/reminderList', // 路径
      component: () => import('@v/systemModel/emailManage/reminderList'), // 页面
      name: 'email-reminderList', // 名称
      meta: {
        title: '邮件提醒列表'
      }
    },
    {
      path: '/email/reminderEdit/edit', // 路径
      component: () => import('@v/systemModel/emailManage/reminderEdit'), // 页面
      name: 'email-reminderEdit', // 名称
      hide: true,
      meta: {
        nocache: true,
        title: '邮件提醒编辑' // type=add 为新增
      }
    },
    {
      path: '/email/reminderEdit/add', // 路径
      component: () => import('@v/systemModel/emailManage/remindeAdd'), // 页面
      name: 'email-reminderAdd', // 名称
      hide: true,
      meta: {
        nocache: true,
        title: '邮件提醒新增' // type=add 为新增
      }
    },
    {
      path: '/email/reminderDetail', // 路径
      component: () => import('@v/systemModel/emailManage/reminderDetail'), // 页面
      name: 'email-reminderDetail', // 名称
      hide: true,
      meta: {
        nocache: true,
        title: '邮件提醒详情' // type=add 为新增
      }
    },
    {
      path: '/email/unitPriceList', // 路径
      component: () => import('@v/systemModel/emailManage/unitPriceList'), // 页面
      name: 'email-unitPriceList', // 名称
      meta: {
        title: '单价预警配置列表'
      }
    },
    {
      path: '/email/unitPriceEdit/:type', // 路径
      component: () => import('@v/systemModel/emailManage/unitPriceEdit'), // 页面
      name: 'email-unitPriceEdit', // 名称
      hide: true,
      meta: {
        title: '单价预警配置编辑' // type=add 为新增
      }
    },
    {
      path: '/email/unitPriceDetail', // 路径
      component: () => import('@v/systemModel/emailManage/unitPriceDetail'), // 页面
      name: 'email-unitPriceDetail', // 名称
      hide: true,
      meta: {
        title: '单价预警配置详情' // type=add 为新增
      }
    },
    {
      path: '/email/receivableList', // 路径
      component: () => import('@v/systemModel/emailManage/receivableList'), // 页面
      name: 'email-receivableList', // 名称
      meta: {
        title: '应收提醒列表'
      }
    },
    {
      path: '/email/emailRemindList', // 路径
      component: () => import('@v/systemModel/emailManage/emailRemindList'), // 页面
      name: 'email-emailRemindList', // 名称
      meta: {
        title: '邮件提醒配置'
      }
    }
  ]
}

export default route
