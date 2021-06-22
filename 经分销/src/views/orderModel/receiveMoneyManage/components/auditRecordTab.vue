<template>
  <section>
    <JFX-title title="附件列表" className="mr-t-20" />
    <div class="mr-t-15 fs-14 clr-II">
      <JFX-upload @success="successUpload" :url="action" :limit="10000" :multiple="false">
       <el-button id="sale-upload-btn" type="primary">上传附件</el-button>
      </JFX-upload>
    </div>
    <div class="mr-t-15"></div>
    <enclosure-list :code="code" v-if="code" ref="enclosure" :showAction="false"></enclosure-list>
    <JFX-title title="审核记录" className="mr-t-20" />
    <JFX-table
      :tableData.sync="tableData"
      :showPagination="false"
    >
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
      <el-table-column prop="auditTypeLabel" label="审批类型" align="center" min-width="100" ></el-table-column>
      <el-table-column prop="submitter" label="提交人" align="center" min-width="100" ></el-table-column>
      <el-table-column prop="createDate" label="时间" align="center" min-width="140" ></el-table-column>
      <el-table-column prop="submitRemark" label="提交备注" align="center" min-width="120" ></el-table-column>
      <el-table-column prop="auditor" label="审批人" align="center" min-width="100" ></el-table-column>
      <el-table-column prop="auditDate" label="审批时间" align="center" min-width="140" ></el-table-column>
      <el-table-column prop="auditResultLabel" label="审批结果" align="center" min-width="100" ></el-table-column>
      <el-table-column prop="auditRemark" label="审批备注" align="center" min-width="120" ></el-table-column>
    </JFX-table>
  </section>
</template>
<script>
import commomMix from '@m/index'
import { getBaseUrl } from '@u/tool'
import { attachmentUploadFiles } from '@a/base/index'
export default {
  mixins: [commomMix],
  components: {
    enclosureList: () => import('@c/enclosureList/index')
  },
  props: {
    detail: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      action: '',
      code: ''
    }
  },
  mounted() {
    const { tocSettlementReceiveBillDTO = {}, receiveBillAuditItemModels } = this.detail
    this.code = tocSettlementReceiveBillDTO.code
    this.tableData.pageSize = 10000
    this.tableData.total = 10001
    this.tableData.list = receiveBillAuditItemModels || []
    this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + this.code
  },
  methods: {
    // 上传成功
    successUpload(res) {
      if (res.code + '' === '10000') {
        this.$refs['enclosure'].getEnclosureList(1)
      } else {
        this.$errorMsg(res.data)
      }
    }
  }
}
</script>
