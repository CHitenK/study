<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)" :showOpenBtn="false">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="公告类型：" prop="type" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.type" placeholder="请选择" clearable :data-list="getSelectList('notice_statuslist')" >
                <el-option v-for="item in selectOpt.notice_statuslist"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date1" label="发布时间：">
              <el-date-picker
                clearable
                v-model="date"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.status" placeholder="请选择" clearable :data-list="getSelectList('notice_typelist')" >
                <el-option v-for="item in selectOpt.notice_typelist"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20">
      <el-col :span="24" >
        <el-button type="primary" :size="'small'" @click="visible.show = true"   >新建公告</el-button>
      </el-col>
    </el-row>
    <div class="mr-t-20"></div>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table
      :tableData.sync="tableData"
      @selection-change="selectionChange"
      @change="getList"
    >
      <el-table-column
      type="index"
      width="50"
      label="序号"
      align="center">
      </el-table-column>
      <el-table-column
        prop="statusLabel"
        label="公告类型"
        align="center"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="statusLabel"
        label="状态"
        align="center"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="创建日期"
        align="center"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="publishDate"
        label="发布日期"
        align="center"
        width="180"
      >
      </el-table-column>
      <el-table-column
      align="center"
      fixed="right"
      width="220"
      label="操作">
        <template slot-scope="scope">
          <el-button type="text" v-if="scope.row.status === '001'" @click="dele(scope.row)">编辑</el-button>
          <el-button type="text" v-if="scope.row.status === '001'" @click="linkTo">发布</el-button>
          <el-button type="text" v-if="scope.row.status === '001'">删除</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 编辑公告 -->
    <edit v-if="visible.show" :visible="visible"></edit>
  </div>
</template>
<script>
import { getList } from '@a/base/index'
import commomMix from '@m/index'
import edit from './components/edit'
export default {
  mixins: [commomMix],
  components: {
    edit
  },
  data() {
    return {
      ruleForm: {
        status: '',
        code: '',
        type: '',
        publishStartDateStr: '',
        publishEndDateStr: ''
      },
      date: ''
    }
	},
	mounted() {
    this.getList()
	},
  methods: {
		async getList(pageNum) {
      try {
        this.tableData.loading = true
        if (this.date && this.date.length > 0) {
          this.ruleForm.publishStartDateStr = this.date[0]
          this.ruleForm.publishEndDateStr = this.date[1]
        }
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				// 同步方法
				const res = await getList(opt)
				this.tableData = {
					list: res.data.list,
					loading: false,
					pageNum: pageNum || res.data.pageNo,
					total: res.data.total,
					pageSize: res.data.pageSize
				}
			} catch (err) {
        this.tableData.loading = false
			}
		},
    resetForm() {
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
