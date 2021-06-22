<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('ruleForm', () => getList(1))" @search="getList(1)" :showOpenBtn="false">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="原币种：" prop="origCurrencyCode" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.origCurrencyCode" filterable placeholder="请选择" clearable :data-list="getSelectList('currencyCodeList')" >
                <el-option v-for="item in selectOpt.currencyCodeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="本币种：" prop="tgtCurrencyCode" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.tgtCurrencyCode" filterable placeholder="请选择" clearable :data-list="getSelectList('currencyCodeList')" >
                <el-option v-for="item in selectOpt.currencyCodeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="数据来源：" prop="dataSource" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.dataSource" placeholder="请选择" clearable :data-list="getSelectList('exchangeRateConfig_dataSourceList')" >
                <el-option v-for="item in selectOpt.exchangeRateConfig_dataSourceList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
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
        <el-button type="primary" :size="'small'" @click="linkTo('/exchangeRate/setupEdit/add')" v-permission="'rateConfig_toAddPage'">新增</el-button>
        <el-button type="primary" :size="'small'" @click="exportExcel" v-permission="'rateConfig_export'">导出</el-button>
        <el-button type="primary" :size="'small'" @click="dele" v-permission="'rateConfig_del'">删除</el-button>
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
      <el-table-column prop="tgtCurrencyName" label="本币" align="center"></el-table-column>，，
      <el-table-column prop="dataSourceLabel" label="数据来源" align="center"></el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="createName" label="创建人" align="center"></el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { listRateConfig, delRateConfig, rateConfigExportUrl } from '@a/exchangeRateManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        origCurrencyCode: '',
        tgtCurrencyCode: '',
        dataSource: ''
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
				const res = await listRateConfig(opt)
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
        await delRateConfig({ ids })
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
      this.$exportFile(rateConfigExportUrl, opt)
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
