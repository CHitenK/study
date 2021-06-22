<template>
  <!-- 应收账单页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客户：" prop="customerId" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.customerId"
                         placeholder="请选择"
                         :data-list="getCustomerSelectBean('customer_list')"
                         filterable
                         clearable>
                <el-option
                  v-for="item in selectOpt.customer_list"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="账单月份：" prop="billMonth" class="search-panel-item fs-14 clr-II">
              <el-date-picker
                v-model="searchProps.billMonth"
                type="month"
                placeholder="请选择"
                style="width: 203px"
                value-format="yyyy-MM"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.buId"
                         placeholder="请选择"
                         clearable
                         filterable
                         :data-list="getBUSelectBean('businessList')">
                <el-option
                  v-for="item in selectOpt.businessList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="开票状态：" prop="invoiceStatus" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.invoiceStatus"
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
            <el-form-item label="应收账单号：" prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="来源业务单：" prop="relCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.relCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="发票号码：" prop="invoiceNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.invoiceNo" placeholder="请输入" clearable />
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
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="NC应收状态：" prop="ncStatus" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.ncStatus"
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
        <el-button type="primary" @click="successMsg('success')">刷新</el-button>
        <el-button type="primary" @click="visible.show=true">新增</el-button>
        <el-button type="primary">删除</el-button>
        <el-button type="primary" @click="linkTo('/bill/receivebillinvoice')">开票</el-button>
        <el-button type="primary" @click="cancellationVisible.show = true">申请作废</el-button>
        <el-button type="primary" @click="successMsg('success')">导出PDF</el-button>
        <el-button type="primary" @click="successMsg('success')">导出Excel</el-button>
        <el-button type="primary" @click="successMsg('success')">更新凭证信息</el-button>
        <el-button type="primary" @click="linkTo('/bill/createreceivable')">创建应收</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column align="center" min-width="150" label="应收账单号">
        <template slot-scope="{row}">
          <div>{{row.code}}</div>
          <div>{{row.buName}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="customerName" align="center" min-width="150" label="客户" />
      <el-table-column prop="merchantName" align="center" min-width="150" label="关联单号">
        <template slot-scope="{row}">
          <div>{{`关联单号：${row.relCode}`}}</div>
          <div>{{`PO：${row.poNo}`}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="merchantName" align="center" min-width="80" label="应收金额">
        <template slot-scope="{row}">
          {{`${row.currency} ${row.receivablePrice}`}}
        </template>
      </el-table-column>
      <el-table-column prop="billStatusLabel" align="center" min-width="80" label="账单状态" />
      <el-table-column align="center" min-width="80" label="账单月份">
        <template slot-scope="{row}">
          {{row.billDate.slice(0, 7)}}
        </template>
      </el-table-column>
      <el-table-column prop="merchantName" align="center" min-width="120" label="发票信息">
        <template slot-scope="{row}">
          <div>{{row.invoiceNo}}</div>
          <div>{{row.invoiceDate.slice(0, 10)}}</div>
          <div>{{row.invoiceStatusLabel}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="ncStatusLabel" align="center" min-width="80" label="NC单据" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="凭证信息">
        <template slot-scope="{row}">
          <div>{{row.voucherName}}</div>
          <div>{{row.voucherStatusLabel}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="merchantName" align="center" min-width="150" label="创建人">
        <template slot-scope="{row}">
          <div>{{row.creater}}</div>
          <div>{{row.createDate}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="250" label="操作" fixed="right">
        <template slot-scope="{row}">
          <el-button type="text">编辑</el-button>
          <el-button type="text">审核</el-button>
          <el-button type="text" @click="writeOffVisible.show = true">核销</el-button>
          <el-button type="text" @click="synchronizeNcVisible.show = true">同步NC应收</el-button>
          <el-button type="text" @click="linkTo(`/bill/receivebilldetail/${row.id}`)">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 选择单据组件 -->
    <SelectDocument :isVisible="visible" v-if="visible.show" />
    <!-- 选择单据组件 end -->
    <!-- 申请作废组件 -->
    <Cancellation :isVisible="cancellationVisible" v-if="cancellationVisible.show" />
    <!-- 申请作废组件 end -->
    <!-- 核销组件 -->
    <WriteOff :isVisible="writeOffVisible" v-if="writeOffVisible.show" />
    <!-- 核销组件 end -->
    <!-- 同步NC应收组件 -->
    <SynchronizeNc :isVisible="synchronizeNcVisible" v-if="synchronizeNcVisible.show" />
    <!-- 同步NC应收组件 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    // 选择单据
    SelectDocument: () => import('./components/SelectDocument'),
    // 申请作废
    Cancellation: () => import('./components/Cancellation'),
    // 核销
    WriteOff: () => import('./components/WriteOff'),
    // 同步NC应收
    SynchronousNC: () => import('./components/SynchronousNC')
  },
  data() {
    return {
      // 是否同步数据
      isSynchronization: false,
      // 查询数据
      searchProps: {
        customerId: '',
        billMonth: '',
        buId: '',
        invoiceStatus: '',
        code: '',
        relCode: '',
        invoiceNo: '',
        billStatus: '',
        ncStatus: ''
      },
      cancellationVisible: { show: false },
      writeOffVisible: { show: false },
      synchronizeNcVisible: { show: false }
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
  billDate: '2021-02-02 18:25:19',
  billStatus: '02',
  billStatusLabel: '待核销',
  buId: 10,
  buName: '元森泰事业部E',
  code: 'YSZD00020001218',
  costItemList: [],
  createDate: '2021-02-02 18:25:36',
  creater: '测试专用',
  currency: 'CNY',
  currencyLabel: '人民币',
  customerId: 1000380,
  customerName: '主数据测试企业1232+JFX',
  id: 416,
  invoiceDate: '2021-02-02 18:26:44',
  invoiceId: 258,
  invoiceNo: 'QTOP21020018',
  invoicePath: '/data/derpfile/BILL/1000031/QTOP21020018应收账单发票.pdf',
  invoiceStatus: '01',
  invoiceStatusLabel: '待签章',
  ncStatus: '11',
  ncStatusLabel: '已同步',
  ncSynDate: '2021-02-03 09:40:38',
  orderList: [],
  orderType: '3',
  orderTypeLabel: '预售单',
  poNo: '2102021824',
  receivablePrice: 930,
  relCode: 'YSD000010000321',
  voucherStatusLabel: ''
}]
</script>
