<template>
  <div class="step-bx">
    <div class="tips-bx clr-II fs-14 mr-t-15"  v-if="errorList.length > 0">
      <p v-for="(item, i) in errorList" :key="i">{{ i + 1 }}, {{item}}</p>
    </div>
    <div class="mr-t-20">
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="(item, index) in tabsList" :key="item.label" :label="item.label" :name="index + ''">
          <step-two-content :tradeLinkId="tradeLinkId" v-if="item.label" :detail="item.detail" :name="item.label"></step-two-content>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="flex-c-c mr-t-10">
      <el-button id="pur_cancle_btn" @click="backTo">取 消</el-button>
      <el-button type="primary" @click="nextTo" v-if="errorList.length < 1" :loading="nextLoading">下一步</el-button>
    </div>
  </div>
</template>
<script>
import { toSaleStepTwoPage, saveSaleStepGoodsInfo, toJBSaleStepTwoPage } from '@a/purchaseManage/index'
export default {
  props: {
    tradeLinkId: '',
    targetId: '',
    isContractFrom: {
      type: Boolean,
      default: false
    }
  },
  components: {
    stepTwoContent: () => import('./stepTwoContent')
  },
  data() {
    return {
      activeName: '0',
      tabsList: [],
      errorList: [],
      nextLoading: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      try {
        // 如果是从合同审核页面跳转, 使用 toJBSaleStepTwoPage 加载数,否则用 toSaleStepTwoPage
        this.nextLoading = true
        const ajax = this.isContractFrom ? toJBSaleStepTwoPage : toSaleStepTwoPage
        const opt = this.isContractFrom ? { id: this.targetId, tradeLinkId: this.tradeLinkId } : { id: this.tradeLinkId }
        const res = await ajax(opt)
        const { map = {} } = res.data
        for (let key in map) {
          const item = {
            label: key,
            detail: map[key]
          }
          if (key === 'errorList') {
            this.errorList = map[key]
          } else {
            this.tabsList.push(item)
          }
        }
        if (this.isContractFrom) { // 如果是从合同审核页面跳转 修改交易链路
          this.$emit('setAct', { step: 1, tradeLinkId: res.data.id })
        }
      } catch (error) {
        console.log(error)
      }
      this.nextLoading = false
    },
    // 返回上一步
    async backTo() {
      this.$emit('setAct', { tradeLinkId: this.tradeLinkId, step: 0 })
    },
    // 下一步
    async nextTo() {
      const goodsInfoJSON = {}
      this.tabsList.forEach(item => {
        const name = item.label
        const { detail = null } = item
        // 销售
        if (detail && detail.saleOrderList && detail.saleOrderList.length > 0) {
          const str = name + '_saleOrder' + '_'
          detail.saleOrderList.forEach((gtem, i) => {
            goodsInfoJSON[str + i] = []
            gtem.itemList.forEach(ktem => {
              goodsInfoJSON[str + i].push({
                goodsId: ktem.goodsId + '',
                amount: ktem.amount ? ktem.amount + '' : '0'
              })
            })
          })
        }
        // 采购
        if (detail && detail.purchaseList && detail.purchaseList.length > 0) {
          const str = name + '_purchaseOrder' + '_'
          detail.purchaseList.forEach((gtem, i) => {
            goodsInfoJSON[str + i] = []
            gtem.itemList.forEach(ktem => {
              goodsInfoJSON[str + i].push({
                goodsId: ktem.goodsId + '',
                amount: ktem.amount ? ktem.amount + '' : ''
              })
            })
          })
        }
      })
      for (let key in goodsInfoJSON) {
        if (goodsInfoJSON[key].length < 1) delete goodsInfoJSON[key]
      }
      try {
        await saveSaleStepGoodsInfo({
          purchaseTradeLinkId: this.tradeLinkId,
          goodsInfoJson: JSON.stringify(goodsInfoJSON)
        })
        this.$successMsg('保存成功')
        this.$emit('setAct', { step: 2, tradeLinkId: this.tradeLinkId })
      } catch (err) {
        console.log(err)
      }
      console.log(goodsInfoJSON)
    }
  }
}
</script>
<style lang="scss" scoped>
.tips-bx{
  width: 100%;
  height: 90px;
  background-color: rgba(250, 205, 145, 0.5);
  border-color: rgba(255, 255, 128, 1);
  box-sizing: border-box;
  padding: 10px 15px;
  overflow: auto;
}
</style>
