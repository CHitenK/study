<template>
  <!-- 新增销售订单页面 -->
  <div class="page-bx bgc-w sales-add-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb showGoback />
    <!-- 面包屑 end -->
    <div v-loading="loading">
      <!-- 表单部分 -->
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <!-- 基本信息 -->
        <JFX-title title="基本信息" className="bor-n mr-t-15" />
        <el-row :gutter="10" class="edit-row-bor">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="事业部：" prop="buId" ref="buId">
              <el-select v-model="ruleForm.buId"
                        placeholder="请选择"
                        clearable
                        filterable
                        @change="buIdChange"
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
            <el-form-item label="客户：" prop="customerId">
              <el-select v-model="ruleForm.customerId"
                        placeholder="请选择"
                        clearable
                        filterable
                        @change="customerIdChange"
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
            <el-form-item label="公司：" prop="merchantId">
              <el-select v-model="ruleForm.merchantId"
                        placeholder="请选择"
                        disabled
                        :data-list="getSelectMerchantBean('merchantList')">
                <el-option
                  v-for="item in selectOpt.merchantList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="出库仓库：" prop="outDepotId" ref="outDepotId">
              <el-select v-model="ruleForm.outDepotId"
                        placeholder="请选择"
                        clearable
                        filterable
                        @change="outDepotChange"
                        :data-list="getSelectBeanByMerchantBuRel('out_warehousesList')">
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
            <el-form-item label="销售类型：" prop="businessModel" ref="businessModel">
              <el-select v-model="ruleForm.businessModel"
                        placeholder="请选择"
                        filterable
                        clearable
                        @change="businessModelChange">
                <el-option value="1" label="购销-整批结算" />
                <el-option value="4" label="购销-实销实结" />
                <el-option value="3" label="采销执行" :disabled="outDepotType !== 'd'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="是否同关区：" prop="isSameArea" ref="isSameArea">
              <el-select v-model="ruleForm.isSameArea"
                        :disabled="isSameAreaDisabled"
                        placeholder="请选择"
                        clearable
                        filterable
                        @change="isSameAreaChange">
                <el-option value="1" label="同关区"></el-option>
                <el-option value="0" label="跨关区"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="入库仓库：" prop="inDepotId">
              <!-- 当出仓仓库为保税仓，且是否同关区为“否” 且销售类型为购销-整批结算时，入库仓库禁用 -->
              <el-select v-model="ruleForm.inDepotId"
                        placeholder="请选择"
                        clearable
                        filterable
                        @change="inDepotChange"
                        :disabled="inDepotDisabled"
                        :data-list="getSelectBeanByMerchantRel('in_warehousesList', { type: 'b' })">
                <el-option
                  v-for="item in selectOpt.in_warehousesList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="PO单号：" prop="poNo">
              <el-input v-model="ruleForm.poNo" placeholder="多PO输入时以&字符隔开" clearable />
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
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="LBX单号：" prop="lbxNo">
              <el-input v-model="ruleForm.lbxNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="付款条约：" prop="payRules">
              <el-input v-model="ruleForm.payRules" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 基本信息 end -->
        <!-- 物流信息 -->
        <JFX-title title="物流信息" className="mr-t-15 bor-n" />
        <el-row :gutter="10" class="edit-row-bor">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="合同号：" prop="contractNo">
              <el-input v-model="ruleForm.contractNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="运输方式：" prop="transport">
              <el-select v-model="ruleForm.transport"
                          placeholder="请选择"
                          filterable
                          clearable
                          @change="transportChange"
                          :data-list="getSelectList('transportList')">
                <el-option
                  v-for="item in selectOpt.transportList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="标准箱TEU：" prop="teu">
              <el-input v-model="ruleForm.teu" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="车次：" prop="trainno">
              <el-input v-model="ruleForm.trainno" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="承运商：" prop="carrier">
              <el-input v-model="ruleForm.carrier" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="提单毛重：" prop="billWeight">
              <JFX-Input v-model.trim="ruleForm.billWeight" :precision="5" :min="0" style="width: 193px;" @change="calcBillWeight" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="托数：" prop="torusNumber">
              <JFX-Input v-model.trim="ruleForm.torusNumber" :precision="0" :min="0" placeholder="请输入" style="width: 193px;" @change="calcPack" />
              <!-- <el-input-number v-model.trim="ruleForm.torusNumber" :precision="0" :controls="false" :min="1"  style="width: 193px;" @change="calcPack" /> -->
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="箱数：" prop="boxNum">
              <JFX-Input v-model.trim="ruleForm.boxNum" :precision="0" :min="0" placeholder="请输入" style="width: 193px;" @change="calcPack" />
              <!-- <el-input-number v-model.trim="ruleForm.boxNum" :precision="0" :controls="false" :min="1"  style="width: 193px;" @change="calcPack" /> -->
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="托盘材质：" prop="torrPackType">
              <el-select v-model="ruleForm.torrPackType"
                          placeholder="请选择"
                          filterable
                          clearable
                          @change="calcPack"
                          :data-list="getSelectList('order_torrpacktypeList')">
                <el-option
                  v-for="item in selectOpt.order_torrpacktypeList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="包装：" prop="pack">
              <el-input v-model="ruleForm.pack" placeholder="请输入XX箱XX托XXXX" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="发票单号：" prop="invoiceNo">
              <el-input v-model="ruleForm.invoiceNo" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="卸货港：" prop="portDes">
              <el-input v-model="ruleForm.portDes" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="出库地点：" prop="outdepotAddr">
              <el-input v-model="ruleForm.outdepotAddr" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="出库关区：" prop="outCustomsId">
              <el-select v-model="ruleForm.outCustomsId"
                          placeholder="请选择"
                          filterable
                          clearable>
                <el-option
                  v-for="item in outCustomsList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="入库关区：" prop="inCustomsId">
              <el-select v-model="ruleForm.inCustomsId"
                          placeholder="请选择"
                          filterable
                          clearable>
                <el-option
                  v-for="item in inCustomsList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="交货日期：" prop="deliveryDate">
              <el-date-picker
                v-model="ruleForm.deliveryDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" v-if="$route.query.source === '1'">
            <el-form-item label="预售单号：" prop="outdepotAddr">
              <el-input v-model="preSaleOrderCode" placeholder="请输入" disabled clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" v-if="outDepotType === 'c' || inDepotType === 'c'">
            <el-form-item label="理货单位：" prop="tallyingUnit">
              <el-select v-model="ruleForm.tallyingUnit"
                          placeholder="请选择"
                          clearable
                          filterable>
                <el-option value="00" label="托盘" />
                <el-option value="01" label="箱" />
                <el-option value="02" label="件" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="6" v-if="outDepotType === 'c' || inDepotType === 'c'">
            <el-form-item label="目的地：" prop="destination">
              <el-select v-model="ruleForm.destination"
                          placeholder="请选择"
                          clearable
                          filterable>
                <el-option value="GZJC01" label="广州机场" />
                <el-option value="HP01" label="黄埔状元谷" />
                <el-option value="HK01" label="香港本地" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注：" prop="remark" class="textarea-con">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="ruleForm.remark" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 物流信息 end -->
        <!-- 收件信息 -->
        <JFX-title title="收件信息" className="mr-t-15 bor-n" />
        <el-row :gutter="10" class="edit-row-bor">
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
      </el-form>
      <!-- 表单部分 end -->
      <!-- 收件信息 end -->
      <!-- 商品信息 -->
      <JFX-title title="商品信息" className="mr-t-15 title-bx">
        <div>
          <el-button type="primary" @click="showImportGoodsModal" v-if="$route.query.source !== '1'">商品导入</el-button>
          <el-button type="primary" @click="showChooseProductModal" v-if="$route.query.source !== '1'">选择商品</el-button>
          <el-button type="primary" @click="showChoosePreSaleNumModal" v-else>选择商品</el-button>
          <el-button type="primary" @click="delTableItems">删除</el-button>
        </div>
      </JFX-title>
      <JFX-table :tableData.sync="tableData"
                 @selection-change="selectionChange"
                 :showPagination="false">
        <el-table-column type="selection"
                        align="center"
                        width="55"
        ></el-table-column>
        <el-table-column prop="seq"
                        align="center"
                        width="100"
                        label="序号">
          <template slot-scope="{row}">
            <el-input-number v-model.trim="row.seq" :precision="0" :controls="false" :min="0"  style="width: 100%" />
          </template>
        </el-table-column>
        <el-table-column prop="goodsCode"
                        align="center"
                        label="商品编号"
                        width="140"
                        show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="goodsName"
                        align="center"
                        label="商品名称"
                        min-width="150"
                        show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="goodsNo"
                        align="center"
                        label="商品货号"
                        width="120"
                        show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="barcode"
                        align="center"
                        label="条码"
                        width="120"
                        show-overflow-tooltip
        ></el-table-column>
        <!-- 销售数量 -->
        <el-table-column align="center"
                        width="110">
          <template slot="header">
            <span class="need">销售数量</span>
          </template>
          <template slot-scope="{row, $index}">
            <el-input-number v-model.trim="row.num" :precision="0" :controls="false" :min="0"  style="width: 100%" @blur="calc('num', $index)" :disabled="$route.query.source === '1'" />
          </template>
        </el-table-column>
        <!-- 销售数量 end -->
        <!-- 销售单价 -->
        <el-table-column align="center"
                        width="150">
          <template slot="header">
            <span class="need">销售单价<br/>(不含税)</span>
          </template>
          <template slot-scope="{row, $index}">
            <el-input-number v-model.trim="row.price" :precision="8" v-max-spot="8" :controls="false" :min="0"  style="width: 100%" @blur="calc('price', $index)" />
          </template>
        </el-table-column>
        <!-- 销售单价 end -->
        <!-- 申报单价 -->
        <el-table-column align="center"
                        width="150">
          <template slot="header">
            <span class="need" id="declarePrice">申报单价(RMB)</span>
          </template>
          <template slot-scope="{row}">
            <el-input-number v-model.trim="row.declarePrice" :precision="5" v-max-spot="5" :controls="false" :min="0"  style="width: 100%" />
          </template>
        </el-table-column>
        <!-- 申报单价 end -->
        <!-- 销售总金额(不含税) -->
        <el-table-column align="center"
                        width="130">
          <template slot="header">
            <span class="need">销售总金额<br/>(不含税)</span>
          </template>
          <template slot-scope="{row, $index}">
            <el-input-number v-model.trim="row.amount" :precision="2" v-max-spot="2" :controls="false" :min="0"  style="width: 100%" @blur="calc('amount', $index)" />
          </template>
        </el-table-column>
        <!-- 销售总金额(不含税) end -->
        <!-- 销售总金额(含税) -->
        <el-table-column align="center"
                        width="130">
          <template slot="header">
            <span class="need">销售总金额<br/>(含税)</span>
          </template>
          <template slot-scope="{row, $index}">
            <el-input-number v-model.trim="row.taxAmount" :precision="2" v-max-spot="2" :controls="false" :min="0"  style="width: 100%" @blur="changeTaxAmount($index)" />
          </template>
        </el-table-column>
        <!-- 销售总金额(含税) end -->
        <!-- 税率 -->
        <el-table-column align="center"
                        width="100">
          <template slot="header">
            <span class="need">税率</span>
          </template>
          <template slot-scope="{row, $index}">
            <el-select v-model="row.taxRate"
                      placeholder="请选择"
                      filterable
                      @change="calc('taxRate', $index)"
                      :data-list="getRaxList('rateList')">
              <el-option
                v-for="item in selectOpt.rateList"
                :key="item.key"
                :label="item.value"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <!-- 税率 end -->
        <!-- 税额 -->
        <el-table-column align="center"
                        width="130">
          <template slot="header">
            <span class="need">税额</span>
          </template>
          <template slot-scope="{row}">
            <el-input-number v-model.trim="row.tax" :precision="2" v-max-spot="2" :controls="false" :min="0"  style="width: 100%" disabled />
          </template>
        </el-table-column>
        <!-- 税额 end -->
        <el-table-column prop="brandName"
                        align="center"
                        label="品牌类型"
                        width="120"
                        show-overflow-tooltip
        ></el-table-column>
        <!-- 毛重 -->
        <el-table-column align="center"
                        width="150">
          <template slot="header">
            <span class="need">毛重</span>
          </template>
          <template slot-scope="{row}">
            <JFX-Input v-model.trim="row.grossWeightSum" :precision="5" :min="0" style="width: 100%" @change="calcBillWeightTotal" />
          </template>
        </el-table-column>
        <!-- 毛重 end -->
        <!-- 净重 -->
        <el-table-column align="center"
                        width="150">
          <template slot="header">
            <span class="need">净重</span>
          </template>
          <template slot-scope="{row}">
            <JFX-Input v-model.trim="row.netWeightSum" :precision="5" :min="0" style="width: 100%" />
          </template>
        </el-table-column>
        <!-- 净重 end -->
        <el-table-column align="center"
                        label="箱号"
                        width="150">
          <template slot-scope="{row}">
            <el-input v-model="row.boxNo" clearable />
          </template>
        </el-table-column>
        <el-table-column align="center"
                        label="合同号"
                        width="150">
          <template slot-scope="{row}">
            <el-input v-model="row.contractNo" clearable />
          </template>
        </el-table-column>
        <el-table-column align="center"
                        label="备注"
                        width="150">
          <template slot-scope="{row}">
            <el-input v-model="row.remark" clearable />
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
                        label="箱数"
                        width="150">
          <template slot-scope="{row}">
            <el-input-number v-model.trim="row.boxNum" :precision="0" :controls="false" :min="0"  style="width: 100%" />
          </template>
        </el-table-column>
        <el-table-column align="center"
                        label="成分占比"
                        width="200">
          <template slot-scope="{row}">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" v-model="row.component" clearable />
          </template>
        </el-table-column>
      </JFX-table>
      <!-- 商品信息 end -->
      <!-- 总计信息 -->
      <el-row class="clr-II">
        <el-col :span="4" class="flex-c-c">
          总金额(不含税)：{{total('amount', 2)}}
        </el-col>
        <el-col :span="4" class="flex-c-c">
          总税额：{{total('tax', 2)}}
        </el-col>
        <el-col :span="4" class="flex-c-c">
          总金额(含税)：{{total('taxAmount', 2)}}
        </el-col>
        <el-col :span="4" class="flex-c-c">
          总数量：{{total('num', 0)}}
        </el-col>
        <el-col :span="4" class="flex-c-c">
          总毛重：{{totalGrossWeightSum}}
        </el-col>
        <el-col :span="4" class="flex-c-c">
          总净重：{{total('netWeightSum', 5)}}
        </el-col>
      </el-row>
      <!-- 总计信息 end -->
      <!-- 审核结果按钮 -->
      <div class="flex-c-c mr-t-30" v-if="$route.query.examine === '1'">
        <span class="clr-I" style="padding: 0 20px 4px 0;">审核结果: </span>
        <el-radio v-model="auditResult" label="0">通过</el-radio>
        <el-radio v-model="auditResult" label="1">驳回</el-radio>
      </div>
      <!-- 审核结果按钮 end -->
    </div>
    <!-- 底部按钮 -->
    <div class="mr-t-30 flex-c-c">
      <el-button type="primary"
                 @click="handleSave"
                 :loading="saveBtnLoading">保 存</el-button>
      <el-button type="primary"
                 @click="handleSumbit"
                 v-permission="'sale_submitSaleOrder'"
                 v-if="$route.query.examine !== '1'"
                 :loading="sumbitBtnLoading">提交</el-button>
                 <!-- v-permission="'sale_addSaleOrder'" -->
      <el-button type="primary"
                 @click="handleExamine"
                 :loading="examineBtnLoading"
                 v-permission="'sale_addSaleOrder'"
                 v-if="$route.query.examine === '1'">审核</el-button>
      <el-button @click="$router.go(-1)">取 消</el-button>
    </div>
    <!-- 底部按钮 end -->
    <!-- 选择商品 -->
    <ChooseProduct v-if="visible.show"
                   :isVisible="visible"
                   :filterData="chooseProductProp"
                   @comfirm="chooseProduct"
    ></ChooseProduct>
    <!-- 选择商品 end -->
    <!-- 导入商品 -->
    <JFX-Dialog :visible.sync="importGoodsVisible"
                :showClose="true"
                :width="'860px'"
                :top="'3vh'"
                title="导入商品"
                closeBtnText="取 消"
                confirmBtnText="确 认"
                @comfirm="importGoodsVisible.show = false">
      <!-- 商品导入 -->
      <ImportFile :url="importSaleGoodsUrl"
                  :selfDown="selfDown"
                  :filterData="importGoodsData"
                  :templateId="'143'"
                  :downText="importSaleGoodsText"
                  @downup="downGoodsTemplate"
                  @successUpload="importGoodsSuccess"
      ></ImportFile>
    </JFX-Dialog>
    <!-- 导入商品 end -->
    <!-- 生成采购订单 -->
    <SubmitShowPurchase v-if="purchaseOrder.visible.show"
                        :submitShowPurchaseVisible="purchaseOrder.visible"
                        :name="purchaseOrder.name"
                        :id="purchaseOrder.id"
                        @comfirm="createPurchaseOrder"
    ></SubmitShowPurchase>
    <!-- 生成采购订单 end -->
    <!-- 预售转销选择商品数量 -->
    <ChoosePreSaleNum v-if="choosePreSaleNum.visible.show"
                      :choosePreSaleNumVisible="choosePreSaleNum.visible"
                      :form="choosePreSaleNum.form"
                      :itemList="choosePreSaleNum.itemList"
                      @comfirm="(data) => closeChoosePreSaleNumModal(data)"
    ></ChoosePreSaleNum>
    <!-- 预售转销选择商品数量 end -->
    <!-- 下载 -->
    <div class="hide-form" v-if="downVal">
      <form id="down-up" :action="actionUrl" method="post" target="_blank">
          <input type="hidden" name="json" v-model="downVal" />
      </form>
    </div>
    <!-- 下载 end -->
  </div>
</template>

<script>
import commomMix from '@m/index'
import saleMix from './mixins'
import { getBaseUrl } from '@u/tool'
import {
  getCurrencySelectBean,
  getListByIds
} from '@a/base'
import {
  checkDepotMerchantRel,
  saveOrModifyTempSaleOrder,
  getRateByCustomerAndMerchant,
  getDepotDetails,
  getCustomsAreaList,
  checkExistByPo,
  submitSaleOrder,
  toSaleOrderEdit,
  getSalePrice,
  getSalePriceManage,
  modifySaleOrder,
  importSaleGoodsUrl,
  exportItemsUrl,
  toSaleAddPage,
  preSaleEditPage,
  checkSaleExistPurchase,
  checkPreSale
} from '@a/salesManage/index'
export default {
  mixins: [commomMix, saleMix()],
  components: {
    // 选择商品组件
    ChooseProduct: () => import('./components/ChooseProduct'),
    // 导入组件
    ImportFile: () => import('@/components/importfile/index'),
    // 生成采购订单
    SubmitShowPurchase: () => import('./components/SubmitShowPurchase'),
    // 预售转销选择商品数量
    ChoosePreSaleNum: () => import('./components/ChoosePreSaleNum')
  },
  data() {
    // 检验po号
    const validatePoNo = (rule, value, callback) => {
      const list = value.split('&')
      const map = new Map()
      let flag = true
      if (list && list.length) {
        for (let i = 0; i < list.length; i++) {
          if (map.has(list[i])) {
            flag = false
          } else {
            map.set(list[i], i)
          }
        }
      }
      if (value === '') {
        callback(new Error('请输入PO单号'))
      } else if (!flag) {
        callback(new Error('PO单号重复了'))
      } else {
        callback()
      }
    }
    return {
      // 表单数据
      ruleForm: {
        // 基本信息
        customerId: '',
        merchantId: '',
        merchantName: '',
        businessModel: '',
        outDepotId: '',
        buId: '',
        isSameArea: '',
        inDepotId: '',
        poNo: '',
        currency: '',
        lbxNo: '',
        payRules: '',
        // 物流信息
        contractNo: '',
        transport: '',
        teu: '',
        trainno: '',
        carrier: '',
        billWeight: 0,
        torusNumber: '',
        boxNum: '',
        torrPackType: '',
        pack: '',
        invoiceNo: '',
        portDes: '',
        outdepotAddr: '',
        outCustomsId: '',
        inCustomsId: '',
        deliveryDate: '',
        tallyingUnit: '',
        destination: '',
        remark: '',
        // 收件信息
        mailMode: '',
        receiverName: '',
        country: '',
        receiverAddress: ''
      },
      // 表单校验规则
      rules: {
        customerId: { required: true, message: '请选择客户', trigger: 'change' },
        merchantId: { required: true, message: '请选择公司', trigger: 'change' },
        businessModel: { required: true, message: '请选择销售类型', trigger: 'change' },
        outDepotId: { required: true, message: '请选择出库仓库', trigger: 'change' },
        buId: { required: true, message: '请选择事业部', trigger: 'change' },
        isSameArea: { required: false, message: '请选择是否同关区', trigger: 'change' },
        inDepotId: { required: false, message: '请选择入库仓库', trigger: 'change' },
        poNo: { required: false, validator: validatePoNo, trigger: 'blur' },
        payRules: { required: true, message: '请输入付款条约', trigger: 'blur' },
        tallyingUnit: { required: true, message: '请选择理货单位', trigger: 'change' },
        destination: { required: true, message: '请选择目的地', trigger: 'change' },
        currency: { required: true, message: '请选择销售币种', trigger: 'change' },
        contractNo: { required: true, message: '请输入合同号', trigger: 'blur' },
        transport: { required: false, message: '请选择运输方式', trigger: 'change' },
        carrier: { required: false, message: '请输入承运商', trigger: 'blur' },
        billWeight: { required: false, message: '请输入提单毛重', trigger: 'blur' },
        torusNumber: { required: false, message: '请输入托数', trigger: 'blur' },
        boxNum: { required: false, message: '请输入箱数', trigger: 'blur' },
        torrPackType: { required: false, message: '请选择托盘材质', trigger: 'change' },
        pack: { required: false, message: '请输入包装', trigger: 'blur' },
        invoiceNo: { required: false, message: '请输入发票单号', trigger: 'blur' },
        portDes: { required: false, message: '请输入卸货港', trigger: 'blur' },
        outdepotAddr: { required: false, message: '请输入出库地点', trigger: 'blur' },
        mailMode: { required: false, message: '请选择提货方式', trigger: 'change' },
        receiverName: { required: false, message: '请输入收货人姓名', trigger: 'blur' },
        country: { required: false, message: '请输入国家', trigger: 'blur' },
        receiverAddress: { required: false, message: '请输入详细地址', trigger: 'blur' },
        teu: { required: false, message: '请输入teu', trigger: 'blur' },
        trainno: { required: false, message: '请输入车次', trigger: 'blur' }
      },
      // 获取出仓仓库进出接口指令
      isInOutInstruction: false,
      // 是否通关区是否禁用
      isSameAreaDisabled: false,
      // 出库仓库类型
      outDepotType: '',
      // 出库关区列表
      outCustomsList: [],
      // 入库仓库类型
      inDepotType: '',
      // 入库仓库是否禁用
      inDepotDisabled: false,
      // 入库关区列表
      inCustomsList: [],
      // 选择商品参数
      chooseProductProp: {},
      // 是否开启价格管理
      hasPriceManage: false,
      // 当前客户带出的税率
      customerTaxRate: '',
      // 保存按钮loading状态
      saveBtnLoading: false,
      // 提交按钮loading状态
      sumbitBtnLoading: false,
      // 审核按钮loading状态
      examineBtnLoading: false,
      // 需要校验的字段
      validateField: [],
      // 审核结果
      auditResult: '',
      // 导入商品url
      importSaleGoodsUrl: importSaleGoodsUrl,
      // 导入商品组件状态
      importGoodsVisible: { show: false },
      // 导入商品组件请求参数
      importGoodsData: {},
      selfDown: false,
      importSaleGoodsText: '下载模板',
      // 总毛重
      totalGrossWeightSum: '',
      // 页面loading
      loading: false,
      downVal: '',
      actionUrl: '',
      // 生成采购订单组件
      purchaseOrder: {
        visible: { show: false },
        name: '',
        id: ''
      },
      // 预售转销选择商品数量
      choosePreSaleNum: {
        visible: { show: false },
        form: {},
        itemList: []
      },
      // 预售单号
      preSaleOrderCode: '',
      // 用于删除商品
      delId: 0
    }
  },
  computed: {
    total() {
      return (prop, fix) => this.tableData.list.reduce((pre, item) => {
        pre += item[prop] ? +item[prop] : 0
        return pre
      }, 0).toFixed(fix)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id, copyid, purchaseId, outDepotId, source, platformPurchaseIds, platformSalesNum, buId } = this.$route.query
      // 复制
      if (copyid) {
        this.editInit(copyid)
        return false
      }
      // 生成内部订单
      if (purchaseId && outDepotId) {
        this.editInit(null, purchaseId, outDepotId)
        return false
      }
      // 预售单转销售单
      if (source === '1') {
        const json = sessionStorage.getItem('persaleObj')
        const { preSaleOrderCode } = JSON.parse(json)
        this.preSaleOrderCode = preSaleOrderCode
        this.preSaleInit(json)
        return false
      }
      // 平台采购转销售
      if (source === '2') {
        this.addInit({ outDepotId, buId, platformPurchaseIds, platformSalesNum })
        return false
      }
      id ? this.editInit(id) : this.addInit()
    },
    // 新增页面初始化
    async addInit(params) {
      try {
        this.loading = true
        // 平台采购转销售
        if (params) {
          const { data } = await toSaleAddPage(params)
          // 条码找不到商品的情况直接返回
          if (data.errorMsg) {
            this.$message.closeAll()
            this.$errorMsg(data.errorMsg)
            this.$router.go(-1)
            return false
          }
          // 获取表单和表格数据
          this.getFormAndTableParams(data.saleOrderDTO, data.saleOrderItemList, true)
          // 获取表单下拉框改变状态
          this.getSelectState()
        } else {
          // 获取公司信息
          const { merchantId, merchantName } = this.getUserInfo()
          this.ruleForm.merchantId = merchantId || ''
          this.ruleForm.merchantName = merchantName || ''
        }
        // 计算包装
        this.calcPack()
      } catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.loading = false
      }
    },
    // 编辑页面初始化
    async editInit(id, purchaseId, depotId) {
      try {
        this.loading = true
        let saleOrderDTO = {}
        if (id) {
          const { data } = await toSaleOrderEdit({ id })
          saleOrderDTO = data.saleOrderDTO
        } else if (purchaseId && depotId) {
          const { data } = await toSaleOrderEdit({ purchaseId, outDepotId: depotId })
          saleOrderDTO = data.saleOrderDTO
        }
        // 获取表单和表格数据
        this.getFormAndTableParams(saleOrderDTO, saleOrderDTO.itemList, true)
        // 获取表单下拉框改变状态
        this.getSelectState('edit')
      } catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.loading = false
      }
    },
    // 预售转销
    async preSaleInit(data) {
      try {
        this.loading = true
        const { data: { saleOrderDTO } } = await preSaleEditPage({ data })
        if (saleOrderDTO) {
          this.getFormAndTableParams(saleOrderDTO, saleOrderDTO.itemList, true)
        }
        // 获取表单下拉框改变状态
        this.getSelectState()
      } catch (error) {
        this.$errorMsg(error.message)
      } finally {
        this.loading = false
      }
    },
    /**
     * 回显表单和表格数据
     * @param formData 表单数据
     * @param listData 商品列表数据
     * @param init 是否回显的情况
     */
    getFormAndTableParams(formData, listData, init) {
      for (const key in this.ruleForm) {
        this.ruleForm[key] = formData[key] !== undefined && formData[key] !== null ? formData[key] + '' : ''
      }
      if (listData && listData.length) {
        listData.forEach((item, index) => {
          this.tableData.list[index] = {
            seq: item.seq || index + 1,
            id: item.id + '',
            goodsId: item.goodsId + '',
            goodsCode: item.goodsCode || '',
            goodsName: item.goodsName || '',
            goodsNo: item.goodsNo || '',
            barcode: item.barcode || '',
            num: item.num || 1,
            price: item.price || 0,
            declarePrice: item.declarePrice || item.price || 0,
            amount: item.amount || 0,
            taxAmount: item.taxAmount || 0,
            taxRate: item.taxRate ? item.taxRate.toFixed(2) : '0.00',
            tax: item.tax || 0,
            brandName: item.brandName || '',
            grossWeight: item.grossWeight || 0,
            grossWeightSum: item.grossWeightSum || 0,
            netWeight: item.netWeight || 0,
            netWeightSum: item.netWeightSum || 0,
            boxNo: item.boxNo || '',
            contractNo: item.contractNo || '',
            remark: item.remark || '',
            torrNo: item.torrNo || '',
            boxNum: item.boxNum || 0,
            component: item.component || '',
            delId: this.delId++
          }
          // 计算每行商品信息
          this.calc('num', index, init)
        })
      }
    },
    // 获取表单下拉框改变状态
    async getSelectState(type) {
      const { id } = this.$route.query
      const { merchantId, outDepotId, inDepotId, businessModel, customerId, buId, currency, isSameArea, transport } = this.ruleForm
      // 下拉列表value转字符串
      this.ruleForm.customerId = customerId ? customerId + '' : ''
      this.ruleForm.buId = buId ? buId + '' : ''
      this.ruleForm.currency = currency ? currency + '' : ''
      this.ruleForm.inDepotId = inDepotId ? inDepotId + '' : ''
      this.ruleForm.outDepotId = outDepotId ? outDepotId + '' : ''
      this.ruleForm.businessModel = businessModel ? businessModel + '' : ''
      // 时间格式转换
      this.ruleForm.deliveryDate = this.ruleForm.deliveryDate ? this.ruleForm.deliveryDate.slice(0, 10) : ''
      // 导入商品参数
      this.importGoodsData = { orderId: id }
      // 有客户id
      if (customerId && merchantId && type !== 'edit') {
        // 根据客户带出税率
        const { data: { rate } } = await getRateByCustomerAndMerchant({
          customerId: customerId,
          merchantId: merchantId
        })
        this.customerTaxRate = rate ? (rate.toFixed(2)).toString() : '0.00'
        // 改变当前商品列表的税率
        const { list } = this.tableData
        if (list.length) {
          list.forEach((item, index) => {
            item.taxRate = rate ? (rate.toFixed(2)).toString() : '0.00'
            this.calc('taxRate', index)
          })
        }
      }
      // 计算包装
      this.calcPack()
      // 根据事业部限制出库仓库
      if (buId) {
        delete this.selectOpt['out_warehousesList']
        this.getSelectBeanByMerchantBuRel('out_warehousesList', { buId })
      }
      // 获取出仓库状态
      if (outDepotId) {
        // 获取出仓库类型
        this.getDepotType('outDepot', outDepotId)
        // 获取出库关区列表
        this.getCustomsAreaList('outDepot', outDepotId, true)
        // 获取出仓仓库进出接口指令
        this.changeDeclareNecc(outDepotId)
        // 校验出库仓
        this.validOutDepot()
      }
      // 获取入仓库状态
      if (inDepotId) {
        // 获取入仓库类型
        this.getDepotType('inDepot', inDepotId)
        // 获取入库关区列表
        this.getCustomsAreaList('inDepot', inDepotId, true)
      }
      // 获取同关区状态
      if (isSameArea) {
        this.isSameAreaChange(isSameArea)
      }
      // 获取匀速方式状态
      if (transport) {
        this.transportChange(transport)
      }
      // 获取销售类型状态
      if (businessModel) {
        switch (businessModel) {
          // 采销执行和购销-整批结算时 po号必填
          case '3':
          case '1':
            this.rules.poNo.required = true
            this.validateField.push('poNo')
            break
          case '4':
            this.rules.poNo.required = false
            const delIdx = this.validateField.findIndex(item => item === 'poNo')
            if (~delIdx) {
              this.validateField.splice(delIdx, 1)
            }
            break
        }
      }
      // 是否开启价格管理
      if (customerId && buId) {
        const hasPriceManage = await getSalePriceManage({ customerId, buId })
        this.hasPriceManage = hasPriceManage.data
      }
    },
    // 显示选择商品弹窗
    showChooseProductModal() {
      if (!this.ruleForm.outDepotId) {
        return this.$errorMsg('请先选择出仓仓库!')
      }
      if (!this.ruleForm.businessModel) {
        return this.$errorMsg('请先选择销售类型!')
      }
      // 选择商品参数
      this.chooseProductProp = {
        merchantName: this.ruleForm.merchantName || '',
        merchantId: this.ruleForm.merchantId || '',
        depotId: this.ruleForm.outDepotId || '',
        popupType: 2
      }
      // 选择过的商品不会出现在列表上
      if (this.tableData.list.length) {
        const unNeedIds = this.tableData.list.map(item => item.goodsId).toString()
        this.chooseProductProp['unNeedIds'] = unNeedIds
      }
      this.visible.show = true
    },
    // 确认选择商品
    chooseProduct(payload) {
      if (payload && payload.length) {
        const { customerId, currency, buId } = this.ruleForm
        const { hasPriceManage } = this
        if (hasPriceManage && !customerId) {
          this.$errorMsg('该公司事业部已开启销售价格管理，请先选择客户')
          return false
        }
        if (hasPriceManage && !currency) {
          this.$errorMsg('该公司事业部已开启销售价格管理，请先选择销售币种')
          return false
        }
        if (hasPriceManage && !buId) {
          this.$errorMsg('该公司事业部已开启销售价格管理，请先选择事业部')
          return false
        }
        const seqs = this.tableData.list.map(item => item.seq)
        seqs.push(0)
        const maxSeq = Math.max(...seqs)
        let resPrice = null
        payload.forEach(async(item, index) => {
          if (this.hasPriceManage) {
            try {
              const json = JSON.stringify({
                customerId: this.ruleForm.customerId,
                currency: this.ruleForm.currency,
                unitId: this.ruleForm.tallyingUnit,
                buId: this.ruleForm.buId,
                commbarcode: item.commbarcode,
                goodId: item.id
              })
              const { data } = await getSalePrice({ json })
              resPrice = data ? data + '' : ''
            } catch (error) {
              this.$errorMsg(error.message)
            }
          }
          const i = this.tableData.list.length
          this.tableData.list[i] = {
            seq: maxSeq + index + 1,
            goodsId: item.id || '',
            goodsCode: item.goodsCode || '',
            goodsName: item.name || '',
            goodsNo: item.goodsNo || '',
            barcode: item.barcode || '',
            commbarcode: item.commbarcode || '',
            num: 1,
            price: this.hasPriceManage ? resPrice || 0 : item.filingPrice || 0,
            declarePrice: (item.filingPrice * (item.priceDeclareRatio || 1)) || 0,
            amount: 0,
            taxAmount: 0,
            taxRate: this.customerTaxRate || '0.00',
            tax: 0,
            brandName: item.brandName || '',
            grossWeight: item.grossWeight || 0,
            grossWeightSum: item.grossWeight || 0,
            netWeight: item.netWeight || 0,
            netWeightSum: item.netWeight || 0,
            boxNo: '',
            contractNo: '',
            remark: '',
            torrNo: '',
            boxNum: 0,
            component: item.component || '',
            delId: this.delId++
          }
          this.calc('num', i)
        })
        // 计算提单毛重
        this.calcBillWeightTotal()
      }
      this.visible.show = false
    },
    // 删除商品
    delTableItems() {
      if (!this.tableChoseList.length) {
        this.$errorMsg('当前没有选择任何商品')
        return false
      }
      this.$showToast('确定要删除勾选的商品？', () => {
        const ids = this.tableChoseList.map(item => item.delId)
        this.tableData.list = this.tableData.list.filter(item => !ids.includes(item.delId))
        // 重新计算毛重
        this.calcBillWeightTotal()
      })
    },
    // 计算表格行数据
    calc(type, index, init) {
      const data = this.tableData.list[index]
      let { price = 0, num = 0, amount = 0, taxAmount = 0, tax = 0, taxRate = 0, grossWeightSum = 0, grossWeight = 0, netWeight = 0, netWeightSum = 0 } = data
      num = num || 0
      price = price || 0
      amount = amount || 0
      grossWeight = grossWeight || 0
      netWeight = netWeight || 0
      taxRate = taxRate ? +taxRate : 0
      // 单价或数量改变
      if (type === 'price' || type === 'num') {
        amount = (num * price).toFixed(2)
        // 计算提单毛重
        this.calcBillWeightTotal()
      }
      // 编辑页面回显不重新计算毛重净重
      if (type === 'num' && !init) {
        grossWeightSum = (grossWeight * num).toFixed(5)
        netWeightSum = (netWeight * num).toFixed(5)
        this.tableData.list[index].grossWeightSum = grossWeightSum
        this.tableData.list[index].netWeightSum = netWeightSum
        // 计算提单毛重
        this.calcBillWeightTotal()
      }
      // 总价（不含税）改变
      if (type === 'amount' && num) {
        price = (amount / num).toFixed(8)
      }
      // 计算含税总价
      taxAmount = (amount * (1 + taxRate)).toFixed(2)
      // 计算税额
      tax = taxAmount - amount
      this.tableData.list.splice(index, 1, { ...data, price, num, amount, taxAmount, tax })
    },
    // 总金额（含税输入）
    changeTaxAmount(index) {
      const data = this.tableData.list[index]
      let { num = 0, price = 0, amount, taxRate = 0, tax = 0, taxAmount } = data
      price = price || 0
      amount = amount || 0
      taxRate = taxRate ? +taxRate : 0 // 转为数字类型
      taxAmount = taxAmount || 0
      // 重新计算退货总金额(不含税)
      amount = (taxAmount / (1 + taxRate)).toFixed(2)
      // 重新计算税额
      tax = (taxAmount - amount).toFixed(2)
      if (num) {
        // 重新计算单价
        price = (amount / num).toFixed(8)
      }
      this.tableData.list.splice(index, 1, { ...data, amount, tax, taxAmount, price })
    },
    // 校验商品
    checkGoods(isSave) {
      let flag = true
      if (!isSave && !this.tableData.list.length) {
        this.$errorMsg(`至少选择一件商品`)
        flag = false
        return flag
      }
      for (let i = 0; i < this.tableData.list.length - 1; i++) {
        for (let j = i + 1; j < this.tableData.list.length; j++) {
          if (this.tableData.list[i].goodsId === this.tableData.list[j].goodsId) {
            this.$errorMsg(`存在重复商品，商品货号为：${this.tableData.list[i].goodsNo}重复了！`)
            flag = false
            return flag
          }
        }
      }
      for (let i = 0; i < this.tableData.list.length; i++) {
        const item = this.tableData.list[i]
        if (!item.num || item.num < 0) {
          this.$errorMsg(`表格第${i + 1}行，商品数量必须是大于0的数`)
          flag = false
          break
        }
        if (item.price === null || item.price === undefined || item.price === '' || item.price < 0) {
          this.$errorMsg(`表格第${i + 1}行，商品单价不能为空或者小于0`)
          flag = false
          break
        }
        if (this.isInOutInstruction && !item.declarePrice) {
          this.$errorMsg(`表格第${i + 1}行，出仓仓库进出接口指令为是,申报单价不能为空或0`)
          flag = false
          break
        }
        if (item.amount === null || item.amount === undefined || item.amount === '' || item.amount < 0) {
          this.$errorMsg(`表格第${i + 1}行，总金额（不含税）不能为空或者小于0`)
          flag = false
          break
        }
        if (item.taxAmount === null || item.taxAmount === undefined || item.taxAmount === '' || item.taxAmount < 0) {
          this.$errorMsg(`表格第${i + 1}行，总金额（含税）不能为空或者小于0`)
          flag = false
          break
        }
        if (item.taxRate === null || item.taxRate === undefined) {
          this.$errorMsg(`表格第${i + 1}行，税率不能为空`)
          flag = false
          break
        }
        if (item.tax === undefined || item.tax === null || item.tax < 0) {
          this.$errorMsg(`表格第${i + 1}行，税额不能为空或0`)
          flag = false
          break
        }
        if (+item.grossWeightSum < +item.netWeightSum) {
          this.$errorMsg(`表格第${i + 1}行，毛重不能小于净重`)
          flag = false
          break
        }
      }
      return flag
    },
    /**
     * 获取请求参数
     * @param orderType 2-非预售转销
     * @param operate 0-保存 1-提交 2-审核
     * @param auditResult 0-通过 1-驳回
     */
    getFetchParams(orderType, operate, auditResult) {
      const { source } = this.$route.query
      orderType = source === '1' ? '1' : '2'
      const itemList = this.tableData.list.map(item => ({
        ...item,
        id: item.id ? item.id + '' : '',
        goodsId: item.goodsId + '',
        seq: item.seq + '',
        declarePrice: item.declarePrice + '',
        price: item.price + '',
        num: item.num + '',
        amount: item.amount + '',
        taxAmount: item.taxAmount + '',
        tax: item.tax + '',
        taxRate: item.taxRate + '',
        netWeight: item.netWeight + '',
        netWeightSum: item.netWeightSum + '',
        grossWeight: item.grossWeight + '',
        grossWeightSum: item.grossWeightSum + '',
        boxNum: item.boxNum + ''
      }))
      const id = this.$route.query.id
      // 转字符串
      const { billWeight } = this.ruleForm
      this.ruleForm.billWeight = billWeight ? billWeight + '' : ''
      // 请求参数
      const params = {
        ...this.ruleForm,
        orderId: id || '',
        orderType, // 非预售转销
        operate, // 0-保存 1-提交 2-审核
        itemList
      }
      const { platformPurchaseIds } = this.$route.query
      if (platformPurchaseIds) {
        params.platformPurchaseIds = platformPurchaseIds
      }
      // 审核
      if (auditResult) {
        params.auditResult = auditResult
      }
      const json = JSON.stringify(params)
      return json
    },
    // 保存
    handleSave() {
      this.$refs['ruleForm'].clearValidate()
      // 保存只校验事业部必填
      this.$refs['ruleForm'].validateField('buId', async(valid) => {
        if (!valid) {
          const flag = this.checkGoods(true)
          if (!flag) return false
          const json = this.getFetchParams('2', '0')
          try {
            this.saveBtnLoading = true
            await saveOrModifyTempSaleOrder({ json })
            this.$successMsg('操作成功')
            this.closeTag()
          } catch (error) {
            this.$errorMsg(error.message)
          } finally {
            this.saveBtnLoading = false
          }
        } else {
          this.$errorMsg('请正确填写表单必填项')
        }
      })
    },
    // 提交
    async handleSumbit() {
      const { clearValidate, validateField } = this.$refs['ruleForm']
      // 清空校验
      clearValidate()
      // 校验的数组
      const actionArr = []
      // 固定需要校验的字段
      const rulesArr = ['customerId', 'merchantId', 'businessModel', 'outDepotId', 'buId', 'currency', 'payRules', 'isSameArea', 'inDepotId', 'tallyingUnit', 'destination']
      // 根据条件需要校验的字段 + 固定需要校验的字段
      const validArr = [...rulesArr, ...this.validateField]
      validArr.forEach(item => {
        validateField(item, valid => actionArr.push(!valid))
      })
      const valid = actionArr.every(item => item === true)
      if (valid) {
        // 校验商品
        const flag = this.checkGoods()
        if (!flag) return false
        const json = this.getFetchParams('2', '1')
        try {
          // 查询该po单号是否已存在销售订单
          const { poNo } = this.ruleForm
          const { id: orderId } = this.$route.query
          if (poNo) {
            const { data } = await checkExistByPo({ poNo, orderId })
            if (data.length) {
              this.$showToast(`PO号：${data[0]}已有存在销售订单信息`, async() => {
                await this.onSumbit('1', json)
                return false
              })
            } else {
              this.onSumbit('1', json)
            }
          } else {
            this.onSumbit('1', json)
          }
        } catch (error) {
          this.$errorMsg(error.message)
        }
      } else {
        this.$errorMsg('请正确填写表单必填项')
      }
    },
    // 审核
    handleExamine() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          if (!this.auditResult) {
            this.$errorMsg('请先选择审核结果')
            return false
          }
          // 校验商品
          const flag = this.checkGoods()
          if (!flag) return false
          const json = this.getFetchParams('2', '2', this.auditResult)
          try {
            // 查询该po单号是否已存在销售订单
            const poNo = this.ruleForm.poNo
            const { id: orderId } = this.$route.query
            if (poNo) {
              const { data } = await checkExistByPo({ poNo, orderId })
              if (data.length) {
                this.$showToast(`PO号:${data[0]}已有存在销售订单信息`, () => {
                  this.onSumbit('2', json)
                  return false
                })
              } else {
                this.onSumbit('2', json)
              }
            } else {
              this.onSumbit('2', json)
            }
          } catch (error) {
            this.$errorMsg(error.message)
          }
        } else {
          this.$errorMsg('请正确填写表单必填项')
        }
      })
    },
    // 提交或审核表单
    async onSumbit(type, json) {
      const enumsType = {
        '1': '提交',
        '2': '审核'
      }
      this.$showToast(`确定${enumsType[type]}该销售订单？`, async() => {
        try {
          // 1:提交 2:审核
          if (type === '1') {
            this.sumbitBtnLoading = true
            await submitSaleOrder({ json })
          } else {
            if (this.auditResult === '0') {
              const { outDepotId, tallyingUnit } = this.ruleForm
              const { list } = this.tableData
              // 校验仓库可用量
              const hasAvailability = await this.checkAvailableNum(list, outDepotId, tallyingUnit)
              if (!hasAvailability) return false
            }
            this.examineBtnLoading = true
            // 执行审核
            await modifySaleOrder({ json })
            const { poNo, merchantId, customerId } = this.ruleForm
            if (this.auditResult === '0') {
              // 检查是否能生成采购单
              const { data: { code, data: name } } = await checkSaleExistPurchase({ poNo, merchantId, customerId })
              if (code === '00') {
                const { id } = this.$route.query
                this.purchaseOrder.visible.show = true
                this.purchaseOrder.id = id + ''
                this.purchaseOrder.name = name
                return false
              }
            }
          }
          this.$successMsg('操作成功')
          this.closeTag()
        } catch (error) {
          this.$errorMsg(error.message)
        } finally {
          this.examineBtnLoading = false
          this.sumbitBtnLoading = false
        }
      })
    },
    // 客户改变
    async customerIdChange(customerId) {
      if (!customerId) return false
      const { buId } = this.ruleForm
      try {
        // 是否开启价格管理
        if (customerId && buId) {
          const hasPriceManage = await getSalePriceManage({ customerId, buId })
          this.hasPriceManage = hasPriceManage.data
        }
        // 根据客户带出币种
        const { data } = await getCurrencySelectBean({ customerId })
        data ? this.ruleForm.currency = data : this.$refs['currency'].resetField()
        // 根据客户带出税率
        const { data: { rate } } = await getRateByCustomerAndMerchant({
          customerId: customerId,
          merchantId: this.ruleForm.merchantId
        })
        this.customerTaxRate = rate ? rate.toFixed(2) + '' : ''
        // 改变当前商品列表的税率
        const list = this.tableData.list
        if (!list.length) return false
        list.forEach((item, index) => {
          item.taxRate = rate ? (rate.toFixed(2)).toString() : '0.00'
          this.calc('taxRate', index)
        })
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 事业部改变
    async buIdChange(buId) {
      // 清空出库仓库
      this.$refs['outDepotId'].resetField()
      // 清空销售类型
      this.$refs['businessModel'].resetField()
      // 清空商品列表
      this.tableData.list = []
      const { customerId } = this.ruleForm
      try {
        // 是否开启价格管理
        if (customerId && buId) {
          const hasPriceManage = await getSalePriceManage({ customerId, buId })
          this.hasPriceManage = hasPriceManage.data
        }
        // 根据事业部限制出库仓库
        delete this.selectOpt['out_warehousesList']
        this.getSelectBeanByMerchantBuRel('out_warehousesList', { buId: buId || '' })
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 销售类型改变
    businessModelChange(businessModel) {
      switch (businessModel) {
        // 采销执行和购销-整批结算时 po号必填
        case '3':
        case '1':
          this.rules.poNo.required = true
          this.validateField.push('poNo')
          break
        case '4':
          this.rules.poNo.required = false
          const delIdx = this.validateField.findIndex(item => item === 'poNo')
          if (~delIdx) {
            this.validateField.splice(delIdx, 1)
          }
          break
      }
      // 校验出库仓
      this.validOutDepot()
    },
    // 是否通关区改变
    isSameAreaChange(value) {
      if (value === '1') {
        // 同关区--合同号必填
        this.rules.contractNo.required = true
        this.validateField.push('contractNo')
        // 保税仓、同关区--出库仓必填
        if (this.outDepotType === 'a') {
          this.rules.inDepotId.required = true
          this.validateField.push('inDepotId')
        }
      } else {
        // 跨关区--合同号非必填
        this.rules.contractNo.required = false
        const delIdx = this.validateField.findIndex(item => item === 'contractNo')
        if (~delIdx) {
          this.validateField.splice(delIdx, 1)
        }
        // 保税仓、跨关区--出库仓非必填
        if (this.outDepotType === 'a') {
          this.rules.inDepotId.required = false
          const delIdx = this.validateField.findIndex(item => item === 'inDepotId')
          if (!delIdx) {
            this.validateField.splice(delIdx, 1)
          }
        }
      }
      this.validOutDepot()
    },
    // 出库仓改变
    outDepotChange(depotId) {
      // 清空销售类型
      this.$refs['businessModel'].resetField()
      // 清空商品列表
      this.tableData.list = []
      // 获取出库关区列表
      this.getCustomsAreaList('outDepot', depotId)
      // 获取出仓库类型
      this.getDepotType('outDepot', depotId)
      // 获取出仓仓库进出接口指令
      this.changeDeclareNecc(depotId)
      // 校验出库仓
      this.validOutDepot()
    },
    // 校验出库仓
    validOutDepot() {
      const { isSameArea, businessModel } = this.ruleForm
      const outDepotType = this.outDepotType
      if (outDepotType) {
        switch (outDepotType) {
          // 保税仓
          case 'a':
            // if ((isSameArea === '1') || (isSameArea === '0' && businessModel === '4')) {
            //   // 当出仓仓库为保税仓，且是否同关区为“是”时，入库仓库必填，且入库仓库仅能为备查库
            //   // 当出仓仓库为保税仓，且是否同关区为“否” 且销售类型为购销-实销实结时，入库仓库必填，可选仓库仅为备查库
            //   this.rules.inDepotId.required = true
            //   this.validateField.push('inDepotId')
            //   delete this.selectOpt['in_warehousesList']
            //   this.getSelectBeanByMerchantRel('in_warehousesList', { type: 'b' })
            // } else if (outDepotType === 'a' && isSameArea === '0' && businessModel === '1') {
            //   // 当出仓仓库为保税仓，且是否同关区为“否” 且销售类型为购销-整批结算时，入库仓库禁用
            //   // this.inDepotDisabled = true
            // }
            if (isSameArea === '1') {
              // 当出仓仓库为保税仓，且是否同关区为“是”时，入库仓库必填，且入库仓库仅能为备查库
              this.rules.inDepotId.required = true
              this.validateField.push('inDepotId')
              delete this.selectOpt['in_warehousesList']
              this.getSelectBeanByMerchantRel('in_warehousesList', { type: 'b' })
            } else {
              if (businessModel === '1') {
                // 当出仓仓库为保税仓，且是否同关区为“否” 且销售类型为购销-整批结算时，入库仓库禁用；
                this.rules.inDepotId.required = false
                const delIdx = this.validateField.findIndex(item => item === 'inDepotId')
                ~delIdx && this.validateField.splice(delIdx, 1)
                delete this.selectOpt['in_warehousesList']
                this.getSelectBeanByMerchantRel('in_warehousesList', { type: 'b' })
              } else if (businessModel === '4') {
                // 当出仓仓库为保税仓，且是否同关区为“否” 且销售类型为购销-实销实结时，入库仓库必填，可选仓库仅为备查库
                this.rules.inDepotId.required = true
                this.validateField.push('inDepotId')
                delete this.selectOpt['in_warehousesList']
                this.getSelectBeanByMerchantRel('in_warehousesList', { type: 'b' })
              }
            }
            break
          // 海外仓
          case 'c':
            if (businessModel === '4') {
              // 当出仓仓库为海外仓且销售类型为购销-实销实结时，入库仓库必填，可选仓库仅为备查库
              this.rules.inDepotId.required = true
              this.validateField.push('inDepotId')
              delete this.selectOpt['in_warehousesList']
              this.getSelectBeanByMerchantRel('in_warehousesList', { type: 'b' })
            } else {
              this.rules.inDepotId.required = false
              const delIdx = this.validateField.findIndex(item => item === 'inDepotId')
              if (~delIdx) {
                this.validateField.splice(delIdx, 1)
              }
            }
            break
          // 中转仓
          case 'd':
            if (businessModel === '4') {
              // 且销售类型为购销-实销实结时，入库仓库必填，可选仓库仅为备查库；
              this.rules.inDepotId.required = true
              this.validateField.push('inDepotId')
              delete this.selectOpt['in_warehousesList']
              this.getSelectBeanByMerchantRel('in_warehousesList', { type: 'b' })
            } else {
              delete this.selectOpt['in_warehousesList']
              this.getSelectBeanByMerchantRel('in_warehousesList')
            }
            break
          default:
            this.rules.inDepotId.required = false
            const delIdx = this.validateField.findIndex(item => item === 'inDepotId')
            if (!delIdx) {
              this.validateField.splice(delIdx, 1)
            }
            delete this.selectOpt['in_warehousesList']
            this.getSelectBeanByMerchantRel('in_warehousesList', { type: 'b' })
            break
        }
      }
    },
    // 入库仓改变
    inDepotChange(depotId) {
      // 获取入库关区列表
      this.getCustomsAreaList('inDepot', depotId)
      // 获取入仓库类型
      this.getDepotType('inDepot', depotId)
    },
    // 获取出入仓库类型
    async getDepotType(depotType, id) {
      if (depotType === 'outDepot' && !id) {
        this.outDepotType = ''
        return false
      }
      if (depotType === 'inDepot' && !id) {
        this.inDepotType = ''
        return false
      }
      const { data: { type } } = await getDepotDetails({ id })
      if (depotType === 'outDepot') {
        this.outDepotType = type
        switch (this.outDepotType) {
          // 保税仓
          case 'a':
            // 出库仓为保税仓时是否同关区必填
            this.rules.isSameArea.required = true
            this.isSameAreaDisabled = false
            break
          // 海外仓
          case 'c':
            // 出库仓为海外仓时是否同关区禁用
            this.$refs['isSameArea'].resetField()
            this.isSameAreaDisabled = true
            this.rules.isSameArea.required = false
            const delIdx = this.validateField.findIndex(item => item === 'isSameArea')
            if (~delIdx) {
              this.validateField.splice(delIdx, 1)
            }
            // 审核-海外仓 收件信息必填
            if (this.$route.query.examine === '1') {
              this.rules.mailMode.required = true
              this.rules.receiverName.required = true
              this.rules.country.required = true
              this.rules.receiverAddress.required = true
            }
            // 海外仓、实销实结--入库仓必填
            if (this.ruleForm.businessModel === '4') {
              this.rules.inDepotId.required = true
              this.validateField.push('inDepotId')
            } else {
              this.rules.inDepotId.required = false
              const delIdx = this.validateField.findIndex(item => item === 'inDepotId')
              if (~delIdx) {
                this.validateField.splice(delIdx, 1)
              }
            }
            break
          // 中转仓
          case 'd':
            // 出库仓为中转仓时是否同关区非必填
            this.rules.isSameArea.required = false
            this.isSameAreaDisabled = false
            break
          default:
            this.rules.mailMode.required = false
            this.rules.receiverName.required = false
            this.rules.country.required = false
            this.rules.receiverAddress.required = false
            this.rules.isSameArea.required = false
            this.isSameAreaDisabled = false
            break
        }
        if (this.outDepotType !== 'c') {
          this.ruleForm.tallyingUnit = ''
          this.ruleForm.destination = ''
        }
        // 改变校验必填项
        if (this.$route.query.examine === '1') {
          this.changeRules(this.outDepotType)
        }
        // 校验出库仓
        this.validOutDepot()
      } else {
        this.inDepotType = type
        if (this.inDepotType !== 'c') {
          this.ruleForm.tallyingUnit = ''
          this.ruleForm.destination = ''
        }
      }
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
    // 获取出仓仓库进出接口指令
    async changeDeclareNecc(depotId) {
      try {
        const { data } = await checkDepotMerchantRel({ depotId })
        await this.$nextTick()
        if (data && data.isInOutInstruction === '1') {
          this.isInOutInstruction = true
          const declarePrice = document.getElementById('declarePrice')
          declarePrice.classList.add('need')
        } else {
          this.isInOutInstruction = false
          const declarePrice = document.getElementById('declarePrice')
          declarePrice.classList.remove('need')
        }
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 运输方式改变
    transportChange(transport) {
      if (transport === '2') {
        this.rules.teu.required = true
        this.rules.trainno.required = false
      } else if (transport === '3' || transport === '4') {
        this.rules.teu.required = false
        this.rules.trainno.required = true
      } else {
        this.rules.teu.required = false
        this.rules.trainno.required = false
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
    // 改变校验必填项
    changeRules(type) {
      if (type === 'd') {
        this.rules.transport.required = false
        this.rules.carrier.required = false
        this.rules.torusNumber.required = false
        this.rules.boxNum.required = false
        this.rules.torrPackType.required = false
        this.rules.pack.required = false
        this.rules.invoiceNo.required = false
        this.rules.portDes.required = false
        this.rules.outdepotAddr.required = false
      } else {
        this.rules.transport.required = true
        this.rules.carrier.required = true
        this.rules.torusNumber.required = true
        this.rules.boxNum.required = true
        this.rules.torrPackType.required = true
        this.rules.pack.required = true
        this.rules.invoiceNo.required = true
        this.rules.portDes.required = true
        this.rules.outdepotAddr.required = true
      }
    },
    // 拼接包装字段
    calcPack() {
      const { boxNum, torusNumber, torrPackType } = this.ruleForm
      const target = this.selectOpt.order_torrpacktypeList.find(item => item.key === torrPackType)
      let pack = ''
      pack += boxNum === null || boxNum === undefined || boxNum === '' ? '' : `${boxNum}箱`
      pack += torusNumber === null || torusNumber === undefined || torusNumber === '' ? '' : `${torusNumber}托`
      pack += target ? target.value : ''
      this.ruleForm.pack = pack
    },
    // 计算商品毛重
    calcBillWeight() {
      // 小数位
      let decimal = 3
      // 提单毛重
      let { billWeight } = this.ruleForm
      if (!billWeight || isNaN(billWeight)) {
        billWeight = ''
      }
      if (billWeight.includes('.')) {
        const { length } = billWeight.split('.')[1]
        decimal = length
      }
      // 总净重
      const netWeightTotal = this.tableData.list.reduce((pre, item) => {
        pre += item.netWeightSum ? +item.netWeightSum : 0
        return pre
      }, 0)
      // 合计总毛重默认保留三位小数
      billWeight = (+billWeight).toFixed(decimal)
      this.totalGrossWeightSum = billWeight
      // 商品总毛重
      let billWeightTotal = 0
      this.tableData.list.forEach((item, index) => {
        if (index !== this.tableData.list.length - 1) {
          // 对应商品净重
          const netWeightSum = item.netWeightSum ? +item.netWeightSum : 0
          // 商品毛重 = 提单毛重 *（对应商品净重 / 总商品净重）
          const grossWeightSum = (billWeight * (netWeightSum / netWeightTotal)).toFixed(decimal)
          item.grossWeightSum = grossWeightSum
          billWeightTotal += +grossWeightSum
        } else {
          // 第N个商品毛重=总提单毛重-前N-1个商品毛重合计
          const grossWeightSum = (billWeight - billWeightTotal).toFixed(decimal)
          item.grossWeightSum = grossWeightSum
        }
      })
    },
    // 计算提单毛重
    calcBillWeightTotal() {
      let decimal = 0
      let decimalLen = []
      decimalLen.push(0)
      const billWeight = this.tableData.list.reduce((pre, item) => {
        if (!item.grossWeightSum || isNaN(item.grossWeightSum)) {
          item.grossWeightSum = '0'
        }
        item.grossWeightSum = item.grossWeightSum + ''
        if (item.grossWeightSum.includes('.')) {
          decimal = item.grossWeightSum.split('.')[1].length
          if (decimal > 5) {
            decimal = 5
            item.grossWeightSum = item.grossWeightSum.slice(0, item.grossWeightSum.indexOf('.') + 6)
          }
        } else {
          item.grossWeightSum = (+item.grossWeightSum).toFixed(0)
        }
        decimalLen.push(decimal)
        pre += item.grossWeightSum ? +item.grossWeightSum : 0
        return pre
      }, 0)
      const maxLen = Math.max(...decimalLen)
      console.log(maxLen)
      let totalBillWeight = (+billWeight).toFixed(maxLen)
      this.totalGrossWeightSum = totalBillWeight
      this.ruleForm.billWeight = totalBillWeight + ''
    },
    // 显示商品导入弹窗
    showImportGoodsModal() {
      if (!this.ruleForm.outDepotId) {
        return this.$errorMsg('请先选择出仓仓库!')
      }
      if (!this.ruleForm.businessModel) {
        return this.$errorMsg('请先选择销售类型!')
      }
      const { outDepotId, customerId, currency, unitId } = this.ruleForm
      if (this.tableData.list.length) {
        this.importSaleGoodsText = '商品导出'
      } else {
        this.importSaleGoodsText = '下载模板'
      }
      this.importGoodsData = {
        outDepotId: outDepotId || '',
        customerId: customerId || '',
        currency: currency || '',
        unitId: unitId || '',
        salePriceManage: this.hasPriceManage
      }
      this.selfDown = true
      this.importGoodsVisible.show = true
    },
    // 商品导出
    async downGoodsTemplate() {
      const itemList = this.tableData.list.map(item => ({
        seq: item.seq ? item.seq + '' : '',
        goodsNo: item.goodsNo || '',
        num: item.num ? item.num + '' : '0',
        amount: item.amount ? item.amount + '' : '0',
        declarePrice: item.declarePrice ? item.declarePrice + '' : '0',
        grossWeightSum: item.grossWeightSum ? item.grossWeightSum + '' : '0',
        netWeightSum: item.netWeightSum ? item.netWeightSum + '' : '0',
        torrNo: item.torrNo || '',
        boxNum: item.boxNum ? item.boxNum + '' : '0',
        barcode: item.barcode || ''
      }))
      const json = JSON.stringify({ itemList })
      this.actionUrl = getBaseUrl(exportItemsUrl) + exportItemsUrl + `?token=${sessionStorage.getItem('token')}`
      this.downVal = json
      // 下载
      this.$nextTick(() => {
        const form = document.getElementById('down-up')
        form.submit()
        this.downVal = ''
      })
    },
    // 导入商品成功
    async importGoodsSuccess(res) {
      if (res.data.failure + '' !== '0') {
        return false
      }
      this.importGoodsVisible.show = false
      if (res.data && res.data.data && res.data.data.length) {
        const list = res.data.data
        const ids = list.map(item => item.goodsId).toString()
        const { data } = await getListByIds({ ids })
        if (data && data.length) {
          if (this.tableData.list.length) {
            this.$showToast('确认覆盖已存在的所有商品信息？', async() => {
              this.tableData.list = []
              this.mergeImportGoods(data, list)
            })
          } else {
            this.mergeImportGoods(data, list)
          }
        }
      }
    },
    // 合并导入数据
    mergeImportGoods(data, list) {
      data.forEach((item, index) => {
        this.tableData.list[index] = {
          seq: list[index].seq || index + 1,
          // id: item.id ? item.id + '' : '',
          goodsId: list[index].goodsId || '',
          goodsCode: item.goodsCode || '',
          goodsName: item.name || '',
          goodsNo: list[index].goodsNo || item.goodsNo || '',
          barcode: list[index].barcode || item.barcode || '',
          num: list[index].num || item.num || 1,
          price: list[index].price || item.price || 0,
          declarePrice: list[index].declarePrice || item.declarePrice || 0,
          amount: list[index].amount || 0,
          taxAmount: item.taxAmount || 0,
          taxRate: item.taxRate ? item.taxRate.toFixed(2) : '0.00',
          tax: item.tax || 0,
          brandName: item.brandName || '',
          grossWeight: item.grossWeight || 0,
          grossWeightSum: list[index].grossWeight || 0,
          netWeight: item.netWeight || 0,
          netWeightSum: list[index].netWeight || 0,
          boxNo: item.boxNo || '',
          contractNo: item.contractNo || '',
          remark: item.remark || '',
          torrNo: list[index].torrNo || item.torrNo || '',
          boxNum: list[index].boxNum || item.boxNum || 0,
          component: item.component || '',
          delId: this.delId++
        }
        // 计算每行商品信息
        this.calc('num', index, true)
      })
    },
    // 生成采购订单成功
    createPurchaseOrder() {
      this.purchaseOrder.visible.show = false
      this.$successMsg('操作成功')
      this.closeTag()
    },
    // 显示预售转销选择商品数量弹窗
    async showChoosePreSaleNumModal() {
      try {
        const { data } = await checkPreSale({ codes: this.preSaleOrderCode })
        if (data && data.length) {
          // const itemList = data.map(item => ({
          //   id: item.goodsId ? item.goodsId + '' : '',
          //   price: item.price ? item.price + '' : '',
          //   num: item.num ? item.num + '' : '',
          //   brandName: item.brandName || '',
          //   goodsName: item.goodsName || '',
          //   goodsNo: item.goodsNo || '',
          //   preNum: item.preNum ? item.preNum + '' : '',
          //   staySaleNum: item.staySaleNum ? item.staySaleNum + '' : ''
          // }))
          const itemList = data
          const { preSaleOrderCode, poNo, customerId } = data[0]
          this.choosePreSaleNum.form = { preSaleOrderCode, poNo, customerId }
          this.choosePreSaleNum.form.customerId = customerId + ''
          this.choosePreSaleNum.itemList = itemList
        }
        this.choosePreSaleNum.visible.show = true
      } catch (error) {
        this.$errorMsg(error.message)
      }
    },
    // 关闭预售转销选择商品数量弹窗
    closeChoosePreSaleNumModal(payload) {
      this.choosePreSaleNum.visible.show = false
      this.choosePreSaleNum.form = {}
      this.choosePreSaleNum.itemList = []
      if (payload && payload.length) {
        this.tableData.list = []
        payload.forEach((item, index) => {
          this.tableData.list[index] = {
            seq: item.seq || index + 1,
            id: item.id + '',
            goodsId: item.goodsId + '',
            goodsCode: item.goodsCode || '',
            goodsName: item.goodsName || '',
            goodsNo: item.goodsNo || '',
            barcode: item.barcode || '',
            num: item.num || 1,
            price: item.price || 0,
            declarePrice: item.declarePrice || item.price || 0,
            amount: item.amount || 0,
            taxAmount: item.taxAmount || 0,
            taxRate: item.taxRate ? item.taxRate.toFixed(2) : '0.00',
            tax: item.tax || 0,
            brandName: item.brandName || '',
            grossWeight: item.grossWeight || 0,
            grossWeightSum: item.grossWeightSum || 0,
            netWeight: item.netWeight || 0,
            netWeightSum: item.netWeightSum || 0,
            boxNo: item.boxNo || '',
            contractNo: item.contractNo || '',
            remark: item.remark || '',
            torrNo: item.torrNo || '',
            boxNum: item.boxNum || 0,
            component: item.component || '',
            delId: this.delId++
          }
          // 计算每行商品信息
          this.calc('num', index)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.sales-add-bx .el-form-item__label {
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
/deep/.sales-add-bx .el-form-item--mini.el-form-item{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
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
.title-bx{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
