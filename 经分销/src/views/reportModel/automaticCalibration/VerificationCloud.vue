<template>
  <!-- 云集账单校验页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="账单月份：" prop="month" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                v-model="searchProps.month"
                type="month"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="结算单号：" prop="settleId" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.settleId" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="只看差异：" prop="checkDifference" class="search-panel-item fs-14 clr-II" >
              <el-checkbox v-model="checkDifference" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="云集商品编码：" prop="skuNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.skuNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary" @click="successMsg('success')">导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column prop="month" align="center" min-width="80" label="账单月份" />
      <el-table-column prop="settleId" align="center" min-width="80" label="结算单号" />
      <el-table-column prop="settleDate" align="center" min-width="80" label="结算日期" />
      <el-table-column prop="skuNo" align="center" min-width="80" label="云集商品编码" />
      <el-table-column prop="platformDeliveryAccount" align="center" min-width="80" label="平台发货量" />
      <el-table-column prop="platformReturnAccount" align="center" min-width="80" label="平台退货量" />
      <el-table-column prop="goodsNo" align="center" min-width="80" label="商品货号" />
      <el-table-column prop="systemDeliveryAccount" align="center" min-width="80" label="系统出库量" />
      <el-table-column prop="systemReturnAccount" align="center" min-width="80" label="系统入库量" />
      <el-table-column align="center" min-width="80" label="差异">
        <template slot-scope="{row}">
          {{`出库：${row.deliveryDifferent}  入库：${row.returnDifferent}`}}
        </template>
      </el-table-column>
      <el-table-column prop="result" align="center" min-width="80" label="原因" />
    </JFX-table>
    <!-- 表格 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 查询数据
      searchProps: {
        month: '',
        settleId: '',
        checkDifference: false,
        skuNo: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 拉取表格数据
		getList(pageNum) {
      const params = {
        begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
        pageSize: this.tableData.pageSize || 10,
        ...this.searchProps
      }
      console.log(params)
      this.tableData.loading = true
      setTimeout(() => {
        this.tableData = {
          list: [],
          loading: false,
          pageNum: 1,
          total: 11,
          pageSize: 10
        }
      }, 500)
    }
  }
}
</script>
