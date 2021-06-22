<template>
  <div>
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'1000px'"
      :title="'确认同步'"
      :btnAlign="'center'"
      top="6vh"
    >
      <div class="company-page">
        <div :span="24"  class="mr-t-10 mr-b-10 fs-14 clr-II">确认将本次开票应收信息同步至NC：</div>
        <!-- 表格 -->
        <JFX-table
          :tableData.sync="tableData"
          :tableHeight="'420px'"
          :showPagination="false"
          :showSummary="true"
          :summaryMethod="null"
        >
          <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
          <el-table-column label="账单编号" align="center" min-width="120">
            <template slot-scope="scope">
              {{scope.row.billCode}}
            </template>
          </el-table-column>
          <el-table-column label="事业部" align="center" min-width="120">
            <template slot-scope="scope">{{scope.row.buName}}</template>
          </el-table-column>
          <el-table-column label="结算类型" align="center" min-width="100">
            <template slot-scope="scope">{{scope.row.settlementTypeLabel}}</template>
          </el-table-column>
          <el-table-column label="销售模式" align="center" min-width="100">
            <template slot-scope="scope">{{scope.row.saleModelLabel}}</template>
          </el-table-column>
          <el-table-column label="母品牌" align="center" min-width="120">
            <template slot-scope="scope">{{scope.row.parentBrandName}}</template>
          </el-table-column>
          <el-table-column prop="paymentSubjectName" label="收支项目名称" align="center" min-width="120"></el-table-column>
          <el-table-column prop="price" label="应收金额" align="center" min-width="100">
            <template slot-scope="scope">
              {{scope.row.price || 0}}
            </template>
          </el-table-column>
        </JFX-table>
        <!-- 表格 end-->
      </div>
    </JFX-Dialog>
  </div>
</template>
<script>
import commomMix from '@m/index'
import { listReceiveBillsToNC, toCsynNC } from '@a/receiveMoneyManage/index'
export default {
  mixins: [commomMix],
  props: {
    visible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    ids: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      detail: {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async comfirm() {
      if (this.tableData.loading) return false
      this.tableData.loading = true
      try {
        await toCsynNC({ ids: this.ids })
        this.$successMsg('操作成功')
        this.$emit('close')
        this.visible.show = false
      } catch (error) {
        console.log(error)
      }
      this.tableData.loading = false
    },
    async getList() {
      const res = await listReceiveBillsToNC({ ids: this.ids })
      this.tableData.list = res.data || []
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
