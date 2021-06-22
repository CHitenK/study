<template>
<!-- 预申报单列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="公司：" prop="merchantId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.merchantId" placeholder="请选择" clearable filterable  @change="changeMerchantId">
                <el-option v-for="item in selectOpt.merchant_list"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.buId" placeholder="请选择" clearable >
                <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="供应商：" prop="customerId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.customerId" placeholder="请选择" clearable filterable >
                <el-option v-for="item in selectOpt.customerIdList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客户：" prop="kehuId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.kehuId" placeholder="请选择" clearable filterable>
                <el-option v-for="item in selectOpt.kuhuList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
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
        <el-button type="primary" :size="'small'" @click="linkTo('/deployrRemind/debtTerm/add')" v-permission="'debtTermList_add'">新增</el-button>
        <el-button type="primary" :size="'small'" @click="dele" v-permission="'debtTermList_dele'">删除</el-button>
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
      <el-table-column type="selection" align="center" width="55" :selectable="selectable"></el-table-column>
      <el-table-column prop="merchantName" label="公司" align="center" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="buName" label="事业部" align="center" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="reminderTypeLabel" label="提醒类型" align="center" min-width="100"></el-table-column>
      <el-table-column prop="customerName" label="客商名称" align="center" min-width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="baseDateLabel" label="基准日期" align="center" min-width="110"></el-table-column>
      <el-table-column prop="createName" label="创建人" align="center" min-width="110"></el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center" min-width="140"></el-table-column>
      <el-table-column prop="statusLabel" label="状态" align="center" min-width="100"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="110">
        <template slot-scope="scope">
          <el-button type="text" v-if="+scope.row.status === 0"  @click="linkTo('/deployrRemind/debtTerm/edit?id=' + scope.row.id )" v-permission="'debtTermList_edit'">编辑</el-button>
          <el-button type="text" @click="linkTo('/deployrRemind/debtTerm/detail?id=' + scope.row.id )" v-permission="'debtTermList_detail'">查看</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { getListByPage, delAccountingReminderConfig } from '@a/deployrRemindManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        merchantId: '',
        buId: '',
        customerId: '',
        kehuId: ''
      },
      kuhuList: []
    }
  },
	mounted() {
    // 获取公司列表
    const userInfo = this.getUserInfo()
    if (userInfo.userType === '1') { // 平台管理用户 admin
      this.getSelectMerchantBean('merchant_list') // 获取该用户下的公司列表
    } else { // 商户
      // 当前用户的主体公司
      this.$set(this.selectOpt, `merchant_list`, [])
      this.selectOpt.merchant_list = [{ key: userInfo.merchantId, value: userInfo.merchantName }]
      this.ruleForm.merchantId = userInfo.merchantId
      this.changeMerchantId()
    }
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
        let customerIds = ''
        if (this.ruleForm.customerId && this.ruleForm.kehuId) {
          customerIds = this.ruleForm.customerId + ',' + this.ruleForm.kehuId
        } else {
          customerIds = this.ruleForm.customerId || this.ruleForm.kehuId || ''
        }
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          merchantId: this.ruleForm.merchantId,
          buId: this.ruleForm.buId,
          customerIds
        }
				const res = await getListByPage(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
		},
    // 修改公司
    changeMerchantId() {
      this.ruleForm.customerId = ''
      this.ruleForm.kehuId = ''
      delete this.selectOpt.customerIdList
      delete this.selectOpt.kuhuList
      delete this.selectOpt.buList
      if (this.ruleForm.merchantId) {
        this.getBUSelectBean('buList', { merchantId: this.ruleForm.merchantId }) // 获取事业部
        this.getCustomerByMerchantId('kuhuList', { cusType: 1, merchantId: this.ruleForm.merchantId, begin: 0, pageSize: 10000 }, { 'key': 'id', 'value': 'name' }) // 获取客户列表
        this.getSupplierByMerchantId('customerIdList', { merchantId: this.ruleForm.merchantId }) // 获取供应商列表
      }
    },
		dele() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
			this.$confirm('是否确定删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
				await delAccountingReminderConfig({ ids })
        this.$successMsg('操作成功')
        this.getList()
			})
    },
    resetForm() {
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    selectable(data) {
      return +data.status === 0
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
