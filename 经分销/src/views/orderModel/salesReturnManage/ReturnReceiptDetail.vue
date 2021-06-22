<template>
  <!-- 销售退货出库单详细页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row">
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        销退入库单号：{{detail.code || '- -'}}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        单据状态：{{detail.statusLabel || '- -'}}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        退出仓库：{{detail.outDepotName || '- -'}}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        服务类型：{{
                  detail.serveTypes === 'E0' ? '区内调拨调出服务' :
                  detail.serveTypes === 'F0' ? '区内调拨调入服务' :
                  detail.serveTypes === 'G0' ? '库内调拨服务' : '- -'
                }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        销退订单号：{{detail.orderCode || '- -'}}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        退入仓库：{{detail.inDepotName || '- -'}}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        业务场景：{{
                  detail.model === '40' ? '账册内货权转移' :
                  detail.model === '50' ? '账册内货权转移调仓' : '- -'
                }}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        合同号：{{detail.contractNo || '- -'}}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        申报地海关编码：{{detail.customsNo || '- -'}}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        销退入库时间：{{detail.returnInDate || '- -'}}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        委托单位：{{detail.merchantName || '- -'}}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        申报地国检编码：{{detail.inspectNo || '- -'}}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        退货客户：{{detail.customerName || '- -'}}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        备注：{{detail.remark || '- -'}}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 销售退货入库商品明细 -->
    <JFX-title title="销售退货入库商品明细" className="mr-t-15" />
    <JFX-table :tableData.sync="tableData"
               :showPagination="false">
      <el-table-column  type="index"
                        align="center"
                        width="55"
                        label="序号"
      ></el-table-column>
      <el-table-column  prop="inGoodsCode"
                        align="center"
                        min-width="120"
                        label="退入商品编号"
                        show-overflow-tooltip
      ></el-table-column>
      <el-table-column  prop="inGoodsNo"
                        align="center"
                        min-width="120"
                        label="退入商品货号"
                        show-overflow-tooltip
      ></el-table-column>
      <el-table-column  prop="inGoodsName"
                        align="center"
                        min-width="120"
                        label="退入商品名称"
                        show-overflow-tooltip
      ></el-table-column>
      <el-table-column  align="center"
                        width="100"
                        label="退货入库数量">
        <template slot-scope="{row}">
          {{row.returnNum + row.wornNum + row.expireNum}}
        </template>
      </el-table-column>
      <el-table-column  prop="returnBatchNo"
                        align="center"
                        width="120"
                        label="退入批次"
                        show-overflow-tooltip
      ></el-table-column>
      <el-table-column  prop="productionDate"
                        align="center"
                        width="150"
                        label="生产日期"
      ></el-table-column>
      <el-table-column  prop="overdueDate"
                        align="center"
                        width="150"
                        label="失效日期"
      ></el-table-column>
    </JFX-table>
    <!-- 销售退货入库商品明细 end -->
  </div>
</template>

<script>
import { getSaleReturnIdepotDetail } from '@a/salesReturnManage/returnReceiptOrder.api'
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
        {path: '/sales/returnreceiptorder', meta: { title: '销售退货入库清单' }},
        {path: `/sales/returnreceiptdetail/${this.$route.query.id}`, meta: { title: '销售退货入库单详细' }}
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
				const { data } = await getSaleReturnIdepotDetail({ id: this.$route.query.id })
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
