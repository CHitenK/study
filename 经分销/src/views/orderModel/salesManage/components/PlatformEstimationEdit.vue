 <template>
  <!-- 转销售订单组件 -->
  <div class="edit-bx">
    <JFX-Dialog
      closeBtnText="取 消"
      title="修改暂估费用金额"
      :width="'1000px'"
      :top="'20vh'"
      :showClose="true"
      :loading="viewLoading"
      :visible.sync="platformEstimationVisible"
      @comfirm="comfirm"
    >
      <!-- 表格 -->
      <JFX-table :tableData.sync="tableData"
                 :tableColumn="tableColumn"
                 :showPagination="false"
                 :summary-method="getSummaries"
                 showSummary>
        <template slot="settlementAmount" slot-scope="{row}">
          <JFX-Input v-model.trim="row.settlementAmount" :precision="2" :min="0"  style="width: 94%;" />
        </template>
      </JFX-table>
      <!-- 表格 end -->
    </JFX-Dialog>
  </div>
</template>
<script>
import commomMix from '@m/index'
import { detailPlatformTemporaryOrder, updatePlatformCost } from '@a/salesManage'
export default {
  mixins: [commomMix],
  props: {
    platformEstimationVisible: {
      type: Object,
      default: function() {
        return { visible: false }
      }
    },
    id: {
      type: String | Number,
      default: ''
    }
  },
  data() {
    return {
      detail: {
        poNo: '',
        buName: '',
        sdTypeName: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '商品货号', prop: 'goodsNo', minWidth: '100', align: 'center', hide: true },
        { label: '商品名称', prop: 'goodsName', minWidth: '100', align: 'center', hide: true },
        { label: '结算金额', prop: 'amount', minWidth: '100', align: 'center', hide: true },
        { label: '平台费项', prop: 'platformSettlementName', minWidth: '100', align: 'center', hide: true },
        { label: '费项比例', prop: 'ratio', minWidth: '100', align: 'center', hide: true },
        { label: '暂估费用金额', slotTo: 'settlementAmount', minWidth: '150', align: 'center' }
      ],
      // 弹窗加载
      viewLoading: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id } = this
      if (!id) return false
      try {
        this.viewLoading = true
        const { data: { itemList } } = await detailPlatformTemporaryOrder({ id })
        this.tableData.list = itemList || []
			} catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.viewLoading = false
      }
    },
    // 提交
    async comfirm() {
      try {
        // 校验表格
        const checked = this.checkList()
        if (!checked) return false
        const { id } = this
        const itemList = this.tableData.list.map(item => ({
          id: item.id || '',
          goodsNo: item.goodsNo || '',
          goodsName: item.goodsName || '',
          platformSettlementName: item.platformSettlementName || 0,
          amount: item.amount || 0,
          ratio: item.ratio || 0,
          settlementAmount: item.settlementAmount || 0
        }))
        await updatePlatformCost({ id, itemList })
        this.$successMsg('操作成功')
        this.$emit('comfirm')
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 校验表格
    checkList() {
      let flag = true
      for (let i = 0; i < this.tableData.list.length; i++) {
        const { settlementAmount } = this.tableData.list[i]
        if (settlementAmount === null || settlementAmount === undefined || settlementAmount === '' || settlementAmount < 0) {
          this.$errorMsg(`表格第${i + 1}行，暂估费用金额不能为空`)
          flag = false
          break
        }
      }
      return flag
    },
    // 计算总和
    getSummaries({ data, columns }) {
      const sums = []
      let amounts = 0
      let settlementAmounts = 0
      columns.forEach((item, index) => {
        if (index === 0) { item.colSpan = 2 }
      })
      data.forEach(item => {
        amounts += item.amount ? +item.amount : 0
        settlementAmounts += item.settlementAmount ? +item.settlementAmount : 0
      })
      sums[0] = `合计`
      sums[1] = (+amounts).toFixed(2)
      sums[4] = (+settlementAmounts).toFixed(2)
      return sums
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.edit-bx {
  .el-form-item {
    display: flex;
    flex-wrap: wrap;
  }
  .el-form-item__label {
    width: 100px;
    text-align: right;
  }
  .el-form-item__content {
    flex: 1;
    padding-right: 40px;
  }
}
</style>
