import commonRoute from '@v/common/route/index'
import goodsManageRoute from '@v/systemModel/goodsManage/route/index'
import noticeManageRoute from '@v/systemModel/noticeManage/route/index'
import storageManageRoute from '@v/storageModel/storageManage/route/index'
import customerManageRoute from '@v/systemModel/customerManage/route/index'
import purchaseManageRoute from '@v/orderModel/purchaseManage/route/index'
import stockMangeRoute from '@v/inventoryModel/stockMange/route/index'
import salesMangeRoute from '@v/orderModel/salesManage/route/index'
import salesReturnManage from '@v/orderModel/salesReturnManage/route/index'
import reportManage from '@v/reportModel/reportManage/route/index'
import transferManage from '@v/orderModel/transferManage/route/index'
import automaticCalibration from '@v/reportModel/automaticCalibration/route/index'
import billManage from '@v/reportModel/billManage/route/index'
import adjustAccountsManage from '@v/reportModel/adjustAccountsManage/route/index'
import exchangeRateManage from '@v/systemModel/exchangeRateManage/route/index'
import emailManage from '@v/systemModel/emailManage/route/index'
import rebateManage from '@v/orderModel/rebateManage/route/index'
import platformData from '@v/orderModel/platformData/route/index'
import templateManage from '@v/orderModel/templateManage/route/index'
import warehouseFile from '@v/systemModel/warehouseFile/route/index'
import systemManage from '@v/systemModel/systemManage/route/index'
import interfaceManage from '@v/systemModel/interfaceManage/route/index'
import brandManage from '@v/systemModel/brandManage/route/index'
import purchaseModelManage from '@v/orderModel/purchaseModelManage/route/index'
import orealManage from '@v/orderModel/orealManage/route/index'
import contrast from '@v/systemModel/contrast/route/index'
import companyFile from '@v/systemModel/companyFile/route/index'
import limitPositionManage from '@v/orderModel/limitPositionManage/route/index'
import receiveMoneyManage from '@v/orderModel/receiveMoneyManage/route/index'
import deployrRemindManage from '@v/orderModel/deployrRemindManage/route/index'
import paymentManage from '@v/orderModel/paymentManage/route/index'
// import domeRoutes from '@v/dome/route/index'
const route = [
  commonRoute, // 常用公共页面
  systemManage, // 系统管理
  noticeManageRoute, // 公告管理
  goodsManageRoute, // 商品管理
  customerManageRoute, // 客商档案
  purchaseManageRoute, // 采购管理
  salesMangeRoute, // 销售管理
  salesReturnManage, // 销售退货管理
  transferManage, // 调拨管理
  storageManageRoute, // 仓储管理
  stockMangeRoute, // 库存管理
  companyFile, // 公司档案
  interfaceManage, // 接口管理
  reportManage, // 报表管理
  warehouseFile, // 仓库档案
  brandManage, // 品牌管理
  contrast, // 爬虫配置
  adjustAccountsManage, // 核算单价管理
  automaticCalibration, // 自动化校验
  exchangeRateManage, // 汇率管理
  emailManage, // 邮箱管理
  billManage, // 账单管理
  purchaseModelManage, // 采购模型管理
  templateManage, // 模板管理
  rebateManage, // 返利管理(原SD配置)
  platformData, // 平台数据
  orealManage, // 欧莱雅管理
  limitPositionManage, // 额度管理
  receiveMoneyManage, // 收款管理
  paymentManage, // 付款管理
  deployrRemindManage // 配置提醒
]

export default route
