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
            <el-form-item  label="采购退货单号："  prop="purchaseReturnCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.purchaseReturnCode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="出仓仓库：" prop="outDepotId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.outDepotId" placeholder="请选择" filterable clearable :data-list="getSelectBeanByMerchantRel('outDepotList')" >
                <el-option v-for="item in selectOpt.outDepotList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="出库清单号：" prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.code" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="PO号：" prop="poNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.poNo" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="单据状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.status" placeholder="请选择" clearable :data-list="getSelectList('purchaseReturnOrderOdepot_statusList')" >
                <el-option v-for="item in selectOpt.purchaseReturnOrderOdepot_statusList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="供应商：" prop="supplierId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.supplierId" placeholder="请选择" filterable clearable :data-list="getSupplierList('suppList')">
                <el-option v-for="item in selectOpt.suppList" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.buId" placeholder="请选择" filterable clearable :data-list="getBUSelectBean('buList')" >
                <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item label="出库时间：">
              <el-date-picker
                clearable
                v-model="date"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20">
      <el-col :span="24" >
        <el-button type="primary" :size="'small'" @click="importFile" v-permission="'purchase_return_odepot_import'" >导入</el-button>
        <el-button type="primary" :size="'small'" @click="exportExcel" v-permission="'purchase_return_odepot_export'">导出</el-button>
        <el-button type="primary" :size="'small'" @click="examine" v-permission="'purchase_return_odepot_audit'">审核</el-button>
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
      <el-table-column type="selection" align="center" width="55" :selectable="selectable"></el-table-column>
      <el-table-column prop="code" label="出库清单号" align="center" min-width="180"></el-table-column>
      <el-table-column prop="poNo" label="PO号" align="center" min-width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="outDepotName" label="出仓仓库" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="buName" label="事业部" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="merchantName" label="公司" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="supplierName" label="供应商" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="purchaseReturnCode" label="采购退货订单号" align="center"  min-width="150" ></el-table-column>
      <el-table-column prop="returnOutDate" label="出库时间" align="center"  min-width="100" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="statusLabel" label="单据状态" align="center"  min-width="80" ></el-table-column>
      <el-table-column label="操作" align="left" fixed="right" width="60">
        <template slot-scope="scope">
          <el-button type="text" @click="linkTo('/purchase/exWarehouseDetail?id=' + scope.row.id )" v-permission="'purchase_return_odepot_details'">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { listPurchaseReturnOdepot, exportPurchaseReturnOdepotUrl, importOrderUrl, auditPurchaseReturnOrder } from '@a/purchaseManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        purchaseReturnCode: '',
        outDepotId: '',
        code: '',
        poNo: '',
        status: '',
        supplierId: '',
        buId: '',
        returnOutStartDate: '',
        returnOutEndDate: ''
      },
      date: ''
    }
	},
	mounted() {
		this.getList(1)
	},
  activated() {
    this.getList()
  },
  methods: {
		async getList(pageNum) {
      try {
        this.tableData.loading = true
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.ruleForm.returnOutStartDate = this.date && this.date.length > 0 ? this.date[0] : ''
        this.ruleForm.returnOutEndDate = this.date && this.date.length > 0 ? this.date[1] : ''
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await listPurchaseReturnOdepot(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
    resetForm() {
      this.date = ''
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    // 导出
    exportExcel() {
      if (this.tableData.total < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      const opt = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.ruleForm
      }
      this.$exportFile(exportPurchaseReturnOdepotUrl, opt)
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 133 + '&url=' + importOrderUrl)
    },
    // 审核
    examine() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      this.$confirm('确定审核选中对象', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await auditPurchaseReturnOrder({ ids })
          this.$successMsg('操作成功')
          this.getList()
        } catch (err) {
          console.log(err)
        }
      })
    },
    selectable(data) {
      return data.status === '001'
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
