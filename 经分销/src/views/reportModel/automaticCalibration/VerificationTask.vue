<template>
  <!-- 自动校验任务列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)">
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
            <el-form-item label="创建人：" prop="createName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.createName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="核对结果：" prop="checkResult" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.checkResult"
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
            <el-form-item label="处理状态：" prop="state" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.state"
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
            <el-form-item label="创建日期：" prop="createDate" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                v-model="searchProps.createDate"
                type="month"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="出仓仓库：" prop="outDepotId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.outDepotId"
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
            <el-form-item label="平台名称：" prop="storePlatformCode" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.storePlatformCode"
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
            <el-form-item label="店铺：" prop="shopCode" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.shopCode"
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
            <el-form-item label="任务编码：" prop="taskCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.taskCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item label="核对日期：" prop="date">
              <el-date-picker
                clearable
                v-model="searchProps.date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary" @click="linkTo('/automatic/addchecktask')">创建POP核对任务</el-button>
        <el-button type="primary" @click="linkTo('/common/importfile')">创建POP金额核对任务</el-button>
        <el-button type="primary" @click="linkTo('/automatic/addwarehousetask')">创建仓库核对任务</el-button>
        <el-button type="primary" @click="handleMarkup">标记</el-button>
        <el-button type="primary" @click="successMsg('success')">删除</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table ref="table" :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column type="selection" align="center" min-width="80" />
      <el-table-column prop="taskCode" align="center" min-width="80" label="任务编码" />
      <el-table-column prop="taskTypeLabel" align="center" min-width="80" label="任务类型" />
      <el-table-column prop="checkEndDate" align="center" min-width="80" label="核对日期" />
      <el-table-column prop="createName" align="center" min-width="80" label="创建人" />
      <el-table-column prop="createDate" align="center" min-width="80" label="创建时间" />
      <el-table-column prop="checkResultLabel" align="center" min-width="80" label="核对结果" />
      <el-table-column prop="stateLabel" align="center" min-width="80" label="处理状态" />
      <el-table-column align="center" min-width="80" label="操作" fixed="right">
        <template slot-scope="{row}">
          <el-button type="text" @click="successMsg('success')">导出</el-button>
          <el-button type="text" @click="handleExpand(row)">{{ row.show ? '收起' : '展开' }}</el-button>
        </template>
      </el-table-column>
      <el-table-column type="expand" width="1">
        <template slot-scope="{row}">
          <el-table :data="row.children" :border="false">
            <el-table-column prop="dataSourceLabel" align="center" label="数据源" />
            <el-table-column prop="outDepotName" align="center" label="核对仓库" />
            <el-table-column prop="storePlatformLabel" align="center" label="平台" />
            <el-table-column prop="shopName" align="center" label="店铺" />
            <el-table-column prop="remark" align="center" label="备注" />
          </el-table>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end -->
    <MarkCheckResults v-if="visible.show" :showDialog="visible" />
  </div>
</template>

<script>
import commomMix from '@m/index'
import MarkCheckResults from './components/MarkCheckResults'
export default {
  mixins: [commomMix],
  components: {
    MarkCheckResults
  },
  data() {
    return {
      // 查询数据
      searchProps: {
        taskType: '',
        createName: '',
        checkResult: '',
        state: '',
        createDate: '',
        outDepotId: '',
        storePlatformCode: '',
        shopCode: '',
        taskCode: '',
        date: []
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 拉取表格数据
		getList(pageNum) {
      this.searchProps.checkStartDate = this.searchProps.date[0]
      this.searchProps.checkEndDate = this.searchProps.date[1]
      delete this.searchProps.date
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
    },
    // 标记
    handleMarkup() {
      if (this.tableChoseList.length) {
        this.visible.show = true
      } else {
        this.$alertWarning('请选择一条记录！')
      }
    },
    // 点击展开表格行
    handleExpand(row) {
      this.$refs.table.$refs['el-table'].toggleRowExpansion(row)
      row.show = !row.show
      if (row.id) {
        row.children = [{
          checkEndDate: '2020-11-17 23:59:59.0',
          checkResult: '2',
          checkResultLabel: '未标记',
          checkStartDate: '2020-11-01 00:00:00.0',
          createDate: '2020-11-17 11:33:27',
          createName: '开发专用',
          creater: 100262,
          dataSource: '1',
          dataSourceLabel: 'GSS报表',
          id: 95,
          isMark: '0',
          isMarkLabel: '否',
          merchantId: 1000031,
          merchantName: '健太',
          modifyDate: '2020-11-17 11:34:08',
          outDepotCode: 'ERPWMS_360_0402',
          outDepotId: 11,
          outDepotName: '卓志南沙保税仓',
          pageSize: 10,
          sourcePath: '/data/derpfile/SJXY/HDRW00010000441/库存批量回滚导入模版.xlsx',
          state: '3',
          stateLabel: '已完成',
          storePath: '/data/derpfile/SJXY/HDRW00010000441/卓志保税仓核对结果表 .xlsx',
          taskCode: 'HDRW00010000441',
          taskType: '2',
          taskTypeLabel: '仓库流水核对'
        }]
      }
    }
  }
}
const fetchData = [{
  checkEndDate: '2020-11-17 23:59:59.0',
  checkResult: '2',
  checkResultLabel: '未标记',
  checkStartDate: '2020-11-01 00:00:00.0',
  createDate: '2020-11-17 11:33:27',
  createName: '开发专用',
  creater: 100262,
  dataSource: '1',
  dataSourceLabel: 'GSS报表',
  id: 95,
  isMark: '0',
  isMarkLabel: '否',
  merchantId: 1000031,
  merchantName: '健太',
  modifyDate: '2020-11-17 11:34:08',
  outDepotCode: 'ERPWMS_360_0402',
  outDepotId: 11,
  outDepotName: '卓志南沙保税仓',
  sourcePath: '/data/derpfile/SJXY/HDRW00010000441/库存批量回滚导入模版.xlsx',
  state: '3',
  stateLabel: '已完成',
  storePath: '/data/derpfile/SJXY/HDRW00010000441/卓志保税仓核对结果表 .xlsx',
  taskCode: 'HDRW00010000441',
  taskType: '2',
  taskTypeLabel: '仓库流水核对'
}]
</script>

<style lang="scss" scoped>
// 隐藏箭头
/deep/.el-table__expand-column .cell {
  display: none;
}
</style>
