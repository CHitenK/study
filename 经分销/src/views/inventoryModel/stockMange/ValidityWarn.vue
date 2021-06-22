<template>
  <!-- 效期预警页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @search="getList(1)" @reset="reset('searchForm')">
      <el-form :model="searchProps" ref="searchForm" >
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="公司：" prop="merchantName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.merchantName" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="仓库：" prop="depotId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.depotId"
                placeholder="请选择"
                filterable
                clearable
                :data-list="getSelectList('adjustmentType_sourceList')"
              >
                <el-option
                  v-for="item in selectOpt.adjustmentType_sourceList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品货号：" prop="goodsNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.goodsNo" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="效期：" prop="validityType" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.validityType"
                placeholder="请选择"
                filterable
                clearable
              >
                <el-option
                  v-for="item in validityLabel"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24" >
        <el-button type="primary">导出</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="公司名称" />
      <el-table-column prop="depotName" align="center" min-width="120" label="仓库名称" />
      <el-table-column prop="goodsNo" align="center" min-width="120" label="商品货号" />
      <el-table-column prop="goodsName" align="center" min-width="200" label="商品名称" show-overflow-tooltip />
      <el-table-column prop="productionDate" align="center" min-width="120" label="生产日期" />
      <el-table-column prop="overdueDate" align="center" min-width="120" label="失效日期" />
      <el-table-column prop="batchNo" align="center" min-width="120" label="批次号" show-overflow-tooltip />
      <el-table-column prop="surplusNum" align="center" min-width="80" label="总数量" />
      <el-table-column prop="unitLabel" align="center" min-width="80" label="单位" />
      <el-table-column prop="surplusDays" align="center" min-width="100" label="剩余失效(天)" />
      <el-table-column prop="totalDays" align="center" min-width="80" label="总效期(天)" />
      <el-table-column prop="surplusDate" align="center" min-width="80" label="剩余失效" />
      <el-table-column align="center" min-width="80" label="效期区间" >
        <template slot-scope="{row}">
          {{ validityRange(row) }}
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 查询参数
      searchProps: {
        merchantName: '',
        depotId: '',
        goodsNo: '',
        validityType: ''
      },
      // 效期下拉列表数据
      validityLabel: [
        { key: '1', value: '0<x≤1/10' },
        { key: '2', value: '1/10<x≤1/5' },
        { key: '3', value: '1/5<x≤1/3' },
        { key: '4', value: '1/3<x≤1/2' },
        { key: '5', value: '1/2<x≤2/3' },
        { key: '6', value: '2/3以上' },
        { key: '7', value: '过期' }
      ]
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
          list: fetchData,
          loading: false,
          pageNum: 1,
          total: 11,
          pageSize: 10
        }
      }, 500)
    },
    // 效期区间
    validityRange(row) {
      const surplusDays = row.surplusDays
      const totalDays = row.totalDays
      if (surplusDays / totalDays > 0 && surplusDays / totalDays <= 1 / 10) {
        return '0＜X≤1/10'
      } else if (
        surplusDays / totalDays > 1 / 10 &&
        surplusDays / totalDays <= 1 / 5
      ) {
        return '1/10＜X≤1/5'
      } else if (
        surplusDays / totalDays > 1 / 5 &&
        surplusDays / totalDays <= 1 / 3
      ) {
        return '1/5＜X≤1/3'
      } else if (
        surplusDays / totalDays > 1 / 3 &&
        surplusDays / totalDays <= 1 / 2
      ) {
        return '1/3＜X≤1/2'
      } else if (
        surplusDays / totalDays > 1 / 2 &&
        surplusDays / totalDays <= 2 / 3
      ) {
        return '1/2＜X≤2/3'
      } else if (surplusDays / totalDays > 2 / 3) {
        return '2/3以上'
      } else if (surplusDays / totalDays <= 0) {
        return '过期'
      }
      return ''
    }
  }
}
const fetchData = [{
  merchantName: '健太',
  depotName: '卓志南沙保税仓',
  goodsNo: 'JTHP1000001',
  goodsName: '葛莱GRACO 儿童安全座椅 4Ever 0-12岁 粉色',
  productionDate: '2019-10-12',
  overdueDate: '2038-01-11',
  batchNo: 'LOTHPZH11910120000024',
  surplusNum: 53,
  unitLabel: '',
  surplusDays: '6191',
  totalDays: '6666',
  surplusDate: '0.93'
}]
</script>
