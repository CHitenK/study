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

// 公司档案
const route = {
  path: '/companyFile',
  name: 'companyFile',
  component: () => import('@/layout/index/index'),
  meta: {
    title: '公司档案',
    icon: 'menu-icon el-icon-coordinate'
  },
  children: [
    {
      path: '/companyFile/TaxRateConfig', // 路径
      component: () => import('@v/systemModel/companyFile/TaxRateConfig'), // 页面
      name: 'TaxRateConfig', // 名称
      meta: {
        title: '税率配置'
      }
    },
    {
      path: '/companyFile/tradeLinkConfigList', // 路径
      component: () => import('@v/systemModel/companyFile/tradeLinkConfigList'), // 页面
      name: 'tradeLinkConfigList', // 名称
      meta: {
        title: '交易链路配置'
      }
    },
    {
      path: '/companyFile/DepartmentManage', // 路径
      component: () => import('@v/systemModel/companyFile/DepartmentManage'), // 页面
      name: 'DepartmentManage', // 名称
      meta: {
        title: '部门管理'
      }
    }
  ]
}

export default route
