<template>
    <div class="page-bx bgc-w edit-bx yushen-edit-bx">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" >
        <!-- 面包屑 -->
       <JFX-Breadcrumb :showGoback="!showBackbtn" :breadcrumb="breadcrumb" />
        <!-- 面包屑 end -->
        <!-- title -->
        <JFX-title title="基本信息" className="mr-t-10 bor-n" />
        <el-row  :gutter="10" class="fs-12 clr-II edit-row-bor">
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="预申报单号：" prop="code" >
              <el-input v-model.trim="ruleForm.code" disabled :title="ruleForm.code" style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="供应商：" prop="supplierName" >
              <el-input v-model.trim="ruleForm.supplierName" disabled style="width: 100%" :title="ruleForm.supplierName"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="业务模式：" prop="businessModel" >
              <el-select v-model="ruleForm.businessModel" style="width: 100%" placeholder="请选择"  clearable >
                <el-option label="购销" :value="'1'"></el-option>
                <el-option label="代销" :value="'2'"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="入仓仓库：" prop="depotId" >
              <el-select v-model="ruleForm.depotId" disabled style="width: 100%" placeholder="请选择" filterable clearable :data-list="getSelectBeanByMerchantRel('cangkuList')" >
                <el-option v-for="item in selectOpt.cangkuList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="事业部：" prop="buId" >
              <el-select v-model="ruleForm.buId" disabled style="width: 100%" placeholder="请选择" clearable :data-list="getBUSelectBean('buList')" >
                <el-option v-for="item in selectOpt.buList" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="PO号：" prop="poNo" >
              <el-input v-model.trim="ruleForm.poNo" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" v-if="ruleForm.depotId" >
            <el-form-item label="入库关区：" prop="inCustomsId" >
              <el-select v-model="ruleForm.inCustomsId" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getSelectCustomsArea('guanList', { depotId: ruleForm.depotId})" >
                <el-option v-for="item in selectOpt.guanList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" v-if="detail.depotType === 'c'" >
            <el-form-item label="海外仓理货单位：" prop="tallyingUnit" >
              <el-select v-model="ruleForm.tallyingUnit" style="width: 100%" placeholder="请选择" clearable >
                <el-option label="托盘" value="00"></el-option>
                <el-option label="箱" value="01"></el-option>
                <el-option label="件" value="02"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="LBX单号：" prop="lbxNo" >
              <el-input v-model.trim="ruleForm.lbxNo" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <JFX-title title="申报信息" className="mr-t-20 bor-n" />
        <el-row  :gutter="10" class="fs-12 clr-II edit-row-bor">
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="头程提单号：" prop="ladingBill" >
              <el-input v-model.trim="ruleForm.ladingBill" clearable style="width: 100%"></el-input>
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
            <el-form-item label="箱数：" prop="boxNum" >
              <el-input-number v-model.trim="ruleForm.boxNum" :precision="0" :controls="false" :min="0" style="width: 100%;" @change="changePackType"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="托数：" prop="torrNum" >
              <el-input-number v-model.trim="ruleForm.torrNum" :precision="0" :controls="false" :min="0" style="width: 100%;" @change="changePackType"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="托盘材质：" prop="palletMaterial" >
              <el-select v-model="ruleForm.palletMaterial" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getSelectList('order_torrpacktypeList')" @change="changePackType" >
                <el-option v-for="item in selectOpt.order_torrpacktypeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="包装方式：" prop="packType" >
              <el-input v-model.trim="ruleForm.packType" clearable style="width: 100%" placeholder="XX箱/xx托XXX"></el-input>
              <!-- <el-select v-model="ruleForm.packType" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getPackTypeSelectBean('packTypeList')" >
                <el-option v-for="item in selectOpt.packTypeList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
          <!-- <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="销售渠道：" prop="channel" >
              <el-input v-model.trim="ruleForm.channel" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="装货港：" prop="portLoading" >
              <el-input v-model.trim="ruleForm.portLoading" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="卸货港：" prop="portDestNo" >
              <el-select v-model="ruleForm.portDestNo" style="width: 100%" placeholder="请选择" filterable clearable >
                <el-option v-for="item in unloadPortList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="装船时间：" prop="shipDateStr" >
              <el-date-picker
                v-model="ruleForm.shipDateStr"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="提单毛重（Kg）：" prop="billWeight" >
              <JFX-Input v-model.trim="ruleForm.billWeight" :min="0" :precision="5" placeholder="请输入" clearable @change="countWeight" />
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="付款条约：" prop="payRules" >
              <el-input v-model.trim="ruleForm.payRules" clearable style="width: 100%"></el-input>
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
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="收货地点：" prop="deliveryAddr" >
              <el-input v-model.trim="ruleForm.deliveryAddr" clearable style="width: 100%"></el-input>
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
            <el-form-item label="运输方式：" prop="transport" >
              <el-select v-model="ruleForm.transport" style="width: 100%" placeholder="请选择" filterable clearable :data-list="getSelectList('transportList')" >
                <el-option v-for="item in selectOpt.transportList"  :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="目的港名称：" prop="destinationPortName" >
              <el-input v-model.trim="ruleForm.destinationPortName" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="预计到港时间：" prop="arriveDate2" >
              <el-date-picker
                v-model="ruleForm.arriveDate2"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="目的地名称：" prop="destinationName" >
              <el-input v-model.trim="ruleForm.destinationName" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="mr-b-0" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" >
            <el-form-item label="备注：" prop="remark" >
              <el-input v-model.trim="ruleForm.remark" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <JFX-title title="商品信息" className="mr-t-10 title-bx">
          <div>
            <el-button type="primary" :size="'small'"  @click="openChoseProducts" id='pur_chose_product' >选择商品</el-button>
            <el-button type="primary" :size="'small'"  @click="impGoods" id="pur_product_in">商品导入</el-button>
            <el-button type="primary" :size="'small'"  @click="imDetail" id="pur_product_in">导入箱装明细</el-button>
            <el-button type="primary" :size="'small'"  @click="dele" id="pur_product_de" >删除</el-button>
          </div>
        </JFX-title>
        <div class="mr-t-20"></div>
        <!-- 表格 -->
        <JFX-table
          :tableData.sync="tableData"
          @selection-change="selectionChange"
          :showPagination="false"
        >
          <el-table-column type="selection" width="50" align="center" fixed="left"> </el-table-column>
           <el-table-column prop="seq" label="序号" align="center" min-width="80">
            <template slot-scope="scope">
              <el-input-number v-model.trim="scope.row.seq" clearable :precision="0" :controls="false" :min="0" style="width: 100%;"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="contractNo" label="合同号" align="center" min-width="120" fixed="left">
            <template slot-scope="scope">
              <el-input v-model.trim="scope.row.contractNo" style="width: 100%;"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="goodsCode" label="商品编码" align="center" min-width="140" fixed="left"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goodsNo" label="商品货号" align="center" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" min-width="100">
            <template slot="header">
              <span class="need">申报数量</span>
            </template>
            <template slot-scope="scope">
              <el-input-number v-model.trim="scope.row.num" :precision="0" :controls="false" :min="0" style="width: 100%;" @blur="count('num', scope.$index)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="purchasePrice" label="采购单价" align="center" min-width="100"></el-table-column>
          <el-table-column align="center" min-width="130">
            <template slot="header">
              <span class="need">申报单价</span>
            </template>
            <template slot-scope="scope">
              <el-input-number v-model.trim="scope.row.price" :precision="8" v-max-spot="8" :controls="false" :min="0" label="必填" style="width: 100%;" @blur="count('price', scope.$index)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="申报总金额（RMB）" align="center" min-width="150">
            <template slot-scope="scope">
              <el-input-number v-model.trim="scope.row.goodsAmount" :precision="2" v-max-spot="2" :controls="false" :min="0" label="必填" style="width: 100%;" @blur="count('goodsAmount', scope.$index)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="brandName" align="center" min-width="130">
            <template slot="header">
              <span>品牌类型</span>
            </template>
            <template slot-scope="scope">
              <el-input v-model="scope.row.brandName" clearable style="width: 100%"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100">
            <template slot="header">
              <span class="need">毛重(kg)</span>
            </template>
            <template slot-scope="scope">
              <JFX-Input v-model.trim="scope.row.grossWeightSum" :min="0" :precision="5" placeholder="请输入" style="width: 100%;"  @change="countSumWeight" />
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100">
            <template slot="header">
              <span class="need">净重(kg)</span>
            </template>
            <template slot-scope="scope">
              <JFX-Input v-model.trim="scope.row.netWeightSum" :min="0" :precision="5" placeholder="请输入" style="width: 100%;" />
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="90">
            <template slot="header">
              <span>箱数</span>
            </template>
            <template slot-scope="scope">
              <el-input-number v-model.trim="scope.row.cartons" :precision="0" :controls="false" :min="0" style="width: 100%;"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="箱号" align="center" min-width="140">
            <template slot-scope="scope">
              <el-input v-model="scope.row.boxNo" style="width: 100%"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="托盘号" align="center" min-width="140">
            <template slot-scope="scope">
              <el-input v-model="scope.row.palletNo" clearable style="width: 100%"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="生产批次号" align="center" min-width="140">
            <template slot-scope="scope">
              <el-input v-model="scope.row.batchNo" clearable style="width: 100%"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="130">
            <template slot="header">
              <span>成分占比</span>
            </template>
            <template slot-scope="scope">
              <el-input type="textarea" :rows="2" v-model.trim="scope.row.constituentRatio" :precision="2" :controls="false" :min="0" style="width: 100%;"></el-input>
            </template>
          </el-table-column>
        </JFX-table>
        <div class="flex-c-c fs-16 clr-II">
          <span class="tongji-item">总申报数量：{{totalNum}}</span>
          <span class="tongji-item">总金额(RMB)：{{totalAmount}}</span>
          <span class="tongji-item">总毛重：{{totalGrossWeight}}</span>
          <span class="tongji-item">总净重：{{totalNetWeight}}</span>
        </div>
        <!-- 表格 end-->
      </el-form>
      <div class="mr-t-30 flex-c-c">
        <el-button type="primary" @click="saveForm" id="pur_save_btn" :loading="saveLoading">保 存</el-button>
        <el-button id="pur_cancle_btn" @click="closeTag" v-if="!showBackbtn">取 消</el-button>
      </div>
      <!-- 选择商品 -->
      <chose-products v-if="visible.show" :visible="visible" @comfirm="comfirm" :filterData="filterData"></chose-products>
      <!-- 选择商品 end -->
      <!-- 导入 -->
      <div>
        <JFX-Dialog
        :visible.sync="dialogVisible"
        :showClose="true"
        @comfirm="dialogVisible.show = false"
        :width="'860px'"
        :title="title"
        :top="'3vh'"
        closeBtnText="取 消"
        confirmBtnText="确 认"
        >
        <div class="import-bx">
          <!-- 商品导入 -->
          <importfile v-if="selfDown" @downup="downup" :url="importGoodsUrl"  :filterData="filterData1" :selfDown="selfDown" :templateId="'2333'" @successUpload="successUpload"></importfile>
          <!-- 导入装箱明细资料 -->
          <importfile v-else :url="importPackingDetailsUrl" :filterData="{ declareOrderId: detail.id }" :selfDown="selfDown" :templateId="157"></importfile>
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
import { getDeclareDetail, exportGoodsUrl, importGoodsUrl, modifyDeclare, importPackingDetailsUrl } from '@a/purchaseManage/index'
import { getBaseUrl, debounce } from '@u/tool'
export default {
  mixins: [commomMix],
  components: {
    choseProducts,
    importfile: () => import('@/components/importfile/index')
  },
  data() {
    return {
      breadcrumb: [{
        path: '', meta: { title: '采购管理' }
      },
      {
        path: '', meta: { title: '编辑预申报单' }
      }],
      ruleForm: {
        id: '',
        status: '',
        code: '',
        supplierName: '',
        supplierId: '',
        ladingBill: '',
        invoiceNo: '',
        contractNo: '',
        // channel: '',
        poNo: '',
        transport: '',
        depotId: '',
        buId: '',
        deliveryAddr: '',
        boxNum: '',
        billWeight: '',
        destinationPortName: '',
        paySubject: '',
        portLoading: '',
        portDestNo: '',
        lbxNo: '',
        packType: '',
        payRules: '',
        blNo: '',
        // email: '',
        imExpPort: '',
        shipper: '',
        mark: '',
        destinationName: '',
        remark: '',
        arriveDate2: '',
        businessModel: 1,
        tallyingUnit: '',
        palletMaterial: '',
        torrNum: '',
        inCustomsId: '',
        shipDateStr: ''
      },
      rules: {
        code: {required: true, message: '请输入预申报单号', trigger: 'blur'},
        supplierName: {required: true, message: '请输入供应商', trigger: 'blur'},
        ladingBill: {required: true, message: '请输入头程提单号', trigger: 'blur'},
        contractNo: {required: true, message: '请输入合同号', trigger: 'blur'},
        poNo: {required: true, message: '请输入po号', trigger: 'blur'},
        depotId: {required: true, message: '入仓仓库不能为空', trigger: 'change'},
        buId: {required: true, message: '事业部不能为空', trigger: 'change'},
        invoiceNo: {required: false, message: '发票号不能为空', trigger: 'blur'},
        deliveryAddr: {required: false, message: '收货地点不能为空', trigger: 'blur'},
        boxNum: {required: false, message: '箱数不能为空', trigger: 'blur'},
        portLoading: {required: true, message: '装货港不能为空', trigger: 'blur'},
        packType: {required: false, message: '包装方式不能为空', trigger: 'change'},
        payRules: {required: false, message: '付款条约不能为空', trigger: 'blur'},
        portDestNo: {required: false, message: '卸货港不能为空', trigger: 'change'},
        shipper: {required: false, message: '境外发货人不能为空', trigger: 'blur'},
        mark: {required: true, message: '唛头不能为空', trigger: 'blur'},
        tallyingUnit: {required: true, message: '海外仓理货单位不能为空', trigger: 'change'},
        palletMaterial: {required: true, message: '托盘材质不能为空', trigger: 'change'},
        shipDateStr: {required: true, message: '装船时间不能为空', trigger: 'change'},
        torrNum: {required: true, message: '托数不能为空', trigger: 'blur'}
      },
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10000,
        total: 10001
      },
      visible: { show: false },
      date: '',
      num: '',
      detail: {},
      unloadPortList: [
        {value: '44011501：南沙新港口岸', key: '44011501'},
        {value: '44010318：黄埔广保通码头口岸', key: '44010318'},
        {value: '21021001：大连保税区口岸', key: '21021001'},
        {value: '50010001：重庆口岸', key: '50010001'}
      ],
      flag: '',
      filterData: {},
      filterData1: {},
      dialogVisible: { show: false },
      actionUrl: '',
      downVal: '',
      importGoodsUrl: importGoodsUrl,
      importPackingDetailsUrl: importPackingDetailsUrl,
      saveLoading: false,
      showBackbtn: false,
      selfDown: false,
      title: '商品导入',
      totalNum: '',
      totalAmount: '',
      totalGrossWeight: '',
      totalNetWeight: ''
    }
  },
  watch: {
    flag(val) {
      this.rules.invoiceNo.required = val === '1'
      this.rules.ladingBill.required = val === '1'
      this.rules.deliveryAddr.required = val === '1'
      this.rules.boxNum.required = val === '1'
      // this.rules.portLoading.required = val === '1'
      this.rules.packType.required = val === '1'
      this.rules.payRules.required = val === '1'
      this.rules.portDestNo.required = val === '1'
      this.rules.shipper.required = val === '1'
      this.rules.mark.required = val === '1'
    },
    'tableData.list': {
      handler: debounce(function() {
        this.countTotal() // 计算总数
      }, 1200),
      deep: true
    }
  },
  mounted() {
    const { other } = this.$route.query
    this.showBackbtn = other === 'gh'
    this.init()
  },
  methods: {
    comfirm(data) {
      if (data && data.length > 0) {
        let maxSeq = this.tableData.list.length
        data.forEach(item => {
          maxSeq++
          const init = { constituentRatio: '', batchNo: '', boxNo: '', price: '', cartons: '', goodsAmount: '', num: 1, contractNo: '', seq: maxSeq, palletNo: '' }
          const { id, netWeight, grossWeight, brandName, goodsCode, name, goodsNo, purchasePrice = '', cartons = '', palletNo = '', supplyMinPrice = '', component = '', filingPrice = '', priceDeclareRatio, netWeightSum, grossWeightSum } = item
          this.tableData.list.push({
            ...init,
            id,
            netWeight,
            grossWeight,
            brandName,
            goodsCode,
            name,
            goodsNo,
            goodsId: id,
            goodsName: name,
            grossWeightSum: grossWeightSum || grossWeight || 0,
            netWeightSum: netWeightSum || netWeight || 0,
            purchasePrice,
            cartons,
            palletNo,
            constituentRatio: component,
            price: priceDeclareRatio ? supplyMinPrice : filingPrice
          })
        })
        this.$nextTick(() => {
          this.countSumWeight()
          this.tableData.list.map((item, index) => this.count('price', index))
        })
      }
      this.visible.show = false
    },
    async init() {
      const { query } = this.$route
      if (!query.id) return false
      try {
        const res = await getDeclareDetail({ id: query.id })
        const targetData = res.data || {}
        this.detail = targetData
        this.tableData.list = targetData.itemList || []
        this.tableData.list.map((item, index) => this.count('price', index))
        for (let key in this.ruleForm) {
          this.ruleForm[key] = targetData[key] || ''
        }
        this.flag = res.data.depotType === 'a' ? '1' : '' // 仓库类型
        // 转字符串
        this.ruleForm.transport = this.ruleForm.transport + ''
        this.ruleForm.buId = this.ruleForm.buId + ''
        this.ruleForm.depotId = this.ruleForm.depotId + ''
        this.ruleForm.inCustomsId = this.ruleForm.inCustomsId + ''
        this.ruleForm.shipDateStr = this.detail.shipDate ? this.detail.shipDate.substring(0, 10) : ''
        this.ruleForm.packType = (this.ruleForm.boxNum || '') + '箱/' + (this.ruleForm.torrNum || '') + '托'
        this.filterData = {
          code: this.detail.code
        }
        this.filterData1 = {
          orderId: this.detail.id
        }
      } catch (err) {
        console.log(err)
      }
    },
    openChoseProducts() {
      let unNeedIds = []
      if (this.tableData.list && this.tableData.list.length > 0) {
        this.tableData.list.map(item => {
          if (item.goodsId) return unNeedIds.push(item.goodsId.toString())
        })
      }
      unNeedIds = unNeedIds.map(item => item).toString()
      this.filterData = {
        depotId: this.detail.depotId,
        popupType: 1,
        unNeedIds,
        needIds: this.detail.needsId
      }
      this.visible.show = true
    },
    dele() {
      if (this.tableChoseList.length < 1) {
        this.$errorMsg('至少选择一条记录！')
        return false
      }
      const arr = this.tableChoseList.map(item => item.id)
      const list = []
      this.tableData.list.map((item, index) => {
        if (!arr.includes(item.id)) {
          list.push(item)
        }
      })
      this.tableData.list = list
    },
    count(type, index) {
      const data = this.tableData.list[index]
      let { num, price = 0, goodsAmount, netWeight, grossWeight, grossWeightSum, netWeightSum } = data
      if (type === 'num' || type === 'price') {
        goodsAmount = num * price
        goodsAmount = goodsAmount.toFixed(3)
      } else {
        price = goodsAmount / num
        price = price.toFixed(9)
      }
      if (type === 'num') {
        num = num || 0
        grossWeight = grossWeight || 0
        netWeight = netWeight || 0
        grossWeightSum = (num * grossWeight).toFixed(5)
        netWeightSum = (num * netWeight).toFixed(5)
      }
      this.tableData.list.splice(index, 1, { ...data, goodsAmount, num, price, netWeightSum, grossWeightSum })
      this.countSumWeight()
    },
    // 保存数据
    saveForm() {
      // 临时的保证隐藏tag, 跟菜单栏
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          if (!this.checkTableData()) return false
          this.saveLoading = true
          const items = this.tableData.list.map(item => {
            const { contractNo = '', seq, goodsId, num, goodsAmount, price, boxNo = '', cartons = '', palletNo = '', constituentRatio = '', brandName = '', grossWeightSum, grossWeight, netWeight, netWeightSum, purchasePrice, batchNo = '' } = item
            return {
              contractNo: contractNo || '',
              seq: seq ? seq.toString() : '',
              goodsId: goodsId.toString(),
              num: num.toString(),
              amount: goodsAmount.toString(),
              price: price.toString(),
              boxNo: boxNo || '',
              cartons: cartons || '',
              palletNo: palletNo || '',
              constituentRatio: constituentRatio || '',
              brandName: brandName || '',
              grossWeightSum: grossWeightSum.toString(),
              grossWeight: grossWeight.toString(),
              netWeight: netWeight.toString(),
              netWeightSum: netWeightSum.toString(),
              purchasePrice: purchasePrice ? purchasePrice.toString() : '',
              batchNo: batchNo || ''
            }
          })
          const kk = this.tableData.list.some(item => !item.seq)
          const cm = this.ruleForm
          delete cm.code
          delete cm.supplierName
          delete cm.buId
          const opt = {
            ...this.ruleForm,
            items
          }
          if (kk) {
            this.$confirm('存在排序序号为空的商品，是否按现有排序提交?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async() => {
              try {
                await modifyDeclare(opt)
                this.$successMsg('保存成功!')
                this.closeTag()
              } catch (err) {
                console.log(err)
              }
              this.saveLoading = false
            })
          } else {
            try {
              await modifyDeclare(opt)
              this.$successMsg('保存成功!')
              this.closeTag()
            } catch (err) {
              console.log(err)
            }
          }
          this.saveLoading = false
        } else {
          this.$errorMsg('请先完善信息')
        }
      })
    },
    // 下载商品模板
    async downup() {
      const itemList = []
      this.tableData.list.map(item => {
        const opt = {
          seq: item.seq,
          goodsId: item.goodsId,
          num: item.num,
          brandName: item.brandName,
          amount: item.goodsAmount,
          price: item.price,
          purchasePrice: item.purchasePrice,
          grossWeightSum: item.grossWeightSum,
          netWeightSum: item.netWeightSum,
          cartons: item.cartons,
          palletNo: item.palletNo
        }
        itemList.push(opt)
      })
      this.actionUrl = getBaseUrl(exportGoodsUrl) + exportGoodsUrl + `?token=${sessionStorage.getItem('token')}`
      this.downVal = JSON.stringify(itemList)
      this.$nextTick(() => {
        const form = document.getElementById('down-up')
        form.submit()
        this.downVal = ''
      })
    },
    checkTableData() {
      let flag = true
      for (let i = 0; i < this.tableData.list.length; i++) {
        const { num, price, grossWeightSum, netWeightSum, brandName } = this.tableData.list[i]
        const rowTips = '表格第' + (i + 1) + '行,'
        if (!num || num <= 0) {
          this.$errorMsg(rowTips + '申报数量必填且不能小于0')
          flag = false
          break
        }
        if (!price || price <= 0) {
          this.$errorMsg(rowTips + '申报单价必填且不能小于0')
          flag = false
          break
        }
        if (!grossWeightSum || grossWeightSum <= 0) {
          this.$errorMsg(rowTips + '毛重必填且不能小于0')
          flag = false
          break
        }
        if (!brandName) {
          this.$errorMsg(rowTips + '品牌类型不能为空')
          flag = false
          break
        }
        if (!netWeightSum || netWeightSum <= 0) {
          this.$errorMsg(rowTips + '净重必填且不能小于0')
          flag = false
          break
        }
        if (Number(grossWeightSum) < Number(netWeightSum)) {
          this.$errorMsg(rowTips + '毛重不能小于净重')
          flag = false
          break
        }
      }
      if (Number(this.totalGrossWeight) !== Number(this.ruleForm.billWeight)) {
        this.$errorMsg('总毛重必须等于总毛重')
        flag = false
      }
      return flag
    },
    openLay() {
      this.dialogVisible.show = false
    },
    // 商品导入成功
    successUpload(res) {
      if (res.data.itemList && res.data.itemList.length > 0) {
        this.tableData.list = []
        let maxSeq = this.tableData.list.length
        const data = res.data.itemList || []
        data.forEach(item => {
          maxSeq++
          // const init = { constituentRatio: '', batchNo: '', boxNo: '', cartons: '', contractNo: '', palletNo: '' }
          const { id, netWeightSum, netWeight, grossWeight, grossWeightSum, brandName, goodsCode, name, goodsNo, purchasePrice = '', cartons = '', palletNo = '', goodsId = '', goodsName, seq = maxSeq, num = 0, price = '', amount = '' } = item
          this.tableData.list.push({
            ...item,
            id,
            netWeight,
            grossWeight,
            brandName,
            goodsCode,
            name,
            goodsNo,
            goodsId,
            goodsName,
            grossWeightSum,
            netWeightSum,
            purchasePrice,
            cartons,
            palletNo,
            seq,
            num: num || 1,
            price: price,
            goodsAmount: amount
          })
        })
        this.$nextTick(() => {
          this.countSumWeight()
          this.tableData.list.map((item, index) => this.count('price', index))
        })
      }
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
      this.countTotal()
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
    changePackType() {
      const kk = this.selectOpt.order_torrpacktypeList.find(item => {
        if (this.ruleForm.palletMaterial === item.key) {
          return item
        }
      })
      this.ruleForm.packType = (this.ruleForm.boxNum || '') + '箱/' + (this.ruleForm.torrNum || '') + '托' + (kk ? kk.value : '')
    },
    // 打开商品导入
    impGoods() {
      this.title = '商品导入'
      this.selfDown = true
      this.dialogVisible.show = true
    },
    imDetail() {
      this.title = '导入箱装明细'
      this.selfDown = false
      this.dialogVisible.show = true
    },
    // 计算总数
    countTotal() {
      let totalNum = 0
      let totalAmount = 0
      let totalGrossWeight = 0
      let totalNetWeight = 0
      this.tableData.list.forEach(item => {
        const { num, goodsAmount, grossWeightSum, netWeightSum } = item
        totalNum = totalNum + (+num || 0)
        totalAmount = totalAmount + (+goodsAmount || 0)
        totalGrossWeight = totalGrossWeight + (+grossWeightSum || 0)
        totalNetWeight = totalNetWeight + (+netWeightSum || 0)
      })
      this.totalNum = totalNum
      this.totalGrossWeight = totalGrossWeight.toFixed(5)
      this.totalNetWeight = totalNetWeight.toFixed(5)
      this.totalAmount = totalAmount.toFixed(2)
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
</style>
