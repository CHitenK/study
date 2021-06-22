<template>
  <!-- 同步nc组件 -->
  <div>
    <JFX-Dialog
      :visible.sync="synchronousNcVisible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'1000px'"
      :title="'同步确认'"
      :btnAlign="'center'"
      :confirmBtnLoading="confirmBtnLoading"
      top="15vh"
    >
      <el-row :gutter="10" class="fs-14 clr-II">
        <el-col :span="24">
          确认将本次开票应收信息同步至NC：
        </el-col>
      </el-row>
      <el-row class="company-page mr-t-10">
        <el-col :span="24" class="mr-t-10">
          <!-- 表格 -->
          <JFX-table :tableData.sync="tableData"
                     :tableColumn="tableColumn"
                     :summary-method="summaryMethod"
                     showSummary
                     :showPagination="false">
            <template slot="amount" slot-scope="{row}">
              {{`${row.amount || 0}`}}
            </template>
          </JFX-table>
        </el-col>
      </el-row>
    </JFX-Dialog>
  </div>
</template>
<script>
import {
  paymentBillPrinting,
  synNC
} from '@a/paymentManage'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    synchronousNcVisible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ruleForm: {
        invalidRemark: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '账单编号', prop: 'index', width: '70', align: 'center', hide: true },
        { label: '摘要', prop: 'abstractName', minWidth: '120', align: 'center', hide: true },
        { label: '母品牌', prop: 'superiorParentBrandName', minWidth: '120', align: 'center', hide: true },
        { label: '收支项目', prop: 'ncName', minWidth: '120', align: 'center', hide: true },
        { label: '应付金额', slotTo: 'amount', width: '100', align: 'center', hide: true }
      ],
      confirmBtnLoading: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id } = this
      const { data: { printSummaryList } } = await paymentBillPrinting({ id })
      if (printSummaryList && printSummaryList.length) {
        this.tableData.list = printSummaryList
      }
    },
    async comfirm() {
      const { id } = this
      try {
        this.confirmBtnLoading = true
        await synNC({ id })
        this.$successMsg('已将应收信息同步至NC结算中转层，请知悉！')
        this.$emit('comfirm')
      } catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.confirmBtnLoading = false
      }
    },
    // 合计方法
    summaryMethod({ data }) {
      const sums = []
      let amounts = 0
      data.forEach(item => {
        amounts += item.amount ? +item.amount : 0
      })
      sums[0] = '合计'
      sums[4] = (+amounts).toFixed(2)
      return sums
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
