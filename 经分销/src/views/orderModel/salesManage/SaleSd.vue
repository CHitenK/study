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
            <el-form-item label="上架单号：" prop="shelfCode" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.shelfCode" placeholder="请输入" clearable />
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
            <el-form-item label="PO单号：" prop="poNo" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.poNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="销售SD单号：" prop="code" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="SD类型：" prop="sdTypeId" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.sdTypeId"
                         placeholder="请选择"
                         :data-list="getSelectSDlist('saleOrder_stateList')"
                         filterable
                         clearable>
                <el-option
                  v-for="item in selectOpt.saleOrder_stateList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="销售单号：" prop="saleOrderCode" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.saleOrderCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date" label="上架日期：">
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
        <el-button type="primary"
                   v-permission="'sale_salesd_export'"
                   @click="exportList">导出</el-button>
        <el-button type="primary"
                   v-permission="'sale_salesd_del'"
                   @click="deleteTableItem">删除</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               showSelection
               @selection-change="selectionChange"
               @change="getList">
      <template slot="action" slot-scope="{row}">
        <el-button type="text"
                   v-permission="'sale_salesd_detail'"
                   @click="linkTo(`/sales/SaleSdDetail?id=${row.id}`)">查看</el-button>
        <el-button type="text"
                   v-permission="'sale_salesd_edit'"
                   @click="showModal('saleSdEditModal', row.id)">修改</el-button>
      </template>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 修改SD金额 -->
    <SaleSdEditModal v-if="saleSdEditModal.visible.show"
                     :saleSdEditModalVisible="saleSdEditModal.visible"
                     :id="saleSdEditModal.id"
                     @comfirm="closeModal('saleSdEditModal')"
    ></SaleSdEditModal>
    <!-- 修改SD金额 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  listSaleSD,
  exportSaleSdOrderUrl,
  getSaleSdCount,
  delSaleSdOrder
} from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  components: {
    // 修改SD金额
    SaleSdEditModal: () => import('./components/SaleSdEditModal')
  },
   data() {
    return {
      // 查询数据
      searchProps: {
        buId: '',
        shelfCode: '',
        customerId: '',
        poNo: '',
        code: '',
        sdTypeId: '',
        saleOrderCode: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '销售SD单号', prop: 'code', minWidth: '140', align: 'center', hide: true },
        { label: '销售订单号', prop: 'saleOrderCode', minWidth: '140', align: 'center', hide: true },
        { label: '事业部', prop: 'buName', minWidth: '120', align: 'center', hide: true },
        { label: 'PO号', prop: 'poNo', minWidth: '120', align: 'center', hide: true },
        { label: '客户', prop: 'customerName', minWidth: '120', align: 'center', hide: true },
        { label: 'SD类型', prop: 'sdTypeName', width: '100', align: 'center', hide: true },
        { label: 'SD金额', prop: 'totalSdAmount', width: '100', align: 'center', hide: true },
        { label: '上架日期', prop: 'shelfDate', width: '150', align: 'center', hide: true },
        { label: '操作', slotTo: 'action', width: '110', align: 'left' }
      ],
      // 上架日期
      date: [],
      // 修改SD金额组件状态
      saleSdEditModal: {
        id: '',
        visible: { show: false }
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
      // 订单日期
      this.searchProps.startShelfDate = this.date && this.date.length ? this.date[0] : ''
      this.searchProps.endShelfDate = this.date && this.date.length ? this.date[1] : ''
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await listSaleSD({
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
    // 导出
    async exportList() {
      if (this.tableData.total < 1) {
        return this.$errorMsg('暂无数据可导出')
      }
      try {
        if (this.tableChoseList.length) {
          this.$showToast('确定导出勾选数据？', async() => {
            const ids = this.tableChoseList.map(item => item.id).toString()
            this.$exportFile(exportSaleSdOrderUrl, { ids })
          })
        } else {
          const { data } = await getSaleSdCount({ ...this.searchProps })
          if (data > 10000) {
            return this.$errorMsg('导出的数量过大，请填写筛选条件再导出')
          }
          this.$exportFile(exportSaleSdOrderUrl, { ...this.searchProps })
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 删除表格项
    deleteTableItem() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      this.$showToast('确定删除数据？', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await delSaleSdOrder({ ids })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 显示弹窗
    showModal(type, data) {
      switch (type) {
        // 修改SD金额
        case 'saleSdEditModal':
          this.saleSdEditModal.visible.show = true
          this.saleSdEditModal.id = data + ''
          break
      }
    },
    // 关闭弹窗
    closeModal(type) {
      switch (type) {
        // 修改SD金额
        case 'saleSdEditModal':
          this.saleSdEditModal.visible.show = false
          this.saleSdEditModal.id = ''
          break
      }
      this.getList()
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
