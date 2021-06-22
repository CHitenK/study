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
            <el-form-item  label="采购退货单号："  prop="code" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.code" clearable placeholder="请输入"></el-input>
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
            <el-form-item label="供应商：" prop="supplierId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.supplierId" placeholder="请选择" filterable clearable :data-list="getSupplierList('suppList')" >
                <el-option v-for="item in selectOpt.suppList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="PO号：" prop="poNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.poNo" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="单据状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.status" placeholder="请选择" clearable :data-list="getSelectList('purchaseReturnOrder_statusList')" >
                <el-option v-for="item in selectOpt.purchaseReturnOrder_statusList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
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
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="关联采购单号：" prop="purchaseOrderRelCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.purchaseOrderRelCode" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item label="创建时间：">
              <el-date-picker
                clearable
                v-model="date"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                style="width: 60%"
                end-placeholder="结束日期">
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
        <el-button type="primary" :size="'small'" @click="visible.show=true" v-permission="'purchase_return_add'" >新增</el-button>
        <el-button type="primary" :size="'small'" @click="dele" v-permission="'purchase_return_del'">删除</el-button>
        <el-button type="primary" :size="'small'" @click="exportExcel" v-permission="'purchase_return_export'">导出</el-button>
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
      <el-table-column prop="code" label="采购退货订单号" align="center" min-width="180"></el-table-column>
      <el-table-column prop="purchaseOrderRelCode" label="关联采购单号" align="center" min-width="180"></el-table-column>
      <el-table-column prop="outDepotName" label="出仓仓库" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="buName" label="事业部" align="center" min-width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="merchantName" label="公司" align="center" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column prop="poNo" label="PO号" align="center" min-width="110" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="supplierName" label="供应商" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center"  width="140" ></el-table-column>
      <el-table-column prop="statusLabel" label="单据状态" align="center" min-width="90" ></el-table-column>
      <el-table-column label="操作" align="left" fixed="right" :width="btnsWidth" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === '001'" type="text" @click="linkTo('/purchase/returnGoodsEdit/edit?id=' + scope.row.id )" v-permission="'purchase_return_edit'">编辑</el-button>
          <el-button v-if="+scope.row.isOutDepotAble === 1" type="text" @click="linkTo('/purchase/outWarehouse?id=' + scope.row.id )" v-permission="'purchase_return_outDepot'">打托出库</el-button>
          <el-button type="text" @click="linkTo('/purchase/returnGoodsDetail?id=' + scope.row.id )" v-permission="'purchase_return_details'">详情</el-button>
          <span v-if="!tableData.loading" v-count-width="{widthArr: [60, scope.row.status ==='001' ? 30 : 0, +scope.row.isOutDepotAble === 1 ? 50 : 0 ], callback: countWidth }"></span>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 选择单据 -->
    <chose-bill :visible.sync="visible" v-if="visible.show" @comfirm="addComfrim"></chose-bill>
    <!-- 选择单据 -->
  </div>
</template>
<script>
import { listPurchaseReturnOrder, delPurchaseReturnOrder, exportPurchaseReturnUrl } from '@a/purchaseManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    choseBill: () => import('./components/choseBill')
  },
  data() {
    return {
      ruleForm: {
        code: '',
        outDepotId: '',
        supplierId: '',
        poNo: '',
        status: '',
        buId: '',
        createStartDate: '',
        createEndDate: '',
        purchaseOrderRelCode: ''
      },
      date: '',
      visible: { show: false }
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
        this.ruleForm.createStartDate = this.date && this.date.length > 0 ? this.date[0] + ' 00:00:00' : ''
        this.ruleForm.createEndDate = this.date && this.date.length > 0 ? this.date[1] + ' 23:58:59' : ''
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await listPurchaseReturnOrder(opt)
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
      let flag = true
      for (let i = 0; i < this.tableChoseList.length; i++) {
        const { code, status } = this.tableChoseList[i]
        if (status !== '001') {
          this.$errorMsg('采购退货单号: ' + code + '不是“待审核”状态!')
          flag = false
          break
        }
      }
      if (!flag) return false
			this.$confirm('确定删除选中对象？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
				await delPurchaseReturnOrder({ ids })
        this.$successMsg('删除成功')
        this.getList()
			})
    },
    resetForm() {
      this.date = ''
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    selectable(data) {
      return data.status === '001'
    },
    // 导出
    exportExcel() {
      if (this.tableData.total < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      var opt = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.ruleForm
      }
      if (this.tableChoseList.length > 0) {
        const ids = this.tableChoseList.map(item => item.id).toString()
        opt = { ids }
      }
      this.$exportFile(exportPurchaseReturnUrl, opt)
    },
    addComfrim(data) {
      this.visible.show = false
      this.linkTo('/purchase/returnGoodsEdit/add?ids=' + data.ids + '&code=' + data.code, '新增采购退货订单')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
