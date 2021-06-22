<template>
  <div class="page-bx bgc-w edit-bx">
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" >
      <!-- 面包屑 -->
      <JFX-Breadcrumb :showGoback="true" />
      <!-- 面包屑 end -->
      <!-- title -->
      <JFX-title title="基本信息" className="mr-t-10" />
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="事业部：" prop="buId" >
            <el-select v-model="ruleForm.buId" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getBUSelectBean('buList')" @change="changeBuId" >
              <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="付款主体：" prop="paySubject" >
            <el-select v-model="ruleForm.paySubject" style="width: 100%" placeholder="请选择" filterable clearable >
              <el-option :key="1" :label="'卓普信'" :value="'1'"></el-option>
              <el-option :key="2" :label="merchantName" :value="'2'"></el-option>
              <el-option :key="3" :label="'卓烨'" :value="'3'"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="业务模式：" prop="businessModel" >
            <el-select v-model="ruleForm.businessModel" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getSelectList('purchaseOrder_businessModelList')" >
              <el-option v-for="item in selectOpt.purchaseOrder_businessModelList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="入仓仓库：" prop="depotId" >
            <el-select v-model="ruleForm.depotId" style="width: 100%" placeholder="请选择" filterable clearable @change="changeDepotId">
              <el-option v-for="item in selectOpt.depotIdList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="供应商：" prop="supplierId" >
            <el-select v-model="ruleForm.supplierId" style="width: 100%" placeholder="请选择" filterable clearable  @change="changeSupplierId" :data-list="getSupplierList('goongyingList')" >
              <el-option v-for="item in selectOpt.goongyingList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="PO号：" prop="poNo" >
            <el-input v-model.trim="ruleForm.poNo" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="采购币种：" prop="currency" >
            <el-select v-model="ruleForm.currency" style="width: 100%" placeholder="请选择" filterable clearable :list-data="getCurrencySelectBean('currencyList', { customerId: ''})">
              <el-option v-for="item in selectOpt.currencyList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="归属日期：" prop="attributionDateStr" >
            <el-date-picker
              v-model="ruleForm.attributionDateStr"
              type="date"
              value-format="yyyy-MM-dd 00:00:00"
              style="width: 94%;"
              clearable
              :picker-options="pickerOptions"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="LBX单号：" prop="lbxNo" >
            <el-input v-model.trim="ruleForm.lbxNo" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="12">
          <el-form-item label="付款条款：" prop="paymentProvision" >
            <el-radio-group v-model="ruleForm.paymentProvision">
              <el-radio label="1">一次付款-付款发货</el-radio>
              <el-radio label="2">多次付款</el-radio>
              <el-radio label="3">一次付款-发货付款</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="海外理货单位：" :prop="depotType === 'c' ? 'tallyingUnit' : ''" >
            <el-radio-group v-model="ruleForm.tallyingUnit">
              <el-radio v-for="item in tallyingUnitList" :key="item.key" :label="item.key" :disabled="depotType !== 'c'">{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="12">
          <el-form-item label="贸易条款：" prop="tradeTerms" >
            <el-radio-group v-model="ruleForm.tradeTerms">
              <el-radio v-for="item in tradeTermsList" :key="item.key" :label="item.key">{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="12">
          <el-form-item label="运输方式：" prop="transport" >
            <el-radio-group v-model="ruleForm.transport" :data-list="getSelectList('transportList')" >
              <el-radio v-for="item in selectOpt.transportList" :key="item.key" :label="item.key">{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <JFX-title title="商品信息" className="mr-t-10 title-bx">
        <div>
          <el-button type="primary" :size="'small'" @click="choseGoods" >选择商品</el-button>
          <el-button type="primary" :size="'small'" @click="dele">删除</el-button>
        </div>
      </JFX-title>
      <div class="mr-t-20"></div>
      <!-- 表格 -->
      <JFX-table
        :tableData.sync="tableData"
        @selection-change="selectionChange"
        :showPagination="false"
        :showSummary="true"
        :summaryMethod="null"
      >
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column label="子合同" align="center" min-width="130">
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row.contractNo" clearable style="width: 100%"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="商品货号" align="center" min-width="130">
          <template slot-scope="scope">{{scope.row.goodsNo}}</template>
        </el-table-column>
        <el-table-column prop="goodsName" label="商品名称" align="center" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="条形码" align="center" min-width="130" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.barcode}}</template>
        </el-table-column>
        <el-table-column prop="num" align="center" min-width="110">
          <template slot="header">
            <span class="need">采购数量</span>
          </template>
          <template slot-scope="scope">
            <el-input-number v-model.trim="scope.row.num" :precision="0" :controls="false" :min="0" style="width: 100%;" @change="changeNumOrPrice(scope.$index)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="130">
          <template slot="header">
            <span class="need">采购单价(不含税)</span>
          </template>
          <template slot-scope="scope">
            <el-input-number v-model.trim="scope.row.price" :precision="8" v-max-spot="8" :min="0" clearable :controls="false" style="width: 100%;" @change="changeNumOrPrice(scope.$index)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="amount" align="center" min-width="140">
          <template slot="header">
            <span class="need">采购总金额(不含税)</span>
          </template>
          <template slot-scope="scope">
            <el-input-number v-model.trim="scope.row.amount" :precision="2" v-max-spot="2" :min="0" clearable :controls="false" style="width: 100%;" @change="changeAmount(scope.$index)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="taxAmount" label="采购总金额(含税)" align="center" min-width="140">
          <template slot-scope="scope">
            <el-input-number v-model.trim="scope.row.taxAmount" :precision="2" v-max-spot="2" :min="0" clearable :controls="false" style="width: 100%;" @change="changeTaxAmount(scope.$index)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="税率" align="center" min-width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.taxRate" style="width: 100%" placeholder="请选择" filterable clearable  @change="changeTaxRate(scope.$index)">
              <el-option v-for="item in selectOpt.raxList"  :key="item.key" :label="item.value" :value="item.value"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="tax" label="税额" align="center" min-width="120">
          <template slot-scope="scope">
            <el-input-number v-model.trim="scope.row.tax" :precision="2" v-max-spot="2" :min="0" clearable :controls="false" style="width: 100%;" disabled></el-input-number>
          </template>
        </el-table-column>
      </JFX-table>

    </el-form>
    <div class="mr-t-30 flex-c-c">
      <el-button type="primary" @click="save" :loading="saveLoading">保 存</el-button>
      <el-button @click="closeTag">取 消</el-button>
      <el-button type="primary" @click="nextTo" :loading="nextLoading">下一步</el-button>
    </div>
    <!-- 选择商品 -->
    <chose-products v-if="visible.show" :visible="visible" @comfirm="comfirm" :filterData="filterData"></chose-products>
    <!-- 选择商品 -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import choseProducts from '@c/choseProducts/index'
import { checkDepotMerchantRel, getDepotInfo, getPurchasePriceManage, saveOrUpdateTempOrder, savePurchaseOrder, getPurchaseOrderDetails } from '@a/purchaseManage/index'
import { getDepotDetails, getRateByCustomerAndMerchant } from '@a/salesManage/index'
import { getSMPriceByPurchaseOrder, getCurrencySelectBean } from '@a/base/index'
export default {
  mixins: [commomMix],
  components: {
    choseProducts
  },
  data() {
    return {
      ruleForm: {
        buId: '',
        paySubject: '',
        businessModel: '',
        depotId: '',
        supplierId: '',
        poNo: '',
        currency: '',
        attributionDateStr: '',
        lbxNo: '',
        tallyingUnit: '',
        tradeTerms: '',
        paymentProvision: '',
        transport: ''
      },
      rules: {
        supplierId: {required: true, message: '请选择供应商', trigger: 'change'},
        paySubject: {required: true, message: '请选择付款主体', trigger: 'change'},
        businessModel: {required: true, message: '请选择业务模式', trigger: 'change'},
        depotId: {required: true, message: '请选择入库仓库', trigger: 'change'},
        buId: {required: true, message: '请选择事业部', trigger: 'change'},
        poNo: {required: true, message: '请输入PO号', trigger: 'blur'},
        currency: {required: true, message: '采购币种不能为空', trigger: 'change'},
        attributionDateStr: {required: true, message: '归属日期不能为空', trigger: 'change'},
        tallyingUnit: {required: true, message: '理货单位不能为空', trigger: 'change'},
        tradeTerms: {required: true, message: '贸易条款不能为空', trigger: 'change'},
        paymentProvision: {required: true, message: '付款条款不能为空', trigger: 'change'},
        transport: {required: true, message: '运输方式不能为空', trigger: 'change'}
      },
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      visible: { show: false },
      saveLoading: false,
      filterData: {},
      merchantName: '',
      tallyingUnitList: [
        { key: '00', value: '托盘' },
        { key: '01', value: '箱' },
        { key: '02', value: '件' }
      ],
      depotType: '',
      isTopBooks: '',
      isInOutInstruction: '',
      addressSelect: false,
      purchasePriceManage: false,
      orderStatus: '',
      nextLoading: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      // 贸易条款 1- CIF 2-CRF 3-FOB 4-DPA 5-EXW
      tradeTermsList: [
        { key: '1', value: 'CIF' },
        { key: '2', value: 'CRF' },
        { key: '3', value: 'FOB' },
        { key: '4', value: 'DPA' },
        { key: '5', value: 'EXW' }
      ]
    }
  },
  mounted() {
    this.getRaxList('raxList') // 获取税率下拉
    this.setMerchantName()
    this.init()
  },
  methods: {
    async init() {
      const { query } = this.$route
      if (!query.id) return false
      this.audit = !!query.audit
      try {
        const res = await getPurchaseOrderDetails({ id: query.id })
        for (let key in this.ruleForm) {
          this.ruleForm[key] = res.data[key] ? res.data[key] + '' : ''
          if (key.includes('Str')) {
            const key1 = key.replace(/Str/gi, '')
            this.ruleForm[key] = res.data[key1] ? res.data[key1].toString() : ''
          }
        }
        this.orderStatus = res.data.status || ''
        // 根据事业部获取入库仓库下拉列表
        this.changeBuId('init')
        // 根据入库仓库获取入库关区列表
        this.changeDepotId('init')
        const list = []
        if (res.data.itemList && res.data.itemList.length > 0) {
          res.data.itemList.forEach(item => {
            // 获取表格需要的数据
            const { goodsId, id, contractNo, goodsName, barcode, goodsNo, goodsCode, num, price, amount } = item
            const { taxAmount, taxPrice, tax, taxRate } = item
            let taxAmountNew = taxRate && Number(taxRate) > 0 ? taxAmount : amount
            list.push({
              goodsId,
              id,
              contractNo,
              goodsCode,
              goodsName,
              barcode,
              goodsNo,
              num,
              price,
              amount,
              taxAmount: taxAmountNew,
              taxPrice,
              tax,
              taxRate: taxRate || '0.00'
            })
          })
        }
        this.tableData.list = list
      } catch (err) {}
    },
    async comfirm(data) {
      if (!data) {
        this.$errorMsg('请选择商品！')
        return false
      }
      const list = []
      let unitChangeFlag = true
      let goodsFlag = true
      let goodsNo = ''
      // 根据供应商带出对应税率 并计算
      const res = await getRateByCustomerAndMerchant({ customerId: this.ruleForm.supplierId })
      const taxRateId = res.data.rateId || ''
      const targetData = this.selectOpt.raxList.find(item => +item.key === +taxRateId) || {}
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        const jsonData = {
          customerId: this.ruleForm.supplierId + '',
          currency: this.ruleForm.currency,
          commbarcode: item.commbarcode,
          buId: this.ruleForm.buId
        }
        if (this.ruleForm.attributionDateStr) {
          jsonData.effectiveDateStr = this.ruleForm.attributionDateStr
        }
        let price = item.supplyMinPrice || 0
        if (this.purchasePriceManage) {
          const result = await getSMPriceByPurchaseOrder(jsonData)
          if (result.data && result.data.supplyPrice) {
            price = result.data.supplyPrice
            if (this.depotType === 'c') {
              if (this.ruleForm.tallyingUnit === '00') {
                if (!result.data.torrToUnit) {
                  this.$errorMsg('货号:' + item.goodsNo + '未找到托转件数据')
                  unitChangeFlag = false
                  break
                } else {
                  price = parseFloat(price) * result.data.torrToUnit
                }
              } else if (this.ruleForm.tallyingUnit === '01') {
                if (!result.data.boxToUnit) {
                  this.$errorMsg('货号:' + item.goodsNo + '未找到托转件数据')
                  unitChangeFlag = false
                  break
                } else {
                  price = parseFloat(price) * result.data.boxToUnit
                }
              }
            }
          } else {
            goodsFlag = false
            goodsNo = item.goodsNo
            break
          }
        }
        const taxRate = targetData.value || '0.00'
        const amount = 1 * Number(price)
        const taxAmount = amount * (1 + Number(taxRate))
        const tax = taxAmount - amount
        list.push({
          goodsId: item.id,
          id: item.id,
          contractNo: '',
          goodsName: item.name,
          barcode: item.barcode || '',
          goodsNo: item.goodsNo,
          goodsCode: item.goodsCode || '',
          num: 1,
          price,
          amount: amount.toFixed(2),
          taxAmount: taxAmount.toFixed(2),
          tax: tax.toFixed(2),
          taxRate
        })
      }
      if (!unitChangeFlag) return false
      if (!goodsFlag) {
        this.visible.show = false
        this.$alertError('该公司事业部已开启采购价格管理，货号：' + goodsNo + '未找到供应商商品价格')
        return false
      }
      this.tableData.list = this.tableData.list = [...this.tableData.list, ...list]
      this.visible.show = false
    },
    async save() {
      if (!this.ruleForm.buId) {
        this.$errorMsg('事业部不能为空！')
        return false
      }
      let flag = true
      for (let i = 0; i < this.tableData.list.length; i++) {
        const { num } = this.tableData.list[i]
        const tips = `表格第${i + 1}行,`
        if (!num || num < 0) {
          this.$errorMsg(tips + '数量要大于0')
          flag = false
          break
        }
      }
      if (!flag) return false
      this.saveLoading = true
      try {
        const opt = this.handleCommitOpt()
        if (!opt.tallyingUnit) delete opt.tallyingUnit
        await saveOrUpdateTempOrder(opt)
        this.$successMsg('编辑成功')
        this.closeTag()
      } catch (error) {
        console.log(error)
      }
      this.saveLoading = false
    },
    async choseGoods() {
      const { depotId, buId, supplierId, tallyingUnit } = this.ruleForm
      if (!buId) {
        this.$errorMsg('请选择事业部')
        return false
      }
      if (!depotId) {
        this.$errorMsg('请选择仓库')
        return false
      }
      if (!supplierId) {
        this.$errorMsg('请选择供应商')
        return false
      }
      const res = await getPurchasePriceManage({ buId, supplierId })
      this.purchasePriceManage = res.data
      if (this.purchasePriceManage && this.depotType === 'c') {
        if (!tallyingUnit) {
          this.$errorMsg('仓库为海外仓时，请先选择【理货单位】')
          return false
        }
      }
      const unNeedIds = this.tableData.list.map(item => item.goodsId).toString()
      this.filterData = {
        depotId,
        unNeedIds: unNeedIds,
        popupType: 1
      }
      this.visible.show = true
    },
    async setMerchantName() {
      const userInfo = this.getUserInfo()
      this.merchantName = userInfo.merchantName || ''
    },
    // 选中事业部
    async changeBuId(type) {
      delete this.selectOpt.depotIdList
      const { buId } = this.ruleForm
      // 获取入库仓库
      this.getSelectBeanByMerchantBuRel('depotIdList', { buId, type: 'a,c,d' })
      if (type !== 'init') { // 不是初始时,清空
        this.ruleForm.depotId = ''
      }
    },
    // 选中入库仓库
    async changeDepotId(type) {
      const { depotId } = this.ruleForm
      if (depotId) {
        delete this.selectOpt.goongyingList
        this.getSelectCustomsArea('customsAreaList', { depotId })
        const res = await getDepotDetails({ id: depotId })
        this.isTopBooks = res.data.isTopBooks || ''
        this.depotType = res.data.type || ''
        if (this.depotType === 'a') {
          const res1 = await checkDepotMerchantRel({ depotId })
          this.isInOutInstruction = res1.data.isInOutInstruction + ''
          if (this.ruleForm.unloadPort === 'other') this.ruleForm.unloadPort = ''
        }
        // 根据入仓仓库改变目的地
        const res2 = await getDepotInfo({ depotId })
        if (res2.data + '' === '1') {
          this.addressSelect = true // 目的地名称是否选择框
          // 获取下拉数据
          delete this.selectOpt.arrList
          this.getdepotArrList('arrList', { depotId })
        } else {
          this.addressSelect = false
        }
      }
      if (type !== 'init') { // 不是初始时,清空
        this.tableData.list = []
        this.ruleForm.tallyingUnit = ''
      }
    },
    // 选中供应商
    async changeSupplierId() {
      const { supplierId } = this.ruleForm
      if (supplierId) {
        const res = await getCurrencySelectBean({ customerId: supplierId })
        // 根据供应商选择带出对应的币种
        this.ruleForm.currency = res.data || ''
      }
    },
    // 输入采购数量/单价
    changeNumOrPrice(index) {
      let { price, num, taxRate } = this.tableData.list[index]
      num = +num || 0
      price = +price || 0
      taxRate = +taxRate || 0
      const amount = price * num
      const taxAmount = amount * (1 + taxRate)
      const tax = taxAmount - amount
      this.tableData.list[index].amount = amount.toFixed(2)
      this.tableData.list[index].taxAmount = taxAmount.toFixed(2) || ''
      this.tableData.list[index].tax = tax.toFixed(2) || ''
    },
    // 改变采购总金额(不含税)
    changeAmount(index) {
      let { amount, num, taxRate } = this.tableData.list[index]
      taxRate = taxRate ? Number(taxRate) : 0
      amount = amount ? Number(amount) : 0
      const price = num > 0 ? amount / num : ''
      const taxAmount = amount * (1 + taxRate)
      const tax = taxAmount - amount
      this.tableData.list[index].price = price.toFixed(8)
      this.tableData.list[index].taxAmount = taxAmount.toFixed(2) || ''
      this.tableData.list[index].tax = tax.toFixed(2) || ''
    },
    // 改变采购总金额(含税)
    changeTaxAmount(index) {
      let { taxAmount, num, taxRate } = this.tableData.list[index]
      taxAmount = +taxAmount || 0
      taxRate = +taxRate || 0
      taxRate = +taxRate || 0
      const amount = taxAmount / (1 + taxRate)
      const tax = taxAmount - amount
      this.tableData.list[index].amount = amount.toFixed(2)
      this.tableData.list[index].tax = tax.toFixed(2)
      if (num && num > 0) {
        const price = amount / num
        this.tableData.list[index].price = price.toFixed(8)
      }
    },
    // 修改税率
    changeTaxRate(index) {
      let { taxRate, amount } = this.tableData.list[index]
      if (!taxRate) return false
      amount = +amount || 0
      taxRate = +taxRate
      const taxAmount = amount * (1 + taxRate)
      const tax = taxAmount - amount
      this.tableData.list[index].taxAmount = taxAmount.toFixed(2)
      this.tableData.list[index].tax = tax.toFixed(2)
    },
    // 点击删除
    dele() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      const arr = this.tableChoseList.map(item => item.goodsNo)
      const list = []
      this.tableData.list.map((item) => {
        if (!arr.includes(item.goodsNo)) {
          list.push(item)
        }
      })
      this.tableData.list = list
    },
    // 点击下一步
    nextTo() {
      // 数据校验
      this.$refs['ruleForm'].validate(async(valid) => {
        if (!valid) {
          this.$errorMsg('请先完善信息')
          return false
        }
        this.nextLoading = true
        try {
          if (this.ruleForm.boxNum && isNaN(this.ruleForm.boxNum)) {
            this.$errorMsg('箱数请输入数值！')
            throw new Error(false)
          }
          if (this.ruleForm.torrNum && isNaN(this.ruleForm.torrNum)) {
            this.$errorMsg('托数请输入数值！')
            throw new Error(false)
          }
          const result = await getDepotDetails({ id: this.ruleForm.depotId })
          const isOverseas = result.data.type === 'c'
          // 如果仓库为海外仓，海外仓理货单位必填
          if (isOverseas && !this.ruleForm.tallyingUnit) {
            this.$errorMsg('仓库为海外仓时，理货单位必填！')
            throw new Error(false)
          }
          if (this.tableData.list.length < 1) {
            this.$errorMsg('请选择商品')
            throw new Error(false)
          }
          // 校验表格数据
          let flag = true
          for (let i = 0; i < this.tableData.list.length; i++) {
            let { num, price = '' } = this.tableData.list[i]
            const tips = `表格第${i + 1}行,`
            if (!num || num < 0) {
              this.$errorMsg(tips + '数量要大于0')
              flag = false
              break
            }
            if (price === '' || Number(price) < 0) {
              this.$errorMsg(tips + '采购单价(不含税)不能为空且不能小于0')
              flag = false
              break
            }
          }
          if (!flag) throw new Error(false)
          this.saveDataOne()
        } catch (error) {
          console.log(error)
        }
        this.nextLoading = false
      })
    },
    // 下一步保存数据
    saveDataOne() {
      this.nextLoading = false
      this.$confirm('确定提交该采购订单？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.commitSave()
      })
    },
    // 下一步提交数据
    async commitSave() {
      const opt = this.handleCommitOpt()
      if (!opt.tallyingUnit) delete opt.tallyingUnit
      try {
        this.nextLoading = true
        const res = await savePurchaseOrder(opt)
        this.$successMsg('编辑成功，请编辑合同')
        this.closeTagByIndex(this.$route.path, () => {
          this.linkTo('/purchase/contract?id=' + res.data + '&customerId=' + this.ruleForm.supplierId)
        })
      } catch (error) {
        console.log(error)
      }
      this.nextLoading = false
    },
    // 统一处理提交参数
    handleCommitOpt() {
      // 参数为字符串
      for (let key in this.ruleForm) {
        this.ruleForm[key] = this.ruleForm[key] ? this.ruleForm[key] + '' : ''
      }
      const list = []
      this.tableData.list.forEach(item => {
        for (let key in item) {
          item[key] = item[key] ? item[key] + '' : ''
        }
        let { contractNo, goodsId, num, amount, price, barcode, taxAmount, taxRate, tax } = item
        // 数值输入框为空时,统一处理为0
        const taxPrice = taxAmount && num ? (+taxAmount / +num).toFixed(2) : '0'
        num = num || '0'
        price = price ? (+price).toFixed(8) : '0'
        amount = amount || '0'
        taxRate = taxRate || '0'
        tax = tax || '0'
        taxAmount = taxRate > 0 ? taxAmount : amount // 如果税率为0, 含税金额与不含税金额保持一致
        list.push({contractNo, goodsId, num, amount, price: price, barcode, taxAmount, taxPrice, taxRate, tax})
      })
      const opt = {
        ...this.ruleForm,
        items: JSON.stringify(list)
      }
      return opt
    }
  }
}
</script>
<style>
  .edit-bx .el-form-item__label {
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
.edit-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
</style>
<style lang="scss" scoped>
.image-preview{
  display: inline-block;
}
.title-bx{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tongji-item{
  display: inline-block;
  width: 220px;
}
</style>
