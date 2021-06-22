 <template>
  <!-- 转销售订单组件 -->
  <div class="edit-bx">
    <JFX-Dialog
      closeBtnText="取 消"
      title="选择上架"
      :width="'1000px'"
      :top="'20vh'"
      :showClose="true"
      :loading="viewLoading"
      :visible.sync="ChoosePutOnShelveVisible"
      @comfirm="comfirm"
    >
      <p style="margin-bottom: 10px;">查询该销售订单关联销售出库单有多个，请选择上架的出库单：</p>
      <!-- 表格 -->
      <JFX-table :tableData.sync="tableData"
                :tableColumn="tableColumn"
                :showPagination="false"
                showIndex>
        <template slot="num" slot-scope="{row}">
          {{(row.wornNum || 0) + (row.transferNum || 0)}}
        </template>
        <template slot="action" slot-scope="{row}">
          <el-button type="text"
                     v-if="row.status !== '026'"
                     @click="jumpPutOnSale(row)">上架</el-button>
        </template>
      </JFX-table>
      <!-- 表格 end -->
    </JFX-Dialog>
  </div>
</template>
<script>
import commomMix from '@m/index'
import {
  shelfIsEnd
} from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  props: {
    ChoosePutOnShelveVisible: {
      type: Object,
      default: function() {
        return { visible: false }
      }
    },
    data: {
      type: Array,
      default: () => []
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
        { label: '出库清单编号', prop: 'code', minWidth: '100', align: 'center', hide: true },
        { label: '销售订单号', prop: 'saleOrderCode', minWidth: '100', align: 'center', hide: true },
        { label: '出库单状态', prop: 'statusLabel', minWidth: '100', align: 'center', hide: true },
        { label: '出库数量', slotTo: 'num', minWidth: '100', align: 'center', hide: true },
        { label: '出库时间', prop: 'deliverDate', minWidth: '100', align: 'center', hide: true },
        { label: '操作', slotTo: 'action', minWidth: '80', align: 'center' }
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
      const { data } = this
      this.tableData.list = data || []
    },
    comfirm() {
      this.$emit('comfirm')
    },
    async jumpPutOnSale(item) {
      const { saleOrderId, saleOutCode, saleOutId } = item
      try {
        const { data } = await shelfIsEnd({ id: saleOrderId })
        if (data) {
          this.$errorMsg('待上架数量为0，无需进行上架操作，请查看详情。')
          return false
        }
        this.linkTo(`/sales/goodsonsale?id=${saleOrderId}&saleOutCode=${saleOutCode}&saleOutId=${saleOutId}`)
        this.comfirm()
      } catch (error) {
        this.$errorMsg(error.message)
      }
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
