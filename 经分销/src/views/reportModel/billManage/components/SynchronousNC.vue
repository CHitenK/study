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
      <template slot="dialog-footer">
        <el-button type="primary" @click="exportList">导出</el-button>
        <el-button type="primary" @click="handleSynNc">同步</el-button>
        <el-button @click="$emit('comfirm')">取消</el-button>
      </template>
    </JFX-Dialog>
  </div>
</template>
<script>
import {
  listReceiveBillsToNC,
  exportBillNcUrl,
  synNC
} from '@a/reportManage'
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
      // 表格列数据
      tableColumn: [
        { label: '账单编号', prop: 'billCode', minWidth: '140', align: 'center', hide: true },
        { label: '事业部', prop: 'buName', minWidth: '120', align: 'center', hide: true },
        { label: '结算类型', prop: 'settlementTypeLabel', width: '80', align: 'center', hide: true },
        { label: '销售模式', prop: 'saleModelLabel', width: '80', align: 'center', hide: true },
        { label: '渠道', prop: 'ncChannelName', width: '80', align: 'center', hide: true },
        { label: '品牌', prop: 'parentBrandName', minWidth: '100', align: 'center', hide: true },
        { label: '收支项目名称', prop: 'paymentSubjectName', minWidth: '100', align: 'center', hide: true },
        { label: '应收金额', prop: 'price', width: '100', align: 'center', hide: true }
      ],
      confirmBtnLoading: false,
      // 同步nc
      synNc: {
        id: '',
        visible: { show: false }
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id } = this
      const { data } = await listReceiveBillsToNC({ id, dataSource: '2' })
      if (data && data.length) {
        this.tableData.list = data || []
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
      let prices = 0
      data.forEach(item => {
        prices += item.price ? +item.price : 0
      })
      sums[0] = '合计'
      sums[7] = (+prices).toFixed(2)
      return sums
    },
    // 导出
    exportList() {
      const ids = this.tableData.list.map(item => item.billId).toString()
      this.$exportFile(exportBillNcUrl, { ids })
    },
    // 同步NC
    async handleSynNc() {
      const { id } = this.$route.query
      try {
        await synNC({ id, dataSource: '2' })
        this.$successMsg('已将应收信息同步至NC结算中转层，请知悉！')
        this.$emit('comfirm')
      } catch (error) {
        this.$errorMsg(error.message)
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
