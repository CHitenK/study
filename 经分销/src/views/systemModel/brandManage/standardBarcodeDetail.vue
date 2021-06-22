<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        标准条码：{{detail.commbarcode || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        标准品牌：{{detail.commBrandParentName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        标准品类：{{detail.commTypeName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :span="24" >
        标准品名：{{detail.commGoodsName || '- -'}}
      </el-col>
    </el-row>
    <!-- title -->
    <JFX-title title="商品明细" className="mr-t-20" />
    <JFX-table
      :tableData.sync="tableData1"
      :showPagination="false"
    >
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
      <el-table-column prop="goodsCode" label="商品编码" align="center" width="180"></el-table-column>
      <el-table-column prop="barcode" label="条形码" align="center" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsNo" label="商品货号" align="center" width="180"></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" align="center" min-width="100"></el-table-column>
      <el-table-column label="外仓统一码" align="center" width="100">
        <template slot-scope="scope">
          {{scope.row.outDepotFlag === '0' ? '是' : '否'}}
        </template>
      </el-table-column>
      <el-table-column prop="brandName" label="品牌" align="center" width="180"></el-table-column>
      <el-table-column prop="typeName" label="二级品类" align="center" width="100"></el-table-column>
    </JFX-table>
  </div>
</template>
<script>
import { toDetailPage } from '@a/brandManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      tableData1: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      detail: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { query } = this.$route
      if (!query.id) return false
      try {
       const res = await toDetailPage({ id: query.id })
       this.detail = res.data.detail || {}
       this.tableData1.list = res.data.itemList || []
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
