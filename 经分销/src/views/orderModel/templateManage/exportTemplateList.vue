<template>
<!-- 预申报单列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10" class="search-bbx">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="模版类型：" prop="type" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.type" placeholder="请选择" clearable :data-list="getSelectList('temp_typelist')" >
                <el-option v-for="item in selectOpt.temp_typelist"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客户：" prop="customerIds" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.customerIds" placeholder="请选择" multiple filterable clearable :data-list="getSelectBeanByDto('kehuList', null, { 'key': 'id', 'value': 'name', 'code': '' })"  style="overflow: hidden;vertical-align: middle">
                <el-option v-for="item in selectOpt.kehuList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.status" placeholder="请选择" clearable :data-list="getSelectList('temp_statusList')" >
                <el-option v-for="item in selectOpt.temp_statusList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
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
        <el-button type="primary" :size="'small'" @click="linkTo('/template/exportTemplateEdit/add', '新建模版')" >新建模版</el-button>
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
      <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
      <el-table-column prop="typeLabel" label="模版类型" align="center" width="90"></el-table-column>
      <el-table-column prop="code" label="模版编码" align="center" min-width="130" show-overflow-tooltip></el-table-column>
      <el-table-column prop="title" label="模版名称" align="center" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="merchantName" label="公司" align="center" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="customers" label="适用客户" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center"  width="140" ></el-table-column>
      <el-table-column prop="statusLabel" label="状态" align="center"  width="70" ></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="160">
        <template slot-scope="scope">
          <el-button type="text" v-if="scope.row.status !== '0'" @click="linkTo('/template/exportTemplateEdit/edit?id=' + scope.row.id, '编辑模版' )">编辑</el-button>
          <el-button type="text" @click="linkTo('/template/preview?id=' + scope.row.id )">预览</el-button>
          <el-button type="text" @click="openLay(scope.row)">适用客户</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 适用商户 -->
    <apply-user-list v-if="visible.show" :visible="visible" :filterData="filterData" @update="getList"></apply-user-list>
    <!-- 适用商户 end -->
  </div>
</template>
<script>
import { listFiletemp } from '@a/templateManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    applyUserList: () => import('./components/applyUserList')
  },
  data() {
    return {
      ruleForm: {
        type: '',
        customerIds: '',
        status: ''
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
        let customerIds = ''
        if (this.ruleForm.customerIds && this.ruleForm.customerIds.length > 0) {
          customerIds = this.ruleForm.customerIds.map(item => item).toString()
        }
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm,
          customerIds
        }
				const res = await listFiletemp(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
		dele() {
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$successMsg('删除成功', () => {})
			}).catch(() => {
				this.$errorMsg('删除失败', () => {})
			})
    },
    resetForm() {
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    openLay(row) {
      this.filterData = { fileId: row.id }
      this.visible.show = true
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.search-bbx{
  .el-select__tags{
    height: 25px;
    flex-wrap: inherit;
    overflow: hidden;
  }
}
</style>
