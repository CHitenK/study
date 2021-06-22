<template>
  <!-- 补货动销报表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="报表日期：" prop="reportDate" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                v-model="searchProps.reportDate"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="仓库：" prop="warehouse" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.warehouse"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in warehouseList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />

              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品编码："  prop="wareId" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.wareId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="平台：" prop="platform" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.platform"
                placeholder="请选择"
                clearable
              >
                <el-option
                  :key="'京东'"
                  :label="'京东'"
                  :value="'京东'"
                />
                 <el-option
                  :key="'唯品'"
                  :label="'唯品'"
                  :value="'唯品'"
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
        <el-button type="primary" @click="exportList">导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @change="getList" class="mr-t-20" >
      <el-table-column type="index" align="center" width="55" label="序号" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="公司" show-overflow-tooltip  />
      <el-table-column prop="platform" align="center" min-width="60" label="平台" />
      <el-table-column prop="warehouse" align="center" min-width="120" label="仓库" show-overflow-tooltip />
      <el-table-column prop="runDate" align="center" min-width="90" label="报表日期" />
      <el-table-column prop="wareId" align="center" min-width="80" label="商品编码" />
      <el-table-column prop="upc" align="center" min-width="120" label="条形码" />
      <el-table-column prop="name" align="center" min-width="150" label="商品名称" show-overflow-tooltip />
      <el-table-column prop="transitStock" align="center" min-width="80" label="在途数量" />
      <el-table-column prop="stock" align="center" min-width="60" label="库存" />
      <el-table-column prop="avg90dayNum" align="center" min-width="100" label="90天日均销量" />
      <el-table-column prop="stockSellDays" align="center" min-width="110" label="预计库存清空天数" />
      <el-table-column prop="purchaseNum" align="center" min-width="90" label="建议采购数量" />
      <el-table-column prop="supplySellDays" align="center" min-width="140" label="补货后预计库存清空天数" />
      <el-table-column prop="supplyWarning" align="center" min-width="110" label="是否触发补货预警" />
      <el-table-column prop="cartonSize" align="center" min-width="60" label="箱规" show-overflow-tooltip  />
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>

<script>
import { listPurchasingReports, exportPurchasingReportsUrl, getOrderCount } from '@a/platformData/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 查询数据
      searchProps: {
        reportDate: '',
        warehouse: '',
        wareId: '',
        platform: ''
      },
      warehouseList: [
        { key: '上海外高桥', value: '上海外高桥' },
        { key: '天津保税仓库', value: '天津保税' },
        { key: '郑州保税', value: '郑州保税' },
        { key: '南沙保税配送中心', value: '南沙保税配送中心' }
      ]
    }
  },
  mounted() {
    this.getList(1)
  },
  activated() {
    this.getList()
  },
  methods: {
    // 拉取表格数据
		async getList(pageNum) {
      try {
        this.tableData.loading = true
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps,
          reportDate: this.searchProps.reportDate ? this.searchProps.reportDate.substring(0, 10) : ''
        }
        const res = await listPurchasingReports(opt)
        this.tableData.list = res.data.list || []
        this.tableData.total = res.data.total
      } catch (err) {
        console.log(err)
      }
      this.tableData.loading = false
    },
    // 导出列表
    async exportList() {
      if (this.tableData.total < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      const opt = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.searchProps,
        reportDate: this.searchProps.reportDate ? this.searchProps.reportDate.substring(0, 10) : ''
      }
      const res = await getOrderCount(opt) // 获取最大导出数量
      if (!res.data.total || res.data.total > 1000) {
        this.$errorMsg('导出的数量过大，请填写筛选条件再导出')
        return false
      }
      this.$exportFile(exportPurchasingReportsUrl, opt)
    },
    resetForm() {
      this.reset('searchForm', () => {
        this.getList(1)
      })
    }
  }
}
</script>
