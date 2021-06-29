<template>
  <div class="app-wrapper">
    <div class="main-container">
      <app-main/>
      <bottom-tabs />
    </div>
  </div>
</template>
<script>
import AppMain from './components/AppMain.vue'
import BottomTabs from './components/BottomTabs.vue'

export default {
  name: 'baseLayout',
  components: {
    AppMain, BottomTabs
  },
  props: {},
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
  .app-wrapper, .main-container {
    height: 100%;
  }

  .app-main {
    height: calc(100% - 98px);
    overflow: auto;
  }

  .bottom-tabs {
    height: 97px;
    border-top: 1Px solid $lineColor;
  }
</style>
