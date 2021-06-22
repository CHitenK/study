<template>
  <!-- 唯品账单校验页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="年月份：" prop="month" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                v-model="searchProps.month"
                type="month"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="PO号：" prop="poNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.poNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="账单号：" prop="crawlerNo" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.crawlerNo"
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
            <el-form-item label="校验结果：" prop="verificationResult" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.verificationResult"
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
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary" @click="successMsg('success')">导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column prop="month" align="center" min-width="80" label="标准品牌" />
      <el-table-column prop="crawlerNo" align="center" min-width="80" label="账单号" />
      <el-table-column prop="poNo" align="center" min-width="80" label="PO号" />
      <el-table-column prop="billSalesAccount" align="center" min-width="80" label="账单销售总量" />
      <el-table-column prop="billHcAccount" align="center" min-width="80" label="账单红冲总量" />
      <el-table-column prop="billAdjustmentIncreaseAccount" align="center" min-width="80" label="账单其他总量（调增）" />
      <el-table-column prop="billAdjustmentDecreaseAccount" align="center" min-width="80" label="账单其他总量（调减）" />
      <el-table-column prop="systemSalesOutAccount" align="center" min-width="80" label="系统销售出库总量" />
      <el-table-column prop="systemHcAccount" align="center" min-width="80" label="系统红冲总量" />
      <el-table-column prop="systemAdjustmentIncreaseAccount" align="center" min-width="80" label="系统库存调整（调增）" />
      <el-table-column prop="systemAdjustmentDecreaseAccount" align="center" min-width="80" label="系统库存调整（调减）" />
      <el-table-column prop="verificationResultLabel" align="center" min-width="80" label="校验结果" />
    </JFX-table>
    <!-- 表格 end -->
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
        month: '',
        poNo: '',
        crawlerNo: '',
        verificationResult: ''
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
      this.tableData.loading = true
      setTimeout(() => {
        this.tableData = {
          list: [],
          loading: false,
          pageNum: 1,
          total: 11,
          pageSize: 10
        }
      }, 500)
    }
  }
}
</script>
