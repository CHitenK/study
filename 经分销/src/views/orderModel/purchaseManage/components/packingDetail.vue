<template>
  <div class="packing-report-bx fs-14 clr-II">
    <el-form :model="ruleForm" ref="ruleForm">
      <div class="mr-t-10 flex-c-c fs-18 clr-I">装箱明细</div>
      <div class="mr-t-20">
        Consignee：{{detail.eAddressee}}
      </div>
      <div class="mr-t-10">
        收货人：{{detail.addressee}}
      </div>
      <div class="mr-t-20"></div>
      <!-- 表格 -->
      <JFX-table
        :tableData.sync="tableData"
        :showPagination="false"
      >
        <el-table-column prop="code" align="center" width="220">
          <template slot="header">
            <p>The torr no.</p>
            <p>托盘号</p>
          </template>
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row.torrNo" clearable style="width: 100%" :readonly="type==='detail'"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="goodsName" align="center" show-overflow-tooltip>
          <template slot="header">
            <p>COMMODITY.</p>
            <p>商品名称</p>
          </template>
        </el-table-column>
        <el-table-column prop="goodsNo" align="center" width="160" >
          <template slot="header">
            <p>Article number</p>
            <p>货号</p>
          </template>
        </el-table-column>
        <el-table-column prop="piecesNum" align="center" width="120" >
          <template slot="header">
            <p>QUANTITY(PCS)</p>
            <p>数量</p>
          </template>
        </el-table-column>
        <el-table-column align="center" width="140" >
          <template slot="header">
            <p>Cartons</p>
            <p>箱数</p>
          </template>
          <template slot-scope="scope">
            <el-input-number v-model.trim="scope.row.cartons" :precision="0" :controls="false" :min="0" style="width: 100%;" :disabled="type==='detail'"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="grossWeight" align="center" width="160" >
          <template slot="header">
            <p>NET WEIGHT（KGS）</p>
            <p>净重</p>
          </template>
        </el-table-column>
        <el-table-column prop="netWeight" align="center" width="180" >
          <template slot="header">
            <p>GROSS WEIGHT（KGS）</p>
            <p>毛重</p>
          </template>
        </el-table-column>
        <el-table-column align="center" width="160" >
          <template slot="header">
            <p>Container No.</p>
            <p>柜号</p>
          </template>
          <template slot-scope="scope">{{scope.row.cabinetNo || '/'}}</template>
        </el-table-column>
      </JFX-table>
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
    },
    type: {
      type: String,
      default: ''
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
      this.tableData.list = this.detail.detailsDTOList || []
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
