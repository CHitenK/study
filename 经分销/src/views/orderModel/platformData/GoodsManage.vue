<template>
  <!-- 平台商品管理页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searcreportDatehForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品编码："  prop="wareId" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.wareId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="品牌："  prop="brand" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.brand" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="条码："  prop="upc" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.upc" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="平台：" prop="crawlerType" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.crawlerType"
                placeholder="请选择"
                clearable
                :data-list="getSelectList('crawler_typeList')"
              >
                <el-option
                  v-for="item in selectOpt.crawler_typeList"
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
        <el-button type="primary" @click="exportList">导出</el-button>
        <el-button type="primary" @click="importfile(cartonSizeImportUrl, 147)">箱规导入</el-button>
        <el-button type="primary" @click="importfile(platformMerchandiseImportUrl, 146)">商品导入</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column type="index" align="center" width="55" label="序号" />
      <el-table-column prop="crawlerTypeLabel" align="center" min-width="80" label="平台" show-overflow-tooltip />
      <el-table-column prop="userCode" align="center" min-width="110" label="归属账号" />
      <el-table-column prop="wareId" align="center" min-width="100" label="商品编码" />
      <el-table-column prop="name" align="center" min-width="150" label="商品名称" show-overflow-tooltip />
      <el-table-column prop="upc" align="center" min-width="110" label="条形码" show-overflow-tooltip />
      <el-table-column prop="brand" align="center" min-width="120" label="品牌" show-overflow-tooltip  />
      <el-table-column prop="unit" align="center" min-width="60" label="单位" />
      <el-table-column prop="cartonSize" align="center" min-width="60" label="箱规" show-overflow-tooltip  />
      <el-table-column prop="createDate" align="center" min-width="140" label="创建时间" />
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>

<script>
import commomMix from '@m/index'
import { listByPage, platformMerchandiseUrl, platformMerchandiseImportUrl, cartonSizeImportUrl } from '@a/platformData/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 查询数据
      searchProps: {
        wareId: '',
        brand: '',
        upc: '',
        crawlerType: ''
      },
      platformMerchandiseImportUrl,
      cartonSizeImportUrl
    }
  },
  mounted() {
    this.getList(1)
  },
  activated() {
    this.getList()
  },
  methods: {
    // 拉取表格数据
		async getList(pageNum) {
      try {
        this.tableData.loading = true
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        }
        const res = await listByPage(opt)
        this.tableData.list = res.data.list || []
        this.tableData.total = res.data.total
      } catch (err) {
        console.log(err)
      }
      this.tableData.loading = false
    },
    // 导出列表
    exportList() {
      if (this.tableData.total < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      this.$showToast('确定导出？', () => {
        const opt = {
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        }
        this.$exportFile(platformMerchandiseUrl, opt)
      })
    },
    // 导入
    importfile(url, templateId) {
      this.linkTo('/common/importfile?templateId=' + templateId + '&url=' + url)
    },
    resetForm() {
      this.reset('searcreportDatehForm', () => {
        this.getList(1)
      })
    }
  }
}
</script>
