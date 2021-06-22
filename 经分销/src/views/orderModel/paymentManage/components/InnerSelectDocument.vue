<template>
  <div>
    <JFX-Dialog
      :visible.sync="selectDocumentVisible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'1000px'"
      :title="'选择业务单据'"
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
                          placeholder="多单号用&字符或换行隔开"
                          style="width: 220px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="PO号："  prop="poNos" class="search-panel-item fs-14 clr-II" >
                <el-input v-model="searchProps.poNos"
                          type="textarea"
                          :autosize="{ minRows: 1, maxRows: 5 }"
                          clearable
                          placeholder="多PO用&字符或换行隔开"
                          style="width: 220px;"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </JFX-search-panel>
      <el-row class="company-page mr-t-20">
        <el-col :span="24" class="mr-t-10">
          <!-- 表格 -->
          <JFX-table :tableData.sync="tableData"
                     :tableColumn="tableColumn"
                     showSelection
                     ref="rootTable"
                     @selection-change="selectionChange"
                     @change="getList">
            <template slot="amount" slot-scope="{row}">
              {{(row.currency || '') + ' ' + (row.goodsAmount || '')}}
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
  checkDataBill
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
    orderType: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => {}
    },
    codes: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchProps: {
        codes: '',
        poNos: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '采购订单号', prop: 'code', minWidth: '120', align: 'center', hide: true },
        { label: '事业部', prop: 'buName', minWidth: '120', align: 'center', hide: true },
        { label: 'PO号', prop: 'poNo', minWidth: '120', align: 'center', hide: true },
        { label: '供应商', prop: 'supplierName', minWidth: '120', align: 'center', hide: true },
        { label: '采购总金额', slotTo: 'amount', minWidth: '120', align: 'center', hide: true }
      ],
      confirmBtnLoading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取表格数据
		async getList(pageNum) {
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await listPurchaseOrder({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.data,
          ...this.searchProps
        })
				this.tableData.list = data ? data.list : []
        this.tableData.total = data ? data.total : 0
			} catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.tableData.loading = false
      }
    },
    // 提交
    async comfirm() {
      if (!this.tableChoseList.length) {
        return this.$emit('comfirm')
      }
      try {
        this.confirmBtnLoading = true
        const ids = this.tableChoseList.map(item => item.id).toString()
        await checkDataBill({ ids })
        this.$emit('comfirm', this.tableChoseList)
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
.company-page{
  width: 100%;
  margin-bottom: 10px;
  min-height: 200px;
}
.fen-pei-bx{
  margin-top: -30px;
  border-top: solid 1px #eaeaea;
  border-bottom: solid 1px #eaeaea;
  height: 80px;
}
.dialog-footer{
  height: 30px;
  margin-top: -30px;
}
</style>
