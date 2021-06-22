<template>
  <!-- 税率配置页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="SD类型：" prop="sdType" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.sdType" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary" @click="showModal(null)" v-permission="'saleSDList_add'">新增</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               showIndex
               @selection-change="selectionChange"
               @change="getList">
      <template slot="statusLabel" slot-scope="{row}">
        {{row.status === '1' ? '启用' : '禁用'}}
      </template>
      <template slot="action" slot-scope="{row}">
        <el-button type="text"
                   style="padding-left: 5px;"
                   @click="showModal(row)" v-permission="'saleSDList_edit'">编辑</el-button>
      </template>
    </JFX-table>
    <!-- 表格 end -->
    <!-- 销售sd类型 -->
    <SaleSDEdit v-if="saleSDEdit.visible.show"
                :targetData="targetData"
                :isVisible="saleSDEdit.visible"
                @close="getList"
    ></SaleSDEdit>
    <!-- 销售sd类型 end -->
  </div>
</template>
<script>
import { sdSaleTypeListDTOByPage } from '@a/rebateManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    // 销售sd类型
    SaleSDEdit: () => import('./components/SaleSDEdit')
  },
  data() {
    return {
      // 查询数据
      searchProps: {
        sdType: ''
      },
      // 表格列数据
      tableColumn: [
        { label: 'SD类型', prop: 'sdType', minWidth: '120', align: 'center', hide: true },
        { label: 'SD简称', prop: 'sdTypeName', minWidth: '120', align: 'center', hide: true },
        { label: '映射费项', prop: 'projectName', minWidth: '90', align: 'center', hide: true },
        { label: 'NC收支费项', prop: 'paymentSubjectName', width: '160', align: 'center', hide: true },
        { label: '创建时间', prop: 'createDate', width: '140', align: 'center', hide: true },
        { label: '创建人', prop: 'createName', width: '120', align: 'center', hide: true },
        { label: '状态', slotTo: 'statusLabel', width: '120', align: 'center', hide: true },
        { label: '操作', slotTo: 'action', width: '70', align: 'left' }
      ],
      // 核销组件状态
      saleSDEdit: {
        id: '',
        visible: { show: false }
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
				const { data } = await sdSaleTypeListDTOByPage({
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
          // await delTarffRate({ ids })
          console.log(ids)
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
    // 显示弹窗
    showModal(data = {}) {
      this.targetData = data || {}
      this.saleSDEdit.visible.show = true
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
