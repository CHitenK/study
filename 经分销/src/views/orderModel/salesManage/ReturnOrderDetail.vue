<template>
  <!-- 退货订单详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 步骤条 -->
    <el-steps :active="stepState" align-center class="mr-t-20">
      <el-step title="创建时间">
        <div slot="description">{{detail.createDate}}</div>
      </el-step>
      <el-step title="退款完结时间">
        <div slot="description">{{detail.refundEndDate}}</div>
      </el-step>
      <el-step title="退货入库时间">
        <div slot="description">{{detail.returnInDate}}</div>
      </el-step>
    </el-steps>
    <!-- 步骤条 end -->
    <!-- 订单信息 -->
    <JFX-title title="订单信息" className="mr-t-15" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        平台售后单号：{{detail.returnCode || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        单号：{{detail.code || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        来源交易单号：{{detail.externalCode || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        公司：{{detail.merchantName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        电商平台：{{detail.storePlatformName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        入库仓库：{{detail.returnInDepotName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        退货入库时间：{{detail.returnInDate || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        店铺名称：{{detail.shopName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        币种：{{detail.currencyLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        订单来源：{{detail.orderReturnSourceLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        运营类型：{{detail.shopTypeCodeLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        客户：{{detail.customerName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        售后类型：{{detail.afterSaleTypeLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        单据状态：{{detail.statusLabel || '- -'}}
      </el-col>
    </el-row>
    <!-- 订单信息 end -->
    <!-- 买家信息 -->
    <JFX-title title="买家信息" className="mr-t-15" />
    <el-row :gutter="10" class="fs-12 clr-II mr-b-20 detail-row">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        买家姓名：{{detail.buyerName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        买家手机号：{{detail.buyerPhone || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        邮编：{{detail.postcode || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        退货人地址：{{detail.returnAddr || '- -'}}
      </el-col>
    </el-row>
    <!-- 买家信息 end -->
    <!-- 退货商品信息 -->
    <JFX-title :title="activeIndex === '1' ? '商品信息' : activeIndex === '2' ? '批次信息' : ''" className="mr-t-15" />
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
                           min-width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="inGoodsNo"
                           align="center"
                           label="商品货号"
                           min-width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="barcode"
                           align="center"
                           label="商品条形码"
                           min-width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="inGoodsName"
                           align="center"
                           label="商品名称"
                           min-width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="returnNum"
                           align="center"
                           label="正常品数量"
                           width="90"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="badGoodsNum"
                           align="center"
                           label="残次品数量"
                           width="90"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="barcode"
                           align="center"
                           width="90"
                           show-overflow-tooltip
                           label="退货总数量">
            <template slot-scope="{row}">
              {{row.returnNum + row.badGoodsNum}}
            </template>
          </el-table-column>
          <el-table-column prop="refundAmount"
                           align="center"
                           width="100"
                           show-overflow-tooltip
                           label="退款金额">
          </el-table-column>
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="批次信息" name="2">
        <JFX-table :tableData.sync="batchAllList"
                   :showPagination="false">
          <el-table-column type="index"
                           align="center"
                           width="55"
                           label="序号"
          ></el-table-column>
          <el-table-column prop="goodsNo"
                           align="center"
                           label="商品货号"
                           min-width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="barcode"
                           align="center"
                           label="商品条形码"
                           min-width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="goodsName"
                           align="center"
                           label="商品名称"
                           min-width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="batchNo"
                           align="center"
                           label="批次"
                           width="100"
          ></el-table-column>
          <el-table-column prop="productionDate"
                           align="center"
                           label="失效日期"
                           width="100">
            <template slot-scope="{row}">
              {{row.productionDate ? row.productionDate.slice(0, 10) : ''}}
            </template>
          </el-table-column>
          <el-table-column prop="overdueDate"
                           align="center"
                           label="生产日期"
                           width="100">
            <template slot-scope="{row}">
              {{row.productionDate ? row.productionDate.slice(0, 10) : ''}}
            </template>
          </el-table-column>
        </JFX-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 商品信息 end -->
    <el-row class="fs-14 clr-II mr-b-20">
      <div style="float: right;margin-right: 10px;">
        实际退款总金额：{{detail.totalRefundAmount ? detail.totalRefundAmount.toFixed(2) : '0.00'}}
      </div>
    </el-row>
  </div>
</template>

<script>
import commomMix from '@m/index'
import { getReturnOrderManageDetail } from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      stepState: 0,
      activeIndex: '1',
      // 详情数据
      detail: {},
      // 批次信息表格数据
      batchAllList: {
        list: [{}]
      }
    }
  },
  activated() {
    this.getDetail()
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const { id } = this.$route.query
      if (!id) return false
      const { data } = await getReturnOrderManageDetail({ id })
      this.detail = data.orderReturnIdepotDTO || {}
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
      this.batchAllList.list = data.batchAllList || []
    }
  }
}
</script>
