<template>
  <!-- 待引入客商列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel class="mr-b-20" @search="getList(1)" @reset="resetForm">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="主数据客户ID：" prop="ccode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.ccode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客商名称：" prop="cname" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.cname" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客商简称：" prop="cshortname" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.cshortname" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="是否供应商：" prop="isSupplier" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.isSupplier"
                placeholder="请选择"
                filterable
                clearable
                :data-list="getSelectList('customerMainIsList')"
              >
                <el-option
                  v-for="item in selectOpt.customerMainIsList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="是否客户：" prop="isCustomer" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.isCustomer"
                placeholder="请选择"
                filterable
                clearable
                :data-list="getSelectList('customerMainIsList')"
              >
                <el-option
                  v-for="item in selectOpt.customerMainIsList"
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
               :tableColumn="tableColumn"
               showSelection
               @selection-change="selectionChange"
               @change="getList">
      <template slot="action" slot-scope="{row}">
        <el-button type="text"
                   style="padding-left: 6px;"
                   @click="linkTo(`/customer/introduceddetail?id=${row.id}`)">详情</el-button>
        <el-button v-if="row.isSupplier !== '1'"
                   type="text"
                   @click="$showToast('确认要设置为供应商？', () => linkTo(`/customer/supplieradd?mainId=${row.id}`))">设定为供应商</el-button>
        <el-button v-if="row.isCustomer !== '1'"
                   type="text"
                   @click="$showToast('确认要设置为客户？', () => linkTo(`/customer/customeradd?mainId=${row.id}`))">设定为客户</el-button>
      </template>
    </JFX-table>
    <!-- 表格 end -->
  </div>
</template>
<script>
import { getCustomerMainlist } from '@a/customerManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 查询参数
      searchProps: {
        ccode: '',
        cname: '',
        cshortname: '',
        isSupplier: '',
        isCustomer: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '主数据客户ID', prop: 'ccode', minWidth: '120', align: 'center', hide: true },
        { label: '客商名称', prop: 'cname', minWidth: '120', align: 'center', hide: true },
        { label: '客商简称', prop: 'cshortname', minWidth: '120', align: 'center', hide: true },
        { label: '是否供应商', prop: 'isSupplierLabel', minWidth: '100', align: 'center', hide: true },
        { label: '是否客户', prop: 'isCustomerLabel', minWidth: '100', align: 'center', hide: true },
        { label: '操作', slotTo: 'action', width: '110', align: 'left' }
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
				const { data: { list, total } } = await getCustomerMainlist({
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
    // 重置搜索栏
    resetForm() {
      this.reset('searchForm', () => {
        this.getList(1)
      })
    }
  }
}
</script>
