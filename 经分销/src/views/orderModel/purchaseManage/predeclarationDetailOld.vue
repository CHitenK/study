<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="基本信息" className="mr-t-10 bor-n" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II detail-row edit-row-bor">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        预申报单号：{{detail.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        供应商：{{detail.supplierName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        业务模式：{{detail.businessModelLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        入仓仓库：{{detail.depotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        PO号：{{detail.poNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        入库关区：{{detail.inPlatformCustoms || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        海外仓理货单位： {{detail.tallyingUnitLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        LBX单号： {{detail.lbxNo || '- -'}}
      </el-col>
    </el-row>
    <JFX-title title="申报信息" className="mr-t-10 bor-n" />
    <el-row  :gutter="10" class="fs-12 clr-II detail-row edit-row-bor">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        头程提单号：{{detail.ladingBill || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        发票号：{{detail.invoiceNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        报关合同号：{{detail.contractNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        箱数：{{detail.boxNum || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        托数：{{detail.torrNum || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        托盘材质：{{detail.palletMaterialLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        包装方式: {{detail.packType || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        装货港: {{detail.portLoading || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        卸货港： {{detail.portDestNoLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        装船时间： {{detail.shipDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        提单毛重KG： {{detail.billWeight || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        付款条约：{{detail.payRules || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        境外发货人： {{detail.shipper || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        唛头： {{detail.mark || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        收货地点： {{detail.deliveryAddr || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        二程提单号： {{detail.blNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        进出口口岸： {{detail.imExpPort || '- -'}}
      </el-col>
      <!-- <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        销售渠道：{{detail.channel || '- -'}}
      </el-col> -->
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        运输方式：{{detail.transportLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        目的港名称：{{detail.destinationPortName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        预计到港时间：{{detail.arriveDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        目的地名称： {{detail.destinationName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        备注： {{detail.remark || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        订单状态： {{detail.statusLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建人： {{detail.createName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建时间： {{detail.createDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        审核人： {{detail.submitter || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        审核时间： {{detail.submitDate || '- -'}}
      </el-col>
    </el-row>
    <!-- title -->
    <JFX-title title="商品信息" className="mr-t-15" />
    <JFX-table
      :tableData.sync="tableData"
      :showPagination="false"
    >
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
      <el-table-column prop="contractNo" label="合同号" align="center" min-width="110" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsCode" label="商品编码" align="center" min-width="140" ></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" align="center" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsNo" label="商品货号" align="center" min-width="120"></el-table-column>
      <el-table-column prop="num" label="申报数量" align="center" min-width="80" ></el-table-column>
      <el-table-column prop="purchasePrice" label="采购单价" align="center" min-width="80"></el-table-column>
      <el-table-column prop="price" label="申报单价" align="center" min-width="80"></el-table-column>
      <el-table-column prop="amount" label="采购总金额(RMB)" align="center" min-width="130" ></el-table-column>
      <el-table-column prop="brandName" label="品牌类型" align="center" min-width="110" ></el-table-column>
      <el-table-column prop="grossWeightSum" label="毛重（KG）" align="center" min-width="90"></el-table-column>
      <el-table-column prop="netWeightSum" label="净重（KG）" align="center" min-width="90"></el-table-column>
      <el-table-column prop="boxNo" label="箱号" align="center"></el-table-column>
      <el-table-column prop="palletNo" label="托盘号" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="batchNo" label="生产批次号" align="center" min-width="90" show-overflow-tooltip></el-table-column>
      <el-table-column prop="constituentRatio" label="成分占比" align="center" min-width="80" show-overflow-tooltip></el-table-column>
    </JFX-table>
    <!-- title end -->
    <div class="flex-c-c fs-16 clr-II">
      <span class="tongji-item">总申报数量：{{totalNum}}</span>
      <span class="tongji-item">总金额(RMB)：{{totalAmount}}</span>
      <span class="tongji-item">总毛重：{{totalGrossWeight}}</span>
      <span class="tongji-item">总净重：{{totalNetWeight}}</span>
    </div>
  </div>
</template>
<script>
import { getDeclareDetail } from '@a/purchaseManage/index'
export default {
  data() {
    return {
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      detail: {},
      totalNum: '',
      totalAmount: '',
      totalGrossWeight: '',
      totalNetWeight: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { query } = this.$route
      if (!query.id) return false
      try {
        const res = await getDeclareDetail({ id: query.id })
        this.detail = res.data
        this.tableData.list = this.detail.itemList || []
        this.countTotal()
      } catch (err) {}
    },
    // 计算总数
    countTotal() {
      let totalNum = 0
      let totalAmount = 0
      let totalGrossWeight = 0
      let totalNetWeight = 0
      this.tableData.list.forEach(item => {
        const { num, goodsAmount, grossWeightSum, netWeightSum } = item
        totalNum = totalNum + (+num || 0)
        totalAmount = totalAmount + (+goodsAmount || 0)
        totalGrossWeight = totalGrossWeight + (+grossWeightSum || 0)
        totalNetWeight = totalNetWeight + (+netWeightSum || 0)
      })
      this.totalNum = totalNum
      this.totalGrossWeight = totalGrossWeight.toFixed(5)
      this.totalNetWeight = totalNetWeight.toFixed(5)
      this.totalAmount = totalAmount.toFixed(2)
    }
  }
}
</script>
<style lang="scss" scoped>
.tongji-item{
  display: inline-block;
  width: 220px;
}
</style>
