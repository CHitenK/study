<template>
  <!-- 购销采销日报页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
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
            <el-form-item label="品牌名称：" prop="brandId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.brandId"
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
            <el-form-item label="统计日期：" prop="reportDate" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                v-model="searchProps.reportDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客户：" prop="customerId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.customerId"
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
        <el-button type="primary" @click="$successMsg('success')">刷新该日数据</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="customerName" align="center" min-width="80" label="客户" />
      <el-table-column prop="productTypeName" align="center" min-width="80" label="品类" />
      <el-table-column prop="brandName" align="center" min-width="80" label="品牌" />
      <el-table-column prop="daySaleCount" align="center" min-width="80" label="当日销售量" />
      <el-table-column prop="daySaleAmount" align="center" min-width="80" label="当日销售额(RMB)" />
      <el-table-column prop="monSaleCount" align="center" min-width="80" label="当月销售量" />
      <el-table-column prop="monAvgCount" align="center" min-width="80" label="当月日均销售量" />
      <el-table-column prop="monSaleAmount" align="center" min-width="80" label="当月销售额(RMB)" />
      <el-table-column prop="yearSaleCount" align="center" min-width="80" label="年度销售量" />
      <el-table-column prop="yearSaleAmount" align="center" min-width="80" label="年度销售额(RMB)" />
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
        productTypeId: '',
        brandId: '',
        reportDate: '',
        customerId: ''
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
