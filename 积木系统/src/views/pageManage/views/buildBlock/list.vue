<template>
  <div class="page-box">
    <!-- 查询条件 -->
    <el-row class="content">
      <el-form ref="form" :model="form"  inline status-icon @keyup.native.enter="getTableList">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-form-item  class="inputbox">
              <label for>标题名称:</label>
              <el-input v-model="form.title" clearable placeholder="请输入专题名称" style="width: 360px;" ></el-input>
            </el-form-item>
            <el-form-item prop="nickName"  class="inputbox">
              <label for>专题ID:</label>
              <el-input v-model="form.specialId" clearable placeholder="请输入专题ID"></el-input>
            </el-form-item>
            <el-form-item prop="status"  class="inputbox">
              <label for>状态</label>
              <el-select v-model="form.status" clearable placeholder="请选择" style="width: 120px;">
                <el-option
                  v-for="item in qualificationsOptions"
                  :value="item.value"
                  :label="item.label"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="babytype"  class="inputbox">
              <label for>是否永久生效</label>
              <el-select v-model="form.isForever" clearable placeholder="请选择"  style="width: 120px;" >
                <el-option
                  v-for="item in isForeverOptions"
                  :value="item.value"
                  :label="item.label"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item  class="inputbox">
              <label for>创建人:</label>
              <el-input v-model="form.createName" clearable placeholder="请输入创建人"></el-input>
            </el-form-item>
            <el-form-item  class="inputbox">
              <label for>上线时间:</label>
              <el-date-picker
                v-model="form.startTime"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="timestamp"
                clearable>
              </el-date-picker>
            </el-form-item>
            <el-form-item  class="inputbox">
              <label for>创建时间:</label>
              <el-date-picker
                v-model="form.createTime"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="timestamp"
                clearable>
              </el-date-picker>
            </el-form-item>
            <el-form-item  class="inputbox">
              <el-button type="primary" @click="page.pageNumber = 1, getTableList()">搜索</el-button>
              <el-button type="success" plain @click="reset">重置</el-button>
              <el-button type="primary" @click="add">新增专题</el-button>
            </el-form-item>
          </div>
        </el-col>
      </el-form>
    </el-row>
    <!-- 查询条件 end -->
    <!-- table 表格 -->
    <el-table
      :data="tableList"
      :header-cell-style="{background:'#EBEEF5',color:'#606266'}"
      style="width: 100%; margin:30px 0;"
      v-loading="loading"
      border
    >
      <el-table-column align="center"  width="50" label="序号">
        <template slot-scope="{$index}">
          {{$index + 1}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="specialId" label="专题Id"  ></el-table-column>
      <el-table-column align="center"  label="标题名称">
        <template slot-scope="scope">
           <span :title="scope.row.title" class="ellipsis">
             {{scope.row.title}}
           </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="目标人群">
        <template slot-scope="scope">
          {{scope.row.targetPeople ? showTargetPeople(scope.row.targetPeople) : ''}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上线时间">
        <template slot-scope="scope">
          {{scope.row.startTime ? parseTime(scope.row.startTime): '- -'}}
        </template>
      </el-table-column>
      <el-table-column align="center"  label="下线时间">
        <template slot-scope="scope">
          {{scope.row.endTime ? parseTime(scope.row.endTime): '- -'}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          {{showStatus(scope.row.status)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否永久生效">
        <template slot-scope="scope">
          {{scope.row.isForever === true ? '是' : '否'}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createName" label="创建人"></el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          {{scope.row.createTime ? parseTime(scope.row.createTime): '- -'}}
        </template>
      </el-table-column>
      <el-table-column align="center"  label="更新时间">
        <template slot-scope="scope">
          {{scope.row.updateTime ? parseTime(scope.row.updateTime) : '- -'}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handlePreView(scope.row)" >预览</el-button>
          <el-button type="text" size="small" @click="edit(scope.row)" v-if="['-2', '0', '1'].includes(scope.row.status + '')">编辑</el-button>
          <el-button type="text" size="small" @click="copy(scope.row)">复制</el-button>
          <el-button type="text" size="small" @click="askUse(scope.row)" v-if="['-2', '0', '1'].includes(scope.row.status + '')">停用</el-button>
          <el-button type="text" size="small" @click="checkLog(scope.row)">查看日志</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table 表格 end -->
    <!-- 分页 -->
    <!--
      组建使用说明
      引入全局混入 src/mixins/pagination
      sizeChangeHandler 修改分页显示行数  $event 分页行数  callback 回调函数
      currentChangeHandler 修改分页页码  $event 页码 callback 回调函数
     -->
    <div class="page-content">
      <el-pagination
        background
        @size-change="sizeChangeHandler($event, getTableList)"
        @current-change="currentChangeHandler($event, getTableList)"
        :current-page.sync="page.pageNumber"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
    <!-- 分页 end-->
    <!-- 预览 -->
    <el-dialog
      title="预览"
      :visible.sync="dialogVisible"
      width="560px"
      top="60px"
    >
      <pre-view :targetData="preTargetData" />
    </el-dialog>
    <!-- 预览 end-->
  </div>
</template>

<script>
import pager from '@/mixins/pagination'
import preView from './preview/index.vue'
import { parseTime } from '@/utils/index'
import { getBatchBlock, updateBlock } from '@/api/pageManage/index'
import { transformTime } from './../../utils/tool'
export default {
  components: {
    preView
  },
  mixins: [pager],
  data() {
    return {
      tableList: [],
      loading: false,
      form: {
        title: '',
        specialId: '',
        status: '',
        createName: '',
        isForever: '',
        createTime: '',
        startTime: ''
      },
      preTargetData: {},
      qualificationsOptions: [
        { label: '全部', value: '' },
        { label: '草稿', value: '-2' },
        { label: '已下线', value: '-1' },
        { label: '待上线', value: '0' },
        { label: '上线中', value: '1' }
      ],
      isForeverOptions: [
        { label: '全部', value: '' },
        { label: '是', value: true },
        { label: '否', value: false }
      ],
      dialogVisible: false
    }
  },
  created() {
    this.getTableList()
    // const clientWidth = document.body.clientWidth
    // if (clientWidth < 19200) {
    //   this.$message({
    //     message: '温馨提示：您的电脑可视宽度未达到系统要求宽度（1920），为了方便您的操作请更换电脑',
    //     type: 'warning',
    //     duration: 0,
    //     showClose: true
    //   })
    // }
  },
  methods: {
    parseTime,
    // 获取表格数据
    getTableList() {
      const data = {
        ...this.form,
        pageSize: this.page.pageSize,
        pageNo: this.page.pageNumber
      }
      this.loading = true
      /**
       * @description 分页查询专题信息
       * @param {String} title 标题名称
       * @param {String} id 专题id
       * @param {String} status 状态（-1，已下线，0待上线，1上线中）
       * @param {String} createName 创建人
       * @param {Boolean} isForever 是否永久生效
       * @param {Long} createTime 创建时间开始
       * @param {Long} startTime 上线时间开始
       * @param {Long} pfChannelId 渠道号
      */
      getBatchBlock(data).then(res => {
        this.page.total = res.data.total || 0
        this.tableList = res.data.list || []
      }).catch(res => {
        this.page.total = 0
        this.tableList = []
      }).finally(() => {
        this.loading = false
      })
    },
    // 重置
    reset() {
      Object.keys(this.form).forEach((key, index) => {
        this.form[key] = ''
      })
      this.page.pageSize = 10
      this.page.pageNumber = 1
      this.getTableList()
    },
    // 过滤时间字符串的 T
    handleTime(timeStr) {
      if (!timeStr || typeof (timeStr) !== 'string') return timeStr
      return timeStr.replace(/T/gi, ' ')
    },
    // 查看
    checkLog(data) {
      this.$router.push({
        path: '/pageManage/buildBlockLogs/' + data.specialId
      })
    },
    // 显示目标人群
    showTargetPeople(data) {
      const array = []
      const people = ['全部用户', '新用户', '老用户', '店主']
      data.forEach(item => {
        array.push(people[item])
      })
      return array.length > 0 ? array.join(',') : ''
    },
    // 显示状态
    showStatus(status) {
      switch (status + '') {
        case '-2': return '草稿'
        case '-1': return '已下线'
        case '0': return '待上线'
        case '1': return '上线中'
        default: return '草稿'
      }
    },
    // 点击预览
    handlePreView(data) {
      if (!data.id) return false
      this.dialogVisible = true
      this.preTargetData = data
    },
    // 复制功能, 即新增功能
    copy(data) {
      if (!data.id) return false
      this.loading = true
      const tData = JSON.parse(JSON.stringify(data))
      const jmData = tData.pages.content
      this.$store.dispatch('addBuildBlock/INIT_JM_DATA', jmData)
      delete tData.id // 删除Id
      delete tData.pages // 删除pages
      const createName = sessionStorage.getItem('userName') || '' // 创建人
      const endTime = tData.isForever ? '' : tData.endTime
      this.$store.dispatch('addBuildBlock/SET_ACTIVECOMPONET', { name: '', uuid: '' })
      this.$store.dispatch('addBuildBlock/SET_TITLE_DATA', { ...tData, status: '-2', uuid: Date.now(), createName, isCopy: true, createTime: Date.now(), endTime, specialId: 'ZT' + transformTime() + 'PF' + sessionStorage.getItem('CHANNEL_ID') || 36 }).then(res => {
        this.$store.dispatch('addBuildBlock/SET_ACTIVECOMPONET', { name: 'title', uuid: '' })
      })
      this.$router.push({ path: '/pageManage/buildBlockAdd' })
    },
    // 点击停用
    askUse(data) {
      this.$confirm('此操作将永久停用此专题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.stopUse(data)
      }).catch(() => {
      })
    },
    // 执行停用
    stopUse(data) {
      if (!data.id) return false
      this.loading = true
      const tData = JSON.parse(JSON.stringify(data))
      // 永久有效时 下线时间为停用时间
      if (tData.isForever) {
        tData.endTime = Date.now()
      }
      // 修改状态
      const commitData = { ...tData, status: -1 }
      updateBlock(commitData).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.loading = false
        this.getTableList()
      }).catch(res => {
        this.loading = false
        this.$message({
          message: res.msg,
          type: 'error'
        })
      })
    },
    // 编辑
    edit(data) {
      // /pageManage/buildBlockEdit
      if (!data.specialId) return false
      this.$router.push({
        path: '/pageManage/buildBlockEdit?specialId=' + data.specialId
      })
    },
    // 点击新增
    add() {
      this.$store.dispatch('addBuildBlock/SET_ACTIVECOMPONET', { name: '', uuid: '' })
      this.$store.dispatch('addBuildBlock/INIT_JM_DATA', [])
      this.$store.dispatch('addBuildBlock/SET_TITLE_DATA', { status: '-2' }).then(res => {
        this.$store.dispatch('addBuildBlock/SET_ACTIVECOMPONET', { name: 'title', uuid: '' })
        this.$router.push({ path: '/pageManage/buildBlockAdd' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-box{
  box-sizing: border-box;
  padding: 0px 15px;
}
.content {
  background: #f5f5f5;
  padding: 15px 20px 0;
  margin-top: 15px;
}
.el-input,
.el-input__inner {
  width: auto;
}
.grid-content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
label {
  margin-right: 8px;
}
.inputbox {
  padding-right: 20px;
}
.page-content{
  width: 100%;
  min-height: 60px;
  display: flex;
  justify-content: flex-end;
}
.ellipsis{
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
</style>
