<template>
  <!-- 客户详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <!-- 基本信息 -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <el-row  :gutter="10" class="fs-14 clr-II mr-b-20">
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        客户名称：{{detail.name || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        客户简称：{{detail.simpleName || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        营业执照号：{{detail.creditCode || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        组织机构代码：{{detail.orgCode || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        企业性质：{{detail.nature || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        销售币种：{{detail.currencyLabel || '- -'}}
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
        注册地：{{detail.companyAddr || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        客户等级编码：{{detail.codeGrade || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        客户授权码：{{detail.authNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        主数据ID：{{detail.mainId || '- -'}}
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
        税号：{{detail.taxNo || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        NC平台名称：{{detail.ncPlatformCodeLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        NC渠道名称：{{detail.ncChannelCodeLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        渠道分类：{{detail.channelClassifyLabel || '- -'}}
      </el-col>
    </el-row>
    <!-- 基本信息 end -->
    <!-- 联系方式/关联公司 -->
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
            公司电话：{{detail.oTelNo || '- -'}}
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="外部编码配置" name="3">
        <el-row  :gutter="10" class="fs-14 clr-II">
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            NC平台编码：{{detail.ncPlatformCodeLabel || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            NC渠道编码：{{detail.ncChannelCodeLabel || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            NC渠道编码：{{detail.ncChannelCodeLabel || '- -'}}
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="关联公司" name="4">
        <JFX-table :tableData.sync="relTableData" :tableColumn="relTableColumn" :showPagination="false" />
      </el-tab-pane>
    </el-tabs>
    <!-- 联系方式/关联公司 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
import {
  getCustomerDetail
} from '@a/customerManage'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 面包屑数据
      breadcrumb: [
        {path: '', meta: { title: '客商档案' }},
        {path: '/customer/customerlist', meta: { title: '客户列表' }},
        {path: `/customer/customerdetail?id=${this.$route.query.id}`, meta: { title: '客户详情' }}
      ],
      // 表格列数据
      relTableColumn: [
        { label: '公司编码', prop: 'code', minWidth: '120', align: 'center', hide: true },
        { label: '公司名称', prop: 'name', minWidth: '120', align: 'center', hide: true },
        { label: '结算类型', prop: 'settlementTypeLabel', minWidth: '120', align: 'center', hide: true },
        { label: '账期', prop: 'accountPeriodLabel', minWidth: '120', align: 'center', hide: true },
        { label: '销售价格', prop: 'salePriceManageLabel', minWidth: '120', align: 'center', hide: true },
        { label: '税率', prop: 'rate', minWidth: '120', align: 'center', hide: true },
        { label: '销售模式', prop: 'businessModelLabel', minWidth: '120', align: 'center', hide: true }
      ],
      relTableData: {
        list: []
      },
      // 详情数据
      detail: {},
      // tabs标签索引
      activeName: '1'
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
        const { data: { detail, relList } } = await getCustomerDetail({ id })
        this.detail = detail || {}
        this.relTableData.list = relList || []
      } catch (error) {
        this.$errorMsg(error.message)
      }
    }
  }
}
</script>
