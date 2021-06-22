<template>
  <!-- 供应商详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <el-row  :gutter="10" class="fs-14 clr-II mr-b-20">
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        供应商名称：{{detail.name || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        供应商简称：{{detail.simpleName || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        营业执照号：{{detail.creditCode || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        组织机构代码：{{detail.orgCode || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        客户等级编码：{{detail.codeGrade || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        企业性质：{{detail.nature || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        中文名：{{detail.chinaName || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        英文简称：{{detail.enSimpleName || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        英文名：{{detail.enName || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        主数据ID：{{detail.mainId || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        业务员：{{detail.salesman || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        省市区代码：{{detail.cityCode || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        注册地：{{detail.companyAddr || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        企业地址：{{detail.businessAddress || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        企业英文地址：{{detail.enBusinessAddress || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        采购币种：{{detail.currencyLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        是否内部公司：{{detail.typeLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        内部公司：{{detail.innerMerchantName || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        经营范围：{{detail.operationScope || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        备注：{{detail.remark || '- -'}}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 表格 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="银行信息" name="1">
        <el-row  :gutter="10" class="fs-14 clr-II">
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            开户银行：{{detail.depositBank || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            银行账号：{{detail.bankAccount || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            银行账户：{{detail.beneficiaryName || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            开户行地址：{{detail.bankAddress || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            Swift Code：{{detail.swiftCode || '- -'}}
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="联系方式" name="2">
        <el-row  :gutter="10" class="fs-14 clr-II">
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            法人代表：{{detail.legalPerson || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
           法人国籍：{{detail.legalNationality || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            法人代表身份证：{{detail.legalCardNo || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            法人电话：{{detail.legalTel || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            联系人：{{detail.legalPerson || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            联系电话：{{detail.oTelNo || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            传真：{{detail.fax || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            email：{{detail.email || '- -'}}
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="资质信息" name="3">
        <table class="table-container">
          <tr>
            <td style="width: 20%;">资料名称</td>
            <td style="width: 40%;">资料图片</td>
            <td style="width: 20%;">修改人</td>
            <td style="width: 20%;">修改时间</td>
          </tr>
          <tr>
            <td>营业执照副本</td>
            <td>
              <el-image
                v-if="customerAptitude.charteredNo"
                style="width: 100px; height: 100px"
                :src="customerAptitude.charteredNo"
                :preview-src-list="[customerAptitude.charteredNo]">
              </el-image>
            </td>
            <td>{{customerAptitude.chartModifierName}}</td>
            <td>{{customerAptitude.chartModifyDate}}</td>
          </tr>
          <tr>
            <td>组织机构代码副本</td>
            <td>
              <el-image
                v-if="customerAptitude.organizationCode"
                style="width: 100px; height: 100px"
                :src="customerAptitude.organizationCode"
                :preview-src-list="[customerAptitude.organizationCode]">
              </el-image>
            </td>
            <td>{{customerAptitude.orgModifierName}}</td>
            <td>{{customerAptitude.orgModifyDate}}</td>
          </tr>
          <tr>
            <td>注册登记证</td>
            <td>
              <el-image
                v-if="customerAptitude.registrationNo"
                style="width: 100px; height: 100px"
                :src="customerAptitude.registrationNo"
                :preview-src-list="[customerAptitude.registrationNo]">
              </el-image>
            </td>
            <td>{{customerAptitude.registModifierName}}</td>
            <td>{{customerAptitude.registModifyDate}}</td>
          </tr>
          <tr>
            <td>供货记录</td>
            <td>
              <el-image
                v-if="customerAptitude.supplyRecord"
                style="width: 100px; height: 100px"
                :src="customerAptitude.supplyRecord"
                :preview-src-list="[customerAptitude.supplyRecord]">
              </el-image>
            </td>
            <td>{{customerAptitude.supplyModifierName}}</td>
            <td>{{customerAptitude.supplyModifyDate}}</td>
          </tr>
          <tr>
            <td>证明信息</td>
            <td>
              <el-image
                v-if="customerAptitude.proofInfo"
                style="width: 100px; height: 100px"
                :src="customerAptitude.proofInfo"
                :preview-src-list="[customerAptitude.proofInfo]">
              </el-image>
            </td>
            <td>{{customerAptitude.proofModifierName}}</td>
            <td>{{customerAptitude.proofModifyDate}}</td>
          </tr>
          <tr>
            <td>品牌授权</td>
            <td>
              <el-image
                v-if="customerAptitude.brandAuthorization"
                style="width: 100px; height: 100px"
                :src="customerAptitude.brandAuthorization"
                :preview-src-list="[customerAptitude.brandAuthorization]">
              </el-image>
            </td>
            <td>{{customerAptitude.brandModifierName}}</td>
            <td>{{customerAptitude.brandModifyDate}}</td>
          </tr>
          <tr>
            <td>银行流水</td>
            <td>
              <el-image
                v-if="customerAptitude.bankFlow"
                style="width: 100px; height: 100px"
                :src="customerAptitude.bankFlow"
                :preview-src-list="[customerAptitude.bankFlow]">
              </el-image>
            </td>
            <td>{{customerAptitude.bankModifierName}}</td>
            <td>{{customerAptitude.bankModifyDate}}</td>
          </tr>
          <tr>
            <td>企业备案表</td>
            <td>
              <el-image
                v-if="customerAptitude.keepRecord"
                style="width: 100px; height: 100px"
                :src="customerAptitude.keepRecord"
                :preview-src-list="[customerAptitude.keepRecord]">
              </el-image>
            </td>
            <td>{{customerAptitude.keepModifierName}}</td>
            <td>{{customerAptitude.keepModifyDate}}</td>
          </tr>
          <tr>
            <td>法人身份证</td>
            <td>
              <el-image
                v-if="customerAptitude.legalCardNo"
                style="width: 100px; height: 100px"
                :src="customerAptitude.legalCardNo"
                :preview-src-list="[customerAptitude.legalCardNo]">
              </el-image>
            </td>
            <td>{{customerAptitude.legalModifierName}}</td>
            <td>{{customerAptitude.legalModifyDate}}</td>
          </tr>
        </table>
      </el-tab-pane>
      <el-tab-pane label="关联公司" name="4">
        <JFX-table :tableData.sync="relTableData" :tableColumn="tableColumn" :showPagination="false" />
      </el-tab-pane>
    </el-tabs>
    <!-- 表格 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import {
  getSupplierDetail
} from '@a/customerManage'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 面包屑数据
      breadcrumb: [
        {path: '', meta: { title: '客商档案' }},
        {path: '/customer/supplierlist', meta: { title: '供应商列表' }},
        {path: `/customer/supplierdetail/${this.$route.query.id}`, meta: { title: '供应商详情' }}
      ],
      // 表格列数据
      tableColumn: [
        { label: '公司编码', prop: 'code', minWidth: '120', align: 'center', hide: true },
        { label: '公司名称', prop: 'name', minWidth: '120', align: 'center', hide: true },
        { label: '采购价格管理', prop: 'purchasePriceManageLabel', minWidth: '120', align: 'center', hide: true },
        { label: '税率', prop: 'rate', minWidth: '120', align: 'center', hide: true }
      ],
      // 详情数据
      detail: {},
      // tabs标签页索引
      activeName: '1',
      // 关联公司表格数据
      relTableData: {
        list: []
      },
      aptitudeTableData: {
        list: []
      },
      customerAptitude: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { id } = this.$route.query
      if (!id) return false
      try {
        const { data: { detail, relList, customerAptitude } } = await getSupplierDetail({ id })
        this.detail = detail
        this.relTableData.list = relList
        this.customerAptitude = customerAptitude || {}
      } catch (error) {
        this.$errorMsg(error.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  border: 1px solid #EBEEF5;
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  color: #666;
  font-size: 14px;
  td {
    border-left: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
    height: 34px;
  }
}
</style>
