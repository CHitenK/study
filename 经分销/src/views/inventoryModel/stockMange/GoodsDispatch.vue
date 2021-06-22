<template>
  <!-- 商品收发明细页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @search="getList(1)" @reset="reset('searchForm')">
      <el-form :model="searchProps" ref="searchForm" >
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="公司：" prop="merchantName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.merchantName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="仓库：" prop="depotId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.depotId"
                placeholder="请选择"
                filterable
                clearable
                :data-list="getSelectList('adjustmentType_sourceList')"
              >
                <el-option
                  v-for="item in selectOpt.adjustmentType_sourceList"
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
                filterable
                clearable
                :data-list="getSelectList('adjustmentType_sourceList')"
              >
                <el-option
                  v-for="item in selectOpt.adjustmentType_sourceList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品货号：" prop="goodsNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.goodsNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item label="归属时间：" prop="date" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                v-model="searchProps.date"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="批次号：" prop="batchNo" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.batchNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="来源单据号：" prop="orderNo" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.orderNo"
                placeholder="请选择"
                filterable
                clearable
                :data-list="getSelectList('adjustmentType_sourceList')"
              >
                <el-option
                  v-for="item in selectOpt.adjustmentType_sourceList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="业务单据号：" prop="businessNo" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.businessNo"
                placeholder="请选择"
                filterable
                clearable
                :data-list="getSelectList('adjustmentType_sourceList')"
               >
                <el-option
                  v-for="item in selectOpt.adjustmentType_sourceList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事物类型：" prop="thingStatus" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.thingStatus"
                placeholder="请选择"
                filterable
                clearable
                :data-list="getSelectList('inventory_thingStatusList')"
              >
                <el-option
                  v-for="item in selectOpt.inventory_thingStatusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="条码：" prop="barcode" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.barcode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="标准条码：" prop="commbarcode" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.commbarcode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="订单范围：" prop="orderTimeRange" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.orderTimeRange"
                placeholder="请选择"
                filterable
                clearable
              >
                <el-option
                  v-for="item in orderScopeLabel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="操作类型：" prop="operateType" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.operateType"
                placeholder="请选择"
                filterable
                clearable
                :data-list="getSelectList('inventory_operateTypeList')"
              >
                <el-option
                  v-for="item in selectOpt.inventory_operateTypeList"
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
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24" >
        <el-button type="primary">导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="公司" />
      <el-table-column prop="depotName" align="center" min-width="120" label="仓库名称" />
      <el-table-column prop="buName" align="center" min-width="120" label="事业部" />
      <el-table-column prop="thingStatusLabel" align="center" min-width="80" label="事物类型" />
      <el-table-column prop="orderNo" align="center" min-width="150" label="来源单据号" />
      <el-table-column prop="businessNo" align="center" min-width="150" label="业务单据号" />
      <el-table-column prop="divergenceDate" align="center" min-width="150" label="变更日期" />
      <el-table-column prop="goodsNo" align="center" min-width="80" label="商品货号" />
      <el-table-column prop="barcode" align="center" min-width="150" label="条码" />
      <el-table-column prop="commbarcode" align="center" min-width="150" label="标准条码" />
      <el-table-column prop="goodsName" align="center" min-width="200" label="商品名称" show-overflow-tooltip />
      <el-table-column prop="batchNo" align="center" min-width="80" label="批次号" />
      <el-table-column prop="num" align="center" min-width="80" label="数量" />
      <el-table-column prop="unitLabel" align="center" min-width="80" label="单位" />
      <el-table-column prop="typeLabel" align="center" min-width="80" label="库存类型" />
      <el-table-column prop="isExpireLabel" align="center" min-width="80" label="是否过期" />
      <el-table-column prop="locationGoodsNo" align="center" min-width="80" label="库位货号" />
      <el-table-column prop="operateTypeLabel" align="center" min-width="80" label="操作类型" />
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 查询参数
      searchProps: {
        merchantName: '',
        depotId: '',
        buId: '',
        goodsNo: '',
        date: '',
        batchNo: '',
        orderNo: '',
        businessNo: '',
        thingStatus: '',
        barcode: '',
        commbarcode: '',
        orderTimeRange: '',
        operateType: ''
      },
      // 订单范围下拉列表数据
      orderScopeLabel: [
        { value: '1', label: '近12个月数据' },
        { value: '2', label: '12个月以前数据' }
      ]
    }
	},
	mounted() {
    this.getList()
	},
  methods: {
		// 拉取表格数据
		getList(pageNum) {
      const params = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.searchProps
      }
      console.log(params)
    }
  }
}
</script>
