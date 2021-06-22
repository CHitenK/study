<template>
   <!--  录入发票时间 组件  -->
  <JFX-Dialog
		:visible.sync="visible"
    :showClose="false"
    @comfirm="comfirm"
    :width="'66vw'"
    :title="'录入发票时间'"
    :top="'8vh'"
    closeBtnText="取 消"
    :beforeClose="close"
    v-loading="loading"
		>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
      <el-row :gutter="10" class="page-view">
        <el-col :span="12">
          <el-form-item label="发票号码：" prop="invoiceNo">
            <el-input v-model="ruleForm.invoiceNo" placeholder="请输入内容" style="width: 120%;" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="flex-l-c">
         <el-form-item label="收到发票日期：" prop="invoiceDate">
            <el-date-picker
              v-model="ruleForm.invoiceDate"
              type="date"
              style="width: 120%;"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="flex-l-c">
         <el-form-item label="发票日期：" prop="drawInvoiceDate">
            <el-date-picker
              v-model="ruleForm.drawInvoiceDate"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 120%;"
              :picker-options="pickerOptions"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开票人：" prop="invoiceName">
            <el-input v-model="ruleForm.invoiceName" placeholder="请输入内容" style="width: 120%;" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="mr-t-10">
          <!-- 表格 -->
          <JFX-table
            :tableData.sync="tableData"
            :showFixedTop="false"
            :tableHeight="'480px'"
            :showPagination="false"
          >
            <el-table-column prop="goodsNo" label="商品货号" align="center" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="num" label="采购数量" align="center" min-width="80"></el-table-column>
            <el-table-column prop="price" label="采购单价" align="center" min-width="100"></el-table-column>
            <el-table-column label="发票金额" align="center" min-width="120">
              <template slot="header">
                <span class="need">发票金额</span>
              </template>
              <template slot-scope="scope">
                <el-input-number v-model.trim="scope.row.amount" :precision="2" v-max-spot="2" :controls="false" :min="0"  style="width: 100%"></el-input-number>
             </template>
            </el-table-column>
          </JFX-table>
          <!-- 表格 end-->
        </el-col>
        <el-col :span="24">
          <el-form-item label="上传附件：" prop="type">
            <JFX-upload @success="successUpload" :url="url">
              <el-button type="primary" size="mini"  >上 传</el-button> <span class="clr-act">{{filName}}</span>
            </JFX-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
	</JFX-Dialog>
</template>
<script>
import { getPurchaseItem, updatePurchaseOrderInvoice } from '@a/purchaseManage/index'
import { attachmentUploadFiles } from '@a/base/index'
import { getBaseUrl } from '@u/tool'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    visible: { show: false },
    filterData: {}
  },
  data() {
    return {
      // table 信息
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      ruleForm: {
        invoiceNo: '',
        invoiceDate: '',
        drawInvoiceDate: '',
        invoiceName: '',
        tag: '1'
      },
      rules: {
        drawInvoiceDate: { required: true, message: '请选择发票日期', trigger: 'change' }
      },
      filName: '',
      url: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      loading: false
    }
  },
  mounted() {
    this.url = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?code=' + this.filterData.code + '&token=' + sessionStorage.getItem('token')
    this.init()
  },
  methods: {
    comfirm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (!valid) return false
        if (!this.filName) {
          this.$errorMsg('请上传附件')
          return false
        }
        let flag = true
        const amountArr = []
        const goodsNosArr = []
        for (let i = 0; i < this.tableData.list.length; i++) {
          const { amount, goodsNos } = this.tableData.list[i]
          const tips = `表格第${i + 1}行，`
          if (!amount || amount <= 0) {
            this.$errorMsg(tips + '发票金额不能为空且不能小于0')
            flag = false
            break
          }
          amountArr.push(amount)
          goodsNosArr.push(goodsNos)
        }
        if (!flag) return false
        const opt = {
          id: this.filterData.id,
          amounts: amountArr.join(','),
          goodsNos: goodsNosArr.join(','),
          ...this.ruleForm
        }
        this.loading = true
        try {
          await updatePurchaseOrderInvoice(opt)
          this.$successMsg('操作成功')
          this.$emit('comfirm')
          this.visible.show = false
        } catch (error) {
          console.log(error)
        }
        this.loading = false
      })
    },
    successUpload(res) {
      this.filName = ''
      if (+res.code === 10000) {
        this.$successMsg('上传成功')
        const { attachmentName } = res.data.attachmentInfo
        this.filName = attachmentName
      }
    },
    async init() {
      try {
        const res = await getPurchaseItem({ id: this.filterData.id })
        this.tableData.list = res.data
      } catch (error) {
        console.log(error)
      }
    },
    close() {
      this.$confirm('你将关闭该界面，数据不会被保存，是否继续关闭？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.visible.show = false
			})
    }
  }
}
</script>
<style lang="scss" scoped>
.page-view{
  width: 100%;
  margin-bottom: 10px;
}
.flex-l-c{
  display: flex;
  align-items: center;
}
/deep/.page-view .el-form-item__label{
  width: 130px;
}
</style>
