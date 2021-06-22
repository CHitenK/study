<template>
  <!-- 电商订单详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 步骤条 -->
    <el-steps :active="stepState" align-center class="mr-t-20">
      <el-step title="制单时间">
        <div slot="description">{{detail.tradingDate || ''}}</div>
      </el-step>
      <el-step title="申报时间">
        <div slot="description">{{detail.declareDate || ''}}</div>
      </el-step>
      <el-step title="放行时间">
        <div slot="description">{{detail.releaseDate || ''}}</div>
      </el-step>
      <el-step title="发货时间">
        <div slot="description">{{detail.deliverDate || ''}}</div>
      </el-step>
    </el-steps>
    <!-- 步骤条 end -->
    <!-- 订单信息 -->
    <JFX-title title="订单信息" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        单据状态：{{detail.statusLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        订单编号：{{detail.code || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        国检状态：{{detail.inspectStatusLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        物流企业名称：{{detail.logisticsNameLabel ? detail.logisticsNameLabel : detail.logisticsName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        外部交易单号：{{detail.externalCode || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        海关状态：{{detail.customsStatusLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        运单号：{{detail.wayBillNo || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        公司：{{detail.merchantName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        平台名称：{{detail.storePlatformNameLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        备注：{{detail.remark || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        出库仓库：{{detail.depotName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        进口模式：{{detail.importModeLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        订单来源：{{detail.orderSourceLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        交易时间：{{detail.tradingDate || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        店铺名称：{{detail.shopName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        币种：{{detail.currencyLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        平台订单号：{{detail.exOrderId || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        运营类型：{{detail.shopTypeCodeLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        包裹重量：{{detail.weight || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        客户：{{detail.customerName || '- -'}}
      </el-col>
    </el-row>
    <!-- 订单信息 end -->
    <!-- 订购人信息/收件人信息 -->
    <el-row type="flex" :gutter="30" class="fs-12 clr-II detail-row mr-t-15">
      <el-col :span="12">
        <JFX-title title="订购人信息" style="margin-left: -15px;" />
        <el-row>
          <el-col class="mr-b-10" :span="12">
            订购人：{{detail.makerName || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :span="12">
            注册号：{{detail.makerRegisterNo || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :span="12">
            电话号码：{{detail.makerTel || '- -'}}
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <JFX-title title="收件人信息" style="margin-left: -15px;" />
        <el-row>
          <el-col class="mr-b-10" :span="12">
            收件人：{{detail.receiverName || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :span="12">
            电话号码：{{detail.receiverTel || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :span="12">
            收件人省份：{{detail.receiverProvince || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :span="12">
            收件人城市：{{detail.receiverCity || '- -'}}
          </el-col>
          <el-col class="mr-b-10" :span="12">
            收件人地址：{{detail.receiverAddress || '- -'}}
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 订购人信息/收件人信息 end -->
    <!-- 商品信息 -->
    <JFX-title :title="activeIndex === '1' ? '商品信息' : activeIndex === '2' ? '结算信息' : activeIndex === '3' ? '批次信息' : ''" className="mr-t-15"></JFX-title>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="商品信息" name="1">
        <JFX-table :tableData.sync="tableData"
                   :showPagination="false">
          <el-table-column type="index"
                           align="center"
                           width="55"
                           label="序号"
          ></el-table-column>
          <el-table-column prop="buName"
                           align="center"
                           label="事业部"
                           min-width="130"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="goodsNo"
                           align="center"
                           label="商品货号"
                           min-width="100"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="goodsCode"
                           align="center"
                           label="商品编号"
                           min-width="140"
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
                           label="商品条形码"
                           min-width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="num"
                           align="center"
                           label="销售数量"
                           width="80"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="originalPrice"
                           align="center"
                           label="销售单价"
                           width="80"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="originalDecTotal"
                           align="center"
                           label="销售总金额"
                           width="90"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="goodsDiscount"
                           align="center"
                           label="商品优惠金额"
                           width="100"
                           show-overflow-tooltip
          ></el-table-column>
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="结算信息" name="2">
        <JFX-table :tableData.sync="tableData"
                   :showPagination="false">
          <el-table-column type="index"
                           align="center"
                           width="55"
                           label="序号"
          ></el-table-column>
          <el-table-column prop="goodsNo"
                           align="center"
                           label="商品货号"
                           min-width="100"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="goodsCode"
                           align="center"
                           label="商品编号"
                           min-width="140"
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
                           label="商品条形码"
                           min-width="130"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="num"
                           align="center"
                           label="结算数量"
                           width="80"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="price"
                           align="center"
                           label="结算单价"
                           width="80"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="decTotal"
                           align="center"
                           label="结算总额"
                           width="80"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="saleCom"
                           align="center"
                           label="佣金"
                           width="80"
                           show-overflow-tooltip
          ></el-table-column>
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="批次信息" name="3">
        <JFX-table :tableData.sync="wayBillList"
                   :showPagination="false">
          <el-table-column type="index"
                           align="center"
                           width="55"
                           label="序号"
          ></el-table-column>
          <el-table-column prop="goodsNo"
                           align="center"
                           label="商品货号"
                           min-width="100"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="goodsCode"
                           align="center"
                           label="商品编号"
                           min-width="140"
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
                           label="商品条形码"
                           min-width="130"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="batchNo"
                           align="center"
                           label="批次"
                           width="100"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="productionDate"
                           align="center"
                           label="生产日期"
                           show-overflow-tooltip
                           width="100">
            <template slot-scope="{row}">
              {{row.productionDate ? row.productionDate.slice(0, 10) : ''}}
            </template>
          </el-table-column>
          <el-table-column prop="overdueDate"
                           align="center"
                           label="失效日期"
                           show-overflow-tooltip
                           width="100">
            <template slot-scope="{row}">
              {{row.productionDate ? row.productionDate.slice(0, 10) : ''}}
            </template>
          </el-table-column>
        </JFX-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 商品信息 end -->
    <el-row :gutter="10" class="fs-14 clr-II mr-t-20">
      <el-col :span="4" class="flex-c-c">
        运费：{{detail.wayFrtFee ? detail.wayFrtFee.toFixed(2) : '0.00'}}
      </el-col>
      <el-col :span="5" class="flex-c-c">
        税费：{{detail.taxes ? detail.taxes.toFixed(2) : '0.00'}}
      </el-col>
      <el-col :span="5" class="flex-c-c">
        保费：{{detail.wayIndFee ? detail.wayIndFee.toFixed(2) : '0.00'}}
      </el-col>
      <el-col :span="5" class="flex-c-c">
        优惠金额：{{detail.discount ? detail.discount.toFixed(2) : '0.00'}}
      </el-col>
      <el-col :span="5" class="flex-c-c">
        实付总额：{{detail.payment ? detail.payment.toFixed(2) : '0.00'}}
      </el-col>
    </el-row>
  </div>
</template>

<script>
import commomMix from '@m/index'
import { getDeliveryOrderManageDetail } from '@a/salesManage'
export default {
  mixins: [commomMix],
  data() {
    return {
      stepState: 0,
      activeIndex: '1',
      // 详情数据
      detail: {},
      // 批次信息表格数据
      wayBillList: {
        list: [{}]
      }
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const { id } = this.$route.query
      if (!id) return false
      const { data } = await getDeliveryOrderManageDetail({ id })
      this.detail = data.orderDTO || {}
      const { status } = this.detail
      if (!status) return false
      this.stepState = status - 1
      if (status === '5') {
        this.stepState = -1
      } else if (status === '1') {
        this.stepState = 0
      } else {
        this.stepState = +status
      }
      this.tableData.list = this.detail.itemList || []
      this.wayBillList.list = data.wayBillList || []
    }
  }
}
</script>
