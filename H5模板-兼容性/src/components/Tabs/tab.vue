<template>
  <div class="v-tab" :class="{'is-active': isActive}" @click="tabEventHandler"><slot></slot></div>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    }
  },
  data() {
    return {
      isActive: false,
      tabName: this.name,
      index: -1
    }
  },
  beforeCreate() {
    this.$parent.tabs.push(this)
  },
  mounted() {
    this.isActive = this.$parent.active ? this.tabName === this.$parent.activeName : this === this.$parent.tabs[0]
  },
  methods: {
    tabEventHandler(e) {
      this.$parent.tabs.forEach(e => (e.isActive = false))
      this.isActive = true
      this.$emit('changeTabs', this.tabName)
    }
  },
  watch: {
    isActive(flag) {
      if (flag) {
        this.$parent.activeName = this.tabName
        this.$parent.activeTab = this
      }
    }
  }
}
</script>

<style lang="scss">
  .v-tab + .v-tab{
    margin-left: 64px;
  }
</style>

<style lang="scss" scoped>
  .v-tab{
    display: inline-block;
    font-size: 30px;
    color: $blackColor;

  }

  .is-active{
    position: relative;
    color: $primaryColor;
    
    // &::after{
    //   content: '';
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    //   right: 0;
    //   width: 45%;
    //   height: 4px;
    //   margin: 0 auto;
    //   background-color: $primaryColor;
    // }
  }
</style>
