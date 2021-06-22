<template>
  <!-- PO完结组件 -->
  <div class="page-bx bgc-w" style="padding-top: 0;">
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)" :showOpenBtn="false" style="margin-top: 0;">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="PO号：" prop="po" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.po" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="完结状态：" prop="status" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.status"
                placeholder="请选择"
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
        <el-button type="primary" @click="$successMsg('success')">汇总表导出</el-button>
        <el-button type="primary" @click="$successMsg('success')">明细表导出</el-button>
        <el-button type="primary" @click="$successMsg('success')">刷新报表</el-button>
        <el-checkbox v-model="isSynchronization">同步数据</el-checkbox>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column type="index" align="center" width="55" />
      <el-table-column prop="merchantName" align="center" min-width="80" label="公司" />
      <el-table-column prop="po" align="center" min-width="120" label="PO号" />
      <el-table-column prop="poDate" align="center" min-width="150" label="PO时间" />
      <el-table-column prop="statusLabel" align="center" min-width="80" label="完结状态" />
      <el-table-column prop="overDate" align="center" min-width="150" label="完结时间" />
      <el-table-column prop="operator" align="center" min-width="80" label="操作人" />
      <el-table-column align="center" width="100" label="操作" fixed="right">
        <template>
          <el-button type="text" @click="successMsg('success')">完结</el-button>
          <el-button type="text">详情</el-button>
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
      // 是否同步数据
      isSynchronization: false,
      // 查询数据
      searchProps: {
        po: '',
        status: ''
      },
      // 表格数据
      tableData: {
        list: [
          {
            merchantId: 1000031,
            merchantName: '健太',
            pageNo: 1,
            pageSize: 10,
            po: '2011090822',
            poDate: '2020-09-10 19:56:18',
            status: '0',
            statusLabel: '未完结'
          }
        ],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 11
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
    }
  }
}
</script>
