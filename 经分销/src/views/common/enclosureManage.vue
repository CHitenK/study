<template>
 <div class="page-bx bgc-w import-conm-file">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" :showGoback="true" />
    <!-- 面包屑 end -->
     <!-- title -->
     <JFX-title title="附件上传" className="mr-t-10 title-bx" ></JFX-title>
     <!-- title end -->
    <el-row>
      <el-col :span="2">
        <div style="text-align: center;">
          <span class="fs-14  clr-II">附件上传：</span>
        </div>
      </el-col>
      <el-col :span="2">
        <el-upload
          :action="action"
          multiple
          :limit="10000"
          ref="enclosure-upload"
          :auto-upload="false"
          :on-change="changeFiles"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-exceed="exceedTips"
          :on-success="successUpload"
          :file-list="fileList"
          >
          <el-button size="small" type="primary" id="chose_file">选择文件</el-button>
        </el-upload>
      </el-col>
      <el-col :span="2"><el-button size="small" type="primary" @click="commit" id="all_upload">全部上传</el-button></el-col>
    </el-row>
    <el-row class="list-bx mr-t-20 fs-16 clr-II">
       <el-col :span="18">
         <div class="list-item" v-for="(item, index) in showFileList" :key="index" v-show="item.status !== 'success'">
            <div class="list-item-I mr-t-15" >
              <span>附件{{index + 1}}：{{item.name}}</span>
              <span class="mr-r">
                <span class="clr-r fs-12" v-if="item.status === 'fail'">
                  上传失败&nbsp;&nbsp;
                </span>
                <el-button type="text" @click="scancle(index)">取 消</el-button>
              </span>
            </div>
            <el-progress :stroke-width="8" :percentage="progressData[item.uid + ''] || 0"></el-progress>
         </div>
       </el-col>
    </el-row>
    <div class="mr-t-30"></div>
    <JFX-title title="附件列表" className="mr-t-20" />
    <enclosure-list :code="code" v-if="code" ref="enclosure">
      <span>52</span>
    </enclosure-list>
</div>
</template>
<script>
import commomMix from '@m/index'
import { attachmentUploadFiles } from '@a/base/index'
import { getBaseUrl } from '@u/tool'
export default {
  mixins: [commomMix],
  components: {
    enclosureList: () => import('@c/enclosureList/index')
  },
  data() {
    return {
      fileList: [],
      showFileList: [], // 显示的文件列表
      beforeUplaodFileList: [], // 上传前列表
      progressData: {},
      breadcrumb: [{
        path: '', meta: { title: '公共组件' }
      },
      {
        path: '', meta: { title: '附件管理' }
      }],
      code: '',
      downList: [],
      action: ''
    }
  },
  mounted() {
    const { query } = this.$route
    if (!query.code) return false
    this.code = query.code
    this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + this.code
  },
  methods: {
    changeFiles(file, fileList) {
      if (file.status === 'ready') {
        this.showFileList.push(file)
      } else if (file.status === 'success') {
        const progressData = JSON.parse(JSON.stringify(this.progressData))
        progressData[file.uid + ''] = 100
        this.progressData = progressData
      }
    },
    commit() {
      this.fileList = []
      this.showFileList.forEach(item => {
        if (item.status === 'ready') {
          this.fileList.push(item)
        }
      })
      this.$refs['enclosure-upload'].submit()
    },
    beforeUpload() {
      this.setProgress()
    },
    // 设置进度条
    setProgress(val) {
      const progressData = JSON.parse(JSON.stringify(this.progressData))
      this.fileList.forEach(item => {
        const num = '9' + (Math.floor(Math.random() * 10))
        const progress = parseInt(num)
        progressData[item.uid + ''] = progress
      })
      this.progressData = progressData
    },
    exceedTips() {
      this.$errorMsg('单次上传不能超过10个文件')
    },
    successUpload(res) {
      if (res.code + '' === '10000') {
        this.$refs['enclosure'].getEnclosureList(1)
      }
      if (res.code + '' === '99999') {
        this.$errorMsg(res.data)
      }
    },
    scancle(index) {
      const list = JSON.parse(JSON.stringify(this.showFileList))
      list.splice(index, 1)
      this.showFileList = list
    }
  }
}
</script>
<style lang="scss"  scoped>
.title-bx{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.down{
  margin-right: 5%;
}
.list-bx{
  width: 100%;
  border: solid 1px #eaeaea;
  height: 240px;
  overflow: auto;
  box-sizing: border-box;
  padding: 15px;
}
.list-item{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60px;
}
.list-item-I{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.mr-r{
  margin-right: 56px;
}

</style>
