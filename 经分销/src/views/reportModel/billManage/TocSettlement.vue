<template>
  <!-- To-C结算列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="平台名称：" prop="storePlatformCode" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.storePlatformCode"
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
            <el-form-item label="客户：" prop="customerId" class="search-panel-item fs-14 clr-II" >
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
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.buId"
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
            <el-form-item label="平台账单号：" prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.code" placeholder="请输入" clearable />
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
            <el-form-item label="账单状态：" prop="billStatus" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.billStatus"
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
        <el-button type="primary" @click="successMsg('success')">导出</el-button>
        <el-button type="primary" @click="successMsg('success')">删除</el-button>
        <el-button type="primary" @click="linkTo('/bill/tocsettlementadd')">新增</el-button>
        <el-button type="primary" @click="successMsg('success')">作废</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column align="center" min-width="80" label="平台结算单号">
        <template slot-scope="{row}">
          <div>{{row.code}}</div>
          <div>{{row.buName}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="运营类型">
        <template slot-scope="{row}">
          <div>{{row.shopTypeName}}</div>
          <div>{{row.customerName}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="平台" >
        <template slot-scope="{row}">
          <div>{{row.storePlatformName}}</div>
          <div>{{row.shopName}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="应收金额">
        <template slot-scope="{row}">
          {{`${row.settlementCurrency} ${row.receivablePrice}`}}
        </template>
      </el-table-column>
      <el-table-column prop="settlementDate" align="center" min-width="80" label="账单月份" />
      <el-table-column prop="billStatusLabel" align="center" min-width="80" label="账单状态" />
      <el-table-column align="center" min-width="150" label="创建人">
        <template slot-scope="{row}">
          <div>{{row.creater}}</div>
          <div>{{row.createDate}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="month" align="center" min-width="80" label="NC单据">
        <template slot-scope="{row}">
          <div>{{row.ncCode}}</div>
          <div>{{row.ncStatusLabel}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="month" align="center" min-width="80" label="凭证信息">
        <template slot-scope="{row}">
          <div>{{row.voucherName}}</div>
          <div>{{row.voucherStatusLabel}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100" label="操作" fixed="right">
        <template slot-scope="{row}">
          <el-button type="text">同步NC应收</el-button>
          <el-button type="text" @click="linkTo(`/bill/receivebilldetail/${row.id}`)">详情</el-button>
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
      // 是否同步数据
      isSynchronization: false,
      // 查询数据
      searchProps: {
        storePlatformCode: '',
        customerId: '',
        buId: '',
        code: '',
        month: '',
        billStatus: ''
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
  billStatus: '02',
  billStatusLabel: '待核销',
  buId: 9,
  buName: '品牌拓展事业部E',
  code: 'PTJS0000000121',
  costItemList: [],
  createDate: '2021-02-08 10:14:03',
  creater: '开发专用',
  createrId: 100262,
  customerId: 1000013,
  customerName: '第e仓',
  id: 121,
  merchantId: 1000031,
  merchantName: '健太',
  ncStatus: '10',
  ncStatusLabel: '未同步',
  receivablePrice: 60,
  settlementCurrency: 'HKD',
  settlementCurrencyLabel: '港币',
  settlementDate: '2021-02-08',
  shopTypeCode: '002',
  shopTypeName: '一件代发',
  storePlatformCode: '1000000310',
  storePlatformName: '天猫'
}]
</script>
