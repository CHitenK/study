<template>
<!-- 预申报单列表页面 -->
  <div class="mr-t_10">
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="标准条码："  prop="commbarcode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.commbarcode" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="组码："  prop="groupCommbarcode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.groupCommbarcode" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20">
      <el-col :span="24" >
        <el-button type="primary" :size="'small'" @click="openLay" v-permission="'groupCommbarcode_add'" >新增</el-button>
      </el-col>
    </el-row>
    <div class="mr-t-20"></div>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table
      :tableData.sync="tableData"
      @change="getList"
    >
      <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
      <el-table-column prop="groupCommbarcode" label="组码" align="center" min-width="180"></el-table-column>
      <el-table-column prop="commbarcode" label="标准条码" align="center" min-width="180"></el-table-column>
      <el-table-column prop="groupName" label="组品名" min-width="150" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="left" fixed="right" width="90" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" @click="openLay(scope.row)" v-permission="'groupCommbarcode_edit'">编辑</el-button>
          <el-button type="text" @click="dele(scope.row)" v-permission="'groupCommbarcode_delete'">删除</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <edit v-if="visible.show" :visible="visible" :filterData="filterData" @close="getList(1)"></edit>
  </div>
</template>
<script>
import { listGroupCommbarcodes, groupCommbarcodeDele } from '@a/brandManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    edit: () => import('./ancestralCodeEdit')
  },
  data() {
    return {
      ruleForm: {
        commbarcode: '',
        groupCommbarcode: ''
      },
      visible: { show: false },
      filterData: {}
    }
	},
	mounted() {
		this.getList(1)
	},
  activated() {
    this.getList()
  },
  methods: {
		async getList(pageNum) {
      try {
        this.tableData.loading = true
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await listGroupCommbarcodes(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
		dele(row) {
			this.$confirm('确定删除选中对象？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
				await groupCommbarcodeDele({ id: row.id })
        this.$successMsg('删除成功')
        this.getList()
			})
    },
    resetForm() {
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    // 打开编辑
    openLay(row) {
      this.filterData = row && row.id ? row : {}
      this.visible.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
.mr-t_10{
  margin-top: -10px;
}
</style>
