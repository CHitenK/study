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

// 自动化校验
const route = {
  path: '/automatic',
  name: 'automatic',
  component: () => import('@/layout/index/index'),
  meta: {
    title: '自动化校验',
    icon: 'menu-icon el-icon-setting'
  },
  children: [
    {
      path: '/automatic/verificationvip', // 路径
      component: () => import('@v/reportModel/automaticCalibration/VerificationVIP'), // 页面
      name: 'VerificationVIP', // 名称
      meta: {
        title: '唯品账单校验'
      }
    },
    {
      path: '/automatic/verificationcloud', // 路径
      component: () => import('@v/reportModel/automaticCalibration/VerificationCloud'), // 页面
      name: 'VerificationCloud', // 名称
      meta: {
        title: '云集账单校验'
      }
    },
    {
      path: '/automatic/verificationtask', // 路径
      component: () => import('@v/reportModel/automaticCalibration/VerificationTask'), // 页面
      name: 'VerificationTask', // 名称
      meta: {
        title: '自动校验任务列表'
      }
    },
    {
      path: '/automatic/verificationmonthly', // 路径
      component: () => import('@v/reportModel/automaticCalibration/VerificationMonthly'), // 页面
      name: 'VerificationMonthly', // 名称
      meta: {
        title: '月结自核对'
      }
    },
    {
      path: '/automatic/verificationfinance', // 路径
      component: () => import('@v/reportModel/automaticCalibration/VerificationFinance'), // 页面
      name: 'VerificationFinance', // 名称
      meta: {
        title: '业财自核对'
      }
    },
    {
      path: '/automatic/addchecktask', // 路径
      component: () => import('@v/reportModel/automaticCalibration/AddCheckTask'), // 页面
      name: 'AddCheckTask', // 名称
      hide: true,
      meta: {
        title: '新增核对任务'
      }
    },
    {
      path: '/automatic/addwarehousetask', // 路径
      component: () => import('@v/reportModel/automaticCalibration/AddWarehouseTask'), // 页面
      name: 'AddWarehouseTask', // 名称
      hide: true,
      meta: {
        title: '创建库存核对任务'
      }
    }
  ]
}

export default route
