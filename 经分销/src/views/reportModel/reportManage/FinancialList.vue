<template>
  <!-- 财务进销存关账页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)" :showOpenBtn="false">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="归属月：" prop="month" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                v-model="searchProps.month"
                type="month"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="帐表状态：" prop="status" class="search-panel-item fs-14 clr-II" >
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
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.buId"
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
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column type="index" align="center" width="55" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="公司" />
      <el-table-column prop="month" align="center" min-width="80" label="事业部" />
      <el-table-column prop="month" align="center" min-width="80" label="归属月份" />
      <el-table-column align="center" min-width="80" label="期初时间">
        <template slot-scope="{row}">
          {{getMonthFirstLastDay(row.month)[0]}}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="期末时间">
        <template slot-scope="{row}">
          {{getMonthFirstLastDay(row.month)[1]}}
        </template>
      </el-table-column>
      <el-table-column prop="closeDate" align="center" min-width="80" label="关账时间" />
      <el-table-column prop="statusLabel" align="center" min-width="80" label="账表状态" />
      <el-table-column align="center" width="120" label="操作" fixed="right">
        <template slot-scope="{row}">
          <el-button type="text" @click="$showToast('确定关帐吗？')">关账</el-button>
          <el-button type="text" @click="linkTo(`/report/businessfinancial`)">详情</el-button>
        </template>
      </el-table-column>
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
        month: '',
        status: '',
        buId: ''
      },
      // 表格数据
      tableData: {
        list: [
          {
            buId: 16,
            buName: '万代事业部E',
            merchantId: 1000031,
            merchantName: '健太',
            month: '2021-01',
            pageSize: 10,
            status: '029',
            statusLabel: '未关账'
          }
        ],
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
