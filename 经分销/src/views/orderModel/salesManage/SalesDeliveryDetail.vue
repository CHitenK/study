<template>
  <!-- 销售出库详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        单据状态：{{detail.statusLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        出库清单编号：{{detail.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        销售订单编号：{{detail.saleOrderCode || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        物流企业名称：{{detail.logisticsName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        公司：{{detail.merchantName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        账单号：{{detail.vipsBillNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        发货时间：{{detail.deliverDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        PO单号：{{detail.poNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        LBX单号：{{detail.lbxNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        提单号：{{detail.blNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        出库仓库：{{detail.outDepotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        进口类型：{{detail.importModeLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        运单号：{{detail.wayBillNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        签收时间：{{detail.receiveDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        最后上架时间：{{detail.shelfDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        单据类型：{{detail.saleTypeLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        备注：{{detail.remark || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        PO单时间：{{detail.poDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        币种：{{detail.currencyLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        事业部：{{detail.buName || '- -'}}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <el-tabs v-model="activeName" type="card" class="mr-t-15">
      <el-tab-pane label="出库商品明细" name="0">
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
                           min-width="80"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="barcode"
                           align="center"
                           label="商品条形码"
                           width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="poNo"
                           align="center"
                           width="100"
                           label="数量">
            <template slot-scope="{row}">
              {{row.transferNum + row.wornNum}}
            </template>
          </el-table-column>
          <el-table-column prop="transferNum"
                           align="center"
                           label="好品数量"
                           width="100"
          ></el-table-column>
          <el-table-column prop="wornNum"
                           align="center"
                           label="坏品数量"
                           width="100"
          ></el-table-column>
          <el-table-column prop="transferBatchNo"
                           align="center"
                           label="批次号"
                           width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="tallyingUnitLabel"
                           align="center"
                           label="海外仓理货单位"
                           width="110"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="commbarcode"
                           align="center"
                           label="标准条码"
                           width="130"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="billTypeLabel"
                           align="center"
                           label="账单类型"
                           width="100"
                           show-overflow-tooltip
          ></el-table-column>
          <!-- <el-table-column prop="price"
                           align="center"
                           label="销售单价"
                           width="80"
                           show-overflow-tooltip
          ></el-table-column> -->
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="商品上架明细" name="1">
        <JFX-table :tableData.sync="goodsTableData"
                   :showPagination="false">
          <el-table-column type="index"
                           align="center"
                           width="55"
                           label="序号"
          ></el-table-column>
          <el-table-column prop="goodsNo"
                           align="center"
                           label="商品货号"
                           width="140"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="goodsName"
                           align="center"
                           label="商品名称"
                           min-width="80"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="barcode"
                           align="center"
                           label="条码"
                           width="110"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="tallyingUnit"
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
          ></el-table-column>
          <el-table-column prop="damagedNum"
                           align="center"
                           label="本次残损数量"
                           width="100"
          ></el-table-column>
          <el-table-column prop="lackNum"
                           align="center"
                           label="本次少货数量"
                           width="100"
          ></el-table-column>
          <el-table-column prop="shelfDate"
                           align="center"
                           label="本次上架时间"
                           width="150"
          ></el-table-column>
          <el-table-column prop="poNo"
                           align="center"
                           label="po单号"
                           width="140"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="remark"
                           align="center"
                           label="备注"
                           width="100"
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
          ></el-table-column>
        </JFX-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 收件信息 end -->
  </div>
</template>
<script>
import {
  toDetailsPage,
  listSaleOutShelf
} from '@a/salesManage/salesDelivery.api'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      activeName: '0',
      // 详情数据
      detail: {},
      // 商品上架明细表格数据
      goodsTableData: {
        list: [],
        loading: false
      }
    }
  },
  activated() {
    this.getList()
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取详情数据
    async getList() {
      try {
        this.tableData.loading = true
        const res = await toDetailsPage({ id: this.$route.query.id })
        this.detail = res.data.saleOutDepotDTO
        this.tableData = {
          list: res.data.saleOutDepotDTO.itemList,
          loading: false
        }
        const goodsRes = await listSaleOutShelf({
          begin: 0,
          pageSize: 100,
          orderId: res.data.saleOutDepotDTO.id
        })
        this.goodsTableData = {
          list: goodsRes.data.list,
          loading: false
        }
      } catch (err) {
        this.tableData.loading = false
        this.goodsTableData.loading = false
      }
    }
  }
}
</script>
