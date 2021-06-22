<template>
  <div class="packing-report-bx fs-14 clr-II">
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
      <div class="mr-t-10 flex-c-c fs-18 clr-I">装箱单</div>
      <div class="contract-I mr-t-10">
        <div>
          <div style="margin-top: 5px;">
            <el-form-item label="DATE时间：" >
              <el-input :value="detail.invoiceDate ? detail.invoiceDate.substring(0, 10) : ''" readonly style="width: 220px"></el-input>
            </el-form-item>
          </div>
          <div style="margin-top: 5px;">
            <el-form-item label="INVOICE NO发票号：" prop="supplierId" >
              <el-input :value="detail.invoiceNo" readonly style="width: 220px"></el-input>
            </el-form-item>
          </div>
          <div style="margin-top: 5px;">
            <el-form-item label="CONTRACT NO合同号：" prop="supplierId" >
              <el-input :value="detail.contractNo" readonly  style="width: 220px"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="mr-t-10">
        Consignee：{{detail.eAddressee}}
      </div>
      <div class="mr-t-10">
        Address：{{detail.eAddresseeAddr}}
      </div>
      <div class="mr-t-10">
        收货人：{{detail.addressee}}
      </div>
      <div class="mr-t-10">
        收货人地址：{{detail.addresseeAddr}}
      </div>
      <div class="mr-t-20"></div>
      <!-- 表格 -->
      <JFX-table
        :tableData.sync="tableData"
        :showPagination="false"
      >
        <el-table-column prop="goodsName" align="center" show-overflow-tooltip>
          <template slot="header">
            <p>COMMODITY.</p>
            <p>商品名称</p>
          </template>
        </el-table-column>
        <el-table-column prop="goodsSpec" align="center" width="120" >
          <template slot="header">
            <p>Specifications</p>
            <p>规格</p>
          </template>
        </el-table-column>
        <el-table-column prop="goodsNo" align="center" width="180" >
          <template slot="header">
            <p>Article number</p>
            <p>货号</p>
          </template>
        </el-table-column>
        <el-table-column align="center" width="120" >
          <template slot="header">
            <p>Unit</p>
            <p>单位</p>
          </template>
          <template slot-scope="scope">{{scope.row.unit}}</template>
        </el-table-column>
        <el-table-column prop="num" align="center" width="120" >
          <template slot="header">
            <p>QUANTITY( PCS )</p>
            <p>数量</p>
          </template>
        </el-table-column>
        <el-table-column prop="grossWeight" align="center" width="180" >
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
      </JFX-table>
      <!-- 表格 end-->
      <div class="mr-t-10">
        1.Shipment before（装船时间）：{{detail.addresseeAddr}}
      </div>
      <div class="mr-t-10">
        2.Payment（付款方式）：{{detail.payment}}
      </div>
      <div class="mr-t-10">
        3.Packing（包装）：{{detail.pack}}
      </div>
      <div class="mr-t-10">
        4.Port of Loading（装货港）：{{detail.portLoading}}
      </div>
      <div class="mr-t-10">
        5.Port of Discharge（卸货港）：{{detail.portDest}}
      </div>
      <div class="mr-t-10">
        6.Payment RULES（付款条约）：{{detail.payRules}}
      </div>
      <div class="mr-t-10">
        7.Country of Origin（原产国）：{{detail.countryOrigin}}
      </div>
      <div class="mr-t-10">
        8.Shipper（境外发货人）：{{detail.shipper}}
      </div>
      <div class="mr-t-10">
        9.Marks and Numbers（唛头）：{{detail.mark}}
      </div>
      <div class="mr-t-20 fs-14 clr-I">注：本发票通过扫描件方式出具同样具有法律效力。</div>
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
      },
      rules: {}
    }
  },
  watch: {
    detail() {
      this.tableData.list = this.detail.itemList || []
    }
  },
  methods: {
    handleClick() {}
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
