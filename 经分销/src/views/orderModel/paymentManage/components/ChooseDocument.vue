<template>
  <!-- 选择单据组件 -->
  <div>
    <JFX-Dialog
      :visible.sync="selectDocumentVisible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'1000px'"
      :title="'选择采购单'"
      :btnAlign="'center'"
      :confirmBtnLoading="confirmBtnLoading"
      top="15vh"
    >
      <JFX-search-panel @reset="resetForm" @search="getList(1)" style="margin-top:0;">
        <el-form :model="searchProps" ref="searchForm">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="采购单号：" prop="codes" class="search-panel-item fs-14 clr-II" >
                <el-input v-model="searchProps.codes"
                          type="textarea"
                          :autosize="{ minRows: 1, maxRows: 5 }"
                          clearable
                          placeholder="多单号用&字符或换行隔开" style="width: 220px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="PO号："  prop="poNos" class="search-panel-item fs-14 clr-II" >
                <el-input v-model="searchProps.poNos"
                          type="textarea"
                          :autosize="{ minRows: 1, maxRows: 5 }"
                          clearable placeholder="多PO用&字符或换行隔开"
                          style="width: 220px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="供应商：" prop="supplierId" class="search-panel-item fs-14 clr-II">
                <el-select v-model="searchProps.supplierId"
                           style="width: 220px;"
                           placeholder="请选择"
                           :data-list="getSupplierList('supplier_list')"
                           filterable
                           clearable>
                  <el-option
                    v-for="item in selectOpt.supplier_list"
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
      <el-row class="mr-t-20">
        <el-col :span="24" class="mr-t-10">
          <JFX-table :tableData.sync="tableData"
                     :tableColumn="tableColumn"
                     showSelection
                     ref="rootTable"
                     @selection-change="selectionChange"
                     @change="getList">
            <template slot="amount" slot-scope="{row}">
              {{(row.currency || '') + ' ' + (row.goodsAmount || '0')}}
            </template>
          </JFX-table>
        </el-col>
      </el-row>
    </JFX-Dialog>
  </div>
</template>

<script>
import {
  listPurchaseOrder,
  paymentBillListPurchaseOrder,
  checkDataBill,
  paymentBillCheckData
} from '@a/paymentManage'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    selectDocumentVisible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    // 1、预付款单 2、应付账单
    selectType: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      // 查询数据
      searchProps: {
        codes: '',
        poNos: '',
        supplierId: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '采购订单号', prop: 'code', minWidth: '120', align: 'center', hide: true },
        { label: '事业部', prop: 'buName', minWidth: '120', align: 'center', hide: true },
        { label: 'PO号', prop: 'poNo', minWidth: '120', align: 'center', hide: true },
        { label: '供应商', prop: 'supplierName', minWidth: '120', align: 'center', hide: true },
        { label: '采购总金额', slotTo: 'amount', minWidth: '120', align: 'center', hide: true }
      ],
      // 提交按钮loading
      confirmBtnLoading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取表格数据
		async getList(pageNum) {
      const { selectType } = this
      let listData = {}
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
        const params = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        }
        if (selectType === '1') {
          const { data } = await listPurchaseOrder(params)
          listData = data
        } else {
          const { data } = await paymentBillListPurchaseOrder(params)
          listData = data
        }
				this.tableData.list = listData ? listData.list : []
        this.tableData.total = listData ? listData.total : 0
			} catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.tableData.loading = false
      }
    },
    // 表格多选方法
    selectionChange(rows) {
      // 币种集合
      const currencys = rows.map(item => item.currency)
      // 供应商集合
      const supplierNames = rows.map(item => item.supplierName)
      // 事业部集合
      const buNames = rows.map(item => item.buName)
      // 非相同币种 + 相同事业部 + 相同供应商不能选择
      if ([...new Set(currencys)].length >= 2 || [...new Set(supplierNames)].length >= 2 || [...new Set(buNames)].length >= 2) {
        this.$errorMsg('只能选择相同币种 + 相同事业部 + 相同供应商的单据')
        // 清空选项
        this.$refs['rootTable'].$refs['el-table'].clearSelection()
        this.tableChoseList = []
        return false
      }
      this.tableChoseList = rows
    },
    // 提交
    async comfirm() {
      if (!this.tableChoseList.length) {
        return this.$emit('comfirm')
      }
      try {
        this.confirmBtnLoading = true
        const { selectType } = this
        const ids = this.tableChoseList.map(item => item.id).toString()
        // 校验是否是同供应商+同事业部+同币种
        if (selectType === '1') {
          await checkDataBill({ ids })
          this.linkTo(`/payment/AdvancePaymentAdd?ids=${ids}`)
        } else {
          await paymentBillCheckData({ ids })
          this.linkTo(`/payment/BillsPayableAdd?ids=${ids}`)
        }
        this.$emit('comfirm')
      } catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.confirmBtnLoading = false
      }
    },
    // 重置搜索栏
    resetForm() {
      this.reset('searchForm', () => {
        this.getList(1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer{
  height: 30px;
  margin-top: -30px;
}
</style>
