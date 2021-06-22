<template>
  <!-- 销售出库差异分析表 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="销售订单编号：" prop="orderCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.orderCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="出库单号：" prop="saleOutDepotCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.saleOutDepotCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="订单完结时间：" prop="endDateStr" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                v-model="searchProps.endDateStr"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
                style="width: 203px;"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="是否完结：" prop="isEnd" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.isEnd"
                placeholder="请选择"
                clearable
                :data-list="getSelectList('saleAnalysis_isEndList')"
              >
                <el-option
                  v-for="item in selectOpt.saleAnalysis_isEndList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="货号：" prop="goodsNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.goodsNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="销售类型：" prop="saleType" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.saleType"
                placeholder="请选择"
                clearable
                :data-list="getSelectList('saleAnalysis_saleTypeList')"
              >
                <el-option
                  v-for="item in selectOpt.saleAnalysis_saleTypeList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.buId"
                placeholder="请选择"
                clearable
                :data-list="getBUSelectBean('BuList')"
              >
                <el-option
                  v-for="item in selectOpt.BuList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               class="mr-t-20"
               @selection-change="selectionChange"
               @change="getList" >
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
      <el-table-column prop="orderCode"
                       align="center"
                       label="销售订单编号"
                       width="140"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="buName"
                       align="center"
                       label="事业部"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="goodsNo"
                       align="center"
                       label="商品货号"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="goodsName"
                       align="center"
                       label="商品名称"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="saleOutDepotCode"
                       align="center"
                       label="出库清单编号"
                       width="140"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="saleNum"
                       align="center"
                       label="销售数量"
                       width="80"
      ></el-table-column>
      <el-table-column prop="outDepotNum"
                       align="center"
                       label="出库数量"
                       width="80"
      ></el-table-column>
      <el-table-column prop="surplus"
                       align="center"
                       label="结余"
                       width="60"
      ></el-table-column>
      <el-table-column prop="endDate"
                       align="center"
                       label="完结出库时间"
                       width="150"
      ></el-table-column>
      <el-table-column prop="tallyingUnitLabel"
                       align="center"
                       label="海外仓理货单位"
                       width="110"
      ></el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>

<script>
import commomMix from '@m/index'
import { getSaleAnalysisList } from '@a/salesManage/salesDifference.api'
export default {
  mixins: [commomMix],
  data() {
    return {
      searchProps: {
        orderCode: '',
        saleOutDepotCode: '',
        endDateStr: '',
        isEnd: '',
        goodsNo: '',
        saleType: '',
        buId: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取表格数据
		async getList(pageNum) {
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
				this.tableData.loading = true
				const { data } = await getSaleAnalysisList({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
				this.tableData.list = data.list
        this.tableData.total = data.total
			} catch (err) {
      }
      this.tableData.loading = false
		},
    // 重置搜索栏
    resetForm() {
      this.reset('searchForm', () => {
        this.getList(1)
      })
    }
  }
}
</script>
