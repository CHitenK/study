<template>
  <!-- 商品收发汇总页面 -->
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
            <el-form-item label="结算月份：" prop="currentMonth" class="search-panel-item fs-14 clr-II">
              <el-date-picker
                v-model="searchProps.currentMonth"
                type="month"
                placeholder="请选择"
                style="width: 203px"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品货号：" prop="goodsNo" class="search-panel-item fs-14 clr-II" >
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
        <el-button type="primary" @click="exportList('确定导出筛选的数据？')">导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList">
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="depotName" align="center" min-width="120" label="仓库名称" />
      <el-table-column prop="goodsNo" align="center" min-width="120"  label="商品货号" />
      <el-table-column prop="goodsName" align="center" min-width="200"  label="商品名称" show-overflow-tooltip />
      <el-table-column prop="openingInventoryNum" align="center" min-width="120"  label="本月期初库存" />
      <el-table-column prop="inDepotTotal" align="center" min-width="120"  label="本月累计入库" />
      <el-table-column prop="outDepotTotal" align="center" min-width="120"  label="本月累计出库" />
      <el-table-column prop="surplusNum" align="center" min-width="80"  label="库存余额" />
      <el-table-column prop="saleOnwayNum" align="center" min-width="120"  label="销售在途量" />
      <el-table-column prop="eOnwayNum" align="center" min-width="120"  label="电商在途量" />
      <el-table-column prop="transferOutNum" align="center" min-width="120"  label="调拨出库在途" />
      <el-table-column prop="availableNum" align="center" min-width="120"  label="可用库存量" />
      <el-table-column prop="unitLabel" align="center" min-width="80"  label="单位" />
      <el-table-column prop="turnoverDays" align="center" min-width="200"  label="库存周转天数(按120天订单算)" />
      <el-table-column prop="noSaleDate" align="center" min-width="200"  label="在库库存断销时间" />
      <el-table-column align="center" width="120"  label="操作">
        <template>
          <el-button type="text" @click="linkTo(`/stock/goodsstock?id=${123}`)">详情</el-button>
        </template>
      </el-table-column>
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
        currentMonth: '',
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
    },
    // 导出列表
    exportList(message) {
      this.$showToast(message, () => {
        console.log(1)
      })
    }
  }
}
</script>
