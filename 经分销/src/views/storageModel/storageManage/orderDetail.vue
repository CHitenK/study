<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col class="mr-b-10" :span="24" >
        盘点单号：{{detail.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        盘点仓库：{{detail.depotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        备注：{{detail.remark || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        服务类型：{{detail.serverTypeLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        单据状态：{{detail.statusLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        业务场景：{{detail.modelLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        提交人：{{detail.submitUsername || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建人：{{detail.createUsername || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        委托单位：{{detail.merchantName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        提交时间：{{detail.submitTime || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建人： {{detail.createTime || '- -'}}
      </el-col>
    </el-row>
    <!-- title -->
    <JFX-title title="商品信息" className="mr-t-15" />
    <JFX-table
      :tableData.sync="tableData"
      :showPagination="false"
    >
      <el-table-column
        type="index"
        width="50"
        label="序号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goodsCode"
        label="商品编号"
        align="center"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="goodsNo"
        label="商品货号"
        align="center"
        width="200"
      >
      </el-table-column>
        <el-table-column
        prop="goodsName"
        label="商品名称"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="barcode"
        label="条形码"
        align="center"
        width="200"
      >
      </el-table-column>
    </JFX-table>
    <!-- title end -->
  </div>
</template>
<script>
import { getTakesStockDetail } from '@a/storageManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      detail: {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取详情数据
    async getList() {
      try {
        this.tableData.loading = true
        const { data } = await getTakesStockDetail({ id: this.$route.query.id })
        this.detail = data.takesStockDTO
        this.tableData.list = data.itemList
        this.tableData.loading = false
      } catch (err) {
        this.tableData.loading = false
      }
    }
  }
}
</script>
