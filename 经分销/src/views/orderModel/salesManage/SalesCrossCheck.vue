<template>
  <!-- 预售勾稽列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="预售单号：" prop="preSaleOrderCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.preSaleOrderCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客户：" prop="customerId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.customerId"
                         placeholder="请选择"
                         clearable
                         filterable
                         :data-list="getCustomerSelectBean('customerList')">
                <el-option
                  v-for="item in selectOpt.customerList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.buId"
                         placeholder="请选择"
                         clearable
                         filterable
                         :data-list="getBUSelectBean('businessList')">
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
            <el-form-item label="出仓仓库：" prop="outDepotId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.outDepotId"
                         placeholder="请选择"
                         filterable
                         clearable
                         :data-list="getSelectBeanByMerchantRel('warehouseList')">
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
            <el-form-item label="商品货号：" prop="goodsNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.goodsNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品条码：" prop="barcode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.barcode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date" label="出库时间：">
              <el-date-picker
                v-model="date1"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date" label="审核时间：">
              <el-date-picker
                v-model="date2"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
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
        <el-button id="sale-export" type="primary" @click="exportList" v-permission="'preSaleOrderCorrelation_export'">导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
      <el-table-column prop="preSaleOrderCode"
                       align="center"
                       label="预售单号"
                       width="140"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="poNo"
                       align="center"
                       label="PO号"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="goodsNo"
                       align="center"
                       label="商品货号"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="barcode"
                       align="center"
                       label="商品条码"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="goodsName"
                       align="center"
                       label="商品名称"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="customerName"
                       align="center"
                       label="客户"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="buName"
                       align="center"
                       label="事业部"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="outDepotName"
                       align="center"
                       label="出仓仓库"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="preNum"
                       align="center"
                       label="预售数量"
                       width="80"
      ></el-table-column>
      <el-table-column prop="saleNum"
                       align="center"
                       label="销售数量"
                       width="80"
      ></el-table-column>
      <el-table-column prop="outNum"
                       align="center"
                       label="出库数量"
                       width="80"
      ></el-table-column>
      <el-table-column prop="stateLabel"
                       align="center"
                       label="预售余量"
                       width="80">
      <template slot-scope="{row}">
          {{row.preNum - row.outNum}}
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="操作"
                       width="60"
                       fixed="right">
        <template slot-scope="{row}">
          <el-button type="text"
                     v-permission="'preSaleOrderCorrelation_detail'"
                     @click="linkTo(`/sales/salescheckdetail?goodsNo=${row.goodsNo}&code=${row.preSaleOrderCode}`)">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  listPreSaleOrderCorrelation,
  exportPreSaleOrderCorrelationUrl
} from '@a/salesManage/salesCrossCheck.api'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 出库时间
      date1: [],
      // 审核时间
      date2: [],
      // 查询数据
      searchProps: {
        preSaleOrderCode: '',
        customerId: '',
        buId: '',
        outDepotId: '',
        goodsNo: '',
        barcode: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取表格数据
		async getList(pageNum) {
      // 退货出库时间
      this.searchProps.outDepotStartDate = this.date1 && this.date1.length ? this.date1[0] : ''
      this.searchProps.outDepotEndDate = this.date1 && this.date1.length ? this.date1[1] : ''
      // 审核时间
      this.searchProps.auditStartDate = this.date2 && this.date2.length ? this.date2[0] : ''
      this.searchProps.auditEndDate = this.date2 && this.date2.length ? this.date2[1] : ''
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await listPreSaleOrderCorrelation({
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
    // 导出
    async exportList() {
      if (this.tableData.total < 1) {
        return this.$errorMsg('暂无数据可导出')
      }
      try {
        if (this.tableChoseList.length) {
          this.$showToast('确定导出勾选数据？', async() => {
            const ids = this.tableChoseList.map(item => item.id).toString()
            this.$exportFile(exportPreSaleOrderCorrelationUrl, { ids })
          })
        } else {
          this.$exportFile(exportPreSaleOrderCorrelationUrl, { ...this.searchProps })
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 重置搜索表单
    resetSearchForm() {
      this.reset('searchForm', () => {
        this.date1 = []
        this.date2 = []
        this.getList(1)
      })
    }
  }
}
</script>
