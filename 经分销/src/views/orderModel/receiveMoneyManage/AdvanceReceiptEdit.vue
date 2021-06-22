<template>
  <!-- 预收账单新增/编辑页面 -->
  <div class="page-bx bgc-w sales-add-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 预收信息 -->
    <JFX-title title="预收信息" className="mr-t-15" />
    <el-row  :gutter="10" class="fs-14 clr-II detail-row">
      <el-col  class="mr-b-10" :span="8">
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :span="8">
        客户名称：{{detail.customerName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :span="8">
        结算币种：{{detail.currency || '- -'}}
      </el-col>
    </el-row>
    <!-- 操作 -->
    <el-row>
      <el-col :span="24" class="mr-t-15 mr-b-10">
        <el-button type="primary" @click="removeTableItem">删除</el-button>
        <el-button type="primary" @click="showModal('selectDocument')">选择单据</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               :showPagination="false"
               :summary-method="getSummaries"
               ref="rootTable"
               showSelection
               showSummary
               @selection-change="selectionChange">
      <template slot="projectName" slot-scope="{row, $index}">
        <div @click="showModal('selectSettlement', $index)">
          <el-input v-model="row.projectName" clearable style="width: 94%;" readonly />
        </div>
      </template>
      <template slot="amount" slot-scope="{row}">
        <JFX-Input v-model="row.amount" :precision="2" :min="0" style="width: 94%;"  />
        <!-- <el-input-number v-model.trim="row.amount" :precision="2" v-max-spot="2" :controls="false" :min="0"  style="width: 94%" /> -->
      </template>
      <template slot="remark" slot-scope="{row}">
        <el-input v-model="row.remark" clearable type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" style="width: 94%;" />
      </template>
    </JFX-table>
    <!-- 预收信息 end -->
    <!-- 选择单据 end -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="附件信息" name="1">
        <JFX-upload @success="successUpload" :url="action" :limit="10000" :multiple="false">
          <el-button id="sale-upload-btn" type="primary">上传文件</el-button>
        </JFX-upload>
        <EnclosureList :showAction="false" :code="detail.code" ref="enclosure" class="mr-t-15" />
      </el-tab-pane>
      <el-tab-pane label="操作日志" name="2">
        <JFX-table :tableData.sync="operationTableData"
                   :tableColumn="operationTableColumn"
                   :showPagination="false"
        ></JFX-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 底部按钮 -->
    <div class="mr-t-30 flex-c-c">
      <el-button @click="handleSave" type="primary" :loading="saveBtnLoading">保 存</el-button>
      <el-button @click="closeTag">取 消</el-button>
      <el-button @click="handleSubmit" type="primary" :loading="sumbitBtnLoading">提 交</el-button>
    </div>
    <!-- 底部按钮 end -->
    <!-- 选择单据 -->
    <SelectDocument v-if="selectDocument.visible.show"
                    :selectDocumentVisible="selectDocument.visible"
                    :orderType="selectDocument.orderType"
                    :checkRelCodeStr="selectDocument.checkRelCodeStr"
                    :data="selectDocument.data"
                    @comfirm="(data) => closeModal('selectDocument', data)"
    ></SelectDocument>
    <!-- 选择单据 end -->
    <!-- 选择结算项目 -->
    <SelectSettlement v-if="selectSettlement.visible.show"
                      :selectSettlementVisible="selectSettlement.visible"
                      :customerId="selectSettlement.customerId"
                      :index=selectSettlement.index
                      @comfirm="(data) => closeModal('selectSettlement', data)"
    ></SelectSettlement>
    <!-- 选择结算项目 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import { getBaseUrl, convertCurrency } from '@u/tool'
import {
  detailAdvanceItem,
  saveModifySubmitAdvanceBill
} from '@a/receiveMoneyManage'
import { attachmentUploadFiles } from '@a/base/index'
export default {
  mixins: [commomMix],
  components: {
    // 选择单据
    SelectDocument: () => import('./components/InnerSelectDocument'),
    // 选择结算项目
    SelectSettlement: () => import('./components/SelectSettlement'),
    // 附件列表
    EnclosureList: () => import('@c/enclosureList/index')
  },
  data() {
    return {
      // 详情信息
      detail: {
        buId: '',
        buName: '',
        customerId: '',
        customerName: '',
        currency: '',
        merchantId: '',
        merchantName: '',
        orderType: '',
        code: ''
      },
      // 表格列数据
      tableColumn: [
        { label: '销售订单', prop: 'relCode', minWidth: '150', align: 'center', hide: true },
        { label: 'PO号', prop: 'poNo', minWidth: '150', align: 'center', hide: true },
        { label: '费项名称', slotTo: 'projectName', minWidth: '150', align: 'center', hide: true },
        { label: '金额', slotTo: 'amount', minWidth: '150', align: 'center', hide: true },
        { label: '备注', slotTo: 'remark', minWidth: '150', align: 'center', hide: true }
      ],
      // 操作日志表格数据
      operationTableData: {
        list: []
      },
      // 操作日志表格列结构
      operationTableColumn: [
        { label: '操作人', prop: 'operater', minWidth: '120', align: 'center', hide: true },
        { label: '操作内容', prop: 'content', minWidth: '120', align: 'center', hide: true },
        { label: '备注', prop: 'operateRemark', minWidth: '120', align: 'center', hide: true },
        { label: '操作时间', prop: 'operateDate', minWidth: '150', align: 'center', hide: true }
      ],
      // 选择单据组件状态
      selectDocument: {
        visible: {
          show: false
        },
        checkRelCodeStr: '',
        orderType: '',
        data: {}
      },
      // 选择单据组件状态
      selectSettlement: {
        visible: {
          show: false
        },
        customerId: '',
        index: 0
      },
      // 上传附件的url
      action: '',
      // 当前的tab页
      activeName: '1',
      // 保存按钮loading
      saveBtnLoading: false,
      // 提交按钮loading
      sumbitBtnLoading: false,
      // 标识记录单据用于删除
      index: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id } = this.$route.query
      id ? this.editInit(id) : this.addInit()
    },
    // 新增页面初始化
    async addInit() {
      // 获取表头信息
      const formData = JSON.parse(sessionStorage.getItem('selectDocumentData'))
      for (const key in this.detail) {
        this.detail[key] = formData[key] ? formData[key] + '' : ''
      }
      // 上传附件地址rul
      this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + this.detail.code
      // 获取表体信息
      const { itemList } = formData
      if (itemList && itemList.length) {
        this.tableData.list = itemList.map(item => ({
          ...item,
          amount: item.amount || '0',
          projectId: formData.projectId,
          projectName: formData.projectName,
          // oneLevelProjectName: '商品销售收入',
          index: this.index++
        }))
      } else {
        this.tableData.list = []
      }
      // 获取公司名和公司id
      const { merchantId, merchantName } = this.getUserInfo()
      this.detail.merchantId = merchantId || ''
      this.detail.merchantName = merchantName || ''
    },
    // 编辑页面初始化
    async editInit(id) {
      const { data } = await detailAdvanceItem({ id })
      // 获取表头信息
      for (const key in this.detail) {
        this.detail[key] = data[key] ? data[key] + '' : ''
      }
      // 单据类型
      this.orderType = data.orderType
      // 上传附件地址rul
      this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + this.detail.code
      const { itemList, operateList } = data
      if (itemList && itemList.length) {
        this.tableData.list = itemList.map(item => ({ ...item, index: this.index++ }))
      } else {
        this.tableData.list = []
      }
      this.operationTableData.list = operateList || []
    },
    // 获取请求参数
    getFetchParams() {
      const { id } = this.$route.query
      const { orderType } = this
      // 表体
      const itemList = this.tableData.list.map(item => ({
        ...item,
        amount: item.amount || '0'
      }))
      // 请求参数
      const params = {
        id: id || '',
        orderType,
        ...this.detail,
        token: sessionStorage.getItem('token'),
        itemList
      }
      return params
    },
    // 保存
    async handleSave() {
      try {
        this.saveBtnLoading = true
        // 获取请求参数
        const params = this.getFetchParams()
        await saveModifySubmitAdvanceBill(params)
        this.$successMsg('操作成功')
        this.closeTag()
      } catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.saveBtnLoading = false
      }
    },
    // 提交
    async handleSubmit() {
      try {
        this.sumbitBtnLoading = true
        // 校验表体
        const checked = await this.checkList()
        if (!checked) return false
        // 获取请求参数
        const params = this.getFetchParams()
        params.type = '0'
        await saveModifySubmitAdvanceBill(params)
        this.$successMsg('操作成功')
        this.closeTag()
      } catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.sumbitBtnLoading = false
      }
    },
    // 校验单据
    async checkList() {
      let flag = true
      if (!this.tableData.list.length) {
        this.$errorMsg(`至少选择一条单据`)
        flag = false
        return flag
      }
      const target = this.tableData.list.find(item => {
        return item.amount && item.amount !== '0'
      })
      if (!target) {
        this.$errorMsg('当前预收单至少保留一项收款金额')
        flag = false
        return flag
      }
      return flag
    },
    // 显示弹窗
    showModal(type, data) {
      switch (type) {
        // 选择单据
        case 'selectDocument':
          this.selectDocument.visible.show = true
          this.selectDocument.orderType = this.detail.orderType
          const { currency, buId, customerId } = this.detail
          this.selectDocument.data = { currency, buId, customerId }
          break
        // 选择费项
        case 'selectSettlement':
          this.selectSettlement.visible.show = true
          this.selectSettlement.index = data
          this.selectSettlement.customerId = this.detail.customerId
          break
      }
    },
    // 关闭弹窗
    closeModal(type, data) {
      switch (type) {
        // 选择单据
        case 'selectDocument':
          this.selectDocument.visible.show = false
          this.selectDocument.orderType = ''
          this.selectDocument.data = {}
          if (data) {
            const { itemList } = data
            const tempList = itemList.map(item => ({
              ...item,
              projectId: 1,
              projectName: '经销业务TO B收入',
              oneLevelProjectName: '商品销售收入',
              index: this.index++
            }))
            this.tableData.list.push(...tempList)
          }
          break
        // 选择费项
        case 'selectSettlement':
          this.selectSettlement.visible.show = false
          if (data) {
            const { index, projectId, projectName, oneLevelProjectName } = data
            const item = this.tableData.list[index]
            this.tableData.list.splice(index, 1, { ...item, projectId, projectName, oneLevelProjectName })
          }
          break
      }
    },
    // 计算总和
    getSummaries({ columns, data }) {
      const sums = []
      let amouts = 0
      columns.forEach((item, index) => {
        if (index === 0 || index === 1) {
          item.colSpan = 3
        }
      })
      data.forEach(item => {
        amouts += +item.amount
      })
      const total = convertCurrency(amouts)
      sums[0] = `预收总额：${total}`
      sums[1] = `${this.detail.currency} ${(+amouts).toFixed(2)}`
      return sums
    },
    // 上传附件成功
    successUpload(res) {
      if (res.code + '' === '10000') {
        this.$refs['enclosure'].getEnclosureList(1)
      } else {
        this.$errorMsg(res.message)
      }
    },
    // 删除商品
    removeTableItem() {
      if (!this.tableChoseList.length) {
        return this.$errorMsg('请勾选需要删除的单据！')
      }
      this.$showToast('确定删除数据？', () => {
        const ids = this.tableChoseList.map(item => item.index)
        this.tableData.list = this.tableData.list.filter(item => !ids.includes(item.index))
      })
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
