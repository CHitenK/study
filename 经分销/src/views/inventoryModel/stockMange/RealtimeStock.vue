<template>
  <!-- 实时库存页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel :showOpenBtn="false" @search="getList(1)" @reset="reset('searchForm')">
      <el-form :model="searchProps" ref="searchForm" >
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="公司：" prop="merchantName" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.merchantName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="仓库：" prop="depotId" class="search-panel-item fs-14 clr-II">
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
            <el-form-item label="商品货号：" prop="goodsNo" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.goodsNo" placeholder="请输入" clearable />
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
      <el-table-column type="index" align="center" label="序号" width="55" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="公司名称" />
      <el-table-column prop="depotName" align="center" min-width="120" label="仓库名称" />
      <el-table-column prop="goodsNo" align="center" min-width="120" label="商品货号" />
      <el-table-column prop="goodsName" align="center" min-width="200" label="商品名称" show-overflow-tooltip />
      <el-table-column prop="opgCode" align="center" min-width="80" label="OPG号" />
      <el-table-column prop="productionDate" align="center" min-width="120" label="生产日期" />
      <el-table-column prop="overdueDate" align="center" min-width="120" label="失效日期" />
      <el-table-column prop="batchNo" align="center" min-width="200" label="批次号" show-overflow-tooltip />
      <el-table-column prop="qty" align="center" min-width="80" label="库存数量" />
      <el-table-column prop="realFrozenStockNum" align="center" min-width="80" label="冻结数量" />
      <el-table-column prop="lockStockNum" align="center" min-width="80" label="锁定数量" />
      <el-table-column prop="realStockNum" align="center" min-width="80" label="可用数量" />
      <el-table-column prop="overDays" align="center" min-width="80" label="临保天数" />
      <el-table-column prop="stockTypeLabel" align="center" min-width="80" label="库存类型" />
      <el-table-column prop="uomLabel" align="center" min-width="80" label="理货单位" />
      <el-table-column prop="lpn" align="center" min-width="80" label="托盘号" />
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
        goodsNo: ''
      }
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
