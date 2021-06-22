<template>
  <!-- 库位调整单列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="库位调整单号：" prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="仓库：" prop="depotId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.depotId"
                placeholder="请选择"
                filterable
                clearable
                :data-list="getSelectBeanByMerchantRel('warehouseList')"
              >
                <el-option
                  v-for="item in selectOpt.warehouseList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.buId"
                placeholder="请选择"
                filterable
                clearable
                :data-list="getBUSelectBean('businessList')"
              >
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
            <el-form-item label="单据状态：" prop="type" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.type"
                placeholder="请选择"
                filterable
                clearable
                :data-list="getSelectList('inventoryLocationAdjustmentOrder_typeList')"
              >
                <el-option
                  v-for="item in selectOpt.inventoryLocationAdjustmentOrder_typeList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客户：" prop="customerId" class="search-panel-item fs-14 clr-II">
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
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary" @click="importFile" v-permission="'inventoryLocationAdjust_import'">导入</el-button>
        <el-button type="primary" @click="deleteTableItem" v-permission="'inventoryLocationAdjust_del'">删除</el-button>
        <el-button type="primary" @click="exportList" v-permission="'inventoryLocationAdjust_export'">导出</el-button>
        <el-button type="primary" @click="examineOrder" v-permission="'inventoryLocationAdjust_audit'">审核</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               @selection-change="selectionChange"
               @change="getList"
               class="mr-t-20">
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
      <el-table-column prop="code"
                       align="center"
                       label="库位调整单"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="typeLabel"
                       align="center"
                       label="单据类型"
                       width="100"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="depotName"
                       align="center"
                       label="仓库"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="buName"
                       align="center"
                       label="事业部"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="customerName"
                       align="center"
                       label="客户"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="ownDate"
                       align="center"
                       label="归属日期"
                       width="150"
      ></el-table-column>
      <el-table-column prop="createDate"
                       align="center"
                       label="创建日期"
                       width="150"
      ></el-table-column>
      <el-table-column prop="createName"
                       align="center"
                       label="创建人"
                       width="100"
      ></el-table-column>
      <el-table-column prop="stateLabel"
                       align="center"
                       label="状态"
                       width="80"
      ></el-table-column>
      <el-table-column label="操作"
                       align="left"
                       fixed="right"
                       width="60">
        <template slot-scope="{row}">
          <el-button type="text"
                     v-permission="'inventoryLocationAdjust_detail'"
                     @click="linkTo(`/sales/inventorylocationdetail?id=${row.id}`)">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  getInventoryLocationList,
  exportInventoryLocationUrl,
  getInventoryLocationCount,
  delInventoryLocationDetail,
  auditInventoryLocationDetail,
  importInventoryLocationUrl
} from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 查询数据
      searchProps: {
        code: '',
        depotId: '',
        buId: '',
        type: '',
        customerId: ''
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
				this.tableData.loading = true
				const { data } = await getInventoryLocationList({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
				this.tableData = {
					list: data.list,
					loading: false,
					pageNum: pageNum || data.pageNo,
					total: data.total,
					pageSize: data.pageSize
				}
			} catch (err) {}
      this.tableData.loading = false
		},
    // 导出
    async exportList() {
      if (this.tableData.total < 1) {
        return this.$errorMsg('暂无数据可导出')
      }
      try {
        if (this.tableChoseList.length) {
          this.$showToast('确定导出勾选数据？', async() => {
            const ids = this.tableChoseList.map(item => item.id).toString()
            this.$exportFile(exportInventoryLocationUrl, { ids })
          })
        } else {
          const { data } = await getInventoryLocationCount({ ...this.searchProps })
          if (data > 10000) {
            return this.$errorMsg('导出的数量过大，请填写筛选条件再导出')
          }
          this.$exportFile(exportInventoryLocationUrl, { ...this.searchProps })
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 审核
    examineOrder() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      this.$showToast('确定审核当前项？', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await auditInventoryLocationDetail({ ids })
          this.$successMsg('操作成功')
          this.getList(1)
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 删除表格项
    deleteTableItem() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      this.$showToast('确定删除数据？', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await delInventoryLocationDetail({ ids })
          this.$successMsg('操作成功')
          this.getList(1)
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 140 + '&url=' + importInventoryLocationUrl)
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
