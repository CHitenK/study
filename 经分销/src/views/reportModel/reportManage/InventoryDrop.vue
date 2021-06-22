<template>
  <!-- 存货跌价准备页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="报表月份：" prop="reportMonth" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                v-model="searchProps.reportMonth"
                type="month"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="仓库：" prop="depotId" class="search-panel-item fs-14 clr-II" >
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
            <el-form-item label="商品货号：" prop="goodsNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.goodsNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="计提比例：" prop="depreciationReserveProportion" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.depreciationReserveProportion"
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
            <el-form-item label="效期：" prop="effectiveInterval" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.effectiveInterval"
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
        <el-button type="primary" @click="successMsg('success')">刷新报表</el-button>
        <el-checkbox v-model="isSynchronization">同步数据</el-checkbox>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column type="index" align="center" width="55" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="公司名称" />
      <el-table-column prop="depotName" align="center" min-width="80" label="仓库名称" />
      <el-table-column prop="reportMonth" align="center" min-width="80" label="报表月份" />
      <el-table-column prop="goodsNo" align="center" min-width="80" label="商品货号" />
      <el-table-column prop="goodsName" align="center" min-width="80" label="商品名称" />
      <el-table-column prop="productionDate" align="center" min-width="80" label="生产日期" />
      <el-table-column prop="overdueDate" align="center" min-width="120" label="失效日期" />
      <el-table-column prop="batchNo" align="center" min-width="80" label="批次号" />
      <el-table-column prop="surplusNum" align="center" min-width="80" label="总数量" />
      <el-table-column prop="inverntoryTypeLabel" align="center" min-width="80" label="库存类型" />
      <el-table-column prop="surplusDays" align="center" min-width="80" label="剩余失效(天)" />
      <el-table-column prop="totalDays" align="center" min-width="80" label="总效期(天)" />
      <el-table-column prop="surplusProportion" align="center" min-width="80" label="剩余效期占比" />
      <el-table-column prop="effectiveIntervalLabel" align="center" min-width="80" label="效期区间" />
      <el-table-column prop="depreciationReserveProportion" align="center" min-width="80" label="跌价准备比例" />
      <el-table-column prop="settlementPrice" align="center" min-width="80" label="单价" />
      <el-table-column prop="totalProvision" align="center" min-width="80" label="计提总额" />
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
      // 是否同步数据
      isSynchronization: false,
      // 查询数据
      searchProps: {
        reportMonth: '',
        depotId: '',
        goodsNo: '',
        depreciationReserveProportion: '',
        effectiveInterval: ''
      },
      // 表格数据
      tableData: {
        list: [{}],
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
    },
    /**
     * 根据年月获取当前月的第一天和最后一天
     * @param timeStr 传入的时间 yyyy-MM 格式
     */
    getMonthFirstLastDay(timeStr) {
      let year = timeStr.split('-')[0]
      let month = timeStr.split('-')[1]
      let firstDay = new Date(year, month - 1, 1)
      let lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0)
      return [
        this.$formatDate(firstDay, 'yyyy-MM-dd'),
        this.$formatDate(lastDay, 'yyyy-MM-dd')
      ]
    }
  }
}
</script>
