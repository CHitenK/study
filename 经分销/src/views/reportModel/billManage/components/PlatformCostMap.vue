<template>
  <!-- 费项配置页面 -->
  <div>
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)" style="margin-top: 0px">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="平台名称：" prop="storePlatformCode" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.storePlatformCode"
                placeholder="请选择"
                clearable
                filterable
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
            <el-form-item label="平台费项名称：" prop="name" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.name" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="本级费项名称：" prop="settlementConfigId" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.settlementConfigId"
                placeholder="请选择"
                clearable
                filterable
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
            <el-form-item label="NC收支费项：" prop="ncPaymentId" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.ncPaymentId"
                placeholder="请选择"
                clearable
                filterable
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
            <el-form-item label="状态：" prop="status" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.status"
                placeholder="请选择"
                clearable
                filterable
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
        <el-button type="primary" @click="showModal('add')">新增</el-button>
        <el-button type="primary">导出</el-button>
        <el-button type="primary">导入</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table ref="table" :tableData.sync="tableData" @selection-change="selectionChange" @change="getList">
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="storePlatformName" align="center" min-width="80" label="平台名称" />
      <el-table-column prop="name" align="center" min-width="80" label="平台费项名称" />
      <el-table-column prop="settlementConfigName" align="center" min-width="80" label="本级费项名称" />
      <el-table-column prop="ncPaymentName" align="center" min-width="80" label="NC收支费项" />
      <el-table-column prop="statusLabel" align="center" min-width="80" label="状态" />
      <el-table-column prop="modifyDate" align="center" min-width="80" label="最近编辑时间" />
      <el-table-column prop="modifierName" align="center" min-width="80" label="编辑人" />
      <el-table-column align="center" width="100" label="操作" fixed="right">
        <template>
          <el-button type="text" @click="showModal('edit')">编辑</el-button>
          <el-button type="text">禁用</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end -->
    <!-- 编辑项 -->
    <PlatformCostMapEdit v-if="visible.show" :showDialog="visible" :dialogTitle="dialogTitle" />
    <!-- 编辑项 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    PlatformCostMapEdit: () => import('./PlatformCostMapEdit')
  },
  data() {
    return {
      searchProps: {
        storePlatformCode: '',
        name: '',
        settlementConfigId: '',
        ncPaymentId: '',
        paymentSubjectId: '',
        status: ''
      },
      // 模态框title
      dialogTitle: '新增项目'
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
    showModal(type) {
      if (type === 'edit') {
        this.visible.show = true
        this.dialogTitle = '编辑项目'
      } else {
        this.visible.show = true
        this.dialogTitle = '新增项目'
      }
    }
  }
}
const fetchData = [{
  createDate: '2021-01-28 15:42:54',
  creater: 100326,
  createrName: '杨创',
  id: 110,
  modifier: 100326,
  modifierName: '杨创',
  modifyDate: '2021-01-28 15:43:20',
  name: '京东14',
  ncPaymentId: 1000004,
  ncPaymentName: '经销业务TO C',
  settlementConfigId: 54,
  settlementConfigName: '卖家返还运费',
  status: '1',
  statusLabel: '使用中',
  storePlatformCode: '100044998',
  storePlatformName: '京东'
}]
</script>
