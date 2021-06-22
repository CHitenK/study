<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <div style="margin-left: 10px;">
      <span class="fs-14 clr-II">上传文件：</span>
      <JFX-upload @success="successUpload" :url="action" :limit="10000" :multiple="false" style="display: inline-block;">
        <el-button id="sale-upload-btn" type="primary">选择文件</el-button>
      </JFX-upload>
    </div>
  </div>
</template>
<script>
import {
  replaceInvoiceUrl
} from '@a/reportManage'
import { getBaseUrl } from '@u/tool'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    synchronousNcVisible: {
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
      action: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const { id } = this.$route.query
      this.action = getBaseUrl(replaceInvoiceUrl) + replaceInvoiceUrl + '?token=' + sessionStorage.getItem('token') + '&id=' + id
    },
    // 上传附件成功
    successUpload({ code, message }) {
      if (code + '' === '10000') {
        this.$successMsg('替换发票成功')
        this.closeTag()
      } else {
        this.$errorMsg(message)
      }
    }
  }
}
</script>
