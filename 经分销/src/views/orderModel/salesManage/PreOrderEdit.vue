<template>
  <!-- 预售订单新增/编辑页面 -->
  <div class="page-bx bgc-w sales-add-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" />
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="客户：" prop="customerId">
            <el-select v-model="ruleForm.customerId"
                       placeholder="请选择"
                       clearable
                       filterable
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
          <el-form-item label="公司：" prop="merchantId">
            <el-select v-model="ruleForm.merchantId"
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
          <el-form-item label="销售类型：" prop="businessModel">
            <el-select v-model="ruleForm.businessModel"
                       placeholder="请选择"
                       filterable
                       :data-list="getSelectList('preSaleOrder_businessModelList')">
              <el-option
                v-for="item in selectOpt.preSaleOrder_businessModelList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="出库仓库：" prop="outDepotId">
            <el-select v-model="ruleForm.outDepotId"
                       placeholder="请选择"
                       clearable
                       filterable
                       @change="outDepotIdChange"
                       :data-list="getSelectBeanByMerchantRel('warehousesList')">
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
          <el-form-item label="事业部：" prop="buId" ref="buId">
            <el-select v-model="ruleForm.buId"
                       placeholder="请选择"
                       clearable
                       :data-list="buList"
                       filterable>
              <el-option
                v-for="item in buList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="PO单号：" prop="poNo">
            <el-input v-model="ruleForm.poNo" placeholder="多PO输入时以&字符" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="销售币种：" prop="currency">
            <el-select
              v-model="ruleForm.currency"
              placeholder="请选择"
              clearable
              filterable
              :data-list="getSelectList('currencyCodeList')"
            >
              <el-option
                v-for="item in selectOpt.currencyCodeList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" v-if="outDepotType === 'c'">
          <el-form-item label="理货单位：" prop="tallyingUnit">
            <el-select
              v-model="ruleForm.tallyingUnit"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="item in tallyingUnitList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：" prop="remark">
            <el-input
              v-model="ruleForm.remark"
              type="textarea"
              style="width: 700px"
              placeholder="请输入"
              :autosize="{ minRows: 2, maxRows: 5 }"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 基本信息 end -->
    <!-- 商品信息 -->
    <JFX-title title="商品信息" className="mr-t-15 title-bx">
      <div>
        <el-button type="primary" @click="showChooseGoodsModal">选择商品</el-button>
        <el-button type="primary" @click="removeTableItem">删除</el-button>
      </div>
    </JFX-title>
    <JFX-table :tableData.sync="tableData"
               @selection-change="selectionChange"
               :showPagination="false">
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
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
      <el-table-column prop="barcode"
                       align="center"
                       label="条码"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center"
                       width="150">
        <template slot="header">
          <span class="need">预售数量</span>
        </template>
        <template slot-scope="{row, $index}">
          <el-input-number v-model.trim="row.num" :precision="0" :controls="false" :min="0" label="必填" style="width: 100%;" @blur="calcForType('num', $index)" />
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="150">
        <template slot="header">
          <span class="need">预售单价</span>
        </template>
        <template slot-scope="{row, $index}">
          <el-input-number v-model.trim="row.price" :precision="8" v-max-spot="8" :controls="false" :min="0" label="必填" style="width: 100%;" @blur="calcForType('price', $index)" />
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="150">
        <template slot="header">
          <span class="need">预售总金额</span>
        </template>
        <template slot-scope="{row, $index}">
          <el-input-number v-model.trim="row.amount" :precision="2" v-max-spot="2" :controls="false" :min="0" label="必填" style="width: 100%;" @blur="calcForType('amount', $index)" />
        </template>
      </el-table-column>
      <el-table-column prop="brandName"
                       align="center"
                       label="品牌类型"
                       width="150"
                       show-overflow-tooltip
      ></el-table-column>
    </JFX-table>
    <!-- 商品信息 end -->
    <!-- 底部按钮 -->
    <div class="mr-t-30 flex-c-c">
      <el-button @click="handleSubmit('save')" type="primary">保 存</el-button>
      <el-button @click="closeTag">取 消</el-button>
      <el-button @click="handleSubmit('examine')" v-permission="'preSale_addPreSaleOrder'" type="primary">保存并审核</el-button>
    </div>
    <!-- 底部按钮 end -->
    <!-- 选择商品 -->
    <ChooseProduct v-if="visible.show"
                   :isVisible="visible"
                   :filterData="filterData"
                   @comfirm="chooseGoods"></ChooseProduct>
    <!-- 选择商品 -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  getBUSelectBean
} from '@a/base/index'
import {
  saveOrModifyTempOrder,
  getPreSaleEditPage,
  modifyPreSaleOrder,
  getDepotDetails,
  addPreSaleOrder
} from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  components: {
    ChooseProduct: () => import('./components/ChooseProduct') // 选择商品
  },
  data() {
    // 检验po号
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
      // 表单信息
      ruleForm: {
        orderCode: '',
        merchantName: '',
        customerId: '',
        merchantId: '',
        businessModel: '',
        outDepotId: '',
        buId: '',
        poNo: '',
        currency: '',
        remark: '',
        tallyingUnit: ''
      },
      // 表单校验规则
      rules: {
        customerId: { required: true, message: '请选择客户', trigger: 'change' },
        merchantId: { required: true, message: '请选择公司', trigger: 'change' },
        businessModel: { required: true, message: '请选择销售类型', trigger: 'change' },
        outDepotId: { required: true, message: '请选择出库仓库', trigger: 'change' },
        buId: { required: true, message: '请选择事业部', trigger: 'change' },
        poNo: { required: true, validator: validatePoNo, trigger: 'blur' },
        currency: { required: true, message: '请选择销售币种', trigger: 'change' },
        tallyingUnit: { required: true, message: '请选择理货单位', trigger: 'change' }
      },
      // 选择商品组件的参数
      filterData: {},
      // 出库仓类型
      outDepotType: '',
      // 事业部列表
      buList: [],
      // 理货单位列表
      tallyingUnitList: [
        { key: '00', value: '托盘' },
        { key: '01', value: '箱' },
        { key: '02', value: '件' }
      ],
      // 面包屑数据
      breadcrumb: this.$route.query.id ? [
        {path: '', meta: { title: '销售管理' }},
        {path: '/sales/presalelist', meta: { title: '预售单列表' }},
        {path: `/sales/preordereedit/${this.$route.query.id}`, meta: { title: '预售单编辑' }}
      ] : [
        {path: '', meta: { title: '销售管理' }},
        {path: '/sales/presalelist', meta: { title: '预售单列表' }},
        {path: `/sales/preordereadd`, meta: { title: '预售单新增' }}
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getBuList()
      const { id } = this.$route.query
      if (id) {
        this.editInit()
      } else {
        this.addInit()
      }
    },
    // 新增页面初始化
    async addInit() {
      // 获取公司名
      const userInfo = this.getUserInfo()
      this.ruleForm.merchantId = userInfo.merchantId || ''
      this.ruleForm.merchantName = userInfo.merchantName || ''
    },
    // 编辑页面初始化
    async editInit() {
      const { id } = this.$route.query
      const { data: { preSaleOrderDTO = {} } } = await getPreSaleEditPage({ id })
      for (const key in this.ruleForm) {
        this.ruleForm[key] = preSaleOrderDTO[key] ? preSaleOrderDTO[key] + '' : ''
      }
      this.ruleForm['orderCode'] = preSaleOrderDTO['code']
      const { outDepotId } = this.ruleForm
      if (outDepotId) {
        const { data: { type } } = await getDepotDetails({ id: outDepotId })
        this.outDepotType = type
      }
      if (preSaleOrderDTO.itemList && preSaleOrderDTO.itemList.length) {
        const list = preSaleOrderDTO.itemList.map(item => ({
          id: item.id,
          goodsId: item.goodsId,
          goodsNo: item.goodsNo,
          goodsName: item.goodsName,
          barcode: item.barcode,
          brandName: item.brandName,
          num: item.num,
          price: item.price,
          amount: item.amount
        }))
        this.tableData.list = list
      }
    },
    // 显示选择商品弹窗
    showChooseGoodsModal() {
      if (!this.ruleForm.outDepotId) {
        return this.$errorMsg('请先选择出仓仓库！')
      }
      this.filterData = {
        merchantId: this.ruleForm.merchantId,
        depotId: this.ruleForm.outDepotId,
        popupType: 2
      }
      if (this.tableData.list.length) {
        const unNeedIds = this.tableData.list.map(item => item.goodsId).toString()
        this.filterData['unNeedIds'] = unNeedIds
      }
      this.visible.show = true
    },
    // 确认选择商品
    chooseGoods(payload) {
      if (payload && payload.length) {
        const list = payload.map(item => ({
          goodsId: item.id || '',
          goodsNo: item.goodsNo || '',
          goodsName: item.name || '',
          barcode: item.commbarcode || '',
          brandName: item.brandName || '',
          num: 1,
          price: 0,
          amount: 0
        }))
        this.tableData.list.push(...list)
      }
      this.visible.show = false
    },
    // 删除商品
    removeTableItem() {
      if (this.tableChoseList.length) {
        const ids = this.tableChoseList.map(item => item.goodsId)
        this.tableData.list = this.tableData.list.filter(item => !ids.includes(item.goodsId))
      }
    },
    // 提交表单
    handleSubmit(type) {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          // 至少选择一个商品
          if (!this.tableData.list.length) {
            return this.$errorMsg('至少选择一个商品')
          }
          // 校验商品
          const checkAll = this.checkoutGoods()
          if (!checkAll) return false
          // 请求参数
          const { id } = this.$route.query
          const itemList = this.tableData.list.map(item => ({
            ...item,
            goodsId: item.goodsId + '',
            num: item.num + '',
            price: item.price + '',
            amount: item.amount + ''
          }))
          const params = {
            ...this.ruleForm,
            itemList,
            orderId: id || ''
          }
          try {
            // 保存
            if (type === 'save') {
              const json = JSON.stringify(params)
              await saveOrModifyTempOrder({ json })
              this.$successMsg('操作成功')
              this.closeTag()
            }
            // 审核
            if (type === 'examine') {
              this.$showToast('确定审核该预售单？', async() => {
                if (this.outDepotType !== 'c') {
                  delete params.tallyingUnit
                }
                if (id) {
                  const json = JSON.stringify(params)
                  await modifyPreSaleOrder({ json }) // 编辑审核
                } else {
                  delete params.orderCode
                  delete params.orderId
                  const json = JSON.stringify(params)
                  await addPreSaleOrder({ json }) // 新增审核
                }
                this.$successMsg('操作成功')
                this.closeTag()
              })
            }
          } catch (error) {
            this.$errorMsg(error.message)
          }
        }
      })
    },
    // 校验商品
    checkoutGoods() {
      let flag = true
      for (let i = 0; i < this.tableData.list.length; i++) {
        const item = this.tableData.list[i]
        // 商品数量必须是大于0的数
        if (!item.num || item.num <= 0) {
          this.$errorMsg('商品数量必须是大于0的数')
          flag = false
          break
        }
        // 商品单价必须是大于0的数
        if (!item.price || item.price <= 0) {
          this.$errorMsg('商品单价必须是大于0的数')
          flag = false
          break
        }
        // 总金额必须是大于0的数
        if (!item.amount || item.amount <= 0) {
          this.$errorMsg('总金额必须是大于0的数')
          flag = false
          break
        }
      }
      return flag
    },
    // 出库仓库状态改变
    async outDepotIdChange(id) {
      const { data: { type } } = await getDepotDetails({ id })
      this.outDepotType = type
      this.getBuList(id)
      this.$refs['buId'].resetField('buId')
    },
    // 获取事业部列表
    async getBuList(depotId = '') {
      const { data } = await getBUSelectBean({ depotId2: depotId })
      if (data && data.length) {
        const list = data.map(item => ({
          key: item.value,
          value: item.label
        }))
        this.buList = list
      }
    },
    // 计算商品列表数据
    calcForType(type, index) {
      const item = this.tableData.list[index]
      let { num = 0, price = 0, amount = 0 } = item
      // 改变单价或数量计算总价
      if (type === 'num' || type === 'price') {
        amount = (num * price).toFixed(2)
      }
      // 改变总价格计算单价
      if (type === 'amount' && num) {
        price = (amount / num).toFixed(8)
      }
      this.tableData.list.splice(index, 1, { ...item, num, price, amount })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.sales-add-bx .el-form-item__label {
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
/deep/.sales-add-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.title-bx{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
