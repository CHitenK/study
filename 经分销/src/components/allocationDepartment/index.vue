<template>
  <div class="fen-pei-box">
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'80vw'"
      :title="'分配事业部'"
      :btnAlign="'center'"
      top="6vh"
      >
      <el-row :gutter="10" class="company-page" >
        <el-col :span="24" >
          <el-button type="primary" :size="'small'" @click="openDalog" >分配事业部</el-button>
        </el-col>
        <!-- 盘点结果-分配事业部 -->
        <el-col :span="24"  class="mr-t-20" v-if="type==='resultList'">
          <!-- 表格 -->
          <JFX-table
            :tableData.sync="tableData"
            @selection-change="selectionChange"
            :showFixedTop="false"
            :showPagination="false"
            :tableHeight="'480px'"
          >
            <el-table-column
              type="selection"
              align="center"
              fixed="left"
              width="55">
            </el-table-column>
            <el-table-column
              prop="goodsNo"
              label="商品货号"
              align="center"
              fixed="left"
              width="140"
            >
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名称"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="barcode"
              label="商品条形码"
              align="center"
              width="140"
            >
            </el-table-column>
            <el-table-column
              prop="buName"
              label="事业部"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="surplusNum"
              label="盘盈数量"
              align="center"
              width="90"
            >
            </el-table-column>
            <el-table-column
              prop="deficientNum"
              label="盘亏数量"
              align="center"
              width="90"
            >
            </el-table-column>
            <el-table-column
              prop="typeLabel"
              label="调整类型"
              align="center"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="batchNo"
              label="批次号"
              align="center"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="isDamageLabel"
              label="是否坏品"
              align="center"
               width="90"
            >
            </el-table-column>
            <el-table-column
              prop="productionDate"
              label="生产日期"
              align="center"
              width="110"
            >
              <template slot-scope="scope">
                {{scope.row.productionDate ? scope.row.productionDate.substring(0, 10) : ''}}
              </template>
            </el-table-column>
            <el-table-column
              prop="overdueDate"
              label="失效日期"
              align="center"
              width="110"
            >
              <template slot-scope="scope">
                {{scope.row.overdueDate ? scope.row.overdueDate.substring(0, 10) : ''}}
              </template>
            </el-table-column>
            <el-table-column
              prop="reasonCodeLabel"
              label="盘点原因"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
          </JFX-table>
          <!-- 表格 end-->
        </el-col>
        <!-- 盘点结果-分配事业部 end-->
        <!-- 调整类型-分配事业部 -->
        <el-col :span="24"  class="mr-t-20" v-if="type==='typeList'">
          <!-- 表格 -->
          <JFX-table
            :tableData.sync="tableData"
            @selection-change="selectionChange"
            :showFixedTop="false"
            :showPagination="false"
            :tableHeight="'480px'"
          >
            <el-table-column
              type="selection"
              align="center"
              fixed="left"
              width="55">
            </el-table-column>
            <el-table-column
              prop="goodsNo"
              label="商品货号"
              align="center"
              fixed="left"
              width="140"
            >
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名称"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="barcode"
              label="商品条形码"
              align="center"
              width="140"
            >
            </el-table-column>
            <el-table-column
              prop="buName"
              label="事业部"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="oldBatchNo"
              label="原始批次号"
              align="center"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="productionDate"
              label="生产日期"
              align="center"
              width="110"
            >
              <template slot-scope="scope">
                {{scope.row.productionDate ? scope.row.productionDate.substring(0, 10) : ''}}
              </template>
            </el-table-column>
            <el-table-column
              prop="overdueDate"
              label="失效日期"
              align="center"
              width="110"
            >
              <template slot-scope="scope">
                {{scope.row.overdueDate ? scope.row.overdueDate.substring(0, 10) : ''}}
              </template>
            </el-table-column>
            <el-table-column
              prop="oldGoodType"
              label="调整前商品类型"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="newGoodType"
              label="调整后商品类型"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="adjustTotal"
              label="调整总数量"
              align="center"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="tallyingUnitLabel"
              label="理货单位"
              align="center"
              width="100"
            >
            </el-table-column>
          </JFX-table>
          <!-- 表格 end-->
        </el-col>
        <!-- 调整类型-分配事业部 end-->
        <!-- 库存调整-分配事业部 -->
        <el-col :span="24"  class="mr-t-20" v-if="type==='stockList'">
          <!-- 表格 -->
          <JFX-table
            :tableData.sync="tableData"
            @selection-change="selectionChange"
            :showFixedTop="false"
            :showPagination="false"
            :tableHeight="'480px'"
          >
            <el-table-column
              type="selection"
              align="center"
              fixed="left"
              width="55">
            </el-table-column>
            <el-table-column
              prop="goodsNo"
              label="商品货号"
              align="center"
              fixed="left"
              width="140"
            >
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名称"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="barcode"
              label="商品条形码"
              align="center"
              width="140"
            >
            </el-table-column>
            <el-table-column
              prop="buName"
              label="事业部"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="settlementPrice"
              label="结算单价"
              align="center"
              width="90"
            >
            </el-table-column>
            <el-table-column
              prop="typeLabel"
              label="调整类型"
              align="center"
              width="90"
            >
            </el-table-column>
            <el-table-column
              prop="oldBatchNo"
              label="原始批次号"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="adjustTotal"
              label="总调整数量"
              align="center"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="isDamageLabel"
              label="是否坏品"
              align="center"
              width="90"
            >
            </el-table-column>
            <el-table-column
              prop="tallyingUnitLabel"
              label="海外理货单位"
              align="center"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="productionDate"
              label="生产日期"
              align="center"
              width="110"
            >
              <template slot-scope="scope">
                {{scope.row.productionDate ? scope.row.productionDate.substring(0, 10) : ''}}
              </template>
            </el-table-column>
            <el-table-column
              prop="overdueDate"
              label="失效日期"
              align="center"
              width="110"
            >
              <template slot-scope="scope">
                {{scope.row.overdueDate ? scope.row.overdueDate.substring(0, 10) : ''}}
              </template>
            </el-table-column>
          </JFX-table>
          <!-- 表格 end-->
        </el-col>
        <!-- 库存调整-分配事业部 end-->
      </el-row>
    </JFX-Dialog>
    <div class="ot">
      <el-dialog
        width="30%"
        title="请分配事业部"
        :visible.sync="innerVisible"
        append-to-body>
        <div class="fen-pei-bx flex-c-c">
        <span>
          事业部：
        </span>
        <el-select v-model="parment" placeholder="请选择" filterable clearable :data-list="getBUSelectBean('buList')" >
          <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item"></el-option>
        </el-select>
        <span class="clr-r">&nbsp;&nbsp;(必选)</span>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button  @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="comfirmChoseBu">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
/**
 * @description 分配事业部 常用组件
 * 使用示例
 * <allocation-department :visible.sync="visible" v-if="visible.show" @comfirm="visible.show=false"></allocation-department>
 * 参数说明
 * visible
 *  -- show 是否显示
 * filterData 接口Api请求参数
 * confirm 函数 点击确定执行 返回选中列表数据
 * close 函数 点击取消执行
 */
import { resultToGoodsDetailById, typeToGoodsDetailById, getDetails } from '@a/storageManage/storage'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    visible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    filterData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      compayId: '',
      companylist: [],
      innerVisible: false,
      parment: '',
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      }
    }
  },
  mounted() {
    // 设置table 高度
    this.getList()
  },
  methods: {
    comfirm() {
      const flage = this.tableData.list.some(item => {
        if (item.buId) return true
      })
      if (!flage) {
        this.$errorMsg('至少有一个商品分配事业部')
        return false
      }
     this.$emit('comfirm', this.tableData.list || [])
    },
    async getList() {
      try {
				this.tableData.loading = true
        let toGoodsDetailById = null
        if (this.type === 'typeList') toGoodsDetailById = typeToGoodsDetailById
        if (this.type === 'resultList') toGoodsDetailById = resultToGoodsDetailById
        if (this.type === 'stockList') toGoodsDetailById = getDetails
        if (!toGoodsDetailById) return false
				// 同步方法
				const res = await toGoodsDetailById(this.filterData)
        if (this.type === 'stockList') {
          this.tableData.list = res.data.itemList || []
        } else {
          this.tableData.list = res.data || []
        }
				this.tableData.loading = false
			} catch (err) {
        this.tableData.loading = false
			}
    },
    openDalog() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少有一个商品分配事业部')
        return false
      }
      this.innerVisible = true
    },
    comfirmChoseBu() {
      if (!this.parment) {
        this.$errorMsg('请选择事业部')
        return false
      }
      this.tableChoseList.map(item => {
        item.buId = this.parment.key
        item.buName = this.parment.value
      })
      this.innerVisible = false
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
<style lang="scss">
.fen-pei-box .el-dialog__body{
  padding-bottom: 0 !important;
}

</style>
