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
            <el-form-item label="供应商：" prop="supplierId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.supplierId" placeholder="请选择" clearable filterable :data-list="getSupplierSelectBean('supplierList')" >
                <el-option v-for="item in selectOpt.supplierList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
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
        <el-button type="primary" :size="'small'" @click="linkTo('/rebate/purchaseSDEdit/add')" v-permission="'sdPurchaseConfig_add'" >新增</el-button>
        <el-button type="primary" :size="'small'" @click="copy"  v-permission="'sdPurchaseConfig_copy'" >复制</el-button>
        <el-button type="primary" :size="'small'" @click="dele"  v-permission="'sdPurchaseConfig_del'">删除</el-button>
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
      <el-table-column prop="buName" label="事业部" align="center" width="120"></el-table-column>
      <el-table-column prop="supplierName" label="供应商" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="effectiveTime" label="生效时间" align="center" width="140" ></el-table-column>
      <el-table-column prop="invalidTime" label="失效时间" align="center" width="140" ></el-table-column>
      <el-table-column prop="creator" label="创建人" align="center"  width="120" ></el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center"  width="140" ></el-table-column>
      <el-table-column prop="statusLabel" label="状态" align="center"  width="120" ></el-table-column>
      <el-table-column label="操作" align="left" fixed="right" width="90">
        <template slot-scope="scope">
          <el-button type="text" v-if="scope.row.status === '0'" @click="linkTo('/rebate/purchaseSDEdit/edit?id=' + scope.row.id )" v-permission="'sdPurchaseConfig_edit'">编辑</el-button>
          <el-button type="text" @click="linkTo('/rebate/purchaseSDDetail?id=' + scope.row.id )" v-permission="'sdPurchaseConfig_detail'">详情</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { sdPurchaseConfigList, delOrders } from '@a/rebateManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        merchantId: '',
        supplierId: '',
        buId: ''
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
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await sdPurchaseConfigList(opt)
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
        await delOrders({ ids })
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
      this.linkTo('/rebate/purchaseSDEdit/add?id=' + id)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
