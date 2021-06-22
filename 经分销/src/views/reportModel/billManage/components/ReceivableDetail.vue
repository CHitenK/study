<template>
  <!-- 应收总汇组件 -->
  <div class="page-bx bgc-w">
    <el-row type="flex" justify="center" class="clr-II fs-24 mr-b-20">2021年01月香港栩桥贸易有限公司应收账单</el-row>
    <el-row type="flex" justify="space-between" class="mr-b-20" style="color: #0000ff;">
      <el-col>事业部：元森泰事业部E</el-col>
      <el-col style="text-align: right;">账单创建日期： 2021-01-21 11:52:38</el-col>
    </el-row>
    <el-row :gutter="10" class="fs-14 clr-II mr-b-20">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="mr-b-15">
        账期： 信用账期-40天
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="mr-b-15">
        开票日期：
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="mr-b-15">
        结算总额： -354.34
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="mr-b-15">
        结算币种： CNY
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="mr-b-15">
        已回款： 0
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="mr-b-15">
        未回款： -354.34
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="应收明细" name="1">
        <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
          <el-table-column prop="merchantName" align="center" min-width="80" label="项目" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="PO号" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="平台SKU编码" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="标准条码" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="商品货号" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="商品名称" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="数量" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="结算金额" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="系统业务单号" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="母品牌" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="NC收支费项" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="科目名称" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="发票描述" />
        </JFX-table>
      </el-tab-pane>
      <el-tab-pane label="费用明细" name="2">
        <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" class="mr-t-20" >
          <el-table-column prop="merchantName" align="center" min-width="80" label="费用类型" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="PO号" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="商品货号" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="标准条码" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="商品名称" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="类型" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="数量" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="费用金额" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="母品牌" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="NC收支费项" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="科目名称" />
          <el-table-column prop="merchantName" align="center" min-width="80" label="发票描述" />
        </JFX-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 表格 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      pureTableData: {},
      activeName: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  margin-bottom: 40px;
  border: 1px solid #cbcbcb;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  color: #666;
  td {
    border-left: 1px solid #cbcbcb;
    border-bottom: 1px solid #cbcbcb;
    padding: 8px 0;
  }
}
</style>
