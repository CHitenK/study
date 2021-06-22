<template>
<!-- 预申报单列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)" :showOpenBtn="false">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="采购订单编号："  prop="orderCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.orderCode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="入库单号："  prop="warehouseCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.warehouseCode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="是否完结：" prop="isEnd" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.isEnd" placeholder="请选择" clearable :data-list="getSelectList('purchaseAnalysis_isEndList')" >
                <el-option v-for="item in selectOpt.purchaseAnalysis_isEndList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.buId" placeholder="请选择" clearable :data-list="getBUSelectBean('buList')" >
                <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
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
        <el-button type="primary" :size="'small'" @click="exportExcel" id="cross_ex_btn" v-permission="'difference_exportAnalysis'" >导出</el-button>
      </el-col>
    </el-row>
    <div class="mr-t-20"></div>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table
      :tableData.sync="tableData"
      @change="getList"
    >
      <el-table-column type="index" label="序号" align="center" fixed="left" width="55"></el-table-column>
      <el-table-column prop="orderCode" label="采购订单编号" align="center" fixed="left" width="150"></el-table-column>
      <el-table-column prop="buName" label="事业部" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsNo" label="商品货号" align="center" width="140" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="warehouseCode" label="勾稽入库单号" align="center" width="140" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsNo" label="入库商品货号" align="center" width="140" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsName" label="入库商品名称" align="center" width="160" show-overflow-tooltip></el-table-column>
      <el-table-column prop="tallyingUnitLabel" label="海外仓理货单位" align="center" width="110" ></el-table-column>
      <el-table-column prop="warehouseNum" label="勾稽入库数量" align="center" width="100" ></el-table-column>
      <el-table-column prop="isGroupLabel" label="入库是否组合品" align="center" width="110" ></el-table-column>
      <el-table-column prop="batchNo" label="批次号" align="center" width="120" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="productionDate" label="生产日期" align="center" width="110" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="overdueDate" label="失效日期" align="center" width="110" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="relDate" label="勾稽关联时间" align="center" width="110" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="isEndLabel" label="是否完结入库" align="center" width="110" ></el-table-column>
      <el-table-column prop="endDate" label="完结入库时间" align="center"  width="110" show-overflow-tooltip ></el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { listDifference, exportAnalysisUrl } from '@a/purchaseManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        orderCode: '',
        warehouseCode: '',
        isEnd: '',
        buId: ''
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
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
        this.ruleForm.tallyingStartDate = this.date && this.date.length ? this.date[0] : ''
        this.ruleForm.tallyingEndDate = this.date && this.date.length ? this.date[1] : ''
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await listDifference(opt)
				this.tableData = {
					list: res.data.list,
					loading: false,
					pageNum: pageNum || res.data.pageNo,
					total: res.data.total,
					pageSize: res.data.pageSize
				}
			} catch (err) {
        this.tableData.loading = false
			}
		},
    exportExcel() {
      const opt = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.ruleForm
      }
      this.$exportFile(exportAnalysisUrl, opt)
    },
    resetForm() {
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
