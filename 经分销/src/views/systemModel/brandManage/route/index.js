// 品牌管理
const route = {
  path: '/brand',
  name: 'brand',
  component: () => import('@/layout/index'),
  meta: {
    title: '品牌管理',
    icon: 'menu-icon el-icon-document'
  },
  children: [
    {
      path: '/brand/brandList', // 路径
      component: () => import('@v/systemModel/brandManage/brandList.vue'), // 页面
      name: 'brand-config', // 名称
      meta: {
        title: '品牌列表'
      }
    },
    {
      path: '/brand/standardBrandList', // 路径
      component: () => import('@v/systemModel/brandManage/standardBrandList.vue'), // 页面
      name: 'brand-standardBrandList', // 名称
      meta: {
        title: '标准品牌列表'
      }
    },
    {
      path: '/brand/barcodeList', // 路径
      component: () => import('@v/systemModel/brandManage/barcodeList.vue'), // 页面
      name: 'brand-barcodeList', // 名称
      meta: {
        title: '标准条码管理'
      }
    },
    {
      path: '/brand/standardBarcodeDetail', // 路径
      component: () => import('@v/systemModel/brandManage/standardBarcodeDetail.vue'), // 页面
      name: 'brand-standardBarcodeDetail', // 名称
      hide: true,
      meta: {
        title: '标准条码管理详情',
        nocache: true
      }
    },
    {
      path: '/brand/CategeConfig', // 路径
      component: () => import('@v/systemModel/brandManage/CategeConfig.vue'), // 页面
      name: 'CategeConfig', // 名称
      meta: {
        title: '平台品类配置'
      }
    },
    {
      path: '/brand/CommodityCatege', // 路径
      component: () => import('@v/systemModel/brandManage/CommodityCatege.vue'), // 页面
      name: 'CommodityCatege', // 名称
      meta: {
        title: '平台商品品类'
      }
    }
  ]
}

export default route
