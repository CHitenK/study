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
            <el-form-item  label="商品编码：" prop="goodsCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.goodsCode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="品牌编码：" prop="superiorParentBrandId" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.superiorParentBrandId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="条形码：" prop="barcode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.barcode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.buId" placeholder="请选择" filterable clearable :data-list="getBUSelectBean('buList')">
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
        <el-button type="primary" :size="'small'" @click="exportExcel" v-permission="'supplierMerchandise_export'">导出</el-button>
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
      <el-table-column prop="goodsCode" label="商品编码" align="center" min-width="140"></el-table-column>
      <el-table-column prop="name" label="商品名称" align="center" min-width="110" show-overflow-tooltip></el-table-column>
      <el-table-column prop="brandName" label="品牌名称" align="center" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="brandCode" label="品牌编码" align="center" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="barcode" label="条形码" align="center" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsType" label="产品类型" align="center" min-width="100"></el-table-column>
      <el-table-column prop="salePrice" label="建议零售价" align="center" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="supplierGoodsNo" label="经销商货号" align="center" min-width="110" show-overflow-tooltip></el-table-column>
      <el-table-column prop="buName" label="事业部" align="center" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sourceLabel" label="数据来源" align="center" min-width="90" show-overflow-toolt></el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { listSupplierMerchandise, supplierMerchandiseExportUrl } from '@a/orealManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        goodsCode: '',
        brandCode: '',
        barcode: '',
        buId: ''
      }
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
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await listSupplierMerchandise(opt)
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
      this.$exportFile(supplierMerchandiseExportUrl, opt)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
