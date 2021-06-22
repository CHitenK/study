<template>
  <div class="page-bx bgc-w order-edit-bx">
    <!-- 面包屑 -->
    <JFX-Breadcrumb :showGoback="true" />
    <div class="mr-t-20 previe-bx" v-html="content"></div>
  </div>
</template>
<script>
import { getDetailsById } from '@a/templateManage/index'
import commomMix from '@m/index'
export default {
  mixins: [commomMix],
  data() {
    return {
      content: ''
    }
	},
	mounted() {
		this.getDetail()
	},
  methods: {
    async getDetail() {
      const { query } = this.$route
      if (!query.id) return false
      const res = await getDetailsById({ id: query.id })
      this.content = res.data.contentBody
    }
  }
}
</script>
<style lang="scss" scoped>
.previe-bx{
  width: 60%;
}
</style>
