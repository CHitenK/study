<template>
  <div>
    <el-row class="mr-b-10" v-if="showAction">
      <el-button id="sale-download-btn" type="primary" @click="exportCustomsDeclare">批量下载</el-button>
      <el-button id="sale-delete-btn" type="primary" @click="delAttachment">批量删除</el-button>
    </el-row>
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getEnclosureList" :showPagination="tableData.total > tableData.pageSize">
      <el-table-column type="selection" label="序号" align="center" width="50"></el-table-column>
      <el-table-column prop="attachmentName" label="文件名称" align="center" min-width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="attachmentType" label="文件类型" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="文件大小" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.attachmentSize | fitterSize}}
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="上传时间" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="creatorName" label="上传人员" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="left" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="dele(scope.row.attachmentCode)">删除</el-button>
          <el-button type="text" @click="downFile(scope.row)">下载</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <div class="hide-bx" v-for="item in downList" :key="item">
       <iframe :src="item"></iframe>
    </div>
  </div>
</template>
<script>
import commomMix from '@m/index'
import { listAttachment, downloadFileUrl, delAttachment } from '@a/base/index'
import { getBaseUrl } from '@u/tool'
export default {
  mixins: [commomMix],
  props: {
    code: {
      type: String,
      default: ''
    },
    showAction: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      downList: []
    }
  },
  filters: {
    fitterSize(val) {
      if (!val) return ''
      const size = val / 1024
      return size ? size.toFixed(1) : ''
    }
  },
  watch: {
    code(val) {
      this.getEnclosureList(1)
    }
  },
  mounted() {
    this.getEnclosureList(1)
  },
  methods: {
    // 获取附件列表
    async getEnclosureList(pageNum) {
      if (!this.code) return false
      try {
        this.tableData.loading = true
        this.tableData.pageNum = pageNum || this.tableData.pageNum
          const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          code: this.code
        }
        const res = await listAttachment(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
      } catch (err) {
        console.log(err)
      }
      this.tableData.loading = false
    },
    // 下载
    downFile(row) {
      this.$exportFile(downloadFileUrl, { url: encodeURI(row.attachmentUrl), fileName: encodeURI(row.attachmentName) })
    },
    // 批量下载
    exportCustomsDeclare() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条数据！')
        return false
      }
      this.downList = []
      const downList = []
      this.tableChoseList.map(item => {
        const src = getBaseUrl(downloadFileUrl) + downloadFileUrl + '?token=' + sessionStorage.getItem('token') + '&url=' + encodeURI(item.attachmentUrl) + '&fileName=' + encodeURI(item.attachmentName)
        downList.push(src)
      })
      this.downList = downList
    },
    // 批量删除
    delAttachment() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条数据！')
        return false
      }
      const attachmentCodes = this.tableChoseList.map(item => item.attachmentCode).toString()
      this.dele(attachmentCodes)
    },
    // 删除
    dele(attachmentCodes) {
       this.$confirm('确认删除数据?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
        await delAttachment({ attachmentCodes })
				this.$successMsg('操作成功')
        this.getEnclosureList()
			})
    }
  }
}
</script>
<style lang="scss" scoped>
.hide-bx {
  width: 100%;
  height: 2px;
  opacity: 0;
  overflow: hidden;
}
</style>
