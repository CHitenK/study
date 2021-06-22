<template>
  <!-- 事业部财务进销存页面 -->
  <div>
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)" style="margin-top: 0px">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.buId"
                         placeholder="请选择"
                         clearable
                         filterable
                         :data-list="getBUSelectBean('businessList')">
                <el-option
                  v-for="item in selectOpt.businessList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="标准条码：" prop="commbarcode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.commbarcode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品名称：" prop="goodsName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.goodsName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="品牌：" prop="brandId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="brandIdList"
                placeholder="请选择"
                clearable
                collapse-tags
                multiple
                filterable
                :data-list="getBrandParent('brand_list')"
              >
                <el-option
                  v-for="item in selectOpt.brand_list"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="供应商：" prop="supplierId" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.supplierId"
                         placeholder="请选择"
                         :data-list="getSupplierList('supplier_list')"
                         filterable
                         clearable>
                <el-option
                  v-for="item in selectOpt.supplier_list"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date" label="统计月份：">
              <el-date-picker
                clearable
                v-model="date"
                type="monthrange"
                value-format="yyyy-MM"
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
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary" @click="exportList">导出</el-button>
        <span class="time" v-if="createDate">生成时间：{{createDate}}</span>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               showIndex
               @selection-change="selectionChange"
               @change="getList">
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  buFinancePurchaseList,
  buFinancePurchaseToPage,
  exportBuFinancePurchaseUrl
} from '@a/reportManage'
export default {
  mixins: [commomMix],
  data() {
    return {
      brandIdList: [],
      searchProps: {
        buId: '',
        commbarcode: '',
        goodsName: '',
        supplierId: '',
        monthStart: '',
        monthEnd: ''
      },
      createDate: '',
      // 下单日期
      date: [],
      // 表格列数据
      tableColumn: [
        { label: '统计月份', prop: 'month', width: '140', align: 'center', hide: true },
        { label: '事业部', prop: 'buName', width: '120', align: 'center', hide: true },
        { label: '供应商', prop: 'supplierName', minWidth: '120', align: 'center', hide: true },
        { label: '母品牌', prop: 'superiorParentBrand', width: '100', align: 'center', hide: true },
        { label: '标准品牌', prop: 'brandName', width: '120', align: 'center', hide: true },
        { label: '标准条形码', prop: 'commbarcode', minWidth: '120', align: 'center', hide: true },
        { label: '商品名称', prop: 'goodsName', minWidth: '120', align: 'center', hide: true },
        { label: '采购币种', prop: 'orderCurrencyLabel', width: '120', align: 'center', hide: true },
        { label: '累计采购入库数量', prop: 'warehouseNum', width: '120', align: 'center', hide: true },
        { label: '累计采购入库金额', prop: 'warehouseAmount', width: '120', align: 'center', hide: true },
        { label: '累计采购金额（原币）', prop: 'orderAmount', width: '150', align: 'center', hide: true }
      ]
    }
  },
  activated() {
    this.getList()
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取表格数据
		async getList(pageNum) {
      try {
        if (this.date && this.date.length) {
          this.searchProps.monthStart = this.date[0]
          this.searchProps.monthEnd = this.date[1]
        } else {
          // 获取月份
          const { data: { nowEnd, nowStart } } = await buFinancePurchaseToPage()
          this.searchProps.monthStart = nowStart
          this.searchProps.monthEnd = nowEnd
          this.date = [nowStart, nowEnd]
        }
        const brandIds = this.brandIdList.toString()
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data: { list, total, createDate } } = await buFinancePurchaseList({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps,
          brandIds
        })
				this.tableData.list = list
        this.tableData.total = total
        this.createDate = createDate || ''
			} catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.tableData.loading = false
      }
    },
    // 导出
    async exportList() {
      if (this.tableData.list.length < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      this.$exportFile(exportBuFinancePurchaseUrl, { ...this.searchProps })
    },
    // 重置搜索表单
    resetSearchForm() {
      this.reset('searchForm', () => {
        this.date = []
        this.getList(1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.time {
  color: red;
  padding-left: 10px;
  margin-top: 4px;
  vertical-align: middle;
}
</style>
