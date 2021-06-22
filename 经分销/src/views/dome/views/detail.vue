<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" :breadcrumb="breadcrumb" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="理货单据详情" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-14 clr-II">
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        理货单据状态： 已确认
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        理货单号: 4234
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        仓库名称： 卓志南沙保税仓
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        事业部： 元森泰事业部E
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        理货时间： 2020-11-09 17:25:13
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        确认时间： 2020-12-14 16:36:29
      </el-col>
    </el-row>
    <!-- title -->
    <JFX-title title="基本信息" className="mr-t-20" />
    <el-row  :gutter="10" class="fs-14 clr-II">
      <el-col class="mr-b-15" :xs="24" :sm="12" :md="24" :lg="24" :xl="24" >
        采购退货订单号： CGTH00010000140
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        理货单号: 4234
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        供应商： Kimberly-Clark North Asia (HK) Limited
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        事业部： 元森泰事业部E
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        理货时间： 2020-11-09 17:25:13
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        确认时间： 2020-12-14 16:36:29
      </el-col>
    </el-row>
    <!-- title end -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      breadcrumb: [{
        path: '/index', meta: { title: '首页' }
      },
      {
        path: '/content/dome', meta: { title: '列表' }
      },
      {
        path: '/content/detail', meta: { title: '详情' }
      }]
    }
  }
}
</script>
