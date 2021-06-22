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
            <el-form-item  label="采购订单编号："  prop="purchaseOrderCode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.purchaseOrderCode" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="PO号：" prop="poNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.poNo" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.buId" placeholder="请选择" clearable filterable :data-list="getBUSelectBean('buList')" >
                <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
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
            <el-form-item  label="发票号码：" prop="invoiceNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.invoiceNo" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="开票人：" prop="payName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.payName" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <div class="mr-t-20"></div>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table
      :tableData.sync="tableData"
      @change="getList"
    >
      <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
      <el-table-column prop="purchaseOrderCode" label="采购订单编号" align="center" min-width="180"></el-table-column>
      <el-table-column prop="poNo" label="PO号" align="center" min-width="180"></el-table-column>
      <el-table-column prop="buName" label="事业部" align="center" min-width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="supplierName" label="供应商" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="invoiceDate" label="收到发票日期" align="center"  min-width="110">
        <template slot-scope="scope">
          {{scope.row.invoiceDate ? scope.row.invoiceDate.substring(0, 10) : '- -'}}
        </template>
      </el-table-column>
      <el-table-column prop="invoiceNo" label="发票号码" align="center" min-width="120"></el-table-column>
      <el-table-column prop="drawInvoiceDate" label="发票日期" align="center"  min-width="110">
        <template slot-scope="scope">
          {{scope.row.drawInvoiceDate ? scope.row.drawInvoiceDate.substring(0, 10) : '- -'}}
        </template>
      </el-table-column>
      <el-table-column prop="payName" label="开票人" align="center" min-width="110" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="paymentDate" label="预计付款日期" align="center"  width="110" >
        <template slot-scope="scope">
          {{scope.row.paymentDate ? scope.row.paymentDate.substring(0, 10) : '- -'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="left" fixed="right" :width="btnsWidth" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" @click="linkTo('/purchase/invoiceDetail?id=' + scope.row.id )" v1-permission="'invoiceList_detail'">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { purchaseInvoiceList } from '@a/purchaseManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    choseBill: () => import('./components/choseBill')
  },
  data() {
    return {
      ruleForm: {
        payName: '',
        invoiceNo: '',
        purchaseOrderCode: '',
        supplierId: '',
        poNo: '',
        buId: ''
      },
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
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await purchaseInvoiceList(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
    resetForm() {
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
