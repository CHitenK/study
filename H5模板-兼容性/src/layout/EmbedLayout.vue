<template>
  <div class="app-wrapper">
    <div class="main-container">
      <app-main/>
    </div>
  </div>
</template>
<script>
import AppMain from './components/AppMain.vue'

export default {
  name: 'baseLayout',
  components: {
    AppMain
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
  .app-wrapper, .main-container, .app-main {
    height: 100%;
  }
</style>
