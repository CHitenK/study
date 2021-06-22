<template>
  <!-- 销售赊销单详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        销售融资单号：{{detail.preSaleOrderCode}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        销售单号：{{detail.auditDate}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        事业部：{{detail.auditName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        状态：{{detail.customerName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        客户：{{detail.goodsNo}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        币种：{{detail.buName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        金额：{{detail.merchantName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        应收保证金：{{detail.barcode}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        实收保证金：{{detail.goodsName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        收保证金日期：{{detail.goodsName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        放款日期：{{detail.goodsName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        起息日期：{{detail.goodsName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        收款日期：{{detail.goodsName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        收款本金额：{{detail.goodsName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        收款利息：{{detail.goodsName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        创建人：{{detail.goodsName}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        创建时间：{{detail.goodsName}}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 商品信息 -->
    <JFX-title title="商品信息" className="mr-t-15" />
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               :showPagination="false">
    </JFX-table>
    <!-- 商品信息 end -->
    <!-- 收款信息 -->
    <JFX-title title="收款信息" className="mr-t-15" />
    <JFX-table :tableData.sync="collectionTableData"
               :tableColumn="collectionTableColumn"
               :showPagination="false">
      <template slot="action" slot-scope="{row}">
        <el-button type="text"
                   style="padding-left: 5px;"
                   v-permission="'payment_billsPayable_detail'"
                   @click="showModal('creditCollection', row.code)">详情</el-button>
      </template>
    </JFX-table>
    <!-- 收款信息 end -->
    <!-- 附件信息 -->
    <JFX-title title="附件信息" className="mr-t-15" />
    <EnclosureList :showAction="false" :code="detail.code" ref="enclosure" class="mr-t-15" />
    <!-- 附件信息 end -->
    <!-- 赊销收款详情 -->
    <CreditCollectionDetail v-if="creditCollection.visible.show"
                            :visible.sync="creditCollection.visible"
                            :filterData="creditCollection.filterData"
    ></CreditCollectionDetail>
    <!-- 赊销收款详情 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import { toDetailsPage } from '@a/salesManage/salesCrossCheck.api'
export default {
  mixins: [commomMix],
  components: {
    // 附件列表
    EnclosureList: () => import('@c/enclosureList/index'),
    // 赊销收款详情
    CreditCollectionDetail: () => import('./components/CreditCollectionDetail')
  },
  data() {
    return {
      // 详情的数据
      detail: {},
      // 商品信息表格列结构
      tableColumn: [
        { label: '商品货号', prop: 'code', minWidth: '140', align: 'center', hide: true },
        { label: '商品名称', prop: 'outDepotName', minWidth: '120', align: 'center', hide: true },
        { label: '数量', prop: 'buName', minWidth: '120', align: 'center', hide: true },
        { label: '单价', prop: 'customerName', minWidth: '120', align: 'center', hide: true },
        { label: '金额', prop: 'saleOrderCodes', minWidth: '140', align: 'center', hide: true },
        { label: '分摊本金', prop: 'inDepotName', minWidth: '120', align: 'center', hide: true },
        { label: '分摊保证金', prop: 'statusLabel', width: '100', align: 'center', hide: true },
        { label: '到期单价', prop: 'apiStatusLabel', width: '100', align: 'center', hide: true },
        { label: '到期金额', prop: 'apiStatusLabel', width: '100', align: 'center', hide: true }
      ],
      // 收款信息表格数据
      collectionTableData: {
        list: []
      },
      // 收款信息表格列结构
      collectionTableColumn: [
        { label: '收款单号', prop: 'code', minWidth: '140', align: 'center', hide: true },
        { label: '创建人', prop: 'outDepotName', minWidth: '120', align: 'center', hide: true },
        { label: '收款日期', prop: 'buName', minWidth: '120', align: 'center', hide: true },
        { label: '分摊本金', prop: 'customerName', minWidth: '120', align: 'center', hide: true },
        { label: '分摊保证金', prop: 'saleOrderCodes', minWidth: '140', align: 'center', hide: true },
        { label: '资金占用费', prop: 'inDepotName', minWidth: '120', align: 'center', hide: true },
        { label: '代理费', prop: 'statusLabel', width: '100', align: 'center', hide: true },
        { label: '滞纳金', prop: 'apiStatusLabel', width: '100', align: 'center', hide: true },
        { label: '应收款金额', prop: 'apiStatusLabel', width: '100', align: 'center', hide: true },
        { label: '操作', slotTo: 'action', width: '160', align: 'left' }
      ],
      // 日志组件
      creditCollection: {
        filterData: {},
        visible: { show: false }
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
      const { code, goodsNo } = this.$route.query
      try {
        this.tableData.loading = true
        this.checkTableData.loading = true
				const { data } = await toDetailsPage({ code, goodsNo })
        this.detail = data.mainInfo
        this.tableData = {
          list: [data.mainInfo],
          loading: false
        }
        this.checkTableData = {
          list: data.details,
          loading: false
        }
			} catch (err) {
        this.tableData.loading = false
        this.checkTableData.loading = false
			}
    },
    // 显示日志弹窗
    showModal(type, data) {
      switch (type) {
        case 'creditCollection':
          this.creditCollection.filterData = { relCode: data }
          this.creditCollection.visible.show = true
          break
      }
    }
  }
}
</script>
