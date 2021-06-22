<template>
  <!-- 爬虫商品对照表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="平台名称：" prop="platformName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.platformName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="爬虫商品货号：" prop="crawlerGoodsNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.crawlerGoodsNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品货号：" prop="goodsNo" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.goodsNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="公司简称：" prop="merchantId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.merchantId"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectMerchantBean('merchantList')"
              >
                <el-option
                  v-for="item in selectOpt.merchantList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.status"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('merchandiseContrast_statusList')"
              >
                <el-option
                  v-for="item in selectOpt.merchandiseContrast_statusList"
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
      <el-col :span="24">
        <el-button type="primary"
                   v-permission="'contrast_toAddPage'"
                   @click="linkTo('/contrast/ContrastComparisonAdd')">新增</el-button>
        <el-button type="primary"
                   v-permission="'contrast_export'"
                   @click="exportList">导出</el-button>
        <!-- <el-button type="primary"
                   @click="linkTo('/contrast/ContrastComparisonAdd')">新增</el-button>
        <el-button type="primary"
                   @click="exportList">导出</el-button> -->
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData"
               @selection-change="selectionChange"
               @change="getList">
      <el-table-column type="selection"
                       align="center"
                       width="55"
      ></el-table-column>
      <el-table-column prop="platformName"
                       align="center"
                       label="平台名称"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="platformUsername"
                       align="center"
                       label="用户名"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="crawlerGoodsNo"
                       align="center"
                       label="爬虫商品货号"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="crawlerGoodsName"
                       align="center"
                       label="爬虫商品名称"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="merchantName"
                       align="center"
                       label="公司简称"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="buName"
                       align="center"
                       label="事业部"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="statusLabel"
                       align="center"
                       label="状态"
                       width="80"
      ></el-table-column>
      <el-table-column align="left"
                       label="操作"
                       width="100"
                       fixed="right">
        <template slot-scope="{row}">
          <el-button type="text"
                     v-permission="'contrast_detail'"
                     @click="linkTo(`/contrast/ContrastComparisonEdit?id=${row.id}`)">编辑</el-button>
          <el-button type="text"
                     v-permission="'contrast_toEditPage'"
                     @click="linkTo(`/contrast/ContrastComparisonDetail?id=${row.id}`)">详情</el-button>
          <!-- <el-button type="text"
                     @click="linkTo(`/contrast/ContrastComparisonEdit?id=${row.id}`)">编辑</el-button>
          <el-button type="text"
                     @click="linkTo(`/contrast/ContrastComparisonDetail?id=${row.id}`)">详情</el-button> -->
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>

<script>
import commomMix from '@m/index'
import {
  getContrastList,
  exportContrastUrl
} from '@a/contrast'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 查询数据
      searchProps: {
        platformName: '',
        crawlerGoodsNo: '',
        goodsNo: '',
        merchantId: '',
        status: ''
      }
    }
  },
  activated() {
    this.getList()
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取表格数据
		async getList(pageNum) {
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await getContrastList({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
				this.tableData.list = data.list
        this.tableData.total = data.total
			} catch (err) {}
      this.tableData.loading = false
    },
    // 导出
    exportList() {
      if (this.tableData.total < 1) {
        return this.$errorMsg('暂无数据可导出')
      }
      if (this.tableChoseList.length) {
        this.$showToast('确定导出勾选数据？', async() => {
          const ids = this.tableChoseList.map(item => item.id).toString()
          this.$exportFile(exportContrastUrl, { ids })
        })
      } else {
        this.$exportFile(exportContrastUrl, { ...this.searchProps })
      }
    },
    // 重置搜索表单
    resetSearchForm() {
      this.reset('searchForm', () => {
        this.getList(1)
      })
    }
  }
}
</script>
