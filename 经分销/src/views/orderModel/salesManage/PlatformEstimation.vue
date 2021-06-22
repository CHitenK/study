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
            <el-form-item label="外部交易单号：" prop="externalCode" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.externalCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="平台：" prop="storePlatformCode" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.storePlatformCode"
                         placeholder="请选择"
                         :data-list="getSelectList('storePlatformList')"
                         filterable
                         clearable>
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
            <el-form-item label="电商订单号：" prop="orderCode" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.orderCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="暂估费用单号：" prop="code" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.code" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date" label="发货日期：">
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
                   v-permission="'sale_estimation_export'"
                   @click="exportList">导出</el-button>
        <el-button type="primary"
                   v-permission="'sale_estimation_del'"
                   @click="deleteTableItem">删除</el-button>
        <el-button type="primary"
                   v-permission="'sale_estimation_create'"
                   @click="showModal('createEstimation')">生成暂估费用单</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               showSelection
               @selection-change="selectionChange"
               @change="getList">
      <template slot="sumAmount" slot-scope="{row}">
        {{(row.currency || '') + ' ' + (row.sumAmount || '0')}}
      </template>
      <template slot="action" slot-scope="{row}">
        <el-button type="text"
                   v-permission="'sale_estimation_detail'"
                   @click="linkTo(`/sales/PlatformEstimationDetail?id=${row.id}`)">查看</el-button>
        <el-button type="text"
                   v-permission="'sale_estimation_edit'"
                   @click="showEditModal(row.id)">修改</el-button>
      </template>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 修改SD金额 -->
    <PlatformEstimationEdit v-if="platformEstimation.visible.show"
                            :platformEstimationVisible="platformEstimation.visible"
                            :id="platformEstimation.id"
                            @comfirm="closeModal('platformEstimation')"
    ></PlatformEstimationEdit>
    <!-- 修改SD金额 end -->
    <JFX-Dialog
      closeBtnText="取 消"
      title="触发生成月份"
      :width="'400px'"
      :top="'20vh'"
      :showClose="true"
      :visible.sync="createEstimation.visible"
      @comfirm="handleCreateEstimation"
    >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" style="padding: 0 0 10px 10px;">
        <el-form-item label="发货月份：" prop="month" >
          <el-date-picker
            v-model="ruleForm.month"
            type="month"
            placeholder="请选择"
            style="width: 203px"
            value-format="yyyy-MM"
          />
        </el-form-item>
      </el-form>
    </JFX-Dialog>
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  listPlatformTemporaryOrder,
  deletePlatformTemporaryOrder,
  exportPlatFormTemporaryUrl,
  checkPlatformTemporaryOrder,
  savePlatCostOrder
} from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  components: {
    // 修改平台暂估费用单
    PlatformEstimationEdit: () => import('./components/PlatformEstimationEdit')
  },
   data() {
    return {
      // 查询数据
      searchProps: {
        externalCode: '',
        storePlatformCode: '',
        orderCode: '',
        code: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '暂估费用单号', prop: 'code', minWidth: '140', align: 'center', hide: true },
        { label: '外部交易单号', prop: 'externalCode', minWidth: '140', align: 'center', hide: true },
        { label: '电商订单号', prop: 'orderCode', minWidth: '120', align: 'center', hide: true },
        { label: '平台', prop: 'storePlatformName', minWidth: '120', align: 'center', hide: true },
        { label: '店铺名称', prop: 'shopName', minWidth: '120', align: 'center', hide: true },
        { label: '发货日期', prop: 'deliverDate', width: '150', align: 'center', hide: true },
        { label: '暂估费用金额', slotTo: 'sumAmount', width: '130', align: 'center', hide: true },
        { label: '操作', slotTo: 'action', width: '110', align: 'left' }
      ],
      // 发货日期
      date: [],
      // 修改SD金额组件状态
      platformEstimation: {
        id: '',
        visible: { show: false }
      },
      ruleForm: {
        month: ''
      },
      createEstimation: {
        id: '',
        visible: { show: false }
      },
      rules: {
        month: { required: true, message: '请选择发货月份', trigger: 'change' }
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
      // 发货日期
      this.searchProps.deliverStartDate = this.date && this.date.length ? this.date[0] : ''
      this.searchProps.deliverEndDate = this.date && this.date.length ? this.date[1] : ''
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await listPlatformTemporaryOrder({
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
            this.$exportFile(exportPlatFormTemporaryUrl, { ids })
          })
        } else {
          this.$exportFile(exportPlatFormTemporaryUrl, { ...this.searchProps })
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    async showEditModal(id) {
      try {
        await checkPlatformTemporaryOrder({ id })
        this.showModal('platformEstimation', id)
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
          await deletePlatformTemporaryOrder({ ids })
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
        case 'platformEstimation':
          this.platformEstimation.visible.show = true
          this.platformEstimation.id = data + ''
          break
        case 'createEstimation':
          this.createEstimation.visible.show = true
          // this.createEstimation.id = this.tableChoseList[0].id
          break
      }
    },
    // 关闭弹窗
    closeModal(type) {
      switch (type) {
        // 修改SD金额
        case 'platformEstimation':
          this.platformEstimation.visible.show = false
          this.platformEstimation.id = ''
          break
      }
      this.getList()
    },
    handleCreateEstimation() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          try {
            await savePlatCostOrder({
              // id: this.createEstimation.id,
              month: this.ruleForm.month
            })
            this.createEstimation.visible.show = false
            // this.createEstimation.id = ''
            this.$successMsg('操作成功')
          } catch (error) {
            this.$errorMsg(error.message)
          }
        }
      })
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
