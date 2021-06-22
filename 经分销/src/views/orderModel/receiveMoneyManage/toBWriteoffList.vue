<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
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
              <el-select v-model="ruleForm.status" placeholder="请选择" clearable :data-list="getSelectList('tobTempReceiveBill_statusList')" >
                <el-option v-for="item in selectOpt.tobTempReceiveBill_statusList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="PO号：" prop="poNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="ruleForm.poNo" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="销售类型：" prop="saleType" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.saleType" placeholder="请选择" clearable :data-list="getSelectList('tobTempReceiveBill_saleTypeList')" >
                <el-option v-for="item in selectOpt.tobTempReceiveBill_saleTypeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
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
        <!-- <el-button type="primary" :size="'small'" @click="exportExcel('summary')">按客户汇总导出</el-button> -->
        <el-button type="primary" :size="'small'" @click="exportExcel('detail')" v-permission="'toBWriteoffList_detail_export'">暂估明细导出</el-button>
        <el-button type="primary" :size="'small'" @click="doneHeXiao" v1-permission="'toBWriteoffList_hexiao'" :loading="heXiaoLoading">完结核销</el-button>
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
      <el-table-column prop="typeLabel" label="上架日期" align="center" width="110">
        <template slot-scope="scope">
          {{scope.row.shelfDate ? scope.row.shelfDate.substring(0, 10) : ''}}
        </template>
      </el-table-column>
      <el-table-column prop="code" label="PO号" align="center" min-width="130">
         <template slot-scope="scope">
          {{scope.row.poNo}} <br/>{{scope.row.buName}}
        </template>
      </el-table-column>
      <el-table-column prop="customerName" label="客户名称" align="center" min-width="120" ></el-table-column>
      <el-table-column prop="saleTypeLabel" label="销售类型" align="center" width="110"></el-table-column>
      <el-table-column label="上架计提金额" align="center" min-width="130">
        <template slot-scope="scope">
          <span>应收: {{scope.row.shelfAmount ? scope.row.currency + ' ' + scope.row.shelfAmount : '0'}}</span>
          <br /><span>返利: {{scope.row.shelfRebateAmount ? scope.row.currency + ' ' + scope.row.shelfRebateAmount : '0'}}</span>
         </template>
      </el-table-column>
      <el-table-column label="已核销暂估金额" align="center" min-width="130">
        <template slot-scope="scope">
          <span>应收: {{scope.row.verifyAmount ? scope.row.currency + ' ' + scope.row.verifyAmount : '0'}}</span>
          <br /><span>返利: {{scope.row.verifyRebateAmount ? scope.row.currency + ' ' + scope.row.verifyRebateAmount : '0'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="typeLabel" label="未核销暂估金额" align="center" min-width="130">
        <template slot-scope="scope">
          <span>应收: {{scope.row.nonVerifyAmount ? scope.row.currency + ' ' + scope.row.nonVerifyAmount : '0'}}</span>
          <br /><span>返利: {{scope.row.nonVerifyRebateAmount ? scope.row.currency + ' ' + scope.row.nonVerifyRebateAmount : '0'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="statusLabel" label="结算状态" align="center" width="110"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="90">
        <template slot-scope="scope">
          <el-button type="text" @click="linkTo('/receivemoney/toBWriteoffDetail?id=' + scope.row.id )" v-permission="'toBWriteoffList_detail'">详情</el-button>
          <!-- <JFX-refresh-btn  @handleClick="refresh(scope.row)" :permission="'toBWriteoffList_refush'"></JFX-refresh-btn > -->
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { listToBTempBillVerify, flashTobTemporaryReceiveBill, exportToBTempDetailsUrl, getTempDetailsCount, endTobTemporaryReceiveBill } from '@a/receiveMoneyManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        buId: '',
        customerId: '',
        shelfMonth: '',
        status: '',
        poNo: '',
        saleType: ''
      },
      visible: { show: false },
      heXiaoLoading: false
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
				const res = await listToBTempBillVerify(opt)
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
      if (type === 'detail') { // 暂估明细导出
        const res = await getTempDetailsCount(opt)
        if (res.data && res.data.count > 15 * 10000) { // 统计数量的，跟电商订单一样不能超过15w
          this.$errorMsg('导出数据过大,请重新筛选数据后导出')
          return false
        }
        this.$exportFile(exportToBTempDetailsUrl, opt)
      }
      console.log(opt)
      // this.$exportFile(exportToBTempTrackUrl, opt)
    },
    // 刷新
    async refresh(row) {
      this.tableData.loading = true
      try {
        await flashTobTemporaryReceiveBill({ id: row.id })
        this.$successMsg('数据正在更新中,请稍后刷新列表', () => {
          this.getList()
        })
      } catch (error) {
        console.log(error)
      }
      this.tableData.loading = false
    },
    // 完结核销
    async doneHeXiao() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      this.heXiaoLoading = true
      try {
        const ids = this.tableChoseList.map(item => item.id).toString()
        await endTobTemporaryReceiveBill({ ids })
        this.$successMsg('操作成功')
        this.getList()
      } catch (error) {
      }
      this.heXiaoLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
