<template>
  <div class="page-bx bgc-w pd-l-15">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true"  :breadcrumb="breadcrumb" />
    <div class="mr-t-20"></div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="合同" name="first">
        <contract-edit :detail="detail" :type="type" ref="contract"></contract-edit>
      </el-tab-pane>
      <el-tab-pane label="发票" name="second">
        <invoice-edit :detail="detail" :type="type" ref="invoice"></invoice-edit>
      </el-tab-pane>
      <el-tab-pane label="装箱单" name="third">
        <packing-report :detail="detail" :type="type" ref="packing"></packing-report>
      </el-tab-pane>
      <el-tab-pane label="装箱明细" name="fourth">
        <packing-detail :detail="detail" :type="type" ref="packingDetail"></packing-detail>
      </el-tab-pane>
      <el-tab-pane label="原来成分占比" name="five">
        <raw-material-ratio :detail="detail" :type="type"></raw-material-ratio>
      </el-tab-pane>
    </el-tabs>
    <div class="mr-t-30 flex-c-c" v-if=" type=== 'edit'">
      <el-button type="primary" @click="save" :loading="saveLoading" id="save_some_info">保 存</el-button>
      <el-button @click="closeTag" id="clsoe_some_info">取 消</el-button>
    </div>
    <div class="mr-t-30"></div>
  </div>
</template>
<script>
import { getFirstCustomsDeclareInfo, modifyCustomsDeclare } from '@a/purchaseManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    contractEdit: () => import('./components/contractEdit'), // 合同
    invoiceEdit: () => import('./components/invoiceEdit'), // 发票
    packingReport: () => import('./components/packingReport'), // 装箱单
    packingDetail: () => import('./components/packingDetail'), // 装箱明细
    rawMaterialRatio: () => import('./components/rawMaterialRatio')
  },
  data() {
    return {
      breadcrumb: [{
        path: '', meta: { title: '采购管理' }
      },
      {
        path: '', meta: { title: '编辑相关资料' }
      }],
      activeName: 'first',
      detail: {},
      type: 'edit',
      saveLoading: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    handleClick() {},
    async init() {
      const { query } = this.$route
      if (!query.id) return false
      this.type = query.type
      const name = this.type === 'edit' ? '编辑相关资料' : '相关资料详情'
      this.breadcrumb[1].meta.title = name
      try {
        const res = await getFirstCustomsDeclareInfo({ id: query.id })
        this.detail = res.data
        // 合同
        this.$refs['contract'].ruleForm = {
          contractNo: this.detail.contractNo,
          signingDateStr: this.detail.signingDate,
          signingAddr: this.detail.signingAddr,
          firstParty: this.detail.firstParty,
          firstPartyAddr: this.detail.firstPartyAddr,
          secondParty: this.detail.secondParty
        }
        // 发票
        this.$refs['invoice'].ruleForm = {
          invoiceDateStr: this.detail.invoiceDate,
          eAddressee: this.detail.eAddressee,
          eAddresseeAddr: this.detail.eAddresseeAddr,
          addressee: this.detail.addressee,
          addresseeAddr: this.detail.addresseeAddr,
          shipDateStr: this.detail.shipDate,
          payment: this.detail.payment,
          pack: this.detail.pack,
          portLoading: this.detail.portLoading,
          portDest: this.detail.portDest,
          payRules: this.detail.payRules,
          countryOrigin: this.detail.countryOrigin,
          shipper: this.detail.shipper,
          mark: this.detail.mark
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 保存
    async save() {
      this.saveLoading = true
      const cm = {
        goodIds: [],
        torrNos: [],
        carton: []
      }
      this.$refs['packingDetail'].tableData.list.map(item => {
        cm.goodIds.push(item.goodsId || '')
        cm.torrNos.push(item.torrNo || '')
        cm.carton.push(item.cartons || '')
      })
      this.$refs['contract'].ruleForm.signingDateStr = this.$refs['contract'].ruleForm.signingDateStr ? this.$refs['contract'].ruleForm.signingDateStr.substring(0, 10) : ''
      this.$refs['invoice'].ruleForm.invoiceDateStr = this.$refs['invoice'].ruleForm.invoiceDateStr ? this.$refs['invoice'].ruleForm.invoiceDateStr.substring(0, 10) : ''
      this.$refs['invoice'].ruleForm.shipDateStr = this.$refs['invoice'].ruleForm.shipDateStr ? this.$refs['invoice'].ruleForm.shipDateStr.substring(0, 10) : ''
      const opt = {
        ...this.$refs['contract'].ruleForm,
        ...this.$refs['invoice'].ruleForm,
        goodIds: cm.goodIds.join(','),
        palletNos: cm.palletNos.join(','),
        carton: cm.carton.join(','),
        id: this.detail.id
      }
      try {
        await modifyCustomsDeclare(opt)
        this.$successMsg('保存成功')
        this.closeTag()
      } catch (error) {
        console.log(error)
      }
      this.saveLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.pd-l-15{
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
}
</style>
