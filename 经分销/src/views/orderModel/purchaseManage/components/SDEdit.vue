<template>
  <div>
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'70vw'"
      :title="'修改SD金额'"
      :btnAlign="'center'"
      top="10vh"
      >
      <el-row  :gutter="10" class="fs-12 clr-II detail-row">
        <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          SD单号：{{detail.code || '- -'}}
        </el-col>
        <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
          单据类型：{{detail.typeLabel || '- -'}}
        </el-col>
        <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
          关联单号：{{detail.purchaseCode || '- -'}}
        </el-col>
        <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
          PO 号：{{detail.poNo || '- -'}}
        </el-col>
        <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
          币种：{{detail.currencyLabel || '- -'}}
        </el-col>
        <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
          出入库时间：{{detail.inboundDate || '- -'}}
        </el-col>
       </el-row>
      <el-row class="company-page">
        <el-col :span="24"  class="mr-t-20">
          <!-- 表格 -->
          <JFX-table
            :tableData.sync="tableData"
            :tableHeight="'420px'"
            :showSummary="true"
            :summaryMethod="null"
          >
            <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
            <el-table-column label="商品货号" align="center" width="180">
              <template slot-scope="scope">{{scope.row.goodsNo}}</template>
            </el-table-column>
            <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column  label="采购数量" align="center">
              <template slot-scope="scope">{{scope.row.num}}</template>
            </el-table-column>
            <el-table-column label="采购单价" align="center">
              <template slot-scope="scope">{{scope.row.price}}</template>
            </el-table-column>
            <el-table-column prop="amount" label="采购金额" align="center" ></el-table-column>
            <el-table-column prop="sdAmount" align="center" width="150">
              <template slot="header">
                <span class="need" id="sdTypeName"></span>
              </template>
              <template slot-scope="scope">
                <JFX-Input v-model.trim="scope.row.sdAmount" :min="0" :precision="5" placeholder="请输入" clearable />
              </template>
            </el-table-column>
          </JFX-table>
          <!-- 表格 end-->
        </el-col>
      </el-row>
    </JFX-Dialog>
  </div>
</template>
<script>
import { purchaseSdOrderAmountAdjustmentDetail, purchaseSdOrderSaveAmountAdjustment } from '@a/purchaseManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    visible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    filterData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      detail: {},
      flage: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async comfirm() {
      let flag = true
      this.tableData.list.forEach(item => {
        if (!item.sdAmount || item.sdAmount < 0) {
          this.$errorMsg('请输入金额')
          flag = false
          return false
        }
      })
      if (!flag) return false
      if (!this.flage) return false
      this.tableData.loading = true
      try {
        const items = this.tableData.list.map(item => {
          return { id: item.id, sdAmount: item.sdAmount }
        })
        await purchaseSdOrderSaveAmountAdjustment({ items: JSON.stringify(items), ...this.filterData })
        this.$emit('comfirm')
        this.$successMsg('操作成功')
        this.visible.show = false
      } catch (err) {
        console.log(err)
      }
      this.flage = true
      this.tableData.loading = false
    },
    async init() {
      try {
				const res = await purchaseSdOrderAmountAdjustmentDetail(this.filterData)
				this.detail = res.data.order
        this.tableData.list = res.data.itemList || []
        this.$nextTick(() => {
          const dom = document.getElementById('sdTypeName')
          const text = (this.detail.sdTypeName || '') + '金额'
          dom.innerText = text
        })
			} catch (err) {
        console.log(err)
			}
    }
  }
}
</script>
<style lang="scss" scoped>
.company-page{
  width: 100%;
  margin-bottom: 10px;
  min-height: 200px;
}
.fen-pei-bx{
  margin-top: -30px;
  border-top: solid 1px #eaeaea;
  border-bottom: solid 1px #eaeaea;
  height: 80px;
}
.dialog-footer{
  height: 30px;
  margin-top: -30px;
}
</style>
