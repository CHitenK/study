 <template>
  <!-- 转销售订单组件 -->
  <div class="edit-bx">
    <JFX-Dialog
      closeBtnText="取 消"
      title="修改SD金额"
      :width="'1200px'"
      :top="'20vh'"
      :showClose="true"
      :loading="viewLoading"
      :visible.sync="saleSdEditModalVisible"
      @comfirm="comfirm"
    >
      <!-- 基础信息 -->
      <el-row :gutter="10" class="mr-b-20 detail-row">
        <el-col :span="8">
          PO：{{detail.poNo || '- -'}}
        </el-col>
        <el-col :span="8">
          事业部：{{detail.buName || '- -'}}
        </el-col>
        <el-col :span="8">
          SD类型：{{detail.sdTypeName || '- -'}}
        </el-col>
      </el-row>
      <!-- 基础信息 end -->
      <!-- 表格 -->
      <JFX-table :tableData.sync="tableData"
                 :tableColumn="tableColumn"
                 :showPagination="false"
                 :summary-method="getSummaries"
                 showSummary>
        <template slot="sdRatio" slot-scope="{row, $index}">
          <!-- <el-input-number v-model.trim="row.sdRatio" :precision="2" v-max-spot="2" :controls="false" :min="0"  style="width: 94%;" @change="calc('sdRatio', $index)" /> -->
          <JFX-Input v-model.trim="row.sdRatio" :precision="5" :min="0"  style="width: 94%;" @change="calc('sdRatio', $index)" />
        </template>
        <template slot="sdAmount" slot-scope="{row, $index}">
          <!-- <el-input-number v-model.trim="row.sdAmount" :precision="2" v-max-spot="2" :controls="false" :min="0"  style="width: 94%;" @change="calc('sdAmount', $index)" /> -->
          <JFX-Input v-model.trim="row.sdAmount" :precision="2" :min="0"  style="width: 94%;" @change="calc('sdAmount', $index)" />
        </template>
      </JFX-table>
      <!-- 表格 end -->
    </JFX-Dialog>
  </div>
</template>
<script>
import commomMix from '@m/index'
import {
  detailPreSaleOrder,
  saveSaleSdOrder
} from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  props: {
    saleSdEditModalVisible: {
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
        { label: '上架数量', prop: 'num', minWidth: '100', align: 'center', hide: true },
        { label: '销售单价', prop: 'price', minWidth: '100', align: 'center', hide: true },
        { label: '应收金额', prop: 'amount', minWidth: '100', align: 'center', hide: true },
        { label: 'SD比例', slotTo: 'sdRatio', minWidth: '150', align: 'center', hide: true },
        { label: 'SD金额', slotTo: 'sdAmount', minWidth: '150', align: 'center', hide: true }
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
        const { data } = await detailPreSaleOrder({ id })
        this.detail = data || {}
        this.tableData.list = this.detail.itemList || []
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
        const { poNo, buName, sdTypeName } = this.detail
        const { id } = this
        const itemList = this.tableData.list.map(item => ({
          id: item.id,
          goodsNo: item.goodsNo || '',
          goodsName: item.goodsName || '',
          num: item.num || 0,
          price: item.price || 0,
          amount: item.amount || 0,
          sdRatio: item.sdRatio || 0,
          sdAmount: item.sdAmount || 0
        }))
        const params = {
          poNo,
          buName,
          sdTypeName,
          itemList,
          id
        }
        await saveSaleSdOrder(params)
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
        const { sdRatio, sdAmount } = this.tableData.list[i]
        if (sdRatio === null || sdRatio === undefined || sdRatio === '' || sdRatio < 0) {
          this.$errorMsg(`表格第${i + 1}行，SD比例不能为空`)
          flag = false
          break
        }
        if (sdAmount === null || sdAmount === undefined || sdAmount === '' || sdAmount < 0) {
          this.$errorMsg(`表格第${i + 1}行，SD金额不能为空`)
          flag = false
          break
        }
      }
      return flag
    },
    // 计算表格数据
    calc(type, index) {
      const item = this.tableData.list[index]
      let { sdRatio, price, num, sdAmount } = item
      sdRatio = sdRatio ? +sdRatio : 0
      price = price ? +price : 0
      num = num ? +num : 0
      sdAmount = sdAmount ? +sdAmount : 0
      if (type === 'sdRatio') {
        sdAmount = (sdRatio * price * num).toFixed(2)
      }
      if (type === 'sdAmount') {
        sdRatio = (sdAmount / (price * num)).toFixed(5)
      }
      this.tableData.list.splice(index, 1, {
        ...item,
        sdRatio: sdRatio + '',
        price: price + '',
        num: num + '',
        sdAmount: sdAmount + ''
      })
    },
    // 计算总和
    getSummaries({ data, columns }) {
      const sums = []
      let amounts = 0
      let sdAmounts = 0
      let prices = 0
      columns.forEach((item, index) => {
        if (index === 0) {
          item.colSpan = 3
        }
      })
      // let maxLen = 0
      data.forEach(item => {
        // if ((item.price + '').includes('.')) {
        //   const curLen = (item.price + '').split('.')[1].length
        //   maxLen = Math.max(curLen, maxLen)
        //   maxLen > 8 ? 8 : maxLen
        // }
        amounts += item.amount ? +item.amount : 0
        sdAmounts += item.sdAmount ? +item.sdAmount : 0
        prices += item.price ? +item.price : 0
      })
      sums[0] = `合计`
      sums[1] = prices
      sums[2] = amounts
      sums[4] = sdAmounts.toFixed(2)
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
