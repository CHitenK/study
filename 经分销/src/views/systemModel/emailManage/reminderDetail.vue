<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <!-- title -->
    <JFX-title title="邮件提醒信息" className="mr-t-10" />
    <!-- title end -->
    <el-row  :gutter="10" class="fs-12 clr-II detail-row">
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        公司：{{detail.merchantName || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        供应商：{{detail.customerName || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        提醒类型：{{detail.reminderTypeLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        基准时间：{{detail.baseTimeTypeLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        付款账期：{{detail.accountPeriodDay || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        账期单位：{{detail.accountUnitTypeLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        提前天数提醒：{{detail.advanceReminderDay || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        提醒单位：{{detail.reminderUnitTypeLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        状态：{{detail.statusLabel || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        创建时间：{{detail.createDate || '- -'}}
      </el-col>
      <el-col  class="mr-b-15" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" >
        修改时间：{{detail.modifyDate || '- -'}}
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { emailDetail } from '@a/emailManage/index'
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
      try {
        const res = await emailDetail({ id: query.id })
        this.detail = Object.assign({}, res.data.detail, res.data)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
