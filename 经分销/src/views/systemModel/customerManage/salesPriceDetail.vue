<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :breadcrumb="breadcrumb" showGoback />
    <!-- 面包屑 end -->
    <!-- 客户详情 -->
    <JFX-title title="客户详情" className="mr-t-10" />
    <el-row  :gutter="10" class="fs-14 clr-II mr-b-20">
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        客户名称： 云集
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        客户编号： ERP10155200040
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        主数据客户ID： 1000000690
      </el-col>
    </el-row>
    <!-- 客户详情 end -->
    <!-- 商品详情 -->
    <JFX-title title="商品详情" className="mr-t-10" />
    <el-row  :gutter="10" class="fs-14 clr-II mr-b-20">
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        货号： 8025272631419
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        条形码： 8025272631419
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        品牌： KIKO
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        商品名称： KIKO5系唇膏口红404#
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        规格型号：
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        品类：
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        计量单位：
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        是否组合： 否
      </el-col>
    </el-row>
    <!-- 商品详情 end -->
    <!-- 商品报价记录 -->
    <JFX-title title="商品报价记录" className="mr-t-10" />
    <JFX-table :tableData.sync="tableData" @selection-change="selectionChange" @change="getList" >
      <el-table-column type="index" width="55px" align="center" label="序号" />
      <el-table-column prop="code" align="center" label="生效日期" />
      <el-table-column prop="name" align="center" label="失效日期" />
      <el-table-column prop="name" align="center" label="币种" />
      <el-table-column prop="name" align="center" label="销售价" />
      <el-table-column prop="name" align="center" label="创建日期" />
      <el-table-column prop="name" align="center" label="修改日期" />
    </JFX-table>
    <!-- 商品报价记录 end -->
  </div>
</template>
<script>
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      // 面包屑数据
      breadcrumb: [
        {path: '', meta: { title: '客商档案' }},
        {path: '/customer/salespricelist', meta: { title: '销售价格管理' }},
        {path: `/customer/salespriceedit/${this.$route.params.id}`, meta: { title: '销售价格管理详情' }}
      ],
      tableData: {
        list: [],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  }
}
</script>
