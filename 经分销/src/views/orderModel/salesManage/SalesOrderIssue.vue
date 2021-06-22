<template>
  <!-- 销售订单出库编辑页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <el-row  :gutter="10" class="fs-14 clr-II mr-b-20">
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        销售订单号：{{detail.code || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        出库仓库：{{detail.outDepotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        入库仓库：{{detail.inDepotName || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        销售类型 {{detail.businessModelLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        客户：{{detail.customerName || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        PO号：{{detail.poNo || '- -'}}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 出库信息 -->
    <JFX-title title="出库信息" className="mr-t-10" />
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="mr-b-10">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="出库时间：" prop="returnOutDate">
            <el-date-picker
              v-model="ruleForm.returnOutDate"
              value-format="yyyy-MM-dd"
              type="date"
              style="width: 350px"
              placeholder="选择日期时间"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="allUp">整单出库</el-button>
        </el-col>
      </el-row>
    </el-form>
    <JFX-table :tableData.sync="tableData"
               :showPagination="false"
               :summary-method="getSummaries"
               showSummary
               @selection-change="selectionChange">
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
      <el-table-column prop="seq"
                       align="center"
                       width="55"
                       label="序号"
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
                       label="条形码"
                       width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="num"
                       align="center"
                       width="120"
                       label="销售数量"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="stayOutNum"
                       align="center"
                       width="120"
                       label="待出库数量"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center" width="150">
        <template slot="header">
          <span class="need">好品出库量</span>
        </template>
        <template slot-scope="{row}">
          <el-input-number v-model.trim="row.transferNum"
                           :precision="0"
                           :controls="false"
                           :min="0"
                           label="必填"
                           style="width: 100%;"
                           :disabled="row.stayOutNum === 0" />
        </template>
      </el-table-column>
      <el-table-column align="center" width="150">
        <template slot="header">
          <span class="need">坏品出库量</span>
        </template>
        <template slot-scope="{row}">
          <el-input-number v-model.trim="row.wornNum"
                           :precision="0"
                           :controls="false"
                           :min="0"
                           label="必填"
                           style="width: 100%;"
                           :disabled="row.stayOutNum === 0" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="批次号" width="150">
        <template slot-scope="{row}">
          <el-input v-model.trim="row.transferBatchNo" clearable />
        </template>
      </el-table-column>
      <el-table-column align="center" label="生产日期" width="150">
        <template slot-scope="{row}">
          <el-date-picker
            v-model="row.productionDate"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 350px"
            placeholder="选择日期时间"
            clearable
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="失效日期" width="150">
        <template slot-scope="{row}">
          <el-date-picker
            v-model="row.overdueDate"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 350px"
            placeholder="选择日期时间"
            clearable
          />
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 出库信息 end -->
    <div class="flex-c-c">
      <el-button @click="handleSubmit" type="primary">保存</el-button>
      <el-button @click="closeTag">取销</el-button>
    </div>
  </div>
</template>
<script>
import commomMix from '@m/index'
import { getOriginalGoodsId, getAvailableNum } from '@a/base'
import {
  toSaleOutPage,
  saveSaleOut,
  getDepotDetails
} from '@a/salesManage'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 面包屑数据
      breadcrumb: [
        {path: '', meta: { title: '销售管理' }},
        {path: '/sales/salesorder', meta: { title: '销售订单列表' }},
        {path: `/sales/salesorderissue/${this.$route.params.id}`, meta: { title: '销售订单出库编辑' }}
      ],
      ruleForm: {
        returnOutDate: ''
      },
      rules: {
        returnOutDate: { required: true, message: '请选择出库时间', trigger: 'change' }
      },
      // 详情数据
      detail: {},
      depotDetail: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id } = this.$route.query
      if (!id) return false
      try {
        const { data } = await toSaleOutPage({ id })
        this.detail = data || {}
        const { itemList } = this.detail
        if (itemList && itemList.length) {
          this.tableData.list = itemList.map(item => ({
            seq: item.seq || '',
            goodsId: item.goodsId || '',
            goodsCode: item.goodsCode || '',
            goodsNo: item.goodsNo || '',
            goodsName: item.goodsName || '',
            barcode: item.barcode || '',
            num: item.num || 0,
            transferNum: item.transferNum || 0,
            wornNum: item.wornNum || 0,
            transferBatchNo: item.transferBatchNo || '',
            productionDate: item.productionDate || '',
            overdueDate: item.overdueDate || '',
            stayOutNum: item.stayOutNum
          }))
          const res = await getDepotDetails({ id: this.detail.outDepotId || '' })
          this.depotDetail = res.data
        } else {
          this.tableData.list = []
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 整单上架
    allUp() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条数据！')
        return false
      }
      this.tableChoseList.forEach(item => {
        item.transferNum = item.stayOutNum
        item.wornNum = 0
      })
    },
    // 提交表单
    handleSubmit() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          // 校验商品
          const flag = await this.checkGoods()
          if (!flag) return false
          // if (this.depotDetail.type !== 'c') {
          //   // 获取去重的商品列表
          //   const checklist = await this.uniqueGoodsList(this.tableData.list)
          //   // 校验可用量
          //   const hasAvailability = await this.checkAvailableNum(checklist, this.depotDetail, this.detail.tallyingUnit)
          //   if (!hasAvailability) return false
          // }
          const itemList = this.tableData.list.map(item => ({
            ...item,
            goodsId: item.goodsId + '',
            stayOutNum: item.stayOutNum ? item.stayOutNum.toString() : '0',
            num: item.num ? item.num.toString() : '0',
            transferNum: item.transferNum ? item.transferNum.toString() : '0',
            wornNum: item.wornNum ? item.wornNum.toString() : '0'
          }))
          // 请求参数
          const params = {
            ...this.ruleForm,
            orderId: this.$route.query.id,
            itemList
          }
          const json = JSON.stringify(params)
          await saveSaleOut({ json })
          this.$successMsg('操作成功')
          this.closeTag()
        }
      })
    },
    // 校验可用量
    async checkAvailableNum(goodsList = [], depotData, tallyUnit = '') {
      const { type, id, code, name } = depotData
      let flag = true
      let unit = ''
      // 海外仓需要获取单位
      if (type === 'c') {
        const unitEnum = { '00': '0', '01': '1', '02': '2' }
        unit = unitEnum[tallyUnit]
      }
      if (!goodsList || !goodsList.length) {
        flag = false
        return flag
      }
      for (let i = 0; i < goodsList.length; i++) {
        const { goodsId, goodsNo, goodsNum } = goodsList[i]
        // 获取原商品货号
        const { data: { originalGoodsNo } } = await getOriginalGoodsId({ goodsId, goodsNo, type: 'originalGoodsNo' })
        // // 查询可用量
        const { data } = await getAvailableNum({ depotId: id, depotCode: code, goodsId, unit })
        // 判断可用量
        const availableNum = data || -1
        if (availableNum === -1) {
          originalGoodsNo ? this.$errorMsg(`原货号：${originalGoodsNo} 商品货号：${goodsNo},未查到库存可用量`) : this.$errorMsg(`未查到库存余量货号：${goodsNo}, 仓库：${name}`)
          flag = false
          break
        } else if (goodsNum > availableNum) {
          originalGoodsNo ? this.$errorMsg(`库存不足，原货号：${originalGoodsNo} 商品货号：${goodsNo},余量：${availableNum}`) : this.$errorMsg(`库存不足,货号：${goodsNo}, 仓库：${name},余量：${availableNum}`)
          flag = false
          break
        }
      }
      return flag
    },
    // 合并相同原商品id的数量
    async uniqueGoodsList(list) {
      const result = []
      const helper = {}
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        let { goodsId, goodsNo } = item
        let goodsNum = item.goodsNum ? item.goodsNum : item.num ? item.num : 0
        // 查询原商品id
        const { data: { originalGoodsId } } = await getOriginalGoodsId({ goodsNo, goodsId, type: 'originalGoodsId' })
        if (originalGoodsId) {
          // 原商品id有重复,计算商品数量总和.
          if (helper[originalGoodsId]) {
            const count = goodsNum + helper[originalGoodsId].goodsNum
            helper[originalGoodsId] = { ...item, goodsId: originalGoodsId, goodsNum: count }
          } else {
            // 原商品id没有重复则直接赋值
            helper[originalGoodsId] = { ...item, goodsId: originalGoodsId }
          }
        } else {
          // 没有原商品id就使用当前商品id
          helper[goodsId] = item
        }
      }
      for (const key in helper) {
        result.push(helper[key])
      }
      return result
    },
    // 校验商品
    async checkGoods() {
      let flag = true
      let wornNums = 0
      let transferNums = 0
      for (let i = 0; i < this.tableData.list.length; i++) {
        const { transferNum, wornNum, stayOutNum } = this.tableData.list[i]
        wornNums += wornNum
        transferNums += transferNum
        if ((transferNum + wornNum) > stayOutNum) {
          this.$errorMsg(`商品表格第${i + 1}行，好品量+坏品量不能大于待出库数量`)
          flag = false
          break
        }
      }
      if (!wornNums && !transferNums) {
        this.$errorMsg('好品量、坏品量必须有一个要大于0')
        flag = false
      }
      return flag
    },
    // 计算总和
    getSummaries({ data }) {
      const sums = []
      let num = 0
      let transferNum = 0
      let wornNum = 0
      let stayOutNum = 0
      data.forEach(item => {
        num += item.num ? +item.num : 0
        transferNum += item.transferNum ? +item.transferNum : 0
        wornNum += item.wornNum ? +item.wornNum : 0
        stayOutNum += item.stayOutNum ? +item.stayOutNum : 0
      })
      sums[1] = '汇总'
      sums[5] = num
      sums[6] = stayOutNum
      sums[7] = transferNum
      sums[8] = wornNum
      return sums
    }
  }
}
</script>
