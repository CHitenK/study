<template>
  <!-- 费项配置页面 -->
  <div>
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)" style="margin-top: 0px">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="所属层级：" prop="level" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.level"
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
            <el-form-item label="上级费项名称：" prop="parentProjectName" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.parentProjectName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="本级费项名称：" prop="projectName" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.projectName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="主数据编码：" prop="inExpCode" class="search-panel-item fs-14 clr-II">
              <el-input v-model="searchProps.inExpCode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="NC收支费项：" prop="paymentSubjectId" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.paymentSubjectId"
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
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="适用类型：" prop="type" class="search-panel-item fs-14 clr-II">
              <el-select
                v-model="searchProps.type"
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
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table ref="table" :tableData.sync="tableData" @selection-change="selectionChange" @change="getList">
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="levelLabel" align="center" min-width="80" label="所属层级" />
      <el-table-column prop="parentProjectName" align="center" min-width="80" label="上级费项名称" />
      <el-table-column prop="projectName" align="center" min-width="120" label="本级费项名称" />
      <el-table-column prop="inExpCode" align="center" min-width="80" label="主数据编码" />
      <el-table-column prop="paymentSubjectName" align="center" min-width="80" label="NC收支费项" />
      <el-table-column prop="customerNames" align="center" min-width="80" label="适用客户" />
      <el-table-column prop="typeLabel" align="center" min-width="80" label="适用类型" />
      <el-table-column prop="statusLabel" align="center" min-width="80" label="状态" />
      <el-table-column prop="modifyDate" align="center" min-width="150" label="最近编辑时间" />
      <el-table-column prop="modifierName" align="center" min-width="80" label="编辑人" />
      <el-table-column align="center" width="100" label="操作" fixed="right">
        <template slot-scope="{row}">
          <el-button type="text" @click="showModal('edit')">编辑</el-button>
          <el-button type="text" v-if="row.status === '0'">启用</el-button>
          <el-button type="text" v-else>禁用</el-button>
        </template>
      </el-table-column>
    </JFX-table>
    <!-- 表格 end -->
    <!-- 编辑项 -->
    <CostAllocationEdit v-if="visible.show" :showDialog="visible" :dialogTitle="dialogTitle" />
    <!-- 编辑项 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  components: {
    CostAllocationEdit: () => import('./CostAllocationEdit')
  },
  data() {
    return {
      // 搜索数据
      searchProps: {
        level: '',
        parentProjectName: '',
        projectName: '',
        inExpCode: '',
        paymentSubjectId: '',
        status: '',
        type: ''
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
  createDate: '2021-01-12 16:30:18',
  creater: 100326,
  createrName: '杨创',
  customerNames: '',
  id: 75,
  inExpCode: '2101211155',
  level: '2',
  levelLabel: '二级',
  modifier: 100324,
  modifierName: '刘克义keyi',
  modifyDate: '2021-01-21 11:56:05',
  parentId: 18,
  parentProjectName: '商品销售收入',
  paymentSubjectId: 1000007,
  paymentSubjectName: '经销业务TO B',
  projectCode: 'JSXM10000165',
  projectName: '测试2101211155',
  status: '1',
  statusLabel: '使用中',
  suitableCustomer: '1',
  suitableCustomerLabel: '通用',
  type: '1',
  typeLabel: 'To B'
}]
</script>
