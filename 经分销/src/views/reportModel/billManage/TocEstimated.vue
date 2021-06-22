<template>
  <!-- To-C暂估应收表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="平台名称：" prop="storePlatformCode" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.storePlatformCode"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('storePlatformList')"
              >
                <el-option
                  v-for="item in selectOpt.storePlatformList"
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
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="运营类型：" prop="shopTypeCode" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.shopTypeCode"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('merchantShopRel_shopTypeList')"
              >
                <el-option
                  v-for="item in selectOpt.merchantShopRel_shopTypeList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="结算状态：" prop="settlementStatus" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.settlementStatus"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('toctempbill_settlementStatusList')"
              >
                <el-option
                  v-for="item in selectOpt.toctempbill_settlementStatusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="店铺：" prop="shopCode" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.shopCode"
                         placeholder="请选择"
                         clearable
                         filterable>
                <el-option
                  v-for="item in shopInfoList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date" label="账单月份：" class="search-panel-item fs-14 clr-II">
              <el-date-picker
                v-model="date"
                type="monthrange"
                value-format="yyyy-MM"
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
        <el-button type="primary"
                   v-permission="'toC_temp_refresh'"
                   @click="refreshBill">刷新</el-button>
        <el-button type="primary"
                   v-permission="'toC_temp_export'"
                   @click="exportList">导出</el-button>
        <el-button type="primary"
                   v-permission="'toC_temp_exportTemp'"
                   @click="exportSummaryOrder">累计暂估应收导出</el-button>
        <el-button type="primary"
                   v-permission="'toC_temp_exportSummary'"
                   @click="exportTempBill">暂估汇总导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               showSelection
               @selection-change="selectionChange"
               @change="getList">
      <template slot="shopTypeName" slot-scope="{row}">
        {{row.shopTypeName}}<br/>{{row.customerName}}
      </template>
      <template slot="storePlatformName" slot-scope="{row}">
        {{row.storePlatformName}}<br/>{{row.shopTypeCode === '001' ? row.shopName : ''}}
      </template>
      <template slot="totalReceiveNum" slot-scope="{row}">
        {{row.totalReceiveNum}}<br/>{{`${row.currency} ${row.totalReceiveAmount}`}}
      </template>
      <template slot="alreadyReceiveNum" slot-scope="{row}">
        {{row.alreadyReceiveNum}}<br/>{{`${row.currency} ${row.alreadyReceiveAmount}`}}
      </template>
      <template slot="lastNum" slot-scope="{row}">
        {{row.totalReceiveNum - row.alreadyReceiveNum}}<br/>{{`${row.currency} ${row.lastReceiveAmount}`}}
      </template>
      <template slot="action" slot-scope="{row}">
        <el-button type="text"
                   v-permission="'toC_temp_detail'"
                   @click="linkTo(`/bill/tocestimateddetail?id=${row.id}`)">详情</el-button>
      </template>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  listToCTempReceiveBill,
  refreshBill,
  getBillCount,
  exportBillUrl,
  exportSummaryOrderUrl,
  exportTempBillUrl,
  getShopInfoList
} from '@a/reportManage'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 查询数据
      searchProps: {
        storePlatformCode: '',
        customerId: '',
        shopTypeCode: '',
        settlementStatus: '',
        shopCode: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '应收月份', prop: 'month', width: '120', align: 'center', hide: true },
        { label: '运营类型', slotTo: 'shopTypeName', minWidth: '150', align: 'center', hide: true },
        { label: '事业部', prop: 'buName', width: '120', align: 'center', hide: true },
        { label: '平台', slotTo: 'storePlatformName', minWidth: '150', align: 'center', hide: true },
        { label: '总暂估应收', slotTo: 'totalReceiveNum', width: '120', align: 'center', hide: true },
        { label: '已结算订单', slotTo: 'alreadyReceiveNum', width: '150', align: 'center', hide: true },
        { label: '剩余暂估应收', slotTo: 'lastNum', width: '120', align: 'center', hide: true },
        { label: '结算完成月份', slotTo: 'settlementEndMonth', width: '120', align: 'center', hide: true },
        { label: '结算状态', prop: 'settlementStatusLabel', width: '100', align: 'center', hide: true },
        { label: '操作', slotTo: 'action', width: '80', align: 'left' }
      ],
      // 账单月份
      date: [],
      // 店铺信息列表
      shopInfoList: []
    }
  },
  activated() {
    this.getList()
    this.getShopInfoList()
  },
  mounted() {
    this.getList()
    this.getShopInfoList()
  },
  methods: {
    // 获取表格数据
		async getList(pageNum) {
      // 账单月份
      this.searchProps.monthStart = this.date && this.date.length ? this.date[0] : ''
      this.searchProps.monthEnd = this.date && this.date.length ? this.date[1] : ''
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await listToCTempReceiveBill({
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
    // 获取店铺列表
    async getShopInfoList() {
      try {
        const { data = [] } = await getShopInfoList()
        const list = data.map(item => ({ key: item.shopCode, value: item.shopName }))
        await this.$nextTick()
        this.shopInfoList = list
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 刷新
    async refreshBill() {
      if (!this.tableChoseList.length) {
        this.$alertWarning('至少选择一条记录！')
        return false
      }
      const ids = this.tableChoseList.map(item => item.id).toString()
      try {
        await refreshBill({ ids })
        this.$successMsg('操作成功')
        this.getList()
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 导出
    async exportList() {
      if (this.tableData.total < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      try {
        if (this.tableChoseList.length) {
          this.$showToast('确定导出勾选数据？', async() => {
            const ids = this.tableChoseList.map(item => item.id).toString()
            this.$exportFile(exportBillUrl, { ids })
          })
        } else {
          const { data } = await getBillCount({ ...this.searchProps })
          if (data > 10000) {
            this.$errorMsg('导出的数量过大，请填写筛选条件再导出')
            return false
          }
          this.$exportFile(exportBillUrl, { ...this.searchProps })
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 累计暂估应收导出
    exportSummaryOrder() {
      if (this.tableData.total < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      try {
        if (this.tableChoseList.length) {
          this.$showToast('确定导出勾选数据？', async() => {
            const ids = this.tableChoseList.map(item => item.id).toString()
            this.$exportFile(exportSummaryOrderUrl, { ids })
          })
        } else {
          this.$exportFile(exportSummaryOrderUrl, { ...this.searchProps })
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 暂估汇总导出
    exportTempBill() {
      if (this.tableData.total < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      try {
        if (this.tableChoseList.length) {
          this.$showToast('确定导出勾选数据？', async() => {
            const ids = this.tableChoseList.map(item => item.id).toString()
            this.$exportFile(exportTempBillUrl, { ids })
          })
        } else {
          this.$exportFile(exportTempBillUrl, { ...this.searchProps })
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
