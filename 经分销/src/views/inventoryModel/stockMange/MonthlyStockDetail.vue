<template>
  <!-- 库存月结详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <el-row  :gutter="10" class="fs-14 clr-II mr-b-20">
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        结转状态：{{ detail.stateLabel || '- -' }}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        结转月份：{{ detail.settlementMonth || '- -' }}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        结算时间：{{ detail.settlementDate || '- -' }}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        公司：{{ detail.merchantName || '- -' }}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        期初时间：{{ detail.firstDate || '- -' }}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        结算人：{{ detail.planName || '- -' }}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        期末时间：{{ detail.endDate || '- -' }}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        创建时间：{{ detail.createDate || '- -' }}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 商品信息 -->
    <JFX-title title="商品信息" className="mr-t-10" />
    <JFX-table :tableData.sync="tableData" :showPagination="false">
      <el-table-column  type="index"
                        align="center"
                        label="序号"
                        width="55">
      </el-table-column>
      <el-table-column  prop="depotName"
                        align="center"
                        min-width="80"
                        label="仓库名称">
      </el-table-column>
      <el-table-column  prop="goodsNo"
                        align="center"
                        min-width="80"
                        label="商品货号">
      </el-table-column>
      <el-table-column  prop="goodsName"
                        align="center"
                        min-width="80"
                        label="商品名称">
      </el-table-column>
      <el-table-column  prop="barcode"
                        align="center"
                        min-width="80"
                        label="商品条码">
      </el-table-column>
      <el-table-column  prop="batchNo"
                        align="center"
                        min-width="80"
                        label="批次">
      </el-table-column>
      <el-table-column  prop="surplusNum"
                        align="center"
                        min-width="80"
                        label="库存余量">
      </el-table-column>
      <el-table-column  prop="availableNum"
                        align="center"
                        min-width="80"
                        label="仓库现存量">
      </el-table-column>
      <el-table-column  prop="unitLabel"
                        align="center"
                        min-width="80"
                        label="单位">
      </el-table-column>
      <el-table-column  prop="typeLabel"
                        align="center"
                        min-width="80"
                        label="库存类型">
      </el-table-column>
      <el-table-column  prop="settlementNum"
                        align="center"
                        min-width="80"
                        label="期末结转库存">
      </el-table-column>
      <el-table-column  prop="isExpireLabel"
                        align="center"
                        min-width="80"
                        label="是否过期">
      </el-table-column>
      <el-table-column  prop="commbarcode"
                        align="center"
                        min-width="80"
                        label="标准条码">
      </el-table-column>
    </JFX-table>
    <!-- 商品信息 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 详情数据
      detail: {},
      // 面包屑数据
      breadcrumb: [
        {path: '', meta: { title: '库存管理' }},
        {path: '/stock/monthlystock', meta: { title: '月库存转结' }},
        {path: `/stock/monthlystockdetail/${this.$route.params.id}`, meta: { title: '库存月结详情' }}
      ],
      // 表格数据
      tableData: {
        list: [{}],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 11
      }
    }
  }
}
</script>
