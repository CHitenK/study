<template>
  <!-- 平台费用单页面 -->
  <div>
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)" style="margin-top: 0px">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="费用单号：" prop="code" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="平台单号：" prop="billCode" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.billCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="创建时间：" prop="createDateStr" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                v-model="searchProps.createDateStr"
                type="month"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="费用项目：" prop="itemProjectName" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.itemProjectName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="费用类型：" prop="costType" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.costType"
                placeholder="请选择"
                clearable
                filterable
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
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客户：" prop="customerId" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.customerId"
                placeholder="请选择"
                clearable
                filterable
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
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="单据状态：" prop="status" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.status"
                placeholder="请选择"
                clearable
                filterable
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
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.buId"
                placeholder="请选择"
                clearable
                filterable
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
    <JFX-table ref="table" :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20">
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="code" align="center" min-width="150" label="费用单号" />
      <el-table-column prop="customerName" align="center" min-width="150" label="客户" show-overflow-tooltip />
      <el-table-column prop="billCode" align="center" min-width="150" label="平台账单号" show-overflow-tooltip />
      <el-table-column prop="itemProjectName" align="center" min-width="80" label="费用项目" />
      <el-table-column prop="buName" align="center" min-width="100" label="事业部" />
      <el-table-column prop="num" align="center" min-width="60" label="数量" />
      <el-table-column prop="currency" align="center" min-width="60" label="币种" />
      <el-table-column prop="amount" align="center" min-width="80" label="金额" />
      <el-table-column prop="costTypeLabel" align="center" min-width="80" label="费用类型" />
      <el-table-column prop="createDate" align="center" min-width="150" label="创建日期" />
      <el-table-column prop="statusLabel" align="center" min-width="80" label="单据状态" />
      <el-table-column align="center" width="120" label="操作" fixed="right">
        <template slot-scope="{row}">
          <el-button type="text" @click="linkTo(`/bill/feelistdetail/${row.id}`)">详情</el-button>
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
      searchProps: {
        code: '',
        billCode: '',
        createDateStr: '',
        itemProjectName: '',
        costType: '',
        customerId: '',
        status: '',
        buId: ''
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
  amount: -0.1564,
  billCode: 'SX-20201231-607997-P-016132',
  buName: '元森泰事业部E',
  code: 'FYD000000000660',
  confirmDate: '2021-01-08 18:25:29',
  confirmName: '系统生成',
  costType: '2',
  costTypeLabel: '扣款',
  createDate: '2021-01-08 18:25:29',
  currency: 'USD',
  currencyLabel: '美元',
  customerId: 1000006,
  customerName: '唯品会（中国）有限公司',
  id: 1000878,
  itemProjectId: 12,
  itemProjectName: '客退补贴',
  merchantId: 1000031,
  merchantName: '健太',
  num: -14,
  source: '1',
  sourceLabel: '爬虫账单',
  status: '2',
  statusLabel: '已确认'
}]
</script>
