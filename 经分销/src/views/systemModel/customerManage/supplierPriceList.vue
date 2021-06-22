<template>
  <!-- 供应商商品价目表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)" :showOpenBtn="false">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="供应商：" prop="supplierId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.supplierId"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSupplierSelectBean('supplier_list')"
              >
                <el-option
                  v-for="item in selectOpt.supplier_list"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="标准条码：" prop="commbarcode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.commbarcode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="状态：" prop="state" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.state"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('supplierMerchandisePrice_statusList')"
              >
                <el-option
                v-for="item in selectOpt.supplierMerchandisePrice_statusList"
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
        <el-button type="primary" @click="removeItem">删除</el-button>
        <el-button type="primary" @click="linkTo('/common/importfile')">批量导入</el-button>
        <el-button type="primary" @click="linkTo('/common/importfile')">审核</el-button>
        <el-button type="primary" @click="linkTo('/common/importfile')">导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               showSelection
               @selection-change="selectionChange"
               @change="getList">
    </JFX-table>
    <!-- <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="所属公司" />
      <el-table-column prop="customerCode" align="center" min-width="150" label="供应商编号" />
      <el-table-column prop="customerName" align="center" min-width="150" label="供应商名称" />
      <el-table-column prop="commbarcode" align="center" min-width="150" label="标准条码" />
      <el-table-column prop="goodsName" align="center" min-width="150" label="商品名称" />
      <el-table-column prop="brandName" align="center" min-width="150" label="品牌" />
      <el-table-column prop="spec" align="center" min-width="80" label="规格型号" />
      <el-table-column prop="currencyLabel" align="center" min-width="80" label="币种" />
      <el-table-column prop="supplyPrice" align="center" min-width="80" label="供货价" />
      <el-table-column prop="stateLabel" align="center" min-width="80" label="状态" />
      <el-table-column prop="effectiveDate" align="center" min-width="150" label="报价生效时间" />
      <el-table-column prop="expiryDate" align="center" min-width="150" label="报价失效时间" />
      <el-table-column prop="createName" align="center" min-width="80" label="创建人" />
      <el-table-column prop="createDate" align="center" min-width="150" label="创建时间" />
      <el-table-column prop="auditName" align="center" min-width="120" label="审核人" />
      <el-table-column prop="auditDate" align="center" min-width="150" label="审核时间" />
    </JFX-table> -->
    <!-- 表格 end-->
  </div>
</template>
<script>
import commomMix from '@m/index'
import { listSMPrice } from '@a/customerManage/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 查询数据
      searchProps: {
        customerId: '',
        commbarcode: '',
        state: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '所属公司', prop: 'merchantName', width: '120', align: 'center', hide: true },
        { label: '供应商编号', prop: 'customerCode', width: '120', align: 'center', hide: true },
        { label: '供应商名称', prop: 'customerName', width: '120', align: 'center', hide: true },
        { label: '标准条码', prop: 'commbarcode', width: '100', align: 'center', hide: true },
        { label: '商品名称', prop: 'goodsName', width: '100', align: 'center', hide: true },
        { label: '品牌', prop: 'brandName', width: '100', align: 'center', hide: true },
        { label: '规格型号', prop: 'spec', width: '100', align: 'center', hide: true },
        { label: '币种', prop: 'currencyLabel', width: '100', align: 'center', hide: true },
        { label: '供货价', prop: 'supplyPrice', width: '100', align: 'center', hide: true },
        { label: '状态', prop: 'stateLabel', width: '100', align: 'center', hide: true },
        { label: '报价生效时间', prop: 'effectiveDate', width: '100', align: 'center', hide: true },
        { label: '报价失效时间', prop: 'expiryDate', width: '100', align: 'center', hide: true },
        { label: '创建人', prop: 'createName', width: '100', align: 'center', hide: true },
        { label: '创建时间', prop: 'createDate', width: '100', align: 'center', hide: true },
        { label: '审核人', prop: 'auditName', width: '100', align: 'center', hide: true },
        { label: '审核时间', prop: 'auditDate', width: '100', align: 'center', hide: true }
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
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data: { list, total } } = await listSMPrice({
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
