<template>
  <!-- 客户额度预警页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        暂估费用单号：{{detail.code || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        外部交易单号：{{detail.externalCode || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        电商订单号：{{detail.orderCode || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        平台：{{detail.storePlatformCode || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        销售币种：{{detail.currency || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        店铺名称：{{detail.shopName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        发货日期：{{detail.deliverDate || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        修改人：{{detail.modifyName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        修改时间：{{detail.modifyDate || '- -'}}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 商品SD明细 -->
    <JFX-title title="暂估费用明细" class="mr-t-15" />
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               :showPagination="false"
    ></JFX-table>
    <!-- 商品SD明细 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import { detailPlatformTemporaryOrder } from '@a/salesManage'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 详情数据
      detail: {},
      // 表格列结构
      tableColumn: [
        { label: '商品货号', prop: 'goodsNo', align: 'center', hide: true, minWidth: '140' },
        { label: '商品名称', prop: 'goodsName', align: 'center', minWidth: '120', hide: true },
        { label: '平台费项名称', prop: 'platformSettlementName', align: 'center', minWidth: '100', hide: true },
        { label: '结算金额', prop: 'amount', align: 'center', minWidth: '100', hide: true },
        { label: '费项比例', prop: 'ratio', align: 'center', minWidth: '100', hide: true },
        { label: '费项金额', prop: 'settlementAmount', align: 'center', minWidth: '100', hide: true }
      ]
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
        const { data } = await detailPlatformTemporaryOrder({ id })
        this.detail = data || {}
        const { itemList } = this.detail
        this.tableData.list = itemList || []
      } catch (error) {
        this.$errorMsg(error.message)
      }
    }
  }
}
</script>
