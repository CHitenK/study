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
            <el-form-item  label="采购订单号："  prop="purchaseCodes" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.purchaseCodes" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="采购SD单号："  prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.code" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="单据类型：" prop="type" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.type" placeholder="请选择" clearable :data-list="getSelectList('purchaseSdOrder_typeList')" >
                <el-option v-for="item in selectOpt.purchaseSdOrder_typeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="PO号："  prop="poNos" class="search-panel-item fs-14 clr-II" >
              <el-input type="textarea" :rows="1" v-model="ruleForm.poNos" placeholder="多PO查询时，以&字符或换行隔开" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item label="入库时间：">
              <el-date-picker
                clearable
                v-model="date"
                type="daterange"
                value-format="yyyy-MM-dd"
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
    <el-row class="mr-t-20">
      <el-col :span="24" >
        <el-button type="primary" :size="'small'" v-permission="'purchaseSdOrder_amount_import'" @click="importFile" >导入调整SD</el-button>
        <el-button type="primary" :size="'small'" v-permission="'purchaseSdOrder_export'"  @click="exportExcel">导出</el-button>
        <el-button type="primary" :size="'small'" v-permission="'purchaseSdOrder_del'"  @click="dele">删除</el-button>
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
      <el-table-column prop="code" label="采购SD单号" align="center"></el-table-column>
      <el-table-column prop="typeLabel" label="单据类型" align="center"></el-table-column>
      <el-table-column prop="" label="关联单号" align="center">
        <template slot-scope="scope">
           <div  v-html="filterPurchaseCode(scope.row)"></div>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="数量" align="center"></el-table-column>
      <el-table-column prop="contractNo" label="金额" align="center">
        <template slot-scope="scope">
           <div v-html="filterAmount(scope.row)"></div>
        </template>
      </el-table-column>
      <el-table-column prop="sdTypeName" label="SD类型" align="center"></el-table-column>
      <el-table-column prop="stateLabel" label="SD金额" align="center">
        <template slot-scope="scope">
           <div v-html="filterSdAmount(scope.row)"></div>
        </template>
      </el-table-column>
      <el-table-column prop="inboundDate" label="出入库时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="90">
        <template slot-scope="scope">
          <el-button type="text"  v-permission="'purchaseSdOrder_edit'" @click="openEdit(scope.row)">编辑</el-button>
          <el-button type="text" v-permission="'purchaseSdOrder_detail'" @click="linkTo('/purchase/SDdetail?id=' + scope.row.id )">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <edit v-if="visible.show" :visible="visible" :filterData="filterData" @comfirm="getList"></edit>
  </div>
</template>
<script>
import { purchaseSdOrderList, exportOrderUrl, delSdOrder, purchaseSdOrderImportOrderUrl } from '@a/purchaseManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    edit: () => import('./components/SDEdit')
  },
  data() {
    return {
      ruleForm: {
        purchaseCodes: '',
        code: '',
        poNos: '',
        type: '',
        inboundStartDateStr: '',
        inboundEndDateStr: ''
      },
      date: '',
      filterData: {},
      visible: { show: false }
    }
  },
	mounted() {
		this.getList()
	},
  methods: {
		async getList(pageNum) {
      try {
        this.tableData.loading = true
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.ruleForm.inboundStartDateStr = this.date && this.date.length > 0 ? this.date[0] + ' 00:00:00' : ''
        this.ruleForm.inboundEndDateStr = this.date && this.date.length > 0 ? this.date[1] + ' 23:59:59' : ''
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await purchaseSdOrderList(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
		dele() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
			this.$confirm('确定删除选中对象?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
				const ids = this.tableChoseList.map(item => item.id).toString()
        await delSdOrder({ ids })
        this.$successMsg('删除成功')
        this.getList()
			})
    },
    resetForm() {
      this.date = ''
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    filterPurchaseCode(row) {
      let html = row.purchaseCode ? row.purchaseCode : ''
      if (row.poNo) {
        html += ('<br />' + 'PO: ' + row.poNo)
      }
      return html
    },
    filterAmount(row) {
      let currency = ''
      let amount = ''
      if (row.amount) {
        amount = row.amount
        currency = row.currency ? row.currency : ''
      }
      let html = currency + ' '
      html += amount
      return html
    },
    filterSdAmount(row) {
      let currency = ''
      let sdAmount = ''
      if (row.sdAmount) {
        sdAmount = row.sdAmount
        currency = row.currency ? row.currency : ''
      }
      let html = currency + ' '
      html += sdAmount
      return html
    },
    // 导出
    exportExcel() {
      if (this.tableData.total < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      let poNos = this.ruleForm.poNos
      if (poNos && poNos.includes('&')) {
        poNos = encodeURIComponent(poNos) // 编码
      }
      var opt = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.ruleForm,
        poNos
      }
      if (this.tableChoseList.length > 0) {
        const ids = this.tableChoseList.map(item => item.id).toString()
        opt = { ids }
      }
      this.$exportFile(exportOrderUrl, opt)
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?breadcrumb=采购SD列表,调整SD导入&templateId=' + 150 + '&url=' + purchaseSdOrderImportOrderUrl)
    },
    // 编辑
    openEdit(row) {
      this.filterData = { id: row.id }
      this.visible.show = true
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
