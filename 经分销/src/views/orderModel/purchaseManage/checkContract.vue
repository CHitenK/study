<template>
  <div class="page-bx bgc-w edit-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="false" />
    <!-- 面包屑 end -->
    <!-- 拜耳 -->
    <bayer-contract-detail :detail="detail" v-if="contractType===1"></bayer-contract-detail>
    <!-- 宝洁 -->
    <pg-contract-detail :detail="detail" v-if="contractType===2"></pg-contract-detail>
    <!-- 美赞 -->
    <mead-contract-detail :detail="detail" v-if="contractType===3"></mead-contract-detail>
    <!-- 一般 -->
    <normal-contract-detail :detail="detail" v-if="contractType===4" ref="normal"></normal-contract-detail>
    <div class="mr-t-30 flex-c-c">
      <el-button id="pur_cancle_btn" @click="closeTag">取 消</el-button>
      <el-button type="primary" @click="exportPDF" id="pur_save_btn" :loading="saveLoading">导 出</el-button>
    </div>
  </div>
</template>
<script>
import commomMix from '@m/index'
import {
listFileTempInfo,
getContractInfoByPurchaseId,
getPurchaseOrderDetails,
exportPurchaseContractPdfUrl,
exportTempDateFileUrl
} from '@a/purchaseManage/index'
export default {
  mixins: [commomMix],
  components: {
    normalContractDetail: () => import('./components/normalContractDetail'),
    pgContractDetail: () => import('./components/pgContractDetail'),
    bayerContractDetail: () => import('./components/bayerContractDetail'),
    meadContractDetail: () => import('./components/meadContractDetail')
  },
  data() {
    return {
      detail: {},
      contractType: 0,
      status: '',
      saveLoading: false,
      savecommitLoading: false,
      transferWarehouseLoading: false,
      visible: { show: false },
      choseVisible: { show: false },
      saleVisible: { show: false },
      attributionDate: '',
      loading: false,
      saleLoading: false,
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      tradeLinkId: '',
      choseStatus: '',
      merchantName: '',
      depotId: '',
      buId: '',
      isGenerate: '0'
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const { query } = this.$route
      if (!query.id) return false
      // 获取模板id
      try {
        const res = await listFileTempInfo({ customerIds: query.customerId, type: 1 })
        const tempId = res.data && res.data.length > 0 ? res.data[0].id : ''
        const res1 = await getContractInfoByPurchaseId({ id: query.id, tempId: tempId })
        const { detail } = res1.data
        const { contractType } = res1.data // 同类型 1-拜耳 2-宝洁 3-美赞 4-一般
        // 拜耳
        if (+contractType === 1) {
          this.fileTempCode = 'Bayer'
          this.detail = {
            ...res1.data,
            ...detail
          }
        }
        if (+contractType === 2) { // 宝洁
          this.fileTempCode = 'PG'
          this.detail = {
            orderDate: '',
            requestDeliveryDate: '',
            description: '',
            ...detail,
            ...res1.data
          }
        }
        if (+contractType === 3) { // 美赞
          this.fileTempCode = 'mead'
          this.detail = {
            ...detail,
            ...res1.data,
            codDiscount: detail.codDiscount || '1',
            totalAccount: detail.totalAccount
          }
        }
        // 普通
        if (+contractType === 4) {
          this.detail = {
            ...detail,
            ...res1.data
          }
        }
        this.contractType = +contractType
        // 获取采购订单详情
        const res2 = await getPurchaseOrderDetails({ id: query.id })
        const { status } = res2.data
        this.status = status || ''
      } catch (error) {
        console.log(error)
      }
    },
    // 导出
    exportPDF() {
      const { query } = this.$route
      if (this.contractType === 4) { // 普通导出
        this.$exportFile(exportPurchaseContractPdfUrl, { orderId: query.id })
      } else { // 导出美赞、宝洁、拜耳合同文件
        const json = { orderCode: this.detail.code, direction: 'horizontal', fileTempCode: this.fileTempCode }
        this.$exportFile(exportTempDateFileUrl, json)
      }
    }
  }
}
</script>
