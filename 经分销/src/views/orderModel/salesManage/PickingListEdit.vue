<template>
  <!-- 领料单新增/编辑页面 -->
  <div class="page-bx bgc-w edit-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 表单部分 -->
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
      <!-- 基本信息 -->
      <JFX-title title="基本信息" className="bor-n mr-t-15" />
      <el-row :gutter="10" class="edit-row-bor">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <!-- @change="customerIdChange" -->
          <el-form-item label="客户：" prop="customerId">
            <el-select v-model="ruleForm.customerId"
                       placeholder="请选择"
                       clearable
                       filterable
                       :data-list="getCustomerSelectBean('customer_list')">
              <el-option
                v-for="item in selectOpt.customer_list"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="公司：" prop="merchantId">
            <el-select v-model="ruleForm.merchantId"
                       placeholder="请选择"
                       disabled
                       :data-list="getSelectMerchantBean('merchant_list')">
              <el-option
                v-for="item in selectOpt.merchant_list"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="事业部：" prop="buId">
            <el-select v-model="ruleForm.buId"
                       placeholder="请选择"
                       filterable
                       clearable
                       @change="buIdChange"
                       :data-list="getBUSelectBean('business_list')">
              <el-option
                v-for="item in selectOpt.business_list"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="出库仓库：" prop="outDepotId" ref="outDepotId">
            <el-select v-model="ruleForm.outDepotId"
                       placeholder="请选择"
                       clearable
                       filterable
                       @change="outDepotChange"
                       :data-list="getSelectBeanByMerchantBuRel('out_warehouses_list', { isValetManage: '1' })">
              <el-option
                v-for="item in selectOpt.out_warehouses_list"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="是否同关区：" prop="isSameArea" ref="isSameArea">
            <el-select v-model="ruleForm.isSameArea"
                       placeholder="请选择"
                       clearable
                       filterable
                       @change="isSameAreaChange"
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
          <el-form-item label="入库仓库：" prop="inDepotId">
            <el-select v-model="ruleForm.inDepotId"
                       placeholder="请选择"
                       clearable
                       filterable
                       @change="inDepotChange"
                       :data-list="getSelectBeanByMerchantRel('in_warehouses_list', { type: 'b' })">
              <el-option
                v-for="item in selectOpt.in_warehouses_list"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="付款条约：" prop="payRules">
            <el-input v-model.trim="ruleForm.payRules" placeholder="请输入" clearable />
          </el-form-item>
        </el-col> -->
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="PO单号：" prop="poNo" :rules="rules.poNo">
            <el-input v-model.trim="ruleForm.poNo" placeholder="多PO输入时以&字符隔开" clearable />
          </el-form-item>
        </el-col>
        <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="销售币种：" prop="currency" ref="currency">
            <el-select v-model="ruleForm.currency"
                       placeholder="请选择"
                       clearable
                       filterable
                       :data-list="getCurrencySelectBean('currencyList')">
              <el-option
                v-for="item in selectOpt.currencyList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />、
            </el-select>
          </el-form-item>
        </el-col> -->
      </el-row>
      <!-- 基本信息 end -->
      <!-- 物流信息 -->
      <JFX-title title="物流信息" className="mr-t-15 bor-n" />
      <el-row :gutter="10" class="edit-row-bor">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="报关合同号：" prop="contractNo">
            <el-input v-model.trim="ruleForm.contractNo" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="运输方式：" prop="transport">
            <el-select v-model="ruleForm.transport"
                       clearable
                       placeholder="请选择"
                       @change="transportChange"
                       :data-list="getSelectList('transportList')">
              <el-option
                v-for="item in selectOpt.transportList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="标准箱TEU：" prop="teu">
            <el-input v-model.trim="ruleForm.teu" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="车次：" prop="trainno">
            <el-input v-model.trim="ruleForm.trainno" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="承运商：" prop="carrier">
            <el-input v-model.trim="ruleForm.carrier" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="提单毛重KG：" prop="billWeight">
            <el-input v-model.trim="ruleForm.billWeight" @change="calcBillWeight()"  clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="托数：" prop="torusNumber">
            <el-input-number v-model.trim="ruleForm.torusNumber" @change="calcPack" :precision="0" :controls="false" :min="0"  style="width: 193px;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="箱数：" prop="boxNum">
            <el-input-number v-model.trim="ruleForm.boxNum" @change="calcPack" :precision="0" :controls="false" :min="0"  style="width: 193px;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="托盘材质：" prop="torrPackType">
            <el-select v-model="ruleForm.torrPackType"
                        placeholder="请选择"
                        filterable
                        clearable
                        @change="calcPack"
                        :data-list="getSelectList('order_torrpacktypeList')">
              <el-option
                v-for="item in selectOpt.order_torrpacktypeList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="包装：" prop="pack">
            <el-input v-model.trim="ruleForm.pack" placeholder="请输入XX箱XX托XXXX" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="发票单号：" prop="invoiceNo">
            <el-input v-model.trim="ruleForm.invoiceNo" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="卸货港：" prop="portDes">
            <el-input v-model.trim="ruleForm.portDes" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="出库地点：" prop="outdepotAddr">
            <el-input v-model.trim="ruleForm.outdepotAddr" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="出库关区：" prop="outCustomsId">
            <el-select v-model="ruleForm.outCustomsId"
                        placeholder="请选择"
                        filterable
                        clearable>
              <el-option
                v-for="item in outCustomsList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="入库关区：" prop="inCustomsId">
            <el-select v-model="ruleForm.inCustomsId"
                        placeholder="请选择"
                        filterable
                        clearable>
              <el-option
                v-for="item in inCustomsList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="交货日期：" prop="deliveryDate">
            <el-date-picker
              v-model="ruleForm.deliveryDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期时间"
              style="width: 193px;"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="目的地：" prop="destination" v-if="ruleForm.tallyingUnit || outDepotType === 'c'">
            <el-select v-model="ruleForm.destination"
                        placeholder="请选择"
                        filterable
                        clearable>
              <el-option value="GZJC01" label="广州机场" />
              <el-option value="HP01" label="黄埔状元谷" />
              <el-option value="HK01" label="香港本地" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="理货单位：" prop="tallyingUnit" v-if="ruleForm.tallyingUnit || outDepotType === 'c'">
            <el-select v-model="ruleForm.tallyingUnit"
                        placeholder="请选择"
                        clearable
                        filterable>
              <el-option value="00" label="托盘" />
              <el-option value="01" label="箱" />
              <el-option value="02" label="件" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：" prop="remark" class="textarea-con">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="ruleForm.remark" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 物流信息 end -->
      <!-- 收件信息 -->
      <JFX-title title="收件信息" className="mr-t-15 bor-n" />
      <el-row :gutter="10" class="edit-row-bor">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="提货方式：" prop="mailMode">
            <el-select v-model="ruleForm.mailMode"
                       placeholder="请选择"
                       clearable
                       @change="mailModeChange"
                       :data-list="getSelectList('saleOrder_mailModeList')">
              <el-option
                v-for="item in selectOpt.saleOrder_mailModeList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="收货人姓名：" prop="receiverName">
            <el-input v-model.trim="ruleForm.receiverName" placeholder="请输入" clearable  />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="国家：" prop="country">
            <el-input v-model.trim="ruleForm.country" placeholder="请输入" clearable  />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="详细地址：" prop="receiverAddress">
            <el-input v-model.trim="ruleForm.receiverAddress" placeholder="请输入" clearable style="width: 700px;" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 收件信息 end -->
    </el-form>
    <!-- 表单部分 end -->
    <!-- 商品信息 -->
    <JFX-title title="商品信息" className="mr-t-15 title-bx">
      <div>
        <el-button type="primary" @click="showChooseProductModal">选择商品</el-button>
        <el-button type="primary" @click="delTableItems">删除</el-button>
      </div>
    </JFX-title>
    <JFX-table :tableData.sync="tableData"
               :showPagination="false"
               @selection-change="selectionChange">
      <el-table-column width="55"
                       align="center"
                       type="selection"
      ></el-table-column>
      <el-table-column width="90"
                       label="序号"
                       align="center">
        <template slot-scope="{row}">
          <el-input-number v-model.trim="row.seq" :precision="0" :controls="false" :min="0" style="width: 100%;" />
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="130"
                       prop="goodsCode"
                       label="商品编号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center"
                       min-width="120"
                       prop="goodsName"
                       label="商品名称"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center"
                       width="130"
                       prop="goodsNo"
                       label="商品货号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center"
                       width="130"
                       prop="barcode"
                       label="条码"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center"
                       width="150"
                       label="领取数量">
        <template slot-scope="{row, $index}">
          <el-input-number v-model.trim="row.num" :precision="0" :controls="false" :min="0" label="必填" style="width: 100%;" @blur="calc('num', $index)" />
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="150"
                       label="品牌类型"
                       prop="brandName"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center"
                       width="150"
                       label="毛重">
        <template slot-scope="{row}">
          <el-input v-model.trim="row.grossWeightSum" @change="calcBillWeightTotal()" />
          <!-- <el-input-number v-model.trim="row.grossWeightSum" v-max-spot="5" :controls="false" :min="0" label="必填" style="width: 100%;" @blur="calcBillWeightTotal" /> -->
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="150"
                       label="净重">
        <template slot-scope="{row}">
          <el-input-number v-model.trim="row.netWeightSum" :precision="5" v-max-spot="5" :controls="false" :min="0" label="必填" style="width: 100%;" />
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="150"
                       label="箱号">
        <template slot-scope="{row}">
          <el-input v-model.trim="row.boxNo" clearable />
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="150"
                       label="合同号">
        <template slot-scope="{row}">
          <el-input v-model.trim="row.contractNo" clearable />
        </template>
      </el-table-column>
    </JFX-table>
    <el-row class="fs-12 clr-II">
      <el-col :span="8" class="flex-c-c">
        总数量：{{total('num', 0)}}
      </el-col>
      <el-col :span="8" class="flex-c-c">
        总毛重：{{totalGrossWeightSum}}
      </el-col>
      <el-col :span="8" class="flex-c-c">
        总净重：{{total('netWeightSum', 5)}}
      </el-col>
    </el-row>
    <!-- 商品信息 end -->
    <!-- 底部按钮 -->
    <div class="flex-c-c mr-t-30">
      <el-button type="primary" @click="handleSave" :loading="saveBtnLoading">保存</el-button>
      <el-button type="primary" @click="handleSumbit" :loading="sumbitBtnLoading" v-permission="'sale_material_examine'">审核</el-button>
      <el-button @click="closeTag">取消</el-button>
    </div>
    <!-- 底部按钮 end -->
    <!-- 选择商品 -->
    <ChooseProduct v-if="visible.show"
                   :isVisible="visible"
                   :filterData="chooseProductProp"
                   @comfirm="chooseProduct"
    ></ChooseProduct>
    <!-- 选择商品 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import { getAvailableNum, getOriginalGoodsId } from '@a/base'
import { getDepotDetails, getCustomsAreaList, saveMaterialOrder, detailMaterialOrder, auditMaterialOrder } from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  components: {
    ChooseProduct: () => import('./components/ChooseProduct') // 选择商品
  },
  data() {
    // po号校验规则
    const validatePoNo = (rule, value, callback) => {
      const list = value.split('&')
      const map = new Map()
      let flag = true
      if (list && list.length) {
        for (let i = 0; i < list.length; i++) {
          if (map.has(list[i])) {
            flag = false
          } else {
            map.set(list[i], i)
          }
        }
      }
      if (value === '') {
        callback(new Error('请输入PO单号'))
      } else if (!flag) {
        callback(new Error('PO单号重复了'))
      } else {
        callback()
      }
    }
    return {
      // 表单数据
      ruleForm: {
        // 基本信息
        customerId: '',
        merchantId: '',
        merchantName: '',
        buId: '',
        outDepotId: '',
        isSameArea: '',
        inDepotId: '',
        // payRules: '',
        poNo: '',
        // currency: '',
        contractNo: '',
        // 物流信息
        transport: '',
        teu: '',
        trainno: '',
        carrier: '',
        billWeight: '',
        torusNumber: '',
        boxNum: '',
        torrPackType: '',
        pack: '',
        invoiceNo: '',
        portDes: '',
        outdepotAddr: '',
        outCustomsId: '',
        inCustomsId: '',
        deliveryDate: '',
        destination: '',
        tallyingUnit: '',
        remark: '',
        // 收件信息
        mailMode: '',
        receiverName: '',
        country: '',
        receiverAddress: ''
      },
      // 表单校验信息
      rules: {
        customerId: { required: true, message: '请选择客户', trigger: 'change' },
        merchantId: { required: true, message: '请选择公司', trigger: 'change' },
        buId: { required: true, message: '请选择事业部', trigger: 'change' },
        outDepotId: { required: true, message: '请选择出库仓库', trigger: 'change' },
        isSameArea: { required: true, message: '请选择是否同关区', trigger: 'change' },
        inDepotId: { required: false, message: '请选择入库仓库', trigger: 'change' },
        // payRules: { required: true, message: '请输入付款条约', trigger: 'blur' },
        poNo: { required: true, validator: validatePoNo, trigger: 'blur' },
        // currency: { required: true, message: '请选择销售币种', trigger: 'change' },
        contractNo: { required: true, message: '请输入报关合同号', trigger: 'blur' },
        billWeight: { required: true, message: '请输入提单毛重KG', trigger: 'blur' },
        torusNumber: { required: true, message: '请输入托数', trigger: 'blur' },
        boxNum: { required: true, message: '请输入箱数', trigger: 'blur' },
        torrPackType: { required: true, message: '请选择托盘材质', trigger: 'change' },
        pack: { required: true, message: '请输入包装', trigger: 'blur' },
        invoiceNo: { required: true, message: '请输入发票单号', trigger: 'blur' },
        portDes: { required: true, message: '请输入卸货港', trigger: 'blur' },
        destination: { required: true, message: '请选择目的地', trigger: 'change' },
        tallyingUnit: { required: true, message: '请选择理货单位', trigger: 'change' },
        teu: { required: false, message: '请输入teu', trigger: 'blur' },
        trainno: { required: false, message: '请输入车次', trigger: 'blur' }
      },
      // 选择商品的参数
      chooseProductProp: {},
      // 出库关区列表
      outCustomsList: [],
      // 入库关区列表
      inCustomsList: [],
      // 出库仓库类型
      outDepotType: '',
      // 出库仓库编码
      outDepotCode: '',
      // 出库仓库名称
      outDepotName: '',
      // 保存按钮loading状态
      saveBtnLoading: false,
      // 审核按钮loading状态
      sumbitBtnLoading: false,
      totalGrossWeightSum: ''
    }
  },
  computed: {
    total() {
      // 计算总数
      return (prop, decimal) => this.tableData.list.reduce((pre, item) => {
        pre += item[prop] ? +item[prop] : 0
        return pre
      }, 0).toFixed(decimal)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const { id, copyId } = this.$route.query
      if (copyId) {
        this.editInit(copyId) // 复制
      } else if (id) {
        this.editInit(id) // 编辑
      } else {
        this.addInit() // 新增
      }
    },
    // 新增页面初始化
    async addInit() {
      // 获取公司名
      const userInfo = this.getUserInfo()
      this.ruleForm.merchantId = userInfo.merchantId || ''
      this.ruleForm.merchantName = userInfo.merchantName || ''
      // 计算包装拼接方式
      this.calcPack()
    },
    // 编辑页面初始化
    async editInit(id) {
      try {
        const { data = {} } = await detailMaterialOrder({ id })
        // 复制表单数据
        for (const key in this.ruleForm) {
          this.ruleForm[key] = data[key] ? data[key] + '' : ''
        }
        // 复制商品列表
        const { itemList = [] } = data
        const list = itemList.map((item, index) => ({
          seq: item.seq || index + 1,
          id: item.id || '',
          goodsId: item.goodsId || '',
          goodsCode: item.goodsCode || '',
          goodsName: item.goodsName || '',
          goodsNo: item.goodsNo || '',
          barcode: item.barcode || '',
          commbarcode: item.commbarcode || '',
          num: item.num || 0,
          brandName: item.brandName || '',
          grossWeight: item.grossWeight || 0,
          grossWeightSum: item.grossWeightSum || 0,
          netWeight: item.netWeight || 0,
          netWeightSum: item.netWeightSum || 0,
          boxNo: item.boxNo || '',
          contractNo: item.contractNo || ''
        }))
        this.tableData.list.push(...list)
        // 获取下拉数据状态
        const { buId, outDepotId, inDepotId, isSameArea, transport } = this.ruleForm
        if (buId) {
          delete this.selectOpt['out_warehouses_list']
          this.getSelectBeanByMerchantBuRel('out_warehouses_list', { isValetManage: '1', buId })
        }
        if (outDepotId) {
          this.getDepotType(outDepotId)
          this.getCustomsAreaList('outDepot', outDepotId)
        }
        if (inDepotId) {
          this.getCustomsAreaList('inDepot', inDepotId)
        }
        if (isSameArea) {
          this.isSameAreaChange(isSameArea)
        }
        if (transport) {
          this.transportChange(transport)
        }
        this.calcBillWeight()
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 显示选择商品弹窗
    showChooseProductModal() {
      if (!this.ruleForm.outDepotId) {
        return this.$errorMsg('请先选择出仓仓库!')
      }
      // 选择商品参数
      this.chooseProductProp = {
        merchantName: this.ruleForm.merchantName || '',
        merchantId: this.ruleForm.merchantId || '',
        depotId: this.ruleForm.outDepotId || '',
        popupType: 2
      }
      // 选择过的商品不会出现在列表上
      if (this.tableData.list.length) {
        const unNeedIds = this.tableData.list.map(item => item.goodsId).toString()
        this.chooseProductProp['unNeedIds'] = unNeedIds
      }
      this.visible.show = true
    },
    // 删除商品
    delTableItems() {
      if (this.tableChoseList.length) {
        this.$showToast('确认要删除吗？', () => {
          const ids = this.tableChoseList.map(item => item.goodsId)
          this.tableData.list = this.tableData.list.filter(item => !ids.includes(item.goodsId))
          // 计算总毛重
          this.calcBillWeightTotal()
          this.$successMsg('删除成功')
        })
      }
    },
    // 确认选择商品
    chooseProduct(payload) {
      if (payload && payload.length) {
        const seqs = this.tableData.list.map(item => item.seq)
        seqs.push(0)
        const maxSeq = Math.max(...seqs)
        const list = payload.map((item, index) => {
          return {
            seq: maxSeq + index + 1,
            goodsId: item.id || '',
            goodsCode: item.goodsCode || '',
            goodsName: item.name || '',
            goodsNo: item.goodsNo || '',
            barcode: item.barcode || '',
            commbarcode: item.commbarcode || '',
            num: 0,
            brandName: item.brandName || '',
            grossWeight: item.grossWeight || 0,
            grossWeightSum: item.grossWeight || 0,
            netWeight: item.netWeight || 0,
            netWeightSum: item.netWeight || 0,
            boxNo: '',
            contractNo: ''
          }
        })
        this.tableData.list.push(...list)
      }
      // 计算总毛重
      this.calcBillWeightTotal()
      this.visible.show = false
    },
    // 校验商品
    checkGoods() {
      let flag = true
      if (!this.tableData.list.length) {
        this.$errorMsg(`至少选择一件商品`)
        flag = false
        return flag
      }
      for (let i = 0; i < this.tableData.list.length; i++) {
        const item = this.tableData.list[i]
        if (!item.num || item.num < 0) {
          this.$errorMsg(`表格第${i + 1}行，领取数量必须是大于0的数`)
          flag = false
          break
        }
        if (item.grossWeightSum === undefined || item.grossWeightSum === null) {
          this.$errorMsg(`表格第${i + 1}行，毛重不能为空`)
          flag = false
          break
        }
        if (item.netWeightSum === undefined || item.netWeightSum === null) {
          this.$errorMsg(`表格第${i + 1}行，净重不能为空`)
          flag = false
          break
        }
        if (item.grossWeightSum < item.netWeightSum) {
          this.$errorMsg(`表格第${i + 1}行，毛重不能小于净重`)
          flag = false
          break
        }
      }
      return flag
    },
    // 保存
    handleSave() {
      const { clearValidate, validateField } = this.$refs['ruleForm']
      // 清空校验
      clearValidate()
      // 保存只校验事业部
      validateField('buId', async(valid) => {
        if (!valid) {
          // 请求参数
          const id = this.$route.query.id
          const itemList = this.tableData.list.map(item => ({
            ...item,
            id: item.id ? item.id + '' : '',
            goodsId: item.goodsId + '',
            seq: item.seq + '',
            num: item.num + '',
            netWeight: item.netWeight + '',
            netWeightSum: item.netWeightSum + '',
            grossWeight: item.grossWeight + '',
            grossWeightSum: item.grossWeightSum + ''
          }))
          this.ruleForm = {
            ...this.ruleForm,
            boxNum: this.ruleForm.boxNum + '',
            torusNumber: this.ruleForm.torusNumber + '',
            billWeight: this.ruleForm.billWeight + ''
          }
          const params = {
            ...this.ruleForm,
            id: id || '',
            itemList
          }
          const json = JSON.stringify(params)
          try {
            this.saveBtnLoading = true
            await saveMaterialOrder({ json })
            this.$successMsg('操作成功')
            this.closeTag()
          } catch (error) {
            this.$errorMsg(error.message)
          }
          this.saveBtnLoading = false
        } else {
          this.$errorMsg('请正确填写表单必填项')
        }
      })
    },
    // 审核
    handleSumbit() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          // 校验商品列表
          const flag = this.checkGoods()
          if (!flag) return false
          // 请求参数
          const id = this.$route.query.id
          const itemList = this.tableData.list.map(item => ({
            ...item,
            id: item.id ? item.id + '' : '',
            goodsId: item.goodsId + '',
            seq: item.seq + '',
            num: item.num + '',
            netWeight: item.netWeight + '',
            netWeightSum: item.netWeightSum + '',
            grossWeight: item.grossWeight + '',
            grossWeightSum: item.grossWeightSum + ''
          }))
          this.ruleForm = {
            ...this.ruleForm,
            boxNum: this.ruleForm.boxNum + '',
            torusNumber: this.ruleForm.torusNumber + '',
            billWeight: this.ruleForm.billWeight + ''
          }
          const params = {
            ...this.ruleForm,
            id: id || '',
            itemList
          }
          const json = JSON.stringify(params)
          try {
            this.sumbitBtnLoading = true
            // 校验仓库可用量
            const hasAvailability = await this.queryAvailability()
            if (!hasAvailability) return false
            await auditMaterialOrder({ json })
            this.$successMsg('操作成功')
            this.closeTag()
          } catch (error) {
            this.$errorMsg(error.message)
          } finally {
            this.sumbitBtnLoading = false
          }
        } else {
          this.$errorMsg('请正确填写表单必填项')
        }
      })
    },
    // 相同的原商品id去重
    async uniqueGoodsList() {
      const helper = {}
      const result = []
      for (let i = 0; i < this.tableData.list.length; i++) {
        const item = this.tableData.list[i]
        let { goodsId, goodsNo, num } = item
        num = +num
        // 获取原商品id
        const { data: { originalGoodsId } } = await getOriginalGoodsId({ goodsId, goodsNo, type: 'originalGoodsId' })
        if (originalGoodsId) {
          if (helper[originalGoodsId]) {
            const count = num + helper[originalGoodsId].num
            helper[originalGoodsId] = { ...item, goodsId: originalGoodsId, num: count }
          } else {
            helper[originalGoodsId] = { ...item, goodsId: originalGoodsId }
          }
        } else {
          helper[goodsId] = item
        }
      }
      for (const key in helper) {
        result.push(helper[key])
      }
      return result
    },
    // 校验仓库可用量
    async queryAvailability() {
      let flag = true
      let tallyingUnitVal = ''
      // 中转仓不校验可用量
      if (this.outDepotType === 'd') return flag
      // 海外仓需要获取单位
      if (this.outDepotType === 'c') {
        const { tallyingUnit } = this.ruleForm
        switch (tallyingUnit) {
          case '00':
            tallyingUnitVal = '0'
            break
          case '01':
            tallyingUnitVal = '1'
            break
          case '02':
            tallyingUnitVal = '2'
            break
        }
      }
      // 获取去重后的列表
      const list = await this.uniqueGoodsList()
      for (let i = 0; i < list.length; i++) {
        let { goodsId, goodsNo, num } = list[i]
        // 获取原商品货号
        const { data: { originalGoodsNo } } = await getOriginalGoodsId({ goodsId, goodsNo, type: 'originalGoodsNo' })
        // 查询可用量
        const { data } = await getAvailableNum({
          depotId: this.ruleForm.outDepotId,
          depotCode: this.outDepotCode,
          unit: tallyingUnitVal,
          goodsId
        })
        // 判断可用量
        const availableNum = data || -1
        if (availableNum === -1) {
          originalGoodsNo ? this.$errorMsg(`原货号：${originalGoodsNo} 商品货号：${goodsNo},未查到库存可用量`) : this.$errorMsg(`未查到库存余量货号：${goodsNo}, 仓库：${this.outDepotName}`)
          flag = false
          break
        } else if (num > availableNum) {
          originalGoodsNo ? this.$errorMsg(`库存不足，原货号：${originalGoodsNo} 商品货号：${goodsNo},余量：${availableNum}`) : this.$errorMsg(`库存不足,货号：${goodsNo}, 仓库：${this.outDepotName},余量：${availableNum}`)
          flag = false
          break
        }
      }
      return flag
    },
    // 客户改变
    // async customerIdChange(customerId) {
    //   if (!customerId) return false
    //   // 根据客户带出币种
    //   const { data } = await getCurrencySelectBean({ customerId })
    //   data ? this.ruleForm.currency = data : this.$refs['currency'].resetField()
    // },
    // 事业部改变
    buIdChange(buId) {
      delete this.selectOpt.out_warehouses_list
      this.$refs['outDepotId'].resetField()
      this.getSelectBeanByMerchantBuRel('out_warehouses_list', { isValetManage: '1', buId })
    },
    // 出库仓改变
    async outDepotChange(depotId) {
      // 获取出库关区列表
      this.getCustomsAreaList('outDepot', depotId)
      // 获取出仓库类型
      this.getDepotType(depotId)
    },
    // 入库仓改变
    async inDepotChange(depotId) {
      // 获取入库关区列表
      this.getCustomsAreaList('inDepot', depotId)
    },
    // 运输方式改变
    transportChange(transport) {
      if (transport === '2') {
        this.rules.teu.required = true
        this.rules.trainno.required = false
      } else if (transport === '3' || transport === '4') {
        this.rules.teu.required = false
        this.rules.trainno.required = true
      } else {
        this.rules.teu.required = false
        this.rules.trainno.required = false
      }
    },
    // 获取出入仓库类型
    async getDepotType(id) {
      const { data: { type = '', code, name } } = await getDepotDetails({ id })
      this.outDepotType = type
      this.outDepotCode = code
      this.outDepotName = name
    },
    // 获取出入库关区列表
    async getCustomsAreaList(type, depotId) {
      const { data } = await getCustomsAreaList({ depotId })
      if (data && data.length) {
        const list = data.map(item => ({ key: item.value, value: item.label }))
        if (type === 'inDepot') {
          this.inCustomsList = list
          this.ruleForm.inCustomsId = list[0].key
        } else {
          this.outCustomsList = list
          this.ruleForm.outCustomsId = list[0].key
        }
      } else {
        if (type === 'inDepot') {
          this.inCustomsList = []
          this.ruleForm.inCustomsId = ''
        } else {
          this.outCustomsList = []
          this.ruleForm.outCustomsId = ''
        }
      }
    },
    // 计算商品毛重
    calcBillWeight() {
      // 提单毛重
      let decimal = 3
      if (!this.ruleForm.billWeight || isNaN(this.ruleForm.billWeight)) {
        this.ruleForm.billWeight = '0'
      }
      if (this.ruleForm.billWeight.includes('.')) {
        decimal = this.ruleForm.billWeight.split('.')[1].length
        if (decimal > 5) {
          decimal = 5
          this.ruleForm.billWeight = this.ruleForm.billWeight.slice(0, this.ruleForm.billWeight.indexOf('.') + 6)
        }
      } else {
        this.ruleForm.billWeight = (+this.ruleForm.billWeight).toFixed(0)
      }
      let billWeight = this.ruleForm.billWeight
      // 默认保留三位小数计算
      billWeight = (+billWeight).toFixed(decimal)
      this.totalGrossWeightSum = billWeight
      // 总净重
      const netWeightTotal = this.tableData.list.reduce((pre, item) => {
        pre += item.netWeightSum ? +item.netWeightSum : 0
        return pre
      }, 0)
      // 商品总毛重
      let billWeightTotal = 0
      this.tableData.list.forEach((item, index) => {
        if (index !== this.tableData.list.length - 1) {
          // 对应商品净重
          const netWeightSum = item.netWeightSum ? +item.netWeightSum : 0
          // 商品毛重 = 提单毛重 *（对应商品净重 / 总商品净重）
          const grossWeightSum = (billWeight * (netWeightSum / netWeightTotal)).toFixed(decimal)
          item.grossWeightSum = grossWeightSum
          billWeightTotal += +grossWeightSum
        } else {
          // 第N个商品毛重=总提单毛重-前N-1个商品毛重合计
          const grossWeightSum = (billWeight - billWeightTotal).toFixed(decimal)
          item.grossWeightSum = grossWeightSum
        }
      })
    },
    // 计算提单毛重
    calcBillWeightTotal() {
      let decimal = 0
      let decimalLen = []
      const billWeight = this.tableData.list.reduce((pre, item) => {
        if (!item.grossWeightSum || isNaN(item.grossWeightSum)) {
          item.grossWeightSum = '0'
        }
        item.grossWeightSum = item.grossWeightSum + ''
        if (item.grossWeightSum.includes('.')) {
          decimal = item.grossWeightSum.split('.')[1].length
          if (decimal > 5) {
            decimal = 5
            item.grossWeightSum = item.grossWeightSum.slice(0, item.grossWeightSum.indexOf('.') + 6)
          }
        } else {
          item.grossWeightSum = (+item.grossWeightSum).toFixed(0)
        }
        decimalLen.push(decimal)
        pre += +item.grossWeightSum
        return pre
      }, 0)
      const maxLen = Math.max(...decimalLen)
      let totalBillWeight = (+billWeight).toFixed(maxLen)
      this.totalGrossWeightSum = totalBillWeight
      this.ruleForm.billWeight = totalBillWeight + ''
    },
    // 拼接包装字段
    calcPack() {
      const { boxNum, torusNumber, torrPackType } = this.ruleForm
      const torrPackTypeItem = this.selectOpt.order_torrpacktypeList.find(item => item.key === torrPackType)
      let pack = ''
      pack += boxNum === null || boxNum === undefined ? '' : `${boxNum}箱`
      pack += torusNumber === null || torusNumber === undefined ? '' : `${torusNumber}托`
      pack += torrPackTypeItem ? torrPackTypeItem.value : ''
      this.ruleForm.pack = pack
    },
    // 是否通关区改变
    isSameAreaChange(isSameArea) {
      if (isSameArea === '1') {
        this.rules.inDepotId.required = true
      } else {
        this.rules.inDepotId.required = false
      }
    },
    // 提货方式改变
    mailModeChange(mailMode) {
      if (mailMode === '1') {
        this.ruleForm.receiverName = ''
        this.ruleForm.country = ''
        this.ruleForm.receiverAddress = ''
      } else if (mailMode === '2') {
        this.ruleForm.receiverName = '卓志香港仓'
        this.ruleForm.country = '中国香港'
        this.ruleForm.receiverAddress = '香港 新界 元朗 流浮山路DD129'
      }
    },
    // 计算表格数据
    calc(type, index) {
      const data = this.tableData.list[index]
      let { num = 0, grossWeight = 0, grossWeightSum = 0, netWeight = 0, netWeightSum = 0 } = data
      if (type === 'num') {
        grossWeightSum = (num * grossWeight).toFixed(5)
        netWeightSum = (num * netWeight).toFixed(5)
      }
      this.tableData.list.splice(index, 1, { ...data, grossWeight, grossWeightSum, netWeight, netWeightSum })
      this.calcBillWeightTotal()
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
/deep/.textarea-con {
  display: flex;
  align-items: flex-start;
  .el-form-item__label{
    width: 130px;
  }
  .el-form-item__content {
    width: 700px;
  }
}
.title-bx{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
