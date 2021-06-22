<template>
  <!-- 加价比例配置页面 -->
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
                         :data-list="getCustomerSelectBean('customer_list')"
                         filterable
                         clearable>
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
            <el-form-item label="配置类型：" prop="configType" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.configType"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('purchaseCommission_configTypeList')"
              >
                <el-option
                  v-for="item in selectOpt.purchaseCommission_configTypeList"
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
        <el-button type="primary" @click="showModal('add')">新增</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               @selection-change="selectionChange"
               @change="getList"
               showSeletion>
      <template slot="saleRebate" slot-scope="{row}">
        {{row.saleRebate * 100}}
      </template>
      <template slot="purchaseCommission" slot-scope="{row}">
        {{row.purchaseCommission * 100}}
      </template>
      <template slot="action" slot-scope="{row}" >
        <el-button type="text" @click="showModal('edit', row.id)">编辑</el-button>
        <el-button type="text" @click="deleteTableItem(row.id)">删除</el-button>
      </template>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 新增/编辑弹窗 -->
    <EditIncreaseRatioList v-if="increaseRatio.visible.show"
                           :showDialog.sync="increaseRatio.visible"
                           :title="increaseRatio.title"
                           :id="increaseRatio.id"
                           @comfirm="closeModal"
    ></EditIncreaseRatioList>
    <!-- 新增/编辑弹窗 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import {
  listPurchaseCommission,
  delPurchaseCommission
} from '@a/customerManage'
export default {
  mixins: [commomMix],
  components: {
    EditIncreaseRatioList: () => import('./components/EditIncreaseRatioList')
  },
  data() {
    return {
      // 查询数据
      searchProps: {
        customerId: '',
        supplierId: '',
        configType: ''
      },
      dialogTitle: '新增',
      // 表格列数据
      tableColumn: [
        { label: '客户名称', prop: 'customerName', minWidth: '120', align: 'center', hide: true },
        { label: '供应商名称', prop: 'supplierName', minWidth: '120', align: 'center', hide: true },
        { label: '配置类型', prop: 'configTypeLabel', minWidth: '120', align: 'center', hide: true },
        { label: '销售价回扣(%)', slotTo: 'saleRebate', minWidth: '120', align: 'center', hide: true },
        { label: '采购价佣金(%)', slotTo: 'purchaseCommission', minWidth: '120', align: 'center', hide: true },
        { label: '编辑时间', prop: 'modifyDate', width: '150', align: 'center', hide: true },
        { label: '操作', slotTo: 'action', width: '100', align: 'center' }
      ],
      increaseRatio: {
        visible: {
          show: false
        },
        title: '',
        id: ''
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
				const { data } = await listPurchaseCommission({
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
      if (type === 'edit') {
        this.increaseRatio.title = '编辑'
        this.increaseRatio.id = data + ''
      } else {
        this.increaseRatio.title = '新增'
        this.increaseRatio.id = ''
      }
      this.increaseRatio.visible.show = true
    },
    closeModal() {
      this.increaseRatio.visible.show = false
      this.increaseRatio.title = ''
      this.increaseRatio.id = ''
      this.getList()
    },
		// 删除数据项
    deleteTableItem(id) {
      this.$showToast('确定删除数据？', async() => {
        try {
          await delPurchaseCommission({ id })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
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
