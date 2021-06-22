<template>
  <!-- 销售退货订单页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="销退单号：" prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="退出仓库：" prop="outDepotId" class="search-panel-item fs-14 clr-II" >
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
            <el-form-item label="单据状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.status"
                         placeholder="请选择"
                         filterable
                         clearable
                         :data-list="getSelectList('saleReturnOrder_statusList')">
                <el-option
                  v-for="item in selectOpt.saleReturnOrder_statusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="关联销售单号：" prop="saleOrderRelCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.saleOrderRelCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="退货类型：" prop="returnType" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="searchProps.returnType"
                         placeholder="请选择"
                         clearable
                         filterable
                         :data-list="getSelectList('saleReturnOrder_returnTypeList')">
                <el-option
                  v-for="item in selectOpt.saleReturnOrder_returnTypeList"
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
            <el-form-item prop="date" label="创建时间：">
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
        <!-- 新增 -->
        <el-dropdown trigger="click"
                     placement="bottom-start"
                     v-permission="'saleReturn_add'"
                     @command="handleCommand">
          <el-button id="sale-add-btn" type="primary">
            <span>新增</span>
            <i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">购销退货</el-dropdown-item>
            <el-dropdown-item command="2">非购销退货</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 导入 -->
        <!-- 导入 -->
        <el-dropdown trigger="click"
                     v-permission="'saleReturn_import'"
                     placement="bottom-start"
                     style="margin: 0 10px"
                     @command="importFile">
          <el-button type="primary" id="sale-import-btn">
            <span>导入</span>
            <i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消费者退货</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button id="sale-del-btn" type="primary" @click="handleAction('1')" v-permission="'saleReturn_delSaleReturnOrder'">删除</el-button>
        <el-button id="sale-examine-btn" type="primary" @click="handleAction('2')" v-permission="'saleReturn_auditSaleReturnOrder'">审核</el-button>
        <el-button id="sale-export-btn" type="primary" @click="exportList" v-permission="'saleReturn_export'">导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
 <JFX-table :tableData.sync="tableData"
            class="mr-t-20"
            @change="getList"
            @selection-change="selectionChange">
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
      <el-table-column prop="code"
                       align="center"
                       min-width="120"
                       label="销售退货订单号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="saleOrderRelCode"
                       align="center"
                       label="关联销售单号"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="outDepotName"
                       align="center"
                       min-width="120"
                       label="退出仓库"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="inDepotName"
                       align="center"
                       min-width="120"
                       label="退入仓库"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="buName"
                       align="center"
                       width="120"
                       label="事业部"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="customerName"
                       align="center"
                       min-width="130"
                       label="客户"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="serveTypesLabel"
                       align="center"
                       width="120"
                       label="服务类型"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="totalReturnNum"
                       align="center"
                       width="100"
                       label="计划退货数量"
      ></el-table-column>
      <el-table-column prop="statusLabel"
                       align="center"
                       width="80"
                       label="单据状态"
      ></el-table-column>
      <el-table-column prop="createDate"
                       align="center"
                       width="150"
                       label="创建时间">
      </el-table-column>
      <el-table-column prop="returnTypeLabel"
                       align="center"
                       width="100"
                       label="退货类型">
      </el-table-column>
      <el-table-column align="left"
                       label="操作"
                       :width="btnsWidth"
                       fixed="right">
        <template slot-scope="{row}">
          <el-button v-if="row.status === '001'"
                     v-permission="'saleReturn_edit'"
                     type="text"
                     @click="linkTo(`/sales/salesreturnedit?id=${row.id}`)">编辑</el-button>
          <el-button v-if="(row.returnType != '1' && (row.outBatchValidation == '0' || row.outBatchValidation == '2') && row.outDepotIsInDependOut == '0') && (row.status == '003' || row.status == '012')"
                     v-permission="'saleReturn_outDepotReport'"
                     type="text"
                     @click="isCanGo(row.id)">出库打托</el-button>
          <el-button v-if="(row.inBatchValidation == '0' || row.inBatchValidation == '2') && row.inDepotisOutDependIn == '0' && (row.status == '003'|| row.status == '016' || row.status == '028')"
                     v-permission="'saleReturn_in'"
                     type="text"
                     @click="linkTo(`/sales/putonshelves?id=${row.id}`)">入库上架</el-button>
          <el-button v-if="row.status == '012' || row.status == '016' || row.status == '007'"
                     v-permission="'saleReturn_attachment'"
                     type="text"
                     @click="linkTo(`/common/enclosuremanage?code=${row.code}`)">附件</el-button>
          <el-button type="text"
                     v-permission="'saleReturn_detail'"
                     @click="linkTo(`/sales/salesreturndetail?id=${row.id}`)">详情</el-button>
          <span v-if="!tableData.loading" v-count-width="{widthArr: getWidthArr(row), callback: countWidth }"></span>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 选择单据组件 -->
    <SelectDocument v-if="visible.show" :isVisible="visible" @comfirm="handleComfirm" />
    <!-- 选择单据组件 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import SelectDocument from './components/SelectDocument'
import {
  getSaleReturnList,
  delSaleReturnOrder,
  auditSaleReturnOrder,
  exportSaleReturnUrl,
  importSaleReturn2,
  isOutdepotReport,
  getSaleReturnCount
} from '@a/salesReturnManage/index'
export default {
  mixins: [commomMix],
  components: {
    SelectDocument
  },
  data() {
    return {
      // 创建时间
      date: [],
      // 查询数据
      searchProps: {
        code: '',
        outDepotId: '',
        customerId: '',
        status: '',
        saleOrderRelCode: '',
        returnType: '',
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
      // 创建时间
      this.searchProps.createStartDate = this.date && this.date.length ? this.date[0] : ''
      this.searchProps.createEndDate = this.date && this.date.length ? this.date[1] : ''
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await getSaleReturnList({
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
    // 删除、审核
    handleAction(type) {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      const stateEnum = {
        '1': '确定删除选中对象？',
        '2': '确定审核并提交？'
      }
      this.$showToast(stateEnum[type], async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          switch (type) {
            case '1': await delSaleReturnOrder({ ids })
              break
            case '2': await auditSaleReturnOrder({ ids })
              break
          }
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
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
            this.$exportFile(exportSaleReturnUrl, { ids })
          })
        } else {
          const { data } = await getSaleReturnCount({ ...this.searchProps })
          if (data > 10000) {
            return this.$errorMsg('导出的数量过大，请填写筛选条件再导出')
          }
          this.$exportFile(exportSaleReturnUrl, { ...this.searchProps })
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 120 + '&url=' + importSaleReturn2)
    },
    // 重置搜索表单
    resetSearchForm() {
      this.reset('searchForm', () => {
        this.date = []
        this.getList(1)
      })
    },
    // 点击新增下拉菜单
    handleCommand(type) {
      if (type === '1') {
        this.visible.show = true
      } else {
        this.linkTo(`/sales/salesreturnadd`)
      }
    },
    // 计算操作单元格宽度
    getWidthArr(row) {
      return [
        60,
        row.status === '001' ? 40 : 0,
        (row.returnType !== '1' && (row.outBatchValidation === '0' || row.outBatchValidation === '2') && row.outDepotIsInDependOut === '0') && (row.status === '003' || row.status === '012') ? 60 : 0,
        ((row.inBatchValidation === '0' || row.inBatchValidation === '2') && row.inDepotisOutDependIn === '0') && (row.status === '003' || row.status === '016' || row.status === '028') ? 60 : 0,
        row.status === '012' || row.status === '016' || row.status === '007' ? 40 : 0
      ]
    },
    handleComfirm(data) {
      if (data) {
        this.linkTo(`/sales/salesreturnadd?ids=${data}`)
      }
      this.visible.show = false
    },
    // 是否可以跳转打托入库
    async isCanGo(id) {
      const res = await isOutdepotReport({ id })
      if (res.data.code === '00') { // 可以跳转到出库打托
        this.linkTo(`/sales/deliveryorder?id=${id}`)
      } else {
        this.$errorMsg(res.data.message)
      }
    }
  }
}
</script>
