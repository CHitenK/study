<template>
  <!-- 退货订单管理 -->
  <div>
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)" style="margin-top: 0px" :showOpenBtn="false">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="outDepotId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.outDepotId"
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
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="计划月份：" prop="time" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                v-model="searchProps.time"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary">导出</el-button>
        <el-button type="primary">导入</el-button>
        <el-button type="primary">删除</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList">
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column type="expand" label="展开">
        <template>
          <el-row :gutter="10">
            <el-col span="4" class="flex-c-c">
              购销A：CNY 1000000
            </el-col>
            <el-col span="5" class="flex-c-c">
              购销B：CNY 1000000
            </el-col>
            <el-col span="5" class="flex-c-c">
              代销：CNY 1000000
            </el-col>
            <el-col span="5" class="flex-c-c">
              POP：CNY 1000000
            </el-col>
            <el-col span="5" class="flex-c-c">
              代发：CNY 1000000
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="code" align="center" label="事业部" />
      <el-table-column prop="outDepotName" align="center" label="销售计划月份" />
      <el-table-column prop="buName" align="center" label="计划金额" />
      <el-table-column prop="merchantName" align="center" label="创建人" />
    </JFX-table>
    <!-- 表格 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      searchProps: {},
      // 表格数据
      tableData: {
        list: [
          {
            children: [{}]
          },
          {
            children: [{}]
          }
        ],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 0
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
