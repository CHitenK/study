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
            <el-form-item label="标准条码：" prop="groupCommbarcode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.groupCommbarcode" placeholder="请输入" clearable />
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
            <el-form-item label="分类：" prop="typeId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.typeId"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getMerchandiseCatList('category_list', { level: 1 })"
              >
                <el-option
                  v-for="item in selectOpt.category_list"
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
  buFinanceAddSummaryList,
  buFinanceAddSummaryToPage,
  exportBuFinanceAddSummaryUrl
} from '@a/reportManage'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 查询数据
      searchProps: {
        buId: '',
        groupCommbarcode: '',
        goodsName: '',
        typeId: '',
        monthStart: '',
        monthEnd: ''
      },
      brandIdList: [],
      createDate: '',
      // 下单日期
      date: [],
      // 表格列数据
      tableColumn: [
        { label: '统计月份', prop: 'month', width: '140', align: 'center', hide: true },
        { label: '事业部', prop: 'buName', minWidth: '120', align: 'center', hide: true },
        { label: '品牌', prop: 'brandName', minWidth: '120', align: 'center', hide: true },
        { label: '分类', prop: 'typeName', minWidth: '100', align: 'center', hide: true },
        { label: '标准条码', prop: 'groupCommbarcode', width: '120', align: 'center', hide: true },
        { label: '商品名称', prop: 'goodsName', minWidth: '120', align: 'center', hide: true },
        { label: '累计采购入库数量', prop: 'warehouseNum', width: '120', align: 'center', hide: true },
        { label: '累计入库残损数量', prop: 'inDamagedNum', width: '120', align: 'center', hide: true },
        { label: '累计移库入', prop: 'moveInNum', width: '90', align: 'center', hide: true },
        { label: '累计采购结转数量', prop: 'purchaseEndNum', width: '120', align: 'center', hide: true },
        { label: '累计采购结转金额', prop: 'purchaseEndAmount', width: '120', align: 'center', hide: true },
        { label: '累计销售已上架数量', prop: 'saleShelfNum', width: '130', align: 'center', hide: true },
        { label: '累计出库残损数量', prop: 'outDamagedNum', width: '120', align: 'center', hide: true },
        { label: '累计移库出量', prop: 'moveOutNum', width: '120', align: 'center', hide: true },
        { label: '累计销售结转数量', prop: 'saleEndNum', width: '120', align: 'center', hide: true },
        { label: '累计销售结转金额', prop: 'saleEndAmount', width: '120', align: 'center', hide: true },
        { label: '累计销毁数量', prop: 'destroyNum', width: '120', align: 'center', hide: true },
        { label: '累计盘盈盘数量', prop: 'profitNum', width: '120', align: 'center', hide: true },
        { label: '累计盘盈亏数量', prop: 'lossNum', width: '120', align: 'center', hide: true },
        { label: '累计损益结转数量', prop: 'lossOverflowNum', width: '120', align: 'center', hide: true },
        { label: '累计损益结转金额', prop: 'lossOverflowAmount', width: '120', align: 'center', hide: true }
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
          const { data: { nowEnd, nowStart } } = await buFinanceAddSummaryToPage()
          this.searchProps.monthStart = nowStart
          this.searchProps.monthEnd = nowEnd
          this.date = [nowStart, nowEnd]
        }
        const brandIds = this.brandIdList.toString()
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data: { list, total, createDate } } = await buFinanceAddSummaryList({
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
      this.$exportFile(exportBuFinanceAddSummaryUrl, { ...this.searchProps })
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
