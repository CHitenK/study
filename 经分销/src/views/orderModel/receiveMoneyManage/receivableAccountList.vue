<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <section>
      <!-- 搜索面板 -->
      <JFX-search-panel @reset="resetForm" @search="getList(1)">
        <el-form :model="ruleForm" ref="ruleForm">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
              <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.buId" placeholder="请选择" clearable filterable :data-list="getBUSelectBean('buList',  { merchantId: getUserInfo().merchantId })" >
                  <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
              <el-form-item label="客户：" prop="customerId" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.customerId" placeholder="请选择" clearable filterable :data-list="getCustomerByMerchantId('kuhuList', { cusType: 1, merchantId: getUserInfo().merchantId, begin: 0, pageSize: 10000 }, { 'key': 'id', 'value': 'name' })"  >
                  <el-option v-for="item in selectOpt.kuhuList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
              <el-form-item label="销售币种：" prop="currency" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.currency" placeholder="请选择" clearable filterable :data-list="getCurrencySelectBean('currencyList')" >
                  <el-option v-for="item in selectOpt.currencyList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
              <el-form-item label="渠道类型：" prop="channelType" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.channelType" placeholder="请选择" clearable :data-list="getSelectList('receiveAging_channelTypeList')" >
                  <el-option v-for="item in selectOpt.receiveAging_channelTypeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </JFX-search-panel>
      <!-- 搜索面板 end -->
      <!-- 操作 -->
      <el-row class="mr-t-20">
        <el-col :span="24" >
          <el-button type="primary" :size="'small'" @click="exportExcel" v-permission="'receivableAccountTab_export'">导出</el-button>
          <el-button type="primary" :size="'small'" @click="refresh" v-permission="'receivableAccountTab_refresh'">刷新</el-button>
          <el-button type="text" :size="'small'">{{reshDate}}</el-button>
        </el-col>
      </el-row>
      <div class="mr-t-20"></div>
      <!-- 操作 end -->
      <!-- 表格 -->
      <JFX-table
        :tableData.sync="tableData"
        @selection-change="selectionChange"
        @change="getList"
      >
        <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
        <el-table-column prop="buName" label="事业部" align="center" min-width="120" ></el-table-column>
        <el-table-column prop="rate" label="渠道类型" align="center" width="100" >
          <template slot-scope="scope">
            {{scope.row.channelTypeLabel}}
          </template>
        </el-table-column>
        <el-table-column prop="customerName" label="客户名称" align="center" width="120" ></el-table-column>
        <el-table-column prop="simpleName" label="客户简称" align="center" width="120" ></el-table-column>
        <el-table-column label="应收账面金额(原币)" align="center" min-width="130">
          <template slot-scope="scope">
            <span>{{scope.row.originalAmount ? scope.row.currency + ' ' + scope.row.originalAmount : '0'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rate" label="折算汇率" align="center" width="100" ></el-table-column>
        <el-table-column prop="typeLabel" label="汇率日期" align="center" width="100">
          <template slot-scope="scope">
            {{scope.row.effectiveDate ? scope.row.effectiveDate.substring(0, 10) : ''}}
          </template>
        </el-table-column>
        <el-table-column label="应收账面金额(RMB)" align="center" width="110">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.currency}}</span><br />
              <span>{{scope.row.rmbAmount || 0}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="0-30天" align="center" width="100">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.currency}}</span><br />
              <span>{{scope.row.thirtyAmount || 0}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="30-60天" align="center" min-width="100">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.currency}}</span><br />
              <span>{{scope.row.sixtyAmount || 0}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="60-90天" align="center" width="100">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.currency}}</span><br />
              <span>{{scope.row.ninetyAmount || 0}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="90-120天" align="center" width="100">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.currency}}</span><br />
              <span>{{scope.row.onetwentyAmount || 0}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="120天以上" align="center" width="100">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.currency}}</span><br />
              <span>{{scope.row.twentyAboveAmount || 0}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="accountDay" label="正常账期天数" align="center" min-width="90" >
          <template slot-scope="scope">{{scope.row.accountDay}}天</template>
        </el-table-column>
        <el-table-column label="账期内金额" align="center" width="100">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.currency}}</span><br />
              <span>{{scope.row.accountAmount || 0}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="逾期金额" align="center" width="100">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.currency}}</span><br />
              <span>{{scope.row.overdueAmount || 0}}</span>
            </div>
          </template>
        </el-table-column>
      </JFX-table>
      <!-- 表格 end-->
    </section>
  </div>
</template>
<script>
import { listReceiveAgingReport, refreshReceiveAgingReport, exportReceiveAgingReportUrl, getMaxRefreshDate } from '@a/receiveMoneyManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        buId: '',
        customerId: '',
        currency: '',
        channelType: ''
      },
      visible: { show: false },
      reshDate: ''
    }
  },
	mounted() {
		this.getList(1)
	},
  activated() {
    this.getList()
  },
  methods: {
		async getList(pageNum) {
      try {
        this.tableData.loading = true
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await listReceiveAgingReport(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
        this.getMaxRefreshDate()
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
    async getMaxRefreshDate() {
      const res = await getMaxRefreshDate()
      this.reshDate = res.data
    },
    resetForm() {
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    // 导出 type=detail 暂估明细导出 导出
    async exportExcel(type) {
      if (this.tableData.total < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      let opt = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.ruleForm
      }
      if (this.tableChoseList.length > 0) {
        const ids = this.tableChoseList.map(item => item.id).toString()
        opt = { ids }
      }
      this.$exportFile(exportReceiveAgingReportUrl, opt)
    },
    // 刷新
    async refresh() {
      this.tableData.loading = true
      try {
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
        await refreshReceiveAgingReport(opt)
        this.$successMsg('数据正在更新中,请稍后刷新列表', () => {
          this.getList()
        })
      } catch (error) {
        console.log(error)
      }
      this.tableData.loading = false
    }
  }
}
</script>
