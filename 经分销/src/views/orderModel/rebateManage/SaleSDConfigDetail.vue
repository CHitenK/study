<template>
  <!-- 销售订单详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-15" />
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        公司：{{detail.merchantName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        客户：{{detail.customerName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        生效时间：{{detail.effectiveDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        失效时间：{{detail.expirationDate|| '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        平台备注：{{detail.remark || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        创建人：{{detail.createName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        创建时间：{{detail.createDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        审核人：{{detail.auditName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        审核时间：{{detail.auditDate || '- -'}}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 配置信息 -->
    <JFX-title title="配置信息" />
    <JFX-table :tableData.sync="tableData" :tableColumn="tableColumn" showIndex />
    <!-- 配置信息 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import { sdSaleConfigDetail } from '@a/rebateManage/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 详情数据
      detail: {},
      // 表格列数据
      tableColumn: [
        { label: 'SD类型', prop: 'sdTypeName', minWidth: '120', align: 'center', hide: true },
        { label: '平台品类', prop: 'categoryName', minWidth: '120', align: 'center', hide: true },
        { label: '母品牌', prop: 'superiorParentBrandName', minWidth: '120', align: 'center', hide: true },
        { label: '标准品牌', prop: 'brandParentName', minWidth: '100', align: 'center', hide: true },
        { label: '比例', prop: 'ratio', width: '160', align: 'center', hide: true }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id } = this.$route.query
      if (!id) return false
      const res = await sdSaleConfigDetail({ id })
      this.detail = res.data
      this.tableData.list = this.detail.itemList || []
    }
  }
}
</script>
