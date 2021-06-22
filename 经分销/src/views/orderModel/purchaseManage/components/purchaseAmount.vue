<template>
  <div>
    <JFX-Dialog
      :visible.sync="visible"
      :width="'830px'"
      :title="title"
      :btnAlign="'center'"
      :showClose="false"
      top="8vh"
      >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
            <el-form-item label="采购币种：" prop="currency" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.currency" placeholder="请选择" clearable filterable :data-list="getCurrencySelectBean('currencyList')" >
                <el-option v-for="item in selectOpt.currencyList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row class="company-page">
        <el-col :span="24"  class="mr-t-20">
          <!-- 表格 -->
          <JFX-table
            :tableData.sync="tableData"
            :tableHeight="'400px'"
            :showFixedTop="false"
            :showPagination="false"
            :showSummary="true"
            :summaryMethod="null"
          >
            <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
            <el-table-column label="商品货号" align="center" width="150" show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.goodsNo}}</template>
            </el-table-column>
            <el-table-column label="商品名称" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.goodsName}}</template>
            </el-table-column>
            <el-table-column  prop="num" label="采购数量" align="center" width="80">
              <template slot-scope="scope">{{scope.row.num}}</template>
            </el-table-column>
            <el-table-column label="采购单价" align="center" width="120">
              <template slot-scope="scope">{{scope.row.price}}</template>
            </el-table-column>
            <el-table-column prop="amount" align="center" width="130">
              <template slot="header">
                <span class="need">采购金额(不含税)</span>
              </template>
              <template slot-scope="scope">
                <el-input-number v-if="filterData.type === 'edit'" v-model="scope.row.amount" :precision="2" v-max-spot="2" :controls="false" :min="0"  style="width: 100%" @change="changeAmount(scope.$index)"></el-input-number>
                <span v-else>{{scope.row.amount}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="taxAmount" label="" align="center" width="130">
              <template slot="header">
                <span>采购金额(含税)</span>
              </template>
              <template slot-scope="scope">
                <el-input-number v-if="filterData.type === 'edit'" v-model.trim="scope.row.taxAmount" :precision="2" v-max-spot="2" :controls="false" :min="0"  style="width: 100%"></el-input-number>
                <span v-else>{{scope.row.taxAmount}}</span>
              </template>
            </el-table-column>
          </JFX-table>
          <!-- 表格 end-->
        </el-col>
      </el-row>
      <div slot="dialog-footer" class="list-bx flex-c-c" v-if="filterData.type === 'edit'">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" :loading="saveLoading" @click="save">确认</el-button>
      </div>
      <div slot="dialog-footer" class="list-bx flex-c-c" v-if="filterData.type === 'comfirm'">
        <el-button type="primary" :loading="confirmLoading" @click="updateStatus(2)">确认通过</el-button>
        <el-button type="primary" :loading="confirmLoading" @click="updateStatus(1)">确认不通过</el-button>
        <el-button @click="visible.show=false">取消</el-button>
      </div>
    </JFX-Dialog>
  </div>
</template>
<script>
/**
 * @description 采购金额 常用组件
 * 使用示例
 * <chose-products :visible.sync="visible" v-if="visible.show" @comfirm="visible.show=false"></chose-products>
 * 参数说明
 * visible
 *  -- show 是否显示
 * filterData 请求参数
 * type edit 修改 comfirm 确认
 */
import { getAmountAdjustmentDetail, saveAmountAdjustment, saveConfirmAmountAdjustment } from '@a/purchaseManage/index'
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
    }
  },
  data() {
    return {
      compayId: '',
      companylist: [],
      innerVisible: false,
      parment: '',
      ruleForm: {
        currency: ''
      },
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      rules: {
        currency: { required: true, message: '请选择采购币种', trigger: 'change' }
      },
      title: '',
      totalTaxAmount: 0,
      totalNum: 0,
      totalAmount: 0,
      saveLoading: false,
      confirmLoading: false
    }
  },
  mounted() {
    this.title = this.filterData.type === 'edit' ? '采购金额修改' : '采购金额确认'
    this.getList()
  },
  methods: {
    comfirm() {
     this.$emit('comfirm')
    },
    async getList() {
      try {
				this.tableData.loading = true
				// 同步方法
				const res = await getAmountAdjustmentDetail({ id: this.filterData.id })
        this.ruleForm.currency = res.data.details.currency || ''
				this.tableData = {
					list: res.data.details.itemList || [],
					loading: false,
					total: 10001,
					pageSize: 10000
				}
			} catch (err) {
        this.tableData.loading = false
			}
    },
    changeAmount(index) {
      const item = this.tableData.list[index]
      const { amount, num, taxRate } = item
      let price = (amount || 0) / num
      if (taxRate) {
        let taxAmount = parseFloat(amount) * (1 + parseFloat(taxRate))
        taxAmount = parseFloat(taxAmount).toFixed(2)
        item.taxAmount = taxAmount
      }
      item.price = price.toFixed(8)
    },
    async save() {
      if (!this.ruleForm.currency) {
        this.$errorMsg('请选择币种！')
        return false
      }
      let flag = true
      const items = []
      for (let i = 0; i < this.tableData.list.length; i++) {
        let { amount, id, price, taxAmount, num } = this.tableData.list[i]
        if (!this.$transformZeroBl(amount)) {
          this.$errorMsg('请补全采购金额(不含税)')
          flag = false
          break
        }
        let taxPrice = parseFloat(taxAmount) / parseFloat(num)
        taxPrice = parseFloat(taxPrice).toFixed(8)
        price = price ? (+price).toFixed(8) : 0
        items.push({ amount, id, price, taxPrice, num, taxAmount })
      }
      if (!flag) return false
      this.saveLoading = true
      const opt = {
        currency: this.ruleForm.currency,
        items: JSON.stringify(items),
        id: this.filterData.id
      }
      try {
        await saveAmountAdjustment(opt)
        this.$successMsg('保存成功')
        this.$emit('comfirm')
        this.visible.show = false
      } catch (err) {}
      this.saveLoading = false
    },
    close() {
      this.$confirm('你将关闭该界面，数据不会被保存，是否继续关闭？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.visible.show = false
			})
    },
    async updateStatus(status) {
      this.confirmLoading = true
      try {
        await saveConfirmAmountAdjustment({ id: this.filterData.id, amountConfirmStatus: status })
        this.$successMsg('保存成功')
        this.$emit('comfirm')
        this.visible.show = false
      } catch (error) {
      }
      this.confirmLoading = false
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
.tongjix{
  width: 100%;
  height: 30px;
  margin-top: -10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span{
    display: inline-block;
    padding-left: 10px;
    box-sizing: border-box;
  }
  .w-130{
    width: 130px;
  }
  .w-90{
    width: 80px;
  }
}
/deep/ .el-form-item__label{
  width: 160px;
}
</style>
