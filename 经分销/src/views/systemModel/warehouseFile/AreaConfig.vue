<template>
  <!-- 关区配置页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="关区代码：" prop="code" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="关区名称：" prop="name" class="search-panel-item fs-14 clr-II">
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
        <el-button type="primary" @click="visible.show = true" v-permission="'warehousefile_areaconfig_add'">新增</el-button>
        <el-button type="primary" @click="deleteTableItem" v-permission="'warehousefile_areaconfig_del'">删除</el-button>
        <el-button type="primary" @click="importFile" v-permission="'warehousefile_areaconfig_import'">导入</el-button>
        <el-button type="primary" @click="exportList" v-permission="'warehousefile_areaconfig_export'">导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table @change="getList"
               :tableData.sync="tableData"
               @selection-change="selectionChange">
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
      <el-table-column prop="code"
                       align="center"
                       min-width="120"
                       label="关区代码"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="name"
                       align="center"
                       min-width="120"
                       label="平台关区"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="createDate"
                       align="center"
                       min-width="150"
                       label="创建时间"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="createName"
                       align="center"
                       min-width="120"
                       label="创建人"
                       show-overflow-tooltip
      ></el-table-column>
    </JFX-table>
    <!-- 表格 end -->
    <!-- 新增关区配置 -->
    <AddAreaConfig v-if="visible.show" :visible="visible" @comfirm="comfirm"/>
    <!-- 新增关区配置 end -->
  </div>
</template>
<script>
import {
  getCustomsAreaList,
  delCustomsArea,
  exportCustomsAreaUrl,
  importCustomsAreaUrl
} from '@a/warehouseFile'
import commomMix from '@m/index'
import AddAreaConfig from './components/AddAreaConfig'
export default {
  mixins: [commomMix],
  components: {
    AddAreaConfig
  },
  data() {
    return {
      // 查询数据
      searchProps: {
        code: '',
        name: ''
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
				const { data } = await getCustomsAreaList({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
        this.tableData.list = data.list
        this.tableData.total = data.total
			} catch (err) {
      }
      this.tableData.loading = false
    },
    // 删除表格项
    deleteTableItem() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      this.$showToast('确定删除数据？', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await delCustomsArea({ ids })
          this.$successMsg('操作成功')
          this.getList(1)
        } catch (error) {
          if (error.data) {
            return this.$errorMsg(error.data)
          }
          this.$errorMsg(error.message)
        }
      })
    },
    // 导出
    async exportList() {
      if (this.tableData.total < 1) {
        return this.$errorMsg('暂无数据可导出')
      }
      this.$exportFile(exportCustomsAreaUrl, {...this.searchProps})
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 152 + '&url=' + importCustomsAreaUrl)
    },
    comfirm() {
      this.visible.show = false
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
