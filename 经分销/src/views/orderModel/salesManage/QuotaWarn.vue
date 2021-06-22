<template>
  <!-- 客户额度预警页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.buId"
                         placeholder="请选择"
                         filterable
                         clearable
                        :data-list="getSelectBeanByUserId('business_list')">
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
            <el-form-item label="客户名称：" prop="customerId" class="search-panel-item fs-14 clr-II">
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
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary"
                   v-permission="'sales_quotawarn_export'"
                   @click="exportList">导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table ref="table"
               :tableData.sync="tableData"
               @selection-change="selectionChange"
               @change="getList">
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
      <el-table-column prop="buName"
                       align="center"
                       label="事业部"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="customerName"
                       align="center"
                       label="客户"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="customerQuota"
                       align="center"
                       label="客户总额度"
                       width="130"
      >
        <template slot-scope="scope">
           <span>{{scope.row.currency}}</span>
           <br /><span>{{scope.row.customerQuota || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="saleNoshelfAmount"
                       align="center"
                       label="销售在途金额"
                       width="120"
      >
        <template slot-scope="scope">
          <span>{{scope.row.currency}}</span>
           <br /><span>{{scope.row.saleNoshelfAmount || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nobillAmount"
                       align="center"
                       label="待出账单金额"
                       width="120"
      >
        <template slot-scope="scope">
          <span>{{scope.row.currency}}</span>
           <br /><span>{{scope.row.nobillAmount || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="noconfirmAmount"
                       align="center"
                       label="待确认账单金额"
                       width="120"
      >
       <template slot-scope="scope">
          <span>{{scope.row.currency}}</span>
           <br /><span>{{scope.row.noconfirmAmount || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="noinvoiceAmount"
                       align="center"
                       label="待开票金额"
                       width="120"
      >
        <template slot-scope="scope">
          <span>{{scope.row.currency}}</span>
           <br /><span>{{scope.row.noinvoiceAmount || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="noreturnAmount"
                       align="center"
                       label="待回款金额"
                       width="120"
      >
        <template slot-scope="scope">
          <span>{{scope.row.currency}}</span>
           <br /><span>{{scope.row.noreturnAmount || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="availableAmount"
                       align="center"
                       label="可用额度"
                       width="120"
      >
        <template slot-scope="scope">
          <span>{{scope.row.currency}}</span>
           <br /><span>{{scope.row.availableAmount || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据刷新时间"
                       prop="createDate"
                       align="center"
                       width="150"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="left"
                       width="100"
                       label="操作"
                       fixed="right">
        <template slot-scope="{row}">
          <el-button type="text"
                     v-permission="'sales_quotawarn_detail'"
                     @click="linkTo(`/sales/QuotaWarnDetail?id=${row.id}&buName=${row.buName}&customerName=${row.customerName}&customerQuota=${row.customerQuota}&currency=${row.currency}`)">详情</el-button>
          <el-button type="text"
                     v-permission="'sales_quotawarn_refash'"
                     @click="refresh(row)">刷新</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  getcustomerQuotaWarningList,
  refreshCustomerQuotaWarning,
  exportCustomerQuotaWarningUrl
} from '@a/salesManage/index'

export default {
  mixins: [commomMix],
  data() {
    return {
      // 查询数据
      searchProps: {
        customerId: '',
        buId: ''
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
				const { data } = await getcustomerQuotaWarningList({
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
            this.$exportFile(exportCustomerQuotaWarningUrl, { ids })
          })
        } else {
          this.$exportFile(exportCustomerQuotaWarningUrl, { ...this.searchProps })
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 刷新
    refresh(row) {
      this.$showToast('确定刷新当前项？', async() => {
        const { buId, customerId } = row
        await refreshCustomerQuotaWarning({ buId, customerId })
        this.$successMsg('正在获取刷新信息，请稍后刷新列表')
        this.getList()
      })
    },
    // 重置搜索栏
    resetSearchForm() {
      this.reset('searchForm', () => {
        this.getList(1)
      })
    }
  }
}
</script>
