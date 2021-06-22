<template>
<div class="select-channel">
    <el-select v-model="protocolType" filterable placeholder="请选择渠道" :disabled="!canUse">
      <el-option
        v-for="item in getPfChannel"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>
<script>
// import { User } from '@/api/registration/api'
export default {
  data() {
    return {
      protocolType: +sessionStorage.getItem('CHANNEL_ID') || 36,
      getPfChannel: [],
      canUse: true
    }
  },
  watch: {
    protocolType(newVal, oldval) {
      sessionStorage.setItem('CHANNEL_ID', newVal || 36)
      this.$router.go(0)
    },
    $route(to, from) {
      if (to.path === '/pageManage/buildBlockEdit') {
        this.canUse = false
      } else {
        this.canUse = true
      }
    }
  },
  created() {
    this.getChannel()
  },
  methods: {
    // 获取渠道
    getChannel() {
      const channelOptions = sessionStorage.getItem('channelOptions')
      this.getPfChannel = JSON.parse(channelOptions)
      //   { id: 36, name: '美赞臣' },
      //   { id: 12, name: '红人超市' },
      //   { id: 25, name: '长生态' },
      //   { id: 18, name: '阳光保险' }
      // ]
      // User.getPfChannel().then(res => {
      //   if (res.data.obj) {
      //     this.getPfChannel = res.data.obj
      //   }
      // }).catch(err => {
      //   console.log(err)
      // })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped >
.select-channel{
  display: inline-block;
  float: left;
}
</style>
