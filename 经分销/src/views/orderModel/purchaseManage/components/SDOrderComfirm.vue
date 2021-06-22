<template>
  <div>
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'70vw'"
      title="生成采购SD确认"
      :btnAlign="'center'"
      top="6vh"
      >
      <el-row class="company-page">
        <el-col :span="24"  class="mr-t-20">
          <!-- 表格 -->
          <JFX-table
            :tableData.sync="tableData"
            @selection-change="selectionChange"
            @change="getList"
            :tableHeight="'420px'"
            :showFixedTop="false"
            :showPagination="false"
            :showSummary="true"
            :summaryMethod="getSummaries"
          >
            <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
            <el-table-column label="商品货号" align="center" min-width="160">
              <template slot-scope="scope">{{scope.row.goodsNo}}</template>
            </el-table-column>
            <el-table-column prop="outDepotName" label="商品名称" align="center" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.goodsName}}</template>
            </el-table-column>
            <el-table-column v-for="(item, i) in headerList" :key="i" align="center" width="130" :label="item.sdConfigName" :prop="item.sdConfigNameOt">
              <template slot-scope="scope">
                <el-input-number v-model.trim="scope.row[item.sdConfigName + '_' + scope.row.goodsNo]" :precision="2" v-max-spot="2" :controls="false" :min="0"  style="width: 100%" @change="changePrice(scope.$index)"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column prop="sditemTotalAmount" label="采购SD总金额" align="center" min-width="100"></el-table-column>
          </JFX-table>
          <!-- 表格 end-->
        </el-col>
      </el-row>
    </JFX-Dialog>
  </div>
</template>
<script>
import { getSdAmountAdjustmentDetail, saveSdOrder } from '@a/purchaseManage/index'
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
    targetId: {
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
      },
      canSave: true,
      headerList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async comfirm() {
      let flag = true
      let isEmty = false
      const sdItems = []
      for (let i = 0; i < this.tableData.list.length; i++) {
        const data = this.tableData.list[i]
        let total = 0
        const jtem = { id: data.id }
        for (let key in data) {
          if (key.includes('_' + data.goodsNo) && !key.includes('_' + data.goodsNo + '_')) {
            const t = data[key] || 0
            if (t === 0) isEmty = true
            total += t
            const arr = key.split('_')
            jtem[arr[0]] = t
          }
        }
        if (total === 0) {
          this.$errorMsg('SD金额为空，不需要生成')
          flag = false
          break
        }
        sdItems.push(jtem)
      }
      if (!flag) return false
      this.tableData.loading = true
      if (!this.canSave) return false // 幂等
      this.canSave = false
      try {
        const opt = {
          id: this.targetId,
          sdItems: JSON.stringify(sdItems)
        }
        if (isEmty) {
          this.$confirm('存在SD金额为空的商品，是否继续生成？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async() => {
            try {
              await saveSdOrder(opt)
              this.$successMsg('操作成功')
              this.$emit('comfirm')
              this.visible.show = false
            } catch (error) {
              console.log(error)
            }
            this.canSave = true
            this.tableData.loading = false
          })
        } else {
          await saveSdOrder(opt)
          this.$successMsg('操作成功')
          this.$emit('comfirm')
          this.visible.show = false
        }
      } catch (error) {
        this.canSave = true
        this.tableData.loading = false
      }
    },
    async getList() {
      try {
				this.tableData.loading = true
				// 同步方法
				const res = await getSdAmountAdjustmentDetail({ id: this.targetId })
        const { details, headerList, amountMap } = res.data
        details.itemList.forEach(item => {
          headerList.forEach((gtem, i) => {
            const key = gtem.sdConfigName + '_' + item.goodsNo
            const amount = amountMap[key] || ''
            gtem.sdConfigNameOt = key
            item[key] = amount
          })
          item.sditemTotalAmount = amountMap[item.goodsNo]
        })
        this.tableData.list = details.itemList || []
        this.headerList = headerList
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
    },
    changePrice(index) {
      const data = this.tableData.list[index]
      let total = 0
      for (let key in data) {
        if (key.includes('_' + data.goodsNo) && !key.includes('_' + data.goodsNo + '_')) {
          const t = data[key] || 0
          total += t
        }
      }
      this.tableData.list[index].sditemTotalAmount = total.toFixed(2)
    },
    // 统计
    getSummaries(param) {
      const { columns, data } = param
      if (columns && columns.length > 4) {
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计'
            return false
          }
          let values = []
          if (column.property && column.property.includes('_')) {
            values = data.map((item) => {
              const arr = column.property.split('_')
              const por = arr[0] + '_'
              let num = 0
              for (let key in item) {
                if (key.includes(por)) {
                  num = Number(item[key])
                }
              }
              return num
            })
          }
          // 采购SD总金额
          const numArr = data.map(gtem => Number(gtem.sditemTotalAmount || 0))
          if (column.property === 'sditemTotalAmount') {
            sums[index] = numArr.reduce((pre, cur) => {
              return pre + cur
            }, 0)
            sums[index] = sums[index].toFixed(2)
          }
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                // 保存了两位小数点
                return Math.floor((prev + curr) * 100) / 100
              } else {
                // 保存了两位小数点
                return Math.floor(prev * 100) / 100
              }
            }, 0)
          }
        })
        return sums
      } else {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.company-page{
  width: 100%;
  margin-bottom: 0px;
  min-height: 200px;
}
.dialog-footer{
  height: 30px;
  margin-top: -30px;
}
.list-bx{
  width: 100%;
}
</style>
