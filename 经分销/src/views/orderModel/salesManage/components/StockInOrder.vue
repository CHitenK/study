<template>
  <!-- 上架入库单页面 -->
  <div>
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)" style="margin-top: 0px">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="销售订单编号：" prop="saleOrderCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.saleOrderCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="入仓仓库：" prop="inDepotId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.inDepotId"
                         placeholder="请选择"
                         filterable
                         clearable
                         :data-list="getSelectBeanByMerchantRel('inWarehouseList')">
                <el-option
                  v-for="item in selectOpt.inWarehouseList"
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
                         :data-list="getSelectBeanByMerchantRel('outWarehouseList')">
                <el-option
                  v-for="item in selectOpt.outWarehouseList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="上架入库单号：" prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="PO号：" prop="poNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.poNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="销售出库单：" prop="saleOutCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.saleOutCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="单据状态：" prop="state" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.state"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('saleShelfIdepot_statusList')"
              >
                <el-option
                  v-for="item in selectOpt.saleShelfIdepot_statusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date" label="入库时间：">
              <el-date-picker
                v-model="date"
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
        <el-button id="sale-export" type="primary" @click="exportList" v-permission="'saleShelfIdepot_export'">导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               @selection-change="selectionChange"
               @change="getList">
      <el-table-column prop="code1"
                       align="center"
                       min-width="130"
                       label="上架单"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="code"
                       align="center"
                       min-width="130"
                       label="上架入库单"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="saleOrderCode"
                       align="center"
                       min-width="130"
                       label="销售订单号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="saleOutCode"
                       align="center"
                       min-width="130"
                       label="销售出库单"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="inDepotName"
                       align="center"
                       width="110"
                       label="入库仓库"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="buName"
                       align="center"
                       width="120"
                       label="事业部"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="outDepotName"
                       align="center"
                       width="120"
                       label="出仓仓库"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="poNo"
                       align="center"
                       width="120"
                       label="PO号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="stateLabel"
                       align="center"
                       width="70"
                       label="单据状态"
      ></el-table-column>
      <el-table-column prop="shelfDate"
                       align="center"
                       width="150"
                       label="入库时间"
      ></el-table-column>
      <el-table-column align="left"
                       width="60"
                       label="操作"
                       fixed="right">
        <template slot-scope="{row}">
          <el-button type="text"
                     v-permission="'saleShelfIdepot_detail'"
                     @click="linkTo(`/sales/stockindetail?id=${row.id}`)">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  listSaleShelfIdepot,
  getSaleShelfIdepotCount,
  exportSaleShelfIdepotUrl
} from '@a/salesManage/shelvesList.api'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 入库时间
      date: [],
      searchProps: {
        saleOrderCode: '',
        inDepotId: '',
        outDepotId: '',
        code: '',
        poNo: '',
        saleOutCode: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 拉取表格数据
		async getList(pageNum) {
      // 上架日期
      this.searchProps.shelfStartDate = this.date && this.date.length ? this.date[0] + ' 00:00:00' : ''
      this.searchProps.shelfEndDate = this.date && this.date.length ? this.date[1] + ' 23:59:59' : ''
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await listSaleShelfIdepot({
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
        const { data } = await getSaleShelfIdepotCount()
        if (data > 10000) {
          return this.$errorMsg('导出的数量过大，请填写筛选条件再导出')
        }
        this.$exportFile(exportSaleShelfIdepotUrl, { ...this.searchProps })
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 重置搜索栏
    resetForm() {
      this.reset('searchForm', () => {
        this.date = []
        this.getList(1)
      })
    }
  }
}
</script>
