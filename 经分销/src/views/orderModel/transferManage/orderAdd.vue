<template>
  <div class="page-bx bgc-w all-order-edit-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" :breadcrumb="breadcrumb" />
    <JFX-title title="基本信息" className="mr-t-20" />
    <el-form class="mr-t-20" :model="ruleForm" ref="ruleForm" :rules="rules" >
      <el-row  :gutter="10" class="fs-14 clr-II">
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="事业部：" prop="buId" >
            <el-select v-model="ruleForm.buId" placeholder="请选择" filterable clearable :data-list="getBUSelectBean('buListNew')" @change="changeBuId">
              <el-option v-for="item in selectOpt.buListNew"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="调出仓库：" prop="outDepotId" >
            <el-select v-model="ruleForm.outDepotId" placeholder="请选择" filterable clearable @change="outDepotIdChange">
              <el-option v-for="item in selectOpt.outDepotIdList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="调入仓库：" prop="inDepotId" >
            <el-select v-model="ruleForm.inDepotId" clearable filterable @change="inDepotIdChange">
              <el-option v-for="item in selectOpt.inDepotIdList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="是否同关区：" prop="isSameArea" >
            <el-select v-model="ruleForm.isSameArea" placeholder="请选择" clearable @change="getMustOpt">
              <el-option :label="'是'" :value="'1'"></el-option>
              <el-option :label="'否'" :value="'0'"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="调出公司：" prop="poNo" >
            <el-input v-model.trim="ruleForm.merchantName" disabled clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="调入客户：" prop="inCustomerId" >
            <el-select v-model="ruleForm.inCustomerId" placeholder="请选择" clearable @change="changeInCustomerId">
              <el-option :value="ruleForm.merchantId" :label="ruleForm.merchantName"></el-option >
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="发票号：" prop="invoiceNo" >
            <el-input v-model.trim="ruleForm.invoiceNo" clearable placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="包装方式：" prop="packType" >
            <el-input v-model.trim="ruleForm.packType" clearable placeholder="包装方式"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="箱数：" prop="cartons" >
            <el-input-number v-model.trim="ruleForm.cartons" :precision="0" :controls="false" :min="0" style="width:110%;" @change="changePackType"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="运输方式：" prop="transport" >
            <el-select v-model="ruleForm.transport" placeholder="请选择"  clearable :data-list="getSelectList('transportList')" @change="changeTransport">
              <el-option v-for="item in selectOpt.transportList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="标准箱TEU：" prop="standardCaseTeu" >
            <el-input v-model.trim="ruleForm.standardCaseTeu" clearable placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="车次：" prop="trainNumber" >
            <el-input v-model.trim="ruleForm.trainNumber" clearable placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="承运商：" prop="carrier" >
            <el-input v-model.trim="ruleForm.carrier" clearable placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="托数：" prop="torrNum" >
            <el-input-number v-model.trim="ruleForm.torrNum" :precision="0" :controls="false" :min="0" style="width:110%;" @change="changePackType"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="出库地点：" prop="outdepotAddr" >
            <el-input v-model.trim="ruleForm.outdepotAddr" clearable placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="提单号：" prop="firstLadingBillNo" >
            <el-input v-model.trim="ruleForm.firstLadingBillNo" clearable placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="收货地址：" prop="receivingAddress" >
            <el-input v-model.trim="ruleForm.receivingAddress" clearable placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="收货人姓名：" prop="consigneeUsername" >
            <el-input v-model.trim="ruleForm.consigneeUsername" clearable placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="国家：" prop="country" >
            <el-input v-model.trim="ruleForm.country" clearable placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" v-if="outDepotType === 'c'" >
          <el-form-item label="目的地：" prop="destination" >
            <el-select v-model="ruleForm.destination" placeholder="请选择" >
              <el-option v-for="item in mudiList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" v-if="outDepotType === 'c' || inDepotType === 'c'" >
          <el-form-item label="海外仓理货单位：" prop="tallyingUnit" >
            <el-select v-model="ruleForm.tallyingUnit" placeholder="请选择" @change="changeTallyingUnit" >
              <el-option v-for="item in tallyingUnitList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="境外发货人：" prop="shipper" >
            <el-input v-model.trim="ruleForm.shipper" clearable placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="唛头：" prop="mark" >
            <el-input v-model.trim="ruleForm.mark" clearable placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="PO号：" prop="poNo" >
            <el-input v-model.trim="ruleForm.poNo" clearable placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="合同号：" prop="contractNo" >
            <el-input v-model.trim="ruleForm.contractNo" clearable placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="调入仓地址：" prop="depotScheduleId" >
            <el-select v-model="ruleForm.depotScheduleId" placeholder="请选择" filterable clearable :disabled="inDepotType !== 'b'">
              <el-option v-for="item in selectOpt.depotAddList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="提单毛重(Kg)：" prop="billWeight" >
            <JFX-Input v-model.trim="ruleForm.billWeight" :min="0" :precision="5" placeholder="请输入" clearable @change="changeBillWeight" />
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="付款条约：" prop="payRules" >
            <el-input v-model.trim="ruleForm.payRules" clearable placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="托盘材质：" prop="palletMaterial" >
            <el-select v-model="ruleForm.palletMaterial" placeholder="请选择"  clearable :data-list="getSelectList('order_torrpacktypeList')" @change="changePackType">
              <el-option v-for="item in selectOpt.order_torrpacktypeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="装货港：" prop="portLoading" >
            <el-input v-model.trim="ruleForm.portLoading" clearable placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="卸货港：" prop="unloadPort" >
            <el-input v-model.trim="ruleForm.unloadPort" clearable placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="入库关区：" prop="inCustomsId" >
            <el-select v-model="ruleForm.inCustomsId" placeholder="请选择" filterable clearable >
              <el-option v-for="item in selectOpt.inCustomsIdList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="出库关区：" prop="outCustomsId" >
            <el-select v-model="ruleForm.outCustomsId" placeholder="请选择"  filterable clearable>
              <el-option v-for="item in selectOpt.outCustomsIdList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="LBX单号：" prop="lbxNo" >
            <el-input v-model="ruleForm.lbxNo" clearable placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"  :sm="12" :md="12" :lg="6" :xl="6" >
          <el-form-item label="备注：" prop="remark" >
            <el-input v-model.trim="ruleForm.remark" clearable placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <JFX-title title="商品信息" className="mr-t-20 flex-bw">
      <el-button type="primary" :size="'small'" @click="openProduct" >商品导入</el-button>
    </JFX-title>
    <div class="mr-t-20"></div>
    <!-- 表格 -->
    <JFX-table
      :tableData.sync="tableData"
      :showPagination="false"
    >
      <el-table-column
				align="center"
				width="70"
				label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="reduce(scope.$index)">
              <i class="el-icon-minus fs-16"></i>
            </el-button>
            <el-button type="text" @click="add">
              <i class="el-icon-plus fs-16"></i>
            </el-button>
          </template>
      </el-table-column>
      <el-table-column prop="code" label="序号" align="center" width="80">
        <template slot-scope="scope">
          <el-input-number v-model.trim="scope.row.seq" :datt-setdefaut="setDefaut(scope.$index)" :precision="0" :controls="false" :min="0" style="width: 100%"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="商品货号" align="center" min-width="120">
         <template slot-scope="scope">
           <div>
             <div>{{scope.row.outGoodsCode}}</div>
             <el-button type="primary" :size="'small'" @click="choseOutGoods('outDepotId', scope.$index)" >选择商品</el-button>
           </div>
         </template>
      </el-table-column>
      <el-table-column prop="outGoodsNo" label="调出商品货号" align="center" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="outGoodsName" label="调出商品名称" align="center" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="outUnit" label="调出单位" align="center" min-width="100">
        <template slot-scope="scope">
          <el-select v-model="scope.row.outUnit" placeholder="请选择" style="width: 100%" :disabled="outDepotType === 'c'">
            <el-option v-for="item in tallyingUnitList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100">
        <template slot="header">
          <span class="need">调出数量</span>
        </template>
        <template slot-scope="scope">
          <el-input-number v-model.trim="scope.row.transferNum" :precision="0" :controls="false" :min="0" style="width: 100%" @change="setTransferNum('transferNum', scope.$index )"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="170">
        <template slot="header">
          <span class="need">调入商品编号</span>
          </template>
        <template slot-scope="scope">
          <div>
            <div>
               {{scope.row.inGoodsCode}}
            </div>
            <el-button type="primary" :size="'small'" @click="choseOutGoods('inDepotId', scope.$index)" >选择商品</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="inGoodsNo" label="调入商品货号" align="center" min-width="120" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="inGoodsName" label="调入商品名称" align="center" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column label="调入单位" align="center" min-width="100">
        <template slot-scope="scope">
          <el-select v-model="scope.row.inUnit" placeholder="请选择" style="width: 100%" :disabled="inDepotType === 'c'">
            <el-option v-for="item in tallyingUnitList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100">
        <template slot="header">
          <span class="need">调入数量</span>
        </template>
        <template slot-scope="scope">
          <el-input-number v-model.trim="scope.row.inTransferNum" :precision="0" :controls="false" :min="0" style="width: 100%" :disabled="!((outDepotType ==='c' || inDepotType === 'c') && ruleForm.tallyingUnit !== '02')" ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="brandName" label="品牌类型" align="center" min-width="120">
        <template slot-scope="scope">
          <el-input v-model.trim="scope.row.brandName" disabled style="width: 100%"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="130">
        <template slot="header">
          <span class="need">调拨单价</span>
          </template>
        <template slot-scope="scope">
          <el-input-number v-model.trim="scope.row.price" :precision="2" v-max-spot="2" :controls="false" :min="0" style="width: 100%" ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="120">
        <template slot="header">
          <span class="need">毛重(kg)</span>
          </template>
        <template slot-scope="scope">
          <JFX-Input v-model.trim="scope.row.grossWeightNew" :min="0" :precision="5" placeholder="请输入" style="width: 100%;"  @change="setTotal" />
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="120">
        <template slot="header">
          <span class="need">净重(kg)</span>
        </template>
        <template slot-scope="scope">
          <JFX-Input v-model.trim="scope.row.netWeightNew" :min="0" :precision="5" placeholder="请输入" style="width: 100%;"  @change="setTotal" />
        </template>
      </el-table-column>
      <el-table-column prop="contNo" label="箱号" align="center" min-width="120">
        <template slot-scope="scope">
          <el-input v-model.trim="scope.row.contNo" clearable style="width: 100%"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="bargainno" label="合同号" align="center" min-width="120">
        <template slot-scope="scope">
          <el-input v-model.trim="scope.row.bargainno" clearable style="width: 100%"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="outBarcode" label="条形码" align="center" min-width="120">
        <!-- <template slot-scope="scope">
          <el-input v-model="scope.row.outBarcode" clearable style="width: 100%"></el-input>
        </template> -->
      </el-table-column>
      <el-table-column prop="torrNo" label="托盘号" align="center" min-width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.torrNo" clearable style="width: 100%"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="boxNum" label="箱数" align="center" min-width="100">
        <template slot-scope="scope">
          <el-input-number v-model.trim="scope.row.boxNum" :precision="0" :controls="false" :min="0" style="width: 100%" ></el-input-number>
        </template>
      </el-table-column>
    </JFX-table>
    <div class="mr-t-15 flex-c-c">
      <span>
         调出总数量：{{transferOutTotalNum || 0}}&nbsp;&nbsp;&nbsp;&nbsp;
       </span>
       <span>
         调入总数量：{{transferInTotalNum || 0}}&nbsp;&nbsp;&nbsp;&nbsp;
       </span>
       <span>
         总毛重：{{totalGrossWeight || 0}}&nbsp;&nbsp;&nbsp;&nbsp;
       </span>
       <span>
         总净重：{{totalNetWeight || 0}}
       </span>
    </div>
    <!-- 表格 end-->
    <div class="mr-t-30 flex-c-c">
      <el-button type="primary" @click="save" :loading="saveloading">保 存</el-button>
      <el-button @click="closeTag">取 消</el-button>
      <el-button type="primary" @click="askSaveForm" :loading="saveFormloading" v-permission="'transfer_saveTransferOrder'">保存并审核</el-button>
    </div>
    <!-- 选择商品 -->
    <chose-products v-if="visible.show" :visible.sync="visible" :customComfirm="customComfirm" @comfirm="comfirm" :filterData="filterData"></chose-products>
     <!-- 选择商品 -->
     <!-- 导入 -->
    <div>
      <JFX-Dialog
      :visible.sync="dialogVisible"
      :showClose="true"
      @comfirm="dialogVisible.show = false"
      :width="'860px'"
      :title="'商品导入'"
      :top="'3vh'"
      closeBtnText="取 消"
      confirmBtnText="确 认"
      >
      <div class="import-bx">
        <importfile @downup="downup" :url="importTransferGoodsUrl" :filterData="filterData1" :selfDown="true" :templateId="'2333'" @successUpload="successUpload" downText="商品导出"></importfile>
      </div>
      </JFX-Dialog>
    </div>
    <!-- 导入 end -->
    <div class="hide-form" v-if="downVal">
      <form id="down-up" :action="actionUrl" method="post" target="_blank">
          <input type="hidden" name="json" v-model="downVal" />
      </form>
    </div>
  </div>
</template>
<script>
import commomMix from '@m/index'
import choseProducts from '@c/choseProducts/index'
import { getTransferOrderDetail, getMustParameter, importTransferGoodsUrl, exportItemsUrl, saveTempTransferOrder, saveTransferOrder } from '@a/transferManage/index'
import { getDepotById, checkDepotMerchantRel, getListByIdsAndTypeAndInOutDepot, getOriginalGoodsId, getAvailableNum } from '@a/base/index'
import { getBaseUrl } from '@u/tool'
export default {
  mixins: [commomMix],
  components: {
    choseProducts,
    importfile: () => import('@/components/importfile/index')
  },
  data() {
    return {
      breadcrumb: [{
        path: '', meta: { title: '调拨订单列表' }
      },
      {
        path: '', meta: { title: '新增调拨订单' }
      }],
      ruleForm: {
        outDepotId: '',
        inDepotId: '',
        isSameArea: '',
        buId: '',
        inCustomerId: '',
        invoiceNo: '',
        packType: '',
        cartons: '',
        transport: '',
        standardCaseTeu: '',
        trainNumber: '',
        torrNum: '',
        outdepotAddr: '',
        firstLadingBillNo: '',
        receivingAddress: '',
        consigneeUsername: '',
        country: '',
        destination: '',
        tallyingUnit: '',
        shipper: '',
        poNo: '',
        contractNo: '',
        depotScheduleId: '',
        billWeight: '',
        lbxNo: '',
        remark: '',
        merchantName: '',
        carrier: '',
        mark: '',
        payRules: '',
        palletMaterial: '',
        portLoading: '',
        unloadPort: '',
        outCustomsId: '',
        inCustomsId: '',
        merchantId: ''
      },
      rules: {
        outDepotId: { required: true, message: '调出仓库不能为空', trigger: 'change' },
        inDepotId: { required: true, message: '调入仓库不能为空', trigger: 'change' },
        buId: { required: true, message: '事业部不能为空', trigger: 'change' },
        cartons: { required: true, message: '箱数不能为空', trigger: 'change' },
        transport: { required: true, message: '运输方式不能为空', trigger: 'change' },
        torrNum: { required: true, message: '运输方式不能为空', trigger: 'change' },
        receivingAddress: { required: true, message: '收货地址不能为空', trigger: 'change' },
        tallyingUnit: { required: true, message: '外仓理货单位不能为空', trigger: 'change' },
        palletMaterial: { required: true, message: '托盘材质不能为空', trigger: 'change' },
        unloadPort: { required: true, message: '卸货港不能为空', trigger: 'change' },
        destination: { required: true, message: '目的地不能为空', trigger: 'change' },
        contractNo: { required: true, message: '合同号不能为空', trigger: 'change' },
        outdepotAddr: { required: true, message: '出库地点不能为空', trigger: 'change' },
        isSameArea: { required: false, message: '是否同关区不能为空', trigger: 'change' },
        inCustomerId: { required: false, message: '调入客户不能为空', trigger: 'change' },
        firstLadingBillNo: { required: false, message: '调入客户不能为空', trigger: 'change' },
        trainNumber: { required: false, message: '车次不能为空', trigger: 'change' },
        standardCaseTeu: { required: false, message: '标准箱TEU不能为空不能为空', trigger: 'change' },
        country: { required: false, message: '国家不能为空', trigger: 'change' },
        depotScheduleId: { required: false, message: '调入不能为空', trigger: 'change' }
      },
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      visible: { show: false },
      dialogVisible: { show: false },
      filterData: {},
      mudiList: [
        { value: '广州机场', key: 'GZJC01' },
        { value: '黄埔状元谷', key: 'HP01' },
        { value: '香港本地', key: 'HK01' }
      ],
      tallyingUnitList: [
        { value: '托盘', key: '00' },
        { value: '箱', key: '01' },
        { value: '件', key: '02' }
      ],
      detail: {},
      outDepotType: '', // 仓库类型：a-保税仓，b-虚拟仓，c-海外仓，d-金融在途仓
      outIsTopBooks: '',
      productRestriction: '',
      inDepotIsInOutInstruction: '',
      outDepotIsInOutInstruction: '',
      inDepotType: '',
      mustparms: [],
      item: {
        outGoodsNo: '',
        outGoodsName: '',
        brandName: '',
        outUnit: '02', // 非海外仓 理货单为默认为 件
        transferNum: '',
        inGoodsNo: '',
        inGoodsName: '',
        inGoodsCode: '',
        inUnit: '02',
        inTransferNum: '',
        price: '',
        grossWeight: '',
        grossWeightNew: '',
        netWeight: '',
        netWeightNew: '',
        contNo: '',
        bargainno: '',
        remark: '',
        seq: '',
        outBarcode: '',
        torrNo: '',
        boxNum: ''
      },
      transferOutTotalNum: '',
      transferInTotalNum: '',
      totalGrossWeight: '',
      totalNetWeight: '',
      filterData1: {},
      importTransferGoodsUrl: importTransferGoodsUrl,
      downVal: '',
      depotTypeData: {},
      customComfirm: null,
      saveloading: false,
      saveFormloading: false,
      numLen: 3 // 保证毛重的小数位与总总毛重小数位保持一致
    }
  },
  watch: {
    outDepotIsInOutInstruction(val) {
      this.rules.isSameArea.required = val === '1'
    },
    inDepotIsInOutInstruction(val) {
      this.rules.isSameArea.required = val === '1'
    },
    mustparms(val) {
      if (val && val.length > 0) {
        const paramJson = {
          inCustomerId: '调入客户',
          contractNo: '合同号',
          invoiceNo: '发票号',
          packType: '包装方式',
          cartons: '箱数',
          firstLadingBillNo: '提单号',
          consigneeUsername: '收货人姓名',
          depotScheduleId: '调入仓地址',
          country: '国家'
        }
        for (let key in paramJson) {
          if (this.ruleForm[key] !== undefined) {
            const flag = val.includes(key + '')
            this.rules[key] = { required: flag, message: paramJson[key] + '不能为空', trigger: 'change' }
          }
        }
        console.log(this.rules)
      }
    },
    $route() {
      this.init()
    }
  },
  mounted() {
    this.add() // 设置默认一个商品一行数据
    this.init()
  },
  methods: {
    async init() {
      // 重置
      this.detail = {}
      this.tableData.list = [ {} ]
      this.reset('ruleForm')
      this.saveloading = false
      this.saveFormloading = false
      this.dialogVisible = { show: false }
      this.visible = { show: false }
      this.breadcrumb[1].meta.title = '新增调拨订单'
      const { query } = this.$route
      if (!query.id) {
        this.setMerchantName()
        return false
      }
      const res = await getTransferOrderDetail({ id: query.id })
      this.detail = res.data
      for (let key in this.ruleForm) {
        this.ruleForm[key] = res.data[key] || ''
      }
      this.ruleForm.outDepotId = this.ruleForm.outDepotId + '' // 转字符串
      this.ruleForm.inDepotId = this.ruleForm.inDepotId + '' // 转字符串
      this.ruleForm.outCustomsId = this.ruleForm.outCustomsId + '' // 转字符串
      this.ruleForm.inCustomsId = this.ruleForm.inCustomsId + '' // 转字符串
      this.ruleForm.inCustomerId = this.ruleForm.inCustomerId + '' // 转字符串
      this.ruleForm.buId = this.ruleForm.buId + '' // 转字符串
      this.tableData.list = []
      if (this.ruleForm.billWeight.includes('.')) {
        const arr = this.ruleForm.billWeight.split('.')
        if (arr[1].length > 5) {
          this.ruleForm.billWeight = (+this.ruleForm.billWeight).toFixed(5)
          this.numLen = 5
        } else {
          this.numLen = arr[1].length
        }
      } else {
        this.ruleForm.billWeight = (+this.ruleForm.billWeight).toFixed(3)
        this.numLen = 3
      }
      // 表格数据
      if (this.detail.orderItemDTOS && this.detail.orderItemDTOS.length > 0) {
        this.tableData.list = []
        // 表格数据
        this.detail.orderItemDTOS.forEach(item => {
          const { grossWeight, grossWeightSum, id, seq, outGoodsCode, outGoodsNo, outGoodsName, outUnit, transferNum, inGoodsCode, inGoodsId, inGoodsNo, inGoodsName, inUnit, inTransferNum, brandName, price, outGoodsId, netWeight, netWeightSum, contNo, bargainno, remark, num, inBarcode, torrNo, boxNum, outCommbarcode, inCommbarcode, outBarcode } = item
          const jtem = { grossWeight, id, seq, outGoodsCode, outGoodsNo, outGoodsName, outUnit, transferNum, inGoodsId, inGoodsCode, inGoodsNo, inGoodsName, inUnit, inTransferNum, brandName, price, outGoodsId, netWeight, netWeightSum, contNo, bargainno, remark, grossWeightNew: grossWeightSum, netWeightNew: netWeightSum, num, inBarcode, torrNo, boxNum, outCommbarcode, inCommbarcode, outBarcode }
          this.tableData.list.push(jtem)
        })
        this.setTotal()
      }
      this.setMerchantName()
      this.changeBuId('init')
      if (this.ruleForm.outDepotId) this.outDepotIdChange('init')
      if (this.ruleForm.inDepotId) this.inDepotIdChange('init')
    },
    async setMerchantName() {
      const userInfo = this.getUserInfo()
      this.ruleForm.merchantName = userInfo.merchantName || ''
      this.ruleForm.merchantId = userInfo.merchantId || ''
    },
    // 减
    reduce(index) {
      if (this.tableData.list.length === 1) {
        this.tableData.list = [{}]
      } else {
        const list = this.tableData.list
        list.splice(index, 1)
        this.tableData.list = list
      }
    },
    // 选择事业部
    changeBuId(type) {
      const { buId } = this.ruleForm
      delete this.selectOpt.outDepotIdList
      if (buId) {
        this.getSelectBeanByMerchantBuRel('outDepotIdList', { type: 'a,c,d', buId }) // 仓库类别 a-保税仓，b-备查库，c-海外仓，d-中转仓,e-暂存区，f-销毁区 g-内贸仓
      }
      if (type !== 'init') {
        this.ruleForm.outDepotId = ''
        this.ruleForm.inDepotId = ''
      }
    },
    // 选择入库仓库
    async inDepotIdChange(type) {
      delete this.selectOpt.inCustomsIdList
      if (type !== 'init') { // 如果不是初始， 则清空数据
        this.ruleForm.inCustomsId = ''
        this.ruleForm.isSameArea = ''
        this.ruleForm.tallyingUnit = ''
        // this.getMustParameter()
      }
      // 获取入库关区下拉列表
      this.getSelectCustomsArea('inCustomsIdList', {depotId: this.ruleForm.inDepotId})
      // 获取仓库信息
      const res = await getDepotById({ id: this.ruleForm.inDepotId })
      this.inDepotType = res.data.type
      if (this.ruleForm.inDepotId) {
        const res1 = await checkDepotMerchantRel({ depotId: this.ruleForm.inDepotId })
        this.productRestriction = res1.data.productRestriction || ''
        this.inDepotIsInOutInstruction = res1.data.isInOutInstruction || ''
      }
      // 获取必填字段
      this.getMustOpt()
        if (type !== 'init') {
          this.tableData.list.forEach(item => {
            item.grossWeightNew = ''
            item.netWeightNew = ''
            item.price = ''
            item.inTransferNum = ''
            item.brandName = ''
            item.contNo = ''
            item.bargainno = ''
            item.remark = ''
            item.inCommbarcode = ''
            item.inGoodsCode = ''
            item.inGoodsId = ''
            item.inGoodsNo = ''
            item.netWeight = ''
            item.grossWeight = ''
            item.outBarcode = ''
            item.torrNo = ''
            item.boxNum = ''
          })
        }
      },
    // 选择出库仓库
    async outDepotIdChange(type) {
      delete this.selectOpt.outCustomsIdList // 清除出库关区下拉列表
      delete this.selectOpt.inDepotIdList // 清除调入仓库下拉数据
      if (type !== 'init') { // 如果不是初始，则清空数据
        this.ruleForm.outCustomsId = ''
        this.ruleForm.inDepotId = ''
        this.ruleForm.depotScheduleId = ''
        this.ruleForm.tallyingUnit = ''
        this.ruleForm.isSameArea = ''
      }
      // 获取出库关区下拉列表
      this.getSelectCustomsArea('outCustomsIdList', {depotId: this.ruleForm.outDepotId})
      // 获取仓库信息
      const res = await getDepotById({ id: this.ruleForm.outDepotId })
      this.outDepotType = res.data.type
      console.log(this.outDepotType, 88888)
      this.outIsTopBooks = res.data.isTopBooks
      if (this.outDepotType === 'a') {
        this.getSelectBeanByMerchantRel('inDepotIdList', {type: 'a,c'})
      } else if (this.outDepotType === 'b') {
        this.getSelectBeanByMerchantRel('inDepotIdList', {type: 'e'})
      } else if (this.outDepotType === 'c') {
        this.getSelectBeanByMerchantRel('inDepotIdList', {type: 'a'})
      } else if (this.outDepotType === 'e' && this.outIsTopBooks === '1') {
        this.getSelectBeanByMerchantRel('inDepotIdList', {type: 'f'})
      } else if (this.outDepotType === 'e' && this.outIsTopBooks === '0') {
        this.getSelectBeanByMerchantRel('inDepotIdList', {type: 'b'})
      }
      if (this.ruleForm.outDepotId) {
        const res2 = await checkDepotMerchantRel({ depotId: this.ruleForm.outDepotId })
        this.outDepotIsInOutInstruction = res2.data.isInOutInstruction || ''
      }
      // 调入仓为备查仓时显示 显示 仓库地址
      if (this.inDepotType === 'b') {
        delete this.selectOpt.depotAddList
        this.getdepotArrList('depotAddList', { depotId: this.ruleForm.inDepotId })
      }
      // 获取必填字段
      this.getMustOpt()
      if (type !== 'init') {
        this.tableData.list = [{...this.item}]
      }
    },
    add() {
      this.tableData.list.push({...this.item})
    },
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
        }
      })
    },
    // 理货单位改变时
    changeTallyingUnit() {
      if (this.outDepotType === 'c') {
        this.tableData.list.map(item => { item.outUnit = this.ruleForm.tallyingUnit })
      }
      if (this.inDepotType === 'c') {
        this.tableData.list.map(item => { item.inUnit = this.ruleForm.tallyingUnit })
      }
    },
    // 选择运输方式
    changeTransport() {
      // 当运输方式为海运、空运时必填提单号
      const flag = (this.ruleForm.transport + '') === '1' || (this.ruleForm.transport + '') === '2'
      this.rules['firstLadingBillNo'] = { required: flag, message: '提单号不能为空', trigger: 'change' }
      // 当运输方式为陆运、港到仓拖车时必填
      const flag1 = (this.ruleForm.transport + '') === '3' || (this.ruleForm.transport + '') === '4'
      this.rules['trainNumber'] = { required: flag1, message: '车次不能为空', trigger: 'change' }
      // 当运输方式为海运时必填
      const flag2 = (this.ruleForm.transport + '') === '2'
      this.rules['standardCaseTeu'] = { required: flag2, message: '标准箱TEU不能为空不能为空', trigger: 'change' }
    },
    // 获取必填字段
    async getMustOpt() {
      if (this.ruleForm.outDepotId && this.ruleForm.inDepotId) {
        const res = await getMustParameter({ outDepotId: this.ruleForm.outDepotId, inDepotId: this.ruleForm.inDepotId, isSameArea: this.ruleForm.isSameArea })
        if (res.data) {
          const str = res.data.replace(/Label/gi, '')
          this.mustparms = str.split(',')
        }
      }
    },
    // 点击选择商品执行
    choseOutGoods(depotType, index) {
      if (!this.ruleForm.outDepotId) {
        this.$errorMsg('调出仓库不能为空')
        return false
      }
      if (!this.ruleForm.inDepotId) {
        this.$errorMsg('调入仓库不能为空')
        return false
      }
      const { outGoodsId, inGoodsId } = this.tableData.list[index]
      if (depotType === 'inDepotId' && !outGoodsId) {
        this.$errorMsg('请先选择调出商品！')
        return false
      }
      this.depotTypeData = { depotType, index }
      // 调出 选择商品
      if (depotType === 'outDepotId') {
        this.customComfirm = this.comfirmOut
        const unNeedArray = this.tableData.list.filter(item => !!item.outGoodsId === true)
        const unNeedIds = unNeedArray.map(item => item.outGoodsId).toString()
        this.filterData = {
          depotId: this.ruleForm.outDepotId,
          unNeedIds,
          popupType: 4
        }
      } else { // 调入选择商品
        this.customComfirm = null
        this.filterData = {
          popupType: 4,
          depotId: this.ruleForm.inDepotId,
          unNeedIds: inGoodsId + '',
          id: outGoodsId + ''
        }
      }
      this.visible.show = true
    },
    // 调出 选择商品后点击确认执行
    async comfirmOut(list) {
      this.visible.show = false
      if (list.length < 1) return false
      const { depotType, index } = this.depotTypeData
      // 调出
      if (depotType === 'outDepotId') {
        const ids = list.map(item => item.id).toString()
        const res = await getListByIdsAndTypeAndInOutDepot({ type: 4, ids, depotId: this.ruleForm.outDepotId })
        if (res.data) {
          const arr = []
          res.data.forEach(item => {
            const { outFilingPrice } = item
            arr.push({
              ...item,
              grossWeightNew: item.grossWeight || 0,
              netWeightNew: item.netWeight || 0,
              seq: '',
              outUnit: this.outDepotType === 'c' ? this.ruleForm.tallyingUnit : '02',
              transferNum: '',
              inUnit: this.inDepotType === 'c' ? this.ruleForm.tallyingUnit : '02',
              inTransferNum: '',
              price: outFilingPrice || '',
              contNo: '',
              bargainno: '',
              remark: '',
              boxNum: '',
              torrNo: ''
            })
          })
          this.tableData.list.splice(index, 1, ...arr)
          this.setTotal()
        }
      }
    },
    // 调入选择商品后点击确认执行
    comfirm(list) {
      this.visible.show = false
      if (list.length < 1) return false
      const { depotType, index } = this.depotTypeData
      if (depotType === 'inDepotId') {
        const targetItem = this.tableData.list[index]
        const arr = []
        list.forEach(item => {
          const { goodsNo, goodsCode, brandName, id, name, commbarcode } = item
          arr.push({
            ...targetItem,
            grossWeightNew: '',
            netWeightNew: '',
            seq: '',
            transferNum: '',
            inUnit: this.inDepotType === 'c' ? this.ruleForm.tallyingUnit : '02',
            inTransferNum: '',
            price: '',
            contNo: '',
            bargainno: '',
            remark: '',
            inGoodsId: id,
            inGoodsName: name,
            inGoodsCode: goodsCode,
            brandName,
            inGoodsNo: goodsNo,
            inCommbarcode: commbarcode,
            outBarcode: '',
            torrNo: '',
            boxNum: ''
          })
        })
        this.tableData.list.splice(index, 1, ...arr)
        this.setTotal()
      }
    },
    // 计算
    setTransferNum(key, index) {
      const { tallyingUnit } = this.ruleForm
      if (this.outDepotType === 'c' || this.inDepotType === 'c') {
        if (tallyingUnit === '02') {
          const { transferNum, inTransferNum } = this.tableData.list[index]
          if (key === 'transferNum') this.tableData.list[index]['inTransferNum'] = transferNum
          if (key === 'inTransferNum') this.tableData.list[index]['transferNum'] = inTransferNum
        }
      } else {
        const { transferNum, inTransferNum } = this.tableData.list[index]
        if (key === 'transferNum') this.tableData.list[index]['inTransferNum'] = transferNum
        if (key === 'inTransferNum') this.tableData.list[index]['transferNum'] = inTransferNum
      }
      const { inTransferNum, grossWeight, netWeight } = this.tableData.list[index]
      const totalGrossWeight = parseFloat(grossWeight || 0) * (inTransferNum || 1)
      const totalNetWeight = parseFloat(netWeight || 0) * (inTransferNum || 1)
      this.tableData.list[index]['grossWeightNew'] = totalGrossWeight.toFixed(5)
      this.tableData.list[index]['netWeightNew'] = totalNetWeight.toFixed(5)
      this.setTotal()
    },
    // 总计算
    setTotal() {
      let transferOutTotalNum = 0
      let transferInTotalNum = 0
      let totalGrossWeight = 0
      let totalNetWeight = 0
      let maxlen = 0
      this.tableData.list.forEach(item => {
        totalGrossWeight += (+item.grossWeightNew)
        totalNetWeight += (+item.netWeightNew)
        transferInTotalNum += (+item.inTransferNum)
        transferOutTotalNum += (+item.transferNum)
        // 获取最大的小数点长度
        if ((item.grossWeightNew + '').includes('.')) {
          const arr = (item.grossWeightNew + '').split('.')
          const len = arr[1].length
          if (len > maxlen) maxlen = len
        }
      })
      this.totalNetWeight = totalNetWeight.toFixed(5)
      this.transferInTotalNum = parseInt(transferInTotalNum)
      this.transferOutTotalNum = parseInt(transferOutTotalNum)
      this.ruleForm.billWeight = maxlen > 0 ? totalGrossWeight.toFixed(maxlen) : totalGrossWeight
      this.totalGrossWeight = totalGrossWeight.toFixed(5)
    },
    // 计算各毛重
    changeBillWeight() {
      if (!this.ruleForm.billWeight) this.ruleForm.billWeight = '0'
      const billWeight = this.ruleForm.billWeight + ''
      let maxlen = 3
      if (billWeight.includes('.')) {
        const arr = billWeight.split('.')
        maxlen = arr[1].length
      }
      this.totalGrossWeight = this.ruleForm.billWeight
      let total = 0
      let num = 0
      const len = this.tableData.list.length
      this.tableData.list.forEach(item => {
        total += (+item.netWeightNew)
      })
      this.tableData.list.forEach((item, i) => {
        if (this.ruleForm.billWeight === 0 || total === 0) {
          item.grossWeightNew = 0
        } else {
          const { netWeightNew = 0 } = item
          const kola = total > 0 ? (netWeightNew / total) * this.ruleForm.billWeight : 0
          if (i < len - 1) {
            item.grossWeightNew = kola.toFixed(maxlen)
            num = num + kola
          } else {
            const lastNum = this.ruleForm.billWeight - num
            item.grossWeightNew = lastNum && lastNum > 0 ? lastNum.toFixed(maxlen) : 0
          }
        }
      })
    },
    // 商品导入成功
    successUpload(e) {
      if (e.data) e.data.failure = e.data.failure ? e.data.failure : 0
      if (e.data.data && e.data.data.length > 0 && e.data.failure < 1) {
        this.dialogVisible.show = false
          this.$confirm('确认覆盖已存在的所有商品信息？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
            const ids = e.data.data.map(item => item.inGoodsId).toString()
            const res = await getListByIdsAndTypeAndInOutDepot({ type: 4, ids, depotId: this.ruleForm.outDepotId })
            if (res.data) {
              const arr = []
              res.data.forEach(item => {
                const importData = e.data.data.find(gtem => +gtem.inGoodsId === +item.inGoodsId) || {}
                arr.push({
                  ...importData,
                  ...item,
                  grossWeightNew: importData.grossWeight || 0,
                  netWeightNew: importData.netWeight || 0,
                  outUnit: this.outDepotType === 'c' ? this.ruleForm.tallyingUnit : '02',
                  transferNum: importData.num || 0,
                  inUnit: this.inDepotType === 'c' ? this.ruleForm.tallyingUnit : '02',
                  inTransferNum: importData.num || '',
                  price: importData.price || '',
                  contNo: '',
                  bargainno: '',
                  remark: ''
                })
              })
              console.log(arr, 889)
              this.tableData.list = arr
              this.setTotal()
            }
        })
      }
    },
    // 下载商品模板
    async downup() {
      const itemList = []
      this.tableData.list.map(item => {
        const opt = {
          seq: item.seq ? item.seq + '' : '', // 序号
          outGoodsNo: item.outGoodsNo ? item.outGoodsNo + '' : '', // 调入商品号
          inGoodsNo: item.inGoodsNo ? item.inGoodsNo + '' : '', // 调出商品号
          grossWeightSum: item.grossWeightNew ? item.grossWeightNew + '' : '',
          netWeightSum: item.grossWeightNew ? item.netWeightNew + '' : '',
          num: item.transferNum ? item.transferNum + '' : '', // 调出数量
          price: item.price ? item.price + '' : '', // 调拨单价
          outBarcode: item.outBarcode + '', // 条形码
          torrNo: item.torrNo ? item.torrNo + '' : '', // 托盘号
          boxNum: item.boxNum ? item.boxNum + '' : '' // 箱数
        }
        itemList.push(opt)
      })
      this.actionUrl = getBaseUrl(exportItemsUrl) + exportItemsUrl + `?token=${sessionStorage.getItem('token')}`
      this.downVal = JSON.stringify({ itemList })
      this.$nextTick(() => {
        const form = document.getElementById('down-up')
        form.submit()
        this.downVal = ''
      })
    },
    // 打开商品导入
    openProduct() {
      if (!this.ruleForm.outDepotId) {
        this.$errorMsg('调出仓库不能为空')
        return false
      }
      if (!this.ruleForm.inDepotId) {
        this.$errorMsg('调入仓库不能为空')
        return false
      }
      this.filterData1 = {
        outDepotId: this.ruleForm.outDepotId,
        inDepotId: this.ruleForm.inDepotId
      }
      this.dialogVisible.show = true
    },
    // 保存不需要校验
    async save() {
      //   if (!this.ruleForm.outDepotId) {
      //   this.$errorMsg('调出仓库不能为空')
      //   return false
      // }
      // if (!this.ruleForm.inDepotId) {
      //   this.$errorMsg('调入仓库不能为空')
      //   return false
      // }
      if (!this.ruleForm.buId) {
        this.$errorMsg('事业部不能为空')
        return false
      }
      let flag = true
      const arr = []
      for (let i = 0; i < this.tableData.list.length; i++) {
        const { outGoodsId, seq, outUnit, transferNum, inGoodsId, inUnit, inTransferNum, brandName, price, grossWeight, grossWeightNew, netWeight, netWeightNew, contNo, bargainno, remark, boxNum, torrNo, outBarcode } = this.tableData.list[i]
        if (!outGoodsId) continue
        const targetItem = {
          outGoodsId,
          seq,
          outUnit,
          transferNum,
          inGoodsId,
          inUnit,
          inTransferNum,
          brandName,
          price,
          grossWeight,
          netWeight,
          contNo,
          bargainno,
          remark,
          grossWeightSum: grossWeightNew,
          netWeightSum: netWeightNew,
          boxNum,
          torrNo,
          outBarcode
        }
        for (let key in targetItem) {
          targetItem[key] = targetItem[key] ? targetItem[key] + '' : ''
        }
        arr.push(targetItem)
      }
      if (!flag) return false
      this.saveloading = true
      try {
        const json = this.getParms()
        json.goodsList = arr
        const result = await saveTempTransferOrder({ json: JSON.stringify(json) })
        if (result.data.code === '00') {
          this.$successMsg('保存成功')
          this.closeTag()
        } else {
          this.$errorMsg(result.data.message)
        }
      } catch (error) {
        console.log(error)
      }
       this.saveloading = false
    },
    // 保存并审核：1.二次确认是否审核 2.校验必填项 3.校验库存可用量 4.提交保存
    saveForm() {
      // if (this.rules.inCustomerId.required) {
      //   this.ruleForm.inCustomerId = this.ruleForm.merchantId
      // }
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          const { outIsTopBooks, outDepotType, inDepotType, inDepotIsInOutInstruction, outDepotIsInOutInstruction } = this
          if (outDepotType === 'a' && !(inDepotType === 'a' || inDepotType === 'c')) {
            this.$errorMsg('当调出仓库为保税仓时，调入仓库仅能选海外仓和保税仓!')
            return false
          }
          if (outDepotType === 'c' && inDepotType !== 'a') {
            this.$errorMsg('当调出仓库为海外仓时，调入仓库仅能选保税仓')
            return false
          }
          if (outDepotType === 'b' && inDepotType !== 'e') {
            this.$errorMsg('当调出仓库为备查库时，调入仓库仅为暂存仓！')
            return false
          }
          if (outDepotType === 'e' && outIsTopBooks === '1' && inDepotType !== 'f') {
            this.$errorMsg('当调出仓库为暂存仓且标识为代销仓时，调入仓库仅能选销毁区！')
            return false
          }
          if (outDepotType === 'e' && outIsTopBooks === '0' && inDepotType !== 'b') {
            this.$errorMsg('当调出仓库为暂存仓且标识为非代销仓时，调入仓库仅能选备查库！')
            return false
          }
          if ((outDepotType === 'a') && (inDepotType === 'a' || inDepotType === 'b')) {
            if (!this.ruleForm.isSameArea && this.ruleForm.isSameArea !== '0') {
              this.$errorMsg('是否同关区不能为空')
              return false
            }
          }
          // 当入库仓是备案仓时  仓库地址 和 是否同关区不能为空
          if (inDepotType === 'b') {
            if (!this.ruleForm.depotScheduleId) {
              this.$errorMsg('入库仓为备查仓时,调入仓地址不能为空')
              return false
            }
          }
          // 检查是否涉及香港仓，是则添加理货单位
          if (outDepotType === 'c' || inDepotType === 'c') {
            if (!this.ruleForm.tallyingUnit) {
              this.$errorMsg('请选择理货单位')
              return false
            }
          }
          if (outDepotType === 'c') {
            if (!this.ruleForm.destination) {
              this.$errorMsg('请输入目的地')
              return false
            }
          }
          let flag = true
          const arr = []
          const checkInventoryGoods = []
          for (let i = 0; i < this.tableData.list.length; i++) {
            const { outGoodsId, seq, outUnit, transferNum, inGoodsId, inUnit, outGoodsNo, inTransferNum, brandName, outCommbarcode, inCommbarcode, price, grossWeight, grossWeightNew, netWeight, netWeightNew, contNo, bargainno, remark, boxNum, torrNo, outBarcode } = this.tableData.list[i]
            const tips = `表格第${i + 1}行,`
            if (!outGoodsId) {
              this.$errorMsg(tips + '请选择调出商品')
              flag = false
              break
            }
            if (!inGoodsId) {
              this.$errorMsg(tips + '请选择调入商品！')
              flag = false
              break
            }
            if (!transferNum || transferNum < 1) {
              this.$errorMsg(tips + '请输入调出数量且不能小于0')
              flag = false
              break
            }
            if (!inTransferNum || inTransferNum < 1) {
              this.$errorMsg(tips + '请输入调入数量且不能小于0')
              flag = false
              break
            }
            const kk = (outDepotType === 'a' && inDepotType === 'a' && this.ruleForm.isSameArea === '0' && inDepotIsInOutInstruction === '1') || (outDepotType === 'c' && inDepotType === 'b') || (outDepotType === 'c' && inDepotType === 'a')
            if (kk) {
               if (!price || price <= 0) {
                  this.$errorMsg(tips + '调拨单价不能为空')
                  flag = false
                  break
               }
            }
            if (inDepotIsInOutInstruction === '1' || outDepotIsInOutInstruction === '1') {
              if (!price || price <= 0) {
                this.$errorMsg(tips + '请选择调拨单价！')
                flag = false
                break
              }
            }
            if (!grossWeightNew) {
              this.$errorMsg(tips + '【商品信息】毛重不能为空！')
              flag = false
              break
            }
            if (!netWeightNew) {
              this.$errorMsg(tips + '【商品信息】净重不能为空！')
              flag = false
              break
            }
            if (parseFloat(grossWeightNew) < parseFloat(netWeightNew)) {
              this.$errorMsg(tips + '毛重不能小于净重，调出商品货号')
              flag = false
              break
            }
            if (outCommbarcode !== inCommbarcode) {
              this.$errorMsg(tips + '调入商品与调出商品标准条码不一致，调出商品货号' + outGoodsNo)
              flag = false
              break
            }
            if (outDepotType === 'c' && inDepotType === 'a') {
              if (!contNo) {
                this.$errorMsg(tips + '【商品信息】箱号不能为空！')
                flag = false
                break
              }
              if (!bargainno) {
                this.$errorMsg(tips + '【商品信息】合同号不能为空！')
                flag = false
                break
              }
            }
            const targetItem = {
              outGoodsId,
              seq,
              outUnit,
              transferNum,
              inGoodsId,
              inUnit,
              inTransferNum,
              brandName,
              price,
              grossWeight,
              netWeight,
              contNo,
              bargainno,
              remark,
              grossWeightSum: grossWeightNew,
              netWeightSum: netWeightNew,
              boxNum,
              torrNo,
              outBarcode
            }
            for (let key in targetItem) {
              targetItem[key] = targetItem[key] ? targetItem[key] + '' : ''
            }
            arr.push(targetItem)
            checkInventoryGoods.push({ goodsId: outGoodsId, goodsNo: outGoodsNo, transferNum: transferNum })
          }
          if (!flag) return false
          this.saveFormloading = true
          const mergeJson = {}
          try {
            for (let j = 0; j < checkInventoryGoods.length; j++) {
              const item = checkInventoryGoods[j]
               const res1 = await getOriginalGoodsId({ goodsId: item.goodsId, goodsNo: item.goodsNo, type: 'originalGoodsNo' })
              const { originalGoodsId } = res1.data
              if (originalGoodsId) {
                if (!mergeJson[originalGoodsId]) {
                  mergeJson[originalGoodsId] = item
                } else {
                  const num = mergeJson[originalGoodsId].transferNum
                  item.transferNum = parseInt(num) + parseInt(item.transferNum)
                  mergeJson[originalGoodsId] = item
                }
              } else {
                mergeJson[item.goodsId] = item
              }
              for (let key in mergeJson) {
                const tItem = mergeJson[key]
                const depotData = await getDepotById({ id: this.ruleForm.outDepotId }) // 获取仓库信息
                const { type, code, name } = depotData.data
                const depotType = type || ''
                let searchUnit = null
                if (depotType === 'c') {
                  if (this.ruleForm.tallyingUnit === '00') { // 转换为库存的理货单位
                    searchUnit = '0' // 托盘
                  } else if (this.ruleForm.tallyingUnit === '01') {
                    searchUnit = '1' // 箱
                  } else if (this.ruleForm.tallyingUnit === '02') {
                    searchUnit = '2' // 件
                  }
                }
                // 获取库存量
                const res2 = await getAvailableNum({ depotId: this.ruleForm.outDepotId, goodsId: key, depotCode: code, unit: searchUnit })
                const availableNum = res2.data || -1
                if (availableNum === -1) {
                  // 获取原货号
                  const res3 = await getOriginalGoodsId({ goodsNo: tItem.goodsNo, goodsId: key, type: 'originalGoodsNo' })
                  const tempGoodsNo = res3.data.originalGoodsNo
                  if (tempGoodsNo) {
                    this.$errorMsg(`原货号：${tempGoodsNo} 商品货号：${tItem.goodsNo}, 未查到库存可用量`)
                  } else {
                    this.$errorMsg(`未查到库存余量货号：${tItem.goodsNo}, 仓库：${name}`)
                  }
                  throw new Error(false)
                } else if (tItem.transferNum > availableNum) {
                  const res3 = await getOriginalGoodsId({ goodsNo: tItem.goodsNo, goodsId: key, type: 'originalGoodsNo' })
                  const tempGoodsNo = res3.data.originalGoodsNo
                  if (tempGoodsNo) {
                    this.$errorMsg(`库存不足，原货号：${tempGoodsNo} 商品货号：${tItem.goodsNo}, 余量： ${availableNum}`)
                  } else {
                    this.$errorMsg(`库存不足，货号：${tItem.goodsNo} 仓库: ${name}, 余量： ${availableNum}`)
                  }
                  throw new Error(false)
                }
              }
            }
          } catch (err) {
            console.log(err)
            flag = false
            this.saveFormloading = false
          }
          if (!flag) return false
          const sepData = this.tableData.list.find(item => item.seq === '')
          if (sepData) {
            this.$confirm('存在排序序号为空的商品，是否按现有排序提交？', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async() => {
              try {
                const json = {
                  ...this.ruleForm,
                  orderId: this.ruleForm.id || '',
                  goodsList: arr
                }
                const res4 = await saveTransferOrder({ json: JSON.stringify(json) })
                if (res4.data.code === '00') {
                  this.$successMsg('保存成功')
                  this.closeTag()
                } else {
                  this.$errorMsg(res4.data.message)
                }
              } catch (err) {

              }
              this.saveFormloading = false
            }).catch(() => {
              this.saveFormloading = false
            })
          } else {
            try {
              const json = this.getParms()
              json.goodsList = arr
              const res4 = await saveTransferOrder({ json: JSON.stringify(json) })
              if (res4.data.code === '00') {
                this.$successMsg('保存成功')
                this.closeTag()
              } else {
                this.$errorMsg(res4.data.message)
              }
            } catch (err) {

            }
            this.saveFormloading = false
          }
        }
      })
    },
    askSaveForm() {
      this.$confirm('确定保存并审核该调拨订单?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
        this.saveForm()
			})
    },
    getParms() {
      // 转字符串
      for (let key in this.ruleForm) {
        this.ruleForm[key] = this.ruleForm[key] ? this.ruleForm[key] + '' : ''
      }
      const kata = JSON.parse(JSON.stringify(this.ruleForm))
      const { depotScheduleId, inDepotId, outDepotId, inCustomerId } = kata
      // 调入仓地址
      let depotScheduleAddress = ''
      if (this.selectOpt.depotAddList && this.selectOpt.depotAddList.length > 0) {
        const t = this.selectOpt.depotAddList.find(item => item.key === depotScheduleId) || {}
        depotScheduleAddress = t.value || ''
      }
      // 调入仓库名称
      let inDepotName = ''
      if (this.selectOpt.inDepotIdList && this.selectOpt.inDepotIdList.length > 0) {
        const t1 = this.selectOpt.inDepotIdList.find(item => item.key === inDepotId) || {}
        inDepotName = t1.value || ''
      }
      // 调出出库名称
      let outDepotName = ''
      if (this.selectOpt.outDepotIdList && this.selectOpt.outDepotIdList.length > 0) {
        const t2 = this.selectOpt.outDepotIdList.find(item => item.key === outDepotId) || {}
        outDepotName = t2.value || ''
      }
      // 调入客户名称
      const inCustomerName = inCustomerId ? this.ruleForm.merchantName : ''
      delete kata.merchantName
      delete kata.id
      delete kata.code
      kata.orderId = this.ruleForm.id
      kata.depotScheduleAddress = depotScheduleAddress
      kata.inDepotName = inDepotName
      kata.outDepotName = outDepotName
      kata.inCustomerName = inCustomerName
      return kata
    },
    changePackType() {
      const kk = this.selectOpt.order_torrpacktypeList.find(item => {
        if (this.ruleForm.palletMaterial === item.key) {
          return item
        }
      })
      this.ruleForm.packType = (this.ruleForm.cartons || '') + '箱/' + (this.ruleForm.torrNum || '') + '托' + (kk ? kk.value : '')
    },
    changeInCustomerId() {
      console.log(this.ruleForm.inCustomerId)
      console.log(this.ruleForm.merchantId)
    },
    // 设置默认序号
    setDefaut(index) {
      const array = this.tableData.list.map(item => +item.seq || 0)
      const maxSeq = Math.max(...array)
      if (!this.tableData.list[index].seq) {
        this.tableData.list[index].seq = maxSeq + 1
      }
    }
  }
}
</script>
<style>
.all-order-edit-bx .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 140px;
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
.flex-bw{
  display: flex;
  justify-content: space-between;
}
</style>
