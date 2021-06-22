<template>
<!-- 预申报单列表页面 -->
  <div class="mr-t_10">
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="标准品牌："  prop="name" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="上级母品牌：" prop="superiorParentBrandId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.superiorParentBrandId" placeholder="请选择" filterable clearable :data-list="getBrandList('brandList')" >
                <el-option v-for="item in selectOpt.brandList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="授权方：" prop="authorizer" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.authorizer" placeholder="请选择" clearable >
                <el-option :label="'品牌方'" :value="'1'">品牌方</el-option>
                <el-option :label="'经销商'" :value="'2'">经销商</el-option>
                <el-option :label="'无授权'" :value="'3'">无授权</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="分类：" prop="type" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.type" placeholder="请选择" clearable>
                <el-option :label="'跨境电商'" :value="'1'">跨境电商</el-option>
                <el-option :label="'内贸'" :value="'2'">内贸</el-option>
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
        <el-button type="primary" :size="'small'" @click="openLay" v-permission="'brandParent_add'" >新增</el-button>
        <el-button type="primary" :size="'small'" @click="importFile" v-permission="'brandParent_import'">导入</el-button>
        <el-button type="primary" :size="'small'" @click="exportExcel" v-permission="'brandParent_export'">导出</el-button>
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
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column prop="name" label="标准品牌" align="center" min-width="180"></el-table-column>
      <el-table-column prop="englishName" label="英文名称" align="center" min-width="180"></el-table-column>
      <el-table-column prop="superiorParentBrand" label="上级母品牌" min-width="150" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="modifyDate" label="修改时间" align="center" min-width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="authorizerLabel" label="授权方" align="center" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column prop="typeLabel" label="分类" align="center" min-width="90" show-overflow-tooltip ></el-table-column>
      <el-table-column label="操作" align="left" fixed="right" width="90" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" @click="openLay(scope.row)" v-permission="'brandParent_modify'">编辑</el-button>
          <el-button type="text" @click="dele(scope.row)" v-permission="'brandParent_delete'">删除</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <edit v-if="visible.show" :visible="visible" :targetData="targetData" @close="getList(1)"></edit>
  </div>
</template>
<script>
import { brandParentList, brandParentDele, importBrandParentUrl, brandParentExportUrl } from '@a/brandManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    edit: () => import('./standardBrandEdit')
  },
  data() {
    return {
      ruleForm: {
        name: '',
        superiorParentBrandId: '',
        authorizer: '',
        type: ''
      },
      visible: { show: false },
      targetData: {}
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
				const res = await brandParentList(opt)
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
				await brandParentDele({ ids: row.id })
        this.$successMsg('删除成功')
        this.getList()
			})
    },
    resetForm() {
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    // 导出
    exportExcel() {
      if (this.tableData.total < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      var opt = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.ruleForm
      }
      if (this.tableChoseList.length > 0) {
        const ids = this.tableChoseList.map(item => item.id).toString()
        opt = { ids }
      }
      this.$exportFile(brandParentExportUrl, opt)
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 123 + '&url=' + importBrandParentUrl)
    },
    // 打开编辑
    openLay(row) {
      this.targetData = row && row.id ? row : {}
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
