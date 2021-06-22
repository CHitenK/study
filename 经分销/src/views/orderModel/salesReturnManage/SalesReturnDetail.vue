<template>
  <!-- 销售退货订单详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row">
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        销售退货订单号： {{ detail.code || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        业务场景： {{ detail.modelLabel || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        服务类型： {{ detail.serveTypesLabel || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        客户： {{ detail.customerName || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        头程提单号： {{ detail.ladingBill || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        退出仓库： {{ detail.outDepotName || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        申报地国检编码：{{ detail.inspectNo || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        二程提单号：{{ detail.blNo || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        退入仓库： {{ detail.inDepotName || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        申报地海关编码：{{ detail.customsNo || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        卸货港编码： {{ detail.portDestNo || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        装货港： {{ detail.portLoading || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        包装方式： {{ detail.packType || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        邮箱地址：{{ detail.email || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        合同号： {{ detail.contractNo || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        箱数 {{ detail.boxNum || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        创建人：{{ detail.createName || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        发票号：{{ detail.invoiceNo || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        付款条约：{{ detail.payRules || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        创建时间：{{ detail.createDate || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        LBX单号：{{ detail.lbxNo || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        提单毛重：{{ detail.billWeight || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        提交人：{{ detail.auditName || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        收货地址：{{ detail.deliveryAddr || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        提交时间：{{ detail.auditDate || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        唛头：{{ detail.mark || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        境外发货人：{{ detail.shipper || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        退货原因：{{ detail.remark || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        是否同关区：{{ detail.isSameAreaLabel || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        事业部：{{ detail.buName || '- -' }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        理货单位：{{ detail.tallyingUnitLabel || '- -' }}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 销售退货商品明细 -->
    <JFX-title title="销售退货商品明细" className="mr-t-15" />
    <JFX-table :tableData.sync="tableData" :showPagination="false">
      <el-table-column type="index" align="center" width="55" label="序号" />
      <el-table-column prop="poNo" align="center" width="150" label="PO号码" show-overflow-tooltip />
      <el-table-column prop="poDate" align="center" width="100" label="PO时间" show-overflow-tooltip/>
      <el-table-column prop="outGoodsNo" align="center" min-width="120" label="退出商品货号" show-overflow-tooltip />
      <el-table-column prop="inGoodsNo" align="center" min-width="120" label="退入商品货号" show-overflow-tooltip />
      <el-table-column prop="inGoodsName" align="center" min-width="150" label="退入商品名称" show-overflow-tooltip />
      <el-table-column prop="barcode" align="center" width="120" label="退入商品条形码" show-overflow-tooltip />
      <el-table-column align="center" width="100" label="退货商品数量">
        <template slot-scope="{row}">
          {{row.returnNum + row.badGoodsNum}}
        </template>
      </el-table-column>
      <el-table-column prop="price" align="center" width="100" label="退货商品单价" show-overflow-tooltip>
        <template slot="header">
          <span>退货商品单价<br />（不含税）</span>
        </template>
        <template slot-scope="{row}">
          {{row.price}}
        </template>
      </el-table-column>
      <el-table-column align="center" width="100" label="退货商品金额">
        <template slot="header">
          <span>退货总金额<br />（不含税）</span>
        </template>
        <template slot-scope="{row}">
          {{row.amount}}
        </template>
      </el-table-column>
      <el-table-column align="center" width="100" label="退货商品金额">
        <template slot="header">
          <span>退货总金额<br />（含税）</span>
        </template>
        <template slot-scope="{row}">
          {{row.taxAmount}}
        </template>
      </el-table-column>
      <el-table-column align="center" width="100" prop="taxRate" label="税率"></el-table-column>
      <el-table-column align="center" width="100" prop="tax" label="税额"></el-table-column>
      <!-- <el-table-column prop="returnNum" align="center" width="80" label="好品数量" /> -->
      <!-- <el-table-column prop="badGoodsNum" align="center" width="80" label="坏品数量" /> -->
      <el-table-column prop="grossWeight" align="center" width="100" label="退货商品毛重" />
      <el-table-column prop="netWeight" align="center" width="100" label="退货商品净重" />
      <el-table-column prop="boxNo" align="center" width="120" label="退货商品箱号" show-overflow-tooltip />
      <el-table-column prop="contractNo" align="center" width="120" label="退货商品合同号" show-overflow-tooltip />
      <el-table-column prop="returnBatchNo" align="center" width="100" label="退运批次" show-overflow-tooltip />
    </JFX-table>
    <!-- 销售退货商品明细 end -->
  </div>
</template>
<script>
import { getSaleReturnDetail } from '@a/salesReturnManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 详情的数据
      detail: {},
      // 面包屑数据
      breadcrumb: [
        {path: '', meta: { title: '销售退货管理' }},
        {path: '/sales/salesreturnorder', meta: { title: '销售退货订单' }},
        {path: `/sales/salesreturndetail/${this.$route.query.id}`, meta: { title: '销售退货订单详情' }}
      ]
    }
  },
  activated() {
    this.getList()
  },
  mounted() {
    this.getList()
  },
  methods: {
		async getList() {
      try {
        this.tableData.loading = true
				const { data } = await getSaleReturnDetail({ id: this.$route.query.id })
        this.detail = data
        this.tableData = {
          list: data.itemList,
          loading: false
        }
			} catch (err) {
        this.tableData.loading = false
			}
    }
  }
}
</script>
