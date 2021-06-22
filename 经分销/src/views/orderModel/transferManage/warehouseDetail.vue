<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="调拨出库详情" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        调拨入单号：{{transferInDepotDTO.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        调出仓库：{{transferInDepotDTO.outDepotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        服务类型：{{transferOrderDTO.serveTypesLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        单据状态：{{transferInDepotDTO.statusLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        调入仓库：{{transferInDepotDTO.inDepotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        事业部：{{transferInDepotDTO.buName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        企业调拨单号：{{transferInDepotDTO.transferOrderCode || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        申报海关：{{outDepotModel.customsNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        调拨入库时间：{{transferInDepotDTO.transferDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        合同号：{{transferInDepotDTO.contractNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        申报地国检：{{outDepotModel.inspectNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        委托单位：{{transferInDepotDTO.merchantName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        调出公司：{{transferInDepotDTO.merchantName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        调入客户：{{transferInDepotDTO.inCustomerName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        业务场景：{{transferOrderDTO.modelLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        备注：{{transferOrderDTO.remark || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建人：{{transferInDepotDTO.createName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建时间：{{transferInDepotDTO.createDate || '- -'}}
      </el-col>
    </el-row>
    <!-- title -->
    <JFX-title title="商品信息" className="mr-t-15" />
    <JFX-table
      :tableData.sync="tableData"
      :showPagination="false"
    >
      <el-table-column type="index" label="序号" align="center" fixed="left" width="50"></el-table-column>
      <el-table-column prop="inGoodsCode" label="调入商品编号" align="center" fixed="left" width="150" ></el-table-column>
      <el-table-column prop="inGoodsNo" label="调入商品货号" align="center" min-width="120" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="inGoodsName" label="调入商品名称" align="center" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="barcode" label="调入数量" align="center" min-width="80">
        <template slot-scope="scope">
          {{scope.row.transferNum + scope.row.wornNum + scope.row.expireNum}}
        </template>
      </el-table-column>
      <el-table-column prop="transferNum" label="正常数量" align="center" min-width="80"></el-table-column>
      <el-table-column prop="wornNum" label="坏品数量" align="center" min-width="80"></el-table-column>
      <el-table-column prop="expireNum" label="过期数量" align="center" min-width="80"></el-table-column>
      <el-table-column prop="transferBatchNo" label="调入批次" align="center" min-width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="productionDate" label="生产日期" align="center" min-width="90">
        <template slot-scope="scope">
          {{scope.row.productionDate ? scope.row.productionDate.substring(0, 10): ''}}
        </template>
      </el-table-column>
      <el-table-column prop="overdueDate" label="失效日期" align="center" min-width="90">
        <template slot-scope="scope">
          {{scope.row.overdueDate ? scope.row.overdueDate.substring(0, 10): ''}}
        </template>
      </el-table-column>
      <el-table-column prop="tallyingUnitLabel" label="理货单位" align="center" min-width="80"></el-table-column>
    </JFX-table>
    <!-- title end -->
  </div>
</template>
<script>
import { getTransferInDetail } from '@a/transferManage/index'
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
      outDepotModel: {},
      transferInDepotDTO: {},
      transferOrderDTO: {}
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const { query } = this.$route
      if (!query.id) return false
      const res = await getTransferInDetail({ id: query.id })
      this.detail = res.data || {}
      this.outDepotModel = res.data.outDepotModel || {}
      this.transferInDepotDTO = res.data.transferInDepotDTO || {}
      this.transferOrderDTO = res.data.transferOrderDTO || {}
      this.tableData.list = this.detail.itemList || []
    }
  }
}
</script>
