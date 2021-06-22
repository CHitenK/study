<template>
  <div class="page-bx bgc-w order-edit-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" :breadcrumb="breadcrumb" />
    <JFX-title title="基本信息" className="mr-t-20" />
    <el-form class="mr-t-20" :model="ruleForm" ref="ruleForm" :rules="rules" >
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="公司：" prop="merchantName" >
            <el-input v-model.trim="ruleForm.merchantName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="供应商：" prop="supplierId" >
            <el-select v-model="ruleForm.supplierId" placeholder="请选择" filterable disabled clearable :data-list="getSupplierList('suppList')" >
              <el-option v-for="item in selectOpt.suppList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="出仓仓库：" prop="outDepotId" >
            <el-select v-model="ruleForm.outDepotId" placeholder="请选择" filterable disabled clearable :data-list="getSelectBeanByMerchantRel('outDepotList')">
              <el-option v-for="item in selectOpt.outDepotList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="是否同关区：" prop="isSameArea" >
            <el-select v-model="ruleForm.isSameArea" placeholder="请选择" clearable :data-list="getSelectList('isSameAreaList')" >
              <el-option v-for="item in selectOpt.isSameAreaList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="入仓仓库：" prop="inDepotId" >
            <el-select v-model="ruleForm.inDepotId" placeholder="请选择" filterable clearable :data-list="getSelectBeanByMerchantRel('inDepotList')" >
              <el-option v-for="item in selectOpt.inDepotList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="事业部：" prop="buId" >
            <el-select v-model="ruleForm.buId" placeholder="请选择" filterable disabled clearable :data-list="getBUSelectBean('buList')" >
              <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="PO单号：" prop="poNo" >
            <el-input v-model.trim="ruleForm.poNo" clearable placeholder="PO单号不能为空"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="采购币种：" prop="currency" >
            <el-select v-model="ruleForm.currency" placeholder="请选择" filterable clearable :data-list="getCurrencySelectBean('biList')" >
              <el-option v-for="item in selectOpt.biList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="合同号：" prop="contractNo" >
            <el-input v-model.trim="ruleForm.contractNo" clearable placeholder="合同号不能为空"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="目的地：" prop="destinationName" >
            <el-select v-model="ruleForm.destinationName" placeholder="请选择" clearable :data-list="getSelectList('purchaseReturnOrder_destinationList')" >
              <el-option v-for="item in selectOpt.purchaseReturnOrder_destinationList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="备注：" prop="remark" >
            <el-input v-model.trim="ruleForm.remark" clearable placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="理货单位：" prop="tallyingUnit" >
            <el-select v-model="ruleForm.tallyingUnit" placeholder="请选择"  clearable :data-list="getSelectList('order_tallyingUnitList')" >
              <el-option v-for="item in selectOpt.order_tallyingUnitList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="目的地址：" prop="destinationAddress" >
            <el-input v-model.trim="ruleForm.destinationAddress" clearable placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <JFX-title title="收件信息" className="mr-t-20" v-if="depotType === 'c'" />
      <el-row  :gutter="10" class="fs-14 clr-II" v-if="depotType === 'c'">
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="提货方式：" prop="deliveryMethod" >
            <el-select v-model="ruleForm.deliveryMethod" placeholder="请选择" filterable clearable :data-list="getSelectList('purchaseReturnOrder_mailModeList')" @change="changeDeliveryMethod" >
              <el-option v-for="item in selectOpt.purchaseReturnOrder_mailModeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="收货人名称：" prop="deliveryName" >
            <el-input v-model.trim="ruleForm.deliveryName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="国家：" prop="country" >
            <el-input v-model.trim="ruleForm.country"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="详细地址：" prop="deliveryAddr" >
            <el-input v-model.trim="ruleForm.deliveryAddr" style="width: 710px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <JFX-title title="采购退货商品明细" className="mr-t-20" />
    <div class="mr-t-20"></div>
    <!-- 表格 -->
    <JFX-table
      :tableData.sync="tableData"
      :showPagination="false"
    >
      <el-table-column
				align="center"
				width="80"
        fixed="left"
				label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="reduce(scope.$index)" v-if="tableData.list.length > 1">
              <i class="el-icon-minus fs-16"></i>
            </el-button>
            <el-button type="text" @click="add(scope.$index)">
              <i class="el-icon-plus fs-16"></i>
            </el-button>
          </template>
      </el-table-column>
      <el-table-column prop="code" label="商品货号" align="center" min-width="120" fixed="left">
         <template slot-scope="scope">
           <div>
             <div>{{scope.row.goodsNo}}</div>
             <el-button type="primary" :size="'small'" @click="openLay(scope.$index)" >选择商品</el-button>
           </div>
         </template>
      </el-table-column>
      <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="barcode" label="商品条形码" align="center" min-width="110" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" min-width="100">
        <template slot="header">
          <span class="need">退货商品数量</span>
          </template>
        <template slot-scope="scope">
          <el-input-number v-model.trim="scope.row.returnNum" :precision="0" :controls="false" :min="0"  style="width: 100%" @blur="count('num', scope.$index)"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="130">
        <template slot="header">
          <span id="declarePrice-cell">申报单价</span>
          </template>
        <template slot-scope="scope">
          <el-input-number v-model.trim="scope.row.declarePrice" :precision="5" v-max-spot="5" :controls="false" :min="0"  style="width: 100%"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="130">
        <template slot="header">
         <span class="need">退货单价<br />(不含税)</span>
        </template>
        <template slot-scope="scope">
          <el-input-number v-model.trim="scope.row.returnPrice" :precision="8" v-max-spot="8" :controls="false" :min="0"  style="width: 100%" @blur="count('price', scope.$index)"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="130">
        <template slot="header">
          <span class="need">退货总金额<br />(不含税)</span>
          </template>
        <template slot-scope="scope">
          <el-input-number v-model.trim="scope.row.returnAmount" :precision="2" v-max-spot="2" :controls="false" :min="0"  style="width: 100%" @blur="count('amount', scope.$index)"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="110">
        <template slot="header">
          <span>退货总金额<br />(含税)</span>
          </template>
        <template slot-scope="scope">
          <el-input-number v-model.trim="scope.row.taxReturnAmount" :precision="2" v-max-spot="2" :controls="false" :min="0"  style="width: 100%" @blur="changeTaxReturnAmount(scope.$index)"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="110">
        <template slot="header">
          <span class="need">税率</span>
          </template>
        <template slot-scope="scope">
          <el-select v-model="scope.row.taxRate" placeholder="请选择" style="width: 100%" clearable :data-list="getRaxList('shuiList')"  @change="count('taxRate', scope.$index)">
            <el-option v-for="item in selectOpt.shuiList"  :key="item.key" :label="item.value" :value="item.value"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="税额" align="center" min-width="100">
        <template slot-scope="scope">
          {{scope.row.tax || '0.00'}}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="140">
        <template slot="header">
          <span class="need">品牌类型</span>
          </template>
        <template slot-scope="scope">
          <el-input v-model.trim="scope.row.brandName" clearable style="width: 100%"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="箱号" align="center" min-width="100">
        <template slot-scope="scope">
          <el-input v-model.trim="scope.row.boxNo" clearable style="width: 100%" :title="scope.row.boxNo" ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="合同号" align="center" min-width="120">
        <template slot-scope="scope">
          <el-input v-model.trim="scope.row.contractNo" clearable style="width: 100%" :title="scope.row.contractNo"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="备注" align="center" min-width="120">
        <template slot-scope="scope">
          <el-input v-model.trim="scope.row.remark" clearable style="width: 100%" :title="scope.row.remark"></el-input>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <div class="mr-t-30 flex-c-c">
      <el-button type="primary" @click="save" id="save_from" :loading="saveLoading">保 存</el-button>
      <el-button @click="beforeGoback" id="cancel_ret">取 消</el-button>
      <el-button type="primary" @click="submitForm" id="save_and_examine" :loading="saveLoading">保存并审核</el-button>
    </div>
    <!-- 选择商品 -->
    <chose-products v-if="visible.show" :visible.sync="visible" @comfirm="comfirm" :filterData="filterData"></chose-products>
     <!-- 选择商品 -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import choseProducts from '@c/choseProducts/index'
import { getReturnOrderDetail, toAddPage, checkDepotMerchantRel, savePurchaseReturnOrder, saveRequirePurchaseReturnOrder } from '@a/purchaseManage/index'
import { getOriginalGoodsId, getAvailableNum } from '@a/base/index'
export default {
  mixins: [commomMix],
  components: {
    choseProducts
  },
  data() {
    return {
      breadcrumb: [{
        path: '', meta: { title: '采购退货列表' }
      },
      {
        path: '', meta: { title: '新增采购退货订单' }
      }],
      ruleForm: {
        merchantName: '',
        merchantId: '',
        supplierName: '',
        supplierId: '',
        outDepotId: '',
        isSameArea: '',
        inDepotId: '',
        buId: '',
        poNo: '',
        currency: '',
        contractNo: '',
        destinationName: '',
        tallyingUnit: '',
        destinationAddress: '',
        deliveryMethod: '',
        deliveryName: '',
        deliveryAddr: '',
        country: '',
        remark: '',
        buName: '',
        purchaseOrderRelCode: '',
        code: ''
      },
      id: '',
      rules: {
        merchantName: [{ required: true, message: '公司不能为空', trigger: 'blur' }],
        supplierId: [{ required: true, message: '供应商不能为空', trigger: 'change' }],
        outDepotId: [{ required: true, message: '请选择出仓仓库', trigger: 'change' }],
        isSameArea: [{ required: true, message: '请选择是否同关区', trigger: 'change' }],
        buId: [{ required: true, message: '请选择事业部', trigger: 'change' }],
        poNo: [{ required: true, message: 'PO单号不能为空', trigger: 'blur' }],
        currency: [{ required: true, message: '请选择采购币种', trigger: 'change' }],
        deliveryMethod: { required: false, message: '提货方式不能为空', trigger: 'change' },
        deliveryName: { required: false, message: '收货人名称不能为空', trigger: 'blur' },
        country: { required: false, message: '国家不能为空', trigger: 'blur' },
        deliveryAddr: { required: false, message: '详细地址不能为空', trigger: 'blur' },
        tallyingUnit: { required: false, message: '理货不能为空', trigger: 'change' }
      },
      tableData: {
        list: [
          {
            brandName: '',
            returnAmount: '',
            declarePrice: '',
            returnPrice: '',
            returnNum: '',
            remark: '',
            contractNo: '',
            boxNo: '',
            taxRate: '',
            tax: ''
          }
        ],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      visible: { show: false },
      filterData: {},
      detail: {}, // 详情
      depotType: '',
      isInOutInstruction: false,
      saveLoading: false,
      choseIndex: '',
      ids: ''
    }
  },
  watch: {
    $route() {
      this.init()
    },
    depotType(val) {
      this.rules.deliveryMethod.required = val === 'c'
      this.rules.deliveryName.required = val === 'c'
      this.rules.country.required = val === 'c'
      this.rules.deliveryAddr.required = val === 'c'
      this.rules.tallyingUnit.required = val === 'c'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.detail = {}
      this.tableData.list = []
      this.reset('ruleForm')
      const { query } = this.$route
      if (query.id) { // 编辑
        this.editInit(query)
      } else if (query.ids) { // 新增
        this.addInit(query)
      }
    },
    reduce(index) {
      if (this.tableData.list.length === 1) {
        this.tableData.list = [{}]
      } else {
        const list = this.tableData.list
        list.splice(index, 1)
        this.tableData.list = list
      }
    },
    add(index) {
      const it = {
        brandName: '',
        returnAmount: '',
        declarePrice: '',
        returnPrice: '',
        returnNum: '',
        remark: '',
        contractNo: '',
        boxNo: '',
        taxRate: '',
        tax: '',
        taxReturnAmount: '',
        taxReturnPrice: ''
      }
      if (index === this.tableData.list.length - 1) {
        this.tableData.list.push(it)
      } else {
        const list = this.tableData.list
        list.splice(index + 1, 0, it)
      }
    },
    comfirm(list) {
      if (!list || list.length < 1) {
        this.$errorMsg('请至少选择一条术数据！')
        return false
      }
      const newList = list.map(item => {
        const { goodsCode, goodsNo, id, name, barcode = '', code = '', filingPrice, brandName, returnNum = '', returnPrice = '', returnAmount = '', contractNo = '', remark = '', boxNo = '', taxRate = '', tax = '', taxReturnAmount = '', taxReturnPrice = '' } = item
        return {
          declarePrice: filingPrice,
          goodsId: id,
          goodsName: name,
          goodsCode,
          goodsNo,
          id,
          barcode,
          code,
          brandName,
          returnNum,
          returnAmount,
          contractNo,
          remark,
          returnPrice,
          boxNo,
          tax,
          taxRate,
          taxReturnPrice,
          taxReturnAmount
        }
      })
      const lists = this.tableData.list
      lists.splice(this.choseIndex, 1, ...newList)
      this.tableData.list = lists
      this.visible.show = false
    },
    // 保存并审核
    submitForm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          if (!this.checkCommitData()) return false
          const listData = this.getTableListParms()
          if (!listData) return false
          this.saveLoading = true
          try {
            // 获取员货号
            const numData = {}
            for (let i = 0; i < this.tableData.list.length; i++) {
              const { goodsId, returnNum, goodsNo } = this.tableData.list[i]
              const res = await getOriginalGoodsId({ goodsNo, goodsId, type: 'originalGoodsNo' })
              const { originalGoodsId } = res.data
              const tempGoodsId = originalGoodsId || goodsId
              if (!numData[tempGoodsId]) {
                numData[tempGoodsId] = { returnNum, goodsNo, originalGoodsId }
              } else {
                const tempJson = numData[tempGoodsId]
                tempJson['returnNum'] = parseInt(tempJson['returnNum']) + parseInt(returnNum)
                tempJson['goodsNo'] = goodsNo
                tempJson['originalGoodsId'] = originalGoodsId
                numData[tempGoodsId] = tempJson
              }
            }
            let tallyingUnit = ''
            if (this.depotType === 'c') {
              if (this.ruleForm.tallyingUnit === '00') {
                tallyingUnit = '0'
              } else if (this.ruleForm.tallyingUnit === '01') {
                tallyingUnit = '1'
              } else if (this.ruleForm.tallyingUnit === '02') {
                tallyingUnit = '2'
              }
            }
            // 校验库存
            let flage = true
            for (let goodsId in numData) {
              const { returnNum, goodsNo, tempGoodsId } = numData[goodsId]
              // 获取库存量
              const res = await getAvailableNum({ depotId: this.ruleForm.outDepotId, goodsId: goodsId, unit: this.depotType === 'c' ? tallyingUnit : null })
              const availableNum = res.data || -1
              // 判断库存量是否足够
              if (!availableNum || availableNum === -1) {
                flage = false
                const tips = tempGoodsId ? '原货号:' + tempGoodsId + ',' : ''
                this.$errorMsg(`${tips}商品货号:${goodsNo},未查到库存可用量`)
                return false
              } else if (returnNum > availableNum) {
                flage = false
                const tips = tempGoodsId ? '原货号:' + tempGoodsId + ',' : ''
                this.$errorMsg(`库存不足，${tips}商品货号:${goodsNo},可用量：${availableNum}`)
                return false
              }
            }
            if (!flage) return false
            const opt = {
              itemList: JSON.stringify(listData),
              ...this.ruleForm,
              depotId: this.ruleForm.outDepotId,
              id: this.detail.id
            }
            await saveRequirePurchaseReturnOrder(opt)
            this.$successMsg('保存成功!')
            this.closeTag()
          } catch (err) {
            console.log(err)
          }
          this.saveLoading = false
        } else {
          this.$errorMsg('请先完善信息')
        }
      })
    },
    // 取消
    beforeGoback() {
      this.reset('ruleForm')
      this.tableData.list = [{}]
      this.closeTag()
    },
    // 编辑时初始
    async editInit(query) {
      this.breadcrumb[1].meta.title = '编辑采购退货订单'
      try {
       const res = await getReturnOrderDetail({ id: query.id })
       this.detail = res.data
       this.depotType = res.data.depotType || ''
       for (let key in this.ruleForm) {
         this.ruleForm[key] = this.detail[key] || ''
       }
       // 转字符串
       this.ruleForm.outDepotId = this.ruleForm.outDepotId + ''
       this.ruleForm.supplierId = this.ruleForm.supplierId + ''
       this.ruleForm.isSameArea = this.ruleForm.isSameArea + ''
       this.ruleForm.inDepotId = this.ruleForm.inDepotId + ''
       this.ruleForm.buId = this.ruleForm.buId + ''
       res.data.itemList = res.data.itemList || [{}] // 保证有一个
       if (this.detail.itemList) {
        this.tableData.list = this.detail.itemList.map(item => {
          const { returnNum = 1, batchNo = '' } = item
          return {
            ...item,
            batchNo,
            returnNum
          }
        })
       }
       this.setIsInOutInstruction(this.ruleForm.outDepotId)
      } catch (err) {
        console.log(err)
      }
    },
    // 新增时初始
    async addInit(query) {
      this.breadcrumb[1].meta.title = '新增采购退货订单'
      try {
        const res = await toAddPage({ ids: query.ids })
        for (let key in this.ruleForm) {
          this.ruleForm[key] = res.data[key] || ''
        }
        this.depotType = res.data.depotType || ''
        this.ruleForm.outDepotId = this.ruleForm.outDepotId + ''
        this.ruleForm.supplierId = this.ruleForm.supplierId + ''
        this.ruleForm.inDepotId = this.ruleForm.inDepotId + ''
        this.ruleForm.buId = this.ruleForm.buId + ''
        res.data.itemList = res.data.itemList || [{}] // 保证有一个
        if (res.data.itemList) {
          this.tableData.list = res.data.itemList.map(item => {
            return {
              ...item,
              returnNum: '',
              returnPrice: '',
              declarePrice: '',
              returnAmount: '',
              boxNo: '',
              contractNo: '',
              remark: '',
              brandName: item.brandName || '',
              taxRate: '',
              tax: '',
              taxReturnAmount: '',
              taxReturnPrice: ''
            }
          })
        }
        this.setIsInOutInstruction(this.ruleForm.outDepotId)
        this.ruleForm.purchaseOrderRelCode = query.code ? query.code.replace(/,/gi, ';') : ''
      } catch (err) {
        console.log(err)
      }
    },
    // 计算
    count(type, index) {
      const data = this.tableData.list[index]
      let { returnNum = 0, returnPrice = 0, returnAmount, taxRate = 0, tax = 0, taxReturnAmount } = data
      returnNum = returnNum || 0
      returnPrice = returnPrice || 0
      returnAmount = returnAmount || 0
      taxRate = taxRate ? +taxRate : 0 // 转为数字类型
      taxReturnAmount = taxReturnAmount || 0
      tax = tax || 0
      // 退货单价(不含税) 退货商品数量 改变时重新计算退货总金额(不含税)
      if (type === 'num' || type === 'price') {
        returnAmount = returnNum * returnPrice // 退货总金额(不含税)
        returnAmount = returnAmount.toFixed(2)
      }
      // 退货总金额(不含税) 改变时 重新计算退货单价(不含税)
      if (type === 'amount' && returnNum) {
        returnPrice = returnAmount / returnNum // 退货单价(不含税)
        returnPrice = returnPrice.toFixed(8)
      }
      // 退货总金额(不含税) 改变了重新计算退货总金额(含税)， 税额
      taxReturnAmount = returnAmount * (1 + taxRate) // 计算退货总金额(含税)
      tax = taxReturnAmount - returnAmount // 计算税额
      taxReturnAmount = taxReturnAmount.toFixed(2)
      tax = tax.toFixed(2)
      this.tableData.list.splice(index, 1, { ...data, returnAmount, tax, taxReturnAmount, returnPrice })
    },
    // 退货总金额 输入
    changeTaxReturnAmount(index) {
      const data = this.tableData.list[index]
      let { returnNum = 0, returnPrice = 0, returnAmount, taxRate = 0, tax = 0, taxReturnAmount } = data
      taxReturnAmount = taxReturnAmount || 0
      taxRate = taxRate ? +taxRate : 0 // 转为数字类型
      returnAmount = taxReturnAmount / (1 + taxRate) // 重新计算退货总金额(不含税)
      tax = taxReturnAmount - returnAmount // 重新计算税额
      if (returnNum) {
        returnPrice = returnAmount / returnNum // 重新计算退货单价
        returnPrice = returnPrice.toFixed(8)
      }
      returnAmount = returnAmount.toFixed(2) // 保留两位属性
      tax = tax.toFixed(2)
      this.tableData.list.splice(index, 1, { ...data, returnAmount, tax, taxReturnAmount, returnPrice })
    },
    openLay(index) {
      if (!this.ruleForm.outDepotId) {
        this.$errorMsg('请选择出仓仓库!')
        return false
      }
      this.choseIndex = index
      const unNeedIds = this.tableData.list.map(item => item.goodsId).toString()
      this.filterData = {
        unNeedIds,
        depotId: this.ruleForm.outDepotId
      }
      this.visible.show = true
    },
    // 校验必填数据和table数据
    checkCommitData() {
      if (!this.ruleForm.merchantName) {
        this.$errorMsg('公司不能为空')
        return false
      }
      if (!this.ruleForm.supplierId) {
        this.$errorMsg('供应商不能为空')
        return false
      }
      if (!this.ruleForm.outDepotId) {
        this.$errorMsg('出仓仓库不能为空')
        return false
      }
      if (!this.ruleForm.buId) {
        this.$errorMsg('事业部不能为空')
        return false
      }
      let flag = true
      for (let i = 0; i < this.tableData.list.length; i++) {
        const { returnNum, returnPrice, declarePrice, returnAmount, taxRate } = this.tableData.list[i]
        const rowTips = '表格第' + (i + 1) + '行,'
        if (!returnNum || returnNum <= 0) {
          this.$errorMsg(rowTips + '退货商品数量必填且不能小于0')
          flag = false
          break
        }
        if (!returnPrice || returnPrice <= 0) {
          this.$errorMsg(rowTips + '退货单价必填且不能小于0')
          flag = false
          break
        }
        if (!returnAmount || returnAmount <= 0) {
          this.$errorMsg(rowTips + '退货总金额必填且不能小于0')
          flag = false
          break
        }
        if (this.isInOutInstruction && (!declarePrice || declarePrice <= 0)) {
          this.$errorMsg(rowTips + '出仓仓库进出接口指令为是,申报单价必填且不能小于0')
          flag = false
          break
        }
        if (!this.$transformZeroBl(taxRate)) {
          this.$errorMsg(rowTips + '税率不能为空！')
          flag = false
          break
        }
      }
      return flag
    },
    // 保存
    async save() {
      if (!this.checkCommitData()) return false
      const listData = this.getTableListParms()
      if (!listData) return false
      this.saveLoading = true
      const opt = {
        itemList: JSON.stringify(listData),
        ...this.ruleForm,
        depotId: this.ruleForm.outDepotId,
        id: this.detail.id
      }
      try {
        await savePurchaseReturnOrder(opt)
        this.$successMsg('保存成功!', () => {
          this.closeTag()
        })
      } catch (err) {
        console.log(err)
      }
      this.saveLoading = false
    },
    async setIsInOutInstruction(depotId) {
      const res = await checkDepotMerchantRel({ depotId })
      this.isInOutInstruction = res.data.isInOutInstruction === '1'
      const dom = document.getElementById('declarePrice-cell')
      dom.setAttribute('class', this.isInOutInstruction ? 'need' : '')
    },
    // 处理table数据
    getTableListParms() {
      const pda = []
      this.tableData.list.map(item => {
        if (item.goodsId) {
          const { goodsNo, goodsId, goodsName = '', barcode, declarePrice = '', brandName = '', returnNum = '', returnPrice = '', returnAmount = '', contractNo = '', remark = '', boxNo = '', tax = '', taxRate = '', taxReturnAmount = '' } = item
          let taxReturnPrice = taxReturnAmount / returnNum
          taxReturnPrice = taxReturnPrice.toFixed(8)
          pda.push({ goodsNo, goodsId, goodsName, barcode, declarePrice, brandName, returnNum, returnPrice, returnAmount, contractNo, remark, boxNo, tax, taxRate, taxReturnPrice, taxReturnAmount })
        }
      })
      if (pda.length < 1) {
        this.$errorMsg('至少选择一个商品')
        return false
      }
      return pda
    },
    // 修改提货方式
    changeDeliveryMethod() {
      const { deliveryMethod } = this.ruleForm
      if (deliveryMethod === '1') {
        this.ruleForm.deliveryName = ''
        this.ruleForm.country = ''
        this.ruleForm.deliveryAddr = ''
      } else if (deliveryMethod === '2') {
        this.ruleForm.deliveryName = '卓志香港仓'
        this.ruleForm.country = '中国香港'
        this.ruleForm.deliveryAddr = '香港 新界 元朗 流浮山路DD129'
      }
    }
  }
}
</script>
<style>
.order-edit-bx .el-form-item__label {
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
</style>
