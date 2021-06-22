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
            <el-form-item label="公司：" prop="merchantId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.merchantId" placeholder="请选择" clearable filterable >
                <el-option v-for="item in merchantIdList"  :key="item.value" :label="item.label" :value="item.value"></el-option>
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
        <el-button type="primary" :size="'small'" @click="open" v-premission="'receive_email_config_add'" >新增</el-button>
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
      <el-table-column prop="merchantName" label="公司" align="center"></el-table-column>
      <el-table-column prop="buName" label="事业部" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="auditReminderTypeLabel" label="审批提醒对象类型" align="center" width="140"></el-table-column>
      <el-table-column prop="auditReminderOrg" label="审批提醒对象" align="center" width="140" ></el-table-column>
      <el-table-column prop="veriReminderTypeLabel" label="付款提醒对象类型" align="center" width="140" ></el-table-column>
      <el-table-column prop="veriReminderOrg" label="付款提醒对象" align="center"  width="120" ></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="open" v-premission="'receive_email_config_modify'">编辑</el-button>
          <el-button type="text" @click="dele(scope.row)" v-premission="'receive_email_config_del'">删除</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <receivable-edit :visible.sync="visible" v-if="visible.show" @comfirm="visible.show=false" :editType="editType"></receivable-edit>
  </div>
</template>
<script>
import { listReceiveEmailConfig, receiveEmailConfigInit, deleteReceiveEmailConfig } from '@a/emailManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    receivableEdit: () => import('./components/receivableEdit')
  },
  data() {
    return {
      ruleForm: {
        merchantId: ''
      },
      visible: { show: false },
      editType: 'add',
      merchantIdList: []
    }
	},
	mounted() {
		this.getList(1)
    this.receiveEmailConfigInit()
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
				const res = await listReceiveEmailConfig(opt)
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
				await deleteReceiveEmailConfig({ ids: row.id })
        this.$successMsg('删除成功')
        this.getList()
			})
    },
    async receiveEmailConfigInit() {
      const res = await receiveEmailConfigInit()
      this.merchantIdList = res.data || []
    },
    resetForm() {
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    open() {
      this.visible = { show: true }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
