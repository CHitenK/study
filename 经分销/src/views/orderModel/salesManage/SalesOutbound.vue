<template>
  <!-- 销售出库明细 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="销售订单编号：" prop="saleOrderCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.saleOrderCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="出库清单号：" prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="唯品账单号：" prop="vipsBillNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.vipsBillNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="LBX单号：" prop="lbxNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.lbxNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客户：" prop="customerId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.customerId"
                placeholder="请选择"
                clearable
                :data-list="getCustomerSelectBean('customerList')"
              >
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
            <el-form-item label="出仓仓库：" prop="outDepotId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.outDepotId"
                placeholder="请选择"
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
            <el-form-item label="销售类型：" prop="saleType" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.saleType"
                placeholder="请选择"
                clearable
                :data-list="getSelectList('saleOutDepot_saleTypeList')"
              >
                <el-option
                  v-for="item in selectOpt.saleOutDepot_saleTypeList"
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
                clearable
                :data-list="getBUSelectBean('BuList')"
              >
                <el-option
                  v-for="item in selectOpt.BuList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品名称：" prop="goodsStr" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.goodsStr" placeholder="请输入商品名称/货号/条码" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button id="sale-export" type="primary" @click="exportExcel" v-permission="'saleOutDetails_exportSaleOutDepotDetails'">导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
      <el-table-column prop="code"
                       align="center"
                       label="销售出库单号"
                       width="130"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="saleOrderCode"
                       align="center"
                       label="销售订单号"
                       width="130"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="outDepotName"
                       align="center"
                       label="出库仓名称"
                       width="130"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="buName"
                       align="center"
                       label="事业部"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="vipsBillNo"
                       align="center"
                       label="唯品账单号"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="lbxNo"
                       align="center"
                       label="LBX单号"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="poNo"
                       align="center"
                       label="PO号"
                       width="130"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="customerName"
                       align="center"
                       label="客户名称"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="saleTypeLabel"
                       align="center"
                       label="销售类型"
                       width="110"
      ></el-table-column>
      <el-table-column prop="goodsNo"
                       align="center"
                       label="商品货号"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="goodsName"
                       align="center"
                       label="商品名称"
                       min-width="150"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="transferNum"
                       align="center"
                       label="出库数量"
                       width="100">
        <template slot-scope="{row}">
          {{row.transferNum + row.wornNum}}
        </template>
      </el-table-column>
      <el-table-column prop="saleNum"
                       align="center"
                       label="销售数量"
                       width="100"
      ></el-table-column>
      <el-table-column prop="tallyingUnitLabel"
                       align="center"
                       label="海外仓理货单位"
                       width="120"
      ></el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  getSaleOutDepotDetailsList,
  getSaleOutDepotDetailsCount,
  exportSaleOutDepotDetailsUrl
} from '@a/salesManage/salesOutbound.api'
export default {
  mixins: [commomMix],
  data() {
    return {
      searchProps: {
        saleOrderCode: '',
        code: '',
        vipsBillNo: '',
        lbxNo: '',
        customerId: '',
        outDepotId: '',
        saleType: '',
        buId: '',
        goodsStr: ''
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
				const { data } = await getSaleOutDepotDetailsList({
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
    async exportExcel() {
      if (this.tableData.total < 1) {
        return this.$errorMsg('暂无数据可导出')
      }
      try {
        if (this.tableChoseList.length) {
          this.$showToast('确定导出勾选数据？', async() => {
            const ids = this.tableChoseList.map(item => item.id).toString()
            this.$exportFile(exportSaleOutDepotDetailsUrl, { ids })
          })
        } else {
          const { data } = await getSaleOutDepotDetailsCount({ ...this.searchProps })
          if (data > 10000) {
            return this.$errorMsg('导出的数量过大，请填写筛选条件再导出')
          }
          this.$exportFile(exportSaleOutDepotDetailsUrl, { ...this.searchProps })
        }
      } catch (error) {
        this.$errorMsg(error.message)
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
