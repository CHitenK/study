<template>
  <div class="step-bx">
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" >
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
              <el-input v-model="ruleForm.purchaseContractNo" style="width: 120%" readonly></el-input>
            </el-form-item>
          </span>
        </el-col>
        <el-col class="mr-b-0" :span="14">
          <span>Purchase order No.：</span>
          <span style="display: inline-block;">
            <el-form-item label="" prop="purchaseOrderNo" >
              <el-input v-model="ruleForm.purchaseOrderNo" style="width: 120%" readonly></el-input>
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
            <div>单价()<br>Unit Value</div>
          </template>
          <template slot-scope="scope">{{scope.row.price}}</template>
        </el-table-column>
        <el-table-column prop="amount" label="销售总金额" align="center" min-width="120">
          <template slot="header">
            <div>总价()<br>Total Value</div>
          </template>
        </el-table-column>
      </JFX-table>
      <div class="fs-14 mr-t-10">2.</div>
      <el-row :gutter="10" class="fs-14 clr-II ot-lisy">
        <el-col class="mr-t-15" :span="24" >
          <el-form-item label="运输方式：" prop="conMeansOfTransportation" >
            <el-checkbox label="CIF" :value="ruleForm.conMeansOfTransportation==='CIF'" @change="changeMeansOfTrans">CIF</el-checkbox>
            <el-checkbox label="CFR" :value="ruleForm.conMeansOfTransportation==='CFR'" @change="changeMeansOfTrans">CFR</el-checkbox>
            <el-checkbox label="FOB" :value="ruleForm.conMeansOfTransportation==='FOB'" @change="changeMeansOfTrans">FOB</el-checkbox>
            <el-checkbox label="DAP" :value="ruleForm.conMeansOfTransportation==='DAP'" @change="changeMeansOfTrans">DAP</el-checkbox>
            <el-checkbox label="EXW" :value="ruleForm.conMeansOfTransportation==='EXW'" @change="changeMeansOfTrans">EXW</el-checkbox>
            <el-checkbox label="BY SEA" :value="ruleForm.conMeansOfTransportation1==='BY SEA'" @change="changeMeansOfTrans1">海 运</el-checkbox>
            <el-checkbox label="BY AIR" :value="ruleForm.conMeansOfTransportation1==='BY AIR'" @change="changeMeansOfTrans1">空 运</el-checkbox>
            <el-checkbox label="BY LAND" :value="ruleForm.conMeansOfTransportation1==='BY LAND'" @change="changeMeansOfTrans1">陆 运</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="fs-14 clr-II ot-lisy">
        <el-col class="mr-b-0 yushu-list" :span="24" >
          <el-form-item label="Means of Transportation：" prop="changeMeansOfTrans1" >
            <el-checkbox label="CIF" :value="ruleForm.conMeansOfTransportation==='CIF'" @change="changeMeansOfTrans">CIF</el-checkbox>
            <el-checkbox label="CFR" :value="ruleForm.conMeansOfTransportation==='CFR'" @change="changeMeansOfTrans">CFR</el-checkbox>
            <el-checkbox label="FOB" :value="ruleForm.conMeansOfTransportation==='FOB'" @change="changeMeansOfTrans">FOB</el-checkbox>
            <el-checkbox label="DAP" :value="ruleForm.conMeansOfTransportation==='DAP'" @change="changeMeansOfTrans">DAP</el-checkbox>
            <el-checkbox label="EXW" :value="ruleForm.conMeansOfTransportation==='EXW'" @change="changeMeansOfTrans">EXW</el-checkbox>
            <el-checkbox label="BY SEA" :value="ruleForm.conMeansOfTransportation1==='BY SEA'" @change="changeMeansOfTrans1">BY SEA</el-checkbox>
            <el-checkbox label="BY AIR" :value="ruleForm.conMeansOfTransportation1==='BY AIR'" @change="changeMeansOfTrans1">BY AIR</el-checkbox>
            <el-checkbox label="BY LAND" :value="ruleForm.conMeansOfTransportation1==='BY LAND'" @change="changeMeansOfTrans1">BY LAND</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="fs-14 mr-t-10">3.</div>
      <el-row :gutter="10" class="fs-14 clr-II ot-lisy" v-if="ruleForm.conMeansOfTransportation === 'DAP'">
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="发货地址：" prop="conDeliveryAddress" >
            <el-input v-model="ruleForm.conDeliveryAddress" style="width: 460px" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="Delivery Address：" prop="conDeliveryAddressEn" >
            <el-input v-model="ruleForm.conDeliveryAddressEn" style="width: 460px" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="fs-14 clr-II ot-lisy" v-if="ruleForm.conMeansOfTransportation === 'EXW'">
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="提货地址：" prop="conPickingUpAddress" >
            <el-input v-model="ruleForm.conPickingUpAddress" style="width: 460px" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="Picking up Address：" prop="conPickingUpAddressEn" >
            <el-input v-model="ruleForm.conPickingUpAddressEn" style="width: 460px" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="fs-14 clr-II ot-lisy" v-if="['CIF', 'CFR', 'FOB'].includes(ruleForm.conMeansOfTransportation)">
        <el-col class="mr-b-0" :span="12" >
          <el-form-item label="始发地（港）：" prop="conLoadingCnPort" >
            <el-input v-model="ruleForm.conLoadingCnPort" style="width: 360px" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="12" >
          <el-form-item label="目的地（港）：" prop="conDestinationdCn" >
            <el-input v-model="ruleForm.conDestinationdCn" style="width: 360px" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="12" >
          <el-form-item label="Loading Port：" prop="conLoadingEnPort" >
            <el-input v-model="ruleForm.conLoadingEnPort" style="width: 360px" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="12" >
          <el-form-item label="Destination：" prop="conDestinationdEn" >
            <el-input v-model="ruleForm.conDestinationdEn" style="width: 360px" clearable></el-input>
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
              type="date"
              placeholder="Delivery date">
            </el-date-picker>
          </el-form-item>
          <span class="fs-14 clr-II item-span">&nbsp;&nbsp; (If this delivery date is in conflict with the delivery date stipulated in the Purchase Frame Contract signed by the Buyer and the ultimate buyer, this one will prevail.)</span>
        </el-col>
        <el-col class="ot-lisy-oy" :span="24" >
          <el-form-item label="付款方式：" prop="conPaymentMethod">
            <el-radio v-model="ruleForm.conPaymentMethod" label="1">一次结清</el-radio>
            <el-radio v-model="ruleForm.conPaymentMethod" label="2">分批付款</el-radio>
            <el-radio v-model="ruleForm.conPaymentMethod" label="3">其他</el-radio>
          </el-form-item>
        </el-col>
        <div class="fs-14 mr-t-10">5.</div>
        <el-col class="ot-lisy-oy" :span="24" v-if="ruleForm.conPaymentMethod === '1'">
          <el-form-item label="付款方式：" >
            <span class="fs-14 clr-II item-span">双方确认本订单之日起</span>
            <el-input-number :precision="0" :controls="false" :min="0" v-model="payData.paymentMethodText"></el-input-number>
          </el-form-item>
          <span class="fs-14 clr-II item-span">个工作日内甲方向乙方支付订单总金额100%货款</span>
        </el-col>
        <el-col class="ot-lisy-oy" :span="24" v-if="ruleForm.conPaymentMethod === '1'">
          <el-form-item label="Terms of payment：" >
            <span class="fs-14 clr-II item-span">TT 100% within </span>
            <el-input-number v-model="payData.paymentMethodTextEn" :precision="0" :controls="false" :min="0" label="描述文字"></el-input-number>
          </el-form-item>
          <span class="fs-14 clr-II item-span">working days from the date of this order.</span>
        </el-col>
        <el-col class="ot-lisy-oy" :span="24" v-if="ruleForm.conPaymentMethod === '2'">
          <el-form-item label="付款方式：" >
            <span class="fs-14 clr-II item-span">卖方确认本订单之日起</span>
            <el-input v-model="payData.arr[0]" style="width: 100px" clearable></el-input>
            个工作日内，买方支付订单总金额的
            <el-input v-model="payData.arr[1]" style="width: 100px" clearable></el-input>
            货款：<el-input style="width: 100px" v-model="payData.arr[2]"  clearable></el-input> ，货物到仓后买方验收合格且双方
          </el-form-item>
        </el-col>
        <el-col class="ot-lisy-oy" :span="24" v-if="ruleForm.conPaymentMethod === '2'">
          <el-form-item label="  "  >
            确认理货数据无误后在 <el-input v-model="payData.arr[3]" style="width: 100px" clearable></el-input>个工作日内支付剩余
            <el-input style="width: 100px" v-model="payData.arr[4]" clearable></el-input>
            货款:<el-input style="width: 100px" v-model="payData.arr[5]" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="ot-lisy-oy" :span="24" v-if="ruleForm.conPaymentMethod === '2'">
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
        <el-col class="ot-lisy-oy" :span="24" v-if="ruleForm.conPaymentMethod === '2'">
          <el-form-item label="  " >
            subject to the satisfaction of the following conditions: (1) delivery of goods to the designated warehouse, (2) the quality of goods is satisfied by the buyer after inspection, and (3) both parties’ confirmation on the quantity of delivered goods.
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" v-if="ruleForm.conPaymentMethod === '3'">
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
          <el-form-item label="特别约定：" prop="conSpecialAgreement" >
            <el-input v-model="ruleForm.conSpecialAgreement" style="width: 460px" type="textarea" :rows="3" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="12" >
          <el-form-item label="Special agreement：" prop="conSpecialAgreementEn" >
            <el-input v-model="ruleForm.conSpecialAgreementEn" style="width: 460px" type="textarea" :rows="3" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <div class="fs-14 clr-I mr-t-10">7.乙方（供货方）收款账户  Banking information of the seller：</div>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="账号：" prop="accountNo" >
           <el-input v-model="ruleForm.accountNo" style="width: 180%" readonly ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="采购币种：" prop="currencyLabel" >
           <el-input v-model="ruleForm.currencyLabel" style="width: 180%" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="账户：" prop="beneficiaryName" >
           <el-input v-model="ruleForm.beneficiaryName" style="width: 180%" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="开户行：" prop="beneficiaryBankName" >
           <el-input v-model="ruleForm.beneficiaryBankName" style="width: 180%" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="地址：" prop="bankAddress" >
           <el-input v-model="ruleForm.bankAddress" style="width: 180%" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="Swift Code：" prop="swiftCode" >
           <el-input v-model="ruleForm.swiftCode" style="width: 180%" readonly ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="Account No：" prop="accountNo" >
           <el-input v-model="ruleForm.accountNo" style="width: 180%" readonly ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="Currency：" prop="accountNo" >
           <el-input v-model="ruleForm.accountNo" style="width: 180%" readonly ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="Beneficiary Name：" prop="beneficiaryName" >
           <el-input v-model="ruleForm.beneficiaryName" style="width: 180%" readonly ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="Beneficiary Bank Name：" prop="beneficiaryBankName" >
           <el-input v-model="ruleForm.beneficiaryBankName" style="width: 180%" readonly ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="Bank Address：" prop="bankAddress" >
           <el-input v-model="ruleForm.bankAddress" style="width: 180%" readonly ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :span="24" >
          <el-form-item label="Swift Code：" prop="swiftCode" >
           <el-input v-model="ruleForm.swiftCode" style="width: 180%" readonly ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-t-30 flex-s" :span="24" >
          <el-form-item label="甲方：" prop="buyerAuthorizedSignature" >
            <el-input v-model="ruleForm.buyerAuthorizedSignature" style="width: 180%" readonly >
              <span slot="suffix" class="clr-I" style="margin-right: -88px;display: inline-block; width: 100px;">(盖章)</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col style="margin-top: -15px;" :span="24" >
          <el-form-item label="Buyer：" prop="buyerAuthorizedSignatureEn" >
            <el-input v-model="ruleForm.buyerAuthorizedSignatureEn" style="width: 180%" readonly >
              <span slot="suffix" class="clr-I" style="margin-right: -118px;display: inline-block; width: 100px;">(Common Seal)</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col style="margin-top: -10px;" :span="24" >
          <el-form-item label="授权代表签字：" prop="buyerAuthorizedSignatureEn" ></el-form-item>
        </el-col>
        <el-col style="margin-top: -15px;" :span="24" >
          <el-form-item label="Authorized signature：" prop="buyerAuthorizedSignatureEn" ></el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- title -->
    <div class="mr-t-20 flex-c-c">
      <el-button :size="'small'" @click="cancel">取消</el-button>
      <el-button type="primary" :size="'small'" @click="nextTo" :loading="nextLoading" >下一步</el-button>
    </div>
  </div>
</template>
<script>
import commomMix from '@m/index'
import { toSaleStepOnePage, saveOrUpdateLinkStepOne, backToSaleStepOnePage } from '@a/purchaseManage/index'
import { getCustomerById } from '@a/base/index'
import { getDepotDetails } from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  props: {
    targetId: {
      type: String,
      default: ''
    },
    tradeLinkId: {
      type: String,
      default: ''
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
        buyerEnName: '',
        accountNo: '',
        currencyLabel: '',
        beneficiaryName: '',
        beneficiaryBankName: '',
        bankAddress: '',
        swiftCode: '',
        buyerAuthorizedSignature: '',
        buyerAuthorizedSignatureEn: '',
        // 其他参数
        tradeLinkId: '',
        purchaseOrderId: '',
        purchaseOrderCode: '',
        conMeansOfTransportation: '',
        conMeansOfTransportation1: '',
        infoAuditDate: '',
        infoCurrencyLabel: '',
        infoCurrency: '',
        infoBusinessModel: '',
        infoUnloadPort: '',
        infoLoadPort: '',
        infoShipDate: '',
        infoTransport: '',
        infoCarrier: '',
        infoTrainNumber: '',
        infoStandardCaseTeu: '',
        infoTorrNum: '',
        infoLbxNo: '',
        infoLadingBill: '',
        infoGrossWeight: '',
        conLoadingCnPort: '',
        conDestinationdCn: '',
        conPickingUpAddress: '',
        conDeliveryAddress: '',
        conDeliveryAddressEn: '',
        conLoadingEnPort: '',
        conDestinationdEn: '',
        deliveryDateStr: '',
        deliveryEngDate: '',
        conPaymentMethod: '',
        conSpecialAgreement: '',
        conSpecialAgreementEn: '',
        conPickingUpAddressEn: ''
      },
      transeLinkVisible: { show: false },
      rules: {
        commomRule: {required: false, message: '不能为空', trigger: 'change'},
        depotId: {required: true, message: '仓库不能为空', trigger: 'change'},
        poNo: {required: true, message: 'po号不能为空', trigger: 'blur'},
        oneDepotId: {required: false, message: '仓库不能为空', trigger: 'change'},
        infoAuditDate: {required: true, message: '归属日期不能为空', trigger: 'change'},
        infoCurrencyLabel: {required: true, message: '交易币种不能为空', trigger: 'change'},
        infoBusinessModel: {required: true, message: '业务模式不能为空', trigger: 'change'},
        infoTransport: {required: false, message: '运输方式不能为空', trigger: 'change'},
        infoTorrNum: {required: false, message: '运输方式不能为空', trigger: 'change'},
        infoLoadPort: {required: false, message: '装货港不能为空', trigger: 'blur'},
        infoUnloadPort: {required: false, message: '卸货港不能为空', trigger: 'blur'},
        infoCarrier: {required: false, message: '承运商不能为空', trigger: 'blur'}
      },
      payData: {
        paymentMethodText: '',
        paymentMethodTextEn: '',
        arr: ['', '', '', '', '', '', ''],
        arrEn: ['', '', '', '', '', '', ''],
        paymentMethodTextOt: ''
      },
      detail: {},
      num: '',
      infoBusinessModelOpt: [
        { key: '1', value: '购销-整批结算' },
        { key: '4', value: '购销-实销实结' },
        { key: '0', value: '购销-预售订单' },
        { key: '3', value: '采销执行' }
      ],
      nextLoading: false,
      depotType: ''
    }
  },
  watch: {
    depotType(val) {
      this.rules.infoTransport.required = val !== 'd'
      this.rules.infoTorrNum.required = val !== 'd'
      this.rules.infoLoadPort.required = val !== 'd'
      this.rules.infoUnloadPort.required = val !== 'd'
      this.rules.infoCarrier.required = val !== 'd'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    changeMeansOfTrans(bl, e) {
      this.ruleForm.conMeansOfTransportation = bl ? e.target.value : ''
      this.ruleForm.conLoadingCnPort = ''
      this.ruleForm.conDestinationdCn = ''
      this.ruleForm.conDeliveryAddress = ''
      this.ruleForm.conPickingUpAddress = ''
    },
    changeMeansOfTrans1(bl, e) {
      this.ruleForm.conMeansOfTransportation1 = bl ? e.target.value : ''
    },
    // 点击下一步
    nextTo() {
      if (!this.ruleForm.tradeLinkId) {
        this.$errorMsg('请选择交易链路')
        return false
      }
      this.$refs['ruleForm'].validate(async(valid) => {
        if (!valid) return false
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
        this.nextLoading = true
        try {
          // 处理运输方式
          let conMeansOfTransportation = ''
          if (this.ruleForm.conMeansOfTransportation && this.ruleForm.conMeansOfTransportation1) {
            conMeansOfTransportation = this.ruleForm.conMeansOfTransportation + ',' + this.ruleForm.conMeansOfTransportation1
          } else if (this.ruleForm.conMeansOfTransportation) {
            conMeansOfTransportation = this.ruleForm.conMeansOfTransportation
          } else if (this.ruleForm.conMeansOfTransportation1) {
            conMeansOfTransportation = this.ruleForm.conMeansOfTransportation1
          }
          const opt = { ...this.ruleForm, ...payData, conMeansOfTransportation }
          const res = await saveOrUpdateLinkStepOne(opt)
          this.$successMsg('操作成功')
          this.$emit('setAct', { step: 1, tradeLinkId: res.data })
        } catch (error) {
          console.log(error)
        }
        this.nextLoading = false
      })
    },
    async init() {
      const { query } = this.$route
      if (!query.id) return false
      const purchaseTradeLinkId = this.tradeLinkId
      try {
        let res = {}
        if (purchaseTradeLinkId) {
          res = await backToSaleStepOnePage({ id: query.id, purchaseTradeLinkId })
        } else {
          res = await toSaleStepOnePage({ id: query.id }) // // 正常请求数的接口
        }
        this.detail = res.data
        this.depotType = res.data.depotType || ''
        for (const key in this.ruleForm) {
          this.ruleForm[key] = this.detail[key] ? this.detail[key] + '' : ''
        }
        // 处理运输方式
        if (this.detail.conMeansOfTransportation) {
          if (this.detail.conMeansOfTransportation.includes(',')) {
            const arr = this.detail.conMeansOfTransportation.split(',')
            this.ruleForm.conMeansOfTransportation = arr[0]
            this.ruleForm.conMeansOfTransportation1 = arr[1]
          } else if (this.detail.conMeansOfTransportation.includes('BY')) {
            this.ruleForm.conMeansOfTransportation = ''
            this.ruleForm.conMeansOfTransportation1 = this.detail.conMeansOfTransportation
          }
        }
        this.handleData()
      } catch (error) {
        console.log(error)
      }
    },
    // 处理数据
    async handleData() {
      let depotType = 'a,b,c,d,e,f,g'
      if (+this.detail.infoBusinessModel === 3) depotType = 'd'
      if (this.detail.startPointMerchantName) {
        this.getSelectBeanByMerchantRel('cangkuList1', { type: depotType, merchantId: this.detail.startPointMerchantId || '' })
      }
      let oneCustomerJson = {}
      let oneCustomerId = null
      if (this.detail.oneCustomerName) {
        if (+this.detail.oneType === 1) {
          this.rules.oneDepotId.required = true
          oneCustomerId = this.detail.oneCustomerId
          let tempMerchantId = oneCustomerId
          if (+this.detail.oneIdValueType === 1) {
            const res = await getCustomerById({ id: oneCustomerId })
            oneCustomerJson = res.data
            tempMerchantId = res.data.innerMerchantId
          }
          this.getSelectBeanByMerchantRel('oneCangKuList', { type: depotType, merchantId: tempMerchantId || '' })
        } else {
          this.getSelectBeanByMerchantRel('oneCangKuList', { type: 'b', merchantId: this.detail.startPointMerchantId })
        }
      }
      let twoCustomerJson = {}
      let twoCustomerId = null
      if (this.detail.twoCustomerName) {
        if (+this.detail.twoType === 1) {
          twoCustomerId = this.detail.twoCustomerId
          let tempMerchantId = twoCustomerId
          if (+this.detail.twoIdValueType === 1) {
            const res = await getCustomerById({ id: twoCustomerId })
            twoCustomerJson = res.data
            tempMerchantId = res.data.innerMerchantId
          }
          this.getSelectBeanByMerchantRel('twoCangKuList', { type: depotType, merchantId: tempMerchantId || '' })
        } else {
          this.getSelectBeanByMerchantRel('twoCangKuList', { type: 'b', merchantId: oneCustomerJson.innerMerchantId || oneCustomerId })
        }
      }
      let threeCustomerJson = {}
      let threeCustomerId = null
      if (this.detail.threeCustomerName) {
        if (+this.detail.threeType === 1) {
          threeCustomerId = this.detail.threeCustomerId
          let tempMerchantId = threeCustomerId
          if (+this.detail.threeIdValueType === 1) {
            const res = await getCustomerById({ id: threeCustomerId })
            threeCustomerJson = res.data
            tempMerchantId = res.data.innerMerchantId
          }
          this.getSelectBeanByMerchantRel('threeCangKuList', { type: depotType, merchantId: tempMerchantId || '' })
        } else {
          this.getSelectBeanByMerchantRel('threeCangKuList', { type: 'b', merchantId: twoCustomerJson.innerMerchantId || twoCustomerId })
        }
      }
      let fourCustomerId = null
      if (this.detail.fourCustomerName) {
        if (+this.detail.fourType === 1) {
          fourCustomerId = this.detail.fourCustomerId
          let tempMerchantId = fourCustomerId
          if (+this.detail.fourIdValueType === 1) {
            const res = await getCustomerById({ id: fourCustomerId })
            tempMerchantId = res.data.innerMerchantId
          }
          this.getSelectBeanByMerchantRel('fourCangKuList', { type: depotType, merchantId: tempMerchantId || '' })
        } else {
          this.getSelectBeanByMerchantRel('fourCangKuList', { type: 'b', merchantId: threeCustomerJson.innerMerchantId || threeCustomerId })
        }
      }
    },
    // 选择交易链路
    async choseLink(data) {
      const { infoBusinessModel } = this.ruleForm
      const businessModel = infoBusinessModel
      this.ruleForm.tradeLinkId = data.id
      // 起始公司
      this.ruleForm.startPointMerchantName = data.startPointMerchantName || ''
      this.ruleForm.startPointBuName = data.startPointBuName || ''
      this.ruleForm.startPointPremiumRate = data.startPointPremiumRate || ''
      this.ruleForm.startPointDepotId = ''
      if (data.startPointMerchantName) {
        delete this.selectOpt.cangkuList1
        const depotType = +businessModel === 3 ? 'd' : 'a,d'
        this.getSelectBeanByMerchantRel('cangkuList1', { type: depotType, merchantId: data.startPointMerchantId || '' })
      }
      // 客户1
      this.ruleForm.oneCustomerName = data.oneCustomerName || ''
      this.ruleForm.oneBuName = data.oneBuName || ''
      this.ruleForm.onePremiumRate = data.onePremiumRate || ''
      this.ruleForm.oneDepotId = ''
      this.detail.oneType = data.oneType || ''
      delete this.selectOpt.oneCangKuList
      /**
      1、若对应该级客户是内部公司，必填
      *1）、若该级不是末级，则取该公司关联的中转仓
      *2）、若该级是末级、则取该公司关联的中转仓、保税仓
      *2、若对应该级客户是不是内部公司，非必填，取上级客户关联的备查库
      */
      let oneCustomerJson = {}
      if (this.ruleForm.oneCustomerName) {
        if (+data.oneType === 1) {
          if (+data.oneIdvaluetype === 1) {
            const res = await getCustomerById({ id: data.oneCustomerId || '' })
            oneCustomerJson = res.data
            console.log('one', oneCustomerJson.innerMerchantId)
          }
          const depotType = +businessModel === 3 ? 'd' : 'a,d'
          this.getSelectBeanByMerchantRel('oneCangKuList', { type: depotType, merchantId: oneCustomerJson.innerMerchantId || data.oneCustomerId || '' })
        } else {
          this.getSelectBeanByMerchantRel('oneCangKuList', { type: 'b', merchantId: data.startPointMerchantId || '' })
        }
      }
      // 客户2
      this.ruleForm.twoCustomerName = data.twoCustomerName || ''
      this.ruleForm.twoBuName = data.twoBuName || ''
      this.ruleForm.twoPremiumRate = data.twoPremiumRate || ''
      this.ruleForm.twoDepotId = ''
      this.detail.twoType = data.twoType || ''
      delete this.selectOpt.twoCangKuList
      let twoCustomerJson = {}
      if (data.twoCustomerName) {
        if (+data.twoType === 1) {
          if (+data.twoIdvaluetype === 1) {
            const res = await getCustomerById({ id: data.twoCustomerId || '' })
            twoCustomerJson = res.data
            console.log('twoCustomerJson', twoCustomerJson.innerMerchantId)
          }
          const depotType = +businessModel === 3 ? 'd' : 'a,d'
          this.getSelectBeanByMerchantRel('twoCangKuList', { type: depotType, merchantId: twoCustomerJson.innerMerchantId || data.twoCustomerId || '' })
        } else {
          this.getSelectBeanByMerchantRel('twoCangKuList', { type: 'b', merchantId: oneCustomerJson.innerMerchantId || data.oneCustomerId || '' })
        }
      }
      // 客户3
      this.ruleForm.threeCustomerName = data.threeCustomerName || ''
      this.ruleForm.threeBuName = data.threeBuName || ''
      this.ruleForm.threePremiumRate = data.threePremiumRate || ''
      this.ruleForm.threeDepotId = ''
      this.detail.threeType = data.threeType || ''
      delete this.selectOpt.threeCangKuList
      let threeCustomerJson = {}
      if (this.ruleForm.threeCustomerName) {
        if (+data.threeType === 1) {
          if (+data.threeIdvaluetype === 1) {
            const res = await getCustomerById({ id: data.threeCustomerId || '' })
            threeCustomerJson = res.data
            console.log('threeCustomerJson', threeCustomerJson.innerMerchantId)
          }
          const depotType = +businessModel === 3 ? 'd' : 'a,d'
          this.getSelectBeanByMerchantRel('threeCangKuList', { type: depotType, merchantId: threeCustomerJson.innerMerchantId || data.threeCustomerId || '' })
        } else {
          this.getSelectBeanByMerchantRel('threeCangKuList', { type: 'b', merchantId: twoCustomerJson.innerMerchantId || data.twoCustomerId || '' })
        }
      }
      // 客户4
      this.ruleForm.fourCustomerName = data.fourCustomerName || ''
      this.ruleForm.fourBuName = data.fourBuName || ''
      this.ruleForm.fourPremiumRate = data.fourPremiumRate || ''
      this.ruleForm.fourDepotId = ''
      this.detail.fourType = data.fourType || ''
      delete this.selectOpt.fourCangKuList
      let fourCustomerJson = {}
      if (this.ruleForm.fourCustomerName) {
        if (+data.fourType === 1) {
          console.log(+data.fourType === 1, 53)
          if (+data.fourIdValueType === 1) {
            const res = await getCustomerById({ id: data.fourCustomerId || '' })
            fourCustomerJson = res.data
            console.log('fourCustomerJson', fourCustomerJson.innerMerchantId)
          }
          const depotType = +businessModel === 3 ? 'd' : 'a,d'
          this.getSelectBeanByMerchantRel('fourCangKuList', { type: depotType, merchantId: fourCustomerJson.innerMerchantId || data.fourCustomerId || '' })
        } else {
          this.getSelectBeanByMerchantRel('fourCangKuList', { type: 'b', merchantId: threeCustomerJson.innerMerchantId || data.threeCustomerId || '' })
        }
      }
    },
    // 改变公司仓库
    async changeStartPointDepotId() {
      if (this.ruleForm.startPointDepotId) {
        const res = await getDepotDetails({ id: this.ruleForm.startPointDepotId })
        this.depotType = res.data.type || ''
      }
    },
    // 点击取消
    cancel() {
      this.$confirm('界面数据将不保存，是否返回列表页？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
        this.closeTag()
			})
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
