<template>
  <!-- 出库打托页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" />
    <el-row :gutter="10" class="fs-12 clr-II mr-b-10 detail-row">
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        销售退单号：{{saleReturnOrder.code || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        退出仓库：{{saleReturnOrder.outDepotName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        退入仓库：{{saleReturnOrder.inDepotName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        事业部：{{saleReturnOrder.buName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        创建人：{{saleReturnOrder.createName || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        提交时间：{{saleReturnOrder.auditDate || '- -'}}
      </el-col>
      <el-col class="mr-b-10" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        海外仓理货单位：{{saleReturnOrder.tallyingUnitLabel || '- -'}}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 上架信息 -->
    <JFX-title title="上架信息" />
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-row type="flex">
        <el-form-item label="出库时间：" prop="returnOutDate">
          <el-date-picker
            v-model="ruleForm.returnOutDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择"
            style="width: 203px;"
            clearable
          />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="附件上传：" prop="receiverName">
          <JFX-upload @success="successUpload" :url="action" :limit="10000" :multiple="false">
            <el-button id="sale-upload-btn" type="primary">上传理货报告</el-button>
          </JFX-upload>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- 上架信息 end -->
    <!-- 商品信息 -->
    <el-row class="mr-b-10 mr-t-20">
      <el-button id="sale-delivery-all" type="primary" @click="allDaTuo">整批打托</el-button>
    </el-row>
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" >
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
      <el-table-column prop="inGoodsNo"
                       align="center"
                       width="100"
                       label="商品货号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="inGoodsName"
                       align="center"
                       min-width="120"
                       label="商品名称"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="barcode"
                       align="center"
                       width="120"
                       label="条码"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="totalNum"
                       align="center"
                       width="100"
                       label="计划退出量"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column align="center"
                       label="出库好品量"
                       width="120">
        <template slot="header">
          <span class="need">出库好品量</span>
        </template>
        <template slot-scope="{row}">
          <el-input-number v-model.trim="row.returnNum" :precision="0" :controls="false" :min="0" style="width: 100%;" :disabled="row.returnNum===0"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="出库坏品量"
                       width="120">
        <template slot="header">
          <span class="need">出库坏品量</span>
        </template>
        <template slot-scope="{row}">
          <el-input-number v-model.trim="row.badGoodsNum" :precision="0" :controls="false" :min="0" style="width: 100%;" :disabled="row.returnNum===0"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" width="180" label="批次号">
        <template slot-scope="{row}">
          <el-input v-model.trim="row.returnBatchNo" clearable :disabled="row.returnNum===0" />
        </template>
      </el-table-column>
      <el-table-column align="center" width="150" label="生产日期">
        <template slot-scope="{row}">
          <el-date-picker
            type="date"
            v-model="row.productionDate"
            value-format="yyyy-MM-ddd"
            style="width: 100%;"
            clearable
            :disabled="row.returnNum===0"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" width="150" label="失效日期">
        <template slot-scope="{row}">
          <el-date-picker
            type="date"
            v-model="row.overdueDate"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
            :disabled="row.returnNum===0"
            clearable
          />
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 商品信息 end -->
    <!-- 附件列表 -->
    <JFX-title title="附件列表" />
    <enclosure-list :code="saleReturnOrder.code" v-if="saleReturnOrder.code" ref="enclosure"></enclosure-list>
    <!-- 附件列表 end -->
    <!-- 底部按钮 -->
    <div class="mr-t-30 flex-c-c">
      <el-button id="sale-save-btn" @click="handleSubmit" type="primary" :loading="saveLoading">保 存</el-button>
      <el-button id="sale-cancel-btn" @click="$router.go(-1)">取 消</el-button>
    </div>
    <!-- 底部按钮 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import { toOutDepotReport, saveOdepotReport } from '@a/salesReturnManage/index'
import { getOriginalGoodsId, getAvailableNum, attachmentUploadFiles } from '@a/base/index'
import { getBaseUrl } from '@u/tool'
export default {
  mixins: [commomMix],
  components: {
    enclosureList: () => import('@c/enclosureList/index')
  },
  data() {
    return {
      saleReturnOrder: {},
      ruleForm: {
        returnOutDate: ''
      },
      rules: {
        returnOutDate: [{ requsred: true, message: '请选择', trigger: 'change' }]
      },
      action: '',
      saveLoading: false
    }
  },
  activated() {
    this.getList()
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 拉取表格数据
		async getList() {
      try {
        this.tableData.loading = true
        const { data, data: { itemList } } = await toOutDepotReport({id: this.$route.query.id})
        this.saleReturnOrder = data
        this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + data.code
        if (itemList) {
          itemList.map(item => {
            const { returnNum, badGoodsNum } = item
            item.totalNum = (+badGoodsNum) + (+returnNum)
            item.oldReturnNum = returnNum
            item.oldBadGoodsNum = badGoodsNum
          })
        }
        this.tableData = {
          list: itemList,
          loading: false
        }
      } catch (error) {
        this.tableData.loading = false
      }
    },
    // 提交表单
    async handleSubmit() {
      if (!this.ruleForm.returnOutDate) {
        this.$errorMsg('出库时间不能为空！')
        return false
      }
      const cm = await this.handleTableData()
      if (!cm) return false
      this.saveLoading = true
      try {
        const opt = {
          returnOutDate: this.ruleForm.returnOutDate,
          orderId: this.saleReturnOrder.id,
          itemList: cm.itemList
        }
        if (cm.goodsNos.length > 0) {
          this.$warningMsg('出库好品量+出库坏品量不能大于计划退出量')
          this.saveLoading = false
          return false
        }
        await saveOdepotReport({ json: JSON.stringify(opt) })
        this.$successMsg('操作成功')
        this.saveLoading = false
        this.closeTag()
      } catch (error) {
        console.log(error)
      }
      this.saveLoading = false
    },
    // 校验和获取table数据
    async handleTableData() {
      let flag = true
      const goodsNos = []
      const itemList = []
      this.saveLoading = true
      for (let i = 0; i < this.tableData.list.length; i++) {
        const { totalNum, outGoodsId, outGoodsNo, outGoodsCode, outGoodsName, returnBatchNo = '', barcode, returnNum, badGoodsNum, productionDate = '', overdueDate = '', poNo } = this.tableData.list[i]
        const tips = `表格第${i + 1}行, `
        if (returnNum === undefined || returnNum === '') {
          this.$errorMsg(tips + '出库好品量必填')
          flag = false
          return false
        }
        if (badGoodsNum === undefined || badGoodsNum === '') {
          this.$errorMsg(tips + '出库坏品量必填')
          flag = false
          return false
        }
        if (badGoodsNum === 0 && returnNum === 0) {
          this.$errorMsg(tips + '出库好品量、出库坏品量必须有一个要大于0')
          flag = false
          return false
        }
        const allNum = returnNum + badGoodsNum
        if (totalNum < allNum) {
          goodsNos.push(outGoodsNo)
        }
        // 校验库存量
        let availableNum = -1
        try {
          const { data } = await getOriginalGoodsId({ goodsNo: outGoodsNo, goodsId: outGoodsId, type: 'originalGoodsId' })
          const originalGoodsId = data.originalGoodsId
          const opt = {
            depotId: this.saleReturnOrder.outDepotId,
            goodsId: originalGoodsId || outGoodsId,
            batchNo: returnBatchNo
          }
          const res = await getAvailableNum(opt)
          availableNum = res.data || -1
        } catch (error) {
          this.saveLoading = false
          availableNum = -1
        }
        // 获取原货号
        let originalGoodsId = ''
        try {
          const res = await getOriginalGoodsId({ goodsNo: outGoodsNo, goodsId: outGoodsId, type: 'originalGoodsNo' })
          originalGoodsId = res.data ? res.data.originalGoodsId : ''
        } catch (error) {
          originalGoodsId = ''
        }
        // 校验库存
        if (availableNum === -1) {
          flag = false
          const tipl = originalGoodsId ? `原货号：${originalGoodsId} ,` : ''
          this.$alertError(`${tipl}商品货号：${outGoodsNo}, 未查到库存可用量,仓库: ${this.saleReturnOrder.outDepotName}`)
          return false
        } else if (allNum > availableNum) {
          flag = false
          const tipl = originalGoodsId ? `原货号：${originalGoodsId} ` : ''
          this.$alertError(`库存不足，${tipl}商品货号：${outGoodsNo}, 未查到库存可用量,仓库: ${this.saleReturnOrder.outDepotName},余量：${availableNum} `)
          return false
        }
        const gtem = { totalNum, outGoodsId, outGoodsNo, outGoodsCode, outGoodsName, returnBatchNo, barcode, returnNum, badGoodsNum, productionDate, overdueDate, poNo }
        for (let key in gtem) {
          gtem[key] = gtem[key] === null ? '' : gtem[key] + ''
        }
        itemList.push(gtem)
      }
      this.saveLoading = false
      if (!flag) return false
      return {
        goodsNos,
        itemList
      }
    },
    // 上传成功
    successUpload(res) {
      if (res.code + '' === '10000') {
        this.$refs['enclosure'].getEnclosureList(1)
      } else {
        this.$errorMsg(res.message)
      }
    },
    // 整批打托
    allDaTuo() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条数据！')
        return false
      }
      this.tableChoseList.map(item => {
        item.returnNum = item.totalNum
        item.badGoodsNum = 0
      })
    }
  }
}
</script>
