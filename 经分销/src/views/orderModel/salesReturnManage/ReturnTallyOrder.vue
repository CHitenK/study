<template>
  <!-- 销售退理货单列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="销退单号：" prop="orderCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.orderCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="入仓仓库：" prop="depotId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.depotId"
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
            <el-form-item label="合同号：" prop="contractNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.contractNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="理货单号：" prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="理货单状态：" prop="state" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.state"
                         placeholder="请选择"
                         clearable
                         :data-list="getSelectList('tallyingOrder_stateList')">
                <el-option
                  v-for="item in selectOpt.tallyingOrder_stateList"
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
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date" label="理货时间：">
              <el-date-picker
                v-model="date"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
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
        <el-button id="sale-confirm-btn" type="primary" @click="tallyConfirm('010')" v-permission="'saleReturnTallyin_confirm'">确认</el-button>
        <el-button id="sale-reject-btn" type="primary" @click="tallyConfirm('004')" v-permission="'saleReturnTallyin_reject'">驳回</el-button>
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
                       :selectable="selectable"
      ></el-table-column>
      <el-table-column prop="code"
                       align="center"
                       min-width="120"
                       label="理货单号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="orderCode"
                       align="center"
                       min-width="120"
                       label="销退订单号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="depotName"
                       align="center"
                       min-width="120"
                       label="仓库"
      ></el-table-column>
      <el-table-column prop="buName"
                       align="center"
                       min-width="120"
                       label="事业部"
      ></el-table-column>
      <el-table-column prop="contractNo"
                       align="center"
                       min-width="120"
                       label="合同号"
      ></el-table-column>
      <el-table-column prop="tallyingDate"
                       align="center"
                       width="150"
                       label="理货时间"
      ></el-table-column>
      <el-table-column prop="state"
                       align="center"
                       width="80"
                       label="状态">
        <template slot-scope="{row}">
          {{
            row.state === '009' ? '待确认' :
            row.state === '010' ? '已确认' :
            row.state === '004' ? '已驳回' : ''
          }}
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="60"
                       label="操作"
                       fixed="right">
        <template slot-scope="{row}">
          <el-button type="text"
                     v-permission="'saleReturnTallyin_detail'"
                     @click="linkTo(`/sales/returntallydetail?id=${row.id}`)">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>

<script>
import {
  getTallyOrderList,
  tallyConfirmTransfer
} from '@a/salesReturnManage/returnTallyOrder.api'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 理货时间
      date: [],
      // 查询数据
      searchProps: {
        orderCode: '',
        depotId: '',
        contractNo: '',
        code: '',
        state: '',
        buId: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取表格数据
		async getList(pageNum) {
      // 理货时间
      this.searchProps.tallyingStartDate = this.date && this.date.length ? this.date[0] : ''
      this.searchProps.tallyingEndDate = this.date && this.date.length ? this.date[1] : ''
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await getTallyOrderList({
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
    // 确认/驳回 state 010:确认 004:驳回
    tallyConfirm(state) {
      if (!this.tableChoseList.length) {
       return this.$alertWarning('至少选择一条记录！')
      }
      this.$showToast('确定提交选中对象', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          const res = await tallyConfirmTransfer({ state, ids })
          this.$successMsg(res.message)
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 已确认和已驳回则表格复选框不可选
    selectable(row) {
      return !(row.state === '004' || row.state === '010')
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
