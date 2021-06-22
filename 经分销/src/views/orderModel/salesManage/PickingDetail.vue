<template>
  <!-- 电商订单详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 基础信息 -->
    <JFX-title title="基础信息" className="bor-n" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row edit-row-bor">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        客户：{{detail.customerName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        公司：{{detail.customerName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        出仓仓库：{{detail.outDepotName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        入仓仓库：{{detail.inDepotName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        付款条约：{{detail.payRules || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        PO单号：{{detail.poNo || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        销售币种：{{detail.currencyLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        创建人：{{detail.createName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        创建时间：{{detail.createDate || '- -'}}
      </el-col>
    </el-row>
    <!-- 基础信息 end -->
    <!-- 物流信息 -->
    <JFX-title title="物流信息" className="bor-n mr-t-15" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row edit-row-bor">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        报关合同号：{{detail.contractNo || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        运输方式：{{detail.transportLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        标准箱TEU：{{detail.teu || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        车次：{{detail.trainno || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        承运商：{{detail.carrier || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        提单毛重KG：{{detail.billWeight || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        托数：{{detail.torusNumber || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        箱数：{{detail.boxNum || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        托盘材质：{{detail.torrPackTypeLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        包装：{{detail.pack || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        发票单号：{{detail.invoiceNo || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        卸货港：{{detail.portDes || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        出库地点：{{detail.outdepotAddr || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        出库关区：{{detail.outPlatformCustoms || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        入库关区：{{detail.inPlatformCustoms || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        交货日期：{{detail.deliveryDate ? detail.deliveryDate.slice(0, 10) : '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        目的地：{{detail.destinationLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        理货单位：{{detail.tallyingUnitLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        备注：{{detail.remark || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        审核人：{{detail.auditName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        审核时间：{{detail.auditDate || '- -'}}
      </el-col>
    </el-row>
    <!-- 物流信息 end -->
    <!-- 收件信息 -->
    <JFX-title title="收件信息" className="bor-n mr-t-15" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row edit-row-bor">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        提货方式：{{detail.mailMode ? detail.mailMode === '1' ? '寄售' : '自提' : '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        收货人姓名：{{detail.receiverName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        国家：{{detail.country || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        详细地址：{{detail.receiverAddress || '- -'}}
      </el-col>
    </el-row>
    <!-- 收件信息 end -->
    <!-- 商品信息 -->
    <JFX-title title="商品信息" className="bor-n mr-t-15"></JFX-title>
    <JFX-table :tableData.sync="tableData"
               :showPagination="false">
      <el-table-column prop="seq"
                       align="center"
                       width="55"
                       label="序号"
      ></el-table-column>
      <el-table-column prop="goodsCode"
                       align="center"
                       label="商品编号"
                       width="150"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="goodsName"
                       align="center"
                       label="商品名称"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="goodsNo"
                       align="center"
                       label="商品货号"
                       width="150"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="barcode"
                       align="center"
                       label="条码"
                       width="130"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="num"
                       align="center"
                       label="领取数量"
                       width="80"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="brandName"
                       align="center"
                       label="品牌类型"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="grossWeightSum"
                       align="center"
                       label="毛重"
                       width="100"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="netWeightSum"
                       align="center"
                       label="净重"
                       width="100"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="boxNo"
                       align="center"
                       label="箱号"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="contractNo"
                       align="center"
                       label="合同号"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
    </JFX-table>
    <!-- 商品信息 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import { detailMaterialOrder } from '@a/salesManage'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 详情数据
      detail: {}
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const { id } = this.$route.query
      if (!id) return false
      try {
        const { data = {} } = await detailMaterialOrder({ id })
        this.detail = data
        this.tableData.list = this.detail.itemList || []
      } catch (error) {
        this.$errorMsg(error.message)
      }
    }
  }
}
</script>
