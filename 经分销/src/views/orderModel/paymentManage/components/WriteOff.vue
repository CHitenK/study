<template>
  <div>
    <JFX-Dialog
      :visible.sync="writeOffVisible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'1000px'"
      :title="'核销'"
      :btnAlign="'center'"
      :confirmBtnLoading="confirmBtnLoading"
      :beforeClose="beforeClose"
      top="15vh"
    >
      <el-row :gutter="10" class="fs-14 clr-II detail-row">
        <el-col :span="12">
          应付账单号：{{detail.code || '- -'}}
        </el-col>
        <el-col :span="12">
          应付金额：{{`${detail.currency || ''} ${detail.surplusAmount || '0'}`}}
        </el-col>
        <el-col :span="24" class="mr-t-10">
          供应商：{{detail.supplierName || '- -'}}
        </el-col>
      </el-row>
      <el-row class="company-page mr-t-15 detail-row">
        <el-col :span="24">
          <!-- 表格 -->
          <JFX-table :tableData.sync="tableData"
                    :tableColumn="tableColumn"
                    :showPagination="false">
            <template slot="paymentDateStr" slot-scope="{row}">
              <el-date-picker
                v-if="row.edit"
                v-model="row.paymentDate"
                type="date"
                style="width: 100%"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
              />
              <span v-else>{{row.paymentDate ? row.paymentDate.slice(0, 10) : ''}}</span>
            </template>
            <template slot="currentVerificateAmount" slot-scope="{row}">
              <JFX-Input v-if="row.edit" v-model.trim="row.currentVerificateAmount" :precision="2" :min="0" style="width: 100%" />
              <span v-else>{{row.currentVerificateAmount}}</span>
            </template>
            <template slot="serialNo" slot-scope="{row}">
              <el-input v-if="row.edit" v-model="row.serialNo" clearable />
              <span v-else>{{row.serialNo}}</span>
            </template>
          </JFX-table>
        </el-col>
      </el-row>
      <el-row class="mr-b-20 detail-row">
        <el-col :span="2">附件上传：</el-col>
        <el-col :span="22">
          <JFX-upload @success="successUpload" :url="action" :limit="10000" :multiple="false">
            <el-button id="sale-upload-btn" type="primary">上传文件</el-button>
          </JFX-upload>
        </el-col>
        <el-col :offset="2" :span="22">
          <div v-for="item in attachmenList" :key="item.id" style="color: blue;" class="mr-t-10">
            <span @click="downloadAttachmen(item.attachmentUrl, item.attachmentName)" style="padding-right: 10px;cursor: pointer;">{{item.attachmentName}}</span>
            <span @click="delAttachmenItem(item.attachmentCode)" style="cursor: pointer;">删除</span>
          </div>
        </el-col>
      </el-row>
    </JFX-Dialog>
  </div>
</template>
<script>
import {
  getVerificateList,
  detailPaymentBill,
  paymentBillVerificate
} from '@a/paymentManage'
import { listAttachment, downloadFileUrl, delAttachment, attachmentUploadFiles } from '@a/base/index'
import commomMix from '@m/index'
import { getBaseUrl } from '@u/tool'
export default {
  mixins: [commomMix],
  props: {
    writeOffVisible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 详情
      detail: {},
      // 表格列数据
      tableColumn: [
        { label: '本次付款日期', slotTo: 'paymentDateStr', minWidth: '150', align: 'center', hide: true },
        { label: '本次付款金额', slotTo: 'currentVerificateAmount', minWidth: '150', align: 'center', hide: true },
        { label: '付款流水号', slotTo: 'serialNo', minWidth: '150', align: 'center', hide: true },
        { label: '操作人', prop: 'drawee', width: '120', align: 'center', hide: true },
        { label: '操作时间', prop: 'createDate', width: '150', align: 'center', hide: true }
      ],
      // 附件列表
      attachmenList: [],
      // 附件上传url
      action: '',
      // 提交按钮loading
      confirmBtnLoading: false,
      // 日期控件配置
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      try {
        const { id } = this
        const { data } = await detailPaymentBill({ id })
        this.detail = data || {}
        const { data: list } = await getVerificateList({ id })
        this.tableData.list = list || []
        this.tableData.list.push({ edit: true })
        this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + this.detail.code
        // this.getListAttachment()
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 获取附件的列表
    async getListAttachment() {
      const { data: { list } } = await listAttachment({ code: this.detail.code, begin: 0, pageSize: 99 })
      this.attachmenList.push(list.shift())
    },
    async comfirm() {
      const { id: paymentId } = this
      try {
        this.confirmBtnLoading = true
        const { paymentDate: paymentDateStr, serialNo, currentVerificateAmount } = this.tableData.list.find(item => item.edit === true)
        if (paymentDateStr === null || paymentDateStr === undefined || paymentDateStr === '') {
          this.$errorMsg('本次付款日期不能为空')
          return false
        }
        if (currentVerificateAmount === null || currentVerificateAmount === undefined || currentVerificateAmount === '') {
          this.$errorMsg('本次付款金额不能为空')
          return false
        }
        await paymentBillVerificate({
          paymentId: paymentId ? paymentId + '' : '',
          paymentDateStr: paymentDateStr || '',
          serialNo: serialNo || '',
          currentVerificateAmount: currentVerificateAmount || ''
        })
        this.$successMsg('操作成功')
        this.$emit('comfirm')
      } catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.confirmBtnLoading = false
      }
    },
    // 上传成功
    successUpload(res) {
      if (res.code + '' === '10000') {
        this.$successMsg('上传成功')
        this.getListAttachment()
      }
    },
    downloadAttachmen(url, name) {
      this.$exportFile(downloadFileUrl, { url: encodeURI(url), fileName: encodeURI(name) })
    },
    delAttachmenItem(attachmentCodes) {
      this.$showToast('确定要删除吗？', async() => {
        try {
          await delAttachment({ attachmentCodes })
          const codes = attachmentCodes.split(',')
          codes.forEach(code => {
            const target = this.attachmenList.find(item => item.attachmentCode === code)
            if (target) {
              this.attachmenList.splice(this.attachmenList.indexOf(target) >>> 0, 1)
            }
          })
          this.$successMsg('操作成功')
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    async beforeClose() {
      try {
        if (this.attachmenList.length) {
          const attachmentCodes = this.attachmenList.map(item => item.attachmentCode).toString()
          await delAttachment({ attachmentCodes })
        }
        this.$emit('cancel')
      } catch (error) {
        this.$errorMsg(error.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer{
  height: 30px;
  margin-top: -30px;
}
.company-page{
  width: 100%;
  margin-bottom: 10px;
}
</style>
