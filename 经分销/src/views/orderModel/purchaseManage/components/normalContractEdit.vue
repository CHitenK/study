<template>
  <div class="step-bx">
    <el-form :model="ruleForm" ref="ruleForm">
      <div class="flex-c-c fs-18 mr-t-15">采购订单（C）</div>
      <div class="flex-c-c fs-18 mr-t-5">Purchase Contract</div>
      <el-row :gutter="10" class="fs-14 clr-II mr-t-15">
        <el-col class="mr-b-0" :span="10" >
          <el-form-item label="采购合同编号：" prop="purchaseContractNo" >
           <el-input v-model="ruleForm.purchaseContractNo" style="width: 120%" ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="14">
          <el-form-item label="采购订单号：" prop="purchaseOrderNo" >
            <el-input v-model="ruleForm.purchaseOrderNo" style="width: 120%" ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="10" >
          <span>Purchase contract No.：</span>
          <span style="display: inline-block;">
            <el-form-item label="" prop="purchaseContractNo" >
              <el-input v-model="ruleForm.purchaseContractNo" style="width: 120%" ></el-input>
            </el-form-item>
          </span>
        </el-col>
        <el-col class="mr-b-0" :span="14">
          <span>Purchase order No.：</span>
          <span style="display: inline-block;">
            <el-form-item label="" prop="purchaseOrderNo" >
              <el-input v-model="ruleForm.purchaseOrderNo" style="width: 120%" ></el-input>
            </el-form-item>
          </span>
        </el-col>
        <el-col class="mr-b-0" :span="10" >
          <el-form-item label="甲方：" prop="buyerCnName" >
           <el-input v-model="ruleForm.buyerCnName" style="width: 120%" ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="14">
          <el-form-item label="乙方：" prop="sellerCnName" >
            <el-input v-model="ruleForm.sellerCnName" style="width: 120%" ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="10" >
          <el-form-item label="Buyer：" prop="buyerEnName" >
           <el-input v-model="ruleForm.buyerEnName" style="width: 120%" ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="14">
          <el-form-item label="Seller：" prop="sellerEnName" >
            <el-input v-model="ruleForm.sellerEnName" style="width: 120%" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="fs-14">1、货品明细 Goods details:</div>
      <div class="mr-t-10"></div>
      <JFX-table
        :tableData="tableData"
        :showPagination="false"
        :showSummary="true"
        :summaryMethod="null"
      >
        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
        <el-table-column prop="brandName" label="品牌" align="center" min-width="130" show-overflow-tooltip>
          <template slot="header">
            <div>品牌<br>Brand</div>
          </template>
        </el-table-column>
        <el-table-column prop="goodsName" label="品名" align="center" min-width="130" show-overflow-tooltip >
          <template slot="header">
            <div>品名<br>Goods Description</div>
          </template>
        </el-table-column>
        <el-table-column label="条形码" align="center" min-width="130">
          <template slot="header">
            <div>条形码<br>Bar Code</div>
          </template>
          <template slot-scope="scope">{{scope.row.barcode}}</template>
        </el-table-column>
        <el-table-column label="规格" align="center" min-width="130" show-overflow-tooltip>
          <template slot="header">
            <div>规格<br>Specification</div>
          </template>
          <template slot-scope="scope">{{scope.row.spec}}</template>
        </el-table-column>
        <el-table-column prop="num" label="数量" align="center" min-width="120">
          <template slot="header">
            <div>数量<br>Quantity</div>
          </template>
        </el-table-column>
        <el-table-column label="销售单价" align="center" min-width="120">
          <template slot="header">
            <div>单价({{detail.currency}})<br>Unit Value</div>
          </template>
          <template slot-scope="scope">{{scope.row.price}}</template>
        </el-table-column>
        <el-table-column prop="amount" label="销售总金额" align="center" min-width="120">
          <template slot="header">
            <div>总价({{detail.currency}})<br>Total Value</div>
          </template>
        </el-table-column>
      </JFX-table>
      <div class="fs-14 mr-t-10">2.</div>
      <el-row :gutter="10" class="fs-14 clr-II ot-lisy">
        <el-col class="mr-t-15" :span="24" >
          <el-form-item label="运输方式：" prop="meansOfTransportation" >
            <el-checkbox label="CIF" :value="ruleForm.meansOfTransportation==='CIF'" @change="changeMeansOfTrans">CIF</el-checkbox>
            <el-checkbox label="CFR" :value="ruleForm.meansOfTransportation==='CFR'" @change="changeMeansOfTrans">CFR</el-checkbox>
            <el-checkbox label="FOB" :value="ruleForm.meansOfTransportation==='FOB'" @change="changeMeansOfTrans">FOB</el-checkbox>
            <el-checkbox label="DAP" :value="ruleForm.meansOfTransportation==='DAP'" @change="changeMeansOfTrans">DAP</el-checkbox>
            <el-checkbox label="EXW" :value="ruleForm.meansOfTransportation==='EXW'" @change="changeMeansOfTrans">EXW</el-checkbox>
            <el-checkbox label="BY SEA" :value="ruleForm.meansOfTransportation1==='BY SEA'" @change="changeMeansOfTrans1">海 运</el-checkbox>
            <el-checkbox label="BY AIR" :value="ruleForm.meansOfTransportation1==='BY AIR'" @change="changeMeansOfTrans1">空 运</el-checkbox>
            <el-checkbox label="BY LAND" :value="ruleForm.meansOfTransportation1==='BY LAND'" @change="changeMeansOfTrans1">陆 运</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="fs-14 clr-II ot-lisy">
        <el-col class="mr-b-0 yushu-list" :span="24" >
          <el-form-item label="Means of Transportation：" prop="changeMeansOfTrans1" >
            <el-checkbox label="CIF" :value="ruleForm.meansOfTransportation==='CIF'" @change="changeMeansOfTrans">CIF</el-checkbox>
            <el-checkbox label="CFR" :value="ruleForm.meansOfTransportation==='CFR'" @change="changeMeansOfTrans">CFR</el-checkbox>
            <el-checkbox label="FOB" :value="ruleForm.meansOfTransportation==='FOB'" @change="changeMeansOfTrans">FOB</el-checkbox>
            <el-checkbox label="DAP" :value="ruleForm.meansOfTransportation==='DAP'" @change="changeMeansOfTrans">DAP</el-checkbox>
            <el-checkbox label="EXW" :value="ruleForm.meansOfTransportation==='EXW'" @change="changeMeansOfTrans">EXW</el-checkbox>
            <el-checkbox label="BY SEA" :value="ruleForm.meansOfTransportation1==='BY SEA'" @change="changeMeansOfTrans1">BY SEA</el-checkbox>
            <el-checkbox label="BY AIR" :value="ruleForm.meansOfTransportation1==='BY AIR'" @change="changeMeansOfTrans1">BY AIR</el-checkbox>
            <el-checkbox label="BY LAND" :value="ruleForm.meansOfTransportation1==='BY LAND'" @change="changeMeansOfTrans1">BY LAND</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="fs-14 mr-t-10">3.</div>
      <el-row :gutter="10" class="fs-14 clr-II ot-lisy" v-if="ruleForm.meansOfTransportation === 'DAP'">
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="发货地址：" prop="deliveryAddress" >
            <el-input v-model="ruleForm.deliveryAddress" style="width: 460px" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="Delivery Address：" prop="deliveryAddressEn" >
            <el-input v-model="ruleForm.deliveryAddressEn" style="width: 460px" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="fs-14 clr-II ot-lisy" v-else-if="ruleForm.meansOfTransportation === 'EXW'">
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="提货地址：" prop="pickingUpAddress" >
            <el-input v-model="ruleForm.pickingUpAddress" style="width: 460px" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="Picking up Address：" prop="pickingUpAddressEn" >
            <el-input v-model="ruleForm.pickingUpAddressEn" style="width: 460px" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="fs-14 clr-II ot-lisy" v-else>
        <el-col class="mr-b-0" :span="12" >
          <el-form-item label="始发地（港）：" prop="loadingCnPort" >
            <el-input v-model="ruleForm.loadingCnPort" style="width: 360px" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="12" >
          <el-form-item label="目的地（港）：" prop="destinationdCn" >
            <el-input v-model="ruleForm.destinationdCn" style="width: 360px" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="12" >
          <el-form-item label="Loading Port：" prop="loadingEnPort" >
            <el-input v-model="ruleForm.loadingEnPort" style="width: 360px" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="12" >
          <el-form-item label="Destination：" prop="destinationdEn" >
            <el-input v-model="ruleForm.destinationdEn" style="width: 360px" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="fs-14 mr-t-10">4.</div>
      <el-row :gutter="10" class="fs-14 clr-II ot-lisy" >
        <el-col class="ot-lisy-oy" :span="24" >
          <el-form-item label="交货日期：" prop="deliveryDateStr" >
            <el-date-picker
              v-model="ruleForm.deliveryDateStr"
              type="date"
              value-format="yyyy-MM-dd 00:00:00"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <span class="fs-14 clr-II item-span">&nbsp;&nbsp;&nbsp;(若此交货日期与甲方与最终买方签署的框架采购合同不一致的,以此交货期为准)</span>
        </el-col>
        <el-col class="ot-lisy-oy" :span="24" >
          <el-form-item label="Delivery date：" prop="deliveryEngDate" >
            <el-date-picker
              v-model="ruleForm.deliveryEngDate"
              value-format="yyyy-MM-dd 00:00:00"
              type="date"
              placeholder="Delivery date">
            </el-date-picker>
          </el-form-item>
          <span class="fs-14 clr-II item-span">&nbsp;&nbsp; (If this delivery date is in conflict with the delivery date stipulated in the Purchase Frame Contract signed by the Buyer and the ultimate buyer, this one will prevail.)</span>
        </el-col>
        <el-col class="ot-lisy-oy" :span="24" >
          <el-form-item label="付款方式：" prop="paymentMethod">
            <el-radio v-model="ruleForm.paymentMethod" label="1">一次结清</el-radio>
            <el-radio v-model="ruleForm.paymentMethod" label="2">分批付款</el-radio>
            <el-radio v-model="ruleForm.paymentMethod" label="3">其他</el-radio>
          </el-form-item>
        </el-col>
        <div class="fs-14 mr-t-10">5.</div>
        <el-col class="ot-lisy-oy" :span="24" v-if="ruleForm.paymentMethod === '1'">
          <el-form-item label="付款方式：" >
            <span class="fs-14 clr-II item-span">双方确认本订单之日起</span>
            <el-input-number :precision="0" :controls="false" :min="0" v-model="payData.paymentMethodText"></el-input-number>
          </el-form-item>
          <span class="fs-14 clr-II item-span">个工作日内甲方向乙方支付订单总金额100%货款</span>
        </el-col>
        <el-col class="ot-lisy-oy" :span="24" v-if="ruleForm.paymentMethod === '1'">
          <el-form-item label="Terms of payment：" >
            <span class="fs-14 clr-II item-span">TT 100% within </span>
            <el-input-number v-model="payData.paymentMethodTextEn" :precision="0" :controls="false" :min="0" label="描述文字"></el-input-number>
          </el-form-item>
          <span class="fs-14 clr-II item-span">working days from the date of this order.</span>
        </el-col>
        <el-col class="ot-lisy-oy" :span="24" v-if="ruleForm.paymentMethod === '2'">
          <el-form-item label="付款方式：" >
            <span class="fs-14 clr-II item-span">卖方确认本订单之日起</span>
            <el-input v-model="payData.arr[0]" style="width: 100px" clearable></el-input>
            个工作日内，买方支付订单总金额的
            <el-input v-model="payData.arr[1]" style="width: 100px" clearable></el-input>
            货款：<el-input style="width: 100px" v-model="payData.arr[2]"  clearable></el-input> ，货物到仓后买方验收合格且双方
          </el-form-item>
        </el-col>
        <el-col class="ot-lisy-oy" :span="24" v-if="ruleForm.paymentMethod === '2'">
          <el-form-item label="  "  >
            确认理货数据无误后在 <el-input v-model="payData.arr[3]" style="width: 100px" clearable></el-input>个工作日内支付剩余
            <el-input style="width: 100px" v-model="payData.arr[4]" clearable></el-input>
            货款:<el-input style="width: 100px" v-model="payData.arr[5]" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="ot-lisy-oy" :span="24" v-if="ruleForm.paymentMethod === '2'">
          <el-form-item label="Terms of payment："  >
            <span class="fs-14 clr-II item-span">TT</span>
            <el-input v-model="payData.arrEn[0]" style="width: 60px" clearable></el-input>
            <el-input v-model="payData.arrEn[1]" style="width: 100px" clearable></el-input> within
            <el-input v-model="payData.arrEn[2]" style="width: 100px" clearable></el-input>working days from the date of this order, TT
            <el-input v-model="payData.arrEn[3]" style="width: 60px" clearable></el-input>
            <el-input v-model="payData.arrEn[4]" style="width: 100px" clearable></el-input> within
            <el-input v-model="payData.arrEn[5]" style="width: 100px" clearable></el-input>working days
          </el-form-item>
        </el-col>
        <el-col class="ot-lisy-oy" :span="24" v-if="ruleForm.paymentMethod === '2'">
          <el-form-item label="  " >
            subject to the satisfaction of the following conditions: (1) delivery of goods to the designated warehouse, (2) the quality of goods is satisfied by the buyer after inspection, and (3) both parties’ confirmation on the quantity of delivered goods.
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" v-if="ruleForm.paymentMethod === '3'">
          <el-form-item label="付款方式" >
            <el-input v-model="payData.paymentMethodTextOt" style="width: 460px" type="textarea" :rows="3" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="fs-14 mr-t-5">
        6. 特别约定（本条与本订单约定的内容存在冲突的，以本条约定的为准）：
      </div>
      <el-row :gutter="10" class="fs-14 clr-II ot-lisy mr-t-20">
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="特别约定：" prop="specialAgreement" >
            <el-input v-model="ruleForm.specialAgreement" style="width: 460px" type="textarea" :rows="3" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="12" >
          <el-form-item label="Special agreement：" prop="specialAgreementEn" >
            <el-input v-model="ruleForm.specialAgreementEn" style="width: 460px" type="textarea" :rows="3" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <div class="fs-14 clr-I mr-t-10">7.乙方（供货方）收款账户  Banking information of the seller：</div>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="账号：" prop="accountNo" >
           <el-input v-model="ruleForm.accountNo" style="width: 420px"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="采购币种：" prop="currencyLabel" >
           <el-input v-model="ruleForm.currencyLabel" style="width: 420px" ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="账户：" prop="beneficiaryName" >
           <el-input v-model="ruleForm.beneficiaryName" style="width: 420px" ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="开户行：" prop="beneficiaryBankName" >
           <el-input v-model="ruleForm.beneficiaryBankName" style="width: 420px" ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="地址：" prop="bankAddress" >
           <el-input v-model="ruleForm.bankAddress" style="width: 420px" ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="Swift Code：" prop="swiftCode" >
           <el-input v-model="ruleForm.swiftCode" style="width: 420px"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="Account No：" prop="accountNo" >
           <el-input v-model="ruleForm.accountNo" style="width: 420px"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="Currency：" prop="accountNo" >
           <el-input v-model="ruleForm.accountNo" style="width: 420px"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="Beneficiary Name：" prop="beneficiaryName" >
           <el-input v-model="ruleForm.beneficiaryName" style="width: 420px"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="Beneficiary Bank Name：" prop="beneficiaryBankName" >
           <el-input v-model="ruleForm.beneficiaryBankName" style="width: 420px"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="Bank Address：" prop="bankAddress" >
           <el-input v-model="ruleForm.bankAddress" style="width: 420px"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="Swift Code：" prop="swiftCode" >
           <el-input v-model="ruleForm.swiftCode" style="width: 420px"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-t-30 flex-s" :span="24" >
          <el-form-item label="甲方：" prop="buyerAuthorizedSignature" >
            <el-input v-model="ruleForm.buyerAuthorizedSignature" style="width: 420px"  >
              <span slot="suffix" class="clr-I" style="margin-right: -88px;display: inline-block; width: 100px;">(盖章)</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col style="margin-top: -15px;" :span="24" >
          <el-form-item label="Buyer：" prop="buyerAuthorizedSignatureEn" >
            <el-input v-model="ruleForm.buyerAuthorizedSignatureEn" style="width: 420px"  >
              <span slot="suffix" class="clr-I" style="margin-right: -118px;display: inline-block; width: 100px;">(Common Seal)</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col style="margin-top: -25px;" :span="24" >
          <el-form-item label="授权代表签字：" prop="buyerAuthorizedSignatureEn" ></el-form-item>
        </el-col>
        <el-col style="margin-top: -25px;" :span="24" >
          <el-form-item label="Authorized signature：" prop="buyerAuthorizedSignatureEn" ></el-form-item>
        </el-col>
        <el-col class="mr-t-30 flex-s" :span="24" >
          <el-form-item label="乙方：" prop="sellerAuthorizedSignature" >
            <el-input v-model="ruleForm.sellerAuthorizedSignature" style="width: 420px" >
              <span slot="suffix" class="clr-I" style="margin-right: -88px;display: inline-block; width: 100px;">(盖章)</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col style="margin-top: -15px;" :span="24" >
          <el-form-item label="Seller：" prop="sellerAuthorizedSignatureEn" >
            <el-input v-model="ruleForm.sellerAuthorizedSignatureEn" style="width: 420px"  >
              <span slot="suffix" class="clr-I" style="margin-right: -118px;display: inline-block; width: 100px;">(Common Seal)</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col style="margin-top: -25px;" :span="24" >
          <el-form-item label="授权代表签字：" prop="buyerAuthorizedSignatureEn" ></el-form-item>
        </el-col>
        <el-col style="margin-top: -25px;" :span="24" >
          <el-form-item label="Authorized signature：" prop="buyerAuthorizedSignatureEn" ></el-form-item>
        </el-col>
        <el-col style="margin-top: 20px;" :span="24" >
          <el-form-item label="签订日期：" prop="buyerAuthorizedSignatureEn" ></el-form-item>
        </el-col>
        <el-col style="margin-top: -25px;" :span="24" >
          <el-form-item label="Date：" prop="buyerAuthorizedSignatureEn" ></el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    detail: {
      type: Object,
      defalut: function() {
        return {
          ...this.ruleForm
        }
      }
    }
  },
  data() {
    return {
      ruleForm: {
        purchaseContractNo: '',
        id: '',
        orderId: '',
        buyerCnName: '',
        purchaseOrderNo: '',
        sellerCnName: '',
        sellerEnName: '',
        buyerEnName: '',
        accountNo: '',
        currencyLabel: '',
        beneficiaryName: '',
        beneficiaryBankName: '',
        bankAddress: '',
        swiftCode: '',
        buyerAuthorizedSignature: '',
        buyerAuthorizedSignatureEn: '',
        sellerAuthorizedSignature: '',
        sellerAuthorizedSignatureEn: '',
        // 其他参数
        tradeLinkId: '',
        meansOfTransportation: '',
        meansOfTransportation1: '',
        infoAuditDate: '',
        loadingCnPort: '',
        destinationdCn: '',
        pickingUpAddress: '',
        deliveryAddress: '',
        deliveryAddressEn: '',
        loadingEnPort: '',
        destinationdEn: '',
        deliveryDateStr: '',
        deliveryEngDate: '',
        paymentMethod: '',
        specialAgreement: '',
        specialAgreementEn: '',
        pickingUpAddressEn: ''
      },
      transeLinkVisible: { show: false },
      payData: {
        paymentMethodText: '',
        paymentMethodTextEn: '',
        arr: ['', '', '', '', '', '', ''],
        arrEn: ['', '', '', '', '', '', ''],
        paymentMethodTextOt: ''
      },
      num: '',
      nextLoading: false,
      depotType: '',
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      }
    }
  },
  mounted() {
    for (let key in this.ruleForm) {
      this.ruleForm[key] = this.detail[key] || ''
    }
    this.ruleForm.deliveryDateStr = this.detail.deliveryDate || ''
    // 处理数据
    if (this.detail.meansOfTransportation) {
      if (this.detail.meansOfTransportation.includes(',')) {
        const arr = this.detail.meansOfTransportation.split(',')
        this.ruleForm.meansOfTransportation = arr[0]
        this.ruleForm.meansOfTransportation1 = arr[1]
      } else if (this.detail.meansOfTransportation.includes('BY')) {
        this.ruleForm.meansOfTransportation = ''
        this.ruleForm.meansOfTransportation1 = this.detail.meansOfTransportation
      }
    }
    // 处理支付方式
    if (this.ruleForm.paymentMethod === '1') { // 一次结清
      this.payData.paymentMethodText = this.detail.paymentMethodText || ''
      this.payData.paymentMethodTextEn = this.detail.paymentMethodTextEn || ''
    }
    if (this.ruleForm.paymentMethod === '2') { // 分批付款
      if (this.detail.paymentMethodText) {
        this.payData.arr = this.detail.paymentMethodText.split(';')
      }
      if (this.detail.paymentMethod) {
        this.payData.arrEn = this.detail.paymentMethodTextEn.split(';')
      }
    }
    if (this.ruleForm.paymentMethod === '3') { // 其他
      this.payData.paymentMethodTextOt = this.detail.paymentMethodText
    }
    this.tableData.list = this.detail.goodsList || []
  },
  methods: {
    changeMeansOfTrans(bl, e) {
      this.ruleForm.meansOfTransportation = bl ? e.target.value : ''
      this.ruleForm.loadingCnPort = ''
      this.ruleForm.destinationdCn = ''
      this.ruleForm.deliveryAddress = ''
      this.ruleForm.pickingUpAddress = ''
    },
    changeMeansOfTrans1(bl, e) {
      this.ruleForm.meansOfTransportation1 = bl ? e.target.value : ''
    },
    // 获取提交的数据
    getParms() {
      // 处理运输数据
      let meansOfTransportation = ''
      if (this.ruleForm.meansOfTransportation && this.ruleForm.meansOfTransportation1) {
        meansOfTransportation = this.ruleForm.meansOfTransportation + ',' + this.ruleForm.meansOfTransportation1
      } else if (this.ruleForm.meansOfTransportation) {
        meansOfTransportation = this.ruleForm.meansOfTransportation
      } else if (this.ruleForm.meansOfTransportation1) {
        meansOfTransportation = this.ruleForm.meansOfTransportation1
      }
      const payData = {}
      if (this.ruleForm.paymentMethod === '1') { // 一次结清
        payData.paymentMethodText = this.payData.paymentMethodText
        payData.paymentMethodTextEn = this.payData.paymentMethodTextEn
      }
      if (this.ruleForm.paymentMethod === '2') { // 分批付款
        payData.paymentMethodText = ''
        payData.paymentMethodTextEn = ''
        this.payData.arr.forEach(item => {
          payData.paymentMethodText = payData.paymentMethodText + item + ';'
        })
        this.payData.arrEn.forEach(item => {
          payData.paymentMethodTextEn = payData.paymentMethodTextEn + item + ';'
        })
      }
      if (this.ruleForm.paymentMethod === '3') { // 其他
        payData.paymentMethodText = this.payData.paymentMethodTextOt
      }
      return {
        ...this.ruleForm,
        ...payData,
        meansOfTransportation
      }
    }
  }
}
</script>
<style>
  .step-bx .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 134px;
  }
  .edit-bx .el-form-item--mini.el-form-item{
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
  .step-bx .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
    color: #606266;
    cursor: not-allowed;
  }
  .ot-lisy .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 220px;
  }
</style>
<style lang="scss" scoped>
.yushu-list{
  margin-top: -20px;
}
.ot-lisy-oy{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.item-span{
  display: inline-block;
  margin-top: -15px;
}
.flex-s{
  display: flex;
}
</style>
