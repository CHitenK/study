<template>
  <!-- 库存期初列表页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb />
    <!-- 面包屑 end -->
    <!-- 搜索面板 -->
    <JFX-search-panel @search="getList(1)" @reset="reset('searchForm')">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="仓库：" prop="depotId" class="search-panel-item fs-14 clr-II">
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
            <el-form-item label="商品名称：" prop="goodsName" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.goodsName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品货号：" prop="goodsNo" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.goodsNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品条码：" prop="barcode" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.barcode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="库存类型：" prop="type" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.type"
                placeholder="请选择"
                filterable
                clearable
                :data-list="getSelectList('initInventory_typeList')"
              >
                <el-option
                  v-for="item in selectOpt.initInventory_typeList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="数据来源：" prop="source" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.source"
                placeholder="请选择"
                filterable
                clearable
                :data-list="getSelectList('initInventory_sourceList')"
              >
                <el-option
                  v-for="item in selectOpt.initInventory_sourceList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="状态：" prop="state" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.state"
                placeholder="请选择"
                filterable
                clearable
                :data-list="getSelectList('initInventory_stateList')"
              >
                <el-option
                  v-for="item in selectOpt.initInventory_stateList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.buId"
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
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary" @click="linkTo('/common/importfile')">批量导入</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="depotName" align="center" min-width="150" label="仓库" />
      <el-table-column prop="buName" align="center" min-width="80" label="事业部" />
      <el-table-column prop="goodsNo" align="center" min-width="120" label="商品货号" />
      <el-table-column prop="goodsName" align="center" min-width="200" label="商品名称" show-overflow-tooltip />
      <el-table-column prop="barcode" align="center" min-width="120" label="商品条码" />
      <el-table-column prop="batchNo" align="center" min-width="80" label="批次号" />
      <el-table-column prop="productionDate" align="center" min-width="80" label="生产日期" />
      <el-table-column prop="overdueDate" align="center" min-width="80" label="有效期至" />
      <el-table-column prop="typeLabel" align="center" min-width="80" label="库存类型" />
      <el-table-column prop="initNum" align="center" min-width="80" label="库存数量" />
      <el-table-column prop="createDate" align="center" min-width="150" label="录入时间" />
      <el-table-column prop="stateLabel" align="center" min-width="80" label="状态" />
      <el-table-column prop="unitLabel" align="center" min-width="80" label="理货单位" />
      <el-table-column prop="commbarcode" align="center" min-width="120" label="标准条码" />
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
        depotId: '',
        goodsName: '',
        goodsNo: '',
        barcode: '',
        type: '',
        source: '',
        state: '',
        buId: ''
      },
      inventoryTypeLabel: [
        { key: '1', value: '好品' },
        { key: '2', value: '坏品' }
      ],
      dataSourcesLabel: [
        { key: '1', value: '录入/导入' },
        { key: '2', value: 'OP' },
        { key: '3', value: 'OFC' }
      ],
      statusLabel: [
        { key: '1', value: '未确认' },
        { key: '2', value: '已确认' }
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
    }
  }
}
</script>
