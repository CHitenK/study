<template>
    <div class="page-bx bgc-w edit-bx yushen-edit-bx">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" >
        <!-- 面包屑 -->
       <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
        <!-- 面包屑 end -->
        <!-- 基本信息 -->
        <JFX-title title="基本信息" className="mr-t-10 title-bx " :class="openState.base ? 'bor-n' : ''">
          <el-button type="text" @click="openState.base = !openState.base">{{openState.base ? '收起' : '展开'}}</el-button>
        </JFX-title>
        <el-row  :gutter="10" class="fs-14 clr-II" :class="openState.base ? 'edit-row-bor open' : 'dedit-row close'">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="预申报单：" prop="code">
              <el-input v-model="ruleForm.code" placeholder="请输入" clearable disabled />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="客户：" prop="customerId">
              <el-select v-model="ruleForm.customerId"
                         placeholder="请选择"
                         clearable
                         filterable
                         :data-list="getCustomerSelectBean('customerList')">
                <el-option
                  v-for="item in selectOpt.customerList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="PO单号：" prop="poNo">
              <el-input v-model="ruleForm.poNo" placeholder="多PO输入时以&字符隔开" clearable disabled />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="出库仓库：" prop="outDepotId" ref="outDepotId">
              <el-select v-model="ruleForm.outDepotId"
                         placeholder="请选择"
                         clearable
                         filterable
                         disabled
                         @change="outDepotChange"
                         :data-list="getSelectBeanByMerchantRel('out_warehousesList')">
                <el-option
                  v-for="item in selectOpt.out_warehousesList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" ref="buId">
              <el-select v-model="ruleForm.buId"
                         placeholder="请选择"
                         clearable
                         filterable
                         disabled
                         :data-list="getBUSelectBean('bu_list')">
                <el-option
                  v-for="item in selectOpt.bu_list"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="销售订单号：" prop="saleOrderCodes">
              <el-input v-model="ruleForm.saleOrderCodes" placeholder="请输入" clearable disabled />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="LBX单号：" prop="lbxNo">
              <el-input v-model="ruleForm.lbxNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="入库仓库：" prop="inDepotId">
              <el-select v-model="ruleForm.inDepotId"
                         placeholder="请选择"
                         clearable
                         filterable
                         @change="inDepotChange"
                         :data-list="getSelectBeanByMerchantRel('in_warehousesList')">
                <el-option
                  v-for="item in selectOpt.in_warehousesList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :span="12">
            <el-form-item label="贸易条款：" prop="tradeTerms" >
              <el-radio-group v-model="ruleForm.tradeTerms" :data-list="getSelectList('saleOrder_tradeTermsList')" >
                <el-radio v-for="item in selectOpt.saleOrder_tradeTermsList"
                          :key="item.key"
                          :label="item.key">{{item.value}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="销售币种：" prop="currency" ref="currency">
              <el-select v-model="ruleForm.currency"
                         placeholder="请选择"
                         clearable
                         filterable
                         :data-list="getCurrencySelectBean('currencyList')">
                <el-option
                  v-for="item in selectOpt.currencyList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />、
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="海外仓理货单位：" prop="tallyingUnit" >
              <el-radio-group v-model="ruleForm.tallyingUnit">
                <el-radio v-for="item in tallyingUnitList"
                          :key="item.key"
                          :label="item.key">{{item.value}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 基本信息 end -->
        <!-- 地点及计划 -->
        <JFX-title title="地点及计划" className="mr-t-20 title-bx" :class="openState.address ? 'bor-n' : ''">
          <el-button type="text" @click="openState.address = !openState.address">{{openState.address ? '收起' : '展开'}}</el-button>
        </JFX-title>
        <el-row  :gutter="10" class="fs-12 clr-II" :class="openState.address ? 'edit-row-bor open' : 'dedit-row close'">
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="装货港：" prop="loadPort" >
              <el-input v-model.trim="ruleForm.loadPort" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="目的地名称：" prop="destination" >
              <el-input v-model.trim="ruleForm.destination" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="目的港名称：" prop="destinationPort" >
              <el-input v-model.trim="ruleForm.destinationPort" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="卸货港：" prop="portDes" >
              <el-select v-model="ruleForm.portDes"
                         style="width: 100%"
                         placeholder="请选择"
                         filterable
                         clearable>
                <el-option
                  v-for="item in unloadPortList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="出库地点：" prop="deliveryAddr" >
              <el-input v-model.trim="ruleForm.deliveryAddr" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="进出口口岸：" prop="imExpPort" >
              <el-input v-model.trim="ruleForm.imExpPort" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="出库关区：" prop="outCustomsId" >
              <el-select v-model="ruleForm.outCustomsId"
                         style="width: 100%"
                         placeholder="请选择"
                         filterable
                         clearable>
                <el-option
                  v-for="item in outCustomsList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="入库关区：" prop="inCustomsId" >
              <el-select v-model="ruleForm.inCustomsId"
                         style="width: 100%"
                         placeholder="请选择"
                         filterable
                         clearable>
                <el-option
                  v-for="item in inCustomsList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="装船时间：" prop="shipDate" >
              <el-date-picker
                v-model="ruleForm.shipDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="启运港：" prop="departurePort" >
              <el-input v-model.trim="ruleForm.departurePort" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="备注：" prop="remark" >
              <el-input v-model.trim="ruleForm.remark" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 地点及计划 end -->
        <!-- 物流信息 -->
        <JFX-title title="物流信息" className="mr-t-20 title-bx" :class="openState.logisc ? 'bor-n' : ''" >
          <el-button type="text" @click="openState.logisc = !openState.logisc">{{openState.logisc ? '收起' : '展开'}}</el-button>
        </JFX-title>
        <el-row  :gutter="10" class="fs-12 clr-II" :class="openState.logisc ? 'edit-row-bor open' : 'dedit-row close'">
          <el-col class="mr-b-0" :span="12">
            <el-form-item label="运输方式：" prop="transport" >
              <el-radio-group v-model="ruleForm.transport" :data-list="getSelectList('transportList')">
                <el-radio v-for="item in selectOpt.transportList"
                          :key="item.key"
                          :label="item.key">{{item.value}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="境外发货人：" prop="shipper" >
              <el-input v-model.trim="ruleForm.shipper" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="承运商：" prop="carrier" >
              <el-input v-model.trim="ruleForm.carrier" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="发票号：" prop="invoiceNo" >
              <el-input v-model.trim="ruleForm.invoiceNo" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="报关合同号：" prop="contractNo" >
              <el-input v-model.trim="ruleForm.contractNo" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="头程提单号：" prop="ladingBill" >
              <el-input v-model.trim="ruleForm.ladingBill" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="二程提单号：" prop="blNo" >
              <el-input v-model.trim="ruleForm.blNo" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="车次：" prop="trainNo" jj="1122">
              <el-input v-model.trim="ruleForm.trainNo" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="托数：" prop="torrNum" >
              <el-input-number v-model.trim="ruleForm.torrNum" :precision="0" :controls="false" :min="0" style="width: 100%;" @change="changePackType"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="箱数：" prop="boxNum" >
              <el-input-number v-model.trim="ruleForm.boxNum" :precision="0" :controls="false" :min="0" style="width: 100%;" @change="changePackType"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :span="12" >
            <el-form-item label="托盘材质：" prop="torrPackType" >
              <el-radio-group v-model="ruleForm.torrPackType" :data-list="getSelectList('order_torrpacktypeList')" @change="changePackType">
                <el-radio v-for="item in selectOpt.order_torrpacktypeList" :key="item.key" :label="item.key" >{{item.value}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="包装方式：" prop="pack" >
              <el-input v-model.trim="ruleForm.pack" clearable style="width: 100%" placeholder="XX箱/xx托XXX"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="提单毛重（Kg）：" prop="billWeight" >
              <JFX-Input v-model.trim="ruleForm.billWeight" :min="0" :precision="5" placeholder="请输入" clearable @change="countWeight" />
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="车型及数量：" prop="motorcycleType" >
              <el-input v-model.trim="ruleForm.motorcycleType" clearable style="width: 100%" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="唛头：" prop="mark" >
              <el-input v-model.trim="ruleForm.mark" clearable style="width: 100%" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="标准箱TEU：" prop="teu" >
              <el-input v-model.trim="ruleForm.teu" clearable style="width: 100%" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 物流信息 end -->
        <!-- 物流委托书 -->
        <JFX-title title="物流委托书" className="mr-t-10 title-bx" :class="openState.weituo ? 'bor-n' : ''">
          <el-button type="text" @click="openState.weituo = !openState.weituo">{{openState.weituo ? '收起' : '展开'}}</el-button>
        </JFX-title>
        <el-row  :gutter="10" class="fs-12 clr-II" :class="openState.weituo ? 'edit-row-bor open' : 'dedit-row close'">
          <el-col class="mr-b-10" :span="24" >
            <el-form-item label="选择模板：" prop="logisticsAttorneyModel" >
              <el-select v-model="ruleForm.logisticsAttorneyModel" style="width: 320px;" placeholder="请选择" filterable clearable @change="changeTemplateLink">
                <el-option v-for="item in tempalteList"  :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-20" :xs="24" :sm="12" :md="8" :lg="8" :xl="8" >
            <div class="flex-bx">
              <span class="fs-14 clr-II">发货人/提货信息：</span>
              <el-select v-model="ruleForm.shipperTempId" style="width: 320px;" placeholder="请选择" filterable clearable  @change="changeTemplateItem('shipperTemp')">
                <el-option v-for="item in shipperTempList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
            <div class="flex-bx mr-t-5">
              <el-input v-model="ruleForm.shipperText" type="textarea" :rows="6" clearable style="width: 500px" ></el-input>
            </div>
          </el-col>
          <el-col class="mr-b-20" :xs="24" :sm="12" :md="8" :lg="8" :xl="8" >
            <div class="flex-bx">
              <span class="fs-14 clr-II">收货人/卸货信息：</span>
              <el-select v-model="ruleForm.consigneeTempId" style="width: 320px;" placeholder="请选择" filterable clearable @change="changeTemplateItem('consigneeTemp')" >
                <el-option v-for="item in consigneeTempList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
            <div class="flex-bx mr-t-5">
              <el-input v-model="ruleForm.consigneeText" type="textarea" :rows="6" clearable style="width: 500px" ></el-input>
            </div>
          </el-col>
          <el-col class="mr-b-20" :xs="24" :sm="12" :md="8" :lg="8" :xl="8" >
            <div class="flex-bx">
              <span class="fs-14 clr-II">通知人：</span>
              <el-select v-model="ruleForm.notifierTempId" style="width: 320px;" placeholder="请选择" filterable clearable @change="changeTemplateItem('notifierTemp')">
                <el-option v-for="item in notifierTempList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
            <div class="flex-bx mr-t-5">
              <el-input v-model="ruleForm.notifierText" type="textarea" :rows="6" clearable style="width: 500px" ></el-input>
            </div>
          </el-col>
          <el-col class="mr-b-20" :xs="24" :sm="12" :md="8" :lg="8" :xl="8" >
            <div class="flex-bx">
              <span class="fs-14 clr-II">对接人：</span>
              <el-select v-model="ruleForm.dockingTempId" style="width: 320px;" placeholder="请选择" filterable clearable @change="changeTemplateItem('dockingTemp')">
                <el-option v-for="item in dockingTempList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
            <div class="flex-bx mr-t-5">
              <el-input v-model="ruleForm.dockingText" type="textarea" :rows="6" clearable style="width: 500px" ></el-input>
            </div>
          </el-col>
          <el-col class="mr-b-20" :xs="24" :sm="12" :md="8" :lg="8" :xl="8" >
            <div class="flex-bx">
              <span class="fs-14 clr-II">承运商信息：</span>
              <el-select v-model="ruleForm.carrierInformationTempId" style="width: 320px;" placeholder="请选择" filterable clearable @change="changeTemplateItem('carrierInformationTemp')">
                <el-option v-for="item in carrierInformationTempList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
            <div class="flex-bx mr-t-5">
              <el-input v-model="ruleForm.carrierInformationText" type="textarea" :rows="6" clearable style="width: 500px" ></el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 物流委托书 end -->
        <!-- 收件信息 -->
        <JFX-title title="收件信息" className="mr-t-15 bor-n" :class="openState.receive ? 'bor-n' : ''">
          <el-button type="text" @click="openState.receive = !openState.receive">{{openState.receive ? '收起' : '展开'}}</el-button>
        </JFX-title>
        <el-row :gutter="10" class="fs-12 clr-II" :class="openState.receive ? 'edit-row-bor open' : 'dedit-row close'">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="提货方式：" prop="mailMode">
              <el-select v-model="ruleForm.mailMode"
                         placeholder="请选择"
                         clearable
                         @change="mailModeChange"
                         :data-list="getSelectList('saleOrder_mailModeList')">
                <el-option
                  v-for="item in selectOpt.saleOrder_mailModeList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="收货人姓名：" prop="receiverName">
              <el-input v-model="ruleForm.receiverName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="国家" prop="country">
              <el-input v-model="ruleForm.country" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="详细地址：" prop="receiverAddress" class="textarea-con">
              <el-input v-model="ruleForm.receiverAddress" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 收件信息 end -->
        <!-- 表格 -->
        <JFX-title title="商品信息" className="mr-t-10 mr-t-20 title-bx">
          <div>
            <el-button type="primary"
                       @click="showChoseProducts">选择商品</el-button>
            <el-button type="primary"
                       @click="delTableItems">删除</el-button>
         </div>
        </JFX-title>
        <JFX-table :tableData.sync="tableData"
                   :showPagination="false"
                   @selection-change="selectionChange">
          <el-table-column type="selection"
                           align="center"
                           width="55"
          ></el-table-column>
          <el-table-column prop="seq"
                           align="center"
                           width="100"
                           label="序号">
            <template slot-scope="{row}">
              <el-input-number v-model.trim="row.seq"
                               :precision="0"
                               :controls="false"
                               :min="0"
                               style="width: 100%"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="saleOrderCode"
                           align="center"
                           label="销售订单号"
                           width="140"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="poNo"
                           align="center"
                           label="po号"
                           width="140"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="goodsNo"
                           align="center"
                           label="商品货号"
                           width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="goodsName"
                           align="center"
                           label="商品名称"
                           min-width="150"
                           show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="goodsCode"
                           align="center"
                           label="商品编码"
                           width="140"
                           show-overflow-tooltip
          ></el-table-column>
          <!-- 销售数量 -->
          <el-table-column align="center" width="110">
            <template slot="header">
              <span class="need">申报数量</span>
            </template>
            <template slot-scope="{row, $index}">
              <el-input-number v-model.trim="row.num"
                               :precision="0"
                               :min="0"
                               :controls="false"
                               style="width: 100%"
                               @blur="count('num', $index)"
              ></el-input-number>
            </template>
          </el-table-column>
          <!-- 销售数量 end -->
          <!-- 销售单价 -->
          <el-table-column align="center"
                           width="150"
                           label="销售单价">
            <template slot-scope="{row}">
              <el-input-number v-model.trim="row.salePrice"
                               v-max-spot="8"
                               :precision="8"
                               :controls="false"
                               :min="0"
                               disabled
                               style="width: 100%"
              ></el-input-number>
            </template>
          </el-table-column>
          <!-- 销售单价 end -->
          <!-- 申报单价 -->
          <el-table-column align="center" width="150">
            <template slot="header">
              <span class="need" id="price">申报单价</span>
            </template>
            <template slot-scope="{row, $index}">
              <el-input-number v-model.trim="row.price"
                               v-max-spot="5"
                               :precision="5"
                               :controls="false"
                               :min="0"
                               style="width: 100%"
                               @blur="count('price', $index)"
              ></el-input-number>
            </template>
          </el-table-column>
          <!-- 申报单价 end -->
          <!-- 申报总金额RMB -->
          <el-table-column align="center" width="150" label="申报总金额（RMB）">
            <template slot-scope="{row, $index}">
              <el-input-number v-model.trim="row.amount"
                               v-max-spot="5"
                               :precision="5"
                               :controls="false"
                               :min="0"
                               style="width: 100%"
                               @blur="count('amount', $index)"
              ></el-input-number>
            </template>
          </el-table-column>
          <!-- 申报总金额RMB end -->
          <el-table-column prop="brandName"
                           align="center"
                           label="品牌类型"
                           width="120"
                           show-overflow-tooltip
          ></el-table-column>
          <!-- 毛重 -->
          <el-table-column align="center" width="150">
            <template slot="header">
              <span class="need">毛重</span>
            </template>
            <template slot-scope="{row}">
              <JFX-Input v-model.trim="row.grossWeightSum"
                         :precision="5"
                         :min="0"
                         style="width: 100%"
                         @change="countSumWeight"
              ></JFX-Input>
            </template>
          </el-table-column>
          <!-- 毛重 end -->
          <!-- 净重 -->
          <el-table-column align="center" width="150">
            <template slot="header">
              <span class="need">净重</span>
            </template>
            <template slot-scope="{row}">
              <JFX-Input v-model.trim="row.netWeightSum"
                         :precision="5"
                         :min="0"
                         style="width: 100%"
              ></JFX-Input>
            </template>
          </el-table-column>
          <!-- 净重 end -->
          <el-table-column align="center"
                           label="箱数"
                           width="150">
            <template slot-scope="{row}">
              <el-input-number v-model.trim="row.boxNum"
                              :precision="0"
                              :controls="false"
                              :min="0"
                              style="width: 100%"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="箱号"
                           width="150">
            <template slot-scope="{row}">
              <el-input v-model="row.boxNo" clearable />
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="托盘号"
                           width="150">
            <template slot-scope="{row}">
              <el-input v-model="row.torrNo" clearable />
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="成分占比"
                           width="200">
            <template slot-scope="{row}">
              <el-input type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4 }"
                        v-model="row.component"
                        clearable
              ></el-input>
            </template>
          </el-table-column>
        </JFX-table>
        <!-- 表格 end-->
        <!-- 附件列表 -->
        <JFX-title title="附件列表" className="mr-t-20" v-if="ruleForm.code" />
        <div class="mr-t-15 mr-b-15 fs-14 clr-II" v-if="ruleForm.code">
          <JFX-upload
            @success="successUploadFujian"
            :url="action"
            :limit="10000"
            :multiple="false"
          >
            <el-button id="sale-upload-btn" type="primary">上传附件</el-button>
            <span class="clr-II fs-10 margin-left: 4px;">(支持JPG、JPEG、BMP、PNG、GIF、PDF、DOCX、DOC、XLS、XLSX格式)</span>
          </JFX-upload>
        </div>
        <EnclosureList :code="ruleForm.code" ref="enclosure" v-if="ruleForm.code" />
        <!-- 附件列表 end -->
      </el-form>
      <!-- 操作 -->
      <div class="mr-t-30 flex-c-c">
        <el-button type="primary" @click="saveForm" id="pur_save_btn" :loading="saveLoading">保 存</el-button>
        <el-button id="pur_cancle_btn" @click="closeTag">取 消</el-button>
      </div>
      <!-- 操作 end -->
      <!-- 选择商品 -->
      <DeclarChoseProducts v-if="choseProducts.visible.show"
                           :isVisible="choseProducts.visible"
                           :filterData="choseProducts.filterData"
                           @comfirm="comfirmChoseProducts"
      ></DeclarChoseProducts>
      <!-- 选择商品 end -->
    </div>
</template>
<script>
import commomMix from '@m/index'
import {
  listTemplateLink,
  listTemplate
} from '@a/purchaseManage/index'
import { getBaseUrl } from '@u/tool'
import { attachmentUploadFiles } from '@a/base/index'
import {
  searchDetail,
  saveSaleDeclareOrder,
  getDepotDetails,
  getCustomsAreaList
} from '@a/salesManage/index'
export default {
  mixins: [commomMix],
  components: {
    // 选择商品
    DeclarChoseProducts: () => import('./components/DeclarChoseProducts'),
    // 附件列表
    EnclosureList: () => import('@c/enclosureList/index')
  },
  data() {
    return {
      // 面包屑
      breadcrumb: [
        { path: '', meta: { title: '销售管理' } },
        { path: '/sales/PreDeclarationList', meta: { title: '销售预申报单列表' } },
        { path: '/sales/PreDeclarationEdit', meta: { title: '销售预申报单编辑' } }
      ],
      // 表单数据
      ruleForm: {
        // 基本信息
        code: '',
        customerId: '',
        outDepotId: '',
        poNo: '',
        buId: '',
        saleOrderIds: '',
        saleOrderCodes: '',
        lbxNo: '',
        inDepotId: '',
        currency: '',
        tallyingUnit: '',
        tradeTerms: '',
        // 地点及计划
        loadPort: '',
        destination: '',
        destinationPort: '',
        portDes: '',
        deliveryAddr: '',
        imExpPort: '',
        outCustomsId: '',
        inCustomsId: '',
        shipDate: '',
        departurePort: '',
        remark: '',
        // 物流信息
        transport: '',
        shipper: '',
        carrier: '',
        invoiceNo: '',
        contractNo: '',
        ladingBill: '',
        blNo: '',
        trainNo: '',
        torrNum: '',
        boxNum: '',
        torrPackType: '',
        pack: '',
        billWeight: '',
        motorcycleType: '',
        mark: '',
        teu: '',
        // 物流委托书
        logisticsAttorneyModel: '',
        shipperTempId: '',
        shipperText: '',
        consigneeTempId: '',
        consigneeText: '',
        notifierTempId: '',
        notifierText: '',
        dockingTempId: '',
        dockingText: '',
        carrierInformationTempId: '',
        carrierInformationText: '',
        // 收件信息
        mailMode: '',
        receiverName: '',
        country: '',
        receiverAddress: ''
      },
      // 表单校验
      rules: {
        code: { required: true, message: '请输入预申报单号', trigger: 'blur' },
        customerId: { required: true, message: '请选择客户', trigger: 'change' },
        poNo: { required: true, message: '请输入PO单号', trigger: 'blur' },
        outDepotId: { required: true, message: '请选择出仓仓库', trigger: 'change' },
        buId: { required: true, message: '请选择事业部', trigger: 'change' },
        saleOrderCodes: { required: true, message: '请输入销售订单号', trigger: 'blur' },
        tradeTerms: { required: true, message: '请选择贸易条款', trigger: 'change' },
        currency: { required: true, message: '请选择销售币种', trigger: 'change' },
        loadPort: { required: true, message: '请输入装货港', trigger: 'blur' },
        portDes: { required: true, message: '请选择卸货港', trigger: 'change' },
        transport: { required: true, message: '请选择运输方式', trigger: 'change' },
        shipper: { required: true, message: '请输入境外发货人', trigger: 'blur' },
        tallyingUnit: { required: false, message: '请选择理货单位', trigger: 'change' }
      },
      // 展开状态
      openState: {
        base: true,
        address: true,
        logisc: true,
        weituo: true,
        receive: true
      },
      // 理货单位下拉列表
      tallyingUnitList: [
        { key: '00', value: '托盘' },
        { key: '01', value: '箱' },
        { key: '02', value: '件' }
      ],
      // 卸货港列表
      unloadPortList: [
        {value: '44011501：南沙新港口岸', key: '44011501'},
        {value: '44010318：黄埔广保通码头口岸', key: '44010318'},
        {value: '21021001：大连保税区口岸', key: '21021001'},
        {value: '50010001：重庆口岸', key: '50010001'}
      ],
      // 模板列表
      tempalteList: [],
      // 发货人/提货信息列表
      shipperTempList: [],
      // 收货人/卸货信息列表
      consigneeTempList: [],
      // 通知人列表
      notifierTempList: [],
      // 对接人列表
      dockingTempList: [],
      // 承运商信息列表
      carrierInformationTempList: [],
      // 选择商品组件状态
      choseProducts: {
        filterData: {},
        visible: { show: false }
      },
      // 保存按钮loading
      saveLoading: false,
      // 上传附件url
      action: '',
      // 出库仓类型
      outDepotType: '',
      // 出库关区列表
      outCustomsList: [],
      // 入库关区列表
      inCustomsList: []
    }
  },
  mounted() {
    // 获取模板列表
    this.getTemplateList()
    // 初始化
    this.init()
  },
  methods: {
    async init() {
      const { id, saleIds } = this.$route.query
      try {
        let formData = {}
        if (id) {
          const { data } = await searchDetail({ id })
          this.rules.code.required = true
          formData = data || {}
        } else {
          const { data } = await searchDetail({ saleIds })
          this.rules.code.required = false
          formData = data || {}
        }
        // 赋值表单数据
        for (const key in this.ruleForm) {
          this.ruleForm[key] = formData[key] !== undefined && formData[key] !== null ? formData[key] + '' : ''
        }
        const { itemList } = formData
        if (itemList && itemList.length) {
          this.tableData.list = itemList.map(item => ({
            seq: item.seq,
            goodsId: item.goodsId || '',
            saleOrderId: item.saleOrderId || '',
            saleOrderCode: item.saleOrderCode || '',
            poNo: item.poNo || '',
            goodsNo: item.goodsNo || '',
            goodsName: item.goodsName || '',
            goodsCode: item.goodsCode || '',
            num: item.num || 1,
            salePrice: item.salePrice || 0,
            price: item.price || 0,
            amount: item.amount || 0,
            brandName: item.brandName || '',
            grossWeight: item.grossWeight || 0,
            grossWeightSum: item.grossWeight || 0,
            netWeight: item.netWeight || 0,
            netWeightSum: item.netWeight || 0,
            boxNum: item.boxNum || 0,
            boxNo: item.boxNo || '',
            torrNo: item.torrNo || '',
            component: item.component || ''
          }))
        }
        const { outDepotId, inDepotId } = this.ruleForm
        // 获取出库关区列表
        if (outDepotId) {
          this.getCustomsAreaList('outDepot', outDepotId, true)
          this.outDepotChange(outDepotId)
        }
        // 获取入仓库类型
        if (inDepotId) {
          this.getCustomsAreaList('inDepot', inDepotId, true)
        }
        // 包装方式转换格式
        this.ruleForm.packType = (this.ruleForm.boxNum || '') + '箱/' + (this.ruleForm.torrNum || '') + '托'
        // 上传的url
        this.action = getBaseUrl(attachmentUploadFiles) + attachmentUploadFiles + '?token=' + sessionStorage.getItem('token') + '&code=' + this.ruleForm.code
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 获取模板列表
    async getTemplateList() {
      try {
				const { data: tempalteList } = await listTemplateLink()
				this.tempalteList = tempalteList || []
        const { data: typeList } = await listTemplate({ type: '' })
        if (typeList && typeList.length) {
          const list = typeList.map(item => ({ ...item, id: item.id.toString() }))
          this.shipperTempList = list.filter(item => item.type === '1')
          this.consigneeTempList = list.filter(item => item.type === '2')
          this.notifierTempList = list.filter(item => item.type === '3')
          this.dockingTempList = list.filter(item => item.type === '4')
          this.carrierInformationTempList = list.filter(item => item.type === '5')
        }
			} catch (error) {
        this.$errorMsg(error.message)
			}
    },
    // 显示选择商品
    showChoseProducts() {
      const unNeedGoods = this.tableData.list.map(item => ({
        saleId: item.saleOrderId,
        goodsId: item.goodsId
      }))
      this.choseProducts.filterData = {
        orderIds: this.ruleForm.saleOrderIds || '',
        unNeedGoods
      }
      this.choseProducts.visible.show = true
    },
    // 确认选择商品
    comfirmChoseProducts(payload) {
      if (payload && payload.length) {
        const seqs = [0].concat(this.tableData.list.map(item => +item.seq))
        const maxSeq = Math.max(...seqs)
        const list = payload.map((item, index) => ({
          seq: maxSeq + index + 1,
          goodsId: item.id || '',
          saleOrderId: item.saleOrderId || '',
          saleOrderCode: item.code || '',
          poNo: item.poNo || '',
          goodsNo: item.goodsNo || '',
          goodsName: item.name || '',
          goodsCode: item.goodsCode || '',
          num: item.num || 1,
          salePrice: item.salePrice || 0,
          price: (item.filingPrice * (item.priceDeclareRatio || 1)) || 0,
          amount: (item.filingPrice * (item.priceDeclareRatio || 1)) || 0,
          brandName: item.brandName || '',
          grossWeight: item.grossWeight || 0,
          grossWeightSum: item.grossWeight || 0,
          netWeight: item.netWeight || 0,
          netWeightSum: item.netWeight || 0,
          boxNum: item.boxNum || 0,
          boxNo: item.boxNo || '',
          torrNo: item.torrNo || '',
          component: item.component || ''
        }))
        this.tableData.list.push(...list)
        this.$nextTick(() => {
          this.countSumWeight()
          this.tableData.list.forEach((item, index) => this.count('price', index))
        })
      }
      this.choseProducts.visible.show = false
    },
    // 删除商品
    delTableItems() {
      if (!this.tableChoseList.length) {
        this.$errorMsg('当前没有选择任何商品')
        return false
      }
      this.$showToast('确定要删除勾选的商品？', () => {
        const ids = this.tableChoseList.map(item => item.goodsId)
        this.tableData.list = this.tableData.list.filter(item => !ids.includes(item.goodsId))
        // 重新计算毛重
        this.countSumWeight()
      })
    },
    // 计算表格项
    count(type, index) {
      const item = this.tableData.list[index]
      let {
        num = 0,
        price = 0,
        amount = 0,
        netWeight = 0,
        grossWeight = 0,
        grossWeightSum = 0,
        netWeightSum = 0
      } = item
      // 数量和申报单价改变
      if (type === 'num' || type === 'price') {
        amount = (num || 0) * (price || 0)
        amount = (+amount).toFixed(2)
      }
      // 申报总金额改变
      if (type === 'amount') {
        price = num ? (amount || 0) / num : 0
        price = (+price).toFixed(8)
      }
      // 数量改变从新计算毛重、净重
      if (type === 'num') {
        grossWeightSum = (num || 0) * (grossWeight || 0)
        netWeightSum = (num || 0) * (netWeight || 0)
        grossWeightSum = (+grossWeightSum).toFixed(5)
        netWeightSum = (+netWeightSum).toFixed(5)
      }
      // 重新赋值
      this.tableData.list.splice(index, 1, { ...item, amount, num, price, netWeightSum, grossWeightSum })
      // 计算总毛重
      this.countSumWeight()
    },
    // 计算总毛重
    countSumWeight() {
      let weight = 0
      let maxlen = 0
      this.tableData.list.map(item => {
        const num = item.grossWeightSum ? +item.grossWeightSum : 0
        weight = weight + num
        if ((num + '').includes('.')) {
          const arr = (num + '').split('.')
          const len = arr[1].length
          if (len > maxlen) maxlen = len
        }
      })
      this.ruleForm.billWeight = maxlen > 0 ? weight.toFixed(maxlen) : this.ruleForm.billWeight
    },
    // 计算毛重
    countWeight() {
      const billWeight = this.ruleForm.billWeight ? this.ruleForm.billWeight + '' : '0'
      let maxlen = 3
      if (billWeight.includes('.')) {
        const arr = billWeight.split('.')
        maxlen = arr[1].length
      }
      const list = this.tableData.list
      let sum = 0
      list.forEach(item => {
        const netWeightSum = item.netWeightSum ? +item.netWeightSum : 0
        sum = sum + netWeightSum // 计算总净重
      })
      const len = list.length
      let acouSum = 0
      list.forEach((item, i) => {
        if (i !== len - 1) {
          const netWeightSum = item.netWeightSum ? +item.netWeightSum : 0
          const grossWeightSum = sum > 0 ? billWeight * (netWeightSum / sum) : 0
          item.grossWeightSum = grossWeightSum ? grossWeightSum.toFixed(maxlen) : 0
          acouSum = acouSum + (Number(item.grossWeightSum))
        } else {
          const grossWeightSum = billWeight - acouSum
          item.grossWeightSum = grossWeightSum && grossWeightSum > 0 ? grossWeightSum.toFixed(maxlen) : 0
        }
      })
      this.tableData.list = list
    },
    // 保存数据
    saveForm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          if (!this.checkTableData()) return false
          const { id } = this.$route.query
          const itemList = this.tableData.list.map(item => ({
            ...item,
            id: item.id ? item.id + '' : '',
            goodsId: item.goodsId + '',
            seq: item.seq + '',
            num: item.num + '',
            salePrice: item.salePrice ? item.salePrice + '' : 0,
            price: item.price + '',
            amount: item.amount + '',
            grossWeightSum: item.grossWeightSum + '',
            netWeightSum: item.netWeightSum + '',
            boxNum: item.boxNum + ''
          }))
          try {
            this.saveLoading = true
            await saveSaleDeclareOrder({ ...this.ruleForm, id, itemList })
            this.$successMsg('保存成功!')
            this.closeTag()
          } catch (error) {
            this.$errorMsg(error.message)
          } finally {
            this.saveLoading = false
          }
        } else {
          this.$errorMsg('请先完善信息')
        }
      })
    },
    // 校验表格项
    checkTableData() {
      let flag = true
      for (let i = 0; i < this.tableData.list.length; i++) {
        const { num, amount, price, grossWeightSum, netWeightSum } = this.tableData.list[i]
        if (num === null || num === undefined || num === '' || num <= 0) {
          this.$errorMsg(`表格第${i + 1}行,申报数量必填且不能小于0`)
          flag = false
          break
        }
        if (price === null || price === undefined || price === '' || price <= 0) {
          this.$errorMsg(`表格第${i + 1}行,申报单价必填且不能小于0`)
          flag = false
          break
        }
        if (amount === null || amount === undefined || amount === '' || amount <= 0) {
          this.$errorMsg(`表格第${i + 1}行,申报总金额必填且不能小于0`)
          flag = false
          break
        }
        if (grossWeightSum === null || grossWeightSum === undefined || grossWeightSum === '' || grossWeightSum <= 0) {
          this.$errorMsg(`表格第${i + 1}行,毛重必填且不能小于0`)
          flag = false
          break
        }
        if (netWeightSum === null || netWeightSum === undefined || netWeightSum === '' || netWeightSum <= 0) {
          this.$errorMsg(`表格第${i + 1}行,净重必填且不能小于0`)
          flag = false
          break
        }
        if (Number(grossWeightSum) < Number(netWeightSum)) {
          this.$errorMsg(`表格第${i + 1}行,毛重不能小于净重`)
          flag = false
          break
        }
      }
      return flag
    },
    // 包装改变
    changePackType() {
      const target = this.selectOpt.order_torrpacktypeList.find(item => this.ruleForm.torrPackType === item.key)
      this.ruleForm.pack = (this.ruleForm.boxNum || '0') + '箱/' + (this.ruleForm.torrNum || '0') + '托' + (target ? target.value : '')
    },
    // 获取出入库关区列表
    async getCustomsAreaList(type, depotId, isEdit) {
      const { data } = await getCustomsAreaList({ depotId })
      if (data && data.length) {
        const list = data.map(item => ({ key: item.value, value: item.label }))
        if (type === 'inDepot') {
          this.inCustomsList = list
          if (!isEdit) {
            this.ruleForm.inCustomsId = list[0].key
          }
        } else {
          this.outCustomsList = list
          if (!isEdit) {
            this.ruleForm.outCustomsId = list[0].key
          }
        }
      } else {
        if (type === 'inDepot') {
          this.inCustomsList = []
          this.ruleForm.inCustomsId = ''
        } else {
          this.outCustomsList = []
          this.ruleForm.outCustomsId = ''
        }
      }
    },
    // 选择模板
    changeTemplateLink() {
      const { logisticsAttorneyModel } = this.ruleForm
      const target = this.tempalteList.find(item => +item.id === logisticsAttorneyModel) || {}
      this.ruleForm.logisticsAttorneyModel = target.name || ''
      const keyArr = ['shipperTemp', 'consigneeTemp', 'notifierTemp', 'dockingTemp', 'carrierInformationTemp']
      keyArr.forEach(item => {
        const key1 = item + 'Id'
        this.ruleForm[key1] = target[key1] ? target[key1].toString() : ''
        this.changeTemplateItem(item)
      })
    },
    changeTemplateItem(key) {
      const id = this.ruleForm[key + 'Id']
      const target = this[key + 'List'].find(item => +item.id === +id) || {}
      this.ruleForm[key + 'Name'] = target.name || ''
      this.ruleForm[key.replace('Temp', '') + 'Text'] = target.details || ''
    },
    // 上传成功
    successUploadFujian(res) {
      if (res.code + '' === '10000') {
        this.$successMsg('上传成功')
        this.$refs['enclosure'].getEnclosureList(1)
      } else {
        this.$errorMsg(res.data)
      }
    },
    // 提货方式改变
    mailModeChange(mailMode) {
      if (mailMode === '1') {
        this.ruleForm.receiverName = ''
        this.ruleForm.country = ''
        this.ruleForm.receiverAddress = ''
      } else if (mailMode === '2') {
        this.ruleForm.receiverName = '卓志香港仓'
        this.ruleForm.country = '中国香港'
        this.ruleForm.receiverAddress = '香港 新界 元朗 流浮山路DD129'
      }
    },
    // 出库仓库
    async outDepotChange(id) {
      try {
        // 获取出库关区列表
        this.getCustomsAreaList('outDepot', id)
        const { data: { type } } = await getDepotDetails({ id })
        this.outDepotType = type || ''
        if (this.outDepotType === 'c') {
          this.rules.tallyingUnit.required = true
        } else {
          this.rules.tallyingUnit.required = false
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 入库仓改变
    inDepotChange(id) {
      // 获取入库关区列表
      this.getCustomsAreaList('inDepot', id)
    }
  }
}
</script>
<style>
  .yushen-edit-bx .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 135px;
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
<style lang="scss" scoped>
.hide-form{
  width: 100%;
  height: 3px;
  overflow: hidden;
  opacity: 0;
}
.pad-t-10{
  padding-bottom: 10px;
  padding-top: 10px;
}
.flex-bx{
  display: flex;
  box-sizing: border-box;
  padding-left: 20px;
}
.title-bx{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.open{
  height: auto;
  overflow: hidden;
  transition: height 1.2s;
}
.close{
  height: 0px;
  overflow: hidden;
  transition: height 1.2s;
}
/deep/.textarea-con {
  display: flex;
  align-items: flex-start;
  .el-form-item__label{
    width: 130px;
  }
  .el-form-item__content {
    width: 700px;
  }
}
</style>
