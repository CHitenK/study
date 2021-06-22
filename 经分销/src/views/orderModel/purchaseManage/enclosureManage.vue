<template>
 <div class="page-bx bgc-w import-file">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
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
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :limit="1000"
          ref="enclosure-upload"
          :auto-upload="false"
          :on-change="changeFiles"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-exceed="exceedTips"
          :on-success="successUpload"
          :file-list="fileList"
          >
          <el-button size="small" type="primary">选择文件</el-button>
        </el-upload>
      </el-col>
      <el-col :span="2"><el-button size="small" type="primary" @click="commit">全部上传</el-button></el-col>
    </el-row>
    <el-row class="list-bx mr-t-20 fs-16 clr-II">
       <el-col :span="18">
         <div class="list-item" v-for="(item, index) in showFileList" :key="index">
            <div class="list-item-I mr-t-15">
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
    <JFX-title title="附件列表" className="mr-t-30" />
    <el-row class="mr-t-20">
      <el-col :span="24" >
        <el-button type="primary" :size="'small'"   >批量下载</el-button>
        <el-button type="primary" :size="'small'"   >批量删除</el-button>
      </el-col>
    </el-row>
    <div class="mr-t-20"></div>
    <!-- 表格 -->
    <JFX-table
      :tableData.sync="tableData"
      @change="getList"
    >
      <el-table-column
      type="selection"
      width="50"
      label="序号"
      align="center">
      </el-table-column>
      <el-table-column
        prop="code"
        label="文件名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="poNo"
        label="文件类型"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="poNo"
        label="文件大小"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="poNo"
        label="上传时间"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="poNo"
        label="上传人员"
        align="center"
      >
      </el-table-column>
      <el-table-column
      align="center"
      fixed="right"
      width="180"
      label="操作">
        <template>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
</div>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      fileList: [],
      showFileList: [], // 显示的文件列表
      beforeUplaodFileList: [], // 上传前列表
      progressData: {}
    }
  },
  methods: {
    getList() {},
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
      // this.$nextTick(() => {
      //   this.setProgress(100)
      // })
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
