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
                <el-option v-for="item in merchantSelectBean"  :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="供应商：" prop="customerId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.customerId" placeholder="请选择" clearable filterable >
                <el-option v-for="item in customerSelectBean"  :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.status" placeholder="请选择" clearable :data-list="getSelectList('emailConfig_statusList')" >
                <el-option v-for="item in selectOpt.emailConfig_statusList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
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
        <el-button type="primary" :size="'small'" @click="linkTo('/email/reminderEdit/add')" v-permission="'email_toAddPage'" >新增</el-button>
        <el-button type="primary" :size="'small'" @click="dele" v-permission="'email_delEmail'">删除</el-button>
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
      <el-table-column prop="customerName" label="供应商" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="reminderTypeLabel" label="提醒类型" align="center" width="120"></el-table-column>
      <el-table-column prop="accountPeriodDay" label="付款账期" align="center" width="120" ></el-table-column>
      <el-table-column prop="baseTimeTypeLabel" label="基准时间" align="center" width="160" ></el-table-column>
      <el-table-column prop="accountUnitTypeLabel" label="账期单位" align="center"  width="120" ></el-table-column>
      <el-table-column prop="modifyDate" label="编辑时间" align="center"  width="160" ></el-table-column>
      <el-table-column prop="statusLabel" label="状态" align="center"  width="120" ></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button type="text" v-if="scope.row.status === '1'" @click="auditEmail(scope.row.id, '1')" v-permission="'email_auditEmail'">禁用</el-button>
          <el-button type="text" v-else @click="auditEmail(scope.row.id, '0')" v-permission="'email_auditEmail'">启用</el-button>
          <el-button type="text" @click="linkTo('/email/reminderDetail?id=' + scope.row.id )" v-permission="'email_toDetailsPage'">详情</el-button>
          <el-button type="text" @click="linkTo('/email/reminderEdit/edit?id=' + scope.row.id )" v-permission="'email_toEditPage'">编辑</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { listEmail, initList, delEmail, auditEmail } from '@a/emailManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        merchantId: '',
        customerId: '',
        status: ''
      },
      customerSelectBean: [],
      merchantSelectBean: []
    }
	},
	mounted() {
		this.getList()
    this.init()
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
				const res = await listEmail(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
    async init() {
      const res = await initList()
      const { merchantSelectBean, customerSelectBean } = res.data
      this.customerSelectBean = customerSelectBean || []
      this.merchantSelectBean = merchantSelectBean || []
    },
		dele() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
			this.$confirm('确定删除选中对象？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
				await delEmail({ ids })
        this.$successMsg('删除成功')
        this.getList()
			})
    },
    // 禁用/启用
    async auditEmail(id, status) {
      await auditEmail({ id, status })
      this.$successMsg('操作成功')
      this.getList()
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
