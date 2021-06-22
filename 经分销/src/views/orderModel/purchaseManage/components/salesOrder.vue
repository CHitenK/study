<template>
  <div>
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'70vw'"
      :title="'转销售订单'"
      :btnAlign="'center'"
      top="6vh"
      >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
            <el-form-item label="客户：" prop="customerId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.customerId" placeholder="请选择" clearable filterable :data-list="getCustomerSelectBean('customerList')" >
                <el-option v-for="item in selectOpt.customerList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
            <el-form-item label="加价比例：" prop="rate" class="search-panel-item fs-14 clr-II" >
              <span slot="label"><i class="el-icon-warning-outline fs-16 c-p clr-warn" title="销售单价=采购单价 * (1 + 加价比例)"></i>&nbsp;&nbsp;<span class="need"></span>加价比例：</span>
              <JFX-Input  v-model.trim="ruleForm.rate" :precision="5"  :min="0" :max="9.99999" style="width: 100%" placeholder="请输入，最多保留5位小数" @change="changeRate" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
            :summaryMethod="null"
          >
            <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
            <el-table-column label="商品货号" align="center" min-width="160">
              <template slot-scope="scope">{{scope.row.goodsNo}}</template>
            </el-table-column>
            <el-table-column prop="outDepotName" label="商品名称" align="center" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.goodsName}}</template>
            </el-table-column>
            <el-table-column prop="num" align="center" min-width="100">
              <template slot="header" >
                <span class="need">销售数量</span>
              </template>
              <template slot-scope="scope">
                <el-input-number v-model.trim="scope.row.num" :precision="0" :controls="false" :min="0"  style="width: 100%" @change="changePrice(scope.$index)"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="销售单价" align="center" width="130">
              <template slot="header" >
                <span class="need">销售单价</span>
              </template>
              <template slot-scope="scope">
                <el-input-number v-model.trim="scope.row.price" :precision="8" v-max-spot="8" :controls="false" :min="0"  style="width: 100%" @change="changePrice(scope.$index)"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column prop="amount" align="center" min-width="130">
              <template slot="header">
                <span class="need">销售金额</span>
              </template>
              <template slot-scope="scope">
                <el-input-number v-model.trim="scope.row.amount" :precision="2" v-max-spot="2" :controls="false" :min="0"  style="width: 100%" @change="changeAmout(scope.$index)"></el-input-number>
              </template>
            </el-table-column>
          </JFX-table>
          <!-- 表格 end-->
        </el-col>
      </el-row>
    </JFX-Dialog>
  </div>
</template>
<script>
import { genSaleOrderByPurchaseIds, saveSaleOrder } from '@a/purchaseManage/index'
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
    targetIds: {
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
      ruleForm: {
        customerId: '',
        rate: ''
      },
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      rules: {
        customerId: { required: true, message: '请选择客户', trigger: 'change' }
      },
      title: '',
      canSave: true
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    comfirm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          let flag = true
          const itemList = []
          for (let i = 0; i < this.tableData.list.length; i++) {
            const tips = `表格第${i + 1}行，`
            const { amount, price, id, num, goodsNo } = this.tableData.list[i]
            if (!num) {
              this.$errorMsg(tips + '请补全销售数量')
              flag = false
              break
            }
            if (!price) {
              this.$errorMsg(tips + '请补全销售单价')
              flag = false
              break
            }
            if (!amount) {
              this.$errorMsg(tips + '请补全销售金额')
              flag = false
              break
            }
            itemList.push({
              amount: amount + '',
              price: price + '',
              id: id + '',
              num: num.toString(),
              goodsNo: goodsNo.toString()
            })
          }
          if (!flag) return false
          this.tableData.loading = true
          if (!this.canSave) return false // 幂等
          this.canSave = false
          // 提交前校验是否存在
          try {
            const opt = {
              ids: this.targetIds,
              customerId: this.ruleForm.customerId,
              items: JSON.stringify(itemList)
            }
            const res1 = await saveSaleOrder(opt)
            this.$successMsg('操作成功')
            this.togoSaleEdit(res1.data)
          } catch (error) {
            console.log(error)
          }
          this.canSave = true
          this.tableData.loading = false
        }
      })
    },
    // 跳转销售编辑页
    togoSaleEdit(saleId) {
      if (!saleId) {
        this.visible.show = false
        return false
      }
       this.$confirm('转销售订单成功，是否进入销售订单编辑页面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.visible.show = false
        this.linkTo('/sales/salesorderedit?id=' + saleId)
      }).catch(() => {
        this.$emit('close')
        this.visible.show = false
      })
    },
    async getList() {
      try {
				this.tableData.loading = true
				// 同步方法
				const res = await genSaleOrderByPurchaseIds({ ids: this.targetIds })
        res.data.itemList.forEach(item => {
          const { amount } = item
          item.oldAmount = amount || 0
        })
        this.tableData.list = res.data.itemList || []
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
    },
    changeRate() {
      const { rate } = this.ruleForm
      if (rate >= 0 && rate <= 9.99999) {
        this.tableData.list.forEach(item => {
          const { oldAmount, num } = item
          const amount = (1 + Number(rate)) * oldAmount
          item.amount = amount.toFixed(2) // 销售金额
          // 销售单价
          const price = item.amount / num
          item.price = price.toFixed(8)
        })
      }
    },
    changePrice(index) {
      let { num, price } = this.tableData.list[index]
      num = num || 0
      price = price || 0
      const amount = num * price
      this.tableData.list[index].amount = amount.toFixed(2) // 销售金额
    },
    changeAmout(index) {
      const { num, amount } = this.tableData.list[index]
      if (amount && num) {
        const price = amount / num
        this.tableData.list[index].price = price.toFixed(8) // 销售单价
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
