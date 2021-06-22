<template>
  <div class="page-bx bgc-w edit-bx">
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" >
      <!-- 面包屑 -->
      <JFX-Breadcrumb :showGoback="true" />
      <!-- 面包屑 end -->
      <!-- title -->
      <JFX-title title="基本信息" className="mr-t-10" />
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="事业部：" prop="buId" >
            <el-select v-model="ruleForm.buId" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getBUSelectBean('buList')" @change="changeBuId" :disabled="audit" >
              <el-option v-for="item in selectOpt.buList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="付款主体：" prop="paySubject" >
            <el-select v-model="ruleForm.paySubject" style="width: 100%" placeholder="请选择" filterable clearable >
              <el-option :key="1" :label="'卓普信'" :value="'1'"></el-option>
              <el-option :key="2" :label="merchantName" :value="'2'"></el-option>
              <el-option :key="3" :label="'卓烨'" :value="'3'"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="业务模式：" prop="businessModel" >
            <el-select v-model="ruleForm.businessModel" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getSelectList('purchaseOrder_businessModelList')" >
              <el-option v-for="item in selectOpt.purchaseOrder_businessModelList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="入仓仓库：" prop="depotId" >
            <el-select v-model="ruleForm.depotId" style="width: 100%" placeholder="请选择" filterable clearable @change="changeDepotId">
              <el-option v-for="item in selectOpt.depotIdList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="供应商：" prop="supplierId" >
            <el-select v-model="ruleForm.supplierId" style="width: 100%" placeholder="请选择" filterable clearable  @change="changeSupplierId" :data-list="getSupplierList('goongyingList')" >
              <el-option v-for="item in selectOpt.goongyingList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="PO号：" prop="poNo" >
            <el-input v-model.trim="ruleForm.poNo" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="采购币种：" prop="currency" >
            <el-select v-model="ruleForm.currency" style="width: 100%" placeholder="请选择" filterable clearable :list-data="getCurrencySelectBean('currencyList', { customerId: '' })">
              <el-option v-for="item in selectOpt.currencyList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="归属日期：" prop="attributionDateStr" >
            <el-date-picker
              v-model="ruleForm.attributionDateStr"
              type="date"
              value-format="yyyy-MM-dd 00:00:00"
              style="width: 94%;"
              clearable
              :picker-options="pickerOptions"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="LBX单号：" prop="lbxNo" >
            <el-input v-model.trim="ruleForm.lbxNo" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" v-if="depotType === 'c'">
          <el-form-item label="理货单位：" prop="tallyingUnit" >
            <el-select v-model="ruleForm.tallyingUnit" style="width: 100%" placeholder="请选择" filterable clearable>
              <el-option v-for="item in tallyingUnitList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <JFX-title title="物流信息" className="mr-t-10" />
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="运输方式：" prop="transport" >
            <el-select v-model="ruleForm.transport" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getSelectList('transportList')" >
              <el-option v-for="item in selectOpt.transportList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="标准箱TEU：" prop="standardCaseTeu" :rules="{ required: +ruleForm.transport === 2, message: '标准箱TEU不能为空', trigger: 'blur'}"  >
            <el-input v-model.trim="ruleForm.standardCaseTeu" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="车次：" prop="trainNumber" :rules="{ required: +ruleForm.transport === 3 || +ruleForm.transport === 4, message: '车次不能为空', trigger: 'blur'}" >
            <el-input v-model.trim="ruleForm.trainNumber" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="报关合同号：" prop="contractNo" >
            <el-input v-model.trim="ruleForm.contractNo" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="装货港：" prop="loadPort" >
            <el-input v-model.trim="ruleForm.loadPort" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="卸货港：" prop="unloadPort" >
            <el-select v-model="ruleForm.unloadPort" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getSelectList('portDestList')" >
              <el-option v-for="item in selectOpt.portDestList"  :key="item.key" :label="item.value" :value="item.key" :disabled="item.key === 'other' && isInOutInstruction === '1'"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="承运商：" prop="carrier" >
            <el-input v-model.trim="ruleForm.carrier" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="提单号：" prop="ladingBill" :rules="{ required: +ruleForm.transport === 1 || +ruleForm.transport === 2, message: '提单号不能为空', trigger: 'blur'}">
            <el-input v-model.trim="ruleForm.ladingBill" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="提单毛重(Kg)：" prop="grossWeight" >
            <JFX-Input v-model.trim="ruleForm.grossWeight" :min="0" :precision="5" placeholder="请输入" clearable @change="changeGrossWeight" />
            <!-- <el-input v-model.trim="ruleForm.grossWeight" clearable style="width: 100%;" @change="changeGrossWeight"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="托数：" prop="torrNum" >
            <el-input v-model.trim="ruleForm.torrNum" clearable style="width: 100%" @change="changeTorrNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="箱数：" prop="boxNum" >
            <el-input v-model.trim="ruleForm.boxNum" clearable style="width: 100%" @change="changeTorrNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="预计到港时间：" prop="arriveDateStr" >
            <el-date-picker
              v-model="ruleForm.arriveDateStr"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 94%;"
              clearable
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="目的港名称：" prop="destinationPortName" >
            <el-input v-model.trim="ruleForm.destinationPortName" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="包装方式：" prop="packType" >
            <el-input v-model.trim="ruleForm.packType" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="付款条约：" prop="payRules" >
            <el-input v-model.trim="ruleForm.payRules" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="二程提单号：" prop="blNo" >
            <el-input v-model.trim="ruleForm.blNo" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="进出口口岸：" prop="imExpPort" >
            <el-input v-model.trim="ruleForm.imExpPort" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="境外发货人：" prop="shipper" >
            <el-input v-model.trim="ruleForm.shipper" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="唛头：" prop="mark" >
            <el-input v-model.trim="ruleForm.mark" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" v-if="addressSelect" >
          <el-form-item label="目的地名称：" prop="destinationName" :rules="{required: true, message: '请输入目的地名称', trigger: 'change'}">
            <el-select v-model="ruleForm.destinationName" style="width: 100%" placeholder="请选择" filterable clearable >
              <el-option v-for="item in selectOpt.arrList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" v-else>
          <el-form-item label="目的地名称：" prop="destinationName" :rules="{ required: ruleForm.unloadPort === 'other', message: '当卸货港选其他时，目的地名称必填', trigger: 'blur'}">
            <el-input v-model.trim="ruleForm.destinationName" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="发票号：" prop="invoiceNo" >
            <el-input v-model.trim="ruleForm.invoiceNo" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="预计入仓时间：" prop="arriveDepotDateStr" >
            <el-date-picker
              v-model="ruleForm.arriveDepotDateStr"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 94%;"
              clearable
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="预计付款时间：" prop="paymentDateStr" >
            <el-date-picker
              v-model="ruleForm.paymentDateStr"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 94%;"
              clearable
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="装船时间：" prop="shipDateStr" >
            <el-date-picker
              v-model="ruleForm.shipDateStr"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 94%;"
              clearable
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="收货地点：" prop="deliveryAddr" >
            <el-input v-model.trim="ruleForm.deliveryAddr" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="销售渠道：" prop="channel" >
            <el-input v-model.trim="ruleForm.channel" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="入库关区：" prop="inCustomsId" >
            <el-select v-model="ruleForm.inCustomsId" style="width: 100%" placeholder="请选择" filterable clearable>
              <el-option v-for="item in selectOpt.customsAreaList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
          <el-form-item label="备注：" prop="remark" >
            <el-input v-model.trim="ruleForm.remark" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <JFX-title title="商品信息" className="mr-t-10 title-bx">
        <div v-if="!audit">
          <el-button type="primary" :size="'small'" @click="choseGoods" >选择商品</el-button>
          <el-button type="primary" :size="'small'" @click="dele">删除</el-button>
        </div>
      </JFX-title>
      <div class="mr-t-20"></div>
      <!-- 表格 -->
      <JFX-table
        :tableData.sync="tableData"
        @selection-change="selectionChange"
        :showPagination="false"
      >
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column prop="contractNo" label="子合同" align="center" min-width="130">
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row.contractNo" clearable style="width: 100%"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="goodsName" label="商品名称" align="center" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="条形码" align="center" min-width="130" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.barcode}}</template>
        </el-table-column>
        <el-table-column label="商品货号" align="center" min-width="130">
          <template slot-scope="scope">{{scope.row.goodsNo}}</template>
        </el-table-column>
        <el-table-column prop="num" align="center" min-width="110">
          <template slot="header">
            <span class="need">采购数量</span>
          </template>
          <template slot-scope="scope">
            <el-input-number v-model.trim="scope.row.num" :precision="0" :controls="false" :min="0" style="width: 100%;" @change="changeNumOrPrice(scope.$index)" :disabled="audit"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="130">
          <template slot="header">
            <span class="need">采购单价(不含税)</span>
          </template>
          <template slot-scope="scope">
            <el-input-number v-model.trim="scope.row.price" :precision="8" v-max-spot="8" :min="0" clearable :controls="false" style="width: 100%;" @change="changeNumOrPrice(scope.$index)" :disabled="audit"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="amount" align="center" min-width="140">
          <template slot="header">
            <span class="need">采购总金额(不含税)</span>
          </template>
          <template slot-scope="scope">
            <el-input-number v-model.trim="scope.row.amount" :precision="2" v-max-spot="2" :min="0" clearable :controls="false" style="width: 100%;" @change="changeAmount(scope.$index)" :disabled="audit"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="taxAmount" label="采购总金额(含税)" align="center" min-width="140">
          <template slot-scope="scope">
            <el-input-number v-model.trim="scope.row.taxAmount" :precision="2" v-max-spot="2" :min="0" clearable :controls="false" style="width: 100%;" @change="changeTaxAmount(scope.$index)" :disabled="audit"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="税率" align="center" min-width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.taxRate" style="width: 100%" placeholder="请选择" filterable clearable :list-data="getRaxList('raxList')" @change="changeTaxRate(scope.$index)">
              <el-option v-for="item in selectOpt.raxList"  :key="item.key" :label="item.value" :value="item.value"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="税额" prop="tax" align="center" min-width="120">
          <template slot-scope="scope">
            <el-input-number v-model.trim="scope.row.tax" :precision="2" v-max-spot="2" :min="0" clearable :controls="false" style="width: 100%;" disabled></el-input-number>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="140">
          <template slot="header">
            <span class="need">品牌类型</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row.brandName" clearable style="width: 100%"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="grossWeight" align="center" min-width="110">
          <template slot="header">
            <span class="need">毛重(kg)</span>
          </template>
          <template slot-scope="scope">
            <JFX-Input v-model.trim="scope.row.grossWeightSum" :min="0" :precision="5" placeholder="请输入" style="width: 100%;"  @change="countWeight" />
          </template>
        </el-table-column>
        <el-table-column  prop="netWeightSum" align="center" min-width="110">
          <template slot="header">
            <span class="need">净重(kg)</span>
          </template>
          <template slot-scope="scope">
            <JFX-Input v-model.trim="scope.row.netWeightSum" :min="0" :precision="5" placeholder="请输入" style="width: 100%;" @change="countTotal" />
          </template>
        </el-table-column>
        <el-table-column label="箱号" align="center" min-width="120">
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row.boxNo" clearable style="width: 100%"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="生产批次号" align="center" min-width="120">
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row.batchNo" clearable style="width: 100%"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="成分占比" align="center" min-width="130">
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row.constituentRatio" type="textarea" :rows="2" clearable style="width: 100%"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" min-width="130">
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row.remark" type="textarea" :rows="2" clearable style="width: 100%"></el-input>
          </template>
        </el-table-column>
      </JFX-table>
      <!-- 表格 end-->
      <div class="flex-c-c fs-16 clr-II">
        <span class="tongji-item">总数量：{{totalNum}}</span>
        <span class="tongji-item">总金额(不含税)：{{totalAmount}}</span>
        <span class="tongji-item">税额：{{totalTax}}</span>
        <span class="tongji-item">总金额(含税)：{{totalTaxAmount}}</span>
        <span class="tongji-item">总毛重：{{totalGrossWeight}}</span>
        <span class="tongji-item">总净重：{{totalNetWeight}}</span>
      </div>
    </el-form>
    <div class="mr-t-30 flex-c-c">
      <el-button type="primary" @click="save" :loading="saveLoading">保 存</el-button>
      <el-button @click="closeTag">取 消</el-button>
      <el-button type="primary" @click="nextTo" :loading="nextLoading">下一步</el-button>
    </div>
    <!-- 选择商品 -->
    <chose-products v-if="visible.show" :visible="visible" @comfirm="comfirm" :filterData="filterData"></chose-products>
    <!-- 选择商品 -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import choseProducts from '@c/choseProducts/index'
import { getPurchaseOrderDetails, checkDepotMerchantRel, getDepotInfo, getPurchasePriceManage, saveOrUpdateTempOrder, checkContractNoAndPoNo, modifyPurchaseOrder } from '@a/purchaseManage/index'
import { getDepotDetails, getRateByCustomerAndMerchant } from '@a/salesManage/index'
import { getSMPriceByPurchaseOrder, getCurrencySelectBean } from '@a/base/index'
export default {
  mixins: [commomMix],
  components: {
    choseProducts
  },
  data() {
    return {
      ruleForm: {
        buId: '',
        id: '',
        paySubject: '',
        businessModel: '',
        depotId: '',
        supplierId: '',
        poNo: '',
        currency: '',
        attributionDateStr: '',
        lbxNo: '',
        inCustomsId: '',
        // 物流信息
        transport: '',
        standardCaseTeu: '',
        trainNumber: '',
        contractNo: '',
        loadPort: '',
        unloadPort: '',
        carrier: '',
        ladingBill: '',
        grossWeight: '',
        torrNum: '',
        boxNum: '',
        arriveDepotDateStr: '',
        destinationPortName: '',
        packType: '',
        payRules: '',
        blNo: '',
        imExpPort: '',
        shipper: '',
        mark: '',
        destinationName: '',
        invoiceNo: '',
        paymentDateStr: '',
        shipDateStr: '',
        deliveryAddr: '',
        channel: '',
        arriveDateStr: '',
        remark: '',
        tallyingUnit: '',
        oldLbxNo: '',
        oldContractNo: '',
        oldPoNo: ''
      },
      rules: {
        supplierId: {required: true, message: '请选择供应商', trigger: 'change'},
        paySubject: {required: true, message: '请选择付款主体', trigger: 'change'},
        businessModel: {required: true, message: '请选择业务模式', trigger: 'change'},
        depotId: {required: true, message: '请选择入库仓库', trigger: 'change'},
        buId: {required: true, message: '请选择事业部', trigger: 'change'},
        poNo: {required: true, message: '请输入PO号', trigger: 'blur'},
        transport: {required: false, message: '请选择运输方式', trigger: 'change'},
        loadPort: {required: false, message: '请输入装货港', trigger: 'blur'},
        unloadPort: {required: false, message: '请选择卸货港', trigger: 'change'},
        carrier: {required: false, message: '请输入承运商', trigger: 'blur'},
        currency: {required: true, message: '采购币种不能为空', trigger: 'change'},
        torrNum: {required: false, message: '请输入托数', trigger: 'blur'},
        attributionDateStr: {required: true, message: '归属日期不能为空', trigger: 'change'},
        contractNo: {required: false, message: '报关合同号不能为空', trigger: 'blur'},
        tallyingUnit: {required: true, message: '理货单位不能为空', trigger: 'change'}
      },
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      visible: { show: false },
      totalNum: '',
      totalAmount: '',
      totalTax: '',
      totalTaxAmount: '',
      totalGrossWeight: '',
      totalNetWeight: '',
      saveLoading: false,
      filterData: {},
      merchantName: '',
      tallyingUnitList: [
        { key: '00', value: '托盘' },
        { key: '01', value: '箱' },
        { key: '02', value: '件' }
      ],
      depotType: '',
      isTopBooks: '',
      isInOutInstruction: '',
      numLen: 3,
      addressSelect: false,
      purchasePriceManage: false,
      orderStatus: '',
      nextLoading: false,
      audit: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  watch: {
    depotType(val) {
      this.rules.contractNo.required = val === 'a' && +this.isTopBooks === 1
      this.rules.tallyingUnit.required = val === 'c'
      // 根据状态和仓库类型判断是否必填
      this.rules.transport.required = !(val === 'd' || this.orderStatus === '001')
      this.rules.torrNum.required = !(val === 'd' || this.orderStatus === '001')
      this.rules.unloadPort.required = !(val === 'd' || this.orderStatus === '001')
      this.rules.carrier.required = !(val === 'd' || this.orderStatus === '001')
      this.rules.loadPort.required = !(val === 'd' || this.orderStatus === '001')
    }
  },
  mounted() {
    this.setMerchantName()
    this.init()
  },
  methods: {
    async init() {
      const { query } = this.$route
      if (!query.id) return false
      this.audit = !!query.audit
      try {
        const res = await getPurchaseOrderDetails({ id: query.id })
        const { lbxNo, contractNo, poNo } = res.data
        for (let key in this.ruleForm) {
          this.ruleForm[key] = res.data[key] ? res.data[key] + '' : ''
          if (key.includes('Str')) {
            const key1 = key.replace(/Str/gi, '')
            this.ruleForm[key] = res.data[key1] ? res.data[key1].toString() : ''
          }
        }
        this.ruleForm.oldLbxNo = lbxNo + '' || ''
        this.ruleForm.oldContractNo = contractNo + '' || ''
        this.ruleForm.oldPoNo = poNo + '' || ''
        this.orderStatus = res.data.status || ''
        // 根据事业部获取入库仓库下拉列表
        this.changeBuId('init')
        // 根据入库仓库获取入库关区列表
        this.changeDepotId('init')
        const list = []
        if (res.data.itemList && res.data.itemList.length > 0) {
          res.data.itemList.forEach(item => {
            // 获取表格需要的数据
            const { goodsId, id, contractNo, goodsName, barcode, goodsNo, goodsCode, num, price, amount, boxNo, batchNo, constituentRatio, brandName } = item
            const { grossWeight, netWeight, taxAmount, taxPrice, tax, remark, taxRate, grossWeightSum, netWeightSum } = item
            let taxAmountNew = taxRate && Number(taxRate) > 0 ? taxAmount : amount
            list.push({
              goodsId,
              id,
              contractNo,
              goodsName,
              barcode,
              goodsNo,
              goodsCode,
              num,
              price,
              amount,
              boxNo,
              batchNo,
              constituentRatio,
              brandName,
              grossWeight: grossWeight || 0,
              netWeight: netWeight || 0,
              taxAmount: taxAmountNew,
              taxPrice,
              tax,
              remark,
              taxRate: taxRate || '0.00',
              grossWeightSum: grossWeightSum || grossWeight || 0,
              netWeightSum: netWeightSum || netWeight || 0
            })
          })
        }
        this.tableData.list = list
        this.countTotal() // 计算各总数
      } catch (err) {}
    },
    async comfirm(data) {
      if (!data) {
        this.$errorMsg('请选择商品！')
        return false
      }
      const list = []
      let unitChangeFlag = true
      let goodsFlag = true
      let goodsNo = ''
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        const jsonData = {
          customerId: this.ruleForm.supplierId,
          currency: this.ruleForm.currency,
          commbarcode: item.commbarcode,
          buId: this.ruleForm.buId
        }
        if (this.ruleForm.attributionDateStr) {
          jsonData.effectiveDateStr = this.ruleForm.attributionDateStr
        }
        let price = item.supplyMinPrice || 0
        if (this.purchasePriceManage) {
          const result = await getSMPriceByPurchaseOrder(jsonData)
          if (result.data && result.data.supplyPrice) {
            price = result.data.supplyPrice
            if (this.depotType === 'c') {
              if (this.ruleForm.tallyingUnit === '00') {
                if (!result.data.torrToUnit) {
                  this.$errorMsg('货号:' + item.goodsNo + '未找到托转件数据')
                  unitChangeFlag = false
                  break
                } else {
                  price = parseFloat(price) * result.data.torrToUnit
                }
              } else if (this.ruleForm.tallyingUnit === '01') {
                if (!result.data.boxToUnit) {
                  this.$errorMsg('货号:' + item.goodsNo + '未找到托转件数据')
                  unitChangeFlag = false
                  break
                } else {
                  price = parseFloat(price) * result.data.boxToUnit
                }
              }
            }
          } else {
            goodsFlag = false
            goodsNo = item.goodsNo
            break
          }
        }
        const { grossWeight, netWeight, grossWeightSum, netWeightSum } = item
        list.push({
          goodsId: item.id,
          id: item.id,
          contractNo: '',
          goodsName: item.name,
          barcode: item.barcode || '',
          goodsNo: item.goodsNo,
          goodsCode: item.goodsCode || '',
          num: 1,
          price,
          amount: '',
          boxNo: '',
          batchNo: '',
          constituentRatio: item.component || '',
          brandName: '境外品牌(其他)',
          grossWeight: grossWeight || 0,
          netWeight: netWeight || 0,
          taxAmount: '',
          tax: '',
          remark: '',
          taxRate: '',
          grossWeightSum: grossWeightSum || grossWeight || 0,
          netWeightSum: netWeightSum || netWeight || 0
        })
      }
      if (!unitChangeFlag) return false
      if (!goodsFlag) {
        this.visible.show = false
        this.$alertError('该公司事业部已开启采购价格管理，货号：' + goodsNo + '未找到供应商商品价格')
        return false
      }
      this.tableData.list = [...this.tableData.list, ...list]
      this.countTotal()
      this.countWeight()
      this.visible.show = false
      // 根据供应商带出对应税率
      this.$nextTick(async() => {
        const res = await getRateByCustomerAndMerchant({ customerId: this.ruleForm.supplierId })
        const taxRateId = res.data.rateId || ''
        const targetData = this.selectOpt.raxList.find(item => +item.key === +taxRateId) || {}
        this.tableData.list.forEach(item => { item.taxRate = targetData.value || '0.00' })
      })
    },
    async save() {
      if (!this.ruleForm.buId) {
        this.$errorMsg('事业部不能为空！')
        return false
      }
      let flag = true
      for (let i = 0; i < this.tableData.list.length; i++) {
        const { num } = this.tableData.list[i]
        const tips = `表格第${i + 1}行,`
        if (!num || num < 0) {
          this.$errorMsg(tips + '数量要大于0')
          flag = false
          break
        }
      }
      if (!flag) return false
      this.saveLoading = true
      try {
        const opt = this.handleCommitOpt()
        if (!opt.tallyingUnit) delete opt.tallyingUnit
        await saveOrUpdateTempOrder(opt)
        this.$successMsg('编辑成功')
        this.closeTag()
      } catch (error) {
        console.log(error)
      }
      this.saveLoading = false
    },
    async choseGoods() {
      const { depotId, buId, supplierId, tallyingUnit } = this.ruleForm
      if (!buId) {
        this.$errorMsg('请选择事业部')
        return false
      }
      if (!depotId) {
        this.$errorMsg('请选择仓库')
        return false
      }
      if (!supplierId) {
        this.$errorMsg('请选择供应商')
        return false
      }
      const res = await getPurchasePriceManage({ buId, supplierId })
      this.purchasePriceManage = res.data
      if (this.purchasePriceManage && this.depotType === 'c') {
        if (!tallyingUnit) {
          this.$errorMsg('仓库为海外仓时，请先选择【理货单位】')
          return false
        }
      }
      const unNeedIds = this.tableData.list.map(item => item.goodsId).toString()
      this.filterData = {
        depotId,
        unNeedIds: unNeedIds,
        popupType: 1
      }
      this.visible.show = true
    },
    async setMerchantName() {
      const userInfo = this.getUserInfo()
      this.merchantName = userInfo.merchantName || ''
    },
    // 选中事业部
    async changeBuId(type) {
      delete this.selectOpt.depotIdList
      const { buId } = this.ruleForm
      // 获取入库仓库
      this.getSelectBeanByMerchantBuRel('depotIdList', { buId, type: 'a,c,d' })
      if (type !== 'init') { // 不是初始时,清空
        this.ruleForm.depotId = ''
      }
    },
    // 选中入库仓库
    async changeDepotId(type) {
      const { depotId } = this.ruleForm
      if (depotId) {
        delete this.selectOpt.goongyingList
        this.getSelectCustomsArea('customsAreaList', { depotId })
        const res = await getDepotDetails({ id: depotId })
        this.isTopBooks = res.data.isTopBooks || ''
        this.depotType = res.data.type || ''
        if (this.depotType === 'a') {
          const res1 = await checkDepotMerchantRel({ depotId })
          this.isInOutInstruction = res1.data.isInOutInstruction + ''
          if (this.ruleForm.unloadPort === 'other') this.ruleForm.unloadPort = ''
        }
        // 根据入仓仓库改变目的地
        const res2 = await getDepotInfo({ depotId })
        if (res2.data + '' === '1') {
          this.addressSelect = true // 目的地名称是否选择框
          // 获取下拉数据
          delete this.selectOpt.arrList
          this.getdepotArrList('arrList', { depotId })
        } else {
          this.addressSelect = false
        }
      }
      if (type !== 'init') { // 不是初始时,清空
        this.ruleForm.inCustomsId = ''
        this.tableData.list = []
        this.countTotal()
      }
    },
    // 选中供应商
    async changeSupplierId() {
      const { supplierId } = this.ruleForm
      if (supplierId) {
        const res = await getCurrencySelectBean({ customerId: supplierId })
        // 根据供应商选择带出对应的币种
        this.ruleForm.currency = res.data || ''
      }
    },
    // 改变总毛重 计算各毛重
    changeGrossWeight() {
      if (!this.ruleForm.grossWeight) this.ruleForm.grossWeight = '0'
      if (isNaN(this.ruleForm.grossWeight)) this.ruleForm.grossWeight = '0'
      let maxlen = 3
      if ((this.ruleForm.grossWeight + '').includes('.')) {
        const arr = (this.ruleForm.grossWeight + '').split('.')
        maxlen = arr[1].length
      }
      this.totalGrossWeight = this.ruleForm.grossWeight
      let total = 0
      let num = 0
      const len = this.tableData.list.length
      this.tableData.list.forEach(item => {
        total += (+item.netWeightSum)
      })
      this.tableData.list.forEach((item, i) => {
        if (this.ruleForm.grossWeight === 0 || total === 0) {
          item.grossWeightSum = 0
        } else {
          const { netWeightSum = 0 } = item
          const kola = (netWeightSum / total) * this.ruleForm.grossWeight
          if (i < len - 1) {
            item.grossWeightSum = kola.toFixed(maxlen)
            num = num + kola
          } else {
            const lastNum = this.ruleForm.grossWeight - num
            item.grossWeightSum = lastNum && lastNum > 0 ? lastNum.toFixed(maxlen) : 0
          }
        }
      })
    },
    // 计算各总数
    countTotal() {
      let totalNum = 0
      let totalAmount = 0
      let totalTax = 0
      let totalTaxAmount = 0
      let totalGrossWeight = 0
      let totalNetWeight = 0
      this.tableData.list.forEach(item => {
        const { num, amount, tax, taxAmount, grossWeightSum, netWeightSum } = item
        totalNum = totalNum + (+num || 0)
        totalAmount = totalAmount + (+amount || 0)
        totalTax = totalTax + (+tax || 0)
        totalTaxAmount = totalTaxAmount + (+taxAmount || 0)
        totalGrossWeight = totalGrossWeight + (+grossWeightSum || 0)
        totalNetWeight = totalNetWeight + (+netWeightSum || 0)
      })
      this.totalNum = totalNum
      this.totalAmount = totalAmount.toFixed(2)
      this.totalTaxAmount = totalTaxAmount.toFixed(2)
      this.totalGrossWeight = totalGrossWeight.toFixed(5)
      this.totalNetWeight = totalNetWeight.toFixed(5)
      this.totalTax = totalTax.toFixed(2)
      this.ruleForm.grossWeight = totalGrossWeight.toFixed(5)
    },
    // 计算总毛重
    countWeight() {
      let totalGrossWeight = 0
      let maxlen = 0
      this.tableData.list.forEach(item => {
        const { grossWeightSum } = item
        totalGrossWeight = totalGrossWeight + (+grossWeightSum || 0)
        // 获取各毛重小数点最大长度
        if ((grossWeightSum + '').includes('.')) {
          const arr = (grossWeightSum + '').split('.')
          const len = arr[1].length
          if (len > maxlen) maxlen = len
        }
      })
      this.ruleForm.grossWeight = maxlen > 0 ? totalGrossWeight.toFixed(maxlen) : totalGrossWeight
      this.totalGrossWeight = totalGrossWeight.toFixed(5)
    },
    // 计算净重
    // 输入采购数量/单价
    changeNumOrPrice(index) {
      let { price, num, taxRate, grossWeight, netWeight } = this.tableData.list[index]
      num = +num || 0
      price = +price || 0
      taxRate = +taxRate || 0
      grossWeight = +grossWeight || 0
      netWeight = +netWeight || 0
      const amount = price * num
      const taxAmount = amount * (1 + taxRate)
      const tax = taxAmount - amount
      this.tableData.list[index].amount = amount.toFixed(2)
      if (taxRate > 0) {
        this.tableData.list[index].taxAmount = taxRate > 0 ? taxAmount.toFixed(2) : ''
        this.tableData.list[index].tax = taxRate > 0 ? tax.toFixed(2) : ''
      }
      this.tableData.list[index].grossWeightSum = (grossWeight * num).toFixed(5)
      this.tableData.list[index].netWeightSum = (netWeight * num).toFixed(5)
      this.countTotal()
    },
    // 改变采购总金额(不含税)
    changeAmount(index) {
      let { amount, num, taxRate } = this.tableData.list[index]
      taxRate = taxRate ? Number(taxRate) : 0
      amount = amount ? Number(amount) : 0
      const price = num > 0 ? amount / num : ''
      const taxAmount = amount * (1 + taxRate)
      const tax = taxAmount - amount
      this.tableData.list[index].price = price.toFixed(8)
      if (taxRate > 0) {
        this.tableData.list[index].tax = taxRate > 0 ? tax.toFixed(2) : '0'
        this.tableData.list[index].taxAmount = taxRate > 0 ? taxAmount.toFixed(2) : '0'
      }
      this.countTotal()
    },
    // 改变采购总金额(含税)
    changeTaxAmount(index) {
      let { taxAmount, num, taxRate } = this.tableData.list[index]
      taxAmount = +taxAmount || 0
      taxRate = +taxRate || 0
      taxRate = +taxRate || 0
      const amount = taxAmount / (1 + taxRate)
      const price = amount / num
      const tax = taxAmount - amount
      if (taxRate > 0) {
        this.tableData.list[index].amount = amount.toFixed(2)
        this.tableData.list[index].tax = tax.toFixed(2)
        this.tableData.list[index].price = price.toFixed(8)
      }
      this.countTotal()
    },
    // 修改税率
    changeTaxRate(index) {
      let { taxRate, amount } = this.tableData.list[index]
      if (!taxRate) return false
      amount = +amount || 0
      taxRate = +taxRate
      if (amount > 0) {
        const taxAmount = amount * (1 + taxRate)
        const tax = taxAmount - amount
        this.tableData.list[index].taxAmount = taxAmount.toFixed(2)
        this.tableData.list[index].tax = tax.toFixed(2)
        this.countTotal()
      }
    },
    // 点击删除
    dele() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      const arr = this.tableChoseList.map(item => item.goodsNo)
      const list = []
      this.tableData.list.map((item) => {
        if (!arr.includes(item.goodsNo)) {
          list.push(item)
        }
      })
      this.tableData.list = list
      this.countTotal()
    },
    // 点击下一步
    nextTo() {
      // 数据校验
      this.$refs['ruleForm'].validate(async(valid) => {
        if (!valid) {
          this.$errorMsg('请先完善信息')
          return false
        }
        this.nextLoading = true
        try {
          if (this.ruleForm.boxNum && isNaN(this.ruleForm.boxNum)) {
            this.$errorMsg('箱数请输入数值！')
            throw new Error(false)
          }
          if (this.ruleForm.torrNum && isNaN(this.ruleForm.torrNum)) {
            this.$errorMsg('托数请输入数值！')
            throw new Error(false)
          }
          const result = await getDepotDetails({ id: this.ruleForm.depotId })
          // const isRookie = result.data.name.indexOf("菜鸟") !== -1
          const isDx = result.data.type === 'a' && result.data.isTopBooks + '' === '1'
          const isOverseas = result.data.type === 'c'
          // 如果仓库为卓志保税仓且是代销仓，报关合同号必填
          if (this.orderStatus === '002' && isDx && !this.ruleForm.contractNo) {
            this.$errorMsg('仓库为卓志保税仓且是代销仓时，报关合同号必填！')
            throw new Error(false)
          }
          // 如果仓库为海外仓，海外仓理货单位必填
          if (isOverseas && !this.ruleForm.tallyingUnit) {
            this.$errorMsg('仓库为海外仓时，理货单位必填！')
            throw new Error(false)
          }
          if (this.tableData.list.length < 1) {
            this.$errorMsg('请选择商品')
            throw new Error(false)
          }
          // 校验表格数据
          let flag = true
          for (let i = 0; i < this.tableData.list.length; i++) {
            let { num, brandName, price = '', grossWeightSum, netWeightSum } = this.tableData.list[i]
            const tips = `表格第${i + 1}行,`
            if (!num || num < 0) {
              this.$errorMsg(tips + '数量要大于0')
              flag = false
              break
            }
            if (price === '' || Number(price) < 0) {
              this.$errorMsg(tips + '采购单价(不含税)不能为空且不能小于0')
              flag = false
              break
            }
            if (!brandName) {
              this.$errorMsg(tips + '品牌类型不能为空！')
              flag = false
              break
            }
            if (this.orderStatus === '002') {
              // 毛重
              if (grossWeightSum === '' || grossWeightSum === null || grossWeightSum === undefined) {
                this.$errorMsg(tips + '毛重至少为0！')
                flag = false
                break
              }
              // 毛重
              if (netWeightSum === '' || netWeightSum === null || netWeightSum === undefined) {
                this.$errorMsg(tips + '净重至少为0！')
                flag = false
                break
              }
            }
            if (grossWeightSum && netWeightSum) {
              grossWeightSum = Number(grossWeightSum)
              netWeightSum = Number(netWeightSum)
              if (grossWeightSum < netWeightSum) {
                this.$errorMsg(tips + '毛重不能小于净重')
                flag = false
                break
              }
            }
          }
          if (!flag) throw new Error(false)
          this.saveDataOne()
        } catch (error) {
          console.log(error)
        }
        this.nextLoading = false
      })
    },
    // 下一步保存数据
    saveDataOne() {
      this.nextLoading = false
      this.$confirm('确定提交该采购订单？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const { contractNo, oldContractNo, poNo, oldPoNo } = this.ruleForm
        const opt = {
          contractNo: contractNo === oldContractNo ? '' : contractNo,
          poNo: poNo === oldPoNo ? '' : poNo
        }
        // 校验报关合同号是否存在，存在给予提示
        const result = await checkContractNoAndPoNo(opt)
        if (!result.data) {
          this.commitSave()
        } else {
          this.$confirm(result.data, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async() => {
            this.commitSave()
          })
        }
      })
    },
    // 下一步提交数据
    async commitSave() {
      const opt = this.handleCommitOpt()
      if (!opt.tallyingUnit) delete opt.tallyingUnit
      try {
        this.nextLoading = true
        const res = await modifyPurchaseOrder(opt)
        this.$successMsg('编辑成功，请编辑合同')
        this.closeTagByIndex(this.$route.path, () => {
          this.linkTo('/purchase/contract?id=' + res.data + '&customerId=' + this.ruleForm.supplierId)
        })
      } catch (error) {
        console.log(error)
      }
      this.nextLoading = false
    },
    changeTorrNum() {
      this.ruleForm.packType = (this.ruleForm.torrNum ? this.ruleForm.torrNum + '托' : '') + (this.ruleForm.boxNum ? this.ruleForm.boxNum + '箱' : '')
    },
    // 统一处理提交参数
    handleCommitOpt() {
      // 参数为字符串
      for (let key in this.ruleForm) {
        this.ruleForm[key] = this.ruleForm[key] ? this.ruleForm[key] + '' : ''
      }
      const list = []
      this.tableData.list.forEach(item => {
        for (let key in item) {
          item[key] = item[key] ? item[key] + '' : ''
        }
        let { contractNo, goodsId, num, amount, price, boxNo, batchNo, constituentRatio, brandName, grossWeight, grossWeightSum, netWeight, netWeightSum, barcode, remark, taxAmount, taxRate, tax } = item
        // 数值输入框为空时,统一处理为0
        const taxPrice = taxAmount && num ? (+taxAmount / +num).toFixed(2) : '0'
        num = num || '0'
        price = price ? (+price).toFixed(8) : '0'
        amount = amount || '0'
        grossWeight = grossWeight || '0'
        grossWeightSum = grossWeightSum || '0'
        netWeight = netWeight || '0'
        netWeightSum = netWeightSum || '0'
        taxRate = taxRate || '0'
        tax = tax || '0'
        taxAmount = taxRate > 0 ? taxAmount : amount // 如果税率为0, 含税金额与不含税金额保持一致
        list.push({contractNo, goodsId, num, amount, price: price, boxNo, batchNo, constituentRatio, brandName, grossWeight, grossWeightSum: grossWeightSum, netWeight, netWeightSum: netWeightSum, barcode, remark, taxAmount, taxPrice, taxRate, tax})
      })
      const opt = {
        ...this.ruleForm,
        items: JSON.stringify(list)
      }
      return opt
    }
  }
}
</script>
<style>
  .edit-bx .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 130px;
}
.edit-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
</style>
<style lang="scss" scoped>
.image-preview{
  display: inline-block;
}
.title-bx{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tongji-item{
  display: inline-block;
  width: 220px;
}
</style>
