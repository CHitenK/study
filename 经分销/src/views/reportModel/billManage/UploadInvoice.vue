<template>
  <!-- 平台结算单详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <el-row :gutter="10" class="fs-12 clr-II detail-row">
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        发票号码：{{detail.invoiceNo || '- -'}}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        客户：{{detail.customerName || '- -'}}
      </el-col>
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        开票日期：{{detail.invoiceDate || '- -'}}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <el-row class="mr-t-15 mr-b-15" type="flex">
      <JFX-upload @success="successUpload" :url="action" :limit="10000" :multiple="false" accept=".jpg,.jpeg,.png,.pdf,.JPG,.JPEG,.GIF,.PDF">
        <el-button id="sale-upload-btn" type="primary">上传盖章发票</el-button>
      </JFX-upload>
      <span style="color: red;margin-left: 10px;padding-top: 2px;">
        仅支持上传PDF、PNG、JPG格式类型文件
      </span>
    </el-row>
    <EnclosureList :showAction="false" :code="detail.invoiceNo" ref="enclosure" class="mr-t-15" />
    <div class="flex-c-c">
      <el-button type="primary" @click="completeSignature">完成发票签章</el-button>
    </div>
    <!-- 同步nc -->
    <SynchronousNC v-if="synNc.visible.show"
                   :id="synNc.id"
                   :synchronousNcVisible="synNc.visible"
                   @comfirm="closeModal"
    ></SynchronousNC>
    <!-- 同步nc end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import { attachmentUploadFiles } from '@a/base'
import { getBaseUrl } from '@u/tool'
import {
  getInvoiceDetail,
  modifyInvoice,
  validateSynNC
} from '@a/reportManage'
export default {
  mixins: [commomMix],
  components: {
    // 附件列表
    EnclosureList: () => import('@c/enclosureList/index'),
    // 同步nc
    SynchronousNC: () => import('./components/SynchronousNC')
  },
  data() {
    return {
      // 详情数据
      detail: {},
      // 上传附件的url
      action: '',
      synNc: {
        id: '',
        visible: { show: false }
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id } = this.$route.query
      try {
        const { data } = await getInvoiceDetail({ id })
        this.detail = data || {}
        // 上传附件地址rul
        this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + this.detail.invoiceNo
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 上传附件成功
    successUpload(res) {
      if (res.code + '' === '10000') {
        this.$refs['enclosure'].getEnclosureList(1)
      } else {
        this.$errorMsg(res.message)
      }
    },
    // 完成发票签章
    completeSignature() {
      const { id } = this.$route.query
      this.$showToast('确认完成发票签章？', async() => {
        try {
          await modifyInvoice({ id })
          const { data: { code } } = await validateSynNC({ id })
          if (code === '00') {
            this.$showToast({
              type: 'success',
              content: '发票签章完成',
              confirmButtonText: '同步NC'
            }, () => {
              this.synNc.visible.show = true
              this.synNc.id = id
            }, () => {
              this.closeTag()
            })
          } else {
            this.$showToast('发票签章完成', () => {
              this.closeTag()
            }, () => {
              this.closeTag()
            })
          }
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    closeModal() {
      this.synNc.visible.show = false
      this.synNc.id = ''
      this.closeTag()
    }
  }
}
</script>
