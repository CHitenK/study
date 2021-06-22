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
            <el-form-item  label="订单编号："  prop="vordercode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.vordercode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.buId" placeholder="请选择" clearable :data-list="getBUSelectBean('buList')" >
                <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="CSR确认单号："  prop="vdef7" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.vdef7" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item label="订单日期：">
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
        <el-button type="primary" :size="'small'" @click="exportExcel" v-permission="'orealPurchaseOrder_export'">导出</el-button>
      </el-col>
    </el-row>
    <div class="mr-t-20"></div>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table
      :tableData.sync="tableData"
      @change="getList"
    >
      <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
      <el-table-column prop="vordercode" label="单号" align="center" min-width="140"></el-table-column>
      <el-table-column prop="vdef7" label="CSR号" align="center" min-width="110"></el-table-column>
      <el-table-column prop="dorderdate" label="订单日期" align="center" min-width="100">
        <template slot-scope="scope">{{scope.row.dorderdate ? scope.row.dorderdate.substring(0, 10) : ''}}</template>
      </el-table-column>
      <el-table-column prop="vdef1" label="品牌" align="center" min-width="100"></el-table-column>
      <el-table-column prop="custname" label="供应商" align="center" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="vdef13" label="类型" align="center" min-width="90"></el-table-column>
      <el-table-column prop="adress" label="收货地址" align="center" min-width="130" show-overflow-tooltip></el-table-column>
      <el-table-column prop="merchantName" label="公司" align="center" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="buName" label="事业部" align="center" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sourceLabel" label="数据来源" align="center" min-width="120" show-overflow-toolt></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="60">
        <template slot-scope="scope">
          <el-button type="text" @click="linkTo('/oreal/purchaseorderDetail?id=' + scope.row.id )" v-permission="'orealPurchaseOrder_details'">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { listByPage, orealPurchaseOrderExportUrl } from '@a/orealManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        buId: '',
        vordercode: '',
        vdef7: '',
        dorderdateStartDate: '',
        dorderdateEndDate: ''
      },
      date: ''
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
        this.ruleForm.dorderdateStartDate = this.date && this.date.length ? this.date[0] + ' 00:00:00' : ''
        this.ruleForm.dorderdateEndDate = this.date && this.date.length ? this.date[1] + ' 23:59:59' : ''
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await listByPage(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
		dele(row) {
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$successMsg('删除成功', () => {})
			}).catch(() => {
				this.$errorMsg('删除失败', () => {})
			})
    },
    resetForm() {
      this.date = ''
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    // 导出
    async exportExcel() {
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
      this.$exportFile(orealPurchaseOrderExportUrl, opt)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
