<template>
  <!-- 批次库存明细页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @search="getList(1)" @reset="reset('searchForm')">
      <el-form ref="searchForm" :model="searchProps">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="公司：" prop="merchantName" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.merchantName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="仓库：" prop="depotId" class="search-panel-item fs-14 clr-II">
              <el-select  v-model="searchProps.depotId"
                          placeholder="请选择"
                          filterable
                          clearable
                          :data-list="getSelectBeanByMerchantRel('warehouseList')">
                <el-option
                  v-for="item in selectOpt.warehouseList"
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
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="批次：" prop="batchNo" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.batchNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="效期：" prop="validityType" class="search-panel-item fs-14 clr-II">
              <el-select  v-model="searchProps.validityType"
                          placeholder="请选择"
                          filterable
                          clearable>
                <el-option
                  v-for="item in validityLabel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="品牌：" prop="brandId" class="search-panel-item fs-14 clr-II">
              <el-select  v-model="searchProps.brandId"
                          placeholder="请选择"
                          filterable
                          clearable
                          :data-list="getBrandSelectBean('brandList')">
                <el-option
                  v-for="item in selectOpt.brandList"
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
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary" @click="handleExport">导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList">
      <el-table-column  type="selection"
                        align="center"
                        width="55">
      </el-table-column>
      <el-table-column  prop="merchantName"
                        align="center"
                        min-width="80"
                        label="公司">
      </el-table-column>
      <el-table-column  prop="depotName"
                        align="center"
                        min-width="120"
                        label="仓库名称">
      </el-table-column>
      <el-table-column  prop="goodsNo"
                        align="center"
                        min-width="100"
                        label="商品货号">
      </el-table-column>
      <el-table-column  prop="goodsName"
                        align="center"
                        min-width="150"
                        label="商品名称"
                        show-overflow-tooltip>
      </el-table-column>
      <el-table-column  prop="batchNo"
                        align="center"
                        min-width="80"
                        label="批次号">
      </el-table-column>
      <el-table-column  prop="productionDate"
                        align="center"
                        min-width="90"
                        label="生产日期">
      </el-table-column>
      <el-table-column  prop="overdueDate"
                        align="center"
                        min-width="90"
                        label="有效期至">
      </el-table-column>
      <el-table-column  prop="typeLabel"
                        align="center"
                        min-width="70"
                        label="库存类型">
      </el-table-column>
      <el-table-column  prop="isExpireLabel"
                        align="center"
                        min-width="70"
                        label="是否过期">
      </el-table-column>
      <el-table-column  prop="surplusNum"
                        align="center"
                        min-width="70"
                        label="库存余量">
      </el-table-column>
      <el-table-column  prop="unitLabel"
                        align="center"
                        min-width="70"
                        label="理货单位">
      </el-table-column>
      <el-table-column  prop="lpn"
                        align="center"
                        min-width="70"
                        label="托盘号">
      </el-table-column>
      <el-table-column  prop="barcode"
                        align="center"
                        min-width="120"
                        label="条码">
      </el-table-column>
      <el-table-column  prop="brandName"
                        align="center"
                        min-width="150"
                        label="品牌"
                        show-overflow-tooltip>
      </el-table-column>
      <el-table-column  prop="commbarcode"
                        align="center"
                        min-width="120"
                        label="标准条码">
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
        depotId: this.$route.query.depotName || '',
        goodsNo: this.$route.query.goodsNo || '',
        batchNo: '',
        validityType: '',
        brandId: '',
        barcode: ''
      },
      // 效期下拉列表数据
      validityLabel: [
        { value: '1', label: '低于1/3' },
        { value: '2', label: '高于1/3' },
        { value: '3', label: '低于1/2' },
        { value: '4', label: '高于1/2' },
        { value: '5', label: '低于2/3' },
        { value: '6', label: '高于2/3' },
        { value: '7', label: '过期' },
        { value: '8', label: '低于1/2+60' },
        { value: '9', label: '高于1/2+60' }
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
    },
    // 导出
    handleExport() {
      this.$showToast('确定导出筛选的数据？', () => {
        console.log(this.searchProps)
      })
    }
  }
}
</script>
