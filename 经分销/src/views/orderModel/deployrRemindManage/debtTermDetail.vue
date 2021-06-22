<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="基本信息" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II  detail-row">
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        公司：{{detail.merchantName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        事业部：{{detail.buName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        提醒类型：{{detail.reminderTypeLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        客商名称：{{detail.customerName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        基准日期：{{detail.baseDateLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建人：{{detail.createName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建时间：{{detail.createDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        审核人：{{detail.auditName || '- -'}}
      </el-col>
      <el-col  class="mr-b-10" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        审核时间：{{detail.auditDate || '- -'}}
      </el-col>
    </el-row>
    <div style="width: 50vw;min-width: 400px" class="mr-t-15">
      <!-- 表格 -->
      <JFX-table
        :tableData="{ list: detail.itemList }"
        :showPagination="false"
      >
       <el-table-column align="center" min-width="120">
          <template slot="header">
            <span >计划提醒节点</span>
          </template>
          <template slot-scope="scope">{{scope.row.nodeLabel}}</template>
       </el-table-column>
        <el-table-column align="center" min-width="120">
          <template slot="header">
            <span >计划节点时效</span>
          </template>
          <template slot-scope="scope">
            {{scope.row.nodeEffective}}
          </template>
       </el-table-column>
       <el-table-column prop="contNo" label="箱号" align="center" min-width="120">
          <template slot="header">
            <span >基准单位</span>
          </template>
          <template slot-scope="scope">
            {{scope.row.benchmarkUnit === '1' ? '工作日' : ''}}
            {{scope.row.benchmarkUnit === '2' ? '自然日' : ''}}
            <!-- <el-radio v-model="scope.row.benchmarkUnit" label="1" disabled>工作日</el-radio>
            <el-radio v-model="scope.row.benchmarkUnit" label="2" disabled>自然日</el-radio> -->
          </template>
       </el-table-column>
      </JFX-table>
      <!-- 表格 end-->
    </div>
  </div>
</template>
<script>
import { getAccountingReminderConfig } from '@a/deployrRemindManage/index'
export default {
  data() {
    return {
      detail: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { query } = this.$route
      if (!query.id) return false
      const res = await getAccountingReminderConfig({ id: query.id })
      this.detail = res.data
    }
  }
}
</script>
