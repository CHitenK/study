<template>
  <!-- 客户新增/编辑页面 -->
  <div class="page-bx edit-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <el-form :model="baseForm" ref="baseForm" :rules="rules">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="客户名称：" prop="name">
            <el-input v-model="baseForm.name" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="客户简称：" prop="simpleName" >
            <el-input v-model="baseForm.simpleName" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="营业执照号：" prop="creditCode">
            <el-input v-model="baseForm.creditCode" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="组织机构代码：" prop="orgCode">
            <el-input v-model="baseForm.orgCode" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="企业性质：" prop="nature" >
            <el-input v-model="baseForm.nature" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="销售币种：" prop="currency" >
            <el-select
              v-model="baseForm.currency"
              placeholder="请选择"
              clearable
              filterable
              :data-list="getCurrencySelectBean('currency_list')"
            >
              <el-option
                v-for="item in selectOpt.currency_list"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="中文名：" prop="chinaName" >
            <el-input v-model="baseForm.chinaName" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="英文简称：" prop="enSimpleName" >
            <el-input v-model="baseForm.enSimpleName" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="英文名：" prop="enName" >
            <el-input v-model="baseForm.enName" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="注册地：" prop="companyAddr">
            <el-input v-model="baseForm.companyAddr" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="客户等级编码：" prop="codeGrade" >
            <el-input v-model="baseForm.codeGrade" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="客户授权码：" prop="authNo" >
            <el-input v-model="baseForm.authNo" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="主数据ID：" prop="mainId" >
            <el-input v-model="baseForm.mainId" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="是否内部公司：" prop="type">
            <el-select
              v-model="baseForm.type"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option value="1" label="是"></el-option>
              <el-option value="2" label="否"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" v-if="baseForm.type === '1'">
          <el-form-item label="内部公司：" prop="innerMerchantId">
            <el-select v-model="baseForm.innerMerchantId"
                      placeholder="请选择"
                      clearable
                      filterable
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
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="税号：" prop="taxNo" >
            <el-input v-model="baseForm.taxNo" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="渠道分类：" prop="channelClassify">
            <el-select
              v-model="baseForm.channelClassify"
              placeholder="请选择"
              clearable
              filterable
              :data-list="getSelectList('customerInfo_channelClassifyList')"
            >
              <el-option
                v-for="item in selectOpt.customerInfo_channelClassifyList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" >
          <el-form-item label="经营范围：" prop="operationScope" class="textarea-container">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="baseForm.operationScope" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName">
        <el-tab-pane label="银行信息" name="1">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
              <el-form-item label="开户银行：" prop="depositBank" >
                <el-input v-model="baseForm.depositBank" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
              <el-form-item label="银行账号：" prop="bankAccount" >
                <el-input v-model="baseForm.bankAccount" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
              <el-form-item label="银行账户：" prop="beneficiaryName" >
                <el-input v-model="baseForm.beneficiaryName" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
              <el-form-item label="开户行地址：" prop="bankAddress" >
                <el-input v-model="baseForm.bankAddress" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
              <el-form-item label="Swift Code：" prop="swiftCode" >
                <el-input v-model="baseForm.swiftCode" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="联系方式" name="2">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
              <el-form-item label="法人代表：" prop="legalPerson" >
                <el-input v-model="baseForm.legalPerson" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
              <el-form-item label="法人国籍：" prop="legalNationality" >
                <el-input v-model="baseForm.legalNationality" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
              <el-form-item label="法人代表身份证：" prop="legalCardNo" >
                <el-input v-model="baseForm.legalCardNo" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
              <el-form-item label="法人电话：" prop="legalTel" >
                <el-input v-model="baseForm.legalTel" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
              <el-form-item label="公司电话：" prop="oTelNo" >
                <el-input v-model="baseForm.oTelNo" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="外部编码配置" name="3">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
              <el-form-item label="NC平台编码：" prop="ncPlatformCode">
                <el-select
                  v-model="baseForm.ncPlatformCode"
                  placeholder="请选择"
                  clearable
                  filterable
                  :data-list="getSelectList('platform_codeList')"
                >
                  <el-option
                    v-for="item in selectOpt.platform_codeList"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
              <el-form-item label="NC渠道编码：" prop="ncChannelCode">
                <el-select
                  v-model="baseForm.ncChannelCode"
                  placeholder="请选择"
                  clearable
                  filterable
                  :data-list="getSelectList('channel_codeList')"
                >
                  <el-option
                    v-for="item in selectOpt.channel_codeList"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="合作公司" name="4">
          <el-row class="mr-b-10">
            <el-button type="primary" @click="showModal">新 增</el-button>
            <el-button type="primary" @click="removeRelTableItem">删 除</el-button>
          </el-row>
          <JFX-table :tableData.sync="relTableData"
                     :tableColumn="relTableColumn"
                     :showPagination="false"
                     showSelection
                     @selection-change="selectionChange">
            <template slot="settlementType" slot-scope="{row}">
              <el-select v-model="row.settlementType"
                         placeholder="请选择"
                         filterable
                         clearable>
                <el-option
                  v-for="item in settlementTypeList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </template>
            <template slot="accountPeriod" slot-scope="{row}">
              <el-select v-model="row.accountPeriod"
                         placeholder="请选择"
                         filterable
                         clearable>
                <el-option
                  v-for="item in accountPeriodList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </template>
            <template slot="salePriceManage" slot-scope="{row}">
              <el-checkbox v-model="row.salePriceManage">启用</el-checkbox>
            </template>
            <template slot="tariffRateConfigId" slot-scope="{row}">
              <el-select v-model="row.tariffRateConfigId"
                         placeholder="请选择"
                         filterable
                         clearable>
                <el-option
                  v-for="item in tariffRateConfigList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </template>
            <template slot="businessModel" slot-scope="{row}">
              <el-select v-model="row.businessModel"
                         placeholder="请选择"
                         filterable
                         clearable>
                <el-option
                  v-for="item in businessModelList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </template>
          </JFX-table>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div class="mr-t-30 flex-c-c">
      <el-button @click="handleSubmit" type="primary">保 存</el-button>
      <el-button @click="$router.go(-1)">取 消</el-button>
    </div>
    <!-- 关联公司组件 -->
    <RelatedCompany v-if="relatedCompany.visible.show"
                    :companyVisible="relatedCompany.visible"
                    :id="relatedCompany.id"
                    :isDefaultChecked="false"
                    @comfirm="data => closeModal(data)"
    ></RelatedCompany>
    <!-- 关联公司组件 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import {
  getCustomerEdit,
  getCustomerAdd,
  getCustomerMerchantRelList,
  saveCustomer,
  modifyCustomer
} from '@a/customerManage'
export default {
  mixins: [commomMix],
  components: {
    // 关联公司
    RelatedCompany: () => import('./components/RelatedCompany')
  },
  data() {
    return {
      activeName: '1',
      // 基本信息
      baseForm: {
        source: '', // 来源 1-主数据 2-录入/导入
        name: '',
        simpleName: '',
        creditCode: '',
        orgCode: '',
        nature: '',
        currency: '',
        chinaName: '',
        enSimpleName: '',
        enName: '',
        companyAddr: '',
        codeGrade: '',
        authNo: '',
        mainId: '',
        type: '',
        innerMerchantId: '',
        channelClassify: '',
        operationScope: '',
        // 银行信息
        depositBank: '',
        bankAccount: '',
        beneficiaryName: '',
        bankAddress: '',
        swiftCode: '',
        // 联系方式
        legalPerson: '',
        legalNationality: '',
        legalCardNo: '',
        legalTel: '',
        oTelNo: '',
        // 外部编码配置
        ncPlatformCode: '',
        ncChannelCode: ''
      },
      // 表单规则
      rules: {
        name: { type: 'string', required: true, message: '请输入客户名称', trigger: 'blur' },
        creditCode: { type: 'string', required: true, message: '请输入营业执照号', trigger: 'blur' },
        orgCode: { type: 'string', required: true, message: '请输入组织机构代码', trigger: 'blur' },
        companyAddr: { type: 'string', required: true, message: '请输入注册地', trigger: 'blur' },
        type: { required: true, message: '请选择是否内部公司', trigger: 'change' },
        innerMerchantId: { required: true, message: '请选择内部公司', trigger: 'change' }
      },
      // 关联公司表格结构
      relTableColumn: [
        { label: '公司编码', prop: 'code', minWidth: '120', align: 'center', hide: true },
        { label: '公司名称', prop: 'merchantName', minWidth: '120', align: 'center', hide: true },
        { label: '结算类型', slotTo: 'settlementType', minWidth: '120', align: 'center', hide: true },
        { label: '账期', slotTo: 'accountPeriod', minWidth: '120', align: 'center', hide: true },
        { label: '销售价管理', slotTo: 'salePriceManage', minWidth: '120', align: 'center', hide: true },
        { label: '税率', slotTo: 'tariffRateConfigId', minWidth: '120', align: 'center', hide: true },
        { label: '销售模式', slotTo: 'businessModel', minWidth: '120', align: 'center', hide: true }
      ],
      // 关联公司表格数据
      relTableData: {
        list: []
      },
      // 税率下拉列表
      tariffRateConfigList: [],
      // 账期下拉列表
      accountPeriodList: [],
      // 销售模式下拉列表
      businessModelList: [],
      // 结算类型下拉列表
      settlementTypeList: [],
      // 关联公司组件状态
      relatedCompany: {
        visible: { show: false },
        id: ''
      },
      relListIds: [],
      deleteIds: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id, mainId } = this.$route.query
      id ? this.editInit(id) : this.addInit(mainId)
    },
    // 新增页面初始化
    async addInit(mainId) {
      try {
        // 待引入客商列表调转
        const { data: { detail } } = await getCustomerAdd({ mainId })
        for (const key in this.baseForm) {
          this.baseForm[key] = detail[key] ? detail[key].toString() : ''
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 编辑页面初始化
    async editInit(id) {
      try {
        const { data: { detail } } = await getCustomerEdit({ id })
        for (const key in this.baseForm) {
          this.baseForm[key] = detail[key] ? detail[key].toString() : ''
        }
        const { data: { relList, tariffRateConfigList, accountPeriodList, businessModelList, settlementTypeList } } = await getCustomerMerchantRelList({ customerId: id })
        // 关联公司表格数据
        if (relList && relList.length) {
          this.relTableData.list = relList.map(item => ({
            code: item.code || '',
            merchantName: item.merchant_name || '',
            purchasePriceManageLabel: item.purchase_price_manage === '1',
            tariffRateConfigId: item.rate_id || '',
            merchantId: item.id ? item.id + '' : ''
          }))
          this.relListIds = relList.map(item => item.id + '')
        }
        // 税率下拉列表
        if (tariffRateConfigList && tariffRateConfigList.length) {
          this.tariffRateConfigList = tariffRateConfigList.map(item => ({ key: item.id, value: item.rate }))
        }
        // 账期下拉列表
        this.accountPeriodList = accountPeriodList || []
        // 销售模式下拉列表
        this.businessModelList = businessModelList || []
        // 结算类型下拉列表
        this.settlementTypeList = settlementTypeList || []
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 获取请求参数
    getFetchData() {
      const { id } = this.$route.query
      const merchantList = this.relTableData.list.map(item => ({
        merchantId: item.merchantId || '',
        merchantName: item.merchantName || '',
        settlementType: item.settlementType || '',
        accountPeriod: item.accountPeriod || '',
        businessModel: item.businessModel || '',
        tariffRateConfigId: item.tariffRateConfigId ? item.tariffRateConfigId + '' : '',
        salePriceManage: item.salePriceManage ? '1' : '0'
      }))
      const json = { merchantList }
      if (id) {
        json.deleteIds = (this.deleteIds && this.deleteIds.length) ? this.deleteIds.toString() : ''
      }
      const params = {
        ...this.baseForm,
        json: JSON.stringify(json)
      }
      if (id) {
        params.id = id
      }
      return params
    },
    // 提交表单
    handleSubmit() {
      this.$refs['baseForm'].validate(async(valid) => {
        if (valid) {
          try {
            const { id } = this.$route.query
            const params = this.getFetchData()
            if (id) {
              await modifyCustomer(params)
            } else {
              await saveCustomer(params)
            }
            this.$successMsg(id ? '修改成功' : '保存成功')
            this.closeTag()
          } catch (error) {
            this.$errorMsg(error.message)
          }
        }
      })
    },
    // 删除表格项
    removeRelTableItem() {
      if (!this.tableChoseList.length) {
        this.$alertWarning('至少选择一条记录！')
        return false
      }
      this.$showToast('确定删除数据？', async() => {
        this.tableChoseList.forEach(item => {
          if (this.relListIds.includes(item.merchantId)) {
            this.deleteIds.push(item.merchantId)
          }
        })
        const ids = this.tableChoseList.map(item => item.merchantId)
        this.relTableData.list = this.relTableData.list.filter(item => !ids.includes(item.merchantId))
      })
    },
    // 显示管理公司弹窗
    showModal() {
      this.relatedCompany.visible.show = true
    },
    // 隐藏管理公司弹窗
    closeModal(data) {
      this.relatedCompany.visible.show = false
      data && data.length && data.forEach(item => {
        this.relTableData.list.push({
          merchantId: item.id + '',
          merchantName: item.name,
          code: item.code,
          salePriceManage: false
        })
      })
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

/deep/.textarea-container {
  display: flex;
  align-items: flex-start;
  .el-form-item__label{
    width: 130px;
  }
  .el-form-item__content {
    width: 700px;
  }
}
</style>
