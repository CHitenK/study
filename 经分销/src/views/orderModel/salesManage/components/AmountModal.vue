<template>
  <!-- 金额调整、确认组件 -->
  <JFX-Dialog
    :title="title"
    closeBtnText="取 消"
    :width="'1000px'"
    :top="'80px'"
		:visible="amountModalVisible"
	>
    <el-form :model="searchProps" ref="searchForm" :rules="rules" class="mr-b-15">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="销售币种：" prop="currency">
            <el-select
              v-model="searchProps.currency"
              placeholder="请选择"
              clearable
              filterable
              :data-list="getCurrencySelectBean('currency_list')"
              :disabled="amountType === '2'"
            >
              <el-option
                v-for="item in selectOpt.currency_list"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               :showPagination="false"
               :summary-method="getSummaries"
               show-summary>
      <el-table-column prop="goodsNo"
                       align="center"
                       label="商品货号"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="goodsName"
                       align="center"
                       label="商品名称"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="num"
                       align="center"
                       label="销售数量"
                       width="80"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center" width="150">
        <template slot="header">
          <span class="need">销售单价<br />(不含税)</span>
        </template>
        <template slot-scope="{row, $index}">
          <el-input-number v-model.trim="row.price" :precision="8" v-max-spot="8" :controls="false" :min="0"  style="width: 100%" @blur="calc('price', $index)" :disabled="amountType === '2'"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" width="150">
        <template slot="header">
          <span class="need">销售金额<br />(不含税)</span>
        </template>
        <template slot-scope="{row, $index}">
          <el-input-number v-model.trim="row.amount" :precision="2" v-max-spot="2" :controls="false" :min="0"  style="width: 100%" @blur="calc('amount', $index)" :disabled="amountType === '2'"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" width="150">
        <template slot="header">
          <span class="need">销售金额<br />(含税)</span>
        </template>
        <template slot-scope="{row}">
          <el-input-number v-model.trim="row.taxAmount" :precision="2" v-max-spot="2" :controls="false" :min="0"  style="width: 100%" disabled></el-input-number>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <div slot="dialog-footer" class="flex-c-c">
      <el-button @click="adjust" type="primary" v-if="amountType === '1'">确认</el-button>
      <el-button @click="comfirm('1')" type="primary" v-else>确认通过</el-button>
      <el-button @click="comfirm('2')" v-if="amountType === '2'">确认不通过</el-button>
      <el-button @click="$emit('cacel')">取消</el-button>
    </div>
	</JFX-Dialog>
</template>
<script>
import commomMix from '@m/index'
import {
  showOrderAmount,
  amountAdjust,
  amountConfirm
} from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  props: {
    rowId: {
      type: String,
      default: ''
    },
    amountModalVisible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    amountType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchProps: {
        currency: ''
      },
      rules: {
        currency: { required: true, message: '请选择币种', trigger: 'change' }
      },
      title: '',
      totalAmount: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 拉取表格数据
		async init() {
      if (this.amountType === '1') {
        this.title = '调整金额'
      } else {
        this.title = '确认金额'
      }
      const { data } = await showOrderAmount({ id: this.rowId })
      this.searchProps.currency = data.currency
      this.tableData.list = data.itemList
    },
    // 计算表格数据
    calc(type, index) {
      const data = this.tableData.list[index]
      let { num = 0, price = 0, amount = 0, taxRate = 0, taxAmount = 0 } = data
      if (type === 'price') {
        amount = (num * price).toFixed(2)
        taxAmount = (amount * (1 + taxRate)).toFixed(2)
      }
      if (type === 'amount') {
        price = (amount / num).toFixed(8)
        taxAmount = (amount * (1 + taxRate)).toFixed(2)
      }
      this.tableData.list.splice(index, 1, { ...data, amount, taxAmount, price })
    },
    // 计算总和
    getSummaries({ data }) {
      const sums = []
      let num = 0
      let amount = 0
      let taxAmount = 0
      data.forEach(item => {
        num += item.num
        amount += item.amount
        taxAmount += item.taxAmount
      })
      sums[0] = '合计'
      sums[2] = num
      sums[4] = (+amount).toFixed(2)
      sums[5] = (+taxAmount).toFixed(2)
      this.totalAmount = (+amount).toFixed(2)
      return sums
    },
    // 金额调整
    async adjust() {
      const itemList = this.tableData.list.map(item => ({
        id: item.id + '',
        goodsId: item.goodsId + '',
        goodsCode: item.goodsCode,
        goodsNo: item.goodsNo,
        num: item.num + '',
        amount: item.amount + '',
        price: item.price + '',
        taxAmount: item.taxAmount + ''
      }))
      const params = {
        ...this.searchProps,
        orderId: this.rowId,
        totalAmount: this.totalAmount ? this.totalAmount + '' : '0',
        itemList
      }
      const json = JSON.stringify(params)
      try {
        await amountAdjust({ json })
        this.$successMsg('操作成功')
        this.$emit('comfirm')
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 金额确认
    async comfirm(type) {
      /**
       * type
       * 1：确认
       * 2：确认不通过
       */
      try {
        const params = {
          orderId: this.rowId,
          amountConfirmState: type
        }
        const json = JSON.stringify(params)
        await amountConfirm({ json })
        this.$successMsg('操作成功')
        this.$emit('comfirm')
      } catch (error) {
        this.$errorMsg(error.message)
      }
    }
  }
}
</script>
