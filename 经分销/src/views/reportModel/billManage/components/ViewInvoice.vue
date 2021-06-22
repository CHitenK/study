  <template>
  <!-- 选择发票模板组件 -->
  <JFX-Dialog
    title="查看发票文件"
    closeBtnText="取 消"
    :width="'1000px'"
    :top="'80px'"
    :showClose="true"
		:visible.sync="isVisible"
    :btnAlign="'center'"
    @comfirm="comfirm"
	>
    <div>
      <span>源发票文件：{{detail.invoiceNo}}</span>
      <el-button type="text"
                 style="padding-left: 4px;"
                 @click="viewInvoice">预览</el-button>
    </div>
    <div class="mr-t-10 mr-b-15">
      <el-button type="primary"
                 @click="multiDownload">批量下载</el-button>
    </div>
    <JFX-table :tableData.sync="tableData"
               :tableColumn="tableColumn"
               showSelection
               @selection-change="selectionChange"
               @change="init">
      <template slot="action" slot-scope="{row}">
        <el-button type="text" @click="previewTableItem(row.attachmentUrl)">预览</el-button>
      </template>
    </JFX-table>
	</JFX-Dialog>
</template>
<script>
import commomMix from '@m/index'
import { getBaseUrl } from '@u/tool'
import { listAttachment, downloadFileUrl } from '@a/base/index'
import {
  previewInvoice
} from '@a/reportManage'
export default {
  mixins: [commomMix],
  props: {
    isVisible: {
      type: Object,
      default: function() {
        return { show: false }
      }
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 表格列数据
      tableColumn: [
        { label: '文件名称', prop: 'attachmentName', minWidth: '150', align: 'center', hide: true },
        { label: '上传时间', prop: 'createDate', width: '150', align: 'center', hide: true },
        { label: '上传人员', prop: 'creatorName', width: '120', align: 'center', hide: true },
        { label: '操作', slotTo: 'action', width: '100', align: 'center' }
      ],
      // 详情数据
      detail: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init(pageNum) {
      if (JSON.stringify(this.detail) === '{}') {
        this.detail = this.data
      }
      const { invoiceNo: code = '' } = this.detail
      if (!code) {
        return false
      }
      try {
        this.tableData.loading = true
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        const { data } = await listAttachment({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          code
        })
        this.tableData.list = data.list
        this.tableData.total = data.total
      } catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.tableData.loading = false
      }
    },
    // 预览pdf
    viewInvoice() {
      const { invoiceNo: fileName = '' } = this.detail
      const url = getBaseUrl(previewInvoice) + previewInvoice + fileName + '?token=' + sessionStorage.getItem('token')
      window.open(url)
    },
    // 批量下载
    multiDownload() {
      if (!this.tableChoseList.length) {
        this.$alertWarning('至少选择一条记录！')
        return false
      }
      this.tableChoseList.forEach(({ attachmentUrl, attachmentName }) => {
        this.$exportFile(downloadFileUrl, { url: encodeURI(attachmentUrl), fileName: encodeURI(attachmentName) })
      })
    },
    // 预览表格附件
    previewTableItem(url) {
      window.open(url)
    },
    comfirm() {
      this.$emit('comfirm')
    }
  }
}
</script>
