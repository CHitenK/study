<template>
  <!-- 领料出库列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="领料单号：" prop="materialOrderCode" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.materialOrderCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="出仓仓库 ：" prop="outDepotId" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.outDepotId"
                         placeholder="请选择"
                         clearable
                         filterable
                         :data-list="getSelectBeanByMerchantRel('warehouse_list')">
                <el-option
                  v-for="item in selectOpt.warehouse_list"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="领料出库单号：" prop="code" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.buId"
                         placeholder="请选择"
                         filterable
                         clearable
                         :data-list="getBUSelectBean('business_list')">
                <el-option
                  v-for="item in selectOpt.business_list"
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
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="PO号：" prop="poNo" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.poNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="单据状态：" prop="status" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.status"
                         placeholder="请选择"
                         clearable
                         filterable
                         :data-list="getSelectList('materialOutDepot_statusList')">
                <el-option
                  v-for="item in selectOpt.materialOutDepot_statusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date" label="发货时间：">
              <el-date-picker
                v-model="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary" v-permission="'sale_materialout_export'" @click="exportList">导出</el-button>
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
                       label="领料出库单号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="outDepotName"
                       align="center"
                       min-width="100"
                       label="出仓仓库"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="buName"
                       align="center"
                       min-width="100"
                       label="事业部"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="poNo"
                       align="center"
                       min-width="120"
                       label="PO单号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="customerName"
                       align="center"
                       min-width="120"
                       label="客户"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="materialOrderCode"
                       align="center"
                       min-width="120"
                       label="领料单号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="deliverDate"
                       align="center"
                       width="150"
                       label="发货时间"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="statusLabel"
                       align="center"
                       width="80"
                       label="单据状态"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="left"
                       width="80"
                       label="操作"
                       fixed="right">
        <template slot-scope="{row}">
          <el-button type="text"
                     v-permission="'sale_materialout_detail'"
                     @click="linkTo(`/sales/PickingOutDetail?id=${row.id}`)">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end -->
  </div>
</template>

<script>
import {
  listMaterialOut,
  getMaterialOutCount,
  exportMaterialOutDepotUrl
} from '@a/salesManage'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 发货时间
      date: [],
      // 查询数据
      searchProps: {
        materialOrderCode: '',
        outDepotId: '',
        code: '',
        buId: '',
        customerId: '',
        poNo: '',
        status: ''
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
      // 发货时间
      this.searchProps.deliverStartDate = this.date && this.date.length ? this.date[0] : ''
      this.searchProps.deliverEndDate = this.date && this.date.length ? this.date[1] : ''
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await listMaterialOut({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
				this.tableData.list = data.list
        this.tableData.total = data.total
			} catch (error) {
        this.$errorMsg(error.message)
      }
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
            this.$exportFile(exportMaterialOutDepotUrl, { ids })
          })
        } else {
          const { data } = await getMaterialOutCount({ ...this.searchProps })
          if (data > 10000) {
            return this.$errorMsg('导出的数量过大，请填写筛选条件再导出')
          }
          this.$exportFile(exportMaterialOutDepotUrl, { ...this.searchProps })
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 重置搜索表单
    resetSearchForm() {
      this.reset('searchForm', () => {
        this.date = []
        this.getList(1)
      })
    }
  }
}
</script>
