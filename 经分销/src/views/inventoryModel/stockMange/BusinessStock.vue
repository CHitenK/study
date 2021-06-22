<template>
  <!-- 库存批次快照列表 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @search="getList(1)" @reset="reset('searchForm')">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="查询月份：" prop="month" class="search-panel-item fs-14 clr-II">
              <el-date-picker
                v-model="searchProps.month"
                type="month"
                placeholder="请选择"
                style="width: 203px"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="仓库：" prop="depotId" class="search-panel-item fs-14 clr-II">
              <el-select  v-model="searchProps.depotId"
                          placeholder="请选择"
                          filterable
                          clearable
                          :data-list="getSelectList('adjustmentType_sourceList')">
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
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II">
              <el-select  v-model="searchProps.buId"
                          placeholder="请选择"
                          filterable
                          clearable
                          :data-list="getSelectList('adjustmentType_sourceList')">
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
            <el-form-item label="品牌：" prop="brandId" class="search-panel-item fs-14 clr-II">
              <el-select  v-model="searchProps.brandId"
                          placeholder="请选择"
                          filterable
                          clearable
                          :data-list="getSelectList('adjustmentType_sourceList')">
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
            <el-form-item label="商品货号：" prop="goodsNo" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.goodsNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="条码：" prop="barcode" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.barcode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品名称：" prop="goodsName" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.goodsName" placeholder="请输入" clearable />
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
        <el-button type="primary" @click="refresh">刷新</el-button>
        <span class="clr-r fs-14" style="margin-left: 10px;">刷新日期：2020-12-23 11:58:30</span>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" >
      <el-table-column  type="selection"
                        align="center"
                        width="55">
      </el-table-column>
      <el-table-column  prop="merchantName"
                        align="center"
                        min-width="80"
                        label="公司">
      </el-table-column>
      <el-table-column  prop="buName"
                        align="center"
                        min-width="120"
                        label="事业部">
      </el-table-column>
      <el-table-column  prop="depotName"
                        align="center"
                        min-width="120"
                        label="仓库名称">
      </el-table-column>
      <el-table-column  prop="brandName"
                        align="center"
                        min-width="120"
                        label="品牌">
      </el-table-column>
      <el-table-column  prop="goodsNo"
                        align="center"
                        min-width="120"
                        label="商品货号">
      </el-table-column>
      <el-table-column  prop="goodsName"
                        align="center"
                        min-width="200"
                        label="商品名称"
                        show-overflow-tooltip>
      </el-table-column>
      <el-table-column  prop="barcode"
                        align="center"
                        min-width="120"
                        label="商品条形码">
      </el-table-column>
      <el-table-column  prop="surplusNum"
                        align="center"
                        min-width="80"
                        label="库存数量">
      </el-table-column>
      <el-table-column  prop="okNum"
                        align="center"
                        min-width="80"
                        label="好品数量">
      </el-table-column>
      <el-table-column  prop="wornNum"
                        align="center"
                        min-width="80"
                        label="坏品数量">
      </el-table-column>
      <el-table-column  prop="unitLabel"
                        align="center"
                        min-width="80"
                        label="理货单位">
      </el-table-column>
      <el-table-column  prop="month"
                        align="center"
                        min-width="80"
                        label="归属月份">
      </el-table-column>
      <el-table-column  prop="createDate"
                        align="center"
                        min-width="150"
                        label="刷新日期">
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
        month: '',
        depotId: '',
        buId: '',
        brandId: '',
        goodsNo: '',
        barcode: '',
        goodsName: ''
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
    },
    // 导出列表
    exportList() {
      if (!this.searchProps.month) {
        this.$alertError('请选择月份！')
      } else {
        this.$showToast('确定导出筛选的数据？', () => {
          console.log(this.searchProps)
        })
      }
    },
    // 刷新
    refresh() {
      if (!this.searchProps.month) {
        this.$alertError('请选择月份！')
      }
    }
  }
}
</script>
