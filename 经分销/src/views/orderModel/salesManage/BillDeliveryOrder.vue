<template>
  <!-- 销售订单列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="出仓仓库：" prop="depotId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.depotId"
                placeholder="请选择"
                clearable
                filterable
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
            <el-form-item label="账单号：" prop="billCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.billCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="单据状态：" prop="state" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.state"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('billOutinDepot_stateList')"
              >
                <el-option
                  v-for="item in selectOpt.billOutinDepot_stateList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="账单出库单号：" prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="处理类型：" prop="processingType" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.processingType"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('processingTypeList')"
              >
                <el-option
                  v-for="item in selectOpt.processingTypeList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="调整类型：" prop="operateType" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.operateType"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('billOutinDepot_operateTypeList')"
              >
                <el-option
                  v-for="item in selectOpt.billOutinDepot_operateTypeList"
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
                filterable
                :data-list="getBUSelectBean('inBusinessList')"
              >
                <el-option
                  v-for="item in selectOpt.inBusinessList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="账单来源：" prop="billSource" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.billSource"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('billOutinDepot_billSourceList')"
              >
                <el-option
                  v-for="item in selectOpt.billOutinDepot_billSourceList"
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
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date" label="账单出库时间：">
              <el-date-picker
                clearable
                v-model="date"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']">
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
        <el-button type="primary" @click="exportList" v-permission="'billOutindepot_export'">导出</el-button>
        <el-button type="primary" @click="importFile" v-permission="'billOutindepot_import'">导入</el-button>
        <el-button type="primary" @click="examineOrder" v-permission="'billOutindepot_audit'">审核</el-button>
        <el-button type="primary" @click="deleteTableItem" v-permission="'billOutindepot_delete'">删除</el-button>
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
                       label="账单出库单号"
                       width="140"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="customerName"
                       align="center"
                       label="客户"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="depotName"
                       align="center"
                       label="仓库"
                       width="130"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="buName"
                       align="center"
                       label="事业部"
                       width="130"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="billCode"
                       align="center"
                       label="平台账单号"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="processingTypeLabel"
                       align="center"
                       label="处理类型"
                       width="80"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="deliverDate"
                       align="center"
                       label="账单出库时间"
                       width="100">
        <template slot-scope="{row}">
          {{row.deliverDate.slice(0, 10)}}
        </template>
      </el-table-column>
      <el-table-column prop="totalNum"
                       align="center"
                       label="账单总量"
                       width="80"
      ></el-table-column>
      <el-table-column prop="totalAmount"
                       align="center"
                       label="账单金额"
                       width="80"
      ></el-table-column>
      <el-table-column prop="currencyLabel"
                       align="center"
                       label="币种"
                       width="80"
      ></el-table-column>
      <el-table-column prop="operateTypeLabel"
                       align="center"
                       label="库存调整类型"
                       width="100"
      ></el-table-column>
      <el-table-column prop="stateLabel"
                       align="center"
                       label="单据状态"
                       width="80"
      ></el-table-column>
      <el-table-column prop="billSourceLabel"
                       align="center"
                       label="账单来源"
                       width="100"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="left"
                       label="操作"
                       width="80"
                       fixed="right">
        <template slot-scope="{row}">
          <el-button type="text"
                     v-permission="'billOutindepot_detail'"
                     @click="linkTo(`/sales/billdeliverydetail?id=${row.id}`)">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  getBillOutinDepotList,
  auditBillOutinDepot,
  delBillOutinDepot,
  getBillOutinDepotCount,
  exportBillOutinDepotUrl,
  importBillOutinDepotUrl,
  getBillOutinDepotGoodsInfo,
  getAvailableNum
} from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 订单日期
      date: [],
      // 查询数据
      searchProps: {
        depotId: '',
        billCode: '',
        code: '',
        operateType: '',
        buId: '',
        billSource: '',
        customerName: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取表格数据
		async getList(pageNum) {
      // 订单日期
      this.searchProps.deliverStartDate = this.date && this.date.length ? this.date[0] : ''
      this.searchProps.deliverEndDate = this.date && this.date.length ? this.date[1] : ''
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
				this.tableData.loading = true
				const { data } = await getBillOutinDepotList({
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
            this.$exportFile(exportBillOutinDepotUrl, { ids })
          })
        } else {
          const { data } = await getBillOutinDepotCount({ ...this.searchProps })
          if (data > 10000) {
            return this.$errorMsg('导出的数量过大，请填写筛选条件再导出')
          }
          this.$exportFile(exportBillOutinDepotUrl, { ...this.searchProps })
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
          let flag = true
          // 获取商品对应的信息
          const { data } = await getBillOutinDepotGoodsInfo({ ids })
          for (let i = 0; i < data.length; i++) {
            const { code, num } = data[i]
            const tempArr = code.split('-')
            const goodsId = tempArr[0]
            const depotId = tempArr[1]
            const outDepotCode = tempArr[2]
            const goodsNo = tempArr[3]
            const unit = tempArr[4]
            let tallyingUnit = ''
            if (outDepotCode === 'HK01' && unit === '00') {
              tallyingUnit = '0'
            } else if (outDepotCode === 'HK01' && unit === '01') {
              tallyingUnit = '1'
            } else if (outDepotCode === 'HK01' && unit === '02') {
              tallyingUnit = '2'
            }
            // 查询可用量
            const res = await getAvailableNum({
              depotId,
              goodsId,
              outDepotCode,
              unit: tallyingUnit
            })
            const availableNum = res.data
            // 判断库存量是否足够
            if (availableNum === -1) {
              this.$errorMsg(`商品货号：${goodsNo},未查到库存可用量`)
              flag = false
              break
            } else if (num > availableNum) {
              this.$errorMsg(`库存不足，商品货号：${goodsNo},可用量：${availableNum}`)
              flag = false
              break
            }
          }
          if (!flag) return false
          // 审核
          await auditBillOutinDepot({ ids })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$message.closeAll()
          const msgData = []
          const errList = error.message.split('\n')
          errList.forEach(item => {
            msgData.push(this.$createElement('p', null, item))
          })
          this.$message.error({
            message: this.$createElement('div', { 'class': {'clr-r': true} }, msgData)
          })
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
          await delBillOutinDepot({ ids })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 132 + '&url=' + importBillOutinDepotUrl)
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
<style lang="scss" scoped>
.amount-text {
  margin-right: 4px;
  line-height: 32px;
}
</style>
