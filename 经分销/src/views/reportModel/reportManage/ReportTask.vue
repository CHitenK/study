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
            <el-form-item label="任务类型：" prop="taskType" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.taskType"
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
            <el-form-item label="年月：" prop="ownMonth" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                v-model="searchProps.ownMonth"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column type="index" align="center" width="55" />
      <el-table-column prop="taskName" align="center" min-width="180" label="任务类型" show-overflow-tooltip />
      <el-table-column prop="ownMonth" align="center" min-width="80" label="归属月份" />
      <el-table-column prop="stateLabel" align="center" min-width="80" label="状态" />
      <el-table-column prop="remark" align="center" min-width="180" label="描述" show-overflow-tooltip />
      <el-table-column prop="username" align="center" min-width="80" label="操作员" />
      <el-table-column prop="createDate" align="center" min-width="150" label="创建时间" />
      <el-table-column prop="modifyDate" align="center" min-width="150" label="结束时间" />
      <el-table-column align="center" width="100" label="操作" fixed="right">
        <template>
          <el-button type="text">下载报表</el-button>
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
        taskType: '',
        ownMonth: ''
      },
      // 表格数据
      tableData: {
        list: [
          {
            begin: 0,
            createDate: '2021-02-03 10:19:19',
            id: 1826,
            merchantId: 1000031,
            modifyDate: '2021-02-03 10:20:07',
            ownMonth: '2021-01',
            pageNo: 1,
            pageSize: 10,
            param: `{'merchant_id':1000031,'own_month':'2021-01',,'buId':'10'}`,
            path: '/data/derpfile/SDSYBCWJXC/1000031/10/2021-01',
            remark: 'SD事业部财务进销存报表2021-01',
            state: '3',
            stateLabel: '已完成',
            taskName: 'SD事业部财务进销存汇总报表(元森泰事业部E)',
            taskType: 'SDSYBCWJXC',
            total: 0,
            username: '开发专用'
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
