<template>
  <div class="page-bx bgc-w order-edit-bx finace-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <JFX-title title="融资申请信息" className="mr-t-20" />
    <el-form class="mr-t-20" :model="ruleForm" ref="ruleForm" :rules="rules" >
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="供应商：" prop="supplierCode" >
            <el-select v-model="ruleForm.supplierCode" placeholder="请选择" filterable clearable style="width: 100%">
              <el-option v-for="item in supplierList"  :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="入库仓库：" prop="depotCode" >
            <el-select v-model="ruleForm.depotCode" placeholder="请选择" filterable clearable style="width: 100%">
              <el-option v-for="item in warehouseList"  :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6"  >
          <el-form-item label="采购币种" prop="billCurrencCode" >
            <el-select v-model="ruleForm.billCurrencCode" placeholder="请选择"  clearable style="width: 100%" >
              <el-option v-for="item in currencList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="业务类型：" >
            <el-input value="跨境现金代采" readonly style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="资金方：" >
            <el-input value="卓普信" readonly style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="计息币种：" prop="interestCurrencyLabel" >
            <el-input v-model.trim="ruleForm.interestCurrencyLabel" readonly style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="融资天数：" prop="borrowingDays" >
            <el-input-number v-model.trim="ruleForm.borrowingDays" :precision="0" :controls="false" :min="0"  style="width: 100%"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="采购合同号：" prop="poNo" >
            <el-input v-model.trim="ruleForm.poNo" clearable placeholder="请输入内容" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="付款条款：" prop="paymentTermId" >
            <el-select v-model="ruleForm.paymentTermId" placeholder="请选择" filterable clearable style="width: 100%">
              <el-option v-for="item in paymentTermList"  :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="提货地址：" prop="warehouseAddress" >
            <el-input v-model.trim="ruleForm.warehouseAddress" clearable placeholder="请输入内容" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="贸易方式：" prop="tradeMode" >
            <el-select v-model="ruleForm.tradeMode" placeholder="请选择" filterable clearable style="width: 100%">
              <el-option v-for="item in tradeMode"  :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="预计交货日期：" prop="expDeliveryDate" style="width: 100%" >
            <el-date-picker
              v-model="ruleForm.expDeliveryDate"
              type="date"
              value-format="yyyy-MM-dd 00:00:00"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24" >
          <el-form-item prop="loanApplyRemark" >
            <span slot="label">备注：</span>
            <el-input type="textarea" :rows="3" v-model.trim="ruleForm.loanApplyRemark" clearable placeholder="请输入内容" style="width: 300px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <JFX-title title="融资成本" className="mr-t-15" />
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="采购总金额：" prop="purchaseAmount" >
            <el-input-number v-model.trim="ruleForm.purchaseAmount" :precision="2" v-max-spot="2" :controls="false" :min="0" style="width: 100%" disabled></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="采购折扣金额：" prop="purchaseDiscountAmount" >
            <el-input-number v-model.trim="ruleForm.purchaseDiscountAmount" :precision="6" v-max-spot="6" :controls="false" :min="0" style="width: 100%" @change="count"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="保证金比例(%)：" prop="marginLevelRatio" >
            <el-input-number v-model.trim="ruleForm.marginLevelRatio" :precision="2" v-max-spot="2" :controls="false" :min="0" style="width: 100%"  @change="count"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="应付保证金：" prop="marginPayableAmount" >
            <el-input-number v-model.trim="ruleForm.marginPayableAmount" :precision="6" v-max-spot="6" :controls="false" :min="0" style="width: 100%" disabled></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <JFX-title title="融资商品" className="title-bx mr-t-15" >
        <div>
        <el-button type="primary" @click="openLay" >选择商品</el-button>
        <el-button type="primary" @click="dele" >删除</el-button>
        </div>
      </JFX-title>
      <div class="mr-t-10"></div>
      <JFX-table
        :tableData.sync="tableData"
        :showPagination="false"
        :showSummary="true"
        @selection-change="selectionChange"
        :summaryMethod="null"
      >
        <el-table-column type="selection" width="50" align="center" fixed="left"> </el-table-column>
        <el-table-column label="商品货号" align="center" min-width="130" >
          <template slot-scope="scope">{{scope.row.goodsNo}}</template>
        </el-table-column>
        <el-table-column label="商品名称" align="center" min-width="110" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.goodsName}}</template>
        </el-table-column>
        <el-table-column label="条形码" align="center" min-width="130" >
          <template slot-scope="scope">{{scope.row.barcode}}</template>
        </el-table-column>
        <el-table-column label="商品原产地" align="center" min-width="130">
          <template slot="header">
            <span class="need">商品原产地</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row.originCountry" placeholder="请输入" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="100" >
          <template slot="header">
            <span class="need">商品保质天数</span>
          </template>
          <template slot-scope="scope">
            <JFX-Input v-model.trim="scope.row.qualityGuaranteeDates" :min="0" placeholder="请输入" style="width: 100%;" />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="purchaseQuantity" min-width="100" >
          <template slot="header">
            <span class="need">采购数量</span>
          </template>
          <template slot-scope="scope">
            <el-input-number v-model.trim="scope.row.purchaseQuantity" :precision="0" :controls="false" :min="0" style="width: 100%;" @change="changeQuantity(scope.$index)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="采购单价" align="center" min-width="100" >
          <template slot-scope="scope">{{scope.row.purchasePrice}}</template>
        </el-table-column>
        <el-table-column prop="purchaseAmount" align="center" min-width="140">
          <template slot="header">
            <span class="need">采购金额</span>
          </template>
          <template slot-scope="scope">
            <el-input-number v-model.trim="scope.row.purchaseAmount" :precision="6" v-max-spot="6" :controls="false" :min="0" style="width: 100%;" @blur="changeAmount(scope.$index)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="规格型号" align="center" min-width="110" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.spec}}</template>
        </el-table-column>
      </JFX-table>
    </el-form>
    <div class="mr-t-20"></div>
    <JFX-title title="附件列表" className="mr-t-20" />
    <div class="mr-t-15 fs-14 clr-II">
      <JFX-upload @success="successUpload" :url="action" :limit="10000" :multiple="false">
       <el-button id="sale-upload-btn" type="primary">上传附件</el-button><span class="clr-II fs-10">(支持JPG、JPEG、BMP、PNG、GIF、PDF、DOCX、DOC、XLS、XLSX格式)</span>
      </JFX-upload>
    </div>
    <div class="mr-t-15"></div>
    <enclosure-list :code="detail.code" v-if="detail.code" ref="enclosure" :showAction="false"></enclosure-list>
    <div class="mr-t-30 flex-c-c">
      <el-button type="primary" @click="save" :loading="saveLoading">提 交</el-button>
      <el-button @click="closeTag" id="cancel_ret">取 消</el-button>
    </div>
    <!-- 选择商品 -->
    <chose-products v-if="visible.show" :visible.sync="visible" @comfirm="comfirm" :filterData="filterData"></chose-products>
    <!-- 选择商品 -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import { getBaseUrl } from '@u/tool'
import { attachmentUploadFiles } from '@a/base/index'
import { toFinancingPage, getSapienceApiInfo, submitSapience } from '@a/purchaseManage/index'
export default {
  mixins: [commomMix],
  components: {
    enclosureList: () => import('@c/enclosureList/index'),
    choseProducts: () => import('@c/choseProducts/index')
  },
  data() {
    return {
      ruleForm: {
        supplierCode: '',
        depotCode: '',
        billCurrencCode: '',
        businessModel: 'DC001',
        investorType: '1',
        interestCurrency: '',
        poNo: '',
        paymentTermId: '',
        borrowingDays: '',
        warehouseAddress: '',
        tradeMode: '',
        loanApplyRemark: '',
        expDeliveryDate: '',
        purchaseAmount: '',
        purchaseDiscountAmount: '',
        marginLevelRatio: '',
        marginPayableAmount: '',
        interestCurrencyLabel: ''
      },
      rules: {
        warehouseAddress: { required: true, message: '提货地址不能为空', trigger: 'blur' },
        poNo: { required: true, message: '采购合同号不能为空', trigger: 'blur' },
        supplierCode: { required: true, message: '供应商不能为空', trigger: 'change' },
        depotCode: { required: true, message: '入库仓库不能为空', trigger: 'change' },
        billCurrencCode: { required: true, message: '采购币种不能为空', trigger: 'change' },
        interestCurrency: { required: true, message: '计息币种不能为空', trigger: 'change' },
        borrowingDays: { required: true, message: '融资天数不能为空', trigger: 'change' },
        paymentTermId: { required: true, message: '付款条款不能为空', trigger: 'change' },
        marginLevelRatio: { required: true, message: '保证金比例不能为空', trigger: 'change' }
      },
      currencList: [
        { key: 'HKD', value: '港币' },
        { key: 'JPY', value: '日元' },
        { key: 'USD', value: '美元' },
        { key: 'AUD', value: '澳元' },
        { key: 'EUR', value: '欧元' }
      ],
      action: '',
      detail: {},
      warehouseList: [],
      supplierList: [],
      tradeMode: [],
      paymentTermList: [],
      visible: { show: false },
      filterData: {},
      saveLoading: false
    }
  },
  mounted() {
    this.init()
    this.getSelectAllData()
  },
  methods: {
    async init() {
      const { query } = this.$route
      if (!query.ids) return false
      try {
        const res = await toFinancingPage({ ids: query.ids })
        this.detail = res.data
        this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + this.detail.code
        this.tableData.list = res.data.itemList || []
        for (let key in this.ruleForm) {
          if (!this.ruleForm[key] && res.data[key]) {
            this.ruleForm[key] = res.data[key]
          }
        }
        if (!this.ruleForm.marginLevelRatio) {
          this.ruleForm.marginLevelRatio = 20
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 上传成功
    successUpload(res) {
      if (res.code + '' === '10000') {
        this.$refs['enclosure'].getEnclosureList(1)
      } else {
        this.$errorMsg(res.data)
      }
    },
    // 改变采购数量执行
    changeQuantity(index) {
      const { purchaseQuantity, purchaseAmount } = this.tableData.list[index]
      if (purchaseQuantity && purchaseAmount) {
        const purchasePrice = purchaseAmount / purchaseQuantity
        this.tableData.list[index].purchasePrice = purchasePrice.toFixed(8)
      }
    },
    // 改变采购金额
    changeAmount(index) {
      this.changeQuantity(index)
      this.count()
    },
    count() {
      let purchaseAmountTotal = 0
      this.tableData.list.forEach(item => {
        const { purchaseAmount } = item
        purchaseAmountTotal += (purchaseAmount || 0)
      })
      this.ruleForm.purchaseAmount = purchaseAmountTotal > 0 ? purchaseAmountTotal.toFixed(6) : this.ruleForm.purchaseAmount // 采购总金额
      const purchaseDiscountAmount = this.ruleForm.purchaseDiscountAmount || 0
      const marginLevelRatio = this.ruleForm.marginLevelRatio && this.ruleForm.marginLevelRatio > 0 ? this.ruleForm.marginLevelRatio / 100 : 0
      const marginPayableAmount = (this.ruleForm.purchaseAmount - purchaseDiscountAmount) * marginLevelRatio
      this.ruleForm.marginPayableAmount = marginPayableAmount.toFixed(6) // 应付保证金
    },
    // 获取下拉列表数据
    async getSelectAllData() {
      const res = await getSapienceApiInfo()
      if (res.data && typeof (res.data) === 'string') {
        const data = JSON.parse(res.data)
        console.log(data.result)
        const { warehouseList, supplierList, tradeMode, paymentTermList } = data.result
        this.warehouseList = warehouseList || []
        this.supplierList = supplierList || []
        this.paymentTermList = paymentTermList || []
        this.tradeMode = tradeMode || []
      }
    },
    comfirm(list) {
      if (list && list.length > 0) {
        list.forEach(item => {
          const { goodsNo, id, barcode, spec, name, originCountry, qualityGuaranteeDates, purchasePrice } = item
          this.tableData.list.push({
            goodsNo,
            barcode,
            spec,
            originCountry,
            qualityGuaranteeDates,
            goodsId: id,
            goodsName: name,
            purchasePrice: purchasePrice || ''
          })
        })
      }
      this.visible.show = false
    },
    openLay() {
      const unNeedIds = this.tableData.list.map(item => item.goodsId).toString()
      this.filterData = { unNeedIds }
      this.visible.show = true
    },
    // 删除
    dele() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      const list = []
      const goodsIds = this.tableChoseList.map(item => +item.goodsId)
      this.tableData.list.forEach(item => {
        if (!goodsIds.includes(+item.goodsId)) {
          list.push(item)
        }
      })
      this.tableData.list = list
    },
    // 保存
    save() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let flag = true
          const items = []
          for (let i = 0; i < this.tableData.list.length; i++) {
            const { purchaseQuantity, purchaseAmount, goodsId, purchasePrice, qualityGuaranteeDates, originCountry } = this.tableData.list[i]
            const tips = `表格第${i + 1}行,`
            if (!originCountry) {
              this.$errorMsg(tips + '商品原产地不能为空')
              flag = false
              break
            }
            if (!this.$transformZeroBl(qualityGuaranteeDates)) {
              this.$errorMsg(tips + '商品保质天数不能为空')
              flag = false
              break
            }
            if (!purchaseQuantity) {
              this.$errorMsg(tips + '采购数量不能为空且大于0')
              flag = false
              break
            }
            if (!purchaseAmount) {
              this.$errorMsg(tips + '采购金额不能为空且大于0')
              flag = false
              break
            }
            items.push({
              goodsId: goodsId + '',
              purchaseQuantity: purchaseQuantity + '',
              purchasePrice: purchasePrice + '',
              purchaseAmount: purchaseAmount + '',
              qualityGuaranteeDates,
              originCountry
            })
          }
          if (!flag) return false
          this.$confirm('确定提交该融资订单？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async() => {
            this.saveLoading = true
            const supplierData = this.supplierList.find(item => item.code === this.ruleForm.supplierCode) || {}
            const depotData = this.warehouseList.find(item => item.code === this.ruleForm.depotCode) || {}
            const paymentTermData = this.paymentTermList.find(item => item.id === this.ruleForm.paymentTermId) || {}
            try {
              const opt = {
                ...this.ruleForm,
                items: JSON.stringify(items),
                purchaseOrders: this.detail.purchaseOrders,
                code: this.detail.code,
                supplierName: supplierData.name || '',
                depotName: depotData.name || '',
                paymentTermName: paymentTermData.name || '',
                expDeliveryDateStr: this.ruleForm.expDeliveryDate
              }
              await submitSapience(opt)
              this.$successMsg('提交成功！附件生成中，请稍后查看【附件列表】')
              this.closeTag()
            } catch (error) {
              if (error && error.code) {
                this.$errorMsg(error.data)
              }
            }
            this.saveLoading = false
          })
        } else {
          this.$errorMsg('请先完善信息')
        }
      })
    }
  }
}
</script>
<style>
.finace-bx .el-form-item__label {
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
.finace-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
</style>
<style lang="scss" scoped>
.title-bx{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
