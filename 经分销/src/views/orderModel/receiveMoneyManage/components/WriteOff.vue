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
      top="15vh"
    >
      <el-row :gutter="10" class="fs-14 clr-II">
        <el-col :span="8">
          预收款单号：{{detail.code || '- -'}}
        </el-col>
        <el-col :span="8">
          客户：{{detail.customerName || '- -'}}
        </el-col>
        <el-col :span="8">
          预收金额：{{`${detail.sumAmount || ''} ${detail.currency || ''}`}}
        </el-col>
      </el-row>
      <el-row class="company-page mr-t-20">
        <el-col :span="24" class="mr-t-10">
          <!-- 表格 -->
          <JFX-table :tableData.sync="tableData"
                    :tableColumn="tableColumn"
                    :showPagination="false">
            <template slot="receiveDate" slot-scope="{row}">
              <el-date-picker
                v-if="row.edit"
                v-model="row.verifyDate"
                type="date"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              />
              <span v-else>{{row.verifyDate ? row.verifyDate.slice(0, 10) : ''}}</span>
            </template>
            <template slot="price" slot-scope="{row}">
              <JFX-Input v-if="row.edit" v-model.trim="row.price" :precision="2" :min="0" style="width: 100%" />
              <span v-else>{{row.price}}</span>
            </template>
            <template slot="verifyNo" slot-scope="{row}">
              <el-input v-if="row.edit" v-model="row.verifyNo" clearable />
              <span v-else>{{row.verifyNo}}</span>
            </template>
          </JFX-table>
        </el-col>
      </el-row>
      <el-row class="mr-b-20">
        <el-col :span="2">附件上传： </el-col>
        <el-col :span="22">
          <JFX-upload @success="successUpload" :url="action" :limit="10000" :multiple="false">
            <el-button id="sale-upload-btn" type="primary">上传文件</el-button>
          </JFX-upload>
        </el-col>
        <el-col :offset="2" :span="22">
          <div v-for="item in attachmenList" :key="item.id" style="color: blue;" class="mr-t-10">
            <span @click="downloadAttachmen(item.attachmentUrl, item.attachmentName)" style="padding-right: 10px;">{{item.attachmentName}}</span>
            <span @click="delAttachmenItem(item.attachmentCode)">删除</span>
          </div>
        </el-col>
      </el-row>
    </JFX-Dialog>
  </div>
</template>
<script>
import {
  saveAdvanceBillVerify,
  detailAdvanceItem,
  getVerifyItems
} from '@a/receiveMoneyManage'
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
        { label: '本次收款日期', slotTo: 'receiveDate', minWidth: '150', align: 'center', hide: true },
        { label: '本次收款金额', slotTo: 'price', minWidth: '150', align: 'center', hide: true },
        { label: '收款流水号', slotTo: 'verifyNo', minWidth: '150', align: 'center', hide: true },
        { label: '操作人', prop: 'verifier', width: '120', align: 'center', hide: true },
        { label: '操作时间', prop: 'createDate', width: '150', align: 'center', hide: true }
      ],
      // 附件列表
      attachmenList: [],
      // 附件上传url
      action: '',
      // 提交按钮loading
      confirmBtnLoading: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      try {
        const { id } = this
        const { data } = await detailAdvanceItem({ id })
        this.detail = data || {}
        const { data: list } = await getVerifyItems({ id })
        this.tableData.list = list || []
        this.tableData.list.push({ edit: true })
        this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + this.detail.code
        this.getListAttachment()
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    async getListAttachment() {
      const { data: { list } } = await listAttachment({ code: this.detail.code, begin: 0, pageSize: 10 })
      this.attachmenList = list
    },
    async comfirm() {
      const { id: advanceId } = this
      try {
        this.confirmBtnLoading = true
        const { price, verifyDate: verifyDateStr, verifyNo } = this.tableData.list.find(item => item.edit === true)
        await saveAdvanceBillVerify({
          // token: sessionStorage.getItem('token'),
          advanceId: advanceId ? advanceId + '' : '',
          price: price || '',
          verifyDateStr: verifyDateStr || '',
          verifyNo: verifyNo || ''
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
          this.$successMsg('操作成功')
          this.getListAttachment()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
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
