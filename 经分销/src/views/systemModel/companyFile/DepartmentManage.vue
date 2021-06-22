<template>
  <!-- 部门管理页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="部门编码：" prop="code" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="部门名称：" prop="name" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.name" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary"
                   v-permission="'companyfile_department_add'"
                   @click="showModal('add')">新增</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               @selection-change="selectionChange"
               @change="getList">
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
      <el-table-column prop="code"
                       align="center"
                       min-width="120"
                       label="部门编码"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="name"
                       align="center"
                       min-width="150"
                       label="部门名称"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="modifyDate"
                       align="center"
                       min-width="120"
                       label="最近编辑时间"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="modifiyName"
                       align="center"
                       min-width="120"
                       label="编辑人"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center"
                       width="100"
                       label="操作"
                       show-overflow-tooltip>
        <template slot-scope="{row}">
          <el-button type="text"
                     v-permission="'companyfile_department_edit'"
                     @click="showModal('edit', row)">编辑</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end -->
    <!-- 新建/编辑事业部 -->
    <AddDepartment v-if="addDepartment.visible.show"
                   :isVisible="addDepartment.visible"
                   :data="addDepartment.data"
                   :type="addDepartment.type"
                   :id="addDepartment.id"
                   @comfirm="closeModal"
    ></AddDepartment>
    <!-- 新建/编辑事业部 end -->
  </div>
</template>
<script>
import {
  listDepartmentInfo
} from '@a/companyFile'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    // 新建/编辑事业部
    AddDepartment: () => import('./components/AddDepartment')
  },
  data() {
    return {
      // 查询数据
      searchProps: {
        code: '',
        name: ''
      },
      // 新建/编辑事业部组件
      addDepartment: {
        id: '',
        data: {},
        type: '',
        visible: { show: false }
      }
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
				const { data } = await listDepartmentInfo({
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
    showModal(type, data) {
      if (data) {
        this.addDepartment.id = data.id || ''
        this.addDepartment.data = data || {}
      }
      this.addDepartment.type = type
      this.addDepartment.visible.show = true
    },
    closeModal() {
      this.addDepartment.id = ''
      this.addDepartment.type = ''
      this.addDepartment.visible.show = false
      this.getList()
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
