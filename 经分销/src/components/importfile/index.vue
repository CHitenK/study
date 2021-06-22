<template>
 <div class="import-file">
    <!-- title -->
    <JFX-title title="上传文件" className="mr-t-10 title-bx" >
      <span class="clr-act c-p fs-14 down" @click="downTemplate" v-if="templateId" >{{downText}}</span>
      <!--用于临时 增加参数 -->
      <input type="hidden" id="otheropt" name="linshi" placeholder="输入1走临时导入方案" />
      <!-- 增加参数 end -->
    </JFX-title>
    <!-- title end -->
    <el-row>
      <el-col :span="20" v-loading="loading">
        <el-upload
          drag
          :action="url"
          multiple
          :limit="100"
          :accept="accept"
          :before-upload="beforeUpload"
          :http-request="importFile"
          :show-file-list="false"
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip clr-warn fs-16" slot="tip">
            填写Excle模板小贴士: 1.按照格式进行填写数据;
          </div>
          <div class="el-upload__tip clr-r fs-16" slot="tip">
            {{tips}}
          </div>
        </el-upload>
      </el-col>
    </el-row>
    <JFX-title title="导入详情" className="mr-t-30" />
    <el-row  :gutter="10" class="fs-14 clr-II">
      <el-col class="mr-b-15" :span="24" >
        成功数据： {{success}}条
      </el-col>
      <el-col class="mr-b-15" :span="24" >
        错误数据： {{failure}}条
      </el-col>
      <el-col class="mr-b-15" :span="24" >
        跳过数据： 0条
      </el-col>
    </el-row>
    <div class="mr-t-20"></div>
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" :showPagination="false">
      <el-table-column type="index" label="序号" align="center" width="150"></el-table-column>
      <el-table-column prop="rows" label="错误行" align="center" width="220" v-if="hasRows"></el-table-column>
      <el-table-column prop="row" label="错误行" align="center" width="220" v-else></el-table-column>
      <el-table-column prop="message" label="错误信息" align="center">
        <template slot-scope="scope">
          {{scope.row.message || scope.row.msg }}
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
</div>
</template>
<script>
import commomMix from '@m/index'
import { getBaseUrl } from '@u/tool'
import { commonImport, downTemplateUrl } from '@a/base/index'
export default {
  mixins: [commomMix],
  props: {
    // url 上传地址 如'/app/upload'  必填
    url: {
      type: String,
      default: ''
    },
    // templateId 下载模板的id
    templateId: {
      type: String,
      default: ''
    },
    // 其他上传参数
    filterData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    selfDown: {
      type: Boolean,
      default: false
    },
    downText: {
      type: String,
      default: '下载模板'
    },
    accept: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      breadcrumb: [{
        path: '', meta: { title: '公告组件' }
      },
      {
        path: '', meta: { title: '上传文件' }
      }],
      tips: '',
      loading: false,
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 100000,
        total: 100001
      },
      failure: 0,
      success: 0
    }
  },
  mounted() {
  },
  computed: {
    hasRows() {
      return this.tableData.list.some(item => ('rows' in item))
    }
  },
  methods: {
    beforeUpload() {
      this.tips = ''
      if (!this.url) {
        this.$errorMsg('上传地址出错了！')
        return false
      }
    },
    importFile(data) {
      this.loading = true
      const form = new FormData()
      // 文件对象
      form.append('file', data.file)
      for (let key in this.filterData) {
        form.append(key, this.filterData[key])
      }
      // 页面灵活添加参数 过度方案
      const dom = document.getElementById('otheropt')
      if (dom.value) {
        const name = dom.getAttribute('name')
        form.append(name, dom.value)
      }
      commonImport(this.url, form).then(res => {
        const { data, code = 0 } = res
        if (code + '' === '10000') {
          this.$successMsg('上传成功！')
          this.$emit('successUpload', res)
        }
        if (data && data.errorList && data.errorList.length > 0) {
          this.tableData.list = data.errorList
        } else {
          this.tableData.list = []
        }
        this.success = data.success || 0
        this.failure = data.failure || 0
        if (this.failure > 0) {
          if (data.errorList === undefined && Array.isArray(data.message)) {
            this.tableData.list = data.message || []
          }
          setTimeout(() => {
            this.$errorMsg('导入数据有错误')
          }, 3000)
        }
      }).catch(err => {
        this.tips = err.message
      }).finally(() => {
        this.loading = false
      })
    },
    // 下载模板
    downTemplate() {
      if (this.selfDown) {
        this.$emit('downup')
       return false
      }
      // 其他情况，需要传入templateId
      const url = getBaseUrl(downTemplateUrl) + downTemplateUrl + `?token=${sessionStorage.getItem('token')}&ids=${this.templateId}`
      window.open(url, '_blank')
    }
  }
}
</script>
<style>
  .import-file{
    width: 100%;
  }
  .import-file .el-upload {
    width: 100%;
    max-width: 600px;
  }
  .import-file .el-upload-dragger{
    width: 100% !important;
    height: 220px;
  }
</style>
<style lang="scss"  scoped>
.title-bx{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.down{
  margin-left: 62%;
}
</style>
