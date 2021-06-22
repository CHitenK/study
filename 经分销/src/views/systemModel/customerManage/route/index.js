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

// 客商档案
const route = {
  path: '/customer',
  name: 'customer',
  component: () => import('@/layout/index/index'),
  meta: {
    title: '客商档案',
    icon: 'menu-icon el-icon-user'
  },
  children: [
    {
      path: '/customer/introducedlist', // 路径
      component: () => import('@v/systemModel/customerManage/introducedList'), // 页面
      name: 'introducedList', // 名称
      meta: {
        title: '待引入客商列表'
      }
    },
    {
      path: '/customer/supplierlist', // 路径
      component: () => import('@v/systemModel/customerManage/supplierList'), // 页面
      name: 'supplierList', // 名称
      meta: {
        title: '供应商列表'
      }
    },
    {
      path: '/customer/supplierpricelist', // 路径
      component: () => import('@v/systemModel/customerManage/supplierPriceList'), // 页面
      name: 'supplierPriceList', // 名称
      meta: {
        title: '采购价格管理'
      }
    },
    {
      path: '/customer/supplierinquirylist', // 路径
      component: () => import('@v/systemModel/customerManage/supplierInquiryList'), // 页面
      name: 'supplierInquiryList', // 名称
      meta: {
        title: '供应商询价池列表'
      }
    },
    {
      path: '/customer/customerlist', // 路径
      component: () => import('@v/systemModel/customerManage/customerList'), // 页面
      name: 'customerList', // 名称
      meta: {
        title: '客户列表'
      }
    },
    {
      path: '/customer/salespricelist', // 路径
      component: () => import('@v/systemModel/customerManage/salesPriceList'), // 页面
      name: 'salesPriceList', // 名称
      meta: {
        title: '销售价格管理'
      }
    },
    {
      path: '/customer/increaseratiolist', // 路径
      component: () => import('@v/systemModel/customerManage/increaseRatioList'), // 页面
      name: 'increaseRatioList', // 名称
      meta: {
        title: '加价比例配置'
      }
    },
    {
      path: '/customer/introduceddetail', // 路径
      component: () => import('@v/systemModel/customerManage/introducedDetail'), // 页面
      name: 'introducedDetail', // 名称
      hide: true,
      meta: {
        title: '客商详情',
        nocache: true
      }
    },
    {
      path: '/customer/customerdetail', // 路径
      component: () => import('@v/systemModel/customerManage/customerDetail'), // 页面
      name: 'customerDetail', // 名称
      hide: true,
      meta: {
        title: '客户详情',
        nocache: true
      }
    },
    {
      path: '/customer/supplieradd', // 路径 id: 01新增 其他编辑
      component: () => import('@v/systemModel/customerManage/supplierEdit'), // 页面
      name: 'supplierAdd', // 名称
      hide: true,
      meta: {
        title: '供应商新增',
        nocache: true
      }
    },
    {
      path: '/customer/supplieredit', // 路径 id: 01新增 其他编辑
      component: () => import('@v/systemModel/customerManage/supplierEdit'), // 页面
      name: 'supplierEdit', // 名称
      hide: true,
      meta: {
        title: '供应商编辑',
        nocache: true
      }
    },
    {
      path: '/customer/supplierdetail', // 路径
      component: () => import('@v/systemModel/customerManage/supplierDetail'), // 页面
      name: 'supplierDetail', // 名称
      hide: true,
      meta: {
        title: '供应商详情',
        nocache: true
      }
    },
    {
      path: '/customer/customeradd', // 路径 id: 01新增 其他编辑
      component: () => import('@v/systemModel/customerManage/customerEdit'), // 页面
      name: 'customerAdd', // 名称
      hide: true,
      meta: {
        title: '客户新增',
        nocache: true
      }
    },
    {
      path: '/customer/customeredit', // 路径 id: 01新增 其他编辑
      component: () => import('@v/systemModel/customerManage/customerEdit'), // 页面
      name: 'customerEdit', // 名称
      hide: true,
      meta: {
        title: '客户编辑',
        nocache: true
      }
    },
    {
      path: '/customer/salespricedetail', // 路径
      component: () => import('@v/systemModel/customerManage/salesPriceDetail'), // 页面
      name: 'salesPriceDetail', // 名称
      hide: true,
      meta: {
        title: '销售价格管理详情',
        nocache: true
      }
    },
    {
      path: '/customer/salespriceedit/:id', // 路径 id: 01新增 其他编辑
      component: () => import('@v/systemModel/customerManage/salesPriceEdit'), // 页面
      name: 'salesPriceEdit', // 名称
      hide: true,
      meta: {
        title: '销售价格管理编辑',
        nocache: true
      }
    }
  ]
}

export default route
