<template>
  <!-- 平台商品品类页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客户名称：" prop="customerId" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.customerId"
                         placeholder="请选择"
                         filterable
                         clearable
                         :data-list="getCustomerSelectBean('customer_list')">
                <el-option
                  v-for="item in selectOpt.customer_list"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="品类名称：" prop="categoryName" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.categoryName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
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
            <el-form-item label="条形码：" prop="barcode" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.barcode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary" @click="importFile" v-permission="'brand_commoditycatege_import'">导入</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table ref="table"
               showSelection
               :tableData.sync="tableData"
               :tableColumn="tableColumn"
               @selection-change="selectionChange"
               @change="getList">
    </JFX-table>
    <!-- 表格 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  getPlatformGoodsCategoryList,
  importPlatformGoodsCategoryUrl
} from '@a/brandManage/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 查询数据
      searchProps: {
        customerId: '',
        categoryName: '',
        buId: '',
        barcode: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '事业部', prop: 'buName', minWidth: '120', align: 'center', hide: true },
        { label: '客户名称', prop: 'customerName', minWidth: '120', align: 'center', hide: true },
        { label: '标准条码', prop: 'commbarcode', minWidth: '120', align: 'center', hide: true },
        { label: '品类名称', prop: 'categoryName', minWidth: '120', align: 'center', hide: true },
        { label: '商品名称', prop: 'goodsName', minWidth: '120', align: 'center', hide: true },
        { label: '创建人', prop: 'createName', minWidth: '120', align: 'center', hide: true },
        { label: '创建时间', prop: 'createDate', width: '150', align: 'center', hide: true }
      ]
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
				const { data } = await getPlatformGoodsCategoryList({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
				this.tableData.list = data.list
        this.tableData.total = data.total
			} catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.tableData.loading = false
      }
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 159 + '&url=' + importPlatformGoodsCategoryUrl)
    },
    // 重置搜索表单
    resetSearchForm() {
      this.reset('searchForm', () => {
        this.getList(1)
      })
    }
  }
}
</script>
