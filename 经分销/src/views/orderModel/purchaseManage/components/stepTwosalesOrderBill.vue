<template>
  <div class="pad-left-10">
    <div v-for="(order, i) in targetArr" :key="i">
      <el-row  :gutter="10" class="fs-12 clr-II">
        <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
          客户：{{order.customerName || '- -'}}
        </el-col>
        <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
          销售类型：{{['购销-预售订单', '购销-整批结算', '', '采销执行', '购销-实销实结'][+order.businessModel]}}
        </el-col>
        <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
          事业部：{{order.buName || '- -'}}
        </el-col>
        <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
          出库仓库：{{order.outDepotName || '- -'}}
        </el-col>
        <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
          是否同关区：跨关区
        </el-col>
        <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
          入库仓库：{{order.inDepotName || '- -'}}
        </el-col>
        <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
          PO号：{{order.poNo || '- -'}}
        </el-col>
        <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
          销售币种：{{order.currencyLabel || '- -'}}
        </el-col>
        <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
          标准箱TEU：{{order.teu || '- -'}}
        </el-col>
        <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
          承运商：{{order.carrier || '- -'}}
        </el-col>
        <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
          车次：{{order.torusNumber || '- -'}}
        </el-col>
        <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
          托数：{{order.torrNum || '- -'}}
        </el-col>
      </el-row>
      <JFX-title title="商品明细" className="mr-t-15" />
      <JFX-table
        :tableData="{ list: order.itemList, pageSize: 10000, total: 10001 }"
        :showPagination="false"
        :showSummary="true"
        :summaryMethod="null"
      >
        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
        <el-table-column label="商品编码" align="center" min-width="130" >
          <template slot-scope="scope">{{scope.row.goodsCode}}</template>
        </el-table-column>
        <el-table-column prop="goodsName" label="商品名称" align="center" min-width="120" show-overflow-tooltip ></el-table-column>
        <el-table-column label="商品货号" align="center" min-width="130">
          <template slot-scope="scope">{{scope.row.goodsNo}}</template>
        </el-table-column>
        <el-table-column label="条码" align="center" min-width="130">
          <template slot-scope="scope">{{scope.row.barcode}}</template>
        </el-table-column>
        <el-table-column prop="num" label="销售数量" align="center" min-width="100"></el-table-column>
        <el-table-column label="销售单价" align="center" min-width="100">
          <template slot-scope="scope">
            <span :init-data="initAmout(i, scope.$index)">{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="销售总金额" align="center" min-width="100">
          <template slot-scope="scope">
            <el-input-number v-model.trim="scope.row.amount" :precision="2" v-max-spot="2" :controls="false" :min="0"   style="width: 100%" @change="setPrice(i, scope.$index)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="申报单价" align="center" min-width="100">
          <template slot-scope="scope">{{scope.row.declarePrice}}</template>
        </el-table-column>
        <el-table-column prop="grossWeightSum" label="毛重（KG)" align="center" min-width="100"></el-table-column>
        <el-table-column prop="netWeightSum" label="净重（KG)" align="center" min-width="100"></el-table-column>
      </JFX-table>
      <div class="mr-t-15"></div>
    </div>
  </div>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    targetArr: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    initAmout(i, index) {
      const price = this.targetArr[i].itemList[index].price || 0
      const num = this.targetArr[i].itemList[index].num || 0
      this.targetArr[i].itemList[index].amount = (price * num).toFixed(2)
    },
    setPrice(i, index) {
      const amount = this.targetArr[i].itemList[index].amount || 0
      const num = this.targetArr[i].itemList[index].num || 0
      this.targetArr[i].itemList[index].price = (amount / num).toFixed(3)
    }
  }
}
</script>
<style lang="scss" scoped>
.pad-left-10{
  box-sizing: border-box;
  padding:15px;
}
.w-200{
  display: inline-block;
  width: 220px;
  text-align: right;
}
</style>
