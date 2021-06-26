<template>
  <div class="v-no-data" v-show="loading||show">
    <div class="no-data-container"
         v-loading="loading"
         :element-loading-text="loadMessage"
         element-loading-background="transparent">
      <p v-show="!loading" class="no-message"> {{noMessage}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  components: {},
  props: {
    show: {
      type: Boolean,
      default: true
    },
    loading: { // 控制loading
      type: Boolean,
      default: true
    },
    loadMessage: {
      type: String,
      default: '拼命加载中...'
    },
    noMessage: {
      type: String,
      default: '暂无数据'
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() {

  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .no-data-container {
    min-height: 200px;
    text-align: center;
    background-color: #fff;
    position: relative;
  }

  .no-message {
    font-size: 14px;
    color: rgba(0, 0, 0, .6);
    line-height: 200px;
  }
</style>
