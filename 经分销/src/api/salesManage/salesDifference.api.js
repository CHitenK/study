/**
 * 销售出库差异分析表 api
 */
import request from '@u/http'
import qs from 'qs'

// 销售管理 - 销售出库差异分析表 - 获取销售出库分析列表信息
export const getSaleAnalysisList = data => {
  return request({
    url: '/webapi/order/saleAnalysis/listSaleAnalysis.asyn',
    method: 'POST',
    data: qs.stringify(data)
  })
}
