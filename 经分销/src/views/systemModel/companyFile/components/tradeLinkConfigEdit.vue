<template>
  <!-- 客户额度配置 -->
  <div class="edit-bx">
    <JFX-Dialog
      :visible.sync="visible"
      :showClose="true"
      :width="'840px'"
      :title="'编辑交易链路'"
      :btnAlign="'center'"
      top="60px"
      :showFooter="false"
      >
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="交易链路名称：" prop="linkName" class="search-panel-item fs-14 clr-II" >
                <el-input v-model="ruleForm.linkName" placeholder="输入内容" clearable ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="起点公司：" prop="startPointMerchantId" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.startPointMerchantId" placeholder="请选择" filterable clearable :data-list="getSelectMerchantBean('merchantList')"  style="width: 200px;"  @change="changeStartPointMerchantId">
                  <el-option v-for="(item, i) in selectOpt.merchantList"  :key="i" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="起点事业部：" prop="startPointBuId" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.startPointBuId" placeholder="请选择" filterable clearable style="width: 200px;">
                  <el-option v-for="(item, i) in selectOpt.startBuList" :key="i" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="销售加价比例%：" prop="startPointPremiumRate" class="search-panel-item fs-14 clr-II" :rules="rules.rate">
                <JFX-Input v-model.trim="ruleForm.startPointPremiumRate" :min="0" :precision="5" placeholder="请输入" style="width: 200px;" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="起点供应商：" prop="startSupplierId" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.startSupplierId" placeholder="请选择" clearable style="width: 200px;" >
                  <el-option v-for="(item, i) in selectOpt.supplierList"  :key="i" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24" class="line-bx"></el-col>
            <el-col :span="12">
              <el-form-item label="客户1：" prop="oneCustomerId" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.oneCustomerId" placeholder="请选择" filterable clearable  style="width: 200px;"  @change="changeOneCustomerId">
                  <el-option v-for="(item, i) in selectOpt.kuhuList1"  :key="i" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户1事业部：" :prop="+ruleForm.oneType === 1 ? 'oneBuId': ''" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.oneBuId" placeholder="请选择" filterable clearable style="width: 200px;">
                  <el-option v-for="(item, i) in selectOpt.buList1"  :key="i" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="销售加价比例：" prop="onePremiumRate" class="search-panel-item fs-14 clr-II" :rules="ruleForm.oneCustomerId ? rules.rate : null" >
                <JFX-Input v-model.trim="ruleForm.onePremiumRate" :min="0" :precision="5" placeholder="请输入" style="width: 200px;" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="24" class="line-bx"></el-col>
            <el-col :span="12">
              <el-form-item label="客户2：" prop="twoCustomerId" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.twoCustomerId" placeholder="请选择" filterable clearable  style="width: 200px;"  @change="changeTwoCustomerId">
                  <el-option v-for="(item, i) in selectOpt.kuhuList2"  :key="i" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户2事业部：" :prop="+ruleForm.twoType === 1 ? 'twoBuId': ''" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.twoBuId" placeholder="请选择" filterable clearable >
                  <el-option v-for="(item, i) in selectOpt.buList2"  :key="i" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="销售加价比例：" prop="twoPremiumRate" class="search-panel-item fs-14 clr-II" :rules="ruleForm.twoCustomerId ? rules.rate : null" >
                <JFX-Input v-model.trim="ruleForm.twoPremiumRate" :min="0" :precision="5" placeholder="请输入" style="width: 200px;" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="24" class="line-bx"></el-col>
            <el-col :span="12">
              <el-form-item label="客户3：" prop="threeCustomerId" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.threeCustomerId" placeholder="请选择" filterable clearable style="width: 200px;"  @change="changeThreeCustomerId">
                  <el-option v-for="(item, i) in selectOpt.kuhuList3"  :key="i" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户3事业部：" :prop="+ruleForm.threeType === 1 ? 'threeBuId': ''" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.threeBuId" placeholder="请选择" filterable clearable >
                  <el-option v-for="(item, i) in selectOpt.buList3"  :key="i" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="销售加价比例：" prop="threePremiumRate" class="search-panel-item fs-14 clr-II" :rules="ruleForm.threeCustomerId ? rules.rate : null" >
                <JFX-Input v-model.trim="ruleForm.threePremiumRate" :min="0" :precision="5" placeholder="请输入" style="width: 200px;" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="24" class="line-bx"></el-col>
            <el-col :span="12">
              <el-form-item label="客户4：" prop="fourCustomerId" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.fourCustomerId" placeholder="请选择" filterable clearable style="width: 200px;"  @change="changeFourCustomerId">
                  <el-option v-for="(item, i) in selectOpt.kuhuList4"  :key="i" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户4事业部：" :prop="+ruleForm.fourType === 1 ? 'fourBuId': ''" class="search-panel-item fs-14 clr-II" >
                <el-select v-model="ruleForm.fourBuId" placeholder="请选择" filterable clearable >
                  <el-option v-for="(item, i) in selectOpt.buList4"  :key="i" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24" class="line-bx"></el-col>
          </el-row>
          <div class="mr-t-20 flex-c-c">
            <el-button @click="visible.show=false" id="cancel_ret">取 消</el-button>
            <el-button type="primary" @click="submitForm" :loading="saveLoading" >保 存</el-button>
          </div>
          <div class="mr-t-30"></div>
      </el-form>
    </JFX-Dialog>
  </div>
</template>
<script>
import commomMix from '@m/index'
import { getCustomerById } from '@a/base/index'
import { saveTradeLinkConfig, modifyTradeLinkConfig } from '@a/companyFile/index'
export default {
  mixins: [commomMix],
  props: {
    visible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    // 数据
    targetData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      ruleForm: {
        id: '',
        linkName: '',
        startPointMerchantId: '',
        startPointMerchantName: '',
        startPointBuId: '',
        startPointPremiumRate: '',
        startSupplierId: '',
        startSupplierName: '',
        startPointBuName: '',
        // one
        oneCustomerId: '',
        oneBuId: '',
        onePremiumRate: '',
        oneCustomerName: '',
        oneBuName: '',
        oneType: '',
        oneIdvaluetype: '',
        // two
        twoCustomerId: '',
        twoBuId: '',
        twoPremiumRate: '',
        twoCustomerName: '',
        twoBuName: '',
        twoType: '',
        twoIdvaluetype: '',
        // three
        threeCustomerId: '',
        threeBuId: '',
        threePremiumRate: '',
        threeCustomerName: '',
        threeBuName: '',
        threeType: '',
        threeIdvaluetype: '',
        // four
        fourCustomerId: '',
        fourBuId: '',
        fourCustomerName: '',
        fourBuName: '',
        fourType: '',
        fourIdvaluetype: ''
      },
      rules: {
        linkName: { required: true, message: '输入交易链路名称', trigger: 'change' },
        startPointMerchantId: { required: true, message: '请选择公司', trigger: 'change' },
        startPointBuId: { required: true, message: '请选择事业部', trigger: 'change' },
        rate: { required: true, message: '销售加价比例不能为空', trigger: 'change' },
        startSupplierId: { required: true, message: '请选择起点供应商', trigger: 'change' },
        oneBuId: { required: true, message: '请选择事业部', trigger: 'change' },
        twoBuId: { required: true, message: '请选择事业部', trigger: 'change' },
        threeBuId: { required: true, message: '请选择事业部', trigger: 'change' },
        fourBuId: { required: true, message: '请选择事业部', trigger: 'change' }
      },
      saveLoading: false,
      oneCustomerInfo: {},
      twoCustomerInfo: {},
      threeCustomerInfo: {},
      fourCustomerInfo: {}
    }
  },
  mounted() {
    // 编辑
    this.init()
  },
  methods: {
    async init() {
      for (let key in this.ruleForm) {
        if (!['oneCustomerId', 'twoCustomerId', 'threeCustomerId', 'fourCustomerId', 'startPointPremiumRate', 'onePremiumRate', 'twoPremiumRate', 'threePremiumRate'].includes(key)) { // 客户字段不需要转字符串
          this.ruleForm[key] = this.targetData[key] ? this.targetData[key].toString() : ''
        } else {
          this.ruleForm[key] = this.$transformZeroBl(this.targetData[key]) ? Number(this.targetData[key]) : ''
        }
      }
      this.changeStartPointMerchantId('init')
      this.changeOneCustomerId('init')
      this.changeTwoCustomerId('init')
      this.changeThreeCustomerId('init')
      this.changeFourCustomerId('init')
    },
    // 选择起点公司
    changeStartPointMerchantId(type) {
      const { startPointMerchantId } = this.ruleForm
      delete this.selectOpt.startBuList
      delete this.selectOpt.kuhuList1
      delete this.selectOpt.supplierList
      if (startPointMerchantId) {
        this.getBUSelectBean('startBuList', { merchantId: startPointMerchantId }) // 加载起点事业部
        this.getCustomerByMerchantId('kuhuList1', { merchantId: startPointMerchantId, cusType: '1' }, { 'key': 'id', 'value': 'name' }) // 加载客户1下拉
        this.getSupplierByMerchantId('supplierList', { merchantId: startPointMerchantId }) // 加载起点供应商
      }
      if (type !== 'init') {
        this.ruleForm.startSupplierId = ''
        this.ruleForm.startPointBuId = ''
        this.ruleForm.oneCustomerId = ''
      }
    },
    // 选择客户1
    async changeOneCustomerId(type) {
      const { oneCustomerId } = this.ruleForm
      delete this.selectOpt.kuhuList2
      delete this.selectOpt.buList1
      this.oneCustomerInfo = {}
      if (oneCustomerId) {
        const res = await getCustomerById({ id: oneCustomerId }) // 获取客户1信息
        this.oneCustomerInfo = res.data || {} // 客户1信息
        this.ruleForm.oneIdvaluetype = '1' // 客户类型(1内部,2外部)
        this.ruleForm.oneType = this.oneCustomerInfo.type
        // 加载客户2
        if (this.oneCustomerInfo.type === '2') { // 外部公司,拿供应商
          this.ruleForm.twoIdvaluetype = '2'
          this.getSupplierMerchantRelByMainIdURL('kuhuList2', { mainId: this.oneCustomerInfo.mainId }, { 'key': 'merchantId', 'value': 'merchantName' }) // 加载客户2下拉
        } else {
          this.ruleForm.twoIdvaluetype = '1'
          this.getCustomerByMerchantId('kuhuList2', { merchantId: this.oneCustomerInfo.innerMerchantId, cusType: '1' }, { 'key': 'id', 'value': 'name' }) // 加载客户1下拉
        }
        const buOneCustomerId = this.ruleForm.oneType === '1' ? this.oneCustomerInfo.innerMerchantId : oneCustomerId
        this.getBUSelectBean('buList1', { merchantId: buOneCustomerId }) // 加载事业部1
      }
      if (type !== 'init') {
        this.ruleForm.oneBuId = ''
        this.ruleForm.twoCustomerId = ''
      }
      this.$refs['ruleForm'].clearValidate() // 清除校验提示语
    },
    // 选择客户2
    async changeTwoCustomerId(type) {
      const { twoCustomerId } = this.ruleForm
      delete this.selectOpt.kuhuList3
      delete this.selectOpt.buList2
      this.twoCustomerInfo = {}
      if (twoCustomerId) {
         const res = await getCustomerById({ id: twoCustomerId })
        this.twoCustomerInfo = res.data || {}
        // 加载客户3
        if (this.twoCustomerInfo.type === '2') { // //外部公司,拿供应商
          this.ruleForm.threeIdvaluetype = '2'
          this.ruleForm.twoType = this.twoCustomerInfo.type
          this.getSupplierMerchantRelByMainIdURL('kuhuList3', { mainId: this.twoCustomerInfo.mainId }, { 'key': 'merchantId', 'value': 'merchantName' }) // 加载客户2下拉
        } else {
          this.ruleForm.threeIdvaluetype = '1'
          this.ruleForm.twoType = '1'
          this.getCustomerByMerchantId('kuhuList3', { merchantId: this.twoCustomerInfo.innerMerchantId || '', cusType: '1' }, { 'key': 'id', 'value': 'name' }) // 加载客户1下拉
        }
        const butwoCustomerId = this.ruleForm.twoType === '1' ? this.twoCustomerInfo.innerMerchantId || '' : twoCustomerId
        this.getBUSelectBean('buList2', { merchantId: butwoCustomerId }) // 加载事业部2
      }
      if (type !== 'init') {
        this.ruleForm.twoBuId = ''
        this.ruleForm.threeCustomerId = ''
      }
      this.$refs['ruleForm'].clearValidate()
    },
    // 选择客户3
    async changeThreeCustomerId(type) {
      const { threeCustomerId } = this.ruleForm
      delete this.selectOpt.kuhuList4
      delete this.selectOpt.buList3
      this.threeCustomerInfo = {}
      if (threeCustomerId) {
        const res = await getCustomerById({ id: threeCustomerId })
        this.threeCustomerInfo = res.data || {}
        // 加载客户4
        if (this.threeCustomerInfo.type === '2') { // //外部公司,拿供应商
          console.log(this.threeCustomerInfo.type)
          this.ruleForm.fourIdvaluetype = '2'
          this.ruleForm.threeType = this.threeCustomerInfo.type
          this.getSupplierMerchantRelByMainIdURL('kuhuList4', { mainId: this.threeCustomerInfo.mainId }, { 'key': 'merchantId', 'value': 'merchantName' }) // 加载客户3下拉
        } else {
          this.ruleForm.fourIdvaluetype = '1'
          this.ruleForm.threeType = '1'
          this.getCustomerByMerchantId('kuhuList4', { merchantId: this.threeCustomerInfo.innerMerchantId || '', cusType: '1' }, { 'key': 'id', 'value': 'name' }) // 加载客户1下拉
        }
        const buThreeCustomerId = this.ruleForm.threeType === '1' ? this.threeCustomerInfo.innerMerchantId || '' : threeCustomerId
        this.getBUSelectBean('buList3', { merchantId: buThreeCustomerId }) // 加载事业部3
      }
      if (type !== 'init') {
        this.ruleForm.threeBuId = ''
        this.ruleForm.fourCustomerId = ''
      }
      this.$refs['ruleForm'].clearValidate() // 清除校验提示语
    },
    // 选择客户4
    async changeFourCustomerId(type) {
      const { fourCustomerId } = this.ruleForm
      delete this.selectOpt.buList4
      this.fourCustomerInfo = {}
      if (fourCustomerId) {
        const res = await getCustomerById({ id: fourCustomerId })
        this.fourCustomerInfo = res.data || {}
        if (this.fourCustomerInfo.type === '2') {
          this.ruleForm.fourType = this.fourCustomerInfo.type
        } else {
          this.ruleForm.fourType = ''
          if (this.fourCustomerInfo.id) {
            this.ruleForm.fourIdvaluetype = '2'
          }
        }
        const buFourCustomerId = this.ruleForm.fourType === '1' ? this.fourCustomerInfo.innerMerchantId || '' : fourCustomerId
        this.getBUSelectBean('buList4', { merchantId: buFourCustomerId }) // 加载事业部4
      }
      if (type !== 'init') {
        this.ruleForm.fourBuId = ''
      }
      this.$refs['ruleForm'].clearValidate() // 清除校验提示语
    },
    // 保存
    async submitForm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (!valid) return false
        this.saveLoading = true
        const { startPointMerchantId, startPointBuId, startSupplierId, oneCustomerId, oneBuId, twoCustomerId, twoBuId, threeCustomerId, threeBuId, fourCustomerId, fourBuId } = this.ruleForm
        this.ruleForm.startPointMerchantName = ''
        if (startPointMerchantId) {
          const taget = this.selectOpt.merchantList.find(item => +startPointMerchantId === +item.key) || {}
          this.ruleForm.startPointMerchantName = taget.value || ''
        }
        this.ruleForm.startPointBuName = ''
        if (startPointBuId) {
          const taget = this.selectOpt.startBuList.find(item => +startPointBuId === +item.key) || {}
          this.ruleForm.startPointBuName = taget.value || ''
        }
        this.ruleForm.startSupplierName = ''
        if (startSupplierId) {
          const taget = this.selectOpt.supplierList.find(item => +startSupplierId === +item.key) || {}
          this.ruleForm.startSupplierName = taget.value || ''
        }
        this.ruleForm.oneCustomerName = ''
        if (oneCustomerId) {
          const taget = this.selectOpt.kuhuList1.find(item => +oneCustomerId === +item.key) || {}
          this.ruleForm.oneCustomerName = taget.value || ''
        }
        this.ruleForm.oneBuName = ''
        if (oneBuId) {
          const taget = this.selectOpt.buList1.find(item => +oneBuId === +item.key) || {}
          this.ruleForm.oneBuName = taget.value || ''
        }
        this.ruleForm.twoCustomerName = ''
        if (twoCustomerId) {
          const taget = this.selectOpt.kuhuList2.find(item => +twoCustomerId === +item.key) || {}
          this.ruleForm.twoCustomerName = taget.value || ''
        }
        this.ruleForm.twoBuName = ''
        if (twoBuId) {
          const taget = this.selectOpt.buList2.find(item => +twoBuId === +item.key) || {}
          this.ruleForm.twoBuName = taget.value || ''
        }
        this.ruleForm.threeCustomerName = ''
        if (threeCustomerId) {
          const taget = this.selectOpt.kuhuList3.find(item => +threeCustomerId === +item.key) || {}
          this.ruleForm.threeCustomerName = taget.value || ''
        }
        this.ruleForm.threeBuName = ''
        if (threeBuId) {
          const taget = this.selectOpt.buList3.find(item => +threeBuId === +item.key) || {}
          this.ruleForm.threeBuName = taget.value || ''
        }
        this.ruleForm.fourCustomerName = ''
        if (fourCustomerId) {
          const taget = this.selectOpt.kuhuList4.find(item => +fourCustomerId === +item.key) || {}
          this.ruleForm.fourCustomerName = taget.value || ''
        }
        this.ruleForm.fourBuName = ''
        if (fourBuId) {
          const taget = this.selectOpt.buList4.find(item => +fourBuId === +item.key) || {}
          this.ruleForm.fourBuName = taget.value || ''
        }
        try {
          if (!this.ruleForm.id) { // 新增/复制
            delete this.ruleForm.id
            await saveTradeLinkConfig({ json: JSON.stringify(this.ruleForm) })
          } else { // 编辑修改
            await modifyTradeLinkConfig({ json: JSON.stringify(this.ruleForm) })
          }
          this.$successMsg('操作成功')
          this.$emit('close')
          this.visible.show = false
        } catch (error) {
          console.log(error)
        }
        this.saveLoading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.edit-bx {
  .el-form-item {
    display: flex;
    flex-wrap: wrap;
  }
  .el-form-item__label {
    width: 150px;
    text-align: right;
  }
  .el-form-item__content {
    flex: 1;
    padding-right: 40px;
  }
}
.line-bx{
  width: 100%;
  height: 1px;
  background-color: #eaeaea;
  margin: 10px 0;
}
</style>
