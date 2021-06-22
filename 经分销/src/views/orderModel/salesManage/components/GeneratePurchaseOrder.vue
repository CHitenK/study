<template>
  <!-- 生成采购订单组件 -->
  <JFX-Dialog
    title="生成采购订单"
    closeBtnText="取 消"
    :width="'1100px'"
    :top="'80px'"
    :showClose="true"
    :btnAlign="'center'"
		:visible="purchaseOrderVisible"
    @comfirm="comfirm"
	>
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" class="purchase-bx">
      <el-row :gutter="10" class="page-view">
        <el-col :span="12">
          <el-form-item label="供应商：" prop="modalSupplierId">
            <el-select
              v-model="ruleForm.modalSupplierId"
              placeholder="请选择"
              clearable
              :data-list="getSupplierList('supplier_list')"
            >
              <el-option
                v-for="item in selectOpt.supplier_list"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="折扣比例：" prop="modalDiscount">
            <el-input-number v-model.trim="ruleForm.modalDiscount" :precision="5" v-max-spot="5" :controls="false" :min="0" :max="9.99999" label="必填" style="width: 100%;" @blur="calcDiscount"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-row type="flex" align="center">
            <el-form-item label="采购PO号：" prop="modalPoNo">
              <el-input v-model.trim="ruleForm.modalPoNo" placeholder="请输入" clearable />
            </el-form-item>
            <div class="append-text" @click="getSalePoNo">取销售订单PO号</div>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <JFX-table :tableData.sync="tableData"
               :showPagination="false"
               :summaryMethod="null"
               showSummary>
      <el-table-column prop="goodsNo"
                       align="center"
                       label="商品货号"
                       width="140"
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
                       label="采购数量"
                       width="120"
                       show-overflow-tooltips
      ></el-table-column>
      <el-table-column align="center"
                       width="150">
        <template slot="header">
          <span class="need">采购单价</span>
        </template>
        <template slot-scope="{row, $index}">
          <el-input-number v-model.trim="row.purchasePrice" :precision="8" v-max-spot="8" :controls="false" :min="0" label="必填" style="width: 100%;" @blur="calc('price', $index)"/>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       prop="purchaseAmount"
                       width="150">
        <template slot="header">
          <span class="need">采购金额</span>
        </template>
        <template slot-scope="{row, $index}">
           <el-input-number v-model.trim="row.purchaseAmount" :precision="2" v-max-spot="2" :controls="false" :min="0" label="必填" style="width: 100%;" @blur="calc('amount', $index)"/>
        </template>
      </el-table-column>
    </JFX-table>
	</JFX-Dialog>
</template>
<script>
import commomMix from '@m/index'
import {
  GeneratePurchaseOrder,
  checkExistPurchaseByPO,
  preGeneratePurchaseOrder
} from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  props: {
    purchaseOrderVisible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    id: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ruleForm: {
        modalSupplierId: '',
        modalDiscount: '',
        modalPoNo: ''
      },
      rules: {
        modalSupplierId: { required: true, message: '请选择供应商', trigger: 'change' }
      },
      salePoNo: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { data } = this
      const { poNo, itemList } = data
      this.salePoNo = poNo || ''
      if (itemList && itemList.length) {
        this.tableData.list = itemList.map(item => ({
          ...item,
          purchasePrice: item.price || 0,
          purchaseAmount: item.amount || 0
        }))
      }
    },
    comfirm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        try {
          if (valid) {
            let flag = true
            for (let i = 0; i < this.tableData.list.length; i++) {
              const { purchasePrice, purchaseAmount } = this.tableData.list[i]
              if (purchasePrice === undefined || purchasePrice === null) {
                this.$errorMsg(`表格第${i + 1}行，采购单价不为空`)
                flag = false
                break
              }
              if (purchaseAmount === undefined || purchaseAmount === null) {
                this.$errorMsg(`表格第${i + 1}行，采购金额不为空`)
                flag = false
                break
              }
            }
            if (!flag) return false
            const { modalPoNo } = this.ruleForm
            if (modalPoNo) {
              const { data } = await checkExistPurchaseByPO({ poNo: modalPoNo || '' })
              if (data === '01') {
                this.$showToast('已存在相同PO号的采购单，是否继续生成采购单？', () => {
                  this.onSubmit()
                  return false
                })
              }
            }
            this.onSubmit()
          }
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 提交
    async onSubmit() {
      const { type } = this
      try {
        const itemList = this.tableData.list.map(item => ({
          id: item.id || '',
          goodsId: item.goodsId || '',
          goodsCode: item.goodsCode || '',
          goodsNo: item.goodsNo || '',
          num: item.num ? item.num.toString() : '0',
          amount: item.purchaseAmount ? item.purchaseAmount.toString() : '0',
          price: item.purchasePrice ? item.purchasePrice.toString() : '0'
        }))
        const params = {
          supplierId: this.ruleForm.modalSupplierId,
          poNo: this.ruleForm.modalPoNo,
          saleOrderId: this.id,
          itemList
        }
        const json = JSON.stringify(params)
        if (type === '1') {
          const { data } = await GeneratePurchaseOrder({ json })
          this.$showToast('生成采购单成功，是否进入采购订单编辑页面？', () => {
            this.$emit('comfirm')
            this.linkTo(`/purchase/purchaseOrderedit/edit?id=${data}`)
            return false
          }, () => {
            this.$emit('comfirm')
            return false
          })
        } else {
          const { data } = await preGeneratePurchaseOrder({ json })
          this.$showToast('生成采购单成功，是否进入采购订单编辑页面？', () => {
            this.$emit('comfirm')
            this.linkTo(`/purchase/purchaseOrderedit/edit?id=${data}`)
            return false
          }, () => {
            this.$emit('comfirm')
            return false
          })
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 计算表格数据
    calc(type, index) {
      const item = this.tableData.list[index]
      let { purchasePrice, num, purchaseAmount } = item
      purchasePrice = purchasePrice ? +purchasePrice : 0
      num = num ? +num : 0
      purchaseAmount = purchaseAmount ? +purchaseAmount : 0
      if (type === 'price') {
        purchaseAmount = (purchasePrice * num).toFixed(2)
      }
      if (type === 'amount') {
        purchasePrice = (purchaseAmount / num).toFixed(8)
      }
      this.tableData.list.splice(index, 1, { ...item, purchasePrice, num, purchaseAmount })
    },
    // 计算则扣
    calcDiscount() {
      let { modalDiscount } = this.ruleForm
      modalDiscount = modalDiscount ? +modalDiscount : 0
      if (!modalDiscount) {
        modalDiscount = 1
      }
      this.tableData.list.forEach((item, index) => {
        item.purchasePrice = item.price ? item.price * modalDiscount : 0
        item.purchaseAmount = item.amount ? item.amount * modalDiscount : 0
        this.calc('price', index)
      })
    },
    // 从销售单中获取po号
    getSalePoNo() {
      this.ruleForm.modalPoNo = this.salePoNo
    }
  }
}
</script>

<style lang="scss" scoped>
.page-view{
  width: 100%;
  margin-bottom: 10px;
}
/deep/.purchase-bx .el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 130px;
}
/deep/.purchase-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.append-text {
  cursor: pointer;
  display: flex;
  margin: 10px 0 0 10px;
  color: #17a9eb;
}
</style>
