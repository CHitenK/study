<template>
  <div>
    <JFX-Dialog
      :visible.sync="writeOffVisible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'800px'"
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
      <el-row class="company-page mr-t-20">
        <el-col :span="24" class="mr-t-10">
          <!-- 表格 -->
          <JFX-table :tableData.sync="tableData"
                     :tableColumn="tableColumn"
                     :showPagination="false">
            <template slot="price" slot-scope="{row}">
              {{`${row.currency} ${row.price}`}}
            </template>
          </JFX-table>
        </el-col>
      </el-row>
    </JFX-Dialog>
  </div>
</template>
<script>
import {
  listAdvanceBillsToNC,
  synNC
} from '@a/receiveMoneyManage'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    writeOffVisible: {
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
        { label: '账单编号', prop: 'billCode', minWidth: '140', align: 'center', hide: true },
        { label: '事业部', prop: 'buName', minWidth: '120', align: 'center', hide: true },
        { label: '结算类型', prop: 'settlementTypeLabel', width: '90', align: 'center', hide: true },
        { label: '品牌', prop: 'parentBrandName', minWidth: '120', align: 'center', hide: true },
        { label: '收支项目名称', prop: 'paymentSubjectName', width: '120', align: 'center', hide: true },
        { label: '应收金额', slotTo: 'price', width: '120', align: 'center', hide: true }
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
      const { data } = await listAdvanceBillsToNC({ id })
      if (data && data.length) {
        this.tableData.list = data
      } else {
        this.tableData.list = []
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
