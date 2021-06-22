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
              <el-select v-model="ruleForm.merchantId" placeholder="请选择" clearable filterable :data-list="getSelectMerchantBean('companyList')"  @change="changeMerchantId">
                <el-option v-for="item in selectOpt.companyList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.buId" placeholder="请选择" clearable>
                <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="业务模块：" prop="businessModuleType" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.businessModuleType" placeholder="请选择" clearable :data-list="getBusinessModuleType('businessModuleTypeList')" >
                <el-option v-for="item in selectOpt.businessModuleTypeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
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
        <el-button type="primary" :size="'small'" @click="openEdit" v-permission="'email_resetAdd'" >新增</el-button>
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
      <el-table-column prop="id" label="配置ID" align="center" min-width="130" ></el-table-column>
      <el-table-column prop="merchantName" label="公司" align="center" min-width="130"></el-table-column>
      <el-table-column prop="buName" label="事业部" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="reminderTypeLabel" label="业务模块" align="center" min-width="100">
        <template slot-scope="scope" v-if="selectOpt.businessModuleTypeList">{{setModelVal(scope.row.businessModuleType)}}</template>
      </el-table-column>
      <el-table-column label="操作" align="left" fixed="right" width="90">
        <template slot-scope="scope">
          <el-button type="text" @click="openEdit(scope.row)" v-permission="'email_resetEdit'" >编辑</el-button>
          <el-button type="text" @click="dele(scope.row)" v-permission="'email_resetDele'" >删除</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <email-remin-edit v-if="visible.show" :visible.sync="visible" @comfirm="getList" :filterData="filterData"></email-remin-edit>
  </div>
</template>
<script>
import { listReminderEmail, delReminderEamil } from '@a/emailManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    emailReminEdit: () => import('./components/emailReminEdit')
  },
  data() {
    return {
      ruleForm: {
        merchantId: '',
        buId: '',
        businessModuleType: ''
      },
      visible: { show: false },
      filterData: {}
    }
	},
	mounted() {
		this.getList(1)
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
				const res = await listReminderEmail(opt)
        this.tableData.list = res.data.list || []
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
    setModelVal(val) {
      this.selectOpt.businessModuleTypeList = this.selectOpt.businessModuleTypeList || []
      const target = this.selectOpt.businessModuleTypeList.find(item => +item.key === +val) || {}
      return target.value || ''
    },
		dele(row) {
			this.$confirm('确定删除该对象？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
        try {
          await delReminderEamil({ id: row.id })
          this.$successMsg('删除成功')
          this.getList()
        } catch (error) {
          console.log(error)
        }
			})
    },
    resetForm() {
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    // 打开编辑
    openEdit(row) {
      this.filterData = { id: row ? row.id : '' }
      this.visible.show = true
    },
    changeMerchantId() {
      const { merchantId } = this.ruleForm
      if (merchantId) {
        delete this.selectOpt.buList
        this.getBUSelectBean('buList', { merchantId })
      }
      this.ruleForm.buId = ''
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
