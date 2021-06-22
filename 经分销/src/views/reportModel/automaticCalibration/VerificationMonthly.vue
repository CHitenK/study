<template>
  <!-- 月结自核对页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)" :showOpenBtn="false">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="账单月份：" prop="month" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                v-model="searchProps.month"
                type="month"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="仓库名称：" prop="depotId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.depotId"
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
      <el-table-column type="index" align="center" width="55" label="序号" />
      <el-table-column prop="depotName" align="center" min-width="100" label="仓库名称" />
      <el-table-column prop="month" align="center" min-width="80" label="报表月份" />
      <el-table-column prop="settleDate" align="center" min-width="80" label="月结报表库存">
        <template slot-scope="{row}">
          <div>{{`好品：${row.monthlyAccountNormalNum}`}}</div>
          <div>{{`坏品：${row.monthlyAccountWornNum}`}}</div>
          <div>{{`库存总量：${row.monthlyAccountSurplusNum}`}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="skuNo" align="center" min-width="80" label="事业部库存量">
        <template slot-scope="{row}">
          <div>{{`好品：${row.buInventoryNormalNum}`}}</div>
          <div>{{`坏品：${row.buInventoryWornNum}`}}</div>
          <div>{{`库存总量：${row.buInventorySurplusNum}`}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="platformDeliveryAccount" align="center" min-width="80" label="事业部业务进销存">
        <template slot-scope="{row}">
          <div>{{`好品：${row.buInventorySummaryNormalNum}`}}</div>
          <div>{{`坏品：${row.buInventorySummaryWornNum}`}}</div>
          <div>{{`库存总量：${row.buInventorySummaryEndNum}`}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="platformReturnAccount" align="center" min-width="80" label="仓库现存量">
        <template slot-scope="{row}">
          <div>{{`好品：${row.inventoryRealTimeNormalQty}`}}</div>
          <div>{{`坏品：${row.inventoryRealTimeWornQty}`}}</div>
          <div>{{`库存总量：${row.inventoryRealTimeQty}`}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" align="center" min-width="150" label="最近刷新时间" />
      <el-table-column prop="statusLabel" align="center" min-width="60" label="校验结果" />
      <el-table-column align="center" min-width="100" label="操作">
        <template>
          <el-button type="text" @click="$showToast('确定统计?')">统计</el-button>
          <el-button type="text" @click="$showToast('确定刷新?')">刷新</el-button>
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
  buInventoryNormalNum: 4055,
  buInventorySummaryEndNum: 4258,
  buInventorySummaryNormalNum: 4227,
  buInventorySummaryWornNum: 31,
  buInventorySurplusNum: 4086,
  buInventoryWornNum: 31,
  createDate: '2020-12-09 16:18:37',
  depotId: 34,
  depotName: '京东南沙POP保税仓',
  inventoryRealTimeNormalQty: 0,
  inventoryRealTimeQty: 0,
  inventoryRealTimeWornQty: 0,
  merchantId: 1000031,
  month: '2020-11',
  monthlyAccountNormalNum: 0,
  monthlyAccountSurplusNum: 0,
  monthlyAccountWornNum: 0,
  pageNo: 1,
  pageSize: 10,
  status: '0',
  statusLabel: '未对平'
}]
</script>
