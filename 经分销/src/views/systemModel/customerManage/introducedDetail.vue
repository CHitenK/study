<template>
  <!-- 待引入客商列表详情页面 -->
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-14 clr-II mr-b-20">
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        客商名称： {{detail.cname || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        客商简称： {{detail.cshortname || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        主数据客户ID： {{detail.ccode || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        组织机构代码： {{detail.ccodethk || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        营业执照号： {{detail.busilicenseno || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        客户等级编码： {{detail.ccodegrade || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        英文名： {{detail.cnameen || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        英文简称： {{detail.cshortnameen || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        企业性质： {{detail.cmprop || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        注册地： {{detail.registeredaddr || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        省市区代码： {{detail.citycode || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        企业地址： {{detail.addr || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        企业英文地址： {{detail.addren || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        备注： {{detail.remark || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        经营范围： {{detail.businessscope || '- -'}}
      </el-col>
    </el-row>
    <el-tabs v-model="activeName">
      <el-tab-pane label="银行信息" name="1">
        <el-row  :gutter="10" class="fs-14 clr-II">
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            开户银行： {{detail.depositbank || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            美元账号： {{detail.usdaccount || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            人民币账号： {{detail.cnyaccount || '- -'}}
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="联系方式" name="2">
        <el-row  :gutter="10" class="fs-14 clr-II">
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            法人代表： {{detail.lgrepresentative || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            法人国籍： {{detail.lgrncode || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            法人代表身份证： {{detail.lgrid || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            法人电话： {{detail.lgrtel || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            联系人： {{detail.linkman || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            联系电话： {{detail.linktel || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            传真： {{detail.fax || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            Email： {{detail.email || '- -'}}
          </el-col>
          <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            公司电话： {{detail.otelno || '- -'}}
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getCustomerMainDetail } from '@a/customerManage/index'
export default {
  data() {
    return {
      // 详情数据
      detail: {},
      // 面包屑数据
      breadcrumb: [
        {path: '', meta: { title: '客商档案' }},
        {path: '/customer/introducedlist', meta: { title: '供应商列表' }},
        {path: `/customer/introduceddetail/${this.$route.query.id}`, meta: { title: '客商详情' }}
      ],
      activeName: '1'
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取详情数据
    async getList() {
      const { id } = this.$route.query
      if (!id) return false
      const { data } = await getCustomerMainDetail({ id })
      this.detail = data
    }
  }
}
</script>
