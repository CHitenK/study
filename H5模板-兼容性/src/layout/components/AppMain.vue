<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
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
  // .fade-enter-active, .fade-leave-active {
  //   position: absolute;
  //   z-index: 1;
  //   transition: all .15s;
  // }

  // .fade-enter {
  //   opacity: 0;
  // }

  // .fade-leave-to {
  //   opacity: 0;
  // }
</style>
