<template>
  <!-- 外仓备案商品页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品条形码：" prop="barcode" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.barcode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="平台备案关区：" prop="customsAreaName" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.customsAreaName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="平台商品货号：" prop="goodsNo" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.goodsNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品品牌：" prop="brandName" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.brandName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品名称：" prop="goodsName" class="search-panel-item fs-14 clr-II">
              <el-input v-model.trim="searchProps.goodsName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="数据来源：" prop="source" class="search-panel-item fs-14 clr-II">
              <el-select v-model="searchProps.source"
                         placeholder="请选择"
                         :data-list="getSelectList('merchandiseWarehouse_sourceList')"
                         filterable
                         clearable>
                <el-option
                  v-for="item in selectOpt.merchandiseWarehouse_sourceList"
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
                   v-permission="'goodsManage_OutStoreGoods_import'"
                   @click="importFile">批量导入</el-button>
        <el-button type="primary"
                   v-permission="'goodsManage_OutStoreGoods_export'"
                   @click="exportList">导出</el-button>
        <el-button type="primary"
                   v-permission="'goodsManage_OutStoreGoods_del'"
                   @click="deleteTableItem">删除</el-button>
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
      <el-table-column prop="merchantName"
                       align="center"
                       width="120"
                       label="所属公司"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="goodsNo"
                       align="center"
                       min-width="150"
                       label="平台商品货号"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="customsAreaName"
                       align="center"
                       min-width="120"
                       label="平台备案关区"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="barcode"
                       align="center"
                       min-width="120"
                       label="商品条形码"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="goodsName"
                       align="center"
                       min-width="120"
                       label="商品名称"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="unit"
                       align="center"
                       width="100"
                       label="计量单位"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="filingPrice"
                       align="center"
                       width="100"
                       label="备案单价"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="sourceLabel"
                       align="center"
                       width="100"
                       label="数据来源"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center"
                       width="100"
                       label="操作"
                       show-overflow-tooltip>
        <template slot-scope="{row}">
          <el-button type="text"
                     v-permission="'goodsManage_OutStoreGoods_detail'"
                     @click="linkTo(`/goods/OutStoreGoodsDetail?id=${row.id}`)">详情</el-button>
          <el-button type="text"
                     v-permission="'goodsManage_OutStoreGoods_log'"
                     @click="showModal(row.id)">日志</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end -->
    <!-- 日志 -->
    <LogList v-if="logList.visible.show"
             :visible.sync="logList.visible"
             :type="logList.type"
             :filterData="logList.filterData"
    ></LogList>
    <!-- 日志 end -->
  </div>
</template>
<script>
import {
  lisMerchandiseExternalWarehouse,
  importMerchandiseWarehouseUrl,
  exportMerchandiseExternalWarehouseUrl,
  delMerchandiseExternalWarehouse
} from '@a/goodsManage'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    // 日志
    LogList: () => import('@c/logList/index.vue')
  },
  data() {
    return {
      // 查询数据
      searchProps: {
        barcode: '',
        customsAreaName: '',
        goodsNo: '',
        brandName: '',
        goodsName: '',
        source: ''
      },
      // 日志
      logList: {
        filterData: {},
        type: 'system',
        visible: { show: false }
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
				const { data } = await lisMerchandiseExternalWarehouse({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
        this.tableData.list = data.list
        this.tableData.total = data.total
			} catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.tableData.loading = false
      }
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 162 + '&url=' + importMerchandiseWarehouseUrl)
    },
    // 导出
    exportList() {
      if (this.tableData.total < 1) {
        this.$errorMsg('暂无数据可导出')
        return false
      }
      if (this.tableChoseList.length) {
        this.$showToast('确定导出勾选数据？', async() => {
          const ids = this.tableChoseList.map(item => item.id).toString()
          this.$exportFile(exportMerchandiseExternalWarehouseUrl, { ids })
        })
      } else {
        this.$exportFile(exportMerchandiseExternalWarehouseUrl, { ...this.searchProps })
      }
    },
    // 删除表格项
    deleteTableItem() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      this.$showToast('确定删除数据？', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await delMerchandiseExternalWarehouse({ ids })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    showModal(data) {
      this.logList.visible.show = true
      this.logList.filterData = { id: data }
    },
    closeModal() {
      this.logList.visible.show = false
      this.logList.filterData = {}
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
