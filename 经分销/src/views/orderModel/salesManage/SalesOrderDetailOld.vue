<template>
  <!-- 销售订单详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-15 bor-n" />
    <el-row  :gutter="10" class="fs-12 clr-II detail-row edit-row-bor">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        销售订单编号：{{detail.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        出仓仓库：{{detail.outDepotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        订单状态：{{detail.stateLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        创建人：{{detail.createName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        入仓仓库：{{detail.inDepotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        参照订单：{{detail.referToOrder || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        创建时间：{{detail.createDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        LBX单号：{{detail.lbxNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        客户：{{detail.customerName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        审核人：{{detail.auditName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        PO单号：{{detail.poNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        销售类型：{{detail.businessModelLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        审核时间：{{detail.auditDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        PO单时间：{{detail.poDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        销售币种：{{detail.currencyLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        签收时间：{{detail.receiveDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        归属月份：{{detail.ownMonth || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        原销出仓仓库：{{detail.originalOutDepotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        单据标识：{{detail.orderTypeLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" v-if="detail.tallyingUnit">
        海外仓理货单位：{{detail.tallyingUnitLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" v-if="detail.destination">
        目的地：{{detail.destinationLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        关联预售单单号：{{detail.preSaleOrderRelCode || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        调整人：{{detail.adjusterUsername || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        调整时间：{{detail.adjustDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        提交人：{{detail.submiterName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        提交时间：{{detail.submitDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        付款条约：{{detail.payRules || '- -'}}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 物流信息 -->
    <JFX-title title="物流信息" className="mr-t-15 bor-n" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row edit-row-bor">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        合同号：{{detail.contractNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        运输方式：{{detail.transportLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        标准箱TEU：{{detail.teu || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        车次：{{detail.trainno || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        承运商：{{detail.carrier || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        提单毛重：{{detail.billWeight || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        托数：{{detail.torusNumber || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        箱数：{{detail.boxNum || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        托盘材质：{{
          detail.torrPackType === '01' ? '塑料托盘' :
          detail.torrPackType === '02' ? '木质托盘' :
          detail.torrPackType === '03' ? 'IPPC木托' :
          detail.torrPackType === '04' ? '纸箱' : '- -'
        }}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        包装：{{detail.pack || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        发票单号：{{detail.invoiceNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        卸货港：{{detail.portDes || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        出库地点：{{detail.outdepotAddr || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        出库关区：{{detail.outPlatformCustoms || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        入库关区：{{detail.inPlatformCustoms || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        交货日期：{{detail.deliveryDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        备注：{{detail.remark || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        理货单位：{{detail.tallyingUnitLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        目的地：{{detail.destinationLabel || '- -'}}
      </el-col>
    </el-row>
    <!-- 物流信息 end -->
    <!-- 收件信息 -->
    <JFX-title title="收件信息" className="mr-t-15 bor-n" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row edit-row-bor">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        提货方式：{{detail.mailModeLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        收件人姓名：{{detail.receiverName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        国家：{{detail.country || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        详细地址：{{detail.receiverAddress || '- -'}}
      </el-col>
    </el-row>
    <!-- 收件信息 end -->
    <!-- 融资信息 -->
    <JFX-title title="融资信息" className="mr-t-15 bor-n" v-if="Object.keys(saleFinancingOrderDTO).length" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row edit-row-bor" v-if="Object.keys(saleFinancingOrderDTO).length">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        融资金额：{{saleFinancingOrderDTO.saleAmount ? saleFinancingOrderDTO.saleAmount.toFixed(2) : '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        保证金：{{saleFinancingOrderDTO.marginAmount ? saleFinancingOrderDTO.marginAmount.toFixed(2) : '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        起算日期：{{saleFinancingOrderDTO.applyDate ? saleFinancingOrderDTO.applyDate.slice(0, 10) : '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        实际还款日：{{saleFinancingOrderDTO.deadlineDate ? saleFinancingOrderDTO.deadlineDate.slice(0, 10) : '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        资金占用费：{{saleFinancingOrderDTO.occupationAmount ? saleFinancingOrderDTO.occupationAmount.toFixed(2) : '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        还款本金：{{saleFinancingOrderDTO.principalAmount ? saleFinancingOrderDTO.principalAmount.toFixed(2) : '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        代理费：{{saleFinancingOrderDTO.agencyAmount ? saleFinancingOrderDTO.agencyAmount.toFixed(2) : '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        滞纳金：{{saleFinancingOrderDTO.delayAmount ? saleFinancingOrderDTO.delayAmount.toFixed(2) : '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        应还本金：{{saleFinancingOrderDTO.payableAmount ? saleFinancingOrderDTO.payableAmount.toFixed(2) : '- -'}}
      </el-col>
    </el-row>
    <!-- 融资信息 end -->
    <el-tabs v-model="activeName" class="mr-t-15" type="card">
      <el-tab-pane label="商品信息" name="1">
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
                           width="130"
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
                           width="100"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="barcode"
                           align="center"
                           label="条码"
                           width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="num"
                           align="center"
                           label="销售数量"
                           width="80"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="price"
                           align="center"
                           label="销售单价"
                           width="100"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="declarePrice"
                           align="center"
                           label="申报单价"
                           width="100"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column align="center"
                           width="100">
            <template slot="header">
              <span>销售总金额<br />(不含税)</span>
            </template>
            <template slot-scope="{row}">
              {{row.amount}}
            </template>
          </el-table-column>
          <el-table-column align="center"
                           width="100">
            <template slot="header">
              <span>销售总金额<br />(含税)</span>
            </template>
            <template slot-scope="{row}">
              {{row.taxAmount}}
            </template>
          </el-table-column>
          <el-table-column prop="taxRate"
                           align="center"
                           label="税率"
                           width="80"
          ></el-table-column>
          <el-table-column prop="tax"
                           align="center"
                           label="税额"
                           width="80"
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
          <el-table-column prop="remark"
                           align="center"
                           label="备注"
                           width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="remark"
                           align="center"
                           label="成分"
                           width="200"
                           show-overflow-tooltip>
            <template slot-scope="{row}">
              <el-input type="textarea" v-model="row.component" :autosize="{ minRows: 2, maxRows: 2}" readonly />
            </template>
          </el-table-column>
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="商品上架明细" name="2">
        <JFX-table :tableData.sync="saleShelfData"
                   :showPagination="false">
          <el-table-column prop="goodsNo"
                           align="center"
                           label="商品货号"
                           width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="goodsName"
                           align="center"
                           label="商品名称"
                           min-width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="barcode"
                           align="center"
                           label="条码"
                           width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="tallyingUnitLabel"
                           align="center"
                           label="海外仓理货单位"
                           width="110"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="num"
                           align="center"
                           label="销售数量"
                           width="80"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="shelfNum"
                           align="center"
                           label="本次上架数量"
                           width="100"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="damagedNum"
                           align="center"
                           label="本次残损数量"
                           width="100"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="lackNum"
                           align="center"
                           label="本次少货数量"
                           width="100"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="shelfDate"
                           align="center"
                           label="本次上架时间"
                           width="150"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="poNo"
                           align="center"
                           label="po单号"
                           min-width="100"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="remark"
                           align="center"
                           label="备注"
                           min-width="100"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="operator"
                           align="center"
                           label="操作人"
                           width="100"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="createDate"
                           align="center"
                           label="操作时间"
                           width="150"
                           show-overflow-tooltip
          ></el-table-column>
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="商品融资信息" name="3" v-if="saleFinancing.list.length">
        <JFX-table :tableData.sync="saleFinancing"
                   :showPagination="false">
          <el-table-column prop="contractNo"
                           align="center"
                           label="子合同编号"
                           width="140"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="goodsCode"
                           align="center"
                           label="商品编号"
                           width="140"
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
                           width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="barcode"
                           align="center"
                           label="条形码"
                           width="140"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="num"
                           align="center"
                           label="销售数量"
                           width="100"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="tallyingUnitLabel"
                           align="center"
                           label="理货单位"
                           width="100"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="price"
                           align="center"
                           label="销售单价"
                           width="100"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="amount"
                           align="center"
                           label="销售总金额"
                           width="100"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="ransomPrice"
                           align="center"
                           label="赎回单价"
                           width="100"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="ransomAmount"
                           align="center"
                           label="赎回金额"
                           width="100"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="remark"
                           align="center"
                           label="备注"
                           min-width="120"
                           show-overflow-tooltip
          ></el-table-column>
        </JFX-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 收件信息 end -->
    <!-- 总计信息 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="4" class="fs-14 clr-II flex-c-c">
        总金额(不含税)：{{total('amount', 2)}}
      </el-col>
      <el-col :span="4" class="fs-14 clr-II flex-c-c">
        税额：{{total('tax', 2)}}
      </el-col>
      <el-col :span="4" class="fs-14 clr-II flex-c-c">
        总金额(含税)：{{total('taxAmount', 2)}}
      </el-col>
      <el-col :span="4" class="fs-14 clr-II flex-c-c">
        总数量：{{total('num', 0)}}
      </el-col>
      <el-col :span="4" class="fs-14 clr-II flex-c-c">
        总毛重：{{total('grossWeightSum', 5)}}
      </el-col>
      <el-col :span="4" class="fs-14 clr-II flex-c-c">
        总净重：{{total('netWeightSum', 5)}}
      </el-col>
    </el-row>
    <!-- 总计信息 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import { listSaleDetail } from '@a/salesManage'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 面包屑数据
      breadcrumb: [
        {path: '', meta: { title: '销售管理' }},
        {path: '/sales/salesorder', meta: { title: '销售订单列表' }},
        {path: `/sales/salesorderdetail/${this.$route.query.id}`, meta: { title: '销售订单详情' }}
      ],
      // tab当前点击name
      activeName: '1',
      // 详情数据
      detail: {},
      // 融资信息
      saleFinancingOrderDTO: {},
      // 上架明细列表
      saleShelfData: {
        list: []
      },
      // 融资信息列表
      saleFinancing: {
        list: []
      }
    }
  },
  computed: {
    total() {
      return (prop, precision) => this.tableData.list.reduce((pre, item) => {
        pre += item[prop] ? item[prop] : 0
        return pre
      }, 0).toFixed(precision)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id } = this.$route.query
      if (!id) return false
      const { data: { saleOrderDTO = {}, saleShelfDTO = {}, saleFinancingOrderDTO = {} } } = await listSaleDetail({ id })
      this.detail = saleOrderDTO || {}
      this.tableData.list = this.detail.itemList || []
      if (this.tableData.list && this.tableData.list.length) {
        this.tableData.list = this.tableData.list.map(item => {
          if (!item.taxRate) {
            return {
              ...item,
              taxRate: 0,
              taxAmount: item.amount,
              tax: 0
            }
          } else {
            return { ...item }
          }
        })
      }
      this.saleShelfData.list = saleShelfDTO ? saleShelfDTO.saleShelfDTOList : []
      this.saleFinancingOrderDTO = saleFinancingOrderDTO || {}
      this.saleFinancing.list = saleFinancingOrderDTO ? saleFinancingOrderDTO.itemList : []
    }
  }
}
</script>
