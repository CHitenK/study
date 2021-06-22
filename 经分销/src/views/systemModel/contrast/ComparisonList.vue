<template>
  <!-- 商品对照表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="resetSearchForm" @search="getList(1)">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="店铺：" prop="shopId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.shopId"
                placeholder="可根据编码/名称查询"
                clearable
                filterable
                remote
                :remote-method="remoteMethod"
              >
                <el-option
                  v-for="item in shopList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                >
                  {{item.label}}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品ID ：" prop="skuId" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.skuId" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="公司：" prop="merchantId" class="search-panel-item fs-14 clr-II" >
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
            <el-form-item label="商品名称：" prop="groupGoodsName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model.trim="searchProps.groupGoodsName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.status"
                placeholder="请选择"
                clearable
                filterable
                :data-list="getSelectList('groupMerchandiseContrast_statusList')"
              >
                <el-option
                  v-for="item in selectOpt.groupMerchandiseContrast_statusList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="12" :xl="12">
            <el-form-item prop="date" label="更新时间：">
              <el-date-picker
                v-model="date"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary" @click="linkTo('/contrast/ComparisonAdd')" v-permission="'groupMerchandiseContrast_add'">新增</el-button>
        <el-button type="primary" @click="importFile" v-permission="'groupMerchandiseContrast_import'">导入</el-button>
        <el-button type="primary" @click="exportList" v-permission="'groupMerchandiseContrast_exportInfo'">导出</el-button>
        <el-button type="primary" @click="deleteTableItem" v-permission="'groupMerchandiseContrast_delete'">删除</el-button>
        <!-- <el-button type="primary" @click="linkTo('/contrast/ComparisonAdd')" >新增</el-button>
        <el-button type="primary" @click="importFile" >导入</el-button>
        <el-button type="primary" @click="exportList" >导出</el-button>
        <el-button type="primary" @click="deleteTableItem" >删除</el-button> -->
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
      <el-table-column prop="shopCode"
                       align="center"
                       label="店铺编码"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="shopName"
                       align="center"
                       label="店铺名称"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="merchantName"
                       align="center"
                       label="公司"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="skuId"
                       align="center"
                       label="商品ID"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="groupGoodsName"
                       align="center"
                       label="商品名称"
                       min-width="120"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="statusLabel"
                       align="center"
                       label="状态"
                       width="80"
                       show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="left"
                       label="操作"
                       width="100"
                       fixed="right">
        <template slot-scope="{row}">
          <el-button type="text"
                     v-permission="'contrast_detail'"
                     @click="linkTo(`/contrast/ComparisonEdit?id=${row.id}`)">编辑</el-button>
          <el-button type="text"
                     v-permission="'contrast_toEditPage'"
                     @click="linkTo(`/contrast/ComparisonDetail?id=${row.id}`)">详情</el-button>
          <!-- <el-button type="text"
                     @click="linkTo(`/contrast/ComparisonEdit?id=${row.id}`)">编辑</el-button>
          <el-button type="text"
                     @click="linkTo(`/contrast/ComparisonDetail?id=${row.id}`)">详情</el-button> -->
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end-->
  </div>
</template>

<script>
import commomMix from '@m/index'
import { debounce } from '@u/tool'
import {
  getGroupMerchandiseContrast,
  getShop,
  exportInfo,
  importExcel,
  deleteGroupMerchandise
} from '@a/contrast'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 查询数据
      searchProps: {
        shopId: '',
        skuId: '',
        merchantId: '',
        groupGoodsName: '',
        status: ''
      },
      // 更新时间
      date: [],
      // 店铺列表
      shopList: [],
      allShopList: []
    }
  },
  activated() {
    this.getShopList()
    this.getList()
  },
  mounted() {
    this.getShopList()
    this.getList()
  },
  methods: {
    // 获取表格数据
		async getList(pageNum) {
      // 更新时间
      this.searchProps.updateStartDate = this.date && this.date.length ? this.date[0] : ''
      this.searchProps.updateEndDate = this.date && this.date.length ? this.date[1] : ''
      try {
        this.tableData.pageNum = pageNum || this.tableData.pageNum
        this.tableData.loading = true
				const { data } = await getGroupMerchandiseContrast({
          begin: (this.tableData.pageNum - 1) * this.tableData.pageSize,
          pageSize: this.tableData.pageSize || 10,
          ...this.searchProps
        })
				this.tableData.list = data.list
        this.tableData.total = data.total
			} catch (err) {}
      this.tableData.loading = false
    },
    // 获取店铺列表
    async getShopList() {
      const { data } = await getShop()
      if (data && data.length) {
        this.allShopList = data
        const list = data.map(item => ({
          key: item.shopId,
          value: item.shopName,
          label: `${item.dataSourceName}  ${item.shopCode}  ${item.shopName}`
        }))
        await this.$nextTick()
        this.shopList = list
      } else {
        this.shopList = []
      }
    },
    remoteMethod: debounce(function(query) {
      if (query !== '') {
        this.loading = true
        const filterData = this.allShopList.filter(item => item.shopCode.toLowerCase().includes(query.toLowerCase()) || item.shopName.includes(query))
        const list = filterData.map(item => ({
          key: item.shopId,
          value: item.shopName,
          label: `${item.dataSourceName}  ${item.shopCode}  ${item.shopName}`
        }))
        this.shopList = list
        this.loading = false
      } else {
        const list = this.allShopList.map(item => ({
          key: item.shopId,
          value: item.shopName,
          label: `${item.dataSourceName}  ${item.shopCode}  ${item.shopName}`
        }))
        this.shopList = list
      }
    }, 300),
    // 导出
    exportList() {
      if (this.tableData.total < 1) {
        return this.$errorMsg('暂无数据可导出')
      }
      if (this.tableChoseList.length) {
        this.$showToast('确定导出勾选数据？', async() => {
          const ids = this.tableChoseList.map(item => item.id).toString()
          this.$exportFile(exportInfo, { ids })
        })
      } else {
        this.$exportFile(exportInfo, { ...this.searchProps })
      }
    },
    // 导入
    importFile() {
      this.linkTo('/common/importfile?templateId=' + 124 + '&url=' + importExcel)
    },
    // 删除表格项
    deleteTableItem() {
      if (!this.tableChoseList.length) {
        return this.$alertWarning('至少选择一条记录！')
      }
      this.$showToast('确定删除数据？', async() => {
        const ids = this.tableChoseList.map(item => item.id).toString()
        try {
          await deleteGroupMerchandise({ ids })
          this.$successMsg('操作成功')
          this.getList()
        } catch (error) {
          this.$errorMsg(error.message)
        }
      })
    },
    // 重置搜索表单
    resetSearchForm() {
      this.reset('searchForm', () => {
        this.date = []
        this.getList(1)
      })
    }
  }
}
</script>
