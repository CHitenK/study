<template>
<div>
  <el-table
    :data="tableData"
    border
    v-loading="loading"
    style="width: 100%; margin-top: 90px;">
    <el-table-column
      label="序号"
      width="50"
    >
    <template slot-scope="scope">
      {{scope.$index + 1}}
    </template>
    </el-table-column>
    <el-table-column
      prop="userName"
      label="操作人"
      width="180">
    </el-table-column>
    <el-table-column   label="操作时间" width="180">
        <template slot-scope="scope">
          {{scope.row.createrTime ? parseTime(scope.row.createrTime) : '- -'}}
        </template>
    </el-table-column>
    <el-table-column
      prop="content"
      label="操作内容">
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
    <div class="page-content" style="text-align: right; margin-top: 20px;">
      <el-pagination
        background
        @size-change="sizeChangeHandler($event, getBatchBlockLog)"
        @current-change="currentChangeHandler($event, getBatchBlockLog)"
        :current-page.sync="page.pageNumber"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
 </div>
</template>
<script>
import { getBatchBlockLog } from '@/api/pageManage/index'
import { parseTime } from '@/utils/index'
import pager from '@/mixins/pagination'
export default {
  mixins: [pager],
  data() {
    return {
      tableData: [],
      loading: false
    }
  },
  mounted() {
    this.getBatchBlockLog()
  },
  methods: {
    parseTime,
    getBatchBlockLog() {
      this.loading = true
      const data = {
        specialId: this.$route.params.id.replace(/^(\s|\xA0)+|(\s|\xA0)+$/gi, ''),
        pageSize: this.page.pageSize,
        pageNo: this.page.pageNumber
      }
      getBatchBlockLog(data).then(res => {
        this.page.total = res.data.total || 0
        this.tableData = res.data.list || []
      }).catch(res => {
        this.tableData = []
        this.page.total = 0
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
