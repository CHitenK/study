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
                     @click="jumpPutOnSale(row.code, row.id)">上架</el-button>
        </template>
      </JFX-table>
      <!-- 表格 end -->
    </JFX-Dialog>
  </div>
</template>
<script>
import commomMix from '@m/index'
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
        { label: '出库清单编号', prop: 'code', minWidth: '100', align: 'center', hide: true },
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
    jumpPutOnSale(saleOutCode, saleOutId) {
      this.linkTo(`/sales/goodsonsale?id=${this.id}&saleOutCode=${saleOutCode}&saleOutId=${saleOutId}`)
      this.comfirm()
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
