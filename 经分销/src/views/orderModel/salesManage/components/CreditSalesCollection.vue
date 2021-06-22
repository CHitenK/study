<template>
  <!-- 赊销收款 -->
  <JFX-Dialog
    title="赊销收款"
    closeBtnText="取 消"
    :width="'1200px'"
    :top="'80px'"
    :showClose="true"
    :btnAlign="'center'"
		:visible="isVisible"
    @comfirm="comfirm"
	>
    <div v-loading="viewLoding">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" class="purchase-bx" style="max-height: 500px;overflow: auto;">
        <el-row :gutter="10" class="page-view">
          <el-col :span="8">
            <el-form-item label="客户：" style="margin-bottom: 0;">
              {{ ruleForm.customerName || '- -' }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="PO号：" style="margin-bottom: 0;">
              {{ ruleForm.poNo || '- -' }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="币种：" style="margin-bottom: 0;">
              {{ ruleForm.currency || '- -' }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事业部：" style="margin-bottom: 0;">
              {{ ruleForm.buName || '- -' }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人：" style="margin-bottom: 0;">
              {{ ruleForm.createName || '- -' }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间：" style="margin-bottom: 0;">
              {{ ruleForm.createDate || '- -' }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单金额：" prop="saleAmount">
              <JFX-Input v-model.trim="ruleForm.saleAmount" :precision="2" :min="0" style="width: 100%;" :disabled="type === 'redemption'" />
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="type === 'application'">
            <el-form-item label="实收保证金：" prop="actualMarginAmount">
              <JFX-Input v-model.trim="ruleForm.actualMarginAmount" :precision="2" :min="0" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="起算日期：" prop="applyDate">
              <el-date-picker
                :disabled="type === 'redemption'"
                v-model="ruleForm.applyDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际还款日期：" prop="applyDate">
              <el-date-picker
                v-model="ruleForm.deadlineDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
                clearable
                @change="deadlineDateChange"
              />
            </el-form-item>
          </el-col>
          <template>
            <el-col :span="8">
              <el-form-item label="保证金：" style="margin-bottom: 0;">
                {{ (+ruleForm.marginAmount).toFixed(2) || '- -' }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="还款本金：" style="margin-bottom: 0;">
                {{ (+ruleForm.principalAmount).toFixed(2) || '- -' }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资金占用费：" style="margin-bottom: 0;">
                {{ (+ruleForm.occupationAmount).toFixed(2) || '- -' }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="代理费：" style="margin-bottom: 0;">
                {{ (+ruleForm.agencyAmount).toFixed(2) || '- -' }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="滞纳金：" style="margin-bottom: 0;">
                {{ (+ruleForm.delayAmount).toFixed(2) || '- -' }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应还款金额：" style="margin-bottom: 0;">
                {{ (+ruleForm.payableAmount).toFixed(2) || '- -' }}
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item style="margin-bottom: 0;color: #00a0e9;">
                <i class="el-icon-info"></i>
                <span>将用于销售开票，请输入客户实际收货数量</span>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
        <JFX-table :tableData.sync="tableData"
                   :tableColumn="tableColumn"
                   :showPagination="false"
                   :summaryMethod="null"
                   showSummary>
        </JFX-table>
        <el-col :span="24">
          <el-form-item label="附件：" prop="name">
            <JFX-upload @success="successUpload" :url="action" :limit="10000" :multiple="false">
              <el-button id="sale-upload-btn" type="primary">上传文件</el-button>
            </JFX-upload>
          </el-form-item>
          <div v-for="item in attachmenList" :key="item.id" style="color: blue;padding: 0 0 20px 130px;" class="mr-t-10">
            <span @click="downloadAttachmen(item.attachmentUrl, item.attachmentName)" style="padding-right: 10px;cursor: pointer;">{{item.attachmentName}}</span>
            <span @click="delAttachmenItem(item.attachmentCode)" style="cursor: pointer;">删除</span>
          </div>
        </el-col>
      </el-form>
    </div>
    <template slot="dialog-footer">
      <el-button @click="$emit('comfirm', true)" v-if="!isApply">取消</el-button>
      <el-button type="primary" @click="cancellation" v-else>作废</el-button>
      <el-button type="primary" @click="calAmount" :loading="calAmountLoading">还款试算</el-button>
      <el-button type="primary" @click="apply" :loading="applyLoading" v-if="!isApply">申请赎回</el-button>
      <el-button type="primary" @click="comfirm" v-else>确认赎回</el-button>
    </template>
	</JFX-Dialog>
</template>
<script>
import commomMix from '@m/index'
import {
  getFinanceDetail,
  applyFinance,
  calRepayAmount,
  applyRansom,
  cancelRansom,
  confirmRansom
} from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  props: {
    isVisible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    filterData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ruleForm: {
        customerName: '',
        poNo: '',
        currency: '',
        buName: '',
        createName: '',
        createDate: '',
        saleAmount: '',
        actualMarginAmount: '',
        applyDate: '',
        dealineDate: '',
        marginAmount: '',
        principalAmount: '',
        occupationAmount: '',
        agencyAmount: '',
        delayAmount: '',
        payableAmount: ''
      },
      rules: {
        saleAmount: { required: true, message: '请输入订单金额', trigger: 'change' },
        actualMarginAmount: { required: true, message: '请输入实收保证金', trigger: 'change' },
        applyDate: { required: true, message: '请选择起算日期', trigger: 'change' }
      },
      // 表格列数据
      tableColumn: [
        { label: '商品货号', prop: 'code', minWidth: '140', align: 'center', hide: true },
        { label: '商品名称', prop: 'outDepotName', minWidth: '120', align: 'center', hide: true },
        { label: '数量', prop: 'buName', minWidth: '120', align: 'center', hide: true },
        { label: '单价', prop: 'customerName', minWidth: '120', align: 'center', hide: true },
        { label: '金额', prop: 'saleOrderCodes', minWidth: '140', align: 'center', hide: true },
        { label: '本次赎回数量', prop: 'inDepotName', minWidth: '120', align: 'center', hide: true },
        { label: '分摊保证金', prop: 'statusLabel', width: '100', align: 'center', hide: true },
        { label: '分摊本金', prop: 'apiStatusLabel', width: '100', align: 'center', hide: true },
        { label: '资金占用费', prop: 'apiStatusLabel', width: '100', align: 'center', hide: true },
        { label: '代理费', prop: 'apiStatusLabel', width: '100', align: 'center', hide: true },
        { label: '滞纳金', prop: 'apiStatusLabel', width: '100', align: 'center', hide: true },
        { label: '应还金额', prop: 'apiStatusLabel', width: '100', align: 'center', hide: true }
      ],
      salePoNo: '',
      viewLoding: false,
      calAmountLoading: false,
      applyLoading: false,
      cancelLoading: false,
      title: '',
      // 是否已经申请赎回
      isApply: false,
      oldTime: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id, type } = this
      type === 'application' ? this.title = '融资申请' : this.title = '融资赎回'
      try {
        this.viewLoding = true
        const { data } = await getFinanceDetail({ orderId: id })
        for (const key in this.ruleForm) {
          this.ruleForm[key] = data[key] ? data[key] + '' : ''
        }
        this.ruleForm.saleAmount = this.ruleForm.saleAmount || '0.00'
        this.ruleForm.actualMarginAmount = this.ruleForm.actualMarginAmount || '0.00'
        const { itemList } = data
        if (itemList && itemList.length) {
          this.tableData.list = itemList.map(item => ({
            goodsId: item.goodsId + '',
            goodsName: item.goodsName || '',
            goodsCode: item.goodsCode || '',
            goodsNo: item.goodsNo || '',
            num: item.num || 0,
            amount: item.amount || '0',
            price: item.price || '0',
            ransomAmount: item.ransomAmount || '0',
            ransomPrice: item.ransomPrice || '0'
          }))
        }
      } finally {
        this.viewLoding = false
      }
    },
    comfirm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          try {
            // 校验商品列表
            const flag = this.checkGoods()
            if (!flag) return false
            const { type } = this
            // 融资申请
            if (type === 'application') {
              const itemList = this.tableData.list.map(item => ({
                goodsId: item.goodsId || '',
                goodsCode: item.goodsCode || '',
                goodsNo: item.goodsNo || '',
                num: item.num ? item.num.toString() : '0',
                amount: item.amount ? item.amount.toString() : '0.00',
                price: item.price ? item.price.toString() : '0.0000'
              }))
              const { id: orderId } = this
              const { saleAmount, applyDate: applyDateStr, actualMarginAmount } = this.ruleForm
              const json = { saleAmount, actualMarginAmount, applyDateStr: applyDateStr + ' 00:00:00', orderId, itemList }
              await applyFinance(json)
            } else {
              // 融资赎回
              const { saleAmount, applyDate, deadlineDate } = this.ruleForm
              const { id: orderId } = this
              if (!saleAmount) {
                this.$errorMsg('订单金额必须大于0')
                return false
              }
              if (!applyDate) {
                this.$errorMsg('起算日期不能为空')
                return false
              }
              if (!deadlineDate) {
                this.$errorMsg('实际还款日不能为空')
                return false
              }
              await confirmRansom({ orderId, deadlineDate })
            }
            this.$successMsg('操作成功')
            this.$emit('comfirm')
          } catch (error) {
            this.$errorMsg(error.message)
          }
        }
      })
    },
    // 还款试算
    async calAmount() {
      const { saleAmount, applyDate, deadlineDate } = this.ruleForm
      const { id: orderId } = this
      if (!saleAmount) {
        this.$errorMsg('订单金额必须大于0')
        return false
      }
      if (!applyDate) {
        this.$errorMsg('起算日期不能为空')
        return false
      }
      if (!deadlineDate) {
        this.$errorMsg('实际还款日不能为空')
        return false
      }
      if (new Date(applyDate).getTime() > new Date(deadlineDate).getTime()) {
        this.$errorMsg('实际还款日必须大于起算日期')
        return false
      }
      try {
        this.calAmountLoading = true
        const { data } = await calRepayAmount({ orderId, deadlineDate })
        const { marginAmount, principalAmount, occupationAmount, agencyAmount, delayAmount, payableAmount } = data
        this.ruleForm.marginAmount = marginAmount || '0.00'
        this.ruleForm.principalAmount = principalAmount || '0.00'
        this.ruleForm.occupationAmount = occupationAmount || '0.00'
        this.ruleForm.agencyAmount = agencyAmount || '0.00'
        this.ruleForm.delayAmount = delayAmount || '0.00'
        this.ruleForm.payableAmount = payableAmount || '0.00'
      } catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.calAmountLoading = false
      }
    },
    // 申请赎回
    async apply() {
      const { saleAmount, applyDate, deadlineDate } = this.ruleForm
      const { id: orderId } = this
      if (!saleAmount) {
        this.$errorMsg('订单金额必须大于0')
        return false
      }
      if (!applyDate) {
        this.$errorMsg('起算日期不能为空')
        return false
      }
      if (!deadlineDate) {
        this.$errorMsg('实际还款日不能为空')
        return false
      }
      if (new Date(applyDate).getTime() > new Date(deadlineDate).getTime()) {
        this.$errorMsg('实际还款日必须大于起算日期')
        return false
      }
      try {
        this.applyLoading = true
        const { data } = await applyRansom({ orderId, deadlineDate })
        const { marginAmount, principalAmount, occupationAmount, agencyAmount, delayAmount, payableAmount, itemList } = data
        this.ruleForm.marginAmount = marginAmount || '0.00'
        this.ruleForm.principalAmount = principalAmount || '0.00'
        this.ruleForm.occupationAmount = occupationAmount || '0.00'
        this.ruleForm.agencyAmount = agencyAmount || '0.00'
        this.ruleForm.delayAmount = delayAmount || '0.00'
        this.ruleForm.payableAmount = payableAmount || '0.00'
        this.isApply = true
        if (itemList && itemList.length) {
          this.tableData.list = itemList.map(item => ({
            goodsId: item.goodsId + '',
            goodsName: item.goodsName || '',
            goodsCode: item.goodsCode || '',
            goodsNo: item.goodsNo || '',
            num: item.num || 0,
            amount: item.amount || '0',
            price: item.price || '0',
            ransomAmount: item.ransomAmount || '0',
            ransomPrice: item.ransomPrice || '0'
          }))
        }
      } catch (error) {
        this.$errorMsg(error.message)
        this.isApply = false
      } finally {
        this.applyLoading = false
      }
    },
    // 作废
    async cancellation() {
      try {
        const { saleAmount, applyDate, deadlineDate } = this.ruleForm
        const { id: orderId } = this
        if (!saleAmount) {
          this.$errorMsg('订单金额必须大于0')
          return false
        }
        if (!applyDate) {
          this.$errorMsg('起算日期不能为空')
          return false
        }
        if (!deadlineDate) {
          this.$errorMsg('实际还款日不能为空')
          return false
        }
        this.cancelLoading = true
        await cancelRansom({ orderId, deadlineDate })
        this.$successMsg('作废成功！可以重新申请赎回')
        this.isApply = false
      } catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.cancelLoading = false
      }
    },
    // 实际还款日期改变
    deadlineDateChange(value) {
      const { isApply } = this
      if (isApply) {
        if (this.oldTime !== value) {
          this.$showToast('修改实际还款日重新申请赎回，是否作废上次申请？', () => {
            this.cancellation()
          })
        }
      }
      this.oldTime = value
    },
    // 校验商品
    checkGoods() {
      let flag = true
      let totalAmount = 0
      let { saleAmount } = this.ruleForm
      saleAmount = saleAmount ? +saleAmount : 0
      if (!this.tableData.list.length) {
        this.$errorMsg(`该订单没有商品！`)
        flag = false
        return flag
      }
      for (let i = 0; i < this.tableData.list.length; i++) {
        let { price, amount } = this.tableData.list[i]
        price = price ? +price : 0
        amount = amount ? +amount : 0
        if (!price) {
          this.$errorMsg(`商品表格第${i + 1}行，商品单价必须大于0`)
          flag = false
          break
        }
        if (!amount) {
          this.$errorMsg(`商品表格第${i + 1}行，金额必须大于0`)
          flag = false
          break
        }
        totalAmount += amount
      }
      if (totalAmount !== saleAmount) {
        this.$errorMsg(`合计的商品金额与订单金额不一致!`)
        flag = false
      }
      return flag
    },
    // 计算表格数据
    calc(type, index) {
      const item = this.tableData.list[index]
      let { price, num, amount } = item
      price = price ? +price : 0
      num = num ? +num : 0
      amount = amount ? +amount : 0
      if (type === 'amount') {
        price = amount / num
        price = price.toFixed(4) + ''
      }
      this.tableData.list.splice(index, 1, { ...item, price, num, amount })
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
