<template>
<!-- 预申报单列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.buId" placeholder="请选择" clearable :data-list="getSelectBeanByUserId('buList')" >
                <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客户：" prop="customerId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.customerId" placeholder="请选择" clearable filterable :data-list="getCustomerByMerchantId('kuhuList', { cusType: 1, merchantId: getUserInfo().merchantId, begin: 0, pageSize: 10000 }, { 'key': 'id', 'value': 'name' })" >
                <el-option v-for="item in selectOpt.kuhuList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.status" placeholder="请选择" clearable  >
                <el-option label="待审核" value="0"></el-option>
                <el-option label="已审核" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20">
      <el-col :span="24" >
        <el-button type="primary" :size="'small'" @click="openAdd" v-permission="'customerList_add'">新增</el-button>
        <el-button type="primary" :size="'small'" @click="dele" v-permission="'customerList_dele'">删除</el-button>
      </el-col>
    </el-row>
    <div class="mr-t-20"></div>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table
      :tableData.sync="tableData"
      @selection-change="selectionChange"
      @change="getList"
    >
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column prop="buName" label="事业部" align="center" min-width="140" show-overflow-tooltip></el-table-column>
      <el-table-column prop="customerName" label="客户" align="center" min-width="130" show-overflow-tooltip></el-table-column>
      <el-table-column label="客户额度" align="center" min-width="90">
        <template slot-scope="scope">
          {{scope.row.currency}} {{numberFormat(scope.row.customerQuota)}}
        </template>
      </el-table-column>
      <el-table-column prop="typeLabel" label="生效日期" align="center" min-width="110">
        <template slot-scope="scope">
           {{scope.row.effectiveDate ? scope.row.effectiveDate.substring(0, 10) : ''}}
        </template>
      </el-table-column>
      <el-table-column prop="typeLabel" label="失效日期" align="center" min-width="110">
        <template slot-scope="scope">
          {{scope.row.expirationDate ? scope.row.expirationDate.substring(0, 10) : ''}}
        </template>
      </el-table-column>
      <el-table-column prop="createName" label="创建人" align="center" min-width="110"></el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center" min-width="140"></el-table-column>
      <el-table-column prop="auditName" label="审核人" align="center" min-width="110"></el-table-column>
      <el-table-column prop="auditDate" label="审核时间" align="center" min-width="140"></el-table-column>
      <el-table-column prop="statusLabel" label="状态" align="center" min-width="90"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="80">
        <template slot-scope="scope">
          <el-button type="text" @click="openEdit(scope.row)" v-if="scope.row.status === '0'" v-permission="'customerList_edit'">编辑</el-button>
          <el-button type="text" @click="openAdjust(scope.row)" v-if="scope.row.status === '1'" v-permission="'customerList_change'">调整额度</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 编辑 -->
    <edit :visible.sync="visible" v-if="visible.show" :targetData="targetData" @close="getList"></edit>
    <!-- 编辑 end-->
    <!-- 额度调整 -->
    <adjust-quota :visible.sync="adjustVisible" v-if="adjustVisible.show" :targetData="targetData" type="customer" @close="getList"></adjust-quota>
    <!-- 额度调整 end-->
  </div>
</template>
<script>
import { listDTOByPage, delCustomerQuotaConfigDTO } from '@a/limitPositionManage/index'
import { numberFormat } from '@u/tool'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    edit: () => import('./components/customerEdit'),
    adjustQuota: () => import('./components/adjustQuota')
  },
  data() {
    return {
      ruleForm: {
        customerId: '',
        buId: '',
        status: ''
      },
      visible: { show: false },
      targetData: {},
      adjustVisible: { show: false }
    }
  },
	mounted() {
		this.getList()
	},
  methods: {
    numberFormat,
		async getList(pageNum) {
      try {
        this.tableData.loading = true
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await listDTOByPage(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
		dele() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
			this.$confirm('确认删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
        this.tableData.loading = true
        try {
          const ids = this.tableChoseList.map(item => item.id).toString()
          await delCustomerQuotaConfigDTO({ ids })
          this.$successMsg('删除成功')
          this.getList()
        } catch (error) {
          console.log(error)
        }
        this.tableData.loading = false
			})
    },
    // 打开新增
    openAdd() {
      this.targetData = {}
      this.visible.show = true
    },
    // 打开编辑
    openEdit(row) {
      this.targetData = row
      this.visible.show = true
    },
    openAdjust(row) {
      this.targetData = row
      this.adjustVisible.show = true
    },
    resetForm() {
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    filterPurchaseCode(row) {
      let html = row.purchaseCode ? row.purchaseCode : ''
      if (row.poNo) {
        html += ('<br />' + 'PO:' + row.poNo)
      }
      return html
    },
    filterAmount(row) {
      let currency = ''
      let amount = ''
      if (row.amount) {
        amount = row.amount
        currency = row.currency ? row.currency : ''
      }
      let html = currency + ' '
      html += amount
      return html
    },
    filterSdAmount(row) {
      let tgtCurrency = ''
      let sdAmount = ''
      if (row.sdAmount) {
        sdAmount = row.sdAmount
        tgtCurrency = row.tgtCurrency ? row.tgtCurrency : ''
      }
      let html = tgtCurrency + ' '
      html += sdAmount
      return html
    },
    selectable(data) {
      return +data.status === 0
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
