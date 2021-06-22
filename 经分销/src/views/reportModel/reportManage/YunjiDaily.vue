<template>
  <!-- 云集采销日报页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品名称："  prop="goodsNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.goodsNo" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="品类：" prop="productTypeId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.productTypeId"
                placeholder="请选择"
                clearable
                :data-list="getSelectList('financeInventorySummary_statusList')"
              >
                <el-option
                  v-for="item in selectOpt.financeInventorySummary_statusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="统计日期：" prop="sDate" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                v-model="searchProps.sDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="品牌名称：" prop="brandId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.brandId"
                placeholder="请选择"
                clearable
                :data-list="getSelectList('adjustmentType_sourceList')"
              >
                <el-option
                  v-for="item in selectOpt.adjustmentType_sourceList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary" @click="$successMsg('success')">导出</el-button>
        <el-button type="primary" @click="$successMsg('success')">刷新</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="goodsNo" align="center" min-width="80" label="商品货号" />
      <el-table-column prop="barcode" align="center" min-width="80" label="条形码" />
      <el-table-column prop="goodsName" align="center" min-width="80" label="商品名称" />
      <el-table-column prop="brandName" align="center" min-width="80" label="商品品牌" />
      <el-table-column prop="productTypeName" align="center" min-width="80" label="二级分类" />
      <el-table-column prop="daySaleNum" align="center" min-width="80" label="当日销量" />
      <el-table-column prop="monthSaleNum" align="center" min-width="80" label="当月销量" />
      <el-table-column prop="yearSaleNum" align="center" min-width="80" label="年度销量" />
      <el-table-column prop="dayInventoryNum" align="center" min-width="80" label="保税仓当日库存" />
      <el-table-column prop="dayReturnBinNum" align="center" min-width="80" label="退货仓当日库存" />
      <el-table-column prop="snapshotDate" align="center" min-width="80" label="快照时间" />
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>

<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 查询数据
      searchProps: {
        goodsNo: '',
        productTypeId: '',
        sDate: '',
        brandId: ''
      },
      // 表格数据
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 11
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 拉取表格数据
		getList(pageNum) {
      const params = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.searchProps
      }
      console.log(params)
    }
  }
}
</script>
