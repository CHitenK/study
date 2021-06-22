import {
  getOriginalGoodsId,
  getAvailableNum,
  getSelectMerchantBean
} from '@a/base'
import {
  getDepotDetails
} from '@a/salesManage/index'

export default () => {
  return {
    methods: {
      /**
       * 校验可用量
       * @param list 商品列表
       * @param depotId 仓库id
       * @param tallyUnit 理货单位
      */
      async checkAvailableNum(list = [], depotId = '', tallyUnit = '') {
        let flag = true
        let unit = ''
        if (!list.length) {
          return flag
        }
        // 获取仓库信息
        const depotDetail = await getDepotDetails({ id: depotId })
        const depotData = depotDetail.data
        const { type, id, code, name } = depotData
        // 中转仓不校验库存
        if (type === 'd') {
          return flag
        }
        // 海外仓需要获取单位
        if (type === 'c') {
          const unitEnum = { '00': '0', '01': '1', '02': '2' }
          unit = unitEnum[tallyUnit]
        }
        // 获取去重后的商品列表
        const goodsList = await this.uniqueGoodsList(list)
        console.log(goodsList)
        // 获取所有商品的原商品id
        for (let i = 0; i < goodsList.length; i++) {
          const { goodsId, goodsNo, goodsNum } = goodsList[i]
          // 获取原商品货号
          const { data: { originalGoodsNo } } = await getOriginalGoodsId({ goodsId, goodsNo, type: 'originalGoodsNo' })
          // // 查询可用量
          const { data } = await getAvailableNum({ depotId: id, depotCode: code, goodsId, unit })
          // 判断可用量
          const availableNum = data || -1
          if (availableNum === -1) {
            originalGoodsNo ? this.$errorMsg(`原货号：${originalGoodsNo} 商品货号：${goodsNo},未查到库存可用量`) : this.$errorMsg(`未查到库存余量货号：${goodsNo}, 仓库：${name}`)
            flag = false
            break
          } else if (goodsNum > availableNum) {
            originalGoodsNo ? this.$errorMsg(`库存不足，原货号：${originalGoodsNo} 商品货号：${goodsNo},余量：${availableNum}`) : this.$errorMsg(`库存不足,货号：${goodsNo}, 仓库：${name},余量：${availableNum}`)
            flag = false
            break
          }
        }
        return flag
      },
      /**
       * 合并相同原商品id的数量
       * @param list 商品列表
      */
      async uniqueGoodsList(list) {
        const result = []
        const helper = {}
        for (let i = 0; i < list.length; i++) {
          const item = list[i]
          let { goodsId, goodsNo } = item
          let goodsNum = item.goodsNum ? item.goodsNum : item.num ? item.num : 0
          // 查询原商品id
          const { data: { originalGoodsId } } = await getOriginalGoodsId({ goodsNo, goodsId, type: 'originalGoodsId' })
          if (originalGoodsId) {
            // 原商品id有重复,计算商品数量总和.
            if (helper[originalGoodsId]) {
              const count = goodsNum + helper[originalGoodsId].goodsNum
              helper[originalGoodsId] = { goodsNo, goodsId: originalGoodsId, goodsNum: count }
            } else {
              // 原商品id没有重复则直接赋值
              helper[originalGoodsId] = { goodsNo, goodsNum, goodsId: originalGoodsId }
            }
          } else {
            // 没有原商品id就使用当前商品id
            helper[goodsId] = { goodsId, goodsNo, goodsNum }
          }
        }
        console.log(helper)
        for (const key in helper) {
          result.unshift(helper[key])
        }
        return result
      },
      // 获取公司主体
      async getMerchantName() {
        let merchantId = ''
        let merchantName = ''
        // 旧系统进入
        if (sessionStorage.getItem('from') === 'oldsystem' && sessionStorage.getItem('iframeCompany')) {
          const iframeCompany = sessionStorage.getItem('iframeCompany')
          if (iframeCompany) {
            const { data } = await getSelectMerchantBean()
            const merchant = data.find(item => item.label === iframeCompany)
            merchantId = merchant.value + ''
            merchantName = iframeCompany
          }
        } else {
          const company = JSON.parse(sessionStorage.getItem('company'))
          const { id = '', name = '' } = company
          merchantId = id + ''
          merchantName = name
        }
        return {
          merchantId,
          merchantName
        }
      }
    }
  }
}
