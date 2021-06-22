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
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.buId" placeholder="请选择" clearable  :data-list="getSelectBeanByUserId('buList')">
                <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="母品牌：" prop="superiorParentBrandId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.superiorParentBrandId" placeholder="请选择" clearable filterable :data-list="getBrandList('superiorParentBrandList')" >
                <el-option v-for="item in selectOpt.superiorParentBrandList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
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
        <el-button type="primary" :size="'small'" @click="exportExcel" v-permission="'purchase_quotaWarmList_export'">导出</el-button>
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
      <el-table-column prop="buName" label="事业部" align="center" min-width="130" show-overflow-tooltip></el-table-column>
      <el-table-column prop="superiorParentBrand" label="母品牌" align="center" min-width="130" show-overflow-tooltip></el-table-column>
      <el-table-column label="额度类型" align="center" min-width="80">
        <template slot-scope="scope">
          {{['', '品牌额度'][scope.row.quotaType]}}
        </template>
      </el-table-column>
      <el-table-column prop="typeLabel" label="项目总额度" align="center" min-width="130">
        <template slot-scope="scope">
           <span>{{scope.row.currency}}</span>
           <br /><span>{{scope.row.projectQuotaStr || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="typeLabel" label="累计采购金额" align="center" min-width="130">
        <template slot-scope="scope">
           <span>{{scope.row.currency}}</span>
           <br /><span>{{scope.row.purchaseAmountStr || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="typeLabel" label="累计销售已回款金额" align="center" min-width="120">
        <template slot-scope="scope">
           <span>{{scope.row.currency}}</span>
           <br /><span>{{scope.row.salesCollectedAmountStr || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="typeLabel" label="可用额度" align="center" min-width="130">
        <template slot-scope="scope">
           <span>{{scope.row.currency}}</span>
           <br /><span>{{scope.row.availableAmountStr || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="数据刷新时间" align="center" min-width="140"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="linkTo('/purchase/quotaWarmingDetail?id=' + scope.row.id )" v-permission="'purchase_quotaWarmList_detail'">详情</el-button>
          <JFX-refresh-btn  @handleClick="refresh(scope.row)" :permission="'purchase_quotaWarmList_refresh'"></JFX-refresh-btn >
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import { getListByPage, exportProjectQuotaWarningUrl, flashProjectQuotaWarningById } from '@a/purchaseManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      ruleForm: {
        buId: '',
        superiorParentBrandId: ''
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
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        // 同步方法
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.ruleForm
        }
				const res = await getListByPage(opt)
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
    // 导出
    exportExcel() {
      if (this.tableData.total < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      let opt = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.ruleForm
      }
      if (this.tableChoseList.length > 0) {
        const ids = this.tableChoseList.map(item => item.id).toString()
        opt = { ids }
      }
      this.$exportFile(exportProjectQuotaWarningUrl, opt)
    },
    // 刷新
    async refresh(row) {
      this.tableData.loading = true
      try {
        await flashProjectQuotaWarningById({ id: row.id })
        this.$successMsg('数据正在更新中,请稍后刷新列表')
        this.getList()
      } catch (error) {
        console.log(error)
      }
      this.tableData.loading = false
    }
  }
}
</script>
