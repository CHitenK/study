<template>
  <div class="packing-report-bx fs-14 clr-II">
    <el-form :model="ruleForm" ref="ruleForm">
      <div class="mr-t-10 flex-c-c fs-18 clr-I">原料成分占比</div>
      <div class="mr-t-20"></div>
      <!-- 表格 -->
      <JFX-table
        :tableData.sync="tableData"
        :showPagination="false"
      >
        <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="constituentRatio" label="成分占比" align="center" width="200" show-overflow-tooltip></el-table-column>
      </JFX-table>
      <div class="mr-t-20 fs-14 clr-I">注：本发票通过扫描件方式出具同样具有法律效力。</div>
      <!-- 表格 end-->
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    detail: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      ruleForm: {
        supplierId: ''
      },
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      }
    }
  },
  watch: {
    detail() {
      this.tableData.list = this.detail.itemList || []
    }
  }
}
</script>
<style >
  .packing-report-bx .el-form-item__label{
    width: 180px;
    border: 0;
  }
  .packing-report-bx .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border-color: #E4E7ED;
    color: #C0C4CC;
    cursor: not-allowed;
 }
 .this-form-lable .el-form-item__label{
    width: 250px;
    border: 0;
  }
</style>
<style lang="scss" scoped>
.contract-I{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.jia-tam{
  margin-right: 400px;
}
</style>
