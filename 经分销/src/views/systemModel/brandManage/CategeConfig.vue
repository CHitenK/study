<template>
  <!-- 平台品类配置页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="品类名称：" prop="name" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.name" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
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
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary" v-permission="'brand_categeconfig_add'" @click="addCategeConfig.visible.show = true">新增</el-button>
        <el-button type="primary" v-permission="'brand_categeconfig_import'" @click="importFile">导入</el-button>
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
    <!-- 新增平台品类 -->
    <AddCategeConfig v-if="addCategeConfig.visible.show"
                     :isVisible="addCategeConfig.visible"
                     @comfirm="comfirm"/>
    <!-- 新增平台品类 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import AddCategeConfig from './components/AddCategeConfig'
import {
  getplatformCategoryList,
  importPlatformCategoryConfigUrl
} from '@a/brandManage/index'
export default {
  mixins: [commomMix],
  components: {
    AddCategeConfig
  },
  data() {
    return {
      // 查询数据
      searchProps: {
        name: '',
        customerId: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '客户名称', prop: 'customerName', minWidth: '120', align: 'center', hide: true },
        { label: '品类名称', prop: 'name', minWidth: '120', align: 'center', hide: true },
        { label: '备注', prop: 'remarks', minWidth: '120', align: 'center', hide: true },
        { label: '创建人', prop: 'createName', minWidth: '120', align: 'center', hide: true },
        { label: '创建时间', prop: 'createDate', minWidth: '150', align: 'center', hide: true }
      ],
      // 新增组件状态
      addCategeConfig: {
        visible: {
          show: false
        }
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
				const { data } = await getplatformCategoryList({
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
      this.linkTo('/common/importfile?templateId=' + 158 + '&url=' + importPlatformCategoryConfigUrl)
    },
    comfirm() {
      this.addCategeConfig.visible.show = false
      this.getList(1)
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
