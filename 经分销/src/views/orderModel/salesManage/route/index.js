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

// 销售管理
const route = {
  path: '/sales',
  name: 'sales',
  component: () => import('@/layout/index/index'),
  meta: {
    title: '销售管理',
    icon: 'menu-icon el-icon-s-order'
  },
  children: [
    {
      path: '/sales/salesorder', // 路径
      component: () => import('@v/orderModel/salesManage/SalesOrder'), // 页面
      name: 'SalesOrder', // 名称
      meta: {
        title: '销售订单列表'
      }
    },
    {
      path: '/sales/salesorderadd', // 路径 id: 01新增 其他编辑
      component: () => import('@v/orderModel/salesManage/SalesOrderAdd'), // 页面
      name: 'SalesOrderAdd', // 名称
      hide: true,
      meta: {
        title: '新增销售订单',
        nocache: true
      }
    },
    {
      path: '/sales/salesorderedit', // 路径 id: 01新增 其他编辑
      component: () => import('@v/orderModel/salesManage/SalesOrderAdd'), // 页面
      name: 'SalesOrderAdd', // 名称
      hide: true,
      meta: {
        title: '编辑销售订单',
        nocache: true
      }
    },
    {
      path: '/sales/goodsonsale', // 路径
      component: () => import('@v/orderModel/salesManage/GoodsOnSale'), // 页面
      name: 'GoodsOnSale', // 名称
      hide: true,
      meta: {
        title: '上架商品',
        nocache: true
      }
    },
    {
      path: '/sales/salesorderdetail', // 路径
      component: () => import('@v/orderModel/salesManage/SalesOrderDetail'), // 页面
      name: 'SalesOrderDetail', // 名称
      hide: true,
      meta: {
        title: '销售订单详情',
        nocache: true
      }
    },
    {
      path: '/sales/ecommerceorder', // 路径
      component: () => import('@v/orderModel/salesManage/EcommerceOrder'), // 页面
      name: 'EcommerceOrder', // 名称
      meta: {
        title: '电商订单'
      }
    },
    {
      path: '/sales/ecommerceorderdetail', // 路径
      component: () => import('@v/orderModel/salesManage/EcommerceOrderDetail'), // 页面
      name: 'EcommerceOrderDetail', // 名称
      hide: true,
      meta: {
        title: '电商订单详情',
        nocache: true
      }
    },
    {
      path: '/sales/returnorderdetail', // 路径
      component: () => import('@v/orderModel/salesManage/ReturnOrderDetail'), // 页面
      name: 'ReturnOrderDetail', // 名称
      hide: true,
      meta: {
        title: '退货订单详情',
        nocache: true
      }
    },
    {
      path: '/sales/salesdelivery', // 路径
      component: () => import('@v/orderModel/salesManage/SalesDelivery'), // 页面
      name: 'SalesDelivery', // 名称
      meta: {
        title: '销售出库清单'
      }
    },
    {
      path: '/sales/salesdeliverydetail', // 路径
      component: () => import('@v/orderModel/salesManage/SalesDeliveryDetail'), // 页面
      name: 'SalesDeliveryDetail', // 名称
      hide: true,
      meta: {
        title: '销售出库详情',
        nocache: true
      }
    },
    {
      path: '/sales/shelveslist', // 路径
      component: () => import('@v/orderModel/salesManage/ShelvesList'), // 页面
      name: 'ShelvesList', // 名称
      meta: {
        title: '上架列表'
      }
    },
    {
      path: '/sales/listingdetail', // 路径
      component: () => import('@v/orderModel/salesManage/ListingDetail'), // 页面
      name: 'ListingDetail', // 名称
      hide: true,
      meta: {
        title: '上架单详情',
        nocache: true
      }
    },
    {
      path: '/sales/stockindetail', // 路径
      component: () => import('@v/orderModel/salesManage/StockInDetail'), // 页面
      name: 'StockInDetail', // 名称
      hide: true,
      meta: {
        title: '上架入库单详情',
        nocache: true
      }
    },
    {
      path: '/sales/billdeliveryorder', // 路径
      component: () => import('@v/orderModel/salesManage/BillDeliveryOrder'), // 页面
      name: 'BillDeliveryOrder', // 名称
      meta: {
        title: '账单出库单'
      }
    },
    {
      path: '/sales/billdeliverydetail', // 路径
      component: () => import('@v/orderModel/salesManage/BillDeliveryDetail'), // 页面
      name: 'BillDeliveryDetail', // 名称
      hide: true,
      meta: {
        title: '账单出库单详情',
        nocache: true
      }
    },
    {
      path: '/sales/salesdifference', // 路径
      component: () => import('@v/orderModel/salesManage/SalesDifference'), // 页面
      name: 'SalesDifference', // 名称
      meta: {
        title: '销售出库差异分析表'
      }
    },
    {
      path: '/sales/salesoutbound', // 路径
      component: () => import('@v/orderModel/salesManage/SalesOutbound'), // 页面
      name: 'SalesOutbound', // 名称
      meta: {
        title: '销售出库明细表'
      }
    },
    {
      path: '/sales/presalelist', // 路径
      component: () => import('@v/orderModel/salesManage/PreSaleList'), // 页面
      name: 'PreSaleList', // 名称
      meta: {
        title: '预售单列表'
      }
    },
    {
      path: '/sales/preorderdetail', // 路径
      component: () => import('@v/orderModel/salesManage/PreOrderDetail'), // 页面
      name: 'PreOrderDetail', // 名称
      hide: true,
      meta: {
        title: '预售订单详情',
        nocache: true
      }
    },
    {
      path: '/sales/preordereadd', // 路径
      component: () => import('@v/orderModel/salesManage/PreOrderEdit'), // 页面
      name: 'PreOrderAdd', // 名称
      hide: true,
      meta: {
        title: '预售订单新增',
        nocache: true
      }
    },
    {
      path: '/sales/preorderedit', // 路径
      component: () => import('@v/orderModel/salesManage/PreOrderEdit'), // 页面
      name: 'PreOrderEdit', // 名称
      hide: true,
      meta: {
        title: '预售订单编辑',
        nocache: true
      }
    },
    {
      path: '/sales/salescrosscheck', // 路径
      component: () => import('@v/orderModel/salesManage/SalesCrossCheck'), // 页面
      name: 'SalesCrossCheck', // 名称
      meta: {
        title: '预售勾稽列表'
      }
    },
    {
      path: '/sales/salescheckdetail', // 路径
      component: () => import('@v/orderModel/salesManage/SalesCheckDetail'), // 页面
      name: 'SalesCheckDetail', // 名称
      hide: true,
      meta: {
        title: '预售勾稽详情',
        nocache: true
      }
    },
    {
      path: '/sales/businesstransfer', // 路径
      component: () => import('@v/orderModel/salesManage/BusinessTransfer'), // 页面
      name: 'BusinessTransfer', // 名称
      meta: {
        title: '事业部移库单列表',
        nocache: true
      }
    },
    {
      path: '/sales/businesstransferdetail', // 路径
      component: () => import('@v/orderModel/salesManage/BusinessTransferDetail'), // 页面
      name: 'BusinessTransferDetail', // 名称
      hide: true,
      meta: {
        title: '事业部移库单详情'
      }
    },
    {
      path: '/sales/agreementlist', // 路径
      component: () => import('@v/orderModel/salesManage/AgreementList'), // 页面
      name: 'AgreementList', // 名称
      meta: {
        title: '协议单价列表'
      }
    },
    {
      path: '/sales/agreementsdd', // 路径
      component: () => import('@v/orderModel/salesManage/AgreementAdd'), // 页面
      name: 'AgreementAdd', // 名称
      hide: true,
      meta: {
        title: '协议单价新增',
        nocache: true
      }
    },
    {
      path: '/sales/salestarget', // 路径
      component: () => import('@v/orderModel/salesManage/SalesTarget'), // 页面
      name: 'SalesTarget', // 名称
      meta: {
        title: '商品销售目标'
      }
    },
    {
      path: '/sales/salestargetdetail', // 路径
      component: () => import('@v/orderModel/salesManage/SalesTargetDetail'), // 页面
      name: 'SalesTargetDetail', // 名称
      hide: true,
      meta: {
        title: '销售目标详情',
        nocache: true
      }
    },
    {
      path: '/sales/platformpurchase', // 路径
      component: () => import('@v/orderModel/salesManage/PlatformPurchase'), // 页面
      name: 'PlatformPurchase', // 名称
      meta: {
        title: '平台采购单'
      }
    },
    {
      path: '/sales/inventorylocation', // 路径
      component: () => import('@v/orderModel/salesManage/InventoryLocation'), // 页面
      name: 'InventoryLocation ', // 名称
      meta: {
        title: '库位调整单列表'
      }
    },
    {
      path: '/sales/salesorderissue', // 路径
      component: () => import('@v/orderModel/salesManage/SalesOrderIssue'), // 页面
      name: 'SalesOrderIssue', // 名称
      hide: true,
      meta: {
        title: '销售订单出库编辑',
        nocache: true
      }
    },
    {
      path: '/sales/inventorylocationdetail', // 路径
      component: () => import('@v/orderModel/salesManage/InventoryLocationDetail'), // 页面
      name: 'InventoryLocationDetail', // 名称
      hide: true,
      meta: {
        title: '库位调整单列表',
        nocache: true
      }
    },
    {
      path: '/sales/PickingList', // 路径
      component: () => import('@v/orderModel/salesManage/PickingList'), // 页面
      name: 'PickingList', // 名称
      meta: {
        title: '领料单列表'
      }
    },
    {
      path: '/sales/PickingDetail', // 路径
      component: () => import('@v/orderModel/salesManage/PickingDetail'), // 页面
      name: 'PickingDetail', // 名称
      hide: true,
      meta: {
        title: '领料单详情',
        nocache: true
      }
    },
    {
      path: '/sales/PickingListAdd', // 路径`
      component: () => import('@v/orderModel/salesManage/PickingListEdit'), // 页面
      name: 'PickingListAdd', // 名称
      hide: true,
      meta: {
        title: '领料单新增',
        nocache: true
      }
    },
    {
      path: '/sales/PickingListEdit', // 路径
      component: () => import('@v/orderModel/salesManage/PickingListEdit'), // 页面
      name: 'PickingListEdit', // 名称
      hide: true,
      meta: {
        title: '领料单编辑',
        nocache: true
      }
    },
    {
      path: '/sales/PickingOutList', // 路径
      component: () => import('@v/orderModel/salesManage/PickingOutList'), // 页面
      name: 'PickingOutList', // 名称
      meta: {
        title: '领料出库单列表'
      }
    },
    {
      path: '/sales/PickingOutDetail', // 路径
      component: () => import('@v/orderModel/salesManage/PickingOutDetail'), // 页面
      name: 'PickingOutDetail', // 名称
      hide: true,
      meta: {
        title: '领料出库单详情',
        nocache: true
      }
    },
    {
      path: '/sales/QuotaWarn', // 路径
      component: () => import('@v/orderModel/salesManage/QuotaWarn'), // 页面
      name: 'QuotaWarn', // 名称
      meta: {
        title: '客户额度预警'
      }
    },
    {
      path: '/sales/QuotaWarnDetail', // 路径
      component: () => import('@v/orderModel/salesManage/QuotaWarnDetail'), // 页面
      name: 'QuotaWarnDetail', // 名称
      hide: true,
      meta: {
        title: '客户额度预警详情',
        nocache: true
      }
    },
    {
      path: '/sales/SaleSd', // 路径
      component: () => import('@v/orderModel/salesManage/SaleSd'), // 页面
      name: 'SaleSd', // 名称
      meta: {
        title: '销售SD单列表'
      }
    },
    {
      path: '/sales/SaleSdDetail', // 路径
      component: () => import('@v/orderModel/salesManage/SaleSdDetail'), // 页面
      name: 'SaleSdDetail', // 名称
      hide: true,
      meta: {
        title: '销售SD单详情',
        nocache: true
      }
    },
    {
      path: '/sales/PlatformEstimation', // 路径
      component: () => import('@v/orderModel/salesManage/PlatformEstimation'), // 页面
      name: 'PlatformEstimation', // 名称
      meta: {
        title: '平台暂估费用单'
      }
    },
    {
      path: '/sales/PlatformEstimationDetail', // 路径
      component: () => import('@v/orderModel/salesManage/PlatformEstimationDetail'), // 页面
      name: 'PlatformEstimationDetail', // 名称
      hide: true,
      meta: {
        title: '平台暂估费用单详情',
        nocache: true
      }
    },
    {
      path: '/sales/PreDeclarationList', // 路径
      component: () => import('@v/orderModel/salesManage/PreDeclarationList'), // 页面
      name: 'PreDeclarationList', // 名称
      meta: {
        title: '销售预申报单列表'
      }
    },
    {
      path: '/sales/PreDeclarationEdit', // 路径
      component: () => import('@v/orderModel/salesManage/PreDeclarationEdit'), // 页面
      name: 'PreDeclarationEdit', // 名称
      hide: true,
      meta: {
        title: '销售预申报单编辑',
        nocache: true
      }
    },
    {
      path: '/sales/PreDeclarationDetail', // 路径
      component: () => import('@v/orderModel/salesManage/PreDeclarationDetail'), // 页面
      name: 'PreDeclarationDetail', // 名称
      hide: true,
      meta: {
        title: '销售预申报单详情',
        nocache: true
      }
    },
    {
      path: '/sales/DeclareOrderIssue', // 路径
      component: () => import('@v/orderModel/salesManage/DeclareOrderIssue'), // 页面
      name: 'DeclareOrderIssue', // 名称
      hide: true,
      meta: {
        title: '打托出库',
        nocache: true
      }
    },
    {
      path: '/sales/SalesCreditOrder', // 路径
      component: () => import('@v/orderModel/salesManage/SalesCreditOrder'), // 页面
      name: 'SalesCreditOrder', // 名称
      meta: {
        title: '销售赊销单'
      }
    },
    {
      path: '/sales/SalesCreditDetail', // 路径
      component: () => import('@v/orderModel/salesManage/SalesCreditDetail'), // 页面
      name: 'SalesCreditDetail', // 名称
      hide: true,
      meta: {
        nocache: true,
        title: '销售赊销单详情'
      }
    }
  ]
}

export default route
