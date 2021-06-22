<template>
  <div class="mr-t_10">
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)" :showOpenBtn="false">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="母品牌：" prop="name" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="ruleForm.name" clearable  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20">
      <el-col :span="24" >
        <el-button type="primary" :size="'small'" @click="openLay({})" v-permission="'brandSuperior_add'">新增</el-button>
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
      <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="母品牌" align="center" min-width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="ncCode" label="NC编码" align="center" min-width="200"></el-table-column>
      <el-table-column prop="priceDeclareRatio" label="申报系数" align="center" min-width="200"></el-table-column>
      <el-table-column label="操作" width="100" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="openLay(scope.row)" v-permission="'brandSuperior_modify'">编辑</el-button>
          <el-button type="text" @click="dele(scope.row)" v-permission="'brandSuperior_delete'">删除</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <!-- 编辑母品牌 -->
    <JFX-Dialog
      v-if="visible.show"
      :visible.sync="visible"
      :showClose="true"
      @comfirm="comfirm"
      :width="'600px'"
      :title="commitForm.id ? '编辑母品牌' : '新增母品牌'"
      :btnAlign="'center'"
      top="20vh"
      >
      <div class="change-lve" v-loading="changeloading">
        <div class="flex-c-c">
          <span class="label-item need">母品牌：</span>
          <el-input v-model.trim="commitForm.name" clearable  placeholder="请输入名称" style="width: 400px;" :disabled="!!commitForm.id"></el-input>
        </div>
        <div class="flex-c-c mr-t-20">
          <span class="label-item">NC编码：</span>
          <el-input v-model.trim="commitForm.ncCode" clearable  placeholder="请输入NC编码" style="width: 400px;"></el-input>
        </div>
        <div class="flex-c-c mr-t-20">
          <span class="label-item need">申报系数：</span>
          <JFX-Input v-model="commitForm.priceDeclareRatio" :precision="5" placeholder="请输入" style="width: 400px;" clearable />
        </div>
        <div class="mr-t-20"></div>
      </div>
    </JFX-Dialog>
  </div>
</template>
<script>
import { brandSuperiorList, brandSuperiorDete, brandSuperiorModify, brandSuperiorSave } from '@a/brandManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        name: ''
      },
      visible: { show: false },
      parentId: '',
      changeloading: false,
      targetData: {},
      commitForm: {
        id: '',
        name: '',
        ncCode: '',
        priceDeclareRatio: ''
      }
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
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize,
          ...this.ruleForm
        }
				// 同步方法
				const res = await brandSuperiorList(opt)
				this.tableData.list = res.data.list
				this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
    // 重置搜索栏
    resetForm() {
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    // 打开弹窗
    openLay(row) {
      this.commitForm = {
        id: row.id || '',
        name: row.name || '',
        ncCode: row.ncCode || '',
        priceDeclareRatio: row.priceDeclareRatio || ''
      }
      this.visible.show = true
    },
    async comfirm() {
      if (!this.commitForm.name) {
        this.$errorMsg('请输入母品牌')
        return false
      }
      if (!this.commitForm.priceDeclareRatio) {
        this.$errorMsg('请输入申报系数')
        return false
      }
      if (this.changeloading) return false // 拦截多次提交
      this.changeloading = true
      try {
        if (this.commitForm.id) { // 编辑
          await brandSuperiorModify(this.commitForm)
        } else { // 新增
          await brandSuperiorSave(this.commitForm)
        }
        this.$successMsg('操作成功')
        this.visible.show = false
        this.getList()
      } catch (error) {
        console.log(error)
      }
      this.changeloading = false
    },
    dele(row) {
			this.$confirm('确定删除选中对象？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
				await brandSuperiorDete({ ids: row.id })
        this.$successMsg('删除成功')
        this.getList()
			})
    }
  }
}
</script>
<style lang="scss" scoped>
.change-lve{
  width: 100%;
  padding: 10px  0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}
.mr-t_10{
  margin-top: -10px;
}
.label-item{
  display: inline-block;
  width: 120px;
  text-align: right;
}
</style>
