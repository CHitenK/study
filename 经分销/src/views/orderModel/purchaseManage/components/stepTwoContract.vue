<template>
  <div class="pad-left-10">
    <div v-for="(contractDetail, i) in targetArr" :key="i">
      <div class="flex-c-c fs-18">采购订单（C）</div>
      <div class="flex-c-c fs-18 mr-t-5">Purchase Contract</div>
      <el-row  :gutter="10" class="fs-14 clr-II mr-t-20">
        <el-col  class="mr-b-15" :span="12">
          <span class="w-200">采购合同编号：</span>
          {{contractDetail.purchaseContractNo || '- -'}}
        </el-col>
        <el-col :span="12">
          <span class="w-200">采购订单号：</span>
          {{contractDetail.purchaseOrderNo || '- -'}}
        </el-col>
      </el-row>
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col  class="mr-b-15" :span="12">
          <span class="w-200">Purchase contract No：</span>
          {{contractDetail.purchaseContractNo || '- -'}}
        </el-col>
        <el-col :span="12">
          <span class="w-200">Purchase order No.：</span>
          {{contractDetail.purchaseOrderNo || '- -'}}
        </el-col>
      </el-row>
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col  class="mr-b-15" :span="12">
          <span class="w-200">甲方：</span>
          {{contractDetail.buyerCnName || '- -'}}
        </el-col>
        <el-col :span="12">
          <span class="w-200">乙方：</span>
          {{contractDetail.sellerCnName || '- -'}}
        </el-col>
      </el-row>
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col  class="mr-b-15" :span="12">
          <span class="w-200">Buyer：</span>
          {{contractDetail.buyerEnName || '- -'}}
        </el-col>
        <el-col :span="12">
          <span class="w-200">Seller.：</span>
          {{contractDetail.sellerEnName || '- -'}}
        </el-col>
      </el-row>
      <div class="fs-14">1、货品明细 Goods details:</div>
      <div class="mr-t-10"></div>
      <JFX-table
        :tableData="{ list: contractDetail.itemList, pageSize: 10000, total: 10001 }"
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
            <div>单价({{contractDetail.currency}})<br>Unit Value</div>
          </template>
          <template slot-scope="scope">{{scope.row.price}}</template>
        </el-table-column>
        <el-table-column prop="amount" label="销售总金额" align="center" min-width="120">
          <template slot="header">
            <div>总价({{contractDetail.currency}})<br>Total Value</div>
          </template>
        </el-table-column>
      </JFX-table>
      <div class="fs-14">2、</div>
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">运输方式：</span>
          <span>
            <el-checkbox label="CIF" :value="contractDetail.meansOfTransportation && contractDetail.meansOfTransportation.includes('CIF')" >CIF</el-checkbox>
            <el-checkbox label="CFR" :value="contractDetail.meansOfTransportation && contractDetail.meansOfTransportation.includes('CIF')" >CFR</el-checkbox>
            <el-checkbox label="FOB" :value="contractDetail.meansOfTransportation && contractDetail.meansOfTransportation.includes('FOB')" >FOB</el-checkbox>
            <el-checkbox label="DAP" :value="contractDetail.meansOfTransportation && contractDetail.meansOfTransportation.includes('DAP')" >DAP</el-checkbox>
            <el-checkbox label="EXW" :value="contractDetail.meansOfTransportation && contractDetail.meansOfTransportation.includes('EXW')">EXW</el-checkbox>
            <el-checkbox label="BY SEA" :value="contractDetail.meansOfTransportation && contractDetail.meansOfTransportation.includes('BY SEA')" >海 运</el-checkbox>
            <el-checkbox label="BY AIR" :value="contractDetail.meansOfTransportation && contractDetail.meansOfTransportation.includes('BY AIR')" >空 运</el-checkbox>
            <el-checkbox label="BY LAND" :value="contractDetail.meansOfTransportation && contractDetail.meansOfTransportation.includes('BY LAND')" >陆 运</el-checkbox>
          </span>
        </el-col>
      </el-row>
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">Means of Transportation：</span>
          <span>
            <el-checkbox label="CIF" :value="contractDetail.meansOfTransportation && contractDetail.meansOfTransportation.includes('CIF')" >CIF</el-checkbox>
            <el-checkbox label="CFR" :value="contractDetail.meansOfTransportation && contractDetail.meansOfTransportation.includes('CIF')" >CFR</el-checkbox>
            <el-checkbox label="FOB" :value="contractDetail.meansOfTransportation && contractDetail.meansOfTransportation.includes('FOB')" >FOB</el-checkbox>
            <el-checkbox label="DAP" :value="contractDetail.meansOfTransportation && contractDetail.meansOfTransportation.includes('DAP')" >DAP</el-checkbox>
            <el-checkbox label="EXW" :value="contractDetail.meansOfTransportation && contractDetail.meansOfTransportation.includes('EXW')">EXW</el-checkbox>
            <el-checkbox label="BY SEA" :value="contractDetail.meansOfTransportation && contractDetail.meansOfTransportation.includes('BY SEA')" >BY SEA</el-checkbox>
            <el-checkbox label="BY AIR" :value="contractDetail.meansOfTransportation && contractDetail.meansOfTransportation.includes('BY AIR')">BY AIR</el-checkbox>
            <el-checkbox label="BY LAND" :value="contractDetail.meansOfTransportation && contractDetail.meansOfTransportation.includes('BY LAND')">BY LAND</el-checkbox>
          </span>
        </el-col>
      </el-row>
      <div class="fs-14">3、</div>
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col  class="mr-b-15" :span="12">
          <span class="w-200">始发地（港）：</span>
          {{contractDetail.loadingCnPort || '- -'}}
        </el-col>
        <el-col :span="12">
          <span class="w-200">目的地（港）：</span>
          {{contractDetail.destinationdCn || '- -'}}
        </el-col>
      </el-row>
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col  class="mr-b-15" :span="12">
          <span class="w-200">发货地址：</span>
          {{contractDetail.deliveryAddress || '- -'}}
        </el-col>
        <el-col :span="12">
          <span class="w-200">提货地址：</span>
          {{contractDetail.pickingUpAddress || '- -'}}
        </el-col>
      </el-row>
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col  class="mr-b-15" :span="12">
          <span class="w-200">Loading Port：</span>
          {{contractDetail.loadingEnPort || '- -'}}
        </el-col>
        <el-col :span="12">
          <span class="w-200">Destination：</span>
          {{contractDetail.destinationdEn || '- -'}}
        </el-col>
      </el-row>
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col  class="mr-b-15" :span="12">
          <span class="w-200">Delivery Address：</span>
          {{contractDetail.deliveryAddressEn || '- -'}}
        </el-col>
        <el-col :span="12">
          <span class="w-200">Picking up Address</span>
          {{contractDetail.pickingUpAddressEn || '- -'}}
        </el-col>
      </el-row>
      <div class="fs-14">4、</div>
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">交货日期：</span>
          {{contractDetail.deliveryDate ? contractDetail.deliveryDate : ' 年 月 日' }} (若此交货日期与甲方与最终买方签署的框架采购合同不一致的,以此交货期为准)
        </el-col>
      </el-row>
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">Delivery date：</span>
          {{contractDetail.deliveryDate ? contractDetail.deliveryDate : ' YYYY-MM-dd' }} (If this delivery date is in conflict with the delivery date stipulated in the Purchase Frame Contract signed by the Buyer and the ultimate buyer, this one will prevail.)
        </el-col>
      </el-row>
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">付款方式：</span>
          <el-radio v-model="contractDetail.paymentMethod" label="1">一次结清</el-radio>
          <el-radio v-model="contractDetail.paymentMethod" label="2">分批付款</el-radio>
          <el-radio v-model="contractDetail.paymentMethod" label="3">其他</el-radio>
        </el-col>
      </el-row>
      <div class="fs-14">5、</div>
      <el-row  :gutter="10" class="fs-14 clr-II" v-if="+contractDetail.paymentMethod === 1">
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">付款方式：</span>
          双方确认本订单之日起{{contractDetail.paymentMethodText}}个工作日内甲方向乙方支付订单总金额100%货款
        </el-col>
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">Terms of payment：</span>
          <span>TT 100% within {{contractDetail.paymentMethodTextEn}} working days from the date of this order.</span>
        </el-col>
      </el-row>
      <el-row  :gutter="10" class="fs-14 clr-II" v-if="+contractDetail.paymentMethod === 2">
        <el-col  class="mr-b-15" :span="24" :data-value="setpaymentMethodArr(i)">
          <span class="w-200">付款方式：</span>
          <span>
            卖方确认本订单之日起{{contractDetail.paymentMethodText ? contractDetail.paymentMethodText[0] : '' }}个工作日内，买方支付订单总金额的{{contractDetail.paymentMethodText ? contractDetail.paymentMethodText[1] : '' }}
            货款： {{contractDetail.paymentMethodText ? contractDetail.paymentMethodText[2] : '' }}，货物到仓后买方验收合格且双方确认理货数据无误后在{{contractDetail.paymentMethodText ? contractDetail.paymentMethodText[3] : '' }}个工作日内支付剩余{{contractDetail.paymentMethodText ? contractDetail.paymentMethodText[4] : '' }}
            货款: {{contractDetail.paymentMethodText ? contractDetail.paymentMethodText[5] : '' }}
          </span>
        </el-col>
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">Terms of payment：</span>
          <span>
            TT {{contractDetail.paymentMethodTextEn ? contractDetail.paymentMethodTextEn[0] : '' }}{{contractDetail.paymentMethodTextEn ? contractDetail.paymentMethodTextEn[1] : '' }} within
            {{contractDetail.paymentMethodTextEn ? contractDetail.paymentMethodTextEn[2] : '' }} working days   from the date of this order, TT
            {{contractDetail.paymentMethodTextEn ? contractDetail.paymentMethodTextEn[3] : '' }}{{contractDetail.paymentMethodTextEn ? contractDetail.paymentMethodTextEn[4] : '' }} within
            {{contractDetail.paymentMethodTextEn ? contractDetail.paymentMethodTextEn[5] : '' }}working days subject to the satisfaction of the following conditions: (1) delivery of goods to the designated warehouse, (2) the quality of goods is satisfied by the buyer after inspection, and (3) both parties’ confirmation on the quantity of delivered goods.
          </span>
        </el-col>
      </el-row>
      <el-row  :gutter="10" class="fs-14 clr-II" v-if="+contractDetail.paymentMethod === 3">
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">付款方式：</span>
          {{contractDetail.paymentMethodText}}
        </el-col>
      </el-row>
      <div class="fs-14">6、特别约定（本条与本订单约定的内容存在冲突的，以本条约定的为准）：</div>
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">特别约定：</span>
          【{{contractDetail.specialAgreement}}】
        </el-col>
      </el-row>
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">Special agreement：</span>
          【{{contractDetail.specialAgreementEn}}】
        </el-col>
      </el-row>
      <div class="fs-14">7、乙方（供货方）收款账户  Banking information of the seller：</div>
      <el-row  :gutter="10" class="fs-14 clr-II mr-t-10">
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">账号：</span>
          {{contractDetail.accountNo}}
        </el-col>
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">采购币种：</span>
          {{contractDetail.currency}}
        </el-col>
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">开户行：</span>
          {{contractDetail.beneficiaryBankName}}
        </el-col>
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">地址：</span>
          {{contractDetail.bankAddress}}
        </el-col>
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">Swift Code：</span>
          {{contractDetail.swiftCode}}
        </el-col>
      </el-row>
      <el-row  :gutter="10" class="fs-14 clr-II mr-t-10">
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">Account No：</span>
          {{contractDetail.accountNo}}
        </el-col>
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">Currency：</span>
          {{contractDetail.currency}}
        </el-col>
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">Beneficiary Name：</span>
          {{contractDetail.beneficiaryName}}
        </el-col>
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">Beneficiary Bank Name：</span>
          {{contractDetail.beneficiaryBankName}}
        </el-col>
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">Bank Address：</span>
          {{contractDetail.bankAddress}}
        </el-col>
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">Swift Code：</span>
          {{contractDetail.swiftCode}}
        </el-col>
      </el-row>
      <el-row  :gutter="10" class="fs-14 clr-II mr-t-20">
        <el-col  class="mr-b-15" :span="12">
          <span class="w-200">甲方：</span>
          {{contractDetail.buyerAuthorizedSignature}}
        </el-col>
        <el-col :span="12">
          <span class="w-200">(盖章)</span>
        </el-col>
      </el-row>
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col  class="mr-b-15" :span="12">
          <span class="w-200">Buyer：</span>
          {{contractDetail.buyerAuthorizedSignatureEn || '- -'}}
        </el-col>
        <el-col :span="12">
          <span class="w-200">(Common Seal)</span>
        </el-col>
      </el-row>
      <el-row  :gutter="10" class="fs-14 clr-II mr-t-20">
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">授权代表签字：</span>
        </el-col>
        <el-col :span="24">
          <span class="w-200">Authorized signature：</span>
        </el-col>
      </el-row>
      <el-row  :gutter="10" class="fs-14 clr-II mr-t-20">
        <el-col  class="mr-b-15" :span="12">
          <span class="w-200">乙方：</span>
          {{contractDetail.sellerAuthorizedSignature}}
        </el-col>
        <el-col :span="12">
          <span class="w-200">(盖章)</span>
        </el-col>
      </el-row>
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col  class="mr-b-15" :span="12">
          <span class="w-200">Seller：</span>
          {{contractDetail.sellerAuthorizedSignatureEn}}
        </el-col>
        <el-col :span="12">
          <span class="w-200">(Common Seal)</span>
        </el-col>
      </el-row>
      <el-row  :gutter="10" class="fs-14 clr-II mr-t-20">
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">授权代表签字：</span>
        </el-col>
        <el-col :span="24">
          <span class="w-200">Authorized signature: </span>
        </el-col>
      </el-row>
      <el-row  :gutter="10" class="fs-14 clr-II mr-t-30">
        <el-col  class="mr-b-15" :span="24">
          <span class="w-200">签订日期：</span>
        </el-col>
        <el-col :span="24">
          <span class="w-200">Date：</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  props: {
    targetArr: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    setpaymentMethodArr(i) {}
  }
}
</script>
<style lang="scss" scoped>
.pad-left-10{
  box-sizing: border-box;
  padding:15px;
}
.w-200{
  display: inline-block;
  width: 220px;
  text-align: right;
}
</style>
