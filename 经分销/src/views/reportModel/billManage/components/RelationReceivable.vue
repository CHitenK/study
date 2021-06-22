  <template>
  <!-- 选择发票模板组件 -->
  <JFX-Dialog
    title="关联应收单"
    closeBtnText="取 消"
    :width="'1000px'"
    :top="'80px'"
    :showClose="true"
		:visible.sync="isVisible"
    :btnAlign="'center'"
    @comfirm="comfirm"
	>
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               :showPagination="false"
               :summary-method="getSummaries"
               showSummary>
    </JFX-table>
	</JFX-Dialog>
</template>
<script>
import commomMix from '@m/index'
import {
  listReceiveBills
} from '@a/reportManage'
export default {
  mixins: [commomMix],
  props: {
    isVisible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    id: {
      type: String | Number,
      default: ''
    }
  },
  data() {
    return {
      // 表格列数据
      tableColumn: [
        { label: '账单编号', prop: 'code', width: '140', align: 'center', hide: true },
        { label: '业务单号', prop: 'relCode', minWidth: '120', align: 'center', hide: true },
        { label: 'PO单号', prop: 'poNo', minWidth: '120', align: 'center', hide: true },
        { label: '事业部', prop: 'buName', width: '130', align: 'center', hide: true },
        { label: '应收金额', prop: 'receivablePrice', width: '120', align: 'center', hide: true }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id } = this
      try {
        const { data } = await listReceiveBills({ id })
        this.tableData.list = data
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    comfirm() {
      this.$emit('comfirm')
    },
    // 计算总和
    getSummaries({ data }) {
      const sums = []
      let receivablePrices = 0
      data.forEach(item => {
        receivablePrices += item.receivablePrice ? +item.receivablePrice : 0
      })
      sums[0] = '合计'
      sums[4] = (+receivablePrices).toFixed(2)
      return sums
    }
  }
}
</script>
