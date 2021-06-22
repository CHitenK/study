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
            <el-form-item  label="预申报单号："  prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.code" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="采购订单编号："  prop="purchaseCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.purchaseCode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.buId" placeholder="请选择" clearable filterable :data-list="getBUSelectBean('buList')" >
                <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="接口状态：" prop="state" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.state" placeholder="请选择" clearable :data-list="getSelectList('declareOrder_stateList')" >
                <el-option v-for="item in selectOpt.declareOrder_stateList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="入库仓库：" prop="depotId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.depotId" placeholder="请选择" clearable filterable :data-list="getSelectBeanByMerchantRel('cangkuList')" >
                <el-option v-for="item in selectOpt.cangkuList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="供应商：" prop="supplierId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.supplierId" placeholder="请选择" clearable filterable :data-list="getSupplierList('supplierList')" >
                <el-option v-for="item in selectOpt.supplierList" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item label="预计到港时间：">
              <el-date-picker
                clearable
                v-model="date"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20">
      <el-col :span="24" >
        <!-- <el-button type="primary" :size="'small'" @click="submitDeclareOrder" v-permission="'declare_submitDeclareOrder'" >提交</el-button> -->
        <el-button type="primary" :size="'small'" @click="cancelDeclare" v-permission="'declare_cancelDeclare'">删除</el-button>
        <el-button type="primary" :size="'small'" @click="exportExcel" v-permission="'declare_exportDeclare'">导出</el-button>
        <el-button type="primary" :size="'small'" @click="logisticsSisible.show=true" v-permission="'declare_submitDeclare_weihu'" >维护物流联系人</el-button>
      </el-col>
    </el-row>
    <div class="mr-t-20 mr-b-10">
      <el-radio-group v-model="ruleForm.status" :data-list="getSelectList('declareOrder_statusList')" @change="getList(1)" >
        <el-radio-button v-for="item in selectOpt.declareOrder_statusList" :key="item.key" :label="item.key">{{item.value}}({{totalObj[item.key] || 0}})</el-radio-button>
        <el-radio-button label="">全部({{total}})</el-radio-button>
      </el-radio-group>
    </div>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table
      :tableData.sync="tableData"
      @selection-change="selectionChange"
      @change="getList"
    >
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column prop="code" label="预申报单号" align="center" min-width="160"></el-table-column>
      <el-table-column prop="depotName" label="入库仓库" align="center" min-width="140" show-overflow-tooltip></el-table-column>
      <el-table-column prop="buName" label="事业部" align="center" min-width="140" show-overflow-tooltip></el-table-column>
      <el-table-column prop="supplierName" label="供应商" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="purchaseCode" label="采购订单号" align="center" min-width="200" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="arriveDate" label="预计到港时间" align="center" min-width="140" >
        <template slot-scope="{row}">
          {{row.arriveDate ? row.arriveDate.slice(0, 10) : ''}}
        </template>
      </el-table-column>
      <el-table-column prop="statusLabel" label="订单状态" align="center"  min-width="90" ></el-table-column>
      <el-table-column prop="stateLabel" label="接口状态" align="center"  min-width="90" ></el-table-column>
      <el-table-column label="操作" align="left" fixed="right" width="130">
        <template slot-scope="scope">
          <el-button type="text" @click="linkTo('/purchase/predeclarationEdit?id=' + scope.row.id )" v-if="['001', '002'].includes(scope.row.status)" v-permission="'declare_edit'">编辑</el-button>
          <el-button type="text" @click="linkTo('/purchase/predeclarationDetail?id=' + scope.row.id )" v-permission="'declare_detail'">详情</el-button>
          <el-button type="text" @click="openLog(scope.row)" v-permission="'declare_log'">日志</el-button>
          <!-- <el-button type="text" @click="linkTo('/purchase/editClearInfo?type=edit&id=' + scope.row.id, '编辑相关资料' )" v-permission="'declare_firstInfo'">编辑相关资料</el-button> -->
          <!-- <el-button type="text" @click="linkTo('/purchase/editClearInfo?type=detail&id=' + scope.row.id, '清关资料详情' )" v-permission="'declare_firstInfoDetail'">清关资料详情</el-button> -->
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 维护物流联系人 -->
    <logistics-contact v-if="logisticsSisible.show" :visible.sync="logisticsSisible"></logistics-contact>
    <!-- 维护物流联系人end -->
    <!-- 日志 -->
    <log-list v-if="logVisible.show" :visible.sync="logVisible" :filterData="filterData"></log-list>
    <!-- 日志 end-->
  </div>
</template>
<script>
import { listDeclare, submitDeclareOrder, cancelDeclare, exportDeclareUrl, getDeclareTypeNum } from '@a/purchaseManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    logisticsContact: () => import('./components/logisticsContact'),
    logList: () => import('@c/logList/index.vue')
  },
  data() {
    return {
      ruleForm: {
        code: '',
        depotId: '',
        buId: '',
        purchaseCode: '',
        status: '001',
        supplierId: '',
        arriveStartDate: '',
        arriveEndDate: '',
        state: ''
      },
      date: '',
      logisticsSisible: { show: false },
      layList: [],
      qinguanLoading: false,
      targetData: {},
      tabPosition: '',
      logVisible: { show: false },
      filterData: {},
      totalObj: {},
      total: 0
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
        this.ruleForm.arriveStartDate = this.date && this.date.length > 0 ? this.date[0] : ''
        this.ruleForm.arriveEndDate = this.date && this.date.length > 0 ? this.date[1] : ''
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await listDeclare(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {
			}
      this.tableData.loading = false
      this.getDeclareTypeNum()
		},
		submitDeclareOrder() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条数据！')
        return false
      }
      const uData = this.tableChoseList.find(item => item.status !== '001') || null
      if (uData) {
        this.$errorMsg(`${uData.code}的状态不为待审核`)
        return false
      }
			this.$confirm('确认提交选中数据?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        await submitDeclareOrder({ ids })
				this.$successMsg('提交成功')
        this.getList(1)
			})
    },
    cancelDeclare() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条数据！')
        return false
      }
      const uData = this.tableChoseList.find(item => item.status !== '001') || null
      if (uData) {
        this.$errorMsg(`${uData.code}的状态不为待审核`)
        return false
      }
			this.$confirm('确认取消选中数据?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        await cancelDeclare({ ids })
				this.$successMsg('操作成功')
        this.getList(1)
			})
    },
    resetForm() {
      this.reset('ruleForm', () => {
        this.date = ''
        this.ruleForm.status = '001'
        this.getList(1)
      })
    },
    // 导出
    exportExcel() {
      if (this.tableData.total < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      var opt = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.ruleForm
      }
      if (this.tableChoseList.length > 0) {
        const ids = this.tableChoseList.map(item => item.id).toString()
        opt = { ids }
      }
      this.$exportFile(exportDeclareUrl, opt)
    },
    // 打开日志
    openLog(row) {
      this.filterData = { relCode: row.code }
      this.logVisible.show = true
    },
    async getDeclareTypeNum() {
      const res = await getDeclareTypeNum({ ...this.ruleForm, status: '' })
      const list = res.data || []
      const obj = {}
      list.forEach(item => {
        if (item.status) obj[item.status] = item.num || 0
        if (item.total !== undefined) this.total = item.total || 0
      })
      this.totalObj = obj
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
