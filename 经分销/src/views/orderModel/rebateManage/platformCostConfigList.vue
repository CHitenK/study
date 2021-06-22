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
              <el-select v-model="ruleForm.merchantId" placeholder="请选择" clearable filterable :data-list="getSelectMerchantBean('merchant_list')" >
                <el-option v-for="item in selectOpt.merchant_list"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.buId" placeholder="请选择" clearable  filterable :data-list="getAllSelectBean('buList')" >
                <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客户：" prop="customerId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.customerId" placeholder="请选择" clearable filterable :data-list="this.getCustomerByMerchantId('kuhuList', { cusType: 1, merchantId: this.ruleForm.merchantId, begin: 0, pageSize: 10000 }, { 'key': 'id', 'value': 'name' })" >
                <el-option v-for="item in selectOpt.kuhuList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="平台：" prop="storePlatformName" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.storePlatformName" placeholder="请选择" clearable filterable :data-list="getSelectList('storePlatformList')" >
                <el-option v-for="item in selectOpt.storePlatformList"  :key="item.key" :label="item.value" :value="item.value"></el-option>
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
        <el-button type="primary" :size="'small'" @click="linkTo('/rebate/platformCostConfigEdit')" v-permission="'platformCostConfigAdd_add'" >新增</el-button>
        <el-button type="primary" :size="'small'" @click="copy"  v-permission="'platformCostConfigAdd_copy'" >复制</el-button>
        <el-button type="primary" :size="'small'" @click="dele"  v-permission="'platformCostConfigAdd_del'">删除</el-button>
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
      <el-table-column prop="buName" label="事业部" align="center" width="140"></el-table-column>
      <el-table-column prop="customerName" label="客户" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="storePlatformName" label="平台名称" align="center" width="100"></el-table-column>
      <el-table-column prop="effectiveDate" label="生效月份" align="center" width="140" >
        <template slot-scope="scope">{{scope.row.effectiveDate ? scope.row.effectiveDate.substring(0, 7) : ''}}</template>
      </el-table-column>
      <el-table-column prop="expirationDate" label="失效月份" align="center" width="140" >
        <template slot-scope="scope">{{scope.row.expirationDate ? scope.row.expirationDate.substring(0, 7) : ''}}</template>
      </el-table-column>
      <el-table-column prop="createName" label="创建人" align="center"  width="120" ></el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center"  width="140" ></el-table-column>
      <el-table-column prop="statusLabel" label="状态" align="center"  width="100" ></el-table-column>
      <el-table-column label="操作" align="left" fixed="right" width="90">
        <template slot-scope="scope">
          <el-button type="text" v-if="scope.row.status === '0'" @click="linkTo('/rebate/platformCostConfigEdit?id=' + scope.row.id )" v-permission="'platformCostConfigAdd_edit'">审核</el-button>
          <el-button type="text" @click="linkTo('/rebate/platformCostConfigDetail?id=' + scope.row.id )" v-permission="'platformCostConfigAdd_detail'">查看</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { platformCostConfigList, delPlatFormConfig } from '@a/rebateManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        merchantId: '',
        customerId: '',
        buId: '',
        storePlatformName: ''
      }
    }
	},
	mounted() {
    const userInfo = this.getUserInfo()
    this.ruleForm.merchantId = userInfo.merchantId ? userInfo.merchantId.toString() : ''
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
				const res = await platformCostConfigList(opt)
        this.tableData.list = res.data.list
        this.tableData.total = res.data.total
			} catch (err) {
        console.log(err)
			}
      this.tableData.loading = false
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
        await delPlatFormConfig({ ids })
				this.$successMsg('删除成功')
        this.getList()
			})
    },
    resetForm() {
      this.reset('ruleForm', () => {
        this.getList(1)
      })
    },
    copy() {
      if (this.tableChoseList.length !== 1) {
        this.$errorMsg('请选择一条记录！')
        return false
      }
      const id = this.tableChoseList[0].id
      this.linkTo(`/rebate/platformCostConfigEdit?type=copy&id=${id}`)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
