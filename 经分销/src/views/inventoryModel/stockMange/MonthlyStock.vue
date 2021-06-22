<template>
  <!-- 月库存转结页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @search="getList(1)" @reset="reset('searchForm')">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="公司：" prop="merchantName" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.merchantName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="仓库：" prop="depotId" class="search-panel-item fs-14 clr-II">
              <el-select  v-model="searchProps.depotId"
                          placeholder="请选择"
                          filterable
                          clearable
                          :data-list="getSelectList('adjustmentType_sourceList')">
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
            <el-form-item label="结转月份：" prop="settlementMonth" class="search-panel-item fs-14 clr-II">
              <el-date-picker
                v-model="searchProps.settlementMonth"
                type="month"
                placeholder="请选择"
                style="width: 203px"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="结转状态：" prop="state" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.state"
                placeholder="请选择"
                filterable
                clearable
                :data-list="getSelectList('monthlyAccount_stateList')"
              >
                <el-option
                  v-for="item in selectOpt.monthlyAccount_stateList"
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
      <el-col :span="24" >
        <el-button type="primary" @click="addMonthlyVisible.show=true">新增</el-button>
        <el-button type="primary" @click="exportList">导出</el-button>
        <el-button type="info" @click="refreshListItems">刷新月结账单</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" >
      <el-table-column
        type="selection"
        align="center"
        width="55"
      />
      <el-table-column
        prop="merchantName"
        align="center"
        min-width="80"
        label="公司名称"
      />
      <el-table-column
        prop="depotName"
        align="center"
        min-width="120"
        label="仓库名称"
      />
      <el-table-column
        prop="settlementMonth"
        align="center"
        min-width="120"
        label="结转月份"
      />
      <el-table-column
        prop="firstDate"
        align="center"
        min-width="120"
        label="期初时间"
      />
      <el-table-column
        prop="endDate"
        align="center"
        min-width="120"
        label="期末时间"
      />
      <el-table-column
        prop="settlementDate"
        align="center"
        min-width="120"
        label="结转时间"
      />
      <el-table-column
        prop="stateLabel"
        align="center"
        min-width="80"
        label="结转状态"
      />
      <el-table-column align="center" width="200" label="操作">
        <template slot-scope="{ row }">
          <el-button type="text" v-if="row.state === '1'" @click="settlement(row)">按计算库存量结转</el-button>
          <el-button type="text" v-else @click="setNotSettlement(row.id)">修改为未转结</el-button>
          <el-button type="text" @click="linkTo(`/stock/monthlystockdetail/${row.id}`)">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 新增月库存转结 -->
    <AddMonthlyStock v-if="addMonthlyVisible.show" :visible.sync="addMonthlyVisible" @comfirm="getList" />
    <!-- 新增月库存转结 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import AddMonthlyStock from './components/AddMonthlyStock'
export default {
  mixins: [commomMix],
  components: {
    AddMonthlyStock
  },
  data() {
    return {
      // 查询参数
      searchProps: {
        merchantName: '',
        depotId: '',
        settlementMonth: '',
        state: ''
      },
      addMonthlyVisible: { show: false }
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
    // 导出列表
    exportList() {
      if (!this.tableChoseList.length) {
        this.$alertWarning('请选择一条记录！')
      } else {
        this.$showToast('确定导出勾选的数据？', () => {
          console.log('exportList')
        })
      }
    },
    // 刷新月结账单
    refreshListItems() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('请选择需要刷新的记录！')
      }
      if (this.tableChoseList.find(item => item.state === '2')) {
        return this.$alertWarning('已结转的数据不能重新生成月结账单')
      }
      this.$showToast('确定刷新勾选的月结数据？', () => {
        console.log('refreshListItems')
      })
    },
    // 结转
    settlement({ id, state }) {
      if (state === '2') {
        return this.$errorMsg('该月份已结转')
      }
      console.log(id)
    },
    // 修改为未结转
    setNotSettlement(id) {
      console.log(id)
    }
  }
}
</script>
