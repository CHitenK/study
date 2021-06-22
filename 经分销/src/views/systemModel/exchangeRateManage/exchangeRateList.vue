<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="兑换币种：" prop="origCurrencyCode" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.origCurrencyCode" filterable placeholder="请选择" clearable :data-list="getSelectList('currencyCodeList')" >
                <el-option v-for="item in selectOpt.currencyCodeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
              兑
              <el-select v-model="ruleForm.tgtCurrencyCode" filterable placeholder="请选择" clearable :data-list="getSelectList('currencyCodeList')" >
                <el-option v-for="item in selectOpt.currencyCodeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="数据来源：" prop="dataSource" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.dataSource" placeholder="请选择" clearable :data-list="getSelectList('exchangeRate_dataSourceList')" >
                <el-option v-for="item in selectOpt.exchangeRate_dataSourceList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="汇率日期：" prop="dataSource" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                clearable
                v-model="ruleForm.effectiveDateStr"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择">
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
        <el-button type="primary" :size="'small'" v-permission="'rate_toAddPage'" @click="linkTo('/exchangeRate/exchangeRateEdit/add')" >新增</el-button>
        <el-button type="primary" :size="'small'" v-permission="'rate_export'" @click="exportExcel" >导出</el-button>
        <el-button type="primary" :size="'small'" v-permission="'rate_delRate'" @click="dele">删除</el-button>
        <el-button type="primary" :size="'small'" v-permission="'rate_get'" @click="getCurrencyRates">获取汇率</el-button>
        <input type="hidden" placeholder="请输入日期，格式yyyy-MM-dd" id="selectDate" />
        <input type="checkbox" style="display: none" id="isPeriod">
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
      <el-table-column type="selection" label="序号" align="center" width="50"></el-table-column>
      <el-table-column prop="origCurrencyName" label="原币" align="center"></el-table-column>
      <el-table-column prop="tgtCurrencyName" label="本币" align="center"></el-table-column>
      <el-table-column prop="rate" label="即期汇率" align="center">
        <template slot="header">
          <div>
            <span>即期汇率</span>
            <i class="el-icon-warning-outline clr-act fs-14 c-p" title="1外币兑换本位币"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="avgRate" label="平均汇率" align="center"></el-table-column>
      <el-table-column prop="effectiveDate" label="汇率日期" align="center">
        <template slot-scope="scope">{{scope.row.effectiveDate ? scope.row.effectiveDate.substring(0, 10) : ''}}</template>
      </el-table-column>
      <el-table-column prop="dataSourceLabel" label="数据来源" align="center"></el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="createName" label="创建人" align="center"></el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { listRate, exportRateUrl, delRate, getCurrencyRates } from '@a/exchangeRateManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        origCurrencyCode: '',
        tgtCurrencyCode: '',
        dataSource: '',
        effectiveDateStr: ''
      }
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
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				// 同步方法
				const res = await listRate(opt)
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
			this.$confirm('确定删除选中对象？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        await delRate({ ids })
				this.$successMsg('删除成功')
        this.getList()
			})
    },
    // 导出
    exportExcel() {
      if (this.tableData.total < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      const opt = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.ruleForm
      }
      this.$exportFile(exportRateUrl, opt)
    },
    // 获取汇率
    async getCurrencyRates() {
      const selectDate = document.getElementById('selectDate').value || ''
      const isPeriod = document.getElementById('isPeriod').checked || ''
      await getCurrencyRates({ selectDate, isPeriod })
      this.$successMsg('正在获取汇率信息，请稍后刷新列表', () => this.getList())
    },
    resetForm() {
      this.ruleForm.effectiveDateStr = ''
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.change-lve{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
