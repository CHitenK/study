<template>
  <!-- 销售出库清单页面 -->
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
            <el-form-item label="销售类型：" prop="saleType" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.saleType"
                         placeholder="请选择"
                         clearable
                         filterable
                         :data-list="getSelectList('saleOutDepot_saleTypeList')">
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
            <el-form-item label="PO号：" prop="poNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.poNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="出库清单号：" prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="单据状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.status"
                         placeholder="请选择"
                         clearable
                         filterable
                         :data-list="getSelectList('saleOutDepot_statusList')">
                <el-option
                  v-for="item in selectOpt.saleOutDepot_statusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
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
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date" label="发货时间：">
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
        <el-button id="sale-export" type="primary" @click="exportList" v-permission="'saleOut_exportSaleOutDepot'">导出</el-button>
        <el-button id="sale-import" type="primary" @click="importFile" v-permission="'saleOut_importSaleOut'">导入</el-button>
        <el-button id="sale-examine" type="primary" @click="toExamine" v-permission="'saleOut_auditSaleOut'">审核</el-button>
        <el-button id="sale-remove" type="primary" @click="removeTableItem" v-permission="'saleOut_delSaleOut'">删除</el-button>
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
                       label="出库清单编号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="poNo"
                       align="center"
                       min-width="120"
                       label="PO号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="outDepotName"
                       align="center"
                       width="120"
                       label="出仓仓库"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="buName"
                       align="center"
                       width="120"
                       label="事业部"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="merchantName"
                       align="center"
                       width="100"
                       label="公司"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="customerName"
                       align="center"
                       min-width="120"
                       label="客户"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="saleTypeLabel"
                       align="center"
                       width="100"
                       label="销售类型"
      ></el-table-column>
      <el-table-column prop="saleOrderCode"
                       align="center"
                       min-width="120"
                       label="销售订单编号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="deliverDate"
                       align="center"
                       width="150"
                       label="发货时间"
      ></el-table-column>
      <el-table-column prop="statusLabel"
                       align="center"
                       width="70"
                       label="单据状态"
      ></el-table-column>
      <el-table-column align="left"
                       width="60"
                       label="操作"
                       fixed="right">
        <template slot-scope="{row}">
          <el-button type="text"
                     v-permission="'saleOut_detail'"
                     @click="linkTo(`/sales/salesdeliverydetail?id=${row.id}`)">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>

<script>
import {
  auditSaleOutDepot,
  delSaleOut,
  getOrderCount,
  listSaleOutDepot,
  exportSaleOutDepotUrl,
  importSaleOutDepotUrl
} from '@a/salesManage/salesDelivery.api'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 发货时间
      date: [],
      // 查询数据
      searchProps: {
        saleOrderCode: '',
        outDepotId: '',
        saleType: '',
        poNo: '',
        code: '',
        status: '',
        customerId: '',
        buId: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 拉取表格数据
		async getList(pageNum) {
      // 发货时间
      this.searchProps.deliverStartDate = this.date && this.date.length ? this.date[0] : ''
      this.searchProps.deliverEndDate = this.date && this.date.length ? this.date[1] : ''
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await listSaleOutDepot({
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
            this.$exportFile(exportSaleOutDepotUrl, { ...this.searchProps, ids })
          })
        } else {
          const { data } = await getOrderCount({ ...this.searchProps })
          if (data > 10000) {
            return this.$errorMsg('导出的数量过大，请填写筛选条件再导出')
          }
          this.$exportFile(exportSaleOutDepotUrl, { ...this.searchProps })
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 127 + '&url=' + importSaleOutDepotUrl)
    },
    // 审核
    toExamine() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      this.$showToast('确定审核并提交？', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          const { data } = await auditSaleOutDepot({ ids })
          if (!data.failure) {
            this.$successMsg(`成功${data.success}条`)
            this.getList()
          } else {
            this.$message.closeAll()
            const msgData = []
            msgData.push(`成功${data.success}条 失败${data.failure}条`)
            const errList = data.errorList[0].message.split('\n')
            errList.forEach(item => {
              msgData.push(this.$createElement('p', null, item))
            })
            this.$message.error({
              message: this.$createElement('div', { 'class': {'clr-r': true} }, msgData)
            })
          }
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 删除表格项
		removeTableItem() {
			if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      this.$showToast('确定删除选中对象？', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await delSaleOut({ ids })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
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
