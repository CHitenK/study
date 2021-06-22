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
        <el-button type="primary" :size="'small'" @click="openLay({})" v-permission="'sdTypeConfig_add'" >新增</el-button>
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
      <el-table-column prop="sdTypeName" label="SD类型" align="center" ></el-table-column>
      <el-table-column prop="sdSimpleName" label="简称" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="typeLabel" label="配置类型" align="center" ></el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center" width="180" ></el-table-column>
      <el-table-column prop="creator" label="创建人" align="center" width="180" ></el-table-column>
      <el-table-column prop="statusLabel" label="状态" align="center"  width="220" ></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="openLay(scope.row)" v-permission="'sdTypeConfig_edit'">编辑</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 新增/编辑-->
    <JFX-Dialog
    v-if="visible.show"
		:visible.sync="visible"
    :showClose="true"
    @comfirm="save"
    :width="'30vw'"
    :title="'SD类型配置'"
    :top="'20vh'"
    closeBtnText="取 消"
    confirmBtnText="确 认"
		>
    <el-form :model="editrRuleForm" :rules="rules" ref="editrRuleForm" >
      <el-row :gutter="10" class="edit-bx" v-loading="saveLoading">
        <el-col :span="24">
          <el-form-item label="SD类型：" prop="sdTypeName">
            <el-input v-model="editrRuleForm.sdTypeName" placeholder="输入内容" clearable style="width: 20vw;" :disabled="!!editrRuleForm.id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="flex-l-c">
         <el-form-item label="简称：" prop="sdSimpleName">
            <el-input v-model="editrRuleForm.sdSimpleName" placeholder="输入内容" clearable style="width: 20vw;" :disabled="!!editrRuleForm.id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="flex-l-c">
          <el-form-item label="配置类型：" prop="type" class="search-panel-item fs-14 clr-II" >
            <el-select v-model="editrRuleForm.type" placeholder="请选择" clearable :data-list="getSelectList('sdtypeconfig_typeList')"  :disabled="!!editrRuleForm.id">
                <el-option v-for="item in selectOpt.sdtypeconfig_typeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="flex-l-c">
         <el-form-item label="状态：" prop="status">
            <el-radio v-model="editrRuleForm.status" label="1" >启用</el-radio>
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
import { sdTypeConfigList, saveOrModify } from '@a/rebateManage/index'
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
        id: '',
        sdTypeName: '',
        sdSimpleName: '',
        type: '',
        status: '0'
      },
      rules: {
        sdTypeName: { required: true, message: 'SD类型不能为空!', trigger: 'blur' },
        sdSimpleName: { required: true, message: '简称不能为空!', trigger: 'blur' },
        type: { required: true, message: '配置类型不能为空!', trigger: 'change' },
        status: { required: true, message: '状态不能为空!', trigger: 'change' }
      },
      visible: { show: false },
      saveLoading: false
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
				const res = await sdTypeConfigList(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
    resetForm() {
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    async save() {
      this.$refs['editrRuleForm'].validate(async(valid) => {
        if (!valid) return false
        if (this.saveLoading) return false
        this.saveLoading = true
        try {
          await saveOrModify(this.editrRuleForm)
          this.$successMsg('操作成功')
          this.getList(this.editrRuleForm.id ? null : 1)
          this.visible.show = false
        } catch (error) {
          console.log(error)
        }
        this.saveLoading = false
        })
    },
    openLay(row) {
      for (let key in this.editrRuleForm) {
        this.editrRuleForm[key] = row[key] ? row[key].toString() : ''
      }
      this.visible.show = true
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.edit-bx .el-form-item__label {
  width: 120px;
}
</style>
