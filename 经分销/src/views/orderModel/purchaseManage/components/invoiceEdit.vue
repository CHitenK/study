<template>
  <div class="invoice-bx">
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
      <div class="mr-t-10 flex-c-c fs-18 clr-I">发票</div>
      <div class="contract-I mr-t-10">
        <div>
          <div style="margin-top: 5px;">
            <el-form-item label="DATE时间：" prop="invoiceDateStr" >
              <el-date-picker
                v-model="ruleForm.invoiceDateStr"
                type="date"
                style="width: 220px"
                value-format="yyyy-MM-dd"
                :readonly="type==='detail'"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </div>
          <div style="margin-top: 5px;">
            <el-form-item label="INVOICE NO发票号：" >
              <el-input :value="detail.invoiceNo" readonly clearable style="width: 220px"></el-input>
            </el-form-item>
          </div>
          <div style="margin-top: 5px;">
            <el-form-item label="CONTRACT NO合同号：">
              <el-input v-model="detail.contractNo" readonly clearable style="width: 220px"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
      <div>
        <el-form-item label="Consignee：" prop="eAddressee" >
          <el-input v-model="ruleForm.eAddressee" clearable style="width: 700px" :readonly="type==='detail'"></el-input>
        </el-form-item>
      </div>
      <div style="margin-top: 5px;">
        <el-form-item label="Address：" prop="eAddresseeAddr" >
          <el-input v-model="ruleForm.eAddresseeAddr" clearable style="width: 700px" :readonly="type==='detail'"></el-input>
        </el-form-item>
      </div>
      <div style="margin-top: 5px;">
        <el-form-item label="收货人：" prop="addressee" >
          <el-input v-model="ruleForm.addressee" clearable style="width: 700px" :readonly="type==='detail'"></el-input>
        </el-form-item>
      </div>
      <div style="margin-top: 5px;">
        <el-form-item label="收货人地址：" prop="addresseeAddr" >
          <el-input v-model="ruleForm.addresseeAddr" clearable style="width: 700px" :readonly="type==='detail'"></el-input>
        </el-form-item>
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
        <el-table-column align="center" width="180" >
          <template slot="header">
            <p>Article number</p>
            <p>货号</p>
          </template>
          <template slot-scope="scope">{{scope.row.goodsNo}}</template>
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
        <el-table-column prop="price" align="center" width="120" >
          <template slot="header">
            <p>UNITY PRICE</p>
            <p>单价（RMB）</p>
          </template>
        </el-table-column>
        <el-table-column prop="amount" align="center" width="120" >
          <template slot="header">
            <p>AMOUNT</p>
            <p>总价（RBM）</p>
          </template>
        </el-table-column>
        <el-table-column prop="merchantName" align="center" show-overflow-toolti >
          <template slot="header">
            原产国
          </template>
          <template slot-scope="scope">{{scope.row.countryName}}</template>
        </el-table-column>
      </JFX-table>
      <!-- 表格 end-->
      <div class="this-form-lable">
        <el-form-item label="1.Shipment before（装船时间）：" prop="shipDateStr" >
          <el-date-picker
            v-model="ruleForm.shipDateStr"
            type="date"
            value-format="yyyy-MM-dd"
            style="width: 460px"
            :readonly="type==='detail'"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </div>
      <div class="this-form-lable" style="margin-top: 5px;">
        <el-form-item label="2.Payment（付款方式）：" prop="payment" >
          <el-input v-model="ruleForm.payment" clearable style="width: 460px" placeholder="请输入内容" :readonly="type==='detail'"></el-input>
        </el-form-item>
      </div>
      <div class="this-form-lable" style="margin-top: 5px;">
        <el-form-item label="3.Packing（包装）：" prop="pack" >
          <el-input v-model="ruleForm.pack" clearable style="width: 460px" placeholder="请输入内容" :readonly="type==='detail'"></el-input>
        </el-form-item>
      </div>
      <div class="this-form-lable" style="margin-top: 5px;">
        <el-form-item label="4.Port of Loading（装货港）：" prop="portLoading" >
          <el-input v-model="ruleForm.portLoading" clearable style="width: 460px" placeholder="请输入内容" :readonly="type==='detail'"></el-input>
        </el-form-item>
      </div>
      <div class="this-form-lable" style="margin-top: 5px;">
        <el-form-item label="5.Port of Discharge（卸货港）：" prop="portDest" >
          <el-input v-model="ruleForm.portDest" clearable style="width: 460px" placeholder="请输入内容" :readonly="type==='detail'"></el-input>
        </el-form-item>
      </div>
      <div class="this-form-lable" style="margin-top: 5px;">
        <el-form-item label="6.Payment RULES（付款条约）：" prop="payRules" >
          <el-input v-model="ruleForm.payRules" clearable style="width: 460px" placeholder="请输入内容" :readonly="type==='detail'"></el-input>
        </el-form-item>
      </div>
      <div class="this-form-lable" style="margin-top: 5px;">
        <el-form-item label="7.Country of Origin（原产国）：" prop="countryOrigin" >
          <el-input v-model="ruleForm.countryOrigin" clearable style="width: 460px" placeholder="请输入内容" :readonly="type==='detail'"></el-input>
        </el-form-item>
      </div>
      <div class="this-form-lable" style="margin-top: 5px;">
        <el-form-item label="8.Shipper（境外发货人）：" prop="shipper" >
          <el-input v-model="ruleForm.shipper" clearable style="width: 460px" placeholder="请输入内容" :readonly="type==='detail'"></el-input>
        </el-form-item>
      </div>
      <div class="this-form-lable" style="margin-top: 5px;">
        <el-form-item label="9.Marks and Numbers（唛头）：" prop="mark" >
          <el-input v-model="ruleForm.mark" clearable style="width: 460px" placeholder="请输入内容" :readonly="type==='detail'"></el-input>
        </el-form-item>
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
        eAddressee: '',
        invoiceDateStr: '',
        eAddresseeAddr: '',
        addressee: '',
        addresseeAddr: '',
        shipDateStr: '',
        payment: '',
        pack: '',
        portLoading: '',
        portDest: '',
        payRules: '',
        countryOrigin: '',
        shipper: '',
        mark: ''
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
  }
}
</script>
<style >
  .invoice-bx .el-form-item__label{
    width: 180px;
    border: 0;
  }
  .invoice-bx .el-input.is-disabled .el-input__inner {
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
