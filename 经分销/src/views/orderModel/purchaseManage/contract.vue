<template>
  <div class="page-bx bgc-w edit-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="false" />
    <!-- 面包屑 end -->
    <!-- 拜耳 -->
    <bayer-contract-edit :detail="detail" v-if="contractType===1"></bayer-contract-edit>
    <!-- 宝洁 -->
    <pg-contract-edit :detail="detail" v-if="contractType===2"></pg-contract-edit>
    <!-- 美赞 -->
    <mead-contract-edit :detail="detail" v-if="contractType===3"></mead-contract-edit>
    <!-- 一般 -->
    <normal-contract-edit :detail="detail" v-if="contractType===4" ref="normal"></normal-contract-edit>
    <div class="mr-t-20" v-if="status === '002'">
      <span class="need">审核结果</span>
      <el-radio v-model="choseStatus" label="003">通过</el-radio>
      <el-radio v-model="choseStatus" label="001">驳回</el-radio>
    </div>
    <div class="mr-t-30 flex-c-c">
      <el-button id="pur_cancle_btn" @click="closePage">取 消</el-button>
      <el-button id="pur_cancle_btn" @click="closeTag" v-if="backTo">上一步</el-button>
      <el-button type="primary" @click="save" id="pur_save_btn" :loading="saveLoading">保 存</el-button>
      <el-button type="primary" @click="saveAdnAudit" v-if="status === '002'">保存并审核</el-button>
      <el-button type="primary" @click="saveAndCommit" :loading="savecommitLoading" v-if="status === '001'" >保存并提交</el-button>
    </div>
    <!-- 审核确认 -->
    <JFX-Dialog
    :visible.sync="visible"
    :showClose="true"
    @comfirm="comfirm"
    :width="'30vw'"
    :title="'审核确认'"
    :btnAlign="'center'"
    top="30vh"
    v-loading="loading"
    >
      <div >
        <div class="change-lve">
          <span class="need">归属时间:</span>
          <el-date-picker
            v-model="attributionDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="mr-t-20 fs-14 clr-r">
          确认保存并审核该采购订单
        </div>
        <div class="mr-t-20"></div>
      </div>
    </JFX-Dialog>
    <!-- 审核确认 end -->
    <!-- 选择采购链路 -->
    <JFX-Dialog
    :visible.sync="choseVisible"
    :showClose="false"
    :width="'50vw'"
    :title="'选择采购链路'"
    :btnAlign="'center'"
    :showFooter="false"
    top="10vh"
    >
     <div>
        <JFX-table
          :tableData.sync="tableData"
          :showPagination="false"
          :height="'420px'"
        >
          <el-table-column label="选择" width="80" align="center">
            <template slot-scope="scope">
              <el-radio v-model="tradeLinkId" :label="scope.row.id">{{scope.row.kk || ''}}</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="采购名称" align="center" min-width="140" show-overflow-tooltip></el-table-column>
        </JFX-table>
        <div class="mr-t-20 flex-c-c">
          <el-button id="pur_cancle_btn" @click="closePage">取 消</el-button>
          <el-button id="pur_cancle_btn" type="primary" @click="choseComfirm">确定</el-button>
        </div>
        <div class="mr-t-20"></div>
      </div>
    </JFX-Dialog>
    <!-- 选择采购链路 end -->
    <!--转销售订单 -->
    <JFX-Dialog
    :visible.sync="saleVisible"
    :showClose="false"
    @comfirm="saleComfirm"
    :width="'50vw'"
    :title="'转销售订单'"
    :btnAlign="'center'"
    top="30vh"
    :beforeClose="closeLay"
    v-loading="saleLoading"
    >
    <div>
      <div class="change-lve">
        <span class="need">{{merchantName}}公司下无对应的销售订单，是否生成销售订单</span>
        <div class="mr-t-15">
          <el-radio v-model="isGenerate" :label="'0'">不生成</el-radio>
          <el-radio v-model="isGenerate" :label="'1'">生成</el-radio>
        </div>
      </div>
      <div class="change-lve mr-t-15" v-if="isGenerate === '1'">
        <span class="need">出仓仓库：</span>
        <el-select v-model="depotId" style="width: 300px" placeholder="请选择" filterable clearable :list-data="getDepotSelectBean('depotIdList')">
          <el-option v-for="item in selectOpt.depotIdList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
      </div>
      <div class="change-lve mr-t-15" v-if="isGenerate === '1'">
        <span class="need">事业部：</span>
        <el-select v-model="buId" style="width: 300px" placeholder="请选择" filterable clearable :list-data="getAllSelectBean('buList')">
          <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
      </div>
      <div class="mr-t-20"></div>
    </div>
    </JFX-Dialog>
    <!-- 转销售订单 -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import { listFileTempInfo,
getContractInfoByPurchaseId,
getPurchaseOrderDetails,
modifyJsonPurchaseContract,
submitJSONPurchaseContract,
getAttributionDate,
updateAttributionDate,
auditJSONPurchaseContract,
checkInnerMerchantSaleOrder,
checkTradeLink,
saveInnerMerchantSaleOrders,
modifyPurchaseContract,
submitPurchaseContract,
auditPurchaseContract } from '@a/purchaseManage/index'
export default {
  mixins: [commomMix],
  components: {
    normalContractEdit: () => import('./components/normalContractEdit'),
    pgContractEdit: () => import('./components/pgContractEdit'),
    bayerContractEdit: () => import('./components/bayerContractEdit'),
    meadContractEdit: () => import('./components/meadContractEdit')
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
          this.detail = {
            ...res1.data,
            ...detail
          }
        }
        if (+contractType === 2) { // 宝洁
          this.detail = {
            orderDate: '',
            requestDeliveryDate: '',
            description: '',
            ...detail,
            ...res1.data
          }
        }
        if (+contractType === 3) { // 美赞
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
    // 返回上一步
    backTo() {
      this.$router.go(-1)
    },
    // 点击保存
    save() {
      // 拜耳保存
      if (this.contractType === 1) {
        this.handleBayer('save')
      }
      // 宝洁
      if (this.contractType === 2) {
        this.handlePg('save')
      }
      // 美赞
      if (this.contractType === 3) {
        this.handleMead('save')
      }
      // 普通保存
      if (this.contractType === 4) {
        this.handleNomal('save')
      }
    },
    // 点击保存并提交
    saveAndCommit() {
      // 拜耳
      if (this.contractType === 1) {
        this.handleBayer('commit')
      }
      // 宝洁
      if (this.contractType === 2) {
        this.handlePg('commit')
      }
      // 美赞臣
      if (this.contractType === 3) {
        this.handleMead('commit')
      }
      // 一般
      if (this.contractType === 4) {
        this.handleNomal('commit')
      }
    },
    // 点击保存并审核
    async saveAdnAudit() {
      if (!this.choseStatus) {
        this.$errorMsg('请选择审核结果')
        return false
      }
      const { query } = this.$route
      // 获取归属时间
      const res = await getAttributionDate({ id: query.id })
      if (res.data) this.attributionDate = res.data.substring(0, 10)
      this.visible.show = true
    },
    // 统一处理宝洁,拜耳,美赞的保存,提交,审核
    async commonHandle(type, opt) {
      // 保存
      if (type === 'save') {
        this.saveLoading = true
        try {
          await modifyJsonPurchaseContract(opt)
          this.$successMsg('编辑成功！')
          this.closePage()
        } catch (error) {
          console.log(error)
        }
        this.saveLoading = false
      }
      // 保存并提交
      if (type === 'commit') {
        this.savecommitLoading = true
        try {
          await submitJSONPurchaseContract(opt)
          this.$successMsg('操作成功！')
          this.closePage()
        } catch (error) {
          console.log(error)
        }
        this.savecommitLoading = false
      }
      // 保存并审核
      if (type === 'audit') {
        this.loading = true
        try {
          await auditJSONPurchaseContract(opt)
          this.visible.show = false
          if (this.choseStatus === '001') { // 驳回
            this.closePage()
            this.$successMsg('操作成功！')
          } else if (this.choseStatus === '003') { // 通过
            // 检查是否要生成内部供应商对应销售订单
            const { query } = this.$route
            const res = await checkInnerMerchantSaleOrder({ id: query.id })
            if (res.data.flag) {
              this.merchantName = res.data.merchantName
              this.$confirm(res.data.merchantName + '公司下无对应的销售订单，是否生成销售订单？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(async() => {
                this.saleVisible.show = true
              }).catch(() => {
                this.closePage()
              })
            } else {
              this.choseLink()
            }
          } else {
            this.closePage()
          }
        } catch (error) {
          this.visible.show = false
          console.log(error)
        }
        this.loading = false
      }
    },
    // 保存的数据 宝洁
    async handlePg(type = 'save') {
      const goodsDescription = this.detail.goodsList.map(item => item.description)
      const goodspgCode = this.detail.goodsList.map(item => item.pgCode)
      const goodsOrderQty = this.detail.goodsList.map(item => item.orderQty ? item.orderQty + '' : '')
      let opt = {
        code: this.detail.code,
        'detail.distributionChannel': this.detail.distributionChannel,
        'detail.deliveryPlant': this.detail.deliveryPlant,
        'detail.division': this.detail.division,
        'detail.orderDate': this.detail.orderDate,
        'detail.poNo': this.detail.poNo,
        'detail.requestDeliveryDate': this.detail.requestDeliveryDate,
        'detail.shipToCode': this.detail.shipToCode,
        'detail.soldToCode': this.detail.soldToCode,
        fileTempCode: 'PG'
      }
      // 转字符串
      for (let key in opt) {
        opt[key] = opt[key] ? opt[key] + '' : ''
      }
      opt = {
        ...opt,
        'goods.description': goodsDescription,
        'goods.pgCode': goodspgCode,
        'goods.orderQty': goodsOrderQty,
        status: this.choseStatus
      }
      this.commonHandle(type, opt)
    },
    // 保存的数据 普通保存
    async handleNomal(type = 'save') {
      const opt = this.$refs['normal'].getParms()
      opt.status = this.choseStatus
      // 保存
      if (type === 'save') {
        this.saveLoading = true
        try {
          await modifyPurchaseContract(opt)
          this.$successMsg('编辑成功！')
          this.closePage()
        } catch (error) {
          console.log(error)
        }
        this.saveLoading = false
      }
      // 保存并提交
      if (type === 'commit') {
        this.savecommitLoading = true
        try {
          await submitPurchaseContract(opt)
          this.$successMsg('操作成功！')
          this.closePage()
        } catch (error) {
          console.log(error)
        }
        this.savecommitLoading = false
      }
      // 保存并审核
      if (type === 'audit') {
        this.loading = true
        try {
          await auditPurchaseContract(opt)
          this.visible.show = false
          if (this.choseStatus === '001') { // 驳回
            this.$successMsg('操作成功！')
            this.closePage()
          } else if (this.choseStatus === '003') { // 通过
            // 检查是否要生成内部供应商对应销售订单
            const { query } = this.$route
            const res = await checkInnerMerchantSaleOrder({ id: query.id })
            if (res.data.flag) {
              this.merchantName = res.data.merchantName
              this.$confirm(res.data.merchantName + '公司下无对应的销售订单，是否生成销售订单？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(async() => {
                this.saleVisible.show = true
              }).catch(() => {
                this.closePage()
              })
            } else {
              this.choseLink()
            }
          }
        } catch (error) {
          this.visible.show = false
          console.log(error)
        }
        this.loading = false
      }
    },
    // 保存的数据 拜耳
    async handleBayer(type = 'save') {
      const opt = {
        fileTempCode: 'Bayer',
        code: this.detail.code,
        'detail.poNo': this.detail.poNo,
        'detail.weekNumber': this.detail.weekNumber || '',
        'detail.buyerEnName': this.detail.buyerEnName,
        'detail.sellerEnName': this.detail.sellerEnName,
        'detail.buyerAddress': this.detail.buyerAddress,
        'detail.sellerAddress': this.detail.sellerAddress,
        'detail.currency': this.detail.currency,
        'detail.totalNum': this.detail.totalNum || '0',
        'detail.totalAccount': this.detail.totalAccount,
        'detail.deliveryAddress': this.detail.deliveryAddress || '',
        'goods.index': this.detail.goodsList.map((item, i) => (i + 1) + ''),
        'goods.brand': this.detail.goodsList.map(item => item.brand || ''),
        'goods.productName': this.detail.goodsList.map(item => item.productName || ''),
        'goods.skus': this.detail.goodsList.map(item => item.skus || ''),
        'goods.globan': this.detail.goodsList.map(item => item.globan || ''),
        'goods.barcode': this.detail.goodsList.map(item => item.barcode),
        'goods.batch': this.detail.goodsList.map(item => item.batch || ''),
        'goods.expiredDate': this.detail.goodsList.map(item => item.expiredDate || ''),
        'goods.num': this.detail.goodsList.map(item => item.num),
        'goods.price': this.detail.goodsList.map(item => item.price),
        'goods.amount': this.detail.goodsList.map(item => item.amount),
        status: this.choseStatus
      }
      this.commonHandle(type, opt)
    },
    // 保存的数据 美赞
    async handleMead(type = 'save') {
      const opt = {
        fileTempCode: 'mead',
        code: this.detail.code,
        'detail.currency': this.detail.currency,
        'detail.buyerEnName': this.detail.buyerEnName,
        'detail.buyerAddress': this.detail.buyerAddress || '',
        'detail.date': this.detail.date || '',
        'detail.title': this.detail.title || '',
        'detail.poNo': this.detail.poNo || '',
        'detail.sellerEnName': this.detail.sellerEnName,
        'detail.linkman': this.detail.linkman || '',
        'detail.tel': this.detail.tel || '',
        'detail.moblie': this.detail.moblie || '',
        'detail.deliveryDate': this.detail.deliveryDate || '',
        'detail.deliveryMethod': this.detail.deliveryMethod || '',
        'detail.totalPlatesNum': this.detail.totalPlatesNum || '0',
        'detail.totalNum': this.detail.totalNum || '0',
        'detail.totalAccount': this.detail.totalAccount || '0',
        'detail.remark': this.detail.remark || '',
        'detail.codDiscount': this.detail.codDiscount || '0',
        'goods.sapCode': this.detail.goodsList.map(item => item.sapCode || ''),
        'goods.goodsName': this.detail.goodsList.map(item => item.goodsName || ''),
        'goods.platesNum': this.detail.goodsList.map(item => item.platesNum || '0'),
        'goods.price': this.detail.goodsList.map(item => item.price || '0'),
        'goods.preNum': this.detail.goodsList.map(item => item.preNum ? item.preNum + '' : '0'),
        'goods.num': this.detail.goodsList.map(item => item.num ? item.num + '' : '0'),
        'goods.listPrice': this.detail.goodsList.map(item => item.listPrice || '0'),
        'goods.amount': this.detail.goodsList.map(item => item.amount ? item.amount + '' : '0'),
        'goods.barcode': this.detail.goodsList.map(item => item.barcode || ''),
        'detail.deliveryAddress': this.detail.deliveryAddress || '',
        'detail.price': this.detail.price || '0',
        status: this.choseStatus
      }
      this.commonHandle(type, opt)
    },
    // 弹窗弹出确认
    async comfirm() {
      if (!this.attributionDate) {
        this.$errorMsg('归属时间不能为空')
        return false
      }
      const { query } = this.$route
      this.loading = true
      try {
        await updateAttributionDate({ id: query.id, attributionDateStr: this.attributionDate + ' 00:00:00' })
        // 拜耳
        if (this.contractType === 1) {
          this.handleBayer('audit')
        }
        // 宝洁
        if (this.contractType === 2) {
          this.handlePg('audit')
        }
        // 美赞臣
        if (this.contractType === 3) {
          this.handleMead('audit')
        }
        // 普通保存
        if (this.contractType === 4) {
          this.handleNomal('audit')
        }
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
    // 审核通过后选择采购链路
    async choseLink() {
      try {
        const { query } = this.$route
        const res = await checkTradeLink({ id: query.id })
        if (res.data.flag) {
          this.tableData.list = [
            { id: '001', name: '不生成交易链路单据' }
          ]
          res.data.tradeLinkList.forEach(item => {
            this.tableData.list.push({
              name: item.linkName,
              id: item.id
            })
          })
          this.tradeLinkId = '001'
          this.choseVisible.show = true
        } else {
          this.closePage()
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 选择交易链路 确认
    choseComfirm() {
      const { query } = this.$route
      this.choseVisible.show = false
      if (this.tradeLinkId === '001') {
        this.$successMsg('操作成功！')
        this.closePage()
      } else {
        this.closeTagByIndex(this.$route.path, () => {
          this.linkTo('/purchase/procurementLink?tradeLinkId=' + this.tradeLinkId + '&step=' + 1 + '&id=' + query.id)
        })
      }
    },
    // 转销售订单 确认
    async saleComfirm() {
      if (this.isGenerate === '0') {
        this.saleVisible.show = false
        this.closePage()
        return false
      }
      if (!this.depotId) {
        this.$errorMsg('出仓仓库不能为空')
        return false
      }
      if (!this.buId) {
        this.$errorMsg('事业部不能为空')
        return false
      }
      this.saleLoading = true
      try {
        const { query } = this.$route
        const res = await saveInnerMerchantSaleOrders({ id: query.id, buId: this.buId, outDepotId: this.depotId })
        if (res.data && res.data !== '{}') {
          this.$successMsg('审核成功，生成销售单失败')
        } else {
          this.$successMsg('审核成功，生成销售订单成功')
        }
        this.saleVisible.show = false
        this.closePage()
      } catch (error) {
        console.log(error)
      }
      this.saleLoading = false
    },
    closeLay() {
      this.choseVisible.show = false
      this.saleVisible.show = false
    },
    closePage() {
      this.closeTagByIndex(this.$route.path, () => {
        this.linkTo('/purchase/purchaseorderList')
      })
    },
    closeLink() {
      console.log(235363)
    }
  }
}
</script>
