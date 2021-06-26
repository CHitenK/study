<template>
  <div class="bottom-tabs">
    <router-link v-for="(item,index) in routesArr" :key="index" :to="`/${item.path}`">
      <v-icon :icon="item.meta.icon"/>
      <v-icon :icon="item.meta.activeIcon"/>
      <p>{{item.meta.title}}</p>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'BottomTabs',
  components: {},
  props: {},
  data() {
    return {
      routesArr: this.$router.options.routes.filter(item => {
        return item.path === '/'
      })[0].children.filter(item => {
        return item.meta.icon !== undefined && item.meta.activeIcon !== undefined
      })
    }
  },
  computed: {},
  created() {
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .bottom-tabs {
    display: flex;
    align-items: stretch;
    height: 97px;
    border-top: 1Px solid $lineColor;
    position: relative;
    z-index: 2;
    background-color: #fff;
    a {
      flex-grow: 1;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    p {
      font-size: 20px;
      color: $blackColor-2;
    }
  }

  .v-icon {
    display: none;
    font-size: 50px;
    margin: 8px 0 2px;
    &:first-child {
      display: inline-block;
    }
  }

  .router-link-active {
    background: #ffcccc;
    border-radius: 10px;
    p {
      color: $primaryColor;
      
    }
    .v-icon {
      display: inline-block;
      &:first-child {
        display: none;
      }
    }
    &:before{
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: -1;
      transform: translate(-50%,-50%) scale(0,0);
      animation: scale .5s;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background-color: $bgColor;
    }
  }
  @keyframes scale {
    from {
      transform: translate(-50%,-50%) scale(0,0);
    }
    to {
      transform:translate(-50%,-50%)  scale(1,1);
    }
  }
</style>
