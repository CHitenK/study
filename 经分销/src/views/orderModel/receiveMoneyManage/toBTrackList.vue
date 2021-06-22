<template>
<!-- 预申报单列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客户：" prop="customerId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.customerId" placeholder="请选择" filterable clearable :data-list="getCustomerByMerchantId('kuhuList', { cusType: 1, merchantId: getUserInfo().merchantId, begin: 0, pageSize: 10000 }, { 'key': 'id', 'value': 'name' })"  >
                <el-option v-for="item in selectOpt.kuhuList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.buId" placeholder="请选择" clearable :data-list="getBUSelectBean('buList',  { merchantId: getUserInfo().merchantId })" >
                <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="上架月份：" prop="shelfMonth" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                v-model="ruleForm.shelfMonth"
                type="month"
                value-format="yyyy-MM"
                placeholder="请选择"
                style="width: 190px;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="应收结算状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.status" placeholder="请选择" clearable >
                <el-option v-for="item in selectOpt.tobTempReceiveBill_statusList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="PO号：" prop="poNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.poNo" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20">
      <el-col :span="24" >
        <el-button type="primary" :size="'small'" @click="exportExcel" v-permission="'toBTrackList_export'">导出</el-button>
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
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column label="PO号" align="center" min-width="150">
         <template slot-scope="scope">
           <span>{{scope.row.poNo}}</span>
           <br /><span>{{scope.row.buName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="shelfDate" label="上架日期" align="center" min-width="110">
        <template slot-scope="scope">
          {{scope.row.shelfDate ? scope.row.shelfDate.substring(0, 10) : ''}}
        </template>
      </el-table-column>
      <el-table-column prop="saleType" label="销售类型" align="center" min-width="90">
        <template slot-scope="scope">{{['', '购销-整批结算', '购销-实销实结'][scope.row.saleType]}}</template>
      </el-table-column>
      <el-table-column prop="customerName" label="客户名称" align="center" min-width="120" ></el-table-column>
      <el-table-column label="应收金额" align="center" min-width="90">
        <template slot-scope="scope">
           <span>{{scope.row.currency}}</span>
           <br /><span>{{scope.row.shelfAmount || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column label="出账单日期" align="center" min-width="130">
        <template slot-scope="scope">
          <span>计划: {{scope.row.outBillPlanDate ? scope.row.outBillPlanDate.substring(0, 10) : '- -'}}</span>
          <br /><span>实际: {{scope.row.outBillRealDate ? scope.row.outBillRealDate.substring(0, 10) : '- -'}}</span>
          <br /><span>{{scope.row.outBillWarn}}</span>
        </template>
      </el-table-column>
      <el-table-column label="账单确认日期" align="center" min-width="130">
        <template slot-scope="scope">
          <span>计划: {{scope.row.confirmPlanDate ? scope.row.confirmPlanDate.substring(0, 10) : '- -'}}</span>
          <br /><span>实际: {{scope.row.confirmRealDate ? scope.row.confirmRealDate.substring(0, 10) : '- -'}}</span>
          <br /><span>{{scope.row.confirmWarn}}</span>
        </template>
      </el-table-column>
      <el-table-column label="开票日期" align="center" min-width="120">
         <template slot-scope="scope">
          <span>计划: {{scope.row.invoicingPlanDate ? scope.row.invoicingPlanDate.substring(0, 10) : '- -'}}</span>
          <br /><span>实际: {{scope.row.invoicingRealDate ? scope.row.invoicingRealDate.substring(0, 10) : '- -'}}</span>
          <br /><span>{{scope.row.invoicingWarn}}</span>
         </template>
      </el-table-column>
      <el-table-column  label="回款日期" align="center" min-width="130">
         <template slot-scope="scope">
          <span>计划: {{scope.row.paymentPlanDate ? scope.row.paymentPlanDate.substring(0, 10) : '- -'}}</span>
          <br /><span>实际: {{scope.row.paymentRealDate ? scope.row.paymentRealDate.substring(0, 10) : '- -'}}</span>
          <br /><span>{{scope.row.paymentWarn}}</span>
         </template>
      </el-table-column>
      <el-table-column label="回款周期" align="center" min-width="130">
         <template slot-scope="scope">
          <span>计划: {{scope.row.paymentPlanPeriod || '- -'}}</span>
          <br /><span>实际: {{scope.row.paymentRealPeriod || '- -'}}</span>
          <br /><span>{{scope.row.paymentPeriodWarn}}</span>
         </template>
      </el-table-column>
      <el-table-column prop="status" label="应收结算状态" align="center" min-width="90">
        <template slot-scope="scope">
          <span v-if="selectOpt.tobTempReceiveBill_statusList">{{statusLabel(scope.row.status)}}</span>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { listToBTempBillTrack, exportToBTempTrackUrl } from '@a/receiveMoneyManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        customerId: '',
        status: '',
        buId: '',
        shelfMonth: '',
        poNo: ''
      },
      visible: { show: false }
    }
  },
	mounted() {
    // 先获取应收结算状态再请求数据
    this.getSelectList('tobTempReceiveBill_statusList', null, null, () => {
      this.getList(1)
    })
	},
  methods: {
    statusLabel(val) {
      const data = this.selectOpt.tobTempReceiveBill_statusList.find(item => item.key === val) || {}
      return data.value || ''
    },
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
				const res = await listToBTempBillTrack(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
    resetForm() {
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    // 导出
    exportExcel() {
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
      this.$exportFile(exportToBTempTrackUrl, opt)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
