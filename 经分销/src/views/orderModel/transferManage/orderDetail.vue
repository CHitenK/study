<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        调拨订单编号：{{detail.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        单据状态：{{detail.statusLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        调出仓库：{{detail.outDepotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        调入仓库：{{detail.inDepotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        合同号：{{detail.contractNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        调出公司：{{detail.merchantName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        调入客户：{{detail.inCustomerName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        LBX单号：{{detail.lbxNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        发票号：{{detail.invoiceNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        包装方式：{{detail.packTypeLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        箱数：{{detail.cartons || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        运输方式：{{detail.transportLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        标准箱TEU：{{detail.standardCaseTeu || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        车次：{{detail.trainNumber || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        承运商：{{detail.carrier || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        托数：{{detail.torrNum || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        出库地点：{{detail.outdepotAddr || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        委托单位：{{detail.merchantName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        头程提单号：{{detail.firstLadingBillNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        海外仓理货单位：{{detail.tallyingUnitLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        申报海关：{{detail.customsNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建人：{{detail.createUsername || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建时间：{{detail.createDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        申报地国检：{{detail.inspectNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        提交人：{{detail.submitUsername || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        提交时间：{{detail.submitTime || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        服务类型：{{detail.serveTypesLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        业务场景：{{detail.modelLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        境外发货人：{{detail.shipper || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        唛头：{{detail.mark || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        PO号：{{detail.poNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        目的地：{{detail.destinationLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        收货人姓名：{{detail.consigneeUsername || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        国家：{{detail.country || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        提单毛重：{{detail.billWeight || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        备注：{{detail.remark || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        是否同关区：{{detail.isSameAreaLabel || '- -'}}
      </el-col>
    </el-row>
    <!-- title -->
    <JFX-title title="商品信息" className="mr-t-15" />
    <JFX-table
      :tableData.sync="tableData"
      :showPagination="false"
    >
      <el-table-column prop="seq" label="序号" align="center" fixed="left" width="50"></el-table-column>
      <el-table-column prop="outGoodsCode" label="调出商品编号" align="center" fixed="left" min-width="130" ></el-table-column>
      <el-table-column prop="outGoodsNo" label="调出商品货号" align="center" min-width="110" ></el-table-column>
      <el-table-column prop="outGoodsName" label="调出商品名称" align="center" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="outUnitLabel" label="调出单位" align="center" min-width="80"></el-table-column>
      <el-table-column prop="transferNum" label="调出数量" align="center" min-width="80"></el-table-column>
      <el-table-column prop="inGoodsCode" label="调入商品编号" align="center" min-width="130"></el-table-column>
      <el-table-column prop="inGoodsNo" label="调入商品货号" align="center" min-width="110"></el-table-column>
      <el-table-column prop="inGoodsName" label="调入商品名称" align="center" min-width="140" show-overflow-tooltip></el-table-column>
      <el-table-column prop="inUnitLabel" label="调入单位" align="center" min-width="80"></el-table-column>
      <el-table-column prop="inTransferNum" label="调入数量" align="center" min-width="80"></el-table-column>
      <el-table-column prop="brandName" label="品牌类型" align="center" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="price" label="调拨单价" align="center" min-width="80"></el-table-column>
      <el-table-column prop="grossWeightSum" label="毛重(kg)" align="center" min-width="80"></el-table-column>
      <el-table-column prop="netWeightSum" label="净重(kg)" align="center" min-width="80"></el-table-column>
      <el-table-column prop="contNo" label="箱号" align="center" min-width="90" show-overflow-tooltip></el-table-column>
      <el-table-column prop="bargainno" label="合同号" align="center" min-width="90" show-overflow-tooltip></el-table-column>
      <el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip></el-table-column>
    </JFX-table>
    <!-- title end -->
    <div class="fs-12 clr-II flex-c-c">
      <span class="pd-15">调出总数量：{{transferOutTotalNum}}</span>
      <span class="pd-15">调入总数量：{{transferInTotalNum}}</span>
      <span class="pd-15">总毛重：{{(+totalGrossWeight).toFixed(3)}}</span>
      <span class="pd-15">总净重：{{(+totalNetWeight).toFixed(3)}}</span>
    </div>
  </div>
</template>
<script>
import { getTransferOrderDetail } from '@a/transferManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
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
      transferOutTotalNum: 0,
      transferInTotalNum: 0,
      totalNetWeight: 0,
      totalGrossWeight: 0
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const { query } = this.$route
      if (!query.id) return false
      const res = await getTransferOrderDetail({ id: query.id })
      this.detail = res.data || {}
      this.tableData.list = this.detail.orderItemDTOS || []
      if (this.tableData.list.length > 0) {
        this.tableData.list.map(item => {
          let { transferNum, inTransferNum, grossWeightSum, netWeightSum } = item
          transferNum = Number(transferNum)
          inTransferNum = Number(inTransferNum)
          grossWeightSum = Number(grossWeightSum)
          netWeightSum = Number(netWeightSum)
          this.transferOutTotalNum = this.transferOutTotalNum + parseInt(transferNum)
          this.transferInTotalNum = this.transferInTotalNum + parseInt(inTransferNum)
          this.totalGrossWeight = this.totalGrossWeight + grossWeightSum
          this.totalNetWeight = this.totalNetWeight + netWeightSum
        })
      }
    }
  }
}
</script>
