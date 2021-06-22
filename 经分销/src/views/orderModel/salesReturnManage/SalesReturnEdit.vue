<template>
  <!-- 销售退货订单新增/编辑页面 -->
  <div class="page-bx bgc-w edit-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" />
    <el-form :model="baseForm" ref="baseForm" :rules="rules">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="公司：" prop="merchantId">
            <el-select v-model="baseForm.merchantId"
                       placeholder="请选择"
                       disabled
                       :data-list="getSelectMerchantBean('merchantList')">
              <el-option
                v-for="item in selectOpt.merchantList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="退货类型：" prop="returnType">
            <el-select v-model="baseForm.returnType"
                       :disabled="baseForm.returnType === '3' ? true : false"
                       placeholder="请选择"
                       clearable
                       @change="changeReturnType"
                       filterable>
              <el-option key="1" label="消费者退货" value="1" />
              <el-option key="2" label="代销退货" value="2" disabled />
              <el-option key="3" label="购销退货" value="3" disabled />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="客户：" prop="customerId" :rules="rules.customerId">
            <el-select v-model="baseForm.customerId"
                       placeholder="请选择"
                       clearable
                       filterable
                       @change="changeCustomer"
                       :data-list="getCustomerSelectBean('customerList')">
              <el-option
                v-for="item in selectOpt.customerList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="退入仓库：" prop="inDepotId">
            <el-select v-model="baseForm.inDepotId"
                       placeholder="请选择"
                       clearable
                       filterable
                       @change="changeInDepot">
              <el-option
                v-for="item in inDepotList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="是否同关区：" prop="isSameArea">
            <el-select v-model="baseForm.isSameArea"
                       placeholder="请选择"
                       clearable
                       filterable
                       @change="changeIsSameArea"
                       :data-list="getSelectList('isSameAreaList')">
              <el-option
                v-for="item in selectOpt.isSameAreaList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="退出仓库：" prop="outDepotId">
            <el-select v-model="baseForm.outDepotId"
                       placeholder="请选择"
                       clearable
                       filterable
                       @change="changeOutDepot($event, 'change')"
                       :data-list="getSelectBeanByMerchantRel('warehousesList', { type: 'b,e' })">
              <el-option
                v-for="item in selectOpt.warehousesList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="事业部：" prop="buId">
            <el-select v-model="baseForm.buId"
                       placeholder="请选择"
                       clearable
                       filterable>
              <el-option
                v-for="item in businessList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="报关合同号：" prop="contractNo" :rules="baseForm.returnType === '3' ? rules.contractNo : {}">
            <el-input v-model="baseForm.contractNo" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="头程提单号："
                        prop="ladingBill"
                        :rules=" rules.ladingBill">
            <el-input v-model="baseForm.ladingBill" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="收货地址：" prop="deliveryAddr" :rules="rules.deliveryAddr">
            <el-input v-model="baseForm.deliveryAddr" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="箱数：" prop="boxNum" :rules="rules.boxNum">
            <el-input v-model="baseForm.boxNum" placeholder="请输入" clearable onkeyup="this.value=this.value.replace(/[^\d]/g,'');" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="装货港：" prop="portLoading" :rules="rules.portLoading">
            <el-input v-model="baseForm.portLoading" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="包装方式：" prop="packType" :rules="rules.packType">
            <el-select v-model="baseForm.packType"
                       placeholder="请选择"
                       clearable
                       filterable
                       :data-list="packTypeBean">
              <el-option
                v-for="item in packTypeBean"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="付款条约：" prop="payRules" :rules="rules.payRules">
            <el-input v-model="baseForm.payRules" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="提单毛重KG：" prop="billWeight" :rules="rules.billWeight">
            <el-input v-model="baseForm.billWeight" placeholder="请输入" clearable disabled />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="卸货港：" prop="portDestNo" :rules="rules.portDestNo">
            <el-select v-model="baseForm.portDestNo"
                       placeholder="请选择"
                       clearable
                       filterable
                       :data-list="getSelectList('portDestList')">
              <el-option
                v-for="item in selectOpt.portDestList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="境外发货人：" prop="shipper" :rules="rules.shipper">
            <el-input v-model="baseForm.shipper" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="唛头：" prop="mark" :rules="rules.mark">
            <el-input v-model="baseForm.mark" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="LBX单号：" prop="lbxNo">
            <el-input v-model="baseForm.lbxNo" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="退货币种：" prop="currency" :rules="rules.currency" ref="currency">
            <el-select v-model="baseForm.currency"
                       placeholder="请选择"
                       clearable
                       filterable
                       :data-list="getCurrencySelectBean('currencyList')">
              <el-option
                v-for="item in selectOpt.currencyList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="退货原因：" prop="remark">
            <el-input v-model="baseForm.remark" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="关联销售单：" prop="saleOrderRelCode">
            <el-input v-model="baseForm.saleOrderRelCode" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="理货单位：" prop="tallyingUnit">
            <el-select v-model="baseForm.tallyingUnit"
                       placeholder="请选择"
                       clearable
                       filterable
                       :data-list="getSelectList('order_tallyingUnitList')">
              <el-option
                v-for="item in selectOpt.order_tallyingUnitList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="发票号：" prop="invoiceNo" :rules="rules.invoiceNo">
            <el-input v-model="baseForm.invoiceNo" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 基本信息 end -->
    <!-- 销售退货商品明细 -->
    <JFX-title title="销售退货商品明细" />
    <JFX-table :tableData.sync="tableData"
               :showPagination="false">
      <el-table-column align="center"
                       width="100"
                       label="操作">
        <template slot-scope="{$index}">
          <el-button type="text"
                     id="sale-add-btn"
                     icon="el-icon-plus"
                     @click="addTableItem($index)">
          </el-button>
          <el-button type="text"
                     id="sale-reduce-btn"
                     icon="el-icon-minus"
                     @click="removeTableItem($index)">
          </el-button>
        </template>
      </el-table-column>
      <el-table-column width="80"
                       align="center"
                       label="序号">
        <template slot-scope="{row}">
          <el-input-number v-model.trim="row.seq" :precision="0" :controls="false" :min="0" label="必填" style="width: 100%;" />
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="150"
                       label="PO单号">
        <template slot-scope="{row}">
          <el-input v-model.trim="row.poNo" />
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="200"
                       label="PO时间">
        <template slot-scope="{row}">
          <el-date-picker
            v-model="row.poDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 100%">
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column align="left"
                       width="200"
                       show-overflow-tooltip>
        <template slot="header">
          <span class="need">退入商品货号</span>
        </template>
        <template slot-scope="{row, $index}">
          <el-button type="primary"
                     id="sale-choose-ingoods"
                     @click="chooseGoods('inDepot', row, $index)">选择商品</el-button>
          <span>{{row.inGoodsNo}}</span>
        </template>
      </el-table-column>
      <el-table-column align="left"
                       width="200"
                       show-overflow-tooltip>
        <template slot="header">
          <span class="need">退出商品货号</span>
        </template>
        <template slot-scope="{row, $index}">
          <el-button type="primary"
                     id="sale-choose-outgoods"
                     @click="chooseGoods('outDepot', row, $index)">选择商品</el-button>
          <span>{{row.outGoodsNo}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="inGoodsName"
                       align="center"
                       min-width="120"
                       label="退入商品名称"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="barcode"
                       align="center"
                       width="120"
                       label="退入商品条形码"
      ></el-table-column>
      <el-table-column align="center"
                       width="100">
        <template slot="header">
          <span class="need">退货商品数量</span>
        </template>
        <template slot-scope="{row, $index}">
          <el-input-number v-model.trim="row.returnNum" :precision="0" :controls="false" :min="0" label="必填" style="width: 100%;" @blur="count('returnNum', $index)" />
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="130">
        <template slot="header">
          <span class="need">退货商品单价<br />（不含税）</span>
        </template>
        <template slot-scope="{row, $index}">
          <el-input-number v-model.trim="row.price" :precision="8" v-max-spot="8" :controls="false" :min="0"  style="width: 100%" @blur="count('price', $index)"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="120"
                       label="退货总金额（不含税）">
        <template slot="header">
          <span class="need">退货总金额<br />（不含税）</span>
        </template>
        <template slot-scope="{row, $index}">
          <el-input-number v-model.trim="row.amount" :precision="2" v-max-spot="2" :controls="false" :min="0"  style="width: 100%" @blur="count('amount', $index)"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="120"
                       label="">
        <template slot="header">
          <span class="need">退货总金额<br />（含税）</span>
        </template>
        <template slot-scope="{row, $index}">
          <el-input-number v-model.trim="row.taxAmount" :precision="2" v-max-spot="2" :controls="false" :min="0"  style="width: 100%" @blur="changeTaxAmount($index)"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="120">
        <template slot="header">
          <span class="need">税率</span>
        </template>
        <template slot-scope="{row, $index}">
          <el-select
            v-model="row.taxRate"
            placeholder="请选择"
            filterable
            @change="count('taxRate', $index)"
          >
            <el-option
              v-for="item in rateList"
              :key="item.key"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="税额"
                       width="120">
        <template slot-scope="{row}">
          {{row.tax || '0.00'}}
        </template>
      </el-table-column>
      <!-- <el-table-column align="center"
                       width="100"
                       label="退货商品数量">
        <template slot-scope="{row}">
          {{ row.totalNum }}
        </template>
      </el-table-column> -->
      <!-- <el-table-column align="center"
                       width="100">
        <template slot="header">
          <span class="need">坏品数量</span>
        </template>
        <template slot-scope="{row, $index}">
          <el-input-number v-model.trim="row.badGoodsNum" :precision="0" :controls="false" :min="0" label="必填" style="width: 100%;" @blur="count('badGoodsNum', $index)" />
        </template>
      </el-table-column> -->
      <el-table-column align="center"
                       width="100"
                       label="批次号">
        <template slot-scope="{row}">
          <el-input v-model.trim="row.returnBatchNo" />
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="180"
                       label="品牌类型">
        <template slot="header">
          <span id="brandName">品牌类型</span>
        </template>
        <template slot-scope="{row}">
          <el-input v-model.trim="row.brandName" />
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="100"
                       label="毛重(kg)">
        <template slot-scope="{row}">
          <JFX-Input v-model.trim="row.grossWeight" :precision="5" :min="0" style="width: 100%" @change="grossWeightCount" />
          <!-- <el-input-number v-model.trim="row.grossWeight" :precision="2" v-max-spot="2" :controls="false" :min="0" label="必填" style="width: 100%;" @change="grossWeightCount" /> -->
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="100"
                       label="净重(kg)">
        <template slot-scope="{row}">
          <JFX-Input v-model.trim="row.netWeight" :precision="5" :min="0" style="width: 100%" />
          <!-- <el-input-number v-model.trim="row.netWeight" :precision="2" v-max-spot="2" :controls="false" :min="0" label="必填" style="width: 100%;" /> -->
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="100"
                       label="箱号">
        <template slot="header">
          <span id="boxNo">箱号</span>
        </template>
        <template slot-scope="{row}">
          <el-input v-model.trim="row.boxNo" />
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 销售退货商品明细 end -->
    <!-- 底部按钮 -->
    <div class="mr-t-30 flex-c-c">
      <el-button id="sale-save-btn" @click="handleSubmit" type="primary" :loading="saveBtnLoading">保 存</el-button>
      <el-button id="sale-cancel-btn" @click="closeTag">取 消</el-button>
    </div>
    <!-- 底部按钮 end -->
    <!-- 选择商品 -->
    <ChooseProduct v-if="visible.show"
                  :isVisible.sync="visible"
                  :filterData="filterData"
                  @comfirm="handleComfirm"></ChooseProduct>
    <!-- 选择商品 -->
  </div>
</template>

<script>
// import ChooseProduct from './components/ChooseProduct'
import commomMix from '@m/index'
import {
  getDepotById,
  getBUSelectBean,
  getSelectBeanByMerchantRel,
  getRaxList,
  getCurrencySelectBean
} from '@a/base/index'
import {
  toEditPage,
  toAddPage,
  modifySaleReturnOrder,
  saveSaleReturnOrder,
  getRateByCustomerAndMerchant
} from '@a/salesReturnManage/index'
export default {
  mixins: [commomMix],
  components: {
    ChooseProduct: () => import('./components/ChooseProduct') // 选择商品
  },
  data() {
    return {
      // 面包屑数据
      breadcrumb: this.$route.query.id ? [
        {path: '', meta: { title: '销售退货管理' }},
        {path: '/sales/salesreturnorder', meta: { title: '销售退货订单' }},
        {path: `/sales/salesreturnedit/${this.$route.query.id}`, meta: { title: '销售退货订单编辑' }}
      ] : [
        {path: '', meta: { title: '销售退货管理' }},
        {path: '/sales/salesreturnorder', meta: { title: '销售退货订单' }},
        {path: `/sales/salesreturnadd`, meta: { title: '销售退货订单新增' }}
      ],
      // 基本信息
      baseForm: {
        merchantId: '',
        merchantName: '',
        returnType: '',
        customerId: '',
        inDepotId: '',
        isSameArea: '',
        outDepotId: '',
        buId: '',
        contractNo: '',
        ladingBill: '',
        deliveryAddr: '',
        boxNum: '',
        portLoading: '',
        packType: '',
        payRules: '',
        billWeight: '',
        portDestNo: '',
        shipper: '',
        mark: '',
        lbxNo: '',
        currency: '',
        remark: '',
        saleOrderRelCode: '',
        tallyingUnit: '',
        invoiceNo: ''
      },
      // 表单校验规则
      rules: {
        merchantId: { required: true, message: '请选择公司', trigger: 'change' },
        returnType: { required: true, message: '请选择退货类型', trigger: 'change' },
        isSameArea: { required: false, message: '请选择是否同关区', trigger: 'change' },
        contractNo: { required: true, message: '请输入报关合同号', trigger: 'blur' },
        customerId: { required: true, message: '请选择客户', trigger: 'change' },
        inDepotId: { required: true, message: '请选择退入仓库', trigger: 'change' },
        buId: { required: true, message: '请选择', trigger: 'change' },
        currency: { required: true, message: '请选择事业部', trigger: 'change' },
        outDepotId: { required: false, message: '请选择退出仓库', trigger: 'change' },
        ladingBill: { required: false, message: '请输入头程提单号', trigger: 'blur' },
        invoiceNo: { required: false, message: '请输入发票号', trigger: 'blur' },
        deliveryAddr: { required: false, message: '请输入收货地址', trigger: 'blur' },
        boxNum: { required: false, message: '请输入箱数', trigger: 'blur' },
        portLoading: { required: false, message: '请输入装货港', trigger: 'blur' },
        packType: { required: false, message: '请选择包装方式', trigger: 'change' },
        payRules: { required: false, message: '请输入付款条约', trigger: 'blur' },
        billWeight: { required: false, message: '请输入提单毛重KG', trigger: 'blur' },
        portDestNo: { required: false, message: '请选择卸货港', trigger: 'blur' },
        shipper: { required: false, message: '请输入境外发货人', trigger: 'blur' },
        mark: { required: false, message: '请输入唛头', trigger: 'blur' }
      },
      // 点击选择商品的行
      currentChoseIdx: 0,
      // 选择商品组件的参数
      filterData: {},
      // table 信息
      tableData: {
        list: [{}],
        loading: false
      },
      // 包装方式下拉列表数据
      packTypeBean: [],
      // 业务模式
      businessModel: '',
      // 退出仓库类型
      outDepotType: '',
      // 出仓仓库是否代销仓
      outDepotIsTopBooks: '',
      // 退入仓库类型
      inDepotTypeVal: '',
      // 选择退出或退入商品
      chooseGoodsType: '',
      // 入仓仓库进出接口指令
      inIsInOutInstruction: '',
      // 事业部列表
      businessList: [],
      // 退入仓库列表
      inDepotList: [],
      // 保存按钮loading状态
      saveBtnLoading: false,
      // 商品序号
      goodsSeq: 0,
      // 税率列表
      rateList: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
		async init() {
      // 获取事业部列表
      this.getBulist()
      // 获取遂率列表
      this.getRaxList()
      const { id, ids } = this.$route.query
      // 获取编辑信息
      if (id) {
        try {
          this.tableData.loading = true
          const { data } = await toEditPage({ id: this.$route.query.id })
          // 获取表单数据
          for (const key in this.baseForm) {
            this.baseForm[key] = data.saleReturnOrderDTO[key] ? data.saleReturnOrderDTO[key].toString() : ''
          }
          this.baseForm['orderReturnCode'] = data.saleReturnOrderDTO.code + ''
          this.packTypeBean = data.packTypeBean.map(item => { return { key: item.value, value: item.label } }) || []
          this.businessModel = data.businessModel || ''
          this.inDepotTypeVal = data.inDepotType || ''
          this.inIsInOutInstruction = data.inIsInOutInstruction || ''
          this.tableData.list = data.saleReturnOrderDTO.itemList || [{}]
          this.tableData.loading = false
          this.goodsSeq = this.tableData.list.length
          this.tableData.list = this.tableData.list.map(item => ({
            ...item,
            returnNum: (item.returnNum || 0) + (item.badGoodsNum || 0)
          }))
        } catch (err) {
          this.tableData.loading = false
        }
      } else {
        // 获取新增信息
        try {
          // 购销退货
          if (ids) {
            const { data } = await toAddPage({ ids: this.$route.query.ids })
            // 获取表单数据
            for (const key in this.baseForm) {
              this.baseForm[key] = data.saleReturnOrderModel[key] ? data.saleReturnOrderModel[key].toString() : ''
            }
            // 获取包装类型列表
            if (data.packTypeBean && data.packTypeBean.length) {
              this.packTypeBean = data.packTypeBean.map(item => ({ key: item.value, value: item.label }))
            }
            // 销售类型
            this.businessModel = data.businessModel || ''
            // 入库仓类型
            this.inDepotTypeVal = data.inDepotType
            // 进出口指令
            this.inIsInOutInstruction = data.inIsInOutInstruction || ''
            if (data.saleReturnOrderModel && data.saleReturnOrderModel.itemList && data.saleReturnOrderModel.itemList.length) {
              this.tableData.list = data.saleReturnOrderModel.itemList.map((item, index) => ({
                ...item,
                seq: index + 1,
                brandName: '境外品牌(其他)',
                taxRate: '0.00',
                returnNum: (item.returnNum || 0) + (item.badGoodsNum || 0)
              }))
            } else {
              this.tableData.list = [{}]
            }
            // 初始化税率
            const { customerId } = this.baseForm
            if (customerId) {
              this.changeCustomer(customerId)
            }
            // 计算序号
            this.goodsSeq = this.tableData.list.length
          } else {
            // 非购销退货
            this.getInDepot('f')
            const { data } = await toAddPage()
            // 获取包装类型列表
            if (data.packTypeBean && data.packTypeBean.length) {
              this.packTypeBean = data.packTypeBean.map(item => ({ key: item.value, value: item.label }))
            }
            this.businessModel = data.businessModel || ''
            this.inIsInOutInstruction = data.inIsInOutInstruction || ''
            this.inDepotTypeVal = data.inDepotType || ''
          }
          // 获取公司名
          const userInfo = this.getUserInfo()
          this.baseForm.merchantId = userInfo.merchantId || ''
          this.baseForm.merchantName = userInfo.merchantName || ''
          this.baseForm['inDepotId'] = this.baseForm['outDepotId']
          this.baseForm['outDepotId'] = ''
        } catch (error) {
          this.$errorMsg(error.message)
        }
      }
      // 判断退货类型状态
      const returnType = this.baseForm.returnType
      if (returnType) { this.changeReturnType(returnType) }

      // 获取退入仓库状态
      const inDepotId = this.baseForm.inDepotId
      if (inDepotId) { this.changeInDepot(inDepotId) }

      // 获取退出仓库状态
      const outDepotId = this.baseForm.outDepotId
      if (outDepotId) { this.changeOutDepot(outDepotId) }

      // 判断是否通关区
      const isSameArea = this.baseForm.isSameArea
      if (isSameArea) { this.changeIsSameArea(isSameArea) }
    },
    // 提交表单
    handleSubmit() {
      this.$refs['baseForm'].validate(async valid => {
        if (valid) {
          // 消费者退货情况下是否同关区字段必填
          if (this.baseForm.returnType !== '1' && !this.baseForm.isSameArea) {
            return this.$errorMsg('请选择是否同关区')
          }

          // 消费者退货情况下报关合同号字段必填
          if (this.baseForm.returnType !== '1' && !this.baseForm.contractNo) {
            return this.$errorMsg('报关合同号不能为空')
          }

          // 当“是否同关区”为同关区时，退出仓库字段必填 跨关区时为非必填(仅当类型为代销退货时,跨关区依旧必填退出仓库)
          if (this.baseForm.isSameArea === '1' && !this.baseForm.outDepotId) {
            return this.$errorMsg('退出仓库不能为空')
          } else if (this.baseForm.returnType === '2' && this.baseForm.isSameArea === '0' && !this.baseForm.outDepotId) {
            return this.$errorMsg('退货类型为代销为跨关区，退出仓库不能为空')
          }

          // 退货类型为消费者退货情况
          if (this.baseForm.returnType === '1') {
            if (this.inDepotTypeVal !== 'f') {
              return this.$errorMsg('退货类型为消费者退货时，退入仓仅为销毁区')
            }

            if (this.baseForm.outDepotId && !(this.outDepotType === 'b' || (this.outDepotType === 'e' && this.outDepotIsTopBooks === '0'))) {
              return this.$errorMsg('退出仓库仅能为备查库、暂存仓（暂存仓且标识为非代销仓）')
            }
          }
          // 退货类型不为消费者退货情况
          if (this.baseForm.returnType !== '1') {
            if (!(this.inDepotTypeVal === 'f' || this.inDepotTypeVal === 'a' || this.inDepotTypeVal === 'd' || this.inDepotTypeVal === 'c')) {
              return this.$errorMsg('退入仓库仅能选中转仓、保税仓、海外仓、销毁区')
            }

            if (this.baseForm.outDepotId && !(this.outDepotType === 'b' || (this.outDepotType === 'e' && this.outDepotIsTopBooks === '0'))) {
              return this.$errorMsg('退出仓库仅能为备查库、暂存仓（暂存仓且标识为非代销仓）')
            }
          }

          // 校验商品数据
          if (!this.checkTableData()) return false
          // 商品列表数据
          const goodsList = this.tableData.list.map((item) => {
            const {
              seq = '1',
              poNo = '',
              poDate = '',
              outGoodsId = '',
              inGoodsId = '',
              inGoodsName = '',
              barcode = '',
              price = '',
              returnNum = '0',
              returnBatchNo = '0',
              brandName = '',
              grossWeight = '',
              netWeight = '',
              boxNo = '',
              badGoodsNum = ''
            } = item
            return {
              seq: seq ? seq + '' : '',
              poNo: poNo ? poNo + '' : '',
              poDate: poDate ? poDate + '' : '',
              outGoodsId: outGoodsId ? outGoodsId + '' : '',
              inGoodsId: inGoodsId ? inGoodsId + '' : '',
              inGoodsName: inGoodsName ? inGoodsName + '' : '',
              barcode: barcode ? barcode + '' : '',
              returnNum: returnNum ? returnNum + '' : '0',
              badNum: badGoodsNum ? badGoodsNum + '' : '0',
              returnBatchNo: returnBatchNo ? returnBatchNo + '' : '',
              brandName: brandName ? brandName + '' : '',
              grossWeight: grossWeight ? grossWeight + '' : '',
              netWeight: netWeight ? netWeight + '' : '',
              boxNo: boxNo ? boxNo + '' : '',
              price: price ? price + '' : '',
              amount: item.amount + '',
              taxRate: item.taxRate + '',
              taxAmount: item.taxAmount + '',
              tax: item.tax + ''
            }
          })

          // 请求参数
          const params = {
            ...this.baseForm,
            itemList: goodsList
          }
          try {
            this.saveBtnLoading = true
            if (this.$route.query.id) {
              params['orderReturnId'] = this.$route.query.id
              // 编辑请求
              await modifySaleReturnOrder({
                json: JSON.stringify(params)
              })
            } else {
              // 新增请求
              await saveSaleReturnOrder({
                json: JSON.stringify(params)
              })
            }
            this.$successMsg('操作成功')
            this.saveBtnLoading = false
            this.closeTag()
            this.linkTo('/sales/salesreturnorder')
          } catch (error) {
            this.saveBtnLoading = false
            this.$errorMsg(error.message)
          }
        }
      })
    },
    // 计算
    count(type, index) {
      const data = this.tableData.list[index]
      let { price = 0, amount, taxRate = 0, tax = 0, taxAmount, returnNum = 0, badGoodsNum = 0, grossWeight = 0 } = data
      price = price || 0
      amount = amount || 0
      taxRate = taxRate ? +taxRate : 0 // 转为数字类型
      taxAmount = taxAmount || 0
      tax = tax || 0
      // 好品坏品改变 计算总数量
      if (type === 'badGoodsNum' || type === 'returnNum') {
        // 旧数据存在坏品需要累加
        returnNum = returnNum + badGoodsNum
        // 计算总金额
        amount = (returnNum * price).toFixed(2)
      }
      // 单价(不含税)改变
      if (type === 'price') {
        amount = (price * returnNum).toFixed(2)
      }
      // 退货总金额(不含税) 改变时 重新计算退货单价(不含税)
      if (type === 'amount' && returnNum) {
        price = (amount / returnNum).toFixed(8)
      }
      // 计算总金额(含税)
      taxAmount = (amount * (1 + taxRate)).toFixed(2)
      // 计算税额
      tax = (taxAmount - amount).toFixed(2)
      this.tableData.list.splice(index, 1, { ...data, amount, taxAmount, price, tax, returnNum, grossWeight })
    },
    // 总金额（含税输入）
    changeTaxAmount(index) {
      const data = this.tableData.list[index]
      let { returnNum = 0, price = 0, amount, taxRate = 0, tax = 0, taxAmount } = data
      price = price || 0
      amount = amount || 0
      taxRate = taxRate ? +taxRate : 0 // 转为数字类型
      taxAmount = taxAmount || 0
      // 重新计算退货总金额(不含税)
      amount = (taxAmount / (1 + taxRate)).toFixed(2)
      // 重新计算税额
      tax = (taxAmount - amount).toFixed(2)
      if (returnNum) {
        // 重新计算单价
        price = (amount / returnNum).toFixed(8)
      }
      this.tableData.list.splice(index, 1, { ...data, amount, tax, taxAmount, price })
    },
    checkTableData() {
      let flag = true
      for (let i = 0; i < this.tableData.list.length; i++) {
        const { inGoodsId, outGoodsId, price, returnNum, grossWeight, netWeight, brandName, amount, taxRate, taxAmount } = this.tableData.list[i]
        const rowTips = '表格第' + (i + 1) + '行,'
        // 代销购销 退出商品必填
        if (this.baseForm.returnType === '2' || this.baseForm.returnType === '3') {
          if (!outGoodsId) {
            this.$errorMsg(rowTips + '请选择退出商品!')
            flag = false
            break
          }
        }
        if (!inGoodsId) {
          this.$errorMsg(rowTips + '请选择退入商品!')
          flag = false
          break
        }

        // 退货商品单价不能为空
        if (!price || price <= 0) {
          this.$errorMsg(rowTips + '请填写大于0的退货商品单价!')
          flag = false
          break
        }

        // 好品数量和坏品数量必须是有一个值是大于0的数
        // if (badGoodsNum <= 0 && returnNum <= 0) {
        //   this.$errorMsg(rowTips + '好品数量和坏品数量必须是有一个值是大于0的数')
        //   flag = false
        //   break
        // }
        if (returnNum === null || returnNum === undefined || returnNum <= 0) {
          this.$errorMsg(rowTips + '销售退货数量必须是大于0的数')
          flag = false
          break
        }

        // 退货总价不能为空
        if (taxRate === null || taxRate === undefined) {
          this.$errorMsg(rowTips + '税率不能为空')
          flag = false
          break
        }

        // 退货总价（不含税）不能为空
        if (!amount || amount <= 0) {
          this.$errorMsg(rowTips + '请填写大于0的退货总金额（不含税）')
          flag = false
          break
        }

        // 退货总价（含税）不能为空
        if (!taxAmount || taxAmount <= 0) {
          this.$errorMsg(rowTips + '请填写大于0的退货总金额（含税）')
          flag = false
          break
        }

        // 毛重不能小于净重，退入商品
        if (grossWeight < netWeight) {
          this.$errorMsg(rowTips + '毛重不能小于净重，退入商品')
          flag = false
          break
        }

        // 当类型为购销退货
        if (this.baseForm.returnType === '3') {
          // 品牌类型不能为空
          if (!brandName) {
            this.$errorMsg(rowTips + '品牌类型不能为空!')
            flag = false
            break
          }
          // 箱号不能为空
          // if (!boxNo) {
          //   this.$errorMsg(rowTips + '箱号不能为空!')
          //   flag = false
          //   break
          // }
        }

        // 当类型为购销退货且为跨关区时字段必填
        if (this.baseForm.returnType === '3' && this.baseForm.isSameArea === '0') {
          // 毛重不能为空
          if (!grossWeight || grossWeight <= 0) {
            this.$errorMsg(rowTips + '毛重需大于零!')
            flag = false
            break
          }
          // 净重不能为空
          if (!netWeight || netWeight <= 0) {
            this.$errorMsg(rowTips + '净重需大于零!')
            flag = false
            break
          }
        }
      }
      return flag
    },
    // 选择商品
    chooseGoods(type, row, index) {
      // 退货类型字段必填
      if (!this.baseForm.returnType) {
        return this.$errorMsg('请先选择退货类型！')
      }

      // 选择退入商品货号
      if (type === 'inDepot') {
        // 退入仓库字段必填
        if (!this.baseForm.inDepotId) {
          return this.$errorMsg('请先选择退入仓库！')
        }
        // 如果是选择退入商品货号并且是同关区时(退出仓库必填)
        if (this.baseForm.isSameArea === '1' && !this.baseForm.outDepotId) {
          return this.$errorMsg('请先选择退出仓库！')
        }
      }

      // 选择退出商品货号
      if (type === 'outDepot') {
        if (!row.inGoodsId) {
          return this.$errorMsg('请先选择退入商品！')
        }
        // 如果是选择退出商品货号
        if (!this.baseForm.outDepotId) {
          return this.$errorMsg('请先选择退出仓库')
        }
      }
      let unNeedIds = ''
      let id = ''
      if (type === 'inDepot') {
        unNeedIds = this.tableData.list.map(item => item.inGoodsId).toString()
      }
      if (type === 'outDepot') {
        id = this.tableData.list[index].inGoodsId
      }
      this.filterData = {
        depotId: type === 'inDepot' ? this.baseForm.inDepotId : this.baseForm.outDepotId,
        popupType: 3,
        unNeedIds,
        id
      }
      this.chooseGoodsType = type
      this.currentChoseIdx = index
      this.visible.show = true
    },
    // 点击确认选择商品
    async handleComfirm(payload) {
      if (payload && payload.length) {
        // 选择退入商品
        if (this.chooseGoodsType === 'inDepot') {
          const customerId = this.baseForm.customerId
          let taxRate = '0'
          if (customerId) {
             taxRate = await this.changeCustomer(customerId, 'choose')
          }
          const data = payload.map((item) => {
            this.goodsSeq = +this.goodsSeq + 1
            const initData = {poNo: '', poDate: '', price: '', returnNum: 0, badGoodsNum: 0, returnBatchNo: '', boxNo: ''}
            const { id, name, goodsNo, commbarcode, barcode, grossWeight, netWeight } = item
            return {
              ...initData,
              seq: this.goodsSeq + '',
              grossWeight,
              netWeight,
              brandName: '境外品牌(其他)',
              barcode,
              inGoodsId: id,
              outGoodsId: id,
              inGoodsName: name,
              inGoodsNo: goodsNo,
              outGoodsNo: goodsNo,
              inCommbarcode: commbarcode,
              outCommbarcode: commbarcode,
              // totalNum: '',
              price: '',
              amount: '',
              taxAmount: '',
              tax: '',
              taxRate: taxRate || '0.00'
            }
          })
          this.tableData.list.splice(this.currentChoseIdx, 1, ...data)
        } else {
          // 选择退出商品
          const firstGoods = payload.shift()
          this.tableData.list[this.currentChoseIdx].outGoodsId = firstGoods.id
          this.tableData.list[this.currentChoseIdx].outGoodsNo = firstGoods.goodsNo
          this.tableData.list[this.currentChoseIdx].outCommbarcode = firstGoods.commbarcode
        }
      }
      this.visible.show = false
    },
    // 计算毛重
    grossWeightCount() {
      let decimal = 0
      let decimalLen = [0]
      const grossWeightCount = this.tableData.list.reduce((pre, item) => {
        if (!item.grossWeight || isNaN(item.grossWeight)) {
          item.grossWeight = '0'
        }
        item.grossWeight = item.grossWeight + ''
        // 有小数点
        if (item.grossWeight.includes('.')) {
          decimal = item.grossWeight.split('.')[1].length
          if (decimal > 5) {
            decimal = 5
            item.grossWeight = item.grossWeight.slice(0, item.grossWeight.indexOf('.') + 6)
          }
        } else {
          item.grossWeight = (+item.grossWeight).toFixed(0)
        }
        decimalLen.push(decimal)
        pre += item.grossWeight ? +item.grossWeight : 0
        return pre
      }, 0)
      const maxLen = Math.max(...decimalLen)
      const totalBillWeight = (+grossWeightCount).toFixed(maxLen)
      this.baseForm.billWeight = totalBillWeight
    },
    // 新增表格项
    addTableItem() {
      this.tableData.list.push({})
    },
    // 退入仓库状态改变
    async changeInDepot(val) {
      if (!val) {
        return false
      }
      try {
        const { data: { type } } = await getDepotById({ id: val })
        this.inDepotTypeVal = type || ''
        // 退入仓库改变 重新加载事业部数据
        this.getBulist(this.baseForm.outDepotId, val)
        // 创建表单规则
        this.changeInDepotRules()
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 退出仓库状态改变
    async changeOutDepot(val, type) {
      if (!val) {
        return false
      }
      // 选择退出仓库 清空退出商品信息
      if (type === 'change') {
        const tempList = this.tableData.list.map(item => {
          return {
            ...item,
            outGoodsId: '',
            outGoodsNo: ''
          }
        })
        this.tableData.list = tempList || []
      }
      try {
        // 获取退出仓库信息
        const { data: { type, isTopBooks } } = await getDepotById({ id: val })
        this.outDepotType = type || ''
        this.outDepotIsTopBooks = isTopBooks || ''
        // 退出仓库改变 重新加载事业部数据
        this.getBulist(val, this.baseForm.outDepotId)
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 退货类型改变
    async changeReturnType(val) {
      if (!val) {
        return false
      }
      // 退货类型为购销退货
      if (val === '3') {
        // 退货类型为购销退货 商品品牌类型和箱号必填
        const brandName = document.getElementById('brandName')
        // const boxNo = document.getElementById('boxNo')
        brandName.setAttribute('class', 'need')
        // boxNo.setAttribute('class', 'need')
        this.getInDepot('a,c,d,f')
        this.rules.isSameArea.required = true
      } else {
        this.getInDepot('f')
        this.rules.isSameArea.required = false
      }
    },
    // 是否同关区状态改变
    changeIsSameArea(val) {
      // 同关区 退出仓必填
      if (val === '1') {
        this.rules['outDepotId'].required = true
        return false
      }
      // 购销-实销实结时跨关区 退出仓必填
      if (this.baseForm.returnType === '3' && this.isSameArea === '0' && this.businessModel === '4') {
        this.rules['outDepotId'].required = true
        return false
      }
      // 当类型为代销退货且为跨关区时 退出仓必填
      if (this.baseForm.returnType === '2' && this.baseForm.isSameArea === '0') {
        this.rules['outDepotId'].required = true
        return false
      }
      // 清空规则
      this.rules['outDepotId'].required = false
    },
    // 删除表格项
    removeTableItem(index) {
      if (this.tableData.list.length <= 1) {
        return this.$errorMsg('至少要有一条商品数据')
      }
      this.tableData.list.splice(index, 1)
      // 重新计算提单毛重
      this.grossWeightCount()
    },
    // 获取事业部列表
    async getBulist(depotId1 = '', depotId2 = '') {
      const { data } = await getBUSelectBean({ depotId1, depotId2 })
      const tempList = data.map(item => {
        return {
          key: item.value,
          value: item.label
        }
      })
      this.$nextTick(() => {
        this.businessList = tempList || []
      })
    },
    // 获取退入仓库
    async getInDepot(type) {
      const { data } = await getSelectBeanByMerchantRel({ type })
      const tempList = data.map(item => {
        return {
          key: item.value,
          value: item.label
        }
      })
      this.$nextTick(() => {
        this.inDepotList = tempList || []
      })
    },
    // 添加表单验证规则
    changeInDepotRules() {
      if ((this.baseForm.returnType === '2' || this.baseForm.returnType === '3') && this.inDepotTypeVal === 'a') {
        this.rules.ladingBill.required = true
        this.rules.invoiceNo.required = true
        this.rules.deliveryAddr.required = true
        this.rules.boxNum.required = true
        this.rules.portLoading.required = true
        this.rules.packType.required = true
        this.rules.payRules.required = true
        this.rules.billWeight.required = true
        this.rules.portDestNo.required = true
        this.rules.shipper.required = true
        this.rules.mark.required = true
      } else {
        this.rules.ladingBill.required = false
        this.rules.invoiceNo.required = false
        this.rules.deliveryAddr.required = false
        this.rules.boxNum.required = false
        this.rules.portLoading.required = false
        this.rules.packType.required = false
        this.rules.payRules.required = false
        this.rules.billWeight.required = false
        this.rules.portDestNo.required = false
        this.rules.shipper.required = false
        this.rules.mark.required = false
      }
    },
    // 获取税率列表
    async getRaxList() {
      try {
        const { data = [] } = await getRaxList()
        const list = data.map(item => ({ key: item.value, value: item.label }))
        this.rateList = list
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 选择客户
    async changeCustomer(customerId, type) {
      try {
        // 根据客户带出币种
        const { data: currency } = await getCurrencySelectBean({ customerId })
        currency ? this.baseForm.currency = currency : this.$refs['currency'].resetField()
        // 带出税率
        const { data } = await getRateByCustomerAndMerchant({
          customerId: customerId,
          merchantId: this.baseForm.merchantId
        })
        // 选择商品
        if (type === 'choose') {
          return data.rate
        }
        this.tableData.list.forEach((item, index) => {
          if (item.seq) {
            this.tableData.list.splice(index, 1, { ...item, taxRate: data.rate || '0' })
            this.count('taxRate', index)
          }
        })
      } catch (error) {
        this.$errorMsg(error.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.edit-bx .el-form-item__label {
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
/deep/.edit-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
</style>
