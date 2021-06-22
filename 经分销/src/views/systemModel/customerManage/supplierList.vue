<template>
  <!-- 供应商列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @search="getList(1)" @reset="resetSearchForm">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="供应商编码：" prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.code" clearable placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="供应商名称：" prop="name" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.name" clearable placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.source"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('customerInfo_statusList')"
              >
                <el-option
                  v-for="item in selectOpt.customerInfo_statusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="主数据ID：" prop="mainId" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.mainId" clearable placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="公司：" prop="merchantId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.merchantId"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectMerchantBean('merchantList')"
              >
                <el-option
                  v-for="item in selectOpt.merchantList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="数据来源：" prop="source" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.source"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('customerInfo_sourceList')"
              >
                <el-option
                  v-for="item in selectOpt.customerInfo_sourceList"
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
        <el-button type="primary" @click="linkTo('/customer/supplierEdit')">新增</el-button>
        <el-button type="primary" @click="deleteTableItem">删除</el-button>
        <el-button type="primary" @click="importFile">批量导入</el-button>
        <el-button type="primary" @click="exportList">批量导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               showSelection
               @selection-change="selectionChange"
               @change="getList">
      <template slot="action" slot-scope="{row}">
        <el-button type="text"
                   style="padding-left: 6px;"
                   @click="linkTo(`/customer/supplierdetail?id=${row.id}`, '供应商详情')">详情</el-button>
        <el-button type="text"
                   @click="linkTo(`/customer/supplieredit?id=${row.id}`, '供应商编辑')">编辑</el-button>
        <el-button type="text"
                   @click="handleAudit(row.id, '0')" v-if="row.status === '1'">禁用</el-button>
        <el-button type="text"
                   @click="handleAudit(row.id, '1')" v-else>启用</el-button>
        <el-button type="text"
                   @click="showModal(row.id)">合作公司</el-button>
      </template>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 关联公司组件 -->
    <RelatedCompany v-if="relatedCompany.visible.show"
                    :companyVisible="relatedCompany.visible"
                    :id="relatedCompany.id"
                    @comfirm="data => closeModal(data)"
    ></RelatedCompany>
    <!-- 关联公司组件 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import {
  listSupplier,
  delSupplier,
  modifyEnabledSupplier,
  exportSupplierUrl,
  importSupplierUrl,
  saveMerchantRel
} from '@a/customerManage'
export default {
  mixins: [commomMix],
  components: {
    RelatedCompany: () => import('./components/RelatedCompany')
  },
  data() {
    return {
      // 查询参数
      searchProps: {
        code: '',
        name: '',
        status: '',
        mainId: '',
        merchantId: '',
        source: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '供应商编码', prop: 'code', minWidth: '140', align: 'center', hide: true },
        { label: '供应商名称', prop: 'name', minWidth: '120', align: 'center', hide: true },
        { label: '主数据ID', prop: 'mainId', minWidth: '120', align: 'center', hide: true },
        { label: '合作公司', prop: 'merchantNameStr', minWidth: '120', align: 'center', hide: true },
        { label: '数据来源', prop: 'sourceLabel', width: '90', align: 'center', hide: true },
        { label: '采购币种', prop: 'currencyLabel', width: '90', align: 'center', hide: true },
        { label: '状态', prop: 'statusLabel', width: '90', align: 'center', hide: true },
        { label: '创建时间', prop: 'createDate', width: '150', align: 'center', hide: true },
        { label: '操作', slotTo: 'action', width: '120', align: 'left', fixed: 'right' }
      ],
      relatedCompany: {
        id: '',
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
				const { data: { list, total } } = await listSupplier({
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
    // 删除表格项
    deleteTableItem() {
      if (!this.tableChoseList.length) {
        this.$alertWarning('至少选择一条记录！')
        return false
      }
      this.$showToast('确定删除数据？', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await delSupplier({ ids })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 102 + '&url=' + importSupplierUrl)
    },
    // 导出
    exportList() {
      if (this.tableData.total < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      this.$exportFile(exportSupplierUrl, { ...this.searchProps })
    },
    // 启用/禁用
    handleAudit(id, status) {
      this.$showToast({ '0': '你确认要禁用吗?', '1': '你确认要启用吗?' }[status], async() => {
        try {
          await modifyEnabledSupplier({ id, status })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 显示选择关联公司弹窗
    showModal(data) {
      this.relatedCompany.visible.show = true
      this.relatedCompany.id = data + ''
    },
    // 关闭选择关联公司弹窗
    async closeModal(data) {
      if (data && data.length) {
        const merchantIds = data.map(item => item.id).toString()
        // 保存关联公司
        await saveMerchantRel({
          merchantIds,
          customerId: this.relatedCompany.id
        })
      }
      this.relatedCompany.visible.show = false
      this.relatedCompany.id = ''
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
