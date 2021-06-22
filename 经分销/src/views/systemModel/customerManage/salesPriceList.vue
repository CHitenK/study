<template>
<!-- 销售价格管理页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客户：" prop="customerId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.customerId" placeholder="请选择" clearable :data-list="getSelectList('adjustmentType_sourceList')" >
                <el-option v-for="item in selectOpt.adjustmentType_sourceList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="条形码：" prop="barcode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.barcode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品货号：" prop="goodsNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.goodsNo" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="品牌：" prop="brandId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.brandId" placeholder="请选择" clearable :data-list="getSelectList('adjustmentType_sourceList')" >
                <el-option v-for="item in selectOpt.adjustmentType_sourceList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品名称：" prop="goodsName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.goodsName" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24" >
        <el-button type="primary" @click="removeItem">删除</el-button>
        <el-button type="primary" @click="linkTo('/common/importfile')">批量导入</el-button>
        <el-button type="primary" @click="linkTo('/common/importfile')">提交</el-button>
        <el-button type="primary" @click="linkTo('/common/importfile')">审核</el-button>
        <el-button type="primary" @click="linkTo('/common/importfile')">导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="customerName" align="center" min-width="80" label="客户" />
      <el-table-column prop="barcode" align="center" min-width="120" label="条形码" />
      <el-table-column prop="goodsName" align="center" min-width="200" label="商品名称" show-overflow-tooltip />
      <el-table-column prop="goodsNo" align="center" min-width="120" label="商品货号" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="所属公司" />
      <el-table-column prop="spec" align="center" min-width="80" label="规格型号" />
      <el-table-column prop="currencyLabel" align="center" min-width="80" label="币种" />
      <el-table-column prop="salePrice" align="center" min-width="80" label="销售价格" />
      <el-table-column prop="effectiveDate" align="center" min-width="150" label="生效日期" />
      <el-table-column prop="expiryDate" align="center" min-width="150" label="失效日期" />
      <el-table-column align="center" width="160" label="操作" fixed="right" >
        <template slot-scope="{row}">
          <el-button type="text" @click="linkTo(`/customer/salespriceedit/${row.id}`, '销售价格管理编辑')">编辑</el-button>
          <el-button type="text" @click="linkTo(`/customer/salespricedetail/${row.id}`, '销售价格管理详情')">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import commomMix from '@m/index'
import {
  listCustomer
} from '@a/customerManage'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 查询数据
      searchProps: {
        customerId: '',
        barcode: '',
        goodsNo: '',
        brandId: '',
        goodsName: ''
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
				const { data: { list, total } } = await listCustomer({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
				this.tableData.list = list
        this.tableData.total = total
			} catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.tableData.loading = false
      }
    },
		// 删除数据项
    removeItem() {
      if (!this.tableChoseList.length) {
        this.$alertWarning('至少选择一条记录！')
      } else {
        this.$showToast('确定删除选中对象？', () => {
          console.log(1)
        })
      }
    }
  }
}
</script>
