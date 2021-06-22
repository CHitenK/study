 <template>
  <!-- 转销售订单组件 -->
  <div class="edit-bx">
    <JFX-Dialog
      closeBtnText="取 消"
      title="转销售订单"
      :width="'1000px'"
      :top="'80px'"
      :showClose="true"
      :loading="viewLoading"
      :visible.sync="isVisible"
      @comfirm="comfirm"
    >
      <!-- 表单部分 -->
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="出库仓库：" prop="outDepotId">
              <el-select
                v-model="ruleForm.outDepotId"
                placeholder="请选择"
                clearable
                :data-list="getSelectBeanByMerchantRel('merchantRel_list', { type: 'a,c,d' })"
              >
                <el-option
                  v-for="item in selectOpt.merchantRel_list"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事业部：" prop="buId">
              <el-select
                v-model="ruleForm.buId"
                placeholder="请选择"
                clearable
                :data-list="getBUSelectBean('bu_list')"
              >
                <el-option
                  v-for="item in selectOpt.bu_list"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表单部分 end -->
      <!-- 表格 -->
      <JFX-table class="mr-t-20"
                show-summary
                :tableData.sync="tableData"
                :showPagination="false"
                :summary-method="getSummaries">
        <el-table-column prop="poNo"
                        align="center"
                        label="PO号"
                        width="150px"
                        show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="platformBarcode"
                        align="center"
                        label="条形码"
                        width="120px"
                        show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="platformGoodsName"
                        align="center"
                        label="商品名称"
                        min-width="120px"
                        show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="num"
                        align="center"
                        label="采购数量"
                        width="80px"
                        show-overflow-tooltip
        ></el-table-column>
        <el-table-column align="center"
                        width="150px"
                        label="销售数量">
          <template slot-scope="{row}">
            <el-input-number v-model.trim="row.saleNum" :precision="0" :controls="false" :min="0" label="必填" style="width: 100%;" />
          </template>
        </el-table-column>
      </JFX-table>
      <!-- 表格 end-->
    </JFX-Dialog>
  </div>
</template>
<script>
import commomMix from '@m/index'
import {
  getPlatformPurchaseOrderItems
} from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  props: {
    isVisible: {
      type: Object,
      default: function() {
        return { visible: false }
      }
    },
    rowIds: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ruleForm: {
        outDepotId: '',
        buId: ''
      },
      rules: {
        outDepotId: { required: true, message: '请选择出库仓库', trigger: 'change' },
        buId: { required: true, message: '请选择事业部', trigger: 'change' }
      },
      viewLoading: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { rowIds: ids } = this
      try {
        this.viewLoading = true
				const { data } = await getPlatformPurchaseOrderItems({ ids })
        if (data && data.length) {
          this.tableData.list = data.map(item => ({ ...item, saleNum: item.num }))
        } else {
          this.tableData.list = []
        }
			} catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.viewLoading = false
      }
    },
    // 提交
    comfirm() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          let flag = true
          for (let i = 0; i < this.tableData.list.length; i++) {
            const { saleNum } = this.tableData.list[i]
            if (saleNum === undefined || saleNum === null) {
              this.$errorMsg(`表格第${i + 1}行，销售数量不为空`)
              flag = false
              break
            }
          }
          if (!flag) return false
          const { outDepotId, buId } = this.ruleForm
          const { rowIds: platformPurchaseIds } = this
          const platformSalesNum = this.tableData.list.reduce((pre, item) => {
            pre.push(`${item.platformBarcode}__${+item.saleNum}`)
            return pre
          }, []).toString()
          const params = { platformPurchaseIds, outDepotId, buId, platformSalesNum }
          this.$emit('comfirm', params)
        }
      })
    },
    // 合计
    getSummaries({ data }) {
      const sum = []
      let poNos = []
      let num = 0
      let saleNum = 0
      data.forEach(item => {
        if (item['poNo']) {
          poNos.push(item['poNo'])
        }
        if (item['num']) {
          num += item['num']
          saleNum += item['saleNum'] + 0 ? item['saleNum'] : 0
        }
      })
      sum[0] = `合计：${[...new Set(poNos)].length}个PO号`
      sum[3] = num
      sum[4] = saleNum
      return sum
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
