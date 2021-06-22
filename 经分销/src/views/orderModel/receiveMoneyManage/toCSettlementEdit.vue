<template>
  <div class="page-bx bgc-w edit-bx">
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" >
      <!-- 面包屑 -->
      <JFX-Breadcrumb :showGoback="true" :breadcrumb="breadcrumb" />
      <!-- 面包屑 end -->
      <el-row  :gutter="10" class="fs-14 clr-II mr-t-20">
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="结算日期：" prop="settlementDateStr" >
            <el-date-picker v-model="ruleForm.settlementDateStr" type="date" clearable value-format="yyyy-MM-dd" placeholder="选择日期"  style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="事业部：" prop="buId" >
            <el-select v-model="ruleForm.buId" style="width: 100%" placeholder="请选择" clearable filterable :data-list="getBUSelectBean('buList')">
              <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="运营类型：" prop="shopTypeCode" >
            <el-select v-model="ruleForm.shopTypeCode" style="width: 100%" placeholder="请选择" clearable filterable :data-list="getSelectList('merchantShopRel_shopTypeList')" @change="changeShopTypeCode" >
              <el-option v-for="item in selectOpt.merchantShopRel_shopTypeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="平台名称：" prop="storePlatformCode" >
            <el-select v-model="ruleForm.storePlatformCode" style="width: 100%" placeholder="请选择" clearable filterable :data-list="getSelectList('storePlatformList')" @change="changeStorePlatformCode" >
              <el-option v-for="item in selectOpt.storePlatformList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="店铺名称：" :prop="ruleForm.shopTypeCode === '002' ? '' : 'shopCode'" >
            <el-select v-model="ruleForm.shopCode" style="width: 100%" placeholder="请选择" clearable filterable :disabled="ruleForm.shopTypeCode === '002'"  @change="changeShopCode" >
              <el-option v-for="item in dianpuList" :key="item.shopCode" :label="item.shopName" :value="item.shopCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="结算币种：" prop="settlementCurrency" >
            <el-select v-model="ruleForm.settlementCurrency" style="width: 100%" placeholder="请选择" clearable filterable :data-list="getSelectList('currencyCodeList')">
              <el-option v-for="item in selectOpt.currencyCodeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="客户：" prop="customerId" >
            <el-select v-model="ruleForm.customerId" style="width: 100%" placeholder="请选择" clearable filterable >
              <el-option v-for="item in kuhuList"  :key="item.customerId" :label="item.customerName" :value="item.customerId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="外部结算单号：" prop="externalCode" >
            <el-input v-model.trim="ruleForm.externalCode" clearable placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="导入结算单：" >
            <div>
              <el-button type="primary" @click="uploadFile">上传文件</el-button>
              <span class="pd-15 clr-act c-p" @click="downLoad">通用模板下载</span>
              <span style="margin-left: 5px;" class="fs-12 clr-III">{{fileName}}</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="mr-t-30 flex-c-c">
        <el-button type="primary" @click="save" id="save_from" :loading="saveLoading">生成应收单</el-button>
        <el-button @click="closeTag" id="cancel_ret">取 消</el-button>
      </div>
    </el-form>
    <div class="hide-form">
      <input type="file" id="page-upload" name="file" accept=".xlsx,.xls" @change="changeFile" />
    </div>
  </div>
</template>
<script>
import commomMix from '@m/index'
import { getShopInfo, saveTocSettlementBill, toCReceiveBillDetail } from '@a/receiveMoneyManage/index'
import { getBaseUrl } from '@u/tool'
import { downTemplateUrl } from '@a/base/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      breadcrumb: [{
        path: '', meta: { title: '收款管理' }
      },
      {
        path: '', meta: { title: 'to_c结算新增' }
      }],
      ruleForm: {
        id: '',
        settlementDateStr: '',
        buId: '',
        shopTypeCode: '',
        storePlatformCode: '',
        shopCode: '',
        settlementCurrency: '',
        customerId: '',
        externalCode: ''
      },
      rules: {
        settlementDateStr: { required: true, message: '请选择结算日期', trigger: 'change' },
        buId: { required: true, message: '请选择事业部', trigger: 'change' },
        shopTypeCode: { required: true, message: '请选择运营类型', trigger: 'change' },
        storePlatformCode: { required: true, message: '请选择平台名称', trigger: 'change' },
        shopCode: { required: true, message: '请选择店铺名称', trigger: 'change' },
        settlementCurrency: { required: true, message: '请选择结算币种', trigger: 'change' },
        customerId: { required: true, message: '请选择客户', trigger: 'change' }
      },
      action: '',
      dianpuList: [],
      kuhuList: [],
      saveLoading: false,
      showUploadBtn: false,
      fileName: '',
      file: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { query } = this.$route
      if (!query.id) return false
      try {
        const res = await toCReceiveBillDetail({ id: query.id })
        const { tocSettlementReceiveBillDTO } = res.data
        for (let key in this.ruleForm) {
          this.ruleForm[key] = tocSettlementReceiveBillDTO[key] ? tocSettlementReceiveBillDTO[key].toString() : ''
        }
        this.ruleForm.settlementDateStr = tocSettlementReceiveBillDTO.settlementDate || ''
        this.ruleForm.customerId = tocSettlementReceiveBillDTO.customerId ? Number(tocSettlementReceiveBillDTO.customerId) : ''
        this.ruleForm.id = query.id
        this.changeShopTypeCode('init')
        this.changeStorePlatformCode('init')
        this.changeShopCode('init')
      } catch (err) {
      }
    },
    successUpload(res) {
      if (res.code + '' === '10000') {
        this.$refs['enclosure'].getEnclosureList(1)
      } else {
        this.$errorMsg(res.message)
      }
    },
    // 选择运营类型
    async changeShopTypeCode(type) {
      const { shopTypeCode } = this.ruleForm
      this.dianpuList = []
      this.kuhuList = []
      /** 1、若运营类型为”POP“时，
       * 1.1 根据选择的平台名称，获取现有店铺信息表中对应已有维护的店铺信息选择。运营类型为POP时，店铺名称必填。
       * 1.3 根据已选择的店铺名称，获取现有店铺信息表中对应已有维护的客户名称。
       * 2、当运营类型为一件代发时，
       * 2.1 店铺名称隐藏字段，非必填；
       * 2.2 默认结算币种为港币；
       * 2.3 客户可选枚举值为店铺信息表中已有维护的“一件代发”店铺关联的客户名称
      */
      if (shopTypeCode === '002') {
        const res = await getShopInfo({ shopTypeCode })
        this.kuhuList = []
        res.data.forEach(item => {
          const flag = this.kuhuList.find(gtem => +item.customerId === +gtem.customerId)
          if (!flag && item.customerName) this.kuhuList.push(item)
        })
      }
      if (type !== 'init') {
        this.ruleForm.shopCode = ''
        this.ruleForm.customerId = ''
        this.ruleForm.storePlatformCode = ''
        if (shopTypeCode === '002') { // 当运营类型为一件代发时
          this.ruleForm.settlementCurrency = 'HKD' // 默认结算币种为港币
        }
      }
    },
    // 修改平台名称
    async changeStorePlatformCode(type) {
      const { storePlatformCode, shopTypeCode } = this.ruleForm
      this.dianpuList = []
      if (storePlatformCode && shopTypeCode === '001') { // pop
        const res = await getShopInfo({ shopTypeCode, storePlatformCode })
        this.dianpuList = res.data || []
      }
      if (type !== 'init') {
        this.ruleForm.shopCode = ''
      }
    },
    // 修改店铺名称
    async changeShopCode(type) {
      const { shopCode, storePlatformCode, shopTypeCode } = this.ruleForm
      this.kuhuList = []
      if (shopCode && storePlatformCode && shopTypeCode) {
        const res = await getShopInfo({ shopCode, storePlatformCode, shopTypeCode })
        this.kuhuList = res.data || []
      }
      if (type !== 'init') {
        this.ruleForm.customerId = ''
      }
    },
    async save() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (!valid) return false
        if (!this.fileName) {
          this.$errorMsg('请上传文件')
          return false
        }
        const formData = new FormData()
        for (let key in this.ruleForm) {
          formData.append(key, this.ruleForm[key])
        }
        formData.append('file', this.file)
        formData.append('token', sessionStorage.getItem('token'))
        await saveTocSettlementBill(formData)
      })
    },
    // 下载
    downLoad() {
      const url = getBaseUrl(downTemplateUrl) + downTemplateUrl + `?token=${sessionStorage.getItem('token')}&ids=151`
      window.open(url, '_blank')
    },
    // 上传文件
    uploadFile() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (!valid) return false
        document.getElementById('page-upload').click()
      })
    },
    changeFile(e) {
      if (e.target && e.target.files) {
        const { name } = e.target.files[0]
        this.fileName = name
        this.file = e.target.files[0]
      }
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
