<template>
  <!-- 月结快照列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @search="getList(1)" @reset="reset('searchForm')">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
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
            <el-form-item label="商品货号：" prop="goodsNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.goodsNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="创建日期：" prop="createDateStr" class="search-panel-item fs-14 clr-II">
              <el-date-picker
                v-model="searchProps.createDateStr"
                type="month"
                placeholder="请选择"
                style="width: 203px"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="批次：" prop="batchNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.batchNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品条码：" prop="barcode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.barcode" placeholder="请输入" clearable />
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
      <el-table-column prop="merchantName" align="center" label="公司" />
      <el-table-column prop="depotName" align="center" label="仓库名称" />
      <el-table-column prop="goodsNo" align="center" label="商品货号" />
      <el-table-column prop="goodsName" align="center" label="商品名称" />
      <el-table-column prop="opgCode" align="center" label="OPG号" />
      <el-table-column prop="barcode" align="center" label="商品条码" />
      <el-table-column prop="batchNo" align="center" label="批次号" />
      <el-table-column prop="productionDate" align="center" label="生产日期" />
      <el-table-column prop="overdueDate" align="center" label="有效期至" />
      <el-table-column prop="qty" align="center" label="库存数量" />
      <el-table-column prop="realFrozenStockNum" align="center" label="冻结数量" />
      <el-table-column prop="lockStockNum" align="center" label="锁定数量" />
      <el-table-column prop="realStockNum" align="center" label="可用数量" />
      <el-table-column prop="stockTypeLabel" align="center" label="库存类型" />
      <el-table-column prop="unitLabel" align="center" label="理货单位" />
      <el-table-column prop="lpn" align="center" label="托盘号" />
      <el-table-column prop="createDate" align="center" label="创建日期" />
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
        depotId: '',
        goodsNo: '',
        createDateStr: '',
        batchNo: '',
        barcode: ''
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
      this.tableData.loading = true
      setTimeout(() => {
        this.tableData = {
          list: [],
          loading: false,
          pageNum: 1,
          total: 11,
          pageSize: 10
        }
      }, 500)
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
