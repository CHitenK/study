<template>
  <div class="step-bx">
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" >
      <JFX-title title="交易链路" className="mr-t-20" />
      <div class="fs-14 clr-II">
        <span class="need">选择交易链路：</span><el-button type="primary" @click="transeLinkVisible.show=true">请选择</el-button>
      </div>
      <div class="mr-t-20"></div>
      <el-row  :gutter="10" class="fs-14 clr-II" v-if="ruleForm.startPointMerchantName">
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="起点公司：" :rules="rules.commomRule"  prop="startPointMerchantName" >
            <el-input v-model="ruleForm.startPointMerchantName" style="width: 120%" clearable disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="事业部：" :rules="rules.commomRule"  prop="startPointBuName" >
            <el-input v-model="ruleForm.startPointBuName" style="width: 120%" clearable disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="销售加价比例%：" :rules="rules.commomRule"  prop="startPointPremiumRate" >
            <el-input v-model="ruleForm.startPointPremiumRate" style="width: 120%" clearable disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="仓库：" prop="startPointDepotId" :rules="rules.depotId" >
            <el-select v-model="ruleForm.startPointDepotId" style="width: 120%" placeholder="请选择" filterable clearable @change="changeStartPointDepotId">
              <el-option v-for="item in selectOpt.cangkuList1"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="PO号：" prop="startPointPoNo" :rules="rules.poNo"  >
            <el-input v-model.trim="ruleForm.startPointPoNo" style="width: 120%" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="fs-14 clr-II" v-if="ruleForm.oneCustomerName">
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="客户1：" :rules="rules.commomRule"  prop="oneCustomerName" >
            <el-input v-model="ruleForm.oneCustomerName" style="width: 120%" clearable disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="事业部：" prop="oneBuName" :rules="+detail.oneType === 1 ? rules.buId : null" >
            <el-input v-model="ruleForm.oneBuName" style="width: 120%" clearable disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="销售加价比例%：" :rules="rules.commomRule"  prop="onePremiumRate" >
            <el-input v-model="ruleForm.onePremiumRate" style="width: 120%" clearable disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="仓库：" prop="oneDepotId" :rules="+detail.oneType === 1 ? rules.depotId : null" >
            <el-select v-model="ruleForm.oneDepotId" style="width: 120%" placeholder="请选择" filterable clearable :data-list="getSelectList('adjustmentType_sourceList')" >
              <el-option v-for="item in selectOpt.oneCangKuList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="PO号：" prop="onePoNo" :rules="+detail.oneType === 1 ? rules.poNo : null"  >
            <el-input v-model.trim="ruleForm.onePoNo" style="width: 120%" clearable :disabled="+detail.oneType === 2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="fs-14 clr-II" v-if="ruleForm.twoCustomerName">
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="客户2：" :rules="rules.commomRule"  prop="twoCustomerName" >
            <el-input v-model="ruleForm.twoCustomerName" style="width: 120%" clearable disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="事业部：" :rules="+detail.twoType === 1 ? rules.buId : null"  prop="twoBuName" >
            <el-input v-model="ruleForm.twoBuName" style="width: 120%" clearable disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="销售加价比例%：" :rules="rules.commomRule"  prop="twoPremiumRate" >
            <el-input v-model="ruleForm.twoPremiumRate" style="width: 120%" clearable disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="仓库：" prop="twoDepotId" :rules="+detail.twoType === 1 ? rules.depotId : null" >
            <el-select v-model="ruleForm.twoDepotId" style="width: 120%" placeholder="请选择" filterable clearable >
              <el-option v-for="item in selectOpt.twoCangKuList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="PO号：" prop="twoPoNo" :rules="+detail.twoType === 1 ? rules.poNo : null"  >
            <el-input v-model.trim="ruleForm.twoPoNo" style="width: 120%" clearable :disabled="+detail.twoType === 2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="fs-14 clr-II" v-if="ruleForm.threeCustomerName">
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="客户3：" :rules="rules.commomRule"  prop="threeCustomerName" >
            <el-input v-model="ruleForm.threeCustomerName" style="width: 120%" clearable disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="事业部：" :rules="+detail.threeType === 1 ? rules.buId : null"  prop="threeBuName" >
            <el-input v-model="ruleForm.threeBuName" style="width: 120%" clearable disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="销售加价比例%：" :rules="rules.commomRule"  prop="threePremiumRate" >
            <el-input v-model="ruleForm.threePremiumRate" style="width: 120%" clearable disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="仓库：" prop="threeDepotId" :rules="+detail.threeType === 1 ? rules.depotId : null" >
            <el-select v-model="ruleForm.threeDepotId" style="width: 120%" placeholder="请选择" filterable clearable>
              <el-option v-for="item in selectOpt.threeCangKuList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="PO号：" prop="threePoNo" :rules="+detail.threeType === 1 ? rules.poNo : null">
            <el-input v-model.trim="ruleForm.threePoNo" style="width: 120%" clearable :disabled="+detail.threeType === 2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="fs-14 clr-II" v-if="ruleForm.fourCustomerName">
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="客户4：" :rules="rules.commomRule"  prop="fourCustomerName" >
            <el-input v-model="ruleForm.fourCustomerName" style="width: 120%" clearable disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="事业部：" :rules="+detail.fourType === 1 ? rules.buId : null"   prop="fourBuName" >
            <el-input v-model="ruleForm.fourBuName" style="width: 120%" clearable disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="销售加价比例%：" :rules="rules.commomRule"  prop="fourPremiumRate" >
            <el-input v-model="ruleForm.fourPremiumRate" style="width: 120%" clearable disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="仓库：" prop="fourDepotId" :rules="+detail.fourType === 1 ? rules.depotId : null" >
            <el-select v-model="ruleForm.fourDepotId" style="width: 120%" placeholder="请选择" filterable clearable >
              <el-option v-for="item in selectOpt.fourCangKuList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="PO号：" prop="fourPoNo" :rules="+detail.fourType === 1 ? rules.poNo : null">
            <el-input v-model.trim="ruleForm.fourPoNo" style="width: 120%" clearable :disabled="+detail.fourType === 2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="fs-16 clr-II mr-t-5">
        公共交易信息 (信息默认从当前采购单带出且部分信息不能修改，信息将应用在自动生成的采购、销售单据中)
      </div>
      <el-row :gutter="10" class="fs-14 clr-II">
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="归属日期：" prop="infoAuditDate" >
            <el-date-picker
              v-model="ruleForm.infoAuditDate"
              type="date"
              style="width: 112%"
              value-format="yyyy-MM-dd 00:00:00"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="交易币种：" prop="infoCurrencyLabel" >
            <el-input v-model="ruleForm.infoCurrencyLabel" style="width: 120%"  disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="业务模式：" prop="infoBusinessModel" >
            <el-select v-model="ruleForm.infoBusinessModel" style="width: 120%" placeholder="请选择" filterable clearable >
              <el-option v-for="item in infoBusinessModelOpt"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="装货港：" prop="infoLoadPort" >
            <el-input v-model="ruleForm.infoLoadPort" style="width: 120%" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="卸货港：" prop="infoUnloadPort" >
            <el-select v-model="ruleForm.infoUnloadPort" style="width: 120%" placeholder="请选择" filterable clearable :data-list="getSelectList('portDestList')" >
              <el-option v-for="item in selectOpt.portDestList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="装船时间：" prop="infoShipDate" >
            <el-date-picker
              v-model="ruleForm.infoShipDate"
              type="date"
              value-format="yyyy-MM-dd 00:00:00"
              style="width: 112%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="运输方式：" prop="infoTransport" >
            <el-select v-model="ruleForm.infoTransport" style="width: 120%" placeholder="请选择" filterable clearable :data-list="getSelectList('transportList')" >
              <el-option v-for="item in selectOpt.transportList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="承运商：" prop="infoCarrier" >
            <el-input v-model="ruleForm.infoCarrier" style="width: 120%" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="车次：" prop="infoTrainNumber" >
            <el-input v-model="ruleForm.infoTrainNumber" style="width: 120%" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="标准箱TEU：" prop="infoStandardCaseTeu" >
            <el-input v-model="ruleForm.infoStandardCaseTeu" style="width: 120%" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="托数：" prop="infoTorrNum" >
            <el-input-number v-model.trim="ruleForm.infoTorrNum" :precision="0" :controls="false" :min="0"  style="width: 120%"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="LBX单号：" prop="infoLbxNo" >
            <el-input v-model="ruleForm.infoLbxNo" style="width: 120%" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="提单号：" prop="infoLadingBill" >
            <el-input v-model="ruleForm.infoLadingBill" style="width: 120%" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="提单毛重KG：" prop="infoGrossWeight" >
            <el-input v-model="ruleForm.infoGrossWeight" style="width: 120%" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="fs-16 clr-II mr-t-5">
        公共PO合同信息  (以我司标准版合同做参照，默认从当前PO文件带出，信息将应用到自动生成的采购PO文件中)
      </div>
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
      <div class="fs-16 clr-II mr-t-5">
        特别约定（本条与本订单约定的内容存在冲突的，以本条约定的为准）：
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
      </el-row>
    </el-form>
    <!-- title -->
    <JFX-title title="交易链路" className="mr-t-20" />
    <div class="fs-16 clr-III mr-t-10">
      1、只有在加价比例配置模块配置好的客户才能参与选择
    </div>
    <div class="fs-16 clr-III mr-t-10">
      2、非末级客户只能是内部公司，客户不能重复
    </div>
    <div class="fs-16 clr-III mr-t-10">
      3、系统将自动生成采购、销售订单
    </div>
    <div class="fs-16 clr-III mr-t-10">
      4、该功能只适用购销-整批结算、购销实销实结、预算订单业务模式
    </div>
    <div class="mr-t-20 flex-c-c">
      <el-button :size="'small'" @click="cancel">取消</el-button>
      <el-button type="primary" :size="'small'" @click="nextTo" :loading="nextLoading" >下一步</el-button>
    </div>
    <div class="mr-t-30"></div>
    <!-- 选择交易链路 -->
    <chose-transe-link  :visible.sync="transeLinkVisible" v-if="transeLinkVisible.show" @comfirm="choseLink" :filterData="{purchaseOrderId: targetId }"></chose-transe-link>
    <!-- 选择交易链路 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import { toSaleStepOnePage, saveOrUpdateLinkStepOne, backToSaleStepOnePage } from '@a/purchaseManage/index'
import { getCustomerById } from '@a/base/index'
import { getDepotDetails } from '@a/salesManage/index'
export default {
  components: {
    choseTranseLink: () => import('./choseTranseLink')
  },
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
        // start
        startPointMerchantName: '',
        startPointBuName: '',
        startPointPremiumRate: '',
        startPointDepotId: '',
        startPointPoNo: '',
        // 1
        oneCustomerName: '',
        oneBuName: '',
        onePremiumRate: '',
        oneDepotId: '',
        onePoNo: '',
        // 2
        twoCustomerName: '',
        twoBuName: '',
        twoPremiumRate: '',
        twoDepotId: '',
        twoPoNo: '',
        // 3
        threeCustomerName: '',
        threeBuName: '',
        threePremiumRate: '',
        threeDepotId: '',
        threePoNo: '',
        // 4
        fourCustomerName: '',
        fourBuName: '',
        fourPremiumRate: '',
        fourDepotId: '',
        fourPoNo: '',
        // 其他参数
        id: '',
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
        buId: {required: true, message: '事业不能为空', trigger: 'change'},
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
        if (!valid) {
          this.$errorMsg('请先完善信息')
          return false
        }
        const payData = {}
        if (this.ruleForm.conPaymentMethod === '1') { // 一次结清
          payData.conPaymentMethodText = this.payData.paymentMethodText
          payData.conPaymentMethodTextEn = this.payData.paymentMethodTextEn
        }
        if (this.ruleForm.conPaymentMethod === '2') { // 分批付款
          payData.conPaymentMethodText = ''
          payData.conPaymentMethodTextEn = ''
          this.payData.arr.forEach(item => {
            payData.conPaymentMethodText = payData.conPaymentMethodText + item + ';'
          })
          this.payData.arrEn.forEach(item => {
            payData.conPaymentMethodTextEn = payData.conPaymentMethodTextEn + item + ';'
          })
        }
        if (this.ruleForm.conPaymentMethod === '3') { // 其他
          payData.conPaymentMethodText = this.payData.paymentMethodTextOt
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
        // 处理支付方式
        if (this.ruleForm.conPaymentMethod === '1') { // 一次结清
          this.payData.paymentMethodText = this.detail.conPaymentMethodText
          this.payData.conPaymentMethodTextEn = this.detail.conPaymentMethodTextEn
        }
        if (this.ruleForm.conPaymentMethod === '2') { // 分批付款
          if (this.detail.conPaymentMethodText) {
            this.payData.arr = this.detail.conPaymentMethodText.split(';')
          }
          if (this.detail.conPaymentMethodTextEn) {
            this.payData.arrEn = this.detail.conPaymentMethodTextEn.split(';')
          }
        }
        if (this.ruleForm.conPaymentMethod === '3') { // 其他
          this.payData.paymentMethodTextOt = this.detail.conPaymentMethodText
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
</style>
