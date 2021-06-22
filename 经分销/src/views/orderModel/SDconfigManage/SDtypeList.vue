<template>
<!-- 预申报单列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)" :showOpenBtn="false">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="SD名称：" prop="sdTypeName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="ruleForm.sdTypeName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="简称：" prop="sdSimpleName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="ruleForm.sdSimpleName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="配置类型：" prop="type" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.type" placeholder="请选择" clearable :data-list="getSelectList('sdtypeconfig_typeList')" >
                <el-option v-for="item in selectOpt.sdtypeconfig_typeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
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
        <el-button type="primary" :size="'small'" @click="visible.show=true" >新增</el-button>
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
      <el-table-column prop="sdTypeName" label="SD类型" align="center" ></el-table-column>
      <el-table-column prop="sdSimpleName" label="简称" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="typeLabel" label="配置类型" align="center" ></el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center" width="180" ></el-table-column>
      <el-table-column prop="creator" label="创建人" align="center" width="180" ></el-table-column>
      <el-table-column prop="statusLabel" label="状态" align="center"  width="220" ></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="visible.show=true">编辑</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 新增/编辑-->
    <JFX-Dialog
		:visible.sync="visible"
    :showClose="true"
    @comfirm="save"
    :width="'30vw'"
    :title="'SD类型配置'"
    :top="'20vh'"
    closeBtnText="取 消"
    confirmBtnText="确 认"
		>
    <el-form :model="editrRuleForm" :rules="rules" ref="form" >
      <el-row :gutter="10" class="edit-bx">
        <el-col :span="24">
          <el-form-item label="SD类型：" prop="sdTypeName">
            <el-input v-model="editrRuleForm.sdTypeName" placeholder="输入内容" clearable style="width: 20vw;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="flex-l-c">
         <el-form-item label="简称：" prop="sdSimpleName">
            <el-input v-model="editrRuleForm.sdSimpleName" placeholder="输入内容" clearable style="width: 20vw;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="flex-l-c">
          <el-form-item label="配置类型：" prop="modelType" class="search-panel-item fs-14 clr-II" >
            <el-select v-model="editrRuleForm.modelType" placeholder="请选择" clearable :data-list="getSelectList('emailConfig_statusList')" style="width: 20vw;" >
              <el-option v-for="item in selectOpt.emailConfig_statusList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="flex-l-c">
         <el-form-item label="状态：" prop="status">
            <el-radio v-model="editrRuleForm.status" label="1">启用</el-radio>
            <el-radio v-model="editrRuleForm.status" label="0">禁用</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    </JFX-Dialog>
    <!-- 新增/编辑 end -->
  </div>
</template>
<script>
import { getList } from '@a/base/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        sdTypeName: '',
        sdSimpleName: '',
        type: ''
      },
      editrRuleForm: {
        sdTypeName: '',
        sdSimpleName: '',
        modelType: '',
        status: '0'
      },
      rules: {
        sdTypeName: [{ required: true, message: 'SD类型不能为空!', trigger: 'blur' }],
        sdSimpleName: [{ required: true, message: '简称不能为空!', trigger: 'blur' }],
        modelType: [{ required: true, message: '配置类型不能为空!', trigger: 'change' }],
        status: [{ required: true }]
      },
      visible: { show: false }
    }
	},
	mounted() {
		this.getList()
	},
  methods: {
		async getList(pageNum) {
      try {
				this.tableData.loading = true
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
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
		dele(row) {
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
    save() {

    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.edit-bx .el-form-item__label {
  width: 120px;
}
</style>
