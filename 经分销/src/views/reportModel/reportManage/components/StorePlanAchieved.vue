<template>
  <!-- PO完结组件 -->
  <div class="page-bx bgc-w" style="padding-top: 0;">
    <!-- 搜索面板 -->
    <JFX-search-panel @reset="reset('searchForm')" @search="getList(1)" :showOpenBtn="false" style="margin-top: 0;">
      <el-form :model="searchProps" ref="searchForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" class="search-panel-item fs-14 clr-II" >
              <el-select
                v-model="searchProps.buId"
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
            <el-form-item label="统计时间：" prop="month" class="search-panel-item fs-14 clr-II" >
              <el-date-picker
                v-model="searchProps.month"
                type="month"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="商品名称：" prop="goodsName" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.goodsName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="标准条码：" prop="commbarcode" class="search-panel-item fs-14 clr-II" >
              <el-input v-model="searchProps.commbarcode" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JFX-search-panel>
    <!-- 搜索面板 end -->
    <!-- 操作 -->
    <el-row class="mr-t-20 mr-b-20">
      <el-col :span="24">
        <el-button type="primary" @click="$successMsg('success')">导出</el-button>
        <el-button type="primary" @click="$successMsg('success')">刷新</el-button>
      </el-col>
    </el-row>
    <!-- 操作 end -->
    <!-- 表格 -->
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
      <el-table-column prop="buName" align="center" min-width="120" label="事业部" />
      <el-table-column prop="month" align="center" min-width="80" label="归属月份" />
      <el-table-column prop="commbarcode" align="center" min-width="130" label="标准条码" />
      <el-table-column prop="goodsName" align="center" min-width="150" label="商品名称" />
      <el-table-column prop="brandParent" align="center" min-width="80" label="标准品牌" />
      <el-table-column prop="brandParent" align="center" min-width="150" label="卓烨淘分销 / 完成率" />
      <el-table-column prop="brandParent" align="center" min-width="150" label="天猫2012071832 / 完成率" />
      <el-table-column prop="brandParent" align="center" min-width="150" label="美赞臣D2O / 完成率" />
      <el-table-column prop="brandParent" align="center" min-width="150" label="美赞臣DSC / 完成率" />
      <el-table-column prop="brandParent" align="center" min-width="150" label="美赞臣卓烨海外专卖店 / 完成率" />
      <el-table-column prop="brandParent" align="center" min-width="120" label="其他 / 完成率" />
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
        buId: '',
        month: '',
        goodsName: '',
        commbarcode: ''
      },
      // 表格数据
      tableData: {
        list: [
          {
            begin: 0,
            brandParent: '德爱',
            buId: 10,
            buName: '元森泰事业部E',
            commbarcode: '00648260456368',
            end: 10,
            goodsName: 'Ameri-Vita亚美唯他柑橘果萃片',
            month: '2020-11',
            num: 63,
            pageNo: 1,
            pageSize: 10,
            rate: 0.029,
            toBNum: 43,
            toBRate: 0.022,
            toCNum: 20,
            toCRate: 0.1,
            total: 0,
            type: '1',
            typeLabel: '销售类型'
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
