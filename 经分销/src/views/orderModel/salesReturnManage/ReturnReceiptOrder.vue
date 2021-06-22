<template>
  <!-- 销售退货入库清单页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="销退入库单号：" prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="退入仓库：" prop="inDepotId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.inDepotId"
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
            <el-form-item label="客户：" prop="customerName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.customerName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="单据状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.status"
                         placeholder="请选择"
                         clearable
                         filterable
                         :data-list="getSelectList('saleReturnIdepot_statusList')">
                <el-option
                  v-for="item in selectOpt.saleReturnIdepot_statusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="销退单号：" prop="orderCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.orderCode" placeholder="请输入" clearable />
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
            <el-form-item prop="date" label="退货入库时间：">
              <el-date-picker
                clearable
                v-model="date"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary" @click="exportList" v-permission="'saleReturnIdepot_exportSaleReturnIdepot'">导出</el-button>
        <el-button type="primary" @click="importFile" v-permission="'saleReturnIdepot_importSaleReturnIdepot'">导入</el-button>
        <el-button type="primary" @click="examineOrder" v-permission="'saleReturnIdepot_examineSaleReturnIdepot'">审核</el-button>
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
                       label="销退入库单号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="contractNo"
                       align="center"
                       min-width="100"
                       label="合同号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="inDepotName"
                       align="center"
                       label="退入仓库"
                       min-width="100"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="outDepotName"
                       align="center"
                       label="退出仓库"
                       min-width="100"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="buName"
                       align="center"
                       min-width="120"
                       label="事业部"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="returnInNum"
                       align="center"
                       width="100"
                       label="退货入库数量"
      ></el-table-column>
      <el-table-column prop="orderCode"
                       align="center"
                       min-width="120"
                       label="销退单号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="statusLabel"
                       align="center"
                       width="80"
                       label="单据状态"
      ></el-table-column>
      <el-table-column prop="returnInDate"
                       align="center"
                       width="150"
                       label="退货入库时间"
      ></el-table-column>
      <el-table-column align="center"
                       width="120"
                       label="操作"
                       fixed="right">
        <template slot-scope="{row}">
          <el-button type="text"
                     @click="linkTo(`/sales/returnreceiptdetail?id=${row.id}`)" v-permission="'saleReturnIdepot_details'">详情</el-button>
          <el-button type="text"
                     @click="linkTo(`/common/enclosuremanage?code=${row.code}`)">附件管理</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  getSaleReturnIdepotList,
  exportSaleReturnIdepotUrl,
  getSaleReturnIdepotrCount,
  importSaleReturnIdepotUrl,
  auditSaleReturnIdepot
} from '@a/salesReturnManage/returnReceiptOrder.api'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 退货入库时间
      date: [],
      // 查询数据
      searchProps: {
        code: '',
        inDepotId: '',
        customerName: '',
        status: '',
        orderCode: '',
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
      // 退货入库时间
      this.searchProps.returnInDateStartDate = this.date && this.date.length ? this.date[0] : ''
      this.searchProps.returnInDateEndDate = this.date && this.date.length ? this.date[1] : ''
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await getSaleReturnIdepotList({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
        this.tableData.list = data.list
        this.tableData.total = data.total
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
            this.$exportFile(exportSaleReturnIdepotUrl, { ids })
          })
        } else {
          const { data } = await getSaleReturnIdepotrCount({ ...this.searchProps })
          if (data > 10000) {
            return this.$errorMsg('导出的数量过大，请填写筛选条件再导出')
          }
          this.$exportFile(exportSaleReturnIdepotUrl, { ...this.searchProps })
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
          const { data } = await auditSaleReturnIdepot({ ids })
          if (!data.failure) {
            this.$successMsg(`审核成功${data.success}条`)
          } else {
            const msgData = []
            msgData.push(this.$createElement('p', null, `审核成功${data.success}条 失败${data.failure}条`))
            data.errorList.forEach(item => {
              msgData.push(this.$createElement('p', null, item.message))
            })
            this.$message.error({
              message: this.$createElement('div', { 'class': {'clr-r': true} }, msgData)
            })
          }
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 154 + '&url=' + importSaleReturnIdepotUrl)
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
