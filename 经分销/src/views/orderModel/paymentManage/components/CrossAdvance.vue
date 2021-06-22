<template>
  <div>
    <JFX-Dialog
      :visible.sync="crossAdvanceVisible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'1000px'"
      :title="'勾稽预付款单'"
      :btnAlign="'center'"
      :confirmBtnLoading="confirmBtnLoading"
      top="15vh"
    >
      <el-row :gutter="10" class="fs-14 clr-II detail-row">
        <el-col :span="12">
          事业部：{{detail.buName || '- -'}}
        </el-col>
        <el-col :span="12">
          结算币种：{{detail.currency || '- -'}}
        </el-col>
        <el-col :span="24" class="mr-t-15">
          供应商：{{detail.supplierName || '- -'}}
        </el-col>
      </el-row>
      <el-row class="company-page mr-t-15">
        <el-col :span="24">
          <JFX-table :tableData.sync="tableData"
                     :tableColumn="tableColumn"
                     :showPagination="false"
                     showSelection
                     @selection-change="selectionChange">
          </JFX-table>
        </el-col>
      </el-row>
    </JFX-Dialog>
  </div>
</template>
<script>
import {
  getVeriAdvancePaymentList
} from '@a/paymentManage'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    crossAdvanceVisible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 详情
      detail: {},
      // 表格列数据
      tableColumn: [
        { label: '预付款单号', prop: 'relCode', minWidth: '120', align: 'center', hide: true },
        { label: '采购订单号', prop: 'purchaseCode', minWidth: '120', align: 'center', hide: true },
        { label: '预付款金额', prop: 'prepaymentAmount', minWidth: '120', align: 'center', hide: true },
        { label: '待核销金额', prop: 'verificateAmount', minWidth: '120', align: 'center', hide: true }
      ],
      // 附件列表
      attachmenList: [],
      // 附件上传url
      action: '',
      // 提交按钮loading
      confirmBtnLoading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      try {
        this.detail = this.data
        const { buId = '', supplierId = '', currency = '' } = this.detail
				const { data: { list } } = await getVeriAdvancePaymentList({ buId, supplierId, currency })
				this.tableData.list = list
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    async comfirm() {
      try {
        this.confirmBtnLoading = true
        if (!this.tableChoseList.length) {
          this.$emit('comfirm')
        } else {
          this.$emit('comfirm', this.tableChoseList)
        }
      } catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.confirmBtnLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer{
  height: 30px;
  margin-top: -30px;
}
.company-page{
  width: 100%;
  margin-bottom: 10px;
}
</style>
