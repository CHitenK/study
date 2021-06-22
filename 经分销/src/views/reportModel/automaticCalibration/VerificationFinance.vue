<template>
  <!-- 业财自核对页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)" :showOpenBtn="false">
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
            <el-form-item label="核对结果：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.status"
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
      <el-table-column prop="month" align="center" min-width="80" label="报表月份" />
      <el-table-column prop="buInventorySummaryEndNum" align="center" min-width="80" label="事业部业务进销存" />
      <el-table-column prop="buFinanceSummaryEndNum" align="center" min-width="80" label="事业部财务进销存" />
      <el-table-column prop="createDate" align="center" min-width="80" label="最新更新时间" />
      <el-table-column prop="statusLabel" align="center" min-width="80" label="校验结果" />
      <el-table-column align="center" min-width="100" label="操作">
        <template>
          <el-button type="text" @click="$showToast('确定刷新?')">刷新</el-button>
          <el-button type="text" @click="$showToast('确定统计?')">统计</el-button>
        </template>
      </el-table-column>
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
        depotId: '',
        status: ''
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
          list: fetchData,
          loading: false,
          pageNum: 1,
          total: 11,
          pageSize: 10
        }
      }, 500)
    }
  }
}
const fetchData = [{
  buFinanceSummaryEndNum: 438294,
  buInventorySummaryEndNum: 712,
  createDate: '2021-02-02 10:42:51',
  merchantId: 1000031,
  merchantName: '健太',
  month: '2021-01',
  status: '0',
  statusLabel: '未对平'
}]
</script>
