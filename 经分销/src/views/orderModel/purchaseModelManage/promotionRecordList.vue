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
            <el-form-item  label="公司：" prop="merchantId" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.merchantId" placeholder="请选择" clearable :data-list="getSelectList('tallyingOrder_stateList')" >
                <el-option v-for="item in selectOpt.tallyingOrder_stateList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item  label="平台名称：" prop="storePlatformCode" class="search-panel-item fs-14 clr-II" >
              <el-select v-model="ruleForm.storePlatformCode" placeholder="请选择" clearable :data-list="getSelectList('tallyingOrder_stateList')" >
                <el-option v-for="item in selectOpt.tallyingOrder_stateList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item label="促销日期：">
              <el-date-picker
                clearable
                v-model="date"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20">
      <el-col :span="24" >
        <el-button type="primary" :size="'small'" @click="visible.show=true" v-permission="'promotionRecord_add'">新增</el-button>
        <el-button type="primary" :size="'small'" @click="$successMsg('成功导出')" v-permission="'promotionRecord_exportRecord'">导出</el-button>
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
      <el-table-column prop="merchantName" label="公司" align="center" min-width="120" show-overflow-toolti></el-table-column>
      <el-table-column prop="promotionName" label="促销名称" align="center" min-width="110" show-overflow-tooltip></el-table-column>
      <el-table-column prop="promotionYear" label="促销年份" align="center" min-width="100"></el-table-column>
      <el-table-column prop="startDate" label="开始日期" align="center" min-width="100"></el-table-column>
      <el-table-column prop="endDate" label="结束日期" align="center" min-width="100" ></el-table-column>
      <el-table-column prop="dayNum" label="天数" align="center" min-width="90"></el-table-column>
      <el-table-column prop="promotionInvestment" label="促销投入（万元）" align="center" min-width="100"></el-table-column>
      <el-table-column prop="storePlatformName" label="平台名称" align="center" min-width="110" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="linkTo('/oreal/purchaseorderDetail?id=' + scope.row.id )" v-permission="'promotionRecord_edit'">编辑</el-button>
          <el-button type="text" @click="linkTo('/oreal/purchaseorderDetail?id=' + scope.row.id )" v-permission="'promotionRecord_deleteRecord'">删除</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
    <edit :visible="visible"></edit>
  </div>
</template>
<script>
import { getList } from '@a/base/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    edit: () => import('./components/promotionRecordEdit')
  },
  data() {
    return {
      ruleForm: {
        merchantId: '',
        storePlatformCode: '',
        startDateStr: '',
        endDateStr: ''
      },
      date: '',
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
				const res = await getList(opt)
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
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
