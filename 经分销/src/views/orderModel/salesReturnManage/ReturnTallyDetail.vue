<template>
  <!-- 销售退理货单详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <!-- 理货单据详情 -->
    <JFX-title title="理货单据详情" />
    <el-row :gutter="10" class="fs-12 clr-II mr-b-20 detail-row">
      <el-col :class="detail.state === '009' ? 'mr-b-10' : ''" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          理货单据状态：{{detail.state === '010' ? '已确认' : detail.state === '004' ? '已驳回' : ''}}
          <template v-if="detail.state === '009'">
            <span>待确认</span>
            <el-button id="sale-confirm-btn" type="primary" @click="tallyConfirm('010')">确认</el-button>
            <el-button id="sale-reject-btn" type="primary" @click="tallyConfirm('004')">驳回</el-button>
          </template>
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        理货单号：{{detail.code || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        销退订单号：{{detail.orderCode || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        合同号：{{detail.contractNo || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        仓库名称：{{detail.depotName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        理货时间：{{detail.tallyingDate || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        确认人：{{detail.confirmUserName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        确认时间：{{detail.confirmDate || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        创建时间：{{detail.createDate || '- -'}}
      </el-col>
    </el-row>
    <!-- 理货单据详情 end -->
    <!-- 商业列表/批次明细 -->
    <el-tabs v-model="activeIndex" type="card">
      <el-tab-pane label="商业列表">
        <JFX-table :tableData.sync="tableData" :showPagination="false">
          <el-table-column type="index"
                           align="center"
                           width="55"
                           label="序号"
          ></el-table-column>
          <el-table-column prop="goodsNo"
                           align="center"
                           min-width="120"
                           label="商品货号"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="goodsName"
                           align="center"
                           min-width="100"
                           label="商品名称"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="barcode"
                           align="center"
                           min-width="120"
                           label="商品条形码"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="purchaseNum"
                           align="center"
                           width="90"
                           label="申报数量"
          ></el-table-column>
          <el-table-column prop="tallyingNum"
                           align="center"
                           width="90"
                           label="理货数量"
          ></el-table-column>
          <el-table-column prop="lackNum"
                           align="center"
                           width="90"
                           label="缺少数量"
          ></el-table-column>
          <el-table-column prop="multiNum"
                           align="center"
                           width="90"
                           label="多货数量"
          ></el-table-column>
          <el-table-column prop="normalNum"
                           align="center"
                           width="90"
                           label="正常数量"
          ></el-table-column>
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="批次明细">
        <JFX-table :tableData.sync="batchList"
                   :showPagination="false">
          <el-table-column type="index"
                           align="center"
                           width="55"
                           label="序号"
          ></el-table-column>
          <el-table-column prop="goodsNo"
                           align="center"
                           width="140"
                           label="商品货号"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="goodsName"
                           align="center"
                           min-width="120"
                           label="商品名称"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="batchNo"
                           align="center"
                           width="130"
                           label="批次号"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="productionDate"
                           align="center"
                           width="100"
                           label="生产日期"
                           show-overflow-tooltip>
            <template slot-scope="{row}">
              {{row.productionDate.slice(0, 10)}}
            </template>
          </el-table-column>
          <el-table-column prop="overdueDate"
                           align="center"
                           width="100"
                           label="效期至"
                           show-overflow-tooltip>
            <template slot-scope="{row}">
              {{row.overdueDate.slice(0, 10)}}
            </template>
          </el-table-column>
          <el-table-column prop="wornNum"
                           align="center"
                           width="80"
                           label="损货数量"
          ></el-table-column>
          <el-table-column prop="expireNum"
                           align="center"
                           width="80"
                           label="过期数量"
          ></el-table-column>
          <el-table-column prop="normalNum"
                           align="center"
                           width="80"
                           label="正常数量"
          ></el-table-column>
          <el-table-column prop="grossWeight"
                           align="center"
                           width="70"
                           label="毛重"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="netWeight"
                           align="center"
                           width="70"
                           label="净重"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="volume"
                           align="center"
                           width="70"
                           label="体积"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="length"
                           align="center"
                           width="70"
                           label="长"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="width"
                           align="center"
                           width="70"
                           label="宽"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="height"
                           align="center"
                           width="70"
                           label="高"
                           show-overflow-tooltip
          ></el-table-column>
        </JFX-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 商业列表/批次明细 end -->
  </div>
</template>

<script>
import { getTallyOrderDetail, tallyConfirmTransfer } from '@a/salesReturnManage/returnTallyOrder.api'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // tabs页索引
      activeIndex: '0',
      // 详情的数据
      detail: {},
      // 面包屑数据
      breadcrumb: [
        {path: '', meta: { title: '销售退货管理' }},
        {path: '/sales/returntallyorder', meta: { title: '销售退理货单列表' }},
        {path: `/sales/returntallydetail/${this.$route.query.id}`, meta: { title: '销售退理货单详情' }}
      ],
      // 批次明细表格
      batchList: {
        list: []
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
    async getList() {
      try {
        this.tableData.loading = true
				const { data } = await getTallyOrderDetail({ id: this.$route.query.id })
        this.detail = data.tallyingOrderDTO
        this.batchList.list = data.tallyingItemBatchList
        this.tableData = {
          list: data.tallyingOrderDTO.itemList,
          loading: false
        }
			} catch (err) {
        this.tableData.loading = false
			}
    },
    // 确认/驳回
    tallyConfirm(state) {
      this.$showToast('确定提交选中对象', async() => {
        try {
          const res = await tallyConfirmTransfer({
            state,
            ids: this.detail.id
          })
          this.$successMsg(res.message)
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    }
  }
}
</script>
