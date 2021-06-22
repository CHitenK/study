<template>
  <!-- 结算单列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="结算单号：" prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="仓库名称：" prop="depotId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.depotId"
                placeholder="请选择"
                clearable
                filterable
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
            <el-form-item label="结算对象：" prop="customerId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.customerId"
                placeholder="请选择"
                clearable
                filterable
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
            <el-form-item label="账单月份：" prop="month" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                v-model="searchProps.month"
                type="month"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="处理状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.status"
                placeholder="请选择"
                clearable
                filterable
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
            <el-form-item label="确认状态：" prop="confirmStatus" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.confirmStatus"
                placeholder="请选择"
                clearable
                filterable
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
        <el-button type="primary" @click="linkTo('/bill/settlementimport')">导入结账单</el-button>
        <el-button type="primary" @click="changeStatus('006')">删除</el-button>
        <el-button type="primary" @click="changeStatus('1')">刷新</el-button>
        <el-button type="primary" @click="changeStatus('4')">确认</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="公司" />
      <el-table-column prop="code" align="center" min-width="130" label="结算单号" />
      <el-table-column prop="depotName" align="center" min-width="80" label="仓库名称" />
      <el-table-column prop="customerName" align="center" min-width="150" label="结算对象" show-overflow-tooltip />
      <el-table-column prop="platformLabel" align="center" min-width="80" label="平台" />
      <el-table-column prop="settlementAccount" align="center" min-width="80" label="结算金额" />
      <el-table-column prop="currencyLabel" align="center" min-width="80" label="结算币种" />
      <el-table-column prop="month" align="center" min-width="80" label="账单月份" />
      <el-table-column prop="billDate" align="center" min-width="150" label="计费周期" show-overflow-tooltip />
      <el-table-column prop="createrName" align="center" min-width="80" label="创建人" />
      <el-table-column prop="createDate" align="center" min-width="150" label="创建时间" />
      <el-table-column prop="statusLabel" align="center" min-width="80" label="处理状态" />
      <el-table-column prop="confirmStatusLabel" align="center" min-width="80" label="确认状态" />
      <el-table-column align="center" width="120" label="操作" fixed="right">
        <template slot-scope="{row}">
          <el-button type="text" @click="handleExport(row.id)" v-if="row.status !== '3' && row.status !== '1'">导出</el-button>
          <el-button type="text" @click="linkTo(`/bill/statementdetail/${row.id}`)" v-if="row.status !== '3'">详情</el-button>
          <el-button type="text" @click="$alertError(row.errorMsg)" v-if="row.status === '3'">失败信息</el-button>
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
        code: '',
        depotId: '',
        customerId: '',
        month: '',
        status: '',
        confirmStatus: ''
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
    },
    // 改变表格项状态
    changeStatus(status) {
      const statusEnum = {
        '006': '确定删除?',
        '4': '对勾选的账单进行确认操作注确认后将不予刷新，请知悉！',
        '1': '确认刷新?'
      }
      if (this.tableChoseList.length) {
        this.$showToast(statusEnum[status], () => {
          console.log(status)
        })
      } else {
        this.$alertWarning('请选择一条记录！')
      }
    },
    // 导出表格项
    handleExport(id) {
      console.log(id)
    }
  }
}
const fetchData = [{
  billDate: '2020-11-01至2020-11-30',
  code: 'ZDJS00010000174',
  confirmStatusLabel: '未确认',
  createDate: '2020-11-30 17:05:05',
  creater: 100262,
  createrName: '开发专用',
  currency: 'CNY',
  currencyLabel: '人民币',
  customerId: 1000244,
  customerName: '广东卓志跨境电商供应链服务有限公司',
  errorMsg: 'sheet 一线进口清关费”表格第2行缺少字段业务单号',
  id: 92,
  merchantId: 1000031,
  merchantName: '健太',
  modifyDate: '2020-11-30 17:04:57',
  month: '2020-11',
  pageSize: 10,
  platformLabel: '',
  settlementAccount: 0,
  status: '2',
  statusLabel: '生成失败'
}]
</script>
