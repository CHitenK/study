<template>
  <div class="page-bx bgc-w">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <!-- 面包屑 end -->
    <div class="mr-t-20" style="width: 100%;">
      <el-steps :active="step" align-center>
        <el-step title="确认交易链路" description="确定交易链路的参与公司及交易数据"></el-step>
        <el-step title="预览交易信息" description="预览各公司的采购、销售单据，确认价格等信息"></el-step>
        <el-step title="生成单据" description="生成各公司的采购、销售单据"></el-step>
      </el-steps>
    </div>
    <step-one v-if="step===0" @setAct="setAct" :targetId="targetId" :tradeLinkId="tradeLinkId"></step-one>
    <step-two v-if="step===1" @setAct="setAct" :tradeLinkId="tradeLinkId" :isContractFrom="isContractFrom" :targetId="targetId"></step-two>
    <step-three v-if="step===2" @setAct="setAct" :tradeLinkId="tradeLinkId" :isContractFrom="isContractFrom"></step-three>
  </div>
</template>
<script>
export default {
  components: {
    stepOne: () => import('./components/stepOne'),
    StepTwo: () => import('./components/stepTwo'),
    stepThree: () => import('./components/stepThree')
  },
  data() {
    return {
      step: 0,
      targetId: '',
      tradeLinkId: '',
      isContractFrom: false
    }
  },
  mounted() {
    const { query } = this.$route
    if (!query.id) return false
    this.targetId = query.id + ''
    if (query.tradeLinkId) this.tradeLinkId = query.tradeLinkId
    // 如果是从合同审核页面跳转 携带step step=1
    if (query.step) {
      this.step = query.step ? +query.step : 0
      this.isContractFrom = true
    }
    // this.$alertError('错误的特斯')
  },
  methods: {
    setAct(data) {
      this.tradeLinkId = data.tradeLinkId
      this.step = data.step
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
